# CivicFlow Demo — AQA Test Suite

Playwright test suite for the CivicFlow Demo app: a local React/Vite applicant portal used as an AQA candidate exercise. Covers UI flows (sign-in, dashboard, projects) across desktop and mobile browsers, plus API tests against an external REST service.

## Stack

| Tool | Version | Purpose |
|---|---|---|
| `@playwright/test` | ^1.54.0 | Test framework (browser + API) |
| TypeScript | ^5.8 | Language |
| Vite + React | ^7 / ^19 | App under test |
| cross-env | ^10 | Cross-platform env vars in npm scripts |

## Project Structure

```
uitop_aqa/
├── src/                          ← React app source
├── playwright/
│   ├── tests/
│   │   ├── e2e/                  ← UI specs
│   │   └── api/                  ← API specs
│   ├── pages/                    ← Page Object Models
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── ProjectsPage.ts
│   │   └── NewProjectPage.ts
│   ├── fixtures/
│   │   └── index.ts              ← loggedInPage, apiClient, _pageErrors fixtures
│   ├── api-client/
│   │   └── AEClient.ts           ← typed wrapper for automationexercise.com API
│   ├── test-data/
│   │   └── constants.ts          ← credentials, error messages, project data
│   └── utils/
│       ├── storage.ts
│       └── errors.ts             ← console/network error collectors
├── playwright.config.ts
├── Dockerfile                    ← multi-stage: build app → serve with vite preview
├── docker-compose.yml            ← single civicflow service, port 4173
├── .vscode/settings.json         ← points VS Code Playwright extension at Docker
└── .github/workflows/
    ├── smoke.yml
    └── regression.yml
```

## Prerequisites

- Node.js 20+
- npm
- Docker Desktop (for Docker workflow)

## Setup

```bash
npm install
npx playwright install
```

## Running the App

### Without Docker

```bash
npm run dev        # dev server at http://localhost:5173
npm run preview    # production preview at http://127.0.0.1:4173
```

### With Docker

```bash
docker compose up --build
```

Builds and serves the app at `http://localhost:4173`. Keep this running while executing tests.

## Running Tests

### Against local app (auto-starts vite preview)

```bash
npm run test:e2e
npx playwright test --project=chromium-desktop
```

### Against Docker app

```bash
# All projects
npm run test:e2e:docker

# Chromium only
npm run test:e2e:docker:chromium
```

### VS Code green triangle

The `.vscode/settings.json` sets `BASE_URL=http://localhost:4173` for the Playwright extension automatically — clicking the green triangle runs against the Docker app. Requires `docker compose up` to be running first.

### Open HTML report

```bash
npx playwright show-report
```

## Test Projects

| Project | Scope | Browser |
|---|---|---|
| `smoke` | `e2e/app.spec.ts` only | Chromium |
| `api` | `api/*.api.spec.ts` | none |
| `chromium-desktop` | all e2e | Chrome |
| `firefox-desktop` | all e2e | Firefox |
| `webkit-desktop` | all e2e | Safari |
| `mobile-iphone14` | all e2e | iPhone 14 |
| `mobile-pixel7` | all e2e | Pixel 7 |
| `mobile-galaxys9` | all e2e | Galaxy S9+ |

## CI Pipelines

### Smoke (`smoke.yml`)

Triggers on every pull request targeting any branch **except** main/master.

- Runs `--project=smoke --project=api` (fast sanity check)
- Report uploaded on failure only, retained 7 days
- Run name: `Smoke, from {branch} to {target}`

### E2E Regression (`regression.yml`)

Triggers on pull requests targeting `main`/`master` and daily at 06:00 UTC.

- `desktop` job: matrix over chromium-desktop, firefox-desktop, webkit-desktop
- `mobile` job: matrix over mobile-iphone14, mobile-pixel7, mobile-galaxys9
- `fail-fast: false` — one browser failure does not cancel others
- All blob reports merged into a single HTML report and published to GitHub Pages
- Run name: `E2E Regression, from {branch} to {target}` / `Daily #{run_number}`

**Playwright report:** `https://alexwork93.github.io/uitop_aqa/`

## Error Logging

Console errors and failed network requests are automatically collected for every test via the `_pageErrors` auto-use fixture and attached to the test report as plain-text artifacts (`console-errors`, `network-errors`).

## Demo Credentials

```
Email:    applicant@example.com
Password: Password123!
```

All data is fake and stored in browser `localStorage` only. To reset, clear `localStorage` or use the **Reset demo data** button on the Projects page.
