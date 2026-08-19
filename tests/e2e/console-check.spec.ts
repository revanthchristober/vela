import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/shop",
  "/products/balance-cleanser",
  "/cart",
  "/story",
  "/journal",
];

for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(route);
    expect(errors, errors.join("\n")).toEqual([]);
  });
}
