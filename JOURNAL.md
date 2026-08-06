# Journal — CFHF Search Prototype

## 2026-08-06 — Cursor: CCFB logo options committed + pushed live

- Committed + pushed standalone `ccfb-logo-options.html` + `assets/images/ccfb/` web PNGs to `origin/master`
- **Live:** https://mattybotstew.github.io/cfhf-search-prototype/ccfb-logo-options.html
- Continuity files updated for push (AGENTS / .clinerules / JOURNAL)

## 2026-08-06 — Cursor: CCFB logo placement options (standalone client review)

- Extracted approved logo variants from `CCFB_logo_041426A.ai` (PDF sheet, 4 labeled marks) → PNGs in `assets/images/ccfb/`
- **Used:** Logo 1 (on black), Logo 2 (crimson block), Logo 3 (on white). **Skipped:** Logo #4 (Black ATL outline)
- Built standalone `ccfb-logo-options.html` — rail/footer stubs, not wired into live site JS
- **Nav:** A under Hall logo · B below CTAs · C rail foot · D mobile strip under topbar
- **Footer:** E near About/CityPASS · F legal bar · G Stay In The Know column · H band above footer
- Footer review order Google → Yelp → TripAdvisor left alone on index/search
- Removed leftover `_source.ai.pdf` / sheet preview junk under `assets/images/ccfb/`
- **Next:** client picks options; optional wire-in later

## 2026-08-06 — Cline: fixed stuck GitHub Pages deploy — footer now LIVE

