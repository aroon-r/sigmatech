"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Building2, ShoppingBag, Server, BarChart3, Cpu, Globe, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TESTIMONIALS, type TestimonialEntry } from "@/data/content/testimonials";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Avatar palette ───────────────────────────────────────────────────────────
// Deterministic by index so server and client render identically.

const AVATAR_COLORS = [
  { bg: "rgba(10,132,255,0.18)",  text: "#3091FF" }, // electric
  { bg: "rgba(34,197,94,0.18)",   text: "#22C55E" }, // green
  { bg: "rgba(245,158,11,0.18)",  text: "#F59E0B" }, // amber
  { bg: "rgba(139,92,246,0.18)",  text: "#8B5CF6" }, // purple
  { bg: "rgba(6,182,212,0.18)",   text: "#06B6D4" }, // cyan
  { bg: "rgba(236,72,153,0.18)",  text: "#EC4899" }, // pink
];

// ─── Trust companies ──────────────────────────────────────────────────────────

const TRUST_COMPANIES: { name: string; Icon: LucideIcon }[] = [
  { name: "Meridian Capital",  Icon: Building2  },
  { name: "Luminary Goods",   Icon: ShoppingBag },
  { name: "NovaTech Labs",    Icon: Server      },
  { name: "Vantage Group",    Icon: BarChart3   },
  { name: "Helix AI",         Icon: Cpu         },
  { name: "Aether Digital",   Icon: Globe       },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  colorIndex,
}: {
  testimonial: TestimonialEntry;
  colorIndex:  number;
}) {
  const color    = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  const initials = getInitials(testimonial.authorName);

  return (
    <div
      className="w-[360px] shrink-0 rounded-2xl p-5"
      style={{
        background:           "rgba(255,255,255,0.03)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border:               "1px solid rgba(255,255,255,0.06)",
        boxShadow:            "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Decorative open-quote */}
      <div
        className="mb-3 font-serif text-4xl leading-none text-electric-500/30"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p className="line-clamp-5 text-sm leading-relaxed text-charcoal-300">
        {testimonial.quote}
      </p>

      {/* Author row */}
      <div className="mt-4 flex items-center gap-3">
        {/* Initials avatar */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: color.bg, color: color.text }}
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-charcoal-50">
            {testimonial.authorName}
          </p>
          <p className="truncate text-xs text-charcoal-500">
            {testimonial.authorTitle} · {testimonial.authorCompany}
          </p>
        </div>

        {testimonial.linkedinUrl && (
          <Link
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${testimonial.authorName} on LinkedIn`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md
                       text-charcoal-600 transition-all duration-150
                       hover:bg-charcoal-800 hover:text-charcoal-400"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Service badge */}
      <div className="mt-3">
        <span className="inline-block rounded-full border border-charcoal-700 bg-charcoal-800/60 px-2.5 py-0.5 text-xs text-charcoal-500">
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}

// ─── Marquee row ─────────────────────────────────────────────────────────────
// The track contains items × 2. The animation translates by -50%, which moves
// one full set width — so the end position is visually identical to the start.

function MarqueeRow({
  items,
  reverse = false,
}: {
  items:    TestimonialEntry[];
  reverse?: boolean;
}) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    // overflow-hidden clips the extended track; width must exceed the viewport.
    <div className="overflow-hidden">
      <div
        className={`flex gap-5 ${animClass} group-hover:[animation-play-state:paused]`}
        // group-hover: pause is inherited from the parent <section>'s group class.
      >
        {/* First set — accessible to screen readers */}
        {items.map((t, i) => (
          <TestimonialCard key={`a-${i}`} testimonial={t} colorIndex={i} />
        ))}
        {/* Duplicate set — purely visual, hidden from AT */}
        <div className="contents" aria-hidden="true">
          {items.map((t, i) => (
            <TestimonialCard key={`b-${i}`} testimonial={t} colorIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Trust strip ─────────────────────────────────────────────────────────────

function TrustStrip({ reduced }: { reduced: boolean }) {
  return (
    <m.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
      className="mt-16 border-t border-charcoal-800 pt-12"
    >
      <p className="section-label mb-8 text-center">Trusted by teams at</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {TRUST_COMPANIES.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 text-charcoal-600 transition-colors duration-150 hover:text-charcoal-400"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold">{name}</span>
          </div>
        ))}
      </div>
    </m.div>
  );
}

// ─── Static grid fallback (reduced motion) ────────────────────────────────────

function StaticGrid({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <m.div
          key={i}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0, 0, 0.2, 1] }}
        >
          <TestimonialCard testimonial={t} colorIndex={i} />
        </m.div>
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

// Row 2 is offset by rotating the array so the two rows start differently —
// gives a woven, editorial feel rather than two identical moving columns.
const ROW_2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)];

export default function Testimonials() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    /*
     * The `group` class on the <section> drives the CSS `group-hover:` pause
     * on both marquee rows — a single hover region covering the full section.
     * WCAG 2.2.2: moving content is pauseable; keyboard users may tab through
     * cards within the marquee since each card renders real DOM nodes.
     */
    <section aria-label="Client testimonials" id="testimonials" className="group py-24">

      {/* Section heading — constrained + entrance animation */}
      <Container>
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <SectionHeading
            overline="What clients say"
            title="Outcomes that speak for themselves"
            subtitle="We measure success by the results our clients report, not the work we delivered."
          />
        </m.div>

        {/* Reduced-motion users get a static grid instead of the marquee */}
        {prefersReduced && <StaticGrid reduced />}
      </Container>

      {/* Marquee — full-bleed, outside Container so cards bleed to viewport edges */}
      {!prefersReduced && (
        <div className="mt-12 space-y-5">
          <MarqueeRow items={TESTIMONIALS} />
          <MarqueeRow items={ROW_2} reverse />
        </div>
      )}

      {/* Trust strip — constrained */}
      <Container>
        <TrustStrip reduced={prefersReduced} />
      </Container>
    </section>
  );
}
