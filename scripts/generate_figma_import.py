#!/usr/bin/env python3
"""Generate localhost-only Happenings pages for html.to.design (absolute image URLs)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "http://127.0.0.1:8080"
IMG = {
    "listing": f"{BASE}/assets/images/happenings/hero-listing.jpg",
    "ticketed": f"{BASE}/assets/images/happenings/hero-ticketed.jpg",
    "exhibit": f"{BASE}/assets/images/happenings/hero-exhibit.jpg",
}

LISTING_CARDS = [
    (IMG["listing"], "Football Fest and Free Day"),
    (IMG["ticketed"], "Gameday Kickoff Party"),
    (IMG["exhibit"], "Ascension exhibition"),
    (IMG["listing"], "Community Film Night"),
    (IMG["ticketed"], "Legendary Saturday"),
    (IMG["exhibit"], "Kids Game Day"),
    (IMG["listing"], "Hall of Fame Talks"),
    (IMG["ticketed"], "Members Appreciation"),
]


def card_grid():
    bits = ['<div class="hp-listing__grid">']
    for src, alt in LISTING_CARDS:
        bits.append(
            f'<a class="hp-card-event" href="#">'
            f'<div class="hp-card-event__media">'
            f'<img src="{src}" alt="{alt}" width="320" height="200">'
            f"</div>"
            f'<div class="hp-card-event__body"><span class="hp-card-event__title">{alt}</span></div>'
            f"</a>"
        )
    bits.append("</div>")
    return "".join(bits)


def listing_import():
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Happenings listing · Figma import only</title>
  <link rel="stylesheet" href="{BASE}/assets/css/tokens.css">
  <link rel="stylesheet" href="{BASE}/assets/css/search.css">
  <link rel="stylesheet" href="{BASE}/assets/css/happenings-pages.css">
  <style>
    .hp-import-note {{ background:#fff3cd; padding:12px 16px; font:14px system-ui,sans-serif; border-bottom:1px solid #e6c200; }}
  </style>
</head>
<body class="hp-page" data-hp-page="listing">
  <p class="hp-import-note"><strong>Figma import only.</strong> Serve repo at {BASE} and capture this URL in html.to.design. Full chrome flow: <a href="{BASE}/screens/index.html">screens/</a>.</p>
  <section class="hp-hero hp-hero--image hp-hero--listing">
    <img class="hp-hero__photo" src="{IMG['listing']}" alt="Hall Happenings hero" width="1112" height="416">
    <div class="hp-hero__shade" aria-hidden="true"></div>
    <div class="hp-hero__inner">
      <p class="hp-crumb">News &amp; Happenings</p>
      <h1 class="hp-hero__title">
        <span class="hp-hero__title-line hp-hero__title-line--stroke">Hall</span>
        <span class="hp-hero__title-line">Happenings</span>
      </h1>
      <p class="hp-hero__subtitle">Programs, exhibitions, and events at the College Football Hall of Fame.</p>
    </div>
  </section>
  <main class="hp-wrap hp-wrap--listing">
    {card_grid()}
  </main>
</body>
</html>
"""


def main():
    out = ROOT / "happenings-listing-import.html"
    out.write_text(listing_import(), encoding="utf-8")
    print("wrote", out.name)


if __name__ == "__main__":
    main()
