import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ['list'],
        // Blob reporter outputs raw data that can be merged across matrix jobs.
        // The publish job collects all blobs and merges them into one HTML report.
        ['blob', { outputDir: 'blob-report' }],
      ]
    : [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ],
  use: {
    // BASE_URL is set by docker-compose so the runner can reach the app container.
    // Falls back to the local preview server when running outside Docker.
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  // Skip webServer when BASE_URL is provided — the app is already running (e.g. in Docker).
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --host 127.0.0.1',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    // ── Smoke — fast sanity check, Chromium only ──────────────────────────────
    {
      name: 'smoke',
      testMatch: /playwright\/tests\/e2e\/app\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Desktop browsers ──────────────────────────────────────────────────────
    {
      name: 'chromium-desktop',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-desktop',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit-desktop',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },

    // ── Mobile viewports ──────────────────────────────────────────────────────
    {
      name: 'mobile-iphone14',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-pixel7',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-galaxys9',
      testMatch: /playwright\/tests\/e2e\/.+\.spec\.ts/,
      use: { ...devices['Galaxy S9+'] },
    },

    // ── API — no browser ──────────────────────────────────────────────────────
    {
      name: 'api',
      testMatch: /playwright\/tests\/api\/.+\.api\.spec\.ts/,
      use: {},
    },
  ],
})
