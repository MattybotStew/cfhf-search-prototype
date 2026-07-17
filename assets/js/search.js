/**
 * CFHF Search Prototype — search logic
 * Step 2: inline expand search + typeahead + filter wiring.
 */
(function () {
  "use strict";

  /* -------------------------------------------------- */
  /* 1. Mobile rail toggle (existing from Step 1)       */
  /* -------------------------------------------------- */
  const rail = document.querySelector(".site-rail");
  const railToggle = document.querySelector(".rail-toggle");

  if (railToggle && rail) {
    railToggle.addEventListener("click", function () {
      const isOpen = rail.classList.toggle("is-open");
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
  /* 2. Inline expand search                            */
  /* -------------------------------------------------- */
  const searchBars = document.querySelectorAll(".search-bar");

  searchBars.forEach(function (bar) {
    const trigger = bar.querySelector(".search-bar__trigger");
    const input = bar.querySelector(".search-bar__input");
    const closeBtn = bar.querySelector(".search-bar__close");

    if (!trigger || !input) return;

    /* Expand on icon click */
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isExpanded = bar.classList.contains("is-expanded");

      if (isExpanded) {
        /* Already expanded — submit search */
        submitSearch(input.value.trim());
      } else {
        /* Expand and focus */
        bar.classList.add("is-expanded");
        input.focus();
      }
    });

    /* Close button */
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        collapseSearchBar(bar, input);
      });
    }

    /* Submit on Enter */
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitSearch(input.value.trim());
      }
      if (e.key === "Escape") {
        collapseSearchBar(bar, input);
      }
    });

    /* Collapse on outside click */
    document.addEventListener("click", function (e) {
      if (!bar.contains(e.target)) {
        collapseSearchBar(bar, input);
      }
    });

    /* Populate from URL query param if on /search page */
    populateFromURL(input);

    /* Live typeahead (Step 3 hook — placeholder) */
    input.addEventListener("input", function () {
      /* Step 3 will wire predictive dropdown here */
    });
  });

  function collapseSearchBar(bar, input) {
    bar.classList.remove("is-expanded");
    input.blur();
  }

  function submitSearch(query) {
    if (!query) return;

    /* Determine if we're already on search.html */
    const isSearchPage =
      window.location.pathname.endsWith("search.html") ||
      window.location.pathname === "/search.html";

    if (isSearchPage) {
      /* Refresh with new query param */
      const url = new URL(window.location);
      url.searchParams.set("q", query);
      window.location.href = url.toString();
    } else {
      /* Navigate to search page */
      window.location.href = "search.html?q=" + encodeURIComponent(query);
    }
  }

  function populateFromURL(input) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q && input) {
      input.value = q;
      /* Auto-expand if there's a query */
      const bar = input.closest(".search-bar");
      if (bar) {
        bar.classList.add("is-expanded");
      }
      /* Update hero display */
      updateSearchHero(q);
    }
  }

  function updateSearchHero(query) {
    const queryEl = document.getElementById("search-query");
    if (queryEl) {
      queryEl.textContent = "\u201C" + query + "\u201D";
    }

    /* Step 5+ will compute real count; placeholder for now */
    const countEl = document.getElementById("search-count");
    if (countEl) {
      countEl.textContent = "\u00B7 18 results";
    }
  }
})();