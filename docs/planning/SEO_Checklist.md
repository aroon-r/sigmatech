# Step 11 — SEO & AEO Strategy
**Project:** nexora Website Revamp
**Date:** 2026-04-25
**Status:** Approved — Pending Client Sign-off

---

## Table of Contents

1. [SEO Philosophy](#1-seo-philosophy)
2. [Keyword Map](#2-keyword-map)
3. [Technical SEO Plan](#3-technical-seo-plan)
4. [AEO Strategy](#4-aeo-answer-engine-optimization)
5. [Schema.org Implementation](#5-schemaorg-implementation)
6. [Internal Linking Strategy](#6-internal-linking-strategy)
7. [Pre-Launch Checklist](#7-pre-launch-checklist)
8. [Post-Launch Monitoring](#8-post-launch-monitoring)

---

## 1. SEO Philosophy

nexora's SEO strategy is built on three non-negotiable principles:

**1. Performance IS SEO.** Google's Core Web Vitals are a confirmed ranking factor. Our 95+ Lighthouse target is not a vanity metric — it directly determines where we rank. A slow site cannot be SEO-optimised.

**2. Authority through specificity.** We do not chase broad keywords ("software"). We own specific, high-intent queries where a qualified prospect is one click from a discovery call ("Next.js development agency for SaaS").

**3. AEO is the next frontier.** By 2026, a significant share of B2B research happens via AI assistants. LLMs (Claude, ChatGPT, Gemini, Perplexity) answer questions from training data and RAG-indexed web content. nexora must be represented correctly in those answers. This requires structured data, entity clarity, and definitive factual content — not just keyword density.

---

## 2. Keyword Map

### Search Intent Classification

| Intent | Type | Target on nexora |
|---|---|---|
| **Transactional** | Ready to hire / contact | Contact, Services pages |
| **Commercial** | Evaluating options | Case Studies, About, Services |
| **Informational** | Research phase | Blog, FAQ sections |
| **Navigational** | Looking for nexora specifically | Home, About |

---

### Page 1 — Home `/`

**Target persona:** CEO / CTO evaluating software partners
**Search intent:** Commercial investigation + Transactional

| Type | Keyword | Monthly Est. Vol. | Competition |
|---|---|---|---|
| Primary | `custom software development company` | 4,400 | High |
| Primary | `software development agency` | 2,900 | High |
| Secondary | `software development services` | 8,100 | High |
| Secondary | `hire software developers` | 1,600 | Medium |
| Long-tail | `custom software development company for startups` | 260 | Low |
| Long-tail | `agile software development agency` | 480 | Medium |
| Long-tail | `Next.js development agency` | 390 | Low |
| Brand | `nexora` | — | None |

**On-page target:** H1 contains primary keyword naturally. Meta description under 155 chars with a CTA verb.

---

### Page 2 — Services `/services`

**Target persona:** PM confirming capability fit
**Search intent:** Commercial investigation

| Type | Keyword | Monthly Est. Vol. | Competition |
|---|---|---|---|
| Primary | `software development services` | 8,100 | High |
| Primary | `IT services company` | 1,300 | Medium |
| Secondary | `full stack development services` | 1,900 | Medium |
| Secondary | `end to end software development` | 720 | Medium |
| Long-tail | `software development and testing services` | 210 | Low |
| Long-tail | `software development consulting services` | 390 | Low |

#### Service Sub-pages

| Sub-page | Primary Keyword | Secondary Keywords |
|---|---|---|
| `/services/web-development` | `custom web development services` | `Next.js development company`, `React development agency`, `TypeScript developers` |
| `/services/cloud-solutions` | `cloud solutions company` | `AWS infrastructure services`, `DevOps consulting`, `CI/CD pipeline setup` |
| `/services/qa-testing` | `QA testing services` | `software quality assurance company`, `automated testing services`, `QA outsourcing` |
| `/services/ui-ux-design` | `UI UX design agency` | `product design services`, `web design company`, `user experience design` |
| `/services/consulting` | `technology consulting services` | `software architecture consulting`, `CTO advisory services`, `tech strategy consulting` |
| `/services/staff-augmentation` | `IT staff augmentation` | `dedicated development team`, `hire remote developers`, `software team extension` |

---

### Page 3 — Case Studies `/work`

**Target persona:** CEO validating proof of delivery
**Search intent:** Commercial investigation

| Type | Keyword | Monthly Est. Vol. | Competition |
|---|---|---|---|
| Primary | `software development portfolio` | 880 | Low |
| Primary | `web development case studies` | 480 | Low |
| Secondary | `software development examples` | 390 | Low |
| Secondary | `software company portfolio` | 260 | Low |
| Long-tail | `custom web application development case study` | 110 | Very Low |
| Long-tail | `SaaS development portfolio` | 140 | Low |

> **Note:** Individual case study pages (`/work/[slug]`) should target industry + outcome keywords: e.g., `"e-commerce performance optimisation case study"`, `"fintech web app development"`.

---

### Page 4 — About `/about`

**Target persona:** All personas — trust validation stage
**Search intent:** Navigational + Commercial

| Type | Keyword | Monthly Est. Vol. | Competition |
|---|---|---|---|
| Primary | `about nexora` | Brand | None |
| Primary | `software development company team` | 390 | Low |
| Secondary | `tech company culture` | 880 | Medium |
| Secondary | `senior software developers` | 1,300 | Medium |
| Long-tail | `boutique software development company` | 170 | Low |

---

### Page 5 — Blog `/blog`

**Target persona:** All personas — early research / expertise stage
**Search intent:** Informational

**Blog content pillars with keyword targets:**

| Pillar | Target Query Pattern | Example Article Target |
|---|---|---|
| Engineering Craft | `"how to [technical task]"`, `"[framework] best practices"` | `"Next.js 14 App Router performance best practices"` |
| Product Thinking | `"how to [product process]"`, `"what is [concept]"` | `"how to write a software development brief"` |
| Case Study Expanded | `"[industry] software development"`, `"[outcome] case study"` | `"e-commerce load time optimisation"` |
| Industry Commentary | `"[trend] for developers"`, `"[tool] vs [tool]"` | `"TypeScript vs JavaScript for enterprise in 2026"` |

**AEO-priority blog queries** (questions LLMs regularly answer):
- `"How much does custom software development cost?"`
- `"What is staff augmentation in software development?"`
- `"How long does it take to build a web application?"`
- `"What is the difference between QA testing and software testing?"`
- `"How do I choose a software development agency?"`

---

### Page 6 — Contact `/contact`

**Target persona:** Decision-ready buyer
**Search intent:** Transactional

| Type | Keyword | Monthly Est. Vol. | Competition |
|---|---|---|---|
| Primary | `hire software development company` | 1,600 | High |
| Primary | `contact software development agency` | 390 | Low |
| Secondary | `get software development quote` | 480 | Medium |
| Secondary | `software development project enquiry` | 170 | Low |
| Long-tail | `start a software project` | 210 | Low |

---

### Page 7 — 404 `/not-found`

- No keyword targets — recovery page only
- Must contain internal links to top 4 pages (Home, Services, Work, Contact)
- Include brand-consistent voice to retain trust

---

## 3. Technical SEO Plan

### 3.1 Next.js Metadata API Implementation

**Pattern:** Static pages use `export const metadata`. Dynamic pages use `export async function generateMetadata()`.

```
src/
├── app/
│   ├── layout.tsx              ← Root: title template + global defaults
│   ├── page.tsx                ← Home: import from src/lib/metadata.ts
│   ├── sitemap.ts              ← Auto-generated sitemap.xml ✅
│   ├── robots.ts               ← Auto-generated robots.txt ✅
│   ├── services/
│   │   ├── page.tsx            ← Static metadata
│   │   └── [slug]/
│   │       └── page.tsx        ← generateMetadata(params)
│   ├── work/
│   │   ├── page.tsx            ← Static metadata
│   │   └── [slug]/
│   │       └── page.tsx        ← generateMetadata(params)
│   └── blog/
│       ├── page.tsx            ← Static metadata
│       └── [slug]/
│           └── page.tsx        ← generateMetadata(params)
└── lib/
    ├── metadata.ts             ← Factory + pre-built page metadata ✅
    └── schema.ts               ← JSON-LD generators ✅
```

---

### 3.2 Canonical URL Strategy

| Rule | Implementation |
|---|---|
| Every page has exactly one canonical URL | `alternates.canonical` set in `createMetadata()` |
| No trailing slashes | Next.js default — enforce in `next.config.mjs` |
| HTTPS always | Vercel enforces HTTPS redirect automatically |
| No `www` vs non-`www` split | Pick one (recommend non-`www`) and set in Vercel |
| Dynamic pages self-canonical | `generateMetadata()` returns canonical equal to current URL |

---

### 3.3 Sitemap Strategy

Auto-generated at `/sitemap.xml` via `src/app/sitemap.ts`:

```
Priority assignments:
  1.0  — Home (/)
  0.9  — Contact (/contact)
  0.9  — Services overview (/services)
  0.9  — Work overview (/work)
  0.8  — All service sub-pages (/services/[slug])
  0.8  — About (/about)
  0.8  — Blog index (/blog)
  0.7  — Individual case studies (/work/[slug])
  0.6  — Individual blog posts (/blog/[slug])
  0.3  — Legal pages (/privacy, /terms)

Change frequency:
  daily   — Blog index
  weekly  — Home, Work index
  monthly — All other pages
```

**Phase 2:** When a CMS is integrated (Sanity), `sitemap.ts` fetches all published slugs dynamically. For MVP, slugs are defined in a static data file.

---

### 3.4 Robots.txt Strategy

Generated at `/robots.txt` via `src/app/robots.ts`.

**Key decisions:**
- All pages are crawlable by default
- `/api/` routes are blocked (no SEO value, potential data exposure)
- AI crawlers (GPTBot, ClaudeBot, Google-Extended) are **explicitly allowed** — critical for AEO
- `sitemap.xml` URL is declared in robots.txt for fast discovery

---

### 3.5 Open Graph & Twitter Cards

Every page must have:
- `og:title` — full title with site name appended
- `og:description` — matches meta description
- `og:image` — 1200×630px PNG, brand-consistent design
- `og:url` — canonical URL
- `twitter:card` — `summary_large_image`

**OG image strategy:**
- Static OG image at `/public/og/default.png` — used for all pages initially
- Phase 2: Dynamic OG images via `next/og` (`ImageResponse`) — auto-generates branded images per page with the page title

---

### 3.6 Performance as a Ranking Signal

| Core Web Vital | Target | Why It Matters |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Direct ranking factor in Google Search |
| INP (Interaction to Next Paint) | < 200ms | Replaced FID as ranking factor in 2024 |
| CLS (Cumulative Layout Shift) | < 0.1 | Penalises layout-jumping pages |
| TTFB (Time to First Byte) | < 800ms | Affects all other metrics; Vercel Edge Network helps |
| FCP (First Contentful Paint) | < 1.8s | Perceived performance |

---

## 4. AEO (Answer Engine Optimization)

### 4.1 What AEO Is

AEO is the practice of structuring content so that AI-powered answer engines — including ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews — correctly represent your brand, services, and expertise when users ask relevant questions.

Unlike traditional SEO (ranking in a list), AEO is about **being the answer** — the source an LLM cites or paraphrases when answering a question in its response.

---

### 4.2 How LLMs Find and Use Web Content

```
Source 1 — Training Data
  LLMs are trained on large web crawls.
  High-quality, frequently cited, and structured content
  is more likely to be represented correctly.

Source 2 — RAG (Retrieval-Augmented Generation)
  Systems like Perplexity, ChatGPT with search, and
  Google AI Overviews retrieve live web content at query time.
  Well-structured pages with clear factual statements rank
  highest for retrieval.

Source 3 — Structured Data (JSON-LD)
  Schema.org markup tells machines exactly what a piece of
  content means. LLMs and search engines both parse this.
```

---

### 4.3 AEO Content Strategy

#### Rule 1 — Definition-First Paragraphs
Every service page and blog article must open with a 40–60 word paragraph that definitively answers the implicit question a user came to the page with.

```
❌ Wrong:
"At nexora, we've been delivering exceptional web development
services for years, helping clients achieve their digital goals
through innovative approaches and cutting-edge technology."

✅ Right (AEO-optimised):
"Custom web development is the process of building a web
application tailored to a specific business's requirements —
as opposed to using an off-the-shelf platform. nexora
specialises in Next.js and TypeScript-based applications,
delivering production-grade code with automated testing and
CI/CD pipelines included."
```

The ✅ version:
- Opens with a definition (what it is)
- Names the company and its specialisation (entity clarity)
- Uses specific technical terms (retrieval anchors)
- Is 55 words (ideal featured snippet length)

---

#### Rule 2 — FAQ Sections on Every Service Page

Every `/services/[slug]` page must include a FAQ section using `FAQPage` schema. These directly feed Google's PAA (People Also Ask) boxes and LLM Q&A retrieval.

**Minimum 4 FAQs per service page. Each answer: 40–80 words.**

Example FAQ structure for `/services/web-development`:
```
Q: How long does it take to build a custom web application?
A: A simple web application typically takes 8–12 weeks from
   discovery to launch. A complex platform with integrations,
   authentication, and custom workflows can take 16–24 weeks.
   nexora works in 2-week sprints, so you see working
   software every fortnight — not just at the end.

Q: What is the difference between a web application and a website?
A: A website delivers static information (pages, content). A
   web application is interactive — users can log in, create
   data, and take actions. Most modern SaaS products, dashboards,
   and e-commerce platforms are web applications built on
   frameworks like Next.js or React.

Q: How much does custom web development cost?
A: Custom web development typically ranges from £15,000–£80,000
   for an MVP, depending on complexity, integrations, and team
   size. nexora provides a detailed estimate after a free
   discovery call — with no obligation.

Q: Do you work with startups or only enterprises?
A: Both. nexora works with funded startups building their
   first product and with established businesses rebuilding
   legacy systems. Our process scales to the size of the project.
```

---

#### Rule 3 — Entity Clarity

LLMs need to understand what nexora IS before they can recommend it. Entity clarity means using consistent, unambiguous language about the company across all pages.

**Required entity statements (must appear on the Homepage and About page):**
```
Full legal name:  nexora
Type of company:  Software development and IT services company
Location:         [City, Country — to be confirmed]
Services:         Web development, cloud solutions, QA testing,
                  UI/UX design, technology consulting,
                  staff augmentation
Tech specialisms: Next.js, TypeScript, React, AWS, Docker
Founded:          [Year]
```

**Entity consistency rules:**
- Always refer to the company as "nexora" — not "we" alone in standalone contexts
- First mention on every page: full entity name + descriptor. E.g., *"nexora, a UK-based software development company, ..."*
- `Organization` schema on every page (via root layout) signals the entity to all machines

---

#### Rule 4 — Blog Article AEO Structure

Each blog article must follow this structure to maximise LLM retrieval:

```
1. TITLE              → Contains the exact question or problem
   Example: "How to Choose a Software Development Agency in 2026"

2. INTRO PARAGRAPH    → 40-60 word answer to the title question
   (Featured snippet bait — answer first, elaborate second)

3. BODY SECTIONS      → H2 headings as sub-questions
   Example H2s for the above article:
   - "What to look for in a software agency"
   - "Red flags when evaluating a development partner"
   - "Questions to ask before signing a contract"

4. KEY TAKEAWAYS BOX  → 3-5 bullet points summarising the article
   (LLMs frequently extract bullet-point summaries)

5. FAQ SECTION        → 3-4 Q&As using FAQPage schema
   (Directly feeds PAA and LLM Q&A responses)

6. CTA                → "Working with a software partner? Start with
                         a free discovery call with nexora."
```

---

#### Rule 5 — Perplexity / Citation Optimisation

Perplexity and similar RAG-based engines retrieve pages and cite them. To be cited:

1. **Write statements that are directly quotable.** Single-sentence facts, statistics, and definitions get cited.
2. **Use `<cite>` and `<blockquote>` HTML semantics** on testimonials and quoted statistics.
3. **Publish original data.** If nexora surveys clients, publishes benchmarks, or produces original research — even small datasets — this becomes citable.
4. **Get backlinks from industry-relevant sources.** Clutch.co profile, GitHub contributions, dev.to articles, and conference mentions all increase LLM training data representation.

---

## 5. Schema.org Implementation

All schema is injected as `<script type="application/ld+json">` via React Server Components. Implementation lives in `src/lib/schema.ts`.

### 5.1 Schema Type Map

| Page | Schema Types Applied |
|---|---|
| All pages (layout) | `Organization`, `WebSite` |
| Home | `Organization`, `WebSite`, `SiteLinksSearchBox` |
| Services overview | `Service` (aggregate) |
| Service detail | `Service`, `FAQPage`, `BreadcrumbList` |
| Case study | `CreativeWork`, `BreadcrumbList` |
| Blog index | `Blog` |
| Blog article | `BlogPosting` / `Article`, `FAQPage`, `BreadcrumbList` |
| About | `Organization` (extended), `Person` × n (team) |
| Contact | `ContactPage` |

---

### 5.2 Schema Definitions

#### `Organization` (injected globally via root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "nexora",
  "url": "https://nexora.dev",
  "logo": "https://nexora.dev/logo.png",
  "description": "nexora builds high-performance software products and digital experiences for forward-thinking companies.",
  "foundingDate": "YYYY",
  "sameAs": [
    "https://linkedin.com/company/nexora",
    "https://github.com/nexora",
    "https://twitter.com/nexora"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@nexora.dev",
    "availableLanguage": "English"
  },
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Next.js", "TypeScript", "React", "AWS",
    "Software Development", "Cloud Computing",
    "QA Testing", "UI/UX Design"
  ]
}
```

#### `WebSite` + `SiteLinksSearchBox` (Home only)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "nexora",
  "url": "https://nexora.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://nexora.dev/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

#### `Service` (service detail pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{Service Name}",
  "description": "{Service description}",
  "provider": {
    "@type": "Organization",
    "name": "nexora",
    "url": "https://nexora.dev"
  },
  "serviceType": "{e.g. Web Development}",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "{Service Name} Deliverables",
    "itemListElement": [
      { "@type": "Offer", "name": "{Deliverable 1}" },
      { "@type": "Offer", "name": "{Deliverable 2}" }
    ]
  }
}
```

#### `FAQPage` (service and blog pages)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{Question text}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{Answer text — 40–80 words}"
      }
    }
  ]
}
```

#### `BlogPosting` (individual blog articles)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{Article title}",
  "description": "{Meta description}",
  "author": {
    "@type": "Person",
    "name": "{Author name}",
    "url": "https://nexora.dev/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "nexora",
    "logo": { "@type": "ImageObject", "url": "https://nexora.dev/logo.png" }
  },
  "datePublished": "{ISO 8601 date}",
  "dateModified": "{ISO 8601 date}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{canonical URL}" },
  "image": "{OG image URL}",
  "keywords": ["{keyword1}", "{keyword2}"]
}
```

#### `BreadcrumbList` (all inner pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexora.dev" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://nexora.dev/services" },
    { "@type": "ListItem", "position": 3, "name": "{Current page}", "item": "{Current URL}" }
  ]
}
```

---

## 6. Internal Linking Strategy

### 6.1 The Hub-and-Spoke Model

```
                        ┌─────────────┐
                        │    BLOG     │ ← Informational authority
                        └──────┬──────┘
                               │ Links to services
                               ▼
