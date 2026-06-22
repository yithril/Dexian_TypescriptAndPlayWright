# Day 3 Lab - advanced patterns, against BulkBox

This lab is your independent practice for Day 3. Like the Day 2 lab, it runs
against **BulkBox** (http://localhost:4200, mock API on http://localhost:3001) -
a different app than the PageTurner app from the code-along.

Demo login: `buyer` / `supplies123`.

## Set up your own Playwright project

Same setup as Day 2 (you can reuse your Day 2 lab config). From inside this `lab/`
folder:

```bash
npm init playwright@latest
```

Answer: TypeScript, `tests` folder, GitHub Actions = No, install browsers = Yes.
Then point `playwright.config.ts` at BulkBox:

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

BulkBox's REST backend (json-server) is at **http://localhost:3001** - you will
talk to it directly in the API task.

## Core tasks

Each one maps to something from the Day 3 code-along.

### 1. Base page + component objects

- Build a page object for `/products` that is composed of smaller component
  objects: a "nav bar" component (the header search + the cart count badge) and a
  "product grid" component (the messy results grid). Share common bits via a base
  page if it helps.
- Write a short test that uses them, so the spec reads cleanly and the messy
  locators stay quarantined inside the grid component.

### 2. Network: wait, then mock

- Navigate to `/products` and `waitForResponse` on the products API call
  (`**/api/products`). Assert the grid rendered.
- Then use `page.route` to intercept that same endpoint and fulfill it with a
  small fixed list of products you define in the test. Reload and assert the
  results count reflects **your** mocked data, not the real backend.

### 3. Data-driven / parameterized

- Define a typed array of cases, e.g. `{ model: string; expectedPrice: string }[]`.
- Loop the array and, for each case, assert the product's price on the page. One
  logical test per row (a direct callback to Day 1 typed arrays).

### 4. Tame the messy grid robustly

- BulkBox has two "Packing Tape" products (models S-423 and S-425); one of them is
  out of stock. Using relative locators / `filter`, reliably target the
  out-of-stock one (S-425) and assert it is marked out of stock.

### 5. API testing with the `request` fixture

- Use the `request` fixture to `GET http://localhost:3001/products` directly.
- Assert a known product's price in the API response, then cross-check that the
  same price is shown in the UI.

### 6. Debugging and tooling

- Run one of your specs with tracing on (or `--ui`), open the trace viewer, and
  step through the actions. (Nothing to assert here - get comfortable with the
  tools.)

## Challenge (optional - pick any that interest you)

Advanced BulkBox features we did not cover. Each has a worked example in the
`cookbook/` - read the matching folder if you want a reference.

- **New tab + embedded iframe** (the "open spec sheet" link opens a new tab; the
  product page also embeds a widget in an iframe).
  Hint: see [`cookbook/new-tab-and-iframes/`](../../cookbook/new-tab-and-iframes/).
- **Multi-step checkout wizard** with per-step validation (you cannot skip ahead).
  Hint: see [`cookbook/step-wizard/`](../../cookbook/step-wizard/).
- **Sortable, paginated table** (the orders table).
  Hint: see [`cookbook/tables-sort-pagination/`](../../cookbook/tables-sort-pagination/).
- **File upload and download** (bulk-order upload / invoice download).
  Hint: see [`cookbook/file-upload-download/`](../../cookbook/file-upload-download/).
- **Cascading dropdowns** (category drives subcategory).
  Hint: see [`cookbook/cascading-forms/`](../../cookbook/cascading-forms/).
- **Calendar date picker + async autocomplete.**
  Hint: see [`cookbook/date-pickers-autocomplete/`](../../cookbook/date-pickers-autocomplete/).
