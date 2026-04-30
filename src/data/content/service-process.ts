export interface ProcessStep {
  step:        number;
  title:       string;
  description: string;
  duration:    string;
}

export const SERVICE_PROCESS: Record<string, ProcessStep[]> = {
  "web-development": [
    {
      step: 1,
      title: "Discovery & Scoping",
      description:
        "Stakeholder workshops, requirements definition, and architecture decisions captured in a documented ADR — so everyone agrees on what's being built before a line of code is written.",
      duration: "Week 1",
    },
    {
      step: 2,
      title: "Design & Prototype",
      description:
        "Figma wireframes, component library scaffolding, and a clickable prototype validated by stakeholders. Production development only begins once the prototype is signed off.",
      duration: "Weeks 1–2",
    },
    {
      step: 3,
      title: "Development Sprints",
      description:
        "Agile two-week sprints with a live demo at the end of each. Feature branches, mandatory PR reviews, and automated CI checks on every merge — no broken code reaches main.",
      duration: "Weeks 2–N",
    },
    {
      step: 4,
      title: "QA & Performance",
      description:
        "End-to-end Playwright tests, Lighthouse audits (≥ 95 target on all routes), and load testing against realistic traffic scenarios before any production deployment.",
      duration: "Final 2 weeks",
    },
    {
      step: 5,
      title: "Launch & Handover",
      description:
        "Zero-downtime production deployment via your CI/CD pipeline, full architecture documentation, and a live handover session with your engineering team.",
      duration: "Launch week",
    },
  ],

  "cloud-solutions": [
    {
      step: 1,
      title: "Infrastructure Audit",
      description:
        "Current state mapping, cloud cost analysis, security posture review, and a full dependency graph of every running workload — before we touch anything.",
      duration: "Days 1–3",
    },
    {
      step: 2,
      title: "Architecture Design",
      description:
        "Target state design, Terraform module structure, environment parity plan (dev/staging/prod), and security boundary definitions — all reviewed and signed off by your team.",
      duration: "Week 1",
    },
    {
      step: 3,
      title: "Environment Provisioning",
      description:
        "All environments provisioned identically via Terraform. CI/CD pipeline configured and validated. No manual click-ops — everything is code, everything is repeatable.",
      duration: "Weeks 2–3",
    },
    {
      step: 4,
      title: "Migration & Cutover",
      description:
        "Parallel-run validation, gradual traffic shifting, and cutover with automatic rollback triggers active throughout. Zero unplanned downtime across every migration we've run.",
      duration: "Weeks 3–5",
    },
    {
      step: 5,
      title: "Observability & Handover",
      description:
        "Metrics, logs, and traces live in Datadog or Grafana before handover. A full runbook and incident response playbook are delivered alongside the infrastructure.",
      duration: "Final week",
    },
  ],

  "qa-testing": [
    {
      step: 1,
      title: "Coverage Audit",
      description:
        "Identify the highest-risk, lowest-coverage areas in your codebase. Produce a risk-weighted test priority matrix so we tackle the most expensive failures first.",
      duration: "Days 1–3",
    },
    {
      step: 2,
      title: "Test Strategy",
      description:
        "Agree scope, framework selection, coverage targets, and CI integration approach. Deliver a written test plan — no surprises on scope or cost midway through the engagement.",
      duration: "Week 1",
    },
    {
      step: 3,
      title: "Suite Implementation",
      description:
        "Build E2E, component, unit, and load tests in risk priority order. Every test is reviewed for reliability before shipping — flaky tests are worse than no tests.",
      duration: "Weeks 2–6",
    },
    {
      step: 4,
      title: "CI Pipeline Integration",
      description:
        "Tests run automatically on every pull request. Merges are blocked on test failure. Results post as PR comments so developers see failures within seconds, not hours.",
      duration: "Week 2",
    },
    {
      step: 5,
      title: "Handover & Training",
      description:
        "Team walkthrough of the full test suite, a maintenance guide, and a runbook covering the most common failure patterns — so your team owns the suite long-term.",
      duration: "Final day",
    },
  ],

  "ui-ux-design": [
    {
      step: 1,
      title: "Research & Discovery",
      description:
        "User interviews, competitor benchmarking, analytics review, and user journey mapping. We define the design problem with evidence before drawing a single screen.",
      duration: "Weeks 1–2",
    },
    {
      step: 2,
      title: "Information Architecture",
      description:
        "Site map, user flows, and content hierarchy validated with stakeholders. IA is the foundation — getting this wrong makes every screen that follows expensive to fix.",
      duration: "Week 2",
    },
    {
      step: 3,
      title: "Wireframes & Prototype",
      description:
        "Low-fidelity sketches, high-fidelity screens, and an interactive Figma prototype. Each stage is reviewed and approved before moving forward — no big reveals at the end.",
      duration: "Weeks 3–5",
    },
    {
      step: 4,
      title: "Usability Testing",
      description:
        "Five moderated remote sessions via Maze or Lookback. Written findings report with prioritised design revisions. Testing a prototype costs a fraction of testing live code.",
      duration: "Week 5–6",
    },
    {
      step: 5,
      title: "Design System & Handoff",
      description:
        "Token definitions, component states for all interactions, annotated Figma delivery, asset exports, and a live developer walkthrough — handoff your engineers will actually use.",
      duration: "Final week",
    },
  ],

  "consulting": [
    {
      step: 1,
      title: "Initial Assessment",
      description:
        "A structured questionnaire, codebase access, and stakeholder interviews to scope the engagement precisely and surface the questions your board most needs answered.",
      duration: "Day 1",
    },
    {
      step: 2,
      title: "Deep-Dive Analysis",
      description:
        "Architecture review, code quality assessment, infrastructure audit, team capability evaluation, and a security posture check — all conducted by a senior SigmaTech principal.",
      duration: "Days 2–7",
    },
    {
      step: 3,
      title: "Findings Synthesis",
      description:
        "Prioritised remediation roadmap, risk register, build-vs-buy analysis, and cost impact modelling for every major recommendation. Specific and actionable — not a generic slide deck.",
      duration: "Days 5–8",
    },
    {
      step: 4,
      title: "Report & Presentation",
      description:
        "Written findings report delivered first so you can read it at your pace. Then a live presentation to your leadership or board with an open Q&A session.",
      duration: "Days 9–10",
    },
    {
      step: 5,
      title: "Follow-on Support",
      description:
        "Implementation guidance, retainer-based advisory, or a fractional CTO engagement to drive recommendations from paper into production.",
      duration: "Ongoing",
    },
  ],

  "staff-augmentation": [
    {
      step: 1,
      title: "Skills Profiling",
      description:
        "A focused briefing to define your stack, team culture, working rhythm, and the specific delivery problem the engineer needs to unblock. Takes one hour, saves weeks.",
      duration: "Day 1",
    },
    {
      step: 2,
      title: "Candidate Matching",
      description:
        "We shortlist two to three pre-vetted, reference-checked engineers matched to your technical and cultural requirements — not whoever happens to be available on the bench.",
      duration: "48–72 hours",
    },
    {
      step: 3,
      title: "Technical Interview",
      description:
        "You run the interview directly. We facilitate scheduling and share assessment scores, but the hiring decision is always yours. No pressure, no quotas.",
      duration: "Days 3–5",
    },
    {
      step: 4,
      title: "Onboarding",
      description:
        "Tool access, codebase orientation, and first sprint planning handled with your team lead. Our engineers are productive within days — not the weeks typical of a permanent hire.",
      duration: "Days 5–10",
    },
    {
      step: 5,
      title: "Ongoing Management",
      description:
        "Monthly performance check-ins, timesheet processing, and a dedicated SigmaTech account manager as your single point of contact for any issues or changes.",
      duration: "Monthly",
    },
  ],
};
