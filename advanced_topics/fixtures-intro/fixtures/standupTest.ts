import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { StandupPage } from '../pages/standup.page.js';

type StandupFixtures = {
  /**
   * Login page object — already constructed and navigated to login.html.
   */
  loginPage: LoginPage;
  /**
   * Standup board after mock login — depends on loginPage because the app
   * is gated; you cannot reach index.html without signing in first.
   */
  standupPage: StandupPage;
};

export const test = base.extend<StandupFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  standupPage: async ({ loginPage }, use) => {
    await loginPage.login();
    await use(new StandupPage(loginPage.page));
  }
});

export { expect } from '@playwright/test';
