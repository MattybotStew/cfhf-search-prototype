# CFHF Search Prototype — Project Handoff for Cline

**Purpose:** Full cold-start context for VS Code / Cline. Read this + `.clinerules` + latest `JOURNAL.md` before editing.

**Repo:** https://github.com/MattybotStew/cfhf-search-prototype  
**Local:** `~/Projects/cfhf-search-prototype`  
**Live (GitHub Pages):** https://mattybotstew.github.io/cfhf-search-prototype/

---

## 1. One Paragraph

CloudMellow is building a **client-shareable search UX prototype** for the Chick-fil-A College Football Hall of Fame. It is **not** a full site rebuild and **not** production Umbraco. The prototype must **behave properly** (real typeahead, real category filtering, real empty state, real cards), look **on-brand** (crimson / athletic type / live chrome), and be easy to demo in a browser and later capture into Figma. Umbraco is mimicked with a local Examine-shaped JSON index. **No Search & Filter Pro.**

**Build Steps 1–8 are complete** as of 2026-07-17. Focus is client feedback / design polish, not greenfield scaffolding.

---

## 2. Product Requirements (as shipped)

### Global header search (LOCKED)
- **Placement:** hours bar (beside “Important Details +”), both pages
- **Chrome:** always-visible stroked input + crimson square submit; focus expands left
- **Not** icon-only expand/collapse (old Option A superseded)
- Search page hours bar: solid black

### Predictive dropdown (“as you type”)
- Live matching against the mock index
- Clear visual split:
  - **Hall of Famer:** portrait (image or silhouette + initials) + team shield badge
  - **General pages:** category icon + label
- Always includes “Search all results for …” row

### `/search` results page
- Hero: “Showing results for ‘…’” / browse-all + live result count
- **Category filtering:**
  - Desktop: **sticky right** sidebar with counts
  - Mobile: horizontal scrolling pills (≥44px tap targets) with counts
  - Categories: All · Inductees · News · Events · General & Tickets
- **Cards:**
  - Standard: title, excerpt, category tag, date
  - Hall of Famer: portrait, induction year, team/university shield badge
- **Empty state:** friendly copy; popular search chips; Inductees + Tickets CTAs

### Mobile chrome (live match)
- Black hours bar
- White top bar: hamburger · centered logo · outlined TICKETS
- Hamburger opens slide-out left rail

### Constraints
- Mobile-first, tappable filters/cards
- High contrast + clear `:focus-visible` keyboard states
- Metadata maps to Umbraco search fields
- **NO Search & Filter Pro**

---

## 3. Brand Direction (live site)

**Live reference:** https://www.cfbhall.com/

| Role | Live value / direction |
|---|---|
| Primary | `#b5202b` crimson (TICKETS, accents) |
| Secondary / logo | Navy in Chick-fil-A CFHF shield |
| Borders | `#C0C1C3` |
| Muted | `#888A8E` |
| Chrome | Left sticky white sidebar (~280–328px); hours bar; mobile topbar |
| Headings | **Kaneda** — bold condensed uppercase |
| Body / UI | **Neusa Next** / Neusa Next Std Compact (Typekit `acw8nkk`) |

**Critical gap:** live site has **no search UI**. This prototype is the proposed new experience.

Avoid Inter + amber/gold + indigo “SaaS search” look.

---

## 4. How to Mimic Umbraco

Do **not** run Umbraco for this prototype.

Use `data/search-index.json` as a fake Examine index. Typeahead and results **must share** that dataset.

Empty `image` → JS renders team-tinted silhouette portrait. Set `image` URL when real assets exist.

Example document:

```json
{
  "id": "umb-inductee-002",
  "docType": "inductee",
  "category": "inductees",
  "title": "Tim Tebow",
  "excerpt": "Heisman Trophy winner… Class of 2023.",
  "url": "/hall-of-fame/inductees/tim-tebow/",
  "image": "",
  "date": "2023-12-05",
  "inductionYear": 2023,
  "team": "Florida",
  "teamBadge": "Florida"
}
```

Production handoff: swap JSON fetch for Umbraco search API; keep card/filter UI contract.

---

## 5. Build Order — ALL DONE

1. Brand tokens + base shell ✅  
2. Header search states ✅  
3. Predictive dropdown ✅  
4. Results hero + layout ✅  
5. Category filters ✅  
6. Cards (standard + HOF) ✅  
7. Empty state ✅  
8. A11y / mobile polish ✅  

---

## 6. Multi-Agent Workflow

- **Cursor**, **Cline**, and **Grok** work in this repo
- Before coding: `git pull` + read `.clinerules` Current Session State
- **After every finished prompt:** update `.clinerules`, prepend `JOURNAL.md`, refresh `AGENTS.md`; commit/push when Matt asks
- Details: `AGENTS.md` → “After every finished prompt (REQUIRED)”

---

## 7. Decisions LOCKED (current)

1. Chrome: live left-rail (desktop); mobile topbar pattern  
2. Search: hours-bar always-visible + crimson square + expand-left + typeahead (**not** Option A)  
3. Filters: **right** sticky on `/search`  
4. Categories: keep **general-tickets** as one  
5. Logo: official PNG in `assets/images/logo.png`  
6. Stack: vanilla HTML/CSS/JS only  

---

## 8. Out of Scope

- Full CFHF marketing homepage rebuild (home first sections matched for context only)  
- Real Umbraco install / Examine config  
- Search & Filter Pro  
- Final legal logo lockups beyond current PNG  

---

## 9. Demo queries

| Query | Expect |
|---|---|
| `tebow` | HOF card + typeahead portrait/badge |
| `florida` | Tebow + Emmitt Smith |
| `ticket` | Visit & Tickets pages |
| `touchdown` | Mixed categories |
| `zzzz` | Empty state |
