import type { Page } from '@playwright/test';

/**
 * Minimal page object for the legacy invoice portal (index.html).
 *
 * Locator strategies (filter, and, or) live in the spec on purpose — this demo
 * is about reading messy locators in the test file. A fixtures lesson will
 * move them back into the page object later.
 */
export class InvoicePortalPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('index.html');
  }
}
