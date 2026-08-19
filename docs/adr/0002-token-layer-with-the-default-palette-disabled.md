# ADR-0002: Disable the default Tailwind palette and drive everything from a token layer

**Status:** Accepted
**Date:** 2026-08-19
**Deciders:** Revanth Christober M
**Blueprint refs:** §5.2 (token plan), §5.1 (visual direction), §9 (motion), §16 (definition of done)

## Context

The blueprint asks for a site that "feels expensive, not busy" and names six token
families: background, ink, accent, border, radius, shadow. Tailwind v4 ships ~250 default
colours, 11 default radii and 6 default shadows. Every one of those is a way for the
visual identity to drift — not through a deliberate decision, but through a hurried
`text-gray-500` at 2am that nobody ever revisits.

A single-engineer project has no code review to catch that drift.

## Decision

In `app/globals.css`, reset the colour namespace with `--color-*: initial` inside
`@theme`, then define the complete VELA palette by hand. Radii, shadows, easings, the
fluid type scale and breakpoints are likewise declared explicitly. Durations live in
`:root` because Tailwind v4 has no `--duration-*` theme namespace.

Consequence by construction: `bg-blue-500` does not compile to anything. The only colours
that exist are the ones on `/styleguide`.

## Options Considered

### Option A: Extend the default theme

| Dimension  | Assessment                                  |
| ---------- | ------------------------------------------- |
| Complexity | Low                                         |
| Risk       | High — 250 escape hatches remain open       |
| Review     | Drift is invisible in a diff                |

**Pros:** Conventional; nothing to explain.
**Cons:** The design system is advisory rather than enforced.

### Option B: Reset and redefine the palette *(chosen)*

| Dimension  | Assessment                                                  |
| ---------- | ----------------------------------------------------------- |
| Complexity | Low-medium — must remember to re-declare `transparent`, `current`, `white`, `black` |
| Risk       | Low — off-palette colour is a build-visible mistake         |
| Review     | The token file *is* the design system                       |

**Pros:** The constraint is mechanical, not a matter of willpower. `/styleguide` is a
complete and truthful inventory. A reviewer can read one 200-line CSS file and know every
value the product can express.
**Cons:** Third-party components that assume default colours need mapping. Prototyping is
marginally slower because there is no `bg-red-500` to reach for.

## Trade-off Analysis

The cost is a small amount of friction when improvising. The benefit is that "visual
consistency" stops being a QA item and becomes a property of the build. Given that §16
lists "Figma and implementation are visually close" as a definition-of-done criterion,
moving consistency from *checked* to *guaranteed* is worth the friction.

Related and decided together: **no dark mode.** The brand is a single warm canvas with a
single ink. A second theme would double the visual QA matrix in §11 for no product
benefit on a five-page storefront. This is recorded as an intentional deviation, not an
omission.

## Consequences

**Easier**

- Every colour decision is made once, in one file, with a name.
- `/styleguide` cannot go stale — it renders the same tokens the product uses.
- Contrast can be audited exhaustively because the palette is finite and small.

**Harder**

- Any future third-party UI (shadcn/ui primitives, per §3) must be re-tokenised on
  adoption rather than dropped in.
- Quick throwaway debugging colours have to come from the palette or an arbitrary value.

**To revisit**

- If a marketing surface ever needs a seasonal accent, add it as a named token
  (`--color-accent-seasonal`) rather than re-enabling the default palette.

## Action Items

1. [x] Reset and define the palette, radii, shadows, easings and type scale in `app/globals.css`.
2. [x] Ship `/styleguide` rendering the live tokens.
3. [ ] Run a contrast audit of every ink/canvas and ink/accent pair in Phase 7 and record the ratios in the case study.
4. [ ] Re-tokenise any shadcn/ui primitive at the moment it is adopted.
