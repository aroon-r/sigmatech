# Step 18 — Design-to-Code Audit

**Status:** ✅ Green Light — Proceed to UI Development  
**Date:** 2026-04-25  
**Scope:** Homepage components · Design system alignment · Content tone · Performance budget · A11y standards

---

## Audit Purpose

This document is the final gate before UI development begins. It cross-references:

1. The 10 wireframed components (Step 8) against the design token system (Step 9) and TypeScript schemas (Step 13)
2. The "Expert/Human" tone of voice against the Step 15 placeholder content
3. Target performance metrics for MVP
4. WCAG 2.1 AA accessibility rules to enforce during component development

If all four sections pass, development is cleared to start.

---

## 1. Component Mapping

### 1.1 Homepage Component Inventory

| # | Component | File path | Render type | Data source | Schema |
|---|-----------|-----------|-------------|-------------|--------|
| 1 | Navbar | `src/components/layout/Navbar.tsx` | Client (scroll state) | Static — nav links hardcoded | None |
| 2 | Hero | `src/components/sections/Hero.tsx` | Server (static) | Static copy + no dynamic data | None |
| 3 | ServicesStrip | `src/components/sections/ServicesStrip.tsx` | Server (static) | `SERVICES` from `src/data/content/services.ts` | `Service` |
| 4 | Process | `src/components/sections/Process.tsx` | Server (static) | Static step data (hardcoded) | None |
| 5 | CaseStudies | `src/components/sections/CaseStudies.tsx` | Server (static) | `CASE_STUDIES` filtered by `isFeatured` | `CaseStudy` |
| 6 | Testimonials | `src/components/sections/Testimonials.tsx` | Server (static) | Hardcoded testimonial objects (Phase 1) | None |
| 7 | TechStack | `src/components/sections/TechStack.tsx` | Server (static) | Hardcoded tech list (Phase 1) | None |
| 8 | CTABand | `src/components/sections/CTABand.tsx` | Server (static) | Static copy | None |
| 9 | Footer | `src/components/layout/Footer.tsx` | Server (static) | Static nav links, `SERVICES` for services column | `Service` |
| 10 | ContactForm | `src/components/forms/ContactForm.tsx` | Client (form state) | User input → `/api/contact` Server Action | `ContactFormInput` + Zod |

**Note:** Testimonials and TechStack are hardcoded for Phase 1. Both are designed for Sanity migration in Phase 2 — their data shape should match the pattern of `SERVICES` (id, name, sortOrder).

---

### 1.2 Design Token Coverage per Component

#### Navbar

| Element | Token used | Source |
|---------|-----------|--------|
| Logo icon colour | `electric-500` / `text-brand-500` | ✅ Design system §2.2 |
| Nav link text | `charcoal-600` → hover `charcoal-950` | ✅ Design system §2.3 |
| Scroll background | `bg-white/80 backdrop-blur-md` | ✅ Design system §10 (FOUC strategy) |
| CTA button | `bg-electric-500 hover:bg-electric-600 text-white` | ✅ Button Primary §4.1 |
| Mobile drawer bg | `dark:bg-charcoal-950` | ✅ Dark mode strategy §10 |

**Status: ✅ All tokens resolved**

---

#### Hero

| Element | Token used | Source |
|---------|-----------|--------|
| Background blob | `from-electric-300 to-electric-600 opacity-20` | ✅ Design system §2.2 |
| Badge | `border-electric-200 bg-electric-50 text-electric-700` | ✅ Badge brand variant §4.4 |
| Headline | `text-5xl → text-7xl font-bold tracking-tight` | ✅ Typography H1 §3.2 |
| Gradient text span | `text-gradient` (custom utility — `from-electric-400 to-electric-600`) | ✅ Typography rule §3.3 — gradient text hero only |
| Sub-headline | `text-lg text-charcoal-400 dark:text-charcoal-400` | ✅ Body LG §3.2 |
| Primary CTA | `bg-electric-500 hover:bg-electric-600` + glow shadow | ✅ Button Primary + Glow variant §4.1 |
| Secondary CTA | `border-electric-500 text-electric-400 hover:bg-electric-500/10` | ✅ Button Secondary §4.1 |
| Social proof text | `text-xs uppercase tracking-widest text-charcoal-400` | ✅ Overline §3.2 |
| Animations | Framer Motion fadeUp, 0–450ms delays, `useReducedMotion()` gate | ✅ Animation tokens §8 |

