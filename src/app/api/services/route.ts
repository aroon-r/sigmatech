import { NextRequest, NextResponse } from "next/server";
import type { ServiceSummary } from "@/data/schemas";

// ─── Caching ──────────────────────────────────────────────────────────────────
// Phase 1: baked into the build — data never changes at runtime.
// Phase 2: remove this export and add `revalidate = 3600` for ISR.
export const dynamic = "force-static";

// ─── Data source ──────────────────────────────────────────────────────────────
// SERVICES will be created in Step 15 (Content Population).
// The import below is intentionally dynamic so the route compiles before
// the data file exists — swap for a named import once Step 15 is complete.
async function getServices(): Promise<ServiceSummary[]> {
  try {
    const { SERVICES } = await import("@/data/services");
    return SERVICES;
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

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const slugParam   = searchParams.get("slug");
  const statusParam = searchParams.get("status") ?? "published";
  const activeParam = searchParams.get("active")  ?? "true";

  if (!["published", "draft", "archived"].includes(statusParam)) {
    return badRequest(`Invalid status value: "${statusParam}"`);
  }
  if (!["true", "false"].includes(activeParam)) {
    return badRequest(`Invalid active value: "${activeParam}"`);
  }

  const allServices = await getServices();

  // Single-service lookup
  if (slugParam) {
    const service = allServices.find((s) => s.slug === slugParam);
    if (!service) return notFound(`No service found with slug "${slugParam}"`);
    return NextResponse.json({ data: service }, { status: 200 });
  }

  // Filtered list
  const filtered = allServices.filter((s) => {
    // ServiceSummary does not include `status` — filter is advisory in Phase 1
    if (activeParam === "true"  && !s.isActive) return false;
    if (activeParam === "false" && s.isActive)  return false;
    return true;
  });

  // Respect editorial sort order
  const sorted = [...filtered].sort((a, b) => a.sortOrder - b.sortOrder);

  return ok(sorted);
}
