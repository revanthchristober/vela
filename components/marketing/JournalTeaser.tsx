import Image from "next/image";

import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { Article } from "@/data/editorial";

/**
 * Article detail pages are out of MVP scope (§2, Optional). The cards therefore
 * link to the journal index rather than to a 404 — a card that goes nowhere is
 * the failure the acceptance criteria for /journal name explicitly.
 */
export function JournalTeaser({ articles }: { articles: readonly Article[] }) {
  return (
    <Section tone="canvas" size="base" className="border-t border-line">
      <Container>
        <Eyebrow className="mb-10">From the journal</Eyebrow>

        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {articles.map((article, index) => (
            <Reveal key={article.slug} as="li" delay={index * 0.08}>
              <article>
                <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-canvas-sunken">
                  <Image
                    src={article.image.url}
                    alt={article.image.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 eyebrow">{article.readingMinutes} min read</p>
                <h3 className="mt-2 font-display text-xl leading-tight text-balance">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{article.standfirst}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
