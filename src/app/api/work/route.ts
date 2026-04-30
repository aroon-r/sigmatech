import { NextRequest, NextResponse } from "next/server";
import type { CaseStudySummary, CaseStudyIndustry, ServiceSlug } from "@/data/schemas";

// ─── Caching ──────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

// ─── Data source ──────────────────────────────────────────────────────────────
async function getCaseStudies(): Promise<CaseStudySummary[]> {
  try {
    const { CASE_STUDIES } = await import("@/data/caseStudies");
    return CASE_STUDIES;
  } catch {
    return [];
  }
}

// ─── Response helpers ─────────────────────────────────────────────────────────

function ok<T>(data: T[], total?: number) {
  return NextResponse.json(
    { data, meta: { total: total ?? data.length } },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
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

// ─── Valid filter values ──────────────────────────────────────────────────────

const VALID_INDUSTRIES = new Set<string>([
  "fintech", "healthtech", "ecommerce", "saas", "logistics",
  "education", "media", "real-estate", "non-profit", "government",
  "enterprise", "startup", "other",
]);

const VALID_SERVICE_SLUGS = new Set<string>([
  "web-development", "cloud-solutions", "qa-testing",
  "ui-ux-design", "consulting", "staff-augmentation",
]);

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const slugParam     = searchParams.get("slug");
  const featuredParam = searchParams.get("featured");
  const serviceParam  = searchParams.get("service");
  const industryParam = searchParams.get("industry");
  const tagParam      = searchParams.get("tag");

  // Validate enum params early
  if (serviceParam && !VALID_SERVICE_SLUGS.has(serviceParam)) {
    return badRequest(`Invalid service slug: "${serviceParam}"`);
  }
  if (industryParam && !VALID_INDUSTRIES.has(industryParam)) {
    return badRequest(`Invalid industry: "${industryParam}"`);
  }

  const all = await getCaseStudies();

  // Single lookup
  if (slugParam) {
    const cs = all.find((c) => c.slug === slugParam);
    if (!cs) return notFound(`No case study found with slug "${slugParam}"`);
    return NextResponse.json({ data: cs }, { status: 200 });
  }

  // Filtered list — all filters are AND-ed together
  let result = all.filter((cs) => {
    if (featuredParam === "true" && !cs.isFeatured)                        return false;
    if (serviceParam  && !cs.servicesSlugs.includes(serviceParam as ServiceSlug)) return false;
    if (industryParam && cs.industry !== (industryParam as CaseStudyIndustry))    return false;
    if (tagParam      && !cs.tags.some((t) => t.toLowerCase() === tagParam.toLowerCase())) return false;
    return true;
  });

  // Featured first, then by sortOrder
  result = [...result].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return a.sortOrder - b.sortOrder;
  });

  return ok(result);
}
