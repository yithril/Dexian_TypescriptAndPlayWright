import { test, expect } from '@playwright/test';
import { InvoicePortalPage } from '../pages/invoice-portal.page.js';

/**
 * Legacy invoice portal — no data-testids, poor a11y.
 *
 * Each test constructs the page object explicitly (no custom fixture yet).
 * Locator strategies live in InvoicePortalPage, not here.
 */
test.describe('Legacy invoice portal', () => {
  test('shows all invoice rows on load', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    await expect(portal.rows()).toHaveCount(5);
  });

  test('search narrows visible rows', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    await portal.searchInput().fill('Acme');
    await expect(portal.rows()).toHaveCount(2);

    await portal.searchInput().fill('Globex');
    await expect(portal.rows()).toHaveCount(1);
  });

  test('assigns a unique vendor row', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    const row = portal.rowByVendor('Northwind Traders');
    await expect(row).toHaveCount(1);

    await portal.assignButtonForRow(row).click();
    await expect(portal.statusInRow(row, 'Assigned')).toBeVisible();
  });

  test('targets duplicate Acme row by vendor and amount', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    await expect(portal.rowByVendor('Acme Corp')).toHaveCount(2);

    const acme1240 = portal.rowByVendorAndAmount('Acme Corp', '$1,240.00');
    await expect(acme1240).toHaveCount(1);

    await portal.assignButtonForRow(acme1240).click();
    await expect(portal.statusInRow(acme1240, 'Assigned')).toBeVisible();

    const acme415 = portal.rowByVendorAndAmount('Acme Corp', '$415.50');
    await expect(portal.statusInRow(acme415, 'Open')).toBeVisible();
  });
});
