# Step 07 — Sitemap & User Flows
**Project:** nexora Website Revamp
**Date:** 2026-04-25
**Content Owner:** Internal PM (approved 2026-04-25)
**Status:** Approved — Pending Client Sign-off

---

## Part A — Sitemap

### A1. Full Site Sitemap

```
nexora.com/
│
├── / ................................................ Home
│   ├── #hero ......................................... Hero Section
│   ├── #services ..................................... Services Strip
│   ├── #process ...................................... How We Work
│   ├── #work ......................................... Featured Case Studies
│   ├── #testimonials ................................. Client Testimonials
│   ├── #stack ........................................ Tech Stack
│   └── #contact-cta .................................. Final CTA Band
│
├── /services ......................................... Services Overview
│   ├── /services/web-development ..................... Web & App Development
│   ├── /services/cloud-solutions ..................... Cloud & DevOps
│   ├── /services/qa-testing .......................... QA & Testing
│   ├── /services/ui-ux-design ........................ UI/UX Design
│   ├── /services/consulting .......................... Tech Consulting
│   └── /services/staff-augmentation .................. Staff Augmentation
│
├── /work ............................................. Case Studies Index
│   ├── /work/[slug] .................................. Individual Case Study
│   └── /work/[slug] .................................. Individual Case Study
│
├── /about ............................................ About nexora
│   ├── #story ........................................ Company Story
│   ├── #values ....................................... Values & Culture
│   └── #team ......................................... Team Grid
│
├── /blog ............................................. Blog Index
│   └── /blog/[slug] .................................. Individual Article
│
├── /contact .......................................... Contact Page
│
├── /privacy .......................................... Privacy Policy (placeholder)
├── /terms ............................................ Terms of Service (placeholder)
└── /404 .............................................. Custom Not Found Page
```

---

### A2. Page Inventory Table

| # | Route | Type | Priority | Dynamic | Phase |
|---|---|---|---|---|---|
| 1 | `/` | Marketing | Highest | No | MVP |
| 2 | `/services` | Marketing | High | No | MVP |
| 3 | `/services/[slug]` | Detail | Medium | Yes (static params) | MVP |
| 4 | `/work` | Portfolio | High | No | MVP |
| 5 | `/work/[slug]` | Detail | High | Yes (static params) | MVP |
| 6 | `/about` | Brand | Medium | No | MVP |
| 7 | `/blog` | Growth | Medium | No | MVP |
| 8 | `/blog/[slug]` | Growth | Medium | Yes (static params) | MVP |
| 9 | `/contact` | Conversion | Highest | No | MVP |
| 10 | `/privacy` | Legal | Low | No | MVP (placeholder) |
| 11 | `/terms` | Legal | Low | No | MVP (placeholder) |
| 12 | `/404` | System | — | No | MVP |

> All dynamic routes use `generateStaticParams()` — pre-rendered at build time, zero server cost.

---

### A3. Navigation Architecture

#### Primary Navigation (Desktop — Persistent)
```
[ nexora Logo ]    Services    Work    About    Blog    [ Get in touch → ]
```

#### Primary Navigation (Mobile — Hamburger Drawer)
```
nexora Logo  [ ☰ ]
─────────────────────
Services
Work
About
Blog
─────────────────────
[ Get in touch ]
```

#### Footer Navigation
```
Column 1: nexora     Column 2: Services      Column 3: Company      Column 4: Connect
─────────────────────   ─────────────────────   ────────────────────   ─────────────────
Logo + tagline          Web Development         About                  LinkedIn
Short description       Cloud & DevOps          Blog                   GitHub
                        QA & Testing            Contact                Twitter/X
                        UI/UX Design            Privacy Policy
                        Consulting              Terms of Service
                        Staff Augmentation

© 2026 nexora. All rights reserved.
```

---

## Part B — User Flows

Three primary user personas identified in Business Analysis. Each has a distinct intent, evaluation pattern, and conversion trigger.

---

### Flow 1 — The CEO / CTO (Primary Conversion Target)

