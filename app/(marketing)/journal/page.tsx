import type { Metadata } from "next";
import Image from "next/image";

import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ARTICLES } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Journal",
  description: "Short essays on formulation, barriers and refills.",
  alternates: { canonical: "/journal" },
};

/**
 * Index only. Article detail pages are Optional in the scope table (§2) and are
 * not built, so nothing here links to a route that does not exist — the cards
 * carry their standfirst instead of promising a page behind them.
 */
export default function JournalPage() {
  return (
    <main id="main">
      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Eyebrow>Journal</Eyebrow>
        <h1 className="mt-6 max-w-2xl font-display text-5xl font-light text-balance">
          Short essays on formulation, barriers and refills.
        </h1>
        <p className="mt-6 max-w-xl text-ink-muted">
          Three pieces, written for people who read ingredient lists. Full articles are in
          production — the standfirst is the whole argument in one sentence.
        </p>

        <ul className="mt-16 space-y-16 sm:space-y-20">
          {ARTICLES.map((article, index) => (
            <Reveal key={article.slug} as="li" delay={index * 0.05}>
              <article className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-center sm:gap-12">
                <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-canvas-sunken">
                  <Image
                    src={article.image.url}
                    alt={article.image.alt}
                    fill
                    sizes="(min-width: 640px) 44vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow">
                    {article.readingMinutes} min read · In production
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-balance">
                    {article.title}
                  </h2>
                  <p className="mt-4 max-w-md text-ink-muted">{article.standfirst}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </main>
  );
}
