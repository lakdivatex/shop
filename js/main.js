/* ==========================================================
   LAKDIVA TEX – main script (header behaviour, WhatsApp links, contact details)
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

  /* ---------- Contact details (from js/config.js) ----------
     Elements with data-contact="phone|email|address|instagram|facebook"
     are filled in. Rows with data-contact-row stay hidden when empty. */
  var c = cfg.contact || {};
  var digits = String(cfg.whatsappNumber || '').replace(/\D/g, '');
  var contactValues = {
    phone: c.phoneDisplay ? { text: c.phoneDisplay, href: 'tel:+' + digits } : null,
    email: c.email ? { text: c.email, href: 'mailto:' + c.email } : null,
    address: c.address ? { text: c.address } : null,
    instagram: c.instagram ? { href: c.instagram } : null,
    facebook: c.facebook ? { href: c.facebook } : null
  };
  Object.keys(contactValues).forEach(function (key) {
    var v = contactValues[key];
    if (!v) return;
    document.querySelectorAll('[data-contact="' + key + '"]').forEach(function (el) {
      if (v.text) el.textContent = v.text;
      if (v.href && el.tagName === 'A') el.href = v.href;
      el.hidden = false;
    });
    document.querySelectorAll('[data-contact-row="' + key + '"]').forEach(function (row) { row.hidden = false; });
  });
  // Footer social icons: show the group when at least one link is set
  document.querySelectorAll('[data-contact-row="social"]').forEach(function (g) {
    g.hidden = !(contactValues.instagram || contactValues.facebook);
  });

  /* ---------- Floating WhatsApp button ----------
     Stays out of the way while the hero is mostly on screen, then appears. */
  var floatBtn = document.querySelector('.wa-float');
  var heroEl = document.querySelector('.hero');
  if (floatBtn && heroEl && 'IntersectionObserver' in window) {
    floatBtn.classList.add('is-away');
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle('is-away', entries[0].intersectionRatio >= 0.5);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] }).observe(heroEl);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Reminder for the owner ---------- */
  if (!digits || /^940+$/.test(digits)) {
    console.warn('LAKDIVA TEX: the WhatsApp number in js/config.js is still the placeholder. Orders will not reach you until you change it.');
  }

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
