import { z } from "zod";
import type { ContactFormInput } from "@/data/schemas";

// ─── Reusable field rules ─────────────────────────────────────────────────────

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a lowercase hyphenated slug");

const serviceSlug = z.enum([
  "web-development",
  "cloud-solutions",
  "qa-testing",
  "ui-ux-design",
  "consulting",
  "staff-augmentation",
]);

const budgetRange = z.enum([
  "under_5k",
  "5k_to_15k",
  "15k_to_30k",
  "30k_to_50k",
  "50k_to_100k",
  "over_100k",
  "not_specified",
]);

const projectTimeline = z.enum([
  "immediately",
  "within_1_month",
  "1_to_3_months",
  "3_to_6_months",
  "6_months_plus",
  "not_sure",
]);

const referralSource = z.enum([
  "google_search",
  "linkedin",
  "twitter_x",
  "word_of_mouth",
  "existing_client",
  "github",
  "blog",
  "podcast",
  "conference",
  "other",
]);

// ─── Disposable email domains ─────────────────────────────────────────────────
// Hardcoded list of well-known disposable/throwaway providers.
// Not exhaustive — the goal is to raise friction for casual abuse, not to block
// every disposable domain in existence. A determined attacker can always use a
// real inbox; this catches the majority of automated form spam.

export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.de",
  "guerrillamail.info",
  "guerrillamail.biz",
  "grr.la",
  "sharklasers.com",
  "spam4.me",
  "yopmail.com",
  "yopmail.fr",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "throwaway.email",
  "trashmail.com",
  "trashmail.me",
  "trashmail.net",
  "maildrop.cc",
  "dispostable.com",
  "mailnull.com",
  "fakeinbox.com",
]);

export function getEmailDomain(email: string): string {
  const parts = email.toLowerCase().trim().split("@");
  return parts.length === 2 ? parts[1]! : "";
}

// ─── Contact form schema ──────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  // Requester
  fullName: z
    .string()
    .min(2,   "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long")
    .toLowerCase()
    .trim()
    .refine(
      (val) => !DISPOSABLE_EMAIL_DOMAINS.has(val.split("@")[1] ?? ""),
      "Please use a work or personal email address",
    ),
  company: z
    .string()
    .max(150, "Company name must be under 150 characters")
    .trim()
    .optional(),
  jobTitle: z
    .string()
    .max(100, "Job title must be under 100 characters")
    .trim()
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Please enter a valid phone number (E.164 format)")
    .optional()
    .or(z.literal("")),

  // Project context
  services: z
    .array(serviceSlug)
    .min(1, "Please select at least one service"),
  budgetRange,
  message: z
    .string()
    .min(20,   "Message must be at least 20 characters")
    .max(2000, "Message must be under 2,000 characters")
    .trim(),
  timeline: projectTimeline.optional(),

  // Consent — boolean().refine keeps the inferred type as `boolean` (not `true`),
  // which aligns with ContactFormInput.privacyConsent: boolean.
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy policy to proceed",
    }),
  marketingOptIn: z.boolean().optional().default(false),

  // Attribution — all optional; populated client-side
  referralSource: referralSource.optional(),
  utmCampaign:   z.string().max(100).trim().optional(),
  utmMedium:     z.string().max(100).trim().optional(),
  utmSource:     z.string().max(100).trim().optional(),
});

// Infer the validated type — must be assignable to ContactFormInput
export type ContactFormInputValidated = z.infer<typeof contactFormSchema>;
// Compile-time check: validated output satisfies the domain interface
type _AssertCompatible = ContactFormInputValidated extends ContactFormInput ? true : never;

// ─── Partial schemas (for individual field validation on blur) ────────────────

export const contactFormEmailSchema = contactFormSchema.pick({ email: true });
export const contactFormMessageSchema = contactFormSchema.pick({ message: true });

// ─── API response type ────────────────────────────────────────────────────────

export interface ContactApiSuccessResponse {
  success: true;
  submissionId: string;
}

export interface ContactApiErrorResponse {
  success: false;
  error:   string;
  /** Zod field-level errors keyed by field name */
  fieldErrors?: Partial<Record<keyof ContactFormInput, string[]>>;
}

export type ContactApiResponse =
  | ContactApiSuccessResponse
  | ContactApiErrorResponse;
