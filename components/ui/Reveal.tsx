"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * The site's one scroll reveal.
 *
 * Deliberately *not* built on a `whileInView` prop. Those render the hidden
 * state on the server, so anything that never fires an IntersectionObserver —
 * JavaScript disabled, a print stylesheet, a crawler that snapshots without
 * scrolling, a full-page screenshot — gets a page of invisible sections. That
 * is a content bug wearing an animation costume.
 *
 * Here the markup ships visible. JavaScript *adds* the hidden state on mount,
 * and only to elements that are below the fold at that moment, then removes it
 * when they scroll in. Every failure mode — no JS, no IntersectionObserver,
 * reduced motion, already in view — degrades to "content is simply there".
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Seconds. Used to stagger siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Already visible when we mount: leave it alone rather than hide and
    // re-show, which would read as a flicker on first paint.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset["reveal"] = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // `isIntersecting` alone is not enough. IntersectionObserver reports
          // the element's state at *delivery* time, so a fast scroll past a
          // section can deliver a record that already reads false — and the
          // section would stay invisible for the rest of the session. Treating
          // "its top is above the fold" as shown covers the scrolled-past case.
          const scrolledPast = entry.boundingClientRect.top < window.innerHeight;
          if (!entry.isIntersecting && !scrolledPast) continue;
          el.dataset["reveal"] = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      style={
        delay ? ({ transitionDelay: `${delay}s` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
