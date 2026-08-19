# ADR-0005: Model the cart as an external store, not as React state mirrored from storage

**Status:** Accepted
**Date:** 2026-08-19
**Deciders:** Revanth Christober M
**Blueprint refs:** §2 (cart is MVP), §8.2, §11 (QA matrix — "add, update, remove, empty cart, error state")

## Context

The cart must survive a reload (acceptance criteria §4), must render identically on the
server, and must never flash the wrong number in the header. The obvious implementation —
`useState` plus a `useEffect` that reads `localStorage` on mount and another that writes on
change — has three problems, in ascending order of seriousness:

1. It re-renders immediately after hydration, so the header paints `Bag` and then `Bag (3)`.
2. There is no way to distinguish "the cart is empty" from "we have not looked yet", so the
   badge cannot decide whether to render at all.
3. Persistence lives in an effect, which means a failed write (private mode, full quota) is
   discovered somewhere unrelated to the action that caused it.

React's own lint rule flags the pattern directly: setting state synchronously inside an
effect is how you say "I am mirroring an external system into React", which is what
`useSyncExternalStore` exists for.

## Decision

Put the cart lines in a module-level store (`lib/cart/store.ts`) with `subscribe`,
`getSnapshot` and `getServerSnapshot`. Read it with `useSyncExternalStore`. Persist inside
the mutation functions, not in an effect, and record a `persistFailed` flag on the snapshot
when a write throws.

`CartProvider` keeps exactly one piece of real React state: whether the drawer is open.

Snapshot shape:

```ts
interface CartState {
  lines: readonly CartLine[];
  loaded: boolean;        // false until storage has been read
  persistFailed: boolean; // a write threw; the cart still works for this page view
}
```

Lines carry denormalised display data (title, variant title, unit price, one image) rather
than a slug to resolve later — otherwise the whole catalogue, ingredients and reviews
included, would have to ship to the client to render a drawer.

## Options Considered

### Option A: `useState` + two effects

| Dimension | Assessment |
| --- | --- |
| Familiarity | Highest |
| Hydration | Flash of empty cart on every page load |
| Errors | Persistence failure surfaces far from its cause |

### Option B: A state library (Zustand, Jotai)

| Dimension | Assessment |
| --- | --- |
| Effort | Low |
| Cost | A dependency for one store, on a five-page site |

**Cons:** Zustand is a thin wrapper over exactly the pattern in Option C. Adding it here
would be a dependency chosen to avoid writing sixty lines that are worth reading.

### Option C: `useSyncExternalStore` over a module store *(chosen)*

| Dimension | Assessment |
| --- | --- |
| Hydration | Explicit server snapshot; no mismatch, no flash |
| Errors | Reported at the mutation |
| Dependencies | None |

**Cons:** module-level mutable state needs an explicit reset seam for tests
(`__resetForTests`). It is also the least familiar of the three to a reader — mitigated by
the comment block at the top of the file explaining why it is not the obvious thing.

## Trade-off Analysis

The decisive property is `loaded`. With it, the header badge can render nothing until the
cart is known, which is the difference between a storefront that feels solid and one that
flickers on every navigation. Neither Option A nor a naive store gives you that without a
second piece of state to track it.

Denormalising the lines is a deliberate duplication. A line is a record of what the person
chose at the moment they chose it; if a product is later renamed or withdrawn, the bag
should still show what they picked rather than throwing or rendering a gap.

## Consequences

**Easier**

- The header badge never flashes.
- Persistence failure is caught where it happens and can be surfaced honestly.
- The reducer logic is plain functions over arrays — trivially unit-testable in Phase 8
  with no React renderer involved.

**Harder**

- Module state must be reset between tests; the seam exists but has to be used.
- Two components could in principle mutate the store without going through the provider.
  Only the provider does today, and the store's exports are the enforcement point.

**To revisit**

- When real Shopify checkout is wired up, cart identity moves server-side to a Shopify
  `cartId` and the store becomes a cache in front of it rather than the source of truth.
  The component API (`useCart`) should not have to change.

## Action Items

1. [x] Implement `lib/cart/store.ts` with an explicit server snapshot.
2. [x] Reduce `CartProvider` to drawer visibility plus a `useSyncExternalStore` read.
3. [x] Persist inside mutations; expose `persistFailed` on the snapshot.
4. [ ] Unit-test the store's add / merge / decrement-to-zero / mixed-currency guard in Phase 8.
5. [ ] Surface `persistFailed` in the drawer UI once there is a design for it.
