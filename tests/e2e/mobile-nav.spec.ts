import { devices, expect, test } from "@playwright/test";

test.use({ ...devices["Pixel 7"] });

test("mobile menu opens, shows nav links, and closes on escape", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();

  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" }).last()).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("adding to cart on mobile opens the drawer and shows the line", async ({ page }) => {
  await page.goto("/shop");
  const firstCard = page.locator('h3 a[href^="/products/"]').first();
  const productTitle = await firstCard.innerText();
  await firstCard.click();

  await page.getByRole("button", { name: /add to bag/i }).click();

  const drawer = page.getByRole("dialog", { name: "Your bag" });
  await expect(drawer).toBeVisible();
  await expect(
    drawer.getByRole("link", { name: productTitle, exact: true }),
  ).toBeVisible();
});
