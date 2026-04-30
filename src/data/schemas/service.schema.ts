import type {
  ID,
  ISODateString,
  Timestamps,
  PublishStatus,
  SEOMetadata,
  ServiceSlug,
  TechItem,
  Metric,
  Testimonial,
  Deliverable,
  FAQ,
} from "./shared";

// ─── Core entity ──────────────────────────────────────────────────────────────

export interface Service extends Timestamps {
  // ── Identity ──────────────────────────────────────────────────────────────
  id:   ID;
  slug: ServiceSlug;

  // ── Display content ───────────────────────────────────────────────────────
  /** Short display name — e.g. "Web & App Development" */
  name: string;
  /** One-line hook shown in nav and service strip cards — max 8 words */
  tagline: string;
  /**
   * Lucide React icon component name — e.g. "Code2", "Cloud", "ShieldCheck".
   * Stored as a string key; resolved to the component at render time.
   */
  icon: string;
  /** 2–3 sentence overview for service grid cards */
  description: string;
  /**
   * Full page copy for /services/[slug] overview split section.
   * Supports Markdown. Must open with a definition-first paragraph (AEO rule).
   */
  longDescription: string;

  // ── Structured content blocks ─────────────────────────────────────────────
  /** Checklist of concrete deliverables — shown on /services/[slug] */
  deliverables: Deliverable[];
  /** 2–3 quantified statistics shown alongside the overview copy */
  stats: ServiceStat[];
  /** AEO-optimised FAQ block — minimum 4 entries per service */
  faqs: FAQ[];

  // ── Tech stack for this service ───────────────────────────────────────────
  /** Primary technologies used to deliver this service */
  techStack: TechItem[];

  // ── Cross-references ──────────────────────────────────────────────────────
  /** Slugs of case studies that used this service — displayed in Related Work */
  relatedCaseStudySlugs: string[];
  /**
   * Other services to suggest in the "Explore what else we do" strip.
   * Auto-derived at runtime if empty — explicit list overrides the default.
   */
  relatedServiceSlugs: ServiceSlug[];

  // ── Media ─────────────────────────────────────────────────────────────────
  /** Hero / OG image for /services/[slug] — 16:9, min 1200 × 675 px */
  coverImageUrl?: string;
  /** Alt text for coverImage — required if coverImageUrl is set */
  coverImageAlt?: string;

  // ── CTA copy variant ──────────────────────────────────────────────────────
  /**
   * CTA Band headline override for this service page.
   * Falls back to global default if not set.
   */
  ctaHeadline?: string;
  ctaSubheadline?: string;

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  status:    PublishStatus;
  isActive:  boolean;
  /** Controls display order in grids — lower = first */
  sortOrder: number;

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: SEOMetadata;
}

// ─── Supporting types ─────────────────────────────────────────────────────────

export interface ServiceStat {
  /** Display value — e.g. "50+", "99.9%", "< 2s" */
  value: string;
  /** Label below the value — e.g. "Projects delivered", "Uptime SLA" */
  label: string;
}

// ─── Projection types (subsets for listing views) ────────────────────────────

/**
 * Lightweight projection used on the /services overview page and homepage strip.
 * Contains only what's needed to render a service card — no long copy.
 */
export type ServiceSummary = Pick<
  Service,
  | "id"
  | "slug"
  | "name"
  | "tagline"
  | "icon"
  | "description"
  | "deliverables"
  | "sortOrder"
  | "isActive"
>;

/**
 * Minimal projection used in cross-reference pills and navigation.
 */
export type ServiceReference = Pick<Service, "slug" | "name" | "icon">;

// ─── Validation helpers ───────────────────────────────────────────────────────

/** Runtime guard — narrows unknown to Service */
export function isService(value: unknown): value is Service {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "name" in value &&
    "deliverables" in value
  );
}

/** Asserts a service array is non-empty before rendering a grid */
export function assertNonEmptyServices(
  services: Service[],
): asserts services is [Service, ...Service[]] {
  if (services.length === 0) {
    throw new Error("Services array must not be empty");
  }
}

// ─── CMS field map (Phase 2 reference) ───────────────────────────────────────
/**
 * When migrating to Sanity CMS in Phase 2, the Sanity schema will mirror
 * this interface. Field names here should match Sanity field names 1:1
 * to allow a clean migration with no page-level component changes.
 *
 * Sanity type → TypeScript type mapping:
 *   string           → string
 *   text             → string (multiline)
 *   array of blocks  → string (serialised Markdown / Portable Text)
 *   reference        → ID (resolved to full object in fetch)
 *   image            → { url: string; alt: string }
 *   boolean          → boolean
 *   number           → number
 *   object           → interface
 */
export type ServiceCMSFieldMap = {
  [K in keyof Omit<Service, keyof Timestamps>]: K;
};
