import { expect, type Page } from "@playwright/test";
import { Secret, TOTP } from "otpauth";

const ADMIN_LOGIN = process.env.E2E_ADMIN_LOGIN || "Admin";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || "Password";
const DEFAULT_ADMIN_2FA_SECRET = "37ZCBWCSRS27VICE6KUG2D66G3OFFDUY";

function generateTOTP(secretBase32: string): string {
  const secret = Secret.fromBase32(secretBase32);
  const totp = new TOTP({ secret, algorithm: "SHA1", digits: 6, period: 30 });
  return totp.generate();
}

export async function goToLogin(page: Page): Promise<void> {
  await page.goto("/login");
  await expect(page.locator("#login")).toBeVisible({ timeout: 15000 });
  await expect(page.locator("#password")).toBeVisible({ timeout: 15000 });
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await goToLogin(page);

  await page.locator("#login").fill(ADMIN_LOGIN);
  await page.locator("#password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /se connecter/i }).click();

  const twoFactorInput = page.locator("#twoFactorToken");
  const dashboardRegex = /\/dashboard(\/.*)?$/;

  // Either we are redirected directly, or a 2FA code is requested first.
  const directRedirect = await page
    .waitForURL(dashboardRegex, { timeout: 7000 })
    .then(() => true)
    .catch(() => false);

  if (!directRedirect && (await twoFactorInput.isVisible())) {
    const adminSecret = process.env.ADMIN_2FA_SECRET || DEFAULT_ADMIN_2FA_SECRET;
    await twoFactorInput.fill(generateTOTP(adminSecret));
    await page.getByRole("button", { name: /se connecter/i }).click();
    await page.waitForURL(dashboardRegex, { timeout: 10000 });
  }

  await expect(page).toHaveURL(dashboardRegex, { timeout: 10000 });
}

export async function expectLoginError(page: Page): Promise<void> {
  await expect(page.getByText(/incorrect|invalide|erreur|identifiants/i)).toBeVisible({
    timeout: 8000,
  });
}
