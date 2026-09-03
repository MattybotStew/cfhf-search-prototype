/**
 * CFHF Happenings — Wireframe Board + standalone pages
 * Desktop/Mobile variants, optional-module reflow, FAQ accordion.
 */
(function () {
  "use strict";

  function setPressed(btns, activeBtn) {
    btns.forEach(function (b) {
      var active = b === activeBtn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  }

  document.querySelectorAll(".wf-toggles").forEach(function (group) {
    var section = group.closest(".wf-section");
    if (!section) return;

    var btns = group.querySelectorAll(".wf-toggle-btn");
    var variants = section.querySelectorAll(".wf-variant");

    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var variant = btn.getAttribute("data-variant");
        setPressed(btns, btn);
        variants.forEach(function (v) {
          var active = v.getAttribute("data-variant") === variant;
          v.classList.toggle("is-active", active);
          if (active) v.removeAttribute("hidden");
          else v.setAttribute("hidden", "");
        });
      });
    });
  });

  function bindMods(root) {
    var demos = root.querySelectorAll(".wf-demo");
    if (!demos.length) return;

    root.querySelectorAll("[data-mod-key]").forEach(function (control) {
      var key = control.getAttribute("data-mod-key");
      var apply = function () {
        var value = control.type === "checkbox"
          ? (control.checked ? "on" : "off")
          : control.value;
        demos.forEach(function (demo) {
          demo.setAttribute("data-" + key, value);
        });
      };
      control.addEventListener("change", apply);
      apply();
    });
  }

  document.querySelectorAll(".wf-section").forEach(bindMods);
  document.querySelectorAll("body.wf-page, body.hp-page").forEach(bindMods);

  document.querySelectorAll(".wf-faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".wf-faq__item");
      if (!item) return;
      var open = !item.classList.contains("is-open");
      var list = item.parentElement;
      if (list) {
        list.querySelectorAll(".wf-faq__item").forEach(function (el) {
          el.classList.remove("is-open");
        });
      }
      item.classList.toggle("is-open", open);
    });
  });

  document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-scroll-to");
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

})();
