import { Page, Locator } from '@playwright/test';

/** Page object for the BulkBox multi-step checkout wizard. */
export class CheckoutWizard {
  readonly shippingPanel: Locator;
  readonly paymentPanel: Locator;
  readonly reviewPanel: Locator;
  readonly error: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmation: Locator;

  constructor(private readonly page: Page) {
    this.shippingPanel = page.getByTestId('step-shipping');
    this.paymentPanel = page.getByTestId('step-payment');
    this.reviewPanel = page.getByTestId('step-review');
    this.error = page.getByTestId('step-error');
    this.nextButton = page.getByTestId('step-next');
    this.backButton = page.getByTestId('step-back');
    this.placeOrderButton = page.getByTestId('place-order');
    this.confirmation = page.getByTestId('order-confirmation');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  async fillShipping(name: string, address: string): Promise<void> {
    await this.page.getByTestId('shipping-name').fill(name);
    await this.page.getByTestId('shipping-address').fill(address);
  }

  async fillPayment(name: string, cardNumber: string): Promise<void> {
    await this.page.getByTestId('payment-name').fill(name);
    await this.page.getByTestId('payment-number').fill(cardNumber);
  }

  async next(): Promise<void> {
    await this.nextButton.click();
  }
}
