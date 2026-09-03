/**
 * Happenings — click-through flows (listing filters, detail hydration, RSVP confirm)
 */
(function () {
  "use strict";

  var INDEX = null;
  var DEFAULT_TX = "gameday-kickoff";
  var DEFAULT_RSVP = "community-film-night";

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

  /* ----- Listing ----- */
  function initListing() {
    var grid = qs(".hp-listing__grid");
    if (!grid || !INDEX) return;

    var cards = qsa(".hp-card-event", grid);
    var catNav = qs(".hp-cats");
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
      if (catNav) {
        qsa("a", catNav).forEach(function (a) {
          var match = a.getAttribute("data-category") === catId;
          a.classList.toggle("is-active", match);
          a.setAttribute("aria-current", match ? "true" : "false");
        });
      }
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

    bindFilter(catNav, "a[data-category]");
    bindFilter(chips, "button[data-category]");

    var initial = getParam("category") || "all";
    setActiveCategory(initial);
  }

  /* ----- Detail hydration ----- */
  function setText(sel, text) {
    qsa(sel).forEach(function (el) {
      el.textContent = text;
    });
  }

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

    if (ev.price) setText("[data-hp='price']", ev.price);

    var tagEls = qsa("[data-hp='tag']");
    tagEls.forEach(function (el) {
      el.textContent = ev.tag;
      el.classList.toggle("hp-tag--outline", !!ev.tagOutline);
    });

    qsa(".hp-hero--image").forEach(function (hero) {
      hero.style.backgroundImage = "url('" + ev.image.replace(/'/g, "%27") + "')";
    });

    qsa("[data-hp='share-url']").forEach(function (a) {
      a.href = window.location.href;
    });

    renderRelated(ev);
  }

  function renderRelated(current) {
    var grid = qs(".hp-related__grid");
    if (!grid || !INDEX) return;

    var related = INDEX.events
      .filter(function (e) { return e.id !== current.id; })
      .slice(0, 3);

    grid.innerHTML = related.map(function (ev) {
      var tagClass = ev.tagOutline ? " hp-tag--outline" : "";
      return (
        '<a class="hp-card-event" href="' + eventUrl(ev) + '">' +
          '<div class="hp-card-event__media"><img src="' + ev.thumb + '" alt=""></div>' +
          '<div class="hp-card-event__body">' +
            '<span class="hp-card-event__date">' + ev.dateShort + "</span>" +
            '<span class="hp-card-event__title">' + ev.title + "</span>" +
            '<span class="hp-tag' + tagClass + '">' + ev.tag + "</span>" +
          "</div></a>"
      );
    }).join("");
  }

  function initDetailPage(template) {
    var id = getParam("event") || (template === "transactional" ? DEFAULT_TX : DEFAULT_RSVP);
    var ev = findEvent(id);
    if (!ev) return;

    if (ev.template !== template) {
      window.location.replace(eventUrl(ev));
      return;
    }

    hydrateDetail(ev);
    initRsvpForm(ev);
    initTicketFlow();
    initShare();
    initCalendar();
  }

  /* ----- RSVP submit → confirmation ----- */
  function initRsvpForm(ev) {
    var form = qs(".hp-form[data-mod='native-form']");
    var confirm = qs(".hp-confirm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (qs("#rsvp-name", form) || {}).value || "Guest";
      form.hidden = true;
      if (confirm) {
        confirm.hidden = false;
        var who = qs("[data-hp='confirm-name']", confirm);
        if (who) who.textContent = name.trim() || "Guest";
        var evt = qs("[data-hp='confirm-event']", confirm);
        if (evt) evt.textContent = ev.title;
        confirm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      toast("RSVP saved — you're on the list!");
    });
  }

  /* ----- Ticket CTAs → scroll to checkout when Ventrata placeholders ----- */
  function initTicketFlow() {
    var ventrataScript = qs('script[src*="ventrata-checkout"]');
    var config = ventrataScript && ventrataScript.getAttribute("data-config") || "";
    var placeholders = config.indexOf("<YOUR") !== -1;
    if (!placeholders) return;

    qsa("[ventrata-checkout], [data-scroll-tickets]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var target = qs("#tickets");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          toast("Prototype: Ventrata opens here when API keys are wired.");
        }
      });
    });
  }

  function initShare() {
    qsa(".hp-share__link").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var platform = a.textContent.trim();
        var url = window.location.href;
        if (navigator.share && platform === "Share") {
          navigator.share({ title: document.title, url: url });
          return;
        }
        toast("Share on " + platform + " (prototype)");
      });
    });
  }

  function initCalendar() {
    qsa("[data-mod='calendar']").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Add to Calendar — optional module (prototype)");
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
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ----- Boot ----- */
  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var page = body.getAttribute("data-hp-page");

    loadIndex()
      .then(function () {
        if (page === "listing") initListing();
        else if (page === "transactional") initDetailPage("transactional");
        else if (page === "rsvp") initDetailPage("rsvp");
        initScrollLinks();
      })
      .catch(function () {
        initScrollLinks();
      });
  });
})();
