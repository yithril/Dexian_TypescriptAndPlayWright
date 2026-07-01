import { defineConfig, devices } from '@playwright/test';

/**
 * Data-driven orders demo config.
 *
 * The "app" is static HTML in this folder — no server to boot. We point
 * baseURL at this folder as a file:// URL so tests can navigate with
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
