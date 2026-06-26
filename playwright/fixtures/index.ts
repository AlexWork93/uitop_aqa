import { test as base, expect, type Page } from '@playwright/test'
import { AEClient } from '../api-client/AEClient'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { credentials } from '../test-data/constants'
import { clearLocalStorageOnLoad } from '../utils/storage'

// ─────────────────────────────────────────────────────────────────────────────
// Custom Fixtures
// ─────────────────────────────────────────────────────────────────────────────

export type Fixtures = {
  apiClient:    AEClient
  loggedInPage: Page
}

export const test = base.extend<Fixtures>({

  // ── apiClient ──────────────────────────────────────────────────────────────
  apiClient: async ({ request }, use) => {
    await use(new AEClient(request))
  },

  // ── loggedInPage ───────────────────────────────────────────────────────────
  // Yields a Page already signed in as the demo applicant.
  // localStorage is cleared before login so each test starts from a clean state.
  loggedInPage: async ({ page }, use) => {
    await clearLocalStorageOnLoad(page)

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(credentials.email, credentials.password)

    const dashboard = new DashboardPage(page)
    await expect(dashboard.heading).toBeVisible()

    await use(page)
  },
})

export { expect }
