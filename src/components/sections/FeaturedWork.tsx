"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/content/work";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import type { CaseStudy } from "@/data/schemas";

// ─── Data ─────────────────────────────────────────────────────────────────────

const featured = CASE_STUDIES
  .filter((cs) => cs.isFeatured && cs.status === "published")
  .sort((a, b) => a.sortOrder - b.sortOrder);

// ─── Helpers ──────────────────────────────────────────────────────────────────

// "↓ 79% — from frustrating to instant" → "↓ 79%"
const heroMetric = (improvement: string) => improvement.split(" — ")[0];

// "Page load time (LCP)" → "Page load time"
// "Mean time to recovery (MTTR)" → "Mean time to recovery"
const shortLabel = (label: string) => label.split(" (")[0];

// "fintech" → "FinTech" | "ecommerce" → "E-commerce" | "saas" → "SaaS"
const industryLabel: Record<string, string> = {
  fintech:    "FinTech",
  ecommerce:  "E-commerce",
  saas:       "SaaS",
  healthtech: "HealthTech",
  edtech:     "EdTech",
};

// ─── Metric chip ──────────────────────────────────────────────────────────────

function MetricChip({ improvement, label }: { improvement: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-lg font-bold leading-none text-charcoal-50">
        {heroMetric(improvement)}
      </span>
      <span className="truncate text-xs text-charcoal-400">
        {shortLabel(label)}
      </span>
    </div>
  );
}

// ─── Card — hero (full-width, tall) ───────────────────────────────────────────

interface CardProps {
  cs:      CaseStudy;
  reduced: boolean;
  index:   number;
}

