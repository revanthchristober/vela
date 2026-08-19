import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BuyBox } from "@/components/commerce/BuyBox";
import { Breadcrumb } from "@/components/commerce/CollectionView";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { RatingDistribution } from "@/components/commerce/Rating";
import { Accordion } from "@/components/ui/Accordion";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { REVIEWS } from "@/data/editorial";
import { getCollectionBySlug, getProductBySlug, getProducts } from "@/lib/commerce";
import type { Product } from "@/lib/commerce/types";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  const firstSentence = `${product.description.split(". ")[0]}.`;

  return {
    title: product.title,
    description: `${product.tagline}. ${firstSentence}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} — VELA`,
      description: product.tagline,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

/** Price, availability and rating are read from the same product object the
 *  page renders — there is no second, more flattering set of numbers. */
function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((image) => `${SITE_URL}${image.url}`),
    brand: { "@type": "Brand", name: "VELA" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviewsSummary.rating,
      reviewCount: product.reviewsSummary.count,
    },
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      name: variant.title,
      price: (variant.price.amount / 100).toFixed(2),
      priceCurrency: variant.price.currencyCode,
      availability: variant.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.slug}`,
    })),
  };
}

function breadcrumbJsonLd(product: Product, collectionTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: collectionTitle,
        item: `${SITE_URL}/shop/${product.category}`,
      },
      { "@type": "ListItem", position: 4, name: product.title },
    ],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [collection, allProducts] = await Promise.all([
    getCollectionBySlug(product.category),
    getProducts(),
  ]);

  const pairs = product.pairsWith
    .map((pairSlug) => allProducts.find((candidate) => candidate.slug === pairSlug))
    .filter((candidate): candidate is Product => Boolean(candidate));

  const contains = (product.contains ?? [])
    .map((childSlug) => allProducts.find((candidate) => candidate.slug === childSlug))
    .filter((candidate): candidate is Product => Boolean(candidate));

  const reviews = REVIEWS.filter((review) => review.product === product.title);

  return (
    <main id="main" className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(product, collection?.title ?? "Shop")),
        }}
      />

      <Container className="pt-8 sm:pt-10">
        <Breadcrumb
          trail={[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            ...(collection
              ? [{ href: `/shop/${collection.slug}`, label: collection.title }]
              : []),
            { label: product.title },
          ]}
        />
      </Container>

      <Container className="mt-6 grid gap-10 pb-16 lg:mt-10 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <ProductGallery images={product.images} />
        <div>
          <BuyBox product={product} />
        </div>
      </Container>

      {/* Detail accordions — the PDP stays short and the depth is one tap away */}
      <Container className="pb-20">
        <div className="max-w-2xl">
          <h2 className="sr-only">Product details</h2>
          <Accordion title="How it wears" defaultOpen>
            {product.howItWears}
          </Accordion>
          <Accordion title="Not for">{product.notFor}</Accordion>
          {contains.length > 0 ? (
            <Accordion title="What's in the set" meta={`(${contains.length})`}>
              <ul className="space-y-2">
                {contains.map((item) => (
                  <li key={item.id}>
                    <span className="text-ink">{item.title}</span> — {item.tagline}
                  </li>
                ))}
              </ul>
            </Accordion>
          ) : null}
          <Accordion title="Shipping & returns">
            Free shipping over ₹1,500, ₹99 below it. Thirty days to return anything,
            opened is fine. Refunds go back to the original payment method within a week
            of the parcel reaching us.
          </Accordion>
        </div>
      </Container>

      {product.ingredients.length > 0 ? (
        <Section tone="sunken" size="base">
          <Container>
            <Eyebrow className="mb-3">
              Every ingredient, and what it&rsquo;s doing
            </Eyebrow>
            <h2 className="max-w-xl font-display text-3xl font-light text-balance">
              {product.ingredients.length} ingredients. All {product.ingredients.length}{" "}
              are on the front of the bottle.
            </h2>

            <dl className="mt-10 max-w-3xl divide-y divide-line border-t border-line">
              {product.ingredients.map((ingredient) => (
                <div
                  key={ingredient.inci}
                  className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <dt>
                    <span className="block text-ink">{ingredient.name}</span>
                    <span className="block text-xs text-ink-subtle italic">
                      {ingredient.inci}
                    </span>
                    {ingredient.concentration ? (
                      <span className="mt-1 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-2xs tracking-eyebrow text-accent uppercase">
                        {ingredient.concentration}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="text-sm text-ink-muted">{ingredient.role}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      ) : null}

      {/* Honesty block — not hidden behind an interaction on mobile */}
      <Section size="base" className="border-t border-line">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-canvas-sunken">
              {product.images[1] ? (
                <Image
                  src={product.images[1].url}
                  alt={product.images[1].alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div>
              <Eyebrow className="mb-4">Not for</Eyebrow>
              <p className="font-display text-3xl leading-snug text-balance">
                {product.notFor}
              </p>
              <p className="mt-6 max-w-md text-sm text-ink-muted">
                Every VELA product says who it is not for. It is the cheapest way we know
                to be believed about everything else.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" size="base" className="border-t border-line">
        <Container>
          <Eyebrow className="mb-8">What people say</Eyebrow>
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
            <div>
              <p className="font-display text-5xl">
                {product.reviewsSummary.rating.toFixed(1)}
                <span className="ml-2 text-2xl text-accent">★</span>
              </p>
              <p className="mt-2 mb-6 text-sm text-ink-subtle tabular-nums">
                {product.reviewsSummary.count} reviews
              </p>
              <RatingDistribution summary={product.reviewsSummary} />
            </div>

            {reviews.length > 0 ? (
              <ul className="space-y-6">
                {reviews.map((review) => (
                  <li key={review.author} className="border-b border-line pb-6">
                    <p aria-hidden="true" className="text-sm text-accent">
                      {"★".repeat(review.rating)}
                      <span className="text-line-strong">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </p>
                    <p className="mt-3 font-display text-xl leading-snug text-balance">
                      “{review.quote}”
                    </p>
                    <p className="mt-3 text-xs text-ink-subtle">{review.author}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-md text-sm text-ink-muted">
                Individual reviews for this product are not published yet. The rating and
                distribution above are the full set we hold — including the low ones.
              </p>
            )}
          </div>
        </Container>
      </Section>

      {pairs.length > 0 ? (
        <Section tone="sunken" size="base">
          <Container>
            <Eyebrow className="mb-3">Pairs with</Eyebrow>
            <p className="mb-10 max-w-md text-sm text-ink-muted">
              Two products, chosen because they work with this one. Not a list of
              everything else we sell.
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:w-2/3">
              {pairs.map((pair) => (
                <li key={pair.id}>
                  <ProductCard product={pair} sizes="(min-width: 1024px) 30vw, 46vw" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
