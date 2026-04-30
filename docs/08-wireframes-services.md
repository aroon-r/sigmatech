# Step 08 — Wireframe Spec: Services Page
**Project:** SigmaTech Website Revamp
**Date:** 2026-04-25
**Route:** `/services` + `/services/[slug]`
**Status:** Approved — Pending Client Sign-off

---

## Page Architecture

The Services section has two levels:

```
/services                      ← Overview page (this document)
└── /services/[slug]           ← Individual service detail page
    ├── /services/web-development
    ├── /services/cloud-solutions
    ├── /services/qa-testing
    ├── /services/ui-ux-design
    ├── /services/consulting
    └── /services/staff-augmentation
```

Both share the global Navbar and Footer. Specs below cover both levels.

---

## Level 1 — `/services` (Overview Page)

### Page Scroll Map

```
       ┌─────────────────────┐
       │  NAVBAR (fixed)     │  shared global component
       └─────────────────────┘
       ┌─────────────────────┐
       │  PAGE HERO          │  ~360px  bg-gray-950 (dark)
       └─────────────────────┘
       ┌─────────────────────┐
       │  SERVICES GRID      │  ~700px  bg-white dark:bg-gray-950
       └─────────────────────┘
       ┌─────────────────────┐
       │  PROCESS STRIP      │  ~300px  bg-gray-50 dark:bg-gray-900
       └─────────────────────┘
       ┌─────────────────────┐
       │  TECH STRIP         │  ~200px  bg-white dark:bg-gray-950
       └─────────────────────┘
       ┌─────────────────────┐
       │  CTA BAND           │  ~280px  bg-brand-600
       └─────────────────────┘
       ┌─────────────────────┐
       │  FOOTER             │  shared global component
       └─────────────────────┘
```

---

### Section S1 — Page Hero
**Component:** `src/components/sections/PageHero.tsx` (reusable across all inner pages)
**Layout:** Left-aligned, full-width dark band
**Purpose:** Orient the user, set page context, provide breadcrumb trail

```
┌──────────────────────────────────────────────────────────────────────┐
│  PAGE HERO  —  pt-40 pb-24  bg-gray-950                             │
│                                                                      │
│  Home  /  Services                 ← breadcrumb                     │
│                                                                      │
│  Our Services                      ← h1                             │
│  From code to cloud — we deliver   ← sub-headline                   │
│  full-cycle software solutions     │                                 │
│  for ambitious companies.          │                                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  pt-40 pb-24  bg-gray-950  relative overflow-hidden
│
├── BACKGROUND ACCENT  aria-hidden
│   Subtle grid or dot pattern  opacity-10  absolute inset-0  -z-10
│
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── BREADCRUMB  flex items-center gap-2  mb-8
    │   text-sm text-gray-500
    │   ├── <a>  → /  "Home"  hover:text-gray-300  transition-colors
    │   ├── <ChevronRight h-4 w-4>  text-gray-700
    │   └── <span>  "Services"  text-gray-400
    │
    ├── <h1>  text-5xl lg:text-6xl font-bold tracking-tight
    │   text-white  max-w-3xl  mt-4
    │   └── "Our Services"
    │
    └── <p>  mt-6  text-xl  text-gray-400  max-w-2xl  leading-8
        └── "From code to cloud — we deliver full-cycle software
             solutions for ambitious companies."
```

---

### Section S2 — Services Grid (Full Detail)
**Component:** `src/components/sections/ServicesGrid.tsx`
**Layout:** 2-column card grid with expanded detail per card
**Purpose:** Deeper evaluation than the homepage strip — more copy, clear deliverables

