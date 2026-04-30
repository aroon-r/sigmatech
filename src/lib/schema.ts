/**
 * JSON-LD Schema.org generators
 *
 * Usage in a Server Component:
 *   import { orgSchema, websiteSchema } from "@/lib/schema";
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }} />
 *
 * All generators return plain objects — JSON.stringify before injecting.
 */

import { BASE_URL, SITE_NAME } from "./metadata";

// ─── Shared reference objects ──────────────────────────────────────────────────

const organizationRef = {
  "@type": "Organization",
  name:     SITE_NAME,
  url:      BASE_URL,
} as const;

const logoRef = {
  "@type": "ImageObject",
  url:      `${BASE_URL}/logo.png`,
  width:    200,
  height:   200,
} as const;

// ─── Organization ─────────────────────────────────────────────────────────────

export function orgSchema() {
  return {
    "@context":    "https://schema.org",
    "@type":       ["Organization", "LocalBusiness"],
    name:          SITE_NAME,
    url:           BASE_URL,
    logo:          logoRef,
    image:         `${BASE_URL}/og-image.jpg`,
    description:
      "SigmaTech builds high-performance software products and digital experiences for forward-thinking companies.",
    foundingDate:  "2020",
    areaServed:    "Worldwide",
    priceRange:    "££",
    sameAs: [
      "https://linkedin.com/company/sigmatech",
      "https://github.com/sigmatech",
      "https://twitter.com/sigmatech",
    ],
    contactPoint: [
      {
        "@type":           "ContactPoint",
        contactType:       "customer service",
        email:             "hello@sigmatech.co.uk",
        availableLanguage: "English",
        areaServed:        "Worldwide",
      },
      {
        "@type":           "ContactPoint",
        contactType:       "sales",
        email:             "hello@sigmatech.co.uk",
        availableLanguage: "English",
        areaServed:        "Worldwide",
      },
    ],
    knowsAbout: [
      "Software Development",
      "Web Application Development",
      "Cloud Computing",
      "DevOps",
      "QA Testing",
      "UI/UX Design",
      "Technology Consulting",
      "Staff Augmentation",
      "Next.js",
      "TypeScript",
      "React",
      "AWS",
    ],
  };
}

// ─── WebSite + SiteLinksSearchBox ─────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "WebSite",
    name:       SITE_NAME,
    url:        BASE_URL,
    potentialAction: {
      "@type":  "SearchAction",
      target: {
        "@type":      "EntryPoint",
        urlTemplate:  `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

interface ServiceSchemaOptions {
  name:         string;
  description:  string;
  slug:         string;
  deliverables: string[];
}

export function serviceSchema({
  name,
  description,
  slug,
  deliverables,
}: ServiceSchemaOptions) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Service",
    name,
    description,
    url:          `${BASE_URL}/services/${slug}`,
    provider:     organizationRef,
    serviceType:  name,
    areaServed:   "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:    `${name} Deliverables`,
      itemListElement: deliverables.map((item) => ({
        "@type": "Offer",
        name:    item,
      })),
    },
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer:   string;
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context":  "https://schema.org",
    "@type":     "FAQPage",
    mainEntity:  faqs.map(({ question, answer }) => ({
      "@type":  "Question",
      name:      question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    answer,
      },
    })),
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export interface Crumb {
  name: string;
  path: string; // relative, e.g. "/services"
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context":      "https://schema.org",
    "@type":         "BreadcrumbList",
    itemListElement: [
      // Home is always position 1
      {
        "@type":   "ListItem",
        position:  1,
        name:      "Home",
        item:      BASE_URL,
      },
      ...crumbs.map((crumb, i) => ({
        "@type":   "ListItem",
        position:  i + 2,
        name:      crumb.name,
        item:      `${BASE_URL}${crumb.path}`,
      })),
    ],
  };
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────

interface BlogPostingSchemaOptions {
  title:       string;
  slug:        string;
  excerpt:     string;
  authorName:  string;
  publishedAt: string; // ISO 8601
  modifiedAt:  string; // ISO 8601
  ogImage:     string;
  keywords:    string[];
}

export function blogPostingSchema({
  title,
  slug,
  excerpt,
  authorName,
  publishedAt,
  modifiedAt,
  ogImage,
  keywords,
}: BlogPostingSchemaOptions) {
  const url = `${BASE_URL}/blog/${slug}`;
  return {
    "@context":  "https://schema.org",
    "@type":     "BlogPosting",
    headline:    title,
    description: excerpt,
    url,
    image:       ogImage,
    keywords:    keywords.join(", "),
    datePublished: publishedAt,
    dateModified:  modifiedAt,
    author: {
      "@type": "Person",
      name:    authorName,
      url:     `${BASE_URL}/about`,
    },
    publisher: {
      ...organizationRef,
      logo: logoRef,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   url,
    },
  };
}

// ─── CreativeWork (Case Study) ────────────────────────────────────────────────

interface CaseStudySchemaOptions {
  title:     string;
  slug:      string;
  excerpt:   string;
  industry:  string;
  ogImage:   string;
}

export function caseStudySchema({
  title,
  slug,
  excerpt,
  industry,
  ogImage,
}: CaseStudySchemaOptions) {
  return {
    "@context":  "https://schema.org",
    "@type":     "CreativeWork",
    name:        title,
    description: excerpt,
    url:         `${BASE_URL}/work/${slug}`,
    image:       ogImage,
    genre:       industry,
    author:      organizationRef,
    publisher:   organizationRef,
  };
}

// ─── Person (Team member — About page) ───────────────────────────────────────

interface PersonSchemaOptions {
  name:        string;
  jobTitle:    string;
  description: string;
  linkedIn?:   string;
  image?:      string;
}

export function personSchema({
  name,
  jobTitle,
  description,
  linkedIn,
  image,
}: PersonSchemaOptions) {
  return {
    "@context":  "https://schema.org",
    "@type":     "Person",
    name,
    jobTitle,
    description,
    worksFor:    organizationRef,
    url:         `${BASE_URL}/about`,
    ...(image    && { image }),
    ...(linkedIn && { sameAs: [linkedIn] }),
  };
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "ContactPage",
    name:       `Contact ${SITE_NAME}`,
    url:        `${BASE_URL}/contact`,
    description:
      "Start a project with SigmaTech. Fill in our 60-second form and we'll be in touch within one business day.",
    mainEntity: {
      "@type":           "ContactPoint",
      contactType:       "customer service",
      email:             "hello@sigmatech.co.uk",
      availableLanguage: "English",
    },
  };
}

// JsonLd component lives in src/components/ui/JsonLd.tsx (requires .tsx extension for JSX)
