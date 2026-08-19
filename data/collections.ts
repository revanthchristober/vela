import type { Collection } from "@/lib/commerce/types";

export const COLLECTIONS: readonly Collection[] = [
  {
    id: "col_daily",
    slug: "daily-care",
    title: "Daily care",
    description:
      "The two minutes you already spend. A cleanser, a mist and a cream that work in that order and nowhere else.",
    position: 1,
  },
  {
    id: "col_body",
    slug: "body-care",
    title: "Body care",
    description:
      "Everything below the jaw, which most ranges treat as an afterthought. Larger formats, because you use more of it.",
    position: 2,
  },
  {
    id: "col_rituals",
    slug: "rituals",
    title: "Rituals",
    description:
      "Three sets, each a complete routine at a lower price than its parts. The obvious place to start.",
    position: 3,
  },
] as const;

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}