```
┌──────────────────────────────────────────────────────────────────────┐
│  SERVICES GRID  —  py-24                                             │
│                                                                      │
│  ┌─────────────────────────────┐  ┌────────────────────────────────┐ │
│  │ < icon >  Web & App Dev     │  │ < icon >  Cloud & DevOps       │ │
│  │                             │  │                                │ │
│  │ Short paragraph describing  │  │ Short paragraph describing     │ │
│  │ what's included. 2-3 lines. │  │ what's included. 2-3 lines.   │ │
│  │                             │  │                                │ │
│  │ ✓ Deliverable one           │  │ ✓ Deliverable one              │ │
│  │ ✓ Deliverable two           │  │ ✓ Deliverable two              │ │
│  │ ✓ Deliverable three         │  │ ✓ Deliverable three            │ │
│  │                             │  │                                │ │
│  │ [ Learn more → ]            │  │ [ Learn more → ]               │ │
│  └─────────────────────────────┘  └────────────────────────────────┘ │
│                                                                      │
│  (Repeat for all 6 services — 3 rows × 2 columns)                   │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-24
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    └── SERVICES GRID  ▦
        grid grid-cols-1 md:grid-cols-2  gap-8
        │
        └── SERVICE CARD × 6  (repeat)
            <article>
            flex flex-col  gap-6  p-8  rounded-2xl
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900
            hover:border-brand-500 hover:shadow-lg
            transition-all duration-300  group
            │
            ├── CARD HEADER  flex items-start gap-4
            │   ├── ICON WRAPPER
            │   │   <div>  h-12 w-12  rounded-xl  flex-shrink-0
            │   │   bg-brand-50 dark:bg-brand-950
            │   │   flex items-center justify-center
            │   │   group-hover:bg-brand-100 transition-colors
            │   │   └── <{Icon}>  h-6 w-6  text-brand-600
            │   │
            │   └── TITLE STACK  flex flex-col  gap-1
            │       ├── <h2>  text-xl font-bold
            │       │   text-gray-900 dark:text-white
            │       │   └── "{Service Name}"
            │       └── <p>  text-sm text-gray-500 dark:text-gray-400
            │           └── "{One-line category descriptor}"
            │
            ├── DESCRIPTION
            │   <p>  text-base text-gray-600 dark:text-gray-400
            │   leading-relaxed
            │   └── "{2-3 sentence description of the service}"
            │
            ├── DELIVERABLES LIST
            │   <ul>  flex flex-col  gap-2
            │   └── DELIVERABLE ITEM × 3-4
            │       <li>  flex items-center gap-3
            │       ├── <CheckCircle2 h-4 w-4 text-brand-500 flex-shrink-0>
            │       └── <span>  text-sm text-gray-700 dark:text-gray-300
            │           └── "{Deliverable name}"
            │
            └── CARD FOOTER  mt-auto  pt-4
                border-t border-gray-100 dark:border-gray-800
                └── <a>  → /services/{slug}
                    flex items-center gap-2
                    text-sm font-semibold text-brand-600
                    group-hover:gap-3 transition-all
                    └── "Learn more"  +  <ArrowRight h-4 w-4>
```

### Service Card Data

| Service | Icon | Deliverables |
|---|---|---|
| Web & App Development | `<Code2>` | Custom web apps, Mobile-first PWAs, API development, Performance optimisation |
| Cloud & DevOps | `<Cloud>` | AWS / GCP infrastructure, CI/CD pipelines, Docker & Kubernetes, Cost optimisation |
| QA & Testing | `<ShieldCheck>` | Manual & automated testing, Load & performance testing, Test strategy, QA reporting |
| UI/UX Design | `<Palette>` | User research, Wireframes & prototypes, Design systems, Figma handoff |
| Tech Consulting | `<Lightbulb>` | Architecture reviews, Tech stack selection, Due diligence, CTO advisory |
| Staff Augmentation | `<Users>` | Vetted senior engineers, Team scaling, Short & long-term contracts, Seamless onboarding |

---

### Section S3 — Process Strip (Condensed)
**Component:** Reuse `<Process>` from homepage — condensed variant
**Layout:** Horizontal 4-step numbered row, no descriptions
**Purpose:** Reinforce process confidence before the CTA