**Status: ✅ All tokens resolved. Framer Motion isolated to Hero — correct.**

---

#### ServicesStrip

| Element | Token used | Source |
|---------|-----------|--------|
| Section bg | `bg-charcoal-50 dark:bg-charcoal-900/50` | ✅ Background alternation pattern §wireframe |
| Section H2 | `text-4xl font-bold tracking-tight` | ✅ H2 §3.2 |
| Card bg | `bg-white dark:bg-charcoal-800` | ✅ Solid card §4.2 |
| Card border | `border-charcoal-100 dark:border-charcoal-700 hover:border-electric-500` | ✅ Solid card hover §4.2 |
| Icon wrapper | `bg-electric-50 dark:bg-electric-950` | ✅ `--color-accent-subtle` §2.4 |
| Icon colour | `text-electric-600` | ✅ AA on white bg (4.5:1) §2.2 |
| Service name | `text-sm font-semibold` | ✅ Body SM §3.2 |
| Icon library | Lucide React: `Code2`, `Cloud`, `ShieldCheck`, `Palette`, `Lightbulb`, `Users` | ✅ Iconography §9 |
| Data → component | `SERVICES[].name`, `.slug`, `.icon`, `.description` | ✅ `Service` schema — all fields present |

**Status: ✅ All tokens resolved. Icon-to-slug mapping confirmed (6 of 6 match wireframe).**

---

#### Process

| Element | Token used | Source |
|---------|-----------|--------|
| Step number | `text-xs font-bold tracking-widest uppercase text-electric-500` | ✅ Overline + electric accent §3.2 |
| Icon circle | `bg-electric-600 ring-4 ring-white dark:ring-charcoal-950` | ✅ Primary brand §2.2 |
| Connector line | `h-px bg-charcoal-200 dark:bg-charcoal-700 hidden lg:block` | ✅ Divider §4.5 |
| Step title | `text-xl font-semibold` | ✅ H4 §3.2 |
| Step description | `text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed` | ✅ `--color-text-secondary` §2.4 |
| Icons | `Search`, `PenTool`, `Terminal`, `Rocket` — Lucide React | ✅ Iconography §9 |
| Data | Hardcoded step array (4 steps) — no schema needed | ✅ |

**Status: ✅ All tokens resolved.**

---

#### CaseStudies

| Element | Token used | Source |
|---------|-----------|--------|
| Section bg | `bg-charcoal-50 dark:bg-charcoal-900/50` | ✅ Alternating bg |
| Card | `bg-white dark:bg-charcoal-800 rounded-2xl border` | ✅ Solid card §4.2 |
| Card hover | `hover:shadow-xl` — `shadow-lg` token | ✅ Shadow §7 |
| Cover image | `next/image` with `fill object-cover group-hover:scale-105` | ✅ Required (`<img>` forbidden) |
| Industry tag | `text-xs font-semibold tracking-widest uppercase text-electric-600` | ✅ Overline + accent colour §3.2 |
| Project title | `text-xl font-bold` | ✅ H4 §3.2 |
| Metric callout | `text-sm font-semibold` + `TrendingUp` Lucide icon | ✅ Iconography §9 |
| Data → component | `CASE_STUDIES.filter(cs => cs.isFeatured)` → 2 results (`cs-001`, `cs-002`); `cs-003` is not featured | ✅ |
| Metric display | `metrics[0].improvement` — all 3 case studies have ≥4 metrics | ✅ Integrity test confirms min 2 |

**Status: ✅ All tokens resolved. Note: only 2 case studies are `isFeatured`. The wireframe shows 3 cards — either add a third featured study or design the grid gracefully for 2.**

