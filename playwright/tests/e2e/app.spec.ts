import { test } from '../../fixtures'
import { LoginPage } from '../../pages/LoginPage'
import { clearLocalStorageOnLoad } from '../../utils/storage'

test.describe('Smoke', () => {
  test.beforeEach(async ({ page }) => {
    await clearLocalStorageOnLoad(page)
  })

  test('app opens on the sign-in page', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()

    await loginPage.expectLoginPageVisible()
  })
})
