# Journal — CFHF Search Prototype

## 2026-09-10 — Cursor: Local images for html.to.design

- html.to.design on `583:136` imported gray heroes — CSS backgrounds and remote Hall WebP URLs were dropped.
- Local JPEGs in `screens/img/` plus `<img>` tags for heroes, cards, and logo. Re-capture from the local server.

## 2026-09-10 — Cursor: Userflow still matches prototype

- Checked Figma `553:1219` against `happenings.html` + `screens/visitor-flow.mmd` + listing/detail JS.
- Branches still right: two visitor paths (ticketed vs RSVP), filters browse-only, template chosen at publish, related events loop back to listing.
- Left-column flowchart still reads **bottom-up** (tap card at top, listing at bottom). Nested Visitor + CMS panels on the right are the clearer diagram.

## 2026-09-10 — Cursor: html.to.design handoff (Matt importing)

- Userflow page: Figma **Wireframes 2** section [553:1219](https://www.figma.com/design/jcbtHK67Ih9BsBxFQK7F7l/College-Football---Global-Banner?node-id=553-1219).
- Created **Happenings prototype screens** section with named 01–09 desktop/mobile frames as drop targets.
- Matt will copy screens with the html.to.design plugin. MCP capture script removed from `screens/` generator.

## 2026-09-09 — Cursor: Desktop + mobile screenshots of HTML pages

- Saved full-page PNGs at 1440×900 and 390×844 in `screenshots/` for the live prototype pages (home, search, CCFB, Happenings funnel, form embed, screens index).
- Wireframes URL redirects to the outline; `screens/01`–`09` remain separate d/m HTML frames (not re-shot).

## 2026-09-08 — Cursor: Client polish pushed to Pages (`3811a42`)

- Pushed client-mode Happenings polish + image-hero-only detail pages to `master`.

## 2026-09-08 — Cursor: Image hero only (no text fallback)

- Removed `.hp-hero--text` sections and `data-hero` toggle from transactional + RSVP standalones.
- CMS outline updated: image hero height (short / medium / tall) via `data-hero-h` only.
- Regenerated Figma import screens (`screens/generate_screens.py`) with photo backgrounds on listing + detail frames.

## 2026-09-08 — Cursor: Happenings client polish (P0–P2)

- **P0:** Hidden `.hp-banner` (CSS; `?dev=1` restores); Ventrata-only ticket path on transactional; stripped sandbox/placeholder copy; text-hero h1→h2 on detail pages.
- **P1:** Listing chips min-height 44px + horizontal scroll; `?event=bad-slug` not-found state; FAQ `aria-expanded`; `data-converted` hides sticky/hero/offer after RSVP/ticket confirm.
- **P2:** Optional `buttonLabel` in JSON + hydration; Add to calendar in share sidebar; client-ready listing empty-state copy.
- Files: `happenings-pages.css`, `happenings.js`, transactional/rsvp/listing HTML, `happenings-events.json`. Not committed/pushed yet.

## 2026-09-08 — Cursor: Full Happenings UX audit + agent sync

- Audited live Pages funnel (listing, transactional, RSVP, outline): IA, filters, conversion paths, a11y, chrome parity, Nebo r2 alignment.
- **Verdict:** structurally ready for Sep 11; needs **client-mode polish** before Nebo review (hide `.hp-banner`, single ticket path, remove sandbox/internal copy, duplicate `<h1>`).
- Verified Nebo checklist: offer copy above CTA (data-driven); six filter slugs + edge cases; event share F/I/X vs footer five networks.
- Deploy confirmed: `master` @ `6ba0932`, Happenings URLs 200. Next: P0 polish sprint or html.to.design import (scope TBD).

## 2026-09-08 — Cursor: Commit + push Happenings to master

- Merged `cursor/happenings-designed-pages-click-throughs` → `master` and pushed for GitHub Pages.
- Includes outline, listing hero, chip filters, full footer, nav links, screens/, FigJam flow notes, retired wireframe board.

## 2026-09-08 — Cursor: Happenings pages use homepage footer

- Listing, transactional, and RSVP now include Join the Legacy band + full site footer (social, reviews, About, CityPASS, Aflac, legal) matching `index.html`.
- Source of truth: `partials/site-footer-legacy.html`; `home.css` linked for legacy styles.

## 2026-09-08 — Cursor: Global News & Happenings nav → listing

- `index.html` + `search.html` rail link and home “View All” now point to `happenings-listing.html` (Happenings pages already did).

## 2026-09-08 — Cursor: Listing image hero + chips only

- `happenings-listing.html`: full-bleed hero (Hall / Happenings stroke title) above filter chips; removed duplicate text nav earlier.
- Regenerated `screens/01` and `02` with matching hero for Figma import.

## 2026-09-08 — Cursor: Listing filters — chips only

- Removed duplicate `.hp-cats` text nav from `happenings-listing.html`; single chip row remains.

## 2026-09-08 — Cursor: Visitor flow reflects filters + CMS decisions

- Updated [`happenings.html`](happenings.html): visitor flow, 6 listing filters table, editor/CMS decisions.
- [`screens/visitor-flow.mmd`](screens/visitor-flow.mmd) + FigJam regen on existing board (visitor + CMS subgraphs).
- [`screens/index.html`](screens/index.html): filter/prototype notes (Exhibitions/Community can mix paths).

## 2026-09-08 — Cursor: Clarify “Tap an event card” = listing action

- Not a separate screen; prototype links from `01`/`02` listing frames to ticketed or RSVP detail in Figma. Note added to `screens/index.html`.

## 2026-09-08 — Cursor: Happenings outline, Figma screens, board retired

- Client agenda is `happenings.html` (listing, ticketed, RSVP). No toggle board.
- Module bars removed from designed detail pages; default layout is baked in.
- `happenings-wireframes.html` redirects to the outline.
- Static html.to.design screens: `screens/01`–`09` desktop + mobile, plus `screens/index.html`.
- Visitor flowchart remains in FigJam: https://www.figma.com/board/YOXkU2QjDrRMFnO0CBgoF8

## 2026-09-08 — Cursor: Real Happenings content, widgets, and user paths

- Event JSON now includes venue, body copy, agendas, FAQs, ticket SKUs/dates, and calendar times.
- **RSVP:** native form (and embed iframe) → confirmation + ICS + related events. Verified Film Night RSVP as Jordan Ellis.
- **Tickets:** Ventrata Checkout v3 snippet remains; date/qty/member picker completes a prototype purchase when sandbox keys are placeholders.
- **Sidebar:** Google Maps embed, Facebook page/events plugin, real share URLs. Board desktop frames got the same working forms.

## 2026-09-08 — Cursor: Wireframe board shows designed Happenings flows

- Updated `happenings-wireframes.html` (+ `wireframes.css` / `wireframes.js`) so the low-fi board matches the requested standalone work: two-line hero, offer/price + Ventrata Checkout v3, sticky event name, RSVP confirmation module, related-event cards, listing filters and `?event=` card links, eight cards on mobile.

## 2026-09-08 — Cursor: Happenings-only focus

- Matt: concentrate only on Happenings. Search prototype and CCFB logo options are parked.
- Active work: listing / transactional / RSVP standalones + wireframe board; click-throughs already in `happenings.js` + `happenings-events.json`.

## 2026-09-03 — Cursor: Happenings click-through flows

- Added shared event index (`data/happenings-events.json`) and `assets/js/happenings.js`.
- **Listing:** category nav + chips filter cards (URL `?category=`), empty state, every card links to transactional or RSVP detail with `?event=`.
- **Detail:** hero/offer/sticky copy hydrates per event; wrong template redirects; related events link to other details.
- **RSVP:** form submit hides form and shows confirmation panel + toast.
- **Transactional:** Get Tickets scrolls to Ventrata block when sandbox keys are still placeholders.

## 2026-09-03 — Cursor: Happenings visual polish pass

- Elevated standalone pages from functional comps to Hall-branded design: home-style hero (stroke Kaneda line + gradient), offer/checkout split panel, sticky conversion bar, sticky sidebar cards, FAQ accordion styling, event card hover/zoom, listing category nav + chips.
- Collapsible module `<details>` keeps review toggles available without dominating the page.

## 2026-09-03 — Cursor: Ventrata Checkout v3 on transactional page

- Replaced the fake widget with the official Checkout snippet: `ventrata-checkout` button + `cdn.checkout.ventrata.com/v3/production/ventrata-checkout.min.js` (`env: test`).
- Hero / offer / sticky Get Tickets and the widget Book Now share the same product config. Keys are still placeholders (`<PRODUCT_ID>`, `<YOUR_SANDBOX_API_KEY>`).

## 2026-09-03 — Cursor: hero CTAs hug content on desktop

- Rail `.btn` is `width: 100%` (Tickets block). Hero actions inherited that and spanned the full image. Desktop now uses auto-width; ≤900px they still stack full-width.

## 2026-09-03 — Cursor: designed standalone Happenings pages

- Promoted the three standalone wires to designed pages that reuse the live left rail (logo, Tickets / Donate / Membership, primary nav), hours-bar search, mobile hamburger topbar, and site footer from the search prototype.
- New stylesheet `assets/css/happenings-pages.css`. Module toggles remain for Nebo r2 reflow. Board (`happenings-wireframes.html`) stays schematic.
- Local 8080: transactional / rsvp / listing + new CSS **200**.

## 2026-09-03 — Cursor: Nebo r2 Happenings template updates

- Applied consolidated Nebo feedback to the wireframe board and all three standalone pages.
- **Hero:** full-width image header (adjustable short/medium/tall) with supporting CTAs; text-only hero remains a toggle. Date/event label is free-text (e.g. “Every Saturday in October”).
- **Transactional:** brief offer copy above Get Tickets; Ventrata optional and placed directly below; space reflows when the widget is off. Add to Calendar optional (off by default).
- **RSVP:** field count/labels/button text called out as CMS-configurable; Save My Spot sits at the bottom of the form and submits it (hero/sticky CTAs scroll to the same form). Form embed and Facebook Event are mutually exclusive alternatives — not a second form beside the native one.
- **Social / sidebar:** Facebook Event lives in Location / Share; share set is Facebook, Instagram, X (alpha, configurable, no Pinterest). Toggling the sidebar off collapses desktop content to one column.
- **FAQ:** accordion. **Listing:** heading category nav matches chip order (All · Upcoming · Free / RSVP · Ticketed · Exhibitions · Community); copy confirms Umbraco-managed categories.
- Module toolbar on board + standalone pages demonstrates reflow. Local 8080: all Happenings pages + CSS/JS **200**.

## 2026-08-26 — Cline: Listing card category tags + mobile chip parity fix

- **Fix 1 — listing cards now show category tags:** every `wf-listing__card` on the board (`happenings-wireframes.html`, desktop + mobile listing frames, 14 cards) and the standalone page (`happenings-listing.html`, 8 cards) got a compact pill tag matching its event type (Ticketed solid crimson; Free · RSVP / Exhibitions / Community outline). New `.wf-tag--xs` modifier in `assets/css/wireframes.css`. This closes the gap where the board's own spec text claimed "small category tag" but cards rendered without one.
- **Fix 2 — chip parity:** mobile listing chips row on the board was missing "Community" (5 chips vs. desktop's 6); added it so both rows match (All · Upcoming · Free / RSVP · Ticketed · Exhibitions · Community).
- Verified via local server (all pages + CSS 200). Tag mapping: Football Fest & Free Day → Free·RSVP, Gameday Kickoff Party → Ticketed, Ascension → Exhibitions, Community Film Night → Community, Legendary Saturday → Ticketed, Kids Game Day → Community, Hall of Fame Talks → Exhibitions, Members Appreciation → Free·RSVP.
- Also verified standalone wireframe pages DO carry full chrome (rail/topbar/hours/footer present in markup) — earlier report of missing chrome was a false alarm (likely file:// load).

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
