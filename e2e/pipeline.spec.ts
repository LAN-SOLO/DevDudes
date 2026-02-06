import { test, expect } from '@playwright/test';

test.describe('Pipeline Flow', () => {
  test('navigate through pipeline steps', async ({ page }) => {
    await page.goto('/dashboard/projects');

    // Find a project with an active pipeline and continue, or start new
    const startLink = page.locator('a[href*="/dashboard/pipeline/preset"]').first();
    const continueButton = page.locator('button:has-text("Continue to")').first();

    if (await continueButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await continueButton.click();
    } else if (await startLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await startLink.click();
    }

    // Should be on a pipeline page
    await expect(page).toHaveURL(/\/dashboard\/pipeline\//);
  });

  test('preset wizard loads', async ({ page }) => {
    await page.goto('/dashboard/pipeline/preset');

    // Step 1 should show business name field
    await expect(page.locator('input[id="businessName"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Technology")')).toBeVisible();
    await expect(page.locator('textarea[id="description"]')).toBeVisible();
  });

  test('combo dude page loads with project', async ({ page }) => {
    // First get a project ID from the projects page
    await page.goto('/dashboard/projects');

    const projectLink = page.locator('a[href*="/dashboard/projects/"]').first();
    if (await projectLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      const href = await projectLink.getAttribute('href');
      const projectId = href?.split('/').pop();

      if (projectId) {
        await page.goto(`/dashboard/pipeline/combo?project=${projectId}`);
        await expect(
          page
            .locator('text=Generate App Concept')
            .or(page.locator('text=Architecture Overview'))
            .or(page.locator('text=Configuration Summary'))
        ).toBeVisible({ timeout: 10000 });
      }
    }
  });
});
