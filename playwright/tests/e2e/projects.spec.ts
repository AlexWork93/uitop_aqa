import { test } from '../../fixtures'
import { ProjectsPage } from '../../pages/ProjectsPage'
import { NewProjectPage } from '../../pages/NewProjectPage'
import { projectErrors, seededProjects, jurisdictions } from '../../test-data/constants'

test.describe('Projects', () => {
  test.describe('Projects Navigation', () => {
    test('navigating to Projects via sidebar shows the projects page', async ({ loggedInPage: page }) => {
      const projectsPage = new ProjectsPage(page)

      await projectsPage.goToProjects()

      await projectsPage.expectProjectsPageVisible()
    })

    test('seeded project cards are all visible', async ({ loggedInPage: page }) => {
      const projectsPage = new ProjectsPage(page)

      await projectsPage.goToProjects()

      await projectsPage.expectCardVisible(seededProjects.garageAddition)
      await projectsPage.expectCardVisible(seededProjects.retailRenovation)
      await projectsPage.expectCardVisible(seededProjects.siteImprovement)
    })
  })

  test.describe('Custom Project Creation — validation', () => {
    test.beforeEach(async ({ loggedInPage: page }) => {
      const projectsPage = new ProjectsPage(page)
      await projectsPage.goToProjects()
      await projectsPage.openCreateForm()
      await new NewProjectPage(page).expectFormVisible()
    })

    test('missing project name shows validation error', async ({ loggedInPage: page }) => {
      const form = new NewProjectPage(page)

      await form.fill({ jurisdiction: jurisdictions.sampleCity, address: '123 Test St' })
      await form.submit()

      await form.expectErrorMessage(projectErrors.nameRequired)
    })

    test('missing jurisdiction shows validation error', async ({ loggedInPage: page }) => {
      const form = new NewProjectPage(page)

      await form.fill({ name: 'My Project', address: '123 Test St' })
      await form.submit()

      await form.expectErrorMessage(projectErrors.jurisdictionRequired)
    })

    test('missing address line shows validation error', async ({ loggedInPage: page }) => {
      const form = new NewProjectPage(page)

      await form.fill({ name: 'My Project', jurisdiction: jurisdictions.sampleCity })
      await form.submit()

      await form.expectErrorMessage(projectErrors.addressRequired)
    })

    test('duplicate project name shows validation error', async ({ loggedInPage: page }) => {
      const form = new NewProjectPage(page)

      await form.fill({
        name:         seededProjects.garageAddition,
        jurisdiction: jurisdictions.sampleCity,
        address:      '123 Test St',
      })
      await form.submit()

      await form.expectErrorMessage(projectErrors.duplicateName)
    })
  })

  test.describe('Custom Project Creation — successful flow', () => {
    test('creates project and verifies it appears in the list', async ({ loggedInPage: page }) => {
      const projectsPage = new ProjectsPage(page)
      const form         = new NewProjectPage(page)
      const name         = 'New Test Project'
      const jurisdiction = jurisdictions.exampleCounty
      const address      = '789 Demo Blvd'

      await projectsPage.goToProjects()
      await projectsPage.openCreateForm()
      await form.fill({ name, jurisdiction, address })
      await form.submit()

      await projectsPage.expectProjectsPageVisible()
      await projectsPage.expectNewProjectCard(name, jurisdiction, address)
    })
  })
})
