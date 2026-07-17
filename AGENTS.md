# Agent Continuity — CFHF Search Prototype

## Editors

| Tool | Role |
|---|---|
| **Cursor** | Primary scaffolding / paired implementation |
| **Cline (VS Code)** | Parallel or handoff implementation — open this folder as the workspace |

## Before you start

1. `git pull`
2. Read `.clinerules` → **Current Session State** (especially **Message for Cline** + **Decisions LOCKED**)
3. Read latest entries in `JOURNAL.md`
4. If cold-starting in Cline, also read `cline-project-handoff.md`

## After every finished prompt (REQUIRED)

**Do this at the end of every completed turn** — not only at end of day / long sessions.

1. Update `.clinerules` → **Current Session State** (date, agent, status, in progress, newly completed, blockers, next step)
2. Prepend a short entry to `JOURNAL.md` describing what changed
3. Update **this file (`AGENTS.md`)** if build progress, next step, or sync notes changed
4. Commit / push when Matt asks (keeps Cursor ↔ Cline in sync)

Skip only for pure Q&A with **zero** file or plan changes.

## Do not

- Assume the other agent's uncommitted work exists — trust git + these files
- Rebuild the full CFHF site
- Introduce frameworks or Search & Filter Pro without asking
- Invent a navy top header or gold brand system (live site does not use those)
- End a coding turn without updating agent continuity files

---

## Build progress (2026-07-17)

| Step | Status |
|---|---|
| 1. Brand tokens + base shell | **DONE** (Cursor) |
| 2. Global header search states | **DONE** (Cline) |
| 3. Predictive dropdown | **DONE** (Cursor) |
| 4. Results hero + layout | scaffold exists — **NEXT** |
| 5. Category filters (real) | UI only (not wired) |
| 6. Standard + HOF cards | pending |
| 7. Empty state | pending |
| 8. A11y + mobile polish | partially done |

**Handoff:** **Cline** is moving search into the hours bar (locked). Cursor: don’t touch search placement until Cline pushes. After that → Step 4+ (results hero wiring, filters/cards).

### Decision LOCKED — hours-bar search
- Search icon in `.hours-bar` beside “Important Details +”; inline expand; dropdown downward
- Remove hero / results-header search overlays
- Global chrome on both `index.html` and `search.html`

### What hours-bar search move delivered (Cline)
- Search moved into `.hours-bar` alongside "Important Details +" on both `index.html` and `search.html`
- `.hours-bar__end` flex container: search icon → inline expand input → "Important Details +" link
- CSS: `.search-bar--hours` (transparent bg, white text, crimson icon, dark dropdown), `.hours-bar__end` layout
- Removed dead `.hero-carousel__search` CSS; rail remains logo/CTAs/nav only

### What live home match delivered (Cursor)
- Hero carousel (Game Day Goes Global / Summer Legendary / CityPASS) + hours bar
- Destination section + Tickets / Group Outings / 2026 Class cards + Happenings strip
- Join the Legacy band with Tebow quote
- Files: `index.html`, `assets/css/home.css`, `assets/js/home.js`

### What search UX refactor delivered (Cline)
- Search removed from left rail on both `index.html` and `search.html`
- Home: search input in dark hero (`#home-search`) — `.search-bar--hero`, always visible
- Search results: search input in results header above query hero (`#results-search`)
- CSS: hero search (translucent white bg, white text, downward dropdown)
- JS: generalized to `.search-bar-wrap`; hero bars auto-expand without trigger

### What index restore delivered
- `index.html`: full left-rail chrome + home hero explaining the search prototype + CTAs
- Shared `tokens.css` / `search.css` / `search.js` / Typekit `acw8nkk` with results page
- Entry: `/` → home; results: `/search.html` (and `?q=`)

### What Step 3 delivered
- `search.js`: fetch + score `data/search-index.json`; live typeahead on `.search-bar__input`
- HOF rows: avatar (image or initials) + team badge; general rows: category icon + label
- Keyboard: ArrowUp/Down, Enter selects, Escape closes suggestions then collapses bar
- `search.css`: `.search-suggest` panel opens upward above rail-bottom search
- `search.html`: combobox markup + `#search-suggest` listbox

### What Step 2 delivered
- `.search-bar` component in `search.css`: crimson search icon, inline expand (max-width 200px with transition), close button, focus/expand border state
- `search.js`: expand/collapse on icon click, close button, Enter to submit, Escape to collapse, outside-click collapse, `submitSearch()` → `search.html?q=`, `populateFromURL()` reads query param and updates hero on `/search`
- `index.html` + `search.html`: search slot replaced with interactive `.search-bar`

### What logo addition delivered
- `assets/images/logo.png` — official CFHF logo downloaded from cfbhall.com/images/logo.png (32KB)
- `.rail-logo__img` CSS: max-width 180px, centered
- Both HTML pages now show the official logo above the text wordmark

## Execution Plan (shared — Cline draft + Cursor lock)

### Phase: Planning — COMPLETE

| # | Decision | Locked |
|---|---|---|
| 1 | Chrome | Match live **left-rail** (simplified OK); search in rail or hours bar |
| 2 | Search behavior | **Option A** — icon expands **inline** |
| 3 | Filter sidebar | **Right** sticky on `/search` |
| 4 | Categories | **One** — `general-tickets` |
| 5 | Logo | Wordmark placeholder OK |

### File map (target)

```
/
  index.html
  search.html
  assets/css/tokens.css
  assets/css/search.css
  assets/js/search.js
  data/search-index.json
  .clinerules
  cline-project-handoff.md
  AGENTS.md
  JOURNAL.md
  README.md
```

### Tech stack
- Vanilla HTML / CSS / JS only
- No React/Next, no Search & Filter Pro, no Umbraco runtime
- Tokens from live: crimson `#b5202b`, white rail, `#C0C1C3`, `#888A8E`, black hours
- Fonts: Kaneda + Neusa Next (or closest licensed stand-ins) — **not Inter**; **no gold system**