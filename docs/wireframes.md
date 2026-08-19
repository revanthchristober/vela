# VELA — low-fidelity wireframes

**Blueprint refs:** §4.1 (homepage sections), §2 (scope), Phase 1

Structure only. No colour, no type, no imagery decisions — those are Phase 2. The purpose
of this document is to fix **what is on each page, in what order, and what changes at
`lg`**, so that Phase 2 designs a layout that already works and Phase 3 builds a layout
that has already been argued about.

Legend: `▓` image or media · `───` divider · `[ ]` control · `(n)` count

---

## 1. Homepage

### Desktop (`lg` and up, 1440px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Free shipping over ₹1,500                                       [×] │  announcement
├──────────────────────────────────────────────────────────────────────┤
│  VELA            Shop ▾   Story   Journal              Bag (0)       │  sticky header
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Modern rituals, engineered           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │  HERO
│   for everyday life.                   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │  60/40 split
│                                        ▓▓▓▓▓▓▓ hero image ▓▓▓▓▓▓      │  LCP element
│   A small range built around the       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
│   two minutes you already spend.       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
│                                        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
│   [ Shop the range ]  How we formulate ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  START HERE                                                          │  FEATURED
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  4-up grid
│  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │              │  4:5 ratio
│  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │              │
│  │ Balance  │  │ Barrier  │  │ Recovery │  │ Morning  │              │
│  │ Cleanser │  │ Cream    │  │ Oil      │  │ Ritual   │              │
│  │ ₹1,400   │  │ ₹1,800   │  │ ₹2,200   │  │ ₹3,800   │              │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘              │
│                                        See all nine products →       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │  BRAND
│              Nine products. Every ingredient                         │  statement
│              printed on the front.                                   │  centred,
│                                                                      │  max 22ch
│              Most skincare is either clinical or vague.              │  scroll reveal
│              We wanted neither.          Read the story →            │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  01 · CERAMIDE COMPLEX                       │  INGREDIENT
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  Three ceramides in the ratio skin           │  STORY
│  ▓▓ pinned  media ▓▓  │  makes them — with the cholesterol           │  GSAP pin,
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  they need to work.                          │  3 steps,
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ─────────────────────────────               │  media swaps,
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  02 · MAGNESIUM  (dimmed)                    │  text scrolls
│                       │  03 · SQUALANE   (dimmed)                    │
├──────────────────────────────────────────────────────────────────────┤
│  THE RITUALS                                                         │  RITUAL
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌───────────────┐ │  3-up,
│  │ ▓▓▓▓ Morning ▓▓▓▓▓▓▓ │ │ ▓▓▓▓ Evening ▓▓▓▓▓▓▓ │ │ ▓▓ Reset ▓▓▓▓ │ │  wider cards,
│  │ Cleanse, mist, cream │ │ End of a long day    │ │ Body, weekly  │ │  save badge
│  │ ₹3,800  ~~₹4,400~~   │ │ ₹3,200  ~~₹3,600~~   │ │ ₹4,400        │ │
│  └──────────────────────┘ └──────────────────────┘ └───────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│  4.6 ★ from 1,579 reviews                                            │  REVIEWS
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐             │  horizontal
│  │ "Doesn't  │ │ "Sits well│ │ "Scent    │ │ "Runs out │  → → →      │  scroll,
│  │  pill."   │ │  under    │ │  fades    │ │  fast."   │             │  incl. a
│  │  ★★★★★    │ │  SPF."    │ │  fast."   │  ★★☆☆☆      │             │  2-star
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘             │
├──────────────────────────────────────────────────────────────────────┤
│  FROM THE JOURNAL                                                    │  JOURNAL
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐            │  3-up
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │            │
│  │ Why we print   │ │ What a barrier │ │ On refills     │            │
│  │ the list       │ │ actually is    │ │                │            │
│  └────────────────┘ └────────────────┘ └────────────────┘            │
├──────────────────────────────────────────────────────────────────────┤
│  Modern rituals, engineered for everyday life.   [email] [ Join ]    │  FOOTER
│  ─────────────────────────────────────────────────────────────────   │
│  Shop            Learn           Help            VELA                │
│  All products    Story           Shipping        Instagram           │
│  Daily care      Journal         Contact         Privacy             │
│  Body care       Ingredients     FAQ             Terms               │
│  Rituals         Refills                                             │
│  ─────────────────────────────────────────────────────────────────   │
│  © 2026 VELA · A self-initiated concept project                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (360px)

