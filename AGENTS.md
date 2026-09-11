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
| CCFB logo options | https://mattybotstew.github.io/cfhf-search-prototype/ccfb-logo-options.html |
| Happenings outline | https://mattybotstew.github.io/cfhf-search-prototype/happenings.html |
| Happenings — Listing | https://mattybotstew.github.io/cfhf-search-prototype/happenings-listing.html |
| Happenings — Transactional | https://mattybotstew.github.io/cfhf-search-prototype/happenings-transactional.html |
| Happenings — RSVP | https://mattybotstew.github.io/cfhf-search-prototype/happenings-rsvp.html |
| Figma import screens | `screens/index.html` (local) |
| Figma listing import (html.to.design) | `happenings-listing-import.html` (localhost only) |
| Happenings — RSVP form embed | `happenings-form-embed.html` (iframe on RSVP alt module) |

Local: `python3 -m http.server 8080` from repo root → also `/ccfb-logo-options.html`.

**Figma import (html.to.design):** serve at 8080 → capture `http://127.0.0.1:8080/happenings-listing-import.html` or `screens/01-listing-d.html` (1440) / `01-listing-m.html` (390). See `FIGMA.md` and `.clinerules` → **Decision LOCKED — Figma html.to.design import**.

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

**Status:** Search prototype is complete and **parked**. Active track is **Happenings only**. Sep 11: mobile listing filter is a styled dropdown on `polish/p0-sprint`. Pages still has chip-scroll until merged to `master`. Next: html.to.design `screens/01`–`09`; optional Ventrata keys.

### What the Happenings outline + Figma screens delivered (Cursor — 2026-09-08)
- `happenings.html` — headlines and links to listing / ticketed / RSVP (no board, no toggles)
- `happenings-wireframes.html` redirects to the outline
- FigJam: https://www.figma.com/board/YOXkU2QjDrRMFnO0CBgoF8
- `screens/` — 18 baked HTML files (9 nodes × desktop 1440 / mobile 390) + `screens/index.html` import notes

### What the Happenings wireframes delivered (Cline — 2026-08-17)
- Retired as a client board; `assets/css/wireframes.css` + `assets/js/wireframes.js` remain unused by the outline. Historical note: former `happenings-wireframes.html` canvas.

> **2026-09-03 click-through flows (Cursor):** `data/happenings-events.json` + `assets/js/happenings.js` — listing filters, `?event=` detail hydration, RSVP confirmation, related-event links, Ventrata scroll fallback.

> **2026-09-03 Ventrata (Cursor):** transactional page uses official Checkout v3 button + script (test env; placeholder API key / product ID). Get Tickets CTAs share `ventrata-checkout`.

> **2026-09-03 designed standalones (Cursor):** `happenings-transactional.html`, `happenings-rsvp.html`, `happenings-listing.html` now use the live `site-rail` chrome from `index.html`/`search.html` (`search.css` + `happenings-pages.css`). Wireframe board unchanged as low-fi.

> **2026-09-03 Nebo r2 (Cursor):** transactional + RSVP gained full-width image hero (height + in-header CTAs), flexible date labels, offer/form copy above conversion CTAs, optional Ventrata/form-embed/calendar, FAQ accordion, Facebook Event in Location/Share, share icons Facebook · Instagram · X. Module toolbar shows desktop reflow when sidebar/widget is off. Listing heading nav matches chip order; categories documented as CMS-editable.

