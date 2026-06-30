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

  /**
   * Navigate to the products page. Pass query params (e.g. `{ q: 'Tape' }` or
   * `{ category: 'tape' }`) to land with a search or category pre-applied.
   */
  async goto(params?: { category?: string; q?: string }): Promise<void> {
    let uri = '/products';
    const hasCategory = params?.category != null && params?.category != '';
    const hasItem = params?.q != null && params?.category != '';

    if (hasCategory && hasItem)
      uri = uri + `?q=${params?.q}&category=${params?.category}`;
    else if (hasCategory)
      uri = uri + `?category=${params?.category}`;
    else if (hasItem)
      uri = uri + `?q=${params?.q}`;

    await this.page.goto(uri);
  }
  
  /** Pick a category by slug (e.g. 'tape', 'boxes', 'all'). */
  async selectCategory(slug: string): Promise<void> {
    const id = 'category-radio-' + slug.toLowerCase();
    try {
      await this.page.getByTestId(id).click({ timeout: 1000 });
    } catch {
      throw new Error(`Category "${slug}" not found.`);
    }
  }

  /** Turn on the "in stock only" filter. */
  async toggleInStockOnly(): Promise<void> {
    const id = 'in-stock-only';
    await this.page.getByTestId(id).click();
  }

  /** Choose a sort order. */
  async sortBy(order: 'featured' | 'price-asc' | 'price-desc'): Promise<void> {
    await this.page.getByTestId('sort-select').selectOption(order);
  }

  /** Read the displayed results count and return it as a number. */
  async getResultsCount(): Promise<number> {
    const currentResults = await this.page.getByTestId('results-count').textContent();
    const resultCount = parseInt(currentResults ?? '0');
    return resultCount;
  }

  /** Every product row in the results grid (role="row"). */
  rows(): Locator {
    return this.page.getByRole('row');
  }

  /** The row(s) whose visible text contains `name` (may match more than one). */
  rowByName(name: string): Locator {
    return this.page.getByRole('row').getByText(name, { exact: false });
  }

  /** How many product rows are currently shown. */
  async getRowCount(): Promise<number> {
    let rows = this.rows();
    return await rows.count();
  }

  /** The price text shown for the row named `name`. */
  async getRowPrice(name: string): Promise<string | null> {
    throw new Error('TODO: return the price text for the row named `name`');
  }

  // Tasks 7 & 8: you will ADD methods here (add-to-cart by name + price; open
  // the category mega-menu and click a subcategory by role + visible text).
}