**Goal:** Evaluate nexora as a long-term development partner for a significant project.
**Entry point:** Google search ("custom software development company") or LinkedIn referral
**Session behaviour:** Deliberate, reads carefully, scrolls the full page, looks for proof

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ENTRY POINT                                 │
│         Google Search / LinkedIn / Referral → Homepage              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                       │
│  • Reads headline: "We build software that scales with you"         │
│  • Scans sub-headline for relevance (yes — custom software)         │
│  • Sees dual CTA: "Start a project" (primary) / "View our work"     │
│                                                                     │
│  Decision: Do I stay or bounce?                                     │
│  ✅ Stays — headline is credible, design looks premium              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls down
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  SERVICES STRIP                                                     │
│  • Scans 6 service cards — confirms breadth of capability           │
│  • Clicks "Web Development" → /services/web-development             │
│  • Reads service detail — returns to homepage via breadcrumb        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls / returns to homepage
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  HOW WE WORK                                                        │
│  • Reads the 4-step process (Discovery → Design → Build → Launch)   │
│  • This removes fear of disorganised delivery                       │
│  ✅ Trust level increases                                           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  CASE STUDIES                                                       │
│  • Reads 2–3 featured case study cards                              │
│  • Clicks into 1 full case study → /work/[slug]                    │
│  • Checks: industry relevance, metrics, tech stack used             │
│  • Returns to homepage                                              │
│  ✅ Social proof validated                                          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TESTIMONIALS                                                       │
│  • Reads 3 client quotes — checks roles (CTO? CEO? PM?)             │
│  • Looks for specific outcomes, not generic praise                  │
│  ✅ Credibility confirmed by peer testimony                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TECH STACK                                                         │
│  • Confirms nexora uses modern tools (Next.js, AWS, etc.)        │
│  • This matters — CEO doesn't want a PHP shop                       │
│  ✅ Technical credibility confirmed                                 │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Scrolls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  FINAL CTA BAND                                                     │
│  • Sees: "Ready to build something great? Let's talk."              │
│  • Clicks: "Start a project" button                                 │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  CONTACT PAGE — /contact                                            │
│  • Fills: Name, Company, Email, Project description (4 fields max)  │
│  • Submits form                                                     │
│  ✅ CONVERSION — Lead captured, confirmation email sent             │
└─────────────────────────────────────────────────────────────────────┘
```

**Drop-off points to optimise:**
- Hero → scroll: headline must pass the 3-second test
- Case Studies → conversion: weak case studies kill this flow
- Contact form → submit: > 4 fields increases abandonment

---

### Flow 2 — The Product Manager

**Goal:** Find a vendor who can execute a defined product spec with minimal oversight.
**Entry point:** Peer recommendation, Clutch listing, or LinkedIn Ad
**Session behaviour:** Skips hero quickly, jumps to Process and Case Studies, reads blog for methodology signals

```
┌─────────────────────────────────────────────────────────────────────┐
│  ENTRY — Clutch / LinkedIn / Referral → Homepage                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Skims hero, scrolls fast
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  HOW WE WORK  ← Primary evaluation point for this persona          │
│  • Checks: sprint-based delivery? clear milestones? communication?  │
│  • Decision: Do they work like my team works?                       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                 ┌─────────────┴──────────────┐
                 ▼                            ▼
        Clicks Nav → /blog           Scrolls to Case Studies
        Reads 1 article              Looks for process detail
        (methodology signal)         in the case study pages
                 │                            │
                 └─────────────┬──────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  CONTACT PAGE                                                       │
│  • Fills in project brief with detailed spec                        │
│  ✅ CONVERSION — High-quality lead (PM buyers write detailed briefs)│
└─────────────────────────────────────────────────────────────────────┘
```

---

### Flow 3 — The HR / Talent Lead

**Goal:** Evaluate nexora for staff augmentation or outsourcing.
**Entry point:** LinkedIn search, job board, or Google ("staff augmentation services")
**Session behaviour:** Goes directly to About and Services; skims team section

```
┌─────────────────────────────────────────────────────────────────────┐
│  ENTRY → Homepage                                                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Clicks Nav immediately
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  /services → /services/staff-augmentation                           │
│  • Reads team size, specialisations, engagement models              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  /about → #team                                                     │
│  • Looks for: team size, credentials, culture signals               │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  CONTACT PAGE                                                       │
│  • Fills: Name, Company, Email, "Tell us about your need"           │
│  ✅ CONVERSION — Staffing enquiry logged                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Part C — Critical Path: Hero → Contact (Annotated)

This is the single most important journey on the site. Every design and copy decision should be evaluated against this path.

```
HERO
 │  Hook: Headline passes 3-second test
 │  Proof: Social proof logos visible without scrolling
 │  CTA: "Start a project" — above the fold
 │
 ▼
SERVICES STRIP  ─── [Exit risk: low — just a confidence scan]
 │  Job: answer "but can they do what I need?"
 │  Max: 6 services, icon + 1-line description each
 │
 ▼
HOW WE WORK  ─── [Exit risk: low — builds trust]
 │  Job: answer "but will they be organised?"
 │  Format: numbered steps, 4 max, one sentence each
 │
 ▼
CASE STUDIES  ─── [Exit risk: HIGH — weak proof = bounce]
 │  Job: answer "but have they done this before?"
 │  Must include: client industry, challenge, result with a metric
 │  CTA per card: "Read case study →"
 │
 ▼
TESTIMONIALS  ─── [Exit risk: medium]
 │  Job: answer "but do their clients actually like them?"
 │  Must include: name, role, company — no anonymous quotes
 │
 ▼
TECH STACK  ─── [Exit risk: low]
 │  Job: answer "are they technically current?"
 │  Format: logo grid, no descriptions needed
 │
 ▼
FINAL CTA BAND  ─── [Conversion point]
 │  One headline, one CTA button, zero distractions
 │  Copy: "Ready to build something great? Let's talk."
 │
 ▼
CONTACT PAGE  ─── [Final conversion gate]
    Fields: Name / Company / Email / Project Brief
    Friction rule: 4 fields maximum
    Submit: Sends email via Resend, shows success state
    Follow-up: Automated confirmation email sent to user
```

---

## Part D — URL & SEO Slug Conventions

| Page | URL Pattern | Primary Keyword Target |
|---|---|---|
| Home | `/` | "software development company" |
| Services | `/services` | "software development services" |
| Web Dev | `/services/web-development` | "custom web development" |
| Cloud | `/services/cloud-solutions` | "cloud solutions company" |
| QA | `/services/qa-testing` | "QA testing services" |
| Design | `/services/ui-ux-design` | "UI UX design agency" |
| Consulting | `/services/consulting` | "tech consulting services" |
| Staff Aug | `/services/staff-augmentation` | "staff augmentation services" |
| Work | `/work` | "software development portfolio" |
| Case Study | `/work/[descriptive-slug]` | project/client keywords |
| About | `/about` | "about nexora" |
| Blog | `/blog` | "software development blog" |
| Article | `/blog/[descriptive-slug]` | article-specific keywords |
| Contact | `/contact` | "contact software development company" |

> **Slug rule:** All slugs are lowercase, hyphenated, descriptive — never numeric IDs. Example: `/work/ecommerce-platform-redesign` not `/work/123`.

---

*Document owner: Lead Architect / PM*
*Next step: Step 08 — Wireframes*
