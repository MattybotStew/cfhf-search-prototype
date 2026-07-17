/**
 * CFHF Search Prototype — homepage carousel
 */
(function () {
  "use strict";

  var root = document.querySelector("[data-hero-carousel]");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
  var dots = Array.prototype.slice.call(root.querySelectorAll("[data-hero-dot]"));
  var prevBtn = root.querySelector("[data-hero-prev]");
  var nextBtn = root.querySelector("[data-hero-next]");
  var index = 0;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (slide, n) {
      var active = n === index;
      slide.classList.toggle("is-active", active);
      if (active) {
        slide.removeAttribute("hidden");
      } else {
        slide.setAttribute("hidden", "");
      }
    });
    dots.forEach(function (dot, n) {
      var active = n === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function startAuto() {
    if (reduceMotion || slides.length < 2) return;
    stopAuto();
    timer = window.setInterval(next, 7000);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      startAuto();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var n = Number(dot.getAttribute("data-hero-dot"));
      if (!Number.isNaN(n)) {
        show(n);
        startAuto();
      }
    });
  });

  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);
  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget)) startAuto();
  });

  show(0);
  startAuto();
})();
