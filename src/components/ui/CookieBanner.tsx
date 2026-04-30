"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const CONSENT_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    window.dispatchEvent(new Event("cookie-consent-change"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal-800 bg-charcoal-950/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <p className="max-w-xl text-sm text-charcoal-400">
          We use analytics cookies to understand how visitors use this site and improve
          your experience.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-charcoal-200"
          >
            Privacy policy
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={decline}
            className="rounded-lg border border-charcoal-700 px-4 py-2 text-sm font-medium
                       text-charcoal-400 transition-colors duration-150
                       hover:border-charcoal-600 hover:text-charcoal-200
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-electric-500 px-4 py-2 text-sm font-semibold text-white
                       transition-colors duration-150 hover:bg-electric-600
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={decline}
            aria-label="Dismiss"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg
                       text-charcoal-600 transition-colors duration-150
                       hover:bg-charcoal-800 hover:text-charcoal-400
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
