/* ==========================================================
   LAKDIVA TEX – shop
   Builds the product cards from data/products.js, handles the
   category filters, and the product pop-up (colour + size pick,
   with an "Order on WhatsApp" button for that item).
   You normally never need to edit this file –
   change products in data/products.js instead.
   ========================================================== */
(function () {
  'use strict';

  var cfg = window.LAKDIVA_CONFIG || {};
  var cats = window.LAKDIVA_CATEGORIES || [];
  var products = window.LAKDIVA_PRODUCTS || [];
  var ORDER = window.LAKDIVA_ORDER;

  var grid = document.getElementById('product-grid');
  var filterBox = document.getElementById('shop-filters');
  var countEl = document.getElementById('shop-count');
  var dlg = document.getElementById('product-dialog');
  if (!grid || !filterBox || !ORDER) return;

  var current = 'all';
  var SYMBOL = { 'trousers': 'g-trousers', 'blouses': 'g-blouse', 'crop-tops': 'g-crop-tops', 'skirts': 'g-skirts' };
  var labels = {};
  cats.forEach(function (c) { labels[c.id] = c.label; });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Make a hex colour darker (amt < 0) – used to tint the built-in illustrations
  function shade(hex, amt) {
    var h = String(hex || '#999999').replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    var ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
      var v = amt < 0 ? c * (1 + amt) : c + (255 - c) * amt;
      return ('0' + Math.max(0, Math.min(255, Math.round(v))).toString(16)).slice(-2);
    });
    return '#' + ch.join('');
  }

  function artHTML(p) {
    var base = (p.colors && p.colors[0] && p.colors[0].hex) || '#a49a8e';
    return '<svg class="card__art" style="--g1:' + base + ';--g2:' + shade(base, -0.22) + '" aria-hidden="true"><use href="#' + (SYMBOL[p.category] || 'g-blouse') + '"/></svg>';
  }

  function mediaHTML(p, alt) {
    if (p.image) {
      return '<img src="' + esc(p.image) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">';
    }
    return artHTML(p);
  }

  function sizesText(p) {
    var s = p.sizes || [];
    if (!s.length) return '';
    return s.length > 5 ? s[0] + ' – ' + s[s.length - 1] : s.join(' · ');
  }

  /* ---------- filters ---------- */
  function countIn(cat) {
    return cat === 'all' ? products.length : products.filter(function (p) { return p.category === cat; }).length;
  }

  function renderChips() {
    filterBox.innerHTML = cats.map(function (c) {
      return '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="' + (c.id === current) + '">' +
        esc(c.label) + ' <small>' + countIn(c.id) + '</small></button>';
    }).join('');
  }

  function setFilter(cat) {
    if (!labels[cat]) cat = 'all';
    current = cat;
    renderChips();
    renderGrid();
  }

  /* ---------- grid ---------- */
  function cardHTML(p) {
    var colors = (p.colors || []).slice(0, 4).map(function (c) {
      return '<i style="--c:' + esc(c.hex) + '"></i>';
    }).join('');
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card__media tint-' + esc(p.category) + '">' +
        (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') +
        mediaHTML(p, '') +
      '</div>' +
      '<div class="card__body">' +
        '<span class="card__cat">' + esc(labels[p.category] || '') + '</span>' +
        '<h3 class="card__name">' + esc(p.name) + '</h3>' +
        '<p class="card__price">' + ORDER.money(p.price) + '</p>' +
        '<div class="card__meta"><span class="card__sizes">' + esc(sizesText(p)) + '</span>' +
        '<span class="dots" aria-hidden="true">' + colors + '</span></div>' +
      '</div>' +
      '<button type="button" class="card__open" aria-haspopup="dialog">' +
        '<span class="sr-only">View details: ' + esc(p.name) + ', ' + esc(ORDER.money(p.price)) + '</span></button>' +
    '</article>';
  }

  function renderGrid() {
    var list = products.filter(function (p) { return current === 'all' || p.category === current; });

    if (!list.length) {
      var wa = 'https://wa.me/' + (cfg.whatsappNumber || '') + '?text=' + encodeURIComponent(cfg.enquiryGreeting || '');
      grid.innerHTML = '<p class="shop__empty">New styles in this category are coming soon. ' +
        '<a href="' + wa + '" target="_blank" rel="noopener"><strong>Ask us on WhatsApp</strong></a></p>';
      countEl.textContent = '';
      return;
    }
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.textContent = 'Showing ' + list.length + (list.length === 1 ? ' style' : ' styles') +
      (current === 'all' ? '' : ' in ' + labels[current]);
  }

  filterBox.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (b) setFilter(b.getAttribute('data-cat'));
  });

  // Menu links and hero tiles: <a href="#shop" data-category="skirts">
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-category]');
    if (a) setFilter(a.getAttribute('data-category'));
  });

  /* ---------- product pop-up ---------- */
  var pd = {};
  ['media', 'cat', 'title', 'price', 'blurb', 'specs', 'colors', 'colors-wrap', 'color-name', 'sizes', 'error', 'order', 'qty', 'minus', 'plus', 'add']
    .forEach(function (k) { pd[k] = document.getElementById('pd-' + k); });
  var sel = { product: null, size: '', color: '', qty: 1 };
  var MAX_QTY = 20;

  function updateOrderLink() {
    var p = sel.product;
    pd.order.href = sel.size
      ? ORDER.waLink([{ id: p.id, name: p.name, size: sel.size, color: sel.color, qty: sel.qty, price: p.price }])
      : '#';
  }

  function setQty(n) {
    sel.qty = Math.max(1, Math.min(MAX_QTY, n));
    pd.qty.textContent = sel.qty;
    pd.minus.disabled = sel.qty <= 1;
    pd.plus.disabled = sel.qty >= MAX_QTY;
    if (sel.product) updateOrderLink();
  }

  function needSize() {
    pd.error.hidden = false;
    var first = pd.sizes.querySelector('input');
    if (first) first.focus();
  }

  function openProduct(id) {
    var p = products.filter(function (x) { return x.id === id; })[0];
    if (!p || !dlg || !dlg.showModal) return;
    var colors = p.colors || [];
    var sizes = p.sizes || [];
    sel = { product: p, size: sizes.length === 1 ? sizes[0] : '', color: colors.length ? colors[0].name : '', qty: 1 };
    setQty(1);

    pd.media.className = 'pdialog__media tint-' + p.category;
    pd.media.innerHTML = mediaHTML(p, p.name + (sel.color ? ' in ' + sel.color : ''));
    pd.cat.textContent = labels[p.category] || '';
    pd.title.textContent = p.name;
    pd.price.textContent = ORDER.money(p.price);
    pd.blurb.textContent = p.blurb || '';
    pd.blurb.hidden = !p.blurb;

    var rows = [];
    if (p.fabric) rows.push(['Fabric', p.fabric]);
    if (p.fit) rows.push(['Fit', p.fit]);
    rows.push(['Code', p.id]);
    pd.specs.innerHTML = rows.map(function (r) {
      return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
    }).join('');

    pd['colors-wrap'].hidden = !colors.length;
    pd['color-name'].textContent = sel.color;
    pd.colors.innerHTML = colors.map(function (c, i) {
      return '<label class="swatch"><input type="radio" name="pd-color" value="' + esc(c.name) + '"' + (i === 0 ? ' checked' : '') + '>' +
        '<span style="--c:' + esc(c.hex) + '"></span><span class="sr-only">' + esc(c.name) + '</span></label>';
    }).join('');

    pd.sizes.innerHTML = sizes.map(function (s) {
      return '<label class="size"><input type="radio" name="pd-size" value="' + esc(s) + '"' + (s === sel.size ? ' checked' : '') + '>' +
        '<span>' + esc(s) + '</span></label>';
    }).join('');

    pd.error.hidden = true;
    updateOrderLink();
    document.body.classList.add('has-dialog');
    dlg.showModal();
    dlg.scrollTop = 0;
    dlg.focus();   // start at the top of the pop-up, not on the close button
  }

  if (dlg) {
    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.card__open');
      if (btn) openProduct(btn.closest('.card').getAttribute('data-id'));
    });

    dlg.addEventListener('change', function (e) {
      if (e.target.name === 'pd-color') {
        sel.color = e.target.value;
        pd['color-name'].textContent = sel.color;
      } else if (e.target.name === 'pd-size') {
        sel.size = e.target.value;
        pd.error.hidden = true;
      }
      updateOrderLink();
    });

    pd.minus.addEventListener('click', function () { setQty(sel.qty - 1); });
    pd.plus.addEventListener('click', function () { setQty(sel.qty + 1); });

    // Single item straight to WhatsApp
    pd.order.addEventListener('click', function (e) {
      if (!sel.size) { e.preventDefault(); needSize(); }
    });

    // Add to the basket (several items, one WhatsApp message)
    pd.add.addEventListener('click', function () {
      if (!sel.size) { needSize(); return; }
      if (!window.LAKDIVA_BASKET) return;
      window.LAKDIVA_BASKET.add({ id: sel.product.id, size: sel.size, color: sel.color, qty: sel.qty });
      dlg.close();
    });

    dlg.addEventListener('click', function (e) {
      // the close button, or a click on the dark area outside the pop-up
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
    dlg.addEventListener('close', function () {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-dialog');
    });
  }

  // Shared with js/basket.js
  window.LAKDIVA_SHOP = { setFilter: setFilter, esc: esc, mediaHTML: mediaHTML, labels: labels };
  setFilter('all');
})();
