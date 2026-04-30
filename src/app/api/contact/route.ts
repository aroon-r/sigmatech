import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import type { ContactApiResponse, ContactFormInputValidated } from "@/lib/validations";
import type { ContactFormInput } from "@/data/schemas";

// ─── Caching ──────────────────────────────────────────────────────────────────
// Mutations are never cached.
export const dynamic = "force-dynamic";

// ─── Shared processing logic ──────────────────────────────────────────────────
// Separated from the Server Action so both paths delegate to one place.
// Prevents logic drift if the two entry-points diverge over time.

async function processContactSubmission(
  data: ContactFormInputValidated,
): Promise<ContactApiResponse> {
  const { Resend }      = await import("resend");
  const { createHash }  = await import("node:crypto");

  const resend      = new Resend(process.env.RESEND_API_KEY);
  const submissionId = createHash("sha256")
    .update(`${data.email}-${Date.now()}`)
    .digest("hex")
    .slice(0, 12);

  const subject   = `New enquiry from ${data.fullName} — ${data.services.join(", ")}`;
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

  try {
    await Promise.allSettled([
      resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL   ?? "no-reply@sigmatech.co.uk",
        to:      process.env.RESEND_NOTIFY_EMAIL ?? "hello@sigmatech.co.uk",
        subject,
        text:    body,
      }),
      resend.emails.send({
        from:    `SigmaTech <${process.env.RESEND_FROM_EMAIL ?? "hello@sigmatech.co.uk"}>`,
        to:      data.email,
        subject: `We've received your enquiry, ${firstName}`,
        text: [
          `Hi ${firstName},`,
          "",
          "Thanks for reaching out to SigmaTech. We'll be in touch within 1 business day.",
          "",
          `Services: ${data.services.join(", ")}`,
          `Budget:   ${data.budgetRange}`,
          "",
          "Explore our work at https://sigmatech.co.uk/work",
          "",
          "Best,\nThe SigmaTech Team",
        ].join("\n"),
      }),
    ]);
  } catch (err) {
    console.error("[api/contact] Email send failed:", err);
  }

  console.info("[api/contact] Submission received:", {
    id:       submissionId,
    email:    data.email,
    services: data.services,
  });

  return { success: true, submissionId };
}

// ─── POST /api/contact ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Honeypot check (field name matches the hidden form input)
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    (body as Record<string, unknown>).website
  ) {
    return NextResponse.json<ContactApiResponse>(
      { success: true, submissionId: "noop" },
      { status: 200 },
    );
  }

  // Zod validation
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<keyof ContactFormInput, string[]>
    >;
    return NextResponse.json<ContactApiResponse>(
      { success: false, error: "Validation failed", fieldErrors },
      { status: 400 },
    );
  }

  const result = await processContactSubmission(parsed.data);
  return NextResponse.json<ContactApiResponse>(result, { status: result.success ? 200 : 500 });
}
