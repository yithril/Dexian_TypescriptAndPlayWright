import { test, expect } from '@playwright/test';

/**
 * Seed test.
 *
 * The Planner agent runs this first to bootstrap the environment and to learn
 * how your tests start. Keep it tiny: open the app and prove the page loaded.
 * The agents build everything else on top of this starting point.
 */
test('seed', async ({ page }) => {
  await page.goto('index.html');
  await expect(page.getByText('GearLoop')).toBeVisible();
});
