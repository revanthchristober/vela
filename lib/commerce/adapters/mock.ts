import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import type { Collection, Product, ProductQuery } from "@/lib/commerce/types";

/**
 * Mock commerce adapter — typed local data, no network.
 *
 * It models latency in development so that loading states are built against
 * something that actually takes time. In production the delay is zero, because
 * these functions run at build time during static generation and there is no
 * reason to make a build slower to simulate a network that isn't there.
 */

const LATENCY_MS = process.env.NODE_ENV === "development" ? 180 : 0;

function delay<T>(value: T): Promise<T> {
  if (LATENCY_MS === 0) return Promise.resolve(value);
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

const FEATURED_ORDER: readonly string[] = [
  "balance-cleanser",
  "barrier-cream",
  "recovery-oil",
  "morning-ritual",
  "hydrate-mist",
  "mineral-body-wash",
  "mineral-salt-scrub",
  "evening-ritual",
  "reset-kit",
];

function byFeatured(a: Product, b: Product): number {
  return FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug);
}

export function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = [...PRODUCTS];

  if (query.category) {
    result = result.filter((product) => product.category === query.category);
  }

  if (query.skinType && query.skinType !== "all") {
    const skinType = query.skinType;
    result = result.filter((product) => product.suitableFor.includes(skinType));
  }

  switch (query.sort) {
    case "price-asc":
      result.sort((a, b) => a.price.amount - b.price.amount);
      break;
    case "price-desc":
      result.sort((a, b) => b.price.amount - a.price.amount);
      break;
    case "newest":
      // Newest first. The catalogue is authored oldest-first, so this is a reverse.
      result.reverse();
      break;
    case "featured":
    case undefined:
      result.sort(byFeatured);
      break;
  }

  if (typeof query.limit === "number") {
    result = result.slice(0, query.limit);
  }

  return delay(result);
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return delay(PRODUCTS.find((product) => product.slug === slug) ?? null);
}

export function getCollections(): Promise<Collection[]> {
  return delay([...COLLECTIONS].sort((a, b) => a.position - b.position));
}

export function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return delay(COLLECTIONS.find((collection) => collection.slug === slug) ?? null);
}
