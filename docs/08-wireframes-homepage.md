# Step 08 — Wireframe Spec: Homepage
**Project:** SigmaTech Website Revamp
**Date:** 2026-04-25
**Route:** `/`
**Status:** Approved — Pending Client Sign-off

---

## Spec Conventions

| Symbol | Meaning |
|---|---|
| `[ ]` | Interactive element (button, link, input) |
| `{ }` | Dynamic / content-supplied value |
| `< >` | Asset slot (image, icon, logo) |
| `—` | Visual separator / divider |
| `↔` | Horizontal layout |
| `↕` | Vertical stack |
| `▦` | Grid layout |
| `※` | Responsive note |

Typography scale (Tailwind):
- `display`: `text-7xl` / `font-bold` / `tracking-tight`
- `h1`: `text-5xl–7xl` / `font-bold`
- `h2`: `text-4xl` / `font-bold`
- `h3`: `text-2xl` / `font-semibold`
- `body-lg`: `text-lg` / `font-normal`
- `body`: `text-base` / `font-normal`
- `label`: `text-sm` / `font-medium`
- `caption`: `text-xs` / `font-medium` / `tracking-widest uppercase`

Spacing scale (Tailwind):
- Section vertical padding: `py-24` (desktop) / `py-16` (mobile)
- Section inner gap: `gap-16` (desktop) / `gap-10` (mobile)
- Component gap: `gap-8`
- Element gap: `gap-4` / `gap-6`

Global container: `max-w-7xl mx-auto px-6 lg:px-8`

---

## Section 01 — Navbar
**Component:** `src/components/layout/Navbar.tsx`
**Position:** Fixed, `top-0`, `z-50`, `inset-x-0`
**Height:** `64px` (py-4 + content)

```
┌──────────────────────────────────────────────────────────────────────┐
│  NAVBAR  —  fixed, full-width, scroll-aware                         │
│                                                                      │
│  < Zap icon >  SigmaTech          Services  Work  About  Blog       │
│  ↑ Logo group (flex, gap-2)       ↑ Nav links (hidden below md)     │
│                                                          ↓           │
│                                              [ Get in touch → ]      │
│                                              ↑ Primary CTA button    │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<header>  fixed inset-x-0 top-0 z-50
│  Scroll state: transparent → bg-white/80 backdrop-blur-md shadow-sm
│  Transition: duration-300
│
└── <nav>  max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-8
    │
    ├── LOGO GROUP  flex items-center gap-2
    │   ├── <Zap>  h-5 w-5  color: brand-500
    │   └── <span>  "SigmaTech"  text-lg font-semibold text-gray-900 dark:text-white
    │
    ├── NAV LINKS  hidden md:flex  items-center gap-8
    │   ├── <a> "Services"  → /services
    │   ├── <a> "Work"      → /work
    │   ├── <a> "About"     → /about
    │   └── <a> "Blog"      → /blog
    │   Typography: text-sm font-medium text-gray-600 hover:text-gray-900
    │
    ├── CTA BUTTON  hidden md:block
    │   └── <a> "Get in touch"  → /contact
    │       bg-brand-600 hover:bg-brand-700 text-white
    │       px-4 py-2 rounded-lg text-sm font-semibold
    │
    └── MOBILE TOGGLE  flex md:hidden
        └── <button>  p-2 rounded-md
            ├── State: closed → <Menu> icon h-5 w-5
            └── State: open   → <X>    icon h-5 w-5
```

### Mobile Drawer (open state)
```
<div>  bg-white dark:bg-gray-950  border-t  px-6 pb-6
└── <ul>  flex flex-col gap-4 pt-4
    ├── <a> "Services"
    ├── <a> "Work"
    ├── <a> "About"
    ├── <a> "Blog"
    └── <a> "Get in touch"  (full-width CTA button)
```

### States & Interactions
| State | Behaviour |
|---|---|
| Default (top of page) | `bg-transparent` |
| Scrolled > 16px | `bg-white/80 backdrop-blur-md shadow-sm` |
| Mobile menu closed | Hamburger icon |
| Mobile menu open | X icon + drawer slides in from top |
| Nav link hover | `text-gray-900` (light) / `text-white` (dark) |
| CTA hover | `bg-brand-700` |

---

