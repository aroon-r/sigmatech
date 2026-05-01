import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { contactFormSchema } from "@/lib/validations";
import type { ContactApiResponse, ContactFormInputValidated } from "@/lib/validations";
import type { ContactFormInput } from "@/data/schemas";

// Mutations are never cached.
export const dynamic = "force-dynamic";

// ─── Structured logger ────────────────────────────────────────────────────────
// Emits newline-delimited JSON so any log aggregator (Datadog, Logtail,
// GCP Logging) can ingest it without custom parsing. Fields are deliberately
// limited: no PII, no raw email address, no message body.
//
// info  → stdout  (normal operational flow)
// warn  → stderr  (degraded but not broken — email partial failure, rate limit)
// error → stderr  (needs attention — persistence failure, unexpected throw)

type LogLevel = "info" | "warn" | "error";
type Logger   = (level: LogLevel, event: string, data?: Record<string, unknown>) => void;

function makeLogger(requestId: string): Logger {
  return function log(level, event, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      requestId,
      level,
      event,
      ...(data ? { data } : {}),
    };
    if (level === "info") {
      console.log(JSON.stringify(entry));
    } else {
      console.error(JSON.stringify(entry));
    }
  };
}

// ─── File paths ───────────────────────────────────────────────────────────────
//
// WHY FILE-BASED PERSISTENCE?
// Intentional tradeoff for a portfolio/low-traffic endpoint:
//
//   • Zero infrastructure: no DB connection string, no cold-start latency,
//     no migration scripts. Works with a single `git clone`.
//   • Locally readable: `cat data/submissions.ndjson` is all the ops tooling
//     you need at this traffic level.
//   • NDJSON is append-only and easy to parse: each line is a valid JSON
//     object, so `jq` works and the file never needs to be rewritten in full.
//
// KNOWN LIMITATIONS:
//   • Vercel Serverless (Node.js runtime): writes go to /tmp — ephemeral.
//     The file survives within a warm instance but is wiped on cold start.
//   • Vercel Edge runtime: no filesystem at all. Do not deploy there.
//   • Multi-instance deployments: each instance has its own file. If two
//     instances handle simultaneous requests, neither sees the other's writes.
//
// WHAT CHANGES IN PRODUCTION:
//   • Replace persistSubmission() with a Supabase/PlanetScale insert.
//   • Replace isRateLimited() with Upstash Redis (single atomic INCR,
//     works correctly across instances unlike per-file counters).
//   • The Logger interface and structured log format stays unchanged —
//     only the transport (console → aggregator SDK) needs to be swapped.

function dataDir(): string {
  if (process.env.NODE_ENV === "production") return tmpdir();
  const dir = join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  return dir;
}

// ─── Persistence ──────────────────────────────────────────────────────────────

interface SubmissionRecord {
  id:        string;
  email:     string;
  services:  string[];
  budget:    string;
  timestamp: string;
}

// Retries once on failure. The second attempt covers transient OS-level errors
// (e.g., a brief EAGAIN on a busy filesystem, or the data dir not yet existing
// when two cold-start requests race). On both failures we log clearly and
// allow the user-facing response to succeed — a missing disk record is
// recoverable (email was sent, we can replay from email); blocking the user is not.
function persistSubmission(record: SubmissionRecord, log: Logger): void {
  const line     = JSON.stringify(record) + "\n";
  const filePath = join(dataDir(), "submissions.ndjson");

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      appendFileSync(filePath, line, { encoding: "utf-8" });
      log("info", "persist.ok", { submissionId: record.id, attempt });
      return;
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code ?? "unknown";
      if (attempt === 2) {
        log("error", "persist.failed", { submissionId: record.id, attempt, code });
      }
      // attempt 1 failure falls through to attempt 2
    }
  }
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
//
// File-based: reads and writes a JSON store on each qualifying request.
// Graceful degradation: if the store file is unreadable (first request,
// corrupt file) the read silently returns an empty store and the request
// is allowed through — misreads never silently block legitimate submissions.
//
// Known limitation: each serverless instance has its own counter. A sender
// hitting 3 different warm instances could submit 9 times (3 × RATE_LIMIT_MAX)
// before any instance blocks them. Acceptable for a low-traffic contact form;
// swap to Upstash Redis for a multi-instance guarantee.

const RATE_LIMIT_MAX       = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 3);
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface RateLimitStore {
  [key: string]: { count: number; resetAt: number };
}

