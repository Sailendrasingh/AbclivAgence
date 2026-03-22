import { test, expect } from '@playwright/test'
import { expectLoginError, goToLogin, loginAsAdmin } from './utils/auth'

test.describe('Authentification', () => {
  test.beforeEach(async ({ page }) => {
    await goToLogin(page)
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('#login')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.getByRole('button', { name: /se connecter/i })).toBeVisible()
  })

  test('should login with correct credentials', async ({ page }) => {
    await loginAsAdmin(page)
    await expect(page).toHaveURL(/\/dashboard(\/.*)?$/)
  })

  test('should show error with incorrect credentials', async ({ page }) => {
    await page.fill('#login', 'UtilisateurInexistantE2E')
    await page.fill('#password', 'WrongPassword')
    await page.getByRole('button', { name: /se connecter/i }).click()
    await expectLoginError(page)
  })

  test('should require login and password', async ({ page }) => {
    const loginInput = page.locator('#login')
    const passwordInput = page.locator('#password')

    await expect(loginInput).toHaveAttribute('required')
    await expect(passwordInput).toHaveAttribute('required')
  })
})