## Section 02 — Hero
**Component:** `src/components/sections/Hero.tsx`
**Layout:** Single column, centred, full viewport height
**Position:** First section, `pt-24` to clear fixed navbar

```
┌──────────────────────────────────────────────────────────────────────┐
│  HERO  —  min-h-screen, centred column, overflow-hidden             │
│                                                                      │
│  < gradient blob — decorative, aria-hidden, positioned behind >     │
│                                                                      │
│              ● Now hiring — join our team                            │
│              ↑ Badge chip                                            │
│                                                                      │
│        We build software that                                        │
│              scales with you                    ← gradient text      │
│        ↑ H1 — max-w-4xl, centred                                    │
│                                                                      │
│    SigmaTech delivers high-performance web applications,             │
│    APIs, and digital products — engineered for reliability.          │
│    ↑ Sub-headline — max-w-2xl, centred                              │
│                                                                      │
│        [ Start a project → ]    [ ⎔ View our work ]                │
│        ↑ Primary CTA            ↑ Secondary CTA                     │
│                                                                      │
│  ─ ─ ─ ─ ─  TRUSTED BY TEAMS AT  ─ ─ ─ ─ ─                        │
│   Acme Corp    Globex    Initech    Umbrella    Hooli                │
│   ↑ Social proof strip — muted logo names                           │
│                                                                      │
│  < gradient fade to background — bottom, aria-hidden >              │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section>  relative isolate flex flex-col items-center justify-center
│          min-h-screen overflow-hidden px-6 pt-24 text-center lg:px-8
│
├── BACKGROUND BLOB  (decorative)
│   └── <div>  aria-hidden  absolute inset-x-0 -top-40 -z-10
│       transform-gpu overflow-hidden blur-3xl
│       └── <div>  gradient: from-brand-300 to-brand-600  opacity-20
│           clip-path polygon (organic blob shape)  rotate-[30deg]
│
├── BADGE  motion.div  fadeUp delay-0
│   └── <span>  inline-flex items-center gap-1.5
│       border border-brand-200 bg-brand-50 rounded-full
│       px-3 py-1  text-xs font-medium text-brand-700
│       ├── <span>  h-1.5 w-1.5 rounded-full bg-brand-500  (pulse dot)
│       └── "Now hiring — join our team"
│
├── HEADLINE  motion.h1  fadeUp delay-100
│   mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl
│   font-bold tracking-tight text-gray-900 dark:text-white
│   ├── "We build software that "
│   └── <span class="text-gradient">  "scales with you"
│
├── SUB-HEADLINE  motion.p  fadeUp delay-200
│   mt-6 max-w-2xl text-lg leading-8
│   text-gray-600 dark:text-gray-400
│   └── "{tagline copy — 2 sentences max}"
│
├── CTA GROUP  motion.div  fadeUp delay-300
│   mt-10 flex flex-wrap items-center justify-center gap-4
│   ├── PRIMARY CTA
│   │   <a>  → /contact  or → #contact
│   │   flex items-center gap-2  rounded-lg
│   │   bg-brand-600 hover:bg-brand-700  text-white
│   │   px-6 py-3  text-sm font-semibold  shadow-sm
│   │   └── "Start a project"  +  <ArrowRight h-4 w-4>
│   │
│   └── SECONDARY CTA
│       <a>  → /work
│       flex items-center gap-2  rounded-lg  border
│       border-gray-300 bg-white hover:bg-gray-50
│       dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800
│       px-6 py-3  text-sm font-semibold  shadow-sm
│       └── <Github h-4 w-4>  +  "View our work"
│
├── SOCIAL PROOF  motion.div  fadeUp delay-400 + delay-450
│   mt-14
│   ├── LABEL  text-xs font-medium uppercase tracking-widest
│   │   text-gray-400 dark:text-gray-600
│   │   └── "Trusted by teams at"
│   │
│   └── LOGO STRIP  flex flex-wrap items-center justify-center
│       gap-x-10 gap-y-4  mt-4
│       └── {5 × client name placeholder}
│           text-sm font-semibold  text-gray-300 dark:text-gray-700
│           ※ Replace with <Image> SVG logos post content delivery
│
└── BOTTOM FADE  aria-hidden
    absolute inset-x-0 bottom-0 -z-10  h-32
    bg-gradient-to-t from-white dark:from-gray-950
```

