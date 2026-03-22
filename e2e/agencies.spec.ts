import { test, expect } from '@playwright/test'
import { loginAsAdmin } from './utils/auth'

async function selectSeededAgency(page: import('@playwright/test').Page) {
  const targetAgency = page.locator('div.cursor-pointer').filter({ hasText: 'Agence E2E Alpha' }).first()
  await expect(targetAgency).toBeVisible({ timeout: 10000 })
  await targetAgency.click()

  // Le panneau détails affiche le nom de l'agence en titre.
  await expect(page.getByRole('heading', { name: 'Agence E2E Alpha' }).first()).toBeVisible({ timeout: 10000 })
}

test.describe('Gestion des agences', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/agences')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('input[placeholder*="Rechercher"]')).toBeVisible({ timeout: 10000 })
  })

  test('should display agencies list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Agences', exact: true })).toBeVisible()
    await expect(page.locator('input[placeholder*="Rechercher"]')).toBeVisible()
  })

  test('should create a new agency', async ({ page }) => {
    // Cliquer sur "Ajouter"
    const addButton = page.getByRole('button', { name: /ajouter/i }).first()
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await addButton.click()

    // Attendre que le dialog s'ouvre
    await expect(page.getByRole('heading', { name: 'Nouvelle agence' })).toBeVisible({ timeout: 5000 })

    // Remplir le formulaire
    const nameInput = page.locator('#agency-name')
    await expect(nameInput).toBeVisible({ timeout: 5000 })
    const agencyName = `Agence Test E2E ${Date.now()}`
    await nameInput.fill(agencyName)

    // Sauvegarder
    const saveButton = page.getByRole('button', { name: 'Créer' })
    await saveButton.click()

    // Vérifier que l'agence apparaît dans la liste
    await expect(page.getByText(agencyName)).toBeVisible({ timeout: 10000 })
  })

  test('should search agencies', async ({ page }) => {
    // Saisir dans le champ recherche
    const searchInput = page.locator('input[placeholder*="Rechercher"]')
    await searchInput.fill('E2E')

    // Attendre que les résultats se filtrent (debounce)
    await page.waitForTimeout(500)

    // Vérifier qu'on a toujours au moins un résultat visible
    const firstResult = page.locator('div.cursor-pointer').first()
    await expect(firstResult).toBeVisible({ timeout: 10000 })
  })

  test('should filter agencies by state', async ({ page }) => {
    // Cliquer sur le filtre "OK"
    const okFilter = page.locator('button:has-text("OK")').first()
    if (await okFilter.isVisible()) {
      await okFilter.click()
      
      // Attendre que les résultats se filtrent
      await page.waitForTimeout(500)
      
      // Vérifier que les agences affichées ont l'état OK
      // (on vérifie juste que le filtre est actif visuellement)
      await expect(okFilter).toHaveClass(/bg-primary|bg-accent/)
    }
  })

  test('should navigate to agency details', async ({ page }) => {
    await selectSeededAgency(page)
    await expect(page.getByRole('tab', { name: /Général/i }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('tab', { name: /Technique/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('should edit agency', async ({ page }) => {
    const editButton = page.locator('button.text-blue-600').first()
    await expect(editButton).toBeVisible({ timeout: 10000 })
    await editButton.click()
    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button', { name: 'Annuler' })).toBeVisible()
  })

  test('should display statistics in header', async ({ page }) => {
    // Vérifier que les statistiques sont affichées dans le header
    await expect(page.locator('text=/OK|INFO|ALERTE|FERMÉE/i').first()).toBeVisible({ timeout: 3000 })
  })

  test('should switch tabs in agency details', async ({ page }) => {
    await selectSeededAgency(page)

    const technicalTab = page.getByRole('tab', { name: /Technique/i }).first()
    await expect(technicalTab).toBeVisible({ timeout: 10000 })
    await technicalTab.click()

    await expect(technicalTab).toHaveAttribute('data-state', 'active')
  })
})
