"use client";

import { useState } from "react";

import { useCart } from "@/lib/cart/CartProvider";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

/**
 * Grid-level add. Adds the first available variant — the collection page is not
 * the place to make someone choose a size, and the drawer shows what landed so
 * the choice is still visible and changeable.
 *
 * Always rendered, never hover-only: there is no hover on touch.
 */
export function QuickAddButton({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((candidate) => candidate.availableForSale);
  const image = product.images[0];

  if (!variant || !image) return null;

  return (
    <button
      type="button"
      onClick={(event) => {
        // The whole card is a link; the add must not navigate.
        event.preventDefault();
        event.stopPropagation();
        addLine({
          id: `${product.slug}:${variant.id}`,
          productSlug: product.slug,
          productTitle: product.title,
          variantId: variant.id,
          variantTitle: variant.title,
          unitPrice: variant.price,
          compareAtUnitPrice: variant.compareAtPrice,
          image: { url: image.url, alt: image.alt },
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      className={cn(
        // z-10 lifts it above the card's stretched link overlay.
        "absolute right-3 bottom-3 z-10 inline-flex min-h-11 items-center rounded-sm px-4 text-xs font-medium tracking-eyebrow uppercase",
        "transition-colors duration-200 ease-out-soft",
        added
          ? "bg-accent text-accent-ink"
          : "bg-canvas-raised/92 text-ink backdrop-blur-sm hover:bg-accent hover:text-accent-ink",
      )}
    >
      {added ? "Added" : "Add"}
      <span className="sr-only">
        {" "}
        {product.title}, {variant.title}, to bag
      </span>
    </button>
  );
}
