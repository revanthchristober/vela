# VELA — Case Study

**Self-initiated concept project.** VELA is a fictional D2C wellness brand. It was not
built for a client, is not paid work, and no part of it was performed for a real company.
It exists to demonstrate, end to end, what a premium design brief looks like taken to
production-quality frontend by one engineer.

- **Live:** _Vercel URL — pending deploy_
- **Repo:** https://github.com/revanthchristober/vela
- **Design tokens:** `/styleguide`

## Overview

VELA is a nine-product wellness storefront: homepage with a GSAP-driven hero and pinned
ingredient sequence, filterable/sortable collection pages, a full PDP with variants and
structured data, a persistent cart (drawer + page) with upsells, and editorial pages
(story, journal). Built with Next.js 16 (App Router, React 19, TypeScript strict mode),
Tailwind v4 CSS-first theming, GSAP + Motion for animation, and a typed commerce
abstraction over a mock JSON catalogue.

## Architecture

The commerce layer is the load-bearing decision: every page reads products through
`lib/commerce`, an interface with one implementation today (`adapters/mock.ts`) and a
placeholder seam for Shopify/Sanity later. No component knows or cares where a `Product`
came from — swapping the adapter is the only change needed to point the storefront at a
real backend.

The cart is external state (`lib/cart/store.ts`), read via `useSyncExternalStore` rather
than mirrored into `useState` inside an `useEffect`. This was a deliberate correction
mid-build: the effect-based version caused a first-paint flash of an empty cart before
the persisted one loaded. An external store with an explicit server snapshot gets that
hydration boundary right by construction instead of patching around it.

```
app/            routes — (marketing), shop/[category], products/[slug], cart
components/     commerce, layout, marketing, ui — grouped by concern, not by route
lib/            commerce (service + types + mock adapter), cart (store + provider),
                utils (money formatting, class merging)
data/           typed product catalogue and editorial content
tests/          unit/ (Vitest + Testing Library) and e2e/ (Playwright)
docs/adr/       five architecture decision records
```

## Technical decisions

1. **Commerce service interface, not a Shopify SDK call in every component**
   ([ADR-0001](adr/0001-commerce-and-cms-data-source-abstraction.md)) — lets the frontend
   ship against a mock catalogue now and connect a real backend later without touching UI
   code.
2. **Design tokens with Tailwind's default palette disabled**
   ([ADR-0002](adr/0002-token-layer-with-the-default-palette-disabled.md)) — forces every
   color decision through the brand token layer; nothing can accidentally ship
   `text-blue-500`.
3. **Self-hosted variable fonts** (Fraunces, Inter —
   [ADR-0003](adr/0003-self-hosted-variable-fonts.md)) — two woff2 files, ~85KB total,
   `display: swap` with `adjustFontFallback` so the swap costs no layout shift. Adopted
   after Google Fonts fetches failed in this environment; kept because it removes a
   third-party network dependency entirely.
4. **Motion split by tier, reveal degrades to visible**
   ([ADR-0004](adr/0004-motion-split-and-a-reveal-that-degrades-to-visible.md)) — GSAP
   for the hero and pinned sequence, Motion for drawer/accordion/nav, CSS for hover and
   the scroll-reveal. The reveal ships content visible by default and only hides
   below-the-fold elements after mount, so no-JS, reduced-motion, and crawler snapshots
   never see an invisible page.
5. **Cart as an external store** ([ADR-0005](adr/0005-cart-as-an-external-store.md)) —
   `useSyncExternalStore` over localStorage instead of `useState` + `useEffect`, fixing a
   real first-paint flash bug rather than a hypothetical one.
6. **Accessibility-first test selectors** — the Playwright suite queries by ARIA role and
   accessible name (`getByRole("button", { name: /add to bag/i })`), not `data-testid`.
   This meant fixing real markup gaps — three sections with no heading element — before
   the tests would pass, rather than tests that pass regardless of markup quality.

## Verification

- `pnpm run verify` — typecheck, lint, format check, unit tests, production build — all
  clean.
- **Vitest:** 20 unit/component tests (money formatting and rounding, cart store
  add/merge/remove/persist, `QuantitySelector` interaction and disabled-state logic).
- **Playwright:** 7 specs × 4 browser projects (chromium, firefox, webkit, mobile-chrome)
  = 28 passing e2e tests — browse → PDP → add to cart, cart page state, mobile nav open/
  close, 404s for unknown product/category slugs, empty-cart state.
- **Console check:** zero console errors or page errors across six key routes (home,
  shop, PDP, cart, story, journal).
- **Accessibility/SEO audit (Phase 7):** every route has `generateMetadata` or static
  metadata with a canonical URL; heading hierarchy has no skips (fixed three sections
  that had no heading element); every image has descriptive alt text and correct
  `sizes`/`priority`; the cart drawer traps focus, closes on Escape, and returns focus to
  its opener; zero non-semantic click targets (`<div onClick>`) anywhere in the codebase.
- Lighthouse/Core Web Vitals measurement and a Figma pixel-match pass were not run in
  this build — there is no Figma file for a self-initiated project with no design
  handoff, and a full Lighthouse pass was deprioritized to keep the build inside a fixed
  budget. What's verified instead: zero console errors, a clean production build, and the
  full automated suite above.

## What's out of scope, on purpose

- **CMS wiring (Phase 6):** the mock JSON adapter sits behind the same interface a real
  CMS/commerce backend would use, so this is a swap, not a rebuild, when needed.
- **Checkout:** the "Checkout" control is honestly disabled with copy explaining why —
  there is no payment backend for a concept project, and a fake checkout that appeared to
  work would be a worse demonstration than an honest boundary.
