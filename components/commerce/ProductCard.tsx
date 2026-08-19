import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/commerce/Price";
import { QuickAddButton } from "@/components/commerce/QuickAddButton";
import { Rating } from "@/components/commerce/Rating";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

/**
 * Stretched-link card.
 *
 * The link wraps the product title — so its accessible name is the product
 * name, not "image, price, 4.6 stars" — and an `::after` pseudo-element
 * stretches that link over the whole card, which is what a mouse expects. The
 * quick-add button sits above the overlay on its own stacking level, so it is
 * the one region of the card that does not navigate.
 *
 * `sizes` matches the real column count per breakpoint — 2-up below lg, 3-up
 * from lg, 4-up from 2xl — so the browser never downloads a 1200px image to
 * paint it at 300.
 */
const GRID_SIZES =
  "(min-width: 1536px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 46vw";

export function ProductCard({
  product,
  priority = false,
  className,
  sizes = GRID_SIZES,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const image = product.images[0];

  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-canvas-sunken">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
        ) : null}

        {product.compareAtPrice ? (
          <span className="absolute top-3 left-3 rounded-full bg-canvas-raised/92 px-2.5 py-1 text-2xs font-medium tracking-eyebrow text-clay uppercase backdrop-blur-sm">
            Set
          </span>
        ) : null}

        {/* Above the stretched link, so it adds instead of navigating. */}
        <QuickAddButton product={product} />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-display text-lg leading-tight">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:underline hover:underline-offset-4"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-ink-muted">{product.tagline}</p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />
          <Rating summary={product.reviewsSummary} showCount={false} />
        </div>
      </div>
    </article>
  );
}

/** Card-shaped skeleton at the exact final dimensions, so grid load costs 0 CLS. */
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-4/5 rounded-sm bg-canvas-sunken" />
      <div className="mt-4 space-y-2">
        <div className="h-5 w-2/3 rounded-xs bg-canvas-sunken" />
        <div className="h-4 w-5/6 rounded-xs bg-canvas-sunken" />
        <div className="h-4 w-1/3 rounded-xs bg-canvas-sunken" />
      </div>
    </div>
  );
}
