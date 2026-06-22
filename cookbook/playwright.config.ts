import { defineConfig, devices } from '@playwright/test';

/**
 * Cookbook Playwright config.
 *
 * Every scenario runs against the shared BulkBox app (Angular + json-server).
 * The `webServer` block boots BulkBox automatically; if you already have
 * `npm start` running in bulkbox/, Playwright reuses it instead of starting
 * a second copy.
 */
export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm --prefix ../bulkbox start',
    url: 'http://localhost:4200',
    timeout: 120_000,
    reuseExistingServer: true
  }
});
