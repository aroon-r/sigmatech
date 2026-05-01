import type {
  ID,
  ISODateString,
  Timestamps,
  PublishStatus,
  SEOMetadata,
} from "./shared";

// ─── Author ───────────────────────────────────────────────────────────────────

export interface Author {
  id:          ID;
  /** Display name — First + Last */
  name:        string;
  /** Short bio for the author card — max 2 sentences */
  bio:         string;
  /** Designation at Nexora — e.g. "Software Tester", "Front End Developer" */
  designation: string;
  /** Avatar — 200 × 200 px minimum, square crop */
  avatarUrl?:  string;
  linkedinUrl?: string;
  twitterUrl?:  string;
  /** Personal or profile page URL */
  websiteUrl?:  string;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface BlogCategory {
  id:          ID;
  /** URL-safe slug — e.g. "engineering", "design", "product" */
  slug:        string;
  /** Display name — e.g. "Engineering", "Design Thinking" */
  name:        string;
  /** One-sentence description for the /blog/[category] page header */
  description: string;
  /** Hex accent colour for the category pill — should pass WCAG AA on charcoal-900 */
  color?:      string;
}

export type BlogCategorySlug =
  | "engineering"
  | "design"
  | "cloud-devops"
  | "product"
  | "company-news"
  | "tutorials"
  | "case-studies"
  | "ai-ml";

// ─── Core entity ──────────────────────────────────────────────────────────────

export interface BlogPost extends Timestamps {
  // ── Identity ──────────────────────────────────────────────────────────────
  id:   ID;
  slug: string;

  // ── Display content ───────────────────────────────────────────────────────
  /** H1 and Open Graph title — target 50–60 characters */
  title: string;
  /**
   * 2–3 sentence hook for list cards, RSS feeds, and email digests.
   * Should answer "why should I read this?" — not just describe the content.
   */
  excerpt: string;
  /**
   * Full article body in MDX (Phase 1: stored as Markdown string).
   * Must open with a definition-first paragraph (AEO rule).
   * Aim for 1,200–2,000 words for primary keyword ranking.
   */
  body: string;

  // ── Authorship & dates ────────────────────────────────────────────────────
  author:      Author;
  /**
   * ISO 8601 datetime of first publication.
   * Exposed in JSON-LD `datePublished` and `<time>` elements.
   */
  publishedAt: ISODateString;
  /**
   * ISO 8601 datetime of last material edit.
   * Triggers "Updated on …" UI label and JSON-LD `dateModified`.
   * Must be set whenever substantive content changes — not for typo fixes.
   */
  updatedAt:   ISODateString;

  // ── Taxonomy ──────────────────────────────────────────────────────────────
  category:    BlogCategorySlug;
  /**
   * Free-form tag array — lowercase, hyphenated, no duplicates.
   * e.g. ["react", "performance", "core-web-vitals"]
   * Used for related-post recommendations and filtering.
   */
  tags: string[];

  // ── Media ─────────────────────────────────────────────────────────────────
  /** Cover image for the post card and OG image — 16:9, min 1200 × 675 px */
  coverImageUrl: string;
  /** Alt text for cover image */
  coverImageAlt: string;

  // ── Reading metadata ──────────────────────────────────────────────────────
  /**
   * Estimated read time in minutes.
   * Calculated at write time: word count ÷ 238 (avg reading speed).
   */
  readingTimeMinutes: number;

  // ── Structured content ────────────────────────────────────────────────────
  /**
   * Table of contents entries — populated from H2/H3 headings in `body`.
   * Used to render the sticky sidebar ToC on the detail page.
   */
  tableOfContents?: TocEntry[];

  // ── Cross-references ──────────────────────────────────────────────────────
  /**
   * Slugs of related blog posts shown in "You may also like".
   * Auto-derived from shared tags at runtime if empty.
   */
  relatedPostSlugs?: string[];
  /**
   * Slugs of services this post relates to — powers the
   * "Explore our [service]" CTA at the end of the post.
   */
  relatedServiceSlugs?: string[];

  // ── External links ────────────────────────────────────────────────────────
  /**
   * Canonical URL override — set when this post was originally published
   * on an external platform (e.g. dev.to, Medium) and cross-posted here.
   * Prevents duplicate-content penalties.
   */
  canonicalUrl?: string;

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  status:     PublishStatus;
  /** Pin to /blog homepage featured slot */
  isFeatured: boolean;
  /** Exclude from RSS feed — for internal/announcement posts */
  noRss:      boolean;

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: SEOMetadata;
}

// ─── Supporting types ─────────────────────────────────────────────────────────

export interface TocEntry {
  /** H2 or H3 heading text */
  title: string;
  /** URL fragment without the # — derived from heading text */
  anchor: string;
  level:  2 | 3;
  children?: TocEntry[];
}

// ─── Projection types ────────────────────────────────────────────────────────

/**
 * Lightweight projection for /blog listing cards and RSS feed.
 */
export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "author"
  | "publishedAt"
  | "updatedAt"
  | "category"
  | "tags"
  | "coverImageUrl"
  | "coverImageAlt"
  | "readingTimeMinutes"
  | "isFeatured"
>;

/**
 * Minimal projection for "Related posts" strips.
 */
export type BlogPostReference = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "excerpt"
  | "coverImageUrl"
  | "coverImageAlt"
  | "publishedAt"
  | "readingTimeMinutes"
>;

// ─── Validation helpers ───────────────────────────────────────────────────────

export function isBlogPost(value: unknown): value is BlogPost {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "title" in value &&
    "publishedAt" in value &&
    "author" in value
  );
}

export function isAuthor(value: unknown): value is Author {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "bio" in value &&
    "designation" in value
  );
}
