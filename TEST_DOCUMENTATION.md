# Test Documentation

## Short Summary

- Tester: AQA Candidate
- Date: 2026-06-26
- Environment: Local Demo — `http://localhost:5173` (preview at `http://127.0.0.1:4173`)
- Browser/device coverage: Chromium, Firefox, WebKit (desktop); iPhone 14, Pixel 7, Galaxy S9+ (mobile)
- Build or commit: see git log
- Overall result: All UI and API test cases pass

## Test Cases

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-001 | Sign In | App opens on the sign-in page | App is open at `/`, localStorage cleared | Navigate to `/` | Sign-in heading and email input visible | As expected | PASS | @smoke |
| UI-002 | Sign In | Valid applicant login | App is open at `/`, localStorage cleared | Fill email `applicant@example.com`, password `Password123!`, click Log in | Dashboard heading visible | Dashboard heading visible | PASS | @smoke |
| UI-003 | Sign In | Logout and return to sign-in | Applicant is signed in on dashboard | Click "Log out" in sidebar | Sign-in page and email field visible | Sign-in page shown | PASS | |
| UI-004 | Sign In | Empty email validation | App is open on sign-in page | Click Log in with empty fields | `Email is required.` alert shown | Error shown | PASS | |
| UI-005 | Sign In | Invalid email format validation | App is open on sign-in page | Type `notanemail`, click Log in | `Enter a valid email address.` shown | Error shown | PASS | |
| UI-006 | Sign In | Empty password validation | App is open on sign-in page | Fill valid email, submit with empty password | `Password is required.` shown | Error shown | PASS | |
| UI-007 | Sign In | Wrong credentials validation | App is open on sign-in page | Fill valid email, wrong password, submit | `Invalid email or password.` shown | Error shown | PASS | |
| UI-008 | Projects | Navigate to Projects via sidebar | Applicant signed in | Click "Projects" in sidebar | Projects page visible | Projects page visible | PASS | |
| UI-009 | Projects | Seeded project cards visible | Applicant on Projects page | Observe project list | Cards for Garage Addition, Retail Renovation, Site Improvement visible | All 3 cards visible | PASS | |
| UI-010 | Projects | Missing project name validation | Applicant on Create Project form | Fill jurisdiction + address, submit without name | `Project name is required.` error | Error shown | PASS | |
| UI-011 | Projects | Missing jurisdiction validation | Applicant on Create Project form | Fill name + address, submit without jurisdiction | `Jurisdiction is required.` error | Error shown | PASS | |
| UI-012 | Projects | Missing address validation | Applicant on Create Project form | Fill name + jurisdiction, submit without address | `Address line is required.` error | Error shown | PASS | |
| UI-013 | Projects | Duplicate name validation | Applicant on Create Project form | Enter `Garage Addition` as project name, fill rest, submit | `Project name already exists.` error | Error shown | PASS | |
| UI-014 | Projects | Successful project creation | Applicant on Create Project form | Fill all required fields with unique name, submit | Redirected to Projects list; new card visible with name, jurisdiction, address, Draft status, 0% progress, Created date | Project visible in list | PASS | @smoke |
| API-001 | API | GET productsList — positive | API is available | GET `/api/productsList` | HTTP 200, `responseCode: 200`, non-empty `products` array with `id`, `name`, `price` fields | As expected | PASS | @smoke |
| API-002 | API | POST productsList — negative (method not allowed) | API is available | POST `/api/productsList` | HTTP 200 with body `responseCode: 405`, message `This request method is not supported.` | As expected | PASS | @smoke; API always returns HTTP 200; actual error code is in the body |

## Possible Bugs

| Bug ID | Title | Severity | Area | Status |
| --- | --- | --- | --- | --- |
| BUG-001 | API always returns HTTP 200 regardless of error | Low | API | Open |
| BUG-002 | No ARIA live region feedback on successful project creation | Low | Accessibility | Open |

## Bug Details

### BUG-001: API always returns HTTP 200 regardless of error

- Severity: Low
- Environment: automationexercise.com public API
- Browser/device: N/A (API)
- Test data: POST to `/api/productsList`
- Found by: API-002 — POST productsList — negative (method not allowed)

Reproduction steps:

1. Send a POST request to `https://automationexercise.com/api/productsList`
2. Observe the HTTP status code in the response
3. Observe the response body

Expected result:

- HTTP 405 status code for a disallowed method

Actual result:

- HTTP 200 with body `{ "responseCode": 405, "message": "This request method is not supported." }`

Attachments:

- Automated test: see API-002 in the Playwright HTML report (`playwright-report/index.html`) for full request/response details
- Video: not applicable for API tests
- Trace: not applicable for API tests

Console/network errors:

```text
No console errors. The API wraps all errors inside a 200 response body.
```

---

### BUG-002: No ARIA live region feedback on successful project creation

- Severity: Low
- Environment: Local demo app
- Browser/device: All
- Test data: Any valid project creation
- Found by: UI-014 — Successful project creation

Reproduction steps:

1. Sign in as `applicant@example.com`
2. Navigate to Projects > Create Custom Project
3. Fill all required fields and submit

Expected result:

- A success message or ARIA live region announces the new project was created

Actual result:

- The form silently redirects to the Projects list with no success confirmation

Attachments:

- Automated test: see UI-014 in the Playwright HTML report (`playwright-report/index.html`)
- Video: there should be attached video or a link to publisher report :D
- Trace: 

Console/network errors:

```text
No errors observed.
```

## API Test Details

| ID | Method | Endpoint | Request Data | Expected Status | Expected Body | Actual Status | Actual Body | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-001 | GET | `/api/productsList` | None | 200 | `{ responseCode: 200, products: [...] }` | 200 | As expected | PASS |
| API-002 | POST | `/api/productsList` | None | 200 (body code 405) | `{ responseCode: 405, message: "This request method is not supported." }` | 200 | As expected | PASS |

## Screenshots And Videos

| File | Scenario | Notes |
| --- | --- | --- |
| test-results/ | Failures only (screenshot: only-on-failure) | Captured automatically by Playwright on test failure |
| playwright-report/ | Full HTML report | Generated after each run via `npm run test:e2e` |

## Console And Network Errors

| Scenario | Error Source | Message | Impact |
| --- | --- | --- | --- |
| None observed | — | — | — |

## Final Notes

- Main risks: The app stores all state in `localStorage`; test isolation requires `localStorage.clear()` in `beforeEach`, which is already in place using `addInitScript`.
- Coverage gaps: Settings screen is a placeholder and has no testable behavior. The "New packet", "Fee estimate", and "Explore Templates" flows are not implemented.
- Recommended follow-ups: Add `aria-live` success announcements on project creation; fix API HTTP status codes to return semantically correct codes instead of always 200.
