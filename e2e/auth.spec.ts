import { test, expect } from '@playwright/test';

// These tests run WITHOUT stored auth state
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication', () => {
  test('signup with valid credentials', async ({ page }) => {
    await page.goto('/signup');

    const timestamp = Date.now();
    await page.locator('input[type="email"]').fill(`e2e+${timestamp}@test.com`);
    await page.locator('input[type="password"]').fill('TestPass1234');
    await page.locator('button[type="submit"]').click();

    // Expect success message or redirect (depends on email confirmation setting)
    await expect(
      page.locator('text=Check your email').or(page.locator('text=/dashboard/'))
    ).toBeVisible({ timeout: 10000 });
  });

  test('login with valid credentials', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'E2E credentials not set');

    await page.goto('/login');
    await page.locator('input[type="email"]').fill(email!);
    await page.locator('input[type="password"]').fill(password!);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill('invalid@test.com');
    await page.locator('input[type="password"]').fill('WrongPassword1');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.text-red-500')).toBeVisible({ timeout: 10000 });
  });

  test('logout redirects to login', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'E2E credentials not set');

    // Log in first
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(email!);
    await page.locator('input[type="password"]').fill(password!);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Click logout
    await page.locator('button:has-text("Logout"), button:has-text("Sign out"), button:has-text("Log out")').click();

    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test('protected route redirects unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});
