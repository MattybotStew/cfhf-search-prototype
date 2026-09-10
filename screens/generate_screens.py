#!/usr/bin/env python3
"""Generate static Figma-import screens for the Happenings visitor flow."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
# Absolute localhost URLs — html.to.design often drops relative img src
BASE = "http://127.0.0.1:8080/screens"
LOGO = f"{BASE}/img/logo.png"
CSS = "figma-screens.css"
IMG_LISTING = f"{BASE}/img/hero-listing.jpg"
IMG_TICKETED = f"{BASE}/img/hero-ticketed.jpg"
IMG_RSVP = IMG_LISTING
IMG_EXHIBIT = f"{BASE}/img/hero-exhibit.jpg"
CARD_IMGS = (IMG_LISTING, IMG_TICKETED, IMG_EXHIBIT)

CARDS_ALL = [
    ("Aug 22", "Football Fest & Free Day", "Free · RSVP", True),
    ("Saturdays in Oct", "Gameday Kickoff Party", "Ticketed", False),
    ("Sep 05", "Ascension: Rise of the QB", "Exhibitions", True),
    ("Sep 11", "Community Film Night", "Community", True),
    ("Sep 19", "Legendary Saturday", "Ticketed", False),
    ("Sep 26", "Kids Game Day", "Community", True),
    ("Oct 03", "Hall of Fame Talks", "Exhibitions", True),
    ("Oct 10", "Members Appreciation", "Free · RSVP", True),
]
CARDS_TICKETED = [c for c in CARDS_ALL if c[2] == "Ticketed"]

CHIPS = ["All", "Upcoming", "Free / RSVP", "Ticketed", "Exhibitions", "Community"]


def rail():
    return f"""<aside class="rail">
      <img src="{LOGO}" alt="College Football Hall of Fame">
      <div class="tix">Tickets</div>
      <div class="row"><span>Donate</span><span>Membership</span></div>
      <nav>Hall of Fame<br>Experience<br>Visit<br><strong>News &amp; Happenings</strong><br>Venue Rental<br>CityPASS®</nav>
    </aside>"""


def hours():
    return '<div class="hours"><span>Open Today · 10AM–5PM</span><span>Search</span></div>'


def topbar():
    return f"""<div class="topbar"><span>☰</span><img src="{LOGO}" alt=""><span>Tickets</span></div>"""


def chips(active):
    bits = []
    for c in CHIPS:
        on = " is-on" if c == active else ""
        bits.append(f'<span class="chip{on}">{c}</span>')
    return '<div class="chips">' + "".join(bits) + "</div>"


def cards(items):
    html = ['<div class="grid">']
    for i, (date, title, tag, outline) in enumerate(items):
        tc = " tag--out" if outline else ""
        src = CARD_IMGS[i % len(CARD_IMGS)]
        html.append(
            f'<div class="card"><div class="ph"><img src="{src}" alt="" width="320" height="110"></div><div class="body">'
            f'<div class="date">{date}</div><div class="title">{title}</div>'
            f'<span class="tag{tc}">{tag}</span></div></div>'
        )
    html.append("</div>")
    return "".join(html)


def photo_hero(src, body, listing=False):
    cls = "listing-hero" if listing else "hero"
    return (
        f'<div class="{cls}">'
        f'<img class="hero-photo" src="{src}" alt="" width="1112" height="416">'
        f'<div class="hero-shade"></div>'
        f'<div class="hero-copy">{body}</div>'
        f"</div>"
    )


def wrap(slug, title, inner, mobile=False):
    kind = "m" if mobile else "d"
    vp = "390" if mobile else "1440"
    chrome = (topbar() if mobile else rail() + hours())
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{title} · {vp}px · Happenings Figma screen</title>
  <link rel="stylesheet" href="https://use.typekit.net/acw8nkk.css">
  <link rel="stylesheet" href="{CSS}">
</head>
<body>
  <div class="canvas canvas--{kind}">
    <p class="screen-label" style="padding:8px 16px 0">{slug} · {vp}px · html.to.design</p>
    <div class="shell">
      {chrome}
      <div class="main">{inner}</div>
    </div>
  </div>
</body>
</html>
"""


def write(name, html):
    (ROOT / name).write_text(html, encoding="utf-8")
    print("wrote", name)


def listing_hero():
    return photo_hero(
        IMG_LISTING,
        """<p class="crumb" style="color:#ccc">News &amp; Happenings</p>
      <h1><span class="stroke">Hall</span><br>Happenings</h1>
      <p>Programs, exhibitions, and events at the Hall.</p>""",
        listing=True,
    )


def listing(filter_on=False, mobile=False):
    active = "Ticketed" if filter_on else "All"
    items = CARDS_TICKETED if filter_on else CARDS_ALL
    inner = f"""{listing_hero()}
    <div class="pad" style="padding-top:24px">
      {chips(active)}
      {cards(items)}
    </div>"""
    slug = "02-listing-filter" if filter_on else "01-listing"
    title = "Filter by category" if filter_on else "Happenings listing"
    write(f"{slug}-{'m' if mobile else 'd'}.html", wrap(slug, title, inner, mobile))


