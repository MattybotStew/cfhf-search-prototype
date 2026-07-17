/**
 * CFHF Search Prototype — search logic
 * Steps 2–8: hours-bar typeahead, results hero, filters, cards, empty state
 */
(function () {
  "use strict";

  var INDEX_URL = "data/search-index.json";
  var MAX_SUGGESTIONS = 8;
  var CATEGORIES = [
    { id: "all", label: "All Results", shortLabel: "All" },
    { id: "inductees", label: "Inductees & Players", shortLabel: "Inductees" },
    { id: "news", label: "News & Blog", shortLabel: "News" },
    { id: "events", label: "Exhibits & Events", shortLabel: "Events" },
    {
      id: "general-tickets",
      label: "General Information and Tickets",
      shortLabel: "General & Tickets",
    },
  ];

  var searchIndex = null;
  var indexPromise = null;
  var resultsState = {
    query: "",
    category: "all",
    matches: [],
  };

  /* -------------------------------------------------- */
  /* 1. Mobile rail toggle (topbar hamburger)           */
  /* -------------------------------------------------- */
  var rail = document.querySelector(".site-rail");
  var railToggles = document.querySelectorAll(".rail-toggle");
  var navBackdrop = document.getElementById("nav-backdrop");

  function setRailOpen(isOpen) {
    if (!rail) return;
    rail.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("is-nav-open", isOpen);
    railToggles.forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(isOpen));
      btn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    if (navBackdrop) {
      navBackdrop.hidden = !isOpen;
    }
  }

  if (rail && railToggles.length) {
    railToggles.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setRailOpen(!rail.classList.contains("is-open"));
      });
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", function () {
        setRailOpen(false);
      });
    }

    document.addEventListener("click", function (e) {
      if (!rail.classList.contains("is-open")) return;
      var onToggle = false;
      railToggles.forEach(function (btn) {
        if (btn.contains(e.target)) onToggle = true;
      });
      if (!rail.contains(e.target) && !onToggle) {
        setRailOpen(false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && rail.classList.contains("is-open")) {
        setRailOpen(false);
        if (railToggles[0]) railToggles[0].focus();
      }
    });
  }

  /* -------------------------------------------------- */
  /* 2–3. Hours-bar search + predictive dropdown        */
  /* -------------------------------------------------- */
  var searchWraps = document.querySelectorAll(".search-bar-wrap");

  searchWraps.forEach(function (slot) {
    var bar = slot.querySelector(".search-bar");
    if (!bar) return;
    var isAlwaysOpen =
      bar.classList.contains("search-bar--hero") ||
      bar.classList.contains("search-bar--hours");

    var input = bar.querySelector(".search-bar__input");
    if (!input) return;

    var trigger = bar.querySelector(".search-bar__trigger");
    var closeBtn = bar.querySelector(".search-bar__close");
    var suggestList =
      slot.querySelector(".search-suggest") ||
      document.getElementById("search-suggest");

    var activeIndex = -1;

    function setExpanded(expanded) {
      bar.classList.toggle("is-expanded", expanded);
      var listOpen = suggestList && !suggestList.hidden;
      input.setAttribute("aria-expanded", String(Boolean(expanded && listOpen)));
      if (trigger && !isAlwaysOpen) {
        trigger.setAttribute(
          "aria-label",
          expanded ? "Submit search" : "Open search"
        );
      }
    }

    function hideSuggestions() {
      if (!suggestList) return;
      suggestList.hidden = true;
      suggestList.innerHTML = "";
      activeIndex = -1;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }

    function collapseSearchBar() {
      hideSuggestions();
      setExpanded(false);
      input.blur();
    }

    function expandSearchBar() {
      setExpanded(true);
      input.focus();
      loadSearchIndex();
    }

    if (trigger) {
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        if (isAlwaysOpen || bar.classList.contains("is-expanded")) {
          submitSearch(input.value.trim());
        } else {
          expandSearchBar();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        collapseSearchBar();
      });
    }

    if (isAlwaysOpen) {
      bar.classList.add("is-expanded");
      loadSearchIndex();
    }

    input.addEventListener("keydown", function (e) {
      var items = suggestList
        ? suggestList.querySelectorAll(".search-suggest__item[data-query]")
        : [];

      if (e.key === "ArrowDown") {
        if (!suggestList || suggestList.hidden || !items.length) return;
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActiveSuggestion(items);
        return;
      }

      if (e.key === "ArrowUp") {
        if (!suggestList || suggestList.hidden || !items.length) return;
        e.preventDefault();
        activeIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
        updateActiveSuggestion(items);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (
          activeIndex >= 0 &&
          items[activeIndex] &&
          !suggestList.hidden
        ) {
          var selectedQuery = items[activeIndex].getAttribute("data-query");
          submitSearch(selectedQuery);
          return;
        }
        submitSearch(input.value.trim());
        return;
      }

      if (e.key === "Escape") {
        if (suggestList && !suggestList.hidden) {
          hideSuggestions();
          return;
        }
        if (isAlwaysOpen) {
          hideSuggestions();
          input.blur();
          return;
        }
        collapseSearchBar();
      }
    });

    document.addEventListener("click", function (e) {
      if (!slot.contains(e.target)) {
        if (isAlwaysOpen) {
          hideSuggestions();
        } else {
          collapseSearchBar();
        }
      }
    });

    populateFromURL(input, bar);

    input.addEventListener("input", function () {
      var query = input.value.trim();
      if (!bar.classList.contains("is-expanded")) {
        setExpanded(true);
      }
      renderSuggestions(query, suggestList, input, function (idx) {
        activeIndex = idx;
      });
    });

    input.addEventListener("focus", function () {
      if (!bar.classList.contains("is-expanded")) {
        setExpanded(true);
      }
      var query = input.value.trim();
      if (query.length >= 1) {
        renderSuggestions(query, suggestList, input, function (idx) {
          activeIndex = idx;
        });
      }
    });

    function updateActiveSuggestion(items) {
      items.forEach(function (item, i) {
        var selected = i === activeIndex;
        item.setAttribute("aria-selected", String(selected));
        var btn = item.querySelector(".search-suggest__btn");
        if (btn) {
          btn.classList.toggle("is-active", selected);
        }
        if (selected) {
          input.setAttribute("aria-activedescendant", item.id);
          item.scrollIntoView({ block: "nearest" });
        }
      });
    }
  });

  /* -------------------------------------------------- */
  /* Index load + match                                 */
  /* -------------------------------------------------- */
  function loadSearchIndex() {
    if (searchIndex) {
      return Promise.resolve(searchIndex);
    }
    if (indexPromise) {
      return indexPromise;
    }

    indexPromise = fetch(INDEX_URL)
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Failed to load search index");
        }
        return res.json();
      })
      .then(function (data) {
        searchIndex = Array.isArray(data) ? data : [];
        return searchIndex;
      })
      .catch(function (err) {
        console.error(err);
        searchIndex = [];
        return searchIndex;
      });

    return indexPromise;
  }

  function normalize(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Score and rank documents for a query.
   * Empty query returns the full index (browse-all on results page).
   */
  function matchDocuments(query, limit) {
    if (!searchIndex) return [];

    var q = normalize(query);
    if (!q) {
      var all = searchIndex.slice().sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      return typeof limit === "number" ? all.slice(0, limit) : all;
    }

    var scored = [];

    searchIndex.forEach(function (doc) {
      var title = normalize(doc.title);
      var excerpt = normalize(doc.excerpt);
      var team = normalize(doc.team);
      var category = normalize(doc.category);
      var score = 0;

      if (title === q) score += 100;
      else if (title.indexOf(q) === 0) score += 80;
      else if (title.indexOf(q) !== -1) score += 60;

      if (team && team.indexOf(q) !== -1) score += 40;
      if (excerpt.indexOf(q) !== -1) score += 20;
      if (category.indexOf(q) !== -1) score += 10;

      /* Multi-word: require each token somewhere for partial credit */
      var tokens = q.split(" ").filter(Boolean);
      if (tokens.length > 1) {
        var hay = title + " " + excerpt + " " + team;
        var allTokens = tokens.every(function (t) {
          return hay.indexOf(t) !== -1;
        });
        if (allTokens && score === 0) score += 30;
      }

      if (score > 0) {
        scored.push({ doc: doc, score: score });
      }
    });

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.doc.title.localeCompare(b.doc.title);
    });

    var docs = scored.map(function (row) {
      return row.doc;
    });

    return typeof limit === "number" ? docs.slice(0, limit) : docs;
  }

  function filterByCategory(docs, categoryId) {
    if (!categoryId || categoryId === "all") return docs.slice();
    return docs.filter(function (doc) {
      return doc.category === categoryId;
    });
  }

  function countByCategory(docs) {
    var counts = { all: docs.length };
    CATEGORIES.forEach(function (cat) {
      if (cat.id === "all") return;
      counts[cat.id] = docs.filter(function (d) {
        return d.category === cat.id;
      }).length;
    });
    return counts;
  }

  function isHof(doc) {
    return doc.docType === "inductee" || doc.category === "inductees";
  }

  function initials(title) {
    var parts = String(title || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function categoryLabel(doc) {
    switch (doc.category) {
      case "inductees":
        return "Inductee";
      case "news":
        return "News";
      case "events":
        return "Event";
      case "general-tickets":
        return "Visit & Tickets";
      default:
        return "Page";
    }
  }

  function categoryFilterLabel(categoryId) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === categoryId) return CATEGORIES[i].label;
    }
    return categoryId;
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + (String(iso).length === 10 ? "T12:00:00" : ""));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function categoryIconSvg(doc) {
    if (doc.category === "general-tickets") {
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9z"/>' +
        '<path d="M9 5v14"/>' +
        "</svg>"
      );
    }
    if (doc.category === "events") {
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<rect x="3" y="5" width="18" height="16" rx="1"/>' +
        '<path d="M3 10h18M8 3v4M16 3v4"/>' +
        "</svg>"
      );
    }
    if (doc.category === "news") {
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z"/>' +
        '<path d="M18 7h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/>' +
        '<path d="M8 9h6M8 13h6M8 17h4"/>' +
        "</svg>"
      );
    }
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M8 4h7l3 3v13H8z"/>' +
      '<path d="M15 4v3h3"/>' +
      "</svg>"
    );
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function resultCountLabel(n) {
    return n === 1 ? "1 result" : n + " results";
  }

  /* -------------------------------------------------- */
  /* Typeahead rendering                                */
  /* -------------------------------------------------- */
  function renderSuggestionItem(doc, index) {
    var id = "search-suggest-option-" + index;
    var query = escapeHtml(doc.title);
    var title = escapeHtml(doc.title);
    var hof = isHof(doc);

    if (hof) {
      var badge = escapeHtml(doc.teamBadge || doc.team || "Hall of Fame");
      var year = doc.inductionYear
        ? " · " + escapeHtml(String(doc.inductionYear))
        : "";
      var avatarInner = doc.image
        ? '<img src="' +
          escapeHtml(doc.image) +
          '" alt="" width="40" height="40">'
        : initials(doc.title);

      return (
        '<li class="search-suggest__item search-suggest__item--hof" role="option" id="' +
        id +
        '" data-query="' +
        query +
        '" aria-selected="false">' +
        '<button type="button" class="search-suggest__btn">' +
        '<span class="search-suggest__avatar" aria-hidden="true">' +
        avatarInner +
        "</span>" +
        '<span class="search-suggest__body">' +
        '<span class="search-suggest__title">' +
        title +
        "</span>" +
        '<span class="search-suggest__meta">' +
        '<span class="search-suggest__badge">' +
        badge +
        "</span>" +
        "<span>Hall of Famer" +
        year +
        "</span>" +
        "</span>" +
        "</span>" +
        "</button>" +
        "</li>"
      );
    }

    return (
      '<li class="search-suggest__item search-suggest__item--general" role="option" id="' +
      id +
      '" data-query="' +
      query +
      '" aria-selected="false">' +
      '<button type="button" class="search-suggest__btn">' +
      '<span class="search-suggest__icon" aria-hidden="true">' +
      categoryIconSvg(doc) +
      "</span>" +
      '<span class="search-suggest__body">' +
      '<span class="search-suggest__title">' +
      title +
      "</span>" +
      '<span class="search-suggest__meta">' +
      escapeHtml(categoryLabel(doc)) +
      "</span>" +
      "</span>" +
      "</button>" +
      "</li>"
    );
  }

  function renderSearchAllRow(query, index) {
    var id = "search-suggest-option-" + index;
    var q = escapeHtml(query);
    return (
      '<li class="search-suggest__item search-suggest__item--search-all" role="option" id="' +
      id +
      '" data-query="' +
      q +
      '" aria-selected="false">' +
      '<button type="button" class="search-suggest__btn">' +
      '<span class="search-suggest__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>' +
      "</span>" +
      '<span class="search-suggest__body">' +
      '<span class="search-suggest__title">Search all results for “' +
      q +
      '”</span>' +
      '<span class="search-suggest__meta">View full results</span>' +
      "</span>" +
      "</button>" +
      "</li>"
    );
  }

  function wireSuggestionClicks(suggestList) {
    suggestList.querySelectorAll(".search-suggest__btn").forEach(function (btn) {
      btn.addEventListener("mousedown", function (e) {
        e.preventDefault();
      });
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = btn.closest(".search-suggest__item");
        var selected = item && item.getAttribute("data-query");
        if (selected) {
          submitSearch(selected);
        }
      });
    });
  }

  function renderSuggestions(query, suggestList, input, setActiveIndex) {
    if (!suggestList) return;

    if (!query) {
      suggestList.hidden = true;
      suggestList.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      if (setActiveIndex) setActiveIndex(-1);
      return;
    }

    loadSearchIndex().then(function () {
      if (normalize(input.value) !== normalize(query)) return;

      var matches = matchDocuments(query, MAX_SUGGESTIONS);
      if (setActiveIndex) setActiveIndex(-1);
      input.removeAttribute("aria-activedescendant");

      var html = [];
      if (!matches.length) {
        html.push(
          '<li class="search-suggest__empty" role="presentation">No quick matches</li>'
        );
        html.push(renderSearchAllRow(query, 0));
      } else {
        matches.forEach(function (doc, i) {
          html.push(renderSuggestionItem(doc, i));
        });
        html.push(renderSearchAllRow(query, matches.length));
      }

      suggestList.innerHTML = html.join("");
      suggestList.hidden = false;
      input.setAttribute("aria-expanded", "true");
      wireSuggestionClicks(suggestList);
    });
  }

  /* -------------------------------------------------- */
  /* Navigation helpers                                 */
  /* -------------------------------------------------- */
  function isSearchPage() {
    return (
      /(^|\/)search\.html$/.test(window.location.pathname) ||
      /\/search\/?$/.test(window.location.pathname) ||
      Boolean(document.querySelector("[data-results-page]"))
    );
  }

  function submitSearch(query) {
    if (!query) return;

    if (isSearchPage()) {
      var url = new URL(window.location.href);
      url.searchParams.set("q", query);
      url.searchParams.delete("category");
      window.location.href = url.toString();
      return;
    }

    window.location.href = "search.html?q=" + encodeURIComponent(query);
  }

  function populateFromURL(input, bar) {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q");
    if (q && input) {
      input.value = q;
      if (bar) {
        bar.classList.add("is-expanded");
      }
    }
  }

  /* -------------------------------------------------- */
  /* Steps 4–7: Results page                            */
  /* -------------------------------------------------- */
  function initResultsPage() {
    var page = document.querySelector("[data-results-page]");
    if (!page) return;

    var params = new URLSearchParams(window.location.search);
    resultsState.query = params.get("q") || "";
    resultsState.category = params.get("category") || "all";
    if (
      !CATEGORIES.some(function (c) {
        return c.id === resultsState.category;
      })
    ) {
      resultsState.category = "all";
    }

    loadSearchIndex().then(function () {
      resultsState.matches = matchDocuments(resultsState.query);
      renderResultsPage();
    });
  }

  function renderResultsPage() {
    var filtered = filterByCategory(
      resultsState.matches,
      resultsState.category
    );
    var counts = countByCategory(resultsState.matches);

    updateSearchHero(
      resultsState.query,
      filtered.length,
      resultsState.category,
      resultsState.matches.length
    );
    renderFilters(counts);
    renderResultCards(filtered);
    renderEmptyState(
      resultsState.query,
      resultsState.matches.length,
      filtered.length,
      resultsState.category
    );

    /* Keep URL category in sync without full reload */
    if (history.replaceState) {
      var url = new URL(window.location.href);
      if (resultsState.query) {
        url.searchParams.set("q", resultsState.query);
      } else {
        url.searchParams.delete("q");
      }
      if (resultsState.category && resultsState.category !== "all") {
        url.searchParams.set("category", resultsState.category);
      } else {
        url.searchParams.delete("category");
      }
      history.replaceState(null, "", url.toString());
    }
  }

  function updateSearchHero(query, visibleCount, category, totalMatches) {
    var leadEl = document.getElementById("search-hero-lead");
    var queryEl = document.getElementById("search-query");
    var countEl = document.getElementById("search-count");
    var titleEl = document.getElementById("search-hero-title");

    if (queryEl) {
      if (query) {
        queryEl.textContent = "\u201C" + query + "\u201D";
        queryEl.hidden = false;
      } else {
        queryEl.textContent = "";
        queryEl.hidden = true;
      }
    }

    if (leadEl) {
      if (query) {
        leadEl.textContent = "Showing results for";
      } else {
        leadEl.textContent = "Browse all results";
      }
    }

    if (countEl) {
      var parts = [resultCountLabel(visibleCount)];
      if (category && category !== "all" && totalMatches !== visibleCount) {
        parts.push("in " + categoryFilterLabel(category));
        parts.push("(" + totalMatches + " total)");
      }
      countEl.textContent = parts.join(" · ");
    }

    if (titleEl) {
      document.title = query
        ? "Search: " + query + " · College Football Hall of Fame"
        : "Search · College Football Hall of Fame";
    }
  }

  function setCategory(categoryId) {
    resultsState.category = categoryId || "all";
    renderResultsPage();

    var main = document.getElementById("main");
    if (main) {
      main.focus({ preventScroll: true });
    }
  }

  function renderFilters(counts) {
    var desktop = document.getElementById("desktop-filters");
    var mobile = document.getElementById("mobile-filters");

    if (desktop) {
      desktop.innerHTML = CATEGORIES.map(function (cat) {
        var active = resultsState.category === cat.id;
        var count = counts[cat.id] != null ? counts[cat.id] : 0;
        return (
          '<li class="filter-list__item' +
          (active ? " filter-list__item--active" : "") +
          '">' +
          '<button type="button" class="filter-list__btn" data-category="' +
          escapeHtml(cat.id) +
          '" aria-pressed="' +
          String(active) +
          '">' +
          '<span class="filter-list__label">' +
          escapeHtml(cat.label) +
          "</span>" +
          '<span class="filter-list__count">' +
          count +
          "</span>" +
          "</button>" +
          "</li>"
        );
      }).join("");

      desktop.querySelectorAll(".filter-list__btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setCategory(btn.getAttribute("data-category"));
        });
      });
    }

    if (mobile) {
      mobile.innerHTML = CATEGORIES.map(function (cat) {
        var active = resultsState.category === cat.id;
        var count = counts[cat.id] != null ? counts[cat.id] : 0;
        return (
          '<button type="button" class="pill' +
          (active ? " pill--active" : "") +
          '" data-category="' +
          escapeHtml(cat.id) +
          '" aria-pressed="' +
          String(active) +
          '">' +
          escapeHtml(cat.shortLabel) +
          " (" +
          count +
          ")" +
          "</button>"
        );
      }).join("");

      mobile.querySelectorAll(".pill").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setCategory(btn.getAttribute("data-category"));
        });
      });
    }
  }

  function renderResultCards(docs) {
    var grid = document.getElementById("results-grid");
    if (!grid) return;

    if (!docs.length) {
      grid.innerHTML = "";
      grid.hidden = true;
      return;
    }

    grid.hidden = false;
    grid.innerHTML = docs
      .map(function (doc) {
        return isHof(doc) ? renderHofCard(doc) : renderStandardCard(doc);
      })
      .join("");

    grid.querySelectorAll(".result-card__link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  function renderHofCard(doc) {
    var title = escapeHtml(doc.title);
    var excerpt = escapeHtml(doc.excerpt || "");
    var team = escapeHtml(doc.teamBadge || doc.team || "Hall of Fame");
    var year = doc.inductionYear
      ? escapeHtml(String(doc.inductionYear))
      : "";
    /* Prototype: keep mock Umbraco path on data-url; # avoids local 404s */
    var mockUrl = escapeHtml(doc.url || "");
    var avatar = doc.image
      ? '<img class="result-card__photo" src="' +
        escapeHtml(doc.image) +
        '" alt="" width="96" height="96">'
      : '<span class="result-card__initials" aria-hidden="true">' +
        initials(doc.title) +
        "</span>";

    return (
      '<article class="result-card result-card--hof" role="listitem">' +
      '<a class="result-card__link" href="#"' +
      (mockUrl ? ' data-url="' + mockUrl + '"' : "") +
      ' aria-label="' +
      title +
      ' (prototype link)">' +
      '<div class="result-card__media" aria-hidden="true">' +
      avatar +
      "</div>" +
      '<div class="result-card__body">' +
      '<div class="result-card__meta-row">' +
      '<span class="result-card__tag result-card__tag--hof">Hall of Famer</span>' +
      (year
        ? '<span class="result-card__year">Class of ' + year + "</span>"
        : "") +
      "</div>" +
      '<h2 class="result-card__title">' +
      title +
      "</h2>" +
      '<p class="result-card__team"><span class="result-card__badge">' +
      team +
      "</span></p>" +
      (excerpt
        ? '<p class="result-card__excerpt">' + excerpt + "</p>"
        : "") +
      "</div>" +
      "</a>" +
      "</article>"
    );
  }

  function renderStandardCard(doc) {
    var title = escapeHtml(doc.title);
    var excerpt = escapeHtml(doc.excerpt || "");
    var cat = escapeHtml(categoryLabel(doc));
    var date = formatDate(doc.date);
    var mockUrl = escapeHtml(doc.url || "");

    return (
      '<article class="result-card result-card--standard" role="listitem">' +
      '<a class="result-card__link" href="#"' +
      (mockUrl ? ' data-url="' + mockUrl + '"' : "") +
      ' aria-label="' +
      title +
      ' (prototype link)">' +
      '<div class="result-card__body">' +
      '<div class="result-card__meta-row">' +
      '<span class="result-card__tag">' +
      cat +
      "</span>" +
      (date
        ? '<time class="result-card__date" datetime="' +
          escapeHtml(doc.date || "") +
          '">' +
          escapeHtml(date) +
          "</time>"
        : "") +
      "</div>" +
      '<h2 class="result-card__title">' +
      title +
      "</h2>" +
      (excerpt
        ? '<p class="result-card__excerpt">' + excerpt + "</p>"
        : "") +
      "</div>" +
      '<span class="result-card__chevron" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>' +
      "</span>" +
      "</a>" +
      "</article>"
    );
  }

  function renderEmptyState(query, totalMatches, visibleCount, category) {
    var empty = document.getElementById("no-results");
    var titleEl = document.getElementById("empty-title");
    var bodyEl = document.getElementById("empty-body");
    if (!empty) return;

    var showEmpty = visibleCount === 0;
    empty.hidden = !showEmpty;

    if (!showEmpty) return;

    if (totalMatches === 0 && query) {
      if (titleEl) titleEl.textContent = "No results found";
      if (bodyEl) {
        bodyEl.textContent =
          "We couldn’t find matches for “" +
          query +
          "”. Try another term, or explore popular searches below.";
      }
    } else if (totalMatches > 0 && visibleCount === 0 && category !== "all") {
      if (titleEl) titleEl.textContent = "No results in this category";
      if (bodyEl) {
        bodyEl.textContent =
          "There are " +
          totalMatches +
          " result" +
          (totalMatches === 1 ? "" : "s") +
          " for “" +
          (query || "your search") +
          "”, but none in " +
          categoryFilterLabel(category) +
          ". Try All Results or another category.";
      }
    } else {
      if (titleEl) titleEl.textContent = "No results found";
      if (bodyEl) {
        bodyEl.textContent =
          "Try a search above, or explore popular searches below.";
      }
    }
  }

  /* Prefetch index for snappier typeahead */
  loadSearchIndex();

  /* Results page (Steps 4–7) */
  initResultsPage();

  /* Home CTA: focus hours-bar search */
  var trySearchCta = document.getElementById("cta-try-search");
  if (trySearchCta) {
    trySearchCta.addEventListener("click", function () {
      var input = document.querySelector(".search-bar--hours .search-bar__input");
      if (input) {
        input.focus();
      }
    });
  }
})();
