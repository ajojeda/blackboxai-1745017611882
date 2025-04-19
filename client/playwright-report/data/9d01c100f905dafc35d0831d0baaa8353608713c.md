# Test info

- Name: Login Page >> renders login form
- Location: /project/sandbox/user-workspace/client/tests/Login.playwright.test.js:8:7

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

╔════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Looks like you launched a headed browser without having a XServer running.                     ║
║ Set either 'headless: true' or use 'xvfb-run <your-playwright-app>' before running Playwright. ║
║                                                                                                ║
║ <3 Playwright Team                                                                             ║
╚════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /root/.cache/ms-playwright/chromium-1169/chrome-linux/chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AcceptCHFrame,AutoExpandDetailsElement,AvoidUnnecessaryBeforeUnloadCheckSync,CertificateTransparencyComponentUpdater,DeferRendererTasksAfterInput,DestroyProfileOnBrowserClose,DialMediaRouteProvider,ExtensionManifestV2Disabled,GlobalMediaControls,HttpsUpgrades,ImprovedCookieControls,LazyFrameLoading,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --enable-automation --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --no-sandbox --user-data-dir=/tmp/playwright_chromiumdev_profile-XXXXXXEVoWDD --remote-debugging-pipe --no-startup-window
  - <launched> pid=17721
  - [pid=17721][err] [17721:17777:0419/024128.278235:ERROR:dbus/bus.cc:408] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory
  - [pid=17721][err] [17721:17721:0419/024128.327991:ERROR:ui/ozone/platform/x11/ozone_platform_x11.cc:249] Missing X server or $DISPLAY
  - [pid=17721][err] [17721:17721:0419/024128.328012:ERROR:ui/aura/env.cc:257] The platform failed to initialize.  Exiting.

```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Login Page', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('/login');
   6 |   });
   7 |
>  8 |   test('renders login form', async ({ page }) => {
     |       ^ Error: browserType.launch: Target page, context or browser has been closed
   9 |     await expect(page.locator('text=GoodieRun Login')).toBeVisible();
  10 |     await expect(page.locator('input[name="email"]')).toBeVisible();
  11 |     await expect(page.locator('input[name="password"]')).toBeVisible();
  12 |     await expect(page.locator('button:has-text("Log In")')).toBeVisible();
  13 |   });
  14 |
  15 |   test('shows error on failed login', async ({ page }) => {
  16 |     await page.fill('input[name="email"]', 'wrong@example.com');
  17 |     await page.fill('input[name="password"]', 'wrongpass');
  18 |     await page.click('button:has-text("Log In")');
  19 |     await expect(page.locator('text=Invalid credentials')).toBeVisible();
  20 |   });
  21 |
  22 |   test('calls login and redirects on success', async ({ page }) => {
  23 |     await page.fill('input[name="email"]', 'sysadmin@goodierun.com');
  24 |     await page.fill('input[name="password"]', 'SysAdminPass123!');
  25 |     await page.click('button:has-text("Log In")');
  26 |     await expect(page).toHaveURL(/dashboard/);
  27 |   });
  28 | });
  29 |
```