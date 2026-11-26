/* ==========================================================
   LAKDIVA TEX – product list
   Add a product = copy one block, change the details, save.
   (Sample items below – replace names, prices and photos with your own.)

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
    colors: [{ name: "Blush", hex: "#f7b8cf" }, { name: "White", hex: "#ffffff" }],
    image: "",
    badge: "Best seller",
    fabric: "Light cotton poplin",
    fit: "Relaxed, gathered sleeves",
    blurb: "A soft, feminine blouse for work or weekends."
  },
  {
    id: "CRP-001",
    name: "Ribbed Crop Top",
    category: "crop-tops",
    price: 2200,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Peach", hex: "#ffc7a6" }, { name: "Lilac", hex: "#c9b8ff" }, { name: "Black", hex: "#1f2447" }],
    image: "",
    badge: "",
    fabric: "Stretch rib cotton",
    fit: "Fitted, cropped length",
    blurb: "Stretchy everyday crop top that pairs with anything."
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
