import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import type { Collection } from "@/lib/commerce/types";

/**
 * Every link here resolves. The "Help" column points at anchored sections on
 * /story rather than at stub pages — a footer link that 404s is worse than a
 * footer link that does not exist (acceptance criteria §0).
 */
const COLUMNS = [
  {
    title: "Learn",
    links: [
      { href: "/story", label: "Story" },
      { href: "/journal", label: "Journal" },
      { href: "/story#ingredients", label: "Ingredients" },
      { href: "/story#refills", label: "Refills" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/story#shipping", label: "Shipping & returns" },
      { href: "/story#faq", label: "Questions" },
      { href: "/story#contact", label: "Contact" },
    ],
  },
  {
    title: "VELA",
    links: [
      { href: "/styleguide", label: "Design tokens" },
      { href: "https://github.com/revanthchristober/vela", label: "Source on GitHub" },
    ],
  },
] as const;

export function Footer({ collections }: { collections: readonly Collection[] }) {
  return (
    <footer className="border-t border-line bg-canvas-sunken">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="max-w-sm font-display text-2xl text-balance">
              Modern rituals, engineered for everyday life.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h2 className="mb-4 eyebrow">Shop</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/shop" className="text-ink-muted hover:text-ink">
                    All products
                  </Link>
                </li>
                {collections.map((collection) => (
                  <li key={collection.slug}>
                    <Link
                      href={`/shop/${collection.slug}`}
                      className="text-ink-muted hover:text-ink"
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 eyebrow">{column.title}</h2>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-ink-muted hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VELA · A self-initiated concept project</p>
          <p>VELA is a fictional brand. Nothing here is for sale.</p>
        </div>
      </Container>
    </footer>
  );
}
