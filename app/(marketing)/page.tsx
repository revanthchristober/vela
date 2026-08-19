import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/commerce/Price";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { BrandStatement } from "@/components/marketing/BrandStatement";
import { Hero } from "@/components/marketing/Hero";
import { IngredientSequence } from "@/components/marketing/IngredientSequence";
import { JournalTeaser } from "@/components/marketing/JournalTeaser";
import { ReviewsRail } from "@/components/marketing/ReviewsRail";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ArrowLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ARTICLES, INGREDIENT_SEQUENCE, REVIEWS } from "@/data/editorial";
import { getProducts } from "@/lib/commerce";

export default async function HomePage() {
  const [featured, rituals, all] = await Promise.all([
    getProducts({ sort: "featured", limit: 4 }),
    getProducts({ category: "rituals" }),
    getProducts(),
  ]);

  // One aggregate, computed from the same reviewsSummary the PDPs render, so
  // the homepage number can never drift from the product pages.
  const reviewCount = all.reduce((sum, product) => sum + product.reviewsSummary.count, 0);
  const weighted = all.reduce(
    (sum, product) => sum + product.reviewsSummary.rating * product.reviewsSummary.count,
    0,
  );

  return (
    <>
      <AnnouncementBar>Free shipping on orders over ₹1,500</AnnouncementBar>

      <main id="main">
        <Hero />

        <Section size="base">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Eyebrow>Start here</Eyebrow>
              <ArrowLink href="/shop">See all nine products</ArrowLink>
            </div>
            <ProductGrid products={featured} columns="feature" className="mt-10" />
          </Container>
        </Section>

        <BrandStatement />

        <IngredientSequence steps={INGREDIENT_SEQUENCE} />

        <Section tone="canvas" size="base" className="border-t border-line">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Eyebrow>The rituals</Eyebrow>
              <p className="max-w-md text-sm text-ink-muted">
                Three sets, each a complete routine at less than the sum of its parts.
              </p>
            </div>

            <ul className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
              {rituals.map((set, index) => (
                <Reveal key={set.id} as="li" delay={index * 0.08}>
                  <Link href={`/products/${set.slug}`} className="group block">
                    <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-canvas-sunken lg:aspect-4/5">
                      {set.images[0] ? (
                        <Image
                          src={set.images[0].url}
                          alt={set.images[0].alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, 92vw"
                          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                    <h3 className="mt-4 font-display text-2xl">{set.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{set.tagline}</p>
                    <Price
                      price={set.price}
                      compareAtPrice={set.compareAtPrice}
                      className="mt-3"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        <ReviewsRail
          reviews={REVIEWS}
          rating={weighted / reviewCount}
          count={reviewCount}
        />

        <JournalTeaser articles={ARTICLES} />
      </main>
    </>
  );
}
