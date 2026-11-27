/* ==========================================================
   LAKDIVA TEX – order helpers
   Formats prices and builds the WhatsApp order message.
   (The basket in Step 4 uses the same helpers.)

   An order item looks like:
   { id: "BLS-001", name: "Puff-Sleeve Blouse", size: "M",
     color: "Mustard", qty: 1, price: 3200 }
   ========================================================== */
(function () {
  'use strict';
  var cfg = window.LAKDIVA_CONFIG || {};

  // 4500 -> "Rs. 4,500"  (currency comes from js/config.js)
  function money(n) {
    return (cfg.currency || '') + Number(n || 0).toLocaleString('en-US');
  }

  // extras (optional): { name: "Nimali", notes: "Deliver to Kandy" }
  function buildMessage(items, extras) {
    extras = extras || {};
    var total = 0;
    var lines = [cfg.orderGreeting || 'Hello! I would like to order:', ''];

    items.forEach(function (it, i) {
      var qty = it.qty || 1;
      var sub = (it.price || 0) * qty;
      total += sub;
      lines.push((i + 1) + ') ' + it.name + (it.id ? ' (' + it.id + ')' : ''));
      var opts = [];
      if (it.size) opts.push('Size: ' + it.size);
      if (it.color) opts.push('Colour: ' + it.color);
      if (opts.length) lines.push(opts.join(' | '));
      lines.push('Qty: ' + qty + ' x ' + money(it.price) + ' = ' + money(sub));
      lines.push('');
    });

    lines.push('Total: ' + money(total));

    var name = String(extras.name || '').trim();
    var notes = String(extras.notes || '').trim();
    if (name || notes) lines.push('');
    if (name) lines.push('Name: ' + name);
    if (notes) lines.push('Notes: ' + notes);
    return lines.join('\n');
  }

  function waLink(items, extras) {
    return 'https://wa.me/' + (cfg.whatsappNumber || '') + '?text=' + encodeURIComponent(buildMessage(items, extras));
  }

  window.LAKDIVA_ORDER = { money: money, buildMessage: buildMessage, waLink: waLink };
})();
