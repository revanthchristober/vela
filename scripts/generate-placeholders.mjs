/**
 * Art-direction placeholders.
 *
 * VELA has no photography yet (Phase 2 asset plan). Rather than ship grey boxes
 * or a third-party placeholder service, this script renders a set of real JPEGs
 * from the token palette: correct aspect ratios, correct file sizes, correct
 * `sizes` behaviour, correct LCP weight. Layout, lazy-loading and CLS are
 * therefore measured against something honest long before a camera is involved.
 *
 * Every image is composed from the same three elements — a warm ground, a soft
 * cast shadow, and a vessel silhouette — so the grid reads as one art direction
 * rather than as nine unrelated placeholders.
 *
 *   pnpm placeholders
 *
 * Replace `public/brand/**` with real photography and delete this script.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public", "brand");

const T = {
  canvas: "#f6f3ee",
  sunken: "#ece6dc",
  raised: "#fdfcfa",
  ink: "#171614",
  accent: "#2e4a3b",
  clay: "#8a3f2c",
  moss: "#4a6b46",
  line: "#ded8cc",
  strong: "#c5bdad",
};

/** Vessel silhouettes, drawn in a 0 0 1000 1250 viewBox. */
const VESSELS = {
  bottle: (fill) => `
    <path d="M455 300 h90 v70 q0 12 10 20 l40 32 q35 28 35 74 v560 q0 44-44 44 h-172 q-44 0-44-44 v-560 q0-46 35-74 l40-32 q10-8 10-20 z"
          fill="${fill}"/>
    <rect x="447" y="248" width="106" height="60" rx="10" fill="${fill}" opacity="0.92"/>`,
  pump: (fill) => `
    <path d="M420 360 h160 q52 0 52 54 v576 q0 46-46 46 h-172 q-46 0-46-46 v-576 q0-54 52-54 z" fill="${fill}"/>
    <rect x="466" y="268" width="68" height="96" rx="8" fill="${fill}" opacity="0.9"/>
    <path d="M466 296 h-74 q-16 0-16 16 v22" fill="none" stroke="${fill}" stroke-width="16" stroke-linecap="round" opacity="0.9"/>`,
  jar: (fill) => `
    <path d="M330 500 h340 q40 0 40 42 v320 q0 44-44 44 h-332 q-44 0-44-44 v-320 q0-42 40-42 z" fill="${fill}"/>
    <rect x="306" y="418" width="388" height="86" rx="16" fill="${fill}" opacity="0.92"/>`,
  dropper: (fill) => `
    <path d="M400 400 h200 q44 0 44 50 v490 q0 46-46 46 h-196 q-46 0-46-46 v-490 q0-50 44-50 z" fill="${fill}"/>
    <rect x="452" y="230" width="96" height="172" rx="14" fill="${fill}" opacity="0.88"/>
    <rect x="486" y="150" width="28" height="90" rx="14" fill="${fill}" opacity="0.7"/>`,
  tube: (fill) => `
    <path d="M370 330 q130 -34 260 0 l44 560 q4 62-58 62 h-232 q-62 0-58-62 z" fill="${fill}"/>
    <rect x="452" y="258" width="96" height="76" rx="10" fill="${fill}" opacity="0.9"/>`,
  set: (fill) => `
    <path d="M228 470 h150 q30 0 30 34 v360 q0 34-34 34 h-142 q-34 0-34-34 v-360 q0-34 30-34 z" fill="${fill}" opacity="0.72"/>
    <path d="M430 380 h150 q30 0 30 36 v450 q0 32-32 32 h-146 q-32 0-32-32 v-450 q0-36 30-36 z" fill="${fill}"/>
    <path d="M632 520 h146 q28 0 28 32 v312 q0 34-32 34 h-138 q-32 0-32-34 v-312 q0-32 28-32 z" fill="${fill}" opacity="0.84"/>`,
};

/** A soft abstract texture frame — used for the "texture" and "detail" shots. */
function textureBody(tint, seed) {
  const blobs = Array.from({ length: 5 }, (_, i) => {
    const a = seed * 37 + i * 71;
    const cx = 180 + ((a * 13) % 640);
    const cy = 220 + ((a * 29) % 820);
    const r = 150 + ((a * 17) % 260);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${tint}" opacity="0.20"/>`;
  }).join("");
  return `${blobs}
    <ellipse cx="500" cy="640" rx="300" ry="300" fill="${tint}" opacity="0.34"/>
    <ellipse cx="500" cy="640" rx="190" ry="190" fill="${tint}" opacity="0.30"/>`;
}

