import Image from "next/image";
import { Linkedin, Twitter, Globe } from "lucide-react";
import type { Author } from "@/data/schemas";

// ─── Component ────────────────────────────────────────────────────────────────

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const initial = author.name.charAt(0).toUpperCase();

  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-start sm:gap-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        border:     "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={72}
            height={72}
            className="rounded-full object-cover ring-2 ring-charcoal-700"
          />
        ) : (
          <div
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full text-xl font-bold text-electric-400"
            style={{
              background: "rgba(10,132,255,0.15)",
              border:     "1px solid rgba(10,132,255,0.35)",
            }}
          >
            {initial}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-charcoal-500">
          Written by
        </p>
        <p className="text-lg font-semibold text-charcoal-50">{author.name}</p>
        <p className="text-sm text-electric-400">{author.designation}</p>
        <p className="mt-3 text-sm leading-6 text-charcoal-400">{author.bio}</p>

        {/* Social links */}
        {(author.linkedinUrl || author.twitterUrl || author.websiteUrl) && (
          <div className="mt-4 flex items-center gap-2.5">
            {author.linkedinUrl && (
              <a
                href={author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-700 text-charcoal-500
                           transition-colors hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-400"
                aria-label={`${author.name} on LinkedIn`}
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {author.twitterUrl && (
              <a
                href={author.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-700 text-charcoal-500
                           transition-colors hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-400"
                aria-label={`${author.name} on X / Twitter`}
              >
                <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {author.websiteUrl && (
              <a
                href={author.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-700 text-charcoal-500
                           transition-colors hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-400"
                aria-label={`${author.name}'s website`}
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
