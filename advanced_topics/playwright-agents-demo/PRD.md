# GearLoop — Product brief (for the Planner agent)

Attach this file to the Planner agent so it has context about what the app is
supposed to do. It is deliberately short.

## What GearLoop is

GearLoop is a small internal tool that lets employees check out shared IT
equipment (monitors, keyboards, projectors, docks) to their desk.

## Pages

1. **Sign in** (`index.html`) — a work email and password. Any non-empty email
   and password are accepted; there is no real authentication in this demo.
   Submitting takes you to the catalog.
2. **Equipment catalog** (`catalog.html`) — a list of equipment cards. Each card
   shows the item name, an asset tag, an availability badge, a "Check out"
   button, and a small icon button to hide the card. A search box at the top
   filters the cards.

## Core user flows to cover

1. **Sign in** with an email and password, land on the catalog.
2. **Sign-in validation** — leaving email or password empty shows an inline
   error and stays on the sign-in page.
3. **Search** for an item (e.g. "Projector") and confirm the list narrows.
4. **Check out an item** and confirm that card's badge changes from
   "Available" to "Checked out".

## Known reality (important for the tester)

This markup was hand-written by product engineers, not with testing in mind:

- There are **no `data-testid` attributes** anywhere.
- The sign-in button is a styled `div`, not a real `<button>`.
- Every catalog card has an **identical "Check out" button label**.
- Two cards share the **same item name** ("Dell Monitor") with different asset
  tags.
- The search box and the password/email inputs have **placeholders but no
  associated labels**.
- The hide button is **icon-only** (a "times" glyph) with no accessible name.

The tester has to work with this markup as-is. Locators should be scoped to a
single card and prefer resilient strategies over brittle ones.