def ticketed(mobile=False):
    inner = photo_hero(
        IMG_TICKETED,
        """<p class="crumb" style="color:#ccc">Happenings / Gameday Kickoff Party</p>
      <h1>Gameday<br>Kickoff Party</h1>
      <p>Every Saturday in October · 10AM–5PM</p>
      <span class="tag">Ticketed</span>
      <p style="margin-top:16px"><span class="btn">Get Tickets</span></p>""",
    ) + """
    <div class="split">
      <div>
        <h2>Before kickoff at the Hall</h2>
        <div class="price">From $12</div>
        <p>Join us for food, music, and full Hall access. Members save $4.</p>
        <span class="btn">Get Tickets</span>
      </div>
      <div class="panel">
        <p class="crumb">Ventrata Checkout</p>
        <h2>Select tickets</h2>
        <p>Official checkout widget (static for Figma).</p>
        <span class="btn">Book Now</span>
      </div>
    </div>"""
    write(f"03-ticketed-{'m' if mobile else 'd'}.html", wrap("03-ticketed", "Get Tickets", inner, mobile))


def checkout(mobile=False):
    inner = """<div class="pad">
      <p class="crumb">Gameday Kickoff Party</p>
      <h1>Choose date and quantity</h1>
      <div class="panel" style="max-width:420px">
        <label>Date</label>
        <div class="field">Sat, Oct 10</div>
        <label>Quantity</label>
        <div class="field">2</div>
        <label>Member price</label>
        <div class="field">On · $8 each</div>
        <div class="price">Total $16</div>
        <span class="btn">Complete purchase</span>
      </div>
    </div>"""
    write(f"04-checkout-{'m' if mobile else 'd'}.html", wrap("04-checkout", "Checkout", inner, mobile))


def tix_confirm(mobile=False):
    inner = f"""<div class="confirm">
      <p class="crumb">Confirmation</p>
      <h1>You are going</h1>
      <p><strong>2</strong> tickets for <strong>Gameday Kickoff Party</strong> on <strong>Sat, Oct 10</strong> — <strong>$16</strong>.</p>
      <p style="margin-top:16px"><span class="btn">Browse more events</span> <span class="btn btn--out">Add to calendar</span></p>
    </div>
    <div class="pad"><h2>More upcoming events</h2></div>
    <div class="related">
      <div class="card"><div class="ph"><img src="{IMG_LISTING}" alt="" width="320" height="110"></div><div class="body"><div class="title">Football Fest</div></div></div>
      <div class="card"><div class="ph"><img src="{IMG_EXHIBIT}" alt="" width="320" height="110"></div><div class="body"><div class="title">Film Night</div></div></div>
      <div class="card"><div class="ph"><img src="{IMG_TICKETED}" alt="" width="320" height="110"></div><div class="body"><div class="title">Legendary Saturday</div></div></div>
    </div>"""
    write(f"05-ticket-confirm-{'m' if mobile else 'd'}.html", wrap("05-ticket-confirm", "Purchase confirmation", inner, mobile))


def rsvp(filled=False, mobile=False):
    n, e = ("Jordan Ellis", "jordan@example.com") if filled else ("", "")
    inner = photo_hero(
        IMG_RSVP,
        """<p class="crumb" style="color:#ccc">Happenings / Community Film Night</p>
      <h1>Community<br>Film Night</h1>
      <p>Friday, September 11 · 6–9PM</p>
      <span class="tag tag--out">Free · RSVP</span>
      <p style="margin-top:16px"><span class="btn">Save My Spot</span></p>""",
    ) + f"""
    <div class="split">
      <div class="panel">
        <h2>Reserve your seat</h2>
        <label>Full name</label>
        <div class="field">{n}</div>
        <label>Email</label>
        <div class="field">{e}</div>
        <label># Attending</label>
        <div class="field">2</div>
        <p style="margin-top:16px"><span class="btn">Save My Spot</span></p>
      </div>
      <div>
        <h2>About the program</h2>
        <p>Free community screening in the Hall theater, then a short panel talk.</p>
      </div>
    </div>"""
    slug = "07-rsvp-form" if filled else "06-rsvp"
    title = "Name, email, attending" if filled else "Save My Spot"
    write(f"{slug}-{'m' if mobile else 'd'}.html", wrap(slug, title, inner, mobile))


def rsvp_confirm(mobile=False):
    inner = """<div class="confirm">
      <p class="crumb">Confirmation</p>
      <h1>You are on the list</h1>
      <p>Thanks, <strong>Jordan Ellis</strong> — RSVP for <strong>Community Film Night</strong> is confirmed.</p>
      <p style="margin-top:16px"><span class="btn">Browse more events</span> <span class="btn btn--out">Add to calendar</span></p>
    </div>"""
    write(f"08-rsvp-confirm-{'m' if mobile else 'd'}.html", wrap("08-rsvp-confirm", "RSVP confirmation", inner, mobile))


def related(mobile=False):
    inner = f"""<div class="pad">
      <p class="crumb">After conversion</p>
      <h1>More upcoming events</h1>
    </div>
    <div class="related">
      <div class="card"><div class="ph"><img src="{IMG_LISTING}" alt="" width="320" height="110"></div><div class="body"><div class="date">Aug 22</div><div class="title">Football Fest &amp; Free Day</div></div></div>
      <div class="card"><div class="ph"><img src="{IMG_TICKETED}" alt="" width="320" height="110"></div><div class="body"><div class="date">Saturdays in Oct</div><div class="title">Gameday Kickoff Party</div></div></div>
      <div class="card"><div class="ph"><img src="{IMG_EXHIBIT}" alt="" width="320" height="110"></div><div class="body"><div class="date">Sep 11</div><div class="title">Community Film Night</div></div></div>
    </div>"""
    write(f"09-related-{'m' if mobile else 'd'}.html", wrap("09-related", "More upcoming events", inner, mobile))


def main():
    for m in (False, True):
        listing(False, m)
        listing(True, m)
        ticketed(m)
        checkout(m)
        tix_confirm(m)
        rsvp(False, m)
        rsvp(True, m)
        rsvp_confirm(m)
        related(m)


if __name__ == "__main__":
    main()
