import { getProducts } from "@/lib/commerce";
import type { Money } from "@/lib/utils/format";

/**
 * A minimal, serialisable product shape for the cart upsell.
 *
 * The drawer is a client component. Passing whole Product objects across the
 * boundary would ship every ingredient list and review distribution into the
 * bundle to render one card.
 */
export interface UpsellCandidate {
  slug: string;
  title: string;
  tagline: string;
  price: Money;
  variantId: string;
  variantTitle: string;
  image: { url: string; alt: string };
  /** Slugs this product pairs with — used to prefer a relevant suggestion. */
  pairsWith: readonly string[];
}

export async function getUpsellCandidates(): Promise<UpsellCandidate[]> {
  const products = await getProducts();

  return products.flatMap((product) => {
    const variant = product.variants.find((candidate) => candidate.availableForSale);
    const image = product.images[0];
    if (!variant || !image) return [];

    return [
      {
        slug: product.slug,
        title: product.title,
        tagline: product.tagline,
        price: variant.price,
        variantId: variant.id,
        variantTitle: variant.title,
        image: { url: image.url, alt: image.alt },
        pairsWith: product.pairsWith,
      },
    ];
  });
}

/**
 * Pick at most one suggestion: something already paired with what is in the
 * bag, never something already in it. One card, or none — a cart that lists
 * five more things to buy reads as a shop, not a bag.
 */
export function pickUpsell(
  candidates: readonly UpsellCandidate[],
  inCartSlugs: readonly string[],
): UpsellCandidate | null {
  if (inCartSlugs.length === 0) return null;

  const available = candidates.filter(
    (candidate) => !inCartSlugs.includes(candidate.slug),
  );
  if (available.length === 0) return null;

  const paired = available.find((candidate) =>
    candidate.pairsWith.some((slug) => inCartSlugs.includes(slug)),
  );
  const partnerOfCart = available.find((candidate) =>
    inCartSlugs.some((slug) =>
      candidates.find((c) => c.slug === slug)?.pairsWith.includes(candidate.slug),
    ),
  );

  return paired ?? partnerOfCart ?? null;
}
