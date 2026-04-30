import { PAGE_METADATA } from "@/lib/metadata";
import Hero        from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/sections/Services"));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));
const TrustSection = dynamic(() => import("@/components/sections/TrustSection"));
import { Suspense } from "react";

export const metadata = PAGE_METADATA.home;

export default function HomePage() {
  return (
    <>
      {/*
       * Hero — above the fold, animates on mount.
       * No Reveal wrapper: it is the first thing the user sees and already
       * has its own staggered entrance animations baked in.
       */}
      <Hero />
      <Suspense fallback={null}>
  <Services />
  <FeaturedWork />
  <Testimonials />
  <TrustSection statement="Built around clear scope, practical delivery, and software that is easy to maintain." />
  <FinalCTA />
</Suspense>

      {/*
       * Below-fold sections — each wrapped in <Reveal> (yOffset=0 default).
       * Reveal applies a cohesive opacity fade as the section scrolls into
       * view. Internal card animations (slide-up, stagger) are unaffected
       * because they use separate whileInView observers on child elements.
       *
       * The Reveal boundary also ensures that sections rendered above the
       * current scroll position on page load (rare but possible on tall
       * viewports) still animate in rather than popping instantly.
       */}
       
      {/*
       * FinalCTA — manages its own two-phase entrance animation internally:
       *   Phase 1 (delay 0s):    card slides up from y:48, opacity 0→1
       *   Phase 2 (delay 0.22s): content fades up from y:20, opacity 0→1
       * A Reveal wrapper here would add a third opacity layer, so we skip it.
       */}
    </>
  );
}
