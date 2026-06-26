import { test, expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

// ─────────────────────────────────────────────────────────────────────────────
// NewProjectPage - create custom project form
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectFormData = {
  name?:         string
  jurisdiction?: string
  address?:      string
  unitNumber?:   string
  description?:  string
}

export class NewProjectPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────
  readonly heading:             Locator
  readonly jurisdictionSelect:  Locator
  readonly nameInput:           Locator
  readonly addressInput:        Locator
  readonly unitNumberInput:     Locator
  readonly descriptionTextarea: Locator
  readonly submitButton:        Locator
  readonly cancelButton:        Locator
  readonly errorMessage:        Locator

  constructor(page: Page) {
    super(page)

    this.heading             = page.getByRole('heading', { name: 'Create Custom Project' })
    this.jurisdictionSelect  = page.getByTestId('project-jurisdiction')
    this.nameInput           = page.getByTestId('project-name')
    this.addressInput        = page.getByTestId('project-address')
    this.unitNumberInput     = page.getByTestId('project-unit')
    this.descriptionTextarea = page.getByTestId('project-description')
    this.submitButton        = page.getByTestId('project-submit')
    this.cancelButton        = page.getByRole('button', { name: 'Cancel' })
    this.errorMessage        = page.getByTestId('project-form-error')
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  async fill(data: ProjectFormData): Promise<void> {
    await test.step('Fill project form', async () => {
      if (data.name !== undefined)         await this.nameInput.fill(data.name)
      if (data.jurisdiction !== undefined) await this.jurisdictionSelect.selectOption(data.jurisdiction)
      if (data.address !== undefined)      await this.addressInput.fill(data.address)
      if (data.unitNumber !== undefined)   await this.unitNumberInput.fill(data.unitNumber)
      if (data.description !== undefined)  await this.descriptionTextarea.fill(data.description)
    })
  }

  async submit(): Promise<void> {
    await test.step('Submit project form', async () => {
      await this.submitButton.click()
    })
  }

  async cancel(): Promise<void> {
    await test.step('Cancel project form', async () => {
      await this.cancelButton.click()
    })
  }

  // ── Verifications ───────────────────────────────────────────────────────────

  async expectFormVisible(): Promise<void> {
    await test.step('Verify Create Custom Project form is visible', async () => {
      await expect(this.heading).toBeVisible()
    })
  }

  async expectErrorMessage(text: string): Promise<void> {
    await test.step(`Verify form validation error: "${text}"`, async () => {
      await expect(this.errorMessage).toHaveText(text)
    })
  }
}
