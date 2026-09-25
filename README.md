<div align="center">

# SmartMart

### Fresh in under 60 minutes across Dubai.

A complete front-end supermarket storefront: browse, search, filter, build a basket, apply a voucher, pick a currency, and place an order. No backend needed.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Storage](https://img.shields.io/badge/state-localStorage-blue)
![Status](https://img.shields.io/badge/status-front--end_prototype-orange)

</div>

---

## Table of contents

1. [The idea](#the-idea)
2. [Features](#features)
3. [Pages](#pages)
4. [How it works](#how-it-works)
5. [Data model](#data-model)
6. [Cart and pricing logic](#cart-and-pricing-logic)
7. [Tech stack](#tech-stack)
8. [Project structure](#project-structure)
9. [Run it locally](#run-it-locally)
10. [Known gaps](#known-gaps)
11. [Roadmap](#roadmap)

---

## The idea

Online grocery is a promise of convenience, so the storefront has to feel effortless: find what you want, add it, check out. SmartMart is a working prototype of that experience for a Dubai supermarket, built to show the full customer journey **without any server**.

Everything a shopper touches (catalogue, cart, voucher, currency) runs in the browser, which makes the project easy to demo, easy to read, and a solid base to attach a real backend to later.

## Features

- **Product catalogue** of 12 groceries across 6 categories: fruits, vegetables, dairy, meat, pantry and beverages.
- **Live search** and **category filtering** on the products page.
- **Category browsing** page with its own search.
- **Persistent shopping cart**: add, change quantity, remove. Survives page reloads.
- **Cart badge counters** that update across every page.
- **Voucher codes**: enter `SAVE10` for 10% off, with instant feedback.
- **Multi-currency pricing**: AED, USD, EUR and SAR, remembered between visits.
- **Checkout form** with delivery details and three payment options: card on delivery, cash on delivery, pay online.
- **Contact page** with a full enquiry form, business details, map embed and FAQ.
- **Order tracking** page stub.
- **Smooth-scroll** anchor navigation.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home: hero ("Pure energy"), delivery promise, featured content |
| `categories.html` | Featured categories with search |
| `products.html` | Full catalogue with search, filters and add-to-cart |
| `cart.html` | Basket review, currency, voucher, delivery details, payment method, place order |
| `contact.html` | Enquiry form, contact details, map, FAQ |
| `order-tracking.html` | Order ID lookup (UI only) |

## How it works

All behaviour lives in one file, `script.js`. On `DOMContentLoaded` it runs a small set of initialisers, and each one only does work if its page is present:

```js
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  updateCartCounters();
  initCategorySearch();
  initProductsPage();
  initCartPage();
});
```

That pattern lets a single script serve every page without errors.

**State is stored in `localStorage`** under three keys:

| Key | Holds |
|---|---|
| `smartmart-cart` | The array of cart items |
| `smartmart-voucher` | The applied voucher code |
| `smartmart-currency` | The selected currency (defaults to AED) |

Reads are wrapped in `try/catch` with a safe fallback, so corrupted or blocked storage doesn't break the site.

## Data model

Products live in a single `SMARTMART_PRODUCTS` array:

```js
{
  id: "apple-gala",
  name: "Organic Gala Apples",
  category: "fruits",
  price: 14.0,          // in AED, the base currency
  unit: "1 kg",
  image: "https://images.unsplash.com/..."
}
```

Adding a product is adding one object. The catalogue, filters and category labels update on their own.

## Cart and pricing logic

| Function | Job |
|---|---|
| `addToCart(id)` | Adds an item or increments its quantity, then saves |
| `groupCartItems()` | Collapses the raw cart into one line per product with a quantity |
| `setItemQuantity()` / `removeFromCart()` | Edit the basket |
| `getCartSummary()` | Calculates subtotal, discount and total |
| `formatPrice(amount, currency)` | Converts and formats the price for display |

**Pricing rules:**

- All prices are stored in **AED**.
- Display conversion uses fixed rates: `USD 0.27`, `EUR 0.25`, `SAR 1.02`.
- Voucher `SAVE10` takes **10% off the subtotal**.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Markup | HTML5 | Multi-page static site |
| Styling | CSS3 (~760 lines), responsive | Custom design, no framework |
| Logic | Vanilla JavaScript (~500 lines) | No build tools or dependencies |
| State | `localStorage` | Persistence with no backend |
| Images | Unsplash (hotlinked) | Realistic product photography |
| Icons | Font Awesome kit | Nav and UI icons |

## Project structure

```text
smartmart/
├── index.html
├── categories.html
├── products.html
├── cart.html
├── contact.html
├── order-tracking.html
├── style.css       # all styling
├── script.js       # catalogue, cart, currency, voucher, page logic
└── README.md
```

## Run it locally

```bash
git clone https://github.com/4pfanas/smartmart.git
cd smartmart
open index.html          # or: python3 -m http.server 8000
```

Product images and icons load from the internet, so you need a connection for the full look.

## Known gaps

This is an honest prototype, so here is what isn't real yet:

- **Orders are not sent anywhere.** There is no server or database, and "Place Order" stays in the browser.
- **Online payment is a UI option only.**
- Navigation links to `login.php`, `register.php` and `index.php`, which **do not exist** in this repository yet.
- **Order tracking** is a form with no data behind it.
- Currency rates are **fixed**, not live.
- Contact details on the contact page are **placeholders**.

## Roadmap

- [ ] Real backend (Node/Express or Supabase) for accounts, orders and stock
- [ ] Working login and registration pages
- [ ] Real order tracking driven by order IDs
- [ ] Live currency rates via an API
- [ ] Payment integration (Stripe test mode first)
- [ ] Product detail pages and reviews
- [ ] Bigger catalogue, sorting, and price filters
- [ ] Arabic language and RTL layout
- [ ] Accessibility and performance audit

---

<div align="center">

Built by **[Anas Aslam](https://github.com/4pfanas)**

</div>
