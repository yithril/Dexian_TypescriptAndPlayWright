import { test, expect } from '@playwright/test';
import { CheckoutWizard } from './step-wizard.page';

test.describe('Multi-step wizard', () => {
  test('you cannot skip ahead past an incomplete step', async ({ page }) => {
    const wizard = new CheckoutWizard(page);
    await wizard.goto();

    // Only the first step is shown to begin with.
    await expect(wizard.shippingPanel).toBeVisible();
    await expect(wizard.paymentPanel).toBeHidden();

    // Clicking Next with empty fields blocks advancement and shows an error.
    await wizard.next();
    await expect(wizard.error).toBeVisible();
    await expect(wizard.shippingPanel).toBeVisible();
    await expect(wizard.paymentPanel).toBeHidden();
  });

  test('completing every step places the order', async ({ page }) => {
    const wizard = new CheckoutWizard(page);
    await wizard.goto();

    await wizard.fillShipping('Riley Buyer', '123 Warehouse Way');
    await wizard.next();

    await expect(wizard.paymentPanel).toBeVisible();
    await wizard.fillPayment('Riley Buyer', '4111111111111111');
    await wizard.next();

    await expect(wizard.reviewPanel).toBeVisible();
    await expect(page.getByTestId('review-name')).toHaveText('Riley Buyer');

    await wizard.placeOrderButton.click();
    await expect(wizard.confirmation).toBeVisible();
  });

  test('Back returns to the previous step with values intact', async ({ page }) => {
    const wizard = new CheckoutWizard(page);
    await wizard.goto();

    await wizard.fillShipping('Sam Admin', '500 Dock St');
    await wizard.next();
    await expect(wizard.paymentPanel).toBeVisible();

    await wizard.backButton.click();
    await expect(wizard.shippingPanel).toBeVisible();
    await expect(page.getByTestId('shipping-name')).toHaveValue('Sam Admin');
  });
});