> **2026-08-26 polish (Cline, commit `265e9eb`, LIVE):** listing cards now carry compact category tags (`.wf-tag--xs`) matching the board's spec text — 14 cards on the board + 8 on `happenings-listing.html`. Mobile chip row gained the missing "Community" chip (now 6 = desktop). Standalone pages verified to carry full chrome.
- **01 Full-Service / Transactional** (ticketed): Get Tickets + single Ventrata widget, optional sticky CTA, full-width/sidebar toggle, optional FB embed, compact related carousel
- **02 Lead Gen & RSVP** (non-ticketed): RSVP + form fields + newsletter capture, optional sticky CTA, full-width/sidebar toggle, optional FB embed, compact carousel
- **03 Happenings listing**: denser compact cards + filter chips, no sidebar
- Desktop + mobile variants each; segmented toggle; reuses tokens.css chrome
- **Responsive standalone pages:** `happenings-transactional.html`, `happenings-rsvp.html`, `happenings-listing.html` + `assets/css/wireframe-pages.css` — real rail↔mobile-topbar collapse (≤900px), responsive grids, no toggle. Linked from the board header.

> **2026-08-06 Pages deploy fix (Cline):** Pages silently stopped building this repo on 2026-07-17 (last deploy `68f871e`); pushes `06c8673`/`b9e4ffa` queued no build. Footer code was correct on `origin/master`. Fixed by toggling **Settings → Pages → Source** off/on (`master` / root), which re-queued a build; that first build's "Deploy to GitHub Pages" step hit a transient 10-min timeout, so a re-trigger empty commit (`6628a013`) was pushed → **deploy succeeded; footer is LIVE** (home + search, assets 200, Google Reviews first). If Pages stops deploying with no failed build, use the Settings → Pages source off/on toggle.

> **2026-08-06 CCFB options 404 (Cursor):** `/ccfb-logo-options.html` 404 while home 200; Actions for `6fad3bf` stuck **queued**. Empty re-trigger `a4c5a77` → deploy success → **page LIVE (200)**. No Pages Settings toggle needed.

**Handoff:** **Happenings only.** Search + CCFB parked. Listing **mobile filters** = styled dropdown on `polish/p0-sprint`. Merge to `master` for Pages deploy. Hero overlay = flex + absolute `<img>`. **Figma import:** localhost + absolute URLs. Next: html.to.design `screens/01`–`09` (re-import `*-m` listing). Dev banner: `?dev=1`.

> **2026-09-11 mobile listing filter (Cursor):** ≤900px uses styled **Filter** dropdown (trigger + panel); desktop keeps chips. Same six slugs + `?category=` in `happenings.js`. Figma `01-listing-m` / `02-listing-filter-m` regenerated.

> **2026-09-08 image hero (Cursor):** Detail pages use full-bleed image hero only (`hp-hero--image`); height via `data-hero-h` (sm/md/lg). No text-only hero variant.

### What the Figma html.to.design import fix delivered (Cursor — 2026-09-10)
- **Root cause:** html.to.design does not capture CSS `background-image`; remote cfbhall.com WebP and Pages 404s leave empty `Image (...)` frames in Figma
- **Live pages:** heroes are `<img class="hp-hero__photo">` + `.hp-hero__shade` (absolute overlay + flex copy in `happenings-pages.css`); `happenings.js` hydrates `img.src` from JSON — not `backgroundImage`
- **Assets:** `assets/images/happenings/hero-{listing,ticketed,exhibit}.jpg`; import screens mirror via `screens/img/` with absolute `http://127.0.0.1:8080/...` URLs in generated HTML
- **Import page:** `happenings-listing-import.html` — validated listing capture for html.to.design
- **Generators:** `scripts/generate_figma_import.py`, `screens/generate_screens.py` — run both after image/markup changes
- **Figma target:** Wireframes 2 userflow `553:1219` in file `jcbtHK67Ih9BsBxFQK7F7l`; import via plugin, not MCP screenshot capture
- **Also fixed:** `setText` helper in `happenings.js` for detail hydration (branch `cursor/fix-happenings-settext-hydration`)

### What the Happenings client polish delivered (Cursor — 2026-09-08)
- Banner hidden; Ventrata-only ticket path; sandbox copy removed; not-found state; 44px chips; FAQ ARIA; post-confirm CTA cleanup; `buttonLabel` + share calendar
- **Hotfix:** `setText()` helper added to `happenings.js` — without it, detail hydration threw and RSVP/buttonLabel never applied

