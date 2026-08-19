import { expect, test } from "@playwright/test";

test("an unknown product slug renders the 404 page", async ({ page }) => {
  const response = await page.goto("/products/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: /doesn.t exist/i }),
  ).toBeVisible();
});

test("an unknown shop category renders the 404 page", async ({ page }) => {
  const response = await page.goto("/shop/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("the cart page renders an empty state with no lines added", async ({ page }) => {
  await page.goto("/cart");
  await expect(page.getByRole("heading", { level: 1, name: "Your bag" })).toBeVisible();
  await expect(page.getByRole("link", { name: /shop the range/i })).toBeVisible();
});
