import { test, expect } from '@playwright/test';

const adminPages = [
  { name: 'Dashboard', path: '/dashboard', heading: 'Dashboard' },
  { name: 'User Management', path: '/admin/user-management', heading: 'User Management' },
  { name: 'Department Management', path: '/admin/department-management', heading: 'Department Management' },
  { name: 'Role Management', path: '/admin/role-management', heading: 'Role Management' },
  { name: 'Site Management', path: '/admin/site-management', heading: 'Site Management' },
  { name: 'Site Appearance Settings', path: '/admin/site-appearance-settings', heading: 'Site Appearance Settings' },
];

test.describe('Application Main Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'sysadmin@goodierun.com');
    await page.fill('input[name="password"]', 'SysAdminPass123!');
    await page.click('button:has-text("Log In")');
    // Wait for navigation after login
    await page.waitForURL(/dashboard/);
  });

  for (const pageInfo of adminPages) {
    test(`should load ${pageInfo.name} page and display heading`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await expect(page.locator(`text=${pageInfo.heading}`)).toBeVisible();
    });
  }
});
