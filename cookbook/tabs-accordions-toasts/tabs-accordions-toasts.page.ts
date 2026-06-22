import { Page, Locator } from '@playwright/test';

/** Page object for the product-detail tabs, accordion, and add-to-cart toast. */
export class ProductDetailPanels {
  readonly descriptionTab: Locator;
  readonly specsTab: Locator;
  readonly shippingTab: Locator;
  readonly descriptionPanel: Locator;
  readonly specsPanel: Locator;
  readonly shippingPanel: Locator;
  readonly accordionToggle: Locator;
  readonly accordionPanel: Locator;
  readonly addToCart: Locator;
  readonly toast: Locator;

  constructor(private readonly page: Page) {
    this.descriptionTab = page.getByTestId('tab-description');
    this.specsTab = page.getByTestId('tab-specs');
    this.shippingTab = page.getByTestId('tab-shipping');
    this.descriptionPanel = page.getByTestId('panel-description');
    this.specsPanel = page.getByTestId('panel-specs');
    this.shippingPanel = page.getByTestId('panel-shipping');
    this.accordionToggle = page.getByTestId('accordion-toggle');
    this.accordionPanel = page.getByTestId('accordion-panel');
    this.addToCart = page.getByTestId('add-to-cart');
    this.toast = page.getByTestId('toast');
  }

  async goto(productId: number): Promise<void> {
    await this.page.goto(`/products/${productId}`);
  }
}
