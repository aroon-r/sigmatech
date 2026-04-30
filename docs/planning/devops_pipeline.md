# Step 17 — DevOps & CI/CD Pipeline

**Status:** ✅ Approved  
**Platform:** GitHub Actions (CI) + Vercel (CD)  
**Region:** `lhr1` — London Heathrow (EU data residency)  
**Branch model:** `main` → Production · `develop` → Staging preview · `feature/*` → PR preview

---

## 1. Architecture Overview

```
Developer workstation
    │
    │  git push / PR opened
    ▼
GitHub Repository
    │
    ├──── CI Workflow (ci.yml) ────────────────────────────────────────────┐
    │       │                                                              │
    │       ├─ Job 1: Lint & Type Check  ─┐                               │
    │       ├─ Job 2: Unit Tests         ─┼─ parallel ─► Job 4: Build     │
    │       └─ Job 3: Content Integrity  ─┘                               │
    │                                                                      │
    └──── Deploy Workflow (deploy.yml) ────────────────────────────────────┘
            │
            ├─ PR / develop push ──► Vercel Preview URL ──► PR comment
            │
            └─ main push ──► Content integrity gate ──► Vercel Production
                              ──► curl smoke test (HTTP 200 check)
```

**Design principle:** The build never runs unless linting, types, and tests all pass. Production never deploys unless the build passes and content integrity is clean.

---

## 2. Branch Strategy

| Branch | Purpose | Deployment |
|--------|---------|-----------|
| `main` | Production-ready code | `https://sigmatech.co.uk` |
| `develop` | Integration branch for next release | Vercel preview URL |
| `feature/*` | Individual feature work | Vercel preview URL per PR |
| `fix/*` | Bug fixes | Vercel preview URL per PR |
| `content/*` | Copy and data updates | Vercel preview URL per PR |

**Merge rules:**
- `feature/*` → `develop`: Requires 1 approving review + CI green
- `develop` → `main`: Requires 1 approving review + CI green + manual approval in GitHub Environments

No direct pushes to `main` or `develop` — enforced via branch protection rules.

---

## 3. CI Pipeline (`ci.yml`)

**File:** [.github/workflows/ci.yml](../../.github/workflows/ci.yml)

### Job execution order

```
Push / PR
    │
    ├──[parallel]──────────────────────────────────────────────────────┐
    │  Job 1: quality          Job 2: test-unit     Job 3: test-integrity
    │  ─ next lint             ─ vitest --coverage  ─ vitest content/
    │  ─ tsc --noEmit          ─ upload coverage
    └──[waits for all 3]───────────────────────────────────────────────┘
            │
            ▼
    Job 4: build
    ─ npm run build (with CI placeholder env vars)
    ─ prints BUILD_ID + static page list
```

### Job specifications

**Job 1 — `quality` (Lint & Type Check)**

| Step | Command | Fails on |
|------|---------|---------|
| ESLint | `npm run lint` | Any lint error (config: `eslint-config-next`) |
| TypeScript | `npm run type-check` → `tsc --noEmit` | Any type error in strict mode |

**Job 2 — `test-unit` (Unit & Integration)**

| Step | Command | Fails on |
|------|---------|---------|
| Vitest with coverage | `npm run test:coverage` | Any failing test OR coverage below threshold (80% lines/functions, 75% branches) |
| Upload coverage | artifact upload | Never blocks CI — always runs |

**Job 3 — `test-integrity` (Content Integrity)**

| Step | Command | Fails on |
|------|---------|---------|
| Content tests | `npm run test:integrity` | Any broken cross-reference, missing required field, SEO length violation, or schema rule violation in `src/data/content/` |

**Job 4 — `build` (Smoke Test)**

| Step | Command | Fails on |
|------|---------|---------|
| Next.js build | `npm run build` | TypeScript errors, import errors, missing env vars, or any compile-time failure |
| Bundle report | `cat .next/BUILD_ID` | Never fails — informational only |

