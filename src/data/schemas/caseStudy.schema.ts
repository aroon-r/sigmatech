import type {
  ID,
  ISODateString,
  ISOYearMonth,
  Timestamps,
  PublishStatus,
  SEOMetadata,
  ServiceSlug,
  TechItem,
  Metric,
  Testimonial,
  FAQ,
} from "./shared";

// ─── Core entity ──────────────────────────────────────────────────────────────

export interface CaseStudy extends Timestamps {
  // ── Identity ──────────────────────────────────────────────────────────────
  id:   ID;
  slug: string;

  // ── Display content ───────────────────────────────────────────────────────
  /** Project title — e.g. "Fintech Dashboard Rebuild" */
  title: string;
  /** One-line hook for cards and nav — max 10 words */
  tagline: string;
  /**
   * 2–3 sentence summary shown in /work grid cards.
   * Focus on the problem and the outcome, not the process.
   */
  excerpt: string;
  /**
   * Full narrative copy for /work/[slug] overview section.
   * Supports Markdown. Must open with a definition-first paragraph (AEO rule).
   * Structure: Context → Challenge → Approach → Outcome.
   */
  body: string;

  // ── Client information ────────────────────────────────────────────────────
  client: CaseStudyClient;

  // ── Project metadata ──────────────────────────────────────────────────────
  /** ISO year-month when the project kicked off — e.g. "2025-02" */
  projectStartDate: ISOYearMonth;
  /** ISO year-month when the project completed — omit if still ongoing */
  projectEndDate?: ISOYearMonth;
  /**
   * Human-readable duration for display — e.g. "6 weeks", "4 months".
   * Derived from start/end dates but stored explicitly for control over wording.
   */
  duration: string;

  // ── Services & tech ───────────────────────────────────────────────────────
  /** Which Nexora services were delivered in this engagement */
  servicesSlugs: ServiceSlug[];
  /** Full tech stack used — powers the tag cloud on the detail page */
  techStack: TechItem[];

  // ── Results ───────────────────────────────────────────────────────────────
  /**
   * Before/After performance metrics.
   * Minimum 2 entries — must be specific and quantified.
   * e.g. "Page load time: 3.8s → 900ms (↓ 76%)"
   */
  metrics: Metric[];
  /**
   * Client quote block — must be a real, attributed quote.
   * Displayed in the testimonial callout on the detail page.
   */
  testimonial?: Testimonial;

  // ── Structured content blocks ─────────────────────────────────────────────
  /**
   * AEO-optimised FAQ block for this case study.
   * Example questions: "What was the biggest challenge?", "How long did it take?"
   * Minimum 3 entries.
   */
  faqs?: FAQ[];

  // ── Industry & category ───────────────────────────────────────────────────
  industry: CaseStudyIndustry;
  /**
   * Free-form tag array for filtering — e.g. ["fintech", "dashboard", "react"].
   * Lowercase, hyphenated, no duplicates.
   */
  tags: string[];

  // ── Media ─────────────────────────────────────────────────────────────────
  /** Hero image for /work/[slug] and OG — 16:9, min 1200 × 675 px */
  coverImageUrl: string;
  /** Alt text for coverImage */
  coverImageAlt: string;
  /**
   * Additional screenshots / mockups shown in the image gallery.
   * Each entry may include a caption.
   */
  gallery?: CaseStudyGalleryItem[];

  // ── Cross-references ──────────────────────────────────────────────────────
  /**
   * Other case studies to suggest in the "More work" strip.
   * Auto-derived at runtime if empty.
   */
  relatedCaseStudySlugs?: string[];

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  status:    PublishStatus;
  /** Controls display order in grids — lower = first (featured first) */
  sortOrder: number;
  /** Pin to homepage "Featured Work" section */
  isFeatured: boolean;

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: SEOMetadata;
}

// ─── Supporting types ─────────────────────────────────────────────────────────

export interface CaseStudyClient {
  /** Company name — e.g. "Acme Financial" */
  name: string;
  /**
   * Industry-facing description — e.g. "London-based fintech startup".
   * Used in the testimonial attribution and meta copy.
   */
  description: string;
  /** Logo URL — SVG preferred; min 200 px wide on transparent background */
  logoUrl?: string;
  /** Alt text for logo */
  logoAlt?: string;
  /** Client website URL — shown as an outbound link on the detail page */
  websiteUrl?: string;
  /** Client's country for geo-display — e.g. "United Kingdom" */
  country?: string;
}

export interface CaseStudyGalleryItem {
  url: string;
  alt: string;
  /** Optional description shown below the image */
  caption?: string;
}

export type CaseStudyIndustry =
  | "fintech"
  | "healthtech"
  | "ecommerce"
  | "saas"
  | "logistics"
  | "education"
  | "media"
  | "real-estate"
  | "non-profit"
  | "government"
  | "enterprise"
  | "startup"
  | "other";

// ─── Projection types ────────────────────────────────────────────────────────

/**
 * Lightweight projection for /work grid cards.
 * Excludes long copy, metrics details, and gallery.
 */
export type CaseStudySummary = Pick<
  CaseStudy,
  | "id"
  | "slug"
  | "title"
  | "tagline"
  | "excerpt"
  | "client"
  | "servicesSlugs"
  | "industry"
  | "tags"
  | "coverImageUrl"
  | "coverImageAlt"
  | "isFeatured"
  | "sortOrder"
>;

/**
 * Minimal projection used in service page "Related Work" pills.
 */
export type CaseStudyReference = Pick<
  CaseStudy,
  "slug" | "title" | "tagline" | "coverImageUrl" | "coverImageAlt"
>;

// ─── Validation helpers ───────────────────────────────────────────────────────

export function isCaseStudy(value: unknown): value is CaseStudy {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "title" in value &&
    "metrics" in value &&
    "client" in value
  );
}

export function assertNonEmptyCaseStudies(
  caseStudies: CaseStudy[],
): asserts caseStudies is [CaseStudy, ...CaseStudy[]] {
  if (caseStudies.length === 0) {
    throw new Error("Case studies array must not be empty");
  }
}
