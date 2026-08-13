(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  function closeAll() {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-item.has-mega.open").forEach(function (el) {
      el.classList.remove("open");
    });
    document.querySelectorAll(".mega-toggle").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function openDrawer() {
    links.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    if (links.classList.contains("open")) closeAll();
    else openDrawer();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  document.querySelectorAll(".mega-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var item = btn.closest(".nav-item.has-mega");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".nav-item.has-mega.open").forEach(function (el) {
        el.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Desktop mega menu: hover-intent with a short close delay so moving the
  // cursor diagonally from the trigger into the panel doesn't flicker-close it.
  var isDesktop = function () {
    return window.matchMedia("(min-width: 901px)").matches;
  };
  document.querySelectorAll(".nav-item.has-mega").forEach(function (item) {
    var closeTimer = null;
    item.addEventListener("mouseenter", function () {
      if (!isDesktop()) return;
      clearTimeout(closeTimer);
      item.classList.add("open");
    });
    item.addEventListener("mouseleave", function () {
      if (!isDesktop()) return;
      closeTimer = setTimeout(function () {
        item.classList.remove("open");
      }, 250);
    });
  });

  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!isDesktop()) closeAll();
    });
  });

  // Reset drawer/mega state whenever the layout crosses the mobile<->desktop
  // breakpoint (e.g. a mega menu left open by hover, then the window is
  // resized down before the mouse ever leaves it) so nothing gets stuck.
  var breakpoint = window.matchMedia("(max-width: 900px)");
  var onBreakpointChange = function () {
    closeAll();
  };
  if (breakpoint.addEventListener) breakpoint.addEventListener("change", onBreakpointChange);
  else if (breakpoint.addListener) breakpoint.addListener(onBreakpointChange);

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var wrap = document.getElementById("contact-form-wrap");
      var success = document.getElementById("contact-success");
      if (wrap) wrap.hidden = true;
      if (success) success.hidden = false;
      if (success) success.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
