import { describe, it, expect } from "vitest";
import { contactFormSchema, contactFormEmailSchema } from "@/lib/validations";

// ─── Shared valid baseline ────────────────────────────────────────────────────
// Every test that needs a passing payload spreads this and overrides one field.
// Keeping it here prevents magic strings from scattering across the file.

const VALID: Record<string, unknown> = {
  fullName:       "Jane Smith",
  email:          "jane@example.com",
  services:       ["web-development"],
  budgetRange:    "15k_to_30k",
  message:        "We need a new company website built with Next.js and TypeScript.",
  privacyConsent: true,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parse(overrides: Record<string, unknown> = {}) {
  return contactFormSchema.safeParse({ ...VALID, ...overrides });
}

function fieldErrors(result: ReturnType<typeof parse>) {
  if (result.success) return {};
  return result.error.flatten().fieldErrors;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("contactFormSchema", () => {

  // ── Valid submissions ────────────────────────────────────────────────────────

  describe("valid submissions", () => {
    it("accepts a fully-populated form", () => {
      const result = parse({
        company:        "Acme Ltd",
        jobTitle:       "CTO",
        phone:          "+447700900123",
        timeline:       "1_to_3_months",
        marketingOptIn: true,
        referralSource: "linkedin",
        utmSource:      "linkedin",
        utmMedium:      "cpc",
        utmCampaign:    "q1-2026",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a minimal form (required fields only)", () => {
      expect(parse().success).toBe(true);
    });

    it("normalises email to lowercase", () => {
      const result = parse({ email: "Jane.Smith@EXAMPLE.COM" });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.email).toBe("jane.smith@example.com");
    });

    it("trims leading and trailing whitespace from fullName", () => {
      const result = parse({ fullName: "  Jane Smith  " });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.fullName).toBe("Jane Smith");
    });

    it("trims whitespace from message", () => {
      const msg = "  We need help with our project.  ";
      const result = parse({ message: msg });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.message).toBe(msg.trim());
    });

    it("accepts multiple services simultaneously", () => {
      const result = parse({ services: ["web-development", "ui-ux-design", "qa-testing"] });
      expect(result.success).toBe(true);
    });

    it("defaults marketingOptIn to false when omitted", () => {
      const result = parse();
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.marketingOptIn).toBe(false);
    });
  });

  // ── fullName ─────────────────────────────────────────────────────────────────

  describe("fullName", () => {
    it("rejects a name shorter than 2 characters", () => {
      const result = parse({ fullName: "A" });
      expect(result.success).toBe(false);
      expect(fieldErrors(result)).toHaveProperty("fullName");
    });

    it("rejects a name longer than 100 characters", () => {
      expect(parse({ fullName: "A".repeat(101) }).success).toBe(false);
    });

    it("rejects an empty string", () => {
      expect(parse({ fullName: "" }).success).toBe(false);
    });

    it("accepts a name of exactly 2 characters", () => {
      expect(parse({ fullName: "Jo" }).success).toBe(true);
    });

    it("accepts a name of exactly 100 characters", () => {
      expect(parse({ fullName: "A".repeat(100) }).success).toBe(true);
    });
  });

  // ── email ────────────────────────────────────────────────────────────────────

  describe("email", () => {
    it.each([
      "notanemail",
      "missing@",
      "@nodomain.com",
      "two@@signs.com",
      "no space@allowed.com",
    ])('rejects malformed address "%s"', (email) => {
      expect(parse({ email }).success).toBe(false);
    });

    it("rejects an email longer than 254 characters", () => {
      expect(parse({ email: `${"a".repeat(249)}@b.com` }).success).toBe(false);
    });

    it("accepts a valid email with subdomains", () => {
      expect(parse({ email: "user@mail.example.co.uk" }).success).toBe(true);
    });
  });

  // ── services ─────────────────────────────────────────────────────────────────

  describe("services", () => {
    it("rejects an empty array", () => {
      const result = parse({ services: [] });
      expect(result.success).toBe(false);
      expect(fieldErrors(result)).toHaveProperty("services");
    });

    it("rejects an unrecognised service slug", () => {
      expect(parse({ services: ["unknown-service"] }).success).toBe(false);
    });

    it.each([
      "web-development",
      "cloud-solutions",
      "qa-testing",
      "ui-ux-design",
      "consulting",
      "staff-augmentation",
    ])('accepts the canonical slug "%s"', (slug) => {
      expect(parse({ services: [slug] }).success).toBe(true);
    });
  });

  // ── budgetRange ───────────────────────────────────────────────────────────────

  describe("budgetRange", () => {
    it("rejects an unrecognised budget value", () => {
      expect(parse({ budgetRange: "£999" }).success).toBe(false);
    });

    it.each([
      "under_5k",
      "5k_to_15k",
      "15k_to_30k",
      "30k_to_50k",
      "50k_to_100k",
      "over_100k",
      "not_specified",
    ])('accepts "%s"', (budgetRange) => {
      expect(parse({ budgetRange }).success).toBe(true);
    });
  });

  // ── message ───────────────────────────────────────────────────────────────────

  describe("message", () => {
    it("rejects a message shorter than 20 characters", () => {
      const result = parse({ message: "Too short." });
      expect(result.success).toBe(false);
      expect(fieldErrors(result)).toHaveProperty("message");
    });

    it("rejects a message longer than 2000 characters", () => {
      expect(parse({ message: "A".repeat(2001) }).success).toBe(false);
    });

    it("accepts a message at exactly the minimum boundary (20 chars)", () => {
      expect(parse({ message: "A".repeat(20) }).success).toBe(true);
    });

    it("accepts a message at exactly the maximum boundary (2000 chars)", () => {
      expect(parse({ message: "A".repeat(2000) }).success).toBe(true);
    });
  });

  // ── privacyConsent ───────────────────────────────────────────────────────────

  describe("privacyConsent", () => {
    it("rejects consent: false", () => {
      const result = parse({ privacyConsent: false });
      expect(result.success).toBe(false);
      expect(fieldErrors(result)).toHaveProperty("privacyConsent");
    });

    it("rejects a missing consent field", () => {
      const { privacyConsent: _omit, ...withoutConsent } = VALID;
      expect(contactFormSchema.safeParse(withoutConsent).success).toBe(false);
    });

    it("rejects the string 'true' (must be boolean true)", () => {
      expect(parse({ privacyConsent: "true" }).success).toBe(false);
    });

    it("rejects the number 1", () => {
      expect(parse({ privacyConsent: 1 }).success).toBe(false);
    });
  });

  // ── phone (optional) ─────────────────────────────────────────────────────────

  describe("phone (optional)", () => {
    it("accepts a valid E.164 UK number", () => {
      expect(parse({ phone: "+447700900123" }).success).toBe(true);
    });

    it("accepts a valid E.164 US number", () => {
      expect(parse({ phone: "+12025551234" }).success).toBe(true);
    });

    it("accepts an empty string (treated as not provided)", () => {
      expect(parse({ phone: "" }).success).toBe(true);
    });

    it("accepts undefined (field omitted entirely)", () => {
      expect(parse({ phone: undefined }).success).toBe(true);
    });

    it("rejects a number without a country code", () => {
      expect(parse({ phone: "07700900123" }).success).toBe(false);
    });

    it("rejects a plaintext string", () => {
      expect(parse({ phone: "call me" }).success).toBe(false);
    });
  });

  // ── optional string fields ────────────────────────────────────────────────────

  describe("optional string fields (company, jobTitle)", () => {
    it("rejects a company name longer than 150 characters", () => {
      expect(parse({ company: "A".repeat(151) }).success).toBe(false);
    });

    it("accepts company and jobTitle within length limits", () => {
      expect(parse({ company: "Nexora Ltd", jobTitle: "Head of Engineering" }).success).toBe(true);
    });

    it("accepts both fields as undefined", () => {
      expect(parse({ company: undefined, jobTitle: undefined }).success).toBe(true);
    });
  });

  // ── timeline & referralSource (optional enums) ────────────────────────────────

  describe("optional enum fields", () => {
    it("accepts every valid timeline value", () => {
      const timelines = [
        "immediately", "within_1_month", "1_to_3_months",
        "3_to_6_months", "6_months_plus", "not_sure",
      ];
      for (const timeline of timelines) {
        expect(parse({ timeline }).success).toBe(true);
      }
    });

    it("rejects an unrecognised timeline value", () => {
      expect(parse({ timeline: "next_year" }).success).toBe(false);
    });

    it("accepts every valid referralSource value", () => {
      const sources = [
        "google_search", "linkedin", "twitter_x", "word_of_mouth",
        "existing_client", "github", "blog", "podcast", "conference", "other",
      ];
      for (const referralSource of sources) {
        expect(parse({ referralSource }).success).toBe(true);
      }
    });
  });

  // ── error shape ───────────────────────────────────────────────────────────────

  describe("error structure", () => {
    it("returns fieldErrors keyed by field name when multiple fields fail", () => {
      const result = contactFormSchema.safeParse({
        fullName:       "",
        email:          "not-an-email",
        services:       [],
        budgetRange:    "wrong",
        message:        "short",
        privacyConsent: false,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const { fieldErrors: errs } = result.error.flatten();
        expect(errs).toHaveProperty("fullName");
        expect(errs).toHaveProperty("email");
        expect(errs).toHaveProperty("services");
        expect(errs).toHaveProperty("budgetRange");
        expect(errs).toHaveProperty("message");
        expect(errs).toHaveProperty("privacyConsent");
      }
    });

    it("each fieldError is an array of human-readable strings", () => {
      const result = parse({ email: "bad" });
      if (!result.success) {
        const msgs = result.error.flatten().fieldErrors.email ?? [];
        expect(msgs.length).toBeGreaterThan(0);
        expect(typeof msgs[0]).toBe("string");
      }
    });
  });

  // ── partial schemas ───────────────────────────────────────────────────────────

  describe("contactFormEmailSchema (blur validation)", () => {
    it("validates a valid email in isolation", () => {
      expect(contactFormEmailSchema.safeParse({ email: "test@example.com" }).success).toBe(true);
    });

    it("rejects an invalid email in isolation", () => {
      expect(contactFormEmailSchema.safeParse({ email: "bad" }).success).toBe(false);
    });
  });
});
