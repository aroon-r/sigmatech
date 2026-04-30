"use client";

import { useEffect, useRef, useState } from "react";
import { useForm }         from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitQuickContact, type QuickFormState } from "@/app/actions/quick-contact";

// ─── Types ────────────────────────────────────────────────────────────────────

type Fields = { name: string; email: string; message: string };

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
  const [state, setState] = useState<QuickFormState | null>(null);
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

  try {
    const formData = new FormData(e.currentTarget);
    const result = await submitQuickContact(formData);
    setState(result);
  } catch (err) {
    console.error(err);
    setState({ success: false, error: "Something went wrong" });
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
            We’ll review your message and get back to you.
          </p>
        </div>
      </div>
    );
  }

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
        <Field label="Full name" required error={state?.fieldErrors?.name?.[0]}>
          <input
            {...register("name", { required: true, minLength: 2 })}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={cn(inputBase, errors.name || state?.fieldErrors?.name ? inputBorder.error : inputBorder.default)}
          />
        </Field>

        {/* Email */}
        <Field label="Work email" required error={state?.fieldErrors?.email?.[0]}>
          <input
            {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={cn(inputBase, errors.email || state?.fieldErrors?.email ? inputBorder.error : inputBorder.default)}
          />
        </Field>

        {/* Message */}
        <Field label="What are you building?" required error={state?.fieldErrors?.message?.[0]}>
          <textarea
            {...register("message", { required: true, minLength: 10 })}
            name="message"
            rows={4}
            placeholder="Give us a brief overview — what's the project, what's the timeline, what's the problem you're solving?"
            className={cn(
              inputBase, "resize-none",
              errors.message || state?.fieldErrors?.message ? inputBorder.error : inputBorder.default,
            )}
          />
        </Field>

        {/* Server-level error */}
        {state?.error && !state?.fieldErrors && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400" role="alert">
            {state.error}
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
          No spam. Just a clear response.
        </p>
      </div>
    </form>
  );
}
