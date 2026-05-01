/**
 * Shared primitive types, enums, and base interfaces.
 * Every domain schema imports from here — never duplicates these definitions.
 */

// ─── Primitives ───────────────────────────────────────────────────────────────

/** RFC 4122 UUID v4 string — used as the primary key on all entities */
export type ID = string;

/** ISO 8601 datetime string — e.g. "2026-04-25T10:30:00.000Z" */
export type ISODateString = string;

/** ISO 8601 year-month string — e.g. "2026-04" (used for project duration) */
export type ISOYearMonth = string;

// ─── Audit / lifecycle ───────────────────────────────────────────────────────

export interface Timestamps {
  readonly createdAt: ISODateString;
  readonly updatedAt: ISODateString;
}

export interface SoftDeletable {
  readonly deletedAt: ISODateString | null;
}

export type PublishStatus = "draft" | "published" | "archived";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SEOMetadata {
  /** Page <title> — target < 60 characters */
  title: string;
  /** Meta description — target < 155 characters */
  description: string;
  /** Primary + secondary keywords for this page */
  keywords: string[];
  /** OG image URL — must be 1200 × 630 px */
  ogImageUrl?: string;
  /** Explicit canonical URL — omit to auto-derive from route */
  canonicalUrl?: string;
}

// ─── Domain enums ────────────────────────────────────────────────────────────

/**
 * Union of all valid service slugs.
 * Adding a new service requires updating this type AND generateStaticParams().
 */
export type ServiceSlug =
  | "web-development"
  | "cloud-solutions"
  | "qa-testing"
  | "ui-ux-design"
  | "consulting"
  | "staff-augmentation";

export const SERVICE_SLUG_LABELS: Record<ServiceSlug, string> = {
  "web-development":    "Web & App Development",
  "cloud-solutions":    "Cloud & DevOps",
  "qa-testing":         "QA & Testing",
  "ui-ux-design":       "UI/UX Design",
  "consulting":         "Tech Consulting",
  "staff-augmentation": "Staff Augmentation",
};

export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "devops"
  | "design"
  | "testing"
  | "mobile"
  | "other";

export type BudgetRange =
  | "under_5k"
  | "5k_to_15k"
  | "15k_to_30k"
  | "30k_to_50k"
  | "50k_to_100k"
  | "over_100k"
  | "not_specified";

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  under_5k:      "Under £5,000",
  "5k_to_15k":   "£5,000 – £15,000",
  "15k_to_30k":  "£15,000 – £30,000",
  "30k_to_50k":  "£30,000 – £50,000",
  "50k_to_100k": "£50,000 – £100,000",
  over_100k:     "£100,000+",
  not_specified: "Not specified",
};

// ─── Reusable content blocks ─────────────────────────────────────────────────

export interface TechItem {
  name:     string;
  category: TechCategory;
  /** Relative path to SVG/PNG logo — e.g. "/icons/nextjs.svg" */
  logoUrl?: string;
}

/** Before/After performance metric — required on every case study */
export interface Metric {
  /** Short label describing what was measured — e.g. "Page load time" */
  label: string;
  /** Value before Nexora's work — e.g. "3.8s" */
  before: string;
  /** Value after Nexora's work — e.g. "900ms" */
  after: string;
  /**
   * Human-readable improvement summary shown as a callout.
   * Use directional prefix: "↑ 60%", "↓ 2.9s", "3× faster", "+2,400 users/month"
   */
  improvement: string;
}

/** Client quote block — required on case studies, optional on testimonials section */
export interface Testimonial {
  quote: string;          // 40–80 words; must be specific, not generic
  authorName: string;     // First + last name — no anonymisation here
  authorTitle: string;    // e.g. "CTO"
  authorCompany: string;
  avatarUrl?: string;     // 200 × 200 px minimum
  linkedinUrl?: string;
}

/** AEO-optimised FAQ entry — answer must be 40–80 words (featured snippet sweet spot) */
export interface FAQ {
  question: string;
  answer: string;
}

/** Deliverable line item — used in service cards and service detail pages */
export interface Deliverable {
  title: string;
  /** Optional one-sentence elaboration shown on hover / expanded view */
  detail?: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page:       number;
  pageSize:   number;
  total:      number;
  totalPages: number;
}

export interface Paginated<T> {
  data:       T[];
  pagination: PaginationMeta;
}

// ─── Utility types ────────────────────────────────────────────────────────────

/** Make all properties of T deeply readonly — for immutable data constants */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** Strip fields that should never be sent to the client */
export type SafePublic<T, K extends keyof T> = Omit<T, K>;
