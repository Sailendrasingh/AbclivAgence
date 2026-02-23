/**
 * Test de création d'une agence
 * Exécuter : npx playwright test create-agency --headed
 * Utilise le flux de connexion Admin avec 2FA
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

test.describe('Création d\'agence', () => {
  test('créer une nouvelle agence', async ({ page }) => {
    // 1. Connexion Admin
    await loginAsAdmin(page)

    // 2. Aller sur la page des agences (si pas déjà dessus)
    await page.goto('/dashboard/agences')
    await page.waitForLoadState('networkidle')

    // 3. Cliquer sur le bouton Ajouter
    const addButton = page.getByRole('button', { name: /ajouter/i }).first()
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await addButton.click()

    // 4. Vérifier que le dialog s'ouvre
    await expect(page.getByRole('heading', { name: 'Nouvelle agence' })).toBeVisible({ timeout: 2000 })

    // 5. Remplir le nom de l'agence (nom unique pour éviter les conflits)
    const agencyName = `Agence Test E2E ${Date.now()}`
    await page.fill('#agency-name', agencyName)

    // 6. Cliquer sur Créer
    await page.getByRole('button', { name: 'Créer' }).click()

    // 7. Vérifier le toast ou que l'agence apparaît dans la liste
    await expect(page.getByText(agencyName)).toBeVisible({ timeout: 5000 })

    // 8. Vérifier que le dialog est fermé et l'agence sélectionnée
    await expect(page.getByRole('heading', { name: 'Nouvelle agence' })).not.toBeVisible()
  })
})
