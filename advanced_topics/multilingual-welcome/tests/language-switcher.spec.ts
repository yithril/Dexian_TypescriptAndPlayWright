import { test, expect } from '../fixtures/welcomeTest.js';
import { cultureById } from '../testdata/locales.js';

const usCulture = cultureById('US');
const frCulture = cultureById('FR');

test('culture switcher updates the UI', async ({ welcomePage }) => {
  await welcomePage.goto('us');

  const usUi = welcomePage.locatorsFor(usCulture);
  await expect(usUi.heading).toHaveText(usCulture.title);
  await expect(welcomePage.htmlRoot).toHaveAttribute('lang', usCulture.htmlLang);

  await welcomePage.selectCulture('fr');

  const frUi = welcomePage.locatorsFor(frCulture);
  await expect(frUi.heading).toHaveText(frCulture.title);
  await expect(frUi.tagline).toBeVisible();
  await expect(welcomePage.htmlRoot).toHaveAttribute('lang', frCulture.htmlLang);
});
