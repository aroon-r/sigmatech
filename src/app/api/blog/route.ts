import { NextRequest, NextResponse } from "next/server";
import type { BlogPostSummary, BlogCategorySlug } from "@/data/schemas";

// ─── Caching ──────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

// ─── Data source ──────────────────────────────────────────────────────────────
async function getBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const { BLOG_POSTS } = await import("@/data/blog");
    return BLOG_POSTS;
  } catch {
    return [];
  }
}

// ─── Response helpers ─────────────────────────────────────────────────────────

function ok<T>(
  data: T[],
  meta: { total: number; page: number; pageSize: number; totalPages: number },
) {
  return NextResponse.json(
    { data, meta },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    },
  );
}

function notFound(message: string) {
  return NextResponse.json({ error: message, code: "NOT_FOUND" }, { status: 404 });
}

function badRequest(message: string) {
  return NextResponse.json({ error: message, code: "VALIDATION_ERROR" }, { status: 400 });
}

// ─── Valid category slugs ─────────────────────────────────────────────────────

const VALID_CATEGORIES = new Set<string>([
  "engineering", "design", "cloud-devops", "product",
  "company-news", "tutorials", "case-studies", "ai-ml",
]);

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const slugParam     = searchParams.get("slug");
  const categoryParam = searchParams.get("category");
  const tagParam      = searchParams.get("tag");
  const featuredParam = searchParams.get("featured");

  // Pagination
  const pageRaw     = Number(searchParams.get("page")     ?? 1);
  const pageSizeRaw = Number(searchParams.get("pageSize") ?? 10);

  if (!Number.isInteger(pageRaw) || pageRaw < 1) {
    return badRequest("page must be a positive integer");
  }
  if (!Number.isInteger(pageSizeRaw) || pageSizeRaw < 1 || pageSizeRaw > 50) {
    return badRequest("pageSize must be between 1 and 50");
  }
  if (categoryParam && !VALID_CATEGORIES.has(categoryParam)) {
    return badRequest(`Invalid category: "${categoryParam}"`);
  }

  const all = await getBlogPosts();

  // Single post lookup — returns full BlogPost, not just summary
  if (slugParam) {
    // For full BlogPost (including body), import from the data source directly.
    // BlogPostSummary strips `body` — so we reach back to the raw array here.
    try {
      const { BLOG_POSTS_FULL } = await import("@/data/blog");
      const post = BLOG_POSTS_FULL.find((p) => p.slug === slugParam);
      if (!post) return notFound(`No blog post found with slug "${slugParam}"`);
      return NextResponse.json({ data: post }, { status: 200 });
    } catch {
      const summary = all.find((p) => p.slug === slugParam);
      if (!summary) return notFound(`No blog post found with slug "${slugParam}"`);
      return NextResponse.json({ data: summary }, { status: 200 });
    }
  }

  // Filtered list
  let filtered = all.filter((post) => {
    if (featuredParam === "true" && !post.isFeatured) return false;
    if (categoryParam && post.category !== (categoryParam as BlogCategorySlug)) return false;
    if (tagParam && !post.tags.some((t) => t.toLowerCase() === tagParam.toLowerCase())) return false;
    return true;
  });

  // Newest first (publishedAt descending), featured pinned first
  filtered = [...filtered].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Pagination slice
  const total      = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSizeRaw));
  const page       = Math.min(pageRaw, totalPages);
  const start      = (page - 1) * pageSizeRaw;
  const data       = filtered.slice(start, start + pageSizeRaw);

  return ok(data, { total, page, pageSize: pageSizeRaw, totalPages });
}
