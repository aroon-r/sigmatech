import type { Metadata } from "next";
import { PAGE_METADATA } from "@/lib/metadata";
import { BLOG_POSTS } from "@/data/content/blog";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogGrid from "@/components/sections/blog/BlogGrid";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = PAGE_METADATA.blog;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const published = BLOG_POSTS
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <main>
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden py-20 pb-16">
        {/* Background radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(10,132,255,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-texture opacity-[0.10]"
        />

        <Container>
          <SectionHeading
            overline="Engineering insights"
            title="The SigmaTech Blog"
            subtitle="Real-world engineering, design thinking, and cloud operations — written by the people building it."
            align="center"
            as="h1"
          />
        </Container>
      </section>

      {/* ── Posts grid with category filter ── */}
      <section className="pb-24">
        <Container>
          <BlogGrid posts={published} />
        </Container>
      </section>
    </main>
  );
}
