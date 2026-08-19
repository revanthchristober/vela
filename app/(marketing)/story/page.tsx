import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getCollections } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Why VELA is nine products, how each one is formulated, and what we leave out.",
  alternates: { canonical: "/story" },
};

const FAQS = [
  {
    q: "Will it suit my skin?",
    a: "Every product page lists who it is not for, and the full ingredient list with the role of each ingredient. If you react to something specific, the list is on the page rather than behind a support ticket. The Barrier Cream is the only product heavy enough to be a poor fit in humid weather.",
  },
  {
    q: "Why only nine products?",
    a: "Because ranges grow when growth is easy, not when the customer needs it. Nine covers a full morning, a full evening and a full body routine. Anything we add from here replaces something rather than sitting alongside it.",
  },
  {
    q: "Is anything tested on animals?",
    a: "No. Nothing is tested on animals at any stage, and no supplier we work with does so on our behalf.",
  },
  {
    q: "How long does a bottle last?",
    a: "The cleanser is about two months at twice a day. The Barrier Cream is closer to three, because it spreads much further than the first scoop suggests. The salt scrub is roughly three months at twice a week.",
  },
  {
    q: "What is the batch date on the base?",
    a: "The day it was made, not the day it was packed. Small batches mean the two are usually within a week of each other, and we would rather print the honest one.",
  },
  {
    q: "Do you ship outside India?",
    a: "Not yet. Prices are in rupees and shipping is domestic. VELA is a concept brand, so in practice nothing ships at all.",
  },
] as const;

export default async function StoryPage() {
  const collections = await getCollections();

  return (
    <main id="main">
      <Container className="pt-16 pb-16 sm:pt-24">
        <Eyebrow>Story</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-light text-balance lg:text-6xl">
          Most skincare is either clinical or vague.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-muted">
          Clinical brands lead with percentages and pipettes; they are trusted and
          joyless. Lifestyle brands lead with mood and marble; they are beautiful and
          vague, and you quietly suspect you are paying for the photography. VELA is an
          attempt at the middle: the calm of one, the specificity of the other.
        </p>
      </Container>

      <Container className="pb-20">
        <div className="relative aspect-16/9 overflow-hidden rounded-sm bg-canvas-sunken">
          <Image
            src="/brand/story-01.jpg"
            alt="The VELA range laid out on a workbench during formulation"
            fill
            sizes="92vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Section id="why-nine" tone="sunken" size="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow className="mb-4">Why nine</Eyebrow>
              <h2 className="font-display text-3xl font-light text-balance">
                A range, not a catalogue.
              </h2>
            </div>
            <div className="max-w-xl space-y-5 text-ink-muted">
              <p>
                Nine products cover a complete morning, a complete evening and a complete
                body routine. That is the whole brief. There is no tenth product waiting
                for a quarter that needs a launch.
              </p>
              <p>
                The practical effect is that we can afford to make each one properly. A
                range of forty needs contract manufacturing and a marketing calendar; a
                range of nine needs a formulator and a decision about what to leave out.
              </p>
              <ul className="flex flex-wrap gap-3 pt-2">
                {collections.map((collection) => (
                  <li key={collection.slug}>
                    <ButtonLink
                      href={`/shop/${collection.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      {collection.title}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="ingredients" size="base" className="border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow className="mb-4">How we formulate</Eyebrow>
              <h2 className="font-display text-3xl font-light text-balance">
                Short lists, printed on the front.
              </h2>
              <div className="mt-6 max-w-lg space-y-5 text-ink-muted">
                <p>
                  Six to nine ingredients per product, all of them on the front label.
                  Concentrations are stated where the number means something — 2%
                  ceramides, 5% squalane, 0.5% ginger root — and left off where it would
                  be theatre.
                </p>
                <p>
                  What we leave out: fragrance in anything for the face, denatured alcohol
                  in anything that stays on the skin, and any ingredient whose only job is
                  to make the texture photograph well.
                </p>
                <p>
                  We do not use the word &ldquo;clean&rdquo;. It is a marketing category,
                  not a safety standard, and it works by making people frightened of
                  chemistry.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-canvas-sunken">
                <Image
                  src="/brand/story-02.jpg"
                  alt="A close crop of an ingredient list printed on a label"
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="refills" tone="sunken" size="base">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow className="mb-4">Refills</Eyebrow>
            <h2 className="font-display text-3xl font-light text-balance">
              The first bottle is the only one you buy twice.
            </h2>
            <p className="mt-6 text-ink-muted">
              Every liquid product has a refill, and every refill is around 15% cheaper
              per millilitre. The bottle is glass and the pump is designed to be moved
              across, which is the only reason a refill is worth anything.
            </p>
            <ArrowLink href="/journal" className="mt-6">
              Read the honest version in the journal
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section id="shipping" size="base" className="border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow className="mb-4">Shipping &amp; returns</Eyebrow>
              <ul className="space-y-4 text-ink-muted">
                <li>
                  <span className="text-ink">Free over ₹1,500.</span> ₹99 below it. Two to
                  four working days across India.
                </li>
                <li>
                  <span className="text-ink">Thirty days to return anything.</span> Opened
                  is fine — you cannot tell whether a cream suits you without opening it.
                </li>
                <li>
                  <span className="text-ink">Refunds go back to the original method</span>{" "}
                  within a week of the parcel reaching us.
                </li>
              </ul>
            </div>

            <div id="faq">
              <Eyebrow className="mb-4">Questions</Eyebrow>
              <div>
                {FAQS.map((faq, index) => (
                  <Accordion key={faq.q} title={faq.q} defaultOpen={index === 0}>
                    {faq.a}
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="contact" tone="ink" size="tight">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow className="mb-4 text-ink-inverse/60">Contact</Eyebrow>
              <p className="max-w-md font-display text-3xl text-balance">
                One address, and a real response time.
              </p>
              <p className="mt-4 text-sm text-ink-inverse/70">
                hello@vela.example · we answer within two working days.
                <br />
                VELA is a fictional brand, so that address is illustrative.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm text-ink-inverse underline underline-offset-4"
            >
              Shop the range →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
