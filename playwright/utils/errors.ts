import type { Page, TestInfo } from '@playwright/test'

// ─────────────────────────────────────────────────────────────────────────────
// Page error listeners
//
// Collects console errors and failed network requests during a test.
// Call attachErrorListeners() once per page; after the test completes the
// fixture reads the collected arrays and attaches them to the report.
// ─────────────────────────────────────────────────────────────────────────────

export interface PageErrors {
  consoleErrors: string[]
  networkErrors: string[]
}

export function collectPageErrors(page: Page): PageErrors {
  const consoleErrors: string[] = []
  const networkErrors: string[] = []

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('requestfailed', request => {
    const reason = request.failure()?.errorText ?? 'unknown'
    networkErrors.push(`${request.method()} ${request.url()} — ${reason}`)
  })

  return { consoleErrors, networkErrors }
}

export async function attachPageErrors(errors: PageErrors, testInfo: TestInfo): Promise<void> {
  if (errors.consoleErrors.length > 0) {
    await testInfo.attach('console-errors', {
      body: errors.consoleErrors.join('\n'),
      contentType: 'text/plain',
    })
  }

  if (errors.networkErrors.length > 0) {
    await testInfo.attach('network-errors', {
      body: errors.networkErrors.join('\n'),
      contentType: 'text/plain',
    })
  }
}
