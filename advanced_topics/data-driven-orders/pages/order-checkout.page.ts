import type { Page } from '@playwright/test';

/**
 * Page object for the mock order checkout page (index.html).
 */
export class OrderCheckoutPage {
  constructor(private readonly page: Page) {}

  get searchQuery() {
    return this.page.getByLabel('Search product');
  }

  get searchButton() {
    return this.page.getByTestId('search-button');
  }

  get addToCart() {
    return this.page.getByTestId('add-to-cart');
  }

  get cartStatus() {
    return this.page.getByTestId('cart-status');
  }

  get productName() {
    return this.page.getByTestId('product-name');
  }

  get attn() {
    return this.page.getByLabel('Attention');
  }

  get shippingAddress() {
    return this.page.getByLabel('Shipping address');
  }

  get poNumber() {
    return this.page.getByLabel('PO Number');
  }

  get specialInstructions() {
    return this.page.getByLabel('Special instructions');
  }

  get shippingMethod() {
    return this.page.getByLabel('Shipping method');
  }

  get placeOrder() {
    return this.page.getByRole('button', { name: 'Place order' });
  }

  get summary() {
    return this.page.getByTestId('summary');
  }

  get summaryProduct() {
    return this.page.getByTestId('summary-product');
  }

  get summaryAttn() {
    return this.page.getByTestId('summary-attn');
  }

  get summaryPo() {
    return this.page.getByTestId('summary-po');
  }

  get summaryInstructions() {
    return this.page.getByTestId('summary-instructions');
  }

  get summaryAddress() {
    return this.page.getByTestId('summary-address');
  }

  get summaryMethod() {
    return this.page.getByTestId('summary-method');
  }

  async goto() {
    await this.page.goto('index.html');
  }
}
