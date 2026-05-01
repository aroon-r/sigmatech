"use server";

import { Resend } from "resend";
import { z }      from "zod";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(), // honeypot
});

export type QuickFormState = {
  success:  boolean;
  error?:   string;
  fieldErrors?: { name?: string[]; email?: string[]; message?: string[] };
};

export async function submitQuickContact(
  _prev: QuickFormState | null,
  formData: FormData,
): Promise<QuickFormState> {
  // Honeypot — bots fill this, humans don't
  if (formData.get("website")) return { success: true };

  const parsed = schema.safeParse({
    name:    formData.get("name"),
    email:   formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      success:     false,
      error:       "Please correct the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;
  const firstName = name.split(" ")[0];

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from   = process.env.RESEND_FROM_EMAIL   ?? "no-reply@sigmatech.co.uk";
  const to     = process.env.RESEND_NOTIFY_EMAIL ?? "hello@sigmatech.co.uk";

  try {
    await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        subject: `New enquiry from ${name}`,
        text:    `Name:    ${name}\nEmail:   ${email}\n\nMessage:\n${message}`,
      }),
      resend.emails.send({
        from:    `Nexora <${from}>`,
        to:      email,
        subject: `We've received your message, ${firstName}`,
        text: [
          `Hi ${firstName},`,
          "",
          "Thanks for reaching out to Nexora. We'll be in touch shortly.",
          "",
          "Best,",
          "The Nexora Team",
          "hello@sigmatech.co.uk",
        ].join("\n"),
      }),
    ]);
  } catch {
    return {
      success: false,
      error:   "Something went wrong. Please email us directly at hello@sigmatech.co.uk",
    };
  }

  return { success: true };
}
