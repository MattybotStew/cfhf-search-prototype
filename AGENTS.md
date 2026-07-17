# Agent Continuity — CFHF Search Prototype

## Editors

| Tool | Role |
|---|---|
| **Cursor** | Scaffolding / paired implementation |
| **Cline (VS Code)** | Parallel or handoff implementation |
| **Grok** | Recent: Steps 4–8, mobile chrome, Pages, HOF visual fidelity |

## Before you start

1. `git pull`
2. Read `.clinerules` → **Current Session State** (especially **Decisions LOCKED**)
3. Read latest entries in `JOURNAL.md`
4. If cold-starting in Cline, also read `cline-project-handoff.md`

## After every finished prompt (REQUIRED)

**Do this at the end of every completed turn** — not only at end of day / long sessions.

1. Update `.clinerules` → **Current Session State** (date, agent, status, in progress, newly completed, blockers, next step)
2. Prepend a short entry to `JOURNAL.md` describing what changed
3. Update **this file (`AGENTS.md`)** if build progress, next step, or sync notes changed
4. Commit / push when Matt asks (keeps agents in sync)

Skip only for pure Q&A with **zero** file or plan changes.

## Do not

- Assume the other agent's uncommitted work exists — trust git + these files
- Rebuild the full CFHF site
- Introduce frameworks or Search & Filter Pro without asking
- Invent a navy top header or gold brand system (live site does not use those)
- Revert hours-bar search to icon-only Option A
- End a coding turn without updating agent continuity files

---

## Live demo

**GitHub Pages:** https://mattybotstew.github.io/cfhf-search-prototype/  
**Source:** `master` root + `.nojekyll`  
**Repo:** https://github.com/MattybotStew/cfhf-search-prototype  

| Page | URL |
|---|---|
| Home | https://mattybotstew.github.io/cfhf-search-prototype/ |
| Search | https://mattybotstew.github.io/cfhf-search-prototype/search.html |
| Sample | https://mattybotstew.github.io/cfhf-search-prototype/search.html?q=tebow |

Local: `python3 -m http.server 8080` from repo root.

---

## Build progress (2026-07-17) — COMPLETE

| Step | Status |
|---|---|
| 1. Brand tokens + base shell | **DONE** |
| 2. Global header search states | **DONE** |
| 3. Predictive dropdown | **DONE** |
| 4. Results hero + layout | **DONE** |
| 5. Category filters (real) | **DONE** |
| 6. Standard + HOF cards | **DONE** |
| 7. Empty state | **DONE** |
| 8. A11y + mobile polish | **DONE** |

**Status:** Client-shareable prototype. Full funnel live. Design feedback / Figma capture next — not blocked on missing build steps.

**Handoff:** Client-ready. Review gaps verified on live Pages (Cursor). Empty `image` → runtime HOF placeholders (documented in README). Do **not** revert hours-bar to icon-only Option A. Next: client feedback / Figma.

### Client review gap status (2026-07-17 — Cursor QA)
| Item | Status |
|---|---|
| HOF portrait placeholders | Verified live (silhouette + initials) |
| Team badge visual | Verified live (shield + school name) |
| Sticky right filters | Verified (`position: sticky`) |
| Mobile pills scroll + tap | Verified (overflow-x, 44px, counts) |
| Dynamic category counts | Verified desktop + mobile |
| Empty `image: ""` in JSON | Intentional — see README |

### Decision LOCKED — hours-bar search
- Placement: `.hours-bar` beside “Important Details +” (both pages)
- Chrome: always-visible white-stroked input + crimson square submit; focus expands left
- Functionality: predictive dropdown downward — HOF (portrait + team badge) vs general (icon + label)
- Search page hours bar: solid black (`.hours-bar--solid`)
- **Not** icon-only → click-expand → close

### What client-ready polish delivered (Grok)
- HOF portrait placeholders (team-tinted silhouette + initials) when `image` empty
- Team shield badge + school name (brand colors for OSU/UF/ND/OKST)
- HOF cards show portrait + Inducted year + team badge
- Sticky right filter aside (clears hours bar); mobile pills ≥44px, horizontal scroll
- Dynamic category counts on desktop + mobile
- Typeahead z-index above mobile topbar
- GitHub Pages live

### What Steps 4–8 delivered (Grok)
- Results hero: `?q=`, live counts, browse-all without query
- Filters: desktop aside + mobile pills, `?category=` sync
- Cards: HOF + standard from shared index
- Empty: no hits + empty-category; popular chips; CTAs
- Mobile topbar: hamburger · logo · TICKETS (live match)
- Mobile hero layout match (full-width CTA, edge carousel controls)

### What earlier steps delivered
- Hours-bar search (Cline + Cursor lock); typeahead (Cursor); left-rail chrome + logo; home sections match live first 3 blocks

## Execution Plan (locked decisions)

| # | Decision | Locked |
|---|---|---|
| 1 | Chrome | Live **left-rail** (desktop); mobile topbar hamburger · logo · TICKETS |
| 2 | Search | Hours bar: always-visible + crimson square + expand-left + typeahead |
| 3 | Filter sidebar | **Right** sticky on `/search` |
| 4 | Categories | **One** bucket `general-tickets` |
| 5 | Logo | Official `assets/images/logo.png` |

### File map

```
/
  index.html
  search.html
  assets/css/tokens.css
  assets/css/search.css
  assets/css/home.css
  assets/js/search.js
  assets/js/home.js
  assets/images/logo.png
  assets/images/arrow.svg
  data/search-index.json
  .nojekyll
  .clinerules
  cline-project-handoff.md
  AGENTS.md
  JOURNAL.md
  README.md
```

### Tech stack
- Vanilla HTML / CSS / JS only
- No React/Next, no Search & Filter Pro, no Umbraco runtime
- Tokens: crimson `#b5202b`, white rail, `#C0C1C3`, `#888A8E`, black hours
- Fonts: Kaneda + Neusa Next (Typekit `acw8nkk`) — **not Inter**; **no gold system**
