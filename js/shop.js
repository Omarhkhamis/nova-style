/* NAS.AE STORE — storefront: chrome, product cards, cart / favourites / compare, page renderers.
   Data: window.NAS_CAT (js/catalog.js, generated from the client's reference mockups by tools/build_catalog.py). */
(function () {
  const { ROOT, num, esc, $, $$, store, toast, open, closeAll, reveal } = window.NAS;
  const CAT = window.NAS_CAT;
  const page = document.body.dataset.page || "";
  const L = p => ROOT + p;
  // absolute URLs: images also go into CSS custom properties, where relative urls would resolve against css/
  const A = p => (!p ? "" : /^(https?:|data:)/.test(p) ? p : new URL(ROOT + p, location.href).href);
  const qs = k => new URLSearchParams(location.search).get(k);

  // ---------- icons (core set + storefront extras) ----------
  const XP = {
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
    wa: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9.2 8.6c0 3.4 2.6 6.2 6.2 6.2l.9-1.5-1.9-.9-.9.9a4.6 4.6 0 0 1-2.8-2.8l.9-.9-.9-1.9z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    grid4: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z"/>',
    xlogo: '<path d="M4 4h4.5L20 20h-4.5zM20 4l-6.6 7.2M4 20l6.6-7.2"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    motor: '<rect x="4" y="7" width="12" height="10" rx="2"/><path d="M16 12h4M8 7V5M12 7V5M7 17v2M13 17v2"/>',
    gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="m12 16 4-5"/><circle cx="12" cy="16" r="1.2"/>',
    cable: '<path d="M5 3v5a3 3 0 0 0 6 0V3M8 11v4a5 5 0 0 0 10 0V9"/><path d="M16 6h4v3h-4z"/>',
    hardhat: '<path d="M3 17h18M5 17v-3a7 7 0 0 1 14 0v3"/><path d="M10 7v4M14 7v4"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/>',
    boxes: '<path d="M4 8l8-4 8 4-8 4z"/><path d="M4 8v8l8 4 8-4V8M12 12v8"/>',
    rig: '<path d="M8 21 12 5l4 16M9.5 15h5M10.5 11h3M12 5V3M6 21h12"/>',
    pylon: '<path d="M12 3 8 21M12 3l4 18M9.5 10h5M8.5 15h7M5 8h14"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    factory: '<path d="M3 21V10l5 3V10l5 3V10l5 3V5h3v16z"/>',
    anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 11h8M5 14a7 7 0 0 0 14 0"/>',
    bridge: '<path d="M3 18h18M5 18v-6M19 18v-6M3 12h18M8 12V9M16 12V9M8 9a8 8 0 0 1 8 0"/>',
    building: '<rect x="5" y="3" width="10" height="18"/><path d="M15 9h4v12h-4M8 7h1M11 7h1M8 11h1M11 11h1M8 15h1M11 15h1"/>',
    plugs: '<path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0zM12 16v5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    medal: '<circle cx="12" cy="14" r="5"/><path d="M9 3 7 9M15 3l2 6M12 12v4"/>',
    swap: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    handshake: '<path d="m3 12 4-4 5 2 5-2 4 4-5 5-4-2-4 2z"/>'
  };
  const ic = (name, cls) => XP[name] ? '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + XP[name] + "</svg>" : window.NAS.icon(name, cls);
  const flagUAE = '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#00732F"/><rect y="13.33" width="30" height="6.67" fill="#000"/><rect width="8" height="20" fill="#FF0000"/></svg>';
  const CAT_ICON = { automation: "cpu", electrical: "bolt", motors: "motor", instrumentation: "gauge", power: "plugs", cables: "cable", safety: "hardhat", mechanical: "cog", tools: "wrench", supplies: "boxes" };
  const IND_ICON = { "oil-gas": "rig", "power-utilities": "pylon", water: "drop", manufacturing: "factory", marine: "anchor", infrastructure: "bridge", "buildings-hvac": "building" };
  const FEAT_ICON = [[/support|expert/i, "headset"], [/deliver|supply|shipping/i, "truck"], [/pric/i, "tag"], [/range|portfolio|one stop|complete/i, "grid4"], [/genuine|trusted|certified|authori|safe|protect/i, "shield"], [/global|worldwide/i, "globe"], [/expertise|industry|team/i, "users"], [/marine/i, "anchor"]];
  const featIcon = t => (FEAT_ICON.find(([re]) => re.test(t)) || [0, "check"])[1];

  // manufacturer brand colours, used where a product card prints the brand as a wordmark
  const BRAND_COLOR = { siemens: "#009999", abb: "#E2001A", "schneider-electric": "#3DCD58", "endress-hauser": "#0A5FA8", fluke: "#1B1B1B", omron: "#005EB8", "allen-bradley": "#1A2B6B", "rockwell-automation": "#C4262E", mitsubishi: "#E60012", "mitsubishi-electric": "#E60012", "phoenix-contact": "#1B1B1B", honeywell: "#E1251B", emerson: "#004B8D", yokogawa: "#1B4FA0", danfoss: "#E2000F", "3m": "#FF0000", eaton: "#005EB8", legrand: "#E30613", weidmuller: "#F07D00", hager: "#00A2DE", sick: "#007CC1", lenze: "#0047BB", hitachi: "#E60027", ansell: "#004EA8", msa: "#00843D", uvex: "#1A1A1A" };
  const bslug = s => String(s || "").toLowerCase().replace(/\+/g, "-").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // ---------- data helpers ----------
  const PROD = id => CAT.products.find(p => p.id === id);
  const CATG = s => CAT.categories.find(c => c.slug === s);
  const IND = s => CAT.industries.find(c => c.slug === s);
  const SELLER = id => CAT.sellers.find(s => s.id === id);
  const BRAND = s => CAT.brands.find(b => b.slug === s);
  const aed = (n, d) => "AED " + num(n, d === undefined ? true : d);
  const stockTxt = s => s === "in" ? "In Stock" : s === "obsolete" ? "Discontinued" : "Available on Request";
  const sellerLab = s => "Seller " + s.code;

  // ---------- storage: cart / favourites / compare ----------
  const getCart = () => store.get("nasae_cart", null) || [{ id: CAT.home.featured[0], qty: 1 }, { id: CAT.home.featured[2], qty: 2 }];
  const setCart = c => { store.set("nasae_cart", c); syncCounts(); renderMini(); };
  const getFavs = () => store.get("nasae_favs", []);
  const setFavs = f => { store.set("nasae_favs", f); syncCounts(); };
  const isFav = id => getFavs().some(f => f.id === id);
  const getCmp = () => store.get("nasae_cmp", []);
  const setCmp = a => { store.set("nasae_cmp", a); syncCounts(); renderTray(); };
  function addToCart(id, qty) {
    const p = PROD(id); if (!p) return;
    const c = getCart(), ex = c.find(x => x.id === id);
    if (ex) ex.qty += qty || 1; else c.push({ id, qty: qty || 1 });
    setCart(c);
    toast("Added to cart: " + esc(p.name), "cart");
  }
  function syncCounts() {
    const n = getCart().reduce((s, x) => s + x.qty, 0);
    $$("[data-cart-n]").forEach(e => (e.textContent = n));
    $$("[data-fav-n]").forEach(e => { e.textContent = getFavs().length; e.hidden = !getFavs().length; });
  }

  // ---------- product card ----------
  function brandMark(b, cls) {
    const s = bslug(b), color = BRAND_COLOR[s];
    return '<a class="' + (cls || "pcard__brand") + '" href="' + L("search.html?brand=" + s) + '"' + (color ? ' style="color:' + color + '"' : "") + ">" + esc(b) + "</a>";
  }
  function card(p, o) {
    o = o || {};
    const s = SELLER(p.seller);
    const fav = isFav(p.id), cmp = getCmp().includes(p.id);
    return '<article class="pcard' + (o.reveal === false ? "" : " reveal") + '">' +
      '<a class="pcard__img" href="' + L("product.html?id=" + p.id) + '" tabindex="-1" aria-hidden="true"><img src="' + A(p.img) + '" alt="" loading="lazy"></a>' +
      '<button class="fav" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="Save to favourites and get stock & price alerts">' + ic("heart") + "</button>" +
      '<div class="pcard__actions-wrap"><div class="pcard__body">' + brandMark(p.brand) +
      '<a class="pcard__name" href="' + L("product.html?id=" + p.id) + '">' + esc(p.name) + "</a>" +
      (p.pn ? '<span class="pcard__pn">' + esc(p.pn) + "</span>" : "") +
      '<span class="stock stock--' + p.stock + '">' + stockTxt(p.stock) + "</span>" +
      '<span class="pcard__price">' + aed(p.price) + '</span><span class="pcard__vat">(Excl. VAT)</span>' +
      (s ? '<a class="pcard__seller" href="' + L("vendor.html?v=" + s.id) + '">' + sellerLab(s) + "</a>" : "") + "</div></div>" +
      '<div class="pcard__actions"><div class="pcard__ctas">' + (p.stock === "obsolete" && p.replacement ? '<a class="btn btn--primary" href="' + L("product.html?id=" + p.replacement) + '">Replacement</a>' : '<button class="btn btn--primary" data-add="' + p.id + '">Add to Cart</button>') + '<button class="btn btn--line" data-rfq="' + p.id + '">Request Quote</button></div>' +
      '<div class="pcard__foot"><a href="#" data-sheet="' + p.id + '">' + ic("file") + "Datasheet</a>" +
      '<label>' + '<input type="checkbox" data-cmp="' + p.id + '"' + (cmp ? " checked" : "") + '><span style="display:inline-flex;gap:6px;align-items:center">' + ic("swap") + "Compare</span></label></div></div></article>";
  }
  const cards = (list, o) => list.map(p => card(p, o)).join("");

  // ---------- chrome ----------
  const D = CAT.home;
  function logo(white) {
    return '<a class="logo" href="' + L("index.html") + '" aria-label="NAS.AE Store — home"><img src="' + A(white ? CAT.brand.logoWhite : CAT.brand.logo) + '" alt="NAS.AE Store" width="250" height="56"></a>';
  }
  function header() {
    const pop = (page === "category" && CATG(qs("c"))) ? CATG(qs("c")).popularSearches : (page === "industry" && IND(qs("i"))) ? IND(qs("i")).popularSearches : page === "brands" ? CAT.brandsPage.popularSearches : D.popularSearches;
    return '<a class="sr-only" href="#main">Skip to content</a><header class="hdr"><div class="wrap hdr__row">' +
      '<div class="logo-wrap">' + logo() + '<small class="logo-tag" style="display:block;font:600 9.5px/1 Inter,sans-serif;letter-spacing:.09em;color:#0A2A57;margin-top:3px">INDUSTRIAL SOLUTIONS AT YOUR FINGERTIPS</small></div>' +
      '<div class="hsearch"><form role="search" action="' + L("search.html") + '"><label class="sr-only" for="q">Search</label><input id="q" name="q" type="search" autocomplete="off" placeholder="Search by product, manufacturer, model or part number..." value="' + esc(qs("q") || "") + '"><button aria-label="Search">' + ic("search") + "</button></form>" +
      '<div class="popular-line"><b>Popular Searches:</b>' + (pop || []).map(t => '<a href="' + L("search.html?q=" + encodeURIComponent(t)) + '">' + esc(t) + "</a>").join("") + "</div></div>" +
      '<div class="hacts"><button class="hact cur hact--hide-md" type="button" title="Currency & region">' + flagUAE + "<span>UAE (AED)</span>" + ic("chevd", "icon--sm") + "</button>" +
      '<div class="acctmenu"><a class="hact" href="' + L("login.html") + '">' + ic("user") + "<span>Login / Sign Up<br><b>My Account</b> ▾</span></a>" +
      '<div class="mega mega--list" style="left:auto;right:0">' + [["account/orders.html", "box", "My Orders & Tracking"], ["account/quotes.html", "doc", "My Quotes & RFQs"], ["account/favourites.html", "heart", "Favourites & Alerts"], ["account/messages.html", "chat", "Messages"], ["account/returns.html", "ret", "Returns & Warranty"], ["login.html", "user", "Login / Sign Up"]].map(([h, i, t]) => '<a href="' + L(h) + '">' + ic(i, "icon--sm") + t + "</a>").join("") + "</div></div>" +
      '<a class="hact cart-btn" href="' + L("cart.html") + '" data-open="#minicart">' + ic("cart") + '<span class="bubble bubble--abs" data-cart-n>0</span><span>Cart</span><span class="bubble" data-cart-n>0</span></a></div></div></header>' +
      nav();
  }
  function nav() {
    const cur = { home: "", category: "products", search: qs("deals") ? "deals" : "products", industry: "industries", brands: "brands", rfq: "rfq", obsolete: "support" }[page] || "";
    const prodMega = '<div class="mega mega--wide">' + CAT.categories.map(c => '<div><h4>' + ic(CAT_ICON[c.slug], "icon--sm") + '<a href="' + L("category.html?c=" + c.slug) + '" style="padding:0;color:inherit">' + esc(c.title) + "</a></h4>" + c.sidebar.items.slice(0, 5).map(s => '<a href="' + L("category.html?c=" + c.slug + "&sub=" + encodeURIComponent(s)) + '">' + esc(s) + "</a>").join("") + "</div>").join("") + "</div>";
    const brandMega = '<div class="mega mega--brands">' + CAT.brands.filter(b => b.img).slice(0, 16).map(b => '<a href="' + L("search.html?brand=" + b.slug) + '" title="' + esc(b.name) + '"><img src="' + A(b.img) + '" alt="' + esc(b.name) + '"></a>').join("") + '<a href="' + L("brands.html") + '" style="grid-column:1/-1;height:auto;border:0;color:var(--blue-600);font-weight:600">View all brands →</a></div>';
    const indMega = '<div class="mega mega--list">' + CAT.industries.map(i => '<a href="' + L("industry.html?i=" + i.slug) + '">' + ic(IND_ICON[i.slug], "icon--sm") + esc(i.title) + "</a>").join("") + "</div>";
    const supMega = '<div class="mega mega--list">' + [["headset", "Technical Support", "#ts"], ["cpu", "Product Selection Help", "rfq.html?t=identify"], ["file", "Datasheets & Downloads", "search.html?q=datasheet"], ["swap", "Obsolete Product Search", "obsolete.html"], ["truck", "Track Order", "account/orders.html"], ["ret", "Returns & Warranty", "account/returns.html"]].map(([i, t, h]) => '<a href="' + (h[0] === "#" ? h : L(h)) + '"' + (h === "#ts" ? " data-ts" : "") + ">" + ic(i, "icon--sm") + t + "</a>").join("") + "</div>";
    const item = (k, label, href, mega) => '<div class="nav__i"' + (cur === k ? ' aria-current="true"' : "") + '><a href="' + href + '">' + label + (mega ? " " + ic("chevd", "icon--sm") : "") + "</a>" + (mega || "") + "</div>";
    return '<nav class="nav" aria-label="Main"><div class="wrap nav__row" style="padding-inline:24px 0">' +
      '<button class="nav__all" data-open="#catdrawer">' + ic("menu") + "<span>All Categories</span>" + ic("chevd", "icon--sm") + "</button>" +
      '<div class="nav__links">' + item("products", "Products", L("category.html?c=automation"), prodMega) + item("brands", "Brands", L("brands.html"), brandMega) + item("industries", "Industries", L("industry.html?i=oil-gas"), indMega) +
      item("deals", "Deals", L("search.html?deals=1")) + item("rfq", "Request for Quotation", L("rfq.html")) + item("support", "Support", L("obsolete.html"), supMega) + item("about", "About NAS.AE", "#about") + "</div>" +
      '<div class="nav__right"><a href="' + L("account/orders.html") + '">' + ic("truck") + "Track Order</a><a href=\"#ts\" data-ts>" + ic("headset") + "Need Help?</a></div></div></nav>";
  }
  function catDrawer() {
    return '<aside class="catdrawer" id="catdrawer" aria-hidden="true" aria-label="All categories"><div class="catdrawer__head">All Categories<button class="close-btn" data-close aria-label="Close">' + ic("x") + '</button></div><div class="catdrawer__body">' +
      "<h5>Products</h5>" + CAT.categories.map(c => '<a href="' + L("category.html?c=" + c.slug) + '">' + ic(CAT_ICON[c.slug]) + esc(c.title) + ic("chev", "icon--sm") + "</a>").join("") +
      "<h5>Industries</h5>" + CAT.industries.map(c => '<a href="' + L("industry.html?i=" + c.slug) + '">' + ic(IND_ICON[c.slug]) + esc(c.title) + ic("chev", "icon--sm") + "</a>").join("") +
      "<h5>More</h5>" + '<a href="' + L("brands.html") + '">' + ic("medal") + "Brands" + ic("chev", "icon--sm") + '</a><a href="' + L("search.html?deals=1") + '">' + ic("tag") + "Deals" + ic("chev", "icon--sm") + '</a><a href="' + L("obsolete.html") + '">' + ic("swap") + "Obsolete Product Search" + ic("chev", "icon--sm") + '</a><a href="' + L("rfq.html") + '">' + ic("doc") + "Request for Quotation" + ic("chev", "icon--sm") + "</a></div></aside>";
  }
  function footer() {
    const F = D.footer;
    const col = (c, two) => '<div class="' + (two ? "ftr__2col" : "") + '"><h4>' + esc(c.title) + "</h4><ul>" + c.links.map(l => '<li><a href="' + linkFor(l) + '"' + (/supplier/i.test(l) ? ' data-open="#m-partner"' : linkFor(l) === "#ts" ? " data-ts" : "") + ">" + esc(l) + "</a></li>").join("") + "</ul></div>";
    return '<footer class="ftr" id="about"><div class="wrap ftr__grid">' +
      '<div class="ftr__brand">' + logo(true) + "<p>" + esc(F.tagline) + "</p><b>" + esc(F.motto) + "</b></div>" +
      F.columns.map((c, i) => col(c, i === 0)).join("") +
      '<div><h4>CONTACT US</h4><ul class="ftr__contact"><li>' + ic("phone") + esc(F.contact.phone) + "</li><li>" + ic("mail") + esc(F.contact.email) + "</li><li>" + ic("pin") + esc(F.contact.address) + "</li></ul></div>" +
      '<div><h4>FOLLOW US</h4><div class="ftr__social"><a href="#" aria-label="LinkedIn">' + ic("linkedin") + '</a><a href="#" aria-label="YouTube">' + ic("youtube") + '</a><a href="#" aria-label="X">' + ic("xlogo") + "</a></div></div>" +
      '<div><h4>' + esc(F.newsletter) + '</h4><form class="news" data-news><input type="email" placeholder="Your email address" aria-label="Email" required><button aria-label="Subscribe">' + ic("arrow") + "</button></form></div></div>" +
      '<div class="ftr__bottom"><div class="wrap"><span>' + esc(F.copyright) + '</span><span style="opacity:.7">Prototype for review — products, prices and photos are placeholders.</span><div class="pays"><span class="pay pay--visa">VISA</span><span class="pay"><svg width="30" height="18" viewBox="0 0 30 18"><circle cx="11" cy="9" r="7" fill="#EB001B"/><circle cx="19" cy="9" r="7" fill="#F79E1B" fill-opacity=".9"/></svg></span><span class="pay pay--amex">AMEX</span><span class="pay"> Pay</span>' +
      '<span style="display:inline-flex;gap:6px;align-items:center;margin-inline:10px">' + ic("globe", "icon--sm") + 'Worldwide Shipping</span><span class="ftr__motto">' + esc(F.bottomRight) + "</span></div></div></div></footer>";
  }
  function linkFor(l) {
    const c = CAT.categories.find(x => x.title === l || x.short === l), i = CAT.industries.find(x => x.title === l || x.short === l);
    if (c) return L("category.html?c=" + c.slug);
    if (i) return L("industry.html?i=" + i.slug);
    const m = { "Request a Quote": "rfq.html", "Track Order": "account/orders.html", "Returns & Warranty": "account/returns.html", "Obsolete Product Search": "obsolete.html", "Projects & Bulk Supply": "rfq.html?t=project", "Product Selection": "rfq.html?t=identify", "Brands": "brands.html", "Contact Us": "#ts", "Technical Support": "#ts", "Business Accounts": "login.html", "Datasheets & Downloads": "search.html?q=datasheet" };
    return m[l] ? (m[l][0] === "#" ? m[l] : L(m[l])) : "#";
  }
  function techSales() {
    return '<div class="ts" id="ts"><div class="ts__panel" role="dialog" aria-label="Technical sales"><div class="ts__head"><b>Technical Sales</b><span>Need help finding a product?</span></div><div class="ts__opts">' +
      '<a href="https://wa.me/97121234567" target="_blank" rel="noopener"><span class="ic ic--wa">' + ic("wa") + "</span><span>WhatsApp<small>Chat with a sales engineer now</small></span></a>" +
      '<button type="button" data-open="#m-call"><span class="ic">' + ic("phone") + "</span><span>Request a Call<small>We call you back within working hours</small></span></button>" +
      '<a href="' + L("rfq.html") + '"><span class="ic">' + ic("doc") + "</span><span>Send RFQ<small>Part numbers, a list or a BOM file</small></span></a>" +
      '<a href="' + L("rfq.html?t=identify") + '"><span class="ic">' + ic("camera") + "</span><span>Identify a Part<small>Upload a nameplate photo</small></span></a></div></div>" +
      '<button class="ts__fab" type="button" aria-expanded="false" aria-controls="ts">' + ic("wa") + "<span>Technical Sales</span></button></div>";
  }
  function modals() {
    const m = (id, title, body, cta, toastMsg) => '<div class="modal" id="' + id + '" aria-hidden="true" role="dialog" aria-labelledby="' + id + '-t"><form class="modal__box" data-toast="' + esc(toastMsg) + '"><div class="modal__head"><h2 id="' + id + '-t">' + title + '</h2><button type="button" class="close-btn" data-close aria-label="Close">' + ic("x") + '</button></div><div class="modal__body">' + body + '</div><div class="modal__foot"><button type="button" class="btn btn--line" data-close>Cancel</button><button class="btn btn--primary">' + cta + "</button></div></form></div>";
    const fld = (l, t, ph) => '<div class="field"><label>' + l + '</label><input class="input" type="' + (t || "text") + '"' + (ph ? ' placeholder="' + ph + '"' : "") + " required></div>";
    return m("m-rfq", "Request a Quote", '<div class="notice">' + ic("info") + '<span>Quotes come from NAS.AE. We source from verified suppliers and reply with price, lead time and validity.</span></div><div id="rfq-item" class="file" style="display:none"></div>' +
        '<div class="form-grid form-grid--2"><div class="field"><label>Quantity</label><input class="input" type="number" min="1" value="1"></div><div class="field"><label>Required by</label><input class="input" type="date"></div></div>' +
        '<div class="field"><label>Notes</label><textarea class="textarea" placeholder="Project, delivery location, alternatives accepted…"></textarea></div>' + fld("Email", "email", "name@company.ae"), "Send Request", "Quote request sent — reference RFQ-2610-044") +
      m("m-call", "Request a Call", fld("Name") + fld("Phone", "tel", "+971") + '<div class="field"><label>Topic</label><select class="select"><option>Product selection</option><option>Pricing / quotation</option><option>Order status</option><option>Obsolete replacement</option></select></div>', "Request Call", "Thanks — a sales engineer will call you shortly") +
      m("m-notify", "Get Alerts for This Product", '<p id="notify-p" class="muted"></p><label class="check"><input type="checkbox" checked> Notify me when it is back in stock</label><label class="check"><input type="checkbox" checked> Notify me when the price drops</label><div class="field"><label>Send alerts to</label><select class="select"><option>Email and WhatsApp</option><option>Email only</option><option>WhatsApp only</option></select></div>', "Save Alerts", "Saved to favourites — we'll notify you") +
      m("m-partner", "Partner with NAS.AE", fld("Company name") + fld("Contact email", "email") + '<div class="field"><label>Brands / product lines you supply</label><textarea class="textarea"></textarea></div><p class="muted" style="font-size:12.5px">Our team reviews every enquiry and contacts suitable partners directly.</p>', "Send Enquiry", "Thanks — our partnerships team will contact you") +
      '<aside class="drawer" id="minicart" aria-hidden="true" aria-labelledby="mc-t" role="dialog"><div class="drawer__head"><h2 id="mc-t">Your Cart</h2><button class="close-btn" data-close aria-label="Close">' + ic("x") + '</button></div><div class="drawer__body" id="mc-body"></div><div class="drawer__foot" id="mc-foot"></div></aside>' +
      '<div class="cmp-tray" id="cmp-tray"><span><b data-cmp-n>0</b>/4 to compare</span><button class="btn btn--sm btn--ghost" data-cmp-clear>Clear</button><a class="btn btn--sm btn--primary" href="' + L("compare.html") + '">Compare now</a></div>';
  }
  function renderMini() {
    const body = $("#mc-body"); if (!body) return;
    const c = getCart();
    if (!c.length) { body.innerHTML = '<div class="empty">' + ic("cart") + "<p>Your cart is empty</p></div>"; $("#mc-foot").innerHTML = ""; return; }
    const g = groupBySeller(c);
    body.innerHTML = Object.keys(g).map(sid => '<div class="minic__v">' + ic("cart", "icon--sm") + ' Shipment from <a class="link" href="' + L("vendor.html?v=" + sid) + '">' + sellerLab(SELLER(sid)) + "</a></div>" + g[sid].map(x => { const p = PROD(x.id); return '<div class="minic"><img src="' + A(p.img) + '" alt=""><div><b>' + esc(p.brand) + "</b> " + esc(p.name) + '<br><span class="muted">' + x.qty + " × " + aed(p.price) + '</span></div><button class="close-btn" data-rm="' + x.idx + '" aria-label="Remove">' + ic("trash", "icon--sm") + "</button></div>"; }).join("")).join("");
    const sub = c.reduce((s, x) => s + x.qty * PROD(x.id).price, 0);
    $("#mc-foot").innerHTML = '<div class="sumrow"><span>Subtotal (excl. VAT)</span><b>' + aed(sub) + '</b></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px"><a class="btn btn--line" href="' + L("cart.html") + '">View Cart</a><a class="btn btn--primary" href="' + L("checkout.html") + '">Checkout</a></div>';
  }
  function groupBySeller(c) {
    const g = {};
    c.forEach((x, i) => { const p = PROD(x.id); if (p) (g[p.seller] = g[p.seller] || []).push(Object.assign({ idx: i }, x)); });
    return g;
  }
  function renderTray() {
    const t = $("#cmp-tray"); if (!t) return;
    const n = getCmp().length;
    t.classList.toggle("is-on", n > 0 && page !== "compare");
    $("[data-cmp-n]", t).textContent = n;
  }
  function mountChrome() {
    const h = $("#site-header"), f = $("#site-footer");
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    document.body.insertAdjacentHTML("beforeend", catDrawer() + modals() + techSales());
  }

  // ---------- global interactions ----------
  document.addEventListener("click", e => {
    const t = e.target;
    const add = t.closest("[data-add]"); if (add) { e.preventDefault(); addToCart(add.dataset.add, +(add.dataset.qty || 1)); return; }
    const rm = t.closest("[data-rm]"); if (rm) { const c = getCart(); c.splice(+rm.dataset.rm, 1); setCart(c); if (page === "cart") pages.cart(); return; }
    const fav = t.closest("[data-fav]");
    if (fav) {
      e.preventDefault();
      const id = fav.dataset.fav, f = getFavs();
      if (isFav(id)) { setFavs(f.filter(x => x.id !== id)); $$('[data-fav="' + id + '"]').forEach(b => b.setAttribute("aria-pressed", "false")); toast("Removed from favourites", "heart"); }
      else { f.push({ id, stock: true, price: true, since: new Date().toISOString().slice(0, 10), was: PROD(id).price }); setFavs(f); $$('[data-fav="' + id + '"]').forEach(b => b.setAttribute("aria-pressed", "true")); $("#notify-p").textContent = PROD(id).brand + " " + PROD(id).name + " — " + PROD(id).pn; open("#m-notify"); }
      return;
    }
    const rfq = t.closest("[data-rfq]");
    if (rfq) { e.preventDefault(); const p = PROD(rfq.dataset.rfq), box = $("#rfq-item"); if (p) { box.style.display = "flex"; box.innerHTML = '<img src="' + A(p.img) + '" alt="" style="width:46px;height:40px;object-fit:contain"><span><b>' + esc(p.brand) + "</b> " + esc(p.name) + '<br><span class="muted">' + esc(p.pn) + "</span></span>"; } else box.style.display = "none"; open("#m-rfq"); return; }
    if (t.closest("[data-sheet]")) { e.preventDefault(); toast("Datasheet download starts (PDF from the manufacturer)", "download"); return; }
    if (t.closest("[data-cmp-clear]")) { setCmp([]); $$("[data-cmp]").forEach(x => (x.checked = false)); return; }
    const ts = t.closest("[data-ts], .ts__fab");
    if (ts) { e.preventDefault(); const w = $("#ts"), on = !w.classList.contains("is-open"); w.classList.toggle("is-open", on); $(".ts__fab").setAttribute("aria-expanded", on); return; }
    if (!t.closest(".ts")) { const w = $("#ts"); if (w) w.classList.remove("is-open"); }
  });
  document.addEventListener("change", e => {
    const c = e.target.closest("[data-cmp]"); if (!c) return;
    let a = getCmp();
    if (c.checked) { if (a.length >= 4) { c.checked = false; toast("You can compare up to 4 products", "info"); return; } a.push(c.dataset.cmp); }
    else a = a.filter(x => x !== c.dataset.cmp);
    setCmp(a);
  });
  document.addEventListener("submit", e => {
    const f = e.target;
    if (f.matches("[data-toast]")) { e.preventDefault(); closeAll(); toast(f.dataset.toast); f.reset && f.reset(); }
    if (f.matches("[data-news]")) { e.preventDefault(); toast("Subscribed — thank you!", "mail"); f.reset(); }
  });

  // ---------- shared blocks ----------
  function crumbs(list) {
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="' + L("index.html") + '">' + ic("home", "icon--sm") + "Home</a>" + list.map(([t, h]) => ic("chev") + (h ? '<a href="' + h + '">' + esc(t) + "</a>" : "<span>" + esc(t) + "</span>")).join("") + "</nav>";
  }
  function sidebox(head, headIcon, items, activeTitle) {
    return '<div class="sidebox"><div class="sidebox__head">' + ic(headIcon) + esc(head) + "</div><ul>" + items.map(([t, h, i]) => '<li><a href="' + h + '"' + (t === activeTitle ? ' aria-current="page"' : "") + ">" + (i ? ic(i) : "") + esc(t) + ic("chev") + "</a></li>").join("") + "</ul></div>";
  }
  function filterBox(groups, extra) {
    return '<form class="filters" id="filters"><h2>Filter By</h2>' + groups.map((g, gi) => {
      const opts = g.options || [];
      const body = g.name.startsWith("Price") ? '<div class="price-range"><input class="input" name="min" inputmode="numeric" placeholder="Min" aria-label="Min price"><span>-</span><input class="input" name="max" inputmode="numeric" placeholder="Max" aria-label="Max price"></div>' :
        '<div class="opts">' + opts.slice(0, 9).map(o => '<label class="check"><input type="checkbox" name="' + esc(g.name) + '" value="' + esc(o.label) + '"><span>' + esc(o.label) + (o.count != null ? " <i>(" + num(o.count) + ")</i>" : "") + "</span></label>").join("") + (opts.length > 9 || opts.length >= 6 ? '<a class="more" href="#">View More</a>' : "") + "</div>";
      return '<details class="fgroup"' + (g.open !== false && (opts.length || g.name.startsWith("Price")) && gi < 5 ? " open" : "") + "><summary>" + esc(g.name) + ic("chevd") + "</summary>" + body + "</details>";
    }).join("") + '<button class="btn btn--primary btn--block btn--apply">' + (extra || "Apply") + "</button></form>";
  }
  function banner(h) {
    return '<section class="pbanner" style="--hero-img:url(\'' + A(h.image) + '\')"><div class="pbanner__copy"><h1>' + esc(h.title) + "</h1>" +
      (h.tagline ? '<p class="pbanner__tag">' + esc(h.tagline) + "</p>" : "") + (h.text ? '<p class="pbanner__text">' + esc(h.text) + "</p>" : "") +
      '<div class="pbanner__feats">' + (h.features || []).map(f => "<div>" + ic(featIcon(f.title + " " + f.sub)) + "<b>" + esc(f.title) + "</b><span>" + esc(f.sub) + "</span></div>").join("") + "</div></div></section>";
  }
  function toolbar(title, count) {
    return '<div class="toolbar"><h2>' + esc(title) + ' <small id="count">' + num(count) + ' Products</small></h2><div class="toolbar__r"><button class="btn btn--line btn--sm filters-btn" type="button" data-filters>' + ic("filter", "icon--sm") + 'Filters</button><label for="sort">Sort By:</label><select class="select" id="sort"><option value="pop">Most Popular</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="stock">In Stock First</option><option value="az">Name A–Z</option></select>' +
      '<div class="viewtog" role="group" aria-label="View"><button type="button" aria-pressed="true" data-view="grid" aria-label="Grid view">' + ic("grid4") + '</button><button type="button" aria-pressed="false" data-view="list" aria-label="List view">' + ic("list") + "</button></div></div></div><div class=\"active-filters\" id=\"chips\"></div>";
  }
  function brandStrip(title, items) {
    return '<section class="bstrip"><div class="sec-head" style="margin:0"><h2>' + esc(title) + '</h2><a class="link" href="' + L("brands.html") + '">View All Brands ' + ic("arrow", "icon--sm") + '</a></div><div class="blogos">' + items.map(b => { const s = bslug(b.name), master = BRAND(s), img = (master && master.img) || b.img; return '<a class="blogo" href="' + L("search.html?brand=" + s) + '" title="' + esc(b.name) + '">' + (img ? '<img src="' + A(img) + '" alt="' + esc(b.name) + '" loading="lazy">' : '<span class="blogo--txt">' + esc(b.name) + "</span>") + "</a>"; }).join("") + "</div></section>";
  }
  const HELP_ICON = [/choos|help|expert|support/i, "headset"];
  function helps(list) {
    return '<section class="helps">' + list.map((h, i) => {
      const href = /quote|rfq|list|bom/i.test(h.cta) ? L("rfq.html?t=bom") : /project|fleet|shutdown/i.test(h.cta + h.title) ? L("rfq.html?t=project") : /replace|obsolete/i.test(h.cta + h.title) ? L("obsolete.html") : /partner/i.test(h.cta) ? "#" : "#ts";
      const extra = /partner/i.test(h.cta) ? ' data-open="#m-partner"' : href === "#ts" ? " data-ts" : "";
      const icon = i === 1 || /list of items/i.test(h.title) ? "file" : /obsolete/i.test(h.title) ? "swap" : HELP_ICON[1];
      return '<article class="help' + (h.img ? " help--img" : "") + '">' + (h.img ? '<div class="help__img" style="background-image:url(\'' + A(h.img) + '\')"></div>' : ic(icon)) +
        "<div><h3>" + esc(h.title) + "</h3><p>" + esc(h.text) + '</p><a class="btn btn--primary" href="' + href + '"' + extra + ">" + esc(h.cta) + " " + ic("arrow", "icon--sm") + "</a></div></article>";
    }).join("") + "</section>";
  }

  // listing engine shared by category / industry / search
  function listing(o) {
    // o: { side, banner, tilesHTML, title, count, products, filters, brandsTitle, brands, help }
    $("#main").innerHTML = '<div class="wrap">' + crumbs(o.crumbs) + '<div class="listing"><aside class="listing__side" id="lside">' + o.side + filterBox(o.filters) + (o.sideExtra || "") + "</aside>" +
      '<div class="listing__main">' + (o.banner || "") + (o.tilesHTML || "") + (o.before || "") + toolbar(o.title, o.count) + '<div class="pgrid" id="grid"></div>' +
      (o.brands && o.brands.length ? brandStrip(o.brandsTitle, o.brands) : "") + (o.help ? helps(o.help) : "") + "</div></div></div>";
    const grid = $("#grid"), form = $("#filters"), chips = $("#chips");
    function apply() {
      const fd = new FormData(form), checked = [];
      for (const [k, v] of fd.entries()) if (v && !["min", "max"].includes(k)) checked.push([k, v]);
      const min = +fd.get("min") || 0, max = +fd.get("max") || Infinity;
      const brandSel = checked.filter(([k]) => /brand/i.test(k)).map(([, v]) => bslug(v));
      const avail = checked.filter(([k]) => /availab/i.test(k)).map(([, v]) => /stock/i.test(v) ? "in" : "request");
      let list = o.products.filter(p => (!brandSel.length || brandSel.includes(bslug(p.brand))) && (!avail.length || avail.includes(p.stock)) && p.price >= min && p.price <= max);
      const s = $("#sort").value;
      if (s === "low") list.sort((a, b) => a.price - b.price);
      if (s === "high") list.sort((a, b) => b.price - a.price);
      if (s === "stock") list.sort((a, b) => (a.stock === "in" ? 0 : 1) - (b.stock === "in" ? 0 : 1));
      if (s === "az") list.sort((a, b) => a.name.localeCompare(b.name));
      grid.innerHTML = list.length ? cards(list) : '<div class="empty" style="grid-column:1/-1">' + ic("search") + "<p>No products match these filters.</p><a class=\"btn btn--primary\" href=\"" + L("rfq.html") + "\">Send us an RFQ — we source it for you</a></div>";
      chips.innerHTML = checked.map(([k, v]) => '<span class="chip">' + esc(v) + '<button type="button" data-unf="' + esc(k) + "|" + esc(v) + '" aria-label="Remove">' + ic("x", "icon--sm") + "</button></span>").join("") + (min || max < Infinity ? '<span class="chip">AED ' + (min || 0) + "–" + (max < Infinity ? max : "∞") + "</span>" : "");
      $("#count").textContent = checked.length || min || max < Infinity ? list.length + " results" : num(o.count) + " Products";
      reveal(grid);
    }
    form.addEventListener("change", apply);
    form.addEventListener("submit", e => { e.preventDefault(); apply(); $("#lside").classList.remove("is-open"); });
    $("#sort").addEventListener("change", apply);
    chips.addEventListener("click", e => { const b = e.target.closest("[data-unf]"); if (!b) return; const [k, v] = b.dataset.unf.split("|"); const i = $$("input", form).find(x => x.name === k && x.value === v); if (i) i.checked = false; apply(); });
    $$("[data-view]").forEach(b => b.addEventListener("click", () => { $$("[data-view]").forEach(x => x.setAttribute("aria-pressed", x === b)); grid.classList.toggle("is-list", b.dataset.view === "list"); }));
    $("[data-filters]").addEventListener("click", () => $("#lside").classList.toggle("is-open"));
    if (o.preset) { const i = $$("input", form).find(x => bslug(x.value) === o.preset); if (i) i.checked = true; }
    apply();
  }
  const productsOf = list => list.map(PROD).filter(Boolean);

  // =====================================================================
  const pages = {};

  // ---------- home ----------
  pages.home = function () {
    const H = D.hero;
    const feat = { "Best Selling": D.featured, "New Arrivals": D.arrivals, "Special Offers": D.offers };
    $("#main").innerHTML =
      '<section class="hero"><div class="hero__img" style="background-image:url(\'' + A(H.image) + '\')"></div><div class="wrap hero__row"><div class="hero__copy">' +
      "<h1>" + esc(H.title.replace(H.titleAccent, "").trim()).replace(/^(\S+ \S+) /, "$1<br>") + " <em>" + esc(H.titleAccent) + "</em></h1>" +
      '<p class="hero__sub">' + H.sub.map(s => "<span>" + esc(s) + "</span>").join("") + "</p>" +
      '<div class="hero__ctas"><a class="btn btn--primary" href="' + L("category.html?c=automation") + '">' + ic("cart") + esc(H.ctas[0]) + ic("chev", "icon--sm") + '</a><button class="btn btn--white" data-rfq>' + ic("file") + esc(H.ctas[1]) + ic("chev", "icon--sm") + '</button><a class="btn btn--ghost" href="' + L("rfq.html?t=bom") + '">' + ic("upload") + esc(H.ctas[2]) + ic("chev", "icon--sm") + "</a></div></div>" +
      '<div class="benefits">' + H.benefits.map(b => "<div>" + ic(featIcon(b.title)) + "<b>" + esc(b.title) + "</b><span>" + esc(b.sub) + "</span></div>").join("") + "</div></div>" +
      '<div class="hero__dots">' + Array.from({ length: H.slides || 4 }, (_, i) => '<button aria-label="Slide ' + (i + 1) + '" aria-current="' + (i === 1) + '"></button>').join("") + "</div></section>" +
      '<div class="wrap">' +
      // categories + industries
      '<section class="sec duo"><div><div class="sec-head"><h2>Shop by Category</h2><a class="link" href="#" data-open="#catdrawer">View All Categories ' + ic("arrow", "icon--sm") + '</a></div><div class="tiles tiles--9">' +
      D.categories.map(c => { const cc = CAT.categories.find(x => x.title === c.name || x.short === c.name); return '<a class="tile reveal" href="' + L("category.html?c=" + (cc ? cc.slug : "")) + '"><img src="' + A(c.img) + '" alt="" loading="lazy"><span>' + esc(c.name) + "</span></a>"; }).join("") + "</div></div>" +
      '<div><div class="sec-head"><h2>Shop by Industry</h2><a class="link" href="' + L("industry.html?i=oil-gas") + '">View All Industries ' + ic("arrow", "icon--sm") + '</a></div><div class="tiles tiles--7">' +
      D.industries.map(c => { const ii = CAT.industries.find(x => x.short === c.name || x.title === c.name); return '<a class="tile tile--photo reveal" href="' + L("industry.html?i=" + (ii ? ii.slug : "")) + '"><img src="' + A(c.img) + '" alt="" loading="lazy"><span>' + esc(c.name) + "</span></a>"; }).join("") + "</div></div></section>" +
      // featured + popular
      '<section class="sec duo duo--feat"><div><div class="sec-head"><div style="display:flex;align-items:baseline"><h2>Featured Products</h2><div class="ftabs" role="tablist">' + D.tabs.map((t, i) => '<button role="tab" aria-selected="' + (i === 0) + '" data-ftab="' + esc(t) + '">' + esc(t) + "</button>").join("") + '</div></div><a class="link" href="' + L("search.html?q=") + '">View All Products ' + ic("arrow", "icon--sm") + '</a></div><div class="pgrid pgrid--5" id="feat"></div></div>' +
      '<aside class="popbox"><h2>' + ic("search") + 'Popular Searches</h2><div class="chips">' + D.popular.map(t => '<a class="chip" href="' + L("search.html?q=" + encodeURIComponent(t)) + '">' + esc(t) + "</a>").join("") + "</div></aside></section>" +
      // promo cards
      '<section class="sec promos">' + promo(D.promos[0], "camera", "", [["btn--primary", L("rfq.html?t=identify"), "camera"], ["btn--line", "#ts", "headset"]]) + promo(D.promos[1], "file", "promo--warm", [["btn--primary", L("rfq.html?t=project"), ""]]) + promo(D.promos[2], "globe", "promo--sea", [["btn--primary", L("rfq.html?t=sourcing"), "arrow"]]) + "</section>" +
      // shop by application (client idea)
      '<section class="sec"><div class="sec-head"><h2>Shop by Application <small>Find parts by the system you are building or maintaining</small></h2></div><div class="apps">' +
      CAT.applications.map(a => '<article class="app reveal"><h3><span class="ic">' + ic(a.icon) + "</span>" + esc(a.name) + '</h3><div class="chips">' + a.items.map(t => '<a class="chip" href="' + L("search.html?q=" + encodeURIComponent(t) + "&app=" + a.slug) + '">' + esc(t) + "</a>").join("") + "</div></article>").join("") + "</div></section>" +
      // obsolete alternatives (client idea)
      altSection(CAT.obsolete[0]) +
      // project / bulk (client idea)
      '<section class="sec"><div class="project"><div class="project__copy"><span style="color:var(--yellow);font-weight:700;letter-spacing:.08em;font-size:12px">FOR COMPANIES</span><h2>Buying for a project?</h2><p>Special pricing for bulk and project requirements.</p><ul>' + ["Bulk quantities", "Project requirements", "Consolidated supply", "Multiple manufacturers", "RFQ support", "Dedicated account manager"].map(t => "<li>" + ic("check", "icon--sm") + t + "</li>").join("") +
      '</ul><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><a class="btn btn--primary btn--lg" href="' + L("rfq.html?t=project") + '">Request Project Pricing ' + ic("arrow", "icon--sm") + '</a><a class="btn btn--ghost btn--lg" href="' + L("rfq.html?t=bom") + '">' + ic("upload") + "Upload BOM</a></div></div>" +
      '<div class="project__img" style="background-image:url(\'' + A(IND("oil-gas").hero.image) + '\')"></div></div></section></div>' +
      // why strip
      '<section class="why"><div class="wrap why__row"><span>' + ic("shield") + "<b>Why NAS.AE?</b></span>" + D.why.map((w, i) => "<span>" + ic(["shield", "tag", "cog", "globe", "truck", "users"][i] || "check") + esc(w) + "</span>").join("") +
      '<a class="wa-bar" href="https://wa.me/97121234567" target="_blank" rel="noopener">' + ic("wa") + "<span><b>Need Help?</b> Chat with us on WhatsApp</span>" + ic("chev", "icon--sm") + "</a></div></section>";
    const fg = $("#feat");
    const show = t => { fg.innerHTML = cards(productsOf(feat[t] || D.featured)); reveal(fg); };
    show(D.tabs[0]);
    $(".ftabs").addEventListener("click", e => { const b = e.target.closest("[data-ftab]"); if (!b) return; $$(".ftabs button").forEach(x => x.setAttribute("aria-selected", x === b)); show(b.dataset.ftab); });
    // hero dots: cycle the background crops of the reference banners
    const imgs = [H.image].concat(CAT.categories.slice(0, 3).map(c => c.hero.image));
    $$(".hero__dots button").forEach((b, i) => b.addEventListener("click", () => { $(".hero__img").style.backgroundImage = "url('" + A(imgs[i % imgs.length]) + "')"; $$(".hero__dots button").forEach(x => x.setAttribute("aria-current", x === b)); }));
  };
  function promo(p, icon, cls, ctas) {
    return '<article class="promo ' + cls + '" style="--promo-img:url(\'' + A(p.img) + '\')">' + ic(icon) + "<h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p>" +
      (p.bullets && p.bullets.length ? "<ul>" + p.bullets.map(b => "<li>" + ic("check") + esc(b) + "</li>").join("") + "</ul>" : "") +
      '<div class="btns">' + p.ctas.map((c, i) => { const [k, h, ii] = ctas[i] || ctas[0]; return '<a class="btn ' + k + '" href="' + h + '"' + (h === "#ts" ? " data-ts" : "") + ">" + (ii && i === 0 && ii !== "arrow" ? ic(ii, "icon--sm") : ii && i > 0 ? ic(ii, "icon--sm") : "") + esc(c) + (ii === "arrow" ? " " + ic("arrow", "icon--sm") : "") + "</a>"; }).join("") + "</div></article>";
  }
  function altSection(o) {
    const a = PROD(o.from), b = PROD(o.to);
    return '<section class="sec"><div class="alt"><div><span class="badge badge--warn">' + ic("swap", "icon--sm") + "Recommended Alternatives</span><h2 style=\"margin-top:8px\">Looking for an obsolete product?</h2><p>Industrial products frequently become obsolete or unavailable. Enter the old part number and we suggest a compatible current replacement — checked by our engineers.</p>" +
      '<form action="' + L("obsolete.html") + '" style="display:flex;gap:8px;margin-top:12px"><input class="input" name="pn" placeholder="Old part number, e.g. ' + esc(a.pn) + '"><button class="btn btn--primary">Find</button></form></div>' +
      '<div class="altflow"><a class="altcard altcard--old" href="' + L("product.html?id=" + a.id) + '"><img src="' + A(a.img) + '" alt=""><span><small>Original product · Discontinued</small><b>' + esc(a.brand) + "</b> " + esc(a.name) + "<br>" + esc(a.pn) + "</span></a>" + ic("arrow") +
      '<a class="altcard altcard--new" href="' + L("product.html?id=" + b.id) + '"><img src="' + A(b.img) + '" alt=""><span><small>Recommended replacement</small><b>' + esc(b.brand) + "</b> " + esc(b.name) + "<br>" + esc(b.pn) + "</span></a>" + ic("arrow") +
      '<a class="btn btn--line" href="' + L("obsolete.html?pn=" + encodeURIComponent(a.pn)) + '">Check Compatibility</a></div></div></section>';
  }

  // ---------- category ----------
  pages.category = function () {
    const c = CATG(qs("c")) || CAT.categories[0];
    document.title = c.title + " | NAS.AE Store";
    const sub = qs("sub");
    const all = productsOf(c.products).concat(CAT.products.filter(p => p.cat === c.slug && !c.products.includes(p.id)));
    listing({
      crumbs: [[c.title, sub ? L("category.html?c=" + c.slug) : ""]].concat(sub ? [[sub, ""]] : []),
      side: sidebox(c.title, CAT_ICON[c.slug], c.sidebar.items.map(s => [s, L("category.html?c=" + c.slug + "&sub=" + encodeURIComponent(s))]), sub),
      sideExtra: sidebox("All Categories", "grid4", CAT.categories.filter(x => x.slug !== c.slug).map(x => [x.title, L("category.html?c=" + x.slug), CAT_ICON[x.slug]])).replace('class="sidebox"', 'class="sidebox" style="margin-top:10px"'),
      banner: banner(c.hero),
      tilesHTML: c.tiles.items.length ? (c.tiles.heading ? '<div class="sec-head" style="margin:0"><h2>' + esc(c.tiles.heading) + "</h2></div>" : "") + '<div class="subtiles">' + c.tiles.items.map((t, i) => '<a class="tile" href="' + L("category.html?c=" + c.slug + "&sub=" + encodeURIComponent(t.name)) + '"' + ((sub ? t.name === sub : i === 0 && !c.tiles.heading) ? ' aria-current="true"' : "") + '><img src="' + A(t.img) + '" alt="" loading="lazy"><span>' + esc(t.name) + "</span></a>").join("") + "</div>" : "",
      title: sub || c.products_heading, count: c.count, products: all, filters: c.filters,
      brandsTitle: c.topBrands.heading, brands: c.topBrands.items, help: c.help
    });
  };

  // ---------- industry ----------
  pages.industry = function () {
    const c = IND(qs("i")) || CAT.industries[0];
    document.title = c.title + " | NAS.AE Store";
    const app = qs("app");
    listing({
      crumbs: [["Industries", L("industry.html?i=oil-gas")], [c.title, app ? L("industry.html?i=" + c.slug) : ""]].concat(app ? [[app, ""]] : []),
      side: sidebox("Industries", "menu", CAT.industries.map(x => [x.title, L("industry.html?i=" + x.slug), IND_ICON[x.slug]]), c.title),
      banner: banner(c.hero),
      tilesHTML: '<div class="sec-head" style="margin:0"><h2>' + esc(c.tiles.heading) + '</h2></div><div class="atiles">' + c.tiles.items.map(t => '<a class="atile reveal" href="' + L("industry.html?i=" + c.slug + "&app=" + encodeURIComponent(t.name)) + '"' + (t.name === app ? ' style="border-color:var(--blue-600);box-shadow:0 0 0 1px var(--blue-600)"' : "") + '><img src="' + A(t.img) + '" alt="" loading="lazy"><span>' + esc(t.name) + "</span></a>").join("") + "</div>",
      title: app ? app : c.products_heading, count: c.count, products: productsOf(c.products).concat(CAT.products.filter(p => (p.industries || []).includes(c.slug) && !c.products.includes(p.id))), filters: c.filters,
      brandsTitle: c.topBrands.heading, brands: c.topBrands.items, help: c.help
    });
  };

  // ---------- search / brand / deals / application ----------
  pages.search = function () {
    const q = (qs("q") || "").trim(), b = qs("brand"), deals = qs("deals"), appSlug = qs("app");
    const brand = b && BRAND(b), app = appSlug && CAT.applications.find(a => a.slug === appSlug);
    let list = CAT.products.slice();
    if (q && q !== "datasheet") {
      const ql = q.toLowerCase(), words = ql.split(/\s+/).filter(w => w.length > 1);
      const hay = p => (p.brand + " " + p.name + " " + p.pn + " " + (CATG(p.cat) || {}).title).toLowerCase();
      const byTag = list.filter(p => (p.tags || []).some(t => t.toLowerCase() === ql));
      const all = list.filter(p => words.every(w => hay(p).includes(w)));
      list = byTag.length ? byTag : all.length ? all : list.filter(p => words.some(w => hay(p).includes(w)));
    }
    if (brand) list = list.filter(p => bslug(p.brand) === brand.slug);
    if (deals) list = list.filter(p => p.deal);
    const title = brand ? brand.name : deals ? "Deals" : q ? "Results for “" + q + "”" : "All Products";
    document.title = title + " | NAS.AE Store";
    const hero = brand ? { title: brand.name, tagline: num(brand.products) + " genuine " + brand.name + " products", text: "Authorised-source products with datasheets, technical support and delivery across the UAE and worldwide.", features: CAT.brandsPage.hero.features, image: CAT.brandsPage.hero.image } :
      deals ? { title: "Deals", tagline: "Limited-time prices on stocked industrial products", text: "Prices excl. VAT. While stock lasts.", features: [{ title: "Genuine Products", sub: "Trusted Brands" }, { title: "Fast Delivery", sub: "UAE & Worldwide" }], image: CAT.home.hero.image } : null;
    const brandsIn = [...new Set(list.map(p => p.brand))];
    listing({
      crumbs: brand ? [["Brands", L("brands.html")], [brand.name, ""]] : [[title, ""]],
      side: sidebox("All Categories", "grid4", CAT.categories.map(x => [x.title, L("category.html?c=" + x.slug), CAT_ICON[x.slug]])),
      banner: hero ? banner(hero) : "",
      before: app ? '<div class="notice">' + ic("cpu") + "<span>Application: <b>" + esc(app.name) + "</b> — " + app.items.map(t => '<a class="link" href="' + L("search.html?q=" + encodeURIComponent(t) + "&app=" + app.slug) + '">' + esc(t) + "</a>").join(" · ") + "</span></div>" :
        (!list.length ? '<div class="notice notice--warn">' + ic("info") + "<span>We couldn't find “" + esc(q) + "” in the catalogue. Our team can source it — <a class=\"link\" href=\"" + L("rfq.html?t=sourcing&pn=" + encodeURIComponent(q)) + "\">send your requirement</a>.</span></div>" : ""),
      title, count: list.length, products: list,
      filters: [{ name: "Brand", options: brandsIn.map(n => ({ label: n, count: list.filter(p => p.brand === n).length })) }, { name: "Product Category", options: CAT.categories.filter(c => list.some(p => p.cat === c.slug)).map(c => ({ label: c.title, count: list.filter(p => p.cat === c.slug).length })) }, { name: "Availability", options: [{ label: "In Stock", count: list.filter(p => p.stock === "in").length }, { label: "Available on Request", count: list.filter(p => p.stock !== "in").length }] }, { name: "Price Range (AED)" }],
      help: CAT.categories[0].help
    });
  };

  // ---------- brands ----------
  pages.brands = function () {
    const B = CAT.brandsPage;
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["Brands", ""]]) + '<div class="listing"><aside class="listing__side" id="lside">' +
      sidebox("All Categories", "grid4", CAT.categories.map(x => [x.title, L("category.html?c=" + x.slug), CAT_ICON[x.slug]]).concat([["Brands", L("brands.html"), "medal"]]), "Brands") +
      filterBox(B.filters, "Apply Filters") + '<div class="supbox">' + ic("handshake") + "<b>" + esc(B.supplierBox.title) + "</b><span>" + esc(B.supplierBox.sub) + '</span><button class="btn btn--primary btn--sm" data-open="#m-partner" style="justify-self:start">' + esc(B.supplierBox.cta) + " " + ic("arrow", "icon--sm") + "</button></div></aside>" +
      '<div class="listing__main">' + banner(B.hero) +
      '<div class="toolbar"><div class="btabs" role="tablist">' + B.tabs.map((t, i) => '<button role="tab" aria-selected="' + (i === 0) + '" data-btab="' + i + '">' + esc(t).replace(/\((\d+)\)/, "(" + CAT.brands.length + ")") + "</button>").join("") + '</div><label class="hsearch" style="max-width:270px"><form onsubmit="return false"><input id="bq" placeholder="Search brands..." aria-label="Search brands"><button type="button" aria-label="Search">' + ic("search") + "</button></form></label></div>" +
      '<div class="azbar" id="az" hidden></div><div class="bcards" id="bgrid"></div>' +
      brandStrip("Featured Brands", B.featured.map(n => ({ name: n }))) + helps(B.help) + "</div></div></div>";
    let tab = 0, letter = "";
    const grid = $("#bgrid"), az = $("#az");
    az.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => '<button type="button" data-l="' + l + '"' + (CAT.brands.some(b => b.name[0].toUpperCase() === l) ? "" : " disabled") + ">" + l + "</button>").join("");
    function show() {
      const q = $("#bq").value.trim().toLowerCase();
      let list = tab === 1 ? CAT.brands.filter(b => B.featured.map(bslug).includes(b.slug)) : CAT.brands.slice();
      if (tab === 2) list.sort((a, b) => a.name.localeCompare(b.name));
      if (letter) list = list.filter(b => b.name[0].toUpperCase() === letter);
      if (q) list = list.filter(b => b.name.toLowerCase().includes(q));
      grid.innerHTML = list.map(b => '<a class="bcard reveal" href="' + L("search.html?brand=" + b.slug) + '"><div class="bcard__logo">' + (b.img ? '<img src="' + A(b.img) + '" alt="' + esc(b.name) + '" loading="lazy">' : '<span class="blogo--txt" style="font-size:20px;color:' + (BRAND_COLOR[b.slug] || "var(--navy-900)") + '">' + esc(b.name) + "</span>") + '</div><div class="bcard__meta">' + esc(b.name) + ic("chev") + "<small>" + num(b.products) + " Products</small></div></a>").join("") || '<div class="empty" style="grid-column:1/-1">' + ic("search") + "<p>No brand found.</p></div>";
      reveal(grid);
    }
    $(".btabs").addEventListener("click", e => { const b = e.target.closest("[data-btab]"); if (!b) return; tab = +b.dataset.btab; letter = ""; $$(".btabs button").forEach(x => x.setAttribute("aria-selected", x === b)); az.hidden = tab !== 2; $$("#az button").forEach(x => x.setAttribute("aria-pressed", "false")); show(); });
    az.addEventListener("click", e => { const b = e.target.closest("[data-l]"); if (!b) return; letter = letter === b.dataset.l ? "" : b.dataset.l; $$("#az button").forEach(x => x.setAttribute("aria-pressed", x.dataset.l === letter)); show(); });
    $("#bq").addEventListener("input", show);
    $("#filters").addEventListener("submit", e => { e.preventDefault(); toast("Filters applied", "filter"); });
    show();
  };

  // ---------- product ----------
  pages.product = function () {
    const p = PROD(qs("id")) || PROD(D.featured[0]);
    const c = CATG(p.cat), s = SELLER(p.seller), rep = p.replacement && PROD(p.replacement);
    document.title = p.brand + " " + p.name + " " + p.pn + " | NAS.AE Store";
    const others = CAT.sellers.filter(x => x.id !== p.seller).slice(0, 2).map((x, i) => ({ s: x, price: Math.round(p.price * (1.03 + i * .04)), stock: i ? "request" : p.stock, eta: i ? "5–7 days" : "2–3 days" }));
    const specs = [["Manufacturer", p.brand], ["Part Number (MPN)", p.pn || "On request"], ["Category", c ? c.title : ""], ["Product Type", p.name], ["Availability", stockTxt(p.stock)], ["Condition", "New, factory sealed"], ["Country of Origin", { Siemens: "Germany", ABB: "Switzerland / Finland", Fluke: "USA", "Endress+Hauser": "Germany", Omron: "Japan", Mitsubishi: "Japan" }[p.brand] || "As per manufacturer"], ["Warranty", "12 months manufacturer warranty"], ["HS Code", "8537.10"], ["Weight", "On datasheet"]];
    const brandRec = BRAND(bslug(p.brand));
    $("#main").innerHTML = '<div class="wrap">' + crumbs([[c ? c.title : "Products", c ? L("category.html?c=" + c.slug) : ""], [p.pn || p.name, ""]]) +
      '<section class="pdp"><div class="gallery"><div class="gallery__main"><img id="g-main" src="' + A(p.img) + '" alt="' + esc(p.brand + " " + p.name) + '"><button class="fav" data-fav="' + p.id + '" aria-pressed="' + isFav(p.id) + '" aria-label="Favourite">' + ic("heart") + "</button></div>" +
      '<div class="gallery__thumbs"><button aria-current="true"><img src="' + A(p.img) + '" alt=""></button>' + ["Side view", "Nameplate", "Dimensions", "Packaging"].map(t => "<button>" + t + "</button>").join("") + "</div></div>" +
      '<div class="pinfo"><div class="pinfo__brand">' + (brandRec && brandRec.img ? '<a href="' + L("search.html?brand=" + brandRec.slug) + '"><img src="' + A(brandRec.img) + '" alt="' + esc(p.brand) + '"></a>' : brandMark(p.brand, "pcard__brand")) + '<span class="badge badge--info">Genuine product</span></div>' +
      "<h1>" + esc(p.name) + "</h1>" +
      '<div class="pinfo__ids">' + (p.pn ? '<span>Part No. <b>' + esc(p.pn) + "</b></span>" : "") + "<span>Brand <b>" + esc(p.brand) + "</b></span>" + (s ? '<span>Sold by <a class="link" href="' + L("vendor.html?v=" + s.id) + '">' + sellerLab(s) + "</a> via NAS.AE</span>" : "") + "</div>" +
      '<span class="stock stock--' + p.stock + '" style="font-size:14px">' + stockTxt(p.stock) + (p.stock === "in" ? " — ships in 1–2 working days" : p.stock === "request" ? " — lead time confirmed with your quote" : "") + "</span>" +
      (p.stock === "obsolete" && rep ? '<div class="notice notice--warn">' + ic("alert") + "<span>This product is discontinued by the manufacturer. Recommended replacement: <a class=\"link\" href=\"" + L("product.html?id=" + rep.id) + "\">" + esc(rep.brand + " " + rep.name + " " + rep.pn) + "</a></span></div>" : "") +
      '<div class="pinfo__price">' + aed(p.price) + "<small>(Excl. VAT)</small></div>" +
      '<dl class="specs">' + specs.slice(0, 6).map(([k, v]) => "<div><dt>" + k + "</dt><dd>" + esc(v) + "</dd></div>").join("") + "</dl>" +
      '<div style="display:flex;gap:18px;flex-wrap:wrap;font-size:13px"><a class="link" href="#" data-sheet="' + p.id + '">' + ic("file", "icon--sm") + 'Datasheet (PDF)</a><label class="link" style="cursor:pointer"><input type="checkbox" data-cmp="' + p.id + '"' + (getCmp().includes(p.id) ? " checked" : "") + "> Compare</label><a class=\"link\" href=\"" + L("obsolete.html?pn=" + encodeURIComponent(p.pn)) + "\">" + ic("swap", "icon--sm") + "Find alternatives</a></div></div>" +
      '<aside class="buybox"><div style="display:flex;gap:10px;align-items:center"><div class="qty"><button type="button" data-q="-1" aria-label="Less">' + ic("minus", "icon--sm") + '</button><input id="qty" type="number" value="1" min="1" aria-label="Quantity"><button type="button" data-q="1" aria-label="More">' + ic("plus", "icon--sm") + '</button></div><button class="btn btn--primary" style="flex:1;min-height:38px" id="add-main"' + (p.stock === "obsolete" ? " disabled" : "") + ">" + ic("cart", "icon--sm") + "Add to Cart</button></div>" +
      '<button class="btn btn--line btn--block" data-rfq="' + p.id + '">' + ic("file", "icon--sm") + "Request Quote / Bulk Price</button>" +
      '<div class="alertbox"><b>' + ic("heart") + "Stock & price alerts</b><span class=\"muted\">Save this product and we notify you when it's back in stock or the price drops.</span><button class=\"btn btn--line btn--sm\" data-fav=\"" + p.id + '" aria-pressed="' + isFav(p.id) + '">' + (isFav(p.id) ? "Saved to favourites" : "Save & notify me") + "</button></div>" +
      '<div class="buybox__row">' + ic("truck") + "<span><b>Delivery</b> across the UAE in 1–3 working days, worldwide on request</span></div>" +
      '<div class="buybox__row">' + ic("ret") + "<span><b>Returns & exchange</b> as per this part's policy agreed with the supplier; sensitive electronics are inspected before acceptance</span></div>" +
      '<div class="buybox__row">' + ic("shield") + "<span><b>Secure payment</b> — card, Apple Pay, bank transfer, COD</span></div>" +
      '<div class="buybox__row">' + ic("headset") + '<span><b>Technical support</b> — <a class="link" href="#ts" data-ts>ask an engineer</a></span></div></aside></section>' +
      // tabs
      '<section class="sec"><div class="ptabs" role="tablist"><button role="tab" aria-selected="true" aria-controls="pt-spec">Specifications</button><button role="tab" aria-selected="false" aria-controls="pt-offers">Offers (' + (others.length + 1) + ')</button><button role="tab" aria-selected="false" aria-controls="pt-files">Datasheets & Downloads</button><button role="tab" aria-selected="false" aria-controls="pt-alt">Alternatives</button><button role="tab" aria-selected="false" aria-controls="pt-ship">Shipping & Returns</button></div>' +
      '<div class="ptabpanel" id="pt-spec"><dl class="specs" style="max-width:820px">' + specs.map(([k, v]) => "<div><dt>" + k + "</dt><dd>" + esc(v) + "</dd></div>").join("") + "</dl></div>" +
      '<div class="ptabpanel" id="pt-offers" hidden><p class="muted" style="margin-bottom:10px;font-size:13px">The same part from other verified suppliers. Suppliers are shown by code; NAS.AE handles payment, invoicing and support.</p><div class="offers">' +
      [{ s, price: p.price, stock: p.stock, eta: "1–2 days" }].concat(others).map(o => '<div class="offer"><span><a class="link" href="' + L("vendor.html?v=" + o.s.id) + '">' + sellerLab(o.s) + '</a><br><span class="stock stock--' + o.stock + '">' + stockTxt(o.stock) + "</span> · Delivery " + o.eta + " · ★ " + o.s.rating + "</span><b>" + aed(o.price) + '</b><button class="btn btn--sm btn--primary" data-add="' + p.id + '">Add to Cart</button></div>').join("") + "</div></div>" +
      '<div class="ptabpanel" id="pt-files" hidden><div class="files">' + ["Datasheet", "Installation manual", "Declaration of conformity (CE)", "CAD / 3D model (STEP)"].map((f, i) => '<div class="file">' + ic("file") + "<span>" + esc(p.pn) + " — " + f + '</span><span class="muted">PDF · ' + (1.2 + i * .7).toFixed(1) + ' MB</span><a class="btn btn--sm btn--line" href="#" data-sheet="' + p.id + '">' + ic("download", "icon--sm") + "Download</a></div>").join("") + "</div></div>" +
      '<div class="ptabpanel" id="pt-alt" hidden>' + altBlock(p) + "</div>" +
      '<div class="ptabpanel" id="pt-ship" hidden><dl class="specs" style="max-width:720px"><div><dt>Standard (UAE)</dt><dd>2–4 working days · AED 15.00 per shipment</dd></div><div><dt>Express (UAE)</dt><dd>24 hours · AED 35.00 per shipment</dd></div><div><dt>Worldwide</dt><dd>Quoted per order</dd></div><div><dt>Returns & exchange</dt><dd>Per this part\'s policy agreed with the supplier; sensitive electronics are technically inspected before acceptance</dd></div></dl></div></section>' +
      '<section class="sec"><div class="sec-head"><h2>Related Products</h2></div><div class="pgrid pgrid--5">' + cards(CAT.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 5)) + "</div></section></div>";
    const qty = $("#qty");
    $(".buybox").addEventListener("click", e => { const q = e.target.closest("[data-q]"); if (q) qty.value = Math.max(1, (+qty.value || 1) + +q.dataset.q); });
    $("#add-main").addEventListener("click", () => { addToCart(p.id, +qty.value || 1); if (innerWidth > 1000) open("#minicart"); });
    $(".gallery__thumbs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) $$(".gallery__thumbs button").forEach(x => x.setAttribute("aria-current", x === b)); });
  };
  function altBlock(p) {
    const pair = CAT.obsolete.find(o => o.from === p.id || o.to === p.id);
    const sim = CAT.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);
    return (pair ? altSection(pair).replace('class="sec"', 'style="margin-bottom:14px"') : "") + '<p class="muted" style="font-size:13px;margin-bottom:10px">Similar products from other manufacturers — check compatibility with our engineers before ordering.</p><div class="pgrid">' + cards(sim, { reveal: false }) + "</div>";
  }

  // ---------- obsolete product search ----------
  pages.obsolete = function () {
    const pn = (qs("pn") || "").trim();
    const hit = pn && CAT.obsolete.find(o => PROD(o.from).pn.toLowerCase().includes(pn.toLowerCase()) || PROD(o.to).pn.toLowerCase() === pn.toLowerCase());
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["Support", ""], ["Obsolete Product Search", ""]]) +
      banner({ title: "Obsolete Product Search", tagline: "Find a current replacement for discontinued parts", text: "Enter the old part number from the nameplate. We match it to the manufacturer's successor and our engineers confirm compatibility (dimensions, wiring, firmware, certifications).", features: [{ title: "Engineer-checked", sub: "Compatibility notes" }, { title: "Genuine Products", sub: "Trusted Brands" }, { title: "Fast Delivery", sub: "UAE & Worldwide" }], image: CAT.categories[0].hero.image }) +
      '<section class="sec"><form class="panel panel__body" style="display:flex;gap:10px;flex-wrap:wrap" action=""><input class="input" name="pn" value="' + esc(pn) + '" placeholder="Old part number, e.g. 6ES7315-2EH14-0AB0" style="flex:1;min-width:240px"><button class="btn btn--primary btn--lg">' + ic("search") + "Find Replacement</button><a class=\"btn btn--line btn--lg\" href=\"" + L("rfq.html?t=identify") + "\">" + ic("camera") + "Upload nameplate photo</a></form></section>" +
      (pn ? (hit ? altSection(hit) + '<div class="notice">' + ic("info") + "<span><b>Compatibility notes:</b> " + esc(hit.notes) + "</span></div>" : '<div class="notice notice--warn">' + ic("info") + "<span>No automatic match for “" + esc(pn) + "”. Send it to our engineers — we reply with a verified replacement. <a class=\"link\" href=\"" + L("rfq.html?t=sourcing&pn=" + encodeURIComponent(pn)) + "\">Ask an engineer</a></span></div>") : "") +
      '<section class="sec"><div class="sec-head"><h2>Common replacements</h2></div><div class="panel" style="display:grid">' + CAT.obsolete.map(altRow).join("") + "</div></section></div>";
  };
  function altRow(o) {
    const a = PROD(o.from), b = PROD(o.to);
    return '<div class="altrow"><div class="altflow"><a class="altcard altcard--old" href="' + L("product.html?id=" + a.id) + '"><img src="' + A(a.img) + '" alt=""><span><small>Discontinued</small><b>' + esc(a.brand) + "</b> " + esc(a.name) + "<br>" + esc(a.pn) + "</span></a>" + ic("arrow") +
      '<a class="altcard altcard--new" href="' + L("product.html?id=" + b.id) + '"><img src="' + A(b.img) + '" alt=""><span><small>Replacement</small><b>' + esc(b.brand) + "</b> " + esc(b.name) + "<br>" + esc(b.pn) + "</span></a>" + ic("arrow") +
      '<a class="btn btn--line" href="' + L("obsolete.html?pn=" + encodeURIComponent(a.pn)) + '">Check Compatibility</a></div><p class="muted" style="font-size:12.5px">' + esc(o.notes) + "</p></div>";
  };

  // ---------- RFQ hub: quote, BOM, project, sourcing, identify part ----------
  pages.rfq = function () {
    const T = [["quote", "Request a Quote", "file"], ["bom", "Upload RFQ / BOM", "upload"], ["project", "Project & Bulk Pricing", "boxes"], ["sourcing", "Global Sourcing", "globe"], ["identify", "Identify a Part", "camera"]];
    const t = T.some(x => x[0] === qs("t")) ? qs("t") : "quote";
    const pn = qs("pn") || "";
    const forms = {
      quote: '<div class="form-grid form-grid--2"><div class="field"><label>Part number / model</label><input class="input" value="' + esc(pn) + '" placeholder="6ES7511-1AK02-0AB0" required></div><div class="field"><label>Manufacturer</label><input class="input" placeholder="Siemens"></div><div class="field"><label>Quantity</label><input class="input" type="number" min="1" value="1"></div><div class="field"><label>Required by</label><input class="input" type="date"></div><div class="field span-2"><label>Notes</label><textarea class="textarea" placeholder="Delivery location, alternatives accepted, certificates needed…"></textarea></div></div>',
      bom: '<label class="upload">' + ic("upload", "icon--lg") + "<span><b>Drop your RFQ or BOM file</b> — XLSX, CSV or PDF up to 20 MB. Columns: part number, manufacturer, quantity.</span><input type=\"file\" hidden></label><div class=\"field\"><label>Or paste a list</label><textarea class=\"textarea\" placeholder=\"6ES7511-1AK02-0AB0, Siemens, 2&#10;ACS880-01-07A3-4, ABB, 1\"></textarea></div>",
      project: '<div class="form-grid form-grid--2"><div class="field"><label>Project name</label><input class="input" required></div><div class="field"><label>Industry</label><select class="select">' + CAT.industries.map(i => "<option>" + esc(i.title) + "</option>").join("") + '</select></div><div class="field"><label>Estimated value (AED)</label><select class="select"><option>Under 50,000</option><option>50,000 – 250,000</option><option>250,000 – 1M</option><option>Over 1M</option></select></div><div class="field"><label>Delivery schedule</label><select class="select"><option>Single delivery</option><option>Phased / call-off</option></select></div><div class="field span-2"><label>Scope</label><textarea class="textarea" placeholder="Bulk quantities, consolidated supply from multiple manufacturers, site delivery…"></textarea></div></div><label class="upload">' + ic("upload", "icon--lg") + "<span><b>Attach BOM / specification</b> (optional)</span><input type=\"file\" hidden></label>",
      sourcing: '<div class="notice">' + ic("globe") + '<span>NAS can source industrial equipment and spare parts globally through our trusted network: <b>Automation | Electrical | Instrumentation | Mechanical | Industrial Supplies</b>.</span></div><div class="form-grid form-grid--2"><div class="field span-2"><label>What do you need?</label><textarea class="textarea" required placeholder="Describe the product, part number, brand, quantity">' + esc(pn) + '</textarea></div><div class="field"><label>Category</label><select class="select"><option>Automation</option><option>Electrical</option><option>Instrumentation</option><option>Mechanical</option><option>Industrial Supplies</option></select></div><div class="field"><label>Destination</label><input class="input" value="UAE"></div></div>',
      identify: '<div class="notice">' + ic("camera") + "<span>Can't identify the part? Send us a photo of the nameplate or the existing equipment — our experts will help you find the right product.</span></div><label class=\"upload\">" + ic("camera", "icon--lg") + '<span><b>Upload photo</b> — nameplate, labels and the whole unit. JPG/PNG/HEIC, up to 5 photos.</span><input type="file" accept="image/*" multiple hidden></label><div class="field"><label>What do you know about it?</label><textarea class="textarea" placeholder="Where it is installed, what it controls, any visible numbers"></textarea></div>'
    };
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["Request for Quotation", ""]]) + '<h1 class="page-title">Request for Quotation<small>Quotes, BOM uploads, project pricing, global sourcing and part identification — answered by the NAS.AE team.</small></h1>' +
      '<div class="two"><form class="panel" data-toast="Request received — reference RFQ-2610-045. We reply within 24 hours."><div class="ptabs" role="tablist" style="padding-inline:10px">' + T.map(([k, l, i]) => '<button type="button" role="tab" aria-selected="' + (k === t) + '" data-rt="' + k + '">' + ic(i, "icon--sm") + " " + l + "</button>").join("") + "</div>" +
      '<div class="panel__body form-grid"><div id="rfq-form">' + forms[t] + '</div><div class="form-grid form-grid--2"><div class="field"><label>Name</label><input class="input" required></div><div class="field"><label>Company</label><input class="input"></div><div class="field"><label>Email</label><input class="input" type="email" required></div><div class="field"><label>Phone / WhatsApp</label><input class="input" type="tel" placeholder="+971"></div></div><button class="btn btn--primary btn--lg" style="justify-self:start">Send Request ' + ic("arrow", "icon--sm") + "</button></div></form>" +
      '<aside style="display:grid;gap:12px"><div class="panel panel__body" style="display:grid;gap:12px"><b>How it works</b><ol style="display:grid;gap:10px;font-size:13px">' + ["Send your requirement — one part or a full BOM.", "Our engineers check part numbers, alternatives and stock with verified suppliers.", "You receive one quote from NAS.AE with price, lead time and validity.", "Accept it online — it becomes an order with tracking."].map((s, i) => '<li style="display:grid;grid-template-columns:26px 1fr;gap:8px"><span class="bubble">' + (i + 1) + "</span>" + s + "</li>").join("") + "</ol></div>" +
      '<div class="panel panel__body" style="display:grid;gap:10px;font-size:13px"><b>Prefer to talk?</b><a class="btn btn--wa" href="https://wa.me/97121234567" target="_blank" rel="noopener">' + ic("wa") + 'WhatsApp Technical Sales</a><button class="btn btn--line" data-open="#m-call">' + ic("phone", "icon--sm") + "Request a Call</button></div></aside></div></div>";
    $(".ptabs").addEventListener("click", e => { const b = e.target.closest("[data-rt]"); if (!b) return; $$(".ptabs button").forEach(x => x.setAttribute("aria-selected", x === b)); $("#rfq-form").innerHTML = forms[b.dataset.rt]; history.replaceState(null, "", "?t=" + b.dataset.rt); });
  };

  // ---------- compare ----------
  pages.compare = function () {
    let ids = getCmp(); if (ids.length < 2) ids = D.featured.slice(0, 3);
    const ps = productsOf(ids);
    const rows = [["Price (excl. VAT)", p => "<b>" + aed(p.price) + "</b>"], ["Availability", p => '<span class="stock stock--' + p.stock + '">' + stockTxt(p.stock) + "</span>"], ["Brand", p => esc(p.brand)], ["Part number", p => esc(p.pn)], ["Category", p => esc((CATG(p.cat) || {}).title || "")], ["Supplier", p => '<a class="link" href="' + L("vendor.html?v=" + p.seller) + '">' + sellerLab(SELLER(p.seller)) + "</a>"]];
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["Compare", ""]]) + '<h1 class="page-title">Compare Products</h1><div style="overflow-x:auto"><table class="cmp-table"><thead><tr><th></th>' + ps.map(p => '<th><div class="cmp-col"><img src="' + A(p.img) + '" alt=""><b>' + esc(p.brand) + "</b>" + esc(p.name) + '<button class="btn btn--sm btn--primary" data-add="' + p.id + '">Add to Cart</button></div></th>').join("") + "</tr></thead><tbody>" + rows.map(([l, f]) => "<tr><th>" + l + "</th>" + ps.map(p => "<td>" + f(p) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div></div>";
  };

  // ---------- seller page (by code) ----------
  pages.vendor = function () {
    const s = SELLER(qs("v")) || CAT.sellers[0];
    const list = CAT.products.filter(p => p.seller === s.id);
    document.title = sellerLab(s) + " | NAS.AE Store";
    listing({
      crumbs: [["Sellers", ""], [sellerLab(s), ""]],
      side: sidebox("All Categories", "grid4", CAT.categories.map(x => [x.title, L("category.html?c=" + x.slug), CAT_ICON[x.slug]])),
      banner: banner({ title: sellerLab(s), tagline: "Verified supplier on NAS.AE", text: "Supplier identities stay private. NAS.AE handles payment, invoicing, delivery and support for every order.", features: [{ title: "★ " + s.rating, sub: s.reviews + " ratings" }, { title: s.city, sub: "Ships from" }, { title: "Member since " + s.since, sub: "Licence verified" }], image: CAT.home.hero.image }),
      title: "Products from " + sellerLab(s), count: list.length, products: list,
      filters: [{ name: "Brand", options: [...new Set(list.map(p => p.brand))].map(n => ({ label: n, count: list.filter(p => p.brand === n).length })) }, { name: "Availability", options: [{ label: "In Stock" }, { label: "Available on Request" }] }, { name: "Price Range (AED)" }]
    });
  };

  // ---------- cart ----------
  pages.cart = function () {
    const c = getCart(), root = $("#main");
    if (!c.length) { root.innerHTML = '<div class="wrap">' + crumbs([["Cart", ""]]) + '<div class="panel empty">' + ic("cart") + '<p>Your cart is empty.</p><a class="btn btn--primary" href="' + L("index.html") + '">Continue Shopping</a></div></div>'; return; }
    const g = groupBySeller(c), shipN = Object.keys(g).length;
    const sub = c.reduce((s, x) => s + x.qty * PROD(x.id).price, 0), ship = shipN * 15, vat = (sub + ship) * .05;
    root.innerHTML = '<div class="wrap">' + crumbs([["Cart", ""]]) + '<h1 class="page-title">Your Cart <small>' + c.reduce((s, x) => s + x.qty, 0) + " items · " + shipN + " shipments</small></h1>" +
      '<div class="two"><div style="display:grid;gap:12px"><div class="notice">' + ic("info") + "<span>Your order ships from " + shipN + " verified suppliers. NAS.AE splits it into sub-orders automatically; each shipment has its own tracking.</span></div>" +
      Object.keys(g).map((sid, i) => '<section class="cgroup"><div class="cgroup__head"><span>' + ic("truck", "icon--sm") + ' Shipment ' + (i + 1) + ' · <a class="link" href="' + L("vendor.html?v=" + sid) + '">' + sellerLab(SELLER(sid)) + "</a></span><span>AED 15.00 shipping</span></div>" + g[sid].map(x => { const p = PROD(x.id); return '<div class="citem"><a href="' + L("product.html?id=" + p.id) + '"><img src="' + A(p.img) + '" alt=""></a><div><span class="pcard__brand" style="color:' + (BRAND_COLOR[bslug(p.brand)] || "") + '">' + esc(p.brand) + '</span><div class="citem__t">' + esc(p.name) + '</div><div class="citem__pn">' + esc(p.pn) + ' · <span class="stock stock--' + p.stock + '">' + stockTxt(p.stock) + "</span></div></div>" + '<div class="citem__r"><b>' + aed(p.price * x.qty) + '</b><div class="qty"><button data-cq="' + x.idx + ':-1" aria-label="Less">' + ic("minus", "icon--sm") + '</button><input value="' + x.qty + '" readonly aria-label="Quantity"><button data-cq="' + x.idx + ':1" aria-label="More">' + ic("plus", "icon--sm") + '</button></div><button class="citem__rm" data-rm="' + x.idx + '">' + ic("trash", "icon--sm") + "Remove</button></div></div>"; }).join("") + "</section>").join("") + "</div>" +
      '<aside class="panel panel__body" style="display:grid;gap:4px;position:sticky;top:12px"><h2 style="font-size:17px;margin-bottom:6px">Order Summary</h2><div class="sumrow"><span>Subtotal</span><span>' + aed(sub) + '</span></div><div class="sumrow"><span>Shipping (' + shipN + " shipments)</span><span>" + aed(ship) + '</span></div><div class="sumrow"><span>VAT 5%</span><span>' + aed(vat) + '</span></div><div class="sumrow sumrow--total"><span>Total</span><span>' + aed(sub + ship + vat) + "</span></div>" +
      '<a class="btn btn--primary btn--lg btn--block" style="margin-top:10px" href="' + L("checkout.html") + '">' + ic("lock", "icon--sm") + "Proceed to Checkout</a><button class=\"btn btn--line btn--block\" data-rfq style=\"margin-top:6px\">Need a formal quote for this cart?</button><p class=\"muted\" style=\"font-size:12px;margin-top:8px\">Tax invoice issued by NAS.AE. Returns per each part's policy.</p></aside></div></div>";
    root.querySelector(".two").addEventListener("click", e => { const b = e.target.closest("[data-cq]"); if (!b) return; const [i, d] = b.dataset.cq.split(":").map(Number); const cc = getCart(); cc[i].qty = Math.max(1, cc[i].qty + d); setCart(cc); pages.cart(); });
  };

  // ---------- checkout ----------
  pages.checkout = function () {
    const c = getCart(), g = groupBySeller(c), shipN = Object.keys(g).length || 1;
    const sub = c.reduce((s, x) => s + x.qty * PROD(x.id).price, 0);
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["Cart", L("cart.html")], ["Checkout", ""]]) + '<h1 class="page-title">Checkout</h1><form class="two" id="co"><div style="display:grid;gap:12px">' +
      '<section class="panel"><div class="panel__head"><h2>1. Delivery address</h2></div><div class="panel__body form-grid form-grid--2"><div class="field"><label>Full name</label><input class="input" required></div><div class="field"><label>Company (for tax invoice)</label><input class="input"></div><div class="field"><label>Mobile</label><input class="input" type="tel" placeholder="+971" required></div><div class="field"><label>Emirate</label><select class="select"><option>Abu Dhabi</option><option>Dubai</option><option>Sharjah</option><option>Ajman</option><option>Ras Al Khaimah</option><option>Fujairah</option><option>Umm Al Quwain</option></select></div><div class="field span-2"><label>Address</label><input class="input" placeholder="Area, street, building / warehouse" required></div><div class="field"><label>TRN (optional)</label><input class="input" placeholder="100XXXXXXXXXXXX"></div><div class="field"><label>PO number (optional)</label><input class="input"></div></div></section>' +
      '<section class="panel"><div class="panel__head"><h2>2. Shipping</h2></div><div class="panel__body optcards"><label class="optcard"><input type="radio" name="ship" value="15" checked><span><b>Standard</b><small>2–4 working days · per shipment</small></span><b>AED 15.00</b></label><label class="optcard"><input type="radio" name="ship" value="35"><span><b>Express</b><small>24 hours · per shipment</small></span><b>AED 35.00</b></label><p class="muted" style="font-size:12.5px">Your order ships in ' + shipN + " shipments, each with its own tracking number.</p></div></section>" +
      '<section class="panel"><div class="panel__head"><h2>3. Payment</h2></div><div class="panel__body optcards">' + [["card", "Credit / debit card", "Visa, Mastercard, Amex"], ["apple", "Apple Pay", ""], ["bank", "Bank transfer", "For business accounts — order ships when funds clear"], ["cod", "Cash on delivery", "+ AED 10.00"]].map(([v, t, s], i) => '<label class="optcard"><input type="radio" name="pay" value="' + v + '"' + (i ? "" : " checked") + "><span><b>" + t + "</b><small>" + s + "</small></span></label>").join("") + "</div></section></div>" +
      '<aside class="panel panel__body" id="co-sum" style="display:grid;gap:4px;position:sticky;top:12px"></aside></form></div>';
    const form = $("#co");
    function upd() {
      const fd = new FormData(form), ship = shipN * +fd.get("ship"), cod = fd.get("pay") === "cod" ? 10 : 0, vat = (sub + ship + cod) * .05;
      $("#co-sum").innerHTML = '<h2 style="font-size:17px;margin-bottom:6px">Order Summary</h2>' + c.map(x => { const p = PROD(x.id); return '<div class="minic" style="grid-template-columns:48px 1fr auto"><img src="' + A(p.img) + '" alt="" style="width:48px;height:40px"><span style="font-size:12.5px">' + esc(p.brand + " " + p.name) + '<br><span class="muted">' + x.qty + " × " + aed(p.price) + "</span></span></div>"; }).join("") +
        '<div class="sumrow"><span>Subtotal</span><span>' + aed(sub) + '</span></div><div class="sumrow"><span>Shipping</span><span>' + aed(ship) + "</span></div>" + (cod ? '<div class="sumrow"><span>COD fee</span><span>' + aed(cod) + "</span></div>" : "") + '<div class="sumrow"><span>VAT 5%</span><span>' + aed(vat) + '</span></div><div class="sumrow sumrow--total"><span>Total</span><span>' + aed(sub + ship + cod + vat) + '</span></div><button class="btn btn--primary btn--lg btn--block" style="margin-top:10px">' + ic("lock", "icon--sm") + "Place Order</button><p class=\"muted\" style=\"font-size:12px\">By placing the order you accept the terms and each part's return policy.</p>";
    }
    form.addEventListener("change", upd); upd();
    form.addEventListener("submit", e => {
      e.preventDefault();
      const no = "NAS-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-0046";
      $("#main").innerHTML = '<div class="wrap"><div class="panel empty" style="margin-block:30px">' + ic("check") + '<h1 class="page-title" style="margin:0">Thank you — order received</h1><p>Order <b>' + no + "</b> · " + shipN + ' shipments. We emailed your tax invoice.</p><div style="display:flex;gap:10px"><a class="btn btn--primary" href="' + L("account/orders.html") + '">Track Order</a><a class="btn btn--line" href="' + L("index.html") + '">Continue Shopping</a></div></div></div>';
      store.set("nasae_cart", []); syncCounts(); renderMini();
    });
  };

  // ---------- login ----------
  pages.login = function () {
    $("#main").innerHTML = '<div class="wrap" style="max-width:980px;padding-block:24px"><div class="two" style="grid-template-columns:1fr 1fr"><form class="panel panel__body form-grid" data-go="account/orders.html"><h1 class="page-title" style="margin:0">Login</h1><div class="field"><label>Email or mobile</label><input class="input" required></div><div class="field"><label>Password</label><input class="input" type="password" required></div><button class="btn btn--primary btn--lg">Login</button><button type="button" class="btn btn--line">Login with one-time code (OTP)</button></form>' +
      '<form class="panel panel__body form-grid" data-go="account/orders.html"><h2 class="page-title" style="margin:0">Create account</h2><div class="field"><label>Full name</label><input class="input" required></div><div class="field"><label>Email</label><input class="input" type="email" required></div><div class="field"><label>Mobile</label><input class="input" type="tel" placeholder="+971"></div><label class="check"><input type="checkbox"> Business account (tax invoices in company name, bank transfer, project pricing)</label><button class="btn btn--primary btn--lg">Sign Up</button></form></div></div>';
    $$("form[data-go]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); location.href = L(f.dataset.go); }));
  };

  // ---------- account ----------
  function acct(active, inner) {
    const items = [["orders", "My Orders & Tracking", "box"], ["quotes", "Quotes & RFQs", "doc"], ["favourites", "Favourites & Alerts", "heart"], ["messages", "Messages", "chat"], ["returns", "Returns & Warranty", "ret"]];
    $("#main").innerHTML = '<div class="wrap">' + crumbs([["My Account", ""]]) + '<div class="acct"><nav class="acct-nav"><div class="acct-nav__user"><span class="avatar">AK</span><div>Ahmed Khaled<small>Al Reem Contracting · Business</small></div></div>' +
      items.map(([k, l, i]) => '<a href="' + L("account/" + k + ".html") + '"' + (k === active ? ' aria-current="page"' : "") + ">" + ic(i, "icon--sm") + l + (k === "favourites" ? '<span class="bubble" data-fav-n></span>' : "") + "</a>").join("") + '<a href="' + L("login.html") + '">' + ic("logout", "icon--sm") + "Sign out</a></nav><section>" + inner + "</section></div></div>";
    syncCounts();
  }
  const P0 = D.featured;
  pages.orders = function () {
    const steps = ["Placed", "Confirmed", "Packed", "Shipped", "Delivered"];
    const orders = [{ no: "NAS-261024-0042", date: "24 Oct 2026", total: 7686.25, pay: "Card •••• 4421", subs: [{ s: "v2", items: [P0[0]], step: 3, st: ["info", "Shipped"], awb: "ARX 7731 0042 19" }, { s: "v5", items: [P0[2], P0[4]], step: 4, st: ["ok", "Delivered"], awb: "ARX 7731 0042 20" }] }, { no: "NAS-261009-0017", date: "9 Oct 2026", total: 3129.00, pay: "Bank transfer", subs: [{ s: "v4", items: [P0[1]], step: 1, st: ["warn", "Awaiting supplier confirmation"], awb: "" }] }];
    acct("orders", '<h1 class="page-title">My Orders & Tracking</h1><div style="display:grid;gap:12px">' + orders.map(o => '<article class="order"><div class="order__head"><div><small>Order</small><b>' + o.no + "</b></div><div><small>Date</small>" + o.date + "</div><div><small>Total</small><b>" + aed(o.total) + "</b></div><div><small>Payment</small>" + o.pay + '</div><div class="btns"><a class="btn btn--sm btn--line" href="#">' + ic("download", "icon--sm") + "Tax invoice</a></div></div>" +
      o.subs.map((s, i) => '<div class="sub"><div class="sub__top"><span>Shipment ' + (i + 1) + ' · <a class="link" href="' + L("vendor.html?v=" + s.s) + '">' + sellerLab(SELLER(s.s)) + '</a></span><span class="badge badge--' + s.st[0] + '">' + s.st[1] + '</span></div><ol class="steps">' + steps.map((x, j) => '<li class="step ' + (j < s.step ? "is-done" : j === s.step ? "is-current" : "") + '">' + x + "</li>").join("") + '</ol><div class="sub__top"><div class="sub__items">' + s.items.map(id => '<a href="' + L("product.html?id=" + id) + '"><img src="' + A(PROD(id).img) + '" alt=""></a>').join("") + '</div><div style="display:flex;gap:8px;flex-wrap:wrap">' + (s.awb ? '<span class="badge">AWB ' + s.awb + "</span>" : "") + (s.step >= 3 ? '<a class="btn btn--sm btn--line" href="#">' + ic("truck", "icon--sm") + "Track</a>" : "") + (s.step === 4 ? '<a class="btn btn--sm btn--line" href="' + L("account/returns.html") + '">Return / exchange</a>' : "") + '<a class="btn btn--sm btn--line" href="' + L("account/messages.html") + '">' + ic("chat", "icon--sm") + "Message supplier</a></div></div></div>").join("") + "</article>").join("") + "</div>");
  };
  pages.quotes = function () {
    const q = [{ no: "RFQ-2610-028", p: P0[1], qty: 12, date: "20 Oct 2026", st: ["ok", "Quote received"], unit: PROD(P0[1]).price * .96, lead: "3 working days", valid: "30 Oct 2026", note: "8 units available now, the rest within 10 days." }, { no: "RFQ-2610-031", p: P0[3], qty: 6, date: "22 Oct 2026", st: ["ok", "Quote received"], unit: PROD(P0[3]).price * .94, lead: "7 working days", valid: "5 Nov 2026", note: "Project price for the quantity, delivered to your Jebel Ali warehouse." }, { no: "REQ-2610-118", pn: "SKF 22216 E", qty: 2, date: "25 Oct 2026", st: ["warn", "Being priced by NAS.AE"] }];
    acct("quotes", '<div style="display:flex;justify-content:space-between;align-items:center"><h1 class="page-title">Quotes & RFQs</h1><a class="btn btn--primary btn--sm" href="' + L("rfq.html") + '">New RFQ</a></div><div style="display:grid;gap:12px">' + q.map(r => { const p = r.p && PROD(r.p); return '<article class="order"><div class="order__head"><div><small>Request</small><b>' + r.no + "</b></div><div><small>Item</small>" + (p ? esc(p.brand + " " + p.name) : esc(r.pn) + " (not listed)") + "</div><div><small>Qty</small>" + r.qty + "</div><div><small>Date</small>" + r.date + '</div><div class="btns"><span class="badge badge--' + r.st[0] + '">' + r.st[1] + "</span></div></div>" +
      (r.unit ? '<div class="sub"><div class="sub__top"><b>Quote from NAS.AE</b><span class="muted">Q-' + r.no.slice(4) + '</span></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;font-size:13px"><div><span class="muted">Unit price</span><br><b>' + aed(r.unit) + '</b></div><div><span class="muted">Total</span><br><b>' + aed(r.unit * r.qty) + '</b></div><div><span class="muted">Lead time</span><br>' + r.lead + '</div><div><span class="muted">Valid until</span><br>' + r.valid + '</div></div><p class="muted" style="font-size:13px">' + esc(r.note) + '</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn--primary btn--sm" data-acc>' + ic("check", "icon--sm") + 'Accept & convert to order</button><button class="btn btn--line btn--sm">Ask for revision</button><button class="btn btn--line btn--sm">' + ic("download", "icon--sm") + "Quote PDF</button></div></div>" : '<div class="sub"><p style="font-size:13.5px">' + ic("clock", "icon--sm") + " The NAS.AE team is sourcing this part. You'll usually receive a quote within 24 hours.</p></div>") + "</article>"; }).join("") + "</div>");
    $("#main").addEventListener("click", e => { if (e.target.closest("[data-acc]")) toast("Quote accepted — added to your cart as an order"); });
  };
  pages.favourites = function () {
    const favs = getFavs().length ? getFavs() : D.featured.slice(0, 3).map((id, i) => ({ id, stock: true, price: i !== 1, since: "2026-10-20", was: PROD(id).price * 1.08 }));
    acct("favourites", '<h1 class="page-title">Favourites & Alerts<small>We notify you by email and WhatsApp when a saved product is back in stock or its price drops.</small></h1><div class="panel"><table class="table"><thead><tr><th>Product</th><th>Status</th><th>Price</th><th>Alerts</th><th></th></tr></thead><tbody>' +
      favs.map(f => { const p = PROD(f.id); if (!p) return ""; const drop = f.was && f.was > p.price; return '<tr><td><div style="display:flex;gap:10px;align-items:center"><img src="' + A(p.img) + '" alt="" style="width:54px;height:46px;object-fit:contain"><span><b>' + esc(p.brand) + "</b> " + esc(p.name) + '<br><span class="muted">' + esc(p.pn) + '</span></span></div></td><td><span class="stock stock--' + p.stock + '">' + stockTxt(p.stock) + "</span></td><td><b>" + aed(p.price) + "</b>" + (drop ? '<br><span class="badge badge--ok">Price dropped from ' + aed(f.was) + "</span>" : "") + '</td><td><label class="check"><input type="checkbox"' + (f.stock ? " checked" : "") + '> Back in stock</label><label class="check"><input type="checkbox"' + (f.price ? " checked" : "") + '> Price drop</label></td><td><button class="btn btn--sm btn--primary" data-add="' + p.id + '">Add to Cart</button></td></tr>'; }).join("") + "</tbody></table></div>");
    $("#main").addEventListener("change", e => { if (e.target.closest(".table input")) toast("Alert preferences saved", "bell"); });
  };
  pages.messages = function () {
    const p = PROD(P0[0]);
    acct("messages", '<h1 class="page-title">Messages</h1><div class="notice" style="margin-bottom:12px">' + ic("shield") + "<span>Chats run through NAS.AE: suppliers don't see your name, and phone numbers or emails are not shared. Our team can read chats to keep service quality high.</span></div>" +
      '<div class="chat"><div class="chat__list">' + [["v2", "Yes, it's a direct fit and ready to ship today.", "10:42"], ["v1", "We updated the quote for 12 units.", "Yesterday"], ["v3", "Thanks for your rating.", "20/10"]].map(([sid, m, t], i) => '<button class="chat__conv" aria-current="' + (i === 0) + '"><span class="chat__av">' + ic("store", "icon--sm") + "</span><span style=\"min-width:0\"><b>" + sellerLab(SELLER(sid)) + "</b><p>" + m + "</p></span><time>" + t + "</time></button>").join("") + "</div>" +
      '<div class="chat__main"><div class="chat__head"><span class="chat__av">' + ic("store", "icon--sm") + '</span><span><b><a class="link" href="' + L("vendor.html?v=v2") + '">' + sellerLab(SELLER("v2")) + '</a></b><br><span class="muted" style="font-size:12px">Usually replies within 4 hours</span></span></div><a class="chat__ctx" href="' + L("product.html?id=" + p.id) + '"><img src="' + A(p.img) + '" alt=""><span>' + esc(p.brand + " " + p.name) + '<br><span class="muted">' + esc(p.pn) + "</span></span></a>" +
      '<div class="chat__msgs" id="msgs"><span class="chat__day">24 OCT 2026</span><div class="msg msg--me">Hi, is this compatible with our existing ET 200SP I/O? We need two.<time>10:21</time></div><div class="msg">Hello — yes, fully compatible. We have 14 in stock.<time>10:35</time></div><div class="msg msg--me">Great. Attached is the nameplate of the old CPU.<time>10:38</time></div><div class="msg">Yes, it\'s a direct fit and ready to ship today.<time>10:42</time></div></div>' +
      '<form class="chat__compose" id="compose"><input class="input" placeholder="Write a message…" aria-label="Message"><button class="btn btn--primary">Send</button></form></div></div>');
    $("#compose").addEventListener("submit", e => { e.preventDefault(); const i = $("#compose input"); if (!i.value.trim()) return; $("#msgs").insertAdjacentHTML("beforeend", '<div class="msg msg--me">' + esc(i.value) + "<time>now</time></div>"); i.value = ""; $("#msgs").scrollTop = 1e6; });
  };
  pages.returns = function () {
    acct("returns", '<h1 class="page-title">Returns & Warranty<small>The return / exchange window is set per part with the supplier and shown on the product page. Sensitive electronics are technically inspected before acceptance.</small></h1>' +
      '<div class="order" style="margin-bottom:12px"><div class="order__head"><div><small>Request</small><b>RMA-2610-008</b></div><div><small>Item</small>' + esc(PROD(P0[2]).brand + " " + PROD(P0[2]).name) + '</div><div class="btns"><span class="badge badge--info">Inspection</span></div></div><div class="sub"><ol class="steps"><li class="step is-done">Requested</li><li class="step is-done">Approved</li><li class="step is-done">Received</li><li class="step is-current">Technical inspection</li><li class="step">Refund / exchange</li></ol></div></div>' +
      '<form class="panel panel__body form-grid" data-toast="Return request sent — RMA-2610-009"><h2 style="font-size:16px">New return or warranty claim</h2><div class="form-grid form-grid--2"><div class="field"><label>Order item</label><select class="select">' + P0.map(id => "<option>" + esc(PROD(id).brand + " " + PROD(id).name + " — " + PROD(id).pn) + "</option>").join("") + '</select></div><div class="field"><label>Request</label><select class="select"><option>Exchange</option><option>Refund</option><option>Warranty repair</option></select></div><div class="field span-2"><label>Reason</label><textarea class="textarea"></textarea></div></div><label class="upload">' + ic("camera", "icon--lg") + "<span><b>Photos</b> of the item, labels and packaging</span><input type=\"file\" hidden multiple></label><button class=\"btn btn--primary\" style=\"justify-self:start\">Submit</button></form>");
  };

  // ---------- boot ----------
  mountChrome();
  syncCounts();
  renderMini();
  renderTray();
  if (pages[page]) pages[page]();
  reveal();
})();
