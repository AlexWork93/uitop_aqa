# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/sign-in.spec.ts >> Sign In >> valid credentials sign in and land on dashboard
- Location: playwright/tests/e2e/sign-in.spec.ts:18:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-zCxhoE -juggler-pipe -silent
  - <launched> pid=896
  - [pid=896][err] [896] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=896][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=896] <process did exit: exitCode=1, signal=null>
  - [pid=896] starting temporary directories cleanup
  - [pid=896] <gracefully close start>
  - [pid=896] <kill>
  - [pid=896] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=896] finished temporary directories cleanup
  - [pid=896] <gracefully close end>

```