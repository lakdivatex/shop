/* ==========================================================
   LAKDIVA TEX – main script (header behaviour + WhatsApp links)
   Later steps add the shop and the order basket in their own files.
   ========================================================== */
(function () {
  'use strict';
  var cfg = window.LAKDIVA_CONFIG || {};

  /* ---------- WhatsApp links ----------
     Any <a data-wa> opens a chat with the number in js/config.js.
     Optional: data-wa-text="custom first message"                */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var text = a.getAttribute('data-wa-text') || cfg.enquiryGreeting || '';
    a.href = 'https://wa.me/' + (cfg.whatsappNumber || '') + (text ? '?text=' + encodeURIComponent(text) : '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Header ---------- */
  var header = document.querySelector('.site-header');
  if (!header) return;
  var toggle = header.querySelector('.nav-toggle');
  var nav = header.querySelector('.nav');

  // Soft glass background once the page is scrolled
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Phone menu
  function setMenu(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
    });
    // Close if the window grows to desktop size
    window.matchMedia('(min-width: 1021px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false);
    });
  }
})();
