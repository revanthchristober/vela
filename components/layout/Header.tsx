"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CartButton } from "@/components/layout/CartButton";
import type { Collection } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "/story", label: "Story" },
  { href: "/journal", label: "Journal" },
] as const;

/**
 * Keyed by pathname so that navigating closes the mobile sheet and the shop
 * panel by remounting, rather than by an effect that resets state after the
 * route has already changed. One less render, and no way for the two to
 * disagree.
 */
export function Header({ collections }: { collections: readonly Collection[] }) {
  const pathname = usePathname();
  return <HeaderInner key={pathname} collections={collections} pathname={pathname} />;
}

function HeaderInner({
  collections,
  pathname,
}: {
  collections: readonly Collection[];
  pathname: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,height] duration-300 ease-out-soft",
        scrolled
          ? "border-line bg-canvas/88 backdrop-blur-md"
          : "border-transparent bg-canvas",
      )}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-5 xs:px-6 sm:px-10 lg:h-20 lg:px-16">
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          aria-label="VELA, home"
        >
          VELA
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((value) => !value)}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink hover:text-accent"
            >
              Shop
              <span aria-hidden="true" className="text-2xs">
                ▾
              </span>
            </button>

            <AnimatePresence>
              {shopOpen ? (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-0 w-80 rounded-md border border-line bg-canvas-raised p-2 shadow-sheet"
                >
                  <ul>
                    {collections.map((collection) => (
                      <li key={collection.slug}>
                        <Link
                          href={`/shop/${collection.slug}`}
                          className="block rounded-sm px-3 py-3 hover:bg-canvas-sunken"
                        >
                          <span className="block text-sm text-ink">
                            {collection.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-subtle">
                            {collection.description.split(".")[0]}.
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-line pt-1">
                      <Link
                        href="/shop"
                        className="block rounded-sm px-3 py-3 text-sm text-ink hover:bg-canvas-sunken"
                      >
                        All nine products
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex min-h-11 items-center text-sm hover:text-accent",
                pathname.startsWith(link.href) ? "text-accent" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CartButton />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="-mr-2 flex size-11 items-center justify-center lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 bg-ink transition-transform duration-200 ease-out-soft",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 bg-ink transition-transform duration-200 ease-out-soft",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile sheet — full height, Shop expands in place */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas px-5 pt-4 pb-16 xs:px-6 sm:px-10 lg:hidden"
          >
            <ul className="divide-y divide-line">
              <li className="py-2">
                <span className="block py-3 eyebrow">Shop</span>
                <ul className="pb-2">
                  {collections.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={`/shop/${collection.slug}`}
                        className="flex min-h-12 items-center font-display text-2xl"
                      >
                        {collection.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/shop"
                      className="flex min-h-12 items-center text-sm text-ink-muted underline underline-offset-4"
                    >
                      All nine products
                    </Link>
                  </li>
                </ul>
              </li>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-14 items-center font-display text-2xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
