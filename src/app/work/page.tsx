import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PAGE_METADATA } from "@/lib/metadata";
import { CASE_STUDIES } from "@/data/content/work";
import type { CaseStudy } from "@/data/schemas";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = PAGE_METADATA.work;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INDUSTRY_LABELS: Record<string, string> = {
  fintech:    "FinTech",
  ecommerce:  "E-commerce",
  saas:       "SaaS",
  healthtech: "HealthTech",
  edtech:     "EdTech",
};

const heroMetric  = (s: string) => s.split(" — ")[0];
const shortLabel  = (s: string) => s.split(" (")[0];

// ─── Case study card ──────────────────────────────────────────────────────────

function CaseStudyCard({ cs, priority = false }: { cs: CaseStudy; priority?: boolean }) {
  return (
    <article>
      <Link href={`/work/${cs.slug}`} className="group block h-full">
        <div
          className="flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300
                     border border-[rgba(255,255,255,0.07)] hover:border-[rgba(10,132,255,0.28)]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Cover image */}
          <div className="relative h-56 overflow-hidden sm:h-64">
            <Image
              src={cs.coverImageUrl}
              alt={cs.coverImageAlt}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent" />

            {/* Industry + duration chips */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-charcoal-200"
                style={{
                  background:     "rgba(13,14,22,0.75)",
                  backdropFilter: "blur(8px)",
                  border:         "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {INDUSTRY_LABELS[cs.industry] ?? cs.industry}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium text-charcoal-400"
                style={{
                  background:     "rgba(13,14,22,0.75)",
                  backdropFilter: "blur(8px)",
                  border:         "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {cs.duration}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-4 p-6">
            {/* Key metrics strip */}
            <div className="flex items-start gap-6 border-b border-white/5 pb-4">
              {cs.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold leading-none text-charcoal-50">
                    {heroMetric(m.improvement)}
                  </span>
                  <span className="text-xs text-charcoal-400">
                    {shortLabel(m.label)}
                  </span>
                </div>
              ))}
            </div>

            {/* Title + client */}
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold leading-snug text-charcoal-50
                             transition-colors group-hover:text-electric-200">
                {cs.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal-400">{cs.tagline}</p>
              <p className="mt-1 text-xs text-charcoal-600">{cs.client.name}</p>
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-electric-400
                               transition-colors group-hover:text-electric-300">
                View case study
              </span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg
                           bg-electric-500/10 ring-1 ring-electric-500/20
                           transition-all duration-150
                           group-hover:bg-electric-500 group-hover:ring-electric-500"
              >
                <ArrowRight className="h-3.5 w-3.5 text-electric-400 group-hover:text-white" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const published = CASE_STUDIES
    .filter((cs) => cs.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main>
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden py-20 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(10,132,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.10]"
        />
        <Container>
          <SectionHeading
            overline="Our work"
            title="Illustrative projects"
            subtitle="These projects reflect the kind of work we do and the outcomes we aim for. Client names and details are illustrative."
            align="center"
            as="h1"
          />
        </Container>
      </section>

      {/* ── Case study grid ── */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {published.map((cs, i) => (
              <Reveal key={cs.id} delay={i * 0.1}>
                <CaseStudyCard cs={cs} priority={i === 0} />
              </Reveal>
            ))}
          </div>

          {published.length === 0 && (
            <p className="py-20 text-center text-charcoal-500">
              Case studies coming soon.
            </p>
          )}

          <p className="mt-12 text-center text-xs text-charcoal-600">
            These are illustrative projects. Client names and specific figures are representative
            of the kind of work we do, not named client relationships.
          </p>
        </Container>
      </section>
    </main>
  );
}
