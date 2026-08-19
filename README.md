# VELA

**Premium D2C wellness commerce experience.**
_Modern rituals, engineered for everyday life._

> **Self-initiated concept project.** VELA is a fictional brand. It was not built for a
> client, it is not paid work, and no part of it was performed for a real company. It
> exists to demonstrate, end to end, what a premium design brief looks like when taken to
> production-quality frontend by one engineer.

---

## Status

**Phases 0–5 are complete: the storefront is built and the core purchase journey works
end to end.** Phases 6–11 (CMS, performance measurement, automated tests, polish, case
study) are not. Anything marked _Phase n_ below is planned and not yet in the codebase —
this section exists so nothing else in this README has to be read charitably.

| Phase | | |
| --- | --- | --- |
| 0 · Setup & quality bar | ✅ | Repo, strict TS, lint/format, token layer, self-hosted type, `/styleguide` |
| 1 · Brand & UX foundation | ✅ | Brand and voice, nine-product catalogue, domain types, IA, wireframes, content inventory, acceptance criteria |
| 2 · Visual system | ✅ | Layout primitives, spacing rhythm, generated art-direction placeholders at real aspect ratios |
| 3 · Core components | ✅ | Header with mobile sheet, footer, buttons, accordion, product card / grid / gallery, skeletons |
| 4 · Homepage + motion | ✅ | Hero, featured, brand statement, pinned ingredient sequence, rituals, reviews, journal — GSAP + Motion |
| 5 · Commerce flow | ✅ | Service interface + mock adapter, collection + sort, PDP with variants, cart drawer, upsell, empty/error states |
| 6 · CMS / content | ◻ | |
| 7 · Performance, SEO, a11y | ◻ | |
| 8 · Testing | ◻ | |
| 9 · Polish | ◻ | |
| 10 · Case study | ◻ | |

## Demo

| | |
| --- | --- |
| Live | _Vercel URL — pending_ |
| Design tokens | `/styleguide` |
| Case study | _Phase 10_ |

## Screenshots

Homepage, collection, product, cart drawer and story at 1440 and 360 are in
[`docs/screenshots/`](docs/screenshots/), alongside the Phase 0 token-layer captures.

## Stack

| Layer | Choice | Status | Why |
| --- | --- | --- | --- |
| Framework | Next.js 16 (App Router) | in use | Server components by default, file routing, metadata API, image optimisation |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` | in use | Type-safe component props and data contracts |
| Styling | Tailwind CSS v4, CSS-first `@theme` | in use | One token layer, no config file, no default palette ([ADR-0002](docs/adr/0002-token-layer-with-the-default-palette-disabled.md)) |
| Type | Fraunces + Inter, self-hosted variable woff2 | in use | ~85 KB total, hermetic build ([ADR-0003](docs/adr/0003-self-hosted-variable-fonts.md)) |
| Commerce | Typed domain model, service interface, `mock` adapter (Shopify adapter behind the same contract) | in use | ([ADR-0001](docs/adr/0001-commerce-and-cms-data-source-abstraction.md)) |
| Content | Typed editorial seed in `data/editorial.ts`; Sanity adapter behind the same seam | seed in use, adapter Phase 6 | |
| Motion | GSAP (hero + pinned sequence) + Motion (drawer, accordion, nav) + CSS (reveals, hover) | in use | Split by tier ([ADR-0004](docs/adr/0004-motion-split-and-a-reveal-that-degrades-to-visible.md)) |
| Hosting | Vercel | pending | Preview deployments per branch |
| Quality | ESLint (errors, not warnings) + Prettier + `tsc --noEmit` | in use | `pnpm verify` gates everything |
| Testing | Vitest + Testing Library + Playwright | Phase 8 | |

## Architecture

`◻` marks the few things not yet written; everything else exists.

```
app/
  (marketing)/           route group — no URL segment
    page.tsx             homepage
    story/               brand story
    journal/             editorial index (article detail out of scope, §2)
  shop/                  collection + [category] with sort
  products/[slug]/       PDP — gallery, buy box, ingredients, reviews
  cart/                  server-rendered fallback for the drawer
  styleguide/            live token inventory
  fonts/                 self-hosted variable woff2 + OFL licences
components/
  ui/                    Container, Section, Button, Accordion, Reveal
  commerce/              ProductCard, Grid, Gallery, BuyBox, CartDrawer, Price, Rating
  marketing/             Hero, BrandStatement, IngredientSequence, ReviewsRail, JournalTeaser
  layout/                Header, Footer, AnnouncementBar, NewsletterForm
lib/
  commerce/              types.ts, index.ts, adapters/mock.ts
                      ◻  adapters/shopify.ts                      when credentials exist
  cart/                  store.ts (external store), CartProvider, upsell
  analytics/          ◻  typed event helpers                      Phase 7
  utils/                 cn, money formatting, SEO helpers
