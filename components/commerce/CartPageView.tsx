"use client";

import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/commerce/Price";
import { Button, ButtonLink } from "@/components/ui/Button";
import { lineTotal, useCart } from "@/lib/cart/CartProvider";
import { formatMoney } from "@/lib/utils/format";

export function CartPageView() {
  const { lines, totals, setQuantity, removeLine, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mt-12 space-y-4" aria-hidden="true">
        {[0, 1].map((index) => (
          <div key={index} className="flex animate-pulse gap-4">
            <div className="size-24 rounded-sm bg-canvas-sunken" />
            <div className="flex-1 space-y-2 py-2">
              <div className="h-5 w-1/3 rounded-xs bg-canvas-sunken" />
              <div className="h-4 w-1/5 rounded-xs bg-canvas-sunken" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mt-10 max-w-md">
        <p className="font-display text-2xl">Your bag is empty.</p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <ButtonLink href="/shop">Shop the range</ButtonLink>
          <Link
            href="/shop/rituals"
            className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            Or start with a ritual set →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
      <ul className="divide-y divide-line border-y border-line">
        {lines.map((line) => (
          <li key={line.id} className="flex gap-5 py-6">
            <Link
              href={`/products/${line.productSlug}`}
              className="relative size-24 shrink-0 overflow-hidden rounded-sm bg-canvas-sunken sm:size-28"
            >
              <Image
                src={line.image.url}
                alt={line.image.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/products/${line.productSlug}`}
                    className="font-display text-lg hover:underline hover:underline-offset-4"
                  >
                    {line.productTitle}
                  </Link>
                  <p className="text-xs text-ink-subtle">{line.variantTitle}</p>
                </div>
                <Price price={lineTotal(line)} />
              </div>

              <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center rounded-sm border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                    disabled={line.quantity <= 1}
                    className="flex size-11 items-center justify-center text-ink-muted disabled:opacity-35"
                  >
                    <span aria-hidden="true">−</span>
                    <span className="sr-only">
                      Decrease quantity of {line.productTitle}
                    </span>
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                    className="flex size-11 items-center justify-center text-ink-muted hover:text-ink"
                  >
                    <span aria-hidden="true">+</span>
                    <span className="sr-only">
                      Increase quantity of {line.productTitle}
                    </span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="text-xs text-ink-subtle underline underline-offset-4 hover:text-ink"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside>
        <h2 className="mb-5 eyebrow">Summary</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Shipping</dt>
            <dd className="tabular-nums">
              {totals.shipping.amount === 0 ? "Free" : formatMoney(totals.shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(totals.total)}</dd>
          </div>
        </dl>

        {totals.toFreeShipping ? (
          <p className="mt-4 text-xs text-ink-muted">
            {formatMoney(totals.toFreeShipping)} more for free shipping
          </p>
        ) : null}

        <Button fullWidth size="lg" className="mt-6">
          Checkout
        </Button>
        <p className="mt-3 text-xs text-ink-subtle">
          Shipping and taxes calculated at checkout.
        </p>
      </aside>
    </div>
  );
}
