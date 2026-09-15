#!/usr/bin/env python3
"""Responsive layout audit for all main prototype pages."""
from __future__ import annotations

import json
import sys
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8090"
PAGES = [
    ("/index.html", "Home"),
    ("/search.html", "Search"),
    ("/search.html?q=tebow", "Search (Tebow)"),
    ("/happenings.html", "Happenings outline"),
    ("/happenings-listing.html", "Listing"),
    ("/happenings-transactional.html?event=gameday-kickoff", "Transactional"),
    ("/happenings-rsvp.html?event=football-fest", "RSVP (Fest)"),
    ("/ccfb-logo-options.html", "CCFB logos"),
    ("/happenings-hero-options.html", "Hero options"),
    ("/happenings-form-embed.html", "Form embed"),
]
WIDTHS = [390, 768, 901, 1100, 1280, 1440]

AUDIT_JS = """
() => {
  const doc = document.documentElement;
  const overflow = doc.scrollWidth - doc.clientWidth;
  const inner = document.querySelector('.site-footer__inner');
  const know = document.querySelector('.site-footer__col--know');
  const rail = document.querySelector('.site-rail');
  const topbar = document.querySelector('.mobile-topbar');
  const banner = document.querySelector('.hp-banner');
  let worst = null;
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const o = r.right - window.innerWidth;
    if (o > 2) {
      const cls = el.className && typeof el.className === 'string'
        ? el.className.split(/\\s+/).slice(0, 2).join('.')
        : el.tagName.toLowerCase();
      if (!worst || o > worst.o) worst = { cls, o: Math.round(o) };
    }
  }
  const rs = rail ? getComputedStyle(rail) : null;
  const railHidden = rs && rs.position === 'fixed' && rs.transform !== 'none'
    && !rs.transform.includes('matrix(1, 0, 0, 1, 0, 0)');
  return {
    overflow: Math.round(overflow),
    worst,
    topbarOn: topbar ? getComputedStyle(topbar).display !== 'none' : null,
    railHidden,
    bannerOverflow: banner ? banner.scrollWidth > banner.clientWidth + 1 : false,
    footerGrid: inner ? getComputedStyle(inner).gridTemplateColumns : null,
    knowFlex: know ? getComputedStyle(know).flexDirection : null,
    knowSpan: know ? getComputedStyle(know).gridColumn : null,
  };
}
"""


def classify(page: str, width: int, a: dict) -> list[dict]:
    issues = []
    if a["overflow"] > 1:
        detail = f"{a['overflow']}px overflow"
        if a.get("worst"):
            detail += f" — {a['worst']['cls']} (+{a['worst']['o']}px)"
        issues.append({"severity": "P1", "type": "horizontal-overflow", "detail": detail})
    if a.get("bannerOverflow"):
        issues.append({"severity": "P2", "type": "banner-overflow", "detail": "hp-banner wider than viewport"})
    if width <= 900 and a.get("topbarOn") is False:
        issues.append({"severity": "P1", "type": "missing-mobile-topbar", "detail": "No mobile topbar at ≤900px"})
    if width > 900 and a.get("railHidden") is True:
        issues.append({"severity": "P2", "type": "rail-hidden", "detail": "Rail off-screen at desktop width"})
    if (
        width == 1100
        and a.get("footerGrid")
        and "300px" in a["footerGrid"]
        and a.get("knowSpan") == "auto"
        and a.get("knowFlex") == "row"
    ):
        issues.append({
            "severity": "P1",
            "type": "footer-overlap-risk",
            "detail": f"3-col + row know at 1100px: {a['footerGrid']}",
        })
    return issues


def main() -> int:
    rows = []
    issues = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        for path, name in PAGES:
            for w in WIDTHS:
                page.set_viewport_size({"width": w, "height": 900})
                page.goto(f"{BASE}{path}", wait_until="networkidle", timeout=30000)
                page.wait_for_timeout(300)
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                page.evaluate("window.scrollTo(0, 0)")
                a = page.evaluate(AUDIT_JS)
                row = {"page": name, "path": path, "width": w, **a}
                rows.append(row)
                for issue in classify(name, w, a):
                    issues.append({"page": name, "path": path, "width": w, **issue})
        browser.close()

    out = {"rows": rows, "issues": issues}
    print(json.dumps(out, indent=2))
    print(f"\nAudit: {len(issues)} issue(s)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
