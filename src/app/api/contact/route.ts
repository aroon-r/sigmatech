import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { contactFormSchema, DISPOSABLE_EMAIL_DOMAINS, getEmailDomain } from "@/lib/validations";
import type { ContactApiResponse, ContactFormInputValidated } from "@/lib/validations";
import type { ContactFormInput } from "@/data/schemas";

// Mutations are never cached.
export const dynamic = "force-dynamic";

// ─── Contact form API — architecture summary ──────────────────────────────────
//
// Request flow (in order):
//   1. Parse JSON              → 400 on malformed body
//   2. Honeypot check          → 200 noop on bot traffic (silent, no signal to attacker)
//   3. Zod validation          → 400 + structured fieldErrors on invalid input
//   4. Rate limit (Redis)      → 429 + Retry-After derived from window reset time
//   5. Persist (Supabase)      → logs error, CONTINUES — email still sends on failure
//   6. Send emails (Resend)    → allSettled, partial failure is logged not thrown
//   7. Return 200 + submissionId
//
// Why Supabase + Redis instead of the original file-based approach:
//   File-based persistence writes to /tmp on Vercel, which is wiped on cold start.
//   File-based rate limiting is per-instance: with N warm functions a user can
//   submit 3×N times before any single instance blocks them.
//   Supabase provides a single durable Postgres store across all instances.
//   Upstash Redis provides a single atomic counter via HTTP (no TCP, no cold-start cost).
//
// Why graceful degradation is intentional:
//   If Supabase is down, the team still receives the enquiry email and can respond.
//   Returning 500 because a secondary store failed would mislead the user into
//   re-submitting and create duplicate emails. The failure is surfaced via a
//   structured error log (level: "error", event: "persist.failed") — operator signal,
//   not user signal.
//   If Redis is unavailable, blocking all traffic is worse than briefly allowing excess.
//   The degraded state is visible in logs (event: "rate_limit.skipped").
//
// Both singletons are null-guarded: absent env vars → null → graceful skip.
// This means the route works in local dev and CI without credentials configured.
//
// What would change at higher scale:
//   • Move persist + email into a background job (Inngest / Trigger.dev) so the
//     request path returns immediately after rate limit check.
//   • Add idempotency: derive submissionId from a client nonce and use
//     INSERT ... ON CONFLICT DO NOTHING to guarantee exactly-once semantics.
//   • Swap Upstash single-region for Upstash Global for multi-region accuracy.
//
// Full design rationale: docs/architecture/contact-system.md

// ─── Module-level singletons ─────────────────────────────────────────────────
// Initialised once per cold start. null-guarded so the route degrades gracefully
// when env vars are absent (local dev without credentials, CI test environment).

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url:   process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 3);

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter:   Ratelimit.fixedWindow(RATE_LIMIT_MAX, "10 m"),
      analytics: false,
      prefix:    "nexora:rl:contact",
    })
  : null;

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

// ─── Persistence ──────────────────────────────────────────────────────────────
// Inserts a row into public.submissions. On failure: logs the error code and
// returns — we do NOT throw. The user-facing response succeeds regardless
// (email was sent; the record can be replayed from email if needed).

async function persistSubmission(
  submissionId: string,
  data: ContactFormInputValidated,
  log: Logger,
): Promise<void> {
  if (!supabase) {
    log("warn", "persist.skipped", { reason: "supabase_not_configured" });
    return;
  }

  const { error } = await supabase.from("submissions").insert({
    id:        submissionId,
    full_name: data.fullName,
    email:     data.email,
    services:  data.services,
    budget:    data.budgetRange,
    message:   data.message,
    company:   data.company ?? null,
  });

  if (error) {
    log("error", "persist.failed", { submissionId, code: error.code });
  } else {
    log("info", "persist.ok", { submissionId });
  }
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Keyed on email hash (sha256 hex), never the raw address.
// Returns a discriminated union so the caller can read retryAfterSecs without
// a second lookup.
//
// When ratelimit is null (no Redis configured) we allow all traffic through
// and emit a warn so the operator knows rate limiting is inactive.

type RateLimitResult =
  | { limited: false }
  | { limited: true; retryAfterSecs: number };

async function checkRateLimit(emailHash: string, log: Logger): Promise<RateLimitResult> {
  if (!ratelimit) {
    log("warn", "rate_limit.skipped", { reason: "redis_not_configured" });
    return { limited: false };
  }

  const { success, reset } = await ratelimit.limit(emailHash);

  if (!success) {
    // reset is a Unix timestamp (ms). Convert to seconds remaining.
    const retryAfterSecs = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { limited: true, retryAfterSecs };
  }

  return { limited: false };
}

// ─── Email ────────────────────────────────────────────────────────────────────
// Returns allSettled results so the caller can log partial failures without
// catching — a rejection in one email (e.g., team notification) must not
// prevent the confirmation email result from being observed, and vice versa.

async function sendEmails(
  data: ContactFormInputValidated,
): Promise<PromiseSettledResult<unknown>[]> {
  const { Resend } = await import("resend");
  const resend     = new Resend(process.env.RESEND_API_KEY);
  const firstName  = data.fullName.split(" ")[0];

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
      from:    process.env.RESEND_FROM_EMAIL   ?? "no-reply@nexora.dev",
      to:      process.env.RESEND_NOTIFY_EMAIL ?? "hello@nexora.dev",
      subject: `New enquiry from ${data.fullName} — ${data.services.join(", ")}`,
      text:    body,
    }),
    resend.emails.send({
      from:    `Nexora <${process.env.RESEND_FROM_EMAIL ?? "hello@nexora.dev"}>`,
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
  // requests.
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
    const rawEmail = String((body as Record<string, unknown>).email ?? "").toLowerCase().trim();
    if (DISPOSABLE_EMAIL_DOMAINS.has(getEmailDomain(rawEmail))) {
      const { createHash } = await import("node:crypto");
      log("warn", "validation_failed", { reason: "disposable_email", emailHashPrefix: createHash("sha256").update(rawEmail).digest("hex").slice(0, 8) });
    }
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
  const emailHash      = createHash("sha256").update(data.email).digest("hex");

  const rl = await checkRateLimit(emailHash, log);
  if (rl.limited) {
    log("warn", "rate_limit.triggered", { emailHashPrefix: emailHash.slice(0, 8) });
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Too many submissions. Please wait a few minutes before trying again." },
      {
        status:  429,
        // Retry-After tells well-behaved clients (and monitoring systems) exactly
        // how long to wait. Value in seconds derived from the Redis window reset time.
        headers: { "Retry-After": String(rl.retryAfterSecs) },
      },
    );
  }

  const submissionId = createHash("sha256")
    .update(`${data.email}-${Date.now()}`)
    .digest("hex")
    .slice(0, 12);

  // Persist before emailing — the record must exist even if email delivery
  // fails later. A missing email is recoverable; a missing record is not.
  await persistSubmission(submissionId, data, log);

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
