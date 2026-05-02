# Step 14 — API Specification

**Status:** ✅ Approved  
**Next.js version:** 14 (App Router)  
**Primary pattern:** Server Components read data directly · Server Actions handle mutations · Route Handlers serve external consumers

---

## 1. Architecture Decision: When to Use What

```
┌─────────────────────────────────────────────────────────────────┐
│                       Request origin                            │
│                                                                 │
│  React Server     React Client      External          Webhook   │
│  Component        Component         API consumer      (Resend,  │
│  (SSG/SSR)        (form submit)     (mobile app, etc) PostHog)  │
│       │                │                 │                │     │
│       ▼                ▼                 ▼                ▼     │
│  Direct import    Server Action     Route Handler   Route Handler│
│  (no HTTP)        POST /api/        GET /api/       POST /api/  │
│                   (or Route Handler) ...             webhooks/  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1 Server Components — Direct Data Import (Phase 1)

In Phase 1, data is static TypeScript constants. **Server Components import directly** — no HTTP round-trip, no latency, no bundle cost.

```ts
// src/app/services/page.tsx  — Server Component
import { SERVICES } from "@/data/services";
// ↑ Resolved at build time. Zero runtime cost.
```

This is the **default pattern for all page data**. Route Handlers for `GET /api/*` are secondary — they exist for external consumers and Phase 2 compatibility, not for the Next.js page tree itself.

### 1.2 Server Actions — Mutations from Client Components

Server Actions run **on the server**, invoked directly from Client Components without an intermediate API route. They are the correct mechanism for the contact form in Next.js 14.

**Why Server Actions over Route Handlers for forms:**
- Zero API surface to secure (no URL to hit externally)
- Progressive enhancement: works without JavaScript (native `<form action>`)
- First-class `useFormState` / `useFormStatus` integration
- Request body parsing is automatic — no `request.json()` boilerplate
- CSRF protection is built-in (same-origin cookie-based tokens)

### 1.3 Route Handlers — External API surface

Route Handlers (`src/app/api/*/route.ts`) are used when:
- An external consumer needs to `GET` structured data (e.g. a future mobile app)
- An external service needs to `POST` to a webhook URL (Resend delivery events, PostHog)
- A progressive-enhancement fallback is needed for the contact form in no-JS environments

---

## 2. File Structure

```
src/
├── app/
│   ├── actions/
│   │   └── contact.ts          ← Server Action (primary form handler)
│   └── api/
│       ├── services/
│       │   └── route.ts        ← GET /api/services
│       ├── work/
│       │   └── route.ts        ← GET /api/work
│       ├── blog/
│       │   └── route.ts        ← GET /api/blog
│       └── contact/
│           └── route.ts        ← POST /api/contact (Route Handler fallback)
└── lib/
    └── validations.ts          ← Zod schemas — shared by Action + Route Handler
```

---

## 3. GET Endpoints

All GET endpoints follow the same contract:
- `force-static` export in Phase 1 (baked at build time)
- JSON response with `{ data, meta }` envelope
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` in Phase 2
- Consistent error shape: `{ error: string, code: string }`

### 3.1 `GET /api/services`

Returns an array of `ServiceSummary` objects (lightweight projection — no long copy, no FAQs).

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | `"published" \| "draft"` | Filter by publish status. Defaults to `"published"`. |
| `active` | `"true" \| "false"` | Filter by `isActive`. Defaults to `"true"`. |
| `slug` | `string` | Return a single service by slug. Returns `{ data: ServiceSummary }`. |

**Response shape:**
```json
{
  "data": [
    {
      "id": "...",
      "slug": "web-development",
      "name": "Web & App Development",
      "tagline": "Full-stack products, zero compromise",
      "icon": "Code2",
      "description": "...",
      "deliverables": [...],
      "sortOrder": 1,
      "isActive": true
    }
  ],
  "meta": { "total": 6 }
}
```

**HTTP status codes:**

| Code | Scenario |
|------|----------|
| `200` | Success |
| `404` | `?slug=` provided but no match found |
| `400` | Invalid query parameter value |
| `500` | Unexpected server error |

---

### 3.2 `GET /api/work`

Returns an array of `CaseStudySummary` objects.

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | `"published" \| "draft"` | Defaults to `"published"`. |
| `featured` | `"true"` | Return only `isFeatured: true` entries. |
| `service` | `ServiceSlug` | Filter by a service slug (entries where `servicesSlugs` includes the value). |
| `industry` | `CaseStudyIndustry` | Filter by industry. |
| `tag` | `string` | Filter by tag (case-insensitive match). |
| `slug` | `string` | Return a single case study by slug. |

