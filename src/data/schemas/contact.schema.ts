import type {
  ID,
  ISODateString,
  ServiceSlug,
  BudgetRange,
} from "./shared";

// ─── Form input (what the user submits) ───────────────────────────────────────

/**
 * Shape of the data posted from the contact form to the API route.
 * Mirror this interface with a Zod schema in /src/lib/validations.ts
 * for runtime validation at the API boundary.
 */
export interface ContactFormInput {
  // ── Requester ─────────────────────────────────────────────────────────────
  /** Full name — 2–100 characters */
  fullName:    string;
  /** Work email — validated against RFC 5322 pattern */
  email:       string;
  /** Company or organisation name — optional for freelancers */
  company?:    string;
  /** Job title — used for lead scoring and CRM tagging */
  jobTitle?:   string;
  /** Phone number in E.164 format — optional */
  phone?:      string;

  // ── Project context ───────────────────────────────────────────────────────
  /** Which SigmaTech service(s) the enquiry is about */
  services:    ServiceSlug[];
  budgetRange: BudgetRange;
  /**
   * Free-form project description — 20–2000 characters.
   * Rendered as plain text (no Markdown) — sanitised server-side.
   */
  message:     string;
  /**
   * Rough start timeline — e.g. "immediately", "within 3 months".
   * Optional — helps prioritise follow-up.
   */
  timeline?:   ProjectTimeline;

  // ── Consent ───────────────────────────────────────────────────────────────
  /**
   * GDPR-compliant opt-in checkbox.
   * Must be `true` to submit — enforced by Zod `.literal(true)`.
   */
  privacyConsent: boolean;
  /** Marketing email opt-in — separate from the required privacy consent */
  marketingOptIn?: boolean;

  // ── Attribution ───────────────────────────────────────────────────────────
  /**
   * How did you hear about us? — optional dropdown.
   * Used to measure channel effectiveness.
   */
  referralSource?: ReferralSource;
  /** UTM campaign parameter captured client-side */
  utmCampaign?:   string;
  /** UTM medium parameter captured client-side */
  utmMedium?:     string;
  /** UTM source parameter captured client-side */
  utmSource?:     string;
}

// ─── Stored submission (what persists in the data layer / CMS) ───────────────

/**
 * Full record as stored — extends the form input with server-stamped fields
 * and CRM lifecycle metadata.
 */
export interface ContactSubmission extends ContactFormInput {
  // ── Identity ──────────────────────────────────────────────────────────────
  id:          ID;

  // ── Timestamps ────────────────────────────────────────────────────────────
  /** ISO 8601 datetime the form was received by the API route */
  receivedAt:  ISODateString;
  /** ISO 8601 datetime the lead was last updated in the CRM */
  updatedAt:   ISODateString;

  // ── CRM lifecycle ─────────────────────────────────────────────────────────
  status:      LeadStatus;
  /**
   * Free-form notes from the sales/BD team.
   * Not shown to the submitter — internal only.
   */
  internalNotes?: string;
  /**
   * ISO 8601 datetime of first reply to the lead.
   * SLA target: < 4 business hours from `receivedAt`.
   */
  firstRepliedAt?: ISODateString;
  /**
   * ISO 8601 datetime the lead was marked as converted (deal won).
   * Null until a project is formally kicked off.
   */
  convertedAt?:    ISODateString;

  // ── Technical metadata (server-stamped) ───────────────────────────────────
  /**
   * ISO 3166-1 alpha-2 country code from the edge middleware geo header.
   * e.g. "GB", "US", "DE"
   */
  visitorCountry?: string;
  /**
   * Hashed IP address — stored for abuse detection; never logged raw.
   * SHA-256 hex of the visitor IP.
   */
  ipHash?:         string;
  /** Sanitised User-Agent string — for device/browser reporting */
  userAgent?:      string;

  // ── Spam / abuse ─────────────────────────────────────────────────────────
  /**
   * Whether this submission was flagged as spam by server-side heuristics.
   * Flagged submissions are soft-hidden from the default CRM view.
   */
  isSpam: boolean;
  /**
   * Honeypot field value — if the hidden input has a value, the bot filled it.
   * Never trusted for clean submissions; always empty string in clean ones.
   * Stored for audit trail, not shown in CRM UI.
   */
  honeypotValue?: string;
}

// ─── Supporting enums ─────────────────────────────────────────────────────────

export type LeadStatus =
  | "new"          // Just received — not yet reviewed
  | "reviewing"    // Being assessed by the team
  | "contacted"    // First reply sent to the prospect
  | "qualifying"   // Discovery call scheduled or in progress
  | "proposal"     // Formal proposal / SOW sent
  | "negotiating"  // Commercial terms being discussed
  | "won"          // Project kicked off
  | "lost"         // Prospect went elsewhere or project cancelled
  | "spam";        // Confirmed spam — hidden from default views

export type ProjectTimeline =
  | "immediately"     // Ready to start now
  | "within_1_month"
  | "1_to_3_months"
  | "3_to_6_months"
  | "6_months_plus"
  | "not_sure";

export type ReferralSource =
  | "google_search"
  | "linkedin"
  | "twitter_x"
  | "word_of_mouth"
  | "existing_client"
  | "github"
  | "blog"
  | "podcast"
  | "conference"
  | "other";

export const REFERRAL_SOURCE_LABELS: Record<ReferralSource, string> = {
  google_search:   "Google Search",
  linkedin:        "LinkedIn",
  twitter_x:       "Twitter / X",
  word_of_mouth:   "Word of Mouth",
  existing_client: "Existing Client Referral",
  github:          "GitHub",
  blog:            "Blog / Article",
  podcast:         "Podcast",
  conference:      "Conference / Event",
  other:           "Other",
};

export const PROJECT_TIMELINE_LABELS: Record<ProjectTimeline, string> = {
  immediately:     "Immediately",
  within_1_month:  "Within 1 month",
  "1_to_3_months": "1–3 months",
  "3_to_6_months": "3–6 months",
  "6_months_plus": "6+ months",
  not_sure:        "Not sure yet",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new:         "New",
  reviewing:   "Reviewing",
  contacted:   "Contacted",
  qualifying:  "Qualifying",
  proposal:    "Proposal Sent",
  negotiating: "Negotiating",
  won:         "Won",
  lost:        "Lost",
  spam:        "Spam",
};

// ─── Validation helpers ───────────────────────────────────────────────────────

export function isContactSubmission(value: unknown): value is ContactSubmission {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    "fullName" in value &&
    "receivedAt" in value
  );
}

/**
 * Returns the subset of fields safe to expose to the client-side
 * (e.g. in a confirmation email or submission receipt).
 * Strips all CRM, honeypot, IP, and internal audit fields.
 */
export type ContactSubmissionPublic = Pick<
  ContactSubmission,
  | "id"
  | "fullName"
  | "email"
  | "company"
  | "services"
  | "budgetRange"
  | "message"
  | "receivedAt"
  | "status"
>;
