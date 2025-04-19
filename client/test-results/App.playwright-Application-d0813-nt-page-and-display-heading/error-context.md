# Test info

- Name: Application Main Pages >> should load Department Management page and display heading
- Location: /project/sandbox/user-workspace/client/tests/App.playwright.test.js:24:9

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
  - <launching> /root/.cache/ms-playwright/chromium-1169/chrome-linux/chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AcceptCHFrame,AutoExpandDetailsElement,AvoidUnnecessaryBeforeUnloadCheckSync,CertificateTransparencyComponentUpdater,DeferRendererTasksAfterInput,DestroyProfileOnBrowserClose,DialMediaRouteProvider,ExtensionManifestV2Disabled,GlobalMediaControls,HttpsUpgrades,ImprovedCookieControls,LazyFrameLoading,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --enable-automation --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --no-sandbox --user-data-dir=/tmp/playwright_chromiumdev_profile-XXXXXXpl19Ae --remote-debugging-pipe --no-startup-window
  - <launched> pid=17910
  - [pid=17910][err] [17910:17949:0419/024130.104003:ERROR:dbus/bus.cc:408] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory
  - [pid=17910][err] [17910:17910:0419/024130.109203:ERROR:ui/ozone/platform/x11/ozone_platform_x11.cc:249] Missing X server or $DISPLAY
  - [pid=17910][err] [17910:17910:0419/024130.109218:ERROR:ui/aura/env.cc:257] The platform failed to initialize.  Exiting.

```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const adminPages = [
   4 |   { name: 'Dashboard', path: '/dashboard', heading: 'Dashboard' },
   5 |   { name: 'User Management', path: '/admin/user-management', heading: 'User Management' },
   6 |   { name: 'Department Management', path: '/admin/department-management', heading: 'Department Management' },
   7 |   { name: 'Role Management', path: '/admin/role-management', heading: 'Role Management' },
   8 |   { name: 'Site Management', path: '/admin/site-management', heading: 'Site Management' },
   9 |   { name: 'Site Appearance Settings', path: '/admin/site-appearance-settings', heading: 'Site Appearance Settings' },
  10 | ];
  11 |
  12 | test.describe('Application Main Pages', () => {
  13 |   test.beforeEach(async ({ page }) => {
  14 |     // Login before each test
  15 |     await page.goto('/login');
  16 |     await page.fill('input[name="email"]', 'sysadmin@goodierun.com');
  17 |     await page.fill('input[name="password"]', 'SysAdminPass123!');
  18 |     await page.click('button:has-text("Log In")');
  19 |     // Wait for navigation after login
  20 |     await page.waitForURL(/dashboard/);
  21 |   });
  22 |
  23 |   for (const pageInfo of adminPages) {
> 24 |     test(`should load ${pageInfo.name} page and display heading`, async ({ page }) => {
     |         ^ Error: browserType.launch: Target page, context or browser has been closed
  25 |       await page.goto(pageInfo.path);
  26 |       await expect(page.locator(`text=${pageInfo.heading}`)).toBeVisible();
  27 |     });
  28 |   }
  29 | });
  30 |
```