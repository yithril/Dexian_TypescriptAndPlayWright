import { Page, Locator } from '@playwright/test';

/**
 * Page object covering the Quick Order delivery-date calendar and the
 * async product typeahead.
 */
export class DeliveryAndSearch {
  readonly dateInput: Locator;
  readonly calendar: Locator;
  readonly monthLabel: Locator;
  readonly prevMonth: Locator;
  readonly nextMonth: Locator;
  readonly searchInput: Locator;
  readonly options: Locator;
  readonly selection: Locator;

  constructor(private readonly page: Page) {
    this.dateInput = page.getByTestId('delivery-date-input');
    this.calendar = page.getByTestId('calendar');
    this.monthLabel = page.getByTestId('calendar-month');
    this.prevMonth = page.getByTestId('calendar-prev');
    this.nextMonth = page.getByTestId('calendar-next');
    this.searchInput = page.getByTestId('product-autocomplete-input');
    // Scope the role query to the typeahead listbox: native <select> <option>
    // elements elsewhere on the page also have role="option", so an unscoped
    // getByRole('option') would pick those up too.
    this.options = page.getByTestId('autocomplete-options').getByRole('option');
    this.selection = page.getByTestId('autocomplete-selection');
  }

  async goto(): Promise<void> {
    await this.page.goto('/quick-order');
  }

  async openCalendar(): Promise<void> {
    await this.dateInput.click();
  }

  /** Click a day by its number within the currently displayed month. */
  dayByNumber(n: number): Locator {
    return this.calendar.getByRole('button', { name: String(n), exact: true });
  }

  async typeSearch(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  optionByText(text: string): Locator {
    return this.options.filter({ hasText: text });
  }
}