> **Action item for dev:** Confirm whether to mark `cs-003` (`saas-devops-overhaul`) as `isFeatured: true` or design the grid to handle 2 cards. Recommend marking all 3 as featured for homepage richness.

---

#### Testimonials

| Element | Token used | Source |
|---------|-----------|--------|
| Card bg | `bg-charcoal-50 dark:bg-charcoal-800/50 rounded-2xl border` | ✅ Solid card §4.2 |
| Quote mark | `text-4xl text-electric-400 font-serif` | ✅ Electric Blue accent §2.2 |
| Quote text | `text-base leading-8 text-charcoal-700 dark:text-charcoal-300` | ✅ Body §3.2 |
| Avatar border | `border-2 border-electric-500` | ✅ Brand accent §2.2 |
| Attribution name | `text-sm font-semibold` not-italic `<cite>` | ✅ Body SM §3.2 |
| Company name | `text-xs font-medium text-electric-600` | ✅ Caption §3.2 |
| Data | Extracted from `CaseStudy.testimonial` objects (3 exist, one per case study) | ✅ All 3 testimonials present |

**Status: ✅ All tokens resolved. Testimonial objects sourced directly from case study data — no duplication needed.**

---

#### TechStack

| Element | Token used | Source |
|---------|-----------|--------|
| Section label | `text-xs uppercase tracking-widest text-charcoal-400` | ✅ Overline §3.2 |
| Logo items | `opacity-60 hover:opacity-100 grayscale hover:grayscale-0` | ✅ Transition `duration-base` §8 |
| Logos | `next/image h-8 w-auto object-contain` | ✅ Required |
| Data | 10-item static array: Next.js, React, TypeScript, Tailwind, Node.js, PostgreSQL, AWS, Docker, GitHub, Figma | ✅ Matches wireframe §7 |

**Status: ✅ All tokens resolved.**

---

#### CTABand

| Element | Token used | Source |
|---------|-----------|--------|
| Section bg | `bg-electric-600 dark:bg-electric-700` | ✅ Primary brand §2.2 |
| Headline | `text-4xl font-bold tracking-tight text-white` | ✅ H2 §3.2 |
| Sub-headline | `text-lg text-electric-100` | ✅ `electric-50` / `electric-100` tint §2.2 |
| CTA button | `bg-white text-electric-600 hover:bg-electric-50` | ✅ Inverted button on brand bg §4.1 |
| WCAG: white on electric-600 | 4.5:1 | ✅ AA §2.2 |
| WCAG: electric-600 text on white button | 4.5:1 | ✅ AA §2.2 |

**Status: ✅ All tokens resolved. Contrast validated for both text and button.**

---

#### Footer

| Element | Token used | Source |
|---------|-----------|--------|
| Footer bg | `bg-charcoal-950` | ✅ Root background §2.3 |
| Link text | `text-sm text-charcoal-400 hover:text-white` | ✅ `--color-text-muted` §2.4 |
| Column headings | `text-xs uppercase tracking-widest text-charcoal-500` | ✅ Overline §3.2 |
| Logo icon | `text-electric-500` | ✅ Brand accent §2.2 |
| Copyright | `text-xs text-charcoal-600` | ✅ Charcoal scale §2.3 |
| Services list | `SERVICES.map(s => ({ name: s.name, slug: s.slug }))` | ✅ `Service` schema |
| External links | `<Linkedin>`, `<Github>`, `<Twitter>` Lucide icons — `aria-label` required | ✅ Iconography §9 |

**Status: ✅ All tokens resolved.**

---

#### ContactForm

| Element | Token used | Source |
|---------|-----------|--------|
| Input default | `bg-charcoal-800 border-charcoal-600 text-charcoal-50 placeholder:text-charcoal-400` | ✅ Form inputs §4.3 |
| Input focus | `border-electric-500 ring ring-electric-500/20` | ✅ Focus glow §4.3 |
| Input error | `border-red-500 ring ring-red-500/20` | ✅ Error state §4.3 |
| Error message | `text-xs text-red-400` + `AlertCircle` icon | ✅ Form error §4.3 |
| Submit button | Button Primary `bg-electric-500` | ✅ §4.1 |
| Validation | Zod `contactFormSchema` — name, email, company, service, message, consent | ✅ `src/lib/validations.ts` |
| Server action | `submitContactForm()` in `src/app/actions/contact.ts` | ✅ Step 14 |
| Rate limit | `CONTACT_RATE_LIMIT_MAX` env var | ✅ `.env.example` |

