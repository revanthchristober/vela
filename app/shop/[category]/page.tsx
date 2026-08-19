import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionView } from "@/components/commerce/CollectionView";
import {
  getCollectionBySlug,
  getCollections,
  getProducts,
  isProductSort,
} from "@/lib/commerce";
import type { CategorySlug } from "@/lib/commerce/types";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ category: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const collection = await getCollectionBySlug(category);
  if (!collection) return { title: "Not found" };

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/shop/${collection.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const [{ category }, { sort: rawSort }] = await Promise.all([params, searchParams]);
  const collection = await getCollectionBySlug(category);

  // An unknown slug is a 404, never an empty grid.
  if (!collection) notFound();

  const sort = isProductSort(rawSort) ? rawSort : "featured";
  const [products, collections] = await Promise.all([
    getProducts({ category: collection.slug as CategorySlug, sort }),
    getCollections(),
  ]);

  return (
    <CollectionView
      title={collection.title}
      description={collection.description}
      products={products}
      collections={collections}
      activeSlug={collection.slug}
      sort={sort}
    />
  );
}
