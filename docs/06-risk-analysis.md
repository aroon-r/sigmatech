# Step 06 — Risk Analysis
**Project:** SigmaTech Website Revamp
**Date:** 2026-04-25
**Status:** Approved — Pending Client Sign-off

---

## 1. Risk Scoring Model

Each risk is scored on two axes:

| Score | Likelihood | Impact |
|---|---|---|
| 1 | Very Unlikely | Negligible |
| 2 | Unlikely | Minor delay or rework |
| 3 | Possible | Significant delay or quality drop |
| 4 | Likely | Launch at risk |
| 5 | Near Certain | Project failure |

**Risk Priority = Likelihood × Impact**
- 1–4: Low — monitor
- 5–9: Medium — mitigate actively
- 10–16: High — immediate mitigation required
- 17–25: Critical — escalate immediately

---

## 2. Risk Register

### TECHNICAL RISKS

---

#### T1 — Performance Regression from Third-Party Scripts
**Description:** Analytics scripts, chat widgets, or embed codes added late in the project degrade Lighthouse scores below the 95 target.

| Likelihood | Impact | Priority |
|---|---|---|
| 4 | 5 | **20 — Critical** |

**Mitigation:**
- Audit every third-party script before integration
- Use `next/script` with `strategy="lazyOnload"` for all non-critical scripts
- Run Lighthouse after every new script addition
- Live chat (highest offender) is explicitly out of Phase 1 scope

**Contingency:** If a required script drops Lighthouse below 95, it is deferred to Phase 2 until a performance-safe integration method is identified.

---

#### T2 — Animation Jank on Low-End Mobile Devices
**Description:** Framer Motion animations cause frame drops or layout shift on mid/low-end Android devices, harming CLS and INP scores.

| Likelihood | Impact | Priority |
|---|---|---|
| 3 | 4 | **12 — High** |

**Mitigation:**
- Use `transform` and `opacity` only — never animate layout properties (`width`, `height`, `margin`)
- Honour `prefers-reduced-motion` — wrap all animations in a motion-safe check
- Test on real low-end devices or Chrome DevTools CPU throttling (4x slowdown)
- Keep animation durations under 600ms

**Contingency:** Disable animations globally via a feature flag if INP > 200ms on mobile.

---

#### T3 — Image Optimisation Failures
**Description:** Unoptimised images (wrong format, missing dimensions, no lazy-load) are the #1 cause of Lighthouse Performance failures.

| Likelihood | Impact | Priority |
|---|---|---|
| 4 | 4 | **16 — High** |

**Mitigation:**
- Enforce use of Next.js `<Image>` component exclusively — no raw `<img>` tags
- All images must have explicit `width` and `height` props
- Prioritise LCP image with `priority` prop
- Require WebP/AVIF formats; reject PNG/JPG without conversion
- Set up ESLint rule (`@next/next/no-img-element`) to catch raw `<img>` at CI level

**Contingency:** Image audit checklist before every deployment.

---

#### T4 — TypeScript / Build Errors in CI
**Description:** Broken builds block deployment. Strict TypeScript config catches issues late if not enforced during development.

| Likelihood | Impact | Priority |
|---|---|---|
| 3 | 3 | **9 — Medium** |

**Mitigation:**
- `strict: true` enforced in `tsconfig.json` from day one
- Pre-commit hook: `tsc --noEmit && eslint`
- Vercel build blocks deployment on type errors automatically

**Contingency:** Roll back to last passing build; fix on a branch.

---

#### T5 — Vercel Cold Start / Edge Config Misconfiguration
**Description:** Misconfigured Vercel project (wrong region, missing env vars) causes 500 errors or slow TTFB on the live site.

| Likelihood | Impact | Priority |
|---|---|---|
| 2 | 4 | **8 — Medium** |

**Mitigation:**
- Use Vercel preview deployments for all branches
- Configure environment variables in Vercel dashboard before first production deploy
- Enable Vercel Analytics from day one to catch TTFB issues
- Use `edge` runtime only where necessary; default to Node.js runtime

---

### CONTENT & SCHEDULE RISKS

---

#### S1 — Content Delivery Delay (Critical Path Risk)
**Description:** SigmaTech must supply all copy, case studies, team photos, and logos. Late content delivery is the most common cause of website project delays.

| Likelihood | Impact | Priority |
|---|---|---|
| 4 | 5 | **20 — Critical** |

