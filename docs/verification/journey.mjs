/**
 * Phase 2-5 verification harness.
 *
 * Drives a production build in a real browser and asserts the acceptance
 * criteria in docs/acceptance-criteria.md that can be checked mechanically.
 * This is a script, not a test suite - it becomes the Playwright spec in
 * Phase 8. Run `pnpm build && pnpm start` first, then `node docs/verification/journey.mjs`.
 */

import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const results = [];
const errors = [];
let expect404 = false;

function check(name, pass, detail = "") {
  results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

// ---------- Journey: browse -> collection -> PDP -> variant -> add -> drawer ----------
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => {
  if (m.type() === "error" && !expect404) errors.push("[1440] " + m.text());
});
page.on("pageerror", (e) => errors.push("[1440 pageerror] " + e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
check("homepage h1 count is 1", (await page.locator("h1").count()) === 1);
check("hero headline visible", await page.getByRole("heading", { level: 1 }).isVisible());

await page.getByRole("link", { name: "Shop the range" }).first().click();
await page.waitForURL("**/shop");
await page.waitForSelector("article", { timeout: 15000 });
check("nav to /shop", page.url().endsWith("/shop"));
check(
  "shop shows 9 products",
  (await page.locator("article").count()) === 9,
  String(await page.locator("article").count()),
);

await page
  .getByRole("link", { name: /Balance Cleanser/ })
  .first()
  .click();
await page.waitForURL("**/products/balance-cleanser");
check("nav to PDP", page.url().includes("balance-cleanser"));

const priceBefore = await page
  .locator('button:has-text("Add to bag")')
  .first()
  .innerText();
await page.getByText("300 ml refill", { exact: true }).click();
await page.waitForTimeout(200);
const priceAfter = await page
  .locator('button:has-text("Add to bag")')
  .first()
  .innerText();
check(
  "variant change updates the button price",
  priceBefore !== priceAfter,
  `${priceBefore} -> ${priceAfter}`,
);

await page.locator('button:has-text("Add to bag")').first().click();
await page.waitForTimeout(600);
const dialog = page.getByRole("dialog", { name: "Your bag" });
check("add opens the drawer", await dialog.isVisible());
check(
  "drawer shows the added line",
  (await dialog.getByText("Balance Cleanser").count()) > 0,
);
check(
  "drawer shows the chosen variant",
  (await dialog.getByText("300 ml refill").count()) > 0,
);
check(
  "upsell card present",
  (await dialog.getByText("Add to your ritual").count()) === 1,
);

// quantity
await dialog
  .getByRole("button", { name: /Increase quantity/ })
  .first()
  .click();
await page.waitForTimeout(250);
check("quantity increments", (await dialog.locator("text=/^2$/").count()) > 0);

// esc closes + focus returns
await page.keyboard.press("Escape");
await page.waitForTimeout(900);
check("Escape closes the drawer", !(await dialog.isVisible().catch(() => false)));

// persistence across reload
await page.reload({ waitUntil: "networkidle" });
const badge = await page.getByRole("button", { name: /Open bag/ }).innerText();
check("cart survives reload", badge.includes("2"), badge);

expect404 = true;
// 404
await page.goto(BASE + "/products/does-not-exist", { waitUntil: "networkidle" });
check(
  "unknown product 404s",
  (await page.getByText(/That page doesn.t exist/).count()) === 1,
);
await page.goto(BASE + "/shop/not-a-category", { waitUntil: "networkidle" });
check(
  "unknown category 404s",
  (await page.getByText(/That page doesn.t exist/).count()) === 1,
);

// sort writes to URL and survives reload
await page.goto(BASE + "/shop", { waitUntil: "networkidle" });
await page.selectOption("#sort", "price-asc");
await page.waitForTimeout(700);
check("sort writes to the URL", page.url().includes("sort=price-asc"), page.url());
await page.reload({ waitUntil: "networkidle" });
check(
  "sorted view survives reload",
  (await page.locator("#sort").inputValue()) === "price-asc",
);

await page.close();

// ---------- 360px: overflow + sticky bar + mobile menu ----------
const m = await b.newPage({ viewport: { width: 360, height: 780 } });
m.on("console", (c) => {
  if (c.type() === "error") errors.push("[360] " + c.text());
});
m.on("pageerror", (e) => errors.push("[360 pageerror] " + e.message));

for (const path of [
  "/",
  "/shop",
  "/shop/rituals",
  "/products/recovery-oil",
  "/story",
  "/journal",
  "/cart",
]) {
  await m.goto(BASE + path, { waitUntil: "networkidle" });
  const overflow = await m.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`no horizontal overflow at 360 on ${path}`, overflow <= 0, `${overflow}px`);
}

await m.goto(BASE + "/products/recovery-oil", { waitUntil: "networkidle" });
await m.evaluate(() => window.scrollTo(0, 2000));
await m.waitForTimeout(600);
const stickyVisible = await m.evaluate(() => {
  const bar = document.querySelector(".fixed.inset-x-0.bottom-0");
  if (!bar) return false;
  return bar.getBoundingClientRect().top < window.innerHeight - 10;
});
check("mobile sticky buy bar appears after scroll", stickyVisible);

await m.goto(BASE + "/", { waitUntil: "networkidle" });
await m.getByRole("button", { name: "Open menu" }).click();
await m.waitForTimeout(400);
check(
  "mobile menu opens",
  await m.getByRole("navigation", { name: "Main" }).last().isVisible(),
);
await m.close();

// ---------- reduced motion ----------
const r = await b.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await r.goto(BASE + "/", { waitUntil: "networkidle" });
const heroOpacity = await r.evaluate(() => {
  const h = document.querySelector("h1 .hero-line");
  return h ? Number(getComputedStyle(h).opacity) : -1;
});
check("reduced motion: hero text fully visible", heroOpacity === 1, String(heroOpacity));
await r.close();

console.log(results.join("\n"));
console.log(
  "\nCONSOLE ERRORS: " + (errors.length === 0 ? "none" : "\n" + errors.join("\n")),
);
await b.close();
