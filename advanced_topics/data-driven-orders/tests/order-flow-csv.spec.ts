import { test, expect } from '../fixtures/checkoutTest.js';
import { loadOrdersFromCsv } from '../helpers/loadOrdersFromCsv.js';

/**
 * Data-driven tests from testdata/orders.csv.
 *
 * The loop registers one test per row. Each row is captured from the closure —
 * no fixture needed for plain data you already have in hand.
 *
 * checkoutPage is a fixture because it is constructed (see fixtures/checkoutTest.ts).
 */
const orders = loadOrdersFromCsv();

test.describe('Order checkout — CSV data-driven', () => {
  for (const order of orders) {
    test(`${order.testId} completes checkout`, async ({ checkoutPage }) => {
      await checkoutPage.goto();

      await checkoutPage.searchQuery.fill(order.searchQuery);
      await checkoutPage.searchButton.click();
      await expect(checkoutPage.productName).toContainText(order.searchQuery);
      await checkoutPage.addToCart.click();
      await expect(checkoutPage.cartStatus).toContainText(`${order.searchQuery} added to cart`);

      await checkoutPage.attn.fill(order.attn);
      await checkoutPage.shippingAddress.selectOption(order.shippingAddress);

      await checkoutPage.poNumber.fill(order.poNumber);
      await checkoutPage.specialInstructions.fill(order.specialInstructions);
      await checkoutPage.shippingMethod.selectOption(order.shippingMethod);

      await checkoutPage.placeOrder.click();

      await expect(checkoutPage.summary).toBeVisible();
      await expect(checkoutPage.summaryProduct).toContainText(order.searchQuery);
      await expect(checkoutPage.summaryAttn).toHaveText(order.attn);
      await expect(checkoutPage.summaryPo).toHaveText(order.poNumber);
      await expect(checkoutPage.summaryInstructions).toHaveText(order.specialInstructions);
      await expect(checkoutPage.summaryAddress).toHaveText(order.shippingAddress);
      await expect(checkoutPage.summaryMethod).toHaveText(order.shippingMethod);
    });
  }
});
