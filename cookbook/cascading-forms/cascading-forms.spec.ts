import { test, expect } from '@playwright/test';
import { QuickOrderForm } from './cascading-forms.page';

test.describe('Cascading / dependent forms', () => {
  test('the subcategory options depend on the chosen category', async ({ page }) => {
    const form = new QuickOrderForm(page);
    await form.goto();

    await form.selectCategory('Boxes');

    // No manual wait: the auto-retrying assertion waits for the dependent
    // control to repopulate after the parent changes.
    await expect(form.subcategoryOptions()).toHaveText([
      'Corrugated Boxes',
      'Mailing Boxes',
      'Storage Boxes'
    ]);

    await form.selectSubcategory('Mailing Boxes');
    await expect(form.selection).toHaveText('boxes / Mailing Boxes');
  });

  test('changing the category resets and repopulates the subcategory', async ({ page }) => {
    const form = new QuickOrderForm(page);
    await form.goto();

    await form.selectCategory('Tape');
    await expect(form.subcategoryOptions()).toHaveText([
      'Packing Tape',
      'Masking Tape',
      'Duct Tape'
    ]);

    await form.selectCategory('Safety');
    await expect(form.subcategoryOptions()).toHaveText(['Gloves', 'Glasses', 'Vests']);
    // The dependent control was cleared when its parent changed.
    await expect(form.subcategory).toHaveValue('');
  });
});
