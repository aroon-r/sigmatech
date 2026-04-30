# Step 13 — Database Design & Schema Specification

**Status:** ✅ Approved  
**Phase:** 1 (Static files) → Phase 2 (Sanity CMS)  
**Location:** `src/data/schemas/`

---

## Overview

All data in Phase 1 lives in typed TypeScript constant files (`src/data/*.ts`). There is no runtime database — all content is compiled into the Next.js static build at `next build`. This approach gives zero-latency data access, zero hosting cost for a DB, and full type safety end-to-end.

The TypeScript interfaces in `src/data/schemas/` are designed to be **Sanity-ready** — every field name and type maps 1-to-1 to a Sanity schema field, so the Phase 2 CMS migration requires zero changes to page components or data access patterns.

---

## Entity Relationship Overview

```
Service ──────────────────────────┐
  │ relatedCaseStudySlugs[]        │
  │                                ▼
  └──────────────────── CaseStudy (many-to-many via slug arrays)
                            │ servicesSlugs[]
                            │
BlogPost ─── Author          └──── Service
  │  ─── BlogCategory
  │  relatedServiceSlugs[]
  │
ContactSubmission ─── ServiceSlug[]
```

All cross-references use **slug strings** (not foreign-key IDs). This keeps static data human-readable and git-diffable. In Phase 2, Sanity's `reference` type is used instead, but the resolved slug is still the primary routing key.

---

## Schema Files

| File | Entity | Lines |
|------|--------|-------|
| `shared.ts` | Primitives, enums, base interfaces | ~168 |
| `service.schema.ts` | `Service`, `ServiceSummary`, `ServiceReference` | ~159 |
| `caseStudy.schema.ts` | `CaseStudy`, `CaseStudyClient`, `CaseStudySummary` | ~175 |
| `blog.schema.ts` | `BlogPost`, `Author`, `BlogCategory`, `TocEntry` | ~185 |
| `contact.schema.ts` | `ContactFormInput`, `ContactSubmission`, enums | ~190 |
| `index.ts` | Barrel export | ~10 |

---

## Entity Specifications

### 1. Service

**Purpose:** Represents a SigmaTech service offering. Drives the `/services` listing and every `/services/[slug]` detail page.

**Key design decisions:**
- `ServiceSlug` is a discriminated union — adding a new service requires updating the union type AND `generateStaticParams()`. This intentional coupling prevents orphaned pages.
- `deliverables`, `stats`, `faqs`, and `techStack` are structured arrays — never raw Markdown blobs — so they can be rendered as semantic HTML (lists, definition groups, FAQPage JSON-LD) without client-side parsing.
- `sortOrder: number` gives editorial control over grid display order without needing drag-and-drop in Phase 1.
- `relatedServiceSlugs` defaults to auto-derived at runtime (remaining 5 services); an explicit list overrides this for curated cross-linking.

**Projection types:**

| Type | Used in | Drops |
|------|---------|-------|
| `ServiceSummary` | `/services` grid, homepage strip | `longDescription`, `faqs`, `techStack`, `seo` |
| `ServiceReference` | Nav megamenu, cross-ref pills | Everything except `slug`, `name`, `icon` |

---

### 2. CaseStudy

**Purpose:** Represents a completed client engagement. Drives `/work` and `/work/[slug]`.

**Key design decisions:**
- `metrics: Metric[]` (min 2 entries) enforces quantified Before/After results on every case study — prevents vague "improved performance" copy.
- `isFeatured: boolean` controls pinning to the homepage "Featured Work" 3-up section without a separate data structure.
- `industry: CaseStudyIndustry` enum drives the filter bar on `/work` — all values are hardcoded to prevent typo-driven filter breakage.
- `gallery?: CaseStudyGalleryItem[]` is optional so early case studies can ship without a full photo shoot.
- `testimonial?: Testimonial` is optional at the schema level but required by the content brief — the TypeScript optional is deliberate so placeholder entries can be published and filled later.

**Projection types:**

| Type | Used in | Drops |
|------|---------|-------|
| `CaseStudySummary` | `/work` grid, homepage strip | `body`, `metrics`, `faqs`, `gallery`, `seo` |
| `CaseStudyReference` | Service page "Related Work" pills | Most fields — just enough to render a card link |

---

### 3. BlogPost + Author + BlogCategory

**Purpose:** Drives `/blog`, `/blog/[slug]`, and `/blog/category/[category]`.

