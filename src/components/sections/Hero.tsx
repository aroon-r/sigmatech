"use client";

import { FileCheck2, GitBranch, Users } from "lucide-react";
import Button from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────
// These cards describe how we work — not marketing claims.
// Each one is a fact about our process that a prospective client can hold us to.

const PROCESS_CARDS = [
  {
    Icon:     FileCheck2,
    metric:   "Scoped first",
    label:    "In writing, before code starts",
    color:    "#22C55E",
    position: "left-[4%] top-[22%]",
  },
  {
    Icon:     GitBranch,
    metric:   "Staging early",
    label:    "Real work, not a milestone demo",
    color:    "#0A84FF",
    position: "right-8 top-[20%]",
  },
  {
    Icon:     Users,
    metric:   "Same team",
    label:    "From brief to handover",
    color:    "#F59E0B",
    position: "right-8 bottom-[22%]",
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-texture" />

      <div
        className="absolute left-1/2 -top-48 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(10,132,255,0.09) 0%, rgba(10,132,255,0.03) 50%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />


<div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal-950 to-transparent" />
    </div>
  );
}

interface ProcessCardProps {
  Icon:     React.ElementType;
  metric:   string;
  label:    string;
  color:    string;
  position: string;
}

function FloatingProcessCard({ Icon, metric, label, color, position }: ProcessCardProps) {
  return (
    <div className={`absolute hidden xl:block ${position}`}>
      <div
        className="w-52 rounded-2xl px-4 py-3.5"
        style={{
          background:           "rgba(255,255,255,0.025)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border:               "1px solid rgba(255,255,255,0.04)",
          boxShadow:            "0 4px 16px rgba(0,0,0,0.28)",
        }}
      >
        <div
          className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: `${color}22` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />
        </div>
        <p className="text-xl font-bold tracking-tight text-charcoal-50">{metric}</p>
        <p className="mt-0.5 text-xs leading-snug text-charcoal-400">{label}</p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-32 text-center lg:px-8">

      <HeroBackground />

      {/* Process cards — xl and above. Each card states a fact about how we work. */}
      {PROCESS_CARDS.map((card) => (
        <FloatingProcessCard key={card.metric} {...card} />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-start gap-8 text-left">

        <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-charcoal-50">
          The engineers who scope it are the engineers who build it.
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-charcoal-300">
          We stay small deliberately. Every project starts with a written scope, deploys to a staging
          environment early — before the architecture is too committed to change course — and ends with documented
          decisions, not just a handover call.
        </p>

        <div className="flex flex-wrap items-center justify-start gap-4">
          <Button href="/contact">Send a brief</Button>
          <Button variant="outline" href="#how-we-work">See how we work</Button>
        </div>

      </div>
    </section>
  );
}
