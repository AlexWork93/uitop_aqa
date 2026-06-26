import { test, expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

// ─────────────────────────────────────────────────────────────────────────────
// DashboardPage - authenticated home screen
// ─────────────────────────────────────────────────────────────────────────────

export class DashboardPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────
  readonly heading: Locator

  constructor(page: Page) {
    super(page)

    this.heading = page.getByRole('heading', { name: 'Applicant dashboard' })
  }

  // ── Verifications ───────────────────────────────────────────────────────────

  async expectDashboardVisible(): Promise<void> {
    await test.step('Verify dashboard is visible', async () => {
      await expect(this.heading).toBeVisible()
    })
  }
}
