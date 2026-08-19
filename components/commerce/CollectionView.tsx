import Link from "next/link";

import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SortSelect } from "@/components/commerce/SortSelect";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Collection, Product, ProductSort } from "@/lib/commerce/types";
import { cn } from "@/lib/utils/cn";

export function Breadcrumb({
  trail,
}: {
  trail: ReadonlyArray<{ href?: string; label: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden="true">›</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-muted">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CollectionView({
  title,
  description,
  products,
  collections,
  activeSlug,
  sort,
}: {
  title: string;
  description: string;
  products: readonly Product[];
  collections: readonly Collection[];
  /** undefined on /shop — the "All" tab is active. */
  activeSlug?: string;
  sort: ProductSort;
}) {
  return (
    <main id="main">
      <Container className="pt-8 pb-20 sm:pt-10 sm:pb-28">
        <Breadcrumb
          trail={[
            { href: "/", label: "Home" },
            activeSlug ? { href: "/shop", label: "Shop" } : { label: "Shop" },
            ...(activeSlug ? [{ label: title }] : []),
          ]}
        />

        <header className="mt-6 max-w-2xl">
          <h1 className="font-display text-5xl font-light text-balance">{title}</h1>
          <p className="mt-5 text-lg text-ink-muted">{description}</p>
        </header>

        {/* Sibling tabs — horizontally scrollable at 360, inline from sm */}
        <div className="mt-12 border-b border-line pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ul className="-mx-1 flex snap-x [scrollbar-width:none] gap-1 overflow-x-auto">
              {[{ slug: undefined, title: "All" }, ...collections].map((tab) => {
                const href = tab.slug ? `/shop/${tab.slug}` : "/shop";
                const active = tab.slug === activeSlug;
                return (
                  <li key={tab.title} className="shrink-0 snap-start">
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors",
                        active
                          ? "bg-accent text-accent-ink"
                          : "text-ink-muted hover:bg-canvas-sunken hover:text-ink",
                      )}
                    >
                      {tab.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-6">
              <p className="text-sm text-ink-subtle tabular-nums">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
              <SortSelect value={sort} />
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl">Nothing matches that combination.</p>
            <ButtonLink href="/shop" variant="secondary" className="mt-6">
              Clear filters
            </ButtonLink>
          </div>
        ) : (
          <ProductGrid products={products} className="mt-12" priorityCount={2} />
        )}

        {activeSlug ? (
          <div className="mt-20 border-t border-line pt-8">
            <p className="mb-4 eyebrow">Also in the range</p>
            <ul className="flex flex-wrap gap-3">
              {collections
                .filter((collection) => collection.slug !== activeSlug)
                .map((collection) => (
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
        ) : null}
      </Container>
    </main>
  );
}
