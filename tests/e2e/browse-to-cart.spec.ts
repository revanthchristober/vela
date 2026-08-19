import { expect, test } from "@playwright/test";

test.describe("browse -> PDP -> cart", () => {
  test("a visitor can find a product, open it and add it to the bag", async ({
    page,
  }) => {
    await page.goto("/shop");
    await expect(
      page.getByRole("heading", { level: 1, name: "All products" }),
    ).toBeVisible();

    const firstCard = page.locator('h3 a[href^="/products/"]').first();
    const productTitle = await firstCard.innerText();
    await firstCard.click();

    await expect(
      page.getByRole("heading", { level: 1, name: productTitle }),
    ).toBeVisible();

    await page.getByRole("button", { name: /add to bag/i }).click();

    const drawer = page.getByRole("dialog", { name: "Your bag" });
    await expect(drawer).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: productTitle, exact: true }),
    ).toBeVisible();

    // Closing returns focus to whatever opened the drawer, and the count badge
    // on the header cart button reflects the new line.
    await drawer.getByRole("button", { name: "Close bag", exact: true }).click();
    await expect(drawer).toBeHidden();
    await expect(page.getByRole("button", { name: /open bag, 1 item/i })).toBeVisible();
  });

  test("the cart page reflects a line added from the PDP", async ({ page }) => {
    await page.goto("/shop");
    const firstCard = page.locator('h3 a[href^="/products/"]').first();
    await firstCard.click();
    await page.getByRole("button", { name: /add to bag/i }).click();
    await expect(page.getByRole("dialog", { name: "Your bag" })).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByRole("heading", { level: 1, name: "Your bag" })).toBeVisible();
    await expect(page.getByRole("button", { name: /increase quantity/i })).toBeVisible();
  });
});
