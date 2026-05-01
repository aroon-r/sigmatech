# Contact System — Architecture

> Audience: engineers onboarding to the codebase, or reviewers evaluating system design decisions.
> Reading time: ~3 minutes.

---

## System Overview

A single POST endpoint handles all contact form submissions end-to-end.

```
Client
  │
  ▼
POST /api/contact
  │
  ├─ 1. Parse JSON body                 → 400 if malformed
  ├─ 2. Honeypot check                  → 200 noop if bot detected
  ├─ 3. Zod schema validation           → 400 + fieldErrors if invalid
  ├─ 4. Rate limit (Upstash Redis)      → 429 + Retry-After if exceeded
  ├─ 5. Persist (Supabase Postgres)     → logs error, continues on failure
  ├─ 6. Send emails (Resend)            → logs partial failure, continues
  └─ 7. Return 200 + submissionId
```

**Entry point:** [`src/app/api/contact/route.ts`](../../src/app/api/contact/route.ts)
**Schema / validation:** [`src/lib/validations.ts`](../../src/lib/validations.ts)
**DB migration:** [`supabase/migrations/0001_create_submissions.sql`](../../supabase/migrations/0001_create_submissions.sql)

---

## Why File-Based Initially (v1)

The first implementation used `appendFileSync` (NDJSON log) for persistence and
a `readFileSync`/`writeFileSync` JSON file for rate limiting.

**Rationale:**
- Zero infrastructure: works with `git clone` and no credentials.
- Locally readable with `cat data/submissions.ndjson`.
- Appropriate for a demo/portfolio at zero-traffic scale.

**Why it couldn't stay:**
- Vercel Serverless writes to `/tmp` — wiped on cold start. Records are lost.
- Rate limit counters are per-instance. With N warm instances a user can submit
  `3 × N` times before any one instance blocks them.
- Concurrent writes to the same file race without a lock.

---

## Why Supabase + Upstash Redis (v2)

### Supabase (persistence)

| Concern | Decision |
|---|---|
| Cross-instance durability | Single Postgres instance, all serverless functions write to the same DB |
| Auth bypass for inserts | Service-role key — bypasses RLS, insert always lands regardless of policy changes |
| No ORM | A single `.from("submissions").insert({...})` is all the abstraction needed |
| Schema | `text[]` for services, `timestamptz` for created_at, RLS enabled with no read policy |

### Upstash Redis (rate limiting)

| Concern | Decision |
|---|---|
| Cross-instance counter | Single global Redis; all instances share one atomic counter per email hash |
| Serverless-native | HTTP-based SDK, no persistent TCP connection, no cold-start penalty |
| Algorithm | `fixedWindow(3, "10 m")` — at most 3 submissions per email per 10-minute window |
| Key privacy | Counter keyed on `sha256(email)`, not the raw address |

---

## Failure Modes

### Supabase insert fails

**Example causes:** network timeout, Supabase outage, unique constraint violation.

**Behaviour:** `persistSubmission()` catches the error, logs `persist.failed` with the
Postgres error code, and returns. The route continues to send emails and returns 200.

**Rationale:** The submission is recoverable from the confirmation email in the
inbox. Blocking the user because a database write failed is a worse outcome.

**Operator signal:** `level: "error"` log line with `event: "persist.failed"` and
`data.code` set to the Postgres error code. This is the signal to investigate.

---

### Redis unavailable (rate limit skipped)

**Example causes:** missing env vars (local dev, CI), Upstash outage.

**Behaviour:** `checkRateLimit()` returns `{ limited: false }` and logs
`rate_limit.skipped` with `reason: "redis_not_configured"`.

**Rationale:** Blocking all legitimate traffic because rate limit infrastructure is
unavailable is a worse failure than letting some excess traffic through temporarily.
The degraded state is visible in logs and does not silently affect users.

---

### Network latency (Supabase or Redis slow)

Both calls are awaited sequentially with no timeout configured at the application
layer. On Vercel, the function timeout (default 10 s) acts as the outer bound.

**Implication:** a slow Supabase insert delays the response but does not affect
correctness. If this becomes a problem, move the insert to a background job (see
[Future Improvements](#future-improvements)).

---

## Behaviour Decisions

### Why return 200 even if persistence fails?

Two invariants are ordered by importance:

1. **Email is sent.** The team receives the enquiry and can respond. The user gets
   a confirmation. This is the primary function of the form.
2. **Record is stored.** Useful for reporting and deduplication, but recoverable
   from email if lost.

If the database write fails, invariant 1 is still satisfied. Returning 500 would
leave the user thinking their submission failed and prompt a re-submission, which
creates duplicate emails and a worse user experience. The failure is surfaced via
structured error logs, not via the HTTP response.

---

### Why 429 includes `Retry-After`?

RFC 7231 / RFC 6585 defines `Retry-After` as the standard signal for rate-limited
responses. Including it:

- Lets well-behaved clients (and monitoring systems) back off precisely rather than
  guessing a cooldown period.
- The value is derived from the Redis `reset` timestamp (actual window expiry), not
  a hard-coded constant, so it's accurate even if a request arrives mid-window.

---

## Tradeoffs

### Simplicity vs. durability

| | File-based (v1) | Supabase + Redis (v2) |
|---|---|---|
| Setup | `git clone` | 2 managed services, 4 env vars |
| Durability | Ephemeral on Vercel | Persistent across cold starts and instances |
| Rate limit accuracy | Per-instance (leaky) | Global (atomic) |
| Cost | Free | Free tier on both (generous) |

The v2 setup is appropriate for any production deployment. The free tiers of
Supabase and Upstash cover well above the traffic a portfolio site generates.

### Cost vs. reliability

Both Supabase and Upstash are on free/hobby tiers. At this traffic level the
tradeoff doesn't arise. If traffic scaled significantly:

- Supabase Pro ($25/mo) adds PITR and higher connection limits.
- Upstash Pay-as-you-go removes the daily command cap.

Neither is needed until the form is processing hundreds of submissions per day.

---

## Future Improvements

### Background job / queue

Currently, persistence and email sending happen synchronously in the request path.
A slow Supabase insert or Resend call adds latency to the user-facing response.

**Fix:** enqueue the submission record and process it via a background worker
(Inngest, Trigger.dev, or a Vercel Queue). The route would return 200 immediately
after validation and rate limiting.

**Why not now:** adds infrastructure complexity and an extra failure domain for a
form that handles O(10) submissions/month.

### Idempotency keys

The `submissionId` is `sha256(email + timestamp).slice(0, 12)` — effectively
random at millisecond resolution. It is not idempotent: two rapid retries from
the same user produce two different IDs and two DB rows.

**Fix:** derive the key from a client-supplied nonce (or a hash of the form
payload) and use `INSERT ... ON CONFLICT DO NOTHING` in Postgres. This ensures
exactly-once semantics even under retry.

**Why not now:** the rate limiter (3/10 min) makes duplicate submissions rare.
The cost of adding idempotency is higher than the cost of the occasional duplicate
at this scale.

### Analytics and monitoring

Current observability is structured JSON logs emitted to stdout/stderr. This is
sufficient for Vercel's log drain, but provides no dashboards or alerts.

**Improvements:**
- Connect Vercel log drain to Datadog or Logtail for retention and alerting.
- Add a PostHog event on `submission.ok` to track conversion in the existing
  analytics pipeline (PostHog is already installed in the project).
- Alert on `persist.failed` or `email.partial_failure` events exceeding a
  threshold.
