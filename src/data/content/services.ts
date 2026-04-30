import type { Service } from "@/data/schemas";

export const SERVICES: Service[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Web & App Development
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-001",
    slug:      "web-development",
    name:      "Web & App Development",
    tagline:   "Full-stack products that scale",
    icon:      "Code2",
    description:
      "We design and build high-performance web applications using modern JavaScript frameworks. From complex SaaS platforms to content-driven marketing sites, we deliver production-ready code your team can own.",
    longDescription: `Web and app development is the practice of engineering full-stack digital products that perform reliably at scale — from responsive marketing sites to complex, data-intensive SaaS platforms. At SigmaTech, every architecture decision is evaluated against one question: will this hold up when traffic doubles?

## Our approach

We build primarily on the Next.js App Router, harnessing React Server Components to reduce client JavaScript, server-side rendering for SEO-critical pages, and static generation for content that doesn't change per request. The result is pages that score 95+ on Lighthouse from day one — not after expensive post-launch optimisation.

## What sets our delivery apart

We don't hand you a repository and disappear. Every engagement includes a documented architecture decision record (ADR), a CI/CD pipeline wired to your chosen cloud, automated test coverage, and a handover session so your team can confidently extend what we've built.

## When to choose us

If your current codebase is slowing down your product velocity, if your site fails Core Web Vitals on mobile, or if you need a team that can go from brief to production in weeks rather than months — we're the right partner.`,

    deliverables: [
      { title: "Custom web applications",        detail: "Tailored to your business logic — no off-the-shelf compromises." },
      { title: "REST & GraphQL APIs",             detail: "Versioned, documented, and ready for web, mobile, and third-party integration." },
      { title: "Progressive Web Apps (PWAs)",     detail: "Offline-capable, installable apps with native-like performance on any device." },
      { title: "CMS integration",                 detail: "Headless CMS setup (Sanity, Contentful, or Payload) with typed content schemas." },
      { title: "Performance & Core Web Vitals",   detail: "Lighthouse ≥ 95, LCP < 2s, CLS < 0.1 — measured and guaranteed in the SOW." },
    ],

    stats: [
      { value: "50+",    label: "Projects delivered" },
      { value: "< 2s",   label: "Average LCP across all sites" },
      { value: "99.9%",  label: "Uptime SLA" },
    ],

    faqs: [
      {
        question: "What framework do you use for web development?",
        answer:
          "Our primary framework is Next.js 14 with the App Router, built on React 18 and TypeScript. For e-commerce projects we often pair it with Shopify Hydrogen. We are framework-pragmatic — if your existing codebase is on a different stack, we'll assess what makes sense rather than forcing a rewrite.",
      },
      {
        question: "How long does a typical web project take?",
        answer:
          "A focused marketing site typically takes 6–8 weeks from kick-off to launch. A full SaaS platform with complex data models and integrations ranges from 12–24 weeks. We scope every project in detail during the discovery phase so you have a firm timeline before any code is written.",
      },
      {
        question: "Do you offer post-launch support?",
        answer:
          "Yes. All projects include a 30-day hypercare period at no extra cost. After that, we offer monthly retainer packages covering bug fixes, dependency updates, performance monitoring, and feature additions. Our average retainer client has been with us for over two years.",
      },
      {
        question: "Will we own the code and intellectual property?",
        answer:
          "Absolutely. Full IP ownership transfers to you on final invoice payment. We use standard open-source libraries (MIT/Apache licensed) and clearly document any dependencies. Our contracts explicitly confirm there are no hidden licensing costs or vendor lock-in.",
      },
    ],

    techStack: [
      { name: "Next.js",     category: "frontend", logoUrl: "/icons/nextjs.svg" },
      { name: "React",       category: "frontend", logoUrl: "/icons/react.svg" },
      { name: "TypeScript",  category: "frontend", logoUrl: "/icons/typescript.svg" },
      { name: "Tailwind CSS",category: "frontend", logoUrl: "/icons/tailwind.svg" },
      { name: "Node.js",     category: "backend",  logoUrl: "/icons/nodejs.svg" },
      { name: "PostgreSQL",  category: "database", logoUrl: "/icons/postgresql.svg" },
    ],

    relatedCaseStudySlugs: ["fintech-dashboard-rebuild", "ecommerce-platform-migration"],
    relatedServiceSlugs:   ["ui-ux-design", "cloud-solutions", "qa-testing"],

    coverImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Developer working on dual-monitor setup with code editor open",

    ctaHeadline:    "Ready to build something exceptional?",
    ctaSubheadline: "Tell us about your project and we'll respond within 1 business day.",

    status:    "published",
    isActive:  true,
    sortOrder: 1,

    seo: {
      title:       "Web & App Development Services | SigmaTech",
      description: "Custom web and app development using Next.js, React, and TypeScript. We build fast, scalable, production-ready products with Lighthouse ≥ 95 guaranteed.",
      keywords:    ["Next.js development", "React app development", "custom web application", "TypeScript developers"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Cloud & DevOps
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-002",
    slug:      "cloud-solutions",
    name:      "Cloud & DevOps",
    tagline:   "Zero-downtime infrastructure, always",
    icon:      "Cloud",
    description:
      "We architect, migrate, and manage cloud infrastructure that scales with your product. From CI/CD pipelines to Kubernetes clusters, our DevOps engineers reduce costs and release risk simultaneously.",
    longDescription: `Cloud and DevOps engineering is the discipline of designing infrastructure that is reliable, observable, and cheap to operate — so your engineering team can focus on shipping features, not fighting fires. At SigmaTech, we treat infrastructure as code: everything version-controlled, everything repeatable, nothing snowflaked.

## What we deliver

We work primarily on AWS, with Terraform as our infrastructure-as-code layer. Every environment — development, staging, production — is provisioned identically, eliminating the classic "works on my machine" deployment failures. We instrument everything with Datadog or Grafana from day one, so your team has real-time observability before the first user hits production.

## Cloud migration without the drama

Migrating a running system to the cloud is one of the highest-risk engineering activities a company undertakes. We de-risk it with a three-phase approach: discovery and dependency mapping, parallel-run validation, then cutover with automatic rollback triggers. Our clients experience zero unplanned downtime during migration.

## Cost optimisation

Most cloud bills have 20–40% of waste hiding in oversized instances, unused resources, and missing spot strategies. We audit your current spend as part of every engagement and deliver a cost optimisation report alongside the infrastructure work.`,

    deliverables: [
      { title: "Cloud architecture design",          detail: "AWS / GCP / Azure — right-sized from day one, documented with architecture decision records." },
      { title: "Infrastructure as Code (Terraform)", detail: "Fully modular Terraform with environment parity across dev, staging, and production." },
      { title: "CI/CD pipeline setup",               detail: "GitHub Actions, GitLab CI, or CircleCI — build, test, deploy on every merge." },
      { title: "Kubernetes orchestration",           detail: "EKS or GKE cluster setup, Helm chart authoring, HPA and cluster autoscaler configuration." },
      { title: "Observability stack",                detail: "Metrics, logs, and traces wired up with Datadog or Grafana before launch day." },
    ],

    stats: [
      { value: "40%",    label: "Average cloud cost reduction" },
      { value: "10×",    label: "Increase in deployment frequency" },
      { value: "99.99%", label: "Achieved uptime SLA" },
    ],

    faqs: [
      {
        question: "Which cloud providers do you work with?",
        answer:
          "Our primary expertise is AWS, where we hold Solutions Architect and DevOps Engineer Professional certifications. We also work extensively with GCP and Azure. For most startups and scale-ups we recommend AWS, but we'll assess your team's existing skills and vendor agreements before making a recommendation.",
      },
      {
        question: "Can you migrate our existing infrastructure without downtime?",
        answer:
          "Yes. Our migration methodology uses a parallel-run approach: we build the new environment alongside your existing one, validate parity, then cut over with automatic rollback triggers active. We have migrated over 20 production workloads without a single minute of unplanned downtime.",
      },
      {
        question: "Do you provide ongoing infrastructure management after setup?",
        answer:
          "Yes, through our monthly DevOps retainer. This covers 24/7 alerting response, monthly cost reviews, Terraform state management, dependency patching, and access to our on-call rotation. Retainer clients also receive priority response during incidents.",
      },
      {
        question: "How do you approach security in cloud environments?",
        answer:
          "Security is built in from the start, not bolted on. We apply the principle of least privilege to all IAM roles, enable AWS Config and CloudTrail from day one, store secrets in AWS Secrets Manager (never in environment variables), and run automated security scans in the CI pipeline using Checkov and Trivy.",
      },
    ],

    techStack: [
      { name: "AWS",            category: "cloud",  logoUrl: "/icons/aws.svg" },
      { name: "Terraform",      category: "devops", logoUrl: "/icons/terraform.svg" },
      { name: "Docker",         category: "devops", logoUrl: "/icons/docker.svg" },
      { name: "Kubernetes",     category: "devops", logoUrl: "/icons/kubernetes.svg" },
      { name: "GitHub Actions", category: "devops", logoUrl: "/icons/github-actions.svg" },
      { name: "Datadog",        category: "devops", logoUrl: "/icons/datadog.svg" },
    ],

    relatedCaseStudySlugs: ["saas-devops-overhaul"],
    relatedServiceSlugs:   ["web-development", "qa-testing", "consulting"],

    coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Illuminated server racks in a modern data centre",

    ctaHeadline:    "Infrastructure that keeps up with your ambitions.",
    ctaSubheadline: "Let's audit your current setup and build something bulletproof.",

    status:    "published",
    isActive:  true,
    sortOrder: 2,

    seo: {
      title:       "Cloud & DevOps Services | SigmaTech",
      description: "AWS cloud architecture, Terraform IaC, Kubernetes orchestration, and CI/CD pipelines that cut costs and eliminate downtime.",
      keywords:    ["AWS solutions architect", "Terraform infrastructure", "Kubernetes consulting", "CI/CD pipeline setup"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. QA & Testing
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-003",
    slug:      "qa-testing",
    name:      "QA & Testing",
    tagline:   "Ship faster, break less",
    icon:      "ShieldCheck",
    description:
      "Our QA engineers embed into your delivery cycle to build automated test suites that catch regressions before they reach production. We turn slow, manual QA into a measurable competitive advantage.",
    longDescription: `QA and testing is the systematic process of verifying that software behaves correctly, performs at scale, and remains accessible to all users — before your customers discover it doesn't. At SigmaTech, we treat quality engineering as a first-class discipline, not a checkbox at the end of a sprint.

## Automation-first, not automation-only

We build end-to-end test suites with Playwright and component tests with React Testing Library that run in your CI pipeline on every pull request. Regressions are caught in minutes, not discovered by users at 2 AM. That said, we know when exploratory testing and domain expertise outperform scripts — our QA engineers are experienced testers, not just automation toolsmiths.

## Performance and load testing

A feature that works for ten concurrent users often breaks for ten thousand. We use k6 to simulate real traffic patterns against your staging environment, identify bottlenecks before launch, and establish baseline performance benchmarks you can track over time.

## Accessibility

WCAG 2.1 AA compliance is not optional for modern products — it is a widely adopted accessibility standard and a signal of engineering quality. We integrate axe-core into the test pipeline and conduct manual screen reader testing on every major user flow.`,

    deliverables: [
      { title: "Test strategy document",      detail: "A prioritised test plan aligned to your risk profile — not a generic template." },
      { title: "Automated E2E test suite",    detail: "Playwright tests covering critical user journeys, integrated into your CI pipeline." },
      { title: "Component & unit tests",      detail: "React Testing Library and Jest coverage for business-critical logic." },
      { title: "Load & performance testing",  detail: "k6 scripts simulating peak traffic, with a detailed bottleneck report." },
      { title: "Accessibility audit",         detail: "WCAG 2.1 AA audit with remediation prioritised by impact and effort." },
    ],

    stats: [
      { value: "90%+",  label: "Test coverage on delivery" },
      { value: "60%",   label: "Reduction in production bugs" },
      { value: "3×",    label: "Faster release cadence" },
    ],

    faqs: [
      {
        question: "Do you write tests for existing codebases or only greenfield projects?",
        answer:
          "Both. For brownfield projects, we start with a coverage audit to identify the highest-risk, lowest-coverage areas and build from there. We don't insist on 100% coverage immediately — we focus on the tests that prevent the most expensive failures first, then increase coverage incrementally over successive sprints.",
      },
      {
        question: "Which testing frameworks do you use?",
        answer:
          "For end-to-end testing we use Playwright (preferred) or Cypress. Unit and component tests use Jest with React Testing Library. API testing uses Postman and supertest. Load testing uses k6. Accessibility is tested with axe-core (automated) and manual screen reader testing using NVDA and VoiceOver.",
      },
      {
        question: "Can you integrate testing into our existing CI/CD pipeline?",
        answer:
          "Yes — and this is a prerequisite for test automation to be effective. We configure your GitHub Actions, GitLab CI, or CircleCI pipeline to run the full test suite on every pull request, block merges when tests fail, and publish test reports as PR comments so developers see failures immediately.",
      },
      {
        question: "How do you measure the ROI of QA investment?",
        answer:
          "We track three metrics before and after our engagement: defect escape rate (bugs reaching production), mean time to detect (how quickly issues are found), and deployment confidence (a developer survey). On average, clients see a 60% reduction in production incidents within three months of the full test suite going live.",
      },
    ],

    techStack: [
      { name: "Playwright",              category: "testing", logoUrl: "/icons/playwright.svg" },
      { name: "Cypress",                 category: "testing", logoUrl: "/icons/cypress.svg" },
      { name: "Jest",                    category: "testing", logoUrl: "/icons/jest.svg" },
      { name: "k6",                      category: "testing", logoUrl: "/icons/k6.svg" },
      { name: "React Testing Library",   category: "testing" },
      { name: "axe-core",                category: "testing" },
    ],

    relatedCaseStudySlugs: ["ecommerce-platform-migration"],
    relatedServiceSlugs:   ["web-development", "cloud-solutions"],

    coverImageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Software developer reviewing test results on a large monitor",

    status:    "published",
    isActive:  true,
    sortOrder: 3,

    seo: {
      title:       "QA & Testing Services | SigmaTech",
      description: "Automated end-to-end testing with Playwright, load testing with k6, and WCAG 2.1 AA accessibility audits. Reduce production bugs by 60%.",
      keywords:    ["Playwright automation", "automated testing services", "accessibility testing WCAG", "load testing k6"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. UI/UX Design
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-004",
    slug:      "ui-ux-design",
    name:      "UI/UX Design",
    tagline:   "Interfaces people actually want to use",
    icon:      "Palette",
    description:
      "We conduct user research, design intuitive interfaces, and deliver production-ready design systems. Every decision is backed by data, tested with real users, and documented for seamless developer handoff.",
    longDescription: `UI/UX design is the discipline of translating user needs and business goals into interfaces that are intuitive, accessible, and visually compelling. At SigmaTech, we reject the false choice between beautiful and functional — the best interfaces are both, and our track record proves it.

## Research before pixels

We start every design engagement with a discovery sprint: stakeholder interviews, competitive analysis, user journey mapping, and (where possible) sessions with real users. This evidence base ensures we design the right thing before we design it well. Skipping research is the single most common reason digital products fail to convert.

## From wireframes to a living design system

We deliver interactive prototypes in Figma before a single line of production code is written. Once the prototype is validated, we build a component-level design system — tokens, typography, spacing, states — that maps directly to your Tailwind or CSS-in-JS implementation. Handoff is a Figma file your developers can read, not a PDF they'll ignore.

## Continuous improvement

Design doesn't end at launch. We instrument key flows with heatmaps (Hotjar) and session recordings, run A/B tests on high-impact pages, and iterate based on real behavioural data. Our clients' conversion rates typically improve 30–50% over the six months after launch.`,

    deliverables: [
      { title: "User research & journey mapping",  detail: "User interviews, competitive benchmarking, and validated user flow diagrams." },
      { title: "Wireframes & interactive prototype",detail: "Low-fidelity → high-fidelity → clickable prototype — validated before development starts." },
      { title: "Design system & component library", detail: "Tokens, component specs, and states in Figma, mapped to your frontend implementation." },
      { title: "Responsive & accessible UI",        detail: "Every screen designed for mobile, tablet, and desktop, WCAG 2.1 AA compliant." },
      { title: "Dev-ready handoff",                 detail: "Annotated Figma files, exported assets, and a live review session with your engineering team." },
    ],

    stats: [
      { value: "+40%", label: "Average conversion uplift" },
      { value: "4.8",  label: "Average user satisfaction score (/5)" },
      { value: "200+", label: "Screens delivered across projects" },
    ],

    faqs: [
      {
        question: "What does your design process look like from brief to delivery?",
        answer:
          "We work in three phases. Discovery (1–2 weeks): stakeholder workshops, user research, competitor analysis, and information architecture. Design (3–6 weeks): wireframes, design system, high-fidelity screens, and an interactive prototype. Handoff (1 week): annotated Figma delivery, asset export, and a developer walkthrough session. The entire process runs in tight collaboration with your team.",
      },
      {
        question: "Do you design for both light and dark mode?",
        answer:
          "Yes. All our design systems are built with semantic colour tokens that support both modes from the start. We don't add dark mode as an afterthought — it is defined in the token system alongside the light palette, ensuring consistent contrast ratios and visual hierarchy in both themes.",
      },
      {
        question: "Can you work with an existing brand identity?",
        answer:
          "Absolutely. If you have an existing brand guide, we use it as the foundation and extend it into a full UI system. If your branding is outdated or incomplete, we offer a brand refresh as part of the engagement. We never override your brand — we interpret and systematise it.",
      },
      {
        question: "Do you offer user testing as part of the design process?",
        answer:
          "Yes — we run moderated usability sessions (typically five participants) on interactive prototypes before the design is finalised. We recruit participants through our panel or yours, conduct remote sessions over Maze or Lookback, and deliver a written findings report with prioritised design changes. This typically costs less than one sprint of development rework.",
      },
    ],

    techStack: [
      { name: "Figma",      category: "design", logoUrl: "/icons/figma.svg" },
      { name: "FigJam",     category: "design", logoUrl: "/icons/figma.svg" },
      { name: "Framer",     category: "design", logoUrl: "/icons/framer.svg" },
      { name: "Maze",       category: "design" },
      { name: "Hotjar",     category: "design" },
    ],

    relatedCaseStudySlugs: ["fintech-dashboard-rebuild"],
    relatedServiceSlugs:   ["web-development", "consulting"],

    coverImageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Designer reviewing UI screens on a tablet beside a Figma mockup",

    status:    "published",
    isActive:  true,
    sortOrder: 4,

    seo: {
      title:       "UI/UX Design Services | SigmaTech",
      description: "User research, Figma design systems, and accessible UI design for web and mobile. Average 40% conversion uplift across client projects.",
      keywords:    ["Figma design system", "UI/UX design services", "user research", "product design agency"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Tech Consulting
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-005",
    slug:      "consulting",
    name:      "Tech Consulting",
    tagline:   "Strategy that turns vision into velocity",
    icon:      "Lightbulb",
    description:
      "We provide senior-level technical leadership to help you make the right architecture decisions, select the right stack, and avoid the costly mistakes that slow scaling engineering teams down.",
    longDescription: `Technology consulting is the practice of applying senior engineering experience to strategic decisions — architecture selection, team structure, technical due diligence, and vendor evaluation — so that organisations avoid the expensive mistakes that come from scaling without a plan. At SigmaTech, our consultants have built and led engineering teams at funded startups and FTSE 250 enterprises. We advise from experience, not from frameworks.

## When you need a consulting engagement

The most common triggers we see are: a founding CTO leaving, a platform that's become too slow to change, a board asking hard questions about technical debt, or a fundraise that requires a technical due diligence response. In each case, the value of an independent senior perspective — one with no stake in your current stack — is significant.

## What a consulting engagement delivers

We don't deliver slide decks. We deliver specific, actionable recommendations: the three architectural changes that would halve your infrastructure cost, the two hires that would unblock your roadmap, the single refactor that would cut your deployment time by 80%. Every recommendation is costed and prioritised so your team knows where to start.

## Fractional CTO service

For seed and Series A companies that need technical leadership but aren't ready for a full-time CTO salary, our fractional CTO service provides two days per week of embedded senior leadership — enough to set standards, mentor the team, manage vendors, and represent technology to the board.`,

    deliverables: [
      { title: "Architecture review",         detail: "Independent assessment of your current stack with a prioritised remediation roadmap." },
      { title: "Tech stack selection",         detail: "Evidence-based recommendation with build-vs-buy analysis and vendor comparison." },
      { title: "Technical due diligence",      detail: "Pre-investment code and architecture review with a written report for your board or investor." },
      { title: "Fractional CTO service",       detail: "Two days per week of embedded senior technical leadership for early-stage companies." },
      { title: "Engineering team assessment",  detail: "Skills gap analysis, hiring plan, and process recommendations for scaling delivery teams." },
    ],

    stats: [
      { value: "15+",  label: "CTOs and engineering leaders advised" },
      { value: "£5M+", label: "In avoidable technical spend identified" },
      { value: "94%",  label: "Client retention after first engagement" },
    ],

    faqs: [
      {
        question: "What is technical due diligence and when do I need it?",
        answer:
          "Technical due diligence is an independent assessment of a company's codebase, infrastructure, and engineering practices — typically conducted before an acquisition, investment, or significant vendor commitment. Investors use it to validate technical claims; acquirers use it to identify hidden liabilities. We produce a written report covering code quality, scalability, security posture, team capability, and key risks.",
      },
      {
        question: "How is fractional CTO different from a part-time contractor?",
        answer:
          "A fractional CTO takes strategic accountability — they own the technical roadmap, represent engineering to the board, make hiring decisions, and set the engineering culture. A part-time contractor executes tasks. Our fractional CTOs typically engage two days per week and are reachable asynchronously throughout the week for urgent questions.",
      },
      {
        question: "Do you recommend specific vendors or tools, and do you have commercial relationships with any of them?",
        answer:
          "We recommend tools based solely on fit for your context — we have no referral or revenue-share relationships with any vendor. When we recommend AWS over GCP or Sanity over Contentful, it is because we have assessed your team, your scale, and your budget and concluded it is the right choice for you specifically.",
      },
      {
        question: "How quickly can a consulting engagement start?",
        answer:
          "For a standalone architecture review or due diligence report, we can typically start within one week of contract signature. For a fractional CTO engagement, we aim to begin within two weeks to allow for a structured onboarding — meeting your team, reviewing your backlog, and setting initial priorities.",
      },
    ],

    techStack: [
      { name: "AWS",          category: "cloud" },
      { name: "Next.js",      category: "frontend" },
      { name: "PostgreSQL",   category: "database" },
      { name: "Terraform",    category: "devops" },
      { name: "Figma",        category: "design" },
      { name: "Linear",       category: "other" },
    ],

    relatedCaseStudySlugs: ["saas-devops-overhaul"],
    relatedServiceSlugs:   ["web-development", "cloud-solutions", "staff-augmentation"],

    coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Senior consultant presenting architecture diagrams in a modern boardroom",

    status:    "published",
    isActive:  true,
    sortOrder: 5,

    seo: {
      title:       "Tech Consulting Services | SigmaTech",
      description: "Architecture reviews, technical due diligence, and fractional CTO services for scaling engineering teams. Senior advisors with startup and enterprise experience.",
      keywords:    ["technical due diligence", "fractional CTO", "architecture review", "engineering consulting"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Staff Augmentation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "svc-006",
    slug:      "staff-augmentation",
    name:      "Staff Augmentation",
    tagline:   "Senior engineers, your team, your culture",
    icon:      "Users",
    description:
      "We provide pre-vetted, senior-level engineers who integrate directly into your team. No long ramp-ups — our engineers are productive within days, not months, and they work in your culture.",
    longDescription: `Staff augmentation is the practice of embedding external engineers directly into an existing team to accelerate delivery, fill a skills gap, or maintain momentum during a critical hiring period. At SigmaTech, we treat every augmentation as a long-term partnership, not a body shop transaction — we only place engineers we'd be proud to work alongside ourselves.

## Who we place

Every SigmaTech engineer placed through our augmentation programme is senior-level (8+ years on average), has passed a multi-stage technical assessment, and has been reference-checked by our team. We don't maintain a bench — we match engagements to engineers who have demonstrated deep expertise in your specific stack.

## How it works

We agree on a skills profile, shortlist two to three pre-vetted candidates within 72 hours, run a technical interview you control, and place the right engineer within ten working days. Contracts are flexible — monthly rolling with 30-day notice, or fixed-term — and scale up or down as your needs change.

## Why augmentation over a permanent hire?

Hiring a senior engineer permanently takes three to six months on average and carries significant onboarding cost if the hire isn't right. Augmentation lets you move in days, validate the fit in weeks, and convert to permanent if the relationship works — many clients do exactly this.`,

    deliverables: [
      { title: "Skills-matched engineer placement",  detail: "Shortlist within 72 hours, placement within 10 working days." },
      { title: "Flexible contract terms",            detail: "Monthly rolling or fixed-term. Scale engineers up or down with 30-day notice." },
      { title: "Dedicated account management",       detail: "A single SigmaTech point of contact managing performance, timesheets, and issues." },
      { title: "Permanent conversion option",        detail: "Convert any placed engineer to a permanent hire — no hidden transfer fee after 6 months." },
    ],

    stats: [
      { value: "< 72h",  label: "Time to engineer shortlist" },
      { value: "96%",    label: "3-month placement retention rate" },
      { value: "8+ yrs", label: "Average engineer experience" },
    ],

    faqs: [
      {
        question: "How do you vet the engineers you place?",
        answer:
          "Our assessment process has four stages: an initial CV and portfolio review, a 90-minute technical screen covering system design and code review, a take-home task reviewed by a senior SigmaTech engineer, and two professional references checked by our team. We reject roughly 80% of candidates who apply. The engineers we place are engineers we know and trust.",
      },
      {
        question: "Can we interview the engineer before committing?",
        answer:
          "Yes — always. We shortlist two to three candidates, share their profiles and assessment scores, and facilitate a technical interview you run directly. You choose who starts. We never pressure a placement — if none of the first shortlist is the right fit, we continue the search at no extra cost.",
      },
      {
        question: "What happens if an engineer isn't working out?",
        answer:
          "Contracts include a 10-day trial period. If the fit isn't right for any reason during the trial, we replace the engineer at no additional cost and no questions asked. After the trial, our standard 30-day notice applies. In two years of running the augmentation programme, we have had to invoke the replacement clause fewer than five times.",
      },
      {
        question: "Do placed engineers work on-site or remotely?",
        answer:
          "Either. We support remote-first and hybrid arrangements. Our engineers are set up for asynchronous collaboration from day one, and on-site presence can be arranged depending on the engagement.",
      },
    ],

    techStack: [
      { name: "Next.js",     category: "frontend" },
      { name: "React",       category: "frontend" },
      { name: "TypeScript",  category: "frontend" },
      { name: "Node.js",     category: "backend"  },
      { name: "AWS",         category: "cloud"    },
      { name: "Python",      category: "backend"  },
    ],

    relatedCaseStudySlugs: [],
    relatedServiceSlugs:   ["consulting", "web-development"],

    coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Software engineering team collaborating around a shared monitor in a modern office",

    ctaHeadline:    "Need an engineer this week?",
    ctaSubheadline: "Tell us your stack and we'll have a shortlist in 72 hours.",

    status:    "published",
    isActive:  true,
    sortOrder: 6,

    seo: {
      title:       "Staff Augmentation Services | SigmaTech",
      description: "Pre-vetted engineers placed quickly. Flexible contracts and a permanent conversion option. Remote-ready and available across time zones.",
      keywords:    ["hire senior developers", "contract engineers", "tech talent", "software engineer placement"],
    },

    createdAt: "2025-01-10T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
) as Record<string, Service>;
