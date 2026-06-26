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
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-NW4mEl -juggler-pipe -silent
  - <launched> pid=928
  - [pid=928][err] [928] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=928][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=928] <process did exit: exitCode=1, signal=null>
  - [pid=928] starting temporary directories cleanup
  - [pid=928] <gracefully close start>
  - [pid=928] <kill>
  - [pid=928] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=928] finished temporary directories cleanup
  - [pid=928] <gracefully close end>

```