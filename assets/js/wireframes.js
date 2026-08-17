/**
 * CFHF Happenings — Wireframe Board
 * Toggles Desktop/Mobile variants per wireframe.
 */
(function () {
  "use strict";

  document.querySelectorAll(".wf-toggles").forEach(function (group) {
    var section = group.closest(".wf-section");
    if (!section) return;

    var btns = group.querySelectorAll(".wf-toggle-btn");
    var variants = section.querySelectorAll(".wf-variant");

    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var variant = btn.getAttribute("data-variant");

        btns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        variants.forEach(function (v) {
          var active = v.getAttribute("data-variant") === variant;
          v.classList.toggle("is-active", active);
          if (active) {
            v.removeAttribute("hidden");
          } else {
            v.setAttribute("hidden", "");
          }
        });
      });
    });
  });
})();
