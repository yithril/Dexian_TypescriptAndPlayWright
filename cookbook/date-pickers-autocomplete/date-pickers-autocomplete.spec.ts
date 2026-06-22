import { test, expect } from '@playwright/test';
import { DeliveryAndSearch } from './date-pickers-autocomplete.page';

test.describe('Date picker + async autocomplete', () => {
  test('picking a day fills the input and closes the calendar', async ({ page }) => {
    const widget = new DeliveryAndSearch(page);
    await widget.goto();

    await widget.openCalendar();
    await expect(widget.calendar).toBeVisible();

    await widget.dayByNumber(15).click();

    // Day 15 of whatever month is showing -> the ISO value ends in -15.
    await expect(widget.dateInput).toHaveValue(/-15$/);
    await expect(widget.calendar).toBeHidden();
  });

  test('month navigation changes the visible month', async ({ page }) => {
    const widget = new DeliveryAndSearch(page);
    await widget.goto();

    await widget.openCalendar();
    const start = (await widget.monthLabel.textContent())?.trim() ?? '';

    await widget.nextMonth.click();
    await expect(widget.monthLabel).not.toHaveText(start);

    await widget.prevMonth.click();
    await expect(widget.monthLabel).toHaveText(start);
  });

  test('typeahead suggests products and selecting one confirms it', async ({ page }) => {
    const widget = new DeliveryAndSearch(page);
    await widget.goto();

    await widget.typeSearch('box');

    // Suggestions arrive after the debounce; the retrying assertion waits.
    await expect(widget.optionByText('Mailing Box')).toBeVisible();

    await widget.optionByText('Mailing Box').click();
    await expect(widget.selection).toHaveText('S-1088 - Mailing Box');
    await expect(widget.options).toHaveCount(0);
  });
});
