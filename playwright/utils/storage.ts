import type { Page } from '@playwright/test'

// ─────────────────────────────────────────────────────────────────────────────
// Storage helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Registers an init script that clears localStorage before every page load.
 * Must be called before page.goto() — addInitScript runs on each navigation.
 */
export async function clearLocalStorageOnLoad(page: Page): Promise<void> {
  await page.addInitScript(() => localStorage.clear())
}