### Responsive Behaviour
| Breakpoint | Typography | Layout |
|---|---|---|
| Mobile (375px) | `text-5xl` | Single column, full-width CTAs stack vertically |
| Tablet (768px) | `text-6xl` | CTAs side by side |
| Desktop (1280px+) | `text-7xl` | Full layout as spec'd |

### Animation Spec (Framer Motion)
| Element | Delay | Duration | Easing |
|---|---|---|---|
| Badge | 0ms | 600ms | easeOut |
| Headline | 100ms | 600ms | easeOut |
| Sub-headline | 200ms | 600ms | easeOut |
| CTAs | 300ms | 600ms | easeOut |
| Social proof label | 400ms | 600ms | easeOut |
| Logo strip | 450ms | 600ms | easeOut |
| From: `y: 24, opacity: 0` → To: `y: 0, opacity: 1` | — | — | — |

---

## Section 03 — Services Strip
**Component:** `src/components/sections/ServicesStrip.tsx`
**Layout:** Centred heading + 6-column icon grid
**Purpose:** Fast capability scan — not a deep read

```
┌──────────────────────────────────────────────────────────────────────┐
│  SERVICES STRIP  —  py-24 bg-gray-50 dark:bg-gray-900/50            │
│                                                                      │
│              What we do                                              │
│   We cover the full product lifecycle — from idea to launch.         │
│                                                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │  <>  │  │  <>  │  │  <>  │  │  <>  │  │  <>  │  │  <>  │       │
│  │ Web  │  │Cloud │  │  QA  │  │Design│  │Conslt│  │Staff │       │
│  │ Dev  │  │& Ops │  │& Test│  │UX/UI │  │      │  │ Aug  │       │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘       │
│  ↑ 6-up grid (desktop) / 2-up grid (mobile)                         │
│                                                                      │
│                   [ Explore all services → ]                         │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="services">  py-24  bg-gray-50 dark:bg-gray-900/50
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  text-center  mb-16
    │   ├── <h2>  text-4xl font-bold tracking-tight
    │   │   text-gray-900 dark:text-white
    │   │   └── "What we do"
    │   └── <p>  mt-4 text-lg text-gray-600 dark:text-gray-400  max-w-2xl mx-auto
    │       └── "We cover the full product lifecycle — from idea to launch."
    │
    └── SERVICE GRID  ▦
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-8
        │
        └── SERVICE CARD × 6  (repeat)
            <a>  → /services/{slug}
            flex flex-col items-center text-center  gap-4
            p-6  rounded-2xl  bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            hover:border-brand-500 hover:shadow-md
            transition-all duration-200  group
            │
            ├── ICON WRAPPER
            │   <div>  h-12 w-12  rounded-xl
            │   bg-brand-50 dark:bg-brand-950
            │   flex items-center justify-center
            │   group-hover:bg-brand-100 transition-colors
            │   └── <{Icon}>  h-6 w-6  text-brand-600
            │
            ├── SERVICE NAME
            │   <h3>  text-sm font-semibold
            │   text-gray-900 dark:text-white
            │   └── "{Service Name}"
            │
            └── SHORT DESCRIPTION
                <p>  text-xs text-gray-500 dark:text-gray-400
                leading-relaxed
                └── "{1-line description}"
```

### Service Cards Data

| Slot | Service Name | Icon (Lucide) | Slug |
|---|---|---|---|
| 1 | Web & App Development | `<Code2>` | `web-development` |
| 2 | Cloud & DevOps | `<Cloud>` | `cloud-solutions` |
| 3 | QA & Testing | `<ShieldCheck>` | `qa-testing` |
| 4 | UI/UX Design | `<Palette>` | `ui-ux-design` |
| 5 | Tech Consulting | `<Lightbulb>` | `consulting` |
| 6 | Staff Augmentation | `<Users>` | `staff-augmentation` |

### Responsive Behaviour
| Breakpoint | Grid | Card layout |
|---|---|---|
| Mobile (375px) | 2 columns | Icon top, name below |
| Tablet (768px) | 3 columns | Same |
| Desktop (1280px+) | 6 columns | Same |

---

## Section 04 — How We Work (Process)
**Component:** `src/components/sections/Process.tsx`
**Layout:** Centred heading + horizontal 4-step flow
**Purpose:** Address PM and CTO concern: "are they organised?"

