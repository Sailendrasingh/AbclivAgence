import { test, expect } from "@playwright/test";

test.describe("Parcours critiques sécurité", () => {
  test("redirige vers login pour zone dashboard non authentifiée", async ({ page }) => {
    await page.goto("/dashboard/sauvegardes");
    await expect(page).toHaveURL(/\/login/);
  });

  test("refuse une connexion avec mauvais mot de passe", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="login"], input[type="text"]', "Admin");
    await page.fill('input[name="password"], input[type="password"]', "bad-password");
    await page.click('button[type="submit"]');
    await expect(page.getByText(/incorrect/i)).toBeVisible();
  });
});
