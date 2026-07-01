import { test, expect } from '@playwright/test';
import { InvoicePortalPage } from '../pages/invoice-portal.page.js';

/**
 * Legacy invoice portal — no data-testids, poor a11y.
 */
test.describe('Messy locators — filter, and, or', () => {
  test('filter() picks one row when vendor name is duplicated', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    // Data rows only — skip the header row (it has no Assign button inside).
    //.filter() takes five options: has, hasNot, hasText, hasNotText, and visible
    const dataRows = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Assign' }),
    });

    // getByText('Acme Corp') at page level matches 2 rows — strict mode throws.
    // filter() narrows the list step by step until exactly one row remains.
    const acme415 = dataRows
      .filter({ hasText: 'Acme Corp' })
      .filter({ hasText: '$415.50' });

    await expect(acme415).toHaveCount(1);

    await acme415.getByRole('button', { name: 'Assign' }).click();
    await expect(acme415.getByText('Assigned', { exact: true })).toBeVisible();
  });

  test('.and() requires every condition on the same element', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    const dataRows = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Assign' }),
    });

    // .and() intersects two locators — the row must satisfy BOTH at once.
    // Same result as chaining two .filter() calls, but makes the intent explicit.
    const acme1240 = dataRows
      .filter({ hasText: 'Acme Corp' })
      .and(page.getByRole('row').filter({ hasText: '$1,240.00' }));

    await expect(acme1240).toHaveCount(1);

    await acme1240.getByRole('button', { name: 'Assign' }).click();
    await expect(acme1240.getByText('Assigned', { exact: true })).toBeVisible();
  });

  test('.or() handles mixed control types in legacy markup', async ({ page }) => {
    const portal = new InvoicePortalPage(page);
    await portal.goto();

    // Contoso is the only row with a link instead of a button for Assign.
    const contoso = page.getByRole('row').filter({ hasText: 'Contoso Ltd' });

    // .or() matches whichever control exists — button on most rows, link on Contoso.
    const assign = contoso
      .getByRole('button', { name: 'Assign' })
      .or(contoso.getByRole('link', { name: 'Assign invoice' }));

    await assign.click();
    await expect(contoso.getByText('Assigned', { exact: true })).toBeVisible();
  });
});
