# CFHF Search Prototype

Client-shareable prototype for the Chick-fil-A College Football Hall of Fame **search experience**.

## Scope

- Hours-bar global search (always-visible input + crimson submit, expand-left, typeahead)
- Predictive typeahead (Hall of Famer vs general + “search all”)
- `/search` results page with live hero, category filters, cards, empty state
- Mock Umbraco backend via local Examine-shaped JSON

No Search & Filter Pro. Vanilla HTML / CSS / JS only.

## Status

| Step | Status |
|---|---|
| 1. Brand tokens + base shell | **Done** |
| 2. Hours-bar search chrome | **Done** |
| 3. Predictive dropdown | **Done** |
| 4. Results hero + layout | **Done** |
| 5. Category filters (real) | **Done** |
| 6. Standard + HOF cards | **Done** |
| 7. Empty state | **Done** |
| 8. A11y + mobile polish | **Done** |

**Client-ready** on GitHub Pages. Design feedback / Figma next.

## Mock index notes

`data/search-index.json` is Examine-shaped (title, excerpt, image, category, dates, inductionYear, team, teamBadge).

**Empty `image: ""` fields are intentional.** The UI generates HOF portrait placeholders at runtime (team-tinted silhouette + initials) plus a shield-style team badge from `team` / `teamBadge`. Real CMS portrait URLs can drop into `image` later without markup changes.

## Run locally

Serve the folder (needed for `fetch` on the JSON index):

```bash
cd ~/Projects/cfhf-search-prototype
python3 -m http.server 8080
```

- http://localhost:8080/ — home (live-style chrome + hours-bar search)
- http://localhost:8080/search.html — browse all results
- http://localhost:8080/search.html?q=touchdown — sample query
- http://localhost:8080/search.html?q=tebow&category=inductees — query + category

### Demo queries

| Query | Expect |
|---|---|
| `tebow` | 1 HOF card (Tim Tebow) |
| `ticket` | Visit & Tickets pages |
| `touchdown` | Event + tickets + news mix |
| `florida` | Tebow + Emmitt Smith |
| `zzzz` | Empty state + popular chips |

## For agents (Cursor / Cline / Grok)

1. Open this folder as the workspace
2. `git pull`
3. Read **`.clinerules`** (Current Session State) → **`JOURNAL.md`** → **`AGENTS.md`**
4. Cold-start in Cline: also **`cline-project-handoff.md`**
5. After finished prompts with file/plan changes: update those three continuity files

## Live demo (GitHub Pages)

https://mattybotstew.github.io/cfhf-search-prototype/

- Home: https://mattybotstew.github.io/cfhf-search-prototype/
- Search: https://mattybotstew.github.io/cfhf-search-prototype/search.html
- Sample: https://mattybotstew.github.io/cfhf-search-prototype/search.html?q=touchdown

Published from `master` (root). After each push, wait a minute for Pages to rebuild.

## Repo

https://github.com/MattybotStew/cfhf-search-prototype