**Status: ✅ All tokens and schema bindings resolved.**

---

### 1.3 Component Mapping Summary

| Component | Tokens | Schema binding | Data available | Ready |
|-----------|--------|---------------|----------------|-------|
| Navbar | ✅ | N/A | Static | ✅ |
| Hero | ✅ | N/A | Static | ✅ |
| ServicesStrip | ✅ | `Service` | 6 records | ✅ |
| Process | ✅ | N/A | Static | ✅ |
| CaseStudies | ✅ | `CaseStudy` | 3 records (2 featured) | ⚠️ See action item |
| Testimonials | ✅ | `CaseStudy.testimonial` | 3 records | ✅ |
| TechStack | ✅ | N/A | Static | ✅ |
| CTABand | ✅ | N/A | Static | ✅ |
| Footer | ✅ | `Service` | 6 records | ✅ |
| ContactForm | ✅ | `ContactFormInput` + Zod | User input | ✅ |

**Overall: 9/10 fully ready. 1 item (CaseStudies) has a minor data decision pending.**

---

## 2. Tone of Voice — "Expert/Human" Constraint Check

### What "Expert/Human" means in practice

The tone of voice from Step 5 (Brand Strategy) defines:
- **Expert:** Specific over vague. Numbers over adjectives. Decisions explained, not asserted.
- **Human:** Direct address, first-person ("we"), no corporate passive voice, no filler phrases ("leveraging synergies", "best-in-class").

### 2.1 Services content assessment

Checked against all 6 services in `src/data/content/services.ts`:

| Signal | Evidence | Pass |
|--------|----------|------|
| Specific numbers, not adjectives | "↓ 79% page load", "< 2s LCP", "99.9% uptime", "40% cloud cost reduction" | ✅ |
| First-person "we" voice | "We design and build…", "We work primarily on AWS…", "We don't hand you a repository and disappear." | ✅ |
| No corporate jargon | No instances of "leverage", "synergy", "best-in-class", "world-class" | ✅ |
| Positions expertise via specifics | "Our consultants have built and led engineering teams at funded startups and FTSE 250 enterprises." | ✅ |
| Honest about constraints | "We are framework-pragmatic — if your existing codebase is on a different stack, we'll assess what makes sense rather than forcing a rewrite." | ✅ |
| Human moments | "We don't hand you a repository and disappear." / "Staff Augmentation — we only place engineers we'd be proud to work alongside ourselves." | ✅ |
| FAQ answers are direct | Every FAQ answer leads with the answer, not with a hedge | ✅ |

**Verdict: ✅ Services content fully aligns with the Expert/Human tone.**

---

### 2.2 Case studies content assessment

Checked against all 3 case studies in `src/data/content/work.ts`:

| Signal | Evidence | Pass |
|--------|----------|------|
| Precise before/after metrics | LCP 4.2s → 890ms, bundle 3.4MB → 410KB, conversion 1.8% → 3.4% | ✅ |
| Named, real-sounding clients | Meridian Capital, Luminary Goods, NovaTech Labs | ✅ |
| Constraints stated honestly | "The constraints were firm: zero tolerance for data downtime during migration, a 12-week delivery window." | ✅ |
| Process explained, not just results | All three case studies describe the approach in enough detail that a technical reader believes it | ✅ |
| Testimonials are specific | "The rebuild went from internal joke to internal pride in twelve weeks." — not "Great team, highly recommend!" | ✅ |
| Narrative arc (problem → approach → outcome) | All three follow the same structure, consistently | ✅ |
| No vanity copy | No section reads as marketing spin — every claim is grounded in a metric or a described decision | ✅ |

**Verdict: ✅ Case study content is the strongest section — editorial quality, not brochure quality.**

---

### 2.3 Blog content assessment

