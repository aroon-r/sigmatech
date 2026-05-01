import { PAGE_METADATA } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Below-fold sections loaded lazily so the Hero renders without blocking.
// HowWeWork replaces Testimonials as the primary trust-building section.
// FeaturedWork and Testimonials are excluded — no fabricated case studies
// or testimonials on the homepage.

const Services    = dynamic(() => import("@/components/sections/Services"));
const HowWeWork   = dynamic(() => import("@/components/sections/HowWeWork"));
const TrustSection = dynamic(() => import("@/components/sections/TrustSection"));
const FinalCTA    = dynamic(() => import("@/components/sections/FinalCTA"));

export const metadata = PAGE_METADATA.home;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={null}>
        <Services />
        <HowWeWork />
        <TrustSection statement="The engineers you brief are the ones who build. We write down what we're committing to before development starts, and document every decision that matters on handover." />
        <FinalCTA />
      </Suspense>
    </>
  );
}
