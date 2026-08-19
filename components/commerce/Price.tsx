import { cn } from "@/lib/utils/cn";
import { discountPercent, formatMoney, type Money } from "@/lib/utils/format";

export function Price({
  price,
  compareAtPrice = null,
  className,
  size = "base",
}: {
  price: Money;
  compareAtPrice?: Money | null;
  className?: string;
  size?: "sm" | "base" | "lg";
}) {
  const saved = discountPercent(price, compareAtPrice);

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-sans tabular-nums",
          { sm: "text-sm", base: "text-base", lg: "text-lg" }[size],
        )}
      >
        {formatMoney(price)}
      </span>

      {compareAtPrice ? (
        <>
          <s className="text-sm text-ink-subtle tabular-nums">
            {formatMoney(compareAtPrice)}
          </s>
          {saved !== null ? (
            <span className="rounded-full bg-clay-soft px-2 py-0.5 text-2xs font-medium tracking-eyebrow text-clay uppercase">
              Save {saved}%
            </span>
          ) : null}
        </>
      ) : null}
    </span>
  );
}

/** Per-millilitre price. The number that makes a refill argument checkable. */
export function UnitPrice({ price, volumeMl }: { price: Money; volumeMl: number }) {
  const perMl = price.amount / volumeMl / 100;
  return (
    <span className="text-xs text-ink-subtle tabular-nums">₹{perMl.toFixed(2)} / ml</span>
  );
}
