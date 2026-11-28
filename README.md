# LAKDIVA TEX Clothing – website

A fast, clean shop-window website for trousers, blouses, crop tops and skirts.
Customers pick a size and colour, add items to an order, and **send the order to your WhatsApp**. There is no online payment, no account and no server – it is just plain HTML, CSS and JavaScript files.

---

## 1. Before you put it online – checklist

Tick these off first. Each one says where to change it (details in section 3).

- [ ] **WhatsApp number** – `js/config.js` → `whatsappNumber`. It is still the placeholder `94000000000`, so **orders will not reach you until you change it.**
- [ ] **Contact details** – `js/config.js` → `contact` (phone, email, location, Instagram, Facebook). The sample phone and email are visible on the site until you change them. Set a value to `""` to hide it.
- [ ] **Real products** – `data/products.js`. The four items are samples (names, prices, sizes, colours).
- [ ] **Real photos** – `assets/products/` (see 3.3).
- [ ] **Front-page banner** – the two featured items at the top are written in `index.html` (see 3.4).
- [ ] **About wording** and the size range "XS – XL" – `index.html` (search for `About us`, and for `XS` – it appears twice: the banner label and the About facts).
- [ ] **Share-preview address** – after the site is live, replace `https://YOUR-USERNAME.github.io/lakdiva-tex/` in `index.html` (2 lines: `og:image` and `twitter:image`).
- [ ] Place a **test order** to your own number (section 5).

---

## 2. What is in the folder

```
index.html            the page (front-page banner, About text, How to order, Contact, footer)
js/config.js          YOUR SETTINGS: WhatsApp number, contact details, message wording
data/products.js      YOUR PRODUCTS: names, prices, sizes, colours, photos
assets/products/      product photos
assets/logo.svg       logo (dark) · logo-white.svg is the footer version
assets/img/           share-preview picture, phone home-screen icon, small favicon
css/tokens.css        colours, fonts, spacing (change the whole look from here)
css/*.css, js/*.js    the design and behaviour – you normally never touch these
.nojekyll             tells GitHub to publish the files exactly as they are
```

---

## 3. Everyday edits

Open files in any text editor (Notepad works; VS Code is nicer). Keep the quotes `" "`, commas `,` and brackets exactly as they are – one missing comma can stop the product list loading.

### 3.1 WhatsApp and contact details – `js/config.js`

| Setting | What it does |
|---|---|
| `whatsappNumber` | Where orders go. International format, **digits only**. Sri Lanka: drop the leading 0 and add 94 – `0771234567` becomes `"94771234567"`. |
| `currency` | Shown before prices, e.g. `"Rs. "` or `"LKR "`. |
| `enquiryGreeting` | First message when someone taps a general "WhatsApp us" button. |
| `orderGreeting` | First line of every order message. |
| `contact.phoneDisplay`, `email`, `address` | Shown in the Contact section. `""` hides the row. |
| `contact.instagram`, `contact.facebook` | Full links. Setting one also shows its icon in the footer. |

### 3.2 Products – `data/products.js`

**Add a product:** copy one whole `{ ... },` block, paste it after another block, and change the details. Remove a product by deleting its block.

| Field | Notes |
|---|---|
| `id` | Unique code with no spaces, e.g. `"TRS-002"`. It appears in the WhatsApp message, so make it something you recognise. |
| `name` | Product name. |
| `category` | Exactly one of `trousers`, `blouses`, `crop-tops`, `skirts` (the four categories are fixed). |
| `price` | A number only, e.g. `3200`. The currency comes from `config.js`. |
| `sizes` | Sizes you offer, e.g. `["S", "M", "L"]`. |
| `colors` | List of colours, e.g. `[{ name: "Mustard", hex: "#eba705" }]`. `hex` is the colour of the round swatch. |
| `image` | Photo path such as `"assets/products/my-top.webp"`. Leave `""` to show a built-in drawing until the photo is ready. |
| `badge` | Small label such as `"New"` or `"Best seller"`. `""` for none. |
| `fabric`, `fit`, `blurb` | Short notes shown in the product pop-up. `""` hides a line. |

If you change a price later, customers who already have the item in their basket see the new price automatically.

### 3.3 Photos

- **Best results:** a photo with a **transparent background** (WebP or PNG) – it sits nicely on the tinted card. A normal photo (JPG/WebP) works too and simply fills the card.
- **Size:** about **1100 pixels tall**, saved as **WebP or JPG under ~200 KB**. Phone photos are often 3–6 MB, which makes the site slow – resize them first (a free image tool such as Squoosh, squoosh.app, does this in seconds).
- **File names:** lowercase, no spaces, e.g. `cream-trousers.webp`. GitHub is **case-sensitive**: `Top.JPG` and `top.jpg` are different files.
- Put photos in `assets/products/` and point `image` at them.
- Framing: cards and pop-ups crop from the top, so photos framed from the neck down (like your current ones) look best.

### 3.4 Front-page banner (the two big featured items)

These are written directly in `index.html` (not in `products.js`):

- **Text:** the two `<article class="hero-slide">` blocks (about lines 117–128): label, title, one-line description and button.
- **Photos:** the two `<img class="hero__photo">` lines (about lines 146–147). They must be transparent cut-outs. Set `width`/`height` to the real picture size and `--ar` to width ÷ height (e.g. 769 ÷ 1100 = `0.699`).
- If you replace the **first** banner photo, also update the `<link rel="preload" ... blouse-mustard.webp>` line near the top (or delete that line).
- Banner colour follows each slide's `data-theme` (`mustard` or `taupe`).

