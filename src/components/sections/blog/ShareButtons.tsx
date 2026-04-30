"use client";

import { useState } from "react";
import { Link2, Linkedin, Twitter, Check } from "lucide-react";

// ─── Component ────────────────────────────────────────────────────────────────

interface ShareButtonsProps {
  /** Full canonical URL of the article — passed from the Server Component page. */
  url:   string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl   = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function handleCopy() {
    void navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const iconClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-700 text-charcoal-500 " +
    "transition-all duration-150 hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-400";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm font-medium text-charcoal-500">Share this article:</p>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label="Share on X / Twitter"
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        className={iconClass}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-electric-400" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {copied && (
        <span className="text-xs font-medium text-electric-400" role="status">
          Copied!
        </span>
      )}
    </div>
  );
}
