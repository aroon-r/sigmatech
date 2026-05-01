"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cloud,
  ShieldCheck,
  Palette,
  Lightbulb,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/data/content/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  ShieldCheck,
  Palette,
  Lightbulb,
  Users,
};

// ─── CTA labels ───────────────────────────────────────────────────────────────
// Intent-based per service — the label describes the destination, not just
// that there is one. Falls back to a neutral label for future services.

const SERVICE_CTAS: Record<string, string> = {
  "web-development":    "How we build",
  "cloud-solutions":    "How we deploy",
  "qa-testing":         "How we test",
  "ux-design":          "How we design",
  "consulting":         "Request a review",
  "staff-augmentation": "How we place",
};

// ─── Service Card ─────────────────────────────────────────────────────────────

interface ServiceCardProps {
  slug:        string;
  name:        string;
  tagline:     string;
  description: string;
  icon:        string;
  index:       number;
  reduced:     boolean;
}

function ServiceCard({
  slug, name, tagline, description, icon, index, reduced,
}: ServiceCardProps) {
  const Icon   = iconMap[icon] ?? Code2;
  const ctaLabel = SERVICE_CTAS[slug] ?? "View this service";

  return (
    <m.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      whileHover={reduced ? {} : { y: -4 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay:    index * 0.08,
        ease:     [0, 0, 0.2, 1],
      }}
      className="group relative flex flex-col rounded-2xl p-6 transition-[box-shadow,border-color] duration-300"
      style={{
        background:           "rgba(255,255,255,0.025)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border:               "1px solid rgba(255,255,255,0.04)",
        boxShadow:            "0 2px 16px rgba(0,0,0,0.22)",
      }}
    >
      {/* Default top-edge shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                   bg-gradient-to-r from-transparent via-white/10 to-transparent
                   transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* Hover top-edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0
                   bg-gradient-to-r from-transparent via-electric-500/50 to-transparent
                   transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Hover border + shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                   transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(10,132,255,0.28), 0 16px 48px rgba(0,0,0,0.32), 0 4px 20px rgba(10,132,255,0.10)",
        }}
      />

      {/* Icon */}
      <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/10 ring-1 ring-electric-500/20 transition-colors duration-300 group-hover:bg-electric-500/15">
        <Icon className="h-5 w-5 text-electric-400" aria-hidden="true" />
      </div>

      {/* Copy */}
      <h3 className="relative font-display text-lg font-semibold text-charcoal-50">
        {name}
      </h3>
      <p className="relative mt-1 text-xs font-semibold uppercase tracking-wide text-electric-400">
        {tagline}
      </p>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-charcoal-400 line-clamp-3">
        {description}
      </p>

      <Link
        href={`/services/${slug}`}
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium
                   text-electric-400 transition-colors duration-150 hover:text-electric-300
                   focus-visible:outline-none focus-visible:text-electric-300"
        aria-label={`${ctaLabel} — ${name}`}
      >
        {ctaLabel}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </m.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section aria-label="Our services" id="services" className="relative overflow-hidden py-28">


<Container>
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <SectionHeading
            overline="What we do"
            title="A focused set of things we've chosen to be good at"
            subtitle="We don't list services we can't deliver to the same standard we hold the rest of the work to."
            align="left"
          />
        </m.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              slug={service.slug}
              name={service.name}
              tagline={service.tagline}
              description={service.description}
              icon={service.icon}
              index={i}
              reduced={prefersReduced}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
