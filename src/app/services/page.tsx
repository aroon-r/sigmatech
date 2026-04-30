import type { Metadata } from "next";
import { PAGE_METADATA } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Services from "@/components/sections/Services";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = PAGE_METADATA.services;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main>
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden py-20 pb-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(10,132,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.10]"
        />
        <Container>
          <SectionHeading
            overline="What we do"
            title="Full-cycle software services"
            subtitle="From a single feature to a complete platform — we cover the stack so you can focus on the product."
            align="center"
            as="h1"
          />
        </Container>
      </section>

      {/* ── Service cards — reuses homepage section ── */}
      <Services />
    </main>
  );
}
