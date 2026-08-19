"use client";

import { UnitPrice } from "@/components/commerce/Price";
import type { ProductVariant } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

/**
 * Size selection as a labelled radio group, not a `<select>`.
 *
 * A native select hides the options behind a tap and gives no room for the
 * per-ml price, which is the number that makes the refill argument checkable.
 */
export function VariantSelector({
  variants,
  value,
  onChange,
}: {
  variants: readonly ProductVariant[];
  value: ProductVariant;
  onChange: (id: string) => void;
}) {
  if (variants.length <= 1) return null;

  return (
    <fieldset>
      <legend className="mb-3 eyebrow">Size</legend>

      <div className="flex flex-wrap gap-2">
        {variants.map((option) => (
          <label
            key={option.id}
            className={cn(
              // `relative` so the visually-hidden radio is positioned against
              // this label rather than escaping to the page.
              "relative inline-flex min-h-11 cursor-pointer items-center rounded-sm border px-4 text-sm transition-colors",
              option.id === value.id
                ? "border-ink bg-ink text-ink-inverse"
                : "border-line-strong hover:border-ink",
              !option.availableForSale && "opacity-45",
            )}
          >
            <input
              type="radio"
              name="variant"
              value={option.id}
              checked={option.id === value.id}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />
            {option.title}
            {!option.availableForSale ? (
              <span className="sr-only"> (out of stock)</span>
            ) : null}
          </label>
        ))}
      </div>

      <p className="mt-3">
        <UnitPrice price={value.price} volumeMl={value.volumeMl} />
      </p>
    </fieldset>
  );
}
