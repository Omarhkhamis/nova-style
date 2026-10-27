/* NAS Market — storefront: chrome, cart, compare, and page renderers */
(function () {
  const { LANG, ROOT, icon, brand, wave, num, money, moneyTxt, esc, $, $$, store, toast, open, closeAll, reveal, bannerHTML, bannerText, liveBanners, bannerOn } = window.NAS;
  const D = window.NAS_DATA;
  const page = document.body.dataset.page || "";

  // ---------- i18n (chrome + shared components) ----------
  const T = {
    ar: {
      topmsg: "توصيل لكل الإمارات · فواتير ضريبية 5% · دفع آمن",
      sell: "بِع على NAS Market", help: "المساعدة", track: "تتبّع طلب",
      allDept: "كل الأقسام", searchPh: "ابحث باسم القطعة، رقم الموديل، أو الباركود", searchBtn: "بحث",
      hello: "أهلاً، سجّل دخولك", account: "حسابي", compare: "المقارنة", cart: "السلة",
      deals: "عروض الأسبوع", request: "اطلب قطعة غير موجودة", menu: "القائمة",
      add: "أضف للسلة", added: "تمت الإضافة إلى السلة", pn: "P/N", cmp: "قارن", by: "",
      new: "جديد", used: "مستعمل", refurb: "مجدد", off: "خصم",
      cartTitle: "سلة المشتريات", cartEmpty: "سلتك فارغة حالياً", subtotal: "المجموع الفرعي", checkout: "إتمام الطلب", viewCart: "عرض السلة",
      shipNote: "الطلبات من أكثر من بائع تُقسم تلقائياً لشحنات منفصلة", keep: "متابعة التسوق",
      cmpTray: "منتجات للمقارنة", cmpGo: "قارن الآن", cmpClear: "مسح", cmpMax: "يمكن مقارنة 4 منتجات كحد أقصى",
      fShop: "تسوّق", fSell: "للبائعين", fHelp: "المساعدة", fCo: "NAS Market",
      fAbout: "سوق إلكتروني متعدد البائعين لقطع الغيار والمعدات الصناعية في الإمارات. كل بائع موثّق برخصة تجارية.",
      fJoin: "سجّل كبائع", fSellerLogin: "دخول لوحة البائع", fFees: "العمولات والرسوم", fGuide: "دليل البائع",
      fReturns: "سياسة الإرجاع", fShipping: "الشحن والتوصيل", fPay: "طرق الدفع", fContact: "تواصل معنا", fTerms: "الشروط والأحكام", fPrivacy: "سياسة الخصوصية",
      fAboutLink: "من نحن", fAdmin: "لوحة الإدارة", proto: "نموذج أولي للعرض — البيانات والصور تجريبية", rights: "© 2026 NAS Market",
      allPages: "خريطة الصفحات", tHome: "الرئيسية", tCats: "الأقسام", tDeals: "العروض", qparts: "قطعة"
    },
    en: {
      topmsg: "Delivery across the UAE · 5% VAT invoices · Secure payment",
      sell: "Sell on NAS Market", help: "Help", track: "Track order",
      allDept: "All departments", searchPh: "Search by part name, model number or barcode", searchBtn: "Search",
      hello: "Hello, sign in", account: "Account", compare: "Compare", cart: "Cart",
      deals: "Weekly deals", request: "Request a missing part", menu: "Menu",
      add: "Add to cart", added: "Added to cart", pn: "P/N", cmp: "Compare", by: "",
      new: "New", used: "Used", refurb: "Refurbished", off: "OFF",
      cartTitle: "Your cart", cartEmpty: "Your cart is empty", subtotal: "Subtotal", checkout: "Checkout", viewCart: "View cart",
      shipNote: "Orders from several sellers are split into separate shipments automatically", keep: "Continue shopping",
      cmpTray: "items to compare", cmpGo: "Compare now", cmpClear: "Clear", cmpMax: "You can compare up to 4 items",
      fShop: "Shop", fSell: "Sellers", fHelp: "Help", fCo: "NAS Market",
      fAbout: "A multi-vendor marketplace for industrial spare parts and equipment in the UAE. Every seller is verified with a trade licence.",
      fJoin: "Become a seller", fSellerLogin: "Seller dashboard", fFees: "Fees & commission", fGuide: "Seller guide",
      fReturns: "Returns policy", fShipping: "Shipping & delivery", fPay: "Payment methods", fContact: "Contact us", fTerms: "Terms & conditions", fPrivacy: "Privacy policy",
      fAboutLink: "About us", fAdmin: "Admin panel", proto: "Prototype for review — data and photos are placeholders", rights: "© 2026 NAS Market",
      allPages: "Page map", tHome: "Home", tCats: "Categories", tDeals: "Deals", qparts: "parts"
    },
    ur: {
      topmsg: "پورے امارات میں ڈیلیوری · 5% VAT انوائس · محفوظ ادائیگی",
      sell: "NAS Market پر فروخت کریں", help: "مدد", track: "آرڈر ٹریک کریں",
      allDept: "تمام شعبے", searchPh: "پرزے کا نام، ماڈل نمبر یا بارکوڈ سے تلاش کریں", searchBtn: "تلاش",
      hello: "خوش آمدید، لاگ ان کریں", account: "میرا اکاؤنٹ", compare: "موازنہ", cart: "ٹوکری",
      deals: "ہفتہ وار آفرز", request: "غیر موجود پرزہ طلب کریں", menu: "مینو",
      add: "ٹوکری میں ڈالیں", added: "ٹوکری میں شامل ہو گیا", pn: "P/N", cmp: "موازنہ", by: "",
      new: "نیا", used: "استعمال شدہ", refurb: "مرمت شدہ", off: "رعایت",
      cartTitle: "آپ کی ٹوکری", cartEmpty: "آپ کی ٹوکری خالی ہے", subtotal: "ذیلی کل", checkout: "آرڈر مکمل کریں", viewCart: "ٹوکری دیکھیں",
      shipNote: "کئی فروخت کنندگان کے آرڈر خود بخود الگ شپمنٹس میں تقسیم ہوتے ہیں", keep: "خریداری جاری رکھیں",
      cmpTray: "موازنے کے لیے", cmpGo: "موازنہ کریں", cmpClear: "صاف کریں", cmpMax: "زیادہ سے زیادہ 4 اشیاء",
      fShop: "خریداری", fSell: "فروخت کنندگان", fHelp: "مدد", fCo: "NAS Market",
      fAbout: "امارات میں صنعتی اسپیئر پارٹس اور آلات کی ملٹی وینڈر مارکیٹ۔ ہر فروخت کنندہ تجارتی لائسنس سے تصدیق شدہ ہے۔",
      fJoin: "فروخت کنندہ بنیں", fSellerLogin: "سیلر ڈیش بورڈ", fFees: "کمیشن اور فیس", fGuide: "سیلر گائیڈ",
      fReturns: "واپسی کی پالیسی", fShipping: "شپنگ اور ڈیلیوری", fPay: "ادائیگی کے طریقے", fContact: "رابطہ کریں", fTerms: "شرائط و ضوابط", fPrivacy: "رازداری کی پالیسی",
      fAboutLink: "ہمارے بارے میں", fAdmin: "ایڈمن پینل", proto: "جائزے کے لیے پروٹوٹائپ — ڈیٹا اور تصاویر عارضی ہیں", rights: "© 2026 NAS Market",
      allPages: "صفحات کا نقشہ", tHome: "ہوم", tCats: "شعبے", tDeals: "آفرز", qparts: "پرزے"
    }
  };
  const t = k => (T[LANG] && T[LANG][k]) || T.ar[k] || k;

  // ---------- data helpers ----------
  const L = p => ROOT + p;
  const IMG = n => ROOT + "assets/img/" + n + ".jpg";
  const P = id => D.products.find(p => p.id === id);
  const V = id => D.vendors.find(v => v.id === id);
  const C = id => D.categories.find(c => c.id === id);
  const nm = o => (o && (o[LANG] || o.en || o.ar)) || "";
  const condLabel = c => t(c);
  const condBadge = c => '<span class="badge badge--' + c + '">' + condLabel(c) + "</span>";
  const initials = v => (v.en || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const qs = k => new URLSearchParams(location.search).get(k);
  const BANNERS = liveBanners(D.banners).filter(bannerOn).sort((a, b) => a.order - b.order);
  const bannersAt = place => BANNERS.filter(b => b.place === place);
  function mountBanners() {
    const wide = bannersAt("wide")[0], promos = bannersAt("promo").slice(0, 3);
    const w = $("#wide-banner"), pr = $("#promo-banners"), cb = $("#cat-banner");
    if (w) { if (wide) w.innerHTML = bannerHTML(wide, LANG, ROOT); else w.closest("section").hidden = true; }
    if (pr) { if (promos.length) pr.innerHTML = promos.map(b => bannerHTML(b, LANG, ROOT)).join(""); else pr.closest("section").hidden = true; }
    if (cb && wide) cb.innerHTML = bannerHTML(wide, LANG, ROOT);
  }

  // ---------- product card ----------
  function card(p, opts) {
    opts = opts || {};
    const v = V(p.v);
    const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const cmp = getCmp().includes(p.id);
    return '<article class="pcard' + (opts.reveal === false ? "" : " reveal") + '">' +
      '<a class="pcard__media" href="' + L("product.html?id=" + p.id) + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + IMG(p.img) + '" alt="" loading="lazy" width="400" height="300">' +
      '<span class="pcard__tags">' + condBadge(p.cond) + "</span>" +
      (off ? '<span class="pcard__off plate plate--volt">-' + off + "%</span>" : "") + "</a>" +
      '<div class="pcard__body">' +
      '<a class="pcard__vendor" href="' + L("vendor.html?v=" + v.id) + '">' + icon("badge") + esc(nm(v)) + "</a>" +
      '<h3 class="pcard__title"><a href="' + L("product.html?id=" + p.id) + '">' + esc(nm(p)) + "</a></h3>" +
      '<div class="stars">' + icon("star") + "<b>" + p.rating.toFixed(1) + "</b><span class=\"mono\">(" + p.reviews + ")</span></div>" +
      '<div class="plate pcard__plate">' +
      '<div class="pcard__pn mono"><span class="plate__key">' + t("pn") + "</span> " + esc(p.sku) + "</div>" +
      '<div class="plate__row pcard__buy"><div class="pcard__prices">' + money(p.price, { dec: p.price < 1000 }) +
      (p.old ? '<span class="price-old">' + num(p.old) + "</span>" : "") + "</div>" +
      '<button class="pcard__add" data-add="' + p.id + '" aria-label="' + t("add") + ": " + esc(nm(p)) + '">' + icon("cart") + "</button></div></div>" +
      (opts.compare === false ? "" : '<div class="pcard__foot"><label class="pcard__cmp"><input type="checkbox" data-cmp="' + p.id + '"' + (cmp ? " checked" : "") + "> " + t("cmp") + "</label>" +
        (p.stock <= 3 ? '<span class="stock-low">' + (LANG === "ar" ? "آخر " + p.stock + " قطع" : LANG === "ur" ? "صرف " + p.stock + " باقی" : "Only " + p.stock + " left") + "</span>" : "") + "</div>") +
      "</div></article>";
  }

  // ---------- chrome ----------
  function langLinks() {
    const here = { ar: L("index.html"), en: L("en/index.html"), ur: L("ur/index.html") };
    return '<nav class="langs" aria-label="Language">' +
      '<a href="' + here.ar + '" hreflang="ar" lang="ar" aria-current="' + (LANG === "ar") + '">ع</a>' +
      '<a href="' + here.en + '" hreflang="en" lang="en" aria-current="' + (LANG === "en") + '">EN</a>' +
      '<a href="' + here.ur + '" hreflang="ur" lang="ur" aria-current="' + (LANG === "ur") + '">اردو</a></nav>';
  }
  function header() {
    const activeCat = qs("c");
    const home = LANG === "ar" ? L("index.html") : L(LANG + "/index.html");
    const cats = D.categories.map(c => '<option value="' + c.id + '">' + esc(nm(c)) + "</option>").join("");
    return '<a class="sr-only" href="#main">' + (LANG === "en" ? "Skip to content" : "تخطّي إلى المحتوى") + "</a>" +
      '<div class="topbar"><div class="container"><p class="topbar__msg">' + icon("truck") + "<span>" + (bannersAt("topbar")[0] ? esc(bannerText(bannersAt("topbar")[0], "title", LANG)) : t("topmsg")) + "</span></p>" +
      '<div class="topbar__links"><a class="hide-sm" href="' + L("seller/join.html") + '">' + t("sell") + '</a><a class="hide-sm" href="' + L("account/orders.html") + '">' + t("track") + "</a>" + langLinks() + "</div></div></div>" +
      '<header class="header"><div class="container"><div class="header__row">' +
      '<div class="header__left"><button class="header__menu" data-open="#mnav" aria-label="' + t("menu") + '">' + icon("menu") + "</button>" + brand(home) + "</div>" +
      '<form class="search" role="search" action="' + L("category.html") + '"><label class="sr-only" for="q">' + t("searchBtn") + '</label>' +
      '<select name="c" aria-label="' + t("allDept") + '"><option value="">' + t("allDept") + "</option>" + cats + "</select>" +
      '<input id="q" name="q" type="search" placeholder="' + t("searchPh") + '" autocomplete="off" value="' + esc(qs("q") || "") + '">' +
      '<button type="submit" aria-label="' + t("searchBtn") + '">' + icon("search") + "</button></form>" +
      '<div class="header__actions">' +
      '<a class="hact" href="' + L("login.html") + '">' + icon("user") + '<span class="hact__txt"><small>' + t("hello") + "</small>" + t("account") + "</span></a>" +
      '<a class="hact hide-mobile" href="' + L("compare.html") + '" aria-label="' + t("compare") + '">' + icon("compare") + '<span class="hact__count" data-cmp-count></span><span class="hact__txt"><small>&nbsp;</small>' + t("compare") + "</span></a>" +
      '<a class="hact" href="' + L("cart.html") + '" data-open="#minicart" aria-label="' + t("cart") + '">' + icon("cart") + '<span class="hact__count" data-cart-count></span><span class="hact__txt"><small>&nbsp;</small>' + t("cart") + "</span></a>" +
      "</div></div></div></header>" +
      '<nav class="catnav" aria-label="' + t("allDept") + '"><div class="container">' +
      '<a class="catnav__all" href="' + L("category.html") + '">' + icon("grid", "icon--sm") + t("allDept") + "</a>" +
      D.categories.map(c => '<a href="' + L("category.html?c=" + c.id) + '"' + (activeCat === c.id ? ' aria-current="page"' : "") + ">" + esc(nm(c)) + "</a>").join("") +
      '<span class="catnav__spacer"></span><a href="' + L("request.html") + '">' + icon("doc", "icon--sm") + t("request") + "</a>" +
      '<a class="catnav__deal" href="' + L("category.html?deals=1") + '">' + icon("tag", "icon--sm") + t("deals") + "</a></div></nav>";
  }
  function mobileNav() {
    return '<aside class="mnav" id="mnav" aria-hidden="true" aria-label="' + t("menu") + '"><div class="mnav__head">' + brand(L("index.html")) +
      '<button class="close-btn" data-close aria-label="close">' + icon("x") + "</button></div><div class=\"mnav__list\">" +
      '<div class="mnav__group">' + t("allDept") + "</div>" +
      D.categories.map(c => '<a href="' + L("category.html?c=" + c.id) + '">' + esc(nm(c)) + '<span class="mono">' + c.code + "</span></a>").join("") +
      '<div class="mnav__group">' + t("fShop") + "</div>" +
      '<a href="' + L("category.html?deals=1") + '">' + t("deals") + "</a>" +
      '<a href="' + L("request.html") + '">' + t("request") + "</a>" +
      '<a href="' + L("compare.html") + '">' + t("compare") + "</a>" +
      '<a href="' + L("account/orders.html") + '">' + t("account") + "</a>" +
      '<div class="mnav__group">' + t("fSell") + "</div>" +
      '<a href="' + L("seller/join.html") + '">' + t("fJoin") + "</a>" +
      '<a href="' + L("seller/index.html") + '">' + t("fSellerLogin") + "</a>" +
      '<div class="mnav__group">Language</div><div style="padding:8px 18px">' + langLinks() + "</div></div></aside>";
  }
  function footer() {
    return '<footer class="footer">' + wave() + '<div class="container footer__grid">' +
      '<div class="footer__brand">' + brand(L("index.html")) + "<p>" + t("fAbout") + '</p><span class="proto-note">' + icon("info", "icon--sm") + t("proto") + "</span></div>" +
      "<div><h3>" + t("fShop") + "</h3><ul>" + D.categories.slice(0, 6).map(c => '<li><a href="' + L("category.html?c=" + c.id) + '">' + esc(nm(c)) + "</a></li>").join("") + "</ul></div>" +
      "<div><h3>" + t("fSell") + '</h3><ul><li><a href="' + L("seller/join.html") + '">' + t("fJoin") + '</a></li><li><a href="' + L("seller/index.html") + '">' + t("fSellerLogin") + '</a></li><li><a href="#">' + t("fFees") + '</a></li><li><a href="#">' + t("fGuide") + "</a></li></ul></div>" +
      "<div><h3>" + t("fHelp") + '</h3><ul><li><a href="' + L("account/orders.html") + '">' + t("track") + '</a></li><li><a href="' + L("account/returns.html") + '">' + t("fReturns") + '</a></li><li><a href="#">' + t("fShipping") + '</a></li><li><a href="#">' + t("fPay") + "</a></li></ul></div>" +
      "<div><h3>" + t("fCo") + '</h3><ul><li><a href="#">' + t("fAboutLink") + '</a></li><li><a href="#">' + t("fContact") + '</a></li><li><a href="' + L("admin/index.html") + '">' + t("fAdmin") + '</a></li><li><a href="' + L("pages.html") + '">' + t("allPages") + "</a></li></ul></div>" +
      '</div><div class="footer__bottom"><div class="container"><span>' + t("rights") + ' · <a href="#">' + t("fTerms") + '</a> · <a href="#">' + t("fPrivacy") + "</a></span>" +
      '<div class="paychips"><span class="paychip">VISA</span><span class="paychip">MASTERCARD</span><span class="paychip">APPLE PAY</span><span class="paychip">COD</span><span class="paychip">VAT 5%</span></div></div></div></footer>';
  }
  function miniCart() {
    return '<aside class="drawer" id="minicart" aria-hidden="true" aria-labelledby="mc-title" role="dialog"><div class="drawer__head"><h2 id="mc-title" style="font-size:16px">' + t("cartTitle") + "</h2>" +
      '<button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="drawer__body" id="mc-body"></div>' +
      '<div class="drawer__foot" id="mc-foot"></div></aside>';
  }
  function cmpTray() {
    return '<div class="cmp-tray" id="cmp-tray" aria-live="polite"><div class="container"><span class="cmp-tray__label"><b data-cmp-n>0</b>/4 ' + t("cmpTray") + "</span>" +
      '<div class="cmp-tray__items" id="cmp-items"></div><button class="btn btn--sm btn--ghost-dark" data-cmp-clear>' + t("cmpClear") + '</button><a class="btn btn--sm btn--volt" href="' + L("compare.html") + '">' + t("cmpGo") + "</a></div></div>";
  }
  function tabbar() {
    const home = LANG === "ar" ? L("index.html") : L(LANG + "/index.html");
    const cur = page === "home" ? "home" : page === "category" ? (qs("deals") ? "deals" : "cats") : (page === "cart" || page === "checkout") ? "cart" : ["orders", "quotes", "messages", "returns", "login"].includes(page) ? "acct" : "";
    const it = (k, href, ic, label, extra) => (href ? '<a href="' + href + '"' : '<button type="button" data-open="#catsheet"') + (cur === k ? ' aria-current="page"' : "") + ">" + icon(ic) + "<span>" + label + "</span>" + (extra || "") + (href ? "</a>" : "</button>");
    return '<nav class="tabbar" aria-label="' + t("menu") + '">' + it("home", home, "home", t("tHome")) + it("cats", "", "grid", t("tCats")) + it("deals", L("category.html?deals=1"), "tag", t("tDeals")) +
      it("cart", L("cart.html"), "cart", t("cart"), '<span class="tabbar__n" data-cart-count></span>') + it("acct", L("account/orders.html"), "user", t("account")) + "</nav>";
  }
  function catSheet() {
    return '<div class="bsheet" id="catsheet" role="dialog" aria-label="' + t("tCats") + '" aria-hidden="true"><span class="bsheet__handle"></span><div class="bsheet__head"><h2>' + t("tCats") + '</h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="catsheet">' +
      D.categories.map(c => '<a href="' + L("category.html?c=" + c.id) + '"><img src="' + IMG(c.img) + '" alt="" loading="lazy"><b>' + esc(nm(c)) + "</b><span>" + num(c.count) + " " + t("qparts") + "</span></a>").join("") +
      '</div><div class="catsheet__links"><a class="btn btn--line" href="' + L("request.html") + '">' + icon("doc", "icon--sm") + t("request") + '</a><a class="btn btn--volt" href="' + L("category.html?deals=1") + '">' + icon("tag", "icon--sm") + t("deals") + "</a></div></div>";
  }
  function mountChrome() {
    document.body.classList.add("is-store");
    const h = $("#site-header"), f = $("#site-footer");
    if (h) h.outerHTML = header() + mobileNav();
    if (f) f.outerHTML = footer();
    document.body.insertAdjacentHTML("beforeend", miniCart() + (page === "compare" ? "" : cmpTray()) + tabbar() + catSheet());
    // app bar: collapse the logo row on scroll (phones/tablets) and expose header height for sticky toolbars
    const hdr = $(".header");
    if (hdr) {
      const setH = () => document.documentElement.style.setProperty("--hdr-h", hdr.offsetHeight + "px");
      let compact = false;
      const onScroll = () => {
        const want = innerWidth < 1024 && scrollY > (compact ? 60 : 140);
        if (want !== compact) { compact = want; hdr.classList.toggle("is-compact", compact); setH(); }
      };
      addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", setH); setH();
    }
  }

  // ---------- cart ----------
  const getCart = () => store.get("nas_cart", null) || [{ id: "p10", qty: 1, v: "v2", cond: "new", price: 1180 }, { id: "p25", qty: 4, v: "v5", cond: "new", price: 18 }, { id: "p13", qty: 1, v: "v3", cond: "new", price: 265 }];
  const setCart = c => { store.set("nas_cart", c); syncCounts(); renderMiniCart(); };
  function addToCart(id, o) {
    o = o || {};
    const p = P(id); if (!p) return;
    const c = getCart();
    const key = x => x.id === id && x.v === (o.v || p.v) && x.cond === (o.cond || p.cond) && (x.size || "") === (o.size || "");
    const ex = c.find(key);
    if (ex) ex.qty += o.qty || 1;
    else c.push({ id, qty: o.qty || 1, v: o.v || p.v, cond: o.cond || p.cond, price: o.price || p.price, size: o.size || "" });
    setCart(c);
    toast(t("added"), "cart");
  }
  function syncCounts() {
    const n = getCart().reduce((s, x) => s + x.qty, 0);
    $$("[data-cart-count]").forEach(e => { e.textContent = n || ""; e.dataset.n = n; });
    const m = getCmp().length;
    $$("[data-cmp-count]").forEach(e => { e.textContent = m || ""; e.dataset.n = m; });
  }
  function groupByVendor(c) {
    const g = {};
    c.forEach((x, i) => { (g[x.v] = g[x.v] || []).push(Object.assign({ idx: i }, x)); });
    return g;
  }
  function renderMiniCart() {
    const body = $("#mc-body"), foot = $("#mc-foot");
    if (!body) return;
    const c = getCart();
    if (!c.length) { body.innerHTML = '<div class="empty">' + icon("cart") + "<p>" + t("cartEmpty") + "</p></div>"; foot.innerHTML = ""; return; }
    const g = groupByVendor(c);
    body.innerHTML = '<p class="muted" style="font-size:12px;margin-bottom:6px">' + t("shipNote") + "</p>" + Object.keys(g).map(vid =>
      '<div class="minicart-vendor">' + icon("store", "icon--sm") + esc(nm(V(vid))) + "</div>" + g[vid].map(x => {
        const p = P(x.id);
        return '<div class="minicart-item"><img src="' + IMG(p.img) + '" alt="" width="64" height="64" loading="lazy"><div style="display:grid;gap:4px"><h4>' + esc(nm(p)) + "</h4>" +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="mono muted" style="font-size:12px">' + x.qty + " × " + num(x.price, true) + "</span>" +
          '<button class="citem__rm" data-rm="' + x.idx + '">' + icon("trash", "icon--sm") + "</button></div></div></div>";
      }).join("")).join("");
    const sub = c.reduce((s, x) => s + x.qty * x.price, 0);
    foot.innerHTML = '<div class="sumrow" style="margin-bottom:12px"><span>' + t("subtotal") + '</span><span class="mono">' + moneyTxt(sub) + "</span></div>" +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><a class="btn btn--line" href="' + L("cart.html") + '">' + t("viewCart") + '</a><a class="btn btn--primary" href="' + L("checkout.html") + '">' + t("checkout") + "</a></div>";
  }

  // ---------- compare ----------
  const getCmp = () => store.get("nas_cmp", null) || [];
  function setCmp(a) { store.set("nas_cmp", a); syncCounts(); renderTray(); }
  function renderTray() {
    const tray = $("#cmp-tray"); if (!tray) return;
    const a = getCmp();
    tray.classList.toggle("is-on", a.length > 0);
    $("[data-cmp-n]", tray).textContent = a.length;
    $("#cmp-items").innerHTML = [0, 1, 2, 3].map(i => '<div class="cmp-slot">' + (a[i] ? '<img src="' + IMG(P(a[i]).img) + '" alt="">' : "") + "</div>").join("");
  }

  // ---------- global events ----------
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]");
    if (a) { e.preventDefault(); addToCart(a.dataset.add); return; }
    const rm = e.target.closest("[data-rm]");
    if (rm) { const c = getCart(); c.splice(+rm.dataset.rm, 1); setCart(c); if (page === "cart") renderCartPage(); return; }
    if (e.target.closest("[data-cmp-clear]")) { setCmp([]); $$("[data-cmp]").forEach(x => (x.checked = false)); }
  });
  document.addEventListener("change", e => {
    const c = e.target.closest("[data-cmp]");
    if (!c) return;
    let a = getCmp();
    if (c.checked) { if (a.length >= 4) { c.checked = false; toast(t("cmpMax"), "info"); return; } a.push(c.dataset.cmp); }
    else a = a.filter(x => x !== c.dataset.cmp);
    setCmp(a);
  });

  // =====================================================================
  // Pages
  // =====================================================================
  const pages = {};

  // ---------- Home ----------
  pages.home = function () {
    const qc = $("#qcats");
    if (qc) qc.innerHTML = '<div class="container qcats__grid">' + D.categories.map(c => '<a href="' + L("category.html?c=" + c.id) + '"><span class="qcats__ic"><img src="' + IMG(c.img) + '" alt="" loading="lazy" width="58" height="58"><b>' + c.code + "</b></span>" + esc(nm(c)) + "</a>").join("") + "</div>";
    const deals = D.products.filter(p => p.old);
    const dl = $("#deals"); if (dl) dl.innerHTML = deals.slice(0, 5).map(p => card(p)).join("");
    const ar = $("#arrivals");
    function arrivals(cat) {
      const list = D.products.filter(p => !cat || p.cat === cat).slice(0, 8);
      ar.innerHTML = list.map(p => card(p)).join("");
      reveal(ar);
    }
    if (ar) {
      arrivals("");
      const tl = $("#arrival-tabs");
      if (tl) tl.addEventListener("tabchange", e => arrivals(e.detail.dataset.cat));
    }
    const vg = $("#vendors");
    if (vg) vg.innerHTML = D.vendors.map(v =>
      '<a class="plate vcard reveal" href="' + L("vendor.html?v=" + v.id) + '"><div class="vcard__top"><span class="vavatar">' + initials(v) + "</span><div><h3>" + esc(nm(v)) + '</h3><span class="badge badge--ok">' + icon("badge", "icon--sm") + (LANG === "en" ? "Licence verified" : LANG === "ur" ? "لائسنس تصدیق شدہ" : "رخصة موثّقة") + "</span></div></div>" +
      '<div class="vcard__meta"><span>' + icon("pin", "icon--sm") + " " + esc(nm(v.city)) + '</span><span><span class="mono">' + v.rating + "</span> ★ (" + v.reviews + ')</span><span><span class="mono">' + num(v.products) + "</span> " + (LANG === "en" ? "products" : LANG === "ur" ? "مصنوعات" : "منتج") + "</span></div></a>").join("");
    // countdown to the end of the week (Sunday 23:59 local)
    const tm = $("#timer");
    if (tm) {
      const end = new Date(); end.setDate(end.getDate() + ((7 - end.getDay()) % 7 || 7)); end.setHours(23, 59, 59, 0);
      const tick = () => {
        let s = Math.max(0, (end - Date.now()) / 1000 | 0);
        const d = s / 86400 | 0; s %= 86400; const h = s / 3600 | 0; s %= 3600; const m = s / 60 | 0; s %= 60;
        tm.innerHTML = [d, h, m, s].map(x => "<span>" + String(x).padStart(2, "0") + "</span>").join(":");
      };
      tick(); setInterval(tick, 1000);
    }
  };

  // ---------- Category / search ----------
  const SUBCATS = {
    electrical: ["محركات كهربائية", "قواطع ولوحات", "كابلات", "إنارة صناعية", "مولدات"],
    pumps: ["مضخات طرد مركزي", "مضخات غاطسة", "صمامات كروية", "صمامات عدم رجوع", "قطع غيار المضخات"],
    hvac: ["كمبروسرات", "أدوات قياس", "ثرموستات", "مراوح", "غازات تبريد"],
    marine: ["رفاصات", "فلاتر", "قطع محركات بحرية", "معدات سطح", "مضخات بحرية"]
  };
  pages.category = function () {
    const c = qs("c"), q = (qs("q") || "").trim(), deals = qs("deals");
    const cat = C(c);
    const title = deals ? "عروض الأسبوع" : q ? "نتائج البحث عن «" + q + "»" : cat ? cat.ar : "كل الأقسام";
    $("#ph-title").textContent = title;
    $("#ph-crumb").textContent = title;
    $("#ph-code").textContent = cat ? cat.code : deals ? "%" : "P/N";
    document.title = title + " | NAS Market";
    $("#ph-sub").textContent = cat ? "قطع ومعدات " + cat.ar + " من بائعين موثّقين في الإمارات، جديدة ومستعملة ومجددة." : "تصفّح القطع والمعدات من كل البائعين.";
    const node = window.NAS.liveCats(D.catTree).find(x => x.id === c);
    const kids = node ? (node.children || []).filter(x => x.visible !== false) : [];
    const subs = kids.length ? kids.map(x => x.ar) : ["الأكثر مبيعاً", "وصل حديثاً", "شحن سريع", "قطع أصلية", "مستعمل بحالة ممتازة"];
    $("#subcats").innerHTML = '<a href="#" aria-current="true">الكل</a>' + subs.map(s => '<a href="#">' + s + "</a>").join("");

    // filters
    const vendorsIn = D.vendors;
    $("#f-vendor").innerHTML = vendorsIn.map(v => '<label class="check"><input type="checkbox" name="v" value="' + v.id + '"> ' + esc(v.ar) + '<span class="mono">' + D.products.filter(p => p.v === v.id).length + "</span></label>").join("");
    $("#f-cat").innerHTML = D.categories.map(x => '<label class="check"><input type="checkbox" name="cat" value="' + x.id + '"' + (x.id === c ? " checked" : "") + "> " + x.ar + '<span class="mono">' + num(x.count) + "</span></label>").join("");

    const grid = $("#grid"), chips = $("#chips"), form = $("#filters");
    function apply() {
      const fd = new FormData(form);
      const conds = fd.getAll("cond"), vs = fd.getAll("v"), cats = fd.getAll("cat");
      const min = +fd.get("min") || 0, max = +fd.get("max") || Infinity, stock = fd.get("stock");
      let list = D.products.filter(p =>
        (!cats.length || cats.includes(p.cat)) && (!conds.length || conds.includes(p.cond)) && (!vs.length || vs.includes(p.v)) &&
        p.price >= min && p.price <= max && (!stock || p.stock > 0) && (!deals || p.old) &&
        (!q || (p.ar + " " + p.en + " " + p.sku).toLowerCase().includes(q.toLowerCase())));
      const sort = $("#sort").value;
      if (sort === "low") list.sort((a, b) => a.price - b.price);
      if (sort === "high") list.sort((a, b) => b.price - a.price);
      if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
      $("#count").textContent = list.length;
      grid.innerHTML = list.length ? list.map(p => card(p)).join("") :
        '<div class="empty" style="grid-column:1/-1">' + icon("search") + "<p>لا توجد نتائج مطابقة. جرّب تخفيف الفلاتر أو</p><a class=\"btn btn--primary\" href=\"" + L("request.html?pn=" + encodeURIComponent(q)) + "\">اطلب القطعة من البائعين</a></div>";
      const labels = { new: "جديد", used: "مستعمل", refurb: "مجدد" };
      chips.innerHTML = conds.map(x => chip(labels[x], "cond", x)).join("") + vs.map(x => chip(V(x).ar, "v", x)).join("") +
        cats.filter(x => x !== c).map(x => chip(C(x).ar, "cat", x)).join("") + (q ? '<span class="chip">«' + esc(q) + "»</span>" : "");
      reveal(grid);
    }
    function chip(label, name, val) { return '<span class="chip">' + esc(label) + '<button type="button" data-unf="' + name + ":" + val + '" aria-label="إزالة">' + icon("x", "icon--sm") + "</button></span>"; }
    form.addEventListener("change", apply);
    form.addEventListener("submit", e => { e.preventDefault(); apply(); closeAll(); });
    $("#sort").addEventListener("change", apply);
    chips.addEventListener("click", e => {
      const b = e.target.closest("[data-unf]"); if (!b) return;
      const [n, v] = b.dataset.unf.split(":");
      const i = form.querySelector('input[name="' + n + '"][value="' + v + '"]'); if (i) i.checked = false; apply();
    });
    apply();
  };

  // ---------- Product ----------
  pages.product = function () {
    const p = P(qs("id")) || P("p10");
    const v = V(p.v), cat = C(p.cat);
    document.title = p.ar + " | NAS Market";
    const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const offers = D.offers[p.id] || [{ v: p.v === "v4" ? "v2" : "v4", cond: p.cond, price: Math.round(p.price * 1.04), eta: { ar: "2–3 أيام" } }];
    const specs = Object.entries(p.specs).map(([k, val]) => "<div><dt>" + (D.specLabels[k] || k) + "</dt><dd>" + esc(val) + "</dd></div>").join("");
    $("#crumbs").innerHTML = '<a href="' + L("index.html") + '">الرئيسية</a>' + icon("chev", "flip-rtl") + '<a href="' + L("category.html?c=" + cat.id) + '">' + cat.ar + "</a>" + icon("chev", "flip-rtl") + "<span>" + esc(p.sku) + "</span>";
    const condPrices = { new: p.cond === "new" ? p.price : null, refurb: null, used: null };
    [{ v: p.v, cond: p.cond, price: p.price }].concat(offers).forEach(o => { if (!condPrices[o.cond] || o.price < condPrices[o.cond]) condPrices[o.cond] = o.price; });

    $("#pdp").innerHTML =
      // gallery
      '<div class="gallery"><div class="gallery__main"><img id="g-main" src="' + IMG(p.img) + '" alt="' + esc(p.ar) + '" width="800" height="800">' +
      (off ? '<span class="pcard__off plate plate--volt" style="top:12px;inset-inline-end:12px">-' + off + "%</span>" : "") + "</div>" +
      '<div class="gallery__thumbs"><button aria-current="true"><img src="' + IMG(p.img) + '" alt=""></button>' +
      ["زاوية جانبية", "لوحة البيانات", "الأبعاد", "التغليف"].map(x => '<button><span class="ph">' + x + "</span></button>").join("") + "</div></div>" +
      // info
      '<div class="pinfo"><div style="display:flex;gap:6px;flex-wrap:wrap">' + condBadge(p.cond) + '<span class="badge">' + cat.ar + "</span>" + (p.stock > 0 ? '<span class="badge badge--ok"><span class="dot"></span>متوفر</span>' : "") + "</div>" +
      "<h1>" + esc(p.ar) + "</h1>" +
      '<div class="pinfo__meta"><span>البائع: <a href="' + L("vendor.html?v=" + v.id) + '">' + v.ar + '</a></span><span class="stars">' + icon("star") + "<b>" + p.rating + '</b> <a href="#reviews">(' + p.reviews + ' تقييم)</a></span><span>' + icon("chat", "icon--sm") + ' <a href="#qa">3 أسئلة مُجاب عنها</a></span></div>' +
      '<div class="plate idplate"><div><span class="plate__key">رقم القطعة P/N</span><span class="mono">' + esc(p.sku) + '</span><button class="copy" data-copy="' + esc(p.sku) + '">' + icon("copy", "icon--sm") + 'نسخ</button></div>' +
      '<div><span class="plate__key">الباركود EAN</span><span class="mono">629' + (p.sku.length * 7919 % 1e9).toString().padStart(10, "0") + '</span></div><div><span class="plate__key">بلد المنشأ</span><span>' + (p.cond === "new" ? "ألمانيا" : "—") + "</span></div></div>" +
      '<div class="condpick"><span class="label">الحالة — كل حالة من بائع مختلف</span><div class="condpick__opts">' +
      ["new", "refurb", "used"].map(cd => '<button class="condopt" aria-pressed="' + (cd === p.cond) + '"' + (condPrices[cd] ? "" : " disabled style=\"opacity:.45\"") + "><b>" + condLabel(cd) + '</b><span class="mono">' + (condPrices[cd] ? "من " + num(condPrices[cd]) : "غير متوفر") + "</span></button>").join("") + "</div></div>" +
      (p.sizes ? '<div class="condpick"><span class="label">المقاس</span><div class="sizes" id="sizes">' + p.sizes.map((s, i) => '<button aria-pressed="' + (i === 3) + '">' + s + "</button>").join("") + "</div></div>" : "") +
      '<div><h2 style="font-size:15px;margin-bottom:10px">المواصفات الفنية</h2><dl class="spec-table">' + specs + "</dl></div>" +
      '<ul class="bullets"><li>متوافق مع المعايير الأوروبية IEC، ومناسب للتشغيل في المناخ الحار.</li><li>يُشحن مع شهادة المطابقة من المصنع وفاتورة ضريبية باسمك.</li><li>ضمان البائع 12 شهراً على العيوب المصنعية (للمنتجات الجديدة).</li></ul></div>' +
      // buy box
      '<aside class="panel buybox"><div class="buybox__price">' + money(p.price) + (p.old ? '<span class="price-old">' + num(p.old, true) + "</span>" : "") + '</div><span class="buybox__vat">السعر غير شامل ضريبة القيمة المضافة 5%</span>' +
      '<div class="buybox__row">' + icon("truck") + "<span>توصيل <b>خلال 1–2 يوم</b> داخل دبي والشارقة</span></div>" +
      '<div class="buybox__row">' + icon("ret") + "<span>إرجاع واستبدال <b>حسب سياسة هذه القطعة</b> بالاتفاق مع المورد</span></div>" +
      '<div class="buybox__row">' + icon("shield") + "<span>الدفع يُحفظ لدى المنصة حتى استلامك</span></div>" +
      '<div class="buybox__row">' + icon("box") + "<span>" + (p.stock <= 3 ? '<span class="stock-low">آخر ' + p.stock + " قطع متوفرة</span>" : "المتوفر: <b class=\"mono\">" + p.stock + "</b> قطعة") + "</span></div>" +
      '<div class="buybox__actions"><div class="buybox__qty"><div class="qty"><button type="button" data-q="-1" aria-label="أقل">' + icon("minus", "icon--sm") + '</button><input id="qty" type="number" value="1" min="1" aria-label="الكمية"><button type="button" data-q="1" aria-label="أكثر">' + icon("plus", "icon--sm") + "</button></div>" +
      '<button class="btn btn--primary" id="add-main">' + icon("cart") + "أضف للسلة</button></div>" +
      '<a class="btn btn--volt btn--block" href="' + L("checkout.html") + '">اشترِ الآن</a>' +
      '<div class="buybox__sub"><button class="btn btn--line btn--sm" data-open="#m-rfq">' + icon("doc", "icon--sm") + 'طلب عرض سعر</button><button class="btn btn--line btn--sm" data-open="#m-ask">' + icon("chat", "icon--sm") + "استفسار من البائع</button></div></div>" +
      '<div class="ship-est"><label class="label" for="emirate">تقدير الشحن إلى</label><select class="select" id="emirate"><option>دبي</option><option>أبوظبي</option><option>الشارقة</option><option>عجمان</option><option>رأس الخيمة</option><option>الفجيرة</option><option>أم القيوين</option></select>' +
      '<div class="sumrow"><span>عادي (2–4 أيام)</span><span class="mono">15.00</span></div><div class="sumrow"><span>سريع (24 ساعة)</span><span class="mono">35.00</span></div></div>' +
      '<div class="plate" style="padding:12px 14px;display:flex;gap:10px;align-items:center"><span class="vavatar" style="width:38px;height:38px;font-size:12px">' + initials(v) + '</span><div style="font-size:13px;line-height:1.5"><b>' + v.ar + '</b><br><span class="muted">' + v.city.ar + " · يرد خلال " + v.response.replace("h", " ساعات") + "</span></div></div></aside>";

    // other sellers
    $("#offers").innerHTML = offers.map(o => { const ov = V(o.v); return '<div class="offer"><div><div class="offer__v">' + ov.ar + '</div><div class="offer__meta">' + condBadge(o.cond) + "<span>★ " + ov.rating + "</span><span>توصيل " + (o.eta.ar || "") + '</span></div></div><div class="offer__buy">' + money(o.price) + '<button class="btn btn--sm btn--line" data-add-offer="' + o.v + ":" + o.cond + ":" + o.price + '">أضف للسلة</button></div></div>'; }).join("");
    $("#similar").innerHTML = D.products.filter(x => x.cat === p.cat && x.id !== p.id).concat(D.products.filter(x => x.cat !== p.cat)).slice(0, 5).map(x => card(x)).join("");
    $("#spec-full").innerHTML = specs;
    $("#rfq-product").textContent = p.ar + " — " + p.sku;
    $("#ask-product").textContent = p.ar;
    $("#ask-vendor").textContent = v.ar;

    // interactions
    const qty = $("#qty");
    $("#pdp").addEventListener("click", e => {
      const q = e.target.closest("[data-q]"); if (q) qty.value = Math.max(1, (+qty.value || 1) + +q.dataset.q);
      const s = e.target.closest(".sizes button"); if (s) $$(".sizes button").forEach(b => b.setAttribute("aria-pressed", b === s));
      const co = e.target.closest(".condopt:not([disabled])"); if (co) $$(".condopt").forEach(b => b.setAttribute("aria-pressed", b === co));
      const cp = e.target.closest("[data-copy]"); if (cp) { try { navigator.clipboard.writeText(cp.dataset.copy); } catch (_) {} toast("تم نسخ رقم القطعة", "copy"); }
      const th = e.target.closest(".gallery__thumbs button"); if (th) $$(".gallery__thumbs button").forEach(b => b.setAttribute("aria-current", b === th));
    });
    $("#add-main").addEventListener("click", () => {
      const sz = $(".sizes button[aria-pressed=true]");
      addToCart(p.id, { qty: +qty.value || 1, size: sz ? sz.textContent : "" });
      if (innerWidth >= 1024) open("#minicart");
    });
    document.body.classList.add("has-buybar");
    document.body.insertAdjacentHTML("beforeend", '<div class="buybar"><div class="buybar__price">' + money(p.price) + "<small>" + (p.stock <= 3 ? "آخر " + p.stock + " قطع · " : "") + 'غير شامل الضريبة</small></div><button class="btn btn--line btn--icon" data-open="#m-ask" aria-label="استفسار من البائع">' + icon("chat") + '</button><button class="btn btn--primary" id="bb-add">' + icon("cart", "icon--sm") + "أضف للسلة</button></div>");
    $("#bb-add").addEventListener("click", () => { const sz = $(".sizes button[aria-pressed=true]"); addToCart(p.id, { qty: +qty.value || 1, size: sz ? sz.textContent : "" }); });
    document.addEventListener("click", e => {
      const b = e.target.closest("[data-add-offer]"); if (!b) return;
      const [ov, oc, op] = b.dataset.addOffer.split(":");
      addToCart(p.id, { v: ov, cond: oc, price: +op });
    });
    $$("[data-submit-toast]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); closeAll(); toast(f.dataset.submitToast); }));
  };

  // ---------- Compare ----------
  pages.compare = function () {
    let ids = getCmp();
    if (ids.length < 2) ids = ["p10", "p04", "p27"];
    const ps = ids.map(P).filter(Boolean);
    const rows = [
      ["السعر", p => money(p.price)],
      ["الحالة", p => condBadge(p.cond)],
      ["البائع", p => '<a class="link" href="' + L("vendor.html?v=" + p.v) + '">' + V(p.v).ar + "</a>"],
      ["التقييم", p => '<span class="stars">' + icon("star") + "<b>" + p.rating + "</b> (" + p.reviews + ")</span>"],
      ["رقم القطعة", p => '<span class="mono">' + p.sku + "</span>"],
      ["المتوفر", p => '<span class="mono">' + p.stock + "</span>"]
    ];
    const keys = [...new Set(ps.flatMap(p => Object.keys(p.specs)))];
    $("#cmp").innerHTML = '<table class="cmp-table"><thead><tr><th></th>' + ps.map(p => '<th><div class="cmp-col"><img src="' + IMG(p.img) + '" alt=""><h3>' + esc(p.ar) + '</h3><button class="btn btn--sm btn--primary" data-add="' + p.id + '">' + icon("cart", "icon--sm") + "أضف للسلة</button></div></th>").join("") + "</tr></thead><tbody>" +
      rows.map(([l, f]) => "<tr><th>" + l + "</th>" + ps.map(p => "<td>" + f(p) + "</td>").join("") + "</tr>").join("") +
      keys.map(k => { const vals = ps.map(p => p.specs[k] || "—"); const diff = new Set(vals).size > 1; return '<tr class="' + (diff ? "cmp-diff" : "") + '"><th>' + (D.specLabels[k] || k) + "</th>" + vals.map(x => '<td class="mono" dir="ltr" style="text-align:right">' + esc(x) + "</td>").join("") + "</tr>"; }).join("") +
      "</tbody></table>";
  };

  // ---------- Vendor ----------
  pages.vendor = function () {
    const v = V(qs("v")) || V("v1");
    document.title = v.ar + " | NAS Market";
    $("#vh").innerHTML = '<img class="vhead__cover" src="' + IMG(v.cover) + '" alt=""><div class="container"><span class="vavatar">' + initials(v) + "</span>" +
      '<div><div class="crumbs" style="color:var(--on-dark-muted)"><a href="' + L("index.html") + '">الرئيسية</a>' + icon("chev", "flip-rtl") + "<span>البائعون</span></div><h1>" + v.ar + "</h1>" +
      '<div class="vhead__meta"><span class="badge badge--volt">' + icon("badge", "icon--sm") + 'رخصة تجارية موثّقة</span><span>' + icon("pin", "icon--sm") + " " + v.city.ar + '</span><span>عضو منذ <span class="mono">' + v.since + '</span></span><span>رقم الرخصة <span class="mono">CN-' + (1000000 + v.reviews * 917) + "</span></span></div></div>" +
      '<div class="vhead__stats"><div class="plate plate--dark"><b>' + v.rating + "</b><span>" + v.reviews + ' تقييم</span></div><div class="plate plate--dark"><b>' + num(v.products) + '</b><span>منتج</span></div><div class="plate plate--dark"><b>' + v.response + "</b><span>متوسط الرد</span></div></div></div>";
    const list = D.products.filter(p => p.v === v.id);
    $("#vgrid").innerHTML = list.concat(D.products.filter(p => p.v !== v.id)).slice(0, 12).map(p => card(p)).join("");
    $("#vcount").textContent = num(v.products);
    $("#vname").textContent = v.ar;
  };

  // ---------- Cart ----------
  function totals(c, opt) {
    opt = opt || {};
    const g = groupByVendor(c);
    let sub = 0, ship = 0;
    Object.values(g).forEach(items => {
      const s = items.reduce((a, x) => a + x.qty * x.price, 0);
      sub += s; ship += s >= 500 ? 0 : (opt.express ? 35 : 15);
    });
    const disc = opt.coupon ? Math.round(sub * 0.1 * 100) / 100 : 0;
    const cod = opt.cod ? 10 : 0;
    const vat = (sub - disc + ship + cod) * 0.05;
    return { g, sub, ship, disc, cod, vat, total: sub - disc + ship + cod + vat };
  }
  function summaryHtml(tt, cta) {
    return '<h2>ملخص الطلب</h2><div class="sumrow"><span>المجموع الفرعي</span><span class="mono">' + num(tt.sub, true) + "</span></div>" +
      (tt.disc ? '<div class="sumrow" style="color:var(--ok)"><span>خصم القسيمة NAS10</span><span class="mono">-' + num(tt.disc, true) + "</span></div>" : "") +
      '<div class="sumrow"><span>الشحن (' + Object.keys(tt.g).length + " شحنات)</span><span class=\"mono\">" + (tt.ship ? num(tt.ship, true) : "مجاني") + "</span></div>" +
      (tt.cod ? '<div class="sumrow"><span>رسوم الدفع عند الاستلام</span><span class="mono">' + num(tt.cod, true) + "</span></div>" : "") +
      '<div class="sumrow"><span>ضريبة القيمة المضافة 5%</span><span class="mono">' + num(tt.vat, true) + "</span></div>" +
      '<div class="sumrow sumrow--total"><span>الإجمالي</span><span class="mono">' + num(tt.total, true) + ' <small style="font-size:12px">درهم</small></span></div>' + (cta || "");
  }
  function renderCartPage() {
    const c = getCart();
    const root = $("#cart");
    const oldBar = $(".cartbar"); if (oldBar) oldBar.remove();
    if (!c.length) { root.innerHTML = '<div class="panel empty" style="grid-column:1/-1">' + icon("cart") + "<p>سلتك فارغة</p><a class=\"btn btn--primary\" href=\"" + L("index.html") + "\">تصفح المنتجات</a></div>"; return; }
    const coupon = store.get("nas_coupon", false);
    const tt = totals(c, { coupon });
    $("#cart-count").textContent = c.reduce((s, x) => s + x.qty, 0);
    root.innerHTML = '<div style="display:grid;gap:16px"><div class="plate" style="padding:12px 18px;font-size:13px;display:flex;gap:10px;align-items:center">' + icon("info") +
      "<span>طلبك يحتوي منتجات من <b>" + Object.keys(tt.g).length + " بائعين</b>، وسيُقسَّم تلقائياً إلى طلبات فرعية يشحن كل بائع طلبه منها بشكل مستقل.</span></div>" +
      Object.keys(tt.g).map((vid, gi) => {
        const v = V(vid), items = tt.g[vid];
        const s = items.reduce((a, x) => a + x.qty * x.price, 0);
        return '<section class="vgroup"><div class="vgroup__head"><span>' + icon("store", "icon--sm") + ' <b><a href="' + L("vendor.html?v=" + vid) + '">' + v.ar + '</a></b></span><span class="mono">SHIPMENT 0' + (gi + 1) + "</span></div>" +
          items.map(x => {
            const p = P(x.id);
            return '<div class="citem"><a class="citem__img" href="' + L("product.html?id=" + p.id) + '"><img src="' + IMG(p.img) + '" alt="" width="84" height="84"></a><div class="citem__main">' +
              '<a class="citem__title" href="' + L("product.html?id=" + p.id) + '">' + esc(p.ar) + '</a><span class="citem__pn mono">P/N ' + p.sku + (x.size ? " · SIZE " + x.size : "") + "</span>" +
              '<div style="display:flex;gap:6px">' + condBadge(x.cond) + "</div>" +
              '<div class="citem__row"><div class="qty"><button data-cq="' + x.idx + ':-1" aria-label="أقل">' + icon("minus", "icon--sm") + '</button><input value="' + x.qty + '" readonly aria-label="الكمية"><button data-cq="' + x.idx + ':1" aria-label="أكثر">' + icon("plus", "icon--sm") + "</button></div>" +
              money(x.qty * x.price) + '<button class="citem__rm" data-rm="' + x.idx + '">' + icon("trash", "icon--sm") + "حذف</button></div></div></div>";
          }).join("") +
          '<div class="vgroup__foot"><span>' + (s >= 500 ? '<b style="color:var(--ok)">شحن مجاني</b> لهذا البائع' : "أضف بقيمة <b class=\"mono\">" + num(500 - s, true) + "</b> للحصول على شحن مجاني من هذا البائع") + '</span><span class="mono">' + num(s, true) + "</span></div></section>";
      }).join("") + "</div>" +
      '<aside class="panel summary">' + summaryHtml(tt,
        '<form class="coupon" id="coupon"><input class="input" name="code" placeholder="كود الخصم" value="' + (coupon ? "NAS10" : "") + '" aria-label="كود الخصم"><button class="btn btn--line">تطبيق</button></form>' +
        '<a class="btn btn--primary btn--lg btn--block" href="' + L("checkout.html") + '">' + icon("lock") + 'متابعة لإتمام الطلب</a>' +
        '<div class="trust-mini"><span>' + icon("shield") + "دفع آمن عبر مزود مرخّص في الإمارات</span><span>" + icon("doc") + "فاتورة ضريبية لكل بائع</span><span>" + icon("ret") + "إرجاع واستبدال حسب كل قطعة</span></div>") + "</aside>";
    $("#coupon").addEventListener("submit", e => { e.preventDefault(); store.set("nas_coupon", true); toast("تم تطبيق خصم 10%"); renderCartPage(); });
    document.body.insertAdjacentHTML("beforeend", '<div class="cartbar"><span class="cartbar__total">الإجمالي شامل الضريبة<b>' + num(tt.total, true) + ' درهم</b></span><a class="btn btn--volt" href="' + L("checkout.html") + '">' + icon("lock", "icon--sm") + "إتمام الطلب</a></div>");
  }
  pages.cart = function () {
    renderCartPage();
    $("#cart").addEventListener("click", e => {
      const b = e.target.closest("[data-cq]"); if (!b) return;
      const [i, d] = b.dataset.cq.split(":").map(Number);
      const c = getCart(); c[i].qty = Math.max(1, c[i].qty + d); setCart(c); renderCartPage();
    });
    $("#recs").innerHTML = D.products.slice(8, 13).map(p => card(p)).join("");
  };

  // ---------- Checkout ----------
  pages.checkout = function () {
    const form = $("#co-form");
    function upd() {
      const fd = new FormData(form);
      const tt = totals(getCart(), { coupon: store.get("nas_coupon", false), express: fd.get("ship") === "express", cod: fd.get("pay") === "cod" });
      const items = Object.keys(tt.g).map(vid => '<div class="minicart-vendor">' + icon("store", "icon--sm") + V(vid).ar + "</div>" + tt.g[vid].map(x => { const p = P(x.id); return '<div class="minicart-item"><img src="' + IMG(p.img) + '" alt="" width="64" height="64"><div><h4>' + esc(p.ar) + '</h4><span class="mono muted" style="font-size:12px">' + x.qty + " × " + num(x.price, true) + "</span></div></div>"; }).join("")).join("");
      $("#co-sum").innerHTML = summaryHtml(tt, '<details><summary style="cursor:pointer;font-size:13px;color:var(--marine-700)">عرض المنتجات (' + getCart().length + ")</summary>" + items + "</details>" +
        '<button class="btn btn--volt btn--lg btn--block" form="co-form">' + icon("lock") + "تأكيد الطلب ودفع " + num(tt.total, true) + " درهم</button>" +
        '<p class="muted" style="font-size:12px">بالضغط على تأكيد الطلب أنت توافق على الشروط والأحكام وسياسة الإرجاع.</p>');
      let bb = $(".buybar");
      if (!bb) { document.body.classList.add("has-buybar"); document.body.insertAdjacentHTML("beforeend", '<div class="buybar buybar--dark"></div>'); bb = $(".buybar"); }
      bb.innerHTML = '<div class="buybar__price">' + money(tt.total) + '<small>شامل الضريبة والشحن</small></div><button class="btn btn--volt" form="co-form">' + icon("lock", "icon--sm") + "تأكيد الطلب</button>";
      $("#card-fields").hidden = fd.get("pay") !== "card";
      $("#bank-info").hidden = fd.get("pay") !== "bank";
    }
    form.addEventListener("change", upd);
    form.addEventListener("submit", e => {
      e.preventDefault();
      const tt = totals(getCart(), {});
      const no = "NAS-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-0042";
      const bb = $(".buybar"); if (bb) bb.remove(); document.body.classList.remove("has-buybar");
      $("#co-root").innerHTML = '<div class="panel success" style="grid-column:1/-1"><span class="success__icon">' + icon("check") + "</span><h1>تم استلام طلبك</h1>" +
        '<p class="muted">رقم الطلب <b class="mono" style="color:var(--ink)">' + no + "</b> — أرسلنا التفاصيل والفاتورة إلى بريدك.</p>" +
        '<div class="suborders">' + Object.keys(tt.g).map((vid, i) => '<div class="plate"><div class="plate__row"><span><span class="plate__key">SUB-ORDER</span> <b class="mono">' + no + "-" + (i + 1) + "</b></span>" + '<span class="badge badge--info">بانتظار تأكيد البائع</span></div><div class="plate__row" style="margin-top:4px;font-size:13px"><span>' + V(vid).ar + '</span><span class="mono">' + tt.g[vid].length + " منتج</span></div></div>").join("") + "</div>" +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn btn--primary" href="' + L("account/orders.html") + '">تتبّع الطلب</a><a class="btn btn--line" href="' + L("index.html") + '">متابعة التسوق</a></div></div>';
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    upd();
  };

  // ---------- Request a part ----------
  pages.request = function () {
    const pn = qs("pn"); if (pn) $("#r-pn").value = pn;
    $("#r-form").addEventListener("submit", e => {
      e.preventDefault();
      $("#r-form").innerHTML = '<div class="success" style="padding:32px 8px"><span class="success__icon">' + icon("check") + '</span><h2 style="font-size:20px">وصل طلبك</h2><p class="muted">رقم الطلب <b class="mono">REQ-2610-118</b>. أرسلناه إلى 14 بائعاً متخصصاً، وستصلك العروض في حسابك وعبر البريد الإلكتروني.</p><a class="btn btn--primary" href="' + L("account/quotes.html") + '">متابعة الطلب</a></div>';
    });
  };

  // ---------- Login ----------
  pages.login = function () {
    $$("form[data-go]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); location.href = L(f.dataset.go); }));
  };

  // ---------- Account ----------
  function acctNav(active) {
    const items = [["orders", "طلباتي", "box", ""], ["quotes", "عروض الأسعار", "doc", "2"], ["messages", "المحادثات", "chat", "3"], ["returns", "الإرجاع والاسترداد", "ret", ""]];
    return '<nav class="acct-nav" aria-label="حسابي"><div class="acct-nav__user"><span class="vavatar" style="background:var(--volt-500);color:var(--navy-900)">AK</span><div>أحمد خالد<small>عضو منذ 2026</small></div></div><ul>' +
      items.map(([k, l, ic, n]) => '<li><a href="' + L("account/" + k + ".html") + '"' + (k === active ? ' aria-current="page"' : "") + ">" + icon(ic) + l + (n ? '<span class="mono">' + n + "</span>" : "") + "</a></li>").join("") +
      '<li><a href="' + L("login.html") + '">' + icon("logout") + "تسجيل الخروج</a></li></ul></nav>";
  }
  function mountAcct(active) { $("#acct-nav").outerHTML = acctNav(active); }

  pages.orders = function () {
    mountAcct("orders");
    const orders = [
      { no: "NAS-261024-0042", date: "24 أكتوبر 2026", total: 1838.25, pay: "بطاقة •••• 4421", subs: [
        { v: "v2", items: ["p10"], step: 3, status: ["info", "تم الشحن"], awb: "ARX 7731 0042 19" },
        { v: "v5", items: ["p25", "p23"], step: 4, status: ["ok", "تم التسليم"], awb: "ARX 7731 0042 20" },
        { v: "v3", items: ["p13"], step: 1, status: ["warn", "بانتظار تأكيد البائع"], awb: "" }] },
      { no: "NAS-261009-0017", date: "9 أكتوبر 2026", total: 471.45, pay: "الدفع عند الاستلام", subs: [
        { v: "v4", items: ["p19", "p11"], step: 4, status: ["ok", "تم التسليم"], awb: "ARX 7720 0017 03" }] }
    ];
    const steps = ["تم الطلب", "تأكيد البائع", "قيد التجهيز", "تم الشحن", "تم التسليم"];
    $("#orders").innerHTML = orders.map(o => '<article class="order"><div class="order__head"><div><small>رقم الطلب</small><span class="mono">' + o.no + "</span></div><div><small>التاريخ</small>" + o.date + '</div><div><small>الإجمالي</small><span class="mono">' + num(o.total, true) + " درهم</span></div><div><small>الدفع</small>" + o.pay + "</div>" +
      '<div class="btns"><a class="btn btn--sm btn--line" href="#">' + icon("download", "icon--sm") + "الفواتير PDF</a></div></div>" +
      o.subs.map((s, i) => '<div class="sub"><div class="sub__top"><span><span class="plate__key">SUB-ORDER ' + (i + 1) + "</span> · <b>" + V(s.v).ar + '</b></span><span class="badge badge--' + s.status[0] + '">' + s.status[1] + "</span></div>" +
        '<ol class="steps">' + steps.map((st, j) => '<li class="step ' + (j < s.step ? "is-done" : j === s.step ? "is-current" : "") + '">' + st + "</li>").join("") + "</ol>" +
        '<div class="sub__top"><div class="sub__items">' + s.items.map(id => '<a href="' + L("product.html?id=" + id) + '"><img src="' + IMG(P(id).img) + '" alt="' + esc(P(id).ar) + '"></a>').join("") + "</div>" +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' + (s.awb ? '<span class="awb">AWB ' + s.awb + "</span>" : "") +
        (s.step >= 3 ? '<a class="btn btn--sm btn--line" href="#">' + icon("truck", "icon--sm") + "تتبع الشحنة</a>" : "") +
        (s.step === 4 ? '<a class="btn btn--sm btn--line" href="' + L("account/returns.html") + '">' + icon("ret", "icon--sm") + "طلب إرجاع</a>" : "") +
        '<a class="btn btn--sm btn--line" href="' + L("account/messages.html") + '">' + icon("chat", "icon--sm") + "تواصل مع البائع</a></div></div></div>").join("") + "</article>").join("");
  };

  pages.quotes = function () {
    mountAcct("quotes");
    const q = [
      { no: "RFQ-2610-031", p: "p04", qty: 6, date: "22 أكتوبر 2026", state: ["ok", "وصل عرض"], offer: { v: "v1", unit: 3620, lead: "7 أيام عمل", valid: "5 نوفمبر 2026", note: "سعر خاص للكمية، الشحن مجاني لمستودعكم في جبل علي." } },
      { no: "RFQ-2610-028", p: "p28", qty: 12, date: "20 أكتوبر 2026", state: ["ok", "وصل عرض"], offer: { v: "v2", unit: 1310, lead: "3 أيام عمل", valid: "30 أكتوبر 2026", note: "يتوفر 8 بكرات فوراً والباقي خلال 10 أيام." } },
      { no: "REQ-2610-118", p: null, pn: "SKF 22216 E", qty: 2, date: "25 أكتوبر 2026", state: ["warn", "بانتظار ردود البائعين"], sent: 14 },
      { no: "RFQ-2609-077", p: "p12", qty: 3, date: "28 سبتمبر 2026", state: ["", "منتهي الصلاحية"] }
    ];
    $("#quotes").innerHTML = q.map(r => {
      const p = r.p && P(r.p);
      return '<article class="order"><div class="order__head"><div><small>رقم الطلب</small><span class="mono">' + r.no + "</span></div><div><small>القطعة</small>" + (p ? esc(p.ar) : '<span class="mono">' + r.pn + "</span> (غير موجودة بالمتجر)") + '</div><div><small>الكمية</small><span class="mono">' + r.qty + "</span></div><div><small>التاريخ</small>" + r.date + '</div><div class="btns"><span class="badge badge--' + (r.state[0] || "") + '">' + r.state[1] + "</span></div></div>" +
        (r.offer ? '<div class="sub"><div class="plate" style="padding:16px 20px;display:grid;gap:12px"><div class="plate__row"><b>' + V(r.offer.v).ar + '</b><span class="plate__key">QUOTE · ' + r.no.replace("RFQ", "Q") + "</span></div>" +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px"><div><span class="plate__key">سعر الوحدة</span><br>' + money(r.offer.unit) + '</div><div><span class="plate__key">الإجمالي</span><br>' + money(r.offer.unit * r.qty) + '</div><div><span class="plate__key">مدة التوريد</span><br>' + r.offer.lead + '</div><div><span class="plate__key">صالح حتى</span><br>' + r.offer.valid + "</div></div>" +
          '<p style="font-size:13px" class="muted">' + r.offer.note + "</p></div>" +
          '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn--primary btn--sm" data-acc>' + icon("check", "icon--sm") + 'قبول وتحويل لطلب</button><button class="btn btn--line btn--sm">' + icon("chat", "icon--sm") + 'تفاوض مع البائع</button><button class="btn btn--line btn--sm">' + icon("download", "icon--sm") + 'عرض السعر PDF</button><button class="btn btn--danger btn--sm">رفض</button></div></div>' : "") +
        (r.sent ? '<div class="sub"><p style="font-size:14px">' + icon("clock", "icon--sm") + " أُرسل الطلب إلى <b class=\"mono\">" + r.sent + "</b> بائعاً متخصصاً بالمحامل. عادةً تصل أول العروض خلال 24 ساعة.</p></div>" : "") + "</article>";
    }).join("");
    $("#quotes").addEventListener("click", e => { if (e.target.closest("[data-acc]")) toast("تم قبول العرض وتحويله إلى طلب — أكمل الدفع من السلة"); });
  };

  pages.messages = function () {
    mountAcct("messages");
    const convs = [["v2", "متوفر وجاهز للشحن اليوم إن شاء الله", "10:42"], ["v1", "أرسلنا لك عرض السعر المحدث", "أمس"], ["v3", "شكراً لتقييمك", "20/10"]];
    $("#conv-list").innerHTML = convs.map(([vid, m, tm], i) => { const v = V(vid); return '<button class="chat__conv" aria-current="' + (i === 0) + '"><span class="vavatar">' + initials(v) + "</span><span style=\"min-width:0\"><b>" + v.ar + "</b><p>" + m + "</p></span><time>" + tm + "</time></button>"; }).join("");
    const box = $("#msgs");
    $("#compose").addEventListener("submit", e => {
      e.preventDefault();
      const i = $("#compose input"); if (!i.value.trim()) return;
      box.insertAdjacentHTML("beforeend", '<div class="msg msg--me">' + esc(i.value) + "<time>الآن</time></div>");
      i.value = ""; box.scrollTop = box.scrollHeight;
    });
    box.scrollTop = box.scrollHeight;
  };

  pages.returns = function () {
    mountAcct("returns");
    $("#rt-form").addEventListener("submit", e => { e.preventDefault(); closeAll(); toast("تم إرسال طلب الإرجاع RMA-2610-009"); });
  };

  // ---------- boot ----------
  mountChrome();
  mountBanners();
  syncCounts();
  renderMiniCart();
  renderTray();
  if (pages[page]) pages[page]();
  reveal();
})();
