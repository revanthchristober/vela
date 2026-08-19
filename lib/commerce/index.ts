import type {
  Collection,
  Product,
  ProductQuery,
  ProductSort,
} from "@/lib/commerce/types";

import * as mock from "./adapters/mock";

/**
 * The commerce service — the only surface the UI is allowed to touch.
 *
 * ADR-0001. The interface is deliberately narrow: a method may only be added
 * when one of the five MVP surfaces cannot be built without it. An abstraction
 * that grows one method per Shopify feature is worse than no abstraction.
 *
 * `shopify` is not implemented yet. Selecting it fails loudly at startup rather
 * than silently falling back to mock data — a storefront that quietly serves
 * fixtures in production is the worst possible failure mode.
 */
export interface CommerceAdapter {
  getProducts(query?: ProductQuery): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | null>;
}

type AdapterName = "mock" | "shopify";

function resolveAdapter(): CommerceAdapter {
  const name = (process.env["NEXT_PUBLIC_COMMERCE_ADAPTER"] ?? "mock") as AdapterName;

  switch (name) {
    case "mock":
      return mock;
    case "shopify":
      throw new Error(
        "NEXT_PUBLIC_COMMERCE_ADAPTER=shopify, but the Shopify adapter is not implemented yet " +
          "(planned for Phase 5, see docs/adr/0001-commerce-and-cms-data-source-abstraction.md). " +
          "Set NEXT_PUBLIC_COMMERCE_ADAPTER=mock or leave it unset.",
      );
    default:
      throw new Error(
        `Unknown NEXT_PUBLIC_COMMERCE_ADAPTER "${String(name)}". Expected "mock" or "shopify".`,
      );
  }
}

const adapter = resolveAdapter();

export const getProducts = (query?: ProductQuery): Promise<Product[]> =>
  adapter.getProducts(query);

export const getProductBySlug = (slug: string): Promise<Product | null> =>
  adapter.getProductBySlug(slug);

export const getCollections = (): Promise<Collection[]> => adapter.getCollections();

export const getCollectionBySlug = (slug: string): Promise<Collection | null> =>
  adapter.getCollectionBySlug(slug);

export const SORT_OPTIONS: ReadonlyArray<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "newest", label: "Newest" },
];

export function isProductSort(value: string | undefined): value is ProductSort {
  return SORT_OPTIONS.some((option) => option.value === value);
}
