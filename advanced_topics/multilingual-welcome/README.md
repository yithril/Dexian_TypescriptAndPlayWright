# Multilingual welcome (i18n testing)

A self-contained Playwright example that answers: **how do I run one test against
multiple cultures without `if` statements for every assertion?**

The mock app is plain HTML/JS — one page, five culture variants (US, CA, MX, FR,
ES). Tests open `index.html` via `file://`, same pattern as the data-driven-orders
demo.

## Run it

Uses **Google Chrome** on your machine (`channel: 'chrome'`) — no browser download.

```bash
# first time only
#   PowerShell:  $env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1; npm install
#   bash/zsh:    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
npm install

npm test                              # all 6 tests (5 cultures + switcher)
npx playwright test welcome-i18n      # culture loop only
npx playwright test language-switcher # UI switcher only

# Run one culture (like a TestComplete execution-controller sheet):
#   PowerShell:  $env:CULTURE='MX'; npx playwright test
#   bash:        CULTURE=MX npx playwright test

npm run test:headed
npm run test:ui
npm run report
```

If Chrome is not installed, change `channel: 'chrome'` to `channel: 'msedge'` in
`playwright.config.ts`.

## Student question this answers

> We have five cultures (US, CA, MX, FR, ES). In TestComplete we run one test
> against all cultures from a controller sheet, with `if` statements so each
> assertion works for every culture. How do we do that in Playwright?

### TestComplete style (avoid)

```typescript
if (culture === 'MX') {
  await expect(title).toHaveText('Bienvenido a GlobeMart');
} else if (culture === 'FR') {
  await expect(title).toHaveText('Bienvenue chez GlobeMart');
}
// ... repeated for every assertion
```

### Playwright style (this project)

**Expected strings** live in [`testdata/locales.ts`](testdata/locales.ts) as
`CultureExpectations` rows. The spec has **one test body** and loops over cultures:

```typescript
import { culturesToRun, type CultureExpectations } from '../testdata/locales.js';

const culturesUnderTest: CultureExpectations[] = culturesToRun();

for (const culture of culturesUnderTest) {
  test(`${culture.cultureId} shows localized UI`, async ({ welcomePage }) => {
    await welcomePage.goto(culture.cultureParam);

    const ui = welcomePage.locatorsFor(culture);
    await expect(ui.heading).toHaveText(culture.title);
    await expect(ui.navHome).toBeVisible(); // getByRole('link', { name: culture.navHome })
    // culture strings drive locators AND assertions — no data-testid on the app
  });
}
```

Add a culture → add one object to `allCultureExpectations` in `locales.ts`. The test
logic does not change.

## No data-testid — realistic locators for i18n

The app has **no test hooks**. Most teams do not get `data-testid` on every element.
For multilingual sites, that is fine: **use the same expected strings for locators and
assertions.**

```typescript
// Hardcoded English — breaks on MX/FR/ES
page.getByRole('link', { name: 'Home' });

// Localized from locales.ts — works for every culture in the loop
page.getByRole('link', { name: culture.navHome });
```

`WelcomePage.locatorsFor(culture)` returns role/label locators keyed off the
`CultureExpectations` row. The culture dropdown uses `getByLabel(culture.cultureLabel)`;
the switcher test uses `getByRole('combobox')` because there is only one on the page.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html`, `app.js` | One page; strings swapped per culture |
| `testdata/locales.ts` | `CultureExpectations` per culture (test source of truth) |
| `pages/welcome.page.ts` | Page object — selectors for the welcome page |
| `fixtures/welcomeTest.ts` | Injects `welcomePage` (construction in one place) |
| `tests/welcome-i18n.spec.ts` | Main demo: loop over 5 cultures |
| `tests/language-switcher.spec.ts` | Switch US → FR in the UI |

## Why not CSV?

The data-driven-orders sister project shows CSV/Excel for **order field data**.
Culture expectations are a different shape — culture codes plus UI strings — and
are usually maintained as a typed config file (`locales.ts`) in source control.

## Why a fixture for the page object but closure for locale data?

| | `welcomePage` fixture | `culture` from loop closure (`CultureExpectations`) |
| --- | --- | --- |
| What | Constructed page object | Plain expected-string config |
| Why inject | Construction belongs in one place | You already have the row in the loop |

Same reasoning as the data-driven-orders project.

## MX vs ES — both Spanish, different copy

Mexico and Spain share a language but not every string. The taglines differ:

- MX: `Compra local, envíos en México.`
- ES: `Compra local, envíos a toda España.`

That is why externalized expectations beat hardcoded `if` branches.

## Playwright `locale` vs app culture

`use: { locale: 'fr-FR' }` in `playwright.config.ts` sets the **browser** locale
(dates, `Intl`). It does **not** translate your app's custom strings.

This demo sets culture **in the app** via `?culture=fr` or the region dropdown —
the right approach for testing your own i18n copy.

## What about Arabic (RTL)?

Not in this runnable demo — US, CA, MX, FR, ES are all **LTR**.

Arabic and Hebrew add a wrinkle:

| LTR (this demo) | RTL (Arabic, Hebrew) |
| --- | --- |
| Assert `lang` + visible text | Also assert `html[dir="rtl"]` |
| Layout stays familiar | UI mirrors (nav flips sides, etc.) |
| Same locator strategy | `getByRole` / `getByText` still work with Arabic strings |
| | Layout/visual tests may need per-culture baselines |

The **test pattern stays the same** — loop + expected strings in config. You add
`dir` to your locale config and assert it. CSS should use logical properties
(`margin-inline-start`) instead of `margin-left` so RTL layouts do not break.

## Talking points

1. **One HTML file** — real i18n apps share markup; only strings change.
2. **One test, five cultures** — replaces TestComplete `if` branches.
3. **`CULTURE` env var** — mirrors an execution-controller sheet.
4. **Deep link + switcher** — `?culture=` for deterministic tests; dropdown test
   proves the UI path works too.
