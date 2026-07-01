import type { Page } from '@playwright/test';

/**
 * Page object for the mock sign-in page (login.html).
 * StandupPage is only reachable after login succeeds.
 */
export class LoginPage {
  constructor(readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Sign in' });
  }

  get username() {
    return this.page.getByLabel('Username');
  }

  get password() {
    return this.page.getByLabel('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto('login.html');
  }

  /**
   * Mock login — any credentials work; redirects to the standup board.
   */
  async login(username = 'demo', password = 'demo') {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
    await this.page.getByRole('heading', { name: 'Team standup' }).waitFor();
  }
}