function HeroCard({ cs, reduced, index }: CardProps) {
  return (
    <m.article
      className="group relative h-[480px] overflow-hidden rounded-2xl sm:h-[520px]"
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0, 0, 0.2, 1] }}
    >
      {/* Cover image */}
      <Image
        src={cs.coverImageUrl}
        alt={cs.coverImageAlt}
        fill
        sizes="(max-width: 1280px) 100vw, 1216px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />

      {/* Base gradient — readability at all times */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/10" />

      {/* Hover: deepen with an electric-blue undertone from the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 opacity-0
                   transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(0,20,60,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Outer card hover ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent
                   transition-all duration-300 group-hover:ring-electric-500/30"
      />

      {/* Industry chip — top left */}
      <div className="absolute left-5 top-5 z-10">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold text-charcoal-300"
          style={{
            background:     "rgba(13,14,22,0.70)",
            backdropFilter: "blur(8px)",
            border:         "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {industryLabel[cs.industry] ?? cs.industry}
        </span>
      </div>

      {/* Duration chip — top right */}
      <div className="absolute right-5 top-5 z-10">
        <span
          className="rounded-full px-3 py-1 text-xs font-medium text-charcoal-400"
          style={{
            background:     "rgba(13,14,22,0.70)",
            backdropFilter: "blur(8px)",
            border:         "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {cs.duration}
        </span>
      </div>

      {/* Glass info panel */}
      <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-6 sm:bottom-6">
        <div
          className="relative overflow-hidden rounded-xl p-5 transition-all duration-300 sm:p-6"
          style={{
            background:           "rgba(13,14,22,0.82)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:               "1px solid rgba(255,255,255,0.07)",
            boxShadow:            "0 4px 32px rgba(0,0,0,0.50)",
          }}
        >
          {/* Hover border overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0
                       transition-opacity duration-300 group-hover:opacity-100"
            style={{
              border:    "1px solid rgba(10,132,255,0.38)",
              boxShadow: "inset 0 1px 0 rgba(10,132,255,0.10), 0 0 24px rgba(10,132,255,0.08)",
            }}
          />

          {/* Metrics strip — 3 key results */}
          <div className="relative mb-5 flex items-start gap-6 border-b border-white/5 pb-5">
            {cs.metrics.slice(0, 3).map((m) => (
              <MetricChip
                key={m.label}
                improvement={m.improvement}
                label={m.label}
              />
            ))}
          </div>

          {/* Project info + CTA */}
          <div className="relative flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                {cs.title}
              </h3>
              <p className="mt-1 truncate text-sm text-charcoal-400">
                {cs.tagline}
              </p>
              <p className="mt-1 text-xs text-charcoal-600">
                {cs.client.name}
              </p>
            </div>

            <Link
              href={`/work/${cs.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-electric-500 px-4 py-2
                         text-sm font-semibold text-white shadow-sm transition-colors duration-150
                         hover:bg-electric-600 active:scale-[0.97]
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
              aria-label={`View ${cs.title} case study`}
            >
              View case study
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </m.article>
  );
}

// ─── Card — grid (half-width, shorter) ────────────────────────────────────────

function GridCard({ cs, reduced, index }: CardProps) {
  return (
    <m.article
      className="group relative h-[380px] overflow-hidden rounded-2xl"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0, 0, 0.2, 1] }}
    >
      {/* Cover image */}
      <Image
        src={cs.coverImageUrl}
        alt={cs.coverImageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 608px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/10" />

      {/* Hover blue undertone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 opacity-0
                   transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(0,20,60,0.50) 0%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent
                   transition-all duration-300 group-hover:ring-electric-500/30"
      />

      {/* Industry chip */}
      <div className="absolute left-4 top-4 z-10">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold text-charcoal-300"
          style={{
            background:     "rgba(13,14,22,0.70)",
            backdropFilter: "blur(8px)",
            border:         "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {industryLabel[cs.industry] ?? cs.industry}
        </span>
      </div>

      {/* Glass info panel */}
      <div className="absolute inset-x-4 bottom-4 z-10">
        <div
          className="relative overflow-hidden rounded-xl p-4 transition-all duration-300"
          style={{
            background:           "rgba(13,14,22,0.82)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:               "1px solid rgba(255,255,255,0.07)",
            boxShadow:            "0 4px 32px rgba(0,0,0,0.50)",
          }}
        >
          {/* Hover border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0
                       transition-opacity duration-300 group-hover:opacity-100"
            style={{
              border:    "1px solid rgba(10,132,255,0.38)",
              boxShadow: "inset 0 1px 0 rgba(10,132,255,0.10), 0 0 24px rgba(10,132,255,0.08)",
            }}
          />

          {/* Metrics — 2 key results */}
          <div className="relative mb-3.5 flex items-start gap-5 border-b border-white/5 pb-3.5">
            {cs.metrics.slice(0, 2).map((m) => (
              <MetricChip
                key={m.label}
                improvement={m.improvement}
                label={m.label}
              />
            ))}
          </div>

          {/* Project info + arrow link */}
          <div className="relative flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold leading-snug text-charcoal-50">
                {cs.title}
              </h3>
              <p className="mt-0.5 truncate text-xs text-charcoal-400">
                {cs.client.name} · {cs.duration}
              </p>
            </div>

            <Link
              href={`/work/${cs.slug}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                         bg-electric-500/10 ring-1 ring-electric-500/20 text-electric-400
                         transition-all duration-150 hover:bg-electric-500 hover:text-white
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
              aria-label={`View ${cs.title} case study`}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </m.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturedWork() {
  const prefersReduced = useReducedMotion() ?? false;
  const [hero, ...rest]  = featured;

  return (
    <section aria-label="Featured work" id="work" className="py-28">
      <Container>

        {/* Section header — left-aligned with "View all" on the right */}
        <m.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <SectionHeading
            align="left"
            overline="Our work"
            title="Illustrative projects"
            subtitle="These projects reflect the kind of work we do. Client details are illustrative."
          />
          <div className="shrink-0">
            <Button
              href="/work"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              View all work
            </Button>
          </div>
        </m.div>

        {/* Hero card — full width */}
        {hero && (
          <div className="mt-14">
            <HeroCard cs={hero} reduced={prefersReduced} index={0} />
          </div>
        )}

        {/* Grid cards — remaining featured studies */}
        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((cs, i) => (
              <GridCard
                key={cs.id}
                cs={cs}
                reduced={prefersReduced}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
