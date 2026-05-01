"use client";

import { useEffect, useRef, useState } from "react";
import { useForm }         from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactApiResponse } from "@/lib/validations";

// ─── Types ────────────────────────────────────────────────────────────────────

type Fields = { name: string; email: string; message: string; privacyConsent: boolean };

// ─── Field components ─────────────────────────────────────────────────────────

function Field({
  label,
  error,
  required,
  children,
}: {
  label:    string;
  error?:   string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-charcoal-400">
        {label}
        {required && <span className="ml-0.5 text-red-400" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400" role="alert">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-charcoal-900 px-4 py-3 text-sm text-charcoal-100 placeholder:text-charcoal-600 " +
  "transition-colors duration-150 focus:border-electric-500/60 focus:outline-none focus:ring-2 focus:ring-electric-500/20";

const inputBorder = {
  default: "border-charcoal-700",
  error:   "border-red-500/50",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuickContactForm() {
  const [state, setState] = useState<ContactApiResponse | null>(null);
  const [pending, setPending] = useState(false);

  const { register, formState: { errors }, reset } = useForm<Fields>({ mode: "onBlur" });
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success
  useEffect(() => {
    if (state?.success) reset();
  }, [state?.success, reset]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const name    = (formData.get("name")    as string ?? "").trim();
    const email   = (formData.get("email")   as string ?? "").trim();
    const message = (formData.get("message") as string ?? "").trim();
    const privacyConsent = formData.get("privacyConsent") === "on";

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName:     name,
          email,
          message,
          services:     ["consulting"],
          budgetRange:  "not_specified",
          privacyConsent,
          website:      "", // honeypot — always empty
        }),
      });
      const result: ContactApiResponse = await res.json();
      setState(result);
    } catch {
      setState({ success: false, error: "Network error. Please try again." });
    } finally {
      setPending(false);
    }
  };

  // ── Success state ──
  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-400" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-semibold text-charcoal-50">Message sent</p>
          <p className="mt-1 text-sm text-charcoal-400">
            Your message has been received. We'll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  const apiFieldErrors = state && !state.success ? state.fieldErrors : undefined;
  const apiServerError = state && !state.success && !state.fieldErrors ? state.error : undefined;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        autoComplete="off"
      />

      <div className="flex flex-col gap-5">
        {/* Name */}
        <Field label="Full name" required error={apiFieldErrors?.fullName?.[0]}>
          <input
            {...register("name", { required: true, minLength: 2 })}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={cn(inputBase, errors.name || apiFieldErrors?.fullName ? inputBorder.error : inputBorder.default)}
          />
        </Field>

        {/* Email */}
        <Field label="Work email" required error={apiFieldErrors?.email?.[0]}>
          <input
            {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={cn(inputBase, errors.email || apiFieldErrors?.email ? inputBorder.error : inputBorder.default)}
          />
        </Field>

        {/* Message */}
        <Field label="What are you building?" required error={apiFieldErrors?.message?.[0]}>
          <textarea
            {...register("message", { required: true, minLength: 20 })}
            name="message"
            rows={4}
            placeholder="Give us a brief overview — what's the project, what's the timeline, what's the problem you're solving?"
            className={cn(
              inputBase, "resize-none",
              errors.message || apiFieldErrors?.message ? inputBorder.error : inputBorder.default,
            )}
          />
        </Field>

        {/* Privacy consent */}
        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              {...register("privacyConsent", { required: true })}
              name="privacyConsent"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-electric-500"
            />
            <span className="text-sm text-charcoal-400">
              I agree to Nexora&apos;s{" "}
              <a
                href="/privacy"
                className="text-electric-400 underline underline-offset-2 hover:text-electric-300"
              >
                privacy policy
              </a>
              .{" "}
              <span className="text-red-400" aria-hidden="true">*</span>
            </span>
          </label>
          {apiFieldErrors?.privacyConsent && (
            <p className="text-xs text-red-400" role="alert">
              {apiFieldErrors.privacyConsent[0]}
            </p>
          )}
        </div>

        {/* Server-level error */}
        {apiServerError && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400" role="alert">
            {apiServerError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-2 rounded-xl bg-electric-500 px-6 py-3.5
                     text-sm font-semibold text-white shadow-lg shadow-electric-500/20
                     transition-all duration-150 hover:bg-electric-600 active:scale-[0.98]
                     disabled:cursor-not-allowed disabled:opacity-60
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>

        <p className="text-center text-xs text-charcoal-600">
          We review every message carefully. No spam, ever.
        </p>
      </div>
    </form>
  );
}
