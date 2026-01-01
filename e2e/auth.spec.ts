import { test, expect } from '@playwright/test'

test.describe('Authentification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[name="login"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should login with correct credentials', async ({ page }) => {
    await page.fill('input[name="login"]', 'Admin')
    await page.fill('input[name="password"]', 'Password')
    await page.click('button[type="submit"]')
    
    // Attendre la redirection vers le dashboard
    await page.waitForURL('/dashboard/agences', { timeout: 5000 })
    
    // Vérifier qu'on est bien sur la page des agences
    await expect(page).toHaveURL(/.*dashboard\/agences/)
  })

  test('should show error with incorrect credentials', async ({ page }) => {
    await page.fill('input[name="login"]', 'Admin')
    await page.fill('input[name="password"]', 'WrongPassword')
    await page.click('button[type="submit"]')
    
    // Attendre le message d'erreur
    await expect(page.locator('text=/incorrect/i')).toBeVisible({ timeout: 3000 })
  })

  test('should require login and password', async ({ page }) => {
    // Essayer de soumettre sans remplir les champs
    await page.click('button[type="submit"]')
    
    // Le formulaire HTML5 devrait empêcher la soumission
    // ou un message d'erreur devrait apparaître
    const loginInput = page.locator('input[name="login"]')
    const passwordInput = page.locator('input[name="password"]')
    
    // Vérifier que les champs sont requis (HTML5 validation)
    await expect(loginInput).toHaveAttribute('required')
    await expect(passwordInput).toHaveAttribute('required')
  })
})
