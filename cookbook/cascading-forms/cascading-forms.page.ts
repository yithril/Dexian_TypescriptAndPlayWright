import { Page, Locator } from '@playwright/test';

/**
 * Page object for the BulkBox "Quick Order" cascade (category -> subcategory).
 * Standalone on purpose: everything this example needs lives in this one class.
 */
export class QuickOrderForm {
  readonly category: Locator;
  readonly subcategory: Locator;
  readonly selection: Locator;

  constructor(private readonly page: Page) {
    this.category = page.getByTestId('quick-order-category');
    this.subcategory = page.getByTestId('quick-order-subcategory');
    this.selection = page.getByTestId('quick-order-selection');
  }

  async goto(): Promise<void> {
    await this.page.goto('/quick-order');
  }

  async selectCategory(label: string): Promise<void> {
    await this.category.selectOption({ label });
  }

  async selectSubcategory(label: string): Promise<void> {
    await this.subcategory.selectOption({ label });
  }

  /** Only the real options, excluding the "Select a subcategory" placeholder. */
  subcategoryOptions(): Locator {
    return this.subcategory.locator('option:not([value=""])');
  }
}
