/* ============================================================
   Tukul AfroFood — Seitenlogik
   Mobilmenü, Öffnungsstatus und laufender Tag. Montag bis Samstag
   gleiche Zeiten, sonntags Ruhetag — der einzige Fall, den der
   Status gesondert benennt.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var OPEN = 11.5, CLOSE = 19;

  function fmt(v) {
    var h = Math.floor(v), m = Math.round((v - h) * 60);
    return h + ':' + (m < 10 ? '0' + m : m);
  }

  var now = new Date();
  var day = now.getDay();
  var dec = now.getHours() + now.getMinutes() / 60;
  var isSunday = day === 0;
  var open = !isSunday && dec >= OPEN && dec < CLOSE;

  var label;
  if (open) {
    label = 'Jetzt geöffnet — bis ' + fmt(CLOSE) + ' Uhr';
  } else if (isSunday) {
    label = 'Sonntag ist Ruhetag — morgen wieder ab ' + fmt(OPEN) + ' Uhr';
  } else if (dec < OPEN) {
    label = 'Noch geschlossen — heute ab ' + fmt(OPEN) + ' Uhr';
  } else {
    label = day === 6
      ? 'Feierabend — Sonntag Ruhetag, am Montag wieder ab ' + fmt(OPEN) + ' Uhr'
      : 'Feierabend — morgen wieder ab ' + fmt(OPEN) + ' Uhr';
  }

  var badge = document.getElementById('statusBadge');
  var text = document.getElementById('statusText');
  if (badge && text) {
    badge.hidden = false;
    badge.classList.add(open ? 'is-open' : 'is-closed');
    text.textContent = label;
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = open ? 'offen bis ' + fmt(CLOSE) : isSunday ? 'Ruhetag' : 'gerade zu';
    if (open) headerStatus.classList.add('is-open');
  }

  var list = document.getElementById('hoursList');
  if (list) {
    var row = list.querySelector('[data-day="' + day + '"]');
    if (row) row.classList.add('is-today');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
