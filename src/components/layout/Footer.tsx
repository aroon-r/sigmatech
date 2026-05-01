// Server Component — no interactivity, safe to render on the server.

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/content/services";
import Container from "@/components/ui/Container";

// ─── Data ─────────────────────────────────────────────────────────────────────

const companyLinks = [
  { label: "About",   href: "/about"   },
  { label: "Blog",    href: "/blog"    },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms",   href: "/terms"   },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
      {children}
    </h4>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href:      string;
  external?: boolean;
  children:  React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank"           : undefined}
      rel={external    ? "noopener noreferrer" : undefined}
      className="text-sm text-charcoal-400 transition-colors duration-150 hover:text-charcoal-50"
    >
      {children}
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  // Computed at build time via static generation — rebuilds keep it accurate.
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-charcoal-800 bg-charcoal-950 pt-16 pb-8"
      aria-label="Site footer"
    >
      <Container>
        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 gap-8 pb-12 md:grid-cols-4 border-b border-charcoal-800">

          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-2 focus-visible:outline-none"
              aria-label="Nexora — home"
            >
              <Zap
                className="h-5 w-5 text-electric-500 transition-transform duration-150 group-hover:scale-110"
                aria-hidden="true"
              />
              <span className="font-display text-lg font-semibold tracking-tight text-charcoal-50">
                Nexora
              </span>
            </Link>
            <p className="max-w-[240px] text-sm leading-relaxed text-charcoal-400">
              A small engineering team that writes the scope before building,
              ships early to staging, and hands over code your team can run
              without us.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="flex flex-col gap-3" role="list">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <FooterLink href={`/services/${service.slug}`}>
                    {service.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <ColumnHeading>Company</ColumnHeading>
            <ul className="flex flex-col gap-3" role="list">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Start */}
          <div>
            <ColumnHeading>Start</ColumnHeading>
            <p className="mb-4 text-sm leading-relaxed text-charcoal-400">
              Have a project in mind? Send a brief — we&apos;ll tell you how
              we&apos;d approach it, and if it&apos;s not ready to build,
              we&apos;ll explain why.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-electric-400 transition-colors duration-150
                         hover:text-electric-300 focus-visible:outline-none
                         focus-visible:text-electric-300"
            >
              Send a brief
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="flex flex-col gap-2 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal-600">
            © {year} Nexora Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
