import { defineConfig, devices } from '@playwright/test';

/**
 * Auto-waiting demo config.
 *
 * The "app" here is just static HTML files in this folder - there is no server
 * to boot. We point `baseURL` at this folder as a file:// URL so the tests can
 * navigate with relative paths like `page.goto('index.html')`.
 */
const baseURL = new URL('.', import.meta.url).href;

export default defineConfig({
  testDir: '.',
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
      // Use a browser already installed on the machine instead of downloading
      // Playwright's bundled binaries. 'chrome' uses Google Chrome; switch to
      // 'msedge' to use Microsoft Edge (always present on Windows).
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ]
});