```
┌──────────────────────────────────────────────────────────────────────┐
│  HOW WE WORK  —  py-24                                              │
│                                                                      │
│               How we work                                            │
│   A repeatable, battle-tested process — every project, every time.  │
│                                                                      │
│   01 ─────────────── 02 ─────────────── 03 ─────────────── 04      │
│  [ < ] Discovery    [ < ] Design       [ < ] Build         [ < ]   │
│  We align on       We wireframe       Sprint-based         We ship, │
│  goals, scope,     and prototype      development          support, │
│  and success       before a line      with weekly          iterate. │
│  metrics.          is written.        check-ins.                    │
│  ↑ step number + icon + title + 1-paragraph description              │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="process">  py-24
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  text-center  mb-16
    │   ├── <h2>  text-4xl font-bold tracking-tight
    │   │   text-gray-900 dark:text-white
    │   │   └── "How we work"
    │   └── <p>  mt-4 text-lg text-gray-600 dark:text-gray-400  max-w-2xl mx-auto
    │
    └── STEPS GRID  ▦
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8
        relative
        │
        ├── CONNECTOR LINE  (desktop only)
        │   aria-hidden  absolute top-10 left-0 right-0
        │   hidden lg:block  h-px bg-gray-200 dark:bg-gray-700
        │   z-0
        │
        └── STEP CARD × 4  (repeat)
            <div>  relative z-10  flex flex-col  gap-4
            │
            ├── STEP NUMBER + ICON ROW  flex items-center gap-3
            │   ├── STEP NUMBER
            │   │   <span>  text-xs font-bold tracking-widest uppercase
            │   │   text-brand-500
            │   │   └── "0{n}"
            │   └── ICON CIRCLE
            │       <div>  h-10 w-10  rounded-full
            │       bg-brand-600  flex items-center justify-center
            │       ring-4 ring-white dark:ring-gray-950
            │       └── <{Icon}>  h-5 w-5 text-white
            │
            ├── STEP TITLE
            │   <h3>  text-xl font-semibold
            │   text-gray-900 dark:text-white
            │   └── "{Step Name}"
            │
            └── STEP DESCRIPTION
                <p>  text-sm text-gray-600 dark:text-gray-400
                leading-relaxed
                └── "{2-3 sentence description}"
```

### Step Data

| # | Icon | Title | Description |
|---|---|---|---|
| 01 | `<Search>` | Discovery | We align on goals, users, scope, and measurable success criteria before anything else. |
| 02 | `<PenTool>` | Design | We wireframe, prototype, and validate — no surprises once development begins. |
| 03 | `<Terminal>` | Build | Sprint-based delivery with weekly demos and async standups. You see progress every week. |
| 04 | `<Rocket>` | Launch | We ship, monitor, and iterate. Deployment is not the end — it's the beginning. |

---

## Section 05 — Featured Case Studies
**Component:** `src/components/sections/CaseStudies.tsx`
**Layout:** Centred heading + 3-column card grid
**Purpose:** Highest-stakes section — proof of delivery at quality

