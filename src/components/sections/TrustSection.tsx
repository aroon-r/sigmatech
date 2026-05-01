// These chips name actual practices — not aspirational adjectives.
// Each one is a commitment a prospective client can ask us about.
const CHIPS = [
  "Written scope before code",
  "Next.js + TypeScript default",
  "Tests in CI from day one",
  "Full IP transfer on delivery",
] as const;

const DEFAULT_STATEMENT =
  "The engineers you brief are the ones who build. We write down what we're committing to " +
  "before development starts, set up automated tests from day one, and document every decision " +
  "that matters — so the handover is something your team can actually use.";

interface TrustSectionProps {
  statement?: string;
}

export default function TrustSection({ statement = DEFAULT_STATEMENT }: TrustSectionProps) {
  return (
    <div className="mt-12 border-t border-charcoal-800 pt-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-charcoal-500">{statement}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
          {CHIPS.map((chip) => (
            <li key={chip} className="flex items-center gap-1.5 text-xs text-charcoal-600">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-electric-500/50" />
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
