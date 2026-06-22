import { Page, Locator } from '@playwright/test';

/** Page object for the sortable, paginated orders table. */
export class OrdersTable {
  readonly table: Locator;
  readonly rows: Locator;
  readonly pageIndicator: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly sortByTotal: Locator;

  constructor(private readonly page: Page) {
    this.table = page.getByTestId('orders-table');
    this.rows = page.getByTestId('order-row');
    this.pageIndicator = page.getByTestId('page-indicator');
    this.nextButton = page.getByTestId('pagination-next');
    this.prevButton = page.getByTestId('pagination-prev');
    this.sortByTotal = page.getByTestId('sort-total');
  }

  async goto(): Promise<void> {
    await this.page.goto('/orders');
  }

  /** The order id in the first visible row. */
  firstRowId(): Locator {
    return this.rows.first().getByTestId('cell-id');
  }

  /** The total in the first visible row. */
  firstRowTotal(): Locator {
    return this.rows.first().getByTestId('cell-total');
  }
}
