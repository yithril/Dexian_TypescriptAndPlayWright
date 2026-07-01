# Setting up Playwright Agents in VS Code

This is the "I have a plain VS Code and nothing special installed" guide. Follow
it top to bottom once, and you'll be able to run the Planner, Generator, and
Healer agents on this demo.

---

## Do I need to pay for GitHub Copilot?

**No.** There is a free **GitHub Copilot Free** plan ($0, no credit card) that
includes limited **agent mode** and chat — which is enough to try the Playwright
agents. You only need a (free) GitHub account to sign in.

What "free" gets you:

- 2,000 code completions per month
- A limited monthly allowance of AI credits for chat and **agent mode**
- Automatic model selection (you don't pick the model)

What that means for this demo:

- A full Planner → Generator → Healer run uses several agent messages, and agent
  sessions consume credits faster than a quick chat question. On the Free plan
  you may hit the monthly cap if you run the whole loop many times.
- For a single classroom walkthrough, Free is usually fine. If you plan to run
  it repeatedly (or have a room full of students each running it), a paid plan
  (Copilot Pro) gives you a bigger credit pool and less waiting.

> There is no fully offline / no-account AI built into VS Code. The "free AI" you
> may have heard of **is** Copilot Free — it still requires signing in with a
> GitHub account.

Other option: the agents also work with **Claude Code**, **Codex**, or
**OpenCode** via `--loop=claude` / `--loop=codex` / `--loop=opencode` if you
already use one of those. This guide covers the VS Code + Copilot path.

---

## Step 1 — Update VS Code

The agent experience needs **VS Code 1.105 or newer** (released Oct 2025).

- Check: **Help → About** (Windows/Linux) or **Code → About** (Mac).
- If it's older, update: **Help → Check for Updates**, then restart.

## Step 2 — Check Node.js

You need **Node.js 18 or newer**.

```bash
node --version
```

If it prints something below v18 (or "command not found"), install the latest LTS
from https://nodejs.org and reopen your terminal.

## Step 3 — Install the Copilot extensions and sign in

1. Open the **Extensions** panel (the squares icon in the left sidebar).
2. Search for **GitHub Copilot** and install it.
3. Search for **GitHub Copilot Chat** and install it too.
4. Click the **Accounts** icon (bottom-left) → **Sign in with GitHub**.
5. If you don't have Copilot yet, VS Code will prompt you to enable it — choose
   the **Free** plan.

To confirm it works: click the **Copilot Chat** icon in the sidebar, type
"hello", and make sure you get a reply.

## Step 4 — Install this demo's dependencies

Open a terminal **in this folder** (`playwright-agents-demo`) and run:

```bash
# PowerShell (Windows):
$env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1; npm install

# bash / zsh (Mac/Linux):
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

The `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` part is important: these examples use the
**Google Chrome already on your machine** (`channel: 'chrome'`), so there's no
need to download Playwright's own browser binaries.

Sanity check that the app and Playwright work:

```bash
npx playwright test tests/seed.spec.ts
```

You should see `1 passed`. If Chrome isn't installed, open
`playwright.config.ts` and change `channel: 'chrome'` to `channel: 'msedge'`.

## Step 5 — Add the Playwright MCP server

The agents drive a real browser through the **Playwright MCP server**. Register
it with VS Code (run this in a terminal):

```bash
# PowerShell (Windows) — note the escaped quotes:
code --add-mcp "{\"name\":\"playwright\",\"command\":\"npx\",\"args\":[\"@playwright/mcp@latest\"]}"

# bash / zsh (Mac/Linux):
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

(If `code` isn't recognized in your terminal, open VS Code, press
`Ctrl/Cmd+Shift+P`, run **Shell Command: Install 'code' command in PATH**, then
retry.)

## Step 6 — Generate the agent definitions

Still in this folder:

```bash
npx playwright init-agents --loop=vscode
```

This creates:

- `.github/` — the three agent definitions (planner, generator, healer)
- `.vscode/mcp.json` — the per-project MCP config

**Reload VS Code** afterward (Command Palette → **Developer: Reload Window**).
The agents often won't appear in the dropdown until you reload.

## Step 7 — Confirm the agents are there

1. Open **Copilot Chat**.
2. Switch the chat mode to **Agent**.
3. Open the agent/mode dropdown — you should see:
   - `playwright-test-planner`
   - `playwright-test-generator`
   - `playwright-test-healer`
4. (Optional) Ask Copilot: *"open index.html and take a screenshot"*. If it
   launches a browser, the MCP connection is working.

You're ready. Head back to **[README.md](README.md)** and start at
"The demo, step by step".

---

## Quick troubleshooting

| Problem | Fix |
| --- | --- |
| No agents in the dropdown | Reload the VS Code window; confirm VS Code ≥ 1.105 |
| `code` command not found | Command Palette → "Shell Command: Install 'code' command in PATH" |
| Agent can't open a browser | Re-run the `code --add-mcp` command; check `.vscode/mcp.json` exists |
| Browser download errors on `npm install` | Make sure you set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` |
| Chrome not found when running tests | Change `channel: 'chrome'` to `'msedge'` in `playwright.config.ts` |
| Hit Copilot usage limits mid-demo | You're on the Free credit cap — wait for the monthly reset or upgrade to Pro |
| Want faster agent runs | In `.vscode/mcp.json`, add `"headless": true` so the agent browser doesn't pop up |
