import { test as base, expect, type Page } from '@playwright/test'
import { AEClient } from '../api-client/AEClient'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { credentials } from '../test-data/constants'
import { clearLocalStorageOnLoad } from '../utils/storage'
import { collectPageErrors, attachPageErrors } from '../utils/errors'

// ─────────────────────────────────────────────────────────────────────────────
// Custom Fixtures
// ─────────────────────────────────────────────────────────────────────────────

export type Fixtures = {
  apiClient:    AEClient
  loggedInPage: Page
  _pageErrors:  void
}

export const test = base.extend<Fixtures>({

  // ── _pageErrors (auto) ─────────────────────────────────────────────────────
  // Automatically attaches console and network errors to every test's report.
  // No test needs to declare this — { auto: true } makes it run for all tests
  // that import from this fixture file.
  _pageErrors: [async ({ page }, use, testInfo) => {
    const errors = collectPageErrors(page)

    await use()

    await attachPageErrors(errors, testInfo)
  }, { auto: true }],

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
