# Journal — CFHF Search Prototype

## 2026-08-17 — Cline: Donate + Membership side by side in wireframe rail

- Live site (`cfbhall.com`) shows Donate + Membership side by side under the full-width Tickets button in the left rail
- Real prototype rail (`index.html`/`search.html`) already does this (`.rail-ctas__secondary { width: 47% }`) — verified side by side
- Wireframe rail (`wireframes.css .wf-rail`) was stacked (column flex); changed to a 2-col grid so Tickets stays full-width (grid-column 1/-1) and the two outline buttons share a row
- Verified via headless probe: Donate L=20 R=132 / Membership L=148 R=259 (same T) on the standalone transactional page
- Applies to board + all standalone pages (shared `.wf-rail`); temp probe files removed
- Not yet committed/pushed

## 2026-08-17 — Cline: fix horizontal overflow on wireframe pages

- Symptom: "content pushing out of the frame" on the standalone wireframe pages (and board)
- Root cause: `tokens.css` + wireframe CSS never set `box-sizing: border-box`; the fixed-width left rail (280 content + padding + border = 322px) overflowed the viewport, pushing the whole layout right (doc scrollW 1536 > clientW 1440)
- Fix: added global `box-sizing: border-box` reset at top of `assets/css/wireframes.css` (applies to board + all standalone pages)
- Verified with headless Chromium probe (ms-playwright headless shell) at 1440 & 390:
  - transactional / rsvp / listing / board → `doc scrollW == clientW`, overflowX = no
  - Only flagged element was the intentionally off-screen `.skip-link`
- Temp probe files removed; committed fix

## 2026-08-17 — Cline: responsive standalone wireframe pages

- Added `assets/css/wireframe-pages.css` + three fully responsive standalone pages mirroring the board's wireframes:
  - `happenings-transactional.html` (Full-Service / Ticketed)
  - `happenings-rsvp.html` (Lead Gen & RSVP)
  - `happenings-listing.html` (dense listing)
- Each is a real responsive page (no manual toggle): sticky desktop left rail collapses to the mobile topbar at ≤900px; content/sidebar, above-the-fold conversion, related-carousel, and listing grids reflow at breakpoints (carousel 3→2→1 col, listing 4→2 col, footer 4→2 col)
- Thin "Wireframe" banner on each page + "← Back to wireframe board" link; board header now links to the three standalone pages
- Verified: divs/sections balanced on all pages; local serve 8096 → all pages + new CSS 200
- Continuity files updated; not yet committed/pushed

## 2026-08-17 — Cline: Happenings wireframe board (Nebo × CFHF Page Wishlist)

- New standalone `happenings-wireframes.html` + `assets/css/wireframes.css` + `assets/js/wireframes.js` — client-shareable low-fi wireframes, desktop + mobile per template, reusing `tokens.css` brand chrome
- **01 Full-Service / Transactional** (ticketed): above-the-fold Get Tickets + single Ventrata widget embed, optional sticky CTA, full-width-vs-sidebar toggle, optional Facebook Event embed, compact "More Upcoming Events" carousel (replaces larger related-events block)
- **02 Lead Gen & RSVP** (non-ticketed): above-the-fold RSVP + name/email/attendees fields + newsletter capture, optional sticky CTA, full-width/sidebar toggle, optional FB embed, compact carousel
- **03 Happenings listing**: denser compact cards (image, date, title, tag), filter chips, no sidebar; desktop 4-col / mobile 2-col
- Segmented Desktop/Mobile toggle per wireframe (`wireframes.js`); all situational blocks labeled `Optional · Toggle`
- Fixed nested-section bug during build (sections 1–3 are now siblings; divs balanced 270/270)
- Verified local: page + css + js + tokens all **200** on `python3 -m http.server 8090`
- Continuity files updated (.clinerules / JOURNAL / AGENTS); not yet committed/pushed

## 2026-08-06 — Cursor: Option H — CityPASS back under FAQ

- `#option-h` on `ccfb-logo-options.html`: restored `.footer-stub__partner` with `assets/images/footer/citypass.png` immediately after About nav (under FAQs) — same proud-partner stub as Options F/G
- Standalone page only; committed + pushed to `origin/master`

## 2026-08-06 — Cursor: Option H band — drop “Official campaign”

- `#option-h` on `ccfb-logo-options.html`: removed `<p>Official campaign</p>` from `.footer-band` (logo-only strip)
- Removed unused `.footer-band p` CSS
- Standalone page only; not committed/pushed

## 2026-08-06 — Cursor: Option E mirrors Figma Footer + Logo 3 from Figma

- **Figma:** `jcbtHK67Ih9BsBxFQK7F7l` — logo `449:2992` (Layer_1); desktop Footer example `446:2457` on same Footer page (logo sits beside footer comps, not inside the frame)
- **Assets:** exported SVG + 3× PNG → `assets/images/ccfb/ccfb-logo-03.svg`, `ccfb-logo-03-figma-web.png`; replaced `ccfb-logo-03-on-white-web.png`
- **Option E** (`#option-e` on `ccfb-logo-options.html` only): restyled to Figma column rhythm — Stay In The Know + outlined Subscribe + social row + review strip · About (full link list) | Address/Phone · light Logo 3 panel above CityPASS · Aflac promo · legal bar with full copyright
- Logo 3 variant card + nav Options A/C/D now use `ccfb-logo-03.svg`
- **Not touched:** `index.html` / `search.html` live footer
- **Preview:** http://127.0.0.1:8080/ccfb-logo-options.html#option-e (not committed/pushed)

## 2026-08-06 — Cursor: unstuck Pages — CCFB options page LIVE (200)

- **Symptom:** `/ccfb-logo-options.html` returned **404**; homepage **200** (`last-modified` still 12:18Z footer deploy). File was on `master` (`0d58776` / `6fad3bf`).
- **Cause:** `pages build and deployment` for `6fad3bf` stuck in **queued**; prior CCFB run cancelled.
- **Tried:** public Actions API (no Pages API without auth); `gh` not logged in — skipped cancel/rebuild API.
- **Fix:** empty commit `a4c5a77` ("Re-trigger Pages deploy — CCFB options page stuck in queued build") + push → run success ~20:42Z → live URL **HTTP 200**.
- **No** Settings → Pages toggle required this round.

## 2026-08-06 — Cursor: remove internal preview note from CCFB logo options

- Removed `<p class="note">` under `main.page > header.page-header` (placement-comparison / `python3 -m http.server` callout)
- Removed unused `.note` CSS
- New commit + push to `origin/master` (did not amend prior CCFB push)

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