```
┌──────────────────────────────────────────────────────────────────────┐
│  CASE STUDIES  —  py-24  bg-gray-50 dark:bg-gray-900/50             │
│                                                                      │
│               Our work                                               │
│   Real problems. Measurable outcomes. Shipped software.              │
│                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────┐ │
│  │ < cover image >     │  │ < cover image >     │  │ < cover >   │ │
│  │─────────────────────│  │─────────────────────│  │─────────────│ │
│  │ < Industry tag >    │  │ < Industry tag >    │  │ < tag >     │ │
│  │ Project Title       │  │ Project Title       │  │ Title       │ │
│  │ Short description   │  │ Short description   │  │ Desc        │ │
│  │ ─────────────────── │  │ ─────────────────── │  │ ─────────── │ │
│  │ ⬆ 60% load time    │  │ ⬆ 3× conversion    │  │ ★ metric   │ │
│  │ Read case study →   │  │ Read case study →   │  │ Read →      │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────┘ │
│                                                                      │
│                   [ View all case studies → ]                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="work">  py-24  bg-gray-50 dark:bg-gray-900/50
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  flex items-end justify-between  mb-16
    │   ├── LEFT  flex flex-col gap-4
    │   │   ├── <h2>  text-4xl font-bold tracking-tight
    │   │   │   text-gray-900 dark:text-white
    │   │   │   └── "Our work"
    │   │   └── <p>  text-lg text-gray-600 dark:text-gray-400  max-w-xl
    │   └── RIGHT  hidden md:block
    │       └── <a>  → /work  "View all case studies →"
    │           text-sm font-semibold text-brand-600
    │           hover:text-brand-700 flex items-center gap-1
    │
    └── CASE STUDY GRID  ▦
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8
        │
        └── CASE STUDY CARD × 3
            <a>  → /work/{slug}
            group  flex flex-col  rounded-2xl  overflow-hidden
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            hover:shadow-xl transition-all duration-300
            │
            ├── COVER IMAGE  aspect-video  overflow-hidden
            │   └── <Image>  fill object-cover
            │       group-hover:scale-105 transition-transform duration-500
            │       alt="{Project name} — {client}"
            │       ※ MUST use next/image — raw <img> forbidden
            │
            └── CARD BODY  flex flex-col  p-6  gap-4  flex-1
                │
                ├── INDUSTRY TAG
                │   <span>  text-xs font-semibold tracking-widest uppercase
                │   text-brand-600 dark:text-brand-400
                │   └── "{Industry}"
                │
                ├── PROJECT TITLE
                │   <h3>  text-xl font-bold
                │   text-gray-900 dark:text-white  leading-snug
                │   └── "{Project Title}"
                │
                ├── DESCRIPTION
                │   <p>  text-sm text-gray-600 dark:text-gray-400
                │   leading-relaxed  line-clamp-3
                │   └── "{2-3 sentence summary}"
                │
                ├── DIVIDER  h-px bg-gray-100 dark:bg-gray-700
                │
                ├── METRIC CALLOUT
                │   <p>  text-sm font-semibold
                │   text-gray-900 dark:text-white
                │   flex items-center gap-2
                │   └── <TrendingUp h-4 w-4 text-brand-500>
                │       + "{Key metric, e.g. 60% reduction in load time}"
                │
                └── READ LINK  mt-auto
                    <span>  text-sm font-semibold text-brand-600
                    flex items-center gap-1
                    group-hover:gap-2 transition-all
                    └── "Read case study"  +  <ArrowRight h-4 w-4>
```

### Responsive Behaviour
| Breakpoint | Grid | Image |
|---|---|---|
| Mobile (375px) | 1 column, full-width | aspect-video |
| Tablet (768px) | 2 columns | aspect-video |
| Desktop (1280px+) | 3 columns | aspect-video |

---

## Section 06 — Testimonials
**Component:** `src/components/sections/Testimonials.tsx`
**Layout:** Centred heading + 3-column quote cards
**Purpose:** Peer validation — humanise SigmaTech with real voices

```
┌──────────────────────────────────────────────────────────────────────┐
│  TESTIMONIALS  —  py-24                                              │
│                                                                      │
│              Don't take our word for it                              │
│                                                                      │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────┐ │
│  │ " quote text here    │  │ " quote text here    │  │ " quote   │ │
│  │   spanning 2–3 lines │  │   spanning 2–3 lines │  │   text    │ │
│  │   of real feedback " │  │   of real feedback " │  │   here "  │ │
│  │ ──────────────────── │  │ ──────────────────── │  │ ───────── │ │
│  │ < avatar >  Name     │  │ < avatar >  Name     │  │ <avatar>  │ │
│  │             Role     │  │             Role     │  │ Name      │ │
│  │             Company  │  │             Company  │  │ Company   │ │
│  └──────────────────────┘  └──────────────────────┘  └───────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="testimonials">  py-24
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  text-center  mb-16
    │   └── <h2>  text-4xl font-bold tracking-tight
    │       text-gray-900 dark:text-white
    │       └── "Don't take our word for it"
    │
    └── TESTIMONIAL GRID  ▦
        grid grid-cols-1 md:grid-cols-3  gap-8
        │
        └── TESTIMONIAL CARD × 3
            <figure>  flex flex-col  gap-6
            p-8  rounded-2xl
            bg-gray-50 dark:bg-gray-800/50
            border border-gray-100 dark:border-gray-700
            │
            ├── QUOTE MARK  aria-hidden
            │   <span>  text-4xl text-brand-400  font-serif  leading-none
            │   └── """
            │
            ├── QUOTE TEXT
            │   <blockquote>  text-base leading-8
            │   text-gray-700 dark:text-gray-300
            │   └── "{Testimonial text — 2–4 sentences}"
            │
            └── ATTRIBUTION  flex items-center gap-4  mt-auto
                ├── AVATAR
                │   <Image>  h-12 w-12  rounded-full  object-cover
                │   border-2 border-brand-500
                │   alt="{Name}"
                └── DETAILS  flex flex-col
                    ├── <cite>  text-sm font-semibold
                    │   text-gray-900 dark:text-white  not-italic
                    │   └── "{Full Name}"
                    ├── <span>  text-xs text-gray-500
                    │   └── "{Role}"
                    └── <span>  text-xs font-medium text-brand-600
                        └── "{Company Name}"
```

