import { test as base } from '@playwright/test';
import { StandupPage } from '../pages/standup.page.js';

type StandupFixtures = {
  /**
   * Standup page object — already constructed and navigated to index.html.
   * Registered here so every test gets it via async ({ standupPage }).
   */
  standupPage: StandupPage;
};

export const test = base.extend<StandupFixtures>({
  standupPage: async ({ page }, use) => {
    const standupPage = new StandupPage(page);
    await standupPage.goto();
    await use(standupPage);
  }
});

export { expect } from '@playwright/test';
