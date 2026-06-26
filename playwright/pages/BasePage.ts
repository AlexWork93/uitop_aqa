import { test, type Page, type Locator } from '@playwright/test'

// ─────────────────────────────────────────────────────────────────────────────
// BasePage — shared sidebar navigation present on all authenticated screens
// ─────────────────────────────────────────────────────────────────────────────

export abstract class BasePage {
  // ── Sidebar nav ────────────────────────────────────────────────────────────
  readonly navDashboard: Locator
  readonly navProjects:  Locator
  readonly navSettings:  Locator
  readonly navLogout:    Locator

  constructor(protected readonly page: Page) {
    this.navDashboard = page.getByRole('button', { name: 'Dashboard' })
    this.navProjects  = page.getByTestId('sidebar-projects')
    this.navSettings  = page.getByRole('button', { name: 'Settings' })
    this.navLogout    = page.getByTestId('logout-button')
  }

  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path)
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  async logout(): Promise<void> {
    await test.step('Click Log out in sidebar', async () => {
      await this.navLogout.click()
    })
  }

  async goToProjects(): Promise<void> {
    await test.step('Navigate to Projects via sidebar', async () => {
      await this.navProjects.click()
    })
  }
}
