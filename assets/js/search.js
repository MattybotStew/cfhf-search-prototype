/**
 * CFHF Search Prototype — search logic
 * Step 2: inline expand search
 * Step 3: predictive dropdown from data/search-index.json
 */
(function () {
  "use strict";

  var INDEX_URL = "data/search-index.json";
  var MAX_SUGGESTIONS = 8;
  var searchIndex = null;
  var indexPromise = null;

  /* -------------------------------------------------- */
  /* 1. Mobile rail toggle                              */
  /* -------------------------------------------------- */
  var rail = document.querySelector(".site-rail");
  var railToggle = document.querySelector(".rail-toggle");

  if (railToggle && rail) {
    railToggle.addEventListener("click", function () {
      var isOpen = rail.classList.toggle("is-open");
      railToggle.setAttribute("aria-expanded", String(isOpen));
      railToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", function (e) {
      if (
        rail.classList.contains("is-open") &&
        !rail.contains(e.target) &&
        !railToggle.contains(e.target)
      ) {
        rail.classList.remove("is-open");
        railToggle.setAttribute("aria-expanded", "false");
        railToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* -------------------------------------------------- */
  /* 2–3. Inline expand search + predictive dropdown    */
  /* -------------------------------------------------- */
  var searchSlots = document.querySelectorAll(".rail-search-slot");

  searchSlots.forEach(function (slot) {
    var bar = slot.querySelector(".search-bar");
    if (!bar) return;

    var trigger = bar.querySelector(".search-bar__trigger");
    var input = bar.querySelector(".search-bar__input");
    var closeBtn = bar.querySelector(".search-bar__close");
    var suggestList =
      slot.querySelector(".search-suggest") ||
      document.getElementById("search-suggest");

    if (!trigger || !input) return;

    var activeIndex = -1;

    function setExpanded(expanded) {
      bar.classList.toggle("is-expanded", expanded);
      var listOpen = suggestList && !suggestList.hidden;
      input.setAttribute("aria-expanded", String(Boolean(expanded && listOpen)));
      if (expanded) {
        trigger.setAttribute("aria-label", "Submit search");
      } else {
        trigger.setAttribute("aria-label", "Open search");
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

    /* Expand on icon click; submit when already expanded */
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isExpanded = bar.classList.contains("is-expanded");

      if (isExpanded) {
        submitSearch(input.value.trim());
      } else {
        expandSearchBar();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        collapseSearchBar();
      });
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
        collapseSearchBar();
      }
    });

    document.addEventListener("click", function (e) {
      if (!slot.contains(e.target)) {
        collapseSearchBar();
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

  function matchDocuments(query) {
    var q = normalize(query);
    if (!q || !searchIndex) return [];

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

      if (score > 0) {
        scored.push({ doc: doc, score: score });
      }
    });

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.doc.title.localeCompare(b.doc.title);
    });

    return scored.slice(0, MAX_SUGGESTIONS).map(function (row) {
      return row.doc;
    });
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

  function categoryIconSvg(doc) {
    /* Simple stroke icons — tickets / news / events / page */
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

  function renderSuggestionItem(doc, index) {
    var id = "search-suggest-option-" + index;
    var query = escapeHtml(doc.title);
    var title = escapeHtml(doc.title);
    var hof = isHof(doc);

    if (hof) {
      var badge = escapeHtml(doc.teamBadge || doc.team || "Hall of Fame");
      var year = doc.inductionYear ? " · " + escapeHtml(String(doc.inductionYear)) : "";
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
      /* Ignore stale renders if the field changed */
      if (normalize(input.value) !== normalize(query)) return;

      var matches = matchDocuments(query);
      if (setActiveIndex) setActiveIndex(-1);
      input.removeAttribute("aria-activedescendant");

      if (!matches.length) {
        suggestList.innerHTML =
          '<li class="search-suggest__empty" role="presentation">No matching suggestions</li>';
        suggestList.hidden = false;
        input.setAttribute("aria-expanded", "true");
        return;
      }

      suggestList.innerHTML = matches
        .map(function (doc, i) {
          return renderSuggestionItem(doc, i);
        })
        .join("");
      suggestList.hidden = false;
      input.setAttribute("aria-expanded", "true");

      suggestList.querySelectorAll(".search-suggest__btn").forEach(function (btn) {
        btn.addEventListener("mousedown", function (e) {
          /* Prevent input blur before click registers */
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
    });
  }

  /* -------------------------------------------------- */
  /* Navigation helpers                                 */
  /* -------------------------------------------------- */
  function submitSearch(query) {
    if (!query) return;

    var onSearchPage =
      /(^|\/)search\.html$/.test(window.location.pathname) ||
      /\/search\/?$/.test(window.location.pathname);

    if (onSearchPage) {
      var url = new URL(window.location.href);
      url.searchParams.set("q", query);
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
      updateSearchHero(q);
    }
  }

  function updateSearchHero(query) {
    var queryEl = document.getElementById("search-query");
    if (queryEl) {
      queryEl.textContent = "\u201C" + query + "\u201D";
    }

    /* Step 5+ will compute real count; placeholder for now */
    var countEl = document.getElementById("search-count");
    if (countEl) {
      countEl.textContent = "\u00B7 18 results";
    }
  }

  /* Prefetch index for snappier typeahead */
  loadSearchIndex();
})();
