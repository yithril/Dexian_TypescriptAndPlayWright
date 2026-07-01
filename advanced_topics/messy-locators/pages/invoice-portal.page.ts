import type { Locator, Page } from '@playwright/test';

/**
 * Page object for the legacy invoice portal (index.html).
 *
 * All messy locator strategies live here — specs stay readable.
 * No data-testid hooks on the app; devs skipped labels and reused button text.
 */
export class InvoicePortalPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('index.html');
  }

  /** Search field has placeholder only — no accessible label. Last-resort locator. */
  searchInput() {
    return this.page.getByPlaceholder('Search invoices');
  }

  /** Data rows only — excludes the header row (no Assign button inside). */
  rows() {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('button', { name: 'Assign' }) });
  }

  /** Narrow to rows containing vendor name — may match more than one (e.g. Acme Corp). */
  rowByVendor(vendor: string) {
    return this.rows().filter({ hasText: vendor });
  }

  /** Chain filters to disambiguate duplicate vendor names. */
  rowByVendorAndAmount(vendor: string, amount: string) {
    return this.rows().filter({ hasText: vendor }).filter({ hasText: amount });
  }

  /** Same as chained filters — alternative syntax using .and(). */
  rowByVendorAndAmountAnd(vendor: string, amount: string) {
    return this.rows().filter({ hasText: vendor }).and(this.page.getByRole('row').filter({ hasText: amount }));
  }

  /** Scope to the row — every row has an identical "Assign" label at page level. */
  assignButtonForRow(row: Locator) {
    return row.getByRole('button', { name: 'Assign' });
  }

  /** Icon-only delete — no aria-label. Scoped to row; delete is the last button. */
  deleteButtonForRow(row: Locator) {
    return row.getByRole('button').last();
  }

  statusInRow(row: Locator, status: string) {
    return row.getByText(status, { exact: true });
  }
}
