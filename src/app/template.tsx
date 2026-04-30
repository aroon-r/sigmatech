"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * template.tsx re-mounts on every navigation (unlike layout.tsx which persists).
 * This is the correct hook point for page transition animations in the App Router.
 *
 * Animation: opacity 0→1 + 6px vertical lift, 300ms.
 * Reduced-motion: animation is skipped entirely (instant display).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <m.div
      initial={prefersReduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.30, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