- **Problem:** Matt didn't see the new footer on Pages. Root cause was NOT the code — footer commit `06c8673` was correctly on `origin/master`, but GitHub Pages had **silently stopped building this repo on 2026-07-17** (last deployment sha `68f871e`). Live site kept serving the Jul 17 build (footer markers = 0, `last-modified` Jul 17).
- **Ruled out:** browser/CDN cache (query-string busts, `no-cache` headers), wrong branch (remote `master` = `b9e4ffa`), account-wide outage (sibling repos `gerotech-prototype` + `Homepagev2` deployed Aug 4–5).
- **Tried:** empty trigger commit `b9e4ffa` ("Trigger GitHub Pages rebuild") — did **not** queue a build (repo-level deploy was disabled/stuck).
- **Fix (part 1):** Matt toggled **Settings → Pages → Source** off then back on (`master` / root). This re-queued the build → new deployment for sha `b9e4ffa`.
- **Build then FAILED:** the "Deploy to GitHub Pages" Actions step ran the full ~10 min then `failure` (11:43→11:53Z) — a transient deploy-step timeout/cancel, **not** a code error ("Set up job" succeeded; static HTML can't fail a build). Job log requires admin auth to read (Cline had none).
- **Fix (part 2 — RESOLVED):** pushed a re-trigger empty commit `6628a013` ("Re-trigger Pages deploy after transient build failure") → deployment `6628a013` **success @ 12:18:10Z**. Verified live: `last-modified` flipped to Aug 6; full footer (Stay In The Know, `.site-footer__review-icons`, CityPASS, Aflac promo) on **both** home + `search.html`; all footer assets return 200; Google Reviews link present; `search.css` has footer styles.
- **Lesson:** if Pages stops deploying a repo with no failed build, toggle Settings → Pages source off/on. If the re-queued build then fails on a transient deploy-step timeout, re-push to re-trigger. `gh` CLI was unauthenticated this session; used public REST API for deployments instead.

## 2026-08-06 — Cursor: Google Reviews first in footer

- Added Google Reviews as first review icon (before Yelp + TripAdvisor) on `index.html` + `search.html`
- Order: **Google Reviews → Yelp → TripAdvisor**
- Asset: `assets/images/footer/icon-google.svg`; CSS `.site-footer__social-link--google` in `assets/css/search.css`

## 2026-08-06 — Cursor/Grok: full live-matching site footer

- Replaced review-pills-only footer with full cfbhall.com footer on `index.html` + `search.html`
- Layout: Stay In The Know + email/Subscribe · Facebook/Instagram/X/YouTube/TikTok/LinkedIn · Yelp + TripAdvisor review icons · About links · Address/Phone · Atlanta CityPASS · Aflac Kickoff 300×300 promo · copyright + Privacy/Terms bar
- Assets downloaded from live site into `assets/images/footer/`
- Shared CSS in `assets/css/search.css`; newsletter form is client-side prototype only (no Umbraco API)
- Matches live structure (reviews = Yelp + TripAdvisor icons, not Google pills)
- **Next:** commit/push when Matt asks so Pages updates; then client feedback / Figma

## 2026-08-06 — Cline: site footer with review links

- Added `.site-footer` to both `index.html` and `search.html`
- Review links ordered: **Google Reviews → Yelp → TripAdvisor** (Google Reviews first, per Matt's request)
- Black background matching live site dark strips; pill-style links with white border + crimson hover
- SVG icons for Google, Yelp, TripAdvisor; responsive (stacked full-width on mobile)
- CSS in `assets/css/search.css` (shared across both pages)
- Files: `index.html`, `search.html`, `assets/css/search.css`
- Note: superseded the same day by full live footer above

## 2026-07-17 — Cursor: close client review gaps

- Live Pages QA confirmed: HOF silhouette + Inducted year + shield badge; sticky filters; mobile pills (44px, scroll, counts); dynamic category counts
- Clarified in README: empty `image` fields are intentional — placeholders render in JS
- Residual CSS: larger HOF portrait, stronger team badge + filter count treatment
- No code path change needed for sticky/pills/counts (already shipped in `3dc4dd7`)
- **Next:** client share / feedback; optional real CMS portrait URLs later

## 2026-07-17 — Grok: update all agent continuity files
- Refreshed `AGENTS.md`, `.clinerules`, `cline-project-handoff.md`, this journal
- Status: Steps 1–8 complete; client-ready on GitHub Pages
- Locked decisions + live URLs + file map synced across all agent docs
- Next for agents: client feedback / design polish only (no missing build steps)

## 2026-07-17 — Grok: review gaps — HOF visuals + filter polish
- HOF portrait placeholders: team-tinted silhouette + initials (cards + typeahead)
- Team badge: shield mark + school name with brand colors (OSU/UF/ND/OKST)
- HOF cards: portrait, “Inducted YYYY”, team badge all visible
- Sticky filter aside: top clears hours bar; max-height scroll
- Mobile pills: ≥44px tap, horizontal scroll + snap; counts remain dynamic
- Files: `assets/js/search.js`, `assets/css/search.css`

## 2026-07-17 — Grok: GitHub Pages enabled
- Source: `master` / root; added `.nojekyll` (Jekyll builds were failing)
- Live: https://mattybotstew.github.io/cfhf-search-prototype/ (home + search 200)

## 2026-07-17 — Grok: typeahead z-index above mobile topbar
- Hours bar / search-suggest raised (z 100–130); mobile topbar lowered (z 40)
- Predictive dropdown no longer sits under logo/TICKETS bar

## 2026-07-17 — Grok: mobile hero layout (live match)
- Hero mobile: content lower stack, full-width outlined CTA, bottom gradient for readability
- Carousel controls: prev left · dots center · next right (full width)
- CityPASS body copy aligned to live screenshot

## 2026-07-17 — Grok: live-style mobile top bar
- Mobile nav matches live screenshot: white bar with hamburger · centered logo · outlined TICKETS
- Replaced floating crimson FAB; hamburger opens slide-out rail + dim backdrop
- Both `index.html` + `search.html`; desktop left rail unchanged

## 2026-07-17 — Grok: more space under search hours bar
- Search page content: `padding-top` gap after hours bar → `--space-12` (desktop), `--space-10` (mobile)

## 2026-07-17 — Grok: solid black hours bar on search page
- `search.html`: `.hours-bar--solid` → 100% black (`#000`) hours header
- Home keeps translucent hours bar over hero

## 2026-07-17 — Grok: Steps 4–8 complete (results funnel ready for design)
- Wired full results page to `data/search-index.json` (same match engine as typeahead)
- Hero: live `?q=`, real counts, browse-all when no query; document title updates
- Filters: desktop aside + mobile pills with live category counts; `?category=` sync
- Cards: HOF + standard; empty state; typeahead “Search all…” row
- Mobile hours-bar + a11y baseline
- Files: `search.html`, `assets/js/search.js`, `assets/css/search.css`, `README.md`

## 2026-07-17 — Cursor: deliver locked hours-bar search (chrome + typeahead)
- Matt: keep current hours-bar chrome + typeahead (not icon-only Option A)
- Hardened: pointer-events on input; expand on hover/focus; dropdown z-index over hero
- Verified: “tebow” → HOF; “ticket” → general suggestions

## 2026-07-17 — Cursor: Matt locks hours-bar search chrome
- Locked: always-visible input + crimson square + focus expand-left + HOF/general predictive dropdown
- Do **not** revert to icon-only Option A

## 2026-07-17 — Cline: search moved to hours bar (final placement)
- Search relocated into `#hours-bar` alongside "Important Details +"
- Both pages share hours-bar search markup; rail remains logo/CTAs/nav only

## 2026-07-17 — Cursor: match index to live first 3 sections
- Hero carousel, Destination + Happenings, Join the Legacy
- Files: `index.html`, `assets/css/home.css`, `assets/js/home.js`

## 2026-07-17 — Cursor: Step 3 predictive dropdown
- Live typeahead from `data/search-index.json`; HOF vs general rows; keyboard a11y

## 2026-07-17 — Cline: Step 2 complete (inline expand search)
- Interactive `.search-bar`; submit → `search.html?q=`

## 2026-07-17 — Cursor: Step 1 complete (tokens + base shell)
- Tokens, left-rail shell, search scaffold, 18-doc mock index, Typekit

## 2026-07-17 — Cursor → Cline: plan sync + decisions locked
- Planning complete; brand corrected (no navy top header / no gold system)

## 2026-07-17 — Cursor: live site audit (cfbhall.com)
- No public search today; left-rail chrome; crimson `#b5202b`

## 2026-07-17 — Cursor: repo + Cline handoff
- Created private repo; scope = search UX prototype only
