import { test, expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

// ─────────────────────────────────────────────────────────────────────────────
// LoginPage - /
// ─────────────────────────────────────────────────────────────────────────────

export class LoginPage extends BasePage {
  readonly url = '/'

  // ── Locators ───────────────────────────────────────────────────────────────
  readonly heading:       Locator
  readonly emailInput:    Locator
  readonly passwordInput: Locator
  readonly submitButton:  Locator
  readonly errorMessage:  Locator

  constructor(page: Page) {
    super(page)

    this.heading       = page.getByRole('heading', { name: 'CivicFlow Demo' })
    this.emailInput    = page.getByTestId('login-email')
    this.passwordInput = page.getByTestId('login-password')
    this.submitButton  = page.getByTestId('login-submit')
    this.errorMessage  = page.getByTestId('login-error')
  }

  // ── Interactions ───────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate(this.url)
  }

  async login(email: string, password: string): Promise<void> {
    await test.step('Fill and submit login form', async () => {
      await this.emailInput.fill(email)
      await this.passwordInput.fill(password)
      await this.submitButton.click()
    })
  }

  async fillEmail(email: string): Promise<void> {
    await test.step(`Fill email with "${email}"`, async () => {
      await this.emailInput.fill(email)
    })
  }

  async submit(): Promise<void> {
    await test.step('Submit login form', async () => {
      await this.submitButton.click()
    })
  }

  // ── Verifications ───────────────────────────────────────────────────────────

  async expectLoginPageVisible(): Promise<void> {
    await test.step('Verify sign-in page is visible', async () => {
      await expect(this.heading).toBeVisible()
      await expect(this.emailInput).toBeVisible()
    })
  }

  async expectErrorMessage(text: string): Promise<void> {
    await test.step(`Verify login error: "${text}"`, async () => {
      await expect(this.errorMessage).toHaveText(text)
    })
  }
}