### 3.5 About text, logo and colours

- About wording: `index.html`, section `id="about"`.
- Logo: replace `assets/logo.svg` (dark, used in the header) and `assets/logo-white.svg` (footer), keeping the file names.
- Colours: `css/tokens.css`. WhatsApp green is only used on order/chat buttons.

---

## 4. Put it online with GitHub Pages

> **Please read first – GitHub's rules.** GitHub's documentation says Pages "is not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions". Your site takes **no payment**, but it is a shop-window that collects orders, so it sits in a grey area and GitHub could take it down. It is rare, but worth knowing. If that happens (or if you want to be safe), these exact same files work on other free static hosts such as Cloudflare Pages, Netlify or Vercel (check their terms too) – the only change is the share-preview address in `index.html`. Keep a copy of this folder.
> Also: Pages is free for **public** repositories only on a free GitHub account, so your site files will be publicly visible – never put passwords or private information in them.

### Option A – upload in your browser (no Git needed)

1. Sign in at github.com → **New repository**. Name it `lakdiva-tex`, choose **Public**, click **Create repository**.
2. On the new repository page click **uploading an existing file**.
3. Open your `lakdiva-tex` folder on your computer, select **everything inside it** (`index.html`, `css`, `js`, `data`, `assets`, …) and drag it into the browser. **Important:** `index.html` must end up at the top level of the repository, not inside an extra folder.
4. Click **Commit changes**.
5. Go to **Settings → Pages** (left sidebar, "Code and automation"). Under **Build and deployment → Source** choose **Deploy from a branch**. Under **Branch** choose `main` and the folder **/(root)**, then **Save**.
6. Wait 1–2 minutes and refresh the Pages settings page. Your address appears at the top – normally `https://YOUR-USERNAME.github.io/lakdiva-tex/`.
7. Put that address into the two `YOUR-USERNAME` lines in `index.html` (see the checklist in section 1), and commit again.

### Option B – Git on your computer

```bash
cd lakdiva-tex
git init
git add .
git commit -m "LAKDIVA TEX website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/lakdiva-tex.git
git push -u origin main
```

Then do step 5 above.

### Updating the site later

- **On github.com:** open a file → click the pencil ✏️ → edit → **Commit changes**. To replace photos, open the folder → **Add file → Upload files**.
- **With Git:** change files, then `git add . && git commit -m "update" && git push`.
- Changes appear in about a minute. If you still see the old version, hard-refresh (**Ctrl + F5**, or clear the browser cache on your phone).
- GitHub allows about 10 builds per hour, so make several edits, then commit once.

### Own web address (optional)

You can use a custom domain (like `lakdivatex.lk`) under **Settings → Pages → Custom domain**. You buy the domain from a registrar and add the DNS records GitHub shows you. Not needed to launch.

---

## 5. After it is live – quick test (on your phone)

1. Open the site address. The banner, shop and footer should all appear.
2. Tap a product → choose size and colour → **Add to order** → open the bag → **Send order on WhatsApp**. WhatsApp should open **your number** with the order written out. Send it and check it arrives.
3. Try **Order this item on WhatsApp** from a product pop-up, and the green WhatsApp button at the bottom right.
4. Send the site link to yourself in WhatsApp and check the preview picture appears. If it does not, see "share preview" below.
5. Check the contact details show your real information.

---

## 6. If something looks wrong

| Problem | Fix |
|---|---|
| Products do not appear, shop is empty | A typo in `data/products.js` (missing comma, quote or bracket). Compare with a working block. |
| A photo does not show | The file name or folder in `image` does not match exactly (capital letters, spaces, `.jpg` vs `.webp`). The built-in drawing shows instead. |
| WhatsApp opens the wrong chat | `whatsappNumber` in `js/config.js` – digits only, with country code. |
| Site shows an old version | Wait a minute, then Ctrl + F5. Check the repository's **Actions** tab for a failed build. |
| Page not found after publishing | `index.html` is probably inside a sub-folder – move it to the top level of the repository. Also check Settings → Pages shows `main` and `/(root)`. |
| Share preview picture missing | The address in `og:image` must be the full live address. Facebook's *Sharing Debugger* (search for it) can refresh WhatsApp/Facebook's saved copy. |
| Fonts look plain | The page loads two fonts from Google Fonts; with no internet they fall back to standard fonts. |

---

## 7. How it works (short)

- **No server, no database, no tracking.** Everything runs in the visitor's browser. The order basket is kept in their own browser (`localStorage`, only the product, size, colour and quantity). The name and address they type are never stored – they only go into the WhatsApp message they choose to send.
- **No payment on the site.** You confirm price, delivery and payment with the customer on WhatsApp.
- The one outside service is **Google Fonts** (the headline and text fonts).
- Works in current Chrome, Edge, Firefox and Safari, on phones, tablets and computers. It also works with keyboards and screen readers, and respects "reduce motion".
- The code is split by job: `config.js` (settings), `products.js` (data), `shop.js` (product grid and pop-up), `basket.js` (order basket), `order.js` (WhatsApp message), `hero.js` (banner slideshow), `main.js` (menu, contact details, WhatsApp links).
