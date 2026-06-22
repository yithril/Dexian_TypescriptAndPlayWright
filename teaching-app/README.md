# PageTurner (the in-class demo app)

> **This is the app we build tests against during class (Day 2 and Day 3).**
> The independent **lab uses a different app, BulkBox** (`../bulkbox/`), on purpose: you practice the same techniques against markup you have not seen, instead of repeating the lesson.

PageTurner is a small fictional online bookstore. You do **not** need to know Angular to use it - just start it and point your tests at it.

It has two parts:

| Part | What it is | Runs on |
| --- | --- | --- |
| `frontend/` | The website (Angular) | http://localhost:4300 |
| `mock-api/` | A fake backend (json-server reading `db.json`) | http://localhost:3101 |

The frontend talks to the backend through `/api` (for example `/api/books`), which is quietly forwarded to json-server. You only ever open **http://localhost:4300** in the browser.

> Note the ports are deliberately different from BulkBox (4200 / 3001), so you can run both apps at the same time without a clash.

## First-time setup (run once)

From inside this `teaching-app` folder:

```bash
npm install
```

That installs the mock-API tools here and the frontend's dependencies too.

## Starting the app (every time)

From inside this `teaching-app` folder:

```bash
npm start
```

This starts **both** the website and the fake backend together. When it is ready, open **http://localhost:4300**. To stop everything, click in the terminal and press `Ctrl + C`.

To run the two pieces separately:

```bash
npm run api        # fake backend on http://localhost:3101
npm run frontend   # website on http://localhost:4300
```

## What you can do in the app

- **Home** (`/`) - a banner, browse-by-genre tiles, and featured books.
- **Catalog** (`/catalog`) - the book list with a filter sidebar (genre, in-stock-only, sort).
- **Book detail** (`/catalog/:id`) - cover, catalog code (SKU), quantity selector, add to basket.
- **Sign in** (`/signin`) - a login form with validation.
- **Basket** (`/basket`) - update quantities, remove items, see the subtotal.

### Demo accounts

| Username | Password |
| --- | --- |
| `reader` | `books123` |
| `member` | `shelf456` |

## Clean vs. messy zones (same lesson as BulkBox, different markup)

- **Clean zones** (the sign-in form, the filter sidebar, book detail, the basket): we own this markup, so it has labels, ARIA roles, and `data-testid` hooks. Locators here are short and stable.
- **A messy zone** (the catalog results list): this simulates third-party markup we cannot change - nested `<div>`s, hashed-looking class names like `vlist__r4k`, no `data-testid` hooks, and some **duplicated book titles** (two editions of the same title). Locate rows here by role and text.

## The mock API

json-server exposes a REST API from `mock-api/db.json`:

| Endpoint | Returns |
| --- | --- |
| `GET /api/books` | all books |
| `GET /api/books/:id` | one book |
| `GET /api/genres` | all genres |
| `GET /api/members?username=...&password=...` | used by the sign-in form |
