# VELA — content inventory

**Blueprint refs:** Phase 1 ("prepare content inventory: headings, product copy, ingredient copy, CTAs")

Every string the MVP needs, written before layout so that Phase 2 designs around real copy
and Phase 3 never ships lorem ipsum. Product-level copy lives in `data/products.ts`; this
document covers everything else.

Status: **W** written · **D** derived from `data/` · **P** pending Phase 6 content pass

---

## 1. Global chrome

| Slot | Copy | Status |
| --- | --- | --- |
| Wordmark | `VELA` | W |
| Announcement bar | Free shipping on orders over ₹1,500 | W |
| Nav — Shop | Shop | W |
| Nav — Shop panel, Daily care | Daily care · The two minutes you already spend | W |
| Nav — Shop panel, Body care | Body care · Everything below the jaw | W |
| Nav — Shop panel, Rituals | Rituals · A complete routine, for less | W |
| Nav — Shop panel, all | All nine products | W |
| Nav — Story | Story | W |
| Nav — Journal | Journal | W |
| Cart trigger | Bag · Bag (2) | W |
| Skip link | Skip to content | W |
| Footer tagline | Modern rituals, engineered for everyday life. | W |
| Newsletter heading | Two emails a month. Refills, restocks, and the occasional essay. | W |
| Newsletter field label | Email address | W |
| Newsletter CTA | Join | W |
| Newsletter success | You're on the list. | W |
| Newsletter error | That email doesn't look right. | W |
| Copyright | © 2026 VELA · A self-initiated concept project | W |

## 2. Buttons and labels — the full set

| Context | Copy |
| --- | --- |
| Hero primary | Shop the range |
| Hero secondary | How we formulate |
| Card quick-add | Add · Adding… · Added |
| PDP primary | Add to bag — ₹1,400 |
| PDP pending / done | Adding… · Added to bag |
| PDP unavailable | Out of stock |
| Cart checkout | Checkout |
| Cart continue | Continue shopping |
| Cart line remove | Remove |
| Collection sort | Sort · Featured · Price, low to high · Price, high to low · Newest |
| Filter clear | Clear filters |
| Accordion titles | How it wears · Ingredients (6) · Not for · Shipping & returns |
| Breadcrumb root | Home |
| Pagination / more | See all nine products |
| Error retry | Try again |

Rejected throughout: `Shop Now`, `Learn More`, `Click here`, `Submit`, `Buy Now`.
Every label is verb + object, sentence case, no exclamation marks — per `docs/brand.md` §3.

## 3. Homepage — by section

| Section | Heading | Body | Status |
| --- | --- | --- | --- |
| Hero | Modern rituals, engineered for everyday life. | A small range of skin and body care built around the two minutes you already spend. Short ingredient lists, printed on the front. | W |
| Featured | Start here | — | W |
| Featured footer link | See all nine products | — | W |
| Brand statement | Nine products. Every ingredient printed on the front. | Most skincare is either clinical or vague. We wanted neither: short lists you can read, textures described in words you'd actually use, and no claim we can't print on the bottle. | W |
| Ingredient story 01 | Ceramide complex | Three ceramides in roughly the ratio skin makes them — with the cholesterol they need to work. Most formulas leave that part out. | W |
| Ingredient story 02 | Magnesium | From Dead Sea brine. It is why the body wash leaves skin less reactive after a hot shower. | W |
| Ingredient story 03 | Squalane | Olive-derived. It gives the slip that makes a cream spread without the residue that makes it grease. | W |
| Rituals | The rituals | Three sets, each a complete routine at less than the sum of its parts. | W |
| Reviews | 4.6 ★ from 1,579 reviews | — | D |
| Journal | From the journal | — | W |

## 4. Collection pages

Headings and descriptions come from `data/collections.ts` (status **D**). Supporting copy:

| Slot | Copy |
| --- | --- |
| Count | 3 products · 9 products |
| Sibling row | Also in the range |
| Zero results | Nothing matches that combination. |
| Zero results action | Clear filters |
| Load failure | We couldn't load the range just now. |

