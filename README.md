# NAS Market — static prototype

Clickable static mockups of the multi-vendor marketplace (storefront, buyer account, seller dashboard, admin dashboard) for client review before development.

## Run

```bash
cd site
python3 -m http.server 8791
# open http://127.0.0.1:8791/pages.html  (map of every screen)
```

Open it over HTTP, not `file://`, so the relative links and `localStorage` (cart, compare) work.

## Structure

```
site/
├── pages.html            map of all screens (start here when presenting)
├── index.html            storefront home (AR) · en/index.html · ur/index.html
├── category.html  product.html  compare.html  vendor.html
├── cart.html  checkout.html  request.html  login.html
├── account/              buyer account: orders, quotes, messages, returns
├── seller/  en/seller/   seller dashboard + join (onboarding), AR / EN
├── admin/   en/admin/    admin dashboard, AR / EN
├── css/base.css          tokens + shared components (data plate, buttons, forms, tables)
├── css/store.css         storefront
├── css/dash.css          dashboards
├── js/core.js            icons, logo mark, formatting, modals/drawers, tabs, reveal
├── js/products.js        demo catalog: categories, vendors, products (replace with API)
├── js/store.js           storefront chrome + page renderers (cart/compare in localStorage)
├── js/dash.js            seller & admin views, one source for AR and EN
└── assets/               favicon, images (see assets/img/CREDITS.md)
```

## Admin-managed banners

`admin/banners.html` controls three placements: the announcement bar (every page), the wide offer banner (home + category pages) and up to 3 promo banners (home). Defaults live in `js/products.js` → `banners`. Edits are saved to `localStorage` (`nas_banners`) and the storefront reads them on load, so in this prototype changes show up in the same browser only. In production this becomes an API call.

Other admin additions: `admin/support.html` (support tickets with assignment, priority, SLA, internal notes), `admin/integrations.html` (shipping carriers via API: credentials, service codes, pickup, webhooks, request log, buyer shipping rates). Sellers open tickets from `seller/support.html`.

## Catalogue & moderation

- `admin/categories.html` manages a 3-level tree (main → sub → sub-sub) with spec fields per branch; defaults in `js/products.js` → `catTree`, edits saved to `localStorage` (`nas_cats`). The seller form and storefront sub-category chips read the same tree.
- `seller/product-new.html` (add) and `?id=…` (edit) is a full page. Price, compare-at price and stock apply instantly; any other change becomes a change request.
- `admin/products.html` reviews new products and change requests (before/after diff), logs instant price/stock edits, and holds the review rules.

## Phones & tablets

`css/app.css` (loaded last) turns the storefront and dashboards into an app-style layout below 1024px / 1100px: bottom tab bar, compact app bar, swipe rows, bottom sheets, sticky buy/checkout bars, dashboard tables as cards, FAB for the main action, list→detail tickets. Desktop is unchanged.

## Notes

- The logo is a temporary mark built from the Novatech identity (gear, bolt, waves). Colors come from novatech-nas.ae.
- Photos are Creative Commons placeholders. Vendor names, customers, figures and ratings are demo data.
- Signature element: the riveted "data plate" (`.plate`), used for part numbers, prices and dashboard KPIs.
