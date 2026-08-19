"use client";

import { useCart } from "@/lib/cart/CartProvider";

export function CartButton() {
  const { totals, open, hydrated } = useCart();
  const count = totals.totalQuantity;

  return (
    <button
      type="button"
      onClick={open}
      className="-mr-2 inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-ink hover:text-accent"
    >
      Bag
      {/* Rendered only after hydration so the badge never flashes a stale zero
          over a restored cart. */}
      {hydrated && count > 0 ? (
        <span className="tabular-nums" aria-hidden="true">
          ({count})
        </span>
      ) : null}
      <span className="sr-only">
        Open bag{hydrated && count > 0 ? `, ${count} items` : ", empty"}
      </span>
    </button>
  );
}
