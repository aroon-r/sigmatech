import type { Metadata } from "next";

export const BASE_URL    = "https://nexora.dev";
export const SITE_NAME   = "Nexora";
const DEFAULT_OG_IMAGE   = "/og/default.png";

// ─── Factory ──────────────────────────────────────────────────────────────────

interface MetadataOptions {
  title:        string;
  description:  string;
  path:         string;
  ogImage?:     string;
  keywords?:    string[];
  noIndex?:     boolean;
  type?:        "website" | "article";
  publishedAt?: string;   // ISO 8601
  modifiedAt?:  string;   // ISO 8601
  authors?:     string[];
}

export function createMetadata({
  title,
  description,
  path,
  ogImage     = DEFAULT_OG_IMAGE,
  keywords    = [],
  noIndex     = false,
  type        = "website",
  publishedAt,
  modifiedAt,
  authors,
}: MetadataOptions): Metadata {
  const url       = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    ...(authors && { authors: authors.map((name) => ({ name })) }),
    metadataBase: new URL(BASE_URL),
    alternates:   { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index:              true,
          follow:             true,
          "max-snippet":      -1,
          "max-image-preview":"large",
          "max-video-preview":-1,
        },
    openGraph: {
      title:    fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale:   "en_US",
      images:   [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt  && { modifiedTime:  modifiedAt  }),
    },
    twitter: {
      card:        "summary_large_image",
      title:       fullTitle,
      description,
      images:      [ogImage],
    },
  };
}

// ─── Pre-built page metadata ───────────────────────────────────────────────────

export const PAGE_METADATA = {
  home: createMetadata({
    title:       "Modern Software Solutions",
    description: "Nexora is a small engineering team that scopes in writing, deploys to staging early, and hands over code your team can own. Web apps, APIs, DevOps, and design.",
    path:        "/",
    keywords:    [
      "custom software development company",
      "software development agency",
      "web application development",
      "software development services",
    ],
  }),

  services: createMetadata({
    title:       "Software Development Services",
    description: "Full-cycle software services: web development, cloud & DevOps, QA testing, UI/UX design, tech consulting, and staff augmentation.",
    path:        "/services",
    keywords:    [
      "software development services",
      "IT services company",
      "full stack development",
      "software consulting",
    ],
  }),

  work: createMetadata({
    title:       "Our Work — Case Studies",
    description: "Real projects, measurable outcomes. See how Nexora delivers software that moves the needle for ambitious companies.",
    path:        "/work",
    keywords:    [
      "software development portfolio",
      "web development case studies",
      "software development examples",
    ],
  }),

  about: createMetadata({
    title:       "About Nexora",
    description: "Meet the Nexora team — senior engineers and delivery specialists committed to craft, transparency, and measurable results.",
    path:        "/about",
    keywords:    [
      "about Nexora",
      "software development team",
      "tech company",
    ],
  }),

  blog: createMetadata({
    title:       "Blog — Engineering Insights",
    description: "Engineering insights, product thinking, and software craft from the Nexora team.",
    path:        "/blog",
    keywords:    [
      "software development blog",
      "web development insights",
      "engineering blog",
    ],
  }),

  contact: createMetadata({
    title:       "Start a Project",
    description: "Start a project with Nexora. Fill in our 60-second form and we'll be in touch within one business day.",
    path:        "/contact",
    keywords:    [
      "contact software development company",
      "hire software developers",
      "software development quote",
    ],
  }),
} as const;

// ─── Dynamic metadata builders ────────────────────────────────────────────────

interface ServiceMetaOptions {
  name:        string;
  slug:        string;
  description: string;
  keywords:    string[];
}

export function createServiceMetadata({
  name,
  slug,
  description,
  keywords,
}: ServiceMetaOptions): Metadata {
  return createMetadata({
    title:      `${name} Services`,
    description,
    path:       `/services/${slug}`,
    keywords,
  });
}

interface BlogMetaOptions {
  title:       string;
  slug:        string;
  excerpt:     string;
  keywords:    string[];
  author:      string;
  publishedAt: string;
  modifiedAt?: string;
  ogImage?:    string;
}

export function createBlogMetadata({
  title,
  slug,
  excerpt,
  keywords,
  author,
  publishedAt,
  modifiedAt,
  ogImage,
}: BlogMetaOptions): Metadata {
  return createMetadata({
    title,
    description: excerpt,
    path:        `/blog/${slug}`,
    keywords,
    type:        "article",
    publishedAt,
    modifiedAt:  modifiedAt ?? publishedAt,
    authors:     [author],
    ogImage,
  });
}

interface CaseStudyMetaOptions {
  title:       string;
  slug:        string;
  excerpt:     string;
  industry:    string;
  ogImage?:    string;
}

export function createCaseStudyMetadata({
  title,
  slug,
  excerpt,
  industry,
  ogImage,
}: CaseStudyMetaOptions): Metadata {
  return createMetadata({
    title,
    description: excerpt,
    path:        `/work/${slug}`,
    keywords:    [industry, "case study", "software development"],
    ogImage,
  });
}
