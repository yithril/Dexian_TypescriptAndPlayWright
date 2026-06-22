# Day 2 Lab - the basics, against BulkBox

This lab is your independent practice for Day 2. It runs against **BulkBox**
(http://localhost:4200) - a different app than the PageTurner app we used in the
code-along. 

Demo login: `buyer` / `supplies123`.

## Set up your own Playwright project (reinforcement)

You set this up yourself, the same way we did in the code-along - just pointed at
BulkBox instead of PageTurner. From inside this `lab/` folder:

```bash
npm init playwright@latest
```

Answer: TypeScript, `tests` folder, GitHub Actions = No, install browsers = Yes.

Then point the config at BulkBox. In `playwright.config.ts`:

```ts
use: {
  baseURL: 'http://localhost:4200',
  trace: 'on-first-retry'
},
webServer: {
  command: 'npm --prefix ../../bulkbox start',
  url: 'http://localhost:4200',
  reuseExistingServer: true,
  timeout: 120_000
}
```

Run with `npx playwright test` (or `--ui` while you work). Write your specs in
`tests/`, and keep locators/actions in page objects (a `tests/pages/` folder).

> First time on BulkBox? Open http://localhost:4200 and click around for a minute
> so you know the home page, the products page with its filter sidebar, a product
> detail page, the cart, and the sign-in page.

## Clean vs. messy markup (you will hit both)

- The sign-in form, the filter sidebar, product detail, and the cart are **clean**:
  they have `data-testid` hooks and proper labels. Locators here are short.
- The **product results grid** is **messy**: hashed class names, nested divs, no
  test ids, and some duplicated product names. Locate rows there by role and text,
  then narrow with `filter({ hasText })` / `nth`.

## Core tasks

Do these in order. 

### 1. Navigate and verify (goto + visibility)

- Go to the home page and assert the hero and the brand are visible.
- Click through to the products page and assert the URL is `/products` and the
  results heading is visible.

### 2. Search (click + type)

- Type a search term into the header search box and submit it.
- Assert the URL now carries the search query, and that the results count is shown.

### 3. Filter with form controls

- On `/products`, pick a category radio, toggle "In stock only", and choose a
  sort option in the `<select>`.
- Assert the results count changes, and that the sort actually reordered the list
  (for example, the first row's price).

### 4. Assertions tour

- Assert the number of product rows on the page matches the results-count number.
- Assert a specific product's price text with an auto-retrying assertion (no
  manual waits / sleeps).

### 5. Locate in the messy grid

- BulkBox has two different products that share the name "Corrugated Shipping Box"
  (models S-4612 and S-4614). Using `filter({ hasText })` and/or `nth`, add the
  **larger** one (S-4614) to the cart specifically.
- Assert the cart count badge incremented.

### 6. Login and validation

- Submit the sign-in form empty and assert both the username and password errors
  appear.
- Submit with wrong credentials and assert the login error appears.
- Submit with `buyer` / `supplies123` and assert the signed-in greeting appears.

### 7. Page-object refactor

- Pick one of the specs above and refactor it so all locators and actions live in
  a page object class whose constructor takes `page`. The spec should read like a
  description of user behavior; the page object holds the "how".

## Challenge (optional - for those who want more)

Stretch goals using BulkBox features we did not drill in class. If you get stuck,
the `cookbook/` has a worked example for each - read the matching folder.

- **Product-detail tabs and the "added to cart" toast.** Switch between the tabs on
  a product page and assert the right panel shows; add to cart and assert the
  transient toast appears and then disappears.
  Hint: see [`cookbook/tabs-accordions-toasts/`](../../cookbook/tabs-accordions-toasts/).
- **The cart remove-confirmation modal.** Removing a cart item opens a confirm
  dialog. Assert that Cancel keeps the item and Confirm removes it.
  Hint: see [`cookbook/modals-dialogs/`](../../cookbook/modals-dialogs/).