## 5. Product pages

All product-level copy is authored in `data/products.ts` (**D**): title, tagline,
description, `howItWears`, `notFor`, benefits, ingredient names with INCI and role, and
suitability. Supporting copy:

| Slot | Copy |
| --- | --- |
| Variant group label | Size |
| Per-unit price | ₹9.33 / ml |
| Refill note | The refill works out 15% cheaper per ml. |
| Trust — shipping | Free shipping over ₹1,500 |
| Trust — returns | 30 days to return it, opened is fine |
| Trust — made | Made in small batches. Batch date on the base. |
| Ingredients heading | Every ingredient, and what it's doing |
| Not-for heading | Not for |
| Reviews heading | What people say |
| Pairs heading | Pairs with |
| Out of stock | Out of stock. Back in about two weeks. |

## 6. Cart

| Slot | Copy |
| --- | --- |
| Heading | Your bag · Your bag (2) |
| Empty | Your bag is empty. |
| Empty action | Shop the range |
| Empty secondary | Or start with a ritual set → |
| Upsell heading | Add to your ritual |
| Free shipping progress | ₹300 more for free shipping |
| Free shipping met | Free shipping — you're there |
| Subtotal / Shipping / Total | Subtotal · Shipping · Total |
| Tax note | Shipping and taxes calculated at checkout |
| Update failure | That didn't save. Try again. |

## 7. Story — `/story`

Sections, in order. Long-form copy written in Phase 6 (**P**); the argument and the
anchors are fixed now because the footer links to them.

| Anchor | Heading | The argument to make |
| --- | --- | --- |
| — | Why nine | Ranges grow because growth is easy, not because the customer needs it. Nine products, each replacing rather than adding. |
| `#ingredients` | How we formulate | Short lists, printed on the front. Concentration stated where the number means something. What we leave out and why. |
| `#refills` | Refills | Every liquid product has a refill; refills cost 15% less per ml; the first bottle is the only one you buy twice. |
| `#shipping` | Shipping & returns | Free over ₹1,500. 30 days. Opened is fine. |
| `#faq` | Questions | Six questions in the order they actually get asked, starting with "will it suit my skin". |
| `#contact` | Contact | One address, a real response time. |

## 8. Journal — `/journal`

Three articles. Index cards written now (**W**), bodies in Phase 6 (**P**).

| Title | Standfirst | Read |
| --- | --- | --- |
| Why we print the whole list | Ingredient lists moved to the back of the bottle for a reason, and the reason wasn't design. | 4 min |
| What a barrier actually is | Everyone sells barrier repair. Very few explain what the barrier is made of, or why ceramides on their own do so little. | 6 min |
| On refills, honestly | Refills are better for almost everyone. Here's the part of that sentence brands leave out. | 3 min |

## 9. System and error states

| Surface | Copy |
| --- | --- |
| 404 heading | That page doesn't exist. |
| 404 body | It may have moved, or it may never have been here. The range is nine products — you'll find what you're after. |
| 404 action | Shop the range |
| 500 heading | Something went wrong at our end. |
| 500 action | Try again |
| Generic form error | Check that and try again. |
| Offline | You're offline. We'll retry when you're back. |

Tone rule for all of the above, from `docs/brand.md`: human, brief, never cute. No
apologising twice, no "oops", no illustrations of confused animals.

## 10. Metadata

| Page | Title | Description |
| --- | --- | --- |
| Home | VELA — Modern rituals, engineered for everyday life | A small range of skin and body care built around the two minutes you already spend. Short ingredient lists, printed on the front. |
| Shop | All products — VELA | Nine products across daily care, body care and rituals. Every ingredient printed on the front. |
| Collection | {Collection} — VELA | Collection description from `data/collections.ts` |
| Product | {Product} — VELA | `{tagline}. {first sentence of description}` |
| Story | Story — VELA | Why VELA is nine products, how each one is formulated, and what we leave out. |
| Journal | Journal — VELA | Short essays on formulation, barriers and refills. |
