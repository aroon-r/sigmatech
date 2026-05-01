"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost, BlogCategorySlug } from "@/data/schemas";

// ─── Category labels ──────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<BlogCategorySlug, string> = {
  "engineering":   "Engineering",
  "design":        "Design",
  "cloud-devops":  "Cloud & DevOps",
  "product":       "Product",
  "company-news":  "Company News",
  "tutorials":     "Tutorials",
  "case-studies":  "Case Studies",
  "ai-ml":         "AI & ML",
};

// ─── Post card ────────────────────────────────────────────────────────────────

function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div
          className="flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200
                     border border-[rgba(255,255,255,0.07)] hover:border-[rgba(10,132,255,0.25)]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Cover image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            {/* Category badge over image */}
            <div className="absolute left-3 top-3">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-electric-300"
                style={{
                  background: "rgba(0,11,30,0.75)",
                  border:     "1px solid rgba(10,132,255,0.35)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="font-display text-base font-bold leading-snug text-charcoal-50 group-hover:text-electric-200 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm leading-6 text-charcoal-400 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              {/* Author */}
              <div className="flex items-center text-xs text-charcoal-400">
                {post.author.name}
              </div>

              <span className="text-charcoal-600" aria-hidden="true">·</span>

              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-charcoal-400">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {date}
              </div>

              <span className="text-charcoal-600" aria-hidden="true">·</span>

              {/* Reading time */}
              <div className="flex items-center gap-1 text-xs text-charcoal-400">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readingTimeMinutes} min read
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Grid with filter ─────────────────────────────────────────────────────────

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [active, setActive] = useState<"all" | BlogCategorySlug>("all");

  // Only show categories that actually have posts
  const usedCategories = Array.from(
    new Set(posts.map((p) => p.category)),
  ) as BlogCategorySlug[];

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* ── Category filter pills ── */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        <button
          role="tab"
          aria-selected={active === "all"}
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150",
            active === "all"
              ? "border-electric-500 bg-electric-500/10 text-electric-300"
              : "border-charcoal-700 text-charcoal-500 hover:border-charcoal-500 hover:text-charcoal-300",
          )}
        >
          All
        </button>
        {usedCategories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150",
              active === cat
                ? "border-electric-500 bg-electric-500/10 text-electric-300"
                : "border-charcoal-700 text-charcoal-500 hover:border-charcoal-500 hover:text-charcoal-300",
            )}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* ── Post grid ── */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-charcoal-500">
          No posts in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogCard key={post.id} post={post} priority={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