```
┌──────────────────────────┐
│ Free shipping ₹1,500 [×] │
├──────────────────────────┤
│ VELA          Bag(0)  ☰  │  sticky, always visible
├──────────────────────────┤
│                          │
│ Modern rituals,          │  HERO — text first,
│ engineered for           │  image below.
│ everyday life.           │  Headline is the LCP
│                          │  element on mobile,
│ A small range built      │  so no image blocks it.
│ around the two minutes   │
│ you already spend.       │
│                          │
│ [  Shop the range     ]  │  full-width, 48px
│ How we formulate →       │
│ ┌──────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │  4:5, lazy below fold
│ │ ▓▓▓ hero image ▓▓▓▓▓ │ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ START HERE               │
│ ┌────────┐ ┌────────┐    │  2-up grid
│ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │    │  (not a carousel —
│ │Balance │ │Barrier │    │   a grid shows there
│ │₹1,400  │ │₹1,800  │    │   are more below)
│ └────────┘ └────────┘    │
│ ┌────────┐ ┌────────┐    │
│ │Recovery│ │Morning │    │
│ └────────┘ └────────┘    │
│ See all nine →           │
├──────────────────────────┤
│ Nine products. Every     │  BRAND — same copy,
│ ingredient printed       │  left aligned at
│ on the front.            │  360 (centred short
│ Read the story →         │  lines look accidental)
├──────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  INGREDIENT — pin is
│ 01 · CERAMIDE COMPLEX    │  dropped. Becomes three
│ Three ceramides…         │  stacked image+text
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  blocks with a simple
│ 02 · MAGNESIUM           │  fade-up each.
│ …                        │  (§9: lighter motion
├──────────────────────────┤   on mobile)
│ THE RITUALS              │
│ ┌──────────────────────┐ │  1-up stack
│ │ ▓▓▓ Morning ▓▓▓▓▓▓▓▓ │ │
│ └──────────────────────┘ │
│ … ×3                     │
├──────────────────────────┤
│ 4.6 ★ · 1,579 reviews    │  swipeable, snap
│ ┌──────────┐ ┌───────    │
│ │ "Doesn't │ │ "Sits     │
│ └──────────┘ └───────    │
├──────────────────────────┤
│ FROM THE JOURNAL         │  1-up stack ×3
├──────────────────────────┤
│ FOOTER — accordion       │  four groups collapse;
│ Shop            +        │  newsletter stays open
│ Learn           +        │
│ Help            +        │
│ [email] [ Join ]         │
└──────────────────────────┘
```

---

## 2. Collection — `/shop` and `/shop/[category]`

### Desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│  header                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  Home › Shop › Daily care                                            │  breadcrumb
│                                                                      │
│  Daily care                                                          │  h1
│  The two minutes you already spend. A cleanser, a mist and a         │  description
│  cream that work in that order and nowhere else.                     │  max 60ch
│                                                                      │
│  All  ·  Daily care  ·  Body care  ·  Rituals      3 products        │  sibling tabs
│  ────────────────────────────────────────────────  [Sort: Featured▾] │  + count + sort
├──────────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐          │  3-up at lg,
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │          │  4-up at 2xl
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │          │
│  │  [Add to bag]  │  │                │  │                │          │  quick-add on
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │          │  hover / always
│  ├────────────────┤  ├────────────────┤  ├────────────────┤          │  visible on touch
│  │ Balance        │  │ Hydrate Mist   │  │ Barrier Cream  │          │
│  │ Cleanser       │  │ Lands wet, not │  │ Thick in the   │          │
│  │ Turns to milk  │  │ damp           │  │ jar, thin on   │          │
│  │ ₹1,400  4.6★   │  │ ₹1,200  4.4★   │  │ ₹1,800  4.8★   │          │
│  └────────────────┘  └────────────────┘  └────────────────┘          │
├──────────────────────────────────────────────────────────────────────┤
│  Also in the range →   [ Body care ]  [ Rituals ]                    │  sibling row
├──────────────────────────────────────────────────────────────────────┤
│  footer                                                              │
└──────────────────────────────────────────────────────────────────────┘
```

**States to design, not discover later:** loading skeleton (card silhouettes at the exact
final dimensions, so there is no shift), zero-results after filtering (with a one-tap
clear), and fetch failure (a retry, never a blank grid).

### Mobile (360px)

```
┌──────────────────────────┐
│ Home › Shop › Daily care │
│ Daily care               │
│ The two minutes you…     │
│                          │
│ ┌──────────────────────┐ │  horizontally scrolling
│ │All ·Daily·Body·Ritual│ │  sibling tabs, snap
│ └──────────────────────┘ │
│ 3 products  [ Sort ▾ ]   │  sort opens a bottom
├──────────────────────────┤  sheet, not a native
│ ┌────────┐ ┌────────┐    │  <select>
│ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │    │
│ │Balance │ │Hydrate │    │  2-up. Quick-add is
│ │₹1,400  │ │₹1,200  │    │  always visible —
│ │  [+]   │ │  [+]   │    │  there is no hover
│ └────────┘ └────────┘    │  on touch
│ ┌────────┐               │
│ │Barrier │               │
│ └────────┘               │
└──────────────────────────┘
```

---

## 3. Product detail — `/products/[slug]`

### Desktop (split at `lg`, not `md`)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Home › Shop › Daily care › Balance Cleanser                         │
├────────────────────────────────────┬─────────────────────────────────┤
│  ┌──────────────────────────────┐  │  Balance Cleanser               │  BUY BOX
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │  A gel that turns to milk       │  sticky within
│  │ ▓▓▓▓▓▓  image 1  ▓▓▓▓▓▓▓▓▓▓▓ │  │  on contact                     │  the column
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │                                 │
│  └──────────────────────────────┘  │  ₹1,400        4.6 ★  (218)     │
│  ┌──────────────────────────────┐  │                                 │
│  │ ▓▓▓▓▓▓  image 2  ▓▓▓▓▓▓▓▓▓▓▓ │  │  Size                           │
│  └──────────────────────────────┘  │  [ 150 ml ] [ 300 ml refill ]   │  variants as
│  ┌──────────────────────────────┐  │  ₹9.33 / ml                     │  buttons, never
│  │ ▓▓▓▓▓▓  image 3  ▓▓▓▓▓▓▓▓▓▓▓ │  │                                 │  a <select>
│  └──────────────────────────────┘  │  [ − ] 1 [ + ]                  │
│   (stacked, scrolls past sticky)   │  [    Add to bag — ₹1,400    ]  │  price in the
│                                    │                                 │  button
│                                    │  ✓ Free shipping over ₹1,500    │  trust block
│                                    │  ✓ 30-day returns, opened is ok │
│                                    │  ✓ Refill saves 15% per ml      │
│                                    │  ───────────────────────────    │
│                                    │  How it wears              [+]  │  accordions,
│                                    │  Ingredients (6)           [+]  │  first one open
│                                    │  Not for                   [+]  │
│                                    │  Shipping & returns        [+]  │
├────────────────────────────────────┴─────────────────────────────────┤
│  INGREDIENTS — the whole list, with what each one does                │  full-width
│  Coco glucoside   The cleansing agent. Sugar-derived, low-foaming.    │  editorial
│  Glycerin  5%     Holds water in the skin during and after the wash.  │  table
│  …                                                                    │
├──────────────────────────────────────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  Not for                                        │  honesty block
│  ▓▓ texture   ▓▓▓  │  Not a makeup remover. It will not shift        │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  waterproof mascara.                            │
├──────────────────────────────────────────────────────────────────────┤
│  4.6 ★  218 reviews    ★★★★★ 143 ★★★★ 52 ★★★ 14 ★★ 6 ★ 3            │  distribution
│  [ review cards, two-star ones included ]                            │  shown in full
├──────────────────────────────────────────────────────────────────────┤
│  PAIRS WITH                                                          │  2 products,
│  ┌────────────────┐  ┌────────────────┐                              │  from pairsWith.
│  │ Hydrate Mist   │  │ Barrier Cream  │                              │  Not "you may
│  └────────────────┘  └────────────────┘                              │  also like"
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (360px)

```
┌──────────────────────────┐
│ ┌──────────────────────┐ │  gallery is a swipe
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │  carousel with dots,
│ │ ▓▓▓  image 1  ▓▓▓▓▓▓ │ │  4:5, first image
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │  priority-loaded
│ └──────────────────────┘ │  (it is the LCP)
│        ● ○ ○             │
├──────────────────────────┤
│ Balance Cleanser         │
│ A gel that turns to milk │
│ ₹1,400      4.6★ (218)   │
│                          │
│ Size                     │
│ [150 ml] [300 ml refill] │
│                          │
│ [ − ] 1 [ + ]            │
│                          │
│ How it wears         [+] │  accordions carry the
│ Ingredients (6)      [+] │  detail so the page
│ Not for              [+] │  stays short
│ Shipping & returns   [+] │
│ …                        │
│ PAIRS WITH               │
├══════════════════════════┤
│ ₹1,400  [ Add to bag  ]  │  STICKY BAR — appears
└══════════════════════════┘  once the inline button
                              scrolls out. The button
                              is never off-screen.
