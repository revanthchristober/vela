"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { SORT_OPTIONS } from "@/lib/commerce";
import type { ProductSort } from "@/lib/commerce/types";

/**
 * Sort writes to the URL, so a sorted view is shareable and survives a reload
 * (acceptance criteria §2). `scroll: false` keeps the grid where it is —
 * re-sorting is not navigation.
 */
export function SortSelect({ value }: { value: ProductSort }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-ink-muted">
        Sort
      </label>
      <select
        id="sort"
        value={value}
        disabled={pending}
        onChange={(event) => {
          const params = new URLSearchParams(searchParams.toString());
          if (event.target.value === "featured") params.delete("sort");
          else params.set("sort", event.target.value);
          const query = params.toString();
          startTransition(() => {
            router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
          });
        }}
        className="min-h-11 rounded-sm border border-line-strong bg-canvas-raised px-3 text-sm"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
