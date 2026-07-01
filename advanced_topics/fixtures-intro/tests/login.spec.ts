import { test, expect } from '../fixtures/standupTest.js';

/**
 * Simple fixture only — loginPage handles new LoginPage(page) + goto().
 */
test.describe('Sign in', () => {
  test('shows the login form', async ({ loginPage }) => {
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('mock login reaches the standup board', async ({ loginPage }) => {
    await loginPage.login('demo', 'demo');

    await expect(loginPage.page.getByRole('heading', { name: 'Team standup' })).toBeVisible();
  });
});
