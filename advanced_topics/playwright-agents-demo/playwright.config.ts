import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Agents demo config.
 *
 * The three agents (planner, generator, healer) require Playwright 1.56+.
 * Static HTML in this folder — no server. baseURL is file:// so tests use
 * relative paths like page.goto('index.html').
 */
const baseURL = new URL('.', import.meta.url).href;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ]
});
