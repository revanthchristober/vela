"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * A disclosure. Real <button aria-expanded>, real region, keyboard operable.
 *
 * Height animation is the one place the site animates a layout property, and
 * only because `height: auto` has no CSS equivalent. It is skipped entirely
 * under reduced motion.
 */
export function Accordion({
  title,
  meta,
  defaultOpen = false,
  children,
}: {
  title: string;
  meta?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-sans text-sm font-medium text-ink"
        >
          <span className="flex items-baseline gap-2">
            {title}
            {meta ? <span className="text-ink-subtle">{meta}</span> : null}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 text-lg leading-none text-ink-subtle transition-transform duration-200 ease-out-soft",
              open && "rotate-45",
            )}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed text-ink-muted">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
