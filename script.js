// Tukul AfroFood — Website-Entwurf
// Minimales Vanilla-JS: mobiles Menü, aktuelles Jahr, Kontaktformular-Demo (nicht funktional)

(function () {
  "use strict";

  /* Mobiles Menü öffnen/schließen */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    // Menü schließen, sobald ein Link angeklickt wird (mobile Anker-Navigation)
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  /* Aktuelles Jahr im Footer */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Kontaktformular: rein clientseitige Demo, keine echte Übertragung */
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      formStatus.textContent =
        "Dies ist ein Website-Entwurf – das Formular sendet aktuell noch keine echten Nachrichten.";
    });
  }
})();