**Response shape:**
```json
{
  "data": [
    {
      "id": "...",
      "slug": "fintech-dashboard-rebuild",
      "title": "Fintech Dashboard Rebuild",
      "tagline": "...",
      "excerpt": "...",
      "client": { "name": "Acme Financial", "description": "..." },
      "servicesSlugs": ["web-development", "ui-ux-design"],
      "industry": "fintech",
      "tags": ["react", "fintech", "dashboard"],
      "coverImageUrl": "/images/work/acme-cover.jpg",
      "coverImageAlt": "...",
      "isFeatured": true,
      "sortOrder": 1
    }
  ],
  "meta": { "total": 5 }
}
```

---

### 3.3 `GET /api/blog`

Returns an array of `BlogPostSummary` objects with pagination.

**Query parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | `"published" \| "draft"` | `"published"` | Filter by status. |
| `category` | `BlogCategorySlug` | — | Filter by category. |
| `tag` | `string` | — | Filter by tag. |
| `featured` | `"true"` | — | Return only featured posts. |
| `page` | `number` | `1` | Pagination: page number (1-indexed). |
| `pageSize` | `number` | `10` | Pagination: results per page (max 50). |
| `slug` | `string` | — | Return single post by slug (returns full `BlogPost`, not summary). |

**Response shape:**
```json
{
  "data": [...],
  "meta": {
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "totalPages": 2
  }
}
```

---

## 4. POST Endpoint — Contact Form

Two parallel mechanisms handle form submission. Both use the same Zod schema from `src/lib/validations.ts`.

### 4.1 Server Action (primary — from Client Component)

```
ContactForm (Client Component)
  │ calls submitContactForm(prevState, formData)
  ▼
src/app/actions/contact.ts
  │ 1. Parse FormData → plain object
  │ 2. Check honeypot field
  │ 3. Zod validate
  │ 4. Rate limit guard (IP-based, sliding window)
  │ 5. POST to Resend → send notification email to team
  │ 6. POST to Resend → send confirmation email to submitter
  │ 7. Store submission (Phase 1: log to stdout; Phase 2: write to Sanity / DB)
  │ 8. Return ContactApiResponse
  ▼
ContactForm — renders success state or field errors
```

### 4.2 `POST /api/contact` (Route Handler fallback)

Used when:
- JavaScript is disabled (form `action` attribute points here)
- External service POSTs a pre-filled enquiry (partner integration)
- E2E tests need a stable HTTP endpoint

Delegates validation and email sending to the same shared `processContactSubmission()` utility function as the Server Action — **no duplicated logic**.

**Request body:** JSON matching `ContactFormInput`.  
**Response:** `ContactApiResponse` (see `src/lib/validations.ts`).

---

## 5. Validation & Security

### 5.1 Zod validation flow

```
Raw input (FormData or JSON)
    │
    ▼
contactFormSchema.safeParse(input)
    │
    ├── success: false → return { success: false, fieldErrors: error.flatten().fieldErrors }
    └── success: true  → continue to processing
```

Both the Server Action and the Route Handler call `.safeParse()` — never `.parse()` — so validation errors are handled gracefully, never thrown.

### 5.2 Honeypot anti-spam

The contact form includes a hidden `<input name="website" tabIndex={-1} aria-hidden="true" />` field. If the value is non-empty, the submission is marked `isSpam: true` and short-circuits before hitting Resend.

```ts
if (raw.website) {
  return { success: false, error: "Invalid submission" }; // Lie to the bot
}
```

### 5.3 Rate limiting

**Phase 1:** Simple in-memory counter keyed on hashed IP (not persisted across serverless invocations — good enough for low traffic MVP).

**Phase 2:** Upstash Redis sliding-window rate limiter via `@upstash/ratelimit`:
- Limit: 3 submissions per IP per 10 minutes
- Exceed: HTTP 429 with `Retry-After` header

### 5.4 Security headers

All API routes inherit the CSP and security headers applied by `src/middleware.ts`. No additional header setup needed inside route handlers.

### 5.5 Input sanitisation

All string fields are `.trim()`-ed by the Zod schema before processing. The `message` field is stored as plain text — never rendered as HTML without sanitisation. In Phase 2, `DOMPurify` (server-side via `isomorphic-dompurify`) is added if Markdown rendering is introduced for message content.

### 5.6 Environment variables required