### Concurrency behaviour

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

If a developer pushes two commits quickly, the first CI run is cancelled when the second starts. Saves ~3 runner minutes per redundant run.

### Environment variables in CI

The build job uses placeholder values (not real secrets) for `NEXT_PUBLIC_*` and `RESEND_*` variables. This is intentional: a build that requires a live secret to compile is a design flaw. Server-side secrets are only accessed at runtime, not at build time.

---

## 4. CD Pipeline (`deploy.yml`)

**File:** [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)

### Preview deployments

Triggered on: every PR and every push to `develop`.

```
PR opened or updated
    │
    ▼
vercel pull --environment=preview   ← downloads preview env vars from Vercel
vercel build                        ← builds locally in CI
vercel deploy --prebuilt            ← uploads prebuilt output
    │
    ▼
Preview URL (e.g. https://sigmatech-abc123.vercel.app)
    │
    ▼
GitHub PR comment (updated, not spammed — bot checks for existing comment)
```

Every PR gets a unique, persistent preview URL. Reviewers can test the actual build, not just read a diff.

### Production deployments

Triggered on: push to `main` only.

```
PR merged to main
    │
    ▼
Content integrity gate (vitest run src/__tests__/content)
    ← Re-validates data files even if CI passed — belt-and-suspenders
    │
    ▼
vercel pull --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
    │
    ▼
curl smoke test: GET https://sigmatech.co.uk → assert HTTP 200
    ← Fails the workflow (and triggers GitHub notification) if the homepage is down
```

### GitHub Environments

The `deploy-production` job uses `environment: production`, which enables:
- **Required reviewers** — a human must approve before the job runs
- **Deployment history** — every production deploy is logged with who triggered it
- **Environment-scoped secrets** — `VERCEL_TOKEN` is only available to the production environment, not to PRs from forks

---

## 5. Environment Variables

### Strategy: three tiers, one source of truth

| Tier | Where set | Who can see it |
|------|-----------|---------------|
| **Local** | `.env.local` (gitignored) | Developer only |
| **Preview** | Vercel Dashboard → Project → Settings → Environment Variables → Preview | Vercel build runners |
| **Production** | Vercel Dashboard → Project → Settings → Environment Variables → Production | Vercel build runners + GitHub Environment secret |

### Variable catalogue

| Variable | Local | Preview | Production | Notes |
|----------|-------|---------|-----------|-------|
| `RESEND_API_KEY` | Real key | Test key | Live key | Never `NEXT_PUBLIC_` — server-only |
| `RESEND_FROM_EMAIL` | Same all tiers | `no-reply@sigmatech.co.uk` | Same | |
| `RESEND_NOTIFY_EMAIL` | Your personal email | Your personal email | `hello@sigmatech.co.uk` | Preview sends to dev, not team inbox |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Preview URL | `https://sigmatech.co.uk` | Used in canonical URLs and sitemap |
| `NEXT_PUBLIC_POSTHOG_KEY` | Real or omit | Real | Real | PostHog is client-side — OK to expose |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://eu.i.posthog.com` | Same | Same | EU data residency |
| `CONTACT_RATE_LIMIT_MAX` | `10` (relaxed for dev) | `3` | `3` | |

### Secrets required in GitHub

Navigate to **Settings → Secrets and variables → Actions** and add:

| Secret name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Vercel API token (User Settings → Tokens) |
| `VERCEL_ORG_ID` | Found in `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | Found in `.vercel/project.json` after `vercel link` |

### Linking the project to Vercel (one-time setup)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link this repo to a Vercel project
# Creates .vercel/project.json with ORG_ID and PROJECT_ID
vercel link

# Copy the IDs into GitHub secrets:
cat .vercel/project.json
```

> `.vercel/project.json` is gitignored — it contains project identifiers but no secrets.

### Local development setup

```bash
# Copy the example file
cp .env.example .env.local

# Fill in real values for:
# RESEND_API_KEY — get from resend.com/api-keys
# NEXT_PUBLIC_POSTHOG_KEY — get from eu.posthog.com
# Everything else has safe defaults in .env.example
```

