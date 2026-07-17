# CFHF Search Prototype — Project Handoff for Cline

**Purpose:** Full cold-start context for VS Code / Cline. Read this + `.clinerules` + latest `JOURNAL.md` before editing.

**Repo:** https://github.com/MattybotStew/cfhf-search-prototype (private)  
**Local:** `~/Projects/cfhf-search-prototype`

---

## 1. One Paragraph

CloudMellow is building a **client-shareable search UX prototype** for the Chick-fil-A College Football Hall of Fame. It is **not** a full site rebuild and **not** production Umbraco. The prototype must **behave properly** (real expand search, real typeahead, real category filtering, real empty state), look **on-brand** (crimson / navy / athletic type), and be easy to demo in a browser and later capture into Figma for presentation. Umbraco is mimicked with a local Examine-shaped JSON index. **No Search & Filter Pro.**

---

## 2. Product Requirements (source of truth)

### Global header search
- **Default:** clean accessible search icon in the global header
- **Active:** smooth expand into an input on click (hover optional)
- Desktop + mobile

### Predictive dropdown (“as you type”)
- Live matching against the mock index
- Clear visual split:
  - **Hall of Famer:** thumbnail/avatar + team badge
  - **General pages:** text / icon suggestions

### `/search` results page
- Hero: “Showing results for ‘…’” + result count
- **Category filtering (core):**
  - Desktop: sticky sidebar (brief specifies **right**; confirm if changing)
  - Mobile: horizontal scrolling pills (or collapsible drawer)
  - Categories + counts:
    - All Results
    - Inductees & Players
    - News & Blog Articles
    - Exhibits & Events
    - General Information and Tickets
- **Cards:**
  - Standard: title, excerpt/snippet, category tag, date
  - Hall of Famer: portrait, induction year, team/university badge
- **Empty state:** friendly, on-brand; suggest popular terms; link to inductees directory

### Constraints
- Mobile-first, tappable filters/cards
- High contrast + clear `:focus-visible` keyboard states
- Metadata must map to Umbraco search fields (title, excerpt, image, category, date/year)
- **NO Search & Filter Pro**

---

## 3. Brand Direction (live site + design spec)

**Live reference:** https://www.cfbhall.com/ (audited 2026-07-17)

| Role | Live value / direction |
|---|---|
| Primary | `#b5202b` crimson (TICKETS, accents) |
| Secondary / logo | Navy in Chick-fil-A CFHF shield |
| Borders | `#C0C1C3` |
| Muted | `#888A8E` |
| Chrome | Left sticky white sidebar (~280–328px); hours bar over content |
| Headings | **Kaneda** — bold condensed uppercase |
| Body / UI | **Neusa Next** / Neusa Next Std Compact (Typekit) |

**Critical gap:** live site has **no search UI** and **no `/search` page**. This prototype is the proposed new experience; it must still feel native to the live chrome/brand.

Avoid the early draft’s Inter + amber/gold + indigo “SaaS search” look for anything client-facing.

---

## 4. How to Mimic Umbraco

Do **not** run Umbraco for this prototype.

Use `data/search-index.json` as a fake Examine index. Typeahead and results **must share** that dataset.

Example document:

```json
{
  "id": "umb-inductee-001",
  "docType": "inductee",
  "category": "inductees",
  "title": "Archie Griffin",
  "excerpt": "Two-time Heisman Trophy winner and Ohio State legend.",
  "url": "/hall-of-fame/archie-griffin/",
  "image": "",
  "date": "2019-01-01",
  "inductionYear": 2019,
  "team": "Ohio State",
  "teamBadge": "Ohio State"
}
```

Production handoff story: swap JSON fetch for Umbraco search API; keep the same card/filter UI contract.

---

## 5. Build Order

1. Brand tokens + base shell  
2. Header search states  
3. Predictive dropdown  
4. Results hero + layout  
5. Category filters (real filtering)  
6. Cards (standard + HOF)  
7. Empty state  
8. A11y / mobile polish  

---

## 6. Multi-Agent Workflow

- **Cursor** and **Cline** both work in this repo
- Before coding: pull + read `.clinerules` Current Session State
- **After every finished prompt** (required): update `.clinerules`, prepend `JOURNAL.md`, refresh `AGENTS.md` build progress; commit/push when Matt asks
- Details: `AGENTS.md` → “After every finished prompt (REQUIRED)”

---

## 7. Decisions (LOCKED 2026-07-17 — Cursor → Cline)

1. Chrome: match live **left-rail** (simplified OK); search in rail or hours bar  
2. Search: **Option A** icon → **inline** expand  
3. Filters: **right** sticky on `/search`  
4. Categories: keep **“General Information and Tickets”** as one (`general-tickets`)  
5. Logo: wordmark placeholder OK  

See `.clinerules` → **Message for Cline** and `AGENTS.md` → **Cursor → Cline sync note**.

---

## 8. Out of Scope

- Full CFHF marketing homepage rebuild  
- Real Umbraco install / Examine config  
- Search & Filter Pro  
- Final legal logo lockups (placeholders OK)
