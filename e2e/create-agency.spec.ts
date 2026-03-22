/**
 * Test de création d'une agence
 * Exécuter : npx playwright test create-agency --headed
 * Utilise le flux de connexion Admin avec 2FA
 */
import { test, expect } from '@playwright/test'
import { loginAsAdmin } from './utils/auth'

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