```

---

## 4. Cart drawer

The cart is a right-hand slide-over on every breakpoint. `/cart` exists as a
server-rendered page for direct links and no-JS, and is not linked in the header.

```
                          ┌────────────────────────────────┐
                          │  Your bag (2)             [×]  │
                          ├────────────────────────────────┤
                          │  ┌────┐ Balance Cleanser       │
                          │  │▓▓▓▓│ 150 ml                 │
                          │  │▓▓▓▓│ [−] 1 [+]      ₹1,400  │
                          │  └────┘ Remove                 │
                          │  ──────────────────────────    │
                          │  ┌────┐ Hydrate Mist           │
                          │  │▓▓▓▓│ 100 ml                 │
                          │  │▓▓▓▓│ [−] 1 [+]      ₹1,200  │
                          │  └────┘ Remove                 │
                          ├────────────────────────────────┤
                          │  ADD TO YOUR RITUAL            │  upsell from
                          │  ┌────┐ Barrier Cream  [ Add ] │  pairsWith of
                          │  │▓▓▓▓│ ₹1,800                 │  what is already
                          │  └────┘                        │  in the bag —
                          ├────────────────────────────────┤  max one card
                          │  Subtotal            ₹2,600    │
                          │  Shipping              Free    │  ✓ threshold met
                          │  ───────────────────────────   │
                          │  Total               ₹2,600    │
                          │  [       Checkout          ]   │
                          │  Shipping and taxes at checkout│
                          └────────────────────────────────┘

Empty state                          Below the free-shipping threshold
┌────────────────────────┐           ┌────────────────────────────────┐
│  Your bag (0)     [×]  │           │  Subtotal            ₹1,200    │
│                        │           │  ₹300 more for free shipping   │
│  Your bag is empty.    │           │  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░  80%         │
│                        │           └────────────────────────────────┘
│  [  Shop the range  ]  │
│  Or start with a       │
│  ritual set →          │
└────────────────────────┘
```

**Behaviour fixed now, so it is not improvised in Phase 5:** opens on add-to-cart; focus
moves to the drawer and is trapped; `Esc` and the scrim close it; focus returns to the
element that opened it; the page behind does not scroll; quantity changes are optimistic
with the previous state kept for rollback; the drawer never navigates the page.

At 360px the drawer is full-width and the checkout button is pinned to the bottom of the
viewport, not the bottom of the content.

---

## 5. What is deliberately not in these wireframes

Carried from §17 (scope control): no search, no account or login, no wishlist, no
subscription selector, no product comparison, no review submission form, no live chat,
no popup on entry or exit.

Each of these is a decision, not an oversight, and is listed as such in the case study.
