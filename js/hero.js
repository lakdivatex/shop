/* ==========================================================
   LAKDIVA TEX – hero slides
   Switches between the garment slides. Each slide has a
   data-theme ("mustard", "taupe"…) that recolours the panel.
   To add a slide: copy one <article class="hero-slide">, one
   <img class="hero__photo"> and one dot button in index.html,
   and add a matching theme in css/hero.css.
   ========================================================== */
(function () {
  'use strict';
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var slides = [].slice.call(hero.querySelectorAll('.hero-slide'));
  var photos = [].slice.call(hero.querySelectorAll('.hero__photo'));
  var dots = [].slice.call(hero.querySelectorAll('.hero__dot'));
  var prev = hero.querySelector('[data-hero-prev]');
  var next = hero.querySelector('[data-hero-next]');
  if (slides.length < 2) return;

  var pauseBtn = hero.querySelector('[data-hero-pause]');
  var current = 0;
  var timer = null;
  var userPaused = false;   // set by the visible Pause button
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      var on = i === current;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', String(!on));
      if (on) s.removeAttribute('inert'); else s.setAttribute('inert', '');
      if (photos[i]) photos[i].classList.toggle('is-active', on);
      if (dots[i]) dots[i].setAttribute('aria-current', String(on));
    });
    hero.setAttribute('data-theme', slides[current].getAttribute('data-theme') || '');
  }

  function start() {
    if (reduceMotion || userPaused || timer) return;
    timer = setInterval(function () { show(current + 1); }, 7000);
  }
  function stop() { clearInterval(timer); timer = null; }

  // After the visitor changes slide by hand, restart the timer so it doesn't flip straight away
  function go(n) { show(n); if (timer) { stop(); start(); } }
  if (prev) prev.addEventListener('click', function () { go(current - 1); });
  if (next) next.addEventListener('click', function () { go(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

  // Visible Pause / Play button (only shown when the slides move by themselves)
  if (pauseBtn && !reduceMotion) {
    pauseBtn.hidden = false;
    pauseBtn.addEventListener('click', function () {
      userPaused = !userPaused;
      pauseBtn.setAttribute('aria-pressed', String(userPaused));
      pauseBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
      if (userPaused) stop(); else start();
    });
  }

  // Pause while the visitor is hovering, using the keyboard, or on another tab
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  show(0);
  start();
})();
