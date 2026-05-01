"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";
import type { ContactApiResponse } from "@/lib/validations";
import type { ContactFormInput } from "@/data/schemas";

// ─── Resend client ────────────────────────────────────────────────────────────
// Instantiated outside the action function so it is reused across invocations
// in long-lived serverless environments.
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// Phase 1 only — not shared across serverless instances, sufficient for MVP.
// Replace with Upstash Redis in Phase 2.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 3);
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ipHash: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ipHash);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ─── Email helpers ────────────────────────────────────────────────────────────

async function sendTeamNotification(data: ContactFormInput): Promise<void> {
  const subject = `New enquiry from ${data.fullName} — ${data.services.join(", ")}`;

  await resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL   ?? "no-reply@sigmatech.co.uk",
    to:      process.env.RESEND_NOTIFY_EMAIL ?? "hello@sigmatech.co.uk",
    subject,
    // Plain-text fallback until React Email templates are built in Step 22
    text: [
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
      "",
      `Referral: ${data.referralSource ?? "—"}`,
      `UTM:      ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / ") || "—"}`,
    ].join("\n"),
  });
}

async function sendConfirmationEmail(data: ContactFormInput): Promise<void> {
  const firstName = data.fullName.split(" ")[0];

  await resend.emails.send({
    from:    `SigmaTech <${process.env.RESEND_FROM_EMAIL ?? "hello@sigmatech.co.uk"}>`,
    to:      data.email,
    subject: `We've received your enquiry, ${firstName}`,
    text: [
      `Hi ${firstName},`,
      "",
      "Thanks for reaching out to SigmaTech. We've received your message and will be in touch shortly.",
      "",
      "Here's a summary of what you submitted:",
      `  Services: ${data.services.join(", ")}`,
      `  Budget:   ${data.budgetRange}`,
      "",
      "In the meantime, feel free to explore our work at https://sigmatech.co.uk/work",
      "",
      "Best,",
      "The SigmaTech Team",
    ].join("\n"),
  });
}

// ─── Server Action ────────────────────────────────────────────────────────────

/**
 * Handles contact form submission from the ContactForm Client Component.
 * Compatible with `useFormState` — signature is (prevState, formData).
 *
 * Flow:
 *   1. Honeypot check  → early exit (silent, to not tip off bots)
 *   2. Parse FormData  → plain object
 *   3. Zod validate    → return field errors on failure
 *   4. Rate limit      → return error on excess
 *   5. Send emails     → team notification + submitter confirmation
 *   6. Return success
 */
export async function submitContactForm(
  _prevState: ContactApiResponse | null,
  formData: FormData,
): Promise<ContactApiResponse> {
  // 1. Honeypot — hidden field; bots fill it, humans don't
  const honeypot = formData.get("website");
  if (honeypot) {
    // Return a fake success to avoid confirming the honeypot to the bot
    return { success: true, submissionId: "noop" };
  }

  // 2. Parse FormData into a plain object
  const raw = {
    fullName:       formData.get("fullName"),
    email:          formData.get("email"),
    company:        formData.get("company") || undefined,
    jobTitle:       formData.get("jobTitle") || undefined,
    phone:          formData.get("phone") || undefined,
    // Multi-select — getAll() returns string[]
    services:       formData.getAll("services"),
    budgetRange:    formData.get("budgetRange"),
    message:        formData.get("message"),
    timeline:       formData.get("timeline") || undefined,
    privacyConsent: formData.get("privacyConsent") === "on" ? true : undefined,
    marketingOptIn: formData.get("marketingOptIn") === "on",
    referralSource: formData.get("referralSource") || undefined,
    utmCampaign:    formData.get("utmCampaign") || undefined,
    utmMedium:      formData.get("utmMedium") || undefined,
    utmSource:      formData.get("utmSource") || undefined,
  };

  // 3. Zod validation
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<keyof ContactFormInput, string[]>
    >;
    return {
      success: false,
      error:   "Please correct the errors below.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // 4. Rate limit — keyed on email hash (stable across form re-submissions)
  const { createHash } = await import("node:crypto");
  const emailHash = createHash("sha256").update(data.email).digest("hex");

  if (isRateLimited(emailHash)) {
    return {
      success: false,
      error:   "Too many submissions. Please wait a few minutes before trying again.",
    };
  }

  // 5. Send emails — failures are logged but must not surface to the user
  const submissionId = createHash("sha256")
    .update(`${data.email}-${Date.now()}`)
    .digest("hex")
    .slice(0, 12);

  try {
    await Promise.allSettled([
      sendTeamNotification(data),
      sendConfirmationEmail(data),
    ]);
  } catch (err) {
    // Log for internal alerting; do not fail the user-facing flow
    console.error("[contact-action] Email send failed:", err);
  }

  // Phase 2: persist ContactSubmission to Sanity / database here.
  // For now, log structured data for observability.
  console.info("[contact-action] Submission received:", {
    id:       submissionId,
    email:    data.email,
    services: data.services,
    budget:   data.budgetRange,
  });

  return { success: true, submissionId };
}
