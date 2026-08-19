"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Price } from "@/components/commerce/Price";
import { Button, ButtonLink } from "@/components/ui/Button";
import { lineTotal, useCart } from "@/lib/cart/CartProvider";
import { pickUpsell, type UpsellCandidate } from "@/lib/cart/upsell";
import { formatMoney } from "@/lib/utils/format";

/**
 * The cart drawer.
 *
 * Behaviour decided in Phase 1 (docs/wireframes.md §4) rather than improvised:
 * opens on add, traps focus, closes on Esc / scrim / ×, returns focus to the
 * trigger, locks the page behind it, and never navigates.
 */
export function CartDrawer({ candidates }: { candidates: readonly UpsellCandidate[] }) {
  const { isOpen, close, lines, totals, setQuantity, removeLine, addLine } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  // Remember what opened the drawer so focus can go back there on close.
  useEffect(() => {
    if (isOpen) {
      returnFocusTo.current = document.activeElement as HTMLElement | null;
    } else {
      returnFocusTo.current?.focus?.();
    }
  }, [isOpen]);

  // Escape to close, Tab cycles inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Lock the page behind the drawer. Padding compensates for the scrollbar so
  // locking does not shift the layout underneath.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  const upsell = pickUpsell(
    candidates,
    lines.map((line) => line.productSlug),
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close bag"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/25 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.15 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-canvas shadow-sheet outline-none"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6">
              <h2 className="font-display text-xl">
                Your bag{totals.totalQuantity > 0 ? ` (${totals.totalQuantity})` : ""}
              </h2>
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex size-11 items-center justify-center text-ink-muted hover:text-ink"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
                <span className="sr-only">Close bag</span>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-6 px-5 sm:px-6">
                <p className="font-display text-2xl">Your bag is empty.</p>
                <ButtonLink href="/shop" onClick={close}>
                  Shop the range
                </ButtonLink>
                <Link
                  href="/shop/rituals"
                  onClick={close}
                  className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
                >
                  Or start with a ritual set →
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 sm:px-6">
                <ul className="divide-y divide-line">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4 py-5">
                      <Link
                        href={`/products/${line.productSlug}`}
                        onClick={close}
                        className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-canvas-sunken"
                      >
                        <Image
                          src={line.image.url}
                          alt={line.image.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/products/${line.productSlug}`}
                              onClick={close}
                              className="block truncate font-display text-base hover:underline hover:underline-offset-4"
                            >
                              {line.productTitle}
                            </Link>
                            <p className="text-xs text-ink-subtle">{line.variantTitle}</p>
                          </div>
                          <Price price={lineTotal(line)} size="sm" />
                        </div>

                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center rounded-sm border border-line">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.id, line.quantity - 1)}
                              disabled={line.quantity <= 1}
                              className="flex size-9 items-center justify-center text-ink-muted disabled:opacity-35"
                            >
                              <span aria-hidden="true">−</span>
                              <span className="sr-only">
                                Decrease quantity of {line.productTitle}
                              </span>
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.id, line.quantity + 1)}
                              className="flex size-9 items-center justify-center text-ink-muted hover:text-ink"
                            >
                              <span aria-hidden="true">+</span>
                              <span className="sr-only">
                                Increase quantity of {line.productTitle}
                              </span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeLine(line.id)}
                            className="text-xs text-ink-subtle underline underline-offset-4 hover:text-ink"
                          >
                            Remove
                            <span className="sr-only"> {line.productTitle}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {upsell ? (
                  <div className="border-t border-line py-6">
                    <p className="mb-4 eyebrow">Add to your ritual</p>
                    <div className="flex items-center gap-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-canvas-sunken">
                        <Image
                          src={upsell.image.url}
                          alt={upsell.image.alt}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-base">{upsell.title}</p>
                        <Price price={upsell.price} size="sm" />
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          addLine({
                            id: `${upsell.slug}:${upsell.variantId}`,
                            productSlug: upsell.slug,
                            productTitle: upsell.title,
                            variantId: upsell.variantId,
                            variantTitle: upsell.variantTitle,
                            unitPrice: upsell.price,
                            compareAtUnitPrice: null,
                            image: upsell.image,
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {lines.length > 0 ? (
              <footer className="border-t border-line px-5 py-5 sm:px-6">
                {totals.toFreeShipping ? (
                  <div className="mb-4">
                    <p className="mb-2 text-xs text-ink-muted">
                      {formatMoney(totals.toFreeShipping)} more for free shipping
                    </p>
                    <div
                      className="h-1 overflow-hidden rounded-full bg-line"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out-soft"
                        style={{
                          width: `${Math.min(
                            100,
                            (totals.subtotal.amount /
                              (totals.subtotal.amount + totals.toFreeShipping.amount)) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mb-4 text-xs text-moss">
                    Free shipping — you&rsquo;re there
                  </p>
                )}

                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Subtotal</dt>
                    <dd className="tabular-nums">{formatMoney(totals.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Shipping</dt>
                    <dd className="tabular-nums">
                      {totals.shipping.amount === 0
                        ? "Free"
                        : formatMoney(totals.shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2 font-medium">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatMoney(totals.total)}</dd>
                  </div>
                </dl>

                <Button fullWidth size="lg" className="mt-5">
                  Checkout
                </Button>
                <p className="mt-3 text-center text-xs text-ink-subtle">
                  Shipping and taxes calculated at checkout
                </p>
              </footer>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
