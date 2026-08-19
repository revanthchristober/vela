import type { Product } from "@/lib/commerce/types";
import { money } from "@/lib/utils/format";

/**
 * The VELA catalogue — nine products across three collections.
 *
 * This file is the single source of truth for the `mock` commerce adapter
 * (ADR-0001). Prices are integer paise; ₹1,400 is 140000.
 *
 * Image paths point at assets produced in Phase 2. Until then they resolve to
 * the placeholder pipeline in `components/commerce/ProductImage`, which renders
 * a token-coloured block at the correct aspect ratio — so layout, `sizes` and
 * CLS behaviour are all real long before the photography exists.
 *
 * Copy follows docs/brand.md: texture first, every claim checkable, and every
 * product says who it is not for.
 */

export const PRODUCTS: readonly Product[] = [
  // ── Daily care ────────────────────────────────────────────────────────────
  {
    id: "prd_balance_cleanser",
    slug: "balance-cleanser",
    title: "Balance Cleanser",
    tagline: "A gel that turns to milk on contact",
    description:
      "A low-foam gel that softens into a milk as soon as it meets water, then rinses clean without the tight, squeaky feeling that makes most people reach for moisturiser two minutes early. Built for twice a day, every day. pH 5.5, so it leaves the skin barrier where it found it.",
    howItWears:
      "Rinses in about fifteen seconds and leaves no film. Skin feels soft rather than stripped; you can wait a minute before the next step without discomfort.",
    notFor:
      "Not a makeup remover. It will not shift waterproof mascara, and pretending otherwise would just mean you scrub.",
    category: "daily-care",
    price: money(140000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/balance-cleanser/01.jpg",
        alt: "Balance Cleanser bottle standing on a warm stone surface",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/balance-cleanser/02.jpg",
        alt: "The gel texture spread on a glass slab, part-emulsified into a milk",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/balance-cleanser/03.jpg",
        alt: "Ingredient list printed on the front of the bottle, in focus",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_balance_150",
        title: "150 ml",
        volumeMl: 150,
        price: money(140000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-BC-150",
      },
      {
        id: "var_balance_300",
        title: "300 ml refill",
        volumeMl: 300,
        price: money(240000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-BC-300R",
      },
    ],
    ingredients: [
      {
        name: "Coco glucoside",
        inci: "Coco-Glucoside",
        role: "The cleansing agent. Sugar-derived, low-foaming, does not strip.",
      },
      {
        name: "Glycerin",
        inci: "Glycerin",
        role: "Holds water in the skin during and after the wash.",
        concentration: "5%",
      },
      {
        name: "Panthenol",
        inci: "Panthenol",
        role: "Reduces the tightness a cleanse can leave behind.",
        concentration: "2%",
      },
      {
        name: "Allantoin",
        inci: "Allantoin",
        role: "Soothes; useful if you cleanse twice a day.",
      },
      {
        name: "Sodium PCA",
        inci: "Sodium PCA",
        role: "Part of skin's own moisture system. Replaces what washing removes.",
      },
      {
        name: "Lactic acid",
        inci: "Lactic Acid",
        role: "Holds the formula at pH 5.5. Not present at an exfoliating level.",
      },
    ],
    benefits: [
      "No tightness after rinsing",
      "pH 5.5 — barrier-neutral",
      "Six ingredients, all printed on the front",
      "Refill available at a lower cost per ml",
    ],
    suitableFor: ["all", "dry", "combination", "sensitive"],
    tags: ["cleanser", "everyday", "fragrance-free", "refillable"],
    reviewsSummary: { rating: 4.6, count: 218, distribution: [3, 6, 14, 52, 143] },
    pairsWith: ["hydrate-mist", "barrier-cream"],
  },
  {
    id: "prd_hydrate_mist",
    slug: "hydrate-mist",
    title: "Hydrate Mist",
    tagline: "A fine mist that lands wet, not damp",
    description:
      "A humectant mist for the ten seconds after cleansing, when skin takes on water most easily. The pump throws a genuinely fine spray — close enough that it settles evenly rather than beading and running. No alcohol, so it does not evaporate cold and take moisture with it.",
    howItWears:
      "Absorbs in around thirty seconds. Leaves no stickiness, and cream applied straight after it spreads noticeably further.",
    notFor:
      "Not a substitute for a moisturiser. On its own, on dry skin, in winter, it will not be enough.",
    category: "daily-care",
    price: money(120000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/hydrate-mist/01.jpg",
        alt: "Hydrate Mist bottle with the fine-spray pump, side lit",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/hydrate-mist/02.jpg",
        alt: "The spray pattern caught mid-air against a dark background",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_mist_100",
        title: "100 ml",
        volumeMl: 100,
        price: money(120000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-HM-100",
      },
      {
        id: "var_mist_200",
        title: "200 ml refill",
        volumeMl: 200,
        price: money(200000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-HM-200R",
      },
    ],
    ingredients: [
      {
        name: "Glycerin",
        inci: "Glycerin",
        role: "The main humectant. Pulls water into the upper layers.",
        concentration: "8%",
      },
      {
        name: "Betaine",
        inci: "Betaine",
        role: "A second humectant that works at lower humidity than glycerin alone.",
        concentration: "2%",
      },
      {
        name: "Panthenol",
        inci: "Panthenol",
        role: "Softens and calms.",
        concentration: "1%",
      },
      {
        name: "Sodium hyaluronate",
        inci: "Sodium Hyaluronate",
        role: "Low molecular weight, so it sits in the skin rather than on it.",
      },
      {
        name: "Green tea",
        inci: "Camellia Sinensis Leaf Extract",
        role: "Antioxidant. Also the reason the liquid is faintly gold.",
      },
    ],
    benefits: [
      "Alcohol-free — no cold evaporation",
      "Fine enough to land evenly at arm's length",
      "Makes whatever follows it spread further",
      "Refill available",
    ],
    suitableFor: ["all", "oily", "combination", "sensitive"],
    tags: ["mist", "hydrating", "alcohol-free", "refillable"],
    reviewsSummary: { rating: 4.4, count: 156, distribution: [4, 8, 16, 40, 88] },
    pairsWith: ["balance-cleanser", "barrier-cream"],
  },
  {
    id: "prd_barrier_cream",
    slug: "barrier-cream",
    title: "Barrier Cream",
    tagline: "Thick in the jar, thin on the skin",
    description:
      "A ceramide cream that looks far heavier than it behaves. It breaks under warmth and spreads much further than the first scoop suggests, which is why the jar is small. Sits under sunscreen without pilling — the thing every review of every moisturiser is actually asking about.",
    howItWears:
      "Absorbs in about a minute, leaving a soft matte finish rather than a sheen. Holds through a working day; on very dry skin in winter you may want it twice.",
    notFor:
      "Not for anyone who wants a gel-light finish in humid weather. In a Chennai August this is more cream than most people need.",
    category: "daily-care",
    price: money(180000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/barrier-cream/01.jpg",
        alt: "Barrier Cream jar, lid off, on a linen surface",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/barrier-cream/02.jpg",
        alt: "A scoop of the cream breaking down between two fingers",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/barrier-cream/03.jpg",
        alt: "The cream applied and absorbed on a forearm, matte finish",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_barrier_50",
        title: "50 ml",
        volumeMl: 50,
        price: money(180000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-BR-50",
      },
      {
        id: "var_barrier_100",
        title: "100 ml refill",
        volumeMl: 100,
        price: money(310000),
        compareAtPrice: null,
        availableForSale: false,
        sku: "VLA-BR-100R",
      },
    ],
    ingredients: [
      {
        name: "Ceramide complex",
        inci: "Ceramide NP, Ceramide AP, Ceramide EOP",
        role: "The three ceramides skin makes itself, in roughly the ratio it makes them.",
        concentration: "2%",
      },
      {
        name: "Cholesterol",
        inci: "Cholesterol",
        role: "Ceramides do very little without it. Most formulas leave it out.",
      },
      {
        name: "Squalane",
        inci: "Squalane",
        role: "Olive-derived emollient. Gives the slip without the grease.",
        concentration: "5%",
      },
      {
        name: "Glycerin",
        inci: "Glycerin",
        role: "Draws water in so the occlusives have something to hold.",
        concentration: "6%",
      },
      {
        name: "Shea butter",
        inci: "Butyrospermum Parkii Butter",
        role: "The weight in the jar. Refined, so no scent of its own.",
      },
      {
        name: "Tocopherol",
        inci: "Tocopherol",
        role: "Antioxidant, and keeps the oils from turning.",
      },
    ],
    benefits: [
      "Does not pill under sunscreen",
      "Ceramides with the cholesterol they need to work",
      "Spreads much further than it looks",
      "Fragrance-free",
    ],
    suitableFor: ["dry", "sensitive", "combination"],
    tags: ["moisturiser", "ceramides", "fragrance-free", "winter"],
    reviewsSummary: { rating: 4.8, count: 341, distribution: [2, 4, 11, 48, 276] },
    pairsWith: ["balance-cleanser", "hydrate-mist"],
  },

  // ── Body care ─────────────────────────────────────────────────────────────
  {
    id: "prd_mineral_body_wash",
    slug: "mineral-body-wash",
    title: "Mineral Body Wash",
    tagline: "A wash that does not announce itself in the lift",
    description:
      "A clear, low-foam wash built around magnesium and sea salt rather than sulfates. It lathers less than you expect and cleans exactly as well, which takes one shower to get used to. Scented with vetiver and a little bergamot, at a level that fades by the time you are dressed.",
    howItWears:
      "Rinses completely — no film on the shower floor and none on you. Skin feels comfortable enough that body oil is optional rather than required.",
    notFor:
      "Not for anyone who judges a wash by its lather. If you want a head of foam, this will feel wrong every time.",
    category: "body-care",
    price: money(150000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/mineral-body-wash/01.jpg",
        alt: "Mineral Body Wash bottle on a wet tiled ledge",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/mineral-body-wash/02.jpg",
        alt: "The clear gel poured over a hand, showing its low foam",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_wash_400",
        title: "400 ml",
        volumeMl: 400,
        price: money(150000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-MW-400",
      },
      {
        id: "var_wash_1000",
        title: "1 L refill",
        volumeMl: 1000,
        price: money(320000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-MW-1000R",
      },
    ],
    ingredients: [
      {
        name: "Coco betaine",
        inci: "Cocamidopropyl Betaine",
        role: "Cleans gently. Not a sulfate, hence the modest lather.",
      },
      {
        name: "Magnesium chloride",
        inci: "Magnesium Chloride",
        role: "From Dead Sea brine. Leaves skin less reactive after hot water.",
      },
      {
        name: "Sea salt",
        inci: "Maris Sal",
        role: "Mineral content, and it thickens the gel without a polymer.",
      },
      {
        name: "Glycerin",
        inci: "Glycerin",
        role: "Offsets what any wash takes out.",
        concentration: "4%",
      },
      {
        name: "Vetiver",
        inci: "Vetiveria Zizanoides Root Oil",
        role: "The scent. Dry, woody, deliberately faint.",
      },
      {
        name: "Bergamot",
        inci: "Citrus Aurantium Bergamia Peel Oil (FCF)",
        role: "Lifts the vetiver. Bergapten-free, so it is not photosensitising.",
      },
    ],
    benefits: [
      "Sulfate-free without feeling like it does nothing",
      "Magnesium and sea salt from Dead Sea brine",
      "Scent fades within minutes by design",
      "1 L refill at roughly half the cost per ml",
    ],
    suitableFor: ["all", "dry", "sensitive"],
    tags: ["body", "sulfate-free", "scented", "refillable"],
    reviewsSummary: { rating: 4.5, count: 189, distribution: [3, 7, 15, 46, 118] },
    pairsWith: ["recovery-oil", "mineral-salt-scrub"],
  },
  {
    id: "prd_mineral_salt_scrub",
    slug: "mineral-salt-scrub",
    title: "Mineral Salt Scrub",
    tagline: "Coarse salt in an oil that rinses",
    description:
      "Coarse Dead Sea salt suspended in a sunflower and jojoba base that emulsifies under water instead of coating the tub. The grains dissolve as you work, so it starts as a scrub and finishes as an oil cleanse. Once or twice a week is the whole instruction.",
    howItWears:
      "Skin is smooth immediately and stays soft for two to three days. No oil slick in the shower, and no need to moisturise straight after.",
    notFor:
      "Not for freshly shaved skin, sunburn, or anyone who exfoliates daily. Salt on a compromised barrier is a bad afternoon.",
    category: "body-care",
    price: money(170000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/mineral-salt-scrub/01.jpg",
        alt: "Open jar of Mineral Salt Scrub showing the coarse grain",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/mineral-salt-scrub/02.jpg",
        alt: "Scrub held in a palm, oil separating from the salt",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_scrub_250",
        title: "250 g",
        volumeMl: 250,
        price: money(170000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-SS-250",
      },
    ],
    ingredients: [
      {
        name: "Dead Sea salt",
        inci: "Maris Sal",
        role: "The abrasive. Coarse, and it dissolves as you work rather than staying sharp.",
        concentration: "60%",
      },
      {
        name: "Sunflower oil",
        inci: "Helianthus Annuus Seed Oil",
        role: "The carrier. Light, high in linoleic acid, low comedogenicity.",
      },
      {
        name: "Jojoba",
        inci: "Simmondsia Chinensis Seed Oil",
        role: "Closest of the plant oils to skin's own sebum. Stops the base feeling greasy.",
      },
      {
        name: "Polyglyceryl-4 oleate",
        inci: "Polyglyceryl-4 Oleate",
        role: "The reason it rinses instead of coating the tub.",
      },
      {
        name: "Vitamin E",
        inci: "Tocopherol",
        role: "Keeps the oils stable for the life of the jar.",
      },
    ],
    benefits: [
      "Grains dissolve as you work — starts a scrub, ends an oil",
      "Rinses clean; no residue in the shower",
      "Skin stays soft for two to three days",
      "One jar lasts about three months at twice a week",
    ],
    suitableFor: ["all", "dry"],
    tags: ["body", "exfoliant", "weekly", "scented"],
    reviewsSummary: { rating: 4.3, count: 97, distribution: [3, 5, 12, 27, 50] },
    pairsWith: ["recovery-oil", "mineral-body-wash"],
  },
  {
    id: "prd_recovery_oil",
    slug: "recovery-oil",
    title: "Recovery Oil",
    tagline: "Warms as you work it in",
    description:
      "A body oil built for after a shower or after a long day on your feet, whichever comes first. Arnica and magnesium do the work; a small amount of ginger root gives the faint warmth that tells you it has landed. Dry enough to dress within a couple of minutes.",
    howItWears:
      "Warms gently for the first minute, then settles. Absorbs in about two minutes and does not transfer to clothes or sheets.",
    notFor:
      "Not for the face — the ginger will find every recent shave. And not for broken skin.",
    category: "body-care",
    price: money(220000),
    compareAtPrice: null,
    images: [
      {
        url: "/brand/products/recovery-oil/01.jpg",
        alt: "Recovery Oil bottle with dropper on a dark wooden surface",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/recovery-oil/02.jpg",
        alt: "Oil beading and spreading across a forearm",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/recovery-oil/03.jpg",
        alt: "The amber glass bottle held against low evening light",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_oil_100",
        title: "100 ml",
        volumeMl: 100,
        price: money(220000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-RO-100",
      },
      {
        id: "var_oil_200",
        title: "200 ml",
        volumeMl: 200,
        price: money(380000),
        compareAtPrice: null,
        availableForSale: true,
        sku: "VLA-RO-200",
      },
    ],
    ingredients: [
      {
        name: "Arnica",
        inci: "Arnica Montana Flower Extract",
        role: "The reason this is called Recovery. Traditional use on tired muscle.",
        concentration: "3%",
      },
      {
        name: "Magnesium",
        inci: "Magnesium Chloride",
        role: "Absorbs through skin. Pairs with the arnica.",
      },
      {
        name: "Sweet almond oil",
        inci: "Prunus Amygdalus Dulcis Oil",
        role: "The base. Slow enough to massage with, light enough to dress after.",
      },
      {
        name: "Jojoba",
        inci: "Simmondsia Chinensis Seed Oil",
        role: "Stops the blend feeling heavy on the skin.",
      },
      {
        name: "Ginger root",
        inci: "Zingiber Officinale Root Oil",
        role: "The warmth. Kept low — enough to notice, not enough to sting.",
        concentration: "0.5%",
      },
      {
        name: "Vitamin E",
        inci: "Tocopherol",
        role: "Antioxidant and stabiliser.",
      },
    ],
    benefits: [
      "Warms for about a minute, then settles",
      "Dry enough to dress within two minutes",
      "Arnica and magnesium at stated concentrations",
      "Amber glass — the oils keep longer out of light",
    ],
    suitableFor: ["all", "dry"],
    tags: ["body", "oil", "evening", "scented"],
    reviewsSummary: { rating: 4.7, count: 264, distribution: [4, 5, 12, 44, 199] },
    pairsWith: ["mineral-salt-scrub", "mineral-body-wash"],
  },

  // ── Rituals ───────────────────────────────────────────────────────────────
  {
    id: "prd_morning_ritual",
    slug: "morning-ritual",
    title: "Morning Ritual",
    tagline: "Cleanse, mist, cream — in that order",
    description:
      "The three products that make up a complete morning, in the order they are used. Cleanser, mist, cream. If you are starting with VELA and do not want to think about which piece to buy first, this is the answer.",
    howItWears:
      "About ninety seconds start to finish, once the mist stops feeling like an extra step. Roughly two months at daily use.",
    notFor:
      "Not for anyone already using a cream they like. Buy the cleanser and mist on their own instead.",
    category: "rituals",
    price: money(380000),
    compareAtPrice: money(440000),
    images: [
      {
        url: "/brand/products/morning-ritual/01.jpg",
        alt: "Morning Ritual set — cleanser, mist and cream in the box",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/morning-ritual/02.jpg",
        alt: "The three products lined up on a bathroom shelf in morning light",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_morning_set",
        title: "Set of three",
        volumeMl: 300,
        price: money(380000),
        compareAtPrice: money(440000),
        availableForSale: true,
        sku: "VLA-SET-AM",
      },
    ],
    ingredients: [],
    benefits: [
      "The full morning routine in the order it is used",
      "₹600 less than the three bought separately",
      "Boxed to give — no separate gift packaging needed",
      "Every product inside is refillable",
    ],
    suitableFor: ["all", "dry", "combination", "sensitive"],
    tags: ["set", "gift", "starter"],
    reviewsSummary: { rating: 4.7, count: 132, distribution: [1, 3, 8, 28, 92] },
    pairsWith: ["recovery-oil"],
    contains: ["balance-cleanser", "hydrate-mist", "barrier-cream"],
  },
  {
    id: "prd_evening_ritual",
    slug: "evening-ritual",
    title: "Evening Ritual",
    tagline: "For the end of a long day on your feet",
    description:
      "Cleanser and body oil. The two things worth doing at the end of a day when you will not do four. Small enough to keep by the bed rather than in the bathroom, which is the only reason anyone actually uses an evening routine.",
    howItWears:
      "Under three minutes including the massage. The oil is dry enough to get straight into bed.",
    notFor:
      "Not a complete routine. There is no moisturiser in this box — add Barrier Cream if your skin is dry.",
    category: "rituals",
    price: money(320000),
    compareAtPrice: money(360000),
    images: [
      {
        url: "/brand/products/evening-ritual/01.jpg",
        alt: "Evening Ritual set — cleanser and recovery oil, lamp lit",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/evening-ritual/02.jpg",
        alt: "The set open on a bedside table",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_evening_set",
        title: "Set of two",
        volumeMl: 250,
        price: money(320000),
        compareAtPrice: money(360000),
        availableForSale: true,
        sku: "VLA-SET-PM",
      },
    ],
    ingredients: [],
    benefits: [
      "Two products, not five — a routine you will keep",
      "₹400 less than buying both separately",
      "Sized for a bedside table",
      "Oil dries down enough for sheets",
    ],
    suitableFor: ["all", "dry"],
    tags: ["set", "gift", "evening"],
    reviewsSummary: { rating: 4.5, count: 78, distribution: [1, 3, 6, 20, 48] },
    pairsWith: ["barrier-cream"],
    contains: ["balance-cleanser", "recovery-oil"],
  },
  {
    id: "prd_reset_kit",
    slug: "reset-kit",
    title: "Reset Kit",
    tagline: "The whole body range, once a week",
    description:
      "Wash, scrub and oil — the three body products in the sizes you actually finish. Built around one long shower a week rather than a daily routine, which is the honest frequency for anything involving a scrub.",
    howItWears:
      "Twenty minutes once a week, ten minutes of which is the oil. The wash lasts well beyond the other two.",
    notFor:
      "Not for daily exfoliation. If you scrub more than twice a week, buy the wash and oil and skip the salt.",
    category: "rituals",
    price: money(440000),
    compareAtPrice: money(540000),
    images: [
      {
        url: "/brand/products/reset-kit/01.jpg",
        alt: "Reset Kit — body wash, salt scrub and recovery oil in the box",
        width: 1200,
        height: 1500,
      },
      {
        url: "/brand/products/reset-kit/02.jpg",
        alt: "The three body products on a stone bathroom ledge",
        width: 1200,
        height: 1500,
      },
    ],
    variants: [
      {
        id: "var_reset_set",
        title: "Set of three",
        volumeMl: 750,
        price: money(440000),
        compareAtPrice: money(540000),
        availableForSale: true,
        sku: "VLA-SET-RESET",
      },
    ],
    ingredients: [],
    benefits: [
      "The complete body range in one box",
      "₹1,000 less than the three bought separately",
      "Built for one long shower a week, not a daily routine",
      "Wash and oil both refillable",
    ],
    suitableFor: ["all", "dry"],
    tags: ["set", "gift", "body"],
    reviewsSummary: { rating: 4.6, count: 104, distribution: [2, 3, 9, 30, 60] },
    pairsWith: ["barrier-cream"],
    contains: ["mineral-body-wash", "mineral-salt-scrub", "recovery-oil"],
  },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
