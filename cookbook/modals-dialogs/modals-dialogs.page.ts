import { Page, Locator } from '@playwright/test';

/**
 * Page object for the cart remove-confirmation modal.
 *
 * The cart is in-memory, so we seed it through the UI and use in-app
 * navigation (not page.goto) to reach the cart without dropping state.
 */
export class CartWithModal {
  readonly dialog: Locator;
  readonly backdrop: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly emptyState: Locator;

  constructor(private readonly page: Page) {
    this.dialog = page.getByTestId('confirm-dialog');
    this.backdrop = page.getByTestId('modal-backdrop');
    this.confirmButton = page.getByTestId('confirm-remove');
    this.cancelButton = page.getByTestId('cancel-remove');
    this.emptyState = page.getByTestId('cart-empty');
  }

  /** Add a product via its detail page, then navigate to the cart in-app. */
  async seedCartAndOpen(productId: number): Promise<void> {
    await this.page.goto(`/products/${productId}`);
    await this.page.getByTestId('add-to-cart').click();
    await this.page.getByTestId('view-cart').click();
  }

  line(productId: number): Locator {
    return this.page.getByTestId(`cart-line-${productId}`);
  }

  async clickRemove(productId: number): Promise<void> {
    await this.page.getByTestId(`cart-remove-${productId}`).click();
  }
}
