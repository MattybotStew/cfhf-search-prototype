/**
 * Happenings — listing filters, detail hydration, RSVP, tickets, calendar, share, maps
 */
(function () {
  "use strict";

  var INDEX = null;
  var DEFAULT_TX = "gameday-kickoff";
  var DEFAULT_RSVP = "community-film-night";
  var RSVP_KEY = "cfhf-hp-rsvp";
  var TIX_KEY = "cfhf-hp-tickets";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function setParam(name, value) {
    var url = new URL(window.location.href);
    if (!value || value === "all") url.searchParams.delete(name);
    else url.searchParams.set(name, value);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  function eventUrl(ev) {
    var base = ev.template === "transactional"
      ? "happenings-transactional.html"
      : "happenings-rsvp.html";
    return base + "?event=" + encodeURIComponent(ev.id);
  }

  function findEvent(id) {
    if (!INDEX) return null;
    return INDEX.events.find(function (e) { return e.id === id; }) || null;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function venue() {
    return (INDEX && INDEX.venue) || {};
  }

  function mapsEmbedSrc() {
    var q = venue().mapsQuery || "College Football Hall of Fame Atlanta";
    return "https://maps.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
  }

  function fbPageEmbedSrc() {
    var href = venue().facebookPage || "https://www.facebook.com/CollegeFootballHOF";
    return "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(href) +
      "&tabs=events&width=340&height=130&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false";
  }

  function loadIndex() {
    return fetch("data/happenings-events.json")
      .then(function (r) {
        if (!r.ok) throw new Error("events json");
        return r.json();
      })
      .then(function (data) {
        INDEX = data;
        return data;
      });
  }

  function toast(msg) {
    var el = qs(".hp-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "hp-toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  function scrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  function scrollToEl(el) {
    if (el) el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  }

  function markConverted(demo) {
    if (demo) demo.setAttribute("data-converted", "on");
  }

  function showEventNotFound() {
    var demo = qs(".wf-demo");
    if (demo) demo.hidden = true;
    var nf = qs(".hp-event-not-found");
    if (nf) {
      nf.hidden = false;
      nf.removeAttribute("hidden");
    }
    document.title = "Event not found · Happenings · College Football Hall of Fame";
  }

  function initDevMode() {
    if (getParam("dev") === "1") document.body.classList.add("hp-dev");
  }

  /* ----- Listing ----- */
  function initListing() {
    var grid = qs(".hp-listing__grid");
    if (!grid || !INDEX) return;

    var cards = qsa(".hp-card-event", grid);
    var chips = qs(".hp-chips");
    var empty = qs(".hp-listing-empty");

    cards.forEach(function (card) {
      var id = card.getAttribute("data-event-id");
      var ev = findEvent(id);
      if (!ev) return;
      card.href = eventUrl(ev);
      card.setAttribute("data-categories", ev.categories.join(" "));
    });

    function setActiveCategory(catId) {
      if (chips) {
        qsa("button", chips).forEach(function (btn) {
          var match = btn.getAttribute("data-category") === catId;
          btn.classList.toggle("is-active", match);
          btn.setAttribute("aria-pressed", String(match));
        });
      }
      setParam("category", catId === "all" ? "" : catId);

      var visible = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-categories") || "").split(/\s+/);
        var show = catId === "all" || cats.indexOf(catId) !== -1;
        card.hidden = !show;
        if (show) visible++;
      });

      if (empty) empty.hidden = visible > 0;
    }

    function bindFilter(el, selector) {
      if (!el) return;
      qsa(selector, el).forEach(function (node) {
        node.addEventListener("click", function (e) {
          e.preventDefault();
          setActiveCategory(node.getAttribute("data-category"));
        });
      });
    }

    bindFilter(chips, "button[data-category]");

    var initial = getParam("category") || "all";
    setActiveCategory(initial);
  }

  /* ----- Detail hydration ----- */
  function hydrateDetail(ev) {
    document.title = ev.title + " · Happenings · College Football Hall of Fame";

    setText("[data-hp='crumb-event']", ev.title);
    setText("[data-hp='title-stroke']", ev.titleStroke);
    setText("[data-hp='title-solid']", ev.titleSolid);
    setText("[data-hp='hero-subtitle']", ev.heroSubtitle || "");
    setText("[data-hp='date-label']", ev.dateLabel);
    setText("[data-hp='offer-title']", ev.offerTitle);
    setText("[data-hp='offer-copy']", ev.offerCopy);
    setText("[data-hp='sticky-label']", ev.stickyLabel);
    setText("[data-hp='sticky-meta']", ev.stickyMeta);
    setText("[data-hp='details']", ev.details || "");
    setText("[data-hp='expect']", ev.expect || "");
    setText("[data-hp='getting']", ev.gettingThere || "");

    if (ev.price) setText("[data-hp='price']", ev.price);

    if (ev.template === "transactional") {
      setText("[data-hp='cta-tickets']", ev.buttonLabel || "Get Tickets");
    } else {
      setText("[data-hp='cta-rsvp']", ev.buttonLabel || "Save My Spot");
    }

    var v = venue();
    setText("[data-hp='address']", v.address || "");
    setText("[data-hp='city']", v.cityLine || "");

    qsa("[data-hp='tag']").forEach(function (el) {
      el.textContent = ev.tag;
      el.classList.toggle("hp-tag--outline", !!ev.tagOutline);
      el.classList.toggle("wf-tag--outline", !!ev.tagOutline);
    });

    qsa(".hp-hero--image").forEach(function (hero) {
      hero.style.backgroundImage = "url('" + ev.image.replace(/'/g, "%27") + "')";
    });

    var agenda = qs("[data-hp='agenda']");
    if (agenda && ev.agenda && ev.agenda.length) {
      agenda.innerHTML = ev.agenda.map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("");
    }

    var faq = qs("[data-hp='faq']");
    if (faq && ev.faqs && ev.faqs.length) {
      faq.innerHTML = ev.faqs.map(function (item, i) {
        var aid = "faq-a-" + ev.id + "-" + i;
        var open = i === 0;
        return (
          '<div class="wf-faq__item' + (open ? " is-open" : "") + '">' +
            '<button type="button" class="wf-faq__q" aria-expanded="' + open + '" aria-controls="' + aid + '">' + esc(item.q) + "</button>" +
            '<div class="wf-faq__a" id="' + aid + '">' + esc(item.a) + "</div>" +
          "</div>"
        );
      }).join("");
      if (window.bindHappeningsFaq) window.bindHappeningsFaq(faq);
    }

    qsa("[data-hp='map']").forEach(function (iframe) {
      iframe.src = mapsEmbedSrc();
    });
    qsa("[data-hp='directions']").forEach(function (a) {
      a.href = v.mapsLink || "#";
    });
    qsa("[data-hp='fb-embed']").forEach(function (iframe) {
      iframe.src = fbPageEmbedSrc();
    });
    qsa("[data-hp='fb-link']").forEach(function (a) {
      a.href = ev.facebookEventUrl || v.facebookPage || "#";
    });

    var pageUrl = window.location.href.split("#")[0];
    qsa("[data-hp='share-fb']").forEach(function (a) {
      a.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);
    });
    qsa("[data-hp='share-x']").forEach(function (a) {
      a.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(ev.title) + "&url=" + encodeURIComponent(pageUrl);
    });
    qsa("[data-hp='share-ig']").forEach(function (a) {
      a.href = v.instagram || "#";
    });

    var embed = qs("[data-hp='form-embed']");
    if (embed) {
      embed.src = "happenings-form-embed.html?event=" + encodeURIComponent(ev.id);
    }

    renderRelated(ev);
  }

  function renderRelated(current) {
    var grid = qs(".hp-related__grid") || qs("[data-hp='related']");
    if (!grid || !INDEX) return;

    var related = INDEX.events
      .filter(function (e) { return e.id !== current.id; })
      .slice(0, 3);

    grid.innerHTML = related.map(function (ev) {
      var tagClass = ev.tagOutline ? " hp-tag--outline wf-tag--outline" : "";
      var isWf = grid.classList.contains("wf-carousel__cards");
      if (isWf) {
        return (
          '<a class="wf-carousel__card" href="' + eventUrl(ev) + '">' +
            '<div class="wf-carousel__card-media"></div>' +
            '<div class="wf-carousel__card-body">' +
              '<span class="wf-listing__date">' + esc(ev.dateShort) + "</span>" +
              '<span class="wf-listing__title">' + esc(ev.title) + "</span>" +
              '<span class="wf-tag wf-tag--xs' + tagClass + '">' + esc(ev.tag) + "</span>" +
            "</div></a>"
        );
      }
      return (
        '<a class="hp-card-event" href="' + eventUrl(ev) + '">' +
          '<div class="hp-card-event__media"><img src="' + esc(ev.thumb) + '" alt="' + esc(ev.title) + '"></div>' +
          '<div class="hp-card-event__body">' +
            '<span class="hp-card-event__date">' + esc(ev.dateShort) + "</span>" +
            '<span class="hp-card-event__title">' + esc(ev.title) + "</span>" +
            '<span class="hp-tag' + tagClass + '">' + esc(ev.tag) + "</span>" +
          "</div></a>"
      );
    }).join("");
  }

  function initDetailPage(template) {
    var paramId = getParam("event");
    var id = paramId || (template === "transactional" ? DEFAULT_TX : DEFAULT_RSVP);
    var ev = findEvent(id);

    if (!ev) {
      if (paramId) showEventNotFound();
      return;
    }

    if (ev.template !== template) {
      window.location.replace(eventUrl(ev));
      return;
    }

    hydrateDetail(ev);
    initRsvpForm(ev);
    initTicketPicker(ev);
    initTicketFlow();
    initCalendar(ev);
    initNewsletter();
  }

  function initRsvpForm(ev) {
    qsa("form[data-mod='native-form']").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var nameInput = qs("[name='name']", form) || qs("#rsvp-name", form);
        var emailInput = qs("[name='email']", form);
        var nInput = qs("[name='attending']", form);
        var news = qs("[name='newsletter']", form);
        var name = (nameInput && nameInput.value.trim()) || "Guest";
        var record = {
          eventId: ev.id,
          title: ev.title,
          name: name,
          email: emailInput ? emailInput.value : "",
          attending: nInput ? nInput.value : "1",
          newsletter: !!(news && news.checked),
          at: new Date().toISOString()
        };
        try { sessionStorage.setItem(RSVP_KEY, JSON.stringify(record)); } catch (err) {}

        form.hidden = true;
        var confirm = qs(".hp-confirm") || qs(".wf-confirm-live", form.closest(".wf-demo") || document);
        if (confirm) {
          confirm.hidden = false;
          confirm.removeAttribute("hidden");
          confirm.classList.add("is-visible");
          var who = qs("[data-hp='confirm-name']", confirm);
          if (who) who.textContent = name;
          var evt = qs("[data-hp='confirm-event']", confirm);
          if (evt) evt.textContent = ev.title;
          scrollToEl(confirm);
        }
        var demo = form.closest(".wf-demo");
        markConverted(demo);
        toast("RSVP saved — you're on the list!");
      });
    });
  }

  function initTicketPicker(ev) {
    var demo = qs(".wf-demo");
    if (demo && demo.getAttribute("data-ventrata") === "on") return;

    var form = qs(".hp-ticket-form") || qs(".wf-live-tickets");
    if (!form || !ev.tickets) return;

    var dateSel = qs("[name='ticket-date']", form);
    var qtySel = qs("[name='ticket-qty']", form);
    var member = qs("[name='ticket-member']", form);
    var totalEl = qs("[data-hp='ticket-total']", form);

    if (dateSel && ev.tickets.dates) {
      dateSel.innerHTML = ev.tickets.dates.map(function (d) {
        return '<option value="' + esc(d.value) + '">' + esc(d.label) + "</option>";
      }).join("");
    }

    function priceEach() {
      return member && member.checked ? ev.tickets.memberPrice : ev.tickets.unitPrice;
    }

    function qty() {
      return parseInt((qtySel && qtySel.value) || "1", 10) || 1;
    }

    function refresh() {
      if (totalEl) totalEl.textContent = "$" + (priceEach() * qty());
    }

    [dateSel, qtySel, member].forEach(function (el) {
      if (el) el.addEventListener("change", refresh);
    });
    refresh();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dateLabel = dateSel && dateSel.options[dateSel.selectedIndex]
        ? dateSel.options[dateSel.selectedIndex].text
        : ev.dateLabel;
      var record = {
        eventId: ev.id,
        title: ev.title,
        date: dateSel ? dateSel.value : "",
        dateLabel: dateLabel,
        qty: qty(),
        member: !!(member && member.checked),
        total: priceEach() * qty(),
        at: new Date().toISOString()
      };
      try { sessionStorage.setItem(TIX_KEY, JSON.stringify(record)); } catch (err) {}

      form.hidden = true;
      var confirm = qs(".hp-tix-confirm") || qs(".wf-tix-confirm");
      if (confirm) {
        confirm.hidden = false;
        confirm.removeAttribute("hidden");
        setText("[data-hp='tix-title']", ev.title);
        setText("[data-hp='tix-date']", dateLabel);
        setText("[data-hp='tix-qty']", String(record.qty));
        setText("[data-hp='tix-total']", "$" + record.total);
        scrollToEl(confirm);
      }
      markConverted(qs(".wf-demo"));
      toast("Tickets reserved — confirmation is on this page.");
    });
  }

  function initTicketFlow() {
    var demo = qs(".wf-demo");
    if (!demo || demo.getAttribute("data-ventrata") !== "on") return;

    qsa("[data-scroll-tickets]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var widget = qs('.hp-widget[data-mod="ventrata"]');
        if (widget) {
          e.preventDefault();
          scrollToEl(widget);
        }
      });
    });
  }

  function icsStamp(iso) {
    return iso.replace(/[-:]/g, "").replace(/\.\d+/, "").slice(0, 15);
  }

  function downloadIcs(ev) {
    var cal = ev.calendar;
    if (!cal) return;
    var v = venue();
    var uid = ev.id + "@cfbhall.com";
    var stamp = icsStamp(new Date().toISOString());
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CFHF//Happenings Prototype//EN",
      "BEGIN:VEVENT",
      "UID:" + uid,
      "DTSTAMP:" + stamp,
      "DTSTART:" + icsStamp(cal.start),
      "DTEND:" + icsStamp(cal.end),
      "SUMMARY:" + ev.title.replace(/,/g, "\\,"),
      "LOCATION:" + ((v.address || "") + ", " + (v.cityLine || "")).replace(/,/g, "\\,"),
      "DESCRIPTION:" + (ev.offerCopy || "").replace(/,/g, "\\,").replace(/\n/g, "\\n")
    ];
    if (cal.rrule) lines.push("RRULE:" + cal.rrule);
    lines.push("END:VEVENT", "END:VCALENDAR");
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ev.id + ".ics";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function initCalendar(ev) {
    qsa("[data-mod='calendar'], [data-hp='calendar']").forEach(function (a) {
      if (a.getAttribute("data-cal-bound")) return;
      a.setAttribute("data-cal-bound", "1");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var id = a.getAttribute("data-event-id");
        var event = (id && findEvent(id)) || ev;
        if (event && event.calendar) {
          downloadIcs(event);
          toast("Calendar file downloaded");
        }
      });
    });
  }

  function initNewsletter() {
    qsa(".site-footer__form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = qs("input[type='email']", form);
        if (input && !input.checkValidity()) {
          input.reportValidity();
          return;
        }
        toast("You’re subscribed — prototype only (no email is sent).");
        form.reset();
      });
    });
  }

  function initScrollLinks() {
    qsa("[data-scroll-to]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var id = btn.getAttribute("data-scroll-to");
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          scrollToEl(target);
        }
      });
    });
  }

  function initBoard() {
    var tx = findEvent(DEFAULT_TX);
    var rsvp = findEvent(DEFAULT_RSVP);
    if (tx) {
      initTicketPicker(tx);
      initTicketFlow();
    }
    initCalendar(tx || rsvp);
    if (rsvp) initRsvpForm(rsvp);
    qsa("[data-hp='map']").forEach(function (iframe) { iframe.src = mapsEmbedSrc(); });
    qsa("[data-hp='fb-embed']").forEach(function (iframe) { iframe.src = fbPageEmbedSrc(); });
    initNewsletter();
  }

  window.bindHappeningsFaq = function (root) {
    qsa(".wf-faq__q", root || document).forEach(function (btn) {
      if (btn.getAttribute("data-hp-faq-bound")) return;
      btn.setAttribute("data-hp-faq-bound", "1");
      if (!btn.hasAttribute("aria-expanded")) {
        btn.setAttribute("aria-expanded", btn.closest(".wf-faq__item").classList.contains("is-open") ? "true" : "false");
      }
      btn.addEventListener("click", function () {
        var item = btn.closest(".wf-faq__item");
        if (!item) return;
        var open = !item.classList.contains("is-open");
        var list = item.parentElement;
        if (list) {
          qsa(".wf-faq__item", list).forEach(function (el) {
            el.classList.remove("is-open");
            var q = qs(".wf-faq__q", el);
            if (q) q.setAttribute("aria-expanded", "false");
          });
        }
        item.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    initDevMode();
    var page = document.body.getAttribute("data-hp-page");

    loadIndex()
      .then(function () {
        if (page === "listing") initListing();
        else if (page === "transactional") initDetailPage("transactional");
        else if (page === "rsvp") initDetailPage("rsvp");
        else if (page === "embed") {
          var ev = findEvent(getParam("event") || DEFAULT_RSVP);
          if (ev) {
            hydrateDetail(ev);
            initRsvpForm(ev);
          }
        } else if (page === "board") initBoard();
        initScrollLinks();
      })
      .catch(function () {
        initScrollLinks();
      });
  });
})();
