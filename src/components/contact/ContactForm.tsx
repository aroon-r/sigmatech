"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  type ContactFormInputValidated,
  type ContactApiResponse,
} from "@/lib/validations";
import {
  SERVICE_SLUG_LABELS,
  BUDGET_LABELS,
  type ServiceSlug,
} from "@/data/schemas/shared";
import { PROJECT_TIMELINE_LABELS } from "@/data/schemas/contact.schema";
import { submitContactForm } from "@/app/actions/contact";
import Button from "@/components/ui/Button";

// ─── Zod v4 resolver ─────────────────────────────────────────────────────────
// Bridges Zod v4's Standard Schema interface to React Hook Form's Resolver type.
// Using `as` casts because Zod v4 changed the Result<T> discriminant shape.

// Returns `any` deliberately — cast to Resolver<T> at the call site via `as`.
// This bridges Zod v4's `~standard` interface to RHF without the type mismatch
// that occurs when importing from @hookform/resolvers/standard-schema.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeZodResolver(schema: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (data: any): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = schema["~standard"].validate(data);
    const result = raw instanceof Promise ? await raw : raw;
    if (result.issues) {
      const errors: Record<string, { message: string; type: string }> = {};
      for (const issue of result.issues as { path?: (string | number)[]; message: string }[]) {
        const key = issue.path?.join(".") ?? "root";
        if (!errors[key]) errors[key] = { message: issue.message, type: "validation" };
      }
      return { values: {}, errors };
    }
    return { values: result.value, errors: {} };
  };
}

// ─── Static option arrays ─────────────────────────────────────────────────────

