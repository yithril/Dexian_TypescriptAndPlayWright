import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products.page';

/**
 * ADVANCED (markup you don't fully control + authentication you don't want to
 * repeat).
 *
 * >>> THESE ARE PLACEHOLDERS FOR YOU TO OVERWRITE. <<<
 *
 * Same idea as the core tests: each task is an empty `test.fixme(...)` stub
 * (registered but skipped). For each task: change `test.fixme(` to `test(`,
 * then replace the comment placeholder in the body with your own test code.
 */
test.describe('BulkBox - advanced', () => {
  test.fixme('7. extend ProductsPage; add the $1.59 Corrugated Shipping Box (model S-4614)', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Products (/products), unfiltered.
    // FIRST extend ProductsPage: it has no way yet to locate a row by name AND
    // price, or to click that row's "Add to cart" button. Add those methods to
    // the class (the button's accessible name is exactly "Add to cart").
    // Then: two products are named "Corrugated Shipping Box" (different models
    // and prices). Confirm both are present, add the $1.59 one (model S-4614) -
    // NOT the $1.29 one. The grid has no test ids, so narrow by role + text
    // before clicking. Confirm the cart count becomes 1.
  });

  test.fixme('8. open the category mega-menu and navigate by role + text', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: any page with the header -> Products (/products?category=...)
    // The category mega-menu in the header has no test ids and uses hashed class
    // names. Add a method to ProductsPage that opens the mega-menu and clicks a
    // specific subcategory link located by role + visible text. Then confirm the
    // resulting products page reflects that category.
  });

  test.fixme('9. (optional) save the authenticated session', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Login (/login) -> Home (/)
    // Log in once as buyer / supplies123, then save the session:
    //   await page.context().storageState({ path: 'auth.json' });
    // Confirm auth.json was created.
    //
    // Reuse happens in a SEPARATE file - see authenticated.spec.ts.
  });

  test.fixme('10. (optional) login validation and invalid-credentials errors', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Login (/login)
    // Submit with both fields empty -> a username error AND a password error.
    // Then submit a correct username with a wrong password -> a general
    // "invalid username or password" error.
  });
});
