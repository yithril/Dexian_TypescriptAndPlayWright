import { test, expect } from '@playwright/test';
import { CartWithModal } from './modals-dialogs.page';

const PRODUCT_ID = 3; // Mailing Box

test.describe('Modals / dialogs', () => {
  test('cancelling the dialog keeps the item', async ({ page }) => {
    const cart = new CartWithModal(page);
    await cart.seedCartAndOpen(PRODUCT_ID);
    await expect(cart.line(PRODUCT_ID)).toBeVisible();

    await cart.clickRemove(PRODUCT_ID);
    await expect(cart.dialog).toBeVisible();

    await cart.cancelButton.click();
    await expect(cart.dialog).toBeHidden();
    await expect(cart.line(PRODUCT_ID)).toBeVisible();
  });

  test('confirming the dialog removes the item', async ({ page }) => {
    const cart = new CartWithModal(page);
    await cart.seedCartAndOpen(PRODUCT_ID);

    await cart.clickRemove(PRODUCT_ID);
    await expect(cart.dialog).toBeVisible();

    await cart.confirmButton.click();
    await expect(cart.dialog).toBeHidden();
    await expect(cart.line(PRODUCT_ID)).toBeHidden();
    await expect(cart.emptyState).toBeVisible();
  });

  test('clicking the backdrop dismisses the dialog', async ({ page }) => {
    const cart = new CartWithModal(page);
    await cart.seedCartAndOpen(PRODUCT_ID);

    await cart.clickRemove(PRODUCT_ID);
    await expect(cart.dialog).toBeVisible();

    // Click the backdrop at a corner, away from the dialog box.
    await cart.backdrop.click({ position: { x: 5, y: 5 } });
    await expect(cart.dialog).toBeHidden();
    await expect(cart.line(PRODUCT_ID)).toBeVisible();
  });
});