Checked against all 3 posts in `src/data/content/blog.ts`:

| Signal | Evidence | Pass |
|--------|----------|------|
| Practitioner voice | "After migrating five production client projects, here's what actually changed." | ✅ |
| Data-driven | Bundle comparison table with real before/after numbers (340KB → 62KB etc.) | ✅ |
| Opinionated and direct | "A design system is not a designer's productivity tool — or not primarily." | ✅ |
| Admits difficulty | "The mental model shift is harder than the docs suggest." | ✅ |
| Business case framing | Blog-002 makes a business case for design systems using a CFO-readable cost model | ✅ |
| Actionable, not theoretical | Blog-003 gives a 10-point checklist with specific AWS CLI commands | ✅ |
| Author voice is distinct | Aroon (engineering), Parvathy (design + business), Vijay (DevOps) — each post sounds like its author's domain | ✅ |

**Verdict: ✅ Blog content demonstrates genuine practitioner expertise. All three posts pass the "would a CTO forward this?" test.**

---

### 2.4 Tone Constraint Summary

All three content types — Services, Case Studies, Blog — pass the Expert/Human constraint. The content avoids two common failure modes:

- **Over-expert (alienates buyers):** We don't write for engineers only — every technical claim is tied to a business outcome.
- **Over-human (sounds amateur):** We don't write chattily or casually — the voice is confident, not informal.

**Overall verdict: ✅ Tone constraint passed across all 14 content items.**

---

## 3. Performance Budget

### 3.1 Lighthouse Score Targets (MVP)

| Metric | Target | Minimum acceptable | Measured at |
|--------|---------|--------------------|-------------|
| Performance | ≥ 95 | ≥ 90 | Lighthouse CI (production URL) |
| Accessibility | ≥ 95 | ≥ 90 | Lighthouse CI |
| Best Practices | ≥ 95 | ≥ 90 | Lighthouse CI |
| SEO | 100 | 100 | Lighthouse CI |

> A score below the minimum acceptable on any metric blocks a production deploy until resolved.

---

### 3.2 Core Web Vitals Targets

| Metric | Target (Good) | Acceptable (Needs Improvement) | Fails at |
|--------|--------------|-------------------------------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5–4.0s | > 4.0s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |
| TTFB (Time to First Byte) | < 600ms | — | — |
| FCP (First Contentful Paint) | < 1.8s | — | — |

**Measured at:** Vercel Production (`https://nexora.dev`) using PageSpeed Insights and Vercel Analytics.

---

### 3.3 Budget Enablers

The following architectural decisions already in place make these targets achievable without heroic effort:

| Decision | Benefit |
|----------|---------|
| React Server Components for all static sections | Hero, ServicesStrip, CaseStudies ship zero client JS |
| `next/image` enforced (no raw `<img>`) | Automatic format conversion (WebP/AVIF), lazy loading, prevents CLS from unsized images |
| Font loading via `next/font` | Zero layout shift from fonts — `font-display: swap` built in |
| Static generation (SSG) for all homepage sections | TTFB from Vercel CDN edge, not a server |
| Framer Motion in Client Components only | Animation JS doesn't block server render |
| `vercel.json` cache headers for `/_next/static/**` | `max-age=31536000, immutable` — 1-year cache for content-hashed assets |
| Placeholder env vars in CI build | Build completes without secrets — no runtime secret dependency |

**Risk areas to monitor:**
- Hero background blob: `blur-3xl` via CSS filter — verify no layout thrash on mobile
- Framer Motion bundle: tree-shake to `motion/react` entry point only
- `next/image` cover images in CaseStudies: pre-define `width`/`height` or use `fill` with a sized parent to prevent CLS

---

### 3.4 Bundle Size Target

| Asset | Target |
|-------|--------|
| First Load JS (shared) | < 80 KB (gzipped) |
| Per-page JS | < 50 KB (gzipped) |
| CSS (total) | < 30 KB (gzipped) |
| Largest image (above fold) | < 200 KB (WebP) |

---

## 4. Accessibility (WCAG 2.1 AA) Standards

### 4.1 Contrast Requirements

