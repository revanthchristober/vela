"use client";

import { useEffect, useRef, useState } from "react";

import { Price } from "@/components/commerce/Price";
import { Rating } from "@/components/commerce/Rating";
import { VariantSelector } from "@/components/commerce/VariantSelector";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/lib/cart/CartProvider";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";
import { formatMoney, money } from "@/lib/utils/format";

type Status = "idle" | "pending" | "added";

export function BuyBox({ product }: { product: Product }) {
  const { addLine } = useCart();
  const firstAvailable =
    product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [showSticky, setShowSticky] = useState(false);
  const inlineRef = useRef<HTMLDivElement>(null);

  const variant =
    product.variants.find((candidate) => candidate.id === variantId) ?? firstAvailable;

  useEffect(() => {
    const node = inlineRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only once the inline button has been scrolled *past*. Testing
        // `!isIntersecting` alone would also fire on load, when the button is
        // still below the fold — showing a sticky "add to bag" above the
        // product title, which is exactly the pattern people hate.
        setShowSticky((entry?.boundingClientRect.bottom ?? 0) < 0);
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!variant) return null;

  const image = product.images[0];
  const total = money(variant.price.amount * quantity, variant.price.currencyCode);
  const disabled = !variant.availableForSale;

  function add() {
    if (!variant || !image || disabled) return;
    setStatus("pending");
    addLine({
      id: `${product.slug}:${variant.id}`,
      productSlug: product.slug,
      productTitle: product.title,
      variantId: variant.id,
      variantTitle: variant.title,
      unitPrice: variant.price,
      compareAtUnitPrice: variant.compareAtPrice,
      image: { url: image.url, alt: image.alt },
      quantity,
    });
    setStatus("added");
    window.setTimeout(() => setStatus("idle"), 1800);
  }

  const buttonLabel =
    status === "pending"
      ? "Adding…"
      : status === "added"
        ? "Added to bag"
        : disabled
          ? "Out of stock"
          : `Add to bag — ${formatMoney(total)}`;

  return (
    <>
      <div className="lg:sticky lg:top-28">
        <h1 className="font-display text-4xl font-light text-balance">{product.title}</h1>
        <p className="mt-3 text-lg text-ink-muted">{product.tagline}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Price
            price={variant.price}
            compareAtPrice={variant.compareAtPrice}
            size="lg"
          />
          <Rating summary={product.reviewsSummary} />
        </div>

        <div className="mt-8">
          <VariantSelector
            variants={product.variants}
            value={variant}
            onChange={setVariantId}
          />
        </div>

        <div ref={inlineRef} className="mt-8 flex flex-wrap items-center gap-3">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            label={product.title}
          />
          <Button
            size="lg"
            onClick={add}
            disabled={disabled}
            className="min-w-[16rem] flex-1"
          >
            {buttonLabel}
          </Button>
        </div>

        {disabled ? (
          <p className="mt-3 text-sm text-clay">
            This size is out of stock. Back in about two weeks — the other size ships
            today.
          </p>
        ) : null}

        <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm text-ink-muted">
          <li>Free shipping over ₹1,500</li>
          <li>30 days to return it, opened is fine</li>
          <li>Made in small batches. Batch date on the base.</li>
        </ul>
      </div>

      {/* Mobile sticky bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 backdrop-blur-md transition-transform duration-300 ease-out-soft lg:hidden",
          showSticky ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showSticky}
      >
        <div className="flex items-center gap-4 px-5 py-3 xs:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{product.title}</p>
            <Price price={total} size="sm" />
          </div>
          <Button onClick={add} disabled={disabled} tabIndex={showSticky ? 0 : -1}>
            {status === "added" ? "Added" : disabled ? "Out of stock" : "Add to bag"}
          </Button>
        </div>
      </div>
    </>
  );
}
