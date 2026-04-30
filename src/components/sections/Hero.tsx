"use client";

import { TrendingUp, Zap, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    Icon: TrendingUp,
    metric: "Fast",
    label: "Performance-first delivery",
    color: "#22C55E",
    position: "left-[4%] top-[22%]"
  },
  {
    Icon: Zap,
    metric: "Clean",
    label: "Maintainable, typed codebases",
    color: "#0A84FF",
    position: "right-[4%] top-[18%]"
  },
  {
    Icon: ShieldCheck,
    metric: "Reliable",
    label: "Reliability by default",
    color: "#F59E0B",
    position: "right-[5%] bottom-[26%]"
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-texture" />

      {/* Primary blob — large electric blue, centre-top */}
      <div
        className="absolute left-1/2 -top-48 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(10,132,255,0.20) 0%, rgba(10,132,255,0.05) 50%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      {/* Secondary blob — bottom-left, cyan tint */}
      <div
        className="absolute -bottom-48 -left-24 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(48,145,255,0.12) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Tertiary blob — top-right, deeper blue */}
      <div
        className="absolute -top-12 -right-16 h-[380px] w-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,95,191,0.14) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal-950 to-transparent" />
    </div>
  );
}

interface StatCardProps {
  Icon: React.ElementType;
  metric: string;
  label: string;
  color: string;
  position: string;
}

function FloatingStatCard({
  Icon, metric, label, color, position
}: StatCardProps) {
  return (
    // Entrance wrapper — fades + slides up once on mount
    <div
      className={`absolute hidden xl:block ${position}`}
    >
      {/* Continuous float — independent of entrance */}
      <div
        className="w-52 rounded-2xl px-4 py-3.5"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
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
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-24 text-center lg:px-8">

      <HeroBackground />

      {/* Floating stat cards — xl and above only */}
      {stats.map((stat) => (
        <FloatingStatCard key={stat.metric} {...stat} />
      ))}

      {/* ── Main content — staggered entrance ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Badge */}
        <Badge variant="brand" pulse>
          A software engineering studio
        </Badge>

        {/* Headline */}
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-charcoal-50">
          We turn complex requirements into software that ships
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal-300">
          We design and build web applications, APIs, and digital products with clear structure, clean code, and practical execution.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact">Start a conversation</Button>
          <Button variant="secondary" href="/work">See our work</Button>
        </div>
      </div>
</section>
  );
}
