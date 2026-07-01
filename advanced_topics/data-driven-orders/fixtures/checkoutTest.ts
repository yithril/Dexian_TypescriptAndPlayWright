import { test as base } from '@playwright/test';
import { OrderCheckoutPage } from '../pages/order-checkout.page.js';

type CheckoutFixtures = {
  /**
   * Page object for the checkout UI.
   *
   * Registered as a fixture (not constructed in each test) so construction lives
   * in one place. That matters when a page object needs setup beyond `new Page(page)`
   * — e.g. waiting for a shell to load, sharing helpers, or wiring multiple pages.
   */
  checkoutPage: OrderCheckoutPage;
};

export const test = base.extend<CheckoutFixtures>({
  checkoutPage: async ({ page }, use) => {
    await use(new OrderCheckoutPage(page));
  }
});

export { expect } from '@playwright/test';
