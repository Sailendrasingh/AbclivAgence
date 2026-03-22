import { test, expect } from "@playwright/test";
import { expectLoginError } from "./utils/auth";

test.describe("Parcours critiques sécurité", () => {
  test("redirige vers login pour zone dashboard non authentifiée", async ({ page }) => {
    await page.goto("/dashboard/sauvegardes");
    await expect(page).toHaveURL(/\/login/);
  });

  test("refuse une connexion avec mauvais mot de passe", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#login", "UtilisateurInexistantE2E");
    await page.fill("#password", "bad-password");
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expectLoginError(page);
  });
});
