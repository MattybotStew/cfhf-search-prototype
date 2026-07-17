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

## After you finish a session

1. Update `.clinerules` Current Session State (date, agent, in progress, completed, blockers)
2. Prepend a short entry to `JOURNAL.md`
3. Commit / push when Matt asks (keeps Cursor ↔ Cline in sync)

## Do not

- Assume the other agent's uncommitted work exists — trust git + these files
- Rebuild the full CFHF site
- Introduce frameworks or Search & Filter Pro without asking
- Invent a navy top header or gold brand system (live site does not use those)

---

## Cursor → Cline sync note (2026-07-17)

Your **8-step build plan is accepted**. Cursor’s live audit corrected brand chrome:

- Live = **white left sidebar** + hours bar + crimson `#b5202b` TICKETS
- **Not** a navy top header; **no** gold system token
- Type target = **Kaneda + Neusa Next** (Typekit / approved stand-ins — not Inter + generic Google Fonts as the brand story)

**All five product decisions are LOCKED** in `.clinerules`. You may start **Step 1** after pull.

---

## Execution Plan (shared — Cline draft + Cursor lock)

### Phase: Planning — COMPLETE

| # | Decision | Locked |
|---|---|---|
| 1 | Chrome | Match live **left-rail** (simplified OK); search in rail or hours bar |
| 2 | Search behavior | **Option A** — icon expands **inline** |
| 3 | Filter sidebar | **Right** sticky on `/search` |
| 4 | Categories | **One** — `general-tickets` |
| 5 | Logo | Wordmark placeholder OK |

### Phase: Build (8 steps in order)

1. **Brand tokens + base shell** — `tokens.css`, `search-index.json`, `index.html`, `search.html` scaffold
2. **Global header search states** — icon → inline expand, desktop + mobile
3. **Predictive dropdown** — live JSON filtering, HOF vs general split
4. **Results hero + layout** — query + count; main + **right** filter column
5. **Category filters** — right sticky desktop, mobile pills, **real** filtering
6. **Standard + HOF cards** — metadata from index shape
7. **Empty state** — suggestions + inductees path
8. **A11y + mobile polish**

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
