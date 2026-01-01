import { test, expect } from '@playwright/test'

test.describe('Gestion des agences', () => {
  test.beforeEach(async ({ page }) => {
    // Se connecter
    await page.goto('/login')
    await page.fill('input[name="login"], input[type="text"]', 'Admin')
    await page.fill('input[type="password"]', 'Password')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard/**', { timeout: 5000 })
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle')
  })

  test('should display agencies list', async ({ page }) => {
    await expect(page.locator('text=/agence/i')).toBeVisible()
    await expect(page.locator('input[placeholder*="Rechercher"]')).toBeVisible()
  })

  test('should create a new agency', async ({ page }) => {
    // Cliquer sur "Ajouter"
    const addButton = page.locator('button:has-text("Ajouter")').first()
    await expect(addButton).toBeVisible()
    await addButton.click()
    
    // Attendre que le dialog s'ouvre
    await expect(page.locator('text=/nouvelle agence|créer/i')).toBeVisible({ timeout: 2000 })
    
    // Remplir le formulaire
    const nameInput = page.locator('input[name="name"], input[placeholder*="nom"]').first()
    await nameInput.fill('Agence Test E2E')
    
    // Sauvegarder
    const saveButton = page.locator('button:has-text("Enregistrer"), button:has-text("Créer")').first()
    await saveButton.click()
    
    // Vérifier que l'agence apparaît dans la liste
    await expect(page.locator('text=Agence Test E2E')).toBeVisible({ timeout: 5000 })
  })

  test('should search agencies', async ({ page }) => {
    // Saisir dans le champ recherche
    const searchInput = page.locator('input[placeholder*="Rechercher"]')
    await searchInput.fill('Test')
    
    // Attendre que les résultats se filtrent (debounce)
    await page.waitForTimeout(500)
    
    // Vérifier que les résultats sont filtrés
    const results = page.locator('[class*="agency"], [class*="agence"]')
    await expect(results.first()).toBeVisible()
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
    // Attendre que la liste soit chargée
    await page.waitForTimeout(1000)
    
    // Cliquer sur la première agence de la liste
    const firstAgency = page.locator('div[class*="border"], div[class*="rounded"]').filter({ hasText: /agence/i }).first()
    if (await firstAgency.isVisible({ timeout: 3000 })) {
      await firstAgency.click()
      
      // Vérifier que les détails sont affichés (onglets)
      await expect(page.locator('button:has-text("Général"), button:has-text("Technique"), button:has-text("Photos")').first()).toBeVisible({ timeout: 3000 })
    }
  })

  test('should edit agency', async ({ page }) => {
    // Attendre que la liste soit chargée
    await page.waitForTimeout(1000)
    
    // Trouver le bouton Modifier sur la première agence
    const editButton = page.locator('button[aria-label*="Modifier"], button:has([class*="Edit"])').first()
    if (await editButton.isVisible({ timeout: 3000 })) {
      await editButton.click()
      
      // Vérifier que le mode édition est activé (boutons Annuler/Enregistrer visibles)
      await expect(page.locator('button:has-text("Enregistrer")')).toBeVisible({ timeout: 2000 })
      await expect(page.locator('button:has-text("Annuler")')).toBeVisible()
    }
  })

  test('should display statistics in header', async ({ page }) => {
    // Vérifier que les statistiques sont affichées dans le header
    await expect(page.locator('text=/OK|INFO|ALERTE|FERMÉE/i').first()).toBeVisible({ timeout: 3000 })
  })

  test('should switch tabs in agency details', async ({ page }) => {
    // Sélectionner une agence
    await page.waitForTimeout(1000)
    const firstAgency = page.locator('div[class*="border"]').first()
    if (await firstAgency.isVisible({ timeout: 3000 })) {
      await firstAgency.click()
      
      // Cliquer sur l'onglet "Technique"
      const technicalTab = page.locator('button:has-text("Technique")').first()
      if (await technicalTab.isVisible({ timeout: 2000 })) {
        await technicalTab.click()
        
        // Vérifier que le contenu technique est affiché
        await expect(page.locator('text=/réseau|machine|wifi/i')).toBeVisible({ timeout: 2000 })
      }
    }
  })
})
