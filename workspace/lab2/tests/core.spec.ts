import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products.page';

/**
 * PHASE 1 - CORE TESTS AND PAGE OBJECTS (clean markup).
 *
 * >>> THESE ARE PLACEHOLDERS FOR YOU TO OVERWRITE. <<<
 *
 * Each task below is an empty `test.fixme(...)` stub. `test.fixme` means the
 * test is registered but skipped, so the suite stays green before you start.
 * For each task:
 *   1. Change `test.fixme(` to `test(` so it actually runs.
 *   2. Replace the comment placeholder in the body with your own test code.
 *   3. Use the provided `ProductsPage` whenever you touch the products page.
 *
 * The comments inside each stub are the task description - delete them once you
 * have written the real test.
 *
 * NOTE ON TASK 4: there is no test here for Task 4. Task 4 is building out the
 * `ProductsPage` page object in tests/pages/products.page.ts. Do that first,
 * because Tasks 5 and 6 use it.
 */
test.describe('BulkBox - core', () => {
  test.fixme('1. home page shows the hero banner and the logo', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Home (/)
    // Confirm the hero banner and the BulkBox logo/home link are visible
    // before any interaction.
  });

  test.fixme('2. "Shop all products" navigates to the products page', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Home (/) -> Products (/products)
    // Click "Shop all products"; land on /products with the results heading visible.
  });

  test.fixme('3. header search reflects the query on the products page', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Home (/) -> Products (/products?q=Tape)
    // Search "Tape" from the header; the URL reflects the term and the results
    // count shows that matching products were returned.
  });

  // Task 4 = build the ProductsPage page object (no test). See
  // tests/pages/products.page.ts. Fill in each stubbed method before Task 5.

  test.fixme('5. search Tape, then "in stock only" drops the results count by one', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Products (/products). Use ProductsPage.
    // Select the Tape category and confirm the results count is greater than zero.
    // Then, WITHOUT creating a new page object or re-navigating, enable
    // "in stock only" on that SAME instance and confirm the count drops by one
    // (Packing Tape model S-425 is out of stock, so it disappears).
  });

  test.fixme('6. sorting by price makes Masking Tape ($1.75) the first item', async ({ page }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Products (/products). Continue on the SAME ProductsPage instance from
    // Task 5 (Tape category + in-stock-only still applied).
    // Capture what the first row is BEFORE sorting, sort by price low to high,
    // then confirm the first row CHANGED and is now Masking Tape at $1.75 (the
    // cheapest in-stock Tape item). Use an auto-retrying assertion.
  });
});