function svg({ w, h, kind, vessel, tint, seed }) {
  const vb = kind === "wide" ? "0 0 1000 750" : "0 0 1000 1250";
  const groundY = kind === "wide" ? 620 : 1010;

  let body;
  if (kind === "texture") body = textureBody(tint, seed);
  else if (kind === "detail")
    body = `
      <rect x="120" y="430" width="760" height="300" rx="18" fill="${tint}" opacity="0.20"/>
      <rect x="180" y="512" width="440" height="20" rx="10" fill="${T.ink}" opacity="0.16"/>
      <rect x="180" y="566" width="600" height="14" rx="7" fill="${T.ink}" opacity="0.11"/>
      <rect x="180" y="606" width="520" height="14" rx="7" fill="${T.ink}" opacity="0.11"/>
      <rect x="180" y="646" width="300" height="14" rx="7" fill="${T.ink}" opacity="0.11"/>`;
  else if (kind === "wide")
    body = `
      <ellipse cx="500" cy="${groundY}" rx="300" ry="34" fill="${T.ink}" opacity="0.07"/>
      <g transform="translate(500 ${groundY}) scale(0.55) translate(-500 -900)">${VESSELS[vessel](tint)}</g>`;
  else
    body = `
      <ellipse cx="500" cy="${groundY}" rx="250" ry="30" fill="${T.ink}" opacity="0.08"/>
      ${VESSELS[vessel](tint)}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${T.raised}"/>
      <stop offset="55%" stop-color="${T.canvas}"/>
      <stop offset="100%" stop-color="${T.sunken}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.32" cy="0.26" r="0.85">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
  ${body}
</svg>`;
}

async function render(path, options) {
  const full = join(OUT, path);
  await mkdir(dirname(full), { recursive: true });
  const buf = Buffer.from(svg(options));
  await sharp(buf).jpeg({ quality: 78, mozjpeg: true }).toFile(full);
  return full;
}

const P = 1200;
const PH = 1500;

/** slug → [vessel, tint, shot kinds] */
const PRODUCTS = {
  "balance-cleanser": ["pump", T.accent, ["vessel", "texture", "detail"]],
  "hydrate-mist": ["bottle", T.moss, ["vessel", "texture"]],
  "barrier-cream": ["jar", T.accent, ["vessel", "texture", "detail"]],
  "mineral-body-wash": ["pump", T.moss, ["vessel", "texture"]],
  "mineral-salt-scrub": ["jar", T.strong, ["vessel", "texture"]],
  "recovery-oil": ["dropper", T.clay, ["vessel", "texture", "detail"]],
  "morning-ritual": ["set", T.accent, ["vessel", "texture"]],
  "evening-ritual": ["set", T.clay, ["vessel", "texture"]],
  "reset-kit": ["set", T.moss, ["vessel", "texture"]],
};

const written = [];

let seed = 1;
for (const [slug, [vessel, tint, kinds]] of Object.entries(PRODUCTS)) {
  for (const [i, kind] of kinds.entries()) {
    const n = String(i + 1).padStart(2, "0");
    written.push(
      await render(`products/${slug}/${n}.jpg`, {
        w: P,
        h: PH,
        kind,
        vessel,
        tint,
        seed: seed++,
      }),
    );
  }
}

// Hero — portrait on the desktop split, and a wide crop for small screens.
written.push(
  await render("hero.jpg", {
    w: 1400,
    h: 1750,
    kind: "vessel",
    vessel: "set",
    tint: T.accent,
    seed: 41,
  }),
);
written.push(
  await render("hero-wide.jpg", {
    w: 1600,
    h: 1200,
    kind: "wide",
    vessel: "set",
    tint: T.accent,
    seed: 42,
  }),
);

// Ingredient sequence — three, one per step.
for (const [i, tint] of [T.accent, T.moss, T.strong].entries()) {
  written.push(
    await render(`ingredients/0${i + 1}.jpg`, {
      w: 1200,
      h: 1500,
      kind: "texture",
      vessel: "jar",
      tint,
      seed: 50 + i,
    }),
  );
}

// Journal cards — landscape.
for (const [i, tint] of [T.clay, T.accent, T.moss].entries()) {
  written.push(
    await render(`journal/0${i + 1}.jpg`, {
      w: 1200,
      h: 900,
      kind: "wide",
      vessel: ["dropper", "jar", "bottle"][i],
      tint,
      seed: 60 + i,
    }),
  );
}

// Story page.
written.push(
  await render("story-01.jpg", {
    w: 1600,
    h: 1200,
    kind: "wide",
    vessel: "tube",
    tint: T.accent,
    seed: 70,
  }),
);
written.push(
  await render("story-02.jpg", {
    w: 1200,
    h: 1500,
    kind: "detail",
    vessel: "jar",
    tint: T.strong,
    seed: 71,
  }),
);

await writeFile(
  join(OUT, "README.md"),
  `# Placeholder art direction

Generated by \`scripts/generate-placeholders.mjs\` (\`pnpm placeholders\`).

These are not photographs. They are token-coloured compositions at the exact
aspect ratios and roughly the byte weight the real images will have, so that
layout, \`sizes\`, lazy-loading and CLS can be measured honestly before the shoot.

Replace this directory with real photography and delete the script.
`,
);

console.warn(`generated ${written.length} placeholders in public/brand`);
