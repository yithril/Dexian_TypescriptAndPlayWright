import { test, expect } from '@playwright/test';

/**
 * TASK 9 (optional), second half - REUSE the saved session.
 *
 * >>> PLACEHOLDER. <<<
 *
 * In Task 9 (advanced.spec.ts) you logged in once and saved the session to
 * auth.json. Here you reuse it WITHOUT logging in again. Uncomment the line
 * below so every test in this file starts already authenticated:
 */
// test.use({ storageState: 'auth.json' });

test.describe('BulkBox - authenticated (reuses auth.json)', () => {
  test.fixme('header greets the logged-in user without touching the login form', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Go straight to '/' and confirm the header greets the logged-in user.
    // This test should NEVER interact with the login form.
  });
});
