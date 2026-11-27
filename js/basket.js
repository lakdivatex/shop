/* ==========================================================
   LAKDIVA TEX – order basket
   - Customers add items from the product pop-up
   - The basket is a slide-out panel opened from the bag button
   - Items are remembered in the visitor's own browser, so the
     basket survives a page refresh (nothing is sent anywhere)
   - "Send order on WhatsApp" opens WhatsApp with the whole order
   ========================================================== */
(function () {
  'use strict';

  var products = window.LAKDIVA_PRODUCTS || [];
  var ORDER = window.LAKDIVA_ORDER;
  var SHOP = window.LAKDIVA_SHOP || {};
  var dlg = document.getElementById('basket-dialog');
  if (!dlg || !ORDER) return;

  var KEY = 'lakdiva-basket-v1';
  var MAX_QTY = 20;

  function $(id) { return document.getElementById(id); }
  var list = $('basket-list'), emptyEl = $('basket-empty'), foot = $('basket-foot');
  var totalEl = $('basket-total'), sendBtn = $('basket-send'), clearBtn = $('basket-clear');
  var nameIn = $('basket-name'), notesIn = $('basket-notes');
  var esc = SHOP.esc || function (s) { return String(s); };

  /* ---------- data ---------- */
  function find(id) {
    for (var i = 0; i < products.length; i++) if (products[i].id === id) return products[i];
    return null;
  }

  // Only { id, size, color, qty } is stored. Name and price are always read
  // from data/products.js, so price changes apply to saved baskets too.
  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (!Array.isArray(raw)) return [];
      return raw.filter(function (l) { return l && find(l.id); }).map(function (l) {
        return {
          id: String(l.id), size: String(l.size || ''), color: String(l.color || ''),
          qty: Math.min(MAX_QTY, Math.max(1, parseInt(l.qty, 10) || 1))
        };
      });
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) { /* private mode: basket just won't persist */ }
  }
  var lines = load();

  function sameLine(a, b) { return a.id === b.id && a.size === b.size && a.color === b.color; }
  function count() { return lines.reduce(function (n, l) { return n + l.qty; }, 0); }

  // Lines joined with current product info
  function items() {
    return lines.map(function (l) {
      var p = find(l.id);
      return { id: p.id, name: p.name, size: l.size, color: l.color, qty: l.qty, price: p.price, _p: p };
    });
  }

  /* ---------- toast ---------- */
  var toastEl = $('toast'), toastText = $('toast-text'), toastBtn = $('toast-action'), toastTimer;
  if (toastEl) { toastEl.hidden = false; toastEl.inert = true; }

  function hideToast() {
    if (!toastEl) return;
    toastEl.classList.remove('is-on');
    toastEl.inert = true;
  }
  function toast(msg, actionLabel, action) {
    if (!toastEl) return;
    toastText.textContent = msg;
    if (actionLabel) {
      toastBtn.hidden = false;
      toastBtn.textContent = actionLabel;
      toastBtn.onclick = function () { hideToast(); action(); };
    } else {
      toastBtn.hidden = true;
    }
    toastEl.inert = false;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 5000);
  }

  /* ---------- drawer open / close ---------- */
  function open() {
    if (dlg.open || !dlg.showModal) return;
    hideToast();
    render();
    document.body.classList.add('has-dialog');
    dlg.showModal();
    dlg.focus();
  }

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
  });
  dlg.addEventListener('close', function () {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-dialog');
  });
  document.querySelectorAll('[data-basket-btn]').forEach(function (b) { b.addEventListener('click', open); });
  $('basket-browse').addEventListener('click', function () {
    dlg.close();
    var shop = $('shop');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- render ---------- */
  function rowHTML(it, i) {
    var p = it._p;
    var opts = [it.size ? 'Size ' + it.size : '', it.color].filter(Boolean).join(' · ');
    return '<li class="bitem" data-i="' + i + '">' +
      '<div class="bitem__thumb tint-' + esc(p.category) + '">' + (SHOP.mediaHTML ? SHOP.mediaHTML(p, '') : '') + '</div>' +
      '<div class="bitem__info">' +
        '<p class="bitem__name">' + esc(p.name) + '</p>' +
        '<p class="bitem__opts">' + esc(opts) + '</p>' +
        '<div class="bitem__row">' +
          '<div class="qty" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
            '<button type="button" data-act="minus" aria-label="Decrease quantity"' + (it.qty <= 1 ? ' disabled' : '') + '>&minus;</button>' +
            '<output>' + it.qty + '</output>' +
            '<button type="button" data-act="plus" aria-label="Increase quantity"' + (it.qty >= MAX_QTY ? ' disabled' : '') + '>+</button>' +
          '</div>' +
          '<span class="bitem__price">' + esc(ORDER.money(it.price * it.qty)) + '</span>' +
        '</div>' +
        '<button type="button" class="bitem__remove" data-act="remove" aria-label="Remove ' + esc(p.name) + ' from order">Remove</button>' +
      '</div></li>';
  }

  function updateSendLink() {
    var its = items();
    sendBtn.href = its.length ? ORDER.waLink(its, { name: nameIn.value, notes: notesIn.value }) : '#';
  }

  function render() {
    var its = items();
    var n = count();

    // header bag button
    document.querySelectorAll('[data-basket-count]').forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
    document.querySelectorAll('[data-basket-btn]').forEach(function (b) {
      b.setAttribute('aria-label', n ? 'Open my order basket, ' + n + (n === 1 ? ' item' : ' items') : 'Open my order basket');
    });

    // drawer
    list.innerHTML = its.map(rowHTML).join('');
    list.hidden = !its.length;
    emptyEl.hidden = its.length > 0;
    foot.hidden = !its.length;
    totalEl.textContent = ORDER.money(its.reduce(function (t, it) { return t + it.price * it.qty; }, 0));
    updateSendLink();
  }

  /* ---------- changes ---------- */
  function add(item) {
    var line = {
      id: String(item.id), size: String(item.size || ''), color: String(item.color || ''),
      qty: Math.max(1, parseInt(item.qty, 10) || 1)
    };
    if (!find(line.id)) return;
    var existing = lines.filter(function (l) { return sameLine(l, line); })[0];
    if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + line.qty);
    else lines.push({ id: line.id, size: line.size, color: line.color, qty: Math.min(MAX_QTY, line.qty) });
    save();
    render();
    var p = find(line.id);
    toast(p.name + ' added to your order', 'View order', open);
  }

  list.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var row = btn.closest('.bitem');
    var i = parseInt(row.getAttribute('data-i'), 10);
    var act = btn.getAttribute('data-act');
    if (act === 'plus') lines[i].qty = Math.min(MAX_QTY, lines[i].qty + 1);
    if (act === 'minus') lines[i].qty = Math.max(1, lines[i].qty - 1);
    if (act === 'remove') lines.splice(i, 1);
    save();
    render();

    // keep keyboard focus somewhere sensible after the list is redrawn
    var next = act === 'remove'
      ? (list.querySelector('.bitem__remove') || dlg)
      : list.querySelector('.bitem[data-i="' + i + '"] button[data-act="' + act + '"]:not(:disabled)') ||
        list.querySelector('.bitem[data-i="' + i + '"] button[data-act]');
    if (next) next.focus();
  });

  nameIn.addEventListener('input', updateSendLink);
  notesIn.addEventListener('input', updateSendLink);

  // "Clear basket" asks for a second tap so it can't be pressed by accident
  var clearTimer;
  function disarm() { clearBtn.textContent = 'Clear basket'; clearBtn.classList.remove('is-armed'); }
  clearBtn.addEventListener('click', function () {
    if (!clearBtn.classList.contains('is-armed')) {
      clearBtn.textContent = 'Tap again to clear everything';
      clearBtn.classList.add('is-armed');
      clearTimeout(clearTimer);
      clearTimer = setTimeout(disarm, 3500);
      return;
    }
    clearTimeout(clearTimer);
    disarm();
    lines = [];
    save();
    render();
    var browse = $('basket-browse');
    if (browse) browse.focus();
  });

  window.LAKDIVA_BASKET = { add: add, count: count, open: open, items: items };
  render();
})();
