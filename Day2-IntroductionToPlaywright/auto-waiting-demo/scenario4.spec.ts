import { test, expect } from '@playwright/test';

/**
 * Scenario 4 - why you pass a LOCATOR to expect(), not an awaited VALUE.
 *
 * The status element exists at load showing "Pending..." and flips to "Done"
 * after a random delay. These three tests contrast what that means.
 *
 * NOTE: the third test fails ON PURPOSE - that failure is the lesson. Run just
 * this file to demo it:  npx playwright test scenario4
 */

test.describe('Scenario 4: await inside expect', () => {
  test('correct: locator form auto-retries until the text is Done', async ({ page }) => {
    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 4' }).click();

    const status = page.getByTestId('job-status');
    // The matcher re-checks the element until it reads "Done" (or times out).
    await expect(status).toHaveText('Done');
  });

  test('harmless: awaiting the locator is a no-op (locators are not Promises)', async ({ page }) => {
    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 4' }).click();

    // `await` on a Locator returns the same Locator, so expect() still gets a
    // locator and still auto-retries. The await does nothing - but it passes.
    await expect(await page.getByTestId('job-status')).toHaveText('Done');
  });

  test('broken: awaiting a value takes a one-shot snapshot and fails', async ({ page }) => {
    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 4' }).click();

    // textContent() resolves immediately (the element is already present), so we
    // capture the stale "Pending..." and compare once - no retry. This FAILS,
    // and the failure is exactly the point: expected "Done", received "Pending...".
    expect(await page.getByTestId('job-status').textContent()).toBe('Done');
  });
});
