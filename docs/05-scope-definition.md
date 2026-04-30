# Step 05 — Scope Definition
**Project:** SigmaTech Website Revamp
**Date:** 2026-04-25
**Status:** Approved — Pending Client Sign-off

---

## 1. Scope Philosophy

This project follows a **Phase-gated scope model**:
- **Phase 1 (MVP):** Launch-ready, high-performance marketing site — fast, polished, conversion-optimised
- **Phase 2:** Content management, dynamic features, integrations
- **Phase 3:** Advanced growth features

No Phase 2 or 3 features will be discussed during MVP development. Scope creep is the single largest risk to a timely, quality launch.

---

## 2. Phase 1 — In Scope (MVP)

### 2.1 Pages

| # | Page | Purpose |
|---|---|---|
| 1 | **Home** | Primary landing, hero, services overview, social proof, CTA |
| 2 | **Services** | Detailed breakdown of all service offerings |
| 3 | **Case Studies / Work** | Portfolio grid with individual case study pages |
| 4 | **About** | Company story, team, values, culture |
| 5 | **Blog** | Static article listing + individual article pages |
| 6 | **Contact** | Simple contact form + company info |
| 7 | **404** | Custom, on-brand not-found page |

### 2.2 Sections on the Homepage

| Section | Description |
|---|---|
| Navigation Bar | Sticky, scroll-aware, mobile drawer, single CTA |
| Hero | Headline, sub-headline, dual CTAs, social proof logos |
| Services Strip | Icon grid — 4–6 core services at a glance |
| How We Work | 3–4 step process — addresses PM buyer concerns |
| Case Studies | 2–3 featured cards linking to full case study pages |
| Testimonials | 3 rotating quotes with attribution |
| Tech Stack | Logo grid of technologies SigmaTech uses |
| Final CTA | Full-width call-to-action band |
| Footer | Links, social, legal, copyright |

### 2.3 Global Features

| Feature | Detail |
|---|---|
| Dark mode | Default on; respects `prefers-color-scheme` |
| Fully responsive | Mobile-first, tested at 375px, 768px, 1280px, 1440px |
| Framer Motion animations | Fade-up on scroll, no layout shift |
| SEO meta tags | Per-page title, description, OG tags, canonical |
| Sitemap | Auto-generated `sitemap.xml` |
| Robots.txt | Configured for crawling |
| Contact form | Validated, submission via Resend API |
| Analytics | PostHog or Plausible (privacy-friendly) |
| Fonts | Self-hosted via `next/font` — no external font latency |

### 2.4 Performance Targets (Non-Negotiable)

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| First Load JS (Homepage) | < 150 kB |

---

## 3. Phase 1 — Explicitly Out of Scope

| Feature | Reason | Phase |
|---|---|---|
| CMS (Sanity / Contentful) | Adds complexity; content is stable at launch | Phase 2 |
| Client / Customer Portal | Separate product entirely | Phase 3 |
| Job Board (dynamic listings) | Requires backend + admin | Phase 2 |
| Live chat widget | Third-party JS — harms Lighthouse score | Phase 2 |
| E-commerce / payments | Not part of business model | Never |
| Multi-language / i18n | No stated requirement | Phase 3 |
| Authentication / login | No requirement | Phase 3 |
| Search functionality | Low priority for MVP | Phase 2 |
| Newsletter integration | Phase 2 growth feature | Phase 2 |

---

## 4. Content Scope

### In Scope (SigmaTech to Supply)
- Company tagline and all body copy
- Service descriptions (6 max)
- 2–3 case studies with metrics
- 3 client testimonials with name/role/company
- Team member names, titles, and photos
- Logo assets: SigmaTech logo + client logos
- Tech stack logos

### Out of Scope
- Copywriting / content creation (SigmaTech owns this)
- Photography / custom illustration
- Video production

> **Dependency flag:** Content must be delivered within **5 business days of scope sign-off**. Any delay directly pushes the launch date.

---

## 5. Technical Scope

### Stack (Fixed)
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | next/font (Inter + JetBrains Mono) |
| Email | Resend API |
| Hosting | Vercel |
| Analytics | PostHog or Plausible |

### Repository Structure (Fixed)
```
src/
├── app/          # Pages and layouts (App Router)
├── components/
│   ├── layout/   # Navbar, Footer
│   ├── sections/ # Page-level sections
│   └── ui/       # Reusable primitives
├── lib/          # Utilities and API clients
└── styles/       # Global CSS additions
docs/             # This pre-development documentation
public/           # Static assets
```

---

## 6. Acceptance Criteria for Phase 1

Phase 1 is considered complete when:

- [ ] All 7 pages are live and fully responsive
- [ ] Lighthouse scores ≥ 95 across all 4 categories
- [ ] Core Web Vitals are all green in PageSpeed Insights
- [ ] Contact form submits successfully and sends email
- [ ] All pages have correct meta tags and OG images
- [ ] sitemap.xml and robots.txt are live and valid
- [ ] No TypeScript errors (`tsc --noEmit` passes clean)
- [ ] No ESLint errors or warnings
- [ ] Site renders correctly in Chrome, Firefox, Safari, Edge
- [ ] Site renders correctly on iOS Safari and Android Chrome

---

## 7. Change Control

Any request to add features to Phase 1 scope must go through this process:
1. Submit a written change request
2. PM assesses impact on timeline and performance targets
3. If approved, scope document is updated and re-signed
4. If rejected, feature is logged to Phase 2 backlog

Verbal scope additions will not be actioned.

---

*Document owner: Lead Architect / PM*
*Next step: Step 06 — Risk Analysis*
