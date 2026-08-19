# VELA — acceptance criteria

**Blueprint refs:** Phase 1 ("create acceptance criteria for each page"), §11 (QA matrix), §16 (definition of done)

A page is not done when it looks right. It is done when every line below is true and has
been checked at 360px and at 1440px. These become the Playwright specs in Phase 8 — the
wording is deliberately testable.

---

## 0. Global — true of every page

### Structure & semantics

- [ ] Exactly one `<h1>`, and heading levels never skip.
- [ ] All interactive elements are real `<button>` or `<a>` — never a `<div>` with a click handler.
- [ ] Every image has an `alt` that describes it, or `alt=""` **and** `aria-hidden` if decorative.
- [ ] Landmarks present: `header`, `nav`, `main#main`, `footer`.
- [ ] The skip link is the first focusable element and moves focus to `#main`.

### Keyboard & focus

- [ ] Every interactive element is reachable by `Tab` in visual order.
- [ ] Focus is visible on every focusable element (2px accent ring, 3px offset).
- [ ] No keyboard trap anywhere except an intentionally trapped modal or drawer.
- [ ] `Esc` closes any open drawer, sheet or dialog and returns focus to its trigger.

### Motion

- [ ] With `prefers-reduced-motion: reduce`, no element animates, no scroll-triggered
      reveal runs, and all content is visible without scrolling past a trigger.
- [ ] No animation delays a user action. Add-to-cart responds within 100ms regardless of
      what is animating.
- [ ] No animated property triggers layout — transform and opacity only.

### Responsive

- [ ] No horizontal scroll at 360, 390, 768, 1024, 1280, 1440, 1920.
- [ ] All touch targets ≥ 44×44px.
- [ ] No text is clipped or overlaps at 360px, including the longest product name.
- [ ] Content is capped at 1440px; wider viewports gain margin, not columns.

### Content & correctness

- [ ] No lorem ipsum, no placeholder link, no `#` href in the shipped branch.
- [ ] Every internal link resolves — zero 404s from any nav, footer or in-page link.
- [ ] Prices render as `₹1,400`, never `₹1400.00` or `1400`.
- [ ] Zero console errors or warnings in production.

### Metadata

- [ ] Unique `<title>` and meta description.
- [ ] Open Graph title, description and image resolve to absolute URLs.
- [ ] Canonical is correct, including for filtered views.

---

## 1. Homepage — `/`

### Content

- [ ] Hero states what VELA is without scrolling, at 360px, in ≤ 2 lines of body copy.
- [ ] Primary CTA `Shop the range` → `/shop`. Secondary `How we formulate` → `/story`.
- [ ] Featured section shows exactly 4 products with name, tagline, price and rating.
- [ ] Every one of the three collections is reachable from the page body, not only the nav.
- [ ] Reviews section includes at least one review below 3 stars.
- [ ] Footer contains every link listed in `docs/information-architecture.md` §4 and all resolve.

### Behaviour

- [ ] A product card is a single link target — clicking anywhere but the quick-add button
      navigates to the PDP.
- [ ] Quick-add opens the cart drawer without a page navigation.
- [ ] The announcement bar dismisses, stays dismissed for the session, and its removal
      causes no layout shift in content below.
- [ ] The ingredient sequence pins and releases cleanly on desktop, and degrades to
      stacked blocks below `lg`.

### Performance

- [ ] LCP element is the hero headline on mobile and the hero image on desktop, and is
      identified in the Lighthouse trace as expected.
- [ ] Hero image carries `priority`, correct `sizes`, and explicit width/height.
- [ ] Every image below the fold is lazy-loaded.
- [ ] CLS ≤ 0.1 measured with the announcement bar present.

---

## 2. Collection — `/shop`, `/shop/[category]`

### Content

- [ ] `<h1>` is the collection title; the description renders below it.
- [ ] Product count is accurate and updates with the filter.
- [ ] Breadcrumb reads `Home › Shop › {Collection}` with working links.
- [ ] `/shop` shows all nine products; each category page shows exactly three.

### Behaviour

- [ ] Sort changes the order without a full page reload and writes to the URL.
- [ ] Reloading a sorted or filtered URL restores that exact view.
- [ ] Zero-results state offers a one-tap clear that restores the full grid.
- [ ] Loading skeletons occupy the final card dimensions — measured CLS from grid load is 0.
- [ ] An unknown category slug returns a real 404, not an empty grid.
- [ ] Quick-add works from the grid and opens the drawer.

### Performance

- [ ] Grid images use a `sizes` attribute matching the actual column count per breakpoint.
- [ ] The page ships no client JS beyond the sort control and quick-add.

---

## 3. Product — `/products/[slug]`

### Content

- [ ] Title, tagline, price, rating and review count are visible without scrolling at 1440px.
- [ ] Full ingredient list renders with the role of every ingredient, and concentrations
      where stated in the data — no ingredient is omitted.
- [ ] "Not for" copy is present and not hidden behind an interaction on mobile.
- [ ] Review distribution shows all five bars including the low ones.
- [ ] Exactly the products in `pairsWith` are shown — no filler recommendations.

### Behaviour

