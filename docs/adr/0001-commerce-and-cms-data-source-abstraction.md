# ADR-0001: Abstract the commerce and CMS data sources behind a service interface

**Status:** Accepted
**Date:** 2026-08-19
**Deciders:** Revanth Christober M (sole engineer)
**Blueprint refs:** §3 (stack), §8.2 (commerce abstraction), §8.3 (CMS abstraction), §17 (scope control)

## Context

VELA is a self-initiated concept storefront whose purpose is to prove production-grade
frontend engineering. Two forces pull against each other:

1. **The proof needs real headless commerce thinking.** A storefront that hardcodes an
   array of products in a component proves nothing about production commerce.
2. **The build cannot be blocked on external accounts.** A Shopify development store and
   a Sanity project are credentials the project may not have on day one, and a build that
   stalls waiting for a token is a build that does not ship.

There is a third, quieter force: the interview reviewer will read the code. The single
most legible signal of "this person has shipped commerce before" is a clean seam between
the UI and whatever is behind it — because that seam is exactly what a real engagement
needs when the client changes platform mid-project.

Constraints:

- Single engineer, no team to coordinate contracts with.
- Server-first rendering (Next.js App Router) — the data layer runs on the server by
  default and must not drag client JS into the bundle.
- The MVP lock (§2) is homepage, collection, PDP, cart, one editorial page. Nothing in
  the data layer may exist that those five surfaces do not need.

## Decision

Define a **narrow, typed commerce service interface** in `lib/commerce/` and a parallel
**content interface** in `lib/content/`. Ship a `mock` adapter first, backed by typed
local data in `data/`. Add a `shopify` adapter behind the same interface when credentials
exist. Select the adapter once, at module load, from `NEXT_PUBLIC_COMMERCE_ADAPTER`.

The interface is exactly the surface the five MVP pages need:

```ts
getProducts(options?): Promise<Product[]>
getProductBySlug(slug): Promise<Product | null>
getCollections(): Promise<Collection[]>
getCollectionBySlug(slug): Promise<Collection | null>
getCart(cartId): Promise<Cart | null>
addToCart(cartId, lines): Promise<Cart>
updateCartItem(cartId, lineId, quantity): Promise<Cart>
removeFromCart(cartId, lineId): Promise<Cart>
```

UI components import the domain types (`Product`, `Cart`, `Money`), never an adapter.

## Options Considered

### Option A: Build directly against the Shopify Storefront API

| Dimension        | Assessment                                                       |
| ---------------- | ---------------------------------------------------------------- |
| Complexity       | Medium — GraphQL client, codegen, token handling from day one     |
| Cost             | Blocked until a dev store exists; Shopify schema churn is ours    |
| Scalability      | Good for one platform, zero for any other                         |
| Team familiarity | Moderate                                                          |

**Pros:** Most "real". No adapter indirection to explain. Storefront types come free from
GraphQL codegen.
**Cons:** Every component ends up shaped by Shopify's GraphQL response (`edges`/`node`
wrappers, `priceRange.minVariantPrice`, metafields). Rebuilding the UI is then the price
of ever changing platform — which is precisely the failure mode a studio gets hired to
avoid. Local development requires network and a live store.

### Option B: Mock JSON read directly by components

| Dimension        | Assessment                                     |
| ---------------- | ---------------------------------------------- |
| Complexity       | Low                                            |
| Cost             | Free, instant                                  |
| Scalability      | None — the migration is a rewrite              |
| Team familiarity | High                                           |

**Pros:** Fastest path to pixels.
**Cons:** Proves nothing about commerce engineering. A reviewer reads `import products
from "@/data/products.json"` inside a page component and correctly stops reading.

### Option C: Typed service interface with swappable adapters *(chosen)*

| Dimension        | Assessment                                                         |
| ---------------- | ------------------------------------------------------------------ |
| Complexity       | Medium — one interface, two adapters, one mapping layer per adapter |
| Cost             | ~half a day of design, repaid the first time the source changes     |
| Scalability      | High — a third adapter (Medusa, commercetools) is additive          |
| Team familiarity | High                                                                |

**Pros:** UI ships immediately against mock data. The Shopify adapter is a contained,
reviewable diff that touches no component. The domain types are ours, so `Money` can be
integer minor units instead of Shopify's decimal strings. Testing is trivial: the mock
adapter *is* the fixture.
**Cons:** One extra indirection to justify to a reader; a mapping layer to maintain per
adapter; a risk of the interface quietly growing to mirror Shopify's shape if not policed.

## Trade-off Analysis

The real cost of Option C is not the indirection — it is the discipline required to keep
the interface **narrow**. An abstraction that grows one method per Shopify feature is
worse than no abstraction, because it carries the indirection cost without the
portability benefit. The mitigation is the MVP lock: the interface may only gain a method
when one of the five MVP surfaces cannot be built without it.

The decisive argument against Option A is not effort, it is **coupling shape**. Shopify's
GraphQL responses are connection-wrapped and its money type is a decimal string. Letting
either reach a React component means the component now encodes a vendor decision. Under
Option C, `Money` is `{ amount: number /* paise */, currencyCode: "INR" }` — float
arithmetic on prices becomes structurally impossible, which is a correctness win entirely
independent of portability.

Option B is rejected outright: it optimises for the wrong reader.

## Consequences

**Easier**

- The homepage, collection and PDP can be built and QA'd on day one, offline.
- Connecting Shopify later is one new folder plus one env var — no component changes.
- Unit tests need no network and no fixture scaffolding.
- Prices are integers end to end; rounding bugs cannot occur.

**Harder**

- Shopify features with no equivalent in the domain model (metafields, selling plans) need
  an explicit decision each time rather than leaking through.
- Two code paths exist for the same behaviour, so the mock adapter must stay honest —
  it has to model latency, empty states and failure, or the UI will only ever be tested
  against the happy path.

**To revisit**

- If real Shopify checkout is wired up (§2, Optional), cart identity moves from a local
  cookie to a Shopify `cartId`, and the `getCart` contract must express checkout URL.
- If Sanity is adopted for editorial, `lib/content/` gains a `sanity` adapter and the
  local content seed becomes the fallback, not the default.

## Action Items

1. [ ] Define domain types in `lib/commerce/types.ts` (`Product`, `Variant`, `Collection`, `Cart`, `CartLine`).
2. [ ] Define the interface in `lib/commerce/index.ts` and resolve the adapter from env.
3. [ ] Implement `lib/commerce/adapters/mock.ts` over `data/products.ts`, including artificial latency and an injectable failure mode.
4. [ ] Implement `lib/content/` with the same shape for editorial blocks.
5. [ ] Add `lib/commerce/adapters/shopify.ts` in Phase 5 only if credentials exist; otherwise document the gap in the case study rather than faking it.
