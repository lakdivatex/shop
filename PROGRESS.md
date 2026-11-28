# LAKDIVA TEX website – progress tracker

## Decisions (agreed / built in)
- Static site (HTML + CSS + vanilla JS), no build step -> works as-is on GitHub Pages
- No payments. Customers pick items and send the order to WhatsApp (wa.me link)
- Look (REVISED after owner's mockups): professional, not fancy. Warm off-white background, flat white cards, no glass/glow/gradients/floating animations. Layout follows the Frostpaw reference + owner's mockups: big headline, model cut-out photo centred over a tinted panel, category tiles at right
- Colours taken from the garments + logo: navy #1f2447 (text/buttons), mustard #eba705 (blouse), taupe #a49a8e (crop tee), denim #5b84b6; WhatsApp green only on order/chat buttons. Hero panel colour changes with the garment shown (mustard / taupe)
- Fonts: Anton (headlines) + Plus Jakarta Sans (body), loaded from Google Fonts
- Categories: Trousers, Blouses, Crop Tops, Skirts (women & girls)
- Prices shown as "Rs. 4500" style (change in js/config.js)
- Settings (WhatsApp number, contact info, currency) live ONLY in js/config.js
- Products live ONLY in data/products.js (sample items for now)
- Hero uses the owner's real photos (assets/products/blouse-mustard.webp, crop-tee-taupe.webp; transparent cut-outs) in a 2-slide carousel (js/hero.js: arrows, dots, 7s auto-advance, pauses on hover/focus, off for reduced-motion). Garment illustrations (js/art.js) are now only the fallback picture for products without a photo
- Hero wording (editable in index.html): "NEW SEASON COLLECTION", slide titles "Puff-sleeve blouse" / "Boxy crop tee" (descriptions only mention visible features), labels "XS – XL / Women & girls / Simple, on WhatsApp"
- Product data: BLS-001 (mustard blouse) and CRP-001 (taupe crop tee) now use the real photos; names/prices/sizes still samples; fabric left blank until owner provides it
- Menu links and category tiles point to #shop with data-category and filter the grid; header bag is a button that opens the basket drawer
- Cards: photo if product has `image`, else a built-in illustration tinted with the product's first colour; whole card opens the pop-up (native <dialog>)
- WhatsApp order message format: greeting, numbered items with code/size/colour/qty x price, total (config.orderGreeting), then optional "Name:" and "Notes:" lines
- Basket (Step 4): stored in the browser's localStorage (key lakdiva-basket-v1) as {id,size,color,qty} only; name/price are re-read from products.js so price changes apply. Same product+size+colour merges; max 20 per line. Customer name/address notes are NOT saved (privacy)
- Pop-up buttons: quantity stepper + "Add to order" (size required) and "Order this item on WhatsApp" (single item). After adding, a toast says "<name> added to your order" with a "View order" button (hides after 5s)
- Basket drawer slides in from the right (full width on phones): item rows with photo, size/colour, quantity +/-, Remove, total, optional name + notes, green "Send order on WhatsApp", two-tap "Clear basket" 

## Steps
- [x] Step 1 – Foundation: folder structure, logo (dark + white), favicon, design tokens, base + component CSS, config.js, products.js, styleguide.html, .nojekyll
- [x] Step 2 – Header (logo, centred menu pill, basket button, phone menu) + hero (big headline, hanging-garments rail, mint panel, glass labels, round CTA, category tiles). Revised once for owner's mockups/palette. Files: css/header.css, css/hero.css, js/hero.js, js/art.js, js/main.js. Removed old styleguide.html (outdated palette)
- [x] Step 3 – Shop: category chips (with counts) + product cards from data/products.js, hero/menu category links filter the grid, product pop-up with colour + size pick and a working single-item "Order on WhatsApp" button (size required). Files: css/shop.css, js/shop.js, js/order.js (price + WhatsApp message helpers, reused in Step 4)
- [x] Step 4 – Order basket: "Add to order" in the pop-up, header bag count, slide-in basket drawer (quantity, remove, total, optional name/notes), one "Send order on WhatsApp" button, saved between visits. Files: css/basket.css, js/basket.js; updated js/shop.js, js/order.js, index.html. Tested: add/merge/qty/remove/clear, message text, saved after reload, desktop + phone layouts
- [x] Step 5 – How to order (4 steps), About (draft wording + 2 photo tiles), Contact (details from config, WhatsApp button), navy footer (shop/help links, social icons, back to top), floating WhatsApp button. Files: css/sections.css (new); updated index.html, js/main.js. Tested: all WhatsApp links, anchors, footer category links, contact rows show/hide from config, desktop/tablet/phone layouts, floating button vs toast
- [x] Step 6 – Polish: accessibility (hero Pause/Play button, 44px tap areas, chip-count contrast), share preview (title/description, Open Graph + Twitter tags, 1200x630 share image, touch icon, PNG favicon), noscript message, balanced heading wraps, photos re-encoded ~45% smaller, floating WhatsApp button appears after the hero. Tested at 360/390/430/820/1280px: no horizontal overflow, no contrast failures, all flows pass
- [x] Step 7 – README.md: pre-launch checklist, folder map, everyday edits (config, products, photos, banner, About, logo/colours), GitHub Pages deploy (browser upload + Git), updating, quick phone test, troubleshooting, how it works. Verified: every file/setting named in the README exists; a clean copy loads with no missing files or JS errors; following the README to add a product / change number / contact works

## Decisions – Step 5
- Section order: Shop → How to order (sand band) → About → Contact (mustard-100 panel) → footer (navy). Menu pill unchanged (adding links would crowd 1021–1100px); About/Contact reached from footer + floating button
- Contact rows (phone, email, location, Instagram, Facebook) are filled from js/config.js `contact`; any empty value hides its row, social icons in the footer appear only when a link is set
- Floating WhatsApp button: pill with label on ≥701px, round icon on phones; the "added to order" toast moves up on phones so they never overlap; footer has extra bottom padding so the button never covers the last line
- About wording is a DRAFT written from what the owner told me (Sri Lankan brand; trousers/blouses/crop tops/skirts; WhatsApp ordering). "XS – XL" in About facts is the sample size range – update with real sizes
- Browser console shows a reminder while the WhatsApp number is still the placeholder

## Decisions – Step 6
- Hero autoplay kept (7s, pauses on hover/focus/hidden tab) plus a visible Pause/Play button (WCAG 2.2.2); button hidden for visitors who prefer reduced motion (autoplay is off for them)
- Share preview: og:image/twitter:image need a FULL web address. They contain the placeholder https://YOUR-USERNAME.github.io/lakdiva-tex/ in index.html (2 lines: og:image and twitter:image) – replace in Step 7 / once the site address is known. og:url and canonical left out on purpose (would also need the address). No JSON-LD (little value for a WhatsApp-only shop)
- Favicon changed from indigo gradient to flat navy (matches the professional palette); PNG favicon + apple-touch-icon added in assets/img/
- Product photos re-encoded to WebP q75 (blouse 236→142 KB, crop tee 93→45 KB), visually identical. Originals not kept in the project. Advice for real photos: ~1100px tall WebP/JPG under 200 KB each (README in Step 7)
- Floating WhatsApp button stays hidden while the hero is >50% on screen, so it never covers the hero/category tiles
- Test tools: Playwright driving the installed Chrome (real 360px viewport, clock control, keyboard) – replaces the old screenshot-only method

## Decisions – Step 7
- GitHub Pages policy flag: GitHub's docs say Pages is not allowed as free hosting to run an online business / e-commerce site or a site primarily facilitating commercial transactions. This site takes no payment but is a shop-window, so it is a grey area. Owner chose GitHub Pages, so the README gives the GitHub steps, states the risk plainly, and notes the same static files run on other free static hosts (only the share-preview address changes). Also: Pages on a free GitHub account needs a PUBLIC repository
- Deliberately NOT added: 404 page (relative paths break on nested URLs; single-page site), sitemap/robots/canonical (need the final address), build step (keeps the owner's edit-and-upload workflow)
- Pop-up "Order this item on WhatsApp" link is "#" until a size is chosen (clicking first shows the size message) – by design

## PROJECT STATUS: all 7 steps complete. Remaining items are the owner's content (see below)

## Needed from the owner (not blocking until the step shown)
- Step 2 (done): optional – confirm hero wording; more garment photos (transparent cut-outs work best) can become extra hero slides
- Step 3: real product photos, names, prices, sizes, colours (sample items used until then)
- Step 6/7: your GitHub Pages address (e.g. https://yourname.github.io/lakdiva-tex/) for the share preview image
- Step 5: real email, phone display, address/area, Instagram + Facebook links (sample email/phone currently show in Contact), and confirm/replace the About wording
- Step 4/5: real WhatsApp number (still the placeholder 94000000000 in js/config.js — orders won't reach you until it is changed) (digits only, e.g. 94771234567), email, address, Instagram/Facebook links