| Text type | Required ratio | Token combinations confirmed |
|-----------|---------------|------------------------------|
| Body text (≥ 16px normal / ≥ 14px bold) | 4.5:1 | `charcoal-50` on `charcoal-950`: 17.8:1 ✅ |
| Small text (< 16px) | 4.5:1 | `charcoal-400` on `charcoal-950`: 4.6:1 ✅ |
| UI components & focus rings | 3:1 | `electric-500` on `charcoal-950`: 5.4:1 ✅ |
| White text on `electric-500` | 3:1 (large/UI) | 3.1:1 ✅ (AA Large / UI only) |
| White text on `electric-600` | 4.5:1 | 4.5:1 ✅ (CTABand primary text) |

> **Hard rule:** Never use `electric-500` for small body text on white. Use `electric-600` or darker. The design system already enforces this.

---

### 4.2 Keyboard Navigation Rules

Every interactive element must be fully keyboard-operable:

| Rule | Applies to |
|------|-----------|
| Visible focus indicator on all interactive elements | All buttons, links, inputs, toggles |
| `outline: 2px solid electric-500; outline-offset: 2px` on `:focus-visible` | All components — don't use `:focus` alone (breaks mouse UX) |
| Tab order follows visual reading order | Navbar → Hero → sections in scroll order → Footer |
| Mobile menu drawer: trap focus while open, restore on close | Navbar mobile toggle |
| Skip-to-content link at the top of `<body>` (visually hidden, visible on focus) | `layout.tsx` — added before `<header>` |
| Form inputs navigable with Tab; error messages announced on submit | ContactForm |

---

### 4.3 Screen Reader Requirements

| Rule | Implementation |
|------|---------------|
| All images have `alt` text | `next/image` — `alt` is required by the component |
| Decorative images: `alt=""` | Background blob, bottom fade in Hero |
| Decorative icons: `aria-hidden="true"` | All inline icons not conveying meaning |
| Functional icons: `aria-label` on the parent button | Navbar mobile toggle, social links in Footer |
| `<section>` elements have landmark roles | Implicit via HTML5 sectioning — or add `aria-label` |
| Form errors announced via `aria-describedby` | ContactForm — each input's error `id` linked to the field |
| Live region for form submission feedback | `role="status"` or `aria-live="polite"` on success/error message |
| `<figure>` and `<blockquote>` for testimonials | Testimonials section — semantic HTML required |
| `<cite>` for testimonial attribution | Inside `<blockquote>` |

---

### 4.4 Colour Independence Rule

Colour must never be the sole indicator of state. Every state that uses colour must also use one of: shape, icon, label, or text.

| State | Colour | Additional indicator |
|-------|--------|---------------------|
| Form error | Red border | `AlertCircle` icon + error text below field |
| Form success | — | Text confirmation message |
| Active nav link | `electric-500` text | `font-semibold` weight change |
| Required field | — | `*` after label + `aria-required="true"` |
| Disabled button | `opacity-50` | `disabled` attribute + `cursor-not-allowed` |

---

### 4.5 Animation & Motion

| Rule | Implementation |
|------|---------------|
| `prefers-reduced-motion` respected | All Framer Motion usage gated with `useReducedMotion()` — confirmed in test setup.ts stub |
| No infinite animations that can't be paused | No marquees or auto-playing carousels in current design |
| Animations don't convey critical information | All animation is decorative fadeUp — content is readable without it |

---

### 4.6 HTML Semantics Checklist

Every component must use the correct HTML element:

| Element | Required in |
|---------|------------|
| `<header>` | Navbar wrapper |
| `<nav>` | Inside `<header>` |
| `<main>` | Homepage content wrapper in `layout.tsx` |
| `<section>` | Each homepage section (Hero, ServicesStrip, etc.) |
| `<footer>` | Footer |
| `<h1>` | One per page — Hero headline only |
| `<h2>` | Section titles (What we do, Our work, How we work, etc.) |
| `<h3>` | Card titles within sections |
| `<figure>` + `<blockquote>` + `<cite>` | Testimonials |
| `<ul>` + `<li>` | Nav links, footer links, service lists |
| `<button>` | All interactive controls (not `<div onClick>`) |

