# Happenings — Client Reply Tracker (internal)
_Last updated: 2026-10-07 (opencode). Internal notes — not client-facing copy._

## Shipped this round (2026-10-07)
- Promotions category added (filter order: All · Upcoming · Free / RSVP · Ticketed · Promotions · Special Exhibits · Community)
- "Exhibitions" renamed to "Special Exhibits" (id `exhibitions` unchanged so `?category=exhibitions` links survive)
- Listing event-title legibility: weight 700, 1.25rem, tracking .035em
- "Questions?" contact card on both detail templates (`contactEmail` venue-level + per-event override)
- "Share this event" FB/IG/X now inline SVG icons; "Add to calendar" stays text
- "Unleash Exclusive Benefits" removed from the 3 Happenings pages (kept on index.html)
- Compact ≤900px ticketed reservation (9rem photo banner + tighter copy + full-width CTA)
- Date + Total removed from "You're going" (checkout popup and page card)
- Collapsible reservation box on **all** event pages (RSVP "Reserve Your Free Admission" + ticketed "Before kickoff at the Hall"), **collapsed by default**
- Collapsible **confirmation** panels (RSVP "You're on the list" + ticketed "You're going"), **open by default** after the form/checkout
- Screens regenerated (`screens/01`–`09`)

## Open questions (owner: client)
| # | Question | Our recommendation / provisional | Status |
|---|---|---|---|
| 1 | Where do free RSVPs live + notification routing? | Umbraco Forms, ESP (HubSpot/Mailchimp), or Ventrata free product — depends on their stack | BLOCKED on client |
| 2 | "Special Exhibits" vs "Limited-Time Exhibits"? | Ship "Special Exhibits"; one-line swap if changed | Confirm |
| 3 | Homepage "Unleash Exclusive Benefits" — remove or keep? | Removed on Happenings; kept on index.html | Confirm |
| 4 | "You're going" Date/Total scope | Removed from popup + page card | Confirm |
| 5 | Collapsible free-admission box — build it? | Built on **all** event pages (RSVP + ticketed), collapsed by default | DONE — confirm default (closed vs open) |
| 6 | Questions email (global vs per-event)? | Placeholder `info@cfbhall.com`; venue-level with per-event override | Confirm |
| 7 | Full per-event section control? | Make every section CMS on/off (Agenda/Rain/Accessibility already conditional) | Confirm |

## Deferred / held
- None — the collapsible reservation box now ships on all event pages (RSVP + ticketed).

## Verification
- Local `127.0.0.1:8080`; only console error is the pre-existing `favicon.ico` 404.
