# Nexora

Agency portfolio site built with Next.js 14 App Router. Demonstrates production-grade
patterns for form handling, validation, rate limiting, and graceful failure handling
in a serverless environment.

---

## What this project demonstrates

### Validation — end-to-end, single schema

[`src/lib/validations.ts`](src/lib/validations.ts) defines a single Zod schema used
in three places without divergence: the React form (client-side blur validation),
the API route (server-side enforcement), and the test suite. No duplicated rules,
no silent mismatches between client and server.

### Rate limiting — global, atomic, serverless-native

[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) uses Upstash Redis
(`fixedWindow(3, "10 m")`) keyed on a SHA-256 hash of the submitter's email. The
counter is shared across all serverless instances — unlike a file-based or in-memory
counter, a user cannot bypass the limit by hitting different warm functions. Exceeded
limits return `429` with a `Retry-After` header derived from the actual Redis window
reset time.

### Persistence — durable across cold starts

Submissions are written to Supabase Postgres before emails are sent. The service-role
key bypasses Row Level Security so inserts always land regardless of policy changes.
No ORM — a single `.from("submissions").insert({...})` call is all the abstraction
the scale requires.

### Graceful failure handling — operators informed, users unblocked

If Supabase is unavailable, the route logs a structured error and continues. The team
still receives the enquiry email; the record can be replayed. Returning `500` because
a secondary store failed would mislead the user into re-submitting.

If Redis is unavailable (missing env vars, outage), rate limiting is skipped and a
`warn` log is emitted. Blocking all legitimate traffic because rate limit infrastructure
is down is a worse failure than briefly allowing excess.

Both infrastructure clients are null-guarded at module level: no credentials → `null` →
graceful skip. The route works in local dev and CI without any external services configured.

### Testing — mocked infrastructure, real logic

[`src/__tests__/api/contact.test.ts`](src/__tests__/api/contact.test.ts) uses
`vi.hoisted` to set environment variables before module evaluation, so Supabase and
Redis singletons initialise as non-null in tests — the same code path as production.
The persistence failure test asserts a `200` response when Supabase returns an error,
verifying the graceful degradation path directly.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod v4 |
| Email | Resend |
| Persistence | Supabase (Postgres) |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) |
| Analytics | PostHog, Vercel Analytics |
| Testing | Vitest (unit + integration), Playwright (e2e) |
| Deployment | Vercel |

---

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in values — see "Environment variables" below

# 3. Start the dev server
npm run dev
```

The contact form works without Supabase or Upstash configured. Persistence and rate
limiting degrade gracefully (skip + warn log). Only `RESEND_API_KEY` is needed for
emails to actually send.

---

## Environment variables

```bash
# ── Required: Email ────────────────────────────────────────────────────────────
RESEND_API_KEY=             # Resend API key — emails won't send without this
RESEND_FROM_EMAIL=          # Sending address (must be verified in Resend)
RESEND_NOTIFY_EMAIL=        # Internal notification recipient

# ── Required: Supabase ────────────────────────────────────────────────────────
SUPABASE_URL=               # Project URL from Supabase dashboard → Settings → API
SUPABASE_SERVICE_KEY=       # Service-role secret key — server-side only, never expose

# ── Required: Upstash Redis ───────────────────────────────────────────────────
UPSTASH_REDIS_REST_URL=     # From console.upstash.com → your database → REST API
UPSTASH_REDIS_REST_TOKEN=   # REST token for the database above

