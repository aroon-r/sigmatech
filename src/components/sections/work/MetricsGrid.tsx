import { ArrowRight } from "lucide-react";
import type { Metric } from "@/data/schemas";
import Container from "@/components/ui/Container";

// ─── Card ─────────────────────────────────────────────────────────────────────

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div
      className="flex flex-col rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        border:     "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Metric label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
        {metric.label}
      </p>

      {/* Before → After */}
      <div className="mt-5 flex items-end gap-3">
        {/* Before */}
        <div className="shrink-0">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-charcoal-600">Before</p>
          <p className="font-display text-base font-medium text-charcoal-600 line-through decoration-charcoal-700">
            {metric.before}
          </p>
        </div>

        <ArrowRight
          className="mb-1 h-4 w-4 shrink-0 text-charcoal-700"
          aria-hidden="true"
        />

        {/* After */}
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-wider text-electric-500">After</p>
          <p className="font-display text-3xl font-bold tracking-tight text-charcoal-50">
            {metric.after}
          </p>
        </div>
      </div>

      {/* Improvement callout */}
      <div
        className="mt-5 rounded-xl px-3 py-2"
        style={{
          background: "rgba(10,132,255,0.08)",
          border:     "1px solid rgba(10,132,255,0.18)",
        }}
      >
        <p className="text-sm font-medium leading-snug text-electric-300">
          {metric.improvement}
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section className="py-20">
      {/* Separator */}
      <div
        className="mb-20 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
        }}
      />

      <Container>
        <div className="mb-10">
          <p className="section-label mb-3">The impact</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal-50 sm:text-4xl">
            Results that move the needle
          </h2>
          <p className="mt-4 max-w-xl text-charcoal-400">
            Every metric is real and measured at 30 days post-launch — not
            projected, not rounded.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Container>
    </section>
  );
}
