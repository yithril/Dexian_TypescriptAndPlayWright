import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products.page';

test.describe('PHASE 1: CORE TESTS AND PAGE OBJECTS', () => {
  test('1. Load the home page and confirm the hero banner and logo are visible', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('brand-home')).toBeVisible();
  });

  test('2. Use the home page call-to-action to navigate to the products page', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByTestId('nav-products').click();
    await expect(page).toHaveURL('/products');
    await expect(page.getByTestId('results-heading')).toBeVisible();
    await expect(page.getByTestId('results-heading')).toContainText(
      'All products',
    );
  });

  test('3. Search from the header and verify the products page reflects the query', async ({
    page,
  }) => {
    const product = 'Tape';
    await page.goto('/');
    await page.getByTestId('search-input').fill(`${product}`);
    await page.getByTestId('search-button').click();
    await expect(page).toHaveURL(`/products?q=${product}`);
    await expect(page.locator('section')).not.toContainText('0 products');
    await expect(page.getByTestId('results-heading')).toContainText(
      `Results for "${product}"`,
    );
    await expect(page.getByTestId('search-chip')).toContainText(`${product}`);
  });

  // Task 4 = build the ProductsPage page object (no test). See
  // tests/pages/products.page.ts. Fill in each stubbed method before Task 5.
  test('Test My Class', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('/');
    await productsPage.goto();

    // await productsPage.goto({ q: 'Tape' });
    // await productsPage.goto({ category: 'tape' });
    // await productsPage.goto({ q: 'Tape', category: 'tape' });

    // await productsPage.selectCategory('Tape');
    // await productsPage.selectCategory('bags');
    
    // await productsPage.toggleInStockOnly();
    
    // await productsPage.sortBy('featured');
    // await productsPage.sortBy('price-asc');
    // await productsPage.sortBy('price-desc');

    // await productsPage.getResultsCount();
    // let rowsAll = await productsPage.rows();
    // let rowsTape = await productsPage.rowByName('tape');
    // let totalRows = await productsPage.getRowCount();

  });

  test.fixme('5. search Tape, then "in stock only" drops the results count by one', async ({
    page,
  }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Products (/products). Use ProductsPage.
    // Select the Tape category and confirm the results count is greater than zero.
    // Then, WITHOUT creating a new page object or re-navigating, enable
    // "in stock only" on that SAME instance and confirm the count drops by one
    // (Packing Tape model S-425 is out of stock, so it disappears).
  });

  test.fixme('6. sorting by price makes Masking Tape ($1.75) the first item', async ({
    page,
  }) => {
    // PLACEHOLDER - write your test here, then change `test.fixme` to `test` above.
    // Page: Products (/products). Continue on the SAME ProductsPage instance from
    // Task 5 (Tape category + in-stock-only still applied).
    // Capture what the first row is BEFORE sorting, sort by price low to high,
    // then confirm the first row CHANGED and is now Masking Tape at $1.75 (the
    // cheapest in-stock Tape item). Use an auto-retrying assertion.
  });
});