### What the Happenings UX audit found (Cursor — 2026-09-08)
- Structure + click-throughs ready; prototype scaffolding visible (`.hp-banner`, Ventrata sandbox copy, triple ticket path on transactional)
- Offer copy data-driven; filters work; event share F/I/X correct; chips below 44px vs search pills
- P0–P2 prioritized fix list in `.clinerules` → **In Progress / Next**

### What the Happenings polish delivered (Cursor — 2026-09-08)
- Listing image hero; chip-only filters; full homepage footer on all Happenings pages
- Global nav: News & Happenings → `happenings-listing.html`
- Visitor flow on outline + FigJam; `screens/` static import set; pushed to `master`

### What CCFB logo options delivered (Cursor — 2026-08-06)
- Standalone `ccfb-logo-options.html` (not wired into live chrome)
- Exported: `ccfb-logo-01-on-black(-transparent)-web.png`, `ccfb-logo-02-crimson-block-web.png`, `ccfb-logo-03.svg` (+ `ccfb-logo-03-figma-web.png` / updated `ccfb-logo-03-on-white-web.png` from Figma)
- Nav Options A–D; Footer Options E–H
- **Option E:** Figma desktop Footer layout example (`446:2457`) + Logo 3 partner slot above CityPASS — standalone only
- **Option H:** endorsement band is logo-only (no “Official campaign”); CityPASS proud-partner mark under FAQ in About column (same as F/G)
- Internal preview note (`<p class="note">` + `.note` CSS) removed from page header (2026-08-06)

### What the full footer delivered (Cursor/Grok — 2026-08-06)
- Full live-style footer on both `index.html` and `search.html`
- Stay In The Know + email/Subscribe; social icons; review icons (**Google Reviews → Yelp → TripAdvisor**); About nav; Address/Phone; CityPASS; Aflac Kickoff promo; copyright/legal bar
- Assets: `assets/images/footer/` (live SVGs + images, including `icon-google.svg`)
- CSS: `assets/css/search.css`; newsletter is prototype-only (no Umbraco POST)

### What the earlier footer delivered (Cline — 2026-08-06)
- Review-link pills only (Google → Yelp → TripAdvisor) — superseded by full live footer above

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
| 6 | Figma import | Localhost + `<img>` JPEGs; no CSS hero backgrounds for capture targets |

### File map

```
/
  index.html
  search.html
  ccfb-logo-options.html
  happenings.html
  happenings-listing.html
  happenings-listing-import.html   ← html.to.design listing capture
  happenings-transactional.html
  happenings-rsvp.html
  assets/css/tokens.css
  assets/css/search.css
  assets/css/home.css
  assets/css/happenings-pages.css
  assets/js/search.js
  assets/js/home.js
  assets/js/happenings.js
  assets/images/logo.png
  assets/images/happenings/        ← hero + card JPEGs (live + Pages)
  assets/images/arrow.svg
  assets/images/footer/
  assets/images/ccfb/
  data/search-index.json
  data/happenings-events.json
  screens/                         ← 01–09 import frames + generate_screens.py
  screens/img/                     ← JPEG copies for import generator
  scripts/generate_figma_import.py
  .nojekyll
  .clinerules
  cline-project-handoff.md
  AGENTS.md
  JOURNAL.md
  README.md
  FIGMA.md
```

### Tech stack
- Vanilla HTML / CSS / JS only
- No React/Next, no Search & Filter Pro, no Umbraco runtime
- Tokens: crimson `#b5202b`, white rail, `#C0C1C3`, `#888A8E`, black hours
- Fonts: Kaneda + Neusa Next (Typekit `acw8nkk`) — **not Inter**; **no gold system**


## Figma MCP

Official remote server: `https://mcp.figma.com/mcp`. Read `FIGMA.md` before implementing from a Figma URL.