| Variable | Used in | Required in |
|----------|---------|-------------|
| `RESEND_API_KEY` | `src/app/actions/contact.ts` | Production + staging |
| `RESEND_FROM_EMAIL` | Actions, Route Handler | Production + staging |
| `RESEND_NOTIFY_EMAIL` | Actions (team notification) | Production + staging |
| `CONTACT_RATE_LIMIT_MAX` | Rate limit guard | Optional (default: 3) |
| `POSTHOG_API_KEY` | Analytics | Optional |

All must be set in `.env.local` for development and in Vercel project settings for production. **Never committed to git.** A `.env.example` with placeholder values documents all required keys.

---

## 6. Third-party Integration Flows

### 6.1 Resend (Transactional Email)

```
Server Action / Route Handler
    │
    ├── POST https://api.resend.com/emails  ← Team notification
    │     From:    no-reply@nexora.dev
    │     To:      hello@nexora.dev
    │     Subject: New enquiry from {fullName} — {services.join(", ")}
    │     Body:    React Email template (src/emails/TeamNotification.tsx)
    │
    └── POST https://api.resend.com/emails  ← Submitter confirmation
          From:    hello@nexora.dev
          To:      {submitter email}
          Subject: We've received your enquiry, {firstName}
          Body:    React Email template (src/emails/ContactConfirmation.tsx)
```

**Error handling:** If Resend returns a non-2xx response, the Server Action logs the error and returns success to the user anyway — the submission is still stored. A failed email send must never surface as a user-facing error. An internal alert (Phase 2: Slack webhook) notifies the team.

**Resend SDK:**
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from, to, subject, react: <Template /> });
```

### 6.2 PostHog (Product Analytics)

PostHog is initialised **client-side only** via a `<PostHogProvider>` wrapper in the root layout. No server-side integration is needed in Phase 1.

**Events captured:**
| Event | Trigger | Properties |
|-------|---------|------------|
| `contact_form_submitted` | On Server Action success | `services[]`, `budget_range`, `referral_source` |
| `contact_form_error` | On validation failure | `field_errors: string[]` |
| `service_page_viewed` | On `/services/[slug]` page load | `service_slug` |
| `case_study_viewed` | On `/work/[slug]` page load | `case_study_slug`, `industry` |

PostHog ingestion endpoint (`https://eu.i.posthog.com`) is already allowlisted in the CSP `connect-src` directive in `src/middleware.ts`.

### 6.3 Webhook — Resend Delivery Events (Phase 2)

When email delivery fails, Resend can POST a webhook to notify us. The handler will:
1. Verify the `svix-signature` header against `RESEND_WEBHOOK_SECRET`
2. Parse the event type (`email.bounced`, `email.complained`)
3. Mark the submission's `internalNotes` with the bounce reason

**Endpoint:** `POST /api/webhooks/resend/route.ts`  
**Auth:** HMAC-SHA256 signature verification (Resend uses Svix)

---

## 7. Caching Strategy per Endpoint

| Endpoint | Phase 1 | Phase 2 |
|----------|---------|---------|
| `GET /api/services` | `force-static` (baked at build) | `revalidate = 3600` (ISR) |
| `GET /api/work` | `force-static` | `revalidate = 3600` |
| `GET /api/blog` | `force-static` | `revalidate = 1800` (30 min) |
| `POST /api/contact` | `force-dynamic` (always) | `force-dynamic` |
| Server Action | N/A (not cached) | N/A |

`force-static` GET endpoints can be additionally cached at the CDN layer (Vercel Edge Network) with `Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800`.

---

## 8. Error Response Contract

All Route Handlers return a consistent error envelope:

```ts
// Validation error (400)
{ "error": "Validation failed", "code": "VALIDATION_ERROR", "fieldErrors": { "email": ["Invalid email"] } }

// Not found (404)
{ "error": "Service not found", "code": "NOT_FOUND" }

// Rate limited (429)
{ "error": "Too many requests", "code": "RATE_LIMITED", "retryAfter": 600 }

// Server error (500)
{ "error": "Internal server error", "code": "INTERNAL_ERROR" }
```

Server Actions return `ContactApiResponse` from `src/lib/validations.ts` — same discriminated union pattern.

---

## 9. Environment Setup Checklist

```bash
# .env.local (never committed)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=no-reply@nexora.dev
RESEND_NOTIFY_EMAIL=hello@nexora.dev
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
# .env.example (committed — documents required keys, no real values)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_NOTIFY_EMAIL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
NEXT_PUBLIC_SITE_URL=https://nexora.dev
```
