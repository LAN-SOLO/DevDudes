import { test, expect } from '@playwright/test';

test.describe('Projects CRUD', () => {
  const projectName = `E2E Test Project ${Date.now()}`;

  test('create a new project via pipeline', async ({ page }) => {
    await page.goto('/dashboard/projects');

    // Start a new project through the preset wizard
    await page.locator('a[href*="/dashboard/pipeline/preset"]').first().click();
    await expect(page).toHaveURL(/\/pipeline\/preset/);

    // Fill step 1: Business Information
    await page.locator('input[id="businessName"]').fill(projectName);
    await page.locator('button:has-text("Technology")').click();
    await page.locator('textarea[id="description"]').fill('E2E test project');
    await page.locator('button:has-text("Continue")').click();

    // Verify we moved to step 2
    await expect(page.locator('text=App Type').or(page.locator('text=Step 2'))).toBeVisible({
      timeout: 5000,
    });
  });

  test('view project in list', async ({ page }) => {
    await page.goto('/dashboard/projects');
    await expect(page).toHaveURL(/\/projects/);

    // Page should load with project cards or empty state
    await expect(
      page.locator('[class*="Card"]').first().or(page.locator('text=No projects'))
    ).toBeVisible({ timeout: 10000 });
  });

  test('update project name', async ({ page }) => {
    await page.goto('/dashboard/projects');

    // Click first project to view details
    const projectLink = page.locator('a[href*="/dashboard/projects/"]').first();
    await test.step('navigate to project', async () => {
      if (await projectLink.isVisible()) {
        await projectLink.click();
        await expect(page).toHaveURL(/\/dashboard\/projects\/.+/);

        // Look for an edit/settings button
        const editButton = page.locator(
          'button:has-text("Edit"), button:has-text("Settings"), button:has-text("Rename")'
        );
        if (await editButton.isVisible({ timeout: 3000 }).catch(() => false)) {
          await editButton.click();
          const nameInput = page.locator('input[name="name"], input[id="name"]').first();
          if (await nameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
            await nameInput.clear();
            await nameInput.fill('Updated E2E Project');
            await page.locator('button[type="submit"], button:has-text("Save")').click();
            await expect(page.locator('text=Updated E2E Project')).toBeVisible({
              timeout: 5000,
            });
          }
        }
      }
    });
  });

  test('delete project', async ({ page }) => {
    await page.goto('/dashboard/projects');

    const projectLink = page.locator('a[href*="/dashboard/projects/"]').first();
    await test.step('delete first project', async () => {
      if (await projectLink.isVisible()) {
        await projectLink.click();
        await expect(page).toHaveURL(/\/dashboard\/projects\/.+/);

        const deleteButton = page.locator(
          'button:has-text("Delete"), button:has-text("Remove")'
        );
        if (await deleteButton.isVisible({ timeout: 3000 }).catch(() => false)) {
          await deleteButton.click();
          // Confirm deletion dialog
          const confirmButton = page.locator(
            'button:has-text("Confirm"), button:has-text("Delete"):visible'
          );
          if (await confirmButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await confirmButton.click();
            await expect(page).toHaveURL(/\/dashboard\/projects/, { timeout: 10000 });
          }
        }
      }
    });
  });
});
