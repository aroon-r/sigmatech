import type { BlogPost } from "@/data/schemas";
import { AUTHORS } from "./authors";

const [aroon, parvathy, vijay] = AUTHORS;

export const BLOG_POSTS: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Next.js 14 Server Components
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:    "blog-001",
    slug:  "why-we-migrated-to-nextjs-14-server-components",
    title: "Why We Migrated Five Client Projects to Next.js 14 Server Components",
    excerpt:
      "React Server Components are the most significant shift in React architecture since hooks. After migrating five production client projects, here's what actually changed — performance, DX, bundle size, and a few surprises we didn't expect.",

    body: `React Server Components (RSCs) are the most significant architectural shift in the React ecosystem since hooks — and possibly the most misunderstood. After migrating five production client projects to Next.js 14's App Router and the RSC model, we've accumulated enough real-world data to say something definitive: the performance gains are real, the developer experience is genuinely better, and the mental model shift is harder than the docs suggest.

## What actually changed in our bundles

The headline promise of RSCs is "zero JavaScript for server-rendered components." Here's what that looked like across our five migrations:

| Project | Old bundle (gzipped) | New bundle | Reduction |
|---------|---------------------|------------|-----------|
| Fintech dashboard | 340 KB | 62 KB | 82% |
| Marketing site | 180 KB | 28 KB | 84% |
| E-commerce PDP | 290 KB | 71 KB | 76% |

The reductions come from moving data fetching logic, formatting utilities, and read-only UI components out of the client bundle entirely. A product card that fetches its own data, formats a price, and renders static markup no longer ships any JavaScript to the browser — the HTML arrives complete.

## The mental model shift that trips people up

The single most common mistake we see when developers start with RSCs is importing a client component into a server component and expecting the server component's data to flow through props automatically. It does — but what people miss is that the client component boundary is not about file location, it's about where rendering happens.

A pattern that clicks for most engineers on our team:

> Think of server components as your template engine and client components as your islands of interactivity. The server renders everything it can; the client only wakes up where user interaction or browser APIs are needed.

This means your data-fetching, database calls, and CMS queries stay entirely on the server — no API layer required for the common case.

## What genuinely surprised us

**Streaming is transformative for perceived performance.** Next.js 14's \`<Suspense>\` boundaries with \`loading.tsx\` files let us ship page shells instantly and stream in expensive data sections as they resolve. Our clients' Time to First Byte (TTFB) barely changed, but Time to Interactive (TTI) dropped dramatically because users see a useful, interactive shell within 200ms.

**Error handling is more explicit, not harder.** RSC errors surface in the server logs at request time rather than in the browser console at runtime. This feels unfamiliar at first but is strictly better — you catch data errors where they originate, not after they've propagated through the component tree.

**Testing RSCs requires a shift.** Jest doesn't support async server components by default. We've settled on Playwright for integration tests covering RSC output (testing what the user sees) and Vitest with \`react-server\` condition for unit testing server-side logic. It's not seamless yet — this is an area where the ecosystem is still catching up.

## Our recommendation

If you're starting a new Next.js project in 2025, use the App Router and RSCs from day one. The Pages Router is still supported but receives no new features. For existing projects, we recommend a gradual migration: move one route at a time, starting with the most data-heavy pages where the bundle reduction will be most visible.

The learning curve is real — plan for a one-sprint adjustment period for experienced React developers. It's worth it.`,

    author:             aroon,
    publishedAt:        "2025-03-12T09:00:00.000Z",
    updatedAt:          "2025-04-02T14:00:00.000Z",
    category:           "engineering",
    tags:               ["next-js", "react", "server-components", "performance", "web-development"],

    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Code editor showing React component code on a dark-themed monitor",

    readingTimeMinutes: 7,

    tableOfContents: [
      { title: "What actually changed in our bundles",             anchor: "what-actually-changed-in-our-bundles",             level: 2 },
      { title: "The mental model shift that trips people up",      anchor: "the-mental-model-shift-that-trips-people-up",      level: 2 },
      { title: "What genuinely surprised us",                      anchor: "what-genuinely-surprised-us",                      level: 2 },
      { title: "Our recommendation",                               anchor: "our-recommendation",                               level: 2 },
    ],

    relatedPostSlugs:    ["the-hidden-roi-of-a-shared-design-system"],
    relatedServiceSlugs: ["web-development"],

    status:     "published",
    isFeatured: true,
    noRss:      false,

    seo: {
      title:       "Why We Migrated to Next.js 14 Server Components | SigmaTech",
      description: "After migrating five production projects to Next.js 14 App Router, we share real bundle reduction data, the RSC mental model shift, and what genuinely surprised us.",
      keywords:    ["Next.js 14", "React Server Components", "App Router", "performance optimisation", "web development"],
    },

    createdAt: "2025-03-12T09:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Design Systems ROI
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:    "blog-002",
    slug:  "the-hidden-roi-of-a-shared-design-system",
    title: "The Hidden ROI of a Shared Design System",
    excerpt:
      "Most companies think of a design system as a designer's productivity tool. It's actually an engineering productivity tool, a QA cost reducer, and an onboarding accelerator. Here's the business case we use with every sceptical stakeholder.",

    body: `Every design system conversation starts the same way. A designer asks for time and budget to build a component library. A product manager asks what the ROI is. Engineering is CC'd and goes quiet. The project gets deprioritised.

This is a failure of framing. A design system is not a designer's productivity tool — or not primarily. It is an engineering productivity tool, a QA cost reducer, a brand consistency enforcer, and an onboarding accelerator. Measured correctly, the ROI is rarely less than 3:1 within eighteen months.

Here's the business case we use with every sceptical stakeholder.

## The cost of not having a system

Before we talk about what a design system saves, we need to quantify what its absence costs. In a typical product team without a design system:

- **Designer time:** Designers spend 20–30% of their time recreating or adapting existing components. A five-person design team loses the equivalent of one designer per year to this.
- **Engineer time:** Engineers spend 15–25% of their time implementing the same UI patterns (buttons, modals, form fields, navigation) repeatedly. A ten-person engineering team loses two engineers per year to this.
- **QA time:** Manual and automated QA has to cover the same interaction patterns across every implementation, not once. Estimates vary, but we consistently see 30–40% of QA failures in systems without shared components being regressions of already-solved problems.
- **Onboarding time:** A new engineer joining a team without a design system must learn the codebase's implicit UI conventions before becoming productive. With a design system, they learn the system — which is documented and consistent.

Across a team of twenty people, these costs typically amount to 3–5 engineer-months per year.

## What a design system actually delivers

A mature design system — defined as one with documented components, design tokens, usage guidelines, and a versioned npm package — delivers savings in four areas.

**1. Implementation speed.** When a designer reaches for a component from the library and an engineer reaches for the same component from the package, the implementation time for a new feature drops by 40–60% for the UI layer. We've measured this on three separate design system rollouts, comparing sprint velocity before and after.

**2. Defect prevention.** Components that are built once, tested once, and used everywhere eliminate the category of bugs that come from individual implementations diverging. In one client's case study, post-system QA found 70% fewer UI defects in the first quarter after rollout.

**3. Brand consistency.** Without a system, brand drift is inevitable — slightly different shades of blue, inconsistent button radii, mixed typographic scales. With tokens, the brand is encoded in the system and enforced at build time.

**4. Accessibility.** Accessible components built once are accessible everywhere. This is perhaps the highest-leverage argument for a design system from a risk perspective — one WCAG-compliant component eliminates the accessibility risk across every page that uses it.

## The straw man objection: "It takes too long to build"

The most common objection is that building a design system is a large upfront investment that delays feature delivery. This is true for a "build everything before shipping anything" approach — which is the wrong approach.

We recommend starting with the five components used on 80% of pages: Button, Input, Card, Modal, and Typography. These can be built to production quality in two sprints. Ship them. Use them. Expand the system one component at a time, driven by what the product actually needs next.

A design system is a product, not a project. It ships incrementally, it has an owner, and it gets better over time.

## Making the business case

Here is the argument in one paragraph: Your team spends X months per year solving the same UI problems repeatedly. A design system eliminates most of that cost after a one-time investment of Y months. In our experience, Y is typically 2–4 months for the core system, and the payback period is 6–12 months. After that, every sprint gets faster, every new hire onboards more quickly, and every QA cycle catches fewer regressions.

If your stakeholder needs a number: assume a design system saves one full-time engineer per ten engineers per year, valued at £80,000 in fully-loaded cost. For a twenty-person team, that's £160,000 per year in recovered capacity.

What's your design system cost? Probably less.`,

    author:             parvathy,
    publishedAt:        "2025-04-05T09:00:00.000Z",
    updatedAt:          "2025-04-05T09:00:00.000Z",
    category:           "design",
    tags:               ["design-system", "figma", "roi", "ui-ux", "engineering-productivity"],

    coverImageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Designer working on a component library in Figma with multiple artboards visible",

    readingTimeMinutes: 8,

    tableOfContents: [
      { title: "The cost of not having a system",              anchor: "the-cost-of-not-having-a-system",              level: 2 },
      { title: "What a design system actually delivers",       anchor: "what-a-design-system-actually-delivers",       level: 2 },
      { title: "The straw man objection: 'It takes too long'", anchor: "the-straw-man-objection-it-takes-too-long-to-build", level: 2 },
      { title: "Making the business case",                     anchor: "making-the-business-case",                     level: 2 },
    ],

    relatedPostSlugs:    ["why-we-migrated-to-nextjs-14-server-components", "cloud-cost-optimisation-checklist"],
    relatedServiceSlugs: ["ui-ux-design", "web-development"],

    status:     "published",
    isFeatured: true,
    noRss:      false,

    seo: {
      title:       "The Hidden ROI of a Shared Design System | SigmaTech",
      description: "A design system isn't a designer's productivity tool — it's an engineering ROI play. Here's the business case that convinces every sceptical stakeholder.",
      keywords:    ["design system ROI", "component library business case", "Figma design system", "design engineering productivity"],
    },

    createdAt: "2025-04-05T09:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Cloud Cost Optimisation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id:    "blog-003",
    slug:  "cloud-cost-optimisation-checklist",
    title: "The 10-Point Cloud Cost Optimisation Checklist We Run on Every New Client",
    excerpt:
      "The average cloud bill has 20–30% of waste hiding in plain sight. After auditing dozens of AWS accounts, we've distilled the checks that consistently find the biggest savings — and the order in which to run them.",

    body: `Cloud cost optimisation is one of those disciplines that everyone agrees is important and almost no one does systematically. The typical pattern: a startup grows fast, the AWS bill grows faster, a CTO spends a Friday afternoon in the console deleting things, and then nothing changes until the next bill arrives.

After auditing over thirty AWS accounts in the past two years, we've developed a 10-point checklist that we run on every new engagement. These are not theoretical best practices — they are the items that, in combination, account for the majority of the savings we find.

## 1. Right-size EC2 instances

The most consistently overprovisioned resource. Sort your instances by CPU utilisation over the past 30 days (AWS Compute Optimizer will do this automatically). Any instance running at under 20% average CPU utilisation is a candidate for downsizing. Don't be afraid to go aggressive — most production instances can drop one or two sizes without any performance impact.

**Typical saving: 20–35% of EC2 spend.**

## 2. Switch to Graviton where possible

AWS Graviton3 instances (M7g, C7g, R7g families) offer 20–40% better price-performance than their x86 equivalents. If you're running a containerised workload or a modern language runtime (Node.js, Python, Go, Java 17+), switching is usually a one-line change in your launch template.

**Typical saving: 20–40% on qualifying compute.**

## 3. Audit and delete idle resources

Run \`aws ec2 describe-instances --filters "Name=instance-state-name,Values=stopped"\` and \`aws ec2 describe-volumes --filters "Name=status,Values=available"\`. Stopped instances and detached EBS volumes still accrue charges. We find unattached volumes in 90% of accounts we audit — the median finding is £200–400 per month.

**Typical saving: £100–500/month — small but zero effort to reclaim.**

## 4. Move to Savings Plans or Reserved Instances for stable workloads

On-demand pricing is the most expensive way to run consistent workloads. If you have instances that run 24/7, Compute Savings Plans offer 40–66% off on-demand prices with no instance-type lock-in. Run the AWS Cost Explorer Savings Plans recommendation tool — it will tell you your exact payback period.

**Typical saving: 40–55% on baseline compute.**

## 5. Review and prune data transfer costs

Data transfer is opaque and often the third-largest line item on an AWS bill. Check: NAT Gateway data transfer (route to S3/DynamoDB via Gateway Endpoints instead), cross-AZ traffic (co-locate services in the same AZ where possible), and CloudFront origin requests (cache more aggressively).

**Typical saving: 15–30% of networking costs.**

## 6. Optimise S3 storage classes

S3 Standard is expensive for infrequently accessed data. Enable S3 Intelligent-Tiering on buckets older than 30 days and with access patterns you don't control. For backups and archives, move to S3 Glacier Instant Retrieval or Glacier Deep Archive. Set lifecycle policies to automate the transition.

**Typical saving: 30–70% on S3 for data older than 90 days.**

## 7. Check RDS instance sizing and Multi-AZ necessity

Database instances are typically the most overprovisioned resource. Many teams enable Multi-AZ on development databases "just to be safe" — this doubles the cost for no benefit outside production. Also run Performance Insights for 30 days and right-size based on actual CPU, IOPS, and memory utilisation.

**Typical saving: 30–50% on RDS for non-production environments.**

## 8. Implement auto-scaling and scheduled scaling

Auto Scaling Groups should scale down during off-peak hours — your staging environment doesn't need production capacity at 3 AM. Scheduled scaling actions can reduce non-production fleets to 20% of their peak size overnight and at weekends. Combined with Spot Instances for stateless workloads, this is often the single largest saving.

**Typical saving: 40–70% on non-production compute.**

## 9. Set up AWS Budgets with alerts — not just visibility

Cost visibility without alerting is nearly useless. Set up three Budget alerts: 80% of monthly budget (early warning), 100% of budget (action required), and a daily anomaly detection alert for any 24-hour spend that exceeds 150% of the daily average. Send these to a Slack channel, not just email.

**Typical saving: Prevention of the next runaway bill.**

## 10. Run Trusted Advisor and AWS Cost Anomaly Detection

Trusted Advisor's cost optimisation checks surface idle Load Balancers, underutilised EC2 instances, and unassociated Elastic IPs. Cost Anomaly Detection uses ML to flag spend patterns that deviate from your baseline. Both are free and take under an hour to set up and review.

**Typical saving: Variable — often surfaces items missed in manual review.**

---

Running this checklist on a £10,000/month AWS bill typically identifies £2,500–4,000 in recoverable spend within the first audit. The optimisations take two to four weeks to implement safely, and the savings persist indefinitely.

If you'd like us to run this audit on your AWS account, [get in touch](/contact) — we offer a free 90-minute infrastructure assessment for qualifying companies.`,

    author:             vijay,
    publishedAt:        "2025-05-20T09:00:00.000Z",
    updatedAt:          "2025-06-01T10:00:00.000Z",
    category:           "cloud-devops",
    tags:               ["aws", "cloud-cost", "devops", "infrastructure", "cost-optimisation"],

    coverImageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=675&fit=crop&q=80",
    coverImageAlt: "Abstract image of cloud server infrastructure with blue data streams",

    readingTimeMinutes: 9,

    tableOfContents: [
      { title: "Right-size EC2 instances",                        anchor: "1-right-size-ec2-instances",                        level: 2 },
      { title: "Switch to Graviton where possible",               anchor: "2-switch-to-graviton-where-possible",               level: 2 },
      { title: "Audit and delete idle resources",                 anchor: "3-audit-and-delete-idle-resources",                 level: 2 },
      { title: "Move to Savings Plans for stable workloads",      anchor: "4-move-to-savings-plans-or-reserved-instances-for-stable-workloads", level: 2 },
      { title: "Review and prune data transfer costs",            anchor: "5-review-and-prune-data-transfer-costs",            level: 2 },
      { title: "Optimise S3 storage classes",                     anchor: "6-optimise-s3-storage-classes",                    level: 2 },
      { title: "Check RDS instance sizing",                       anchor: "7-check-rds-instance-sizing-and-multi-az-necessity", level: 2 },
      { title: "Implement auto-scaling",                          anchor: "8-implement-auto-scaling-and-scheduled-scaling",    level: 2 },
      { title: "Set up AWS Budgets with alerts",                  anchor: "9-set-up-aws-budgets-with-alerts-not-just-visibility", level: 2 },
      { title: "Run Trusted Advisor",                             anchor: "10-run-trusted-advisor-and-aws-cost-anomaly-detection", level: 2 },
    ],

    relatedPostSlugs:    ["why-we-migrated-to-nextjs-14-server-components"],
    relatedServiceSlugs: ["cloud-solutions", "consulting"],

    status:     "published",
    isFeatured: false,
    noRss:      false,

    seo: {
      title:       "Cloud Cost Optimisation Checklist | SigmaTech",
      description: "The 10-point AWS cost audit checklist that consistently finds 20–40% savings. Right-sizing, Savings Plans, S3 tiers, and the checks most teams miss.",
      keywords:    ["AWS cost optimisation", "cloud cost reduction", "EC2 right-sizing", "AWS Savings Plans", "cloud infrastructure audit"],
    },

    createdAt: "2025-05-20T09:00:00.000Z",
  },
];

/** Full posts array (identical in Phase 1 — separated for Phase 2 where summary/full may differ) */
export const BLOG_POSTS_FULL = BLOG_POSTS;

export const BLOG_POST_BY_SLUG = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p]),
) as Record<string, BlogPost>;