```
┌──────────────────────────────────────────────────────────────────────┐
│  PROCESS STRIP  —  py-16  bg-gray-50 dark:bg-gray-900               │
│                                                                      │
│     01 Discovery  ──  02 Design  ──  03 Build  ──  04 Launch        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-16  bg-gray-50 dark:bg-gray-900
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── LABEL  text-center  mb-10
    │   <p>  text-xs font-medium uppercase tracking-widest
    │   text-gray-400 dark:text-gray-600
    │   └── "Our process"
    │
    └── STEPS ROW  ↔
        flex flex-wrap items-center justify-center gap-6
        │
        └── STEP × 4
            flex items-center gap-3
            ├── STEP NUMBER
            │   <span>  text-xs font-bold text-brand-500  tracking-widest
            │   └── "0{n}"
            ├── <{Icon}>  h-4 w-4  text-brand-600
            ├── <span>  text-sm font-semibold  text-gray-900 dark:text-white
            │   └── "{Step name}"
            └── CONNECTOR  (not on last item)
                <ChevronRight h-4 w-4  text-gray-300>
```

---

### Section S4 — Tech Strip
**Component:** Reuse `<TechStack>` from homepage
**Layout:** Logo strip, no heading
**Note:** Keep lightweight — just logos, no labels

---

### Section S5 — CTA Band
**Component:** Reuse `<CTABand>` from homepage
**Copy variant for Services page:**
- Headline: "Not sure which service you need?"
- Sub-headline: "Book a free 30-minute discovery call. We'll help you figure out the right approach."
- CTA: "Book a discovery call →"

---

## Level 2 — `/services/[slug]` (Individual Service Page)

### Page Scroll Map

```
       ┌─────────────────────┐
       │  NAVBAR (fixed)     │
       └─────────────────────┘
       ┌─────────────────────┐
       │  PAGE HERO          │  Service-specific headline  ~360px
       └─────────────────────┘
       ┌─────────────────────┐
       │  OVERVIEW SPLIT     │  Text left + visual right  ~480px
       └─────────────────────┘
       ┌─────────────────────┐
       │  DELIVERABLES LIST  │  Full expanded list  ~400px
       └─────────────────────┘
       ┌─────────────────────┐
       │  RELATED CASE STUDY │  1 featured card  ~320px
       └─────────────────────┘
       ┌─────────────────────┐
       │  OTHER SERVICES     │  Horizontal strip  ~260px
       └─────────────────────┘
       ┌─────────────────────┐
       │  CTA BAND           │  Service-specific copy
       └─────────────────────┘
       ┌─────────────────────┐
       │  FOOTER             │
       └─────────────────────┘
```

---

### Section D1 — Page Hero (Service-Specific)
Reuse `<PageHero>` — pass service name and description as props

```
┌──────────────────────────────────────────────────────────────────────┐
│  Home  /  Services  /  Web & App Development    ← breadcrumb        │
│                                                                      │
│  Web & App Development             ← h1 from service data            │
│  We build fast, scalable, and      ← service tagline                │
│  maintainable web applications.    │                                 │
│                                                                      │
│  [ Start a project → ]             ← CTA in hero (unique to detail) │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy — additions to PageHero

```
<section>  pt-40 pb-24  bg-gray-950
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── BREADCRUMB
    │   Home  /  Services  /  {Service Name}
    │
    ├── <h1>  "{Service Name}"
    ├── <p>  "{Service tagline}"
    │
    └── HERO CTA  mt-10  (not present on /services overview)
        <a>  → /contact
        inline-flex items-center gap-2
        bg-brand-600 hover:bg-brand-700  text-white
        px-6 py-3  rounded-lg  text-sm font-semibold
        └── "Start a project"  +  <ArrowRight h-4 w-4>
