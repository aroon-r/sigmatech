// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";

// Mock node:fs so tests don't write to disk
vi.mock("node:fs", () => ({
  appendFileSync: vi.fn(),
  mkdirSync:      vi.fn(),
  readFileSync:   vi.fn().mockReturnValue("{}"),
  writeFileSync:  vi.fn(),
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
    // Build a rate-limit store pre-filled to the limit (count === RATE_LIMIT_MAX=3)
    // for the exact email hash the route will compute.
    const { createHash } = await import("node:crypto");
    const emailHash = createHash("sha256").update(VALID_PAYLOAD.email).digest("hex");
    const store = { [emailHash]: { count: 3, resetAt: Date.now() + 10 * 60 * 1000 } };

    // Override readFileSync for this one call so isRateLimited sees a full store.
    vi.mocked(readFileSync).mockReturnValueOnce(JSON.stringify(store));

    const res  = await POST(makeRequest(VALID_PAYLOAD));
    const data = await res.json();

    expect(res.status).toBe(429);
    expect(data.success).toBe(false);
    expect(data.error).toMatch(/too many submissions/i);
    // Retry-After header must be present and be a positive integer (seconds)
    const retryAfter = Number(res.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
  });

});
