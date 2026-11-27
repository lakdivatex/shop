/* ==========================================================
   LAKDIVA TEX – built-in garment illustrations
   Used as the stand-in picture on product cards (Step 3) until you
   add a real photo for that product. Each garment is a reusable <symbol>:

     <svg class="garment"><use href="#g-trousers"/></svg>

   Colours can be changed per item with CSS variables:
     style="--g1:#7ea0c9; --g2:#5b84b6"   (g1 = main colour, g2 = trim)
   ========================================================== */
(function () {
  // Pleats for the skirt are generated, not hand-drawn
  var tops = [74, 83.5, 92, 100, 108, 116.5, 126];
  var pleats = tops.map(function (x, i) {
    var bottom = 100 + (x - 100) * 2.19;
    var stroke = i % 2 ? 'stroke="#000" stroke-opacity=".08"' : 'stroke="#fff" stroke-opacity=".4"';
    return '<path d="M' + x + ' 36 L' + bottom.toFixed(1) + ' 230" ' + stroke + ' stroke-width="3" stroke-linecap="round"/>';
  }).join('');

  var sprite =
    '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +

    /* ---- Trousers (high-waist, wide leg) ---- */
    '<symbol id="g-trousers" viewBox="30 14 140 226">' +
      '<path fill="var(--g1,#7ea0c9)" d="M58 38h84l16 182q1 10-9 10h-38q-8 0-8.5-8L100 120l-2.500 102q-.5 8-8.500 8H51q-10 0-9-10Z"/>' +
      '<path d="M72 84 64 226M128 84l8 142" stroke="#fff" stroke-opacity=".38" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<path d="M58 52q18 14 22 38M142 52q-18 14-22 38M100 40v38" stroke="var(--g2,#5b84b6)" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<rect x="56" y="22" width="88" height="18" rx="7" fill="var(--g2,#5b84b6)"/>' +
      '<rect x="68" y="19" width="7" height="24" rx="3.500" fill="var(--g2,#5b84b6)"/>' +
      '<rect x="125" y="19" width="7" height="24" rx="3.500" fill="var(--g2,#5b84b6)"/>' +
      '<circle cx="100" cy="31" r="3.500" fill="#fff"/>' +
    '</symbol>' +

    /* ---- Blouse (puff sleeves, V-neck) ---- */
    '<symbol id="g-blouse" viewBox="10 14 180 192">' +
      '<path fill="var(--g1,#eba705)" d="M72 34 92 28l8 28 8-28 20 6 14 148q1 12-10 12H68q-11 0-10-12Z"/>' +
      '<path fill="var(--g1,#eba705)" d="M72 34C44 32 14 54 22 92c10 8 30 8 40 2l2-38Z"/>' +
      '<path fill="var(--g1,#eba705)" d="M128 34c28-2 58 20 50 58-10 8-30 8-40 2l-2-38Z"/>' +
      '<path d="M38 50q-4 24-2 42M52 48q-2 24 0 46M162 50q4 24 2 42M148 48q2 24 0 46" stroke="#fff" stroke-opacity=".38" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<path d="M23 94c10 9 29 9 39 2M177 94c-10 9-29 9-39 2" stroke="var(--g2,#c48600)" stroke-width="6" stroke-linecap="round" fill="none"/>' +
      '<path d="M92 28l8 28 8-28Z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M92 28 84 44l16 12ZM108 28l8 16-16 12Z" fill="var(--g2,#c48600)"/>' +
      '<path d="M100 58v138" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/>' +
      '<g fill="#fff"><circle cx="100" cy="82" r="3"/><circle cx="100" cy="110" r="3"/><circle cx="100" cy="138" r="3"/><circle cx="100" cy="166" r="3"/></g>' +
    '</symbol>' +

    /* ---- Crop top (short sleeve, scoop neck, ribbed) ---- */
    '<symbol id="g-crop-tops" viewBox="26 20 148 108">' +
      '<path fill="var(--g1,#a49a8e)" d="M72 34q28 34 56 0l8 78q1 10-10 10H74q-11 0-10-10Z"/>' +
      '<path fill="var(--g1,#a49a8e)" d="M74 32 44 46 34 78q14 7 27 2l9-22ZM126 32l30 14 10 32q-14 7-27 2l-9-22Z"/>' +
      '<path d="M80 62v54M90 70v50M100 74v46M110 70v50M120 62v54" stroke="#fff" stroke-opacity=".4" stroke-width="2.500" stroke-linecap="round" fill="none"/>' +
      '<path d="M72 34q28 34 56 0" stroke="var(--g2,#7d7368)" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M35 77q13 6 26 2M165 77q-13 6-26 2" stroke="var(--g2,#7d7368)" stroke-width="5" stroke-linecap="round" fill="none"/>' +
    '</symbol>' +

    /* ---- Skirt (pleated midi) ---- */
    '<symbol id="g-skirts" viewBox="22 12 156 232">' +
      '<path fill="var(--g1,#c9a9a0)" d="M68 34h64l38 192q1 8-8 8H38q-9 0-8-8Z"/>' +
      pleats +
      '<rect x="66" y="20" width="68" height="16" rx="6" fill="var(--g2,#a98479)"/>' +
      '<circle cx="100" cy="28" r="3.200" fill="#fff"/>' +
    '</symbol>' +

    '</defs></svg>';

  function inject() {
    var holder = document.createElement('div');
    holder.innerHTML = sprite;
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }
  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);

  // Default colours for each category (used by product cards in Step 3)
  window.LAKDIVA_ART = {
    colors: {
      'trousers':  { g1: '#7ea0c9', g2: '#5b84b6' },
      'blouses':   { g1: '#eba705', g2: '#c48600' },
      'crop-tops': { g1: '#a49a8e', g2: '#7d7368' },
      'skirts':    { g1: '#c9a9a0', g2: '#a98479' }
    }
  };
})();
