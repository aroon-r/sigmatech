# Step 10 — Content Planning & Strategy
**Project:** nexora Website Revamp
**Date:** 2026-04-25
**Content Owner:** Internal PM
**Status:** Approved — Pending Client Sign-off

---

## Table of Contents

1. [Content Mission Statement](#1-content-mission-statement)
2. [Core Messaging Framework](#2-core-messaging-framework)
3. [Message Architecture](#3-message-architecture)
4. [Page-Specific Content Goals](#4-page-specific-content-goals)
5. [Homepage Information Architecture](#5-homepage-information-architecture)
6. [Tone of Voice Guidelines](#6-tone-of-voice-guidelines)
7. [Copy Rules & Anti-Patterns](#7-copy-rules--anti-patterns)
8. [Key Copy Templates](#8-key-copy-templates)
9. [Content Delivery Checklist](#9-content-delivery-checklist)

---

## 1. Content Mission Statement

> **Every word on the nexora website exists to do one thing: reduce the distance between a qualified prospect and a booked discovery call.**

Content is not decoration. It is the product of our marketing layer. It must earn attention, build trust, and remove friction — in that order, on every page.

---

## 2. Core Messaging Framework

### 2.1 The One Problem We Solve

Most software projects don't fail because of bad ideas. They fail because of bad execution — miscommunication, scope drift, technical debt, missed deadlines, and vendors who disappear after the invoice is paid.

**nexora's core promise:**

> *"We bridge the gap between business ambition and engineering execution — so you get software that works, ships on time, and scales when it matters most."*

This single idea cascades into every headline, sub-headline, and CTA on the site. Every page answers a variation of the same question: *"Can I trust nexora to actually deliver?"*

---

### 2.2 The Three Trust Pillars

All content on the site should reinforce one or more of these:

| Pillar | The Claim | How We Prove It |
|---|---|---|
| **Technical Excellence** | We build with modern, production-grade tools | Tech stack logos, open-source work, Lighthouse scores, code-quality signals |
| **Process Discipline** | We are organised and transparent from day one | 4-step process section, sprint methodology, weekly demo cadence |
| **Business Fluency** | We understand your goals, not just your requirements | Outcome-oriented case studies, ROI metrics, CEO/PM testimonials |

---

### 2.3 The Value Ladder

Content guides each persona up a ladder of belief before they convert.

```
Step 1  —  AWARENESS
           "nexora builds software for companies like mine."

Step 2  —  INTEREST
           "They seem to know what they're doing technically."

Step 3  —  CREDIBILITY
           "They've solved this exact problem for someone else."

Step 4  —  TRUST
           "Real clients vouch for them. Their process makes sense."

Step 5  —  INTENT
           "I should reach out and see if they're a fit."

Step 6  —  CONVERSION
           "I filled in the form. I'm expecting a response within 24h."
```

Each page section is designed to advance the visitor up exactly one step. No section should try to do all six at once.

---

## 3. Message Architecture

### 3.1 Hierarchy of Messages

```
PRIMARY MESSAGE (appears in Hero headline)
└── "We build software that scales with you."

    SECONDARY MESSAGES (appear in section headings)
    ├── "We cover the full product lifecycle — from idea to launch."   [Services]
    ├── "A repeatable, battle-tested process — every project."        [Process]
    ├── "Real problems. Measurable outcomes. Shipped software."        [Case Studies]
    ├── "Don't take our word for it."                                 [Testimonials]
    └── "Ready to build something great?"                             [CTA]

        TERTIARY MESSAGES (appear in body copy, card descriptions)
        ├── We use modern stacks — Next.js, TypeScript, AWS, Docker
        ├── We work in sprints with weekly demos
        ├── We measure success by your business outcomes, not lines of code
        ├── We're a team of senior engineers — no juniors on client work
        └── We respond to every enquiry within one business day
```

---

### 3.2 Persona-Specific Message Emphasis

| Pillar | CEO / CTO Emphasis | PM Emphasis | HR Emphasis |
|---|---|---|---|
| Technical Excellence | Lead with this | Mention it, don't dwell | Mention as credential |
| Process Discipline | Second priority | **Lead with this** | Supporting signal |
| Business Fluency | **Highest priority** | Second priority | Least important |
| Proof (case studies) | Outcome metrics | Process detail | Team composition |
| CTA copy | "Start a project" | "Book a discovery call" | "Let's talk staffing" |

---

## 4. Page-Specific Content Goals

Each page has three non-negotiable learning outcomes. A visitor who reads only the headings and sub-headings should still walk away knowing all three.

---

### Page 1 — Home `/`

**Page goal:** Convert a first-time visitor from curious to interested, and from interested to ready to contact.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | nexora builds high-performance custom software for businesses that need a reliable technical partner | Hero headline + sub-headline (above fold) |
| 2 | nexora has a clear process, real clients, and proven outcomes | Services → Process → Case Studies → Testimonials (mid-page) |
| 3 | It is easy and low-risk to reach out and start a conversation | Final CTA Band + contact form friction-reduction copy |

**Above-fold checklist (no scroll required):**
- [ ] Clear value proposition in headline (< 10 words)
- [ ] Supporting sub-headline that names the target customer
- [ ] Primary CTA button visible
- [ ] At least 2 client name logos visible (social proof before scroll)

---

### Page 2 — Services `/services`

**Page goal:** Help the visitor confirm that nexora offers exactly the service they need, and understand what they will receive.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | nexora covers the full software development lifecycle — web, cloud, QA, design, consulting, staffing | Services grid with icon + name + 1-line description |
| 2 | Each service has specific, concrete deliverables — not vague promises | Expanded card with deliverables checklist |
| 3 | nexora follows a structured process regardless of which service is engaged | Condensed process strip before the CTA |

**Content rules for this page:**
- Every service card must have a verb-led description: *"We build..."*, *"We deliver..."*, *"We design..."*
- Deliverables must be specific nouns, not adjectives: *"REST API documentation"* not *"Great documentation"*
- No service should use the word "solutions" — it is meaningless. Use the actual output name.

---

### Page 3 — Case Studies `/work` + `/work/[slug]`

**Page goal:** Remove the final credibility objection. Show that nexora has done this before and achieved measurable results.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | nexora has worked on projects with a similar industry, scale, or technical challenge to mine | Industry tags on each card, filter by category |
| 2 | nexora delivers measurable outcomes, not just shipped code | Metric callout on every card (e.g., "↑ 60% reduction in load time") |
| 3 | The team is professional — their approach to a problem is well-documented and thoughtful | Full case study page: challenge → approach → result |

**Case study page structure (required for every entry):**

```
Section 1 — Overview
  Client:    {Company name or anonymised "[Fortune 500 Retailer]"}
  Industry:  {Sector}
  Services:  {Which nexora services were used}
  Timeline:  {Duration}

Section 2 — The Challenge
  What problem did the client have before nexora?
  What was failing, slow, or missing?
  What was the business cost of inaction?

Section 3 — Our Approach
  How did nexora diagnose the problem?
  What was the technical strategy?
  What process was followed?

Section 4 — The Outcome
  What was delivered?
  What changed for the client?
  REQUIRED: At least one hard metric (%, $, time, users, score)

Section 5 — Testimonial
  One quote from a named stakeholder at the client.
```

**Content rules:**
- Every case study needs **at least one quantified metric**. Avoid: *"improved performance"*. Require: *"reduced API response time from 1.8s to 190ms"*.
- Client name can be anonymised if under NDA, but industry and metric must remain.
- Maximum length: 800 words per case study. If it's longer, cut the approach section.

---

### Page 4 — About `/about`

**Page goal:** Humanise nexora. Make the company feel real, trustworthy, and worth working with as human beings — not just as a vendor.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | nexora was founded with a clear mission — not just to make money, but to raise the bar on how software gets built | Company story section (origin, mission, why it exists) |
| 2 | The people behind nexora are senior, experienced professionals — not anonymous offshore contractors | Team section: real names, real titles, real photos, LinkedIn links |
| 3 | nexora has a distinct set of values that shapes how they work — and those values protect the client | Values section: 3–4 concrete values with a 1-sentence explanation each |

**Values framework (draft — to be confirmed):**

| Value | One-line definition |
|---|---|
| **Craft over speed** | We write code we'd be proud to show in a code review — always. |
| **Transparency by default** | You'll never have to ask for a status update. We tell you before you ask. |
| **Outcomes over output** | We measure our success by your business results — not by lines of code shipped. |
| **Ruthless simplicity** | The best solution is usually the simplest one. We resist unnecessary complexity. |

**Team section rules:**
- Real photos only — no stock photography for team members
- Include: Name, title, a one-line bio, and a LinkedIn URL
- If the team is small (< 5 people), include a line about the extended network/contractors
- Do not include team members who are no longer at the company

---

### Page 5 — Blog `/blog` + `/blog/[slug]`

**Page goal:** Establish nexora as a knowledgeable, opinionated voice in the software industry — worth bookmarking and returning to.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | nexora engineers think deeply about the problems their clients face — not just how to code a solution | Article topics that address real business + technical dilemmas |
| 2 | nexora stays current — they write about tools and practices that are relevant today, not five years ago | Recency of articles, references to current tools (Next.js 14, AI, LLMs, etc.) |
| 3 | nexora is worth following — their writing is useful, not promotional | Articles that give actionable takeaways, not veiled sales pitches |

**Content pillars for blog (4 rotating topics):**

| Pillar | Description | Example article |
|---|---|---|
| **Engineering Craft** | Deep dives into technical approaches | "Why we migrated from REST to tRPC — and when you shouldn't" |
| **Product Thinking** | The business side of software decisions | "How to write a technical spec your dev team will actually follow" |
| **Case Study Expanded** | Longer-form breakdown of client work | "How we cut an e-commerce checkout load time by 60% in 3 sprints" |
| **Industry Commentary** | nexora's view on tech trends | "The real cost of technical debt — and how to quantify it for your CEO" |

**Blog article rules:**
- Minimum length: 800 words — enough to be substantive
- Maximum length: 2,500 words — beyond this, split into a series
- Every article needs: a clear thesis in the intro, at least one concrete example, and an actionable takeaway in the conclusion
- No listicle titles (e.g., "10 reasons why...") — nexora articles have an argument, not a count

**Launch requirement:** Minimum **3 published articles** before go-live. An empty blog signals a dead company.

---

### Page 6 — Contact `/contact`

**Page goal:** Remove every possible reason for a qualified prospect to hesitate. Make submitting feel safe, fast, and worth their time.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | Reaching out is easy — it takes less than 60 seconds and requires no commitment | Form with 4 fields max, above-the-fold, no account creation |
| 2 | What happens next — nexora responds within 1 business day and no one will be aggressively sold to | Response promise + brief "what to expect" copy next to the form |
| 3 | There are multiple ways to reach nexora — email, LinkedIn, and form | Contact details column alongside the form |

**Form fields (exactly 4 — this is a hard rule from Scope Definition):**

| Field | Type | Placeholder | Validation |
|---|---|---|---|
| Full Name | Text | "Jane Smith" | Required, min 2 chars |
| Company | Text | "Acme Corp" | Required |
| Email | Email | "jane@acme.com" | Required, valid email format |
| Tell us about your project | Textarea | "We're looking for a team to help us build..." | Required, min 20 chars |

**Post-submit state:**
- Show an inline success message (do not redirect to a new page)
- Copy: *"Thanks {name} — we've received your message and will be in touch within one business day."*
- Trigger: automated confirmation email to the submitter via Resend

**Anxiety-reduction copy (next to the form):**
```
What happens next:
① We read every message — usually within a few hours.
② Within 1 business day, you'll hear from a real person
   (not an automated sequence).
③ We'll propose a free 30-minute discovery call to see
   if we're the right fit for your project.
No hard sell. No commitment required.
```

---

### Page 7 — 404 `/not-found`

**Page goal:** Recover the visitor — don't lose them to the back button.

| # | What the user must learn | How it's delivered |
|---|---|---|
| 1 | This page doesn't exist — and that's not their fault | Clear, calm headline — no technical jargon ("404 error") |
| 2 | Here are the most useful places to go from here | 3–4 quick navigation links to the most visited pages |
| 3 | nexora has character — even error pages reflect the brand | Light-touch brand voice, no corporate stiffness |

**404 copy template:**
```
Headline:   "Looks like this page went on vacation."
Sub-head:   "It might have moved, or maybe it never existed.
             Either way — here's where to go instead:"
Links:      → Home     → Services     → Our Work     → Contact
CTA:        [ Get in touch → ]
```

---

## 5. Homepage Information Architecture

### 5.1 The Conversion-Optimised Section Order

```
SECTION          PURPOSE                     TRUST PILLAR        EXIT RISK
──────────────────────────────────────────────────────────────────────────────
1. NAVBAR        Orientation + quick CTA      —                  Low
2. HERO          Hook + primary CTA           All 3 pillars       Critical (3s test)
3. SOCIAL PROOF  Instant credibility          Business Fluency    Low
4. SERVICES      Capability confirmation      Technical Excell.   Low-Medium
5. PROCESS       Organisation signal          Process Discipline  Low
6. CASE STUDIES  Proof of delivery            All 3 pillars       HIGH
7. TESTIMONIALS  Peer validation              Business Fluency    Medium
8. TECH STACK    Technical credibility        Technical Excell.   Low
9. CTA BAND      Conversion                   —                   Conversion point
10. FOOTER       Navigation + legal           —                   Exit
```

### 5.2 Section-by-Section Content Specification

---

#### Section 1 — Hero

**Content goal:** Pass the 3-second test. A visitor must understand who nexora is and what they do within 3 seconds of arrival — without scrolling.

```
BADGE (above headline):
  "● Now hiring — join our team"
  ↳ Creates immediacy, signals a growing company

HEADLINE (H1 — 8 words max):
  "We build software that scales with you."
  ↳ Subject: We (company) + Object: software + Benefit: scales with you
  ↳ Accent word "scales with you" gets the gradient treatment

SUB-HEADLINE (2 sentences max, < 30 words):
  "nexora delivers high-performance web applications, APIs, and digital
   products — engineered for reliability and built to grow with your business."
  ↳ Names outputs (web apps, APIs), names the benefit (reliability, growth)
  ↳ No adjectives that don't carry weight ("innovative", "cutting-edge")

PRIMARY CTA:
  Label:  "Start a project →"
  Target: /contact
  Style:  btn-primary-glow (electric blue with glow — signals confidence)

SECONDARY CTA:
  Label:  "⎔ View our work"
  Target: /work  or  #work
  Style:  btn-secondary (outline — lower commitment signal)

SOCIAL PROOF STRIP (below CTAs):
  Label: "Trusted by teams at"
  Content: 5 client company names / logos
  ↳ Logos beat names — request SVG assets from clients
  ↳ If no logo rights, use company names in muted type
```

**A/B test plan (post-launch):**
- Variant A: "Start a project →" vs Variant B: "Book a free call →"
- Hypothesis: Lower-commitment language increases conversion rate
- Metric: Contact form submissions per 1,000 unique visitors

---

#### Section 2 — Social Proof Strip

**Content goal:** Before the visitor invests time reading about services, show them that companies like theirs already trust nexora.

```
PLACEMENT: Immediately below hero fold — no gap
STYLE: Thin strip, muted contrast — supporting, not dominant
CONTENT: 5–8 client logos (or names) in a horizontal row
LABEL: "Trusted by teams at" — text-xs uppercase tracking-widest muted
```

**Content rules:**
- Recognisable logos beat names. Prioritise clients with strong brand recognition.
- If a client logo cannot be used (NDA), substitute with industry descriptor: *"Leading FinTech"*
- Do not include logos of companies nexora no longer works with unless the relationship ended positively

---

#### Section 3 — Services Strip

**Content goal:** In 15 seconds, answer the question: "Does nexora do what I need?"

```
HEADLINE: "What we do"
SUB-HEAD: "We cover the full product lifecycle — from idea to launch."

6 SERVICE CARDS:
  Each card = Icon + Name + 1-line description (max 8 words)

  1. Web & App Development
     "Custom web and mobile applications, built to scale."
  2. Cloud & DevOps
     "AWS infrastructure, CI/CD pipelines, and cost optimisation."
  3. QA & Testing
     "Manual and automated testing to ship with confidence."
  4. UI/UX Design
     "User research, wireframes, and design systems that convert."
  5. Tech Consulting
     "Architecture reviews and strategic technology guidance."
  6. Staff Augmentation
     "Senior engineers embedded in your team — fast."

BOTTOM LINK: "Explore all services →" → /services
```

---

#### Section 4 — Process (How We Work)

**Content goal:** Answer the Product Manager's primary question: *"Will nexora be organised and easy to work with?"*

```
HEADLINE: "How we work"
SUB-HEAD: "A repeatable, battle-tested process — every project, every time."

4 STEPS:
  01 Discovery
     "We align on goals, users, scope, and measurable success metrics
      before a single line of code is written."

  02 Design
     "We wireframe, prototype, and validate with real users —
      so there are no surprises once development begins."

  03 Build
     "Sprint-based delivery with weekly demos and async check-ins.
      You see real progress every single week."

  04 Launch
     "We ship, monitor, and iterate. Deployment is not the end —
      it's the beginning of a product that keeps improving."
```

---

#### Section 5 — Case Studies (Featured)

**Content goal:** Answer the CEO's highest-stakes question: *"Have you done this before — and did it actually work?"*

```
HEADLINE: "Our work"
SUB-HEAD: "Real problems. Measurable outcomes. Shipped software."

HEADER CTA: "View all case studies →" → /work (right-aligned, desktop only)

3 FEATURED CARDS:
  Each card requires (from content owner):
  ├── Cover image (16:9 ratio, min 1200×675px)
  ├── Industry tag (1–2 words: "FinTech", "E-commerce", "SaaS")
  ├── Project title (5 words max)
  ├── Short description (2 sentences, < 30 words)
  ├── Key metric (quantified outcome: "↑ 60% load time reduction")
  └── Slug (for linking to full case study page)
```

**Content priority:** If only 2 case studies are ready at launch, show 2 cards — do not fill the grid with dummy content. An honest "2 featured projects" is better than a fake third.

---

#### Section 6 — Testimonials

**Content goal:** Provide peer-level social proof. Let past clients vouch for nexora in their own words.

```
HEADLINE: "Don't take our word for it."

3 TESTIMONIALS:
  Each requires:
  ├── Full quote (3–5 sentences, 40–80 words)
  ├── Full name (first and last — no initials)
  ├── Job title
  ├── Company name
  └── Avatar photo (headshot, min 200×200px)

  Ideal quote structure:
  "Before nexora, [specific problem we had]. They [specific thing they did].
   The result was [specific outcome]. What impressed me most was [process/people insight].
   I'd [recommend/work with them again] without hesitation."
```

**Anti-patterns to avoid in testimonials:**
- ❌ "nexora was great to work with. Highly recommend." → Too vague, signals fake
- ❌ Anonymous: "— CTO, SaaS Company" → Name required for credibility
- ❌ Edited to remove negatives → Authentic quotes mention a challenge overcome

---

#### Section 7 — Tech Stack

**Content goal:** Signal technical currency to evaluators who care about tools.

```
LABEL: "Built with the best tools in the industry"
CONTENT: 10 technology logos

  Frontend:    Next.js, React, TypeScript, Tailwind CSS
  Backend:     Node.js, PostgreSQL
  Cloud:       AWS, Docker
  Workflow:    GitHub, Figma

STYLE: Grayscale by default → full colour on hover
       (prevents visual noise while still surfacing the logos)
```

---

#### Section 8 — Final CTA Band

**Content goal:** The last conversion point. One job: get the click.

```
HEADLINE: "Ready to build something great?"
SUB-HEAD: "Let's talk about what we can do together."
CTA:      "Start a project →" → /contact
STYLE:    bg-electric-600 — high contrast, full-width, zero distractions
```

**Rules:**
- No navigation links in this section
- No secondary CTA — one choice only
- No body copy beyond the sub-headline — do not explain what nexora does again here

---

## 6. Tone of Voice Guidelines

### 6.1 Brand Voice Pillars

| Pillar | Definition | In Practice |
|---|---|---|
| **Expert** | We know our craft deeply. We speak with earned authority. | Use precise technical vocabulary where relevant. Don't explain things incorrectly just to sound accessible. |
| **Direct** | We say what we mean. We don't hide behind vague language. | Lead with the conclusion. Cut the preamble. |
| **Human** | We're people talking to people, not a corporation issuing statements. | Use "we" and "you". Contractions are fine. Personal pronouns are fine. |
| **Restrained** | We trust the reader to be intelligent. We don't oversell or over-explain. | One CTA per section. One point per paragraph. |

---

### 6.2 Voice in Practice — Transformations

#### Headlines

| ❌ Wrong | ✅ Right |
|---|---|
| "Innovative, cutting-edge software solutions for the modern enterprise" | "We build software that scales with you." |
| "Leveraging best-in-class technology to drive digital transformation" | "From idea to launch — we build the software your business runs on." |
| "Your trusted technology partner for tomorrow's challenges" | "Senior engineers. Proven process. Measurable results." |
| "We deliver excellence across the software development lifecycle" | "We write code we'd be proud to ship. Every time." |

**Rule:** If a competitor could say the same headline without changing a word, rewrite it.

---

#### Body Copy

| ❌ Wrong | ✅ Right |
|---|---|
| "Our team of highly skilled professionals leverages their extensive expertise to craft bespoke software solutions tailored to your unique business requirements." | "We build custom software for companies that need it done right." |
| "We are passionate about delivering world-class digital experiences that exceed expectations and drive measurable business value." | "Every project is measured by one thing: did it move the needle for your business?" |
| "Our agile development methodology ensures timely delivery of high-quality software products." | "We work in sprints. You see working software every week — not promises." |

**Rule:** Read each sentence aloud. If it sounds like it was written by a committee, it was. Cut it in half and try again.

---

#### CTA Copy

| ❌ Wrong | ✅ Right |
|---|---|
| "Click here to learn more" | "Explore our work →" |
| "Submit" | "Send message" |
| "Get started today!" | "Start a project" |
| "Contact us for a free quote" | "Book a discovery call" |
| "Request information" | "Let's talk" |

**Rule:** CTA labels are promises. They tell the user exactly what will happen when they click. Never use "Submit" — it sounds like a form, not a human interaction.

---

### 6.3 Vocabulary Reference

**Use freely:**
build, ship, deliver, design, test, launch, scale, engineer, craft, solve, measure, improve, partner, team, process, sprint, outcome

**Use sparingly (once per page, max):**
innovative, cutting-edge, world-class, best-in-class, robust, seamless

**Never use:**
synergy, leverage (as a verb), circle back, move the needle (except in this doc), solutions (as a standalone noun), digital transformation, empower, revolutionise, disruption, ecosystem (in marketing copy)

---

### 6.4 Punctuation & Formatting Conventions

| Convention | Rule |
|---|---|
| Em dash `—` | Use for asides and pauses. *"We build software — and stand behind it."* |
| Oxford comma | Always. *"design, build, and deploy"* not *"design, build and deploy"* |
| Sentence case | Headlines use sentence case, not Title Case. *"How we work"* not *"How We Work"* |
| Exclamation marks | Maximum 1 per page. Reserve for genuine excitement, not filler. |
| Ellipsis `...` | Avoid in professional copy. Use a period or restructure the sentence. |
| Bold in body copy | Use for 1 key phrase per paragraph. Never for decoration. |
| Hyphens | "high-performance", "full-stack", "end-to-end" — hyphenated as adjectives before nouns |
| Numbers | Spell out one through nine. Use numerals for 10 and above. Always use numerals for metrics. |

---

### 6.5 Accessibility Copy Standards

| Standard | Requirement |
|---|---|
| Link text | Always descriptive. *"Read the case study"* not *"Click here"* |
| Button labels | Action-first. *"Send message"* not *"Message send"* |
| Image alt text | Describe what is shown, not the file name. *"nexora team at a whiteboard session"* |
| Decorative images | `alt=""` — empty string tells screen readers to skip |
| Error messages | Explain what went wrong AND how to fix it. *"Email is required. Please enter your email address."* |
| Icon-only buttons | Must have `aria-label`. *`aria-label="Open navigation menu"`* |

---

## 7. Copy Rules & Anti-Patterns

### 7.1 The 10 Hard Rules

1. **One idea per sentence.** If a sentence has a semicolon, it's probably two sentences.
2. **One CTA per section.** Never give the user two equal choices — they'll take neither.
3. **Lead with the benefit, follow with the feature.** Not: *"We use Next.js App Router."* Instead: *"Pages load instantly — we use Next.js App Router."*
4. **Every metric must be specific.** Not: *"improved performance."* Require: *"reduced load time from 3.2s to 900ms."*
5. **Every testimonial needs a full name.** Anonymous quotes have zero credibility.
6. **No stock photography for people.** If it's a face, it must be a real nexora person or client (with permission).
7. **Write for the worst-case reading condition.** Mobile screen, bright sunlight, distracted user, 6 seconds of patience.
8. **Never use "solutions" as a standalone noun.** Say what the solution is.
9. **No lorem ipsum past wireframe stage.** Placeholder copy must be real draft copy by the time any section goes to design review.
10. **If you're not sure, cut it.** Content earns its place or it doesn't appear. When in doubt, remove.

### 7.2 Common Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Wall of text | Nobody reads it | 3 sentences max per paragraph |
| Feature-led copy | Features don't sell — outcomes do | Rewrite: "so that you can..." |
| Passive voice | Feels weak and evasive | Active voice, always |
| Multiple H1s | Confuses search engines and readers | One H1 per page |
| Keyword stuffing | Harms readability and SEO | Write for humans first |
| Hidden CTAs (below fold only) | Misses impatient users | One CTA always above fold |
| Long form labels on buttons | Creates hesitation | 2–4 words maximum |
| Unverified superlatives | "World's best", "most innovative" | Delete all superlatives |

---

## 8. Key Copy Templates

### 8.1 Page Meta Descriptions (SEO)

| Page | Meta Description (150 chars max) |
|---|---|
| Home | nexora builds high-performance web applications, APIs, and digital products. Custom software engineered for reliability. |
| Services | Explore nexora's full-cycle software services: web development, cloud, QA, design, consulting, and staff augmentation. |
| Work | nexora case studies — real projects, real outcomes, real metrics. See how we build software that moves the needle. |
| About | Meet the nexora team — senior engineers and delivery specialists committed to craft, transparency, and measurable results. |
| Blog | Engineering insights, product thinking, and software craft from the nexora team. |
| Contact | Start a project with nexora. Fill in our 60-second form and we'll be in touch within one business day. |

---

### 8.2 OG / Social Share Titles

| Page | OG Title |
|---|---|
| Home | nexora — We build software that scales with you |
| Services | nexora Services — Full-cycle software development |
| Work | nexora Work — Case studies with measurable outcomes |
| About | About nexora — Senior engineers, proven process |
| Blog | nexora Blog — Engineering insights and product thinking |
| Contact | Start a project with nexora |

---

### 8.3 Contact Form — Success & Error States

**Success message:**
> *"Thanks {First Name} — we've received your message and you'll hear from a real person within one business day. In the meantime, feel free to browse our work."*
> `[ View our case studies → ]`

**Network error message:**
> *"Something went wrong on our end — your message wasn't sent. Please try again, or email us directly at hello@nexora.dev."*

**Validation error (inline, per field):**
> `Email — "Please enter a valid email address (e.g. you@company.com)."`
> `Project brief — "Tell us a little about your project (at least 20 characters)."`

---

## 9. Content Delivery Checklist

The following content must be delivered by the **Content Owner (Internal PM)** before development can begin on any section that references it. Sections can be built with placeholder copy, but cannot be considered complete without real content.

### Required Before Launch

| Content Item | Needed For | Format | Status |
|---|---|---|---|
| Company tagline (1 sentence) | Hero, Footer, OG tags | Plain text | ⬜ Pending |
| Hero sub-headline (2 sentences, < 30 words) | Hero | Plain text | ⬜ Pending |
| 6 service names + 1-line descriptions | Services grid | Plain text | ⬜ Pending |
| 6 service expanded descriptions (2–3 sentences each) | Services detail cards | Plain text | ⬜ Pending |
| 6 service deliverables lists (3–4 items each) | Services detail cards | Plain text | ⬜ Pending |
| Company story (3–4 paragraphs) | About page | Plain text | ⬜ Pending |
| 3–4 company values + 1-sentence definitions | About page | Plain text | ⬜ Pending |
| Team member details × n | About page | Name, title, bio, photo, LinkedIn | ⬜ Pending |
| 2–3 case studies (full structured content) | Work page | Structured (see §4 template) | ⬜ Pending |
| 3 client testimonials | Homepage + Case Studies | Quote + name + title + company + photo | ⬜ Pending |
| Client logos (for social proof strip) | Homepage, Footer | SVG preferred, PNG accepted | ⬜ Pending |
| Tech stack logos × 10 | Homepage, Services | SVG preferred | ⬜ Pending |
| 3 blog articles (ready to publish) | Blog | Markdown or Google Doc | ⬜ Pending |
| nexora logo (primary + mark) | Navbar, Footer, OG | SVG + PNG | ⬜ Pending |
| Contact email address | Contact page, Footer | Plain text | ⬜ Pending |
| Social media handles (LinkedIn, GitHub, Twitter) | Footer, About | URLs | ⬜ Pending |
| Privacy Policy text | /privacy | Plain text or HTML | ⬜ Pending |
| Terms of Service text | /terms | Plain text or HTML | ⬜ Pending |

> **Deadline:** All content above must be delivered within **5 business days of scope sign-off** as specified in the Scope Definition (Step 05). Any delay shifts the launch date 1:1.

---

*Document owner: Lead Architect / PM*
*Content owner: Internal PM*
*Companion docs: 05-scope-definition.md, 07-sitemap-user-flows.md, 09-design-system.md*
*Next step: Step 11 — SEO & AEO Strategy*