**Key design decisions:**
- `Author` is a standalone interface (not embedded) because SigmaTech has a fixed set of authors — they will be deduplicated in a separate `src/data/authors.ts` file and referenced by ID in blog posts.
- `BlogCategory` is backed by the `BlogCategorySlug` enum — same pattern as `ServiceSlug`. Adding a category requires updating the enum and adding a route.
- `readingTimeMinutes` is explicitly stored (not computed at render time) — avoids per-request computation and keeps it consistent between the listing card and the detail page header.
- `tableOfContents?: TocEntry[]` is pre-computed at content authoring time — not derived from raw Markdown at render time — keeping RSCs simple and avoiding a Markdown parser dependency on the server.
- `noRss: boolean` allows announcement posts to be excluded from the RSS feed without unpublishing them.

**Projection types:**

| Type | Used in | Drops |
|------|---------|-------|
| `BlogPostSummary` | `/blog` listing, RSS feed, homepage strip | `body`, `tableOfContents`, `seo` |
| `BlogPostReference` | "Related posts" strips | Most fields — just enough for a card |

---

### 4. ContactSubmission

**Purpose:** Stores inbound leads from the contact form. Not rendered as a page — consumed by the internal CRM workflow.

**Two-layer model:**

```
Browser                   API Route (/api/contact)           Data Store
──────────────────────    ───────────────────────────────    ──────────
ContactFormInput  ──────► Zod validate                  ──► ContactSubmission
(what user fills)         ↓ strip honeypot               
                          server-stamp: id, receivedAt,
                          visitorCountry, ipHash, isSpam
```

**Key design decisions:**
- `ContactFormInput` is the Zod-validated DTO — the only thing that ever crosses the network.
- `ContactSubmission` adds all server-stamped fields. The client never sees `ipHash`, `honeypotValue`, or `internalNotes` — enforced by `ContactSubmissionPublic` projection type.
- `privacyConsent: z.literal(true)` in the Zod schema means the boolean can only ever be `true` when validation passes — the form cannot be submitted with a false consent value even if the JS is manipulated.
- `LeadStatus` enum models the full sales lifecycle so SigmaTech can track conversion rate by stage without a separate CRM in Phase 1.
- `isSpam: boolean` uses server-side heuristics (honeypot, rate limiting, content analysis) — not client-side bot detection — preventing bypass by disabling JS.

---

## Validation Layer

**File:** `src/lib/validations.ts`  
**Library:** Zod v3

The Zod schema (`contactFormSchema`) is the **single source of truth for API validation**. It is imported by:
1. The API route (`/api/contact/route.ts`) — server-side parse + `.safeParse()`
2. The `ContactForm` client component — for real-time field validation via `react-hook-form` + `zodResolver`

A compile-time assertion (`_AssertCompatible`) ensures the Zod-inferred type stays compatible with the `ContactFormInput` TypeScript interface.

---

## Phase 2 Migration Path (Sanity CMS)

The migration from static files to Sanity CMS is designed to require **zero changes to page components**.

```
Phase 1 (static)            Phase 2 (Sanity)
──────────────────────────  ──────────────────────────
src/data/services.ts        sanity.io/desk → Services
  → import { SERVICES }       → client.fetch(groq`*[_type == "service"]`)
  → type: Service[]            → type: Service[] (same interface)

src/data/caseStudies.ts     → client.fetch(groq`*[_type == "caseStudy"]`)
src/data/blog.ts            → client.fetch(groq`*[_type == "blogPost"]`)
```

**Migration checklist:**
- [ ] Install `@sanity/client` and `next-sanity`
- [ ] Create Sanity schemas mirroring `service.schema.ts`, `caseStudy.schema.ts`, `blog.schema.ts`
- [ ] Swap static import for GROQ query in each `getData()` function
- [ ] Add `revalidate = 60` ISR to dynamic routes
- [ ] Update `next.config.mjs` `remotePatterns` with Sanity CDN hostname
- [ ] Move `ContactSubmission` storage from local JSON file to Sanity (or keep in Resend + external CRM)

---

## Static Data Files (Phase 1)

The following files will be populated in Step 14 (Content Population):

| File | Type | Count |
|------|------|-------|
| `src/data/services.ts` | `Service[]` | 6 entries (one per `ServiceSlug`) |
| `src/data/caseStudies.ts` | `CaseStudy[]` | 3–5 entries |
| `src/data/blog.ts` | `BlogPost[]` | 2–3 seed posts |
| `src/data/authors.ts` | `Author[]` | 2–3 SigmaTech team members |
| `src/data/team.ts` | `TeamMember[]` | ~6 entries for the /about page |
