import { test } from '../../fixtures'
import { LoginPage } from '../../pages/LoginPage'
import { DashboardPage } from '../../pages/DashboardPage'
import { credentials, loginErrors } from '../../test-data/constants'
import { clearLocalStorageOnLoad } from '../../utils/storage'

test.describe('Sign In', () => {
  let loginPage: LoginPage
  let dashboard: DashboardPage

  test.beforeEach(async ({ page }) => {
    await clearLocalStorageOnLoad(page)
    loginPage = new LoginPage(page)
    dashboard = new DashboardPage(page)
    await loginPage.goto()
  })

  test('app opens on the sign-in page', { tag: '@smoke' }, async () => {
    await loginPage.expectLoginPageVisible()
  })

  test('valid credentials sign in and land on dashboard', { tag: '@smoke' }, async () => {
    await loginPage.login(credentials.email, credentials.password)

    await dashboard.expectDashboardVisible()
  })

  test('can log out and return to sign-in page', async () => {
    await loginPage.login(credentials.email, credentials.password)
    await dashboard.expectDashboardVisible()

    await dashboard.logout()

    await loginPage.expectLoginPageVisible()
  })

  test('empty email shows validation error', async () => {
    await loginPage.submit()

    await loginPage.expectErrorMessage(loginErrors.emailRequired)
  })

  test('invalid email format shows validation error', async () => {
    await loginPage.fillEmail('notanemail')
    await loginPage.submit()

    await loginPage.expectErrorMessage(loginErrors.emailInvalid)
  })

  test('empty password shows validation error', async () => {
    await loginPage.login(credentials.email, '')

    await loginPage.expectErrorMessage(loginErrors.passwordRequired)
  })

  test('wrong credentials show error', async () => {
    await loginPage.login(credentials.email, 'WrongPassword!')

    await loginPage.expectErrorMessage(loginErrors.invalidCredentials)
  })
})
