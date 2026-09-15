#!/usr/bin/env node
/**
 * Responsive audit via CDP — run with Cursor browser tab open, or:
 *   node scripts/responsive_audit.mjs
 * Uses fetch to localhost; for layout checks requires puppeteer.
 */
import puppeteer from 'puppeteer';

const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:8090';
const pages = [
  { path: '/index.html', name: 'Home' },
  { path: '/search.html', name: 'Search' },
  { path: '/search.html?q=tebow', name: 'Search (Tebow)' },
  { path: '/happenings.html', name: 'Happenings outline' },
  { path: '/happenings-listing.html', name: 'Listing' },
  { path: '/happenings-transactional.html?event=gameday-kickoff', name: 'Transactional' },
  { path: '/happenings-rsvp.html?event=football-fest', name: 'RSVP (Fest)' },
  { path: '/ccfb-logo-options.html', name: 'CCFB logos' },
  { path: '/happenings-hero-options.html', name: 'Hero options' },
  { path: '/happenings-form-embed.html', name: 'Form embed' },
];
const widths = [390, 768, 901, 1100, 1280, 1440];

function auditPage() {
  const doc = document.documentElement;
  const overflow = doc.scrollWidth - doc.clientWidth;
  const footer = document.querySelector('.site-footer');
  const inner = document.querySelector('.site-footer__inner');
  const know = document.querySelector('.site-footer__col--know');
  const rail = document.querySelector('.site-rail');
  const topbar = document.querySelector('.mobile-topbar');
  const banner = document.querySelector('.hp-banner');

  const offenders = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.right > window.innerWidth + 2) {
      const cls =
        el.className && typeof el.className === 'string'
          ? el.className.split(/\s+/).slice(0, 2).join('.')
          : el.tagName.toLowerCase();
      offenders.push({
        cls,
        overflow: Math.round(r.right - window.innerWidth),
      });
    }
  }
  offenders.sort((a, b) => b.overflow - a.overflow);
  const top = [];
  const seen = new Set();
  for (const o of offenders) {
    const k = `${o.cls}:${o.overflow}`;
    if (seen.has(k)) continue;
    seen.add(k);
    top.push(o);
    if (top.length >= 3) break;
  }

  const railStyle = rail ? getComputedStyle(rail) : null;
  const railOffscreen =
    railStyle &&
    railStyle.position === 'fixed' &&
    railStyle.transform !== 'none' &&
    !railStyle.transform.includes('matrix(1, 0, 0, 1, 0, 0)');

  return {
    overflow,
    hasOverflow: overflow > 1,
    topbarOn: topbar ? getComputedStyle(topbar).display !== 'none' : null,
    railHidden: rail ? railOffscreen : null,
    bannerOverflow: banner ? banner.scrollWidth > banner.clientWidth + 1 : false,
    footerGrid: inner ? getComputedStyle(inner).gridTemplateColumns : null,
    knowFlex: know ? getComputedStyle(know).flexDirection : null,
    knowSpan: know ? getComputedStyle(know).gridColumn : null,
    offenders: top,
  };
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const pg = await browser.newPage();
const rows = [];
const issues = [];

for (const page of pages) {
  for (const w of widths) {
    await pg.setViewport({ width: w, height: 900 });
    await pg.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pg.evaluate(() => window.scrollTo(0, 0));
    const a = await pg.evaluate(auditPage);
    rows.push({ page: page.name, width: w, ...a });

    if (a.hasOverflow) {
      issues.push({
        severity: 'P1',
        page: page.name,
        width: w,
        type: 'horizontal-overflow',
        detail: `${a.overflow}px — ${a.offenders.map((o) => o.cls).join(', ')}`,
      });
    }
    if (a.bannerOverflow) {
      issues.push({
        severity: 'P2',
        page: page.name,
        width: w,
        type: 'banner-overflow',
        detail: 'hp-banner wider than viewport',
      });
    }
    if (w <= 900 && a.topbarOn === false) {
      issues.push({
        severity: 'P1',
        page: page.name,
        width: w,
        type: 'missing-mobile-topbar',
        detail: 'Expected mobile topbar at ≤900px',
      });
    }
    if (w > 900 && a.railHidden === true) {
      issues.push({
        severity: 'P2',
        page: page.name,
        width: w,
        type: 'rail-hidden',
        detail: 'Rail off-screen at desktop width',
      });
    }
    if (w === 1100 && a.footerGrid && a.footerGrid.includes('300px') && a.knowSpan === 'auto') {
      issues.push({
        severity: 'P1',
        page: page.name,
        width: w,
        type: 'footer-overlap-risk',
        detail: `3-col footer at 1100px: ${a.footerGrid}`,
      });
    }
  }
}

await browser.close();

const out = { rows, issues };
console.log(JSON.stringify(out, null, 2));
console.error(`\nAudit complete: ${issues.length} issue(s) across ${pages.length} pages × ${widths.length} widths`);
process.exit(issues.length > 0 ? 0 : 0);
