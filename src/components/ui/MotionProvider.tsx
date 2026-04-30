"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Wraps the app in a LazyMotion context so that all `m.*` components
 * share a single copy of the domAnimation feature bundle rather than
 * each bundling the full `motion` factory.
 *
 * Components should import `m` instead of `motion`:
 *   import { m } from "framer-motion";
 *   <m.div animate={{ opacity: 1 }} />
 *
 * AnimatePresence, useReducedMotion, and other hooks are imported from
 * "framer-motion" as normal — they are unaffected by this wrapper.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
