import { test, expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

// ─────────────────────────────────────────────────────────────────────────────
// ProjectsPage - projects list screen
// ─────────────────────────────────────────────────────────────────────────────

export class ProjectsPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────
  readonly section:             Locator
  readonly createProjectButton: Locator
  readonly cards:               Locator

  constructor(page: Page) {
    super(page)

    this.section             = page.getByTestId('projects-page')
    this.createProjectButton = page.getByTestId('create-project-button')
    this.cards               = page.getByTestId('project-card')
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  async openCreateForm(): Promise<void> {
    await test.step('Click Create Custom Project button', async () => {
      await this.createProjectButton.click()
    })
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  card(name: string): Locator {
    return this.cards.filter({ hasText: name })
  }

  // ── Verifications ───────────────────────────────────────────────────────────

  async expectProjectsPageVisible(): Promise<void> {
    await test.step('Verify Projects page is visible', async () => {
      await expect(this.section).toBeVisible()
    })
  }

  async expectCardVisible(name: string): Promise<void> {
    await test.step(`Verify project card "${name}" is visible`, async () => {
      await expect(this.card(name)).toBeVisible()
    })
  }

  async expectNewProjectCard(name: string, jurisdiction: string, address: string): Promise<void> {
    await test.step(`Verify newly created project card "${name}"`, async () => {
      const card = this.card(name)
      await expect(card).toBeVisible()
      await expect(card).toContainText(jurisdiction)
      await expect(card).toContainText(address)
      await expect(card).toContainText('Draft')
      await expect(card).toContainText('0%')
      await expect(card).toContainText('Created')
    })
  }
}