---

## Section 07 — Tech Stack
**Component:** `src/components/sections/TechStack.tsx`
**Layout:** Centred heading + scrolling logo grid
**Purpose:** Signal technical currency — "they use the tools we use"

```
┌──────────────────────────────────────────────────────────────────────┐
│  TECH STACK  —  py-24  bg-gray-50 dark:bg-gray-900/50               │
│                                                                      │
│          Built with the best tools in the industry                   │
│                                                                      │
│   < Next.js >  < React >  < TypeScript >  < AWS >  < Tailwind >     │
│   < Docker >   < GitHub > < PostgreSQL >  < Figma > < Vercel >      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="stack">  py-24  bg-gray-50 dark:bg-gray-900/50
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── SECTION HEADER  text-center  mb-12
    │   └── <p>  text-xs font-medium uppercase tracking-widest
    │       text-gray-400 dark:text-gray-600
    │       └── "Built with the best tools in the industry"
    │
    └── LOGO GRID  ▦
        grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10
        gap-8 items-center justify-items-center
        │
        └── LOGO ITEM × 10
            <div>  flex items-center justify-center
            opacity-60 hover:opacity-100 transition-opacity
            grayscale hover:grayscale-0 transition-all duration-300
            └── <Image>  h-8 w-auto  object-contain
                alt="{Technology name}"
```

### Tech Stack Items

| Slot | Technology | Category |
|---|---|---|
| 1 | Next.js | Frontend |
| 2 | React | Frontend |
| 3 | TypeScript | Language |
| 4 | Tailwind CSS | Styling |
| 5 | Node.js | Backend |
| 6 | PostgreSQL | Database |
| 7 | AWS | Cloud |
| 8 | Docker | DevOps |
| 9 | GitHub | Version Control |
| 10 | Figma | Design |

---

## Section 08 — Final CTA Band
**Component:** `src/components/sections/CTABand.tsx`
**Layout:** Full-width band, centred single column
**Purpose:** Last conversion point — zero distractions

```
┌──────────────────────────────────────────────────────────────────────┐
│  CTA BAND  —  py-24  bg-brand-600  dark:bg-brand-700                │
│                                                                      │
│         Ready to build something great?                              │
│      Let's talk about what we can do together.                       │
│                                                                      │
│                  [ Start a project → ]                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<section id="contact-cta">  py-24
│  bg-brand-600 dark:bg-brand-700
│  relative overflow-hidden
│
├── BACKGROUND TEXTURE  aria-hidden
│   (optional: subtle grid pattern or noise texture via CSS)
│
└── <div>  max-w-7xl mx-auto px-6 lg:px-8  text-center
    │
    ├── <h2>  text-4xl font-bold tracking-tight text-white
    │   └── "Ready to build something great?"
    │
    ├── <p>  mt-4 text-lg text-brand-100  max-w-xl mx-auto
    │   └── "Let's talk about what we can do together."
    │
    └── CTA BUTTON  mt-10
        <a>  → /contact
        inline-flex items-center gap-2
        bg-white text-brand-600 hover:bg-brand-50
        px-8 py-4  rounded-lg
        text-base font-semibold  shadow-sm
        └── "Start a project"  +  <ArrowRight h-5 w-5>
```

---

## Section 09 — Footer
**Component:** `src/components/layout/Footer.tsx`
**Layout:** 4-column grid + copyright bar