```

---

### Section D2 — Overview Split
**Layout:** 2-column — copy left (60%), visual right (40%)
**Purpose:** Expand on what the service is, who it's for, why SigmaTech

```
┌──────────────────────────────────────────────────────────────────────┐
│  OVERVIEW SPLIT  —  py-24                                            │
│                                                                      │
│  ┌──────────────────────────────┐  ┌─────────────────────────────┐  │
│  │  What we deliver             │  │                             │  │
│  │                              │  │   < service illustration    │  │
│  │  Full paragraph copy about   │  │     or screenshot / mockup  │  │
│  │  the service. 3-4 sentences  │  │     or abstract visual >    │  │
│  │  covering what it is, who    │  │                             │  │
│  │  it's for, and the outcome.  │  │                             │  │
│  │                              │  │                             │  │
│  │  Second paragraph expanding  │  │                             │  │
│  │  on our specific approach.   │  │                             │  │
│  └──────────────────────────────┘  └─────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-24
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    └── <div>  grid grid-cols-1 lg:grid-cols-5  gap-16  items-center
        │
        ├── LEFT COLUMN  lg:col-span-3  flex flex-col  gap-6
        │   ├── SECTION LABEL
        │   │   <p>  text-xs font-semibold uppercase tracking-widest
        │   │   text-brand-600  dark:text-brand-400
        │   │   └── "What we deliver"
        │   │
        │   ├── <h2>  text-3xl font-bold tracking-tight
        │   │   text-gray-900 dark:text-white
        │   │   └── "{Service-specific H2}"
        │   │
        │   ├── <p>  × 2  text-base leading-8
        │   │   text-gray-600 dark:text-gray-400
        │   │   └── "{Body copy — paragraph 1}"
        │   │   └── "{Body copy — paragraph 2}"
        │   │
        │   └── STAT ROW  flex flex-wrap gap-8  pt-4
        │       └── STAT × 2-3
        │           <div>  flex flex-col  gap-1
        │           ├── <span>  text-3xl font-bold text-brand-600
        │           │   └── "{Metric, e.g. 50+}"
        │           └── <span>  text-sm text-gray-500
        │               └── "{Metric label}"
        │
        └── RIGHT COLUMN  lg:col-span-2
            <div>  rounded-2xl overflow-hidden
            aspect-square  bg-gray-100 dark:bg-gray-800
            └── <Image>  fill object-cover
                alt="{Service illustration}"
                ※ Use abstract tech illustration or service mockup
```

---

### Section D3 — Deliverables List (Expanded)
**Layout:** 2-column checklist grid
**Purpose:** Specific, scannable — decision-makers check this against their needs

```
┌──────────────────────────────────────────────────────────────────────┐
│  DELIVERABLES  —  py-24  bg-gray-50 dark:bg-gray-900                │
│                                                                      │
│              What's included                                         │
│                                                                      │
│  ✓ Full-stack web application      ✓ REST & GraphQL APIs             │
│  ✓ Mobile-responsive design        ✓ Database architecture           │
│  ✓ Performance optimisation        ✓ Deployment & CI/CD setup        │
│  ✓ Code review & documentation     ✓ 30-day post-launch support      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-24  bg-gray-50 dark:bg-gray-900
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  text-center  mb-12
    │   └── <h2>  text-3xl font-bold  text-gray-900 dark:text-white
    │       └── "What's included"
    │
    └── DELIVERABLES GRID  ▦
        grid grid-cols-1 sm:grid-cols-2  gap-4  max-w-3xl mx-auto
        │
        └── DELIVERABLE ITEM × 6-8
            <div>  flex items-start gap-3
            p-4  rounded-xl
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            │
            ├── <CheckCircle2>  h-5 w-5  text-brand-500  flex-shrink-0  mt-0.5
            └── <div>  flex flex-col  gap-0.5
                ├── <span>  text-sm font-semibold
                │   text-gray-900 dark:text-white
                │   └── "{Deliverable name}"
                └── <span>  text-xs text-gray-500
                    └── "{Optional 1-line elaboration}"
