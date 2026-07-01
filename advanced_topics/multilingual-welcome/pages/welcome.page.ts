import type { Page, Locator } from '@playwright/test';
import type { CultureExpectations, CultureParam } from '../testdata/locales.js';

/**
 * Page object for the GlobeMart welcome page (index.html).
 *
 * No data-testid hooks on the app — locators use roles and visible text,
 * with strings passed from testdata/locales.ts per culture.
 */
export class WelcomePage {
  constructor(private readonly page: Page) {}

  heading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  navLink(name: string): Locator {
    return this.page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name });
  }

  loginLink(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  tagline(text: string): Locator {
    return this.page.getByText(text);
  }

  cultureSelect(label: string): Locator {
    return this.page.getByLabel(label);
  }

  get htmlRoot() {
    return this.page.locator('html');
  }

  async goto(cultureParam: CultureParam) {
    await this.page.goto(`index.html?culture=${cultureParam}`);
  }

  async selectCulture(cultureParam: CultureParam) {
    await this.page.getByRole('combobox').selectOption(cultureParam);
  }

  /** Locators for every string we assert — all keyed off the culture row. */
  locatorsFor(culture: CultureExpectations) {
    return {
      heading: this.heading(),
      tagline: this.tagline(culture.tagline),
      navHome: this.navLink(culture.navHome),
      navContact: this.navLink(culture.navContact),
      loginLink: this.loginLink(culture.loginLabel),
      cultureSelect: this.cultureSelect(culture.cultureLabel)
    };
  }
}
