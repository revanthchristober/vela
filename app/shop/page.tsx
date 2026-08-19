import type { Metadata } from "next";

import { CollectionView } from "@/components/commerce/CollectionView";
import { getCollections, getProducts, isProductSort } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Nine products across daily care, body care and rituals. Every ingredient printed on the front.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort: rawSort } = await searchParams;
  const sort = isProductSort(rawSort) ? rawSort : "featured";

  const [products, collections] = await Promise.all([
    getProducts({ sort }),
    getCollections(),
  ]);

  return (
    <CollectionView
      title="All products"
      description="Nine products, three collections. Each one replaces something rather than adding to it."
      products={products}
      collections={collections}
      sort={sort}
    />
  );
}
