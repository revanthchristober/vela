# ADR-0003: Self-host two variable fonts instead of loading from Google Fonts

**Status:** Accepted
**Date:** 2026-08-19
**Deciders:** Revanth Christober M
**Blueprint refs:** §10 (Core Web Vitals — "Self-host or load only necessary weights"), §7 Phase 7

## Context

Typography carries most of the brand in an editorial layout, and fonts are also the most
common cause of both LCP delay and CLS on a text-led homepage. The blueprint's Core Web
Vitals targets are LCP ≤ 2.5s, CLS ≤ 0.1 — on a page whose largest contentful paint is
almost certainly the hero headline, the font *is* the LCP element.

Two families are needed: a display serif with enough character to feel editorial, and a
neutral text face that disappears under prices, labels and body copy.

## Decision

Ship **Fraunces Variable** (display) and **Inter Variable** (text) as two `woff2` files in
`app/fonts/`, loaded with `next/font/local`. Latin subset only, weight axis only, both
preloaded, `display: swap`, with a metric-adjusted fallback (`adjustFontFallback`) so the
swap costs no layout shift.

Total: **~85 KB** for the entire typographic system across an unlimited weight range.

## Options Considered

### Option A: `next/font/google`

| Dimension    | Assessment                                                 |
| ------------ | ---------------------------------------------------------- |
| Complexity   | Lowest — one import                                        |
| Build        | Requires network egress to `fonts.googleapis.com` at build |
| Runtime perf | Equivalent (Next self-hosts the fetched files)             |

**Pros:** One line per family. No binaries in the repo.
**Cons:** The build depends on a third-party host being reachable. This is not
hypothetical — it is exactly what failed in this project's first build, in a sandboxed CI
environment with restricted egress. A build that fails because a font CDN is unreachable
is a build that will fail in someone else's CI too.

### Option B: Static named weights (300/400/500/600)

| Dimension    | Assessment                                    |
| ------------ | --------------------------------------------- |
| Complexity   | Medium — four files per family                |
| Bytes        | ~4× the requests, more total bytes            |
| Flexibility  | Fixed steps; no fluid weight for optical work |

**Cons:** More bytes and more requests for strictly less typographic range.

### Option C: Self-hosted variable woff2 via `next/font/local` *(chosen)*

| Dimension    | Assessment                                              |
| ------------ | ------------------------------------------------------- |
| Complexity   | Low — two files, checked in with their OFL licences     |
| Build        | Hermetic; no network, no third-party host               |
| Bytes        | ~85 KB total for a 100–900 continuous weight range      |

**Pros:** Reproducible builds anywhere. Fewest bytes for the most range. Fully
self-hosted, so no third-party connection on first paint. Preload + metric-adjusted
fallback removes the CLS risk that motivates most font debates in the first place.
**Cons:** Two binaries in git. Font updates are manual. The licence text must travel with
the files.

## Trade-off Analysis

Option A is the default and would be fine in most projects. It was rejected on
**build determinism** after it failed for real: the value of a portfolio repo is that a
reviewer can clone it and `pnpm build` on a fresh machine (§16 explicitly requires setup
instructions that work on a fresh machine). A hermetic build is worth two 40 KB binaries.

The subsetting choice matters more than the hosting choice: latin + weight-axis-only takes
Fraunces from 121 KB (all axes, latin-ext) to 37 KB. The optical-size and "wonk" axes are
expressive, but not worth 84 KB on a page targeting a 2.5s mobile LCP.

## Consequences

**Easier**

- `pnpm build` works offline and in any CI.
- No third-party origin on the critical path.
- Continuous weight range available for optical adjustments in Phase 9 polish.

**Harder**

- Font files are versioned by hand; a Fraunces upgrade is a manual re-extract.
- The OFL licence text must remain alongside the binaries (it does: `app/fonts/*-OFL.txt`).

**To revisit**

- If the display face gains a second language subset, re-extract rather than adding a
  Google Fonts fallback.
- Measure real LCP in Phase 7; if the display font still delays the hero, consider
  rendering the first hero line in the metric-matched fallback until swap.

## Action Items

1. [x] Extract latin/weight-axis `woff2` for Fraunces and Inter; commit with OFL licences.
2. [x] Wire both through `next/font/local` with `preload`, `display: swap` and `adjustFontFallback`.
3. [ ] Verify in Phase 7 that no font-driven CLS is observable in Lighthouse, and record the number.