```
┌──────────────────────────────────────────────────────────────────────┐
│  FOOTER  —  pt-16 pb-8  bg-gray-950  text-gray-400                  │
│                                                                      │
│  < Logo >  SigmaTech     Services        Company       Connect      │
│  Tagline copy            Web Dev         About          LinkedIn    │
│                          Cloud & DevOps  Blog           GitHub      │
│                          QA & Testing    Contact        Twitter/X   │
│                          UI/UX Design    Privacy                    │
│                          Consulting      Terms                      │
│                          Staff Aug                                  │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────  │
│  © 2026 SigmaTech. All rights reserved.                             │
└──────────────────────────────────────────────────────────────────────┘
```

### Element Hierarchy

```
<footer>  bg-gray-950  pt-16 pb-8
└── <div>  max-w-7xl mx-auto px-6 lg:px-8
    │
    ├── FOOTER GRID  ▦
    │   grid grid-cols-2 md:grid-cols-4  gap-8  pb-12
    │   border-b border-gray-800
    │   │
    │   ├── COL 1 — Brand
    │   │   ├── LOGO  flex items-center gap-2  mb-4
    │   │   │   ├── <Zap h-5 w-5 text-brand-500>
    │   │   │   └── <span>  "SigmaTech"  text-white font-semibold
    │   │   └── <p>  text-sm text-gray-400  max-w-xs  leading-relaxed
    │   │       └── "{Short brand tagline}"
    │   │
    │   ├── COL 2 — Services
    │   │   ├── <h4>  text-xs font-semibold uppercase tracking-widest
    │   │   │   text-gray-500  mb-4
    │   │   │   └── "Services"
    │   │   └── <ul>  flex flex-col  gap-3
    │   │       └── <li> × 6  →  /services/{slug}
    │   │           text-sm text-gray-400 hover:text-white transition-colors
    │   │
    │   ├── COL 3 — Company
    │   │   ├── <h4>  (same as above)  "Company"
    │   │   └── <ul>  gap-3
    │   │       ├── About  → /about
    │   │       ├── Blog   → /blog
    │   │       ├── Contact → /contact
    │   │       ├── Privacy → /privacy
    │   │       └── Terms   → /terms
    │   │
    │   └── COL 4 — Connect
    │       ├── <h4>  "Connect"
    │       └── <ul>  gap-3
    │           ├── LinkedIn (external)  flex items-center gap-2
    │           │   <Linkedin h-4 w-4>  + "LinkedIn"
    │           ├── GitHub (external)
    │           └── Twitter/X (external)
    │
    └── COPYRIGHT BAR  flex items-center justify-between  pt-8
        ├── <p>  text-xs text-gray-600
        │   └── "© 2026 SigmaTech. All rights reserved."
        └── <p>  text-xs text-gray-600
            └── "Built with Next.js & Tailwind CSS"
```

---

## Homepage — Full Section Order & Scroll Map

```
0px    ┌─────────────────────┐
       │  NAVBAR (fixed)     │  h-16  z-50
       └─────────────────────┘
       ┌─────────────────────┐
       │  HERO               │  min-h-screen  ~900px
       │                     │
0px    └─────────────────────┘
       ┌─────────────────────┐
       │  SERVICES STRIP     │  ~480px  bg-gray-50
       └─────────────────────┘
       ┌─────────────────────┐
       │  HOW WE WORK        │  ~400px  bg-white
       └─────────────────────┘
       ┌─────────────────────┐
       │  CASE STUDIES       │  ~620px  bg-gray-50
       └─────────────────────┘
       ┌─────────────────────┐
       │  TESTIMONIALS       │  ~440px  bg-white
       └─────────────────────┘
       ┌─────────────────────┐
       │  TECH STACK         │  ~260px  bg-gray-50
       └─────────────────────┘
       ┌─────────────────────┐
       │  CTA BAND           │  ~280px  bg-brand-600
       └─────────────────────┘
       ┌─────────────────────┐
       │  FOOTER             │  ~360px  bg-gray-950
       └─────────────────────┘
```

> Background alternates white → gray-50 → white → gray-50 throughout. This creates visual rhythm without needing dividers.

---

*Document owner: Lead Architect / PM*
*Companion doc: 08-wireframes-services.md*
*Next step: Step 09 — UI/UX Design System*
