/**
 * Editorial content seed.
 *
 * Shaped as typed content blocks rather than as page markup, so the Sanity
 * adapter in Phase 6 can populate the same structures without a page component
 * changing (ADR-0001, §8.3). Copy is from docs/content-inventory.md.
 */

export interface IngredientStep {
  number: string;
  title: string;
  body: string;
  image: { url: string; alt: string };
}

export const INGREDIENT_SEQUENCE: readonly IngredientStep[] = [
  {
    number: "01",
    title: "Ceramide complex",
    body: "Three ceramides in roughly the ratio skin makes them — with the cholesterol they need to work. Most formulas leave that part out, which is why most barrier creams underperform their ingredient list.",
    image: {
      url: "/brand/ingredients/01.jpg",
      alt: "Ceramide cream texture spread across a glass slab",
    },
  },
  {
    number: "02",
    title: "Magnesium",
    body: "From Dead Sea brine. It is why the body wash leaves skin less reactive after a hot shower, and why the recovery oil is worth massaging in rather than smoothing on.",
    image: {
      url: "/brand/ingredients/02.jpg",
      alt: "Mineral brine pooling on a dark stone surface",
    },
  },
  {
    number: "03",
    title: "Squalane",
    body: "Olive-derived. It gives the slip that makes a cream spread without the residue that makes it grease — the difference between a moisturiser you reapply and one you finish.",
    image: {
      url: "/brand/ingredients/03.jpg",
      alt: "Squalane oil beading on skin",
    },
  },
];

export interface Review {
  quote: string;
  author: string;
  product: string;
  rating: number;
}

/** Includes the two-star review. Hiding it is the tell (docs/brand.md §3). */
export const REVIEWS: readonly Review[] = [
  {
    quote: "Doesn't pill under sunscreen, which is the only thing I actually needed.",
    author: "Aditi R.",
    product: "Barrier Cream",
    rating: 5,
  },
  {
    quote: "The mist is finer than I expected. Everything after it spreads further.",
    author: "Karthik S.",
    product: "Hydrate Mist",
    rating: 5,
  },
  {
    quote: "Smells like almost nothing, in a good way. Gone by the time I'm dressed.",
    author: "Meera J.",
    product: "Mineral Body Wash",
    rating: 4,
  },
  {
    quote:
      "Runs out too fast at the price. The refill helps but I wish the first bottle were bigger.",
    author: "Farhan A.",
    product: "Balance Cleanser",
    rating: 2,
  },
  {
    quote: "Warms for about a minute exactly like they say. I use it after long shifts.",
    author: "Priya N.",
    product: "Recovery Oil",
    rating: 5,
  },
  {
    quote: "Bought the Morning Ritual as a gift and ended up keeping it.",
    author: "Devika M.",
    product: "Morning Ritual",
    rating: 5,
  },
];

export interface Article {
  slug: string;
  title: string;
  standfirst: string;
  readingMinutes: number;
  image: { url: string; alt: string };
}

export const ARTICLES: readonly Article[] = [
  {
    slug: "why-we-print-the-whole-list",
    title: "Why we print the whole list",
    standfirst:
      "Ingredient lists moved to the back of the bottle for a reason, and the reason wasn't design.",
    readingMinutes: 4,
    image: {
      url: "/brand/journal/01.jpg",
      alt: "A bottle photographed label-forward on a warm surface",
    },
  },
  {
    slug: "what-a-barrier-actually-is",
    title: "What a barrier actually is",
    standfirst:
      "Everyone sells barrier repair. Very few explain what the barrier is made of, or why ceramides on their own do so little.",
    readingMinutes: 6,
    image: {
      url: "/brand/journal/02.jpg",
      alt: "Cream texture photographed close, showing its structure",
    },
  },
  {
    slug: "on-refills-honestly",
    title: "On refills, honestly",
    standfirst:
      "Refills are better for almost everyone. Here's the part of that sentence brands leave out.",
    readingMinutes: 3,
    image: {
      url: "/brand/journal/03.jpg",
      alt: "A refill pouch beside the bottle it fills",
    },
  },
];