```

---

### Section D4 — Related Case Study (Featured)
**Layout:** Full-width horizontal card — image left, content right
**Purpose:** Show proof specifically relevant to this service

```
┌──────────────────────────────────────────────────────────────────────┐
│  RELATED WORK  —  py-24                                              │
│                                                                      │
│  ┌────────────────────┐  ┌────────────────────────────────────────┐  │
│  │                    │  │  < Industry tag >                      │  │
│  │  < case study      │  │  Project Title                         │  │
│  │    cover image >   │  │  Short description of the project      │  │
│  │                    │  │  and the outcome achieved.             │  │
│  │                    │  │                                        │  │
│  │                    │  │  ⬆ Key metric achieved                 │  │
│  │                    │  │                                        │  │
│  │                    │  │  [ Read the case study → ]             │  │
│  └────────────────────┘  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-24
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION LABEL  mb-10
    │   <p>  text-xs font-semibold uppercase tracking-widest text-brand-600
    │   └── "Related work"
    │
    └── FEATURED CARD
        <a>  → /work/{slug}  group
        grid grid-cols-1 lg:grid-cols-2  gap-0  rounded-2xl
        overflow-hidden  border border-gray-200 dark:border-gray-700
        hover:shadow-xl  transition-all duration-300
        │
        ├── IMAGE COLUMN  aspect-[4/3] lg:aspect-auto  relative
        │   └── <Image>  fill object-cover
        │       group-hover:scale-105 transition-transform duration-500
        │
        └── CONTENT COLUMN  p-10  flex flex-col  gap-4
            bg-white dark:bg-gray-900
            ├── INDUSTRY TAG   text-xs font-semibold uppercase tracking-widest
            │   text-brand-600
            ├── <h3>  text-2xl font-bold  text-gray-900 dark:text-white
            ├── <p>   text-base text-gray-600 dark:text-gray-400  leading-relaxed
            ├── METRIC  flex items-center gap-2  text-sm font-semibold
            │   <TrendingUp h-4 w-4 text-brand-500>  + "{Key metric}"
            └── READ LINK  mt-auto
                flex items-center gap-2  text-sm font-semibold  text-brand-600
                group-hover:gap-3 transition-all
                "Read the case study"  +  <ArrowRight h-4 w-4>
```

---

### Section D5 — Other Services Strip
**Layout:** Horizontal scroll on mobile, row on desktop
**Purpose:** Cross-link to other services — reduce dead ends

```
┌──────────────────────────────────────────────────────────────────────┐
│  OTHER SERVICES  —  py-16  bg-gray-50 dark:bg-gray-900              │
│                                                                      │
│  Explore what else we do                                             │
│                                                                      │
│  [ Cloud & DevOps ]  [ QA & Testing ]  [ UI/UX Design ]  [ +2 ]    │
│  (exclude current service from this strip)                           │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  py-16  bg-gray-50 dark:bg-gray-900
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── <h3>  text-lg font-semibold  text-gray-900 dark:text-white  mb-8
    │   └── "Explore what else we do"
    │
    └── PILLS ROW  flex flex-wrap  gap-3
        └── SERVICE PILL × 5  (all services except current)
            <a>  → /services/{slug}
            flex items-center gap-2
            px-4 py-2.5  rounded-full
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-sm font-medium text-gray-700 dark:text-gray-300
            hover:border-brand-500 hover:text-brand-600
            transition-all
            ├── <{Icon}>  h-4 w-4  text-brand-500
            └── "{Service Name}"
```

---

## Shared Props Interface (TypeScript)

```typescript
// PageHero props
interface PageHeroProps {
  breadcrumbs: { label: string; href: string }[];
  headline:    string;
  subheadline: string;
  cta?:        { label: string; href: string };
}

// Service data shape
interface Service {
  slug:         string;
  name:         string;
  tagline:      string;
  icon:         LucideIcon;
  description:  string;
  deliverables: { title: string; detail?: string }[];
  stats:        { value: string; label: string }[];
  relatedWork?: string; // case study slug
}
```

---

## Component Reuse Map

| Component | Homepage | /services | /services/[slug] |
|---|:---:|:---:|:---:|
| `<Navbar>` | ✅ | ✅ | ✅ |
| `<PageHero>` | — | ✅ | ✅ (with CTA) |
| `<ServicesStrip>` | ✅ (compact) | — | — |
| `<ServicesGrid>` | — | ✅ | — |
| `<Process>` | ✅ (full) | ✅ (condensed) | — |
| `<TechStack>` | ✅ | ✅ | — |
| `<CTABand>` | ✅ | ✅ (alt copy) | ✅ (alt copy) |
| `<Footer>` | ✅ | ✅ | ✅ |
| `<CaseStudyCard>` | ✅ (grid) | — | ✅ (featured) |

---

*Document owner: Lead Architect / PM*
*Companion doc: 08-wireframes-homepage.md*
*Next step: Step 09 — UI/UX Design System*
