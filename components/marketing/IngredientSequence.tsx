"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { Container, Eyebrow } from "@/components/ui/Container";
import type { IngredientStep } from "@/data/editorial";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll storytelling — the one pinned sequence on the site (§9, tier 2).
 *
 * Desktop: the media column pins while the text column scrolls past it, and the
 * image cross-fades at each step. Below lg the pin is dropped entirely and the
 * steps become stacked image + text blocks — a pin on a 360px screen costs more
 * than it gives, and §9 asks for lighter motion on mobile.
 *
 * All markup is present and readable with no JavaScript. GSAP only changes
 * opacity and position of things that are already there.
 */
export function IngredientSequence({ steps }: { steps: readonly IngredientStep[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const media = root.current?.querySelectorAll<HTMLElement>(".seq-media");
        const texts = root.current?.querySelectorAll<HTMLElement>(".seq-step");
        if (!media || !texts) return;

        gsap.set(Array.from(media).slice(1), { autoAlpha: 0 });
        gsap.set(Array.from(texts).slice(1), { opacity: 0.28 });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".seq-pin",
          pinSpacing: false,
        });

        texts.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 62%",
            end: "bottom 62%",
            onToggle: ({ isActive }) => {
              if (!isActive) return;
              gsap.to(texts, { opacity: 0.28, duration: 0.4, overwrite: true });
              gsap.to(step, { opacity: 1, duration: 0.4, overwrite: true });
              gsap.to(media, { autoAlpha: 0, duration: 0.5, overwrite: true });
              gsap.to(media[index] as HTMLElement, {
                autoAlpha: 1,
                duration: 0.5,
                overwrite: true,
              });
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="border-t border-line bg-canvas-sunken py-20 sm:py-28">
      <Container>
        <h2 className="sr-only">What is in them</h2>
        <Eyebrow className="mb-10">What is in them</Eyebrow>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Media column — pinned from lg, inline below it */}
          <div className="seq-pin hidden lg:block lg:h-[70vh]">
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-canvas">
              {steps.map((step) => (
                <Image
                  key={step.number}
                  src={step.image.url}
                  alt={step.image.alt}
                  fill
                  sizes="46vw"
                  className="seq-media object-cover"
                />
              ))}
            </div>
          </div>

          <ol className="space-y-16 lg:space-y-[34vh] lg:py-[18vh]">
            {steps.map((step) => (
              <li key={step.number} className="seq-step">
                <div className="relative mb-6 aspect-4/5 overflow-hidden rounded-sm bg-canvas lg:hidden">
                  <Image
                    src={step.image.url}
                    alt={step.image.alt}
                    fill
                    sizes="92vw"
                    className="object-cover"
                  />
                </div>
                <p className="mb-3 eyebrow">
                  {step.number} · {step.title}
                </p>
                <h3 className="font-display text-3xl text-balance">{step.title}</h3>
                <p className="mt-4 max-w-md text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
