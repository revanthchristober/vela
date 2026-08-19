import Link from "next/link";

/**
 * Holding homepage.
 *
 * Phase 0 deliverable only — this exists so the token layer, the font strategy
 * and the deployment are all provably working before a single section is
 * designed. It is replaced wholesale in Phase 4.
 */
export default function HomePage() {
  return (
    <main id="main" className="min-h-dvh px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-page flex-col justify-between">
        <header className="flex items-baseline justify-between gap-6">
          <span className="font-display text-xl tracking-tight">VELA</span>
          <span className="eyebrow">Self-initiated concept</span>
        </header>

        <div className="max-w-4xl py-20">
          <p className="mb-6 eyebrow">In build — Phase 0</p>
          <h1 className="max-w-[15ch] font-display text-6xl font-light text-balance">
            Modern rituals, engineered for everyday life.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-muted">
            A premium D2C wellness storefront, built end to end as an independent
            engineering study — design system, headless commerce, motion and Core Web
            Vitals.
          </p>
        </div>

        <footer className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
          <Link
            href="/styleguide"
            className="text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
          >
            Design tokens
          </Link>
          <span className="text-sm text-ink-subtle">
            Next.js · TypeScript · Tailwind · GSAP · Shopify Storefront API
          </span>
        </footer>
      </div>
    </main>
  );
}
