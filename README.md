# CFHF Search Prototype

Client-shareable prototype for the Chick-fil-A College Football Hall of Fame **search experience**.

## Scope

- Global header search states (default → expanded)
- Predictive typeahead (Hall of Famer vs general)
- `/search` results page with category filters
- Standard + Hall of Famer result cards
- Empty state

Umbraco is mocked via a local search-index JSON shaped like an Examine index. No Search & Filter Pro.

## Status

| Step | Status |
|---|---|
| 1. Brand tokens + base shell | Done |
| 2. Inline expand search | Done |
| 3. Predictive dropdown | In progress (Cline) |
| 4–8 | Pending |

## Run locally

Serve the folder (needed for `fetch` on the JSON index):

```bash
cd ~/Projects/cfhf-search-prototype
python3 -m http.server 8080
```

Entry is **search** (no home gateway):

- http://localhost:8080/ → redirects to `search.html`
- http://localhost:8080/search.html
- http://localhost:8080/search.html?q=touchdown

## For Cline (VS Code)

1. Open this folder as the workspace: `~/Projects/cfhf-search-prototype`
2. Read **`.clinerules`** (current state) and **`cline-project-handoff.md`** (full brief)
3. Check **`JOURNAL.md`** + **`AGENTS.md`** for Cursor ↔ Cline sync
4. `git pull` before starting; update those files after every finished prompt

## Repo

Private: https://github.com/MattybotStew/cfhf-search-prototype