---

## 6. Vercel Configuration (`vercel.json`)

**File:** [vercel.json](../../vercel.json)

### Why `vercel.json` alongside `middleware.ts`?

`src/middleware.ts` applies security headers to all **dynamic** Next.js routes. It intentionally excludes static files via the matcher pattern:

```ts
matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|images/|og/).*)" ]
```

`vercel.json` fills the gap — it applies `Cache-Control` and `X-Content-Type-Options` headers to those **static paths** that the middleware never sees.

### Header strategy

| Path | Cache-Control | Purpose |
|------|--------------|---------|
| `/_next/static/**` | `max-age=31536000, immutable` | Content-hashed filenames — safe to cache forever |
| `/_next/image/**` | `max-age=86400, swr=604800` | Next.js Image Optimisation output |
| `/(icons\|images\|og)/**` | `max-age=86400, swr=604800` | Public assets — refreshed daily |
| `/favicon.ico` | `max-age=86400` | Browser tab icon |
| `/api/**` | `no-store` | Never cache API responses |
| `/sitemap.xml` | `max-age=3600, swr=86400` | Search engines re-fetch hourly at most |

### Function configuration

| Route | maxDuration | memory | Reason |
|-------|-------------|--------|--------|
| `/api/contact` | 15s | 256 MB | Resend API call can take 3–5s; 15s gives margin |
| `/api/services` | 5s | — | Static data — should resolve in < 100ms |
| `/api/work` | 5s | — | Static data |
| `/api/blog` | 5s | — | Static data |

### Region

```json
"regions": ["lhr1"]
```

`lhr1` = London Heathrow. Closest Vercel edge region to the UK/EU market. Server-side rendering and serverless functions execute here by default.

---

## 7. Rollback Strategy

### Instant rollback via Vercel

Vercel retains all production deployment artifacts. If a bad deploy reaches production:

1. Go to **Vercel Dashboard → Deployments**
2. Find the last known-good deployment
3. Click **Promote to Production**

This is a DNS-level switch — takes effect in < 30 seconds, zero rebuild required.

### Git-level rollback

For a bad merge that needs to be reverted at the source:

```bash
# Revert the merge commit on main
git revert -m 1 <merge-commit-sha>
git push origin main
# → Triggers a new CI run → new production deploy with the revert applied
```

Never use `git reset --hard` on `main` — it rewrites history and breaks other developers' clones.

---

## 8. Build Performance Targets

| Metric | Target | Measured at |
|--------|--------|-------------|
| CI total duration (green) | < 4 minutes | GitHub Actions job summary |
| `next build` cold start | < 90 seconds | Job 4 step duration |
| Vercel preview deploy | < 3 minutes | Deploy workflow step |
| Vercel production deploy | < 4 minutes | Deploy workflow step |

The three parallel CI jobs (lint, tests, integrity) typically finish in 60–90 seconds combined. The build job adds 60–90 seconds. Total target: **under 4 minutes** from push to green.

---

## 9. Recommended Branch Protection Rules

Apply in **GitHub → Settings → Branches → Add rule** for both `main` and `develop`:

```
✅ Require a pull request before merging
✅ Require approvals: 1
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require status checks to pass before merging
   Required checks:
     - Lint & Type Check
     - Unit & Integration Tests
     - Content Integrity
     - Build Smoke Test
✅ Require branches to be up to date before merging
✅ Do not allow bypassing the above settings
```

---

## 10. Quick Reference

```bash
# Run full CI suite locally before pushing
npm run lint && npm run type-check && npm run test:coverage && npm run test:integrity

# Preview what next build would do (runs prebuild + build)
npm run build

# Link project to Vercel (one-time)
vercel link

# Deploy a manual preview from local
vercel

# Deploy to production manually (emergency only — prefer the CD pipeline)
vercel --prod
```
