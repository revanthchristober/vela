"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

/**
 * Hero choreography — GSAP, per the §9 motion tier table.
 *
 * The headline is the LCP element on mobile and is never faded from zero
 * opacity by JavaScript: it is animated with `from`, so if the script fails,
 * is blocked, or the visitor prefers reduced motion, the text is already
 * painted. Reduced motion is checked with gsap.matchMedia, so the timeline is
 * never constructed at all for those visitors.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo, not from. A `from` tween records the element's current value
        // as its destination — and under React's render timing that value can
        // be captured *after* immediateRender has already set the start state,
        // which animates 0 → 0 and leaves the element permanently invisible.
        // Explicit endpoints cannot be misrecorded.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-eyebrow",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
        )
          .fromTo(
            ".hero-line",
            { yPercent: 108 },
            { yPercent: 0, duration: 0.9, stagger: 0.08 },
            "-=0.25",
          )
          .fromTo(
            ".hero-sub",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            "-=0.5",
          )
          .fromTo(
            ".hero-cta",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            "-=0.4",
          )
          .fromTo(
            ".hero-media",
            { opacity: 0, scale: 1.04 },
            { opacity: 1, scale: 1, duration: 1.1 },
            0.1,
          );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="border-b border-line">
      <div className="mx-auto grid max-w-page items-center gap-10 px-5 pt-12 pb-16 xs:px-6 sm:px-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:pt-24 lg:pb-28">
        <div>
          <p className="hero-eyebrow eyebrow">Nine products · Made in small batches</p>

          <h1 className="mt-6 font-display text-6xl font-light">
            {["Modern rituals,", "engineered for", "everyday life."].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-md text-lg text-ink-muted">
            A small range of skin and body care built around the two minutes you already
            spend. Short ingredient lists, printed on the front.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/shop" size="lg" className="hero-cta">
              Shop the range
            </ButtonLink>
            <ButtonLink href="/story" variant="quiet" size="lg" className="hero-cta px-0">
              How we formulate
            </ButtonLink>
          </div>
        </div>

        {/* Priority-loaded: this is the LCP element from lg upward. Below lg the
            headline paints first and this lazy-loads underneath it. */}
        <div className="hero-media relative aspect-4/5 overflow-hidden rounded-sm bg-canvas-sunken lg:aspect-4/5">
          <Image
            src="/brand/hero.jpg"
            alt="The VELA range arranged on a warm stone surface in morning light"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