**Mitigation:**
- Content deadline: **5 business days after scope sign-off** — written into scope document
- Development proceeds with placeholder content; real content is swapped in via a content integration sprint
- Provide a structured Content Template document so SigmaTech knows exactly what is needed and in what format
- Assign a named content owner on the SigmaTech side

**Contingency:** If content is > 5 days late, launch date shifts 1:1 with the delay. No exceptions.

---

#### S2 — Scope Creep from Internal Stakeholders
**Description:** Internal management requests additional pages or features mid-development ("can we also add a careers page / pricing page / portal?")

| Likelihood | Impact | Priority |
|---|---|---|
| 4 | 4 | **16 — High** |

**Mitigation:**
- Scope Definition document (Step 05) is signed off before development begins
- All change requests must go through formal Change Control process
- Phase 2 backlog is maintained — any new idea goes there first
- Weekly status update to management keeps expectations aligned

**Contingency:** Any mid-sprint scope addition automatically extends the timeline by its estimated effort. This is communicated immediately, not absorbed silently.

---

#### S3 — Perfectionism Loop Delaying Launch
**Description:** Internal team iterates endlessly on pixel-level design decisions, preventing a timely launch.

| Likelihood | Impact | Priority |
|---|---|---|
| 3 | 4 | **12 — High** |

**Mitigation:**
- Wireframes and UI design are approved before development (Steps 08–09)
- Define a "good enough" threshold: a staging URL that passes all acceptance criteria is shippable
- Time-box design feedback rounds: max 2 revision cycles per component
- Adopt the rule: "Ship it, then improve it" — the site can be iterated post-launch

---

### BUSINESS & SECURITY RISKS

---

#### B1 — SEO Regression from Domain / URL Changes
**Description:** If the revamp changes URL structure or removes pages that had existing inbound links, organic search rankings drop.

| Likelihood | Impact | Priority |
|---|---|---|
| 3 | 4 | **12 — High** |

**Mitigation:**
- Crawl and document all existing URLs before launch using Screaming Frog or similar
- Implement 301 redirects for any changed or removed URLs in `next.config.mjs`
- Submit updated sitemap to Google Search Console immediately post-launch
- Monitor Google Search Console for 404 errors in the 30 days post-launch

---

#### B2 — Contact Form Spam / Abuse
**Description:** An unprotected contact form becomes a vector for spam submissions and potentially for harvesting the reply-to email address.

| Likelihood | Impact | Priority |
|---|---|---|
| 4 | 3 | **12 — High** |

**Mitigation:**
- Implement Cloudflare Turnstile (invisible CAPTCHA — no UX friction)
- Rate-limit form submissions server-side (Next.js Route Handler)
- Never expose the receiving email address in client-side code
- Validate and sanitise all form inputs server-side before passing to Resend API

---

#### B3 — Dependency Vulnerabilities
**Description:** npm packages have known CVEs that expose the site or build pipeline to attack.

| Likelihood | Impact | Priority |
|---|---|---|
| 3 | 3 | **9 — Medium** |

**Mitigation:**
- Run `npm audit` before launch and resolve high/critical CVEs
- Enable Dependabot or Renovate bot on the GitHub repository
- Keep dependency count minimal — no packages for things achievable with Tailwind or native CSS

---

## 3. Risk Priority Summary

| ID | Risk | Priority Score | Owner |
|---|---|---|---|
| T1 | Third-party script performance regression | 20 — Critical | Lead Dev |
| S1 | Content delivery delay | 20 — Critical | PM + Content Owner |
| T3 | Image optimisation failures | 16 — High | Lead Dev |
| S2 | Scope creep | 16 — High | PM |
| T2 | Animation jank on mobile | 12 — High | Lead Dev |
| S3 | Perfectionism loop | 12 — High | PM |
| B1 | SEO regression from URL changes | 12 — High | Lead Dev + PM |
| B2 | Contact form spam | 12 — High | Lead Dev |
| T4 | TypeScript / build errors | 9 — Medium | Lead Dev |
| B3 | Dependency vulnerabilities | 9 — Medium | Lead Dev |
| T5 | Vercel misconfiguration | 8 — Medium | Lead Dev |

---

## 4. Risk Review Schedule

| Milestone | Review Action |
|---|---|
| Start of each sprint | Review open risks, update status |
| Pre-launch (staging) | Full risk checklist — all Critical and High items must be resolved |
| 7 days post-launch | Review performance metrics and form submission data |
| 30 days post-launch | Close resolved risks; log new risks to Phase 2 |

---

*Document owner: Lead Architect / PM*
*Next step: Step 07 — Sitemap & User Flows*