┌───────────┐         ┌────────────────┐         ┌──────────────┐
│   HOME    │ ──────► │    SERVICES    │ ◄─────── │ CASE STUDIES │
│ (gateway) │         │  (hub pages)  │          │   (proof)    │
└───────────┘         └───────┬────────┘          └──────┬───────┘
                              │                          │
                    ┌─────────┴──────────┐              │
                    │  SERVICE SUB-PAGES │ ◄────────────┘
                    │  (spoke pages)     │ Links to relevant case studies
                    └─────────┬──────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │   CONTACT   │ ← All paths lead here
                        └─────────────┘
```

### 6.2 Link Rules by Page Type

| From | To | Anchor text pattern | Max links |
|---|---|---|---|
| Home hero | `/work` | "View our work" | 1 |
| Home services strip | `/services/{slug}` | "{Service name}" | 6 |
| Home case studies | `/work/{slug}` | "Read case study" | 3 |
| `/services` overview | `/services/{slug}` | "{Service name}" | 6 |
| `/services/{slug}` | `/work/{slug}` (relevant) | "See how we did it →" | 1–2 |
| `/services/{slug}` | Other `/services/{slug}` | "{Service name}" (pill) | 5 |
| `/services/{slug}` | `/contact` | "Start a project" | 1 |
| `/work/{slug}` | `/services/{slug}` (used in project) | "{Service name}" | 1–3 |
| `/work/{slug}` | Other `/work/{slug}` | "See another project →" | 1 |
| `/work/{slug}` | `/contact` | "Start a similar project" | 1 |
| Blog article | `/services/{slug}` | Natural contextual | 2–3 |
| Blog article | `/work/{slug}` | "See it in practice →" | 1 |
| Blog article | Other blog articles | Natural contextual | 3–5 |
| Blog article | `/contact` | CTA at end | 1 |

---

### 6.3 Service ↔ Case Study Link Matrix

When case study content is delivered, populate this matrix. Every service should link to at least one case study, and every case study should link back to the services it used.

| Service | Case Study 1 | Case Study 2 | Case Study 3 |
|---|---|---|---|
| Web & App Development | `[slug]` | `[slug]` | — |
| Cloud & DevOps | `[slug]` | — | — |
| QA & Testing | `[slug]` | `[slug]` | — |
| UI/UX Design | `[slug]` | — | — |
| Tech Consulting | `[slug]` | — | — |
| Staff Augmentation | `[slug]` | — | — |

> **Action:** Fill this matrix when case study slugs are confirmed by Content Owner.

---

### 6.4 Anchor Text Rules

1. **Descriptive, not generic.** Use `"our QA testing services"` not `"click here"` or `"learn more"`.
2. **Never the same anchor text for two different destination URLs** — confuses search engines.
3. **Vary anchor text** for links pointing to the same destination from different pages.
4. **No exact keyword stuffing in anchors.** Natural language only — *"how we approached the rebuild"* beats *"Next.js web development agency services"*.
5. **Contact page links:** Use action anchors — `"Start a project"`, `"Book a discovery call"`, `"Let's talk"` — never `"Contact us"`.

---

## 7. Pre-Launch Checklist

### Technical SEO

- [ ] `sitemap.xml` accessible at `https://nexora.dev/sitemap.xml`
- [ ] `robots.txt` accessible at `https://nexora.dev/robots.txt`
- [ ] All pages have unique `<title>` tags (verified via crawl)
- [ ] All pages have unique `<meta name="description">` (< 155 chars each)
- [ ] No pages have duplicate `<h1>` tags
- [ ] All pages have canonical URL set via `<link rel="canonical">`
- [ ] OG tags verified via Facebook Sharing Debugger
- [ ] Twitter cards verified via Twitter Card Validator
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] No broken internal links (run `npx broken-link-checker`)
- [ ] All images have descriptive `alt` text
- [ ] No console errors on any page (DevTools)
- [ ] HTTPS enforced (Vercel automatic)
- [ ] No `www` / non-`www` split (verify redirect in Vercel)
- [ ] Core Web Vitals: all green in PageSpeed Insights
- [ ] Lighthouse SEO: ≥ 95 on all pages