---

### 4.7 Testing Protocol for A11y

Accessibility is verified at three levels:

| Level | Tool | When |
|-------|------|------|
| Automated | `axe-core` via `vitest-axe` in unit tests | Every component test (blocks CI) |
| Automated | Lighthouse Accessibility audit | Every preview deploy |
| Manual | Keyboard-only navigation walkthrough | Before every production release |
| Manual | Screen reader (NVDA / macOS VoiceOver) | Before every production release |

---

## 5. Pre-Development Checklist

Before writing the first component:

- [x] **TypeScript strict mode** confirmed — `"strict": true` in `tsconfig.json`
- [x] **ESLint** configured — `eslint-config-next` + `@typescript-eslint`
- [x] **Tailwind dark mode** — `darkMode: "class"` in `tailwind.config.ts`
- [x] **`next/font`** for Plus Jakarta Sans + Inter + JetBrains Mono — defined in `layout.tsx`
- [x] **`next/image`** required for all `<img>` — enforced by ESLint rule `next/no-img-element`
- [x] **Framer Motion** — must only import in files with `"use client"` directive
- [x] **Lucide React** — stroke-width consistent at default (`2`); `aria-hidden` on decorative icons
- [x] **Content data** — all 6 services, 3 case studies, 3 blog posts, 5 authors populated
- [x] **API routes** — `/api/contact`, `/api/services`, `/api/work`, `/api/blog` defined
- [x] **Server Action** — `submitContactForm()` implemented with Zod validation + rate limiting
- [x] **Test suite** — 42 contact form tests + content integrity tests + vitest config ready
- [x] **CI/CD** — GitHub Actions `ci.yml` + `deploy.yml` + `vercel.json` committed
- [ ] **`cs-003` featured flag** — decide whether `saas-devops-overhaul` should be `isFeatured: true` (recommended)
- [ ] **Skip-to-content link** — add to `src/app/layout.tsx` before development starts
- [ ] **`suppressHydrationWarning`** on `<html lang="en" className="dark">` — add to `layout.tsx`

---

## 6. Audit Verdict

| Section | Result | Notes |
|---------|--------|-------|
| Component Mapping | ✅ Pass | 9/10 fully ready; 1 minor data decision (CaseStudies featured count) |
| Tone of Voice | ✅ Pass | All 14 content items pass Expert/Human constraint — no rewrites needed |
| Performance Budget | ✅ Pass | Architectural decisions already in place to hit Lighthouse ≥ 95 |
| A11y Standards | ✅ Pass | WCAG 2.1 AA rules defined, contrast validated, testing protocol set |

---

## ✅ Green Light — Proceed to Step 19

All four audit gates pass. The design system, content data, schemas, and technical architecture are fully aligned. No blockers to UI development.

**Recommended first component:** `Navbar.tsx` — it is the highest-complexity Client Component (scroll state + mobile drawer + focus trap) and sets the pattern for all others. Shipping it first ensures the layout shell is stable before sections are built inside it.

**Development order (suggested):**
1. `layout.tsx` — `<html>`, `<body>`, skip-to-content, font loading, metadata
2. `Navbar.tsx` — Client Component, scroll-aware, mobile drawer
3. `Footer.tsx` — Server Component, uses `SERVICES`
4. `Hero.tsx` — Server Component shell + Client Motion wrapper
5. `ServicesStrip.tsx` — Server Component, `SERVICES` data
6. `Process.tsx` — Server Component, static data
7. `CaseStudies.tsx` — Server Component, `CASE_STUDIES` filtered
8. `Testimonials.tsx` — Server Component, data from case studies
9. `TechStack.tsx` — Server Component, static data
10. `CTABand.tsx` — Server Component, static copy
11. `ContactForm.tsx` — Client Component, Zod validation, Server Action

---

*Document owner: Lead Architect / PM*  
*Companion docs: 08-wireframes-homepage.md · 09-design-system.md · api_specification.md · Testing_Playbook.md*  
*Next step: Step 19 — Component Development*
