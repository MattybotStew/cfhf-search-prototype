# Journal — CFHF Search Prototype

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
