/**
 * Test visuel mobile : changement d'une agence à l'autre
 * Exécuter : npx playwright test mobile-agency-switch --headed
 * Vueport mobile 375x667 (iPhone SE)
 */
import { test, expect } from '@playwright/test'
import { TOTP, Secret } from 'otpauth'

const ADMIN_2FA_SECRET = process.env.ADMIN_2FA_SECRET || '37ZCBWCSRS27VICE6KUG2D66G3OFFDUY'

function generateTOTP(): string {
  const secret = Secret.fromBase32(ADMIN_2FA_SECRET)
  const totp = new TOTP({ secret, algorithm: 'SHA1', digits: 6, period: 30 })
  return totp.generate()
}

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await page.goto('/login')
  await page.fill('#login', 'Admin')
  await page.fill('#password', 'Password')
  await page.getByRole('button', { name: /se connecter/i }).click()

  const twoFactorInput = page.locator('#twoFactorToken')
  try {
    await twoFactorInput.waitFor({ state: 'visible', timeout: 3000 })
    await twoFactorInput.fill(generateTOTP())
    await page.getByRole('button', { name: /se connecter/i }).click()
  } catch {
    // Pas de 2FA
  }
  await page.waitForURL(/\/(dashboard|dashboard\/agences)/, { timeout: 10000 })
}

test.describe('Mobile - Changement d\'agence', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  })

  test('passer d\'une agence à l\'autre sur mobile', async ({ page }) => {
    test.setTimeout(60000)
    // 1. Connexion Admin
    await loginAsAdmin(page)

    // 2. Aller sur la page des agences
    await page.goto('/dashboard/agences')
    await page.waitForLoadState('networkidle')

    // 3. Attendre que la liste des agences soit visible (Master)
    const searchInput = page.locator('input[placeholder*="Rechercher"]')
    await expect(searchInput).toBeVisible({ timeout: 5000 })

    // 4. Vérifier qu'il y a au moins 2 agences (sinon en créer une)
    const agencyCards = page.locator('div.cursor-pointer').filter({ has: page.locator('.font-semibold') })
    const count = await agencyCards.count()

    if (count < 2) {
      // Créer une agence pour le test
      const addButton = page.getByRole('button', { name: /ajouter/i }).first()
      if (await addButton.isVisible()) {
        await addButton.click()
        await page.fill('#agency-name', `Agence Mobile Test ${Date.now()}`)
        await page.getByRole('button', { name: 'Créer' }).click()
        await page.waitForTimeout(500)
      }
    }

    // 5. Récupérer le nom de la première agence
    const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('.font-semibold') })
    const firstAgencyName = (await cards.nth(0).locator('.font-semibold').textContent())?.trim()
    expect(firstAgencyName).toBeTruthy()

    // 6. Cliquer sur la première agence -> affichage Détails plein écran
    await cards.nth(0).click()
    await page.waitForTimeout(1000)

    // 7. Vérifier qu'on voit les détails (titre h2 dans la zone Détails)
    await expect(page.getByRole('heading', { name: firstAgencyName!, level: 2 })).toBeVisible({ timeout: 3000 })
    await expect(page.getByRole('button', { name: /retour à la liste/i })).toBeVisible({ timeout: 2000 })

    // 8. Cliquer Retour -> retour à la liste Master
    await page.getByRole('button', { name: /retour à la liste/i }).click()
    await page.waitForTimeout(1000)

    // 9. Vérifier qu'on revoit la liste (Master visible)
    await expect(page.getByRole('heading', { name: 'Agences', exact: true })).toBeVisible({ timeout: 3000 })

    // 10. Re-cliquer sur la même agence pour vérifier le cycle liste -> détails
    await page.locator('.cursor-pointer').filter({ hasText: firstAgencyName! }).first().click()
    await page.waitForTimeout(1000)

    // 11. Vérifier qu'on voit les détails (bouton Retour + nom de l'agence)
    await expect(page.getByRole('button', { name: /retour à la liste/i })).toBeVisible({ timeout: 3000 })
    await expect(page.getByRole('heading', { name: firstAgencyName!, level: 2 })).toBeVisible({ timeout: 2000 })

    // 12. Cliquer Retour une dernière fois
    await page.getByRole('button', { name: /retour à la liste/i }).click()
    await page.waitForTimeout(1000)

    // 13. Vérifier qu'on est bien revenu à la liste
    await expect(page.getByRole('heading', { name: 'Agences', exact: true })).toBeVisible({ timeout: 3000 })
  })
})
