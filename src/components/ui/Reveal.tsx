"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RevealProps {
  children:   React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. Stack multiple Reveals to cascade siblings. */
  delay?:     number;
  /**
   * Y-axis offset for the entrance slide, in px.
   * Default 0 = opacity-only fade, which composes cleanly with sections that
   * already manage their own internal card slide-ups.
   * Pass 24–40 for standalone elements with no internal animations.
   */
  yOffset?:   number;
  /** Override the IntersectionObserver margin (rg "-80px"). */
  margin?:    string;
}

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * Standardises scroll-triggered entrance animations across the codebase.
 *
 * Usage in Server Components (e.g. page.tsx):
 *   <Reveal><SomeClientSection /></Reveal>
 *
 * Usage inside Client Components:
 *   <Reveal yOffset={32} delay={0.1}><Card /></Reveal>
 *
 * All parameters use the same ease curve ([0,0,0.2,1]) and `once:true`
 * viewport detection so every section feels part of the same design system.
 */
export default function Reveal({
  children,
  className,
  delay   = 0,
  yOffset = 0,
  margin  = "-80px",
}: RevealProps) {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <m.div
      className={cn(className)}
      initial={prefersReduced ? false : { opacity: 0, y: yOffset }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{
        duration: 0.55,
        delay,
        ease:     [0, 0, 0.2, 1],
      }}
    >
      {children}
    </m.div>
  );
}