const SERVICE_ENTRIES = Object.entries(SERVICE_SLUG_LABELS) as [ServiceSlug, string][];
const BUDGET_ENTRIES  = Object.entries(BUDGET_LABELS)        as [string, string][];
const TIMELINE_ENTRIES = Object.entries(PROJECT_TIMELINE_LABELS) as [string, string][];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="field-error">
      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function SuccessState({ submissionId }: { submissionId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col items-center py-16 text-center"
    >
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "rgba(34,197,94,0.12)",
          border:     "1px solid rgba(34,197,94,0.28)",
        }}
      >
        <CheckCircle2 className="h-8 w-8 text-green-400" aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl font-bold text-charcoal-50">
        Message sent!
      </h3>
      <p className="mt-3 max-w-sm text-charcoal-400">
        Thanks for reaching out. We&apos;ll be in touch within one business day —
        check your inbox for a confirmation.
      </p>
      <p className="mt-5 font-mono text-xs text-charcoal-600">Ref: {submissionId}</p>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [serverResponse, setServerResponse] = useState<ContactApiResponse | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactFormInputValidated>({
    resolver: makeZodResolver(contactFormSchema) as Resolver<ContactFormInputValidated>,
    defaultValues: {
      services:    [],
      budgetRange: "not_specified",
    },
  });

  const selectedServices = watch("services") ?? [];
  const messageLength    = watch("message")?.length ?? 0;

  function toggleService(slug: ServiceSlug) {
    const next = selectedServices.includes(slug)
      ? selectedServices.filter((s: ServiceSlug) => s !== slug)
      : [...selectedServices, slug];
    setValue("services", next, { shouldValidate: true, shouldDirty: true });
  }

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData();
    fd.set("fullName",   data.fullName);
    fd.set("email",      data.email);
    if (data.company) fd.set("company", data.company);
    if (data.phone)   fd.set("phone",   data.phone);
    data.services.forEach((s) => fd.append("services", s));
    fd.set("budgetRange", data.budgetRange);
    fd.set("message",     data.message);
    if (data.timeline)       fd.set("timeline",       data.timeline);
    if (data.marketingOptIn) fd.set("marketingOptIn", "on");
    fd.set("privacyConsent", "on");
    fd.set("website", ""); // honeypot — always empty on genuine submissions

    startTransition(async () => {
      const result = await submitContactForm(null, fd);
      setServerResponse(result);
    });
  });

  if (serverResponse?.success) {
    return <SuccessState submissionId={serverResponse.submissionId} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot — visually off-screen, tab-skipped */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Server-level error */}
      <AnimatePresence>
        {serverResponse && !serverResponse.success && (
          <motion.div
            key="server-error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/25
                       bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {serverResponse.error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">

        {/* ── Name + Email ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="label">
              Full name <span className="text-red-400" aria-hidden="true">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Alex Johnson"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              className={cn("input", errors.fullName && "input-error")}
              {...register("fullName")}
            />
            <FieldError message={errors.fullName?.message} />
          </div>

          <div>
            <label htmlFor="email" className="label">
              Work email <span className="text-red-400" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              className={cn("input", errors.email && "input-error")}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>
        </div>

        {/* ── Company + Phone ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="label">
              Company{" "}
              <span className="ml-1 text-xs font-normal text-charcoal-500">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Ltd"
              className="input"
              {...register("company")}
            />
          </div>

          <div>
            <label htmlFor="phone" className="label">
              Phone{" "}
              <span className="ml-1 text-xs font-normal text-charcoal-500">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7700 900000"
              aria-invalid={!!errors.phone}
              className={cn("input", errors.phone && "input-error")}
              {...register("phone")}
            />
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        {/* ── Services ── */}
        <fieldset>
          <legend className="label mb-3 block">
            Services interested in{" "}
            <span className="text-red-400" aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {SERVICE_ENTRIES.map(([slug, label]) => {
              const active = selectedServices.includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  onClick={() => toggleService(slug)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left",
                    "text-sm font-medium transition-all duration-150",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-electric-500",
                    active
                      ? "border-electric-500/40 bg-electric-500/10 text-electric-300"
                      : "border-charcoal-700 bg-charcoal-800/50 text-charcoal-400 hover:border-charcoal-600 hover:text-charcoal-200"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors",
                      active ? "border-electric-400 bg-electric-500" : "border-charcoal-600"
                    )}
                  >
                    {active && (
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className="h-2.5 w-2.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
          {errors.services && (
            <p role="alert" className="field-error mt-2.5">
              <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
              Please select at least one service
            </p>
          )}
        </fieldset>

        {/* ── Budget + Timeline ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="budgetRange" className="label">
              Budget range{" "}
              <span className="text-red-400" aria-hidden="true">*</span>
            </label>
            <select
              id="budgetRange"
              aria-required="true"
              aria-invalid={!!errors.budgetRange}
              className={cn("input", errors.budgetRange && "input-error")}
              {...register("budgetRange")}
            >
              {BUDGET_ENTRIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError message={errors.budgetRange?.message} />
          </div>

          <div>
            <label htmlFor="timeline" className="label">
              Start timeline{" "}
              <span className="ml-1 text-xs font-normal text-charcoal-500">(optional)</span>
            </label>
            <Controller
              name="timeline"
              control={control}
              render={({ field }) => (
                <select
                  id="timeline"
                  className="input"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                >
                  <option value="">Not sure yet</option>
                  {TIMELINE_ENTRIES.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* ── Message ── */}
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label
              htmlFor="message"
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Project brief{" "}
              <span className="text-red-400" aria-hidden="true">*</span>
            </label>
            <span
              aria-live="polite"
              className="text-xs"
              style={{ color: messageLength > 1800 ? "#F59E0B" : "var(--color-text-muted)" }}
            >
              {messageLength} / 2000
            </span>
          </div>
          <textarea
            id="message"
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            placeholder="Tell us about your project, goals, and any technical constraints…"
            className={cn("textarea", errors.message && "input-error")}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        {/* ── Privacy consent ── */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              aria-required="true"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-electric-500"
              {...register("privacyConsent")}
            />
            <span className="text-sm text-charcoal-400">
              I agree to SigmaTech&apos;s{" "}
              <a
                href="/privacy"
                className="text-electric-400 underline underline-offset-2 hover:text-electric-300"
              >
                privacy policy
              </a>{" "}
              and consent to being contacted about my enquiry.{" "}
              <span className="text-red-400" aria-hidden="true">*</span>
            </span>
          </label>
          <FieldError message={errors.privacyConsent?.message} />
        </div>

        {/* ── Marketing opt-in ── */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-electric-500"
              {...register("marketingOptIn")}
            />
            <span className="text-sm text-charcoal-500">
              Keep me updated with SigmaTech case studies and engineering insights.
            </span>
          </label>
        </div>

        {/* ── Submit ── */}
        <Button
          type="submit"
          size="lg"
          isLoading={isPending}
          disabled={isPending}
          rightIcon={!isPending ? <Send className="h-4 w-4" aria-hidden="true" /> : undefined}
          className="w-full"
        >
          {isPending ? "Sending…" : "Send enquiry"}
        </Button>

        <p className="text-center text-xs text-charcoal-600">
          We typically respond within 1 business day. No spam, ever.
        </p>

      </div>
    </form>
  );
}
