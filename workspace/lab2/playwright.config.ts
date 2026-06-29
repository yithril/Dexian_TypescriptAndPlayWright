import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the BulkBox independent lab.
 *
 * - `baseURL` points at the BulkBox Angular dev server.
 * - We pin the Chromium project to `channel: 'chrome'` so tests use the copy of
 *   Google Chrome already installed on the machine. This avoids downloading
 *   Playwright's bundled browsers (handy on networks where that download is
 *   blocked). If you would rather use the bundled browsers, remove the
 *   `channel` line and run `npx playwright install chromium`.
 * - The `webServer` block boots BulkBox automatically. If you already have
 *   `npm run start:app` (or `npm start` in bulkbox/) running, Playwright reuses
 *   it instead of starting a second copy.
 */
export default defineConfig({
  testDir: './tests',
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
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ],
  webServer: {
    command: 'npm --prefix ../../bulkbox start',
    url: 'http://localhost:4200',
    timeout: 120_000,
    reuseExistingServer: true
  }
});
