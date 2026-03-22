import { test, expect } from "@playwright/test";
import { expectLoginError } from "./utils/auth";

test.describe("Revue UX performance mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("garde-fous mobile: redirect auth + interaction login", async ({ page }) => {
    const redirectStart = Date.now();
    await page.goto("/dashboard/agences");
    await page.waitForURL(/\/login/, { timeout: 8000 });
    const redirectDuration = Date.now() - redirectStart;
    expect(redirectDuration).toBeLessThan(4000);

    const hasHorizontalOverflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth > 2;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    await page.fill('#login', "UtilisateurInexistantE2E");
    await page.fill('#password', "bad-password");
    const submitStart = Date.now();
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expectLoginError(page);
    const duration = Date.now() - submitStart;

    // Garde-fou simple pour detecter une degradation majeure UX/perf mobile.
    expect(duration).toBeLessThan(4000);
  });
});