function isRateLimited(emailHash: string): boolean {
  const filePath = join(dataDir(), "rate-limit.json");
  let store: RateLimitStore = {};
  try {
    store = JSON.parse(readFileSync(filePath, "utf-8")) as RateLimitStore;
  } catch {
    // File doesn't exist yet, or JSON is corrupt — start fresh, allow through.
  }

  const now   = Date.now();
  const entry = store[emailHash];

  if (!entry || now > entry.resetAt) {
    store[emailHash] = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    try { writeFileSync(filePath, JSON.stringify(store), { encoding: "utf-8" }); } catch {}
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  store[emailHash] = { ...entry, count: entry.count + 1 };
  try { writeFileSync(filePath, JSON.stringify(store), { encoding: "utf-8" }); } catch {}
  return false;
}

// ─── Email ────────────────────────────────────────────────────────────────────

// Returns allSettled results so the caller can log partial failures without
// catching — a rejection in one email (e.g., team notification) must not
// prevent the confirmation email result from being observed, and vice versa.
async function sendEmails(
  data: ContactFormInputValidated,
): Promise<PromiseSettledResult<unknown>[]> {
  const { Resend } = await import("resend");
  const resend    = new Resend(process.env.RESEND_API_KEY);
  const firstName = data.fullName.split(" ")[0];

  const body = [
    `Name:    ${data.fullName}`,
    `Email:   ${data.email}`,
    `Company: ${data.company ?? "—"}`,
    `Role:    ${data.jobTitle ?? "—"}`,
    `Phone:   ${data.phone ?? "—"}`,
    "",
    `Services: ${data.services.join(", ")}`,
    `Budget:   ${data.budgetRange}`,
    `Timeline: ${data.timeline ?? "—"}`,
    "",
    `Message:\n${data.message}`,
  ].join("\n");

  return Promise.allSettled([
    resend.emails.send({
      from:    process.env.RESEND_FROM_EMAIL   ?? "no-reply@nexora.co.uk",
      to:      process.env.RESEND_NOTIFY_EMAIL ?? "hello@nexora.co.uk",
      subject: `New enquiry from ${data.fullName} — ${data.services.join(", ")}`,
      text:    body,
    }),
    resend.emails.send({
      from:    `Nexora <${process.env.RESEND_FROM_EMAIL ?? "hello@nexora.co.uk"}>`,
      to:      data.email,
      subject: `We've received your enquiry, ${firstName}`,
      text: [
        `Hi ${firstName},`,
        "",
        "Thanks for reaching out to Nexora. We'll be in touch shortly.",
        "",
        `Services: ${data.services.join(", ")}`,
        `Budget:   ${data.budgetRange}`,
        "",
        "Explore our work at https://nexora.dev/work",
        "",
        "Best,\nThe Nexora Team",
      ].join("\n"),
    }),
  ]);
}

// ─── POST /api/contact ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Short request ID for correlating all log lines within a single request.
  // Timestamp prefix makes IDs sortable; random suffix handles same-millisecond
  // requests. No crypto needed at this granularity.
  const requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const log       = makeLogger(requestId);

  log("info", "request.received");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    log("warn", "request.invalid_json");
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Honeypot — log volume so we can see bot traffic trends without alarming
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    (body as Record<string, unknown>).website
  ) {
    log("info", "bot.rejected");
    return NextResponse.json<ContactApiResponse>(
      { success: true, submissionId: "noop" },
      { status: 200 },
    );
  }

  // Zod validation — log field names only, never field values (PII)
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<keyof ContactFormInput, string[]>
    >;
    log("info", "validation.failed", { fields: Object.keys(fieldErrors) });
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Validation failed", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Rate limit — keyed on email hash, never the raw email address.
  // Log only the first 8 hex chars: enough to correlate across log lines,
  // not enough to reverse the address under an offline dictionary attack.
  const { createHash } = await import("node:crypto");
  const emailHash = createHash("sha256").update(data.email).digest("hex");

  if (isRateLimited(emailHash)) {
    log("warn", "rate_limit.triggered", { emailHashPrefix: emailHash.slice(0, 8) });
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Too many submissions. Please wait a few minutes before trying again." },
      {
        status:  429,
        // Retry-After tells well-behaved clients (and monitoring systems) exactly
        // how long to wait. Value in seconds — matches RATE_LIMIT_WINDOW_MS.
        headers: { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
      },
    );
  }

  const submissionId = createHash("sha256")
    .update(`${data.email}-${Date.now()}`)
    .digest("hex")
    .slice(0, 12);

  // Persist before emailing — the record must exist even if email delivery
  // fails later. A missing email is recoverable; a missing record is not.
  persistSubmission(
    {
      id:        submissionId,
      email:     data.email,
      services:  data.services,
      budget:    data.budgetRange,
      timestamp: new Date().toISOString(),
    },
    log,
  );

  // Send emails — partial failure is observable (warn) but must not fail the
  // user-facing response. The submission is already persisted at this point.
  try {
    const results = await sendEmails(data);
    const failed  = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      log("warn", "email.partial_failure", {
        submissionId,
        failedCount: failed.length,
        totalCount:  results.length,
      });
    } else {
      log("info", "email.sent", { submissionId });
    }
  } catch (err) {
    // sendEmails uses allSettled internally so this covers unexpected throws
    // from the Resend client constructor (e.g., missing API key at init time).
    log("error", "email.failed", {
      submissionId,
      reason: err instanceof Error ? err.message : "unknown",
    });
  }

  log("info", "submission.ok", { submissionId, services: data.services });
  return NextResponse.json<ContactApiResponse>({ success: true, submissionId }, { status: 200 });
}
