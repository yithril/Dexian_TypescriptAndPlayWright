import { test, expect } from '@playwright/test';
import { ProductDetailPanels } from './tabs-accordions-toasts.page';

const PRODUCT_ID = 1; // Corrugated Shipping Box

test.describe('Tabs, accordions, toasts', () => {
  test('switching tabs shows one panel at a time', async ({ page }) => {
    const detail = new ProductDetailPanels(page);
    await detail.goto(PRODUCT_ID);

    // Description is the default tab.
    await expect(detail.descriptionPanel).toBeVisible();
    await expect(detail.specsPanel).toBeHidden();

    await detail.specsTab.click();
    await expect(detail.specsPanel).toBeVisible();
    await expect(detail.descriptionPanel).toBeHidden();
    await expect(detail.specsTab).toHaveAttribute('aria-selected', 'true');

    await detail.shippingTab.click();
    await expect(detail.shippingPanel).toBeVisible();
    await expect(detail.specsPanel).toBeHidden();
  });

  test('the accordion expands and collapses', async ({ page }) => {
    const detail = new ProductDetailPanels(page);
    await detail.goto(PRODUCT_ID);

    await expect(detail.accordionPanel).toBeHidden();

    await detail.accordionToggle.click();
    await expect(detail.accordionPanel).toBeVisible();
    await expect(detail.accordionToggle).toHaveAttribute('aria-expanded', 'true');

    await detail.accordionToggle.click();
    await expect(detail.accordionPanel).toBeHidden();
  });

  test('the toast appears on add-to-cart and auto-dismisses', async ({ page }) => {
    const detail = new ProductDetailPanels(page);
    await detail.goto(PRODUCT_ID);

    await detail.addToCart.click();
    await expect(detail.toast).toBeVisible();

    // It clears itself after a few seconds (no manual sleep needed - the
    // retrying assertion waits for it to disappear).
    await expect(detail.toast).toBeHidden({ timeout: 5000 });
  });
});
