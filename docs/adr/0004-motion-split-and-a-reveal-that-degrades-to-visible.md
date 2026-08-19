# ADR-0004: Split motion by tier, and build the scroll reveal so it degrades to visible

**Status:** Accepted
**Date:** 2026-08-19
**Deciders:** Revanth Christober M
**Blueprint refs:** §9 (motion system), §4.2 ("every animation must support this journey"), §16

## Context

The brief names two animation libraries — GSAP and Framer Motion (now `motion`) —
and a five-tier motion table. Shipping both is only defensible if each has a job the
other does badly; otherwise it is 40 KB of duplicate capability and a reviewer will say so.

Separately, the most common way a "premium" site breaks is its scroll reveals. The usual
implementation renders content at `opacity: 0` and waits for an IntersectionObserver.
Every path that never fires that observer — JavaScript disabled, a print stylesheet, a
crawler that snapshots without scrolling, a full-page screenshot, a fast scroll past a
section — leaves real content permanently invisible. That is a content bug wearing an
animation costume, and it is invisible in normal manual QA because a human always scrolls.

## Decision

**Split by tier, not by preference:**

| Tier | Example | Tool | Why this one |
| --- | --- | --- | --- |
| Hero choreography | Headline / image / CTA sequence | GSAP timeline | Precise relative sequencing (`"-=0.4"`) across five unrelated elements |
| Scroll storytelling | Pinned ingredient sequence | GSAP ScrollTrigger | Pinning and scrubbing have no equivalent in `motion` |
| Component state | Cart drawer, accordion, shop panel, mobile sheet | `motion` | Enter/exit of conditionally-rendered React subtrees is what `AnimatePresence` is for; GSAP would need manual mount management |
| Scroll reveal | Section fade-up | **Neither** — CSS + IntersectionObserver | See below |
| Micro interaction | Button and card hover | CSS | No JS should run for a hover |

**Build the reveal inverted.** Markup ships *visible*. JavaScript adds the hidden state
on mount, and only to elements below the fold at that moment; the observer removes it
when they scroll in.

## Options Considered

### Option A: One library for everything

| Dimension | Assessment |
| --- | --- |
| Bundle | Smallest |
| Fit | Poor at one end — either no pinning, or manual React mount management |

**Cons:** `motion` alone cannot pin or scrub. GSAP alone means hand-rolling exit
animations for every conditionally rendered component, which is where animation bugs live.

### Option B: `whileInView` for the reveals

| Dimension | Assessment |
| --- | --- |
| Effort | Lowest — one prop |
| Robustness | Renders `opacity: 0` on the server |

**Cons:** the failure modes above, all of which end in invisible content. This was not
theoretical here: the first full-page screenshot of the finished homepage came back with
three empty sections, and a fast scroll left them hidden for the rest of the session
because IntersectionObserver reports state at *delivery* time, not at crossing time.

### Option C: Tier split, with a CSS + IntersectionObserver reveal *(chosen)*

| Dimension | Assessment |
| --- | --- |
| Bundle | GSAP + ScrollTrigger + `motion`, each earning its place |
| Robustness | Every failure path ends at "content is simply there" |

## Trade-off Analysis

The reveal is the interesting decision. Inverting it costs about fifteen lines and one
CSS block, and buys: no-JS visible, no-IntersectionObserver visible, reduced-motion
visible, print visible, already-in-view never flickers, and — because the observer also
treats "its top is above the fold" as shown — a fast scroll cannot strand a section.

The library split costs bundle size. It is justified because each tier's tool is the one
that makes that tier's code simple, and simple animation code is what makes it possible
to hold the §9 rule that every motion is purposeful. A single library would produce
either a pinning workaround or a mount-management workaround, and workarounds are where
"remove this animation" becomes "rewrite this component".

## Consequences

**Easier**

- Pinning and scrubbing are one ScrollTrigger call; drawer exit is one `AnimatePresence`.
- Reduced motion is enforced in three independent places — a global CSS rule, `gsap.matchMedia`
  so timelines are never constructed, and `useReducedMotion` in `motion` components.
- Reveals cannot hide content, in any environment.

**Harder**

- Two animation libraries to keep current.
- A contributor has to know the tier table to pick correctly; it is in the README for that reason.

**To revisit**

- If the pinned sequence is the only remaining GSAP usage after Phase 9 polish, reconsider
  whether it earns the dependency.
- Measure the real bundle cost of both libraries in Phase 7 and record it in the case study.

## Action Items

1. [x] Hero timeline in GSAP, `fromTo` rather than `from` (a `from` tween can record an
       already-hidden value as its destination under React's render timing and animate 0 → 0).
2. [x] Ingredient sequence pinned with ScrollTrigger above `lg` only; stacked below it.
3. [x] Drawer, accordion, shop panel and mobile sheet in `motion` with `useReducedMotion`.
4. [x] `Reveal` built on CSS + IntersectionObserver, visible by default.
5. [ ] Record both libraries' contribution to the JS payload in the Phase 7 measurements.
