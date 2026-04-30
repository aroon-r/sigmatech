import type { CaseStudy } from "@/data/schemas";

export const CASE_STUDIES: CaseStudy[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Fintech Dashboard Rebuild — Meridian Capital
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "cs-001",
    slug:      "fintech-dashboard-rebuild",
    title:     "Fintech Dashboard Rebuild",
    tagline:   "From legacy jQuery to a 890ms fintech platform",
    excerpt:
      "Meridian Capital's analyst dashboard had become a liability: a jQuery-era codebase that loaded in 4.2 seconds and crashed on concurrent users. We rebuilt it in Next.js and TypeScript in 12 weeks — cutting load time by 79% and doubling user activation.",

    body: `## The context

Meridian Capital is a London-based investment management firm managing £2.4B in assets across private equity and venture portfolios. Their internal analyst dashboard — used by 80+ analysts daily to view portfolio performance, run scenario models, and generate client reports — was a six-year-old jQuery Single Page Application hosted on bare metal in a colocation facility.

The platform had not changed significantly since 2019. Load time on the company VPN averaged 4.2 seconds. The JavaScript bundle was 3.4 MB uncompressed. Concurrent sessions above 30 caused visible degradation. Two senior analysts had raised formal complaints about the tool in the previous quarter's all-hands.

## The challenge

Meridian's engineering team was three people: one backend developer, one DevOps engineer, and one front-end developer who had inherited the codebase eighteen months earlier and had limited appetite for a rewrite. The CTO, brought in six months before engagement, had already identified the dashboard as the primary source of engineering debt but needed external capacity and a clear architectural recommendation to get board sign-off on the rebuild budget.

The constraints were firm: zero tolerance for data downtime during migration, a 12-week delivery window before Q3 reporting season, and an MVP feature set that matched the existing tool exactly before any enhancements.

## Our approach

We began with a two-week discovery and architecture sprint. Our team reviewed the existing codebase, interviewed five of the heaviest dashboard users, and mapped every data dependency across the three backend APIs the dashboard consumed. The output was an architectural proposal — Next.js App Router with React Server Components for the read-heavy analytics views, client-side Zustand state only for the interactive scenario modelling panels, and a dedicated BFF (backend-for-frontend) layer to normalise the three inconsistent legacy APIs into a single typed contract.

The rebuild ran in six two-week sprints. We shipped to a staging environment with production data (anonymised) from Sprint 3 onwards, enabling Meridian's analysts to validate behaviour against their real workflows rather than synthetic test cases. This surfaced three edge cases in the scenario modelling logic that would not have been caught in isolation.

The cutover was executed on a Sunday morning: a 15-minute read-only window while the DNS record was updated, with an instant rollback path active throughout. Total unplanned downtime: zero minutes.

## The outcome

Page load time dropped from 4.2 seconds to 890 milliseconds — a 79% reduction. The JavaScript bundle shrank from 3.4 MB to 410 KB (React Server Components eliminated the majority of client-side rendering). User activation rate — the percentage of new analysts who used the platform at least three times in their first week — rose from 34% to 71%. The Meridian engineering team now ships a feature update every two weeks, compared to once per quarter previously.`,

    client: {
      name:        "Meridian Capital",
      description: "London-based investment management firm with £2.4B in assets under management",
      logoUrl:     "/images/clients/meridian-capital.svg",
      logoAlt:     "Meridian Capital logo",
      country:     "United Kingdom",
    },

    projectStartDate: "2025-01",
    projectEndDate:   "2025-04",
    duration:         "12 weeks",

    servicesSlugs: ["web-development", "ui-ux-design"],

    techStack: [
      { name: "Next.js",      category: "frontend",  logoUrl: "/icons/nextjs.svg" },
      { name: "React",        category: "frontend",  logoUrl: "/icons/react.svg" },
      { name: "TypeScript",   category: "frontend",  logoUrl: "/icons/typescript.svg" },
      { name: "Tailwind CSS", category: "frontend",  logoUrl: "/icons/tailwind.svg" },
      { name: "Zustand",      category: "frontend" },
      { name: "Node.js",      category: "backend",   logoUrl: "/icons/nodejs.svg" },
      { name: "PostgreSQL",   category: "database",  logoUrl: "/icons/postgresql.svg" },
      { name: "AWS",          category: "cloud",     logoUrl: "/icons/aws.svg" },
    ],

    metrics: [
      {
        label:       "Page load time (LCP)",
        before:      "4.2s",
        after:       "890ms",
        improvement: "↓ 79% — from frustrating to instant",
      },
      {
        label:       "JavaScript bundle size",
        before:      "3.4 MB",
        after:       "410 KB",
        improvement: "↓ 88% — via React Server Components",
      },
      {
        label:       "User activation rate (week 1)",
        before:      "34%",
        after:       "71%",
        improvement: "↑ 109% — analysts actually use it now",
      },
      {
        label:       "Deployment frequency",
        before:      "Once per quarter",
        after:       "Every 2 weeks",
        improvement: "6× faster releases",
      },
    ],

    testimonial: {
      quote:
        "SigmaTech delivered exactly what they promised, on time, with zero data downtime. The rebuild went from internal joke to internal pride in twelve weeks. Our analysts stopped complaining and started asking for new features — which tells you everything.",
      authorName:    "Richard Holloway",
      authorTitle:   "CTO",
      authorCompany: "Meridian Capital",
    },

    faqs: [
      {
        question: "Why did you choose Next.js over a pure React SPA?",
        answer:
          "The dashboard has two distinct rendering profiles: read-heavy analytics views where data changes infrequently, and interactive scenario modelling panels where state changes constantly. Next.js App Router let us use React Server Components for the former (zero client JS for those views) and client components only for the latter — giving us the best of both worlds in a single coherent framework.",
      },
      {
        question: "How did you handle the legacy API dependencies?",
        answer:
          "We built a BFF (backend-for-frontend) layer in Node.js that normalised the three inconsistent legacy APIs into a single typed contract. This shielded the frontend from the legacy APIs' inconsistencies and gave us a stable migration path — in Phase 2, the legacy APIs can be replaced one at a time behind the BFF without any frontend changes.",
      },
      {
        question: "What was the biggest risk during the cutover?",
        answer:
          "Data consistency — specifically ensuring that any in-progress analyst sessions on the old platform weren't lost when we cut over. We resolved this by scheduling the cutover for 6 AM on a Sunday, implementing a 15-minute read-only mode with a user-visible banner, and keeping the old platform running in parallel for 48 hours post-cutover as a fallback.",
      },
    ],

    industry:   "fintech",
    tags:       ["next-js", "react", "fintech", "dashboard", "performance", "typescript"],

    coverImageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Financial data dashboard displayed on multiple monitors in a modern trading environment",

    gallery: [
      {
        url:     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80",
        alt:     "Portfolio analytics overview screen showing performance charts",
        caption: "Rebuilt portfolio analytics view — from 4.2s load to 890ms",
      },
      {
        url:     "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=675&fit=crop&q=80",
        alt:     "Scenario modelling panel with interactive data inputs",
        caption: "Interactive scenario modeller — Zustand-powered client state",
      },
    ],

    relatedCaseStudySlugs: ["ecommerce-platform-migration"],

    status:     "published",
    sortOrder:  1,
    isFeatured: true,

    seo: {
      title:       "Fintech Dashboard Rebuild | SigmaTech Case Study",
      description: "How SigmaTech rebuilt Meridian Capital's analyst dashboard in Next.js, cutting load time by 79% and doubling user activation in 12 weeks.",
      keywords:    ["fintech dashboard", "Next.js rebuild", "React performance", "financial software development"],
      ogImageUrl:  "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop&q=80",
    },

    createdAt: "2025-05-01T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. E-commerce Platform Migration — Luminary Goods
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "cs-002",
    slug:      "ecommerce-platform-migration",
    title:     "E-commerce Platform Migration",
    tagline:   "Shopify to headless in 16 weeks — conversion up 89%",
    excerpt:
      "Luminary Goods had outgrown their Shopify theme. Slow pages and an inflexible checkout were costing £180K per year in lost conversions. We migrated them to a headless Next.js + Shopify Hydrogen stack with a full test suite — LCP dropped from 5.1s to 1.2s and conversion nearly doubled.",

    body: `## The context

Luminary Goods is a direct-to-consumer lifestyle brand selling premium homeware across the UK and EU, with an annual GMV of £4.2M. They had operated on a customised Shopify theme since 2021. By 2024, the theme had accumulated 40+ installed apps, a custom checkout script that Shopify could no longer support post-Checkout Extensibility, and an LCP of 5.1 seconds on mobile — placing them in the bottom quartile of their category on Google's Core Web Vitals report.

The business impact was measurable: a 1.8% conversion rate against a category average of 3.2%. Their internal analysis estimated that reaching the category average was worth approximately £180,000 per year in incremental revenue. The decision to invest in a platform rebuild was made at board level within two weeks of the analysis.

## The challenge

Luminary's team had no in-house engineers — their Shopify configuration had been managed by a freelance developer who had moved on six months earlier. We were working from incomplete documentation, a complex product catalogue with 1,400 SKUs and 12 product types, and a brand identity that required pixel-perfect fidelity in the new build.

The migration also had to preserve all existing SEO equity — 847 indexed product URLs, 120 blog posts, and a domain authority of 42 — with zero URL changes and a redirect strategy for any that had to move.

## Our approach

We chose Next.js with Shopify Hydrogen as the headless layer: Shopify remained the commerce backbone (inventory, orders, payments, fulfilment) while we replaced the frontend entirely. This gave Luminary the design freedom of a custom build without abandoning the operational workflows their team already knew.

The 16-week delivery was structured in four phases. Phase 1 (weeks 1–3): catalogue audit, component inventory, and design system creation in Figma. Phase 2 (weeks 4–10): headless frontend build — product listing, PDP, cart, and checkout flows. Phase 3 (weeks 11–14): full Playwright E2E test suite covering all 47 critical user journeys, performance optimisation to hit Core Web Vitals targets, and SEO redirect mapping. Phase 4 (weeks 15–16): staging validation with Luminary's team, load testing with k6 at 5× peak Black Friday traffic, and cutover.

The cutover used a blue-green deployment with Cloudflare: traffic was shifted 5% at a time over four hours, with automatic rollback triggers monitoring conversion rate in real time via a PostHog dashboard we built for the purpose.

## The outcome

LCP on mobile dropped from 5.1 seconds to 1.2 seconds — well inside Google's "Good" threshold of 2.5 seconds. Overall Lighthouse performance score went from 41 to 96. Conversion rate rose from 1.8% to 3.4% in the first 30 days post-launch, representing an annualised revenue uplift of approximately £210,000. The Playwright test suite, which runs on every deployment, has caught seven would-be production regressions in the six months since launch.`,

    client: {
      name:        "Luminary Goods",
      description: "Direct-to-consumer lifestyle brand selling premium homeware across the UK and EU",
      logoUrl:     "/images/clients/luminary-goods.svg",
      logoAlt:     "Luminary Goods logo",
      websiteUrl:  "https://luminarygoods.co.uk",
      country:     "United Kingdom",
    },

    projectStartDate: "2024-09",
    projectEndDate:   "2025-01",
    duration:         "16 weeks",

    servicesSlugs: ["web-development", "cloud-solutions", "qa-testing"],

    techStack: [
      { name: "Next.js",            category: "frontend", logoUrl: "/icons/nextjs.svg" },
      { name: "Shopify Hydrogen",   category: "frontend" },
      { name: "TypeScript",         category: "frontend", logoUrl: "/icons/typescript.svg" },
      { name: "Tailwind CSS",       category: "frontend", logoUrl: "/icons/tailwind.svg" },
      { name: "Playwright",         category: "testing",  logoUrl: "/icons/playwright.svg" },
      { name: "k6",                 category: "testing",  logoUrl: "/icons/k6.svg" },
      { name: "AWS CloudFront",     category: "cloud",    logoUrl: "/icons/aws.svg" },
      { name: "Cloudflare",         category: "devops" },
    ],

    metrics: [
      {
        label:       "Mobile LCP (Core Web Vitals)",
        before:      "5.1s",
        after:       "1.2s",
        improvement: "↓ 76% — Google 'Good' threshold achieved",
      },
      {
        label:       "Lighthouse performance score",
        before:      "41 / 100",
        after:       "96 / 100",
        improvement: "↑ 134% improvement in score",
      },
      {
        label:       "Conversion rate",
        before:      "1.8%",
        after:       "3.4%",
        improvement: "↑ 89% — £210K annualised uplift",
      },
      {
        label:       "Production regressions caught (6 months)",
        before:      "0 automated tests",
        after:       "47 E2E journeys covered",
        improvement: "7 regressions prevented before users saw them",
      },
    ],

    testimonial: {
      quote:
        "The conversion jump in the first month was enough to pay for the entire project. But the thing I value most is the test suite — for the first time in five years, I can approve a deployment on a Friday afternoon without sweating.",
      authorName:    "Sophia Clarke",
      authorTitle:   "CEO",
      authorCompany: "Luminary Goods",
    },

    faqs: [
      {
        question: "Why go headless instead of a new Shopify theme?",
        answer:
          "A new Shopify theme would have addressed the visual design but not the performance bottleneck — theme-based Shopify storefronts are fundamentally constrained by Shopify's rendering pipeline. Headless gave us full control over the critical rendering path, server-side rendering with Next.js, and the ability to serve an optimised asset bundle rather than Shopify's generic one.",
      },
      {
        question: "How did you protect the site's SEO during the migration?",
        answer:
          "We conducted a full URL audit before writing a line of code, mapping every indexed URL to its new path (or confirming it stayed the same). All 847 product URLs and 120 blog post URLs were preserved. The 23 URLs that had to change received 301 redirects configured at the Cloudflare level before the cutover, so Google saw no broken links.",
      },
      {
        question: "What load testing did you do before launch?",
        answer:
          "We ran k6 load tests simulating 5× Luminary's peak Black Friday 2023 traffic — approximately 2,400 concurrent users over 30 minutes. The new stack handled this without degradation. We also tested the Shopify API rate limits under peak conditions and implemented a caching layer for product data to prevent the storefront hitting Shopify's limits during traffic spikes.",
      },
    ],

    industry:   "ecommerce",
    tags:       ["next-js", "shopify", "headless", "ecommerce", "performance", "playwright"],

    coverImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Premium homeware products displayed on a clean, modern e-commerce product page",

    gallery: [
      {
        url:     "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=675&fit=crop&q=80",
        alt:     "Product listing page with filtered grid view on mobile and desktop",
        caption: "New PLP — 96 Lighthouse score, 1.2s LCP on mobile",
      },
      {
        url:     "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=675&fit=crop&q=80",
        alt:     "Streamlined checkout flow with Shopify Payments integration",
        caption: "Headless checkout — built on Shopify Checkout Extensibility",
      },
    ],

    relatedCaseStudySlugs: ["fintech-dashboard-rebuild", "saas-devops-overhaul"],

    status:     "published",
    sortOrder:  2,
    isFeatured: true,

    seo: {
      title:       "E-commerce Platform Migration | SigmaTech Case Study",
      description: "How SigmaTech migrated Luminary Goods to a headless Next.js + Shopify Hydrogen stack, cutting LCP by 76% and boosting conversion by 89%.",
      keywords:    ["headless ecommerce", "Shopify Hydrogen", "Next.js ecommerce", "Core Web Vitals", "conversion rate optimisation"],
      ogImageUrl:  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80",
    },

    createdAt: "2025-02-01T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SaaS DevOps Overhaul — NovaTech Labs
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:        "cs-003",
    slug:      "saas-devops-overhaul",
    title:     "SaaS DevOps Overhaul",
    tagline:   "Monthly deploys to daily — without a single outage",
    excerpt:
      "NovaTech Labs was shipping once a month because deployments were terrifying. Manual processes, no staging parity, and a 4.5-hour mean time to recovery. In 8 weeks we gave them Terraform-managed infrastructure, GitHub Actions CI/CD, and a Datadog observability stack. They now deploy daily.",

    body: `## The context

NovaTech Labs is a B2B SaaS company providing workflow automation tools to 340 enterprise clients in the logistics sector. Their platform — a Node.js API, a React frontend, and a PostgreSQL database — was hosted on three manually configured EC2 instances in a single AWS availability zone. There were no automated tests in the CI pipeline, no infrastructure as code, and no staging environment that mirrored production.

Deployments happened once a month, always on a Friday afternoon, and always with two engineers on video call managing a 47-step runbook. The last three deployments had each caused at least one production incident, with a mean time to recovery of 4.5 hours. Customer-facing SLA breaches were becoming a reputational and contractual liability.

## The challenge

NovaTech's two-person engineering team had built the platform over four years and were deeply skilled in product development but had limited exposure to modern DevOps practices. Any solution had to be adoptable by that team — not a complex Kubernetes cluster requiring a dedicated SRE — and had to be delivered in eight weeks to land before the company's Series A due diligence.

The secondary constraint was cost: the existing infrastructure bill was £3,200 per month. The new infrastructure had to be cost-neutral or cheaper.

## Our approach

We started with a full infrastructure audit in week one: mapping every manually provisioned resource, identifying the three single points of failure, and documenting the existing deployment process in enough detail to automate it.

The infrastructure rebuild used Terraform across three modules: networking (VPC, subnets, security groups), compute (auto-scaling group with launch templates, Application Load Balancer), and data (RDS PostgreSQL Multi-AZ with automated backups, Elasticache Redis). All three environments — development, staging, and production — were provisioned from the same Terraform modules with environment-specific variable files, guaranteeing parity.

The CI/CD pipeline was built on GitHub Actions with four stages: lint and type-check, unit tests, integration tests against a disposable PostgreSQL container, and deployment to staging on every merge to main, production on every tagged release. The first time the pipeline ran end-to-end, it caught a breaking migration that would have taken the database offline for 20 minutes in production.

Observability was wired up with Datadog APM, infrastructure metrics, and log management. We configured seven SLO monitors and three P1 alert policies with PagerDuty routing before the handover.

## The outcome

NovaTech went from one deployment per month to daily deployments within three weeks of the pipeline going live — the engineering team's confidence in the tooling translated immediately into delivery velocity. Mean time to recovery dropped from 4.5 hours to 18 minutes (measured across two incidents in the three months post-launch). The new infrastructure costs £2,650 per month — £550 per month less than the manually managed equivalent. The Series A closed six weeks after the infrastructure handover, with the due diligence technical report citing the new DevOps practices as a positive signal.`,

    client: {
      name:        "NovaTech Labs",
      description: "B2B SaaS company providing workflow automation for 340 enterprise logistics clients",
      country:     "United Kingdom",
    },

    projectStartDate: "2024-11",
    projectEndDate:   "2025-01",
    duration:         "8 weeks",

    servicesSlugs: ["cloud-solutions", "qa-testing", "consulting"],

    techStack: [
      { name: "AWS",            category: "cloud",  logoUrl: "/icons/aws.svg" },
      { name: "Terraform",      category: "devops", logoUrl: "/icons/terraform.svg" },
      { name: "GitHub Actions", category: "devops", logoUrl: "/icons/github-actions.svg" },
      { name: "Docker",         category: "devops", logoUrl: "/icons/docker.svg" },
      { name: "Datadog",        category: "devops", logoUrl: "/icons/datadog.svg" },
      { name: "PostgreSQL",     category: "database", logoUrl: "/icons/postgresql.svg" },
      { name: "Node.js",        category: "backend",  logoUrl: "/icons/nodejs.svg" },
      { name: "PagerDuty",      category: "devops" },
    ],

    metrics: [
      {
        label:       "Deployment frequency",
        before:      "Once per month",
        after:       "Daily",
        improvement: "↑ 30× — from fearful to routine",
      },
      {
        label:       "Mean time to recovery (MTTR)",
        before:      "4.5 hours",
        after:       "18 minutes",
        improvement: "↓ 93% — incidents resolved before most clients notice",
      },
      {
        label:       "Monthly infrastructure cost",
        before:      "£3,200 / month",
        after:       "£2,650 / month",
        improvement: "↓ 17% — £6,600 saved per year",
      },
      {
        label:       "CI pipeline feedback time",
        before:      "No automated pipeline",
        after:       "8 minutes",
        improvement: "Regressions caught in minutes, not hours",
      },
    ],

    testimonial: {
      quote:
        "Before SigmaTech, a deployment was a two-hour ordeal that kept me up at night. Now it's a GitHub merge. I genuinely can't overstate how much that has changed the culture of the engineering team — people ship things they were previously too scared to touch.",
      authorName:    "Marcus Webb",
      authorTitle:   "Co-founder & CTO",
      authorCompany: "NovaTech Labs",
    },

    faqs: [
      {
        question: "Why Terraform over AWS CDK or Pulumi?",
        answer:
          "For NovaTech's use case — a two-person team with limited infrastructure background — Terraform's declarative HCL syntax and the breadth of community modules meant a shallower learning curve and faster delivery. AWS CDK and Pulumi are excellent tools, but they require more programming knowledge to use safely. Terraform also has the best tooling for state management in a small team context.",
      },
      {
        question: "How did you avoid disruption to live customers during the infrastructure rebuild?",
        answer:
          "We built the new infrastructure in parallel alongside the existing environment. Traffic was cut over using a blue-green deployment at the Application Load Balancer level — old and new environments ran simultaneously for 48 hours, with the ability to shift traffic back to the old environment within two minutes if metrics degraded. NovaTech's customers experienced no observable change during the transition.",
      },
      {
        question: "What made the difference for the Series A due diligence?",
        answer:
          "The investor's technical due diligence partner flagged four items in their initial assessment: no IaC, no staging environment, no automated tests, and no observability. We addressed all four. The follow-up report noted 'significant improvement in engineering maturity within the assessment period' — which is about as close to a compliment as due diligence reports get.",
      },
    ],

    industry:   "saas",
    tags:       ["devops", "aws", "terraform", "ci-cd", "observability", "saas"],

    coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Close-up of illuminated circuit board representing modern cloud infrastructure",

    gallery: [
      {
        url:     "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=675&fit=crop&q=80",
        alt:     "Datadog dashboard showing real-time service health metrics and SLO status",
        caption: "Datadog observability stack — seven SLOs monitored from day one",
      },
    ],

    relatedCaseStudySlugs: ["fintech-dashboard-rebuild"],

    status:     "published",
    sortOrder:  3,
    isFeatured: true,

    seo: {
      title:       "SaaS DevOps Overhaul | SigmaTech Case Study",
      description: "How SigmaTech transformed NovaTech Labs' deployment process from monthly to daily using Terraform, GitHub Actions, and Datadog — cutting MTTR by 93%.",
      keywords:    ["DevOps transformation", "Terraform AWS", "GitHub Actions CI/CD", "SaaS infrastructure", "cloud migration"],
      ogImageUrl:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80",
    },

    createdAt: "2025-03-01T09:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },
];

export const CASE_STUDY_BY_SLUG = Object.fromEntries(
  CASE_STUDIES.map((cs) => [cs.slug, cs]),
) as Record<string, CaseStudy>;
