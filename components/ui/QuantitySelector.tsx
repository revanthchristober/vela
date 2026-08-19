"use client";

import { cn } from "@/lib/utils/cn";

/**
 * One quantity stepper for the whole site — PDP buy box, cart drawer and cart
 * page. It existed three times before this component did, which is exactly the
 * duplication blueprint §6 warns about.
 */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 9,
  label,
  size = "base",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Names the thing being counted, for screen readers: "Balance Cleanser". */
  label: string;
  size?: "sm" | "base";
}) {
  const button = size === "sm" ? "size-9" : "size-12";
  const count = size === "sm" ? "w-8 text-sm" : "w-10 text-sm";

  return (
    <div className="inline-flex items-center rounded-sm border border-line-strong">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center text-ink-muted disabled:opacity-35",
          button,
        )}
      >
        <span aria-hidden="true">−</span>
        <span className="sr-only">Decrease quantity of {label}</span>
      </button>

      <span className={cn("text-center tabular-nums", count)} aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center text-ink-muted hover:text-ink disabled:opacity-35",
          button,
        )}
      >
        <span aria-hidden="true">+</span>
        <span className="sr-only">Increase quantity of {label}</span>
      </button>
    </div>
  );
}
