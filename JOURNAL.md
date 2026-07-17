# Journal — CFHF Search Prototype

## 2026-07-17 — Cursor: fix arrow orientation

- Figma's rotate(83.976deg) assumed a vertical source; our arrow.svg already points right
- Removed transform; sized `.rail-nav__arrow` to the rotated result (27.823×11.765px)

## 2026-07-17 — Cursor: Figma arrow size + rotation

- `.rail-nav__arrow`: 11.765×27.823px, `rotate(83.976deg)` per Figma

## 2026-07-17 — Cursor: Figma nav type for rail links

- Applied Figma sidebar link type to `.rail-nav__link`: Kaneda Gothic 700, 32px / 22.4px, letter-spacing 1px, uppercase, #000

## 2026-07-17 — Cursor: use live arrow.svg in rail nav

- Wired `assets/images/arrow.svg` into Hall of Fame / Experience / Visit / News & Happenings nav items
- Replaced inline chevron SVGs; hover tints arrow toward crimson

## 2026-07-17 — Cursor: sidebar closer to live site

- Matched left rail to live screenshot: logo-only (no wordmark/sub), live CTA layout, taller crimson TICKETS, smaller outlined Donate/Membership, Kaneda nav + SVG chevrons, removed section borders
- Search stays at bottom of rail (prototype-only; live has membership promo there)

## 2026-07-17 — Cursor: remove index gateway

- `index.html` is now a redirect to `search.html` (no stub home / gateway)
- README entry points updated to search-first

## 2026-07-17 — Cursor: hygiene adjustments (Cline keeps Step 3)

- Removed duplicate root `logo.png` (same hash as `assets/images/logo.png`)
- Updated `index.html` stub: Steps 1–2 done, Step 3 in progress
- Cleaned `README.md` status table + run instructions
- Did **not** touch predictive dropdown / Step 3

## 2026-07-17 — Cursor: got up to speed (hold continues)

- Read `.clinerules`, `JOURNAL.md`, `AGENTS.md`; inspected working tree
- **Remote still at** `f664005` (plan sync only) — Step 1–2 code is **local uncommitted**
- Status: Step 1 DONE (Cursor), Step 2 DONE (Cline), Step 3 IN PROGRESS (Cline); Cursor still holding
- Note: duplicate `logo.png` at repo root vs `assets/images/logo.png` — clean up later if needed

## 2026-07-17 — Cline: official logo added

- Downloaded `assets/images/logo.png` from live site (cfbhall.com/images/logo.png, 32KB)
- Added `.rail-logo__img` CSS (max-width 180px, centered)
- Updated `index.html` and `search.html` — official CFHF logo now shows above text wordmark in left rail

## 2026-07-17 — Cursor: holding steady (Cline first pass)

- Matt: Cline takes the first build pass; Cursor holds
- Active agent set to **Cline** in `.clinerules` / `AGENTS.md`
- Cursor will not start Step 2 until Cline finishes or Matt reassigns

## 2026-07-17 — Cline: Step 2 complete (inline expand search)

- Replaced search slot placeholder with interactive `.search-bar` component
- **CSS:** icon trigger, input wrapper (max-width 0→200px transition), close button (visibility/opacity), crimson border on expand/`:focus-within`, WebKit search-cancel-button style
- **JS:** expand on icon click, close button, Enter→submit, Escape→collapse, outside click→collapse, `submitSearch()` navigates to `search.html?q=`, `populateFromURL()` reads `?q=` and updates hero display
- **HTML:** both `index.html` and `search.html` now use the interactive `.search-bar` markup
- Search bar sits in the white left rail with crimson icon, matches live chrome pattern
- **Next:** Step 3 — predictive dropdown (live JSON filtering, HOF vs general split)

## 2026-07-17 — Cursor: require agent updates after every prompt

- Locked standing rule: after **every finished prompt** with file/plan changes, update `.clinerules`, `JOURNAL.md`, and `AGENTS.md` build progress
- Documented in `AGENTS.md` → “After every finished prompt (REQUIRED)”
- Refreshed `AGENTS.md` Step 1 = DONE, Step 2 = NEXT

## 2026-07-17 — Cursor: Step 1 complete (tokens + base shell)

- Added `assets/css/tokens.css`, `assets/css/search.css`
- Added `index.html` (home stub), `search.html` (results scaffold with right filter column)
- Added `data/search-index.json` (18 mock Examine-shaped docs)
- Added `assets/js/search.js` (mobile rail toggle only)
- Linked Typekit `acw8nkk` (Kaneda + Neusa Next — same as live)
- Left-rail chrome: wordmark, crimson TICKETS, outlined DONATE/MEMBERSHIP, nav, search slot placeholder
- **Next:** Step 2 — inline expand search + wire to index

## 2026-07-17 — Cursor → Cline: plan sync + decisions locked

- Compared Cline’s 8-step plan vs Cursor plan: **aligned** on stack, files, build order
- Corrected Cline brand assumptions: **no navy top header**, **no gold token**; live = white left rail + `#b5202b`
- **Locked decisions** written into `.clinerules` + `AGENTS.md` for Cline:
  1. Left-rail chrome (simplified OK)
  2. Inline expand search (Option A)
  3. Filters on the **right**
  4. One `general-tickets` category
  5. Wordmark placeholder OK
- Planning phase **complete** — Cline (or Cursor) may start **Step 1** after `git pull`
- Ask Cline: read `.clinerules` “Message for Cline” first

## 2026-07-17 — Cursor: live site audit (cfbhall.com)

- Reviewed https://www.cfbhall.com/ in browser + HTML
- **No search today:** no search control in chrome; `/search` 404; `?s=` ignored → homepage
- Umbraco confirmed (`/umbraco/api/subscribeapi/Newsletter`)
- Chrome = **left white sidebar** + hours bar + main hero (not a navy top header)
- Tokens: crimson `#b5202b`, border `#C0C1C3`, muted `#888A8E`, Kaneda + Neusa Next
- Corrected `.clinerules` brand table (remove mistaken navy-header / gold assumptions)
- Updated `cline-project-handoff.md` brand section
- Implication: prototype search is **net-new**, must feel native to live chrome

## 2026-07-17 — Cline: plan phase, live site reviewed, agent files updated

- **State:** Planning phase — *superseded by Cursor lock above*
- **Live site reviewed:** cfbhall.com — brand tokens confirmed (navy structural, crimson accent, gold sparingly, athletic condensed headings) — *partially superseded by Cursor audit*
- **Updated:** `.clinerules`, `AGENTS.md` (execution plan), this journal
- Open decisions were listed; now locked by Cursor sync entry

## 2026-07-17 — Cursor: repo + Cline handoff

- Created private repo `MattybotStew/cfhf-search-prototype` at `~/Projects/cfhf-search-prototype`
- Scope: search UX prototype only; Umbraco mimicked via JSON index; no Search & Filter Pro
- Added `.clinerules`, `cline-project-handoff.md`, `AGENTS.md`, this journal
