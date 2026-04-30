"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const CONSENT_KEY = "cookie-consent";

export function AnalyticsConsent() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const check = () => setGranted(localStorage.getItem(CONSENT_KEY) === "granted");
    check();
    window.addEventListener("cookie-consent-change", check);
    return () => window.removeEventListener("cookie-consent-change", check);
  }, []);

  if (!granted) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
