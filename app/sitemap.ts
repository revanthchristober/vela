import type { MetadataRoute } from "next";

import { getCollections, getProducts } from "@/lib/commerce";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000";

/**
 * Generated from the same catalogue the pages render from, so the sitemap
 * cannot drift from what actually exists (docs/information-architecture.md §8).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    ...collections.map((collection) => ({
      url: `${SITE_URL}/shop/${collection.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/journal`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
