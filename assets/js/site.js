(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  var scrim = document.createElement("div");
  scrim.className = "nav-scrim";
  document.body.appendChild(scrim);

  function closeDrawer() {
    links.classList.remove("open");
    scrim.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-item.has-mega.open").forEach(function (el) {
      el.classList.remove("open");
    });
  }

  function openDrawer() {
    links.classList.add("open");
    scrim.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    if (links.classList.contains("open")) closeDrawer();
    else openDrawer();
  });

  scrim.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
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
      if (window.matchMedia("(max-width: 900px)").matches) closeDrawer();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeDrawer();
  });

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
