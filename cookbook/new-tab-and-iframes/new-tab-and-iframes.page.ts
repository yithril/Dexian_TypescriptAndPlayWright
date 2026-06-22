import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Page object for the product-detail "Open spec sheet" (new tab) link and the
 * embedded shipping-estimator iframe.
 */
export class ProductResources {
  readonly specSheetLink: Locator;

  constructor(private readonly page: Page) {
    this.specSheetLink = page.getByTestId('open-spec-sheet');
  }

  async goto(productId: number): Promise<void> {
    await this.page.goto(`/products/${productId}`);
  }

  /** The embedded widget lives in its own frame; reach into it with frameLocator. */
  widgetFrame(): FrameLocator {
    return this.page.frameLocator('[data-testid="spec-widget-frame"]');
  }
}
