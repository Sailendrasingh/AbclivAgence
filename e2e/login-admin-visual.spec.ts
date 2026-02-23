/**
 * Test visuel de connexion Admin avec 2FA
 * Exécuter en mode visible : npx playwright test login-admin-visual --headed
 * Le secret 2FA peut être passé via ADMIN_2FA_SECRET (sinon le test s'arrête à l'étape 2FA)
 */
import { test, expect } from '@playwright/test'
import { TOTP, Secret } from 'otpauth'

const ADMIN_2FA_SECRET = process.env.ADMIN_2FA_SECRET || '37ZCBWCSRS27VICE6KUG2D66G3OFFDUY'

function generateTOTP(): string {
  const secret = Secret.fromBase32(ADMIN_2FA_SECRET)
  const totp = new TOTP({
    secret,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  })
  return totp.generate()
}

test.describe('Connexion Admin - Test visuel', () => {
  test('connexion Admin avec mot de passe et 2FA', async ({ page }) => {
    // 1. Aller sur la page de login
    await page.goto('/login')

    // 2. Vérifier que le formulaire est visible
    await expect(page.locator('#login')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.getByRole('button', { name: /se connecter/i })).toBeVisible()

    // 3. Remplir identifiant et mot de passe
    await page.fill('#login', 'Admin')
    await page.fill('#password', 'Password')

    // 4. Soumettre
    await page.getByRole('button', { name: /se connecter/i }).click()

    // 5. Attendre soit le champ 2FA (2s), soit la redirection (si 2FA désactivé)
    const twoFactorInput = page.locator('#twoFactorToken')
    try {
      await twoFactorInput.waitFor({ state: 'visible', timeout: 3000 })
    } catch {
      // Pas de 2FA ou déjà redirigé
    }
    const twoFactorVisible = await twoFactorInput.isVisible()

    if (twoFactorVisible) {
      // 6a. Remplir le code 2FA
      const code = generateTOTP()
      await twoFactorInput.fill(code)
      await page.getByRole('button', { name: /se connecter/i }).click()
    }

    // 7. Attendre la redirection vers le dashboard
    await page.waitForURL(/\/(dashboard|dashboard\/agences)/, { timeout: 10000 })

    // 8. Vérifier qu'on est connecté (pas sur /login)
    await expect(page).not.toHaveURL(/\/login/)
    await expect(page).toHaveURL(/\/dashboard/)

    // 9. Vérifier un élément du dashboard (sidebar)
    await expect(page.getByText('Gestion Agences')).toBeVisible({ timeout: 5000 })
  })
})
