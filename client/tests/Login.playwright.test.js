import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('renders login form', async ({ page }) => {
    await expect(page.locator('text=GoodieRun Login')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Log In")')).toBeVisible();
  });

  test('shows error on failed login', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button:has-text("Log In")');
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('calls login and redirects on success', async ({ page }) => {
    await page.fill('input[name="email"]', 'sysadmin@goodierun.com');
    await page.fill('input[name="password"]', 'SysAdminPass123!');
    await page.click('button:has-text("Log In")');
    await expect(page).toHaveURL(/dashboard/);
  });
});