### Schema.org

- [ ] `Organization` schema validated in Google Rich Results Test
- [ ] `WebSite` schema with `SearchAction` validated
- [ ] `Service` schema on all 6 service sub-pages
- [ ] `FAQPage` schema on all service pages (min 4 Q&As each)
- [ ] `BlogPosting` schema on all 3 launch blog articles
- [ ] `BreadcrumbList` on all inner pages
- [ ] No schema errors in Google Search Console > Rich Results

### AEO

- [ ] Every service page has a definition-first opening paragraph (40–60 words)
- [ ] Every service page has a FAQ section (min 4 questions)
- [ ] All 3 blog articles follow AEO article structure (definition → H2 sub-questions → takeaways → FAQ)
- [ ] `GPTBot` not blocked in `robots.txt`
- [ ] `ClaudeBot` not blocked in `robots.txt`
- [ ] `Google-Extended` not blocked in `robots.txt`
- [ ] Entity information consistent across Home and About pages
- [ ] Company name, services, and specialisms listed consistently in schema

### Content

- [ ] All page meta descriptions contain a verb (action word)
- [ ] No page has the same meta description as another
- [ ] All blog articles have `datePublished` and `dateModified`
- [ ] All blog articles are attributed to a named author
- [ ] All case studies have at least one quantified metric
- [ ] Internal link matrix is fully populated
- [ ] All internal links use descriptive anchor text

