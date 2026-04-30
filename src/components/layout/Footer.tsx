// Server Component — no interactivity, safe to render on the server.

import Link from "next/link";
import { Zap, Github, Linkedin, Twitter } from "lucide-react";
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

const socialLinks = [
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/company/sigmatech",
    Icon:  Linkedin,
  },
  {
    label: "GitHub",
    href:  "https://github.com/sigmatech",
    Icon:  Github,
  },
  {
    label: "Twitter / X",
    href:  "https://twitter.com/sigmatech",
    Icon:  Twitter,
  },
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
              aria-label="SigmaTech — home"
            >
              <Zap
                className="h-5 w-5 text-electric-500 transition-transform duration-150 group-hover:scale-110"
                aria-hidden="true"
              />
              <span className="font-display text-lg font-semibold tracking-tight text-charcoal-50">
                SigmaTech
              </span>
            </Link>
            <p className="max-w-[240px] text-sm leading-relaxed text-charcoal-400">
              High-performance software and digital experiences for
              forward-thinking companies.
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

          {/* Column 4 — Connect */}
          <div>
            <ColumnHeading>Connect</ColumnHeading>
            <ul className="flex flex-col gap-3" role="list">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-charcoal-400 transition-colors duration-150 hover:text-charcoal-50"
                    aria-label={`${label} (opens in new tab)`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="flex flex-col gap-2 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal-600">
            © {year} SigmaTech Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
