"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEAM, type TeamMember, type AvatarVariant } from "@/data/content/team";

const AVATAR: Record<AvatarVariant, string> = {
  blue:   "bg-electric-500/15 text-electric-400",
  violet: "bg-violet-500/15 text-violet-400",
  pink:   "bg-pink-500/15 text-pink-400",
  cyan:   "bg-cyan-500/15 text-cyan-400",
  green:  "bg-green-500/15 text-green-400",
  amber:  "bg-amber-500/15 text-amber-400",
};

function TeamCard({ member, index, reduced }: { member: TeamMember; index: number; reduced: boolean }) {
  return (
    <m.article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-charcoal-800 bg-charcoal-900/40 p-7 transition-[border-color,box-shadow,transform] duration-300 hover:border-charcoal-700 hover:shadow-lg-dark focus-within:border-electric-500/40"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      whileHover={reduced ? {} : { y: -2 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0, 0, 0.2, 1] }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 opacity-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(10,132,255,0.05),transparent)] transition-opacity duration-700 group-hover:opacity-100" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 bg-[linear-gradient(90deg,transparent,rgba(10,132,255,0.30),transparent)] transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-4">
        {member.avatarUrl ? (
          <Image
            src={member.avatarUrl}
            alt={member.name}
            width={44}
            height={44}
            className="shrink-0 rounded-full object-cover ring-1 ring-charcoal-700"
          />
        ) : (
          <div aria-hidden="true" className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-charcoal-700", AVATAR[member.variant])}>
            {member.initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-semibold leading-snug tracking-tight text-[var(--color-text-primary)]">{member.name}</p>
          <p className="mt-0.5 text-xs text-charcoal-500">{member.role}</p>
        </div>

        <Link
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-charcoal-600 opacity-40 transition-all duration-200 hover:bg-charcoal-800 hover:text-charcoal-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-500"
        >
          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <hr className="my-5 border-charcoal-800/80" />

      <p className="text-[13px] leading-relaxed text-charcoal-400">{member.bio}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {member.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-charcoal-800 bg-charcoal-800/60 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-charcoal-500">
            {tag}
          </span>
        ))}
      </div>
    </m.article>
  );
}

export default function TeamGrid() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TEAM.map((member, i) => (
        <TeamCard key={member.name} member={member} index={i} reduced={prefersReduced} />
      ))}
    </div>
  );
}