### Keyword Targeting

- [ ] Home H1 contains primary keyword naturally
- [ ] Services page H1 contains primary keyword
- [ ] Each service sub-page H1 contains its primary keyword
- [ ] Work page H1 targets portfolio keyword
- [ ] Blog index H1 targets blog keyword
- [ ] No keyword cannibalism (two pages targeting same primary keyword)

---

## 8. Post-Launch Monitoring

### Week 1
- [ ] Verify Google Search Console shows no crawl errors
- [ ] Verify `sitemap.xml` was processed (< 48 hours after submit)
- [ ] Check for 404 errors in GSC > Coverage report
- [ ] Verify Core Web Vitals report populating in GSC
- [ ] Set up PostHog / Plausible — confirm events are firing

### Month 1
- [ ] Check GSC for impressions on target keywords
- [ ] Identify any pages with < 50 impressions — review meta/content
- [ ] Run Screaming Frog crawl — check for new broken links
- [ ] Review top-10 landing pages — confirm they match intent
- [ ] Check contact form conversion rate (target: ≥ 3%)

### Month 3
- [ ] Run keyword rank tracking for all primary keywords
- [ ] Identify blog articles that have earned impressions — double down
- [ ] Review FAQ sections for new questions appearing in GSC queries
- [ ] Check if any schema errors appeared in GSC Rich Results
- [ ] Test AEO: manually ask Claude, ChatGPT, and Perplexity
  - "What is nexora?"
  - "Who does Next.js development in [city]?"
  - "How much does custom web development cost?"
  - Note whether nexora is mentioned and correct the entity data if not

### Quarterly
- [ ] Refresh page meta descriptions based on CTR data in GSC
- [ ] Publish minimum 2 new blog articles targeting FAQ queries
- [ ] Update sitemap to include new case studies / blog articles
- [ ] Review competitor rankings for primary keywords
- [ ] Update FAQ content if Google's PAA boxes have changed questions

---

*Document owner: Lead Architect / PM*
*Implementation files: src/app/sitemap.ts, src/app/robots.ts, src/lib/metadata.ts, src/lib/schema.ts*
*Companion docs: content_strategy.md, 09-design-system.md*
*Next step: Step 12 — Technical Architecture*
