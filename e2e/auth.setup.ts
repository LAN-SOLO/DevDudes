import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const email = process.env.E2E_USER_EMAIL;
  const password = process.env.E2E_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'E2E_USER_EMAIL and E2E_USER_PASSWORD environment variables are required'
    );
  }

  await page.goto('/login');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  // Wait for redirect to dashboard after successful login
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

  await page.context().storageState({ path: authFile });
});
