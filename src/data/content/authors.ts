import type { Author } from "@/data/schemas";

export const AUTHORS: Author[] = [
  {
    id:          "auth-001",
    name:        "Aroon",
    designation: "Software Tester",
    bio:         "Aroon is a Software Tester at SigmaTech, specialising in manual and automated testing across web and mobile platforms. He writes about quality engineering practices and building test coverage that teams can rely on.",
    avatarUrl:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
    linkedinUrl: "https://linkedin.com/in/aroon",
  },
  {
    id:          "auth-002",
    name:        "Parvathy",
    designation: "Front End Developer",
    bio:         "Parvathy is a Front End Developer at SigmaTech, building performant, accessible interfaces with React and TypeScript. She writes about component architecture, design systems, and the craft of pixel-perfect implementation.",
    avatarUrl:   "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&q=80",
    linkedinUrl: "https://linkedin.com/in/parvathy",
  },
  {
    id:          "auth-003",
    name:        "Vijay",
    designation: "UI/UX Designer",
    bio:         "Vijay is a UI/UX Designer at SigmaTech, creating user-centred interfaces for SaaS and fintech clients. He writes about design systems, prototyping in Figma, and translating user research into high-converting experiences.",
    avatarUrl:   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80",
    linkedinUrl: "https://linkedin.com/in/vijay",
  },
  {
    id:          "auth-004",
    name:        "Nandha Kumar",
    designation: "SEO Specialist",
    bio:         "Nandha Kumar is SigmaTech's SEO Specialist, focused on technical SEO, AEO strategy, and content architecture that ranks. He writes about Core Web Vitals, structured data, and making content discoverable to both search engines and AI.",
    avatarUrl:   "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&q=80",
    linkedinUrl: "https://linkedin.com/in/nandha-kumar",
  },
  {
    id:          "auth-005",
    name:        "Naveen",
    designation: "Digital Marketing Manager",
    bio:         "Naveen is SigmaTech's Digital Marketing Manager, overseeing content strategy, paid campaigns, and brand positioning. He writes about B2B marketing, lead generation, and building a digital presence that converts.",
    avatarUrl:   "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&q=80",
    linkedinUrl: "https://linkedin.com/in/naveen",
  },
];

export const AUTHOR_BY_ID: Record<string, Author> = Object.fromEntries(
  AUTHORS.map((a) => [a.id, a]),
);
