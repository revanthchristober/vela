"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { ProductImage } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

/**
 * Desktop: images stack and scroll past the sticky buy box.
 * Mobile: a native scroll-snap carousel with dots — no JS animation, so it is
 * momentum-scrollable, keyboard-navigable and free of a gesture library.
 *
 * The first image is `priority` because it is the LCP element on the PDP at
 * every width.
 */
export function ProductGallery({ images }: { images: readonly ProductImage[] }) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);

  return (
    <div>
      {/* Mobile carousel */}
      <div className="lg:hidden">
        <ul
          ref={railRef}
          onScroll={(event) => {
            const rail = event.currentTarget;
            setActive(Math.round(rail.scrollLeft / rail.clientWidth));
          }}
          className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto"
        >
          {images.map((image, index) => (
            <li key={image.url} className="w-full shrink-0 snap-start">
              <div className="relative aspect-4/5 bg-canvas-sunken">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {images.length > 1 ? (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === active}
                onClick={() => {
                  const rail = railRef.current;
                  if (!rail) return;
                  rail.scrollTo({ left: index * rail.clientWidth, behavior: "smooth" });
                }}
                className="flex size-11 items-center justify-center"
              >
                <span
                  className={cn(
                    "block size-1.5 rounded-full transition-colors",
                    index === active ? "bg-ink" : "bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Desktop stack */}
      <ul className="hidden gap-4 lg:grid">
        {images.map((image, index) => (
          <li key={image.url}>
            <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-canvas-sunken">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
