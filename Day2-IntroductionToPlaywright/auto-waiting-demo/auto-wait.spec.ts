import { test, expect } from '@playwright/test';

/**
 * The whole point of this file: notice what is NOT here.
 * No sleeps, no WebDriverWait, no "wait until visible" helpers, no re-finding
 * elements after the DOM changes. A locator is a lazy, self-re-resolving query.
 */

test.describe('How locators really work', () => {
  test('Scenario 1: a locator is just a recipe; the assertion auto-waits', async ({ page }) => {
    // Define the locator BEFORE we even navigate. It references nothing yet -
    // it is only a description of how to find the element later.
    const claim = page.getByRole('button', { name: 'Claim reward' });

    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 1' }).click();

    // The button is injected after a random delay. We never wait explicitly;
    // the assertion polls until it appears (or the timeout is hit).
    await expect(claim).toBeVisible();
  });

  test('Scenario 2: one locator survives destroy + re-create (no re-targeting)', async ({ page }) => {
    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 2' }).click();

    const widget = page.getByTestId('widget');
    await expect(widget).toBeVisible();

    await page.getByRole('button', { name: 'Destroy' }).click();
    await expect(widget).toBeHidden(); // removed from the DOM counts as hidden

    await page.getByRole('button', { name: 'Re-create' }).click();

    // Same locator variable. In Selenium the old reference would be stale and
    // you'd have to find it again; here it simply re-resolves the new node.
    await expect(widget).toBeVisible();
  });

  test('Scenario 3: click() waits for the button to become actionable', async ({ page }) => {
    await page.goto('index.html');
    await page.getByRole('link', { name: 'Scenario 3' }).click();

    // The button starts disabled and is enabled after a random delay.
    // click() auto-waits for it to be enabled - no explicit wait needed.
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted!')).toBeVisible(); // wait for the spinner to disappear
  });
});
