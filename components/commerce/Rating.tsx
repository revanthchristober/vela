import { cn } from "@/lib/utils/cn";
import type { ReviewsSummary } from "@/lib/commerce/types";

export function Rating({
  summary,
  className,
  showCount = true,
}: {
  summary: ReviewsSummary;
  className?: string;
  showCount?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-sm text-ink-muted", className)}
    >
      <span aria-hidden="true" className="text-accent">
        ★
      </span>
      <span className="tabular-nums">{summary.rating.toFixed(1)}</span>
      {showCount ? (
        <span className="text-ink-subtle tabular-nums">({summary.count})</span>
      ) : null}
      <span className="sr-only">
        Rated {summary.rating} out of 5 from {summary.count} reviews
      </span>
    </span>
  );
}

/** The full distribution, low stars included. Hiding them is the tell. */
export function RatingDistribution({ summary }: { summary: ReviewsSummary }) {
  const max = Math.max(...summary.distribution, 1);

  return (
    <ul className="w-full max-w-xs space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = summary.distribution[stars - 1] ?? 0;
        return (
          <li key={stars} className="flex items-center gap-3 text-xs text-ink-muted">
            <span className="w-8 shrink-0 tabular-nums">{stars} ★</span>
            <span
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
              aria-hidden="true"
            >
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </span>
            <span className="w-8 shrink-0 text-right tabular-nums">{count}</span>
          </li>
        );
      })}
    </ul>
  );
}
