/* ==========================================================
   LAKDIVA TEX – product list
   Add a product = copy one block, change the details, save.
   (Items below: the blouse and crop tee use your real photos; names/prices/sizes
   are still samples – replace them with your own.)

   Fields
   id        unique code, no spaces            e.g. "TRS-001"
   name      product name
   category  one of: trousers | blouses | crop-tops | skirts
   price     number only (currency comes from config.js)
   sizes     list of sizes you offer
   colors    list of { name, hex }
   image     photo path inside /assets/products/  (leave "" to use the
             built-in illustration until your photo is ready)
   badge     optional small label: "New", "Best seller", ""
   fabric    short fabric note
   fit       short fit note
   blurb     one or two lines shown on the product page
   ========================================================== */
window.LAKDIVA_CATEGORIES = [
  { id: "all",       label: "All" },
  { id: "trousers",  label: "Trousers" },
  { id: "blouses",   label: "Blouses" },
  { id: "crop-tops", label: "Crop Tops" },
  { id: "skirts",    label: "Skirts" }
];

window.LAKDIVA_PRODUCTS = [
  {
    id: "TRS-001",
    name: "High-Waist Wide-Leg Trousers",
    category: "trousers",
    price: 4500,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Sage", hex: "#9fb59a" }, { name: "Black", hex: "#1f2447" }, { name: "Cream", hex: "#f1e8d8" }],
    image: "",
    badge: "New",
    fabric: "Soft linen-cotton blend",
    fit: "High waist, relaxed wide leg",
    blurb: "Easy, breathable trousers that dress up or down."
  },
  {
    id: "BLS-001",
    name: "Puff-Sleeve Blouse",
    category: "blouses",
    price: 3200,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Mustard", hex: "#eba705" }],
    image: "assets/products/blouse-mustard.webp",
    badge: "New",
    fabric: "",
    fit: "Square neck, ruched bodice, full sleeves",
    blurb: "Square neckline, ruched bodice and soft, full sleeves."
  },
  {
    id: "CRP-001",
    name: "Boxy Crop Tee",
    category: "crop-tops",
    price: 2200,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Taupe", hex: "#a49a8e" }],
    image: "assets/products/crop-tee-taupe.webp",
    badge: "New",
    fabric: "",
    fit: "Relaxed drop-shoulder, cropped hem",
    blurb: "A relaxed drop-shoulder fit with a clean, cropped hem."
  },
  {
    id: "SKT-001",
    name: "Pleated Midi Skirt",
    category: "skirts",
    price: 3800,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Lavender", hex: "#cfc2ff" }, { name: "Navy", hex: "#1f2447" }],
    image: "",
    badge: "New",
    fabric: "Flowy pleated crepe",
    fit: "Elastic waist, midi length",
    blurb: "Flowing pleats that move beautifully."
  }
];