- [ ] Selecting a variant updates price, per-ml price, SKU and availability without navigation.
- [ ] An unavailable variant is selectable but disables add-to-cart with a reason given.
- [ ] Quantity cannot go below 1; the decrement button is disabled at 1, not silently inert.
- [ ] Add-to-cart shows an in-button pending state and opens the drawer on success.
- [ ] A failed add restores the previous state and shows a retry — the button never lies.
- [ ] The mobile sticky buy bar appears only after the inline button leaves the viewport,
      and never covers the last line of content.
- [ ] The buy box on desktop stays within its column and never overlaps the footer.
- [ ] An unknown slug returns 404 with a route back into `/shop`.

### Accessibility

- [ ] Variant selector is a labelled radio group, operable with arrow keys.
- [ ] Gallery is keyboard-navigable and announces the current image position.
- [ ] Accordions use `<button aria-expanded>` and are operable by keyboard.

### Metadata

- [ ] `Product` JSON-LD validates, and its price, availability and rating match what the
      page renders.
- [ ] `BreadcrumbList` JSON-LD validates.

---

## 4. Cart

- [ ] Drawer opens on add-to-cart, traps focus, and closes on `Esc`, scrim click and `×`.
- [ ] Focus returns to the element that opened it.
- [ ] The page behind does not scroll while the drawer is open, at every width.
- [ ] Quantity changes update line total, subtotal and total; changing to 0 removes the line.
- [ ] Quantity updates are optimistic and roll back visibly on failure.
- [ ] Free-shipping progress is accurate, and the "₹X more" message disappears at threshold.
- [ ] Empty state offers a route to `/shop` and to a ritual set.
- [ ] Cart contents survive a page reload.
- [ ] At most one upsell card is shown, and only for a product not already in the bag.
- [ ] `/cart` renders the same state server-side and is usable with JavaScript disabled.

---

## 5. Story — `/story`

- [ ] Explains why VELA exists and how it formulates, in the voice defined in `docs/brand.md`.
- [ ] Contains the anchored sections the footer links to: `#shipping`, `#ingredients`,
      `#refills`, `#faq`, `#contact` — every footer link lands on real content.
- [ ] Every collection named in the prose links to its page.
- [ ] Reads well at 360px: no line longer than ~72 characters at any width.

---

## 6. Journal — `/journal`

- [ ] Renders at least three article cards with title, standfirst and reading time.
- [ ] Cards are keyboard-focusable with a visible focus state.
- [ ] Article detail is out of MVP scope: cards either link to real content or the section
      is presented as an index without dead links. **No card links to a 404.**

---

## 7. Definition of done for Phase 0 + Phase 1

- [x] `pnpm verify` passes: typecheck, lint, format check, production build.
- [x] Token layer implemented and rendering live at `/styleguide`.
- [x] Fonts self-hosted, preloaded, metric-matched fallbacks.
- [x] Repo structure matches blueprint §6.
- [x] `.env.example` documents every variable, marking public vs secret.
- [x] README follows the §12 structure and labels the project self-initiated.
- [x] Brand, voice, catalogue, IA, wireframes, content inventory and acceptance criteria written.
- [x] Domain types and the nine-product catalogue typecheck under `strict` +
      `noUncheckedIndexedAccess`.
- [ ] Vercel project connected with a preview deployment. _Requires the user's Vercel account._
- [x] GitHub repository created (`revanthchristober/vela`). _Push requires the user's credentials._

---

## 8. Verified for Phases 2–5

Checked in a real browser (Chromium, production build) rather than by reading the code.
The script is `docs/verification/journey.mjs`; it becomes the basis of the Playwright
suite in Phase 8.

**Journey**

- [x] Homepage → `/shop` → PDP navigates correctly; `/shop` lists all nine products.
- [x] Exactly one `<h1>` per page; hero headline visible.
- [x] Changing variant updates the buy button price (₹1,400 → ₹2,400 on the refill).
- [x] Add to bag opens the drawer with the correct product **and the chosen variant**.
- [x] Exactly one upsell card, drawn from `pairsWith`, never something already in the bag.
- [x] Quantity increments in the drawer and updates the totals.
- [x] `Escape` closes the drawer; focus returns to the trigger.
- [x] Cart survives a full page reload.
- [x] Unknown product slug and unknown category slug both render the 404 page.
- [x] Sort writes to the URL and the sorted view survives a reload.

**Responsive**

- [x] Zero horizontal overflow at 360px on `/`, `/shop`, `/shop/rituals`,
      `/products/[slug]`, `/story`, `/journal`, `/cart`.
- [x] Mobile sticky buy bar appears only after the inline button is scrolled *past* —
      not while it is merely below the fold.
- [x] Mobile menu opens and is a real labelled `<nav>`.

**Motion**

- [x] With `prefers-reduced-motion: reduce`, hero text renders at full opacity and no
      timeline is constructed.
- [x] Scroll reveals render visible with no JavaScript, no IntersectionObserver, in
      print, and when scrolled past faster than the observer delivers.

**Console**

- [x] Zero console errors or warnings across the whole journey in the production build.

**Known gaps, carried forward**

- [ ] Lighthouse / Core Web Vitals not yet measured — Phase 7.
- [ ] No automated test suite yet; the checks above are a script, not a spec — Phase 8.
- [ ] Journal article detail pages remain out of scope (§2, Optional).
- [ ] Photography is generated placeholder art direction, not a shoot — noted in
      `public/brand/README.md` and in the case study.
