import type { Money } from "@/lib/utils/format";

/**
 * VELA domain model.
 *
 * These types are the contract every UI component codes against. No adapter
 * shape — no Shopify `edges`/`node` wrapper, no Sanity `_ref` — is allowed
 * past this file. Adapters map into these types at the boundary.
 *
 * See ADR-0001.
 */

export type CategorySlug = "daily-care" | "body-care" | "rituals";

export type SkinType = "all" | "dry" | "oily" | "combination" | "sensitive";

export interface ProductImage {
  /** Path under /public, or an absolute adapter-provided URL. */
  url: string;
  /** Required. An empty alt is only ever correct for decorative imagery. */
  alt: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  /** Shown in the selector: "50 ml", "100 ml refill". */
  title: string;
  /** Volume in millilitres, used for the per-ml comparison on the PDP. */
  volumeMl: number;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  sku: string;
}

export interface Ingredient {
  name: string;
  /** Latin / INCI name, printed on the bottle. */
  inci: string;
  /** What it is there to do. One clause, no adjectives doing sales work. */
  role: string;
  /** Stated only where the number is meaningful. */
  concentration?: string;
}

export interface ReviewsSummary {
  /** 0–5, one decimal. */
  rating: number;
  count: number;
  /** Distribution from 1 to 5 stars. Two-star reviews are shown, not hidden. */
  distribution: readonly [number, number, number, number, number];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  /** One line under the title on the card and the PDP. */
  tagline: string;
  /** Two to four sentences. Texture first, then use, then who it suits. */
  description: string;
  /** What it feels like through the day — the question reviews always ask. */
  howItWears: string;
  /** Named honestly. Buys the right to be believed everywhere else. */
  notFor: string;
  category: CategorySlug;
  price: Money;
  compareAtPrice: Money | null;
  images: readonly ProductImage[];
  variants: readonly ProductVariant[];
  ingredients: readonly Ingredient[];
  benefits: readonly string[];
  suitableFor: readonly SkinType[];
  tags: readonly string[];
  reviewsSummary: ReviewsSummary;
  /** Slugs of one or two products this genuinely pairs with. Not an upsell dump. */
  pairsWith: readonly string[];
  /** Sets only: the slugs this set contains. */
  contains?: readonly string[];
}

export interface Collection {
  id: string;
  slug: CategorySlug;
  title: string;
  description: string;
  /** Sort order on /shop. */
  position: number;
}

// Cart shape lives in `lib/cart/types.ts`, not here — see ADR-0001's amendment
// and ADR-0005. This file stays the read-only commerce/catalogue contract.

export type ProductSort = "featured" | "price-asc" | "price-desc" | "newest";

export interface ProductQuery {
  category?: CategorySlug;
  sort?: ProductSort;
  skinType?: SkinType;
  limit?: number;
}
