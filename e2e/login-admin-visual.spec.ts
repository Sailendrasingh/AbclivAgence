/**
 * Test visuel de connexion Admin avec 2FA
 * Exécuter en mode visible : npx playwright test login-admin-visual --headed
 * Le secret 2FA peut être passé via ADMIN_2FA_SECRET (sinon le test s'arrête à l'étape 2FA)
 */
import { test, expect } from '@playwright/test'
import { loginAsAdmin } from './utils/auth'

test.describe('Connexion Admin - Test visuel', () => {
  test('connexion Admin avec mot de passe et 2FA', async ({ page }) => {
    await loginAsAdmin(page)

    // 8. Vérifier qu'on est connecté (pas sur /login)
    await expect(page).not.toHaveURL(/\/login/)
    await expect(page).toHaveURL(/\/dashboard/)

    // 9. Vérifier un élément du dashboard (sidebar)
    await expect(page.getByText('Gestion Agences')).toBeVisible({ timeout: 5000 })
  })
})
