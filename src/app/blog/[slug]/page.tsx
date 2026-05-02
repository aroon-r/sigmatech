import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, BLOG_POST_BY_SLUG } from "@/data/content/blog";
import type { BlogPost, TocEntry } from "@/data/schemas";
import { BASE_URL } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import AuthorCard from "@/components/sections/blog/AuthorCard";
import ShareButtons from "@/components/sections/blog/ShareButtons";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return BLOG_POSTS
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const post = BLOG_POST_BY_SLUG[params.slug];
  if (!post) return {};

  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title:       post.seo.title,
    description: post.seo.description,
    keywords:    post.seo.keywords,
    authors:     [{ name: post.author.name }],
    alternates:  { canonical: url },
    openGraph: {
      title:         post.seo.title,
      description:   post.seo.description,
      url,
      siteName:      "Nexora",
      type:          "article",
      publishedTime: post.publishedAt,
      modifiedTime:  post.updatedAt,
      authors:       [post.author.name],
      images: [{ url: post.coverImageUrl, alt: post.title, width: 1200, height: 675 }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.seo.title,
      description: post.seo.description,
      images:      [post.coverImageUrl],
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converts a heading string to a URL-safe anchor — matches the ToC anchor format. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

// ─── Markdown components ──────────────────────────────────────────────────────
// Custom renderers applied to every element in the article body.
// Inline code vs. fenced code blocks: `pre` wraps fenced blocks (has className),
// bare `code` elements without a parent `pre` are inline.

const mdComponents: Components = {
  h2({ children }) {
    const text = Array.isArray(children) ? children.join("") : String(children ?? "");
    return (
      <h2
        id={slugify(text)}
        className="mb-4 mt-10 font-display text-2xl font-bold tracking-tight first:mt-0"
      >
        {children}
      </h2>
    );
  },
  h3({ children }) {
    const text = Array.isArray(children) ? children.join("") : String(children ?? "");
    return (
      <h3
        id={slugify(text)}
        className="mb-3 mt-8 text-lg font-semibold"
      >
        {children}
      </h3>
    );
  },
  p({ children }) {
    return <p className="mb-6 leading-8 text-charcoal-300">{children}</p>;
  },
  blockquote({ children }) {
    return (
      <blockquote
        className="my-6 border-l-2 border-electric-500 pl-5 italic text-charcoal-400"
      >
        {children}
      </blockquote>
    );
  },
  a({ href, children }) {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-electric-400 underline underline-offset-2 transition-colors hover:text-electric-300"
      >
        {children}
      </a>
    );
  },
  // Fenced code blocks — `pre` wraps the `code` element
  pre({ children }) {
    return (
      <pre
        className="my-6 overflow-x-auto rounded-xl p-5 text-sm"
        style={{
          background: "rgba(255,255,255,0.04)",
          border:     "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {children}
      </pre>
    );
  },
  code({ className, children }) {
    // Inside a <pre> (fenced block) — className is "language-xxx"
    if (className) {
      return (
        <code className={cn("font-mono text-charcoal-300", className)}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code
        className="rounded px-1.5 py-0.5 font-mono text-sm text-electric-300"
        style={{ background: "rgba(10,132,255,0.10)" }}
      >
        {children}
      </code>
    );
  },
  // GFM tables
  table({ children }) {
    return (
      <div
        className="my-6 overflow-x-auto rounded-xl"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <table className="w-full text-sm">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th
        className="border-b px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td
        className="border-b px-4 py-2.5 text-charcoal-300"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {children}
      </td>
    );
  },
  ul({ children }) {
    return <ul className="mb-6 ml-5 list-disc space-y-2">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-6 ml-5 list-decimal space-y-2">{children}</ol>;
  },
  li({ children }) {
    return <li className="leading-7 text-charcoal-300">{children}</li>;
  },
  strong({ children }) {
    return <strong className="font-semibold text-charcoal-100">{children}</strong>;
  },
  hr() {
    return (
      <hr
        className="my-8"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
    );
  },
};

// ─── Section: Article hero ────────────────────────────────────────────────────

function ArticleHero({
  post,
  children,
}: {
  post:     BlogPost;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-8 pb-0">
      <Container>
        {/* Breadcrumbs */}
        <div className="mb-8">{children}</div>

        {/* Category + reading time */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-electric-300"
            style={{
              background: "rgba(10,132,255,0.12)",
              border:     "1px solid rgba(10,132,255,0.30)",
            }}
          >
            {post.category.replace("-", " & ")}
          </span>
          <span className="flex items-center gap-1 text-xs text-charcoal-500">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt — article deck */}
        <p className="mt-4 max-w-2xl text-lg leading-8 text-charcoal-400">
          {post.excerpt}
        </p>

        {/* Author + date row */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div>
            <p className="font-medium text-charcoal-100">{post.author.name}</p>
            <p className="text-xs text-charcoal-500">{post.author.designation}</p>
          </div>
          <div
            className="h-4 w-px"
            style={{ background: "rgba(255,255,255,0.10)" }}
            aria-hidden="true"
          />
          <div className="flex items-center gap-1.5 text-sm text-charcoal-500">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
          {post.updatedAt !== post.publishedAt && (
            <p className="text-xs text-charcoal-600">
              Updated {formatDate(post.updatedAt)}
            </p>
          )}
        </div>
      </Container>

      {/* Cover image — full-width below the header block */}
      <div className="relative mt-10 h-[420px] lg:h-[520px]">
        <Image
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-bg))",
          }}
        />
      </div>
    </section>
  );
}

// ─── Section: Table of contents (sidebar) ────────────────────────────────────

function TableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
        On this page
      </p>
      <ul className="space-y-2.5">
        {entries.map((entry) => (
          <li key={entry.anchor}>
            <a
              href={`#${entry.anchor}`}
              className={cn(
                "block text-sm leading-snug transition-colors hover:text-charcoal-200",
                entry.level === 2 ? "text-charcoal-400" : "pl-4 text-charcoal-500",
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Section: Related posts ───────────────────────────────────────────────────

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

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
        <p className="section-label mb-8">Keep reading</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => {
            const date = formatDate(post.publishedAt);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 rounded-2xl p-4 transition-all duration-200
                           border border-[rgba(255,255,255,0.06)] hover:border-[rgba(10,132,255,0.25)]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="112px"
                  />
                </div>
                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-charcoal-100 group-hover:text-electric-200 transition-colors">
                    {post.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-charcoal-600">
                    <span>{post.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{date}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = BLOG_POST_BY_SLUG[params.slug];

  if (!post || post.status !== "published") {
    notFound();
  }

  // Resolve related posts (up to 2)
  const relatedPosts = (post.relatedPostSlugs ?? [])
    .map((slug) => BLOG_POST_BY_SLUG[slug])
    .filter((p): p is BlogPost => !!p && p.status === "published")
    .slice(0, 2);

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  // Article JSON-LD for Google's rich results
  const articleJsonLd = {
    "@context":       "https://schema.org",
    "@type":          "Article",
    headline:          post.title,
    description:       post.seo.description,
    image:             post.coverImageUrl,
    datePublished:     post.publishedAt,
    dateModified:      post.updatedAt,
    url:               canonicalUrl,
    author: {
      "@type":   "Person",
      name:      post.author.name,
      jobTitle:  post.author.designation,
    },
    publisher: {
      "@type": "Organization",
      name:    "Nexora",
      logo: {
        "@type": "ImageObject",
        url:     `${BASE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main>
        {/* ── Hero — title, meta, cover image ── */}
        <ArticleHero post={post}>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </ArticleHero>

        {/* ── Article body + ToC sidebar ── */}
        <Reveal>
          <section className="py-16">
            <Container>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_220px]">

                {/* Article prose */}
                <article>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={mdComponents}
                  >
                    {post.body}
                  </ReactMarkdown>
                </article>

                {/* Sticky ToC */}
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <aside className="hidden lg:block">
                    <div className="sticky top-24">
                      <TableOfContents entries={post.tableOfContents} />
                    </div>
                  </aside>
                )}

              </div>
            </Container>
          </section>
        </Reveal>

        {/* ── Author card ── */}
        <Reveal yOffset={24}>
          <section className="py-8">
            <Container>
              <div
                className="mb-8 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
                }}
              />
              <div className="max-w-2xl">
                <AuthorCard author={post.author} />
              </div>
            </Container>
          </section>
        </Reveal>

        {/* ── Share buttons ── */}
        <Reveal yOffset={16}>
          <section className="py-6 pb-12">
            <Container>
              <ShareButtons url={canonicalUrl} title={post.title} />
            </Container>
          </section>
        </Reveal>

        {/* ── Related posts ── */}
        <RelatedPosts posts={relatedPosts} />
      </main>
    </>
  );
}