data/                    typed local catalogue + content seed
docs/adr/                architecture decision records
tests/                   unit + e2e
```

Four rules the codebase holds to:

1. **Pages compose, they do not compute.** Business logic lives in `lib/`, never in a
   `page.tsx`.
2. **Server components by default.** `"use client"` is added only where an interaction
   requires it, and as far down the tree as possible.
3. **External data never reaches a component.** Adapters map vendor shapes into domain
   types at the boundary.
4. **Animation lives next to what it animates.** No global animation file.

## Key technical decisions

| # | Decision | Record |
| --- | --- | --- |
| 1 | Commerce and CMS behind a narrow typed service interface, mock adapter first | [ADR-0001](docs/adr/0001-commerce-and-cms-data-source-abstraction.md) |
| 2 | Default Tailwind palette disabled; everything from a token layer; no dark mode | [ADR-0002](docs/adr/0002-token-layer-with-the-default-palette-disabled.md) |
| 3 | Self-hosted variable fonts for a hermetic build and an 85 KB type system | [ADR-0003](docs/adr/0003-self-hosted-variable-fonts.md) |
| 4 | Motion split by tier; the scroll reveal degrades to visible in every failure path | [ADR-0004](docs/adr/0004-motion-split-and-a-reveal-that-degrades-to-visible.md) |
| 5 | Cart is an external store read with `useSyncExternalStore`, not state mirrored from localStorage | [ADR-0005](docs/adr/0005-cart-as-an-external-store.md) |
| 6 | Money is integer minor units end to end — floats never touch a price | `lib/utils/format.ts` |

Motion is split by tier rather than by preference — each library is used where the other
would need a workaround:

| Tier | Example | Tool |
| --- | --- | --- |
| Hero choreography | Headline / image / CTA sequence | GSAP |
| Scroll storytelling | Pinned ingredient sequence | GSAP ScrollTrigger |
| Component state | Cart drawer, accordion, modal | Motion |
| Scroll reveal | Section fade-up | CSS + IntersectionObserver |
| Micro interaction | Button and card hover | CSS |

A global `prefers-reduced-motion` rule collapses all transitions and animations; GSAP
timelines additionally check `matchMedia` before being constructed, so a reduced-motion
visitor never pays for the animation code path.

## Performance

Targets from the brief, measured and recorded in Phase 7:

| Metric | Target | Baseline | Final |
| --- | --- | --- | --- |
| LCP (mobile) | ≤ 2.5s | _tbd_ | _tbd_ |
| INP | ≤ 200ms | _tbd_ | _tbd_ |
| CLS | ≤ 0.1 | _tbd_ | _tbd_ |

Already banked: two preloaded self-hosted font files with metric-adjusted fallbacks (no
font-driven CLS), explicit `sizes` on every image matching the real column count per
breakpoint, skeletons at the exact final card dimensions, and static prerendering of the
homepage, all nine PDPs, the story and journal pages.

## Setup

Requires **Node 22+** (see `.nvmrc`) and **pnpm 10**.

```bash
pnpm install
cp .env.example .env.local     # defaults work with no credentials
pnpm dev                       # http://localhost:3000
```

No Shopify or Sanity account is ever needed to run the project. The default commerce
adapter is `mock`, which reads the typed catalogue in `data/`.

| Script | Does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm verify` | typecheck → lint → format check → build. Run before every push. |
| `pnpm placeholders` | Regenerate the art-direction placeholder imagery in `public/brand` |

## Environment variables

Every variable is documented in [`.env.example`](.env.example). Nothing secret is
required to run the project.

| Variable | Public | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | no | Canonical origin for metadata, OG and sitemap |
| `NEXT_PUBLIC_COMMERCE_ADAPTER` | yes | no | `mock` (default) or `shopify` |
| `SHOPIFY_STORE_DOMAIN` | no | only for `shopify` | Storefront domain |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | no | only for `shopify` | Storefront API token |
| `SHOPIFY_API_VERSION` | no | no | Storefront API version. Defaults to `2026-01` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | no | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | no | Defaults to `production` |
| `SANITY_API_VERSION` | no | no | Sanity API version |
| `SANITY_API_READ_TOKEN` | no | no | **Secret.** Draft/preview mode only |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | yes | no | Off by default |

No secret is ever exposed through a `NEXT_PUBLIC_` prefix, and no `.env` file is tracked.

## Testing

Added in Phase 8:

- **Vitest + Testing Library** — money formatting, cart reducers, variant selection,
  interactive controls.
- **Playwright** — the core journey: browse → collection → PDP → variant → add to cart →
  cart drawer, plus empty and error states, at desktop and 360px.

## Licence

Code: MIT. Fonts: SIL Open Font Licence 1.1 (`app/fonts/*-OFL.txt`). The VELA name, copy
and identity are a fictional concept created for this project.
