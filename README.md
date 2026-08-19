# VELA

**Premium D2C wellness commerce experience.**
_Modern rituals, engineered for everyday life._

> **Self-initiated concept project.** VELA is a fictional brand. It was not built for a
> client, it is not paid work, and no part of it was performed for a real company. It
> exists to demonstrate, end to end, what a premium design brief looks like when taken to
> production-quality frontend by one engineer.

---

## Status

**Phase 0 (setup and quality bar) and Phase 1 (brand and UX foundation) are complete.**
Phases 2–11 are not. Everything in this README marked _Phase n_ is planned and not yet in
the codebase — this section exists so nothing below has to be read charitably.

| Phase | | |
| --- | --- | --- |
| 0 · Setup & quality bar | ✅ | Repo, strict TS, lint/format, token layer, self-hosted type, `/styleguide` |
| 1 · Brand & UX foundation | ✅ | Brand and voice, nine-product catalogue, domain types, IA, wireframes, content inventory, acceptance criteria |
| 2 · Visual system | ◻ | |
| 3 · Core components | ◻ | |
| 4 · Homepage + motion | ◻ | |
| 5 · Commerce flow | ◻ | |
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

Phase 0 captures at 360 / 768 / 1440 are in [`docs/screenshots/`](docs/screenshots/). Full
desktop / tablet / mobile comparisons of the finished pages land from Phase 4.

## Stack

| Layer | Choice | Status | Why |
| --- | --- | --- | --- |
| Framework | Next.js 16 (App Router) | in use | Server components by default, file routing, metadata API, image optimisation |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` | in use | Type-safe component props and data contracts |
| Styling | Tailwind CSS v4, CSS-first `@theme` | in use | One token layer, no config file, no default palette ([ADR-0002](docs/adr/0002-token-layer-with-the-default-palette-disabled.md)) |
| Type | Fraunces + Inter, self-hosted variable woff2 | in use | ~85 KB total, hermetic build ([ADR-0003](docs/adr/0003-self-hosted-variable-fonts.md)) |
| Commerce | Typed domain model in `lib/commerce/types.ts`; service interface and `mock` / `shopify` adapters | types in use, adapters Phase 5 | ([ADR-0001](docs/adr/0001-commerce-and-cms-data-source-abstraction.md)) |
| Content | Same seam as commerce: local seed, Sanity adapter behind it | Phase 6 | |
| Motion | GSAP (scroll choreography) + Motion (component and route state) | Phase 4 | Right tool per tier — see the motion table below |
| Hosting | Vercel | pending | Preview deployments per branch |
| Quality | ESLint (errors, not warnings) + Prettier + `tsc --noEmit` | in use | `pnpm verify` gates everything |
| Testing | Vitest + Testing Library + Playwright | Phase 8 | |

## Architecture

The target structure. `◻` marks a directory that exists as a placeholder and is filled in
the phase named — this tree is the plan, not a claim about what is written.

```
app/
  (marketing)/           route group — no URL segment
    page.tsx             homepage — holding page until Phase 4
    story/            ◻  brand story                              Phase 4
    journal/          ◻  editorial index                          Phase 6
  shop/               ◻  collection + [category]                  Phase 5
  products/[slug]/    ◻  PDP                                      Phase 5
  styleguide/            live token inventory
  fonts/                 self-hosted variable woff2 + OFL licences
components/
  ui/                 ◻  primitives — button, link, container, grid, sheet   Phase 3
  commerce/           ◻  ProductCard, Gallery, VariantSelector, CartDrawer   Phase 3–5
  marketing/          ◻  editorial sections                       Phase 4
  layout/             ◻  header, footer, navigation               Phase 3
lib/
  commerce/              types.ts — the domain model
                      ◻  index.ts + adapters/{mock,shopify}.ts    Phase 5
  content/            ◻  editorial types + adapters               Phase 6
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
| 4 | Money is integer minor units end to end — floats never touch a price | `lib/utils/format.ts` |

Motion is split by tier rather than by preference. The libraries are added in Phase 4;
the split is decided now so that the choice is a design decision rather than whichever
import was already in the file:

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
