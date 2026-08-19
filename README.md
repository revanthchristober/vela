# VELA

**Premium D2C wellness commerce experience.**
_Modern rituals, engineered for everyday life._

> **Self-initiated concept project.** VELA is a fictional brand. It was not built for a
> client, it is not paid work, and no part of it was performed for a real company. It
> exists to demonstrate, end to end, what a premium design brief looks like when taken to
> production-quality frontend by one engineer.

---

## Demo

| | |
| --- | --- |
| Live | _Vercel URL — added at the end of Phase 0_ |
| Design tokens | `/styleguide` |
| Case study | _added in Phase 10_ |

## Screenshots

_Added from Phase 4 onward. Desktop / tablet / 360px comparisons live in `docs/screenshots/`._

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Server components by default, file routing, metadata API, image optimisation |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` | Type-safe component props and data contracts |
| Styling | Tailwind CSS v4, CSS-first `@theme` | One token layer, no config file, no default palette ([ADR-0002](docs/adr/0002-token-layer-with-the-default-palette-disabled.md)) |
| Type | Fraunces + Inter, self-hosted variable woff2 | ~85 KB total, hermetic build ([ADR-0003](docs/adr/0003-self-hosted-variable-fonts.md)) |
| Motion | GSAP (scroll choreography) + Motion (component/route state) | Right tool per tier — see the motion table below |
| Commerce | Typed service interface; `mock` adapter now, Shopify Storefront API adapter behind the same contract | ([ADR-0001](docs/adr/0001-commerce-and-cms-data-source-abstraction.md)) |
| Content | Typed content interface; local seed now, Sanity adapter later | Same seam as commerce |
| Hosting | Vercel | Preview deployments per branch |
| Quality | ESLint (errors, not warnings) + Prettier + `tsc --noEmit` | `pnpm verify` gates everything |
| Testing | Vitest + Testing Library + Playwright | Added in Phase 8 |

## Architecture

```
app/
  (marketing)/           route group — no URL segment
    page.tsx             homepage
    story/               brand story
    journal/             editorial index
  shop/
    page.tsx             all products
    [category]/          body, rituals, daily
  products/[slug]/       PDP
  styleguide/            live token inventory
  fonts/                 self-hosted variable woff2 + OFL licences
components/
  ui/                    primitives — button, link, container, grid, sheet
  commerce/              ProductCard, Gallery, VariantSelector, CartDrawer
  marketing/             editorial sections
  layout/                header, footer, navigation
lib/
  commerce/              domain types + service interface + adapters
  content/               editorial types + adapters
  analytics/             typed event helpers
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
| 4 | Money is integer minor units end to end — floats never touch a price | `lib/utils/format.ts` |

Motion is split by tier rather than by preference:

| Tier | Example | Tool |
| --- | --- | --- |
| Hero choreography | Headline / image / CTA sequence | GSAP |
| Scroll storytelling | Pinned ingredient sequence | GSAP ScrollTrigger |
| Route transition | Page fade / slide | Motion |
| Component state | Cart drawer, accordion, modal | Motion |
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

Already banked in Phase 0: two preloaded self-hosted font files with metric-adjusted
fallbacks (no font-driven CLS), zero client JS on the current routes, and a fully static
prerender.

## Setup

Requires **Node 22+** (see `.nvmrc`) and **pnpm 10**.

```bash
pnpm install
cp .env.example .env.local     # defaults work with no credentials
pnpm dev                       # http://localhost:3000
```

No Shopify or Sanity account is needed to run the project. The default commerce adapter is
`mock` and reads typed local data.

| Script | Does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm verify` | typecheck → lint → format check → build. Run before every push. |

## Environment variables

Every variable is documented in [`.env.example`](.env.example). Nothing secret is
required to run the project.

| Variable | Public | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | no | Canonical origin for metadata, OG and sitemap |
| `NEXT_PUBLIC_COMMERCE_ADAPTER` | yes | no | `mock` (default) or `shopify` |
| `SHOPIFY_STORE_DOMAIN` | no | only for `shopify` | Storefront domain |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | no | only for `shopify` | Storefront API token |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | no | Sanity project |
| `SANITY_API_READ_TOKEN` | no | no | **Secret.** Draft/preview mode only |

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
