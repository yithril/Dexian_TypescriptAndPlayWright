import { test, expect } from '../fixtures/welcomeTest.js';
import { culturesToRun, type CultureExpectations } from '../testdata/locales.js';

/**
 * One test body, five cultures — expected strings live in testdata/locales.ts
 * as CultureExpectations rows (cultureId, title, navHome, etc.).
 *
 * No data-testid on the app: locators use role + visible text from each row.
 */
const culturesUnderTest: CultureExpectations[] = culturesToRun();

test.describe('GlobeMart welcome — i18n', () => {
  for (const culture of culturesUnderTest) {
    test(`${culture.cultureId} shows localized UI`, async ({ welcomePage }) => {
      await welcomePage.goto(culture.cultureParam);

      const ui = welcomePage.locatorsFor(culture);

      await expect(ui.heading).toHaveText(culture.title);
      await expect(ui.tagline).toBeVisible();
      await expect(ui.navHome).toBeVisible();
      await expect(ui.navContact).toBeVisible();
      await expect(ui.loginLink).toBeVisible();
      await expect(ui.cultureSelect).toBeVisible();
      await expect(welcomePage.htmlRoot).toHaveAttribute('lang', culture.htmlLang);
    });
  }
});
