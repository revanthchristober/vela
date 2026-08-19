import { Container, Eyebrow, Section } from "@/components/ui/Container";
import type { Review } from "@/data/editorial";

/**
 * A scroll-snapping rail rather than an auto-playing marquee: motion that
 * cannot be paused and carries content fails both §9 ("no motion that blocks
 * the user") and the reduced-motion criterion. The horizontal scroll is native,
 * so it is keyboard- and screen-reader-navigable for free.
 */
export function ReviewsRail({
  reviews,
  rating,
  count,
}: {
  reviews: readonly Review[];
  rating: number;
  count: number;
}) {
  return (
    <Section tone="canvas" size="base" className="border-t border-line">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>What people say</Eyebrow>
          <p className="text-sm text-ink-muted">
            <span aria-hidden="true" className="text-accent">
              ★
            </span>{" "}
            <span className="tabular-nums">{rating.toFixed(1)}</span> from{" "}
            <span className="tabular-nums">{count.toLocaleString("en-IN")}</span> reviews
          </p>
        </div>
      </Container>

      <ul className="mt-10 flex snap-x snap-mandatory [scrollbar-width:thin] gap-4 overflow-x-auto px-5 pb-4 xs:px-6 sm:gap-6 sm:px-10 lg:px-16">
        {reviews.map((review) => (
          <li
            key={review.author}
            className="flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-sm border border-line bg-canvas-raised p-6 sm:w-80"
          >
            <div>
              <p aria-hidden="true" className="text-sm text-accent">
                {"★".repeat(review.rating)}
                <span className="text-line-strong">{"★".repeat(5 - review.rating)}</span>
              </p>
              <p className="sr-only">{review.rating} out of 5</p>
              <p className="mt-4 font-display text-lg leading-snug text-balance">
                “{review.quote}”
              </p>
            </div>
            <p className="mt-6 text-xs text-ink-subtle">
              {review.author} · {review.product}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
