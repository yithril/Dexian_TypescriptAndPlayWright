import { test as base } from '@playwright/test';
import { WelcomePage } from '../pages/welcome.page.js';

type WelcomeFixtures = {
  welcomePage: WelcomePage;
};

export const test = base.extend<WelcomeFixtures>({
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  }
});

export { expect } from '@playwright/test';
