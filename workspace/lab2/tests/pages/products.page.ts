import { Page, Locator } from '@playwright/test';

/**
 * Page object for the BulkBox products page (`/products`).
 *
 * THIS IS A SKELETON - Task 4 is to fill it in. Each method below has its
 * signature stubbed and a `throw` placeholder for the body. Replace each body
 * with a real implementation, then use this class from your product tests
 * instead of sprinkling raw locators through your specs.
 *
 * The left "filter panel" is a CLEAN zone (stable `data-testid` hooks). The
 * results grid on the right is a MESSY zone that simulates a third-party data
 * grid: no test ids, hashed class names, and some duplicate product names. For
 * the grid, locate by ARIA role + visible text and narrow with `filter()`.
 */
export class ProductsPage {
  constructor(private readonly page: Page) {}

  // --- Task 4: fill in each body. ---

  /**
   * Navigate to the products page. Pass query params (e.g. `{ q: 'Tape' }` or
   * `{ category: 'tape' }`) to land with a search or category pre-applied.
   */
  async goto(params?: { category?: string; q?: string }): Promise<void> {
    throw new Error('TODO: navigate to /products (optionally with ?category= or ?q=)');
  }

  /** Pick a category by slug (e.g. 'tape', 'boxes', 'all'). */
  async selectCategory(slug: string): Promise<void> {
    throw new Error('TODO: check the category radio for `slug`');
  }

  /** Turn on the "in stock only" filter. */
  async toggleInStockOnly(): Promise<void> {
    throw new Error('TODO: check the "in stock only" box');
  }

  /** Choose a sort order. */
  async sortBy(order: 'featured' | 'price-asc' | 'price-desc'): Promise<void> {
    throw new Error('TODO: select the sort order');
  }

  /** Read the displayed results count and return it as a number. */
  async getResultsCount(): Promise<number> {
    throw new Error('TODO: read the results-count text, return it as a number');
  }

  /** Every product row in the results grid (role="row"). */
  rows(): Locator {
    throw new Error('TODO: return all product rows (role="row")');
  }

  /** The row(s) whose visible text contains `name` (may match more than one). */
  rowByName(name: string): Locator {
    throw new Error('TODO: return the row(s) whose text contains `name`');
  }

  /** How many product rows are currently shown. */
  async getRowCount(): Promise<number> {
    throw new Error('TODO: return how many product rows are shown');
  }

  /** The price text shown for the row named `name`. */
  async getRowPrice(name: string): Promise<string | null> {
    throw new Error('TODO: return the price text for the row named `name`');
  }

  // Tasks 7 & 8: you will ADD methods here (add-to-cart by name + price; open
  // the category mega-menu and click a subcategory by role + visible text).
}