# ── Optional ──────────────────────────────────────────────────────────────────
CONTACT_RATE_LIMIT_MAX=3    # Max submissions per email per 10-minute window (default 3)
NEXT_PUBLIC_POSTHOG_KEY=    # PostHog project API key
NEXT_PUBLIC_SITE_URL=       # Canonical site URL (used in sitemap + email copy)
```

---

## Running tests

```bash
npm test                    # Run all tests once
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report (threshold: 80% lines/functions)
npm run test:integrity      # Content integrity checks only (fast)
```

---

## Architecture

See [docs/architecture/contact-system.md](docs/architecture/contact-system.md) for a
full walkthrough of the contact system: request flow, infrastructure decisions,
failure modes, and future improvements.

---

## Production Readiness

The contact system is built on real production services, not simulated infrastructure:

| Concern | Implementation |
|---|---|
| Persistence | Supabase Postgres — durable across cold starts and serverless instances |
| Rate limiting | Upstash Redis `fixedWindow(3, "10 m")` — single global counter, atomic across all instances |
| Logging | Structured JSON (NDJSON) — `requestId`, `timestamp`, `event`, no PII in any log field |
| Abuse filtering | Disposable email domain blocklist applied at the validation layer |
| Persistence failure | Returns `200` and continues — email still sends, operator alerted via error log |
| Rate limit response | `429` with `Retry-After` header derived from the actual Redis window reset time |
| Missing credentials | Both clients null-guard at module level — route degrades gracefully without env vars |

This is a portfolio project, not a live production system handling real traffic. The
infrastructure choices, failure handling, and observability patterns are intentionally
the same as you would apply to a real-world deployment at this scale.

### Example failure scenarios

**Rate limit store unavailable:**
- All requests continue to be accepted
- `rate_limit.skipped` logged at `warn` with `reason: "redis_not_configured"`
- No user-visible error; system self-recovers when Redis is restored

**Supabase insert fails:**
- Request continues — confirmation email still sends
- `persist.failed` logged at `error` with the Postgres error code
- User receives `200`; operator is alerted via the error-level log

---

## Production Tradeoffs & What I'd Do Next

Each simplification below was chosen because the complexity it avoids outweighs the
risk it introduces at this scale. The upgrade paths are known and documented — they
weren't skipped, they were deferred.

### What's intentionally simplified

**Synchronous request path.** Persistence and email delivery happen inside the same
HTTP request. This is fine at low volume — the user waits an extra ~200 ms and the
code is simple to reason about. The tradeoff is acceptable here because the form
handles O(10) submissions per month, not O(10k).

**Email-only rate limiting.** The Redis counter is keyed on `sha256(email)`. A
determined sender using different email addresses isn't blocked. At this traffic
level, the honeypot + disposable domain blocklist handle the realistic abuse
surface. Per-IP limiting would require inspecting `x-forwarded-for`, which is
unreliable behind proxies without additional configuration.

**Static disposable domain list.** The blocklist is a hardcoded `Set` — it will
drift out of date. This is a deliberate scope call: an external API (e.g.
Kickbox, Abstract) adds a network call to the validation path and a billing
dependency. The list catches the majority of automated form spam; edge cases aren't
worth the operational complexity at this scale.

---

### Where this breaks in production

- **Concurrent submissions from the same user.** Two near-simultaneous requests
  can both pass the rate limit check before either increments the counter. Redis
  `fixedWindow` is atomic per-call but the route reads then writes in separate
  operations — not an issue at this traffic level, but a race at high concurrency.
- **Email delivery with no retry.** `Promise.allSettled` surfaces failures in logs
  but does nothing about them. A transient Resend outage drops the notification
  silently. The submission is persisted, but the team won't know about it until
  they query the database.
- **No deduplication.** `submissionId` is derived from `sha256(email + Date.now())`.
  A user who submits twice within the rate limit window produces two database rows
  and two confirmation emails. There's no idempotency check.
- **Disposable domain list is bypassable.** Any domain not in the hardcoded set
  passes. A sender using a custom domain for throwaway addresses isn't affected.

---

### What I would change at scale

| Concern | Current | At scale |
|---|---|---|
| Request path | Persist + email synchronously | Enqueue after rate limit check; return 202 immediately. Use Inngest or Trigger.dev for background processing. |
| Rate limiting | Per-email hash, fixed window | Add per-IP limiting at the edge via Vercel middleware + Upstash, before the route runs. |
| Email delivery | Fire-and-forget via Resend | Add Resend webhooks for delivery status; retry failed sends via the job queue. |
| Idempotency | None | Client-supplied nonce → `INSERT ... ON CONFLICT DO NOTHING` in Postgres. |
| Disposable domains | Static `Set` | Replace with Kickbox or Abstract API call, cached in Redis with a 24 h TTL. |
| Observability | Structured logs to stdout | Connect Vercel log drain to Datadog or Logtail; alert on `persist.failed` and `email.partial_failure`. |

---

### What I deliberately did not build

**CRM / webhook integration.** Writing to a HubSpot or Pipedrive contact on
submission is the obvious next step for a real agency. Excluded here because it
adds a third external dependency, a new failure domain, and credential surface area
— none of which demonstrate anything not already shown by the Supabase and Resend
integrations.

**Admin dashboard.** Supabase Studio already provides a read interface over the
`submissions` table. Building a custom dashboard would be scope for its own
project, not signal worth adding here.

**HTML email templates.** The confirmation and notification emails use plain text.
React Email or Resend's template system would improve legibility and branding, but
the decision surface for this project is the API layer, not email design.
