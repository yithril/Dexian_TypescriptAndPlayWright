import { test, expect } from '@playwright/test';
import { OrdersTable } from './tables-sort-pagination.page';

test.describe('Sortable, paginated table', () => {
  test('paging through the table', async ({ page }) => {
    const orders = new OrdersTable(page);
    await orders.goto();

    // 12 orders, 5 per page -> 3 pages.
    await expect(orders.rows).toHaveCount(5);
    await expect(orders.pageIndicator).toHaveText('Page 1 of 3');
    await expect(orders.prevButton).toBeDisabled();

    await orders.nextButton.click();
    await expect(orders.pageIndicator).toHaveText('Page 2 of 3');
    await expect(orders.firstRowId()).toHaveText('ORD-1006');

    await orders.nextButton.click();
    await expect(orders.pageIndicator).toHaveText('Page 3 of 3');
    await expect(orders.rows).toHaveCount(2);
    await expect(orders.nextButton).toBeDisabled();
  });

  test('sorting by total toggles ascending and descending', async ({ page }) => {
    const orders = new OrdersTable(page);
    await orders.goto();

    await orders.sortByTotal.click();
    await expect(orders.firstRowTotal()).toHaveText('$45.00');

    await orders.sortByTotal.click();
    await expect(orders.firstRowTotal()).toHaveText('$999.99');
  });
});
