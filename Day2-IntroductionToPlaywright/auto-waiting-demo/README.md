# Locator mechanics demo (auto-waiting)

A tiny, self-contained demo for Day 2. It exists to drive home **one idea**: a
Playwright `Locator` is a lazy, self-re-resolving *description* of how to find an
element - not a captured reference like a Selenium `WebElement`. So you never
write explicit waits and you never re-find an element after the DOM changes.

The "app" is just static HTML in this folder - there is no server to start.

## Run it

This demo uses a browser that is **already installed on your machine** (via the
Playwright `channel` option) instead of downloading Playwright's bundled
binaries. So there is no `npx playwright install` step.

```bash
# first time only - skip the browser download during install
#   PowerShell:  $env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1; npm install
#   bash/zsh:    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
npm install

npm test            # run everything headless (scenario 4 has 1 deliberate failure)
npm run test:headed # watch the browser do it
npm run test:ui     # interactive UI mode - great for narrating live
npm run report      # open the last HTML report
```

> Heads up: a full `npm test` reports **one failing test** by design - the broken
> pattern in `scenario4.spec.ts`. To run only the always-green scenarios use
> `npx playwright test auto-wait.spec.ts`; to demo the failure use
> `npx playwright test scenario4`. (Filter by the file name, not just `auto-wait` -
> the folder `auto-waiting-demo` contains that substring, so it would match everything.)

The project is configured for `channel: 'chrome'` (Google Chrome) in
`playwright.config.ts`. If a machine has Edge instead, change that one line to
`channel: 'msedge'` (Microsoft Edge ships with Windows, so it is always available).

You can also just open `index.html` in a browser to click through the scenarios
by hand while you talk.

## The scenarios (menu in `index.html`)

| Scenario | Page | Point it makes |
| --- | --- | --- |
| 1. Appears late | `scenario1.html` | The target button is not in the DOM at load; it is injected after a random delay. The assertion `toBeVisible()` auto-waits - no `WebDriverWait`. The test even defines the locator *before* navigating, proving it is just a recipe. |
| 2. Destroy & re-create | `scenario2.html` | Destroy removes the node; Re-create appends a brand-new node. The *same* locator variable re-resolves it. In Selenium the old reference would throw `StaleElementReferenceException`. |
| 3. Becomes clickable | `scenario3.html` | The Submit button starts disabled and enables after a delay. `click()` auto-waits for actionability (enabled/visible/stable), so there is no "wait until clickable" step. |
| 4. await inside expect | `scenario4.html` | A status flips `Pending...` to `Done`. Passing the *locator* to `expect` auto-retries; pulling out an awaited *value* (`textContent()`) takes a stale one-shot snapshot. Its third test fails **on purpose** - that failure is the lesson. Run `npx playwright test scenario4` to demo it. |

## Timing knobs

- Each timed scenario picks a **random delay of 0.5s-4.5s**, comfortably under
  Playwright's default 5s assertion timeout, so live runs stay green.
- Append `?delay=<ms>` to any scenario URL to force a specific delay, e.g.
  `scenario1.html?delay=8000`. Use this to demonstrate that auto-waiting is
  *bounded*: with the default 5s timeout it fails, and `toBeVisible({ timeout: 10000 })`
  fixes it.

## Talking points

- A locator resolves **at the moment of use**, and assertions/actions **retry**
  until they pass or time out. The waiting is intrinsic, not a separate step.
- Locators **re-resolve every time** - that is why destroy/re-create just works.
- Strict mode (shown later): if a locator matches more than one element it
  *throws* rather than returning a list. Ask for many on purpose with
  `.first()`, `.nth()`, `.filter()`, `.all()`, or `toHaveCount()`.
