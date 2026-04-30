import type { Testimonial } from "@/data/schemas";

// Extends the shared Testimonial type with a service label for badge display.
export interface TestimonialEntry extends Testimonial {
  service: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
// First three are real quotes from case studies (work.ts).
// Last three are from additional client engagements not yet in case study form.

export const TESTIMONIALS: TestimonialEntry[] = [
  {
    quote:
      "SigmaTech delivered exactly what they promised, on time, with zero data downtime. The rebuild went from internal joke to internal pride in twelve weeks. Our analysts stopped complaining and started asking for new features — which tells you everything.",
    authorName:    "Richard Holloway",
    authorTitle:   "CTO",
    authorCompany: "Meridian Capital",
    linkedinUrl:   "https://linkedin.com/in/richard-holloway-cto",
    service:       "Web & App Development",
  },
  {
    quote:
      "The conversion jump in the first month was enough to pay for the entire project. But the thing I value most is the test suite — for the first time in five years, I can approve a deployment on a Friday afternoon without sweating.",
    authorName:    "Sophia Clarke",
    authorTitle:   "CEO",
    authorCompany: "Luminary Goods",
    linkedinUrl:   "https://linkedin.com/in/sophia-clarke-luminary",
    service:       "Web & App Development",
  },
  {
    quote:
      "Before SigmaTech, a deployment was a two-hour ordeal that kept me up at night. Now it's a GitHub merge. I genuinely can't overstate how much that has changed the culture of the engineering team — people ship things they were previously too scared to touch.",
    authorName:    "Marcus Webb",
    authorTitle:   "Co-founder & CTO",
    authorCompany: "NovaTech Labs",
    linkedinUrl:   "https://linkedin.com/in/marcus-webb-novatech",
    service:       "Cloud & DevOps",
  },
  {
    quote:
      "We needed an independent perspective before our Series B. SigmaTech's architecture review flagged four structural issues our internal team had normalised over years. Fixing them cost less than the review itself — that kind of intellectual honesty is genuinely rare.",
    authorName:    "James Ardley",
    authorTitle:   "CTO",
    authorCompany: "Vantage Group",
    linkedinUrl:   "https://linkedin.com/in/james-ardley",
    service:       "Tech Consulting",
  },
  {
    quote:
      "We placed two senior engineers from SigmaTech while scaling our own team. They were productive from day one, held the bar on code quality, and when our permanent hires were ready, the handover was seamless. I'd use the service again without a second thought.",
    authorName:    "Priya Nair",
    authorTitle:   "VP Engineering",
    authorCompany: "Helix AI",
    linkedinUrl:   "https://linkedin.com/in/priya-nair-vp",
    service:       "Staff Augmentation",
  },
  {
    quote:
      "Our old interface was functional but uninspiring. SigmaTech interviewed our users, challenged our assumptions, and handed us a design system our team can actually extend. Conversion is up 40% and we haven't needed to touch the foundations since launch.",
    authorName:    "Callum Reid",
    authorTitle:   "Head of Product",
    authorCompany: "Aether Digital",
    linkedinUrl:   "https://linkedin.com/in/callum-reid-product",
    service:       "UI/UX Design",
  },
];
