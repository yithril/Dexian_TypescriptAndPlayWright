import { test, expect } from '@playwright/test';
import { ProductResources } from './new-tab-and-iframes.page';

const PRODUCT_ID = 1; // Corrugated Shipping Box (model S-4612)

test.describe('New tab + iframes', () => {
  test('the spec sheet opens in a new browser tab', async ({ context, page }) => {
    const detail = new ProductResources(page);
    await detail.goto(PRODUCT_ID);

    // Arm the popup listener BEFORE the click, then await the new page.
    const popupPromise = context.waitForEvent('page');
    await detail.specSheetLink.click();
    const specSheet = await popupPromise;

    await specSheet.waitForLoadState();
    await expect(specSheet.getByTestId('spec-sheet-title')).toHaveText('Product Spec Sheet');
    // The model number was passed through the query string.
    await expect(specSheet.getByTestId('spec-sheet-model')).toHaveText('S-4612');
  });

  test('the embedded widget is reachable through its frame', async ({ page }) => {
    const detail = new ProductResources(page);
    await detail.goto(PRODUCT_ID);

    const frame = detail.widgetFrame();
    await expect(frame.getByTestId('widget-heading')).toHaveText('Shipping estimator');

    // Interactions inside the iframe work just like the main page.
    await frame.getByTestId('widget-estimate').click();
    await expect(frame.getByTestId('widget-result')).toHaveText('Arrives in 2-3 business days.');
  });
});
