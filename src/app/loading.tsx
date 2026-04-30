"use client";

import { motion } from "framer-motion";

// ─── Skeleton bar ─────────────────────────────────────────────────────────────
// A single pulsing placeholder bar. Pass width/height via className.

function Skeleton({
  className,
  delay = 0,
}: {
  className: string;
  delay?:    number;
}) {
  return (
    <motion.div
      className={`rounded-lg ${className}`}
      style={{ background: "rgba(255,255,255,0.055)" }}
      animate={{ opacity: [0.45, 0.80, 0.45] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="mx-auto max-w-7xl px-6 pb-24 lg:px-8"
    >
      {/* ── Hero skeleton ── */}
      <section className="flex flex-col items-center gap-5 py-24 text-center">
        {/* Overline badge */}
        <Skeleton className="h-4 w-24" delay={0} />

        {/* H1 */}
        <Skeleton className="h-12 w-[560px] max-w-full" delay={0.08} />

        {/* Subtitle line 1 */}
        <Skeleton className="h-5 w-96 max-w-full" delay={0.16} />
        {/* Subtitle line 2 */}
        <Skeleton className="h-5 w-80 max-w-full" delay={0.20} />

        {/* CTA buttons */}
        <div className="mt-3 flex gap-3">
          <Skeleton className="h-12 w-32 rounded-xl" delay={0.28} />
          <Skeleton className="h-12 w-28 rounded-xl" delay={0.32} />
        </div>
      </section>

      {/* ── Spinner centred in the hero for extra visual polish ── */}
      {/* Positioned with negative margin so it overlaps the hero section bottom */}
      <div className="relative -mt-8 mb-14 flex justify-center">
        <div className="relative h-12 w-12">
          {/* Ripple ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(10,132,255,0.45)" }}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Ripple ring 2 — staggered */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(10,132,255,0.30)" }}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
          />
          {/* Inner filled dot */}
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "rgba(10,132,255,0.20)",
              border:     "1.5px solid rgba(10,132,255,0.65)",
            }}
          />
          {/* Rotating arc */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border:           "2px solid transparent",
              borderTopColor:   "rgba(10,132,255,0.90)",
              borderRightColor: "rgba(10,132,255,0.25)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* ── Card grid skeleton — 3 columns ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {([0.0, 0.12, 0.24] as const).map((delay, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.025)",
              border:     "1px solid rgba(255,255,255,0.06)",
            }}
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
          >
            {/* Image placeholder */}
            <div
              className="h-48"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            {/* Text lines */}
            <div className="space-y-3 p-5">
              <div className="h-3.5 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="h-3   w-full  rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="h-3   w-5/6   rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="mt-4 flex items-center gap-2">
                <div className="h-5 w-5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="h-3 w-24 rounded"     style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
