export type AvatarVariant = "blue" | "violet" | "pink" | "cyan" | "green" | "amber";

export interface TeamMember {
  name:      string;
  role:      string;
  bio:       string;
  linkedIn:  string;
  avatarUrl: string | null;
  tags:      readonly string[];
  initials:  string;
  variant:   AvatarVariant;
}

export const TEAM: TeamMember[] = [
  {
    name:      "Alex Sato",
    role:      "Co-founder & CTO",
    bio:       "Ex-Staff Engineer at GoCardless, where he led the payments infrastructure team serving 75,000+ merchants. Co-founded SigmaTech to apply that same rigour to ambitious product teams.",
    linkedIn:  "https://linkedin.com/in/alex-sato",
    avatarUrl: null,
    tags:      ["Next.js", "AWS", "System Design"],
    initials:  "AS",
    variant:   "blue",
  },
  {
    name:      "Sarah Mitchell",
    role:      "Co-founder & CEO",
    bio:       "Former engineering lead at Deliveroo, shipping features used by 100,000+ restaurants across 10 markets. Obsessed with delivery that actually moves the needle — not theatre.",
    linkedIn:  "https://linkedin.com/in/sarah-mitchell",
    avatarUrl: null,
    tags:      ["Product Strategy", "Client Delivery", "OKRs"],
    initials:  "SM",
    variant:   "violet",
  },
  {
    name:      "Parvathy Menon",
    role:      "Head of Design",
    bio:       "Spent six years at Monzo building design systems used by 8M users. Every interface she ships is measurably more intuitive than the one it replaced.",
    linkedIn:  "https://linkedin.com/in/parvathy-menon",
    avatarUrl: null,
    tags:      ["Figma", "Design Systems", "User Research"],
    initials:  "PM",
    variant:   "pink",
  },
  {
    name:      "Vijay Krishnamurthy",
    role:      "Lead Cloud Engineer",
    bio:       "AWS Certified Solutions Architect with 9 years in cloud infrastructure. Has migrated 20+ production workloads to Kubernetes with zero downtime — and holds the SRE bar across everything we ship.",
    linkedIn:  "https://linkedin.com/in/vijay-krishnamurthy",
    avatarUrl: null,
    tags:      ["AWS", "Kubernetes", "Terraform"],
    initials:  "VK",
    variant:   "cyan",
  },
  {
    name:      "Marcus Chen",
    role:      "Senior Full-stack Engineer",
    bio:       "TypeScript generalist who has shipped product at Wise and two Series B startups. Strongly typed, zero `any` — your codebase will be cleaner when he leaves than when he arrived.",
    linkedIn:  "https://linkedin.com/in/marcus-chen",
    avatarUrl: null,
    tags:      ["TypeScript", "React", "PostgreSQL"],
    initials:  "MC",
    variant:   "green",
  },
  {
    name:      "Emily Walsh",
    role:      "Head of QA",
    bio:       "Built the test automation suite at Farfetch that compressed release cycles from weeks to days. Her pipelines have caught pre-release failures across 14 consecutive client launches.",
    linkedIn:  "https://linkedin.com/in/emily-walsh",
    avatarUrl: null,
    tags:      ["Playwright", "Cypress", "Test Strategy"],
    initials:  "EW",
    variant:   "amber",
  },
];
