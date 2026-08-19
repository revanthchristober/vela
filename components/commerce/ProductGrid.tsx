import { ProductCard, ProductCardSkeleton } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

export function ProductGrid({
  products,
  columns = "shop",
  priorityCount = 0,
  className,
}: {
  products: readonly Product[];
  /** `shop` fills to 4 at 2xl; `feature` stays at 4 for the homepage row. */
  columns?: "shop" | "feature";
  priorityCount?: number;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14",
        columns === "shop"
          ? "grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          : "grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
