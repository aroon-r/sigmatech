// @vitest-environment node

import { describe, it, expect, vi } from "vitest";

// ─── Hoisted env + mock factories ────────────────────────────────────────────
// vi.hoisted runs before module evaluation, so the singletons in route.ts
// (supabase, redis, ratelimit) see these env vars on first import and
// initialise as non-null — matching production behaviour in tests.

const mocks = vi.hoisted(() => {
  process.env.SUPABASE_URL         = "https://test.supabase.co";
  process.env.SUPABASE_SERVICE_KEY = "test-service-key";
  process.env.UPSTASH_REDIS_REST_URL   = "https://test.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

  return {
    mockInsert: vi.fn().mockResolvedValue({ data: null, error: null }),
    mockLimit:  vi.fn().mockResolvedValue({
      success:   true,
      limit:     3,
      remaining: 2,
      reset:     0,
      pending:   Promise.resolve(),
    }),
  };
});

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({ insert: mocks.mockInsert })),
  })),
}));

vi.mock("@upstash/redis", () => ({
  Redis: vi.fn(() => ({})),
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(
    vi.fn(() => ({ limit: mocks.mockLimit })),
    { fixedWindow: vi.fn(() => ({})) },
  ),
}));

// Mock resend so tests don't attempt real email sends
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: "mock-email-id" }),
    },
  })),
}));

import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const VALID_PAYLOAD = {
  fullName:       "Jane Smith",
  email:          "jane@example.com",
  services:       ["web-development"],
  budgetRange:    "15k_to_30k",
  message:        "We need a new company website built with Next.js and TypeScript.",
  privacyConsent: true,
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("POST /api/contact", () => {

  it("returns 200 and success:true for a valid payload", async () => {
    const res  = await POST(makeRequest(VALID_PAYLOAD));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(typeof data.submissionId).toBe("string");
    expect(data.submissionId.length).toBeGreaterThan(0);
  });

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    "not-json{",
    });
    const res  = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid JSON body");
  });

  it("returns 400 with fieldErrors when validation fails", async () => {
    const res  = await POST(makeRequest({ ...VALID_PAYLOAD, email: "not-an-email", message: "short" }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Validation failed");
    expect(data.fieldErrors).toBeDefined();
    expect(data.fieldErrors.email).toBeDefined();
    expect(data.fieldErrors.message).toBeDefined();
  });

  it("returns 200 noop silently when the honeypot field is filled", async () => {
    const res  = await POST(makeRequest({ ...VALID_PAYLOAD, website: "https://spam.example.com" }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.submissionId).toBe("noop");
  });

  it("returns 429 with Retry-After when the rate limit is triggered", async () => {
    // Override the Ratelimit mock for this one call to simulate a full window.
    const futureReset = Date.now() + 10 * 60 * 1000;
    mocks.mockLimit.mockResolvedValueOnce({
      success:   false,
      limit:     3,
      remaining: 0,
      reset:     futureReset,
      pending:   Promise.resolve(),
    });

    const res  = await POST(makeRequest(VALID_PAYLOAD));
    const data = await res.json();

    expect(res.status).toBe(429);
    expect(data.success).toBe(false);
    expect(data.error).toMatch(/too many submissions/i);
    // Retry-After header must be present and be a positive integer (seconds)
    const retryAfter = Number(res.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
  });

  it("returns 200 even when Supabase persistence fails", async () => {
    // Simulate a Supabase insert error (e.g., unique constraint violation).
    // The route must NOT surface this to the user — email still sends.
    mocks.mockInsert.mockResolvedValueOnce({
      data:  null,
      error: { code: "23505", message: "duplicate key value violates unique constraint" },
    });

    const res  = await POST(makeRequest(VALID_PAYLOAD));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(typeof data.submissionId).toBe("string");
  });

});
