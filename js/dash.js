/* NAS Market — seller & admin dashboards (AR/EN from one source) */
(function () {
  const { LANG, ROOT, icon, brand, logoMark, wave, num, esc, $, $$, toast, open, closeAll, bannerHTML, bannerText, liveBanners } = window.NAS;
  const D = window.NAS_DATA;
  const AR = LANG === "ar";
  const tr = (a, e) => (AR ? a : e);
  const APP = document.body.dataset.app;
  const VIEW = document.body.dataset.page;
  const IMG = n => ROOT + "assets/img/" + n + ".jpg";
  const P = id => D.products.find(p => p.id === id);
  const V = id => D.vendors.find(v => v.id === id);
  const C = id => D.categories.find(c => c.id === id);
  const pn = p => (AR ? p.ar : p.en);
  const vn = v => (AR ? v.ar : v.en);
  const cn = c => (AR ? c.ar : c.en);
  const aed = (n, d) => AR ? '<span class="mono">' + num(n, d) + '</span> <span class="muted" style="font-size:.85em">درهم</span>' : '<span class="muted" style="font-size:.85em">AED</span> <span class="mono">' + num(n, d) + "</span>";
  const badge = (cls, txt) => '<span class="badge badge--' + cls + '">' + txt + "</span>";
  const condB = c => badge(c, { new: tr("جديد", "New"), used: tr("مستعمل", "Used"), refurb: tr("مجدد", "Refurb.") }[c]);
  const delta = (v, up) => '<span class="delta delta--' + (up === false || v < 0 ? "down" : "up") + '">' + (v > 0 ? "▲ " : "▼ ") + Math.abs(v) + "%</span>";

  const ST = {
    new: [tr("جديد", "New"), "warn"], processing: [tr("قيد التجهيز", "Processing"), "info"], shipped: [tr("تم الشحن", "Shipped"), "info"],
    delivered: [tr("تم التسليم", "Delivered"), "ok"], returned: [tr("طلب إرجاع", "Return"), "danger"], cancelled: [tr("ملغي", "Cancelled"), ""]
  };
  const stB = s => badge(ST[s][1], ST[s][0]);

  // ---------- nav ----------
  const NAV = {
    seller: [
      [tr("الرئيسية", "Main"), [["index", tr("نظرة عامة", "Overview"), "grid"], ["orders", tr("الطلبات", "Orders"), "box", 4], ["products", tr("المنتجات", "Products"), "tag"], ["quotes", tr("طلبات عروض الأسعار", "Quote requests"), "doc", 2]]],
      [tr("المالية", "Finance"), [["payouts", tr("الأرباح والكشوف", "Earnings & statements"), "wallet"]]],
      [tr("المتجر", "Store"), [["@vendor", tr("عرض متجري", "View my store"), "store"], ["@msgs", tr("المحادثات", "Messages"), "chat", 3], ["support", tr("الدعم الفني", "Support"), "headset", 1]]]
    ],
    admin: [
      [tr("الرئيسية", "Main"), [["index", tr("نظرة عامة", "Overview"), "grid"], ["orders", tr("الطلبات", "Orders"), "box"], ["vendors", tr("البائعون", "Sellers"), "users", 5]]],
      [tr("الدعم الفني", "Support"), [["support?aud=buyer", tr("دعم العملاء", "Customer support"), "user", 6], ["support?aud=seller", tr("دعم البائعين", "Seller support"), "store", 12]]],
      [tr("الكتالوج", "Catalogue"), [["products", tr("مراجعة المنتجات", "Product review"), "check", 7], ["categories", tr("التصنيفات", "Categories"), "grid"]]],
      [tr("المحتوى والتواصل", "Content & messaging"), [["banners", tr("البنرات والعروض", "Banners & offers"), "image"], ["notifications", tr("مركز الإشعارات", "Notification center"), "bell"]]],
      [tr("المالية", "Finance"), [["commissions", tr("العمولات والتسويات", "Commissions & payouts"), "percent"]]],
      [tr("الإعدادات", "Settings"), [["integrations", tr("التكاملات وشركات الشحن", "Integrations & carriers"), "plug"], ["staff", tr("الموظفون والصلاحيات", "Staff & permissions"), "key"], ["@store", tr("عرض المتجر", "View storefront"), "store"]]]
    ]
  };
  const TITLES = {
    seller: { index: tr("نظرة عامة", "Overview"), orders: tr("الطلبات", "Orders"), products: tr("المنتجات", "Products"), quotes: tr("طلبات عروض الأسعار", "Quote requests"), payouts: tr("الأرباح والكشوف", "Earnings & statements"), support: tr("الدعم الفني", "Support"), "product-new": tr("إضافة منتج", "Add product") },
    admin: { index: tr("نظرة عامة", "Overview"), orders: tr("كل الطلبات", "All orders"), vendors: tr("البائعون", "Sellers"), commissions: tr("العمولات والتسويات", "Commissions & payouts"), staff: tr("الموظفون والصلاحيات", "Staff & permissions"), banners: tr("البنرات والعروض", "Banners & offers"), support: tr("الدعم الفني", "Support tickets"), integrations: tr("التكاملات", "Integrations"), notifications: tr("مركز الإشعارات", "Notification center"), categories: tr("التصنيفات", "Categories"), products: tr("مراجعة المنتجات", "Product review") }
  };
  const storeHome = ROOT + (AR ? "index.html" : "en/index.html");
  function navHref(k) {
    if (k === "@vendor") return ROOT + "vendor.html?v=v2";
    if (k === "@msgs") return ROOT + "account/messages.html";
    if (k === "@store") return storeHome;
    const [b, q] = k.split("?");
    return b + ".html" + (q ? "?" + q : "");
  }
  function isCur(k) {
    const [b, q] = k.split("?");
    if (b !== VIEW && !(VIEW === "product-new" && b === "products")) return false;
    if (!q) return true;
    return location.search.includes(q) || (q === "aud=buyer" && !location.search.includes("aud="));
  }
  function langSwitch() {
    const arUrl = ROOT + APP + "/" + VIEW + ".html" + location.search, enUrl = ROOT + "en/" + APP + "/" + VIEW + ".html" + location.search;
    return '<nav class="langs" aria-label="Language"><a href="' + arUrl + '" hreflang="ar" lang="ar" aria-current="' + AR + '">ع</a><a href="' + enUrl + '" hreflang="en" lang="en" aria-current="' + !AR + '">EN</a></nav>';
  }
  function shell() {
    const me = APP === "seller"
      ? { av: "PE", name: tr("مصدر الطاقة للكهربائيات", "PowerSource Electric"), role: tr("بائع · الشارقة", "Seller · Sharjah"), user: tr("سامي رضا", "Sami Reda"), urole: tr("مالك المتجر", "Store owner") }
      : { av: "NA", name: "NAS Market", role: tr("لوحة الإدارة", "Admin console"), user: tr("عمر خ.", "Omar K."), urole: tr("مدير عام", "Super admin") };
    const side = '<aside class="side" id="side" aria-label="' + tr("القائمة", "Navigation") + '"><div class="side__brand">' + brand(storeHome) + '<button class="close-btn" data-close aria-label="close">' + icon("x") + "</button></div>" +
      '<div class="plate plate--dark side__ws"><span class="plate__key">' + (APP === "seller" ? tr("لوحة البائع", "SELLER CENTRAL") : tr("لوحة الإدارة", "ADMIN CONSOLE")) + "</span><b>" + me.name + "</b>" +
      (APP === "seller" ? badge("ok", icon("badge", "icon--sm") + tr("متجر موثّق · نشط", "Verified · Active")) : badge("volt", tr("بيئة العرض", "Demo environment"))) + "</div><nav>" +
      NAV[APP].map(([g, items]) => '<div class="side__group">' + g + "</div>" + items.map(([k, l, ic, n]) =>
        '<a class="nav-i" href="' + navHref(k) + '"' + (isCur(k) ? ' aria-current="page"' : "") + ">" + icon(ic) + "<span>" + l + "</span>" + (n ? '<span class="n">' + n + "</span>" : "") + "</a>").join("")).join("") +
      '</nav><div class="side__foot"><a href="#">' + icon("settings", "icon--sm") + tr("الإعدادات", "Settings") + '</a><a href="#">' + icon("info", "icon--sm") + tr("مركز المساعدة", "Help center") + '</a><a href="' + storeHome + '">' + icon("logout", "icon--sm") + tr("تسجيل الخروج", "Sign out") + "</a></div></aside>";
    const top = '<header class="top"><div class="top__in"><button class="top__menu" data-open="#side" aria-label="' + tr("القائمة", "Menu") + '">' + icon("menu") + "</button>" +
      '<span class="top__title">' + logoMark(true) + "<span>" + (TITLES[APP][VIEW] || "") + "</span></span>" +
      '<label class="top__search">' + icon("search", "icon--sm") + '<input placeholder="' + (APP === "seller" ? tr("ابحث عن طلب، منتج، أو رقم قطعة…", "Search orders, products, part numbers…") : tr("ابحث عن بائع، طلب، أو عميل…", "Search sellers, orders, customers…")) + '" aria-label="' + tr("بحث", "Search") + '"><kbd>/</kbd></label>' +
      '<span class="top__spacer"></span>' + langSwitch() +
      bellHTML() +
      '<a class="user-chip" href="#"><span class="vavatar">' + me.av + '</span><span class="user-chip__txt"><b>' + me.user + "</b><small>" + me.urole + "</small></span></a></div></header>";
    const TABS = APP === "seller"
      ? [["index", tr("الرئيسية", "Home"), "grid"], ["orders", tr("الطلبات", "Orders"), "box", 4], ["products", tr("المنتجات", "Products"), "tag"], ["payouts", tr("الأرباح", "Earnings"), "wallet"]]
      : [["index", tr("الرئيسية", "Home"), "grid"], ["orders", tr("الطلبات", "Orders"), "box"], ["vendors", tr("البائعون", "Sellers"), "users", 5], ["support", tr("الدعم", "Support"), "headset", 18]];
    const tabView = VIEW === "product-new" ? "products" : VIEW, inTabs = TABS.some(x => x[0] === tabView);
    const tabbar = '<nav class="tabbar tabbar--dash" aria-label="' + tr("التنقل", "Navigation") + '">' + TABS.map(([k, l, ic, n]) => '<a href="' + k + '.html"' + (k === tabView ? ' aria-current="page"' : "") + ">" + icon(ic) + "<span>" + l + "</span>" + (n ? '<span class="tabbar__n">' + n + "</span>" : "") + "</a>").join("") +
      '<button type="button" data-open="#side"' + (inTabs ? "" : ' aria-current="page"') + ">" + icon("menu") + "<span>" + tr("المزيد", "More") + "</span></button></nav>";
    document.body.insertAdjacentHTML("afterbegin", '<a class="sr-only" href="#view">' + tr("تخطّي إلى المحتوى", "Skip to content") + '</a><div class="dash">' + side + '<div class="dash__main">' + top + '<main class="view" id="view"></main></div></div>' + tabbar);
  }

  // ---------- chart helpers ----------
  function series(n, base, amp, seed) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const v = base + amp * (0.55 * Math.sin((i + seed) / 3.1) + 0.3 * Math.sin((i * 7 + seed) / 5.3) + 0.25 * Math.cos(i / 1.7 + seed)) + i * base * 0.012;
      out.push(Math.max(base * 0.25, Math.round(v)));
    }
    return out;
  }
  function dayLabel(i, n) {
    const d = new Date(2026, 9, 25 - (n - 1 - i));
    return AR ? d.getDate() + "/" + (d.getMonth() + 1) : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  function lineChart(el, data, prev, fmt) {
    const W = Math.max(320, el.clientWidth), H = 260, pl = 52, pr = 12, pt = 12, pb = 28;
    const max = Math.max(...data, ...(prev || [])) * 1.1;
    const x = i => pl + (i / (data.length - 1)) * (W - pl - pr);
    const y = v => pt + (1 - v / max) * (H - pt - pb);
    const ticks = 4;
    let g = "";
    for (let k = 0; k <= ticks; k++) {
      const v = (max / ticks) * k, yy = y(v);
      g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + yy + '" y2="' + yy + '"/>';
      g += '<text x="' + (pl - 8) + '" y="' + (yy + 4) + '" text-anchor="end">' + (v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1) + "k" : Math.round(v)) + "</text>";
    }
    let xl = "";
    data.forEach((_, i) => { if (i % 5 === 0 || i === data.length - 1) xl += '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + dayLabel(i, data.length) + "</text>"; });
    const path = data.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
    const prevPath = prev ? prev.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ") : "";
    const area = path + " L" + x(data.length - 1) + " " + y(0) + " L" + x(0) + " " + y(0) + " Z";
    el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + tr("مخطط المبيعات اليومية لآخر 30 يوم", "Daily sales, last 30 days") + '">' +
      '<g class="grid axis">' + g + '</g><g class="axis">' + xl + "</g>" +
      (prev ? '<path class="ln-prev" d="' + prevPath + '"/>' : "") + '<path class="area" d="' + area + '"/><path class="ln" d="' + path + '"/>' +
      '<line class="xh" y1="' + pt + '" y2="' + (H - pb) + '" visibility="hidden"/><circle class="dot" r="5" visibility="hidden"/>' +
      '<rect x="' + pl + '" y="0" width="' + (W - pl - pr) + '" height="' + H + '" fill="transparent" class="hit"/></svg><div class="chart-tip" hidden></div>';
    const svg = $("svg", el), xh = $(".xh", el), dot = $(".dot", el), tip = $(".chart-tip", el), hit = $(".hit", el);
    function show(evX) {
      const r = svg.getBoundingClientRect(), sx = (evX - r.left) * (W / r.width);
      const i = Math.max(0, Math.min(data.length - 1, Math.round(((sx - pl) / (W - pl - pr)) * (data.length - 1))));
      xh.setAttribute("x1", x(i)); xh.setAttribute("x2", x(i)); xh.setAttribute("visibility", "visible");
      dot.setAttribute("cx", x(i)); dot.setAttribute("cy", y(data[i])); dot.setAttribute("visibility", "visible");
      tip.hidden = false; tip.style.left = (x(i) / W) * r.width + "px"; tip.style.top = (y(data[i]) / H) * r.height + "px";
      tip.innerHTML = dayLabel(i, data.length) + " · <b>" + fmt(data[i]) + "</b>" + (prev ? '<br><span style="opacity:.7">' + tr("الفترة السابقة", "Prev. period") + ": " + fmt(prev[i]) + "</span>" : "");
    }
    hit.addEventListener("pointermove", e => show(e.clientX));
    hit.addEventListener("pointerleave", () => { xh.setAttribute("visibility", "hidden"); dot.setAttribute("visibility", "hidden"); tip.hidden = true; });
  }
  function mountLine(id, data, prev, fmt) {
    const el = document.getElementById(id); if (!el) return;
    const draw = () => lineChart(el, data, prev, fmt);
    draw();
    let t; window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 150); });
  }
  function hbars(rows, fmt) {
    const max = Math.max(...rows.map(r => r[1]));
    return '<div class="hbars">' + rows.map(([l, v]) => '<div class="hbar" title="' + esc(l) + ": " + fmt(v) + '"><div class="hbar__top"><span>' + l + '</span><span class="mono">' + fmt(v) + '</span></div><div class="hbar__track"><div class="hbar__fill" style="width:' + (v / max * 100).toFixed(1) + '%"></div></div></div>').join("") + "</div>";
  }
  const kfmt = v => (AR ? num(v) + " درهم" : "AED " + num(v));

  function kpi(label, ic, val, unit, foot, dark) {
    return '<div class="plate kpi' + (dark ? " plate--dark kpi--dark" : "") + '"><div class="kpi__label"><span>' + label + "</span>" + icon(ic) + '</div><div class="kpi__val">' + val + (unit ? "<small>" + unit + "</small>" : "") + '</div><div class="kpi__foot">' + foot + "</div></div>";
  }
  function head(title, sub, actions) {
    return '<div class="vhead-row"><div><h1>' + title + "</h1>" + (sub ? "<p>" + sub + "</p>" : "") + "</div>" + (actions ? '<div class="actions">' + actions + "</div>" : "") + "</div>";
  }
  const tprod = (p, extra) => '<div class="t-prod"><img src="' + IMG(p.img) + '" alt="" width="44" height="44" loading="lazy"><div><b>' + esc(pn(p)) + "</b><span>" + p.sku + (extra || "") + "</span></div></div>";

  // ---------- seller data ----------
  const MY = D.products.filter(p => p.v === "v2").concat([P("p11"), P("p06"), P("p20")]);
  const cust = [tr("أحمد خ.", "Ahmed K."), tr("شركة الريم للمقاولات", "Al Reem Contracting"), tr("محمد س.", "Mohammed S."), tr("ورشة النجم", "Al Najm Workshop"), tr("خالد ع.", "Khalid A."), tr("مؤسسة البحر الأزرق", "Blue Sea Est."), tr("يوسف م.", "Yousef M."), tr("راشد ح.", "Rashed H.")];
  const emir = [tr("دبي", "Dubai"), tr("الشارقة", "Sharjah"), tr("أبوظبي", "Abu Dhabi"), tr("عجمان", "Ajman")];
  const SORD = [
    ["NAS-261025-0051-2", "25/10 · 09:14", 0, [["p10", 1]], "new", "card"],
    ["NAS-261025-0047-1", "25/10 · 08:02", 1, [["p28", 2], ["p07", 6]], "new", "bank"],
    ["NAS-261024-0042-1", "24/10 · 17:40", 0, [["p10", 1]], "processing", "card"],
    ["NAS-261024-0039-3", "24/10 · 13:22", 3, [["p09", 4], ["p17", 4]], "new", "cod"],
    ["NAS-261024-0031-1", "24/10 · 10:05", 2, [["p08", 12]], "processing", "apple"],
    ["NAS-261023-0027-2", "23/10 · 16:48", 5, [["p18", 1]], "shipped", "card"],
    ["NAS-261023-0019-1", "23/10 · 11:30", 4, [["p07", 3], ["p08", 3]], "new", "card"],
    ["NAS-261022-0012-1", "22/10 · 19:12", 6, [["p28", 1]], "shipped", "bank"],
    ["NAS-261021-0008-2", "21/10 · 09:41", 7, [["p17", 10]], "delivered", "cod"],
    ["NAS-261020-0004-1", "20/10 · 14:03", 1, [["p10", 2]], "returned", "card"]
  ].map(([no, d, c, items, st, pay]) => ({ no, d, c: cust[c], em: emir[c % 4], items, st, pay, total: items.reduce((s, [id, q]) => s + P(id).price * q, 0) * 1.05 }));
  const PAY = { card: tr("بطاقة", "Card"), bank: tr("تحويل بنكي", "Bank transfer"), cod: tr("عند الاستلام", "COD"), apple: "Apple Pay" };

  const views = {};

  // ================= SELLER =================
  views["seller.index"] = () => {
    const sales = series(30, 1550, 650, 2), prev = series(30, 1380, 520, 9);
    const actionable = SORD.filter(o => o.st === "new").slice(0, 4);
    return head(tr("صباح الخير، سامي", "Good morning, Sami"), tr("هذا ملخص متجرك لآخر 30 يوم. آخر تحديث قبل 5 دقائق.", "Here's your store over the last 30 days. Updated 5 minutes ago."),
      '<a class="btn btn--line btn--sm" href="' + ROOT + 'vendor.html?v=v2">' + icon("store", "icon--sm") + tr("عرض متجري", "View store") + '</a><a class="btn btn--line btn--sm" href="products.html#import">' + icon("upload", "icon--sm") + tr("استيراد Excel", "Import Excel") + '</a><a class="btn btn--primary btn--sm" href="product-new.html">' + icon("plus", "icon--sm") + tr("إضافة منتج", "Add product") + "</a>") +
      '<div class="alert alert--warn">' + icon("alert") + "<span>" + tr("لديك <b>4 طلبات جديدة</b> بانتظار التأكيد. الطلبات غير المؤكدة خلال 24 ساعة تُلغى تلقائياً.", "You have <b>4 new orders</b> awaiting confirmation. Orders not confirmed within 24h are cancelled automatically.") + '</span><a class="btn btn--sm btn--line" href="orders.html">' + tr("مراجعة الطلبات", "Review orders") + "</a></div>" +
      '<div class="kpis">' +
      kpi(tr("مبيعات هذا الشهر", "Sales this month"), "chart", num(48320), tr("درهم", "AED"), delta(12.4) + tr(" مقارنة بالشهر الماضي", " vs last month")) +
      kpi(tr("الطلبات", "Orders"), "box", "86", "", delta(8.1) + tr(" · 4 بانتظار التأكيد", " · 4 awaiting confirmation")) +
      kpi(tr("الرصيد المتاح", "Available balance"), "wallet", num(21460), tr("درهم", "AED"), tr("التسوية القادمة 1 نوفمبر", "Next payout 1 Nov"), true) +
      kpi(tr("تقييم المتجر", "Store rating"), "star", "4.6", "/5", tr("205 تقييم · 98.6% طلبات مكتملة", "205 reviews · 98.6% completion")) + "</div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("المبيعات اليومية", "Daily sales") + '</h2><div class="seg" role="group"><button aria-pressed="false">7D</button><button aria-pressed="true">30D</button><button aria-pressed="false">90D</button></div></div>' +
      '<div class="panel__body" style="display:grid;gap:10px"><div class="chart-legend"><span><i></i>' + tr("آخر 30 يوم", "Last 30 days") + '</span><span><i class="prev"></i>' + tr("الفترة السابقة", "Previous period") + '</span></div><div class="chart" id="c-sales"></div></div></section>' +
      '<section class="panel"><div class="panel__head"><h2>' + tr("الأكثر مبيعاً", "Top products") + '</h2><a class="link" href="products.html" style="font-size:13px">' + tr("الكل", "All") + "</a></div>" +
      '<div class="panel__body">' + hbars([[pn(P("p10")), 14160], [pn(P("p28")), 8700], [pn(P("p07")), 6270], [pn(P("p09")), 4930], [pn(P("p08")), 3420]], kfmt) + "</div></section></div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("طلبات تحتاج إجراء", "Orders needing action") + '</h2><a class="link" href="orders.html" style="font-size:13px">' + tr("كل الطلبات", "All orders") + '</a></div><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("رقم الطلب", "Order") + "</th><th>" + tr("المنتج", "Product") + "</th><th>" + tr("العميل", "Customer") + '</th><th class="num">' + tr("الإجمالي", "Total") + "</th><th></th></tr></thead><tbody>" +
      actionable.map(o => '<tr><td class="mono">' + o.no + '<br><span class="muted" style="font-size:11.5px">' + o.d + "</span></td><td>" + esc(pn(P(o.items[0][0]))) + (o.items.length > 1 ? ' <span class="muted">+' + (o.items.length - 1) + "</span>" : "") + "</td><td>" + o.c + '</td><td class="num">' + aed(o.total, true) + '</td><td><button class="btn btn--sm btn--primary" data-confirm>' + tr("تأكيد", "Confirm") + "</button></td></tr>").join("") + "</tbody></table></div></section>" +
      '<div class="stack"><section class="panel"><div class="panel__head"><h2>' + tr("مخزون منخفض", "Low stock") + "</h2>" + badge("warn", "3") + '</div><div class="rows">' +
      [["p18", 3], ["p28", 8], ["p10", 14]].map(([id, s]) => '<div class="row"><img src="' + IMG(P(id).img) + '" alt=""><div class="row__main"><b>' + esc(pn(P(id))) + "</b><span class=\"mono\">" + P(id).sku + '</span></div><span class="mono ' + (s <= 5 ? "stock-low" : "") + '">' + s + '</span><button class="btn btn--sm btn--line">' + tr("تحديث", "Restock") + "</button></div>").join("") + "</div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("طلبات عروض أسعار جديدة", "New quote requests") + '</h2><a class="link" href="quotes.html" style="font-size:13px">' + tr("الرد", "Respond") + '</a></div><div class="rows">' +
      '<div class="row"><span class="vavatar" style="width:38px;height:38px;font-size:11px">AR</span><div class="row__main"><b>' + pn(P("p28")) + "</b><span>" + tr("شركة الريم للمقاولات · 12 بكرة", "Al Reem Contracting · 12 reels") + "</span></div>" + badge("warn", tr("ينتهي خلال يوم", "Due in 1 day")) + "</div>" +
      '<div class="row"><span class="vavatar" style="width:38px;height:38px;font-size:11px">NW</span><div class="row__main"><b>' + pn(P("p10")) + "</b><span>" + tr("ورشة النجم · 6 قطع · إطار B5", "Al Najm Workshop · 6 pcs · B5 frame") + "</span></div>" + badge("info", tr("جديد", "New")) + "</div></div></section></div></div>";
  };
  views["seller.index"].after = () => {
    mountLine("c-sales", series(30, 1550, 650, 2), series(30, 1380, 520, 9), kfmt);
    $("#view").addEventListener("click", e => { const b = e.target.closest("[data-confirm]"); if (b) { b.outerHTML = badge("info", tr("قيد التجهيز", "Processing")); toast(tr("تم تأكيد الطلب وإبلاغ العميل", "Order confirmed — customer notified")); } });
  };

  views["seller.products"] = () => {
    const st = [["live", tr("منشور", "Live"), "ok"], ["review", tr("بانتظار المراجعة", "In review"), "warn"], ["draft", tr("مسودة", "Draft"), ""], ["edit", tr("منشور · تعديل بانتظار المراجعة", "Live · edit in review"), "info"]];
    return head(tr("المنتجات", "Products"), tr("1,120 منتج · 6 بانتظار مراجعة الإدارة · السعر والمخزون يُعدّلان مباشرة من الجدول", "1,120 products · 6 in admin review · edit price & stock right in the table"),
      '<button class="btn btn--line btn--sm" data-open="#m-import">' + icon("upload", "icon--sm") + tr("استيراد Excel / CSV", "Import Excel / CSV") + '</button><button class="btn btn--line btn--sm">' + icon("download", "icon--sm") + tr("تصدير", "Export") + '</button><a class="btn btn--primary btn--sm" href="product-new.html">' + icon("plus", "icon--sm") + tr("إضافة منتج", "Add product") + "</a>") +
      '<section class="panel"><div class="tabs" role="tablist" style="padding-inline:12px"><button class="tab" role="tab" aria-selected="true">' + tr("الكل", "All") + ' <span class="count">1,120</span></button><button class="tab" role="tab" aria-selected="false">' + tr("منشور", "Live") + ' <span class="count">1,084</span></button><button class="tab" role="tab" aria-selected="false">' + tr("بانتظار المراجعة", "In review") + ' <span class="count">6</span></button><button class="tab" role="tab" aria-selected="false">' + tr("مسودة", "Drafts") + ' <span class="count">22</span></button><button class="tab" role="tab" aria-selected="false">' + tr("نفد المخزون", "Out of stock") + ' <span class="count">8</span></button></div>' +
      '<div class="tbl-tools"><div class="group"><input class="input" placeholder="' + tr("ابحث بالاسم أو رقم القطعة", "Search name or part number") + '" aria-label="search"><select class="select" aria-label="category"><option>' + tr("كل الأقسام", "All categories") + "</option>" + D.categories.map(c => "<option>" + cn(c) + "</option>").join("") + '</select><select class="select" aria-label="condition"><option>' + tr("كل الحالات", "Any condition") + "</option><option>" + tr("جديد", "New") + "</option><option>" + tr("مجدد", "Refurbished") + "</option><option>" + tr("مستعمل", "Used") + '</option></select></div><span class="muted" style="font-size:12.5px">' + tr("عرض 1–10 من 1,120", "Showing 1–10 of 1,120") + "</span></div>" +
      '<div class="bulkbar" id="bulk"><span><b class="mono" id="bulk-n">0</b> ' + tr("محدد", "selected") + '</span><button class="btn btn--sm btn--ghost-dark">' + tr("تعديل السعر", "Edit price") + '</button><button class="btn btn--sm btn--ghost-dark">' + tr("تعديل المخزون", "Edit stock") + '</button><button class="btn btn--sm btn--ghost-dark">' + tr("إخفاء", "Unpublish") + "</button></div>" +
      '<div class="table-wrap"><table class="table"><thead><tr><th style="width:36px"><input type="checkbox" aria-label="select all" data-all></th><th>' + tr("المنتج", "Product") + "</th><th>" + tr("القسم", "Category") + "</th><th>" + tr("الحالة", "Condition") + '</th><th class="num">' + tr("السعر", "Price") + '</th><th class="num">' + tr("المخزون", "Stock") + "</th><th>" + tr("الحالة بالمتجر", "Status") + "</th><th>" + tr("ظاهر", "Visible") + "</th><th></th></tr></thead><tbody>" +
      MY.map((p, i) => { const s = st[i === 4 ? 1 : i === 8 ? 2 : i === 1 ? 3 : 0]; return '<tr><td><input type="checkbox" data-row aria-label="select"></td><td>' + tprod(p) + "</td><td>" + cn(C(p.cat)) + "</td><td>" + condB(p.cond) + '</td><td class="num"><input class="input mono inline-num" dir="ltr" value="' + p.price.toFixed(2) + '" aria-label="' + tr("السعر", "Price") + '" data-instant-edit></td><td class="num"><input class="input mono inline-num inline-num--s' + (p.stock <= 5 ? " stock-low" : "") + '" dir="ltr" value="' + p.stock + '" aria-label="' + tr("المخزون", "Stock") + '" data-instant-edit></td><td>' + badge(s[2], s[1]) + '</td><td><label class="switch"><input type="checkbox" ' + (s[0] === "live" ? "checked" : "") + ' aria-label="visible"></label></td><td><div class="acts"><a class="icon-btn" aria-label="edit" href="product-new.html?id=' + p.id + '">' + icon("edit") + '</a><button class="icon-btn" aria-label="more">' + icon("more") + "</button></div></td></tr>"; }).join("") +
      '</tbody></table></div><div class="tbl-foot"><span>' + tr("10 لكل صفحة", "10 per page") + '</span><nav class="pager"><a href="#" aria-current="page">1</a><a href="#">2</a><a href="#">3</a><a href="#">…</a><a href="#">112</a></nav></div></section>' +
      // import modal
      '<div class="modal" id="m-import" aria-hidden="true" role="dialog" aria-labelledby="mi-t"><div class="modal__box"><div class="modal__head"><h2 id="mi-t" style="font-size:16px">' + tr("استيراد المنتجات من Excel / CSV", "Import products from Excel / CSV") + '</h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="modal__body form-grid">' +
      '<ol class="steps"><li class="step is-done">' + tr("تحميل القالب", "Template") + '</li><li class="step is-current">' + tr("رفع الملف", "Upload") + '</li><li class="step">' + tr("مطابقة الأعمدة", "Map columns") + '</li><li class="step">' + tr("المراجعة", "Review") + "</li></ol>" +
      '<a class="file-row" href="#">' + icon("sheet") + '<span class="grow"><b>NAS_products_template.xlsx</b><span class="mono">' + tr("القالب الرسمي · 3 لغات · 24 عمود", "Official template · 3 languages · 24 columns") + "</span></span>" + icon("download") + "</a>" +
      '<label class="upload">' + icon("upload", "icon--lg") + "<span><strong>" + tr("اسحب الملف هنا", "Drop your file here") + "</strong> " + tr("أو اختر من جهازك — XLSX أو CSV حتى 10MB", "or browse — XLSX or CSV up to 10MB") + '</span><input type="file" hidden accept=".xlsx,.csv"></label>' +
      '<div class="file-row">' + icon("sheet") + '<span class="grow"><b>stock_oct_2026.xlsx</b><span class="mono">412 rows · 2.1 MB</span></span>' + badge("ok", tr("جاهز", "Ready")) + "</div>" +
      '<div class="alert alert--info">' + icon("info") + "<span>" + tr("يعمل الاستيراد في الخلفية، وسنرسل لك إشعاراً عند انتهائه مع تقرير بالأخطاء إن وُجدت.", "Imports run in the background. We'll notify you when done, with an error report if any.") + '</span></div></div><div class="modal__foot"><button class="btn btn--line" data-close>' + tr("إلغاء", "Cancel") + '</button><button class="btn btn--primary" data-import>' + tr("متابعة لمطابقة الأعمدة", "Continue to mapping") + "</button></div></div></div>";
  };
  views["seller.products"].after = () => {
    if (location.hash === "#import") open("#m-import");
    const upd = () => { const n = $$("[data-row]:checked").length; $("#bulk").classList.toggle("is-on", n > 0); $("#bulk-n").textContent = n; };
    document.addEventListener("change", e => {
      if (e.target.matches("[data-all]")) { $$("[data-row]").forEach(c => (c.checked = e.target.checked)); upd(); }
      if (e.target.matches("[data-row]")) upd();
      if (e.target.matches("[data-instant-edit]")) { e.target.classList.add("is-saved"); setTimeout(() => e.target.classList.remove("is-saved"), 1200); toast(tr("تم التحديث فوراً — بدون مراجعة", "Updated instantly — no review needed"), "bolt"); }
    });
    document.addEventListener("click", e => {
      if (e.target.closest("[data-save]")) { closeAll(); toast(tr("تم إرسال المنتج للمراجعة", "Product submitted for review")); }
      if (e.target.closest("[data-import]")) { closeAll(); toast(tr("بدأ الاستيراد — 412 منتج", "Import started — 412 products")); }
    });
  };

  views["seller.orders"] = () => {
    const counts = { all: 170, new: 4, processing: 6, shipped: 12, delivered: 146, returned: 2 };
    return head(tr("الطلبات", "Orders"), tr("كل طلب فرعي هنا هو جزء من طلب المشتري الخاص بمتجرك فقط.", "Each sub-order here is the part of a buyer's order that belongs to your store."),
      '<button class="btn btn--line btn--sm">' + icon("download", "icon--sm") + tr("تصدير Excel", "Export Excel") + "</button>") +
      '<section class="panel"><div class="tabs" role="tablist" style="padding-inline:12px">' +
      [["all", tr("الكل", "All")], ["new", ST.new[0]], ["processing", ST.processing[0]], ["shipped", ST.shipped[0]], ["delivered", ST.delivered[0]], ["returned", tr("الإرجاعات", "Returns")]].map(([k, l], i) => '<button class="tab" role="tab" aria-selected="' + (i === 0) + '" data-st="' + k + '">' + l + ' <span class="count">' + counts[k] + "</span></button>").join("") + "</div>" +
      '<div class="tbl-tools"><div class="group"><input class="input" placeholder="' + tr("رقم الطلب أو اسم العميل", "Order no. or customer") + '" aria-label="search"><select class="select" aria-label="payment"><option>' + tr("كل طرق الدفع", "All payments") + "</option>" + Object.values(PAY).map(x => "<option>" + x + "</option>").join("") + '</select><select class="select" aria-label="date"><option>' + tr("آخر 30 يوم", "Last 30 days") + "</option><option>" + tr("هذا الأسبوع", "This week") + "</option></select></div></div>" +
      '<div class="table-wrap"><table class="table"><thead><tr><th>' + tr("الطلب الفرعي", "Sub-order") + "</th><th>" + tr("العميل", "Customer") + "</th><th>" + tr("المنتجات", "Items") + "</th><th>" + tr("الدفع", "Payment") + '</th><th class="num">' + tr("الإجمالي", "Total") + "</th><th>" + tr("الحالة", "Status") + '</th><th></th></tr></thead><tbody id="o-body"></tbody></table></div>' +
      '<div class="tbl-foot"><span>' + tr("الطلبات الجديدة لازم تتأكد خلال 24 ساعة", "New orders must be confirmed within 24h") + '</span><nav class="pager"><a href="#" aria-current="page">1</a><a href="#">2</a><a href="#">…</a><a href="#">17</a></nav></div></section>' +
      '<aside class="drawer drawer--wide" id="d-order" aria-hidden="true" role="dialog" aria-labelledby="do-t"><div class="drawer__head"><h2 id="do-t" style="font-size:16px" class="mono"></h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="drawer__body" id="do-body"></div><div class="drawer__foot" id="do-foot" style="display:flex;flex-wrap:wrap;gap:8px"></div></aside>';
  };
  views["seller.orders"].after = () => {
    function rows(st) {
      $("#o-body").innerHTML = SORD.filter(o => st === "all" || o.st === st).map((o, i) => '<tr data-o="' + SORD.indexOf(o) + '" style="cursor:pointer"><td><span class="mono">' + o.no + '</span><br><span class="muted mono" style="font-size:11.5px">' + o.d + "</span></td><td>" + o.c + '<br><span class="muted" style="font-size:12px">' + o.em + '</span></td><td><div style="display:flex;gap:4px">' + o.items.map(([id, q]) => '<img src="' + IMG(P(id).img) + '" alt="" title="' + esc(pn(P(id))) + " × " + q + '" width="36" height="36" style="width:36px;height:36px;border-radius:3px;object-fit:cover">').join("") + '</div></td><td>' + PAY[o.pay] + '</td><td class="num">' + aed(o.total, true) + "</td><td>" + stB(o.st) + '</td><td><div class="acts">' + (o.st === "new" ? '<button class="btn btn--sm btn--primary" data-confirm>' + tr("تأكيد", "Confirm") + "</button>" : o.st === "processing" ? '<button class="btn btn--sm btn--line" data-awb>' + tr("إنشاء بوليصة", "Create AWB") + "</button>" : '<button class="icon-btn" aria-label="view">' + icon("eye") + "</button>") + "</div></td></tr>").join("") ||
        '<tr><td colspan="7"><div class="empty">' + icon("box") + "<p>" + tr("لا توجد طلبات بهذه الحالة", "No orders with this status") + "</p></div></td></tr>";
    }
    rows("all");
    $('[role="tablist"]').addEventListener("tabchange", e => rows(e.detail.dataset.st));
    $("#o-body").addEventListener("click", e => {
      if (e.target.closest("[data-confirm]")) { e.stopPropagation(); e.target.closest("td").innerHTML = badge("info", ST.processing[0]); toast(tr("تم تأكيد الطلب", "Order confirmed")); return; }
      if (e.target.closest("[data-awb]")) { e.stopPropagation(); toast(tr("تم إنشاء البوليصة ARX 7731 0051 02", "AWB ARX 7731 0051 02 created"), "truck"); return; }
      const tr_ = e.target.closest("[data-o]"); if (!tr_) return;
      const o = SORD[+tr_.dataset.o];
      $("#do-t").textContent = o.no;
      const sub = o.items.reduce((s, [id, q]) => s + P(id).price * q, 0), com = sub * 0.08;
      $("#do-body").innerHTML = '<div style="display:grid;gap:18px"><div style="display:flex;gap:8px;flex-wrap:wrap">' + stB(o.st) + badge("", PAY[o.pay]) + "</div>" +
        '<div class="rows panel">' + o.items.map(([id, q]) => '<div class="row"><img src="' + IMG(P(id).img) + '" alt=""><div class="row__main"><b>' + esc(pn(P(id))) + '</b><span class="mono">' + P(id).sku + " × " + q + "</span></div>" + aed(P(id).price * q, true) + "</div>").join("") + "</div>" +
        '<dl class="dl"><div><dt>' + tr("العميل", "Customer") + "</dt><dd>" + o.c + "</dd></div><div><dt>" + tr("عنوان الشحن", "Ship to") + "</dt><dd>" + o.em + tr("، المنطقة الصناعية، مستودع 4", ", Industrial Area, Warehouse 4") + "</dd></div><div><dt>" + tr("المجموع", "Subtotal") + "</dt><dd>" + aed(sub, true) + "</dd></div><div><dt>" + tr("عمولة المنصة (8%)", "Platform fee (8%)") + "</dt><dd>-" + aed(com, true) + "</dd></div><div><dt>" + tr("صافي مستحقاتك", "Your net") + "</dt><dd><b>" + aed(sub - com, true) + "</b></dd></div></dl>" +
        "<div><h3 style=\"font-size:14px;margin-bottom:10px\">" + tr("سجل الطلب", "Timeline") + '</h3><ol class="tl"><li><span>' + tr("تم استلام الطلب والدفع", "Order placed & paid") + "</span><time>" + o.d + '</time></li><li class="' + (o.st === "new" ? "is-todo" : "") + '"><span>' + tr("تأكيد البائع", "Seller confirmation") + '</span><time>—</time></li><li class="is-todo"><span>' + tr("تسليم لشركة الشحن", "Handed to carrier") + '</span><time>—</time></li><li class="is-todo"><span>' + tr("تم التسليم", "Delivered") + "</span><time>—</time></li></ol></div>" +
        '<div class="field"><label for="note">' + tr("ملاحظة داخلية", "Internal note") + '</label><textarea class="textarea" id="note" style="min-height:70px"></textarea></div></div>';
      $("#do-foot").innerHTML = '<button class="btn btn--primary" data-close>' + tr("تأكيد الطلب", "Confirm order") + '</button><button class="btn btn--line">' + icon("truck", "icon--sm") + tr("إنشاء بوليصة الشحن", "Create shipping label") + '</button><button class="btn btn--line">' + icon("download", "icon--sm") + tr("الفاتورة", "Invoice") + '</button><button class="btn btn--danger" style="margin-inline-start:auto">' + tr("إلغاء", "Cancel") + "</button>";
      open("#d-order");
    });
  };

  views["seller.quotes"] = () => {
    const list = [
      ["RFQ-2610-028", "p28", 12, tr("شركة الريم للمقاولات", "Al Reem Contracting"), tr("يحتاج خلال 7 أيام", "Needed within 7 days"), ["warn", tr("ينتهي خلال يوم", "Due in 1 day")]],
      ["RFQ-2610-033", "p10", 6, tr("ورشة النجم", "Al Najm Workshop"), tr("إطار B5 · 400V", "B5 frame · 400V"), ["info", tr("جديد", "New")]],
      ["RFQ-2610-021", "p07", 50, tr("مؤسسة البحر الأزرق", "Blue Sea Est."), tr("توريد شهري", "Monthly supply"), ["ok", tr("تم الرد", "Answered")]],
      ["RFQ-2610-014", "p09", 20, tr("محمد س.", "Mohammed S."), "—", ["", tr("مقبول → طلب", "Accepted → order")]]
    ];
    return head(tr("طلبات عروض الأسعار", "Quote requests"), tr("ردّ بالسعر ومدة التوريد وصلاحية العرض. العرض المقبول يتحول تلقائياً لطلب.", "Reply with price, lead time and validity. Accepted quotes turn into orders automatically.")) +
      '<div class="split"><section class="panel"><div class="tabs" role="tablist" style="padding-inline:12px"><button class="tab" role="tab" aria-selected="true">' + tr("بانتظار الرد", "Awaiting reply") + ' <span class="count">2</span></button><button class="tab" role="tab" aria-selected="false">' + tr("تم الرد", "Answered") + '</button><button class="tab" role="tab" aria-selected="false">' + tr("مقبولة", "Accepted") + '</button><button class="tab" role="tab" aria-selected="false">' + tr("منتهية", "Expired") + "</button></div>" +
      list.map(([no, id, q, c, note, s], i) => '<button class="rfq-item" aria-current="' + (i === 0) + '"><span class="rfq-item__top"><span class="mono" style="font-size:12px">' + no + "</span>" + badge(s[0], s[1]) + "</span><b>" + esc(pn(P(id))) + '</b><span class="muted">' + c + " · <span class=\"mono\">" + q + "</span> " + tr("قطعة", "pcs") + " · " + note + "</span></button>").join("") + "</section>" +
      '<form class="panel" id="q-form"><div class="panel__head"><h2>' + tr("الرد على", "Reply to") + ' <span class="mono">RFQ-2610-028</span></h2></div><div class="panel__body form-grid">' +
      '<div class="plate" style="padding:12px 16px;display:grid;gap:4px;font-size:13px"><span class="plate__key">' + tr("الطلب", "REQUEST") + "</span><b>" + pn(P("p28")) + '</b><span class="muted">' + tr("الكمية 12 بكرة · التسليم إلى جبل علي · خلال 7 أيام", "Qty 12 reels · Deliver to Jebel Ali · within 7 days") + '</span><span class="doc-chip" style="justify-self:start">' + icon("attach") + "specs_cable.pdf</span></div>" +
      '<div class="form-grid form-grid--2"><div class="field"><label>' + tr("سعر الوحدة (درهم)", "Unit price (AED)") + '</label><input class="input mono" dir="ltr" value="1,310.00"></div><div class="field"><label>' + tr("مدة التوريد", "Lead time") + '</label><select class="select"><option>' + tr("3 أيام عمل", "3 business days") + "</option><option>" + tr("7 أيام عمل", "7 business days") + "</option><option>" + tr("14 يوم", "14 days") + '</option></select></div><div class="field"><label>' + tr("صالح حتى", "Valid until") + '</label><input class="input mono" type="date" value="2026-11-05"></div><div class="field"><label>' + tr("الشحن", "Shipping") + '</label><select class="select"><option>' + tr("مجاني", "Free") + "</option><option>" + tr("على المشتري", "Paid by buyer") + "</option></select></div></div>" +
      '<div class="field"><span class="label">' + tr("خصومات الكمية (اختياري)", "Volume discounts (optional)") + '</span><div class="tiers"><div class="tier"><input class="input mono" value="12+" aria-label="qty"><input class="input mono" value="1,310.00" aria-label="price"><button type="button" class="icon-btn" aria-label="remove">' + icon("x") + '</button></div><div class="tier"><input class="input mono" value="24+" aria-label="qty"><input class="input mono" value="1,265.00" aria-label="price"><button type="button" class="icon-btn" aria-label="remove">' + icon("x") + '</button></div></div><button type="button" class="link" style="justify-self:start;font-size:13px">+ ' + tr("إضافة شريحة", "Add tier") + "</button></div>" +
      '<div class="field"><label>' + tr("ملاحظات للمشتري", "Notes to buyer") + '</label><textarea class="textarea">' + tr("يتوفر 8 بكرات فوراً والباقي خلال 10 أيام.", "8 reels available now, the rest within 10 days.") + "</textarea></div>" +
      '<div class="sumrow sumrow--total"><span>' + tr("إجمالي العرض", "Quote total") + '</span><span class="mono">' + (AR ? "15,720.00 درهم" : "AED 15,720.00") + "</span></div>" +
      '<div style="display:flex;gap:8px;justify-content:flex-end"><button type="button" class="btn btn--line">' + icon("download", "icon--sm") + tr("معاينة PDF", "Preview PDF") + '</button><button class="btn btn--primary">' + tr("إرسال العرض", "Send quote") + "</button></div></div></form></div>";
  };
  views["seller.quotes"].after = () => {
    $("#q-form").addEventListener("submit", e => { e.preventDefault(); toast(tr("تم إرسال العرض للمشتري", "Quote sent to buyer")); });
    $(".split").addEventListener("click", e => { const b = e.target.closest(".rfq-item"); if (b) $$(".rfq-item").forEach(x => x.setAttribute("aria-current", x === b)); });
  };

  views["seller.payouts"] = () => {
    const stmt = SORD.filter(o => o.st !== "new").map(o => { const g = o.total / 1.05, c = g * 0.08; return [o.no, o.d.split(" ")[0], g, c, c * 0.05, o.st === "returned" ? 0 : g - c - c * 0.05, o.st]; });
    return head(tr("الأرباح والكشوف", "Earnings & statements"), tr("المبالغ تُحفظ 7 أيام بعد التسليم ثم تصبح متاحة للتسوية.", "Funds are held 7 days after delivery, then become available for payout."),
      '<button class="btn btn--line btn--sm">' + icon("download", "icon--sm") + tr("كشف الحساب PDF", "Statement PDF") + '</button><button class="btn btn--line btn--sm">' + icon("sheet", "icon--sm") + tr("تصدير Excel", "Export Excel") + "</button>") +
      '<div class="kpis">' + kpi(tr("الرصيد المتاح للتسوية", "Available for payout"), "wallet", num(21460), tr("درهم", "AED"), tr("التسوية القادمة 1 نوفمبر 2026", "Next payout 1 Nov 2026"), true) +
      kpi(tr("قيد الانتظار", "Pending (on hold)"), "clock", num(9875), tr("درهم", "AED"), tr("12 طلب ضمن فترة الاعتراض", "12 orders in dispute window")) +
      kpi(tr("المدفوع هذا العام", "Paid out this year"), "check", num(318900), tr("درهم", "AED"), tr("24 تسوية", "24 payouts")) +
      kpi(tr("عمولة المنصة هذا الشهر", "Platform fees this month"), "percent", num(3866), tr("درهم", "AED"), tr("8% كهرباء · 10% أدوات", "8% Electrical · 10% Tools")) + "</div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("كشف الحساب — أكتوبر 2026", "Statement — October 2026") + '</h2><select class="select" style="width:auto;min-height:34px;padding-block:4px;font-size:13px" aria-label="period"><option>' + tr("أكتوبر 2026", "October 2026") + "</option><option>" + tr("سبتمبر 2026", "September 2026") + "</option></select></div>" +
      '<div class="table-wrap"><table class="table"><thead><tr><th>' + tr("الطلب", "Order") + "</th><th>" + tr("التاريخ", "Date") + '</th><th class="num">' + tr("الإجمالي", "Gross") + '</th><th class="num">' + tr("العمولة", "Fee") + '</th><th class="num">' + tr("ضريبة العمولة", "VAT on fee") + '</th><th class="num">' + tr("الصافي", "Net") + "</th></tr></thead><tbody>" +
      stmt.map(r => '<tr><td class="mono">' + r[0] + '</td><td class="mono">' + r[1] + '</td><td class="num mono">' + num(r[2], true) + '</td><td class="num mono">-' + num(r[3], true) + '</td><td class="num mono">-' + num(r[4], true) + '</td><td class="num">' + (r[6] === "returned" ? badge("danger", tr("مسترد", "Refunded")) : "<b class=\"mono\">" + num(r[5], true) + "</b>") + "</td></tr>").join("") +
      "</tbody></table></div></section>" +
      '<div class="stack"><section class="plate" style="padding:18px 20px;display:grid;gap:8px"><span class="plate__key">' + tr("حساب التسوية", "PAYOUT ACCOUNT") + '</span><b>' + tr("مصدر الطاقة للكهربائيات ذ.م.م", "PowerSource Electric LLC") + '</b><span class="mono" dir="ltr" style="text-align:start">AE07 0331 •••• •••• •••• 812</span><span class="muted" style="font-size:12.5px">' + tr("[اسم البنك] · تسوية كل أسبوعين", "[Bank name] · bi-weekly payouts") + '</span><a class="link" href="#" style="font-size:13px">' + tr("تعديل الحساب البنكي", "Change bank account") + "</a></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("التسويات السابقة", "Past payouts") + '</h2></div><div class="rows">' +
      [["PO-2610-01", "15/10/2026", 18240], ["PO-2609-02", "01/10/2026", 22915], ["PO-2609-01", "15/09/2026", 16380], ["PO-2608-02", "01/09/2026", 20110]].map(([id, d, v]) => '<div class="row"><span class="icon-btn" style="background:var(--ok-bg);color:var(--ok)">' + icon("check") + '</span><div class="row__main"><b class="mono">' + id + '</b><span class="mono">' + d + "</span></div>" + aed(v, true) + '<button class="icon-btn" aria-label="download">' + icon("download") + "</button></div>").join("") + "</div></section></div></div>";
  };

  // ================= ADMIN =================
  const APPS = [
    { n: tr("الوطنية للمعدات الثقيلة", "National Heavy Equipment"), en: "NH", city: tr("أبوظبي", "Abu Dhabi"), lic: "CN-2219834", exp: "2027-06-30", cats: [tr("ميكانيك", "Mechanical"), tr("مضخات", "Pumps")], ok: [1, 1, 1, 1], d: "25/10" },
    { n: tr("سما للتكييف المركزي", "Sama Central AC"), en: "SA", city: tr("دبي", "Dubai"), lic: "1104729", exp: "2026-11-12", cats: [tr("تكييف وتبريد", "HVAC")], ok: [1, 1, 0, 1], d: "24/10", warn: tr("الرخصة تنتهي خلال 18 يوم", "Licence expires in 18 days") },
    { n: tr("مرسى لقطع السفن", "Marsa Ship Parts"), en: "MS", city: tr("الشارقة", "Sharjah"), lic: "SHJ-640117", exp: "2027-02-01", cats: [tr("بحري", "Marine")], ok: [1, 0, 1, 1], d: "24/10", warn: tr("شهادة TRN غير واضحة", "TRN certificate unreadable") }
  ];
  views["admin.index"] = () => {
    return head(tr("نظرة عامة على المنصة", "Platform overview"), tr("أكتوبر 2026 · كل المبالغ بالدرهم الإماراتي شاملة الضريبة", "October 2026 · all amounts in AED incl. VAT"),
      '<div class="seg" role="group"><button aria-pressed="false">' + tr("اليوم", "Today") + '</button><button aria-pressed="false">7D</button><button aria-pressed="true">30D</button><button aria-pressed="false">' + tr("السنة", "YTD") + "</button></div>") +
      '<div class="kpis">' + kpi(tr("إجمالي المبيعات GMV", "Gross merchandise value"), "chart", "1.28M", tr("درهم", "AED"), delta(18.2) + tr(" مقارنة بسبتمبر", " vs September")) +
      kpi(tr("إيراد العمولات", "Commission revenue"), "percent", num(118400), tr("درهم", "AED"), tr("متوسط العمولة 9.2%", "Avg. take rate 9.2%"), true) +
      kpi(tr("الطلبات", "Orders"), "box", num(3412), "", delta(11.6) + tr(" · 5,104 طلب فرعي", " · 5,104 sub-orders")) +
      kpi(tr("البائعون النشطون", "Active sellers"), "users", "214", "", '<a class="link" href="vendors.html">' + tr("5 بانتظار الموافقة", "5 awaiting approval") + "</a>") + "</div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("المبيعات اليومية GMV", "Daily GMV") + '</h2><div class="chart-legend"><span><i></i>' + tr("أكتوبر", "October") + '</span><span><i class="prev"></i>' + tr("سبتمبر", "September") + '</span></div></div><div class="panel__body"><div class="chart" id="c-gmv"></div></div></section>' +
      '<section class="panel"><div class="panel__head"><h2>' + tr("المبيعات حسب القسم", "GMV by category") + '</h2></div><div class="panel__body">' +
      hbars([[cn(C("electrical")), 312400], [cn(C("pumps")), 241800], [cn(C("hvac")), 198300], [cn(C("marine")), 176900], [cn(C("tools")), 142500], [cn(C("mech")), 118200], [cn(C("automation")), 61700], [cn(C("safety")), 28400]], kfmt) + "</div></section></div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("طلبات انضمام بانتظار المراجعة", "Seller applications pending") + '</h2><a class="link" href="vendors.html" style="font-size:13px">' + tr("مراجعة الكل", "Review all") + '</a></div><div class="rows">' +
      APPS.map(a => '<div class="row"><span class="vavatar" style="width:40px;height:40px;font-size:12px">' + a.en + '</span><div class="row__main"><b>' + a.n + "</b><span>" + a.city + " · " + a.cats.join("، ") + " · <span class=\"mono\">" + a.d + "</span></span></div>" + (a.warn ? badge("warn", a.warn) : badge("ok", tr("المستندات مكتملة", "Docs complete"))) + '<a class="btn btn--sm btn--line" href="vendors.html">' + tr("مراجعة", "Review") + "</a></div>").join("") + "</div></section>" +
      '<div class="stack"><section class="panel"><div class="panel__head"><h2>' + tr("تحتاج انتباهك", "Needs attention") + '</h2></div><div class="rows">' +
      '<div class="row">' + badge("danger", "2") + '<div class="row__main"><b>' + tr("نزاعات مفتوحة", "Open disputes") + "</b><span>" + tr("أقدم نزاع منذ 3 أيام", "Oldest opened 3 days ago") + '</span></div><a class="link" href="orders.html" style="font-size:13px">' + tr("فتح", "Open") + "</a></div>" +
      '<div class="row">' + badge("warn", "5") + '<div class="row__main"><b>' + tr("طلبات إرجاع بانتظار البائع", "Returns awaiting seller") + "</b><span>" + tr("تجاوز 2 منها مهلة 48 ساعة", "2 past the 48h SLA") + '</span></div><a class="link" href="orders.html" style="font-size:13px">' + tr("فتح", "Open") + "</a></div>" +
      '<div class="row">' + badge("info", "38") + '<div class="row__main"><b>' + tr("تسويات مستحقة 1 نوفمبر", "Payouts due 1 Nov") + "</b><span>" + (AR ? "412,880 درهم" : "AED 412,880") + '</span></div><a class="link" href="commissions.html" style="font-size:13px">' + tr("مراجعة", "Review") + "</a></div>" +
      '<div class="row">' + badge("warn", "18") + '<div class="row__main"><b>' + tr("تذاكر دعم مفتوحة", "Open support tickets") + "</b><span>" + tr("2 تجاوزت مهلة الرد", "2 past SLA") + '</span></div><a class="link" href="support.html" style="font-size:13px">' + tr("فتح", "Open") + "</a></div>" +
      '<div class="row">' + badge("", "6") + '<div class="row__main"><b>' + tr("منتجات بانتظار المراجعة", "Products in review") + "</b><span>" + tr("من 3 بائعين", "From 3 sellers") + '</span></div><a class="link" href="products.html" style="font-size:13px">' + tr("مراجعة", "Review") + "</a></div></div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("سجل العمليات", "Audit log") + '</h2></div><ol class="tl" style="padding:16px 20px 4px">' +
      [[tr("عمر خ. وافق على بائع «بارد لأنظمة التبريد»", "Omar K. approved seller “Barid Cooling Systems”"), "10:12"], [tr("لينا م. (محاسبة) صدّرت كشف التسويات", "Lina M. (Finance) exported payout report"), "09:40"], [tr("تعديل عمولة قسم الأدوات من 9% إلى 10%", "Tools commission changed 9% → 10%"), tr("أمس", "Yesterday")]].map(([t, d]) => "<li><span>" + t + "</span><time>" + d + "</time></li>").join("") + "</ol></section></div></div>";
  };
  views["admin.index"].after = () => mountLine("c-gmv", series(30, 42000, 14000, 4), series(30, 36000, 12000, 11), kfmt);

  views["admin.vendors"] = () => {
    return head(tr("البائعون", "Sellers"), tr("مراجعة طلبات الانضمام، إدارة العمولات، وتعليق البائعين.", "Review applications, manage commission and suspend sellers."), '<button class="btn btn--primary btn--sm">' + icon("plus", "icon--sm") + tr("دعوة بائع", "Invite seller") + "</button>") +
      '<div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true" aria-controls="tv-apps">' + tr("طلبات الانضمام", "Applications") + ' <span class="count">5</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="tv-list">' + tr("البائعون النشطون", "Active sellers") + ' <span class="count">214</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="tv-list">' + tr("موقوفون", "Suspended") + ' <span class="count">3</span></button></div>' +
      '<div id="tv-apps" class="apps">' + APPS.map((a, i) => '<article class="panel app-card" data-app="' + i + '"><div class="app-card__who"><span class="vavatar" style="width:52px;height:52px;font-size:15px">' + a.en + "</span><div><h3>" + a.n + "</h3><p>" + a.city + " · " + a.cats.join("، ") + " · " + tr("تقدّم في ", "Applied ") + '<span class="mono">' + a.d + '</span></p><div class="docs">' +
        [tr("الرخصة التجارية", "Trade licence"), tr("شهادة TRN", "TRN certificate"), tr("هوية المالك", "Owner ID"), "IBAN"].map(d => '<button class="doc-chip" data-open="#m-doc">' + icon("doc") + d + "</button>").join("") + "</div></div></div>" +
        '<div class="checks">' + [[tr("الرخصة سارية", "Licence valid") + ' <span class="mono">' + a.exp + "</span>", a.ok[0]], [tr("رقم TRN صحيح", "TRN verified"), a.ok[1]], [tr("الاسم مطابق للحساب البنكي", "Name matches bank account"), a.ok[2]], [tr("هوية المالك مرفقة", "Owner ID attached"), a.ok[3]]].map(([t, ok]) => '<span class="' + (ok ? "ok" : "warn") + '">' + icon(ok ? "check" : "alert") + "<span>" + t + "</span></span>").join("") + (a.warn ? '<span class="warn">' + icon("info") + a.warn + "</span>" : "") + "</div>" +
        '<div class="app-card__acts"><button class="btn btn--primary btn--sm" data-approve>' + icon("check", "icon--sm") + tr("موافقة", "Approve") + '</button><button class="btn btn--line btn--sm">' + tr("طلب مستندات", "Request docs") + '</button><button class="btn btn--danger btn--sm" data-reject>' + tr("رفض", "Reject") + "</button></div></article>").join("") + "</div>" +
      '<section class="panel" id="tv-list" hidden><div class="tbl-tools"><div class="group"><input class="input" placeholder="' + tr("ابحث عن بائع", "Search sellers") + '" aria-label="search"><select class="select" aria-label="category"><option>' + tr("كل الأقسام", "All categories") + '</option></select></div></div><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("البائع", "Seller") + "</th><th>" + tr("المدينة", "City") + '</th><th class="num">' + tr("المنتجات", "Products") + '</th><th class="num">' + tr("مبيعات الشهر", "GMV (month)") + "</th><th>" + tr("العمولة", "Commission") + "</th><th>" + tr("التقييم", "Rating") + "</th><th>" + tr("الحالة", "Status") + "</th><th></th></tr></thead><tbody>" +
      D.vendors.map((v, i) => '<tr><td><div class="t-prod"><span class="vavatar" style="width:38px;height:38px;font-size:12px">' + v.en.split(" ").map(w => w[0]).join("").slice(0, 2) + "</span><div><b>" + vn(v) + '</b><span>CN-' + (1000000 + v.reviews * 917) + "</span></div></div></td><td>" + (AR ? v.city.ar : v.city.en) + '</td><td class="num mono">' + num(v.products) + '</td><td class="num">' + aed([96400, 48320, 61200, 38800, 22100][i]) + '</td><td><span class="pct"><input value="' + [9, 8, 10, 10, 12][i] + '" aria-label="commission"><span>%</span></span></td><td><span class="stars">' + icon("star") + "<b>" + v.rating + "</b></span></td><td>" + badge("ok", tr("نشط", "Active")) + '</td><td><div class="acts"><button class="icon-btn" aria-label="view">' + icon("eye") + '</button><button class="icon-btn" aria-label="suspend" title="' + tr("تعليق", "Suspend") + '">' + icon("ban") + "</button></div></td></tr>").join("") + "</tbody></table></div></section>" +
      '<div class="modal" id="m-doc" aria-hidden="true" role="dialog" aria-labelledby="md-t"><div class="modal__box" style="width:min(720px,100%)"><div class="modal__head"><h2 id="md-t" style="font-size:16px">' + tr("معاينة المستند", "Document preview") + '</h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="modal__body" style="display:grid;gap:14px"><div class="docprev">' + tr("[معاينة ملف PDF أو صورة المستند المرفوع]", "[Uploaded PDF / image preview]") + '</div><dl class="dl"><div><dt>' + tr("رقم الرخصة", "Licence no.") + '</dt><dd class="mono">CN-2219834</dd></div><div><dt>' + tr("تاريخ الانتهاء", "Expiry") + '</dt><dd class="mono">2027-06-30</dd></div><div><dt>' + tr("النشاط", "Activity") + "</dt><dd>" + tr("تجارة قطع غيار المعدات الثقيلة", "Heavy equipment spare parts trading") + '</dd></div></dl></div><div class="modal__foot"><button class="btn btn--line" data-close>' + tr("إغلاق", "Close") + '</button><button class="btn btn--primary" data-close>' + tr("تأكيد صحة المستند", "Mark as verified") + "</button></div></div></div>";
  };
  views["admin.vendors"].after = () => {
    $("#view").addEventListener("click", e => {
      const a = e.target.closest("[data-approve]"), r = e.target.closest("[data-reject]");
      if (a || r) { const c = e.target.closest(".app-card"); c.style.transition = "opacity .3s"; c.style.opacity = ".35"; c.querySelector(".app-card__acts").innerHTML = a ? badge("ok", tr("تمت الموافقة · المتجر مفعّل", "Approved · store active")) : badge("danger", tr("مرفوض · تم إبلاغ البائع", "Rejected · seller notified")); toast(a ? tr("تمت الموافقة وإرسال بيانات الدخول للبائع", "Approved — login details sent to seller") : tr("تم رفض الطلب", "Application rejected")); }
    });
    $("#view").addEventListener("change", e => { if (e.target.closest(".pct")) toast(tr("تم تحديث نسبة العمولة", "Commission updated")); });
  };

  views["admin.orders"] = () => {
    const ORD = [
      ["NAS-261025-0051", "25/10 09:14", tr("أحمد خالد", "Ahmed Khaled"), 3, 1838.25, "card", "processing", ""],
      ["NAS-261025-0047", "25/10 08:02", tr("شركة الريم للمقاولات", "Al Reem Contracting"), 2, 10521.60, "bank", "new", ""],
      ["NAS-261024-0042", "24/10 17:40", tr("أحمد خالد", "Ahmed Khaled"), 3, 1838.25, "card", "shipped", ""],
      ["NAS-261024-0039", "24/10 13:22", tr("ورشة النجم", "Al Najm Workshop"), 1, 840.00, "cod", "new", ""],
      ["NAS-261023-0027", "23/10 16:48", tr("مؤسسة البحر الأزرق", "Blue Sea Est."), 2, 7350.00, "card", "shipped", "dispute"],
      ["NAS-261022-0012", "22/10 19:12", tr("يوسف م.", "Yousef M."), 1, 1522.50, "bank", "delivered", ""],
      ["NAS-261021-0008", "21/10 09:41", tr("راشد ح.", "Rashed H."), 4, 3104.85, "cod", "delivered", ""],
      ["NAS-261020-0004", "20/10 14:03", tr("محمد س.", "Mohammed S."), 1, 2478.00, "card", "returned", "dispute"]
    ];
    return head(tr("كل الطلبات", "All orders"), tr("الطلب الرئيسي للمشتري مع الطلبات الفرعية لكل بائع.", "Buyer orders with their per-seller sub-orders."), '<button class="btn btn--line btn--sm">' + icon("download", "icon--sm") + tr("تصدير Excel", "Export Excel") + "</button>") +
      '<section class="panel"><div class="tbl-tools"><div class="group"><input class="input" placeholder="' + tr("رقم الطلب، العميل، أو البائع", "Order no., customer or seller") + '" aria-label="search"><select class="select" aria-label="status"><option>' + tr("كل الحالات", "All statuses") + "</option>" + Object.values(ST).map(s => "<option>" + s[0] + "</option>").join("") + '</select><select class="select" aria-label="payment"><option>' + tr("كل طرق الدفع", "All payments") + "</option>" + Object.values(PAY).map(x => "<option>" + x + "</option>").join("") + '</select><select class="select" aria-label="emirate"><option>' + tr("كل الإمارات", "All emirates") + "</option>" + emir.map(x => "<option>" + x + "</option>").join("") + '</select><label class="check" style="font-size:13px"><input type="checkbox"> ' + tr("نزاعات فقط", "Disputes only") + "</label></div></div>" +
      '<div class="table-wrap"><table class="table"><thead><tr><th style="width:32px"></th><th>' + tr("الطلب", "Order") + "</th><th>" + tr("العميل", "Customer") + '</th><th class="num">' + tr("البائعون", "Sellers") + "</th><th>" + tr("الدفع", "Payment") + '</th><th class="num">' + tr("الإجمالي", "Total") + "</th><th>" + tr("الحالة", "Status") + "</th><th></th></tr></thead><tbody>" +
      ORD.map((o, i) => '<tr data-x="' + i + '" style="cursor:pointer"><td><button class="icon-btn" aria-label="expand" aria-expanded="false">' + icon("chevd") + '</button></td><td><span class="mono">' + o[0] + '</span><br><span class="muted mono" style="font-size:11.5px">' + o[1] + "</span></td><td>" + o[2] + '</td><td class="num mono">' + o[3] + "</td><td>" + PAY[o[5]] + '</td><td class="num">' + aed(o[4], true) + "</td><td>" + stB(o[6]) + (o[7] ? " " + badge("danger", icon("alert", "icon--sm") + tr("نزاع", "Dispute")) : "") + '</td><td><button class="icon-btn" aria-label="more">' + icon("more") + "</button></td></tr>" +
        '<tr data-sub="' + i + '" hidden><td></td><td colspan="7" style="background:#F8FAFA"><div style="display:grid;gap:8px">' + Array.from({ length: o[3] }, (_, k) => { const v = D.vendors[(i + k) % 5]; return '<div class="plate" style="padding:10px 16px;display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center;font-size:13px"><span class="mono">' + o[0] + "-" + (k + 1) + "</span><b>" + vn(v) + "</b>" + stB(k === 0 ? o[6] : "processing") + '<span class="awb">' + (k === 0 && o[6] !== "new" ? "AWB ARX 7731 " + (40 + i) + "0" + k : "") + '</span><span style="margin-inline-start:auto" class="mono">' + num(o[4] / o[3], true) + "</span></div>"; }).join("") + "</div></td></tr>").join("") +
      '</tbody></table></div><div class="tbl-foot"><span>' + tr("عرض 1–8 من 3,412", "Showing 1–8 of 3,412") + '</span><nav class="pager"><a href="#" aria-current="page">1</a><a href="#">2</a><a href="#">…</a><a href="#">427</a></nav></div></section>';
  };
  views["admin.orders"].after = () => {
    $("#view").addEventListener("click", e => {
      const r = e.target.closest("[data-x]"); if (!r) return;
      const s = $('[data-sub="' + r.dataset.x + '"]'); s.hidden = !s.hidden;
      const b = $("button", r); b.setAttribute("aria-expanded", !s.hidden); b.style.transform = s.hidden ? "" : "rotate(180deg)";
    });
  };

  views["admin.commissions"] = () => {
    const rates = { marine: 9, electrical: 8, hvac: 9, automation: 8, mech: 10, pumps: 9, tools: 10, safety: 12 };
    const due = D.vendors.map((v, i) => [v, [96400, 48320, 61200, 38800, 22100][i], [9, 8, 10, 10, 12][i]]);
    return head(tr("العمولات والتسويات", "Commissions & payouts"), tr("نسبة العمولة الافتراضية لكل قسم، مع إمكانية تخصيص نسبة لبائع معيّن.", "Default commission per category, with optional per-seller overrides."),
      '<button class="btn btn--line btn--sm">' + icon("sheet", "icon--sm") + tr("تصدير Excel", "Export Excel") + "</button>") +
      '<div class="kpis">' + kpi(tr("مستحقات البائعين", "Owed to sellers"), "wallet", num(412880), tr("درهم", "AED"), tr("تسوية 1 نوفمبر · 38 بائع", "Payout 1 Nov · 38 sellers"), true) +
      kpi(tr("عمولات الشهر", "Commission (month)"), "percent", num(118400), tr("درهم", "AED"), delta(14.9)) +
      kpi(tr("ضريبة على العمولات", "VAT on commission"), "doc", num(5920), tr("درهم", "AED"), tr("5% تُفوتر للبائعين", "5% invoiced to sellers")) +
      kpi(tr("مبالغ محجوزة (نزاعات)", "Held (disputes)"), "lock", num(9828), tr("درهم", "AED"), tr("2 نزاع مفتوح", "2 open disputes")) + "</div>" +
      '<div class="grid-2 grid-2--even"><section class="panel"><div class="panel__head"><h2>' + tr("العمولة حسب القسم", "Commission by category") + '</h2><button class="btn btn--sm btn--primary" data-savec>' + tr("حفظ", "Save") + '</button></div><div class="table-wrap"><table class="table" style="min-width:0"><thead><tr><th>' + tr("القسم", "Category") + '</th><th class="num">' + tr("مبيعات الشهر", "GMV") + "</th><th>" + tr("النسبة", "Rate") + "</th></tr></thead><tbody>" +
      D.categories.map((c, i) => "<tr><td>" + cn(c) + '</td><td class="num">' + aed([176900, 312400, 198300, 61700, 118200, 241800, 142500, 28400][i]) + '</td><td><span class="pct"><input value="' + rates[c.id] + '" aria-label="rate"><span>%</span></span></td></tr>').join("") + "</tbody></table></div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("استثناءات لبائعين", "Seller overrides") + '</h2><button class="btn btn--sm btn--line">' + icon("plus", "icon--sm") + tr("إضافة", "Add") + '</button></div><div class="rows">' +
      [["v1", 8, tr("اتفاقية حجم مبيعات", "Volume agreement")], ["v5", 10, tr("عرض إطلاق — حتى 31 ديسمبر", "Launch offer — until 31 Dec")]].map(([id, r, n]) => '<div class="row"><span class="vavatar" style="width:38px;height:38px;font-size:12px">' + V(id).en.split(" ").map(w => w[0]).join("").slice(0, 2) + '</span><div class="row__main"><b>' + vn(V(id)) + "</b><span>" + n + '</span></div><span class="pct"><input value="' + r + '" aria-label="rate"><span>%</span></span></div>').join("") + "</div>" +
      '<div class="panel__body" style="border-top:1px solid var(--line)"><div class="alert alert--info">' + icon("info") + "<span>" + tr("تُطبّق النسبة الجديدة على الطلبات من تاريخ الحفظ فقط، ويُسجَّل كل تعديل في سجل العمليات.", "New rates apply to orders from the save date onward. Every change is recorded in the audit log.") + "</span></div></div></section></div>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("التسويات المستحقة — 1 نوفمبر 2026", "Payouts due — 1 Nov 2026") + '</h2><button class="btn btn--sm btn--primary" data-settle-all>' + tr("تسوية المحدد", "Settle selected") + '</button></div><div class="table-wrap"><table class="table"><thead><tr><th style="width:36px"><input type="checkbox" aria-label="all" checked></th><th>' + tr("البائع", "Seller") + "</th><th>" + tr("الفترة", "Period") + '</th><th class="num">' + tr("المبيعات", "Gross") + '</th><th class="num">' + tr("العمولة", "Fee") + '</th><th class="num">' + tr("الصافي", "Net") + "</th><th>IBAN</th><th>" + tr("الحالة", "Status") + "</th><th></th></tr></thead><tbody>" +
      due.map(([v, g, r]) => '<tr><td><input type="checkbox" checked aria-label="select"></td><td><b>' + vn(v) + '</b></td><td class="mono">16–31/10</td><td class="num mono">' + num(g * 0.48, true) + '</td><td class="num mono">-' + num(g * 0.48 * r / 100, true) + ' <span class="muted">(' + r + '%)</span></td><td class="num"><b class="mono">' + num(g * 0.48 * (1 - r / 100), true) + '</b></td><td class="mono" dir="ltr">AE•• •••• ' + (1000 + v.reviews) + "</td><td>" + badge("warn", tr("مستحق", "Due")) + '</td><td><button class="btn btn--sm btn--line" data-settle>' + tr("تسوية", "Settle") + "</button></td></tr>").join("") + "</tbody></table></div></section>";
  };
  views["admin.commissions"].after = () => {
    $("#view").addEventListener("click", e => {
      if (e.target.closest("[data-savec]")) toast(tr("تم حفظ نسب العمولات", "Commission rates saved"));
      const s = e.target.closest("[data-settle]"); if (s) { s.closest("tr").children[7].innerHTML = badge("ok", tr("تمت التسوية", "Settled")); s.remove(); toast(tr("تم تسجيل التسوية", "Payout recorded")); }
      if (e.target.closest("[data-settle-all]")) { $$("[data-settle]").forEach(b => b.click()); }
    });
  };

  views["admin.staff"] = () => {
    const roles = [tr("مدير عام", "Super admin"), tr("محاسبة", "Finance"), tr("دعم العملاء", "Support")];
    const perms = [
      [tr("البائعون والموافقات", "Sellers & approvals"), tr("قبول، رفض، تعليق", "Approve, reject, suspend"), [1, 0, 0]],
      [tr("الطلبات والنزاعات", "Orders & disputes"), tr("عرض، تعديل الحالة، الاسترداد", "View, update, refund"), [1, 1, 1]],
      [tr("العمولات والتسويات", "Commissions & payouts"), tr("تعديل النسب، تنفيذ التسويات", "Edit rates, run payouts"), [1, 1, 0]],
      [tr("التقارير المالية", "Financial reports"), tr("عرض وتصدير", "View & export"), [1, 1, 0]],
      [tr("المحادثات", "Conversations"), tr("الاطلاع على محادثات المشترين والبائعين", "Read buyer–seller chats"), [1, 0, 1]],
      [tr("المحتوى والكوبونات", "Content & coupons"), tr("الصفحات، البانرات، أكواد الخصم", "Pages, banners, coupon codes"), [1, 0, 0]],
      [tr("الإعدادات والصلاحيات", "Settings & permissions"), tr("الموظفون، الدفع، الشحن", "Staff, payments, shipping"), [1, 0, 0]]
    ];
    const staff = [[tr("عمر خ.", "Omar K."), "omar@nasmarket.ae", 0, "10:12", 1], [tr("لينا م.", "Lina M."), "lina@nasmarket.ae", 1, "09:40", 1], [tr("فهد ع.", "Fahad A."), "fahad@nasmarket.ae", 2, tr("أمس", "Yesterday"), 1], [tr("ريم ك.", "Reem K."), "reem@nasmarket.ae", 2, "22/10", 0]];
    return head(tr("الموظفون والصلاحيات", "Staff & permissions"), tr("كل حساب حساس محمي بمصادقة ثنائية، وكل عملية مالية أو إدارية مسجّلة.", "Sensitive accounts use two-factor auth; every financial and admin action is logged."), '<button class="btn btn--primary btn--sm">' + icon("plus", "icon--sm") + tr("إضافة موظف", "Add staff") + "</button>") +
      '<section class="panel"><div class="panel__head"><h2>' + tr("الموظفون", "Staff") + '</h2></div><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("الاسم", "Name") + "</th><th>" + tr("الدور", "Role") + "</th><th>" + tr("آخر دخول", "Last sign-in") + "</th><th>" + tr("المصادقة الثنائية", "2FA") + "</th><th></th></tr></thead><tbody>" +
      staff.map(([n, m, r, l, f]) => '<tr><td><div class="t-prod"><span class="vavatar" style="width:36px;height:36px;font-size:12px">' + m.slice(0, 2).toUpperCase() + "</span><div><b>" + n + "</b><span>" + m + "</span></div></div></td><td>" + badge(r === 0 ? "dark" : r === 1 ? "info" : "", roles[r]) + '</td><td class="mono">' + l + "</td><td>" + (f ? badge("ok", icon("lock", "icon--sm") + tr("مفعّلة", "On")) : badge("warn", tr("غير مفعّلة", "Off"))) + '</td><td><div class="acts"><button class="icon-btn" aria-label="edit">' + icon("edit") + "</button></div></td></tr>").join("") + "</tbody></table></div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("مصفوفة الصلاحيات", "Permission matrix") + '</h2><button class="btn btn--sm btn--primary" data-savep>' + tr("حفظ التغييرات", "Save changes") + '</button></div><div class="table-wrap"><table class="table matrix"><thead><tr><th>' + tr("الصلاحية", "Permission") + "</th>" + roles.map(r => "<th>" + r + "</th>").join("") + "</tr></thead><tbody>" +
      perms.map(([p, d, v]) => "<tr><td><b>" + p + "</b><small>" + d + "</small></td>" + v.map((x, i) => '<td><input type="checkbox" ' + (x ? "checked" : "") + (i === 0 ? " disabled" : "") + ' aria-label="' + esc(p) + '"></td>').join("") + "</tr>").join("") + "</tbody></table></div></section>";
  };
  views["admin.staff"].after = () => $("#view").addEventListener("click", e => { if (e.target.closest("[data-savep]")) toast(tr("تم حفظ الصلاحيات", "Permissions saved")); });

  // ================= ADMIN: BANNERS =================
  const PLACES = [
    ["topbar", tr("شريط الإعلان العلوي", "Announcement bar"), tr("يظهر أعلى كل صفحات المتجر · بنر واحد نشط", "Top of every storefront page · 1 active"), 1],
    ["wide", tr("بنر العروض العرضي", "Wide offer banner"), tr("الرئيسية بعد عروض الأسبوع، وأعلى صفحات الأقسام · بنر واحد نشط", "Home after weekly deals, and top of category pages · 1 active"), 1],
    ["promo", tr("البنرات الترويجية", "Promo banners"), tr("الرئيسية قبل «وصل حديثاً» · حتى 3 بنرات", "Home before “New in” · up to 3"), 3]
  ];
  const IMGLIB = ["p04", "p10", "p13", "p26", "p28", "b-hvac", "b-safety", "b-cnc2", "b-marine", "b-electrical", "b-port", "b-valves", "b-tools", "b-pumproom"];
  const TODAY = new Date().toISOString().slice(0, 10);
  const bnState = b => !b.active ? ["", tr("متوقف", "Paused")] : b.start && b.start > TODAY ? ["info", tr("مجدول", "Scheduled")] : b.end && b.end < TODAY ? ["warn", tr("منتهي", "Ended")] : ["ok", tr("نشط", "Live")];
  const bnLang = AR ? "ar" : "en";
  let BN = JSON.parse(JSON.stringify(liveBanners(D.banners)));
  const saveBN = () => { try { localStorage.setItem("nas_banners", JSON.stringify(BN)); } catch (e) { /* ignore */ } };

  views["admin.banners"] = () => head(tr("البنرات والعروض", "Banners & offers"), tr("تحكّم بما يظهر في الصفحة الرئيسية وصفحات الأقسام: النصوص بثلاث لغات، الصورة، الرابط، وفترة العرض.", "Control what appears on the home and category pages: copy in three languages, image, link and schedule."),
      '<a class="btn btn--line btn--sm" href="' + storeHome + '" target="_blank" rel="noopener">' + icon("eye", "icon--sm") + tr("معاينة المتجر", "Preview store") + '</a><button class="btn btn--line btn--sm" data-bn-reset>' + icon("refresh", "icon--sm") + tr("استعادة الافتراضي", "Reset to default") + '</button><button class="btn btn--primary btn--sm" data-bn-new="promo">' + icon("plus", "icon--sm") + tr("بنر جديد", "New banner") + "</button>") +
    '<div class="alert alert--info">' + icon("info") + "<span>" + tr("أي تعديل هنا يظهر فوراً على المتجر بعد الحفظ. (في هذا النموذج يُحفظ في المتصفح الحالي فقط.)", "Changes go live on the storefront as soon as you save. (In this prototype they're stored in this browser only.)") + "</span></div>" +
    '<div id="bn-root" class="stack"></div>' +
    // editor drawer
    '<aside class="drawer drawer--xl" id="d-banner" aria-hidden="true" role="dialog" aria-labelledby="db-t"><div class="drawer__head"><h2 id="db-t" style="font-size:16px">' + tr("تعديل البنر", "Edit banner") + '</h2><button class="close-btn" data-close aria-label="close">' + icon("x") + "</button></div>" +
    '<div class="drawer__body"><form id="bn-form" class="form-grid">' +
    '<div class="field"><span class="label">' + tr("معاينة مباشرة", "Live preview") + '</span><div id="bn-prev"></div></div>' +
    '<div class="form-grid form-grid--2"><div class="field"><label for="bn-place">' + tr("مكان الظهور", "Placement") + '</label><select class="select" id="bn-place" data-k="place">' + PLACES.map(p => '<option value="' + p[0] + '">' + p[1] + "</option>").join("") + '</select></div>' +
    '<div class="field"><span class="label">' + tr("الحالة", "Status") + '</span><label class="switch" style="min-height:44px"><input type="checkbox" data-k="active"> ' + tr("نشط ويظهر في المتجر", "Active on storefront") + "</label></div></div>" +
    '<div class="tabs" role="tablist" id="bn-langs"><button type="button" class="tab" role="tab" aria-selected="true" aria-controls="bl-ar" data-l="ar">العربية</button><button type="button" class="tab" role="tab" aria-selected="false" aria-controls="bl-en" data-l="en">English</button><button type="button" class="tab" role="tab" aria-selected="false" aria-controls="bl-ur" data-l="ur">اردو</button></div>' +
    ["ar", "en", "ur"].map((l, i) => '<div id="bl-' + l + '" class="form-grid"' + (i ? " hidden" : "") + ' dir="' + (l === "en" ? "ltr" : "rtl") + '">' +
      '<div class="field"><label>' + tr("العنوان", "Title") + ' <span class="mono muted">' + l.toUpperCase() + '</span></label><input class="input" data-k="title.' + l + '"></div>' +
      '<div class="form-grid form-grid--2 bn-rich"><div class="field"><label>' + tr("الوسم", "Tag") + '</label><input class="input" data-k="tag.' + l + '"></div><div class="field"><label>' + tr("نص الزر", "Button text") + '</label><input class="input" data-k="cta.' + l + '"></div></div>' +
      '<div class="field bn-rich"><label>' + tr("النص الفرعي", "Subtitle") + '</label><input class="input" data-k="sub.' + l + '"></div></div>').join("") +
    '<div class="form-grid form-grid--2"><div class="field"><label for="bn-link">' + tr("الرابط", "Link") + '</label><select class="select" id="bn-link" data-k="link"><option value="category.html?deals=1">' + tr("عروض الأسبوع", "Weekly deals") + "</option>" + D.categories.map(c => '<option value="category.html?c=' + c.id + '">' + tr("قسم: ", "Category: ") + cn(c) + "</option>").join("") + '<option value="request.html">' + tr("طلب قطعة", "Request a part") + '</option><option value="seller/join.html">' + tr("التسجيل كبائع", "Become a seller") + "</option></select></div>" +
    '<div class="field bn-wide"><label for="bn-code">' + tr("كود الخصم (اختياري)", "Coupon code (optional)") + '</label><input class="input mono" id="bn-code" dir="ltr" data-k="code"></div></div>' +
    '<div class="field bn-rich"><span class="label">' + tr("لون الخلفية", "Background") + '</span><div class="swatches">' + [["navy", tr("كحلي", "Navy")], ["marine", tr("بحري", "Marine")], ["volt", tr("أصفر", "Volt")]].map(([v, l]) => '<label><input type="radio" name="theme" value="' + v + '" data-k="theme"><i class="sw--' + v + '"></i>' + l + "</label>").join("") + "</div></div>" +
    '<div class="field bn-rich"><span class="label">' + tr("الصورة", "Image") + '</span><div class="imgpick">' + IMGLIB.map(n => '<label title="' + n + '"><input type="radio" name="img" value="' + n + '" data-k="img"><img src="' + IMG(n) + '" alt="' + n + '" loading="lazy"></label>').join("") + '<label class="up">' + icon("upload") + "<span>" + tr("رفع صورة", "Upload") + '</span><input type="file" accept="image/*"></label></div><span class="hint">' + tr("المقاس المقترح: 1600×600 للعرضي، 960×720 للترويجي", "Suggested: 1600×600 for wide, 960×720 for promo") + "</span></div>" +
    '<div class="form-grid form-grid--2"><div class="field"><label for="bn-s">' + tr("يبدأ في", "Starts") + '</label><input class="input mono" type="date" id="bn-s" data-k="start"></div><div class="field"><label for="bn-e">' + tr("ينتهي في", "Ends") + '</label><input class="input mono" type="date" id="bn-e" data-k="end"></div></div>' +
    '</form></div><div class="drawer__foot" style="display:flex;gap:8px;justify-content:space-between"><button class="btn btn--danger" data-bn-del>' + icon("trash", "icon--sm") + tr("حذف", "Delete") + '</button><span style="display:flex;gap:8px"><button class="btn btn--line" data-close>' + tr("إلغاء", "Cancel") + '</button><button class="btn btn--primary" data-bn-save>' + tr("حفظ ونشر", "Save & publish") + "</button></span></div></aside>";

  views["admin.banners"].after = () => {
    const root = $("#bn-root");
    let draft = null, editId = null, prevLang = bnLang;
    function render() {
      root.innerHTML = PLACES.map(([pl, name, desc, lim]) => {
        const list = BN.filter(b => b.place === pl).sort((a, b) => a.order - b.order);
        const live = list.filter(b => bnState(b)[0] === "ok").slice(0, lim);
        let prev = "";
        if (pl === "topbar") prev = live[0] ? '<div class="bn-topbar">' + icon("truck") + esc(bannerText(live[0], "title", bnLang)) + "</div>" : "";
        else if (pl === "wide") prev = live[0] ? bannerHTML(live[0], bnLang, ROOT) : "";
        else prev = live.length ? '<div class="pbanners">' + live.map(b => bannerHTML(b, bnLang, ROOT)).join("") + "</div>" : "";
        return '<section class="panel"><div class="panel__head"><div><h2>' + name + ' <span class="badge ' + (live.length ? "badge--ok" : "") + '" style="margin-inline-start:6px">' + live.length + "/" + lim + " " + tr("نشط", "live") + '</span></h2><p class="muted" style="font-size:12.5px;margin-top:2px">' + desc + '</p></div><button class="btn btn--line btn--sm" data-bn-new="' + pl + '">' + icon("plus", "icon--sm") + tr("إضافة", "Add") + "</button></div>" +
          (prev ? '<div class="bn-preview"><span class="bn-preview__label">' + icon("eye", "icon--sm") + tr("كما يظهر الآن في المتجر", "As it appears on the store now") + "</span>" + prev + "</div>" : "") +
          '<div class="table-wrap"><table class="table"><thead><tr><th style="width:44px">' + tr("الترتيب", "Order") + "</th><th>" + tr("البنر", "Banner") + "</th><th>" + tr("فترة العرض", "Schedule") + "</th><th>" + tr("الحالة", "Status") + '</th><th class="num">' + tr("المشاهدات", "Views") + '</th><th class="num">' + tr("النقرات", "Clicks") + '</th><th class="num">CTR</th><th>' + tr("ظاهر", "On") + "</th><th></th></tr></thead><tbody>" +
          (list.length ? list.map((b, i) => {
            const st = bnState(b);
            return '<tr><td><span class="order-btns"><button aria-label="up" data-bn-up="' + b.id + '"' + (i ? "" : " disabled") + ">" + icon("up") + '</button><button aria-label="down" data-bn-down="' + b.id + '"' + (i < list.length - 1 ? "" : " disabled") + ">" + icon("down") + "</button></span></td>" +
              '<td><div class="t-prod">' + (b.img ? '<span class="bn-thumb"><img src="' + IMG(b.img) + '" alt=""><i class="sw--' + b.theme + '"></i></span>' : '<span class="bn-thumb bn-thumb--text">TOPBAR</span>') + "<div><b>" + esc(bannerText(b, "title", bnLang)) + "</b><span>" + esc(b.link || "") + (b.code ? " · " + esc(b.code) : "") + "</span></div></div></td>" +
              '<td class="mono" style="font-size:12px;white-space:nowrap">' + (b.start || "—") + " → " + (b.end || "—") + "</td><td>" + badge(st[0], st[1]) + '</td><td class="num mono">' + num(b.views || 0) + '</td><td class="num mono">' + num(b.clicks || 0) + '</td><td class="num mono">' + (b.views ? ((b.clicks / b.views) * 100).toFixed(1) + "%" : "—") + "</td>" +
              '<td><label class="switch"><input type="checkbox" data-bn-toggle="' + b.id + '"' + (b.active ? " checked" : "") + ' aria-label="active"></label></td><td><div class="acts"><button class="icon-btn" aria-label="edit" data-bn-edit="' + b.id + '">' + icon("edit") + "</button></div></td></tr>";
          }).join("") : '<tr><td colspan="9"><div class="empty" style="padding:28px">' + icon("image") + "<p>" + tr("لا توجد بنرات هنا بعد", "No banners here yet") + "</p></div></td></tr>") +
          "</tbody></table></div></section>";
      }).join("");
    }
    const form = $("#bn-form");
    function setK(o, k, v) { const [a, b] = k.split("."); if (b) { o[a] = o[a] || {}; o[a][b] = v; } else o[a] = v; }
    function getK(o, k) { const [a, b] = k.split("."); return b ? (o[a] || {})[b] || "" : o[a]; }
    function fill() {
      $$("[data-k]", form).forEach(el => {
        const v = getK(draft, el.dataset.k);
        if (el.type === "checkbox") el.checked = !!v;
        else if (el.type === "radio") el.checked = el.value === v;
        else el.value = v || "";
      });
      sync();
    }
    function sync() {
      const pl = draft.place;
      $$(".bn-rich", form).forEach(e => (e.hidden = pl === "topbar"));
      $$(".bn-wide", form).forEach(e => (e.hidden = pl !== "wide"));
      const pv = $("#bn-prev");
      if (pl === "topbar") pv.innerHTML = '<div class="bn-topbar">' + icon("truck") + esc(bannerText(draft, "title", prevLang) || "…") + "</div>";
      else { pv.innerHTML = bannerHTML(draft, prevLang, ROOT); pv.dir = prevLang === "en" ? "ltr" : "rtl"; }
    }
    form.addEventListener("input", e => {
      const el = e.target.closest("[data-k]"); if (!el) return;
      setK(draft, el.dataset.k, el.type === "checkbox" ? el.checked : el.value);
      sync();
    });
    form.addEventListener("change", e => { const el = e.target.closest("[data-k]"); if (el && el.type === "radio") { setK(draft, el.dataset.k, el.value); sync(); } });
    $("#bn-langs").addEventListener("tabchange", e => { prevLang = e.detail.dataset.l; sync(); });
    function edit(b, isNew) {
      draft = JSON.parse(JSON.stringify(b)); editId = isNew ? null : b.id;
      $("#db-t").textContent = isNew ? tr("بنر جديد", "New banner") : tr("تعديل البنر", "Edit banner");
      $("[data-bn-del]").hidden = isNew;
      fill(); open("#d-banner");
    }
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-bn-edit],[data-bn-new],[data-bn-up],[data-bn-down],[data-bn-save],[data-bn-del],[data-bn-reset]");
      if (!t) return;
      if (t.dataset.bnEdit) edit(BN.find(b => b.id === t.dataset.bnEdit));
      if (t.dataset.bnNew) {
        const pl = t.dataset.bnNew;
        edit({ id: "b" + Date.now(), place: pl, active: true, order: BN.filter(b => b.place === pl).length + 1, start: TODAY, end: "", theme: "navy", img: "b-port", link: "category.html?deals=1", code: "",
          title: { ar: "عنوان البنر", en: "Banner title", ur: "" }, sub: { ar: "", en: "", ur: "" }, tag: { ar: "", en: "", ur: "" }, cta: { ar: "تسوّق الآن", en: "Shop now", ur: "ابھی خریدیں" }, views: 0, clicks: 0 }, true);
      }
      if (t.dataset.bnUp || t.dataset.bnDown) {
        const id = t.dataset.bnUp || t.dataset.bnDown, b = BN.find(x => x.id === id);
        const list = BN.filter(x => x.place === b.place).sort((a, c) => a.order - c.order), i = list.indexOf(b), j = t.dataset.bnUp ? i - 1 : i + 1;
        if (list[j]) { const o = b.order; b.order = list[j].order; list[j].order = o; if (b.order === list[j].order) b.order += t.dataset.bnUp ? -1 : 1; saveBN(); render(); }
      }
      if ("bnSave" in t.dataset) {
        if (editId) BN[BN.findIndex(b => b.id === editId)] = draft; else BN.push(draft);
        saveBN(); render(); closeAll(); toast(tr("تم الحفظ — التغييرات ظاهرة الآن على المتجر", "Saved — now live on the storefront"));
      }
      if ("bnDel" in t.dataset && editId) { BN = BN.filter(b => b.id !== editId); saveBN(); render(); closeAll(); toast(tr("تم حذف البنر", "Banner deleted"), "trash"); }
      if ("bnReset" in t.dataset) { try { localStorage.removeItem("nas_banners"); } catch (_) {} BN = JSON.parse(JSON.stringify(D.banners)); render(); toast(tr("تمت استعادة البنرات الافتراضية", "Default banners restored"), "refresh"); }
    });
    root.addEventListener("change", e => {
      const c = e.target.closest("[data-bn-toggle]"); if (!c) return;
      BN.find(b => b.id === c.dataset.bnToggle).active = c.checked; saveBN(); render();
      toast(c.checked ? tr("البنر ظاهر الآن على المتجر", "Banner is now live") : tr("تم إيقاف البنر", "Banner paused"));
    });
    render();
  };

  // ================= SUPPORT TICKETS =================
  const PRI = { urgent: ["danger", tr("عاجلة", "Urgent")], high: ["warn", tr("عالية", "High")], normal: ["info", tr("عادية", "Normal")], low: ["", tr("منخفضة", "Low")] };
  const TST = { open: ["info", tr("مفتوحة", "Open")], pending: ["warn", tr("بانتظار العميل", "Waiting on customer")], resolved: ["ok", tr("محلولة", "Resolved")] };
  const TCAT = { shipping: tr("الشحن والتوصيل", "Shipping & delivery"), payout: tr("المستحقات والتسويات", "Payouts"), invoice: tr("الفواتير", "Invoices"), tech: tr("مشكلة تقنية", "Technical issue"), returns: tr("الإرجاع والاسترداد", "Returns & refunds"), payment: tr("الدفع", "Payments"), account: tr("الحساب والمستندات", "Account & documents"), products: tr("المنتجات والمراجعة", "Products & review") };
  const AGENTS = [["FA", tr("فهد ع.", "Fahad A.")], ["RK", tr("ريم ك.", "Reem K.")], ["LM", tr("لينا م.", "Lina M.")]];
  const TICKETS = [
    { no: "TKT-2610-0142", type: "buyer", who: tr("أحمد خالد", "Ahmed Khaled"), av: "AK", subj: tr("الشحنة ظاهرة كمسلّمة لكنها لم تصل", "Shipment shows delivered but never arrived"), cat: "shipping", pri: "high", st: "open", sla: ["warn", tr("الرد خلال 1:20 س", "Reply in 1h 20m")], as: 0, upd: tr("قبل 12 د", "12m ago"), order: "NAS-261024-0042", unread: true,
      msgs: [["c", tr("مرحباً، تتبع الشحنة AWB ARX 7731 0042 19 يقول تم التسليم أمس الساعة 4 العصر، لكن ما استلمنا شي بالمستودع. ممكن تتأكدوا؟", "Hi, tracking AWB ARX 7731 0042 19 says it was delivered yesterday at 4 PM, but nothing reached our warehouse. Can you check?"), "09:02", "pod_screenshot.png"],
             ["s", tr("تم تعيين التذكرة إلى فهد ع. تلقائياً (قسم الشحن)", "Auto-assigned to Fahad A. (Shipping team)"), "09:02"],
             ["n", tr("فتحت بلاغ مع أرامكس رقم ARX-INV-55821. بانتظار صورة إثبات التسليم (POD) والتوقيع.", "Opened Aramex investigation ARX-INV-55821. Waiting for POD photo and signature."), "09:30"],
             ["a", tr("أهلاً أحمد، نعتذر عن الإزعاج. فتحنا تحقيقاً مع شركة الشحن وطلبنا صورة إثبات التسليم. سنعود إليك خلال 24 ساعة كحد أقصى، والمبلغ محفوظ لدى المنصة ولن يُحوَّل للبائع قبل حل المشكلة.", "Hi Ahmed, sorry about this. We've opened an investigation with the carrier and requested proof of delivery. We'll update you within 24 hours, and your payment stays on hold until this is resolved."), "09:41"],
             ["c", tr("تمام شكراً. هل ممكن نعيد الشحن بشكل عاجل؟ عندنا توقف بالخط.", "Thanks. Can you reship urgently? Our line is down."), "10:05"]] },
    { no: "TKT-2610-0141", type: "seller", who: tr("مصدر الطاقة للكهربائيات", "PowerSource Electric"), av: "PE", subj: tr("تسوية 15 أكتوبر لم تصل إلى الحساب البنكي", "15 Oct payout hasn't reached our bank"), cat: "payout", pri: "normal", st: "open", sla: ["ok", tr("الرد خلال 5 س", "Reply in 5h")], as: 2, upd: tr("قبل 40 د", "40m ago"), order: "PO-2610-01",
      msgs: [["c", tr("السلام عليكم، التسوية PO-2610-01 بقيمة 18,240 درهم ظاهرة كمدفوعة لكنها لم تصل لحسابنا حتى الآن.", "Hello, payout PO-2610-01 (AED 18,240) shows as paid but hasn't arrived in our account."), "08:15"],
             ["a", tr("وعليكم السلام، التحويل خرج من حسابنا يوم 15 أكتوبر برقم مرجعي FT26288XX01. التحويلات بين البنوك قد تستغرق حتى 3 أيام عمل. أرفقنا إيصال التحويل.", "Hello, the transfer left our account on 15 Oct (ref FT26288XX01). Interbank transfers can take up to 3 business days. Transfer receipt attached."), "09:20", "transfer_receipt.pdf"]] },
    { no: "TKT-2610-0139", type: "buyer", who: tr("شركة الريم للمقاولات", "Al Reem Contracting"), av: "AR", subj: tr("إعادة إصدار الفاتورة باسم الشركة والرقم الضريبي", "Reissue invoice with company name and TRN"), cat: "invoice", pri: "low", st: "pending", sla: ["ok", tr("بانتظار العميل", "Waiting on customer")], as: 1, upd: tr("قبل 3 س", "3h ago"), order: "NAS-261025-0047",
      msgs: [["c", tr("نحتاج الفاتورة باسم الشركة مع الرقم الضريبي.", "We need the invoice in our company name with our TRN."), "Yesterday"], ["a", tr("أكيد، أرسل لنا الرقم الضريبي الصحيح وسنعيد إصدار الفاتورة.", "Sure, please send the correct TRN and we'll reissue it."), "07:50"]] },
    { no: "TKT-2610-0137", type: "seller", who: tr("الخليج للتوريدات البحرية", "Gulf Marine Supply"), av: "GM", subj: tr("خطأ عند استيراد ملف Excel للمنتجات", "Error importing products from Excel"), cat: "tech", pri: "normal", st: "open", sla: ["ok", tr("الرد خلال 3 س", "Reply in 3h")], as: 0, upd: tr("قبل ساعة", "1h ago"), order: "",
      msgs: [["c", tr("الاستيراد يتوقف عند السطر 214 برسالة «تصنيف غير صالح».", "The import stops at row 214 with “invalid category”."), "07:12", "stock_oct_2026.xlsx"]] },
    { no: "TKT-2610-0135", type: "buyer", who: tr("محمد س.", "Mohammed S."), av: "MS", subj: tr("المنتج المستلم مختلف عن الوصف", "Item received doesn't match the listing"), cat: "returns", pri: "urgent", st: "open", sla: ["bad", tr("تجاوز المهلة 35 د", "SLA breached 35m")], as: 1, upd: tr("قبل 2 س", "2h ago"), order: "NAS-261020-0004", unread: true,
      msgs: [["c", tr("طلبت محرك بإطار B3 ووصلني B5، والبائع لم يرد على طلب الإرجاع منذ يومين.", "I ordered a B3-frame motor and got a B5. The seller hasn't answered my return request for two days."), "06:40", "motor_photo.jpg"]] },
    { no: "TKT-2610-0130", type: "buyer", who: tr("يوسف م.", "Yousef M."), av: "YM", subj: tr("استفسار عن الدفع عند الاستلام", "Question about cash on delivery"), cat: "payment", pri: "low", st: "resolved", sla: ["ok", tr("تم الحل", "Resolved")], as: 2, upd: tr("أمس", "Yesterday"), order: "",
      msgs: [["c", tr("هل يمكن الدفع بالبطاقة للمندوب؟", "Can I pay the courier by card?"), "Yesterday"], ["a", tr("نعم، المندوب يحمل جهاز دفع بالبطاقة.", "Yes, couriers carry a card machine."), "Yesterday"]] },
    { no: "TKT-2610-0128", type: "seller", who: tr("بارد لأنظمة التبريد", "Barid Cooling Systems"), av: "BC", subj: tr("طلب مراجعة نسبة العمولة", "Request to review commission rate"), cat: "account", pri: "normal", st: "resolved", sla: ["ok", tr("تم الحل", "Resolved")], as: 2, upd: "22/10", order: "",
      msgs: [["c", tr("مبيعاتنا تجاوزت 60 ألف شهرياً، هل يمكن مراجعة العمولة؟", "Our sales passed AED 60k a month. Could you review our rate?"), "21/10"], ["a", tr("تمت الموافقة على 9% ابتداءً من نوفمبر.", "Approved at 9% starting November."), "22/10"]] }
  ];
  const tkBack = () => '<button type="button" class="tk-back" data-tkback>' + icon("chev", "icon--sm flip-ltr") + tr("كل التذاكر", "All tickets") + "</button>";
  document.addEventListener("click", e => {
    if (e.target.closest("[data-tkback]")) { $(".tk").classList.remove("show-detail"); scrollTo(0, 0); return; }
    if (e.target.closest(".tk-item") && innerWidth < 1100) { $(".tk").classList.add("show-detail"); scrollTo(0, 0); }
  });
  function tkItem(t, cur, adminSide) {
    return '<button class="tk-item" data-tk="' + t.no + '" aria-current="' + (t.no === cur) + '">' + (t.unread ? '<span class="unread" aria-label="unread"></span>' : "") +
      '<span class="tk-item__top"><span class="mono">' + t.no + '</span><span class="mono" style="font-size:11px;color:var(--muted)">' + t.upd + "</span></span><b>" + esc(t.subj) + "</b>" +
      '<span class="tk-item__meta">' + (adminSide ? badge(t.type === "seller" ? "dark" : "", t.type === "seller" ? tr("بائع", "Seller") : tr("مشتري", "Buyer")) + "<span>" + t.who + "</span>" : "") + badge(PRI[t.pri][0], PRI[t.pri][1]) + (adminSide ? "" : badge(TST[t.st][0], TST[t.st][1])) + "</span>" +
      (adminSide ? '<span class="tk-item__meta"><span class="sla sla--' + t.sla[0] + '">' + icon("clock") + t.sla[1] + "</span>" + (t.as >= 0 ? '<span style="margin-inline-start:auto">' + AGENTS[t.as][1] + "</span>" : "") + "</span>" : "") + "</button>";
  }
  function tkThread(t, adminSide) {
    return t.msgs.map(([k, txt, time, file]) => {
      if (k === "s") return '<div class="tmsg tmsg--sys"><span>' + txt + " · " + time + "</span></div>";
      const isMe = adminSide ? k !== "c" : k === "c";
      const who = k === "c" ? (adminSide ? t.who : tr("أنت", "You")) : k === "n" ? AGENTS[t.as][1] + " · " + tr("ملاحظة داخلية", "Internal note") : (adminSide ? AGENTS[t.as][1] : tr("فريق دعم NAS Market", "NAS Market support"));
      const av = k === "c" ? t.av : k === "n" ? AGENTS[t.as][0] : (adminSide ? AGENTS[t.as][0] : "NM");
      return '<div class="tmsg ' + (k === "a" ? "tmsg--agent" : k === "n" ? "tmsg--note" : "") + '"' + (isMe && !adminSide ? ' style="justify-self:end"' : "") + '><span class="vavatar">' + av + '</span><div class="tmsg__box"><div class="tmsg__who"><b>' + who + "</b><time>" + time + "</time></div>" + esc(txt) + (file ? '<br><span class="msg__file">' + icon("attach", "icon--sm") + file + "</span>" : "") + "</div></div>";
    }).join("");
  }

  // more demo tickets so each audience has a full queue
  AGENTS.push(["SH", tr("سامر ح.", "Samer H.")]);
  TICKETS.push(
    { no: "TKT-2610-0144", type: "buyer", who: tr("خالد ع.", "Khalid A."), av: "KA", subj: tr("تم خصم المبلغ مرتين من البطاقة", "Card charged twice"), cat: "payment", pri: "high", st: "open", sla: ["ok", tr("الرد خلال 2 س", "Reply in 2h")], as: 1, upd: tr("قبل 5 د", "5m ago"), order: "NAS-261023-0019", unread: true,
      msgs: [["c", tr("ظهر عندي خصمين بنفس المبلغ 418.95 درهم على الطلب NAS-261023-0019.", "I see two charges of AED 418.95 for order NAS-261023-0019."), "10:20", "bank_sms.jpg"]] },
    { no: "TKT-2610-0133", type: "buyer", who: tr("ورشة النجم", "Al Najm Workshop"), av: "NW", subj: tr("لا يصلني رمز التحقق عند تسجيل الدخول", "Not receiving the login OTP"), cat: "account", pri: "normal", st: "pending", sla: ["ok", tr("بانتظار العميل", "Waiting on customer")], as: 0, upd: tr("قبل 4 س", "4h ago"), order: "",
      msgs: [["c", tr("أحاول الدخول من أمس ولا يصل رمز OTP على الجوال.", "I've been trying since yesterday and no OTP arrives."), "Yesterday"], ["a", tr("أرسلنا رابط دخول على بريدك، هل وصلك؟", "We've emailed you a sign-in link — did it arrive?"), "07:15"]] },
    { no: "TKT-2610-0140", type: "seller", who: tr("الخليج للتوريدات البحرية", "Gulf Marine Supply"), av: "GM", subj: tr("لماذا رُفض منتج «صمام فراشة DN100»؟", "Why was “Butterfly Valve DN100” rejected?"), cat: "products", pri: "normal", st: "open", sla: ["warn", tr("الرد خلال 40 د", "Reply in 40m")], as: 3, upd: tr("قبل 25 د", "25m ago"), order: "BFV-DN100-PN16", unread: true,
      msgs: [["c", tr("وصلنا إشعار بأن المنتج يحتاج تعديل، لكن الصور واضحة برأينا. ما المطلوب بالضبط؟", "We were told the product needs changes, but the photos look clear to us. What exactly is needed?"), "09:55"]] },
    { no: "TKT-2610-0136", type: "seller", who: tr("سما للتكييف المركزي", "Sama Central AC"), av: "SA", subj: tr("رفع الرخصة المجددة قبل انتهاء الحالية", "Uploading renewed licence before expiry"), cat: "account", pri: "high", st: "open", sla: ["bad", tr("تجاوز المهلة 20 د", "SLA breached 20m")], as: 2, upd: tr("قبل ساعتين", "2h ago"), order: "",
      msgs: [["c", tr("رخصتنا تنتهي 12 نوفمبر وجددناها، لكن خانة الرفع لا تقبل الملف.", "Our licence expires 12 Nov and we've renewed it, but the upload field rejects the file."), "08:10", "license_2027.pdf"]] },
    { no: "TKT-2610-0131", type: "seller", who: tr("حماية لمعدات السلامة", "Himaya Safety Equipment"), av: "HS", subj: tr("فرق بين مبالغ الدفع عند الاستلام وكشف الحساب", "COD amounts don't match the statement"), cat: "payout", pri: "normal", st: "pending", sla: ["ok", tr("بانتظار البائع", "Waiting on seller")], as: 2, upd: tr("أمس", "Yesterday"), order: "PO-2610-01",
      msgs: [["c", tr("كشف أكتوبر ناقص 3 طلبات دفع عند الاستلام.", "October's statement is missing 3 COD orders."), "Yesterday"], ["a", tr("الطلبات الثلاثة ما زالت لدى شركة الشحن ولم تُحصّل بعد. ستظهر في الكشف القادم.", "Those 3 orders are still with the carrier and not yet collected; they'll appear in the next statement."), "Yesterday"]] }
  );
  const AUD = new URLSearchParams(location.search).get("aud") === "seller" ? "seller" : "buyer";
  const AUDCFG = {
    buyer: { name: tr("دعم العملاء", "Customer support"), sub: tr("تذاكر المشترين: الطلبات، الشحن، الدفع، الإرجاع، والحساب.", "Buyer tickets: orders, shipping, payments, returns and accounts."), team: tr("فريق خدمة العملاء", "Customer care team"), icon: "user", open: 6, breach: 1, resp: "48m", csat: "94%", sla: tr("أول رد خلال ساعتين", "First reply within 2h"),
      cats: ["shipping", "returns", "payment", "invoice", "account"], agents: [0, 1],
      canned: [tr("شكراً لتواصلك، نراجع طلبك وسنعود إليك خلال 24 ساعة.", "Thanks for reaching out — we're on it and will update you within 24 hours."), tr("أعدنا شحن الطلب، ورقم التتبع الجديد مرفق.", "We've reshipped your order; the new tracking number is attached."), tr("تم إصدار الاسترداد، ويظهر في حسابك خلال 5–7 أيام عمل.", "Your refund has been issued and will show in 5–7 business days.")] },
    seller: { name: tr("دعم البائعين", "Seller support"), sub: tr("تذاكر البائعين: المستحقات، مراجعة المنتجات، المستندات، والمشاكل التقنية.", "Seller tickets: payouts, product review, documents and technical issues."), team: tr("فريق علاقات البائعين", "Seller relations team"), icon: "store", open: 12, breach: 1, resp: "2h 35m", csat: "89%", sla: tr("أول رد خلال 4 ساعات عمل", "First reply within 4 business hours"),
      cats: ["payout", "products", "account", "tech", "shipping"], agents: [2, 3],
      canned: [tr("راجعنا المنتج: نحتاج صورتين واضحتين للوحة البيانات ثم يُعاد للمراجعة تلقائياً.", "We reviewed it: we need two clear nameplate photos, then it goes back to review automatically."), tr("التحويل يستغرق حتى 3 أيام عمل، والإيصال مرفق.", "Transfers take up to 3 business days; the receipt is attached."), tr("تم تحديث مستنداتك، وتم تمديد صلاحية المتجر.", "Your documents are updated and your store remains active.")] }
  }[AUD];
  const OTHER = AUD === "buyer" ? "seller" : "buyer";

  views["admin.support"] = () => {
    const mine = TICKETS.filter(t => t.type === AUD);
    const card = (k, ic, name, n, b, href) => '<a class="aud-card aud-card--' + k + '" href="' + href + '"' + (k === AUD ? ' aria-current="page"' : "") + '><span class="aud-card__ic">' + icon(ic) + '</span><span class="aud-card__txt"><b>' + name + "</b><span>" + n + " " + tr("مفتوحة", "open") + (b ? " · " + b + " " + tr("تجاوزت المهلة", "past SLA") : "") + '</span></span><span class="aud-card__n mono">' + n + "</span></a>";
    return head(tr("الدعم الفني", "Support"), AUDCFG.sub, '<button class="btn btn--line btn--sm">' + icon("doc", "icon--sm") + tr("الردود الجاهزة", "Saved replies") + '</button><button class="btn btn--line btn--sm">' + icon("settings", "icon--sm") + tr("قواعد التعيين و SLA", "Routing & SLA rules") + "</button>") +
      '<nav class="aud-switch" aria-label="' + tr("نوع التذاكر", "Ticket audience") + '">' + card("buyer", "user", tr("دعم العملاء (المشترين)", "Customer support (buyers)"), 6, 1, "support.html?aud=buyer") + card("seller", "store", tr("دعم البائعين", "Seller support"), 12, 1, "support.html?aud=seller") + "</nav>" +
      '<div class="tk-scope tk-scope--' + AUD + '"><div class="kpis">' + kpi(tr("مفتوحة", "Open"), AUDCFG.icon, String(AUDCFG.open), "", AUDCFG.team) + kpi(tr("متوسط أول رد", "Avg. first response"), "clock", AUDCFG.resp, "", AUDCFG.sla) + kpi(tr("تجاوزت المهلة", "SLA breached"), "alert", String(AUDCFG.breach), "", '<span class="badge badge--danger">' + tr("تحتاج تصعيد", "Needs escalation") + "</span>") + kpi(AUD === "buyer" ? tr("رضا العملاء", "Customer satisfaction") : tr("رضا البائعين", "Seller satisfaction"), "star", AUDCFG.csat, "", tr("آخر 30 يوم", "last 30 days"), true) + "</div>" +
      '<div class="tk tk--3"><section class="panel tk-list"><div class="tk-list__head">' + icon(AUDCFG.icon) + "<b>" + AUDCFG.name + '</b><span class="muted" style="font-size:12px">' + AUDCFG.team + '</span></div><div class="tabs" role="tablist" id="tk-tabs" style="padding-inline:8px"><button class="tab" role="tab" aria-selected="true" data-f="open">' + tr("مفتوحة", "Open") + ' <span class="count">' + mine.filter(t => t.st === "open").length + '</span></button><button class="tab" role="tab" aria-selected="false" data-f="pending">' + (AUD === "buyer" ? tr("بانتظار العميل", "Waiting on buyer") : tr("بانتظار البائع", "Waiting on seller")) + ' <span class="count">' + mine.filter(t => t.st === "pending").length + '</span></button><button class="tab" role="tab" aria-selected="false" data-f="resolved">' + tr("محلولة", "Resolved") + '</button><button class="tab" role="tab" aria-selected="false" data-f="all">' + tr("الكل", "All") + "</button></div>" +
      '<div class="tbl-tools"><div class="group" style="width:100%"><input class="input" style="flex:1;min-width:0" placeholder="' + (AUD === "buyer" ? tr("رقم التذكرة، اسم العميل، أو رقم الطلب", "Ticket no., buyer or order") : tr("رقم التذكرة، اسم المتجر، أو رقم الرخصة", "Ticket no., store or licence no.")) + '" aria-label="search"><select class="select" aria-label="category"><option>' + tr("كل المواضيع", "All topics") + "</option>" + AUDCFG.cats.map(k => "<option>" + TCAT[k] + "</option>").join("") + '</select></div></div><div class="tk-items" id="tk-items"></div></section>' +
      '<section class="panel" id="tk-detail"></section><aside class="tk-side" id="tk-side"></aside></div></div>';
  };

  views["admin.support"].after = () => {
    const mine = TICKETS.filter(t => t.type === AUD);
    let cur = mine[0].no, filter = "open";
    function list() { $("#tk-items").innerHTML = mine.filter(t => filter === "all" || t.st === filter).map(t => tkItem(t, cur, true)).join("") || '<div class="empty" style="padding:28px">' + icon("check") + "<p>" + tr("لا توجد تذاكر هنا", "No tickets here") + "</p></div>"; }
    function sideBuyer(t) {
      const ord = t.order && SORD.find(o => o.no.startsWith(t.order));
      return '<section class="panel side-card side-card--buyer"><div class="panel__head"><h3>' + icon("user", "icon--sm") + tr("العميل", "Buyer") + '</h3></div><div class="panel__body" style="display:grid;gap:12px;font-size:13px"><div style="display:flex;gap:10px;align-items:center"><span class="vavatar">' + t.av + "</span><div><b>" + t.who + '</b><br><span class="muted">' + tr("مشترٍ منذ 2026 · 7 طلبات", "Buyer since 2026 · 7 orders") + '</span></div></div><dl class="dl"><div><dt>' + tr("البريد", "Email") + '</dt><dd class="mono" style="font-size:12px">' + t.av.toLowerCase() + "•••@mail.ae</dd></div><div><dt>" + tr("الجوال", "Mobile") + '</dt><dd class="mono" dir="ltr" style="text-align:start;font-size:12px">+971 5• ••• ••' + t.no.slice(-2) + "</dd></div><div><dt>" + tr("إجمالي المشتريات", "Lifetime spend") + "</dt><dd>" + aed(6420) + "</dd></div><div><dt>" + tr("تذاكر سابقة", "Past tickets") + '</dt><dd class="mono">2</dd></div></dl></div></section>' +
        (t.order ? '<section class="plate" style="padding:14px 18px;display:grid;gap:6px;font-size:13px"><span class="plate__key">' + tr("الطلب المرتبط", "LINKED ORDER") + '</span><b class="mono">' + t.order + "</b>" + (ord ? stB(ord.st) + "<span>" + aed(ord.total, true) + " · " + vn(V("v2")) + "</span>" : "") + '<a class="link" href="orders.html" style="font-size:12.5px">' + tr("فتح الطلب", "Open order") + "</a></section>" : "");
    }
    function sideSeller(t) {
      const v = D.vendors.find(x => x.en === (AR ? "" : t.who) || x.ar === t.who) || D.vendors[0];
      return '<section class="panel side-card side-card--seller"><div class="panel__head"><h3>' + icon("store", "icon--sm") + tr("المتجر", "Store") + '</h3><a class="link" href="vendors.html" style="font-size:12.5px">' + tr("ملف البائع", "Seller profile") + '</a></div><div class="panel__body" style="display:grid;gap:12px;font-size:13px"><div style="display:flex;gap:10px;align-items:center"><span class="vavatar">' + t.av + "</span><div><b>" + t.who + "</b><br>" + badge("ok", icon("badge", "icon--sm") + tr("موثّق", "Verified")) + '</div></div><dl class="dl"><div><dt>' + tr("الرخصة", "Licence") + '</dt><dd><span class="mono" style="font-size:12px">CN-' + (1000000 + v.reviews * 917) + "</span> " + (t.no.endsWith("36") ? badge("warn", tr("تنتهي خلال 18 يوم", "Expires in 18d")) : "") + "</dd></div><div><dt>" + tr("التقييم", "Rating") + '</dt><dd class="mono">' + v.rating + " ★</dd></div><div><dt>" + tr("الرصيد المستحق", "Balance due") + "</dt><dd>" + aed(21460) + "</dd></div><div><dt>" + tr("منتجات بالمراجعة", "Products in review") + '</dt><dd class="mono">2</dd></div><div><dt>' + tr("مدير الحساب", "Account manager") + "</dt><dd>" + AGENTS[2][1] + "</dd></div></dl></div></section>" +
        (t.order ? '<section class="plate" style="padding:14px 18px;display:grid;gap:6px;font-size:13px"><span class="plate__key">' + tr("مرتبطة بـ", "LINKED TO") + '</span><b class="mono">' + t.order + '</b><a class="link" href="' + (t.cat === "payout" ? "commissions.html" : "products.html") + '" style="font-size:12.5px">' + tr("فتح", "Open") + "</a></section>" : "");
    }
    function detail() {
      const t = TICKETS.find(x => x.no === cur);
      $("#tk-detail").innerHTML = '<div class="tk-head">' + tkBack() + '<div class="tk-head__meta">' + badge(AUD === "seller" ? "dark" : "info", AUD === "seller" ? tr("تذكرة بائع", "Seller ticket") : tr("تذكرة عميل", "Buyer ticket")) + '<span class="mono">' + t.no + "</span><span>" + TCAT[t.cat] + "</span>" + (t.order ? '<span class="mono">' + t.order + "</span>" : "") + "</div><h2>" + esc(t.subj) + "</h2>" +
        '<div class="tk-ctrls"><div class="field"><label>' + tr("الحالة", "Status") + '</label><select class="select" data-tk-set="st">' + Object.keys(TST).map(k => '<option value="' + k + '"' + (k === t.st ? " selected" : "") + ">" + (k === "pending" && AUD === "seller" ? tr("بانتظار البائع", "Waiting on seller") : TST[k][1]) + "</option>").join("") + '</select></div><div class="field"><label>' + tr("الأولوية", "Priority") + '</label><select class="select" data-tk-set="pri">' + Object.keys(PRI).map(k => '<option value="' + k + '"' + (k === t.pri ? " selected" : "") + ">" + PRI[k][1] + "</option>").join("") + '</select></div><div class="field"><label>' + tr("مُسندة إلى", "Assignee") + " · " + AUDCFG.team + '</label><select class="select" data-tk-set="as">' + AUDCFG.agents.map(i => '<option value="' + i + '"' + (i === t.as ? " selected" : "") + ">" + AGENTS[i][1] + "</option>").join("") + '</select></div><div class="field"><label>' + tr("الموضوع", "Topic") + '</label><select class="select">' + AUDCFG.cats.map(k => "<option" + (k === t.cat ? " selected" : "") + ">" + TCAT[k] + "</option>").join("") + "</select></div></div></div>" +
        '<div class="tthread" id="tk-thread">' + tkThread(t, true) + "</div>" +
        '<form class="tk-compose" id="tk-compose"><div class="tabs" role="tablist"><button type="button" class="tab" role="tab" aria-selected="true" data-mode="a">' + (AUD === "seller" ? tr("رد للبائع", "Reply to seller") : tr("رد للعميل", "Reply to buyer")) + '</button><button type="button" class="tab" role="tab" aria-selected="false" data-mode="n">' + tr("ملاحظة داخلية", "Internal note") + "</button></div>" +
        '<textarea class="textarea" style="min-height:96px" placeholder="' + tr("اكتب ردك…", "Write your reply…") + '" aria-label="reply"></textarea>' +
        '<div class="tk-compose__bar"><div class="group"><select class="select" id="tk-canned" aria-label="saved replies"><option value="">' + tr("ردود جاهزة…", "Saved replies…") + "</option>" + AUDCFG.canned.map(c => "<option>" + c + "</option>").join("") + '</select><button type="button" class="btn btn--line btn--icon btn--sm" aria-label="attach">' + icon("attach", "icon--sm") + '</button></div><div class="group"><select class="select" id="tk-after" aria-label="then"><option value="pending">' + (AUD === "seller" ? tr("ثم: بانتظار البائع", "Then: waiting on seller") : tr("ثم: بانتظار العميل", "Then: waiting on buyer")) + '</option><option value="open">' + tr("ثم: تبقى مفتوحة", "Then: keep open") + '</option><option value="resolved">' + tr("ثم: محلولة", "Then: resolved") + '</option></select><button class="btn btn--primary btn--sm">' + icon("send", "icon--sm") + tr("إرسال", "Send") + "</button></div></div></form>";
      $("#tk-side").innerHTML = (AUD === "buyer" ? sideBuyer(t) : sideSeller(t)) +
        '<section class="panel"><div class="panel__head"><h3>SLA</h3><span class="muted" style="font-size:12px">' + AUDCFG.sla + '</span></div><div class="panel__body"><ol class="tl"><li><span>' + tr("أول رد", "First response") + "</span><time>" + (t.msgs.some(m => m[0] === "a") ? "✓" : "—") + '</time></li><li class="' + (t.st === "resolved" ? "" : "is-todo") + '"><span>' + (AUD === "buyer" ? tr("الحل خلال 48 ساعة", "Resolve within 48h") : tr("الحل خلال 3 أيام عمل", "Resolve within 3 business days")) + '</span><time><span class="sla sla--' + t.sla[0] + '">' + t.sla[1] + "</span></time></li></ol></div></section>" +
        '<a class="panel aud-hop" href="support.html?aud=' + OTHER + '">' + icon(OTHER === "seller" ? "store" : "user", "icon--sm") + (OTHER === "seller" ? tr("الانتقال إلى دعم البائعين", "Go to seller support") : tr("الانتقال إلى دعم العملاء", "Go to customer support")) + icon("chev", "icon--sm flip-rtl") + "</a>";
      const th = $("#tk-thread"); th.scrollTop = th.scrollHeight;
      let mode = "a";
      const comp = $("#tk-compose");
      comp.querySelector('[role="tablist"]').addEventListener("tabchange", e => { mode = e.detail.dataset.mode; comp.classList.toggle("is-note", mode === "n"); });
      $("#tk-canned").addEventListener("change", e => { if (e.target.value) comp.querySelector("textarea").value = e.target.value; });
      comp.addEventListener("submit", e => {
        e.preventDefault();
        const txt = comp.querySelector("textarea").value.trim(); if (!txt) return;
        t.msgs.push([mode, txt, tr("الآن", "now")]);
        if (mode === "a") t.st = $("#tk-after").value;
        t.unread = false; list(); detail();
        toast(mode === "n" ? tr("تمت إضافة الملاحظة الداخلية", "Internal note added") : AUD === "seller" ? tr("تم إرسال الرد للبائع", "Reply sent to seller") : tr("تم إرسال الرد للعميل", "Reply sent to buyer"), "send");
      });
    }
    $("#tk-items").addEventListener("click", e => { const b = e.target.closest("[data-tk]"); if (!b) return; cur = b.dataset.tk; const t = TICKETS.find(x => x.no === cur); t.unread = false; list(); detail(); });
    $("#tk-tabs").addEventListener("tabchange", e => { filter = e.detail.dataset.f; list(); });
    $("#view").addEventListener("change", e => {
      const s = e.target.closest("[data-tk-set]"); if (!s) return;
      const t = TICKETS.find(x => x.no === cur), k = s.dataset.tkSet;
      t[k] = k === "as" ? +s.value : s.value;
      t.msgs.push(["s", (k === "st" ? tr("تغيّرت الحالة إلى ", "Status changed to ") + TST[t.st][1] : k === "pri" ? tr("تغيّرت الأولوية إلى ", "Priority changed to ") + PRI[t.pri][1] : tr("أُسندت إلى ", "Assigned to ") + AGENTS[t.as][1]), tr("الآن", "now")]);
      list(); detail(); toast(tr("تم التحديث", "Updated"));
    });
    list(); detail();
  };

  // seller side: tickets with the platform
  const MYT = [
    Object.assign({}, TICKETS[1]),
    { no: "TKT-2610-0118", type: "seller", who: "", av: "PE", subj: tr("تأخر مراجعة 6 منتجات جديدة", "6 new products stuck in review"), cat: "products", pri: "normal", st: "resolved", sla: ["ok", ""], as: 1, upd: "19/10", order: "",
      msgs: [["c", tr("أضفنا 6 منتجات منذ 3 أيام وما زالت بانتظار المراجعة.", "We added 6 products 3 days ago and they're still in review."), "16/10"], ["a", tr("تمت مراجعة المنتجات ونشرها. منتج واحد يحتاج صورة أوضح للوحة البيانات.", "Reviewed and published. One item needs a clearer nameplate photo."), "19/10"]] },
    { no: "TKT-2609-0087", type: "seller", who: "", av: "PE", subj: tr("تغيير الحساب البنكي للتسويات", "Change payout bank account"), cat: "account", pri: "low", st: "resolved", sla: ["ok", ""], as: 2, upd: "28/09", order: "",
      msgs: [["c", tr("نرغب بتغيير الحساب البنكي، مرفق خطاب IBAN الجديد.", "We'd like to change our bank account; new IBAN letter attached."), "26/09", "iban_letter.pdf"], ["a", tr("تم التحديث بعد التحقق. التسوية القادمة على الحساب الجديد.", "Updated after verification. The next payout goes to the new account."), "28/09"]] }
  ];
  views["seller.support"] = () => head(tr("الدعم الفني", "Support"), tr("تواصل مع فريق NAS Market بخصوص الطلبات، المستحقات، المنتجات أو حسابك.", "Contact the NAS Market team about orders, payouts, products or your account."),
      '<button class="btn btn--primary btn--sm" data-open="#m-tk">' + icon("plus", "icon--sm") + tr("تذكرة جديدة", "New ticket") + "</button>") +
    '<div class="tk"><section class="panel tk-list"><div class="panel__head"><h2>' + tr("تذاكري", "My tickets") + '</h2><span class="badge badge--info">1 ' + tr("مفتوحة", "open") + '</span></div><div class="tk-items" id="tk-items"></div></section><section class="panel" id="tk-detail"></section></div>' +
    '<div class="modal" id="m-tk" aria-hidden="true" role="dialog" aria-labelledby="mtk-t"><form class="modal__box" id="tk-new"><div class="modal__head"><h2 id="mtk-t" style="font-size:16px">' + tr("تذكرة دعم جديدة", "New support ticket") + '</h2><button type="button" class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="modal__body form-grid">' +
    '<div class="form-grid form-grid--2"><div class="field"><label for="nt-c">' + tr("الموضوع يتعلق بـ", "Topic") + '</label><select class="select" id="nt-c">' + ["shipping", "payout", "products", "account", "tech", "returns"].map(k => '<option value="' + k + '">' + TCAT[k] + "</option>").join("") + '</select></div><div class="field"><label for="nt-o">' + tr("طلب مرتبط (اختياري)", "Related order (optional)") + '</label><select class="select" id="nt-o"><option value="">—</option>' + SORD.slice(0, 5).map(o => "<option>" + o.no + "</option>").join("") + "</select></div></div>" +
    '<div class="field"><label for="nt-s">' + tr("العنوان", "Subject") + '</label><input class="input" id="nt-s" required></div>' +
    '<div class="field"><label for="nt-d">' + tr("التفاصيل", "Details") + '</label><textarea class="textarea" id="nt-d" required></textarea></div>' +
    '<div class="field"><span class="label">' + tr("الأولوية", "Priority") + '</span><div class="swatches"><label><input type="radio" name="ntp" value="normal" checked>' + PRI.normal[1] + '</label><label><input type="radio" name="ntp" value="high">' + PRI.high[1] + "</label></div></div>" +
    '<label class="upload">' + icon("upload", "icon--lg") + "<span><strong>" + tr("إرفاق ملفات", "Attach files") + "</strong> " + tr("صور، PDF، أو Excel", "images, PDF or Excel") + '</span><input type="file" hidden multiple></label></div>' +
    '<div class="modal__foot"><button type="button" class="btn btn--line" data-close>' + tr("إلغاء", "Cancel") + '</button><button class="btn btn--primary">' + tr("إرسال التذكرة", "Submit ticket") + "</button></div></form></div>";

  views["seller.support"].after = () => {
    let cur = MYT[0].no;
    function list() { $("#tk-items").innerHTML = MYT.map(t => tkItem(t, cur, false)).join(""); }
    function detail() {
      const t = MYT.find(x => x.no === cur);
      $("#tk-detail").innerHTML = '<div class="tk-head">' + tkBack() + '<div class="tk-head__meta"><span class="mono">' + t.no + "</span><span>" + TCAT[t.cat] + "</span>" + (t.order ? '<span class="mono">' + t.order + "</span>" : "") + "</div><h2>" + esc(t.subj) + '</h2><div style="display:flex;gap:6px">' + badge(TST[t.st][0], TST[t.st][1]) + badge(PRI[t.pri][0], PRI[t.pri][1]) + "</div></div>" +
        '<div class="tthread">' + tkThread(t, false) + "</div>" +
        (t.st === "resolved" ? '<div class="tk-compose"><div class="alert alert--ok">' + icon("check") + "<span>" + tr("تم حل هذه التذكرة. إذا استمرت المشكلة يمكنك إعادة فتحها.", "This ticket is resolved. If the issue continues you can reopen it.") + '</span><button class="btn btn--sm btn--line" data-reopen>' + tr("إعادة فتح", "Reopen") + "</button></div></div>" :
          '<form class="tk-compose" id="tk-reply"><textarea class="textarea" style="min-height:90px" placeholder="' + tr("اكتب ردك…", "Write a reply…") + '" aria-label="reply"></textarea><div class="tk-compose__bar"><button type="button" class="btn btn--line btn--sm">' + icon("attach", "icon--sm") + tr("إرفاق", "Attach") + '</button><button class="btn btn--primary btn--sm">' + icon("send", "icon--sm") + tr("إرسال", "Send") + "</button></div></form>");
      const f = $("#tk-reply");
      if (f) f.addEventListener("submit", e => { e.preventDefault(); const v = f.querySelector("textarea").value.trim(); if (!v) return; t.msgs.push(["c", v, tr("الآن", "now")]); detail(); toast(tr("تم إرسال ردك", "Reply sent"), "send"); });
      const r = $("[data-reopen]"); if (r) r.onclick = () => { t.st = "open"; list(); detail(); };
    }
    $("#tk-items").addEventListener("click", e => { const b = e.target.closest("[data-tk]"); if (b) { cur = b.dataset.tk; list(); detail(); } });
    $("#tk-new").addEventListener("submit", e => {
      e.preventDefault();
      const t = { no: "TKT-2610-0143", type: "seller", av: "PE", subj: $("#nt-s").value, cat: $("#nt-c").value, pri: $('[name="ntp"]:checked').value, st: "open", sla: ["ok", ""], as: 0, upd: tr("الآن", "now"), order: $("#nt-o").value,
        msgs: [["c", $("#nt-d").value, tr("الآن", "now")], ["s", tr("وصلت تذكرتك. متوسط وقت الرد حالياً أقل من ساعتين.", "Ticket received. Current average response time is under 2 hours."), tr("الآن", "now")]] };
      MYT.unshift(t); cur = t.no; closeAll(); list(); detail(); e.target.reset();
      toast(tr("تم إنشاء التذكرة TKT-2610-0143", "Ticket TKT-2610-0143 created"));
    });
    list(); detail();
  };

  // ================= ADMIN: INTEGRATIONS (shipping carriers via API) =================
  const CARRIERS = [
    { id: "aramex", ini: "AX", name: "Aramex", c: "#C8102E", st: "live", def: true, svc: [tr("عادي", "Standard"), tr("سريع", "Express"), "COD", tr("إرجاع", "Returns")], stats: ["2,184", "99.6%", "1.8d"], desc: tr("الناقل الافتراضي · محلي", "Default carrier · domestic") },
    { id: "smsa", ini: "SM", name: "SMSA Express", c: "#1D3E8A", st: "sandbox", svc: [tr("عادي", "Standard"), "COD"], stats: ["38", "100%", "—"], desc: tr("قيد الاختبار · محلي وخليجي", "In testing · domestic & GCC") },
    { id: "dhl", ini: "DHL", name: "DHL Express", c: "#D40511", st: "off", svc: [tr("دولي", "International"), tr("سريع", "Express")], desc: tr("للشحن الدولي", "International shipping") },
    { id: "emx", ini: "EMX", name: "Emirates Post (EMX)", c: "#0B6E4F", st: "off", svc: [tr("عادي", "Standard"), tr("صناديق البريد", "PO boxes")], desc: tr("تغطية كل الإمارات", "Nationwide coverage") },
    { id: "quiqup", ini: "QQ", name: "Quiqup", c: "#5B2D8E", st: "off", svc: [tr("نفس اليوم", "Same day")], desc: tr("توصيل نفس اليوم داخل المدن", "Same-day city delivery") }
  ];
  const cst = c => c.st === "live" ? badge("ok", '<span class="dot"></span>' + tr("متصل · Live", "Connected · Live")) : c.st === "sandbox" ? badge("warn", '<span class="dot"></span>' + tr("متصل · Sandbox", "Connected · Sandbox")) : badge("", tr("غير متصل", "Not connected"));
  views["admin.integrations"] = () => {
    const logs = [
      ["10:42:18", "Aramex", "POST /shipping/v1/shipments", "NAS-261025-0051-2", 201, 412],
      ["10:41:55", "Aramex", "POST /shipping/v1/pickups", "PU-2610-0881", 200, 388],
      ["10:30:07", "Aramex", "WEBHOOK delivered", "ARX 7731 0042 20", 200, 41],
      ["10:12:44", "SMSA Express", "POST /api/shipments (sandbox)", "TEST-0038", 422, 265],
      ["09:58:31", "Aramex", "GET /tracking/v1/ARX77310042", "NAS-261024-0042-1", 200, 190],
      ["09:40:02", "Aramex", "POST /shipping/v1/shipments", "NAS-261024-0039-3", 500, 30012]
    ];
    const rates = [[tr("دبي، الشارقة، عجمان", "Dubai, Sharjah, Ajman"), 15, 35, 2], [tr("أبوظبي، العين", "Abu Dhabi, Al Ain"), 20, 45, 2], [tr("رأس الخيمة، الفجيرة، أم القيوين", "RAK, Fujairah, UAQ"), 22, 50, 2.5], [tr("المنطقة الغربية", "Al Dhafra"), 30, "—", 3]];
    return head(tr("التكاملات", "Integrations"), tr("ربط شركات الشحن عبر API: إنشاء البوليصة، حجز الاستلام، التتبع، والإرجاع تلقائياً.", "Connect carriers via API: labels, pickups, tracking and returns — automatically."),
        '<a class="btn btn--line btn--sm" href="#">' + icon("doc", "icon--sm") + tr("توثيق API", "API docs") + "</a>") +
      '<div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true" aria-controls="it-ship">' + icon("truck", "icon--sm") + tr("شركات الشحن", "Shipping carriers") + ' <span class="count">2/5</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="it-pay">' + icon("wallet", "icon--sm") + tr("الدفع", "Payments") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="it-not">' + icon("bell", "icon--sm") + tr("الإشعارات", "Notifications") + "</button></div>" +
      '<div id="it-ship" class="stack"><div class="carriers">' + CARRIERS.map(c => '<article class="panel carrier"><div class="carrier__top"><span class="carrier__logo" style="background:' + c.c + '">' + c.ini + "</span><div><h3>" + c.name + (c.def ? ' <span class="badge badge--volt" style="margin-inline-start:4px">' + tr("افتراضي", "Default") + "</span>" : "") + "</h3><p>" + c.desc + "</p></div></div>" +
        "<div>" + cst(c) + '</div><div class="chips-s">' + c.svc.map(x => "<span>" + x + "</span>").join("") + "</div>" +
        (c.stats ? '<div class="carrier__stats"><div><b>' + c.stats[0] + "</b>" + tr("شحنة هذا الشهر", "shipments / mo") + "</div><div><b>" + c.stats[1] + "</b>" + tr("نجاح API", "API success") + "</div><div><b>" + c.stats[2] + "</b>" + tr("متوسط التوصيل", "avg. delivery") + "</div></div>" : "") +
        '<div style="display:flex;gap:8px">' + (c.st === "off" ? '<button class="btn btn--primary btn--sm" data-carrier="' + c.id + '">' + icon("plug", "icon--sm") + tr("ربط", "Connect") + "</button>" : '<button class="btn btn--line btn--sm" data-carrier="' + c.id + '">' + icon("settings", "icon--sm") + tr("الإعدادات", "Settings") + '</button><button class="btn btn--line btn--sm" data-test>' + icon("refresh", "icon--sm") + tr("اختبار", "Test") + "</button>") + "</div></article>").join("") +
      '<button class="panel carrier carrier--add" data-carrier="custom">' + icon("plus") + "<b>" + tr("تكامل مخصص", "Custom integration") + '</b><span style="font-size:12.5px">' + tr("أي شركة شحن عبر REST API عام", "Any carrier via a generic REST API") + "</span></button></div>" +
      '<div class="grid-2"><section class="panel"><div class="panel__head"><h2>' + tr("سجل طلبات API", "API request log") + '</h2><div class="seg" role="group"><button aria-pressed="true">' + tr("الكل", "All") + '</button><button aria-pressed="false">' + tr("أخطاء", "Errors") + '</button></div></div><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("الوقت", "Time") + "</th><th>" + tr("الناقل", "Carrier") + "</th><th>" + tr("العملية", "Request") + "</th><th>" + tr("المرجع", "Reference") + '</th><th class="num">' + tr("الحالة", "Status") + '</th><th class="num">ms</th><th></th></tr></thead><tbody>' +
        logs.map((l, i) => '<tr><td class="mono">' + l[0] + "</td><td>" + l[1] + '</td><td class="mono" style="font-size:12px;white-space:nowrap">' + l[2] + '</td><td class="mono" style="font-size:12px">' + l[3] + '</td><td class="num">' + badge(l[4] < 300 ? "ok" : l[4] < 500 ? "warn" : "danger", l[4]) + '</td><td class="num mono">' + num(l[5]) + '</td><td><button class="icon-btn" aria-label="view" data-log="' + i + '">' + icon("eye") + "</button></td></tr>").join("") + "</tbody></table></div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' + tr("أسعار الشحن للمشتري", "Buyer shipping rates") + '</h2><button class="btn btn--sm btn--primary" data-rates>' + tr("حفظ", "Save") + '</button></div><div class="table-wrap"><table class="table" style="min-width:0"><thead><tr><th>' + tr("المنطقة", "Zone") + '</th><th class="num">' + tr("عادي", "Std.") + '</th><th class="num">' + tr("سريع", "Exp.") + '</th><th class="num">' + tr("كل كغ إضافي", "+ per kg") + "</th></tr></thead><tbody>" +
        rates.map(r => "<tr><td>" + r[0] + '</td><td class="num"><input class="input rate-input" value="' + r[1] + '" aria-label="standard"></td><td class="num"><input class="input rate-input" value="' + r[2] + '" aria-label="express"></td><td class="num"><input class="input rate-input" value="' + r[3] + '" aria-label="per kg"></td></tr>').join("") +
        '</tbody></table></div><div class="panel__body" style="border-top:1px solid var(--line);display:grid;gap:10px;font-size:13.5px"><label class="check"><input type="checkbox" checked> ' + tr("شحن مجاني للطلب الفرعي فوق", "Free shipping per sub-order over") + ' <input class="input rate-input" value="500" aria-label="threshold"> ' + tr("درهم", "AED") + '</label><label class="check"><input type="checkbox" checked> ' + tr("أول 5 كغ مشمولة في السعر الأساسي", "First 5 kg included in base rate") + "</label></div></section></div></div>" +
      '<div id="it-pay" hidden><div class="carriers"><article class="panel carrier"><div class="carrier__top"><span class="carrier__logo" style="background:var(--navy-800)">PG</span><div><h3>' + tr("[مزود الدفع]", "[Payment provider]") + "</h3><p>" + tr("بطاقات · Apple Pay · استرداد", "Cards · Apple Pay · refunds") + "</p></div></div>" + badge("warn", '<span class="dot"></span>' + tr("بانتظار تفعيل حساب التاجر (KYC)", "Awaiting merchant KYC")) + '<button class="btn btn--line btn--sm" style="justify-self:start">' + icon("settings", "icon--sm") + tr("الإعدادات", "Settings") + "</button></article></div></div>" +
      '<div id="it-not" hidden><div class="carriers"><article class="panel carrier"><div class="carrier__top"><span class="carrier__logo" style="background:var(--marine-700)">@</span><div><h3>' + tr("البريد الإلكتروني", "Email") + "</h3><p>" + tr("إشعارات الطلبات والتذاكر", "Order & ticket notifications") + "</p></div></div>" + badge("ok", '<span class="dot"></span>' + tr("متصل", "Connected")) + '</article><article class="panel carrier"><div class="carrier__top"><span class="carrier__logo" style="background:#1F7A4D">WA</span><div><h3>' + tr("واتساب و SMS", "WhatsApp & SMS") + "</h3><p>" + tr("المرحلة الثالثة", "Phase 3") + "</p></div></div>" + badge("", tr("غير مفعّل", "Not enabled")) + "</article></div></div>" +
      // carrier drawer
      '<aside class="drawer drawer--xl" id="d-carrier" aria-hidden="true" role="dialog" aria-labelledby="dc-t"><div class="drawer__head"><h2 id="dc-t" style="font-size:16px"></h2><button class="close-btn" data-close aria-label="close">' + icon("x") + "</button></div>" +
      '<div class="drawer__body"><div class="tabs" role="tablist" style="margin-bottom:16px"><button class="tab" role="tab" aria-selected="true" aria-controls="cc-conn">' + tr("الاتصال", "Connection") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="cc-svc">' + tr("الخدمات", "Services") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="cc-pick">' + tr("الاستلام", "Pickup") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="cc-hook">Webhook</button></div>' +
      '<div id="cc-conn" class="form-grid"><div class="field"><span class="label">' + tr("البيئة", "Environment") + '</span><div class="seg" role="group" style="justify-self:start"><button type="button" aria-pressed="false">Sandbox</button><button type="button" aria-pressed="true">Live</button></div></div>' +
        '<div class="form-grid form-grid--2"><div class="field"><label>Account Number</label><input class="input mono" dir="ltr" placeholder="e.g. 1234567"></div><div class="field"><label>Account PIN</label><input class="input mono" type="password" dir="ltr" placeholder="••••••"></div><div class="field"><label>Username</label><input class="input mono" dir="ltr" placeholder="api-user@company.ae"></div><div class="field"><label>Password / API key</label><input class="input mono" type="password" dir="ltr" placeholder="••••••••••••"></div><div class="field"><label>Account Entity</label><input class="input mono" dir="ltr" value="DXB"></div><div class="field"><label>Country</label><input class="input mono" dir="ltr" value="AE"></div></div>' +
        '<p class="muted" style="font-size:12px">' + tr("مفاتيح الربط تُستخرج من حساب شركتكم لدى الناقل، وتُحفظ مشفّرة ولا تظهر بعد الحفظ.", "Credentials come from your company's carrier account; they're stored encrypted and hidden after saving.") + "</p>" +
        '<button type="button" class="btn btn--line" style="justify-self:start" data-conn-test>' + icon("refresh", "icon--sm") + tr("اختبار الاتصال", "Test connection") + '</button><div class="alert alert--ok conn-result" id="conn-res">' + icon("check") + "<span>" + tr("تم الاتصال بنجاح — الاستجابة خلال 182ms. الحساب: Live · DXB", "Connected — responded in 182ms. Account: Live · DXB") + "</span></div></div>" +
      '<div id="cc-svc" class="form-grid" hidden><div class="table-wrap"><table class="table" style="min-width:0"><thead><tr><th>' + tr("خدمة المنصة", "Platform service") + "</th><th>" + tr("كود المنتج لدى الناقل", "Carrier product code") + "</th><th>" + tr("مفعّل", "On") + "</th></tr></thead><tbody>" +
        [[tr("شحن عادي", "Standard"), "DOM / OND"], [tr("شحن سريع", "Express"), "DOM / ONP"], [tr("الدفع عند الاستلام", "Cash on delivery"), "CODS"], [tr("شحنة إرجاع", "Return shipment"), "RTRN"]].map(r => "<tr><td>" + r[0] + '</td><td><input class="input mono" dir="ltr" value="' + r[1] + '" style="min-height:34px;padding:4px 8px"></td><td><label class="switch"><input type="checkbox" checked aria-label="on"></label></td></tr>').join("") + "</tbody></table></div>" +
        '<div class="field"><label>' + tr("صيغة البوليصة", "Label format") + '</label><select class="select"><option>PDF · A4</option><option>PDF · 4×6 thermal</option><option>ZPL · 4×6</option></select></div>' +
        '<label class="check"><input type="checkbox" checked> ' + tr("إنشاء البوليصة تلقائياً عند تأكيد البائع للطلب", "Create the label automatically when the seller confirms") + '</label><label class="check"><input type="checkbox" checked> ' + tr("تقسيم الطلب لشحنة مستقلة لكل بائع", "One shipment per seller (split orders)") + '</label><label class="check"><input type="checkbox" checked> ' + tr("تحصيل مبالغ الدفع عند الاستلام عبر الناقل ومطابقتها", "Collect COD via carrier and reconcile") + "</label></div>" +
      '<div id="cc-pick" class="form-grid" hidden><div class="optcards"><label class="optcard"><input type="radio" name="pk" checked><span class="optcard__main"><b>' + tr("من مستودع كل بائع", "From each seller's warehouse") + "</b><span>" + tr("يُحجز الاستلام على عنوان البائع المسجّل", "Pickup booked at the seller's registered address") + '</span></span></label><label class="optcard"><input type="radio" name="pk"><span class="optcard__main"><b>' + tr("من مستودع المنصة", "From the platform warehouse") + "</b><span>" + tr("للبائعين المشتركين بخدمة التخزين", "For sellers using fulfilment") + "</span></span></label></div>" +
        '<div class="form-grid form-grid--2"><div class="field"><label>' + tr("نافذة الاستلام", "Pickup window") + '</label><select class="select"><option>10:00 – 14:00</option><option>14:00 – 18:00</option></select></div><div class="field"><label>' + tr("آخر موعد لحجز نفس اليوم", "Same-day cut-off") + '</label><input class="input mono" type="time" value="12:00"></div></div><label class="check"><input type="checkbox" checked> ' + tr("حجز الاستلام تلقائياً بعد إنشاء البوليصة", "Book pickup automatically after the label") + "</label></div>" +
      '<div id="cc-hook" class="form-grid" hidden><div class="field"><span class="label">' + tr("رابط استقبال التحديثات", "Webhook URL") + '</span><div class="copyfield"><input readonly value="https://api.nasmarket.ae/webhooks/shipping/aramex" aria-label="webhook url"><button type="button" data-copyhook>' + icon("copy", "icon--sm") + tr("نسخ", "Copy") + "</button></div></div>" +
        '<div class="field"><span class="label">Signing secret</span><div class="copyfield"><input readonly value="whsec_••••••••••••••••" aria-label="secret"><button type="button">' + icon("refresh", "icon--sm") + tr("تجديد", "Rotate") + "</button></div></div>" +
        '<div class="table-wrap"><table class="table" style="min-width:0"><thead><tr><th>' + tr("حدث الناقل", "Carrier event") + "</th><th>" + tr("حالة الطلب في المنصة", "Platform status") + "</th></tr></thead><tbody>" +
        [["SH005 · Picked up", ST.shipped[0]], ["SH014 · Out for delivery", ST.shipped[0]], ["SH006 · Delivered", ST.delivered[0]], ["SH069 · Returned to shipper", ST.returned[0]], ["SH008 · Exception", tr("تنبيه للدعم", "Alert support")]].map(r => '<tr><td class="mono" style="font-size:12px">' + r[0] + "</td><td>" + r[1] + "</td></tr>").join("") + "</tbody></table></div></div></div>" +
      '<div class="drawer__foot" style="display:flex;gap:8px;justify-content:space-between"><button class="btn btn--danger" data-close>' + tr("فصل الربط", "Disconnect") + '</button><button class="btn btn--primary" data-carrier-save>' + tr("حفظ", "Save") + "</button></div></aside>" +
      '<div class="modal" id="m-log" aria-hidden="true" role="dialog" aria-labelledby="ml-t"><div class="modal__box" style="width:min(720px,100%)"><div class="modal__head"><h2 id="ml-t" style="font-size:16px" class="mono"></h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="modal__body" id="ml-b" style="display:grid;gap:12px"></div></div></div>';
  };
  views["admin.integrations"].after = () => {
    document.addEventListener("click", e => {
      const c = e.target.closest("[data-carrier]");
      if (c) { const cr = CARRIERS.find(x => x.id === c.dataset.carrier); $("#dc-t").textContent = cr ? cr.name : tr("تكامل مخصص", "Custom integration"); $("#conn-res").classList.remove("is-on"); open("#d-carrier"); }
      if (e.target.closest("[data-conn-test]")) { const r = $("#conn-res"); r.classList.remove("is-on"); setTimeout(() => r.classList.add("is-on"), 450); }
      if (e.target.closest("[data-test]")) toast(tr("الاتصال يعمل — 182ms", "Connection OK — 182ms"), "plug");
      if (e.target.closest("[data-carrier-save]")) { closeAll(); toast(tr("تم حفظ إعدادات الناقل", "Carrier settings saved")); }
      if (e.target.closest("[data-rates]")) toast(tr("تم حفظ أسعار الشحن", "Shipping rates saved"));
      if (e.target.closest("[data-copyhook]")) { try { navigator.clipboard.writeText("https://api.nasmarket.ae/webhooks/shipping/aramex"); } catch (_) {} toast(tr("تم نسخ الرابط", "URL copied"), "copy"); }
      const sg = e.target.closest(".seg button"); if (sg) $$("button", sg.parentNode).forEach(b => b.setAttribute("aria-pressed", b === sg));
      const lg = e.target.closest("[data-log]");
      if (lg) {
        const err = +lg.dataset.log === 5, val = +lg.dataset.log === 3;
        $("#ml-t").textContent = err ? "POST /shipping/v1/shipments → 500" : val ? "POST /api/shipments → 422" : "POST /shipping/v1/shipments → 201";
        $("#ml-b").innerHTML = '<span class="label">Request</span><pre class="code">{\n  <span class="k">"Reference1"</span>: <span class="s">"NAS-261025-0051-2"</span>,\n  <span class="k">"Shipper"</span>: { <span class="k">"City"</span>: <span class="s">"Sharjah"</span>, <span class="k">"Name"</span>: <span class="s">"PowerSource Electric"</span> },\n  <span class="k">"Consignee"</span>: { <span class="k">"City"</span>: <span class="s">"Dubai"</span>, <span class="k">"Name"</span>: <span class="s">"Ahmed K."</span> },\n  <span class="k">"Details"</span>: { <span class="k">"ProductType"</span>: <span class="s">"OND"</span>, <span class="k">"ActualWeight"</span>: 24, <span class="k">"NumberOfPieces"</span>: 1,\n               <span class="k">"Services"</span>: <span class="s">""</span>, <span class="k">"CashOnDeliveryAmount"</span>: null }\n}</pre>' +
          '<span class="label">Response</span><pre class="code">' + (err ? '{ <span class="k">"HasErrors"</span>: true, <span class="k">"Notifications"</span>: [{ <span class="k">"Code"</span>: <span class="s">"ERR52"</span>, <span class="k">"Message"</span>: <span class="s">"Upstream timeout after 30000ms"</span> }] }' : val ? '{ <span class="k">"errors"</span>: { <span class="k">"consignee.phone"</span>: [<span class="s">"invalid format"</span>] } }' : '{ <span class="k">"HasErrors"</span>: false, <span class="k">"Shipments"</span>: [{ <span class="k">"ID"</span>: <span class="s">"77310051002"</span>, <span class="k">"ShipmentLabel"</span>: { <span class="k">"LabelURL"</span>: <span class="s">"https://…/label.pdf"</span> } }] }') + "</pre>" +
          (err ? '<div class="alert alert--warn">' + icon("alert") + "<span>" + tr("أُعيدت المحاولة تلقائياً بعد دقيقة ونجحت (201).", "Retried automatically after 1 minute and succeeded (201).") + "</span></div>" : "");
        open("#m-log");
      }
    });
  };

  // ================= NOTIFICATIONS (bell + admin notification center) =================
  const NKIND = { info: ["info", tr("معلومة", "Info")], warn: ["warn", tr("تنبيه", "Heads-up")], urgent: ["urgent", tr("عاجل", "Urgent")], ok: ["ok", tr("تأكيد", "Confirmation")] };
  const NICON = { info: "info", warn: "alert", urgent: "alert", ok: "check" };
  const SELLER_NOTIFS = [
    { kind: "warn", title: { ar: "4 طلبات بانتظار تأكيدك", en: "4 orders awaiting your confirmation" }, body: { ar: "الطلبات غير المؤكدة خلال 24 ساعة تُلغى تلقائياً.", en: "Orders not confirmed within 24h are cancelled automatically." }, time: "09:14", read: false, from: "system" },
    { kind: "ok", title: { ar: "تم تحويل التسوية PO-2610-01", en: "Payout PO-2610-01 sent" }, body: { ar: "18,240 درهم إلى حسابك المنتهي بـ 812.", en: "AED 18,240 to your account ending 812." }, time: "15/10", read: true, from: "system" },
    { kind: "info", title: { ar: "رد جديد على تذكرة الدعم", en: "New reply on your support ticket" }, body: { ar: "TKT-2610-0141 · فريق دعم NAS Market", en: "TKT-2610-0141 · NAS Market support" }, time: "09:20", read: false, from: "system" }
  ];
  const ADMIN_NOTIFS = [
    { kind: "info", title: { ar: "طلب انضمام جديد: الوطنية للمعدات الثقيلة", en: "New seller application: National Heavy Equipment" }, body: { ar: "المستندات مكتملة وبانتظار المراجعة.", en: "Documents complete, awaiting review." }, time: "10:02", read: false, from: "system" },
    { kind: "urgent", title: { ar: "تذكرة تجاوزت مهلة الرد", en: "Ticket breached SLA" }, body: { ar: "TKT-2610-0135 · المنتج المستلم مختلف عن الوصف", en: "TKT-2610-0135 · Item doesn't match listing" }, time: "09:05", read: false, from: "system" },
    { kind: "warn", title: { ar: "خطأ 500 من Aramex API", en: "Aramex API returned 500" }, body: { ar: "أُعيدت المحاولة ونجحت تلقائياً.", en: "Retried and succeeded automatically." }, time: "09:40", read: true, from: "system" }
  ];
  const sentNotifs = () => { try { return JSON.parse(localStorage.getItem("nas_notifs")) || []; } catch (e) { return []; } };
  function bellList() {
    return APP === "seller" ? sentNotifs().map(n => Object.assign({ from: "admin" }, n)).concat(SELLER_NOTIFS) : ADMIN_NOTIFS;
  }
  function nItem(n) {
    const k = n.kind || "info";
    return '<div class="nitem nitem--' + k + (n.read ? "" : " is-unread") + '"><span class="nitem__ic">' + icon(NICON[k]) + "</span><div>" +
      (n.from === "admin" ? '<span class="nitem__from">' + tr("من إدارة NAS Market", "From NAS Market admin") + "</span>" : "") +
      "<b>" + esc((n.title || {})[bnLang] || (n.title || {}).ar || "") + "</b><p>" + esc((n.body || {})[bnLang] || (n.body || {}).ar || "") + "</p><time>" + esc(n.time || "") + "</time></div></div>";
  }
  function bellHTML() {
    const list = bellList(), unread = list.filter(n => !n.read).length;
    return '<div class="bell-wrap"><button class="top__btn" id="bell" aria-label="' + tr("الإشعارات", "Notifications") + '" aria-expanded="false" aria-controls="notif-pop">' + icon("bell") + (unread ? '<span class="n">' + unread + "</span>" : "") + "</button>" +
      '<div class="notif-pop" id="notif-pop" role="dialog" aria-label="' + tr("الإشعارات", "Notifications") + '"><div class="notif-pop__head"><h3>' + tr("الإشعارات", "Notifications") + '</h3><button class="link" style="font-size:12.5px" data-markread>' + tr("تعليم الكل كمقروء", "Mark all read") + '</button></div><div class="notif-pop__list">' + list.map(nItem).join("") + "</div></div></div>";
  }
  document.addEventListener("click", e => {
    const pop = $("#notif-pop"); if (!pop) return;
    if (e.target.closest("#bell")) { const on = !pop.classList.contains("is-open"); pop.classList.toggle("is-open", on); $("#bell").setAttribute("aria-expanded", on); return; }
    if (e.target.closest("[data-markread]")) {
      if (APP === "seller") { const s = sentNotifs().map(n => Object.assign(n, { read: true })); try { localStorage.setItem("nas_notifs", JSON.stringify(s)); } catch (_) {} SELLER_NOTIFS.forEach(n => (n.read = true)); }
      else ADMIN_NOTIFS.forEach(n => (n.read = true));
      $(".bell-wrap").outerHTML = bellHTML(); $("#notif-pop").classList.add("is-open"); return;
    }
    if (!e.target.closest(".notif-pop")) pop.classList.remove("is-open");
  });

  // Email templates (variables in {{ }})
  const VARS = [["seller_name", tr("اسم البائع", "Seller name")], ["store_name", tr("اسم المتجر", "Store name")], ["license_expiry", tr("تاريخ انتهاء الرخصة", "Licence expiry")], ["payout_amount", tr("مبلغ التسوية", "Payout amount")], ["payout_date", tr("تاريخ التسوية", "Payout date")], ["dashboard_link", tr("رابط اللوحة", "Dashboard link")]];
  const SAMPLE = { seller_name: tr("سامي رضا", "Sami Reda"), store_name: tr("مصدر الطاقة للكهربائيات", "PowerSource Electric"), license_expiry: "2026-11-12", payout_amount: tr("18,240 درهم", "AED 18,240"), payout_date: "01/11/2026", dashboard_link: "nasmarket.ae/seller" };
  const TPLS = [
    { id: "t1", auto: true, trig: tr("عند موافقة الإدارة على البائع", "When admin approves a seller"), kind: "ok", used: 214, edited: "12/10",
      name: tr("ترحيب وتفعيل المتجر", "Welcome & store activated"),
      subj: { ar: "تم تفعيل متجرك على NAS Market", en: "Your NAS Market store is live" },
      body: { ar: "مرحباً {{seller_name}}،\n\nيسعدنا إبلاغك بأن متجر «{{store_name}}» أصبح مفعّلاً ويمكنك البدء بإضافة منتجاتك.\n\nننصحك بالبدء باستيراد منتجاتك من ملف Excel لتوفير الوقت.", en: "Hello {{seller_name}},\n\nGreat news — “{{store_name}}” is now live and you can start adding products.\n\nTip: import your catalogue from Excel to save time." },
      cta: { ar: "الدخول إلى لوحة البائع", en: "Open Seller Central" } },
    { id: "t2", auto: true, trig: tr("قبل 30 يوماً من انتهاء الرخصة", "30 days before licence expiry"), kind: "warn", used: 9, edited: "05/10",
      name: tr("تذكير بانتهاء الرخصة التجارية", "Trade licence expiry reminder"),
      subj: { ar: "رخصتك التجارية تنتهي في {{license_expiry}}", en: "Your trade licence expires on {{license_expiry}}" },
      body: { ar: "مرحباً {{seller_name}}،\n\nتنتهي الرخصة التجارية لمتجر «{{store_name}}» بتاريخ {{license_expiry}}. يرجى رفع الرخصة المجددة من لوحة البائع لتجنب إيقاف المتجر مؤقتاً.", en: "Hello {{seller_name}},\n\nThe trade licence for “{{store_name}}” expires on {{license_expiry}}. Please upload the renewed licence to avoid a temporary suspension." },
      cta: { ar: "رفع الرخصة المجددة", en: "Upload renewed licence" } },
    { id: "t3", auto: true, trig: tr("عند تنفيذ التسوية", "When a payout is sent"), kind: "ok", used: 412, edited: "01/10",
      name: tr("تم تحويل التسوية", "Payout sent"),
      subj: { ar: "تم تحويل {{payout_amount}} إلى حسابك", en: "{{payout_amount}} is on its way" },
      body: { ar: "مرحباً {{seller_name}}،\n\nتم تحويل مستحقاتك بقيمة {{payout_amount}} بتاريخ {{payout_date}}. قد يستغرق ظهور المبلغ حتى 3 أيام عمل حسب البنك.\n\nكشف الحساب التفصيلي متاح في لوحة البائع.", en: "Hello {{seller_name}},\n\nWe sent your payout of {{payout_amount}} on {{payout_date}}. It can take up to 3 business days to appear, depending on your bank.\n\nThe detailed statement is in Seller Central." },
      cta: { ar: "عرض كشف الحساب", en: "View statement" } },
    { id: "t4", auto: false, kind: "info", used: 1, edited: "20/10",
      name: tr("تحديث نسب العمولات", "Commission rate update"),
      subj: { ar: "تحديث على نسب العمولة اعتباراً من 1 ديسمبر", en: "Commission rates update from 1 December" },
      body: { ar: "مرحباً {{seller_name}}،\n\nنود إبلاغك بتحديث نسب العمولة لبعض الأقسام اعتباراً من 1 ديسمبر 2026. النسب الجديدة لا تنطبق على الطلبات السابقة.\n\nيمكنك مراجعة جدول النسب الكامل من لوحة البائع.", en: "Hello {{seller_name}},\n\nCommission rates for some categories change from 1 December 2026. New rates don't apply to earlier orders.\n\nSee the full rate table in Seller Central." },
      cta: { ar: "عرض النسب الجديدة", en: "View new rates" } },
    { id: "t5", auto: false, kind: "info", used: 3, edited: "18/10",
      name: tr("دعوة للمشاركة في حملة عروض", "Invitation to join a sales campaign"),
      subj: { ar: "شارك بعروض الجمعة البيضاء على NAS Market", en: "Join the White Friday deals on NAS Market" },
      body: { ar: "مرحباً {{seller_name}}،\n\nنحضّر لحملة الجمعة البيضاء (27–30 نوفمبر) مع بنر رئيسي وإعلانات. سجّل منتجاتك المشاركة بخصم 10% على الأقل قبل 15 نوفمبر لتظهر في صفحة الحملة.", en: "Hello {{seller_name}},\n\nWe're preparing White Friday (27–30 Nov) with a home banner and ads. Register products with at least 10% off before 15 Nov to be featured." },
      cta: { ar: "سجّل منتجاتك", en: "Register products" } },
    { id: "t6", auto: true, trig: tr("عند رفض منتج في المراجعة", "When a product is rejected"), kind: "warn", used: 37, edited: "02/10",
      name: tr("منتج يحتاج تعديل", "Product needs changes"),
      subj: { ar: "منتج في متجرك يحتاج تعديلاً قبل النشر", en: "A product needs changes before publishing" },
      body: { ar: "مرحباً {{seller_name}}،\n\nراجع فريقنا أحد منتجاتك ويحتاج تعديلاً بسيطاً قبل نشره: صورة أوضح للوحة البيانات ورقم القطعة.", en: "Hello {{seller_name}},\n\nOur team reviewed one of your products. It needs a small change before going live: a clearer nameplate photo and the part number." },
      cta: { ar: "تعديل المنتج", en: "Edit product" } },
    { id: "t7", auto: false, kind: "urgent", used: 2, edited: "11/09",
      name: tr("تحديث الشروط والسياسات", "Terms & policy update"),
      subj: { ar: "تحديث على اتفاقية البائعين", en: "Seller agreement update" },
      body: { ar: "مرحباً {{seller_name}}،\n\nقمنا بتحديث اتفاقية البائعين وسياسة الإرجاع. تسري التعديلات بعد 14 يوماً من تاريخ هذه الرسالة.", en: "Hello {{seller_name}},\n\nWe've updated the seller agreement and returns policy. Changes take effect 14 days from this message." },
      cta: { ar: "قراءة الاتفاقية", en: "Read the agreement" } }
  ];
  const fillVars = (s, mark) => s.replace(/\{\{(\w+)\}\}/g, (m, k) => mark ? '<span class="var">' + esc(SAMPLE[k] || m) + "</span>" : (SAMPLE[k] || m));
  function emailHTML(d, lang) {
    const subj = d.subj[lang] || "", body = d.body[lang] || "", cta = d.cta[lang] || "";
    return '<div class="email"><div class="email__meta"><span>' + tr("من", "From") + ": <bdi><b>NAS Market</b> &lt;no-reply@nasmarket.ae&gt;</bdi></span><span>" + tr("إلى", "To") + ": <bdi>" + esc(SAMPLE.store_name) + " &lt;owner@powersource.ae&gt;</bdi></span><span>" + tr("الموضوع", "Subject") + ": <b>" + esc(fillVars(subj)) + '</b></span></div><div class="email__canvas"><div class="email__frame" dir="' + (lang === "en" ? "ltr" : "rtl") + '"><div class="email__head">' + brand("#") + wave() + '</div><div class="email__body"><h2>' + fillVars(esc(subj), true) + "</h2>" +
      esc(body).split("\n\n").map(p => "<p>" + fillVars(p.replace(/\n/g, "<br>"), true) + "</p>").join("") +
      (cta ? '<a class="email__cta" href="#">' + esc(cta) + "</a>" : "") + '</div><div class="email__foot">' + (lang === "en" ? "You're receiving this because you sell on NAS Market. · NAS Market, Dubai, UAE · [address placeholder]" : "وصلتك هذه الرسالة لأنك بائع على NAS Market. · NAS Market، دبي، الإمارات · [العنوان]") + "</div></div></div></div>";
  }

  const SEGMENTS = [["all", tr("كل البائعين", "All sellers"), 214], ["cat", tr("حسب القسم", "By category"), 0], ["status", tr("حسب الحالة", "By status"), 0], ["pick", tr("بائعون محددون", "Specific sellers"), 0]];
  const STATUS_SEG = [["active", tr("نشط", "Active"), 214], ["license", tr("رخصة تنتهي خلال 30 يوم", "Licence expiring in 30 days"), 9], ["review", tr("لديهم منتجات بانتظار المراجعة", "Products in review"), 3], ["suspended", tr("موقوف", "Suspended"), 3], ["new", tr("انضموا هذا الشهر", "Joined this month"), 11]];
  const CAT_COUNT = { marine: 31, electrical: 58, hvac: 27, automation: 19, mech: 36, pumps: 29, tools: 44, safety: 12 };

  views["admin.notifications"] = () => head(tr("مركز الإشعارات", "Notification center"), tr("أرسل إشعارات داخل لوحة البائعين وبريداً إلكترونياً من قوالب جاهزة، فوراً أو بموعد مجدول.", "Send in-dashboard notifications and template emails to sellers — now or scheduled."),
      '<button class="btn btn--line btn--sm" data-gotab="nt-tpl">' + icon("mail", "icon--sm") + tr("قوالب البريد", "Email templates") + "</button>") +
    '<div class="kpis">' + kpi(tr("أُرسلت هذا الشهر", "Sent this month"), "send", "1,284", "", tr("إشعار وبريد", "notifications & emails")) + kpi(tr("نسبة التسليم", "Delivery rate"), "check", "99.2%", "", tr("بريد إلكتروني", "email")) + kpi(tr("نسبة الفتح", "Open rate"), "eye", "64%", "", delta(5.2) + tr(" عن الشهر الماضي", " vs last month")) + kpi(tr("قوالب تلقائية", "Automatic templates"), "refresh", "4", "", tr("تُرسل عند حدوث الحدث", "triggered by events"), true) + "</div>" +
    '<div class="tabs" role="tablist" id="nc-tabs"><button class="tab" role="tab" aria-selected="true" aria-controls="nt-new" id="tb-new">' + icon("send", "icon--sm") + tr("إرسال إشعار", "Compose") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="nt-tpl" id="tb-tpl">' + icon("mail", "icon--sm") + tr("القوالب", "Templates") + ' <span class="count">' + TPLS.length + '</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="nt-log" id="tb-log">' + icon("clock", "icon--sm") + tr("سجل الإرسال", "History") + "</button></div>" +
    // compose
    '<div id="nt-new" class="nc"><form class="panel panel__body form-grid" id="nc-form">' +
      '<div class="field"><span class="label">1 · ' + tr("المستلمون", "Recipients") + '</span><div class="aud">' + SEGMENTS.map((s, i) => '<label class="optcard"><input type="radio" name="seg" value="' + s[0] + '"' + (i ? "" : " checked") + '><span class="optcard__main"><b>' + s[1] + "</b></span>" + (s[2] ? '<span class="optcard__side">' + s[2] + "</span>" : "") + "</label>").join("") + "</div>" +
      '<div class="aud__extra" data-seg="cat" hidden><div class="picks">' + D.categories.map(c => '<label><input type="checkbox" name="cats" value="' + c.id + '"' + (c.id === "electrical" ? " checked" : "") + ">" + cn(c) + ' <span class="mono" style="opacity:.7">' + CAT_COUNT[c.id] + "</span></label>").join("") + "</div></div>" +
      '<div class="aud__extra" data-seg="status" hidden><div class="picks">' + STATUS_SEG.map((s, i) => '<label><input type="radio" name="st" value="' + s[0] + '"' + (i === 1 ? " checked" : "") + ">" + s[1] + ' <span class="mono" style="opacity:.7">' + s[2] + "</span></label>").join("") + "</div></div>" +
      '<div class="aud__extra" data-seg="pick" hidden><input class="input" placeholder="' + tr("ابحث عن بائع بالاسم أو رقم الرخصة", "Search seller by name or licence no.") + '" aria-label="search"><div class="picks" style="margin-top:8px">' + D.vendors.map((v, i) => '<label><input type="checkbox" name="vs" value="' + v.id + '"' + (i < 2 ? " checked" : "") + ">" + vn(v) + "</label>").join("") + '</div></div><div class="rcpt">' + icon("users") + '<span>' + tr("سيصل إلى", "Will reach") + ' <b id="rc-n">214</b> ' + tr("بائعاً", "sellers") + "</span></div></div>" +
      '<div class="field"><span class="label">2 · ' + tr("القنوات", "Channels") + '</span><div class="chans"><label><input type="checkbox" name="ch" value="app" checked>' + icon("bell", "icon--sm") + tr("إشعار داخل لوحة البائع", "In-dashboard notification") + '</label><label><input type="checkbox" name="ch" value="email" checked>' + icon("mail", "icon--sm") + tr("بريد إلكتروني", "Email") + '</label><label class="is-off" title="' + tr("المرحلة الثالثة", "Phase 3") + '"><input type="checkbox" disabled>' + icon("phone", "icon--sm") + tr("SMS / واتساب", "SMS / WhatsApp") + "</label></div></div>" +
      '<div class="field"><label for="nc-tpl">3 · ' + tr("القالب", "Template") + '</label><select class="select" id="nc-tpl"><option value="">' + tr("بدون قالب — كتابة حرة", "No template — write freely") + "</option>" + TPLS.map(t => '<option value="' + t.id + '"' + (t.id === "t2" ? " selected" : "") + ">" + t.name + (t.auto ? " · " + tr("تلقائي", "auto") : "") + "</option>").join("") + "</select></div>" +
      '<div class="form-grid form-grid--2"><div class="field"><label for="nc-kind">' + tr("نوع الإشعار", "Type") + '</label><select class="select" id="nc-kind">' + Object.keys(NKIND).map(k => '<option value="' + k + '">' + NKIND[k][1] + "</option>").join("") + '</select></div><div class="field"><label for="nc-link">' + tr("رابط الزر", "Button link") + '</label><select class="select" id="nc-link"><option>' + tr("لوحة البائع — الرئيسية", "Seller Central — home") + "</option><option>" + tr("المنتجات", "Products") + "</option><option>" + tr("الأرباح والكشوف", "Earnings") + "</option><option>" + tr("إعدادات المستندات", "Documents") + "</option></select></div></div>" +
      '<div class="tabs" role="tablist" id="nc-langs"><button type="button" class="tab" role="tab" aria-selected="true" aria-controls="nl-ar" data-l="ar">العربية</button><button type="button" class="tab" role="tab" aria-selected="false" aria-controls="nl-en" data-l="en">English</button></div>' +
      ["ar", "en"].map((l, i) => '<div id="nl-' + l + '" class="form-grid"' + (i ? " hidden" : "") + ' dir="' + (l === "en" ? "ltr" : "rtl") + '"><div class="field"><label>' + tr("العنوان / موضوع البريد", "Title / email subject") + '</label><input class="input" data-nk="subj.' + l + '"></div><div class="field"><label>' + tr("النص", "Message") + '</label><textarea class="textarea" style="min-height:150px" data-nk="body.' + l + '"></textarea></div><div class="field"><label>' + tr("نص الزر", "Button text") + '</label><input class="input" data-nk="cta.' + l + '"></div></div>').join("") +
      '<div class="field"><span class="label">' + tr("إدراج متغيّر", "Insert variable") + '</span><div class="vars">' + VARS.map(v => '<button type="button" data-var="' + v[0] + '" title="' + v[1] + '">{{' + v[0] + "}}</button>").join("") + '</div><span class="hint">' + tr("تُستبدل تلقائياً ببيانات كل بائع عند الإرسال.", "Replaced with each seller's data on send.") + "</span></div>" +
      '<p class="muted" style="font-size:12px">' + tr("كل بائع يستلم الرسالة بلغة حسابه (عربي أو إنجليزي).", "Each seller receives it in their account language (Arabic or English).") + "</p>" +
      '<div class="field"><span class="label">4 · ' + tr("موعد الإرسال", "When") + '</span><div class="optcards optcards--2"><label class="optcard"><input type="radio" name="when" value="now" checked><span class="optcard__main"><b>' + tr("الآن", "Now") + '</b></span></label><label class="optcard"><input type="radio" name="when" value="later"><span class="optcard__main"><b>' + tr("جدولة", "Schedule") + '</b><input class="input mono" type="datetime-local" value="2026-11-01T09:00" style="min-height:36px;margin-top:6px" aria-label="date"></span></label></div></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--line)"><button type="button" class="btn btn--line" data-testsend>' + icon("mail", "icon--sm") + tr("إرسال تجريبي لبريدي", "Send me a test") + '</button><button class="btn btn--primary">' + icon("send", "icon--sm") + tr("إرسال", "Send") + "</button></div></form>" +
      '<aside class="nc__prev stack"><div class="tabs" role="tablist" id="pv-tabs"><button class="tab" role="tab" aria-selected="true" aria-controls="pv-mail">' + icon("mail", "icon--sm") + tr("معاينة البريد", "Email preview") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="pv-app">' + icon("bell", "icon--sm") + tr("داخل اللوحة", "In dashboard") + '</button></div><div id="pv-mail"></div><div id="pv-app" hidden><div class="panel" style="overflow:hidden"><div class="notif-pop__head"><h3>' + tr("الإشعارات", "Notifications") + '</h3><span class="muted" style="font-size:12px">' + tr("كما يراها البائع", "As the seller sees it") + '</span></div><div id="pv-app-item"></div></div></div></aside></div>' +
    // templates
    '<div id="nt-tpl" hidden class="stack"><div class="alert alert--info">' + icon("info") + "<span>" + tr("القوالب التلقائية تُرسل وحدها عند حدوث الحدث (موافقة، تسوية، انتهاء رخصة…). القوالب اليدوية تستخدمها من «إرسال إشعار».", "Automatic templates send themselves when the event happens (approval, payout, licence expiry…). Manual ones are used from Compose.") + '</span></div><div class="tpls">' +
      TPLS.map(t => '<button class="panel tpl" data-tpl="' + t.id + '"><div class="tpl__top"><h3>' + t.name + "</h3>" + (t.auto ? badge("ok", tr("تلقائي", "Automatic")) : badge("", tr("يدوي", "Manual"))) + "</div><p>" + esc(fillVars(t.subj[bnLang])) + "</p>" + (t.auto ? '<span class="tpl__trig">' + icon("refresh") + t.trig + "</span>" : "") + '<div class="chips-s"><span>' + tr("إشعار", "In-app") + "</span><span>" + tr("بريد", "Email") + "</span><span>AR · EN</span></div><div class=\"tpl__meta\"><span>" + tr("استُخدم", "Used") + " " + num(t.used) + "×</span><span>" + tr("آخر تعديل", "Edited") + " " + t.edited + "</span></div></button>").join("") +
      '<button class="panel tpl carrier--add" data-tpl-new>' + icon("plus") + "<b>" + tr("قالب جديد", "New template") + "</b></button></div></div>" +
    // history
    '<div id="nt-log" hidden><section class="panel"><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("الإشعار", "Notification") + "</th><th>" + tr("المستلمون", "Audience") + "</th><th>" + tr("القنوات", "Channels") + "</th><th>" + tr("التاريخ", "Date") + '</th><th class="num">' + tr("العدد", "Sent") + "</th><th>" + tr("التسليم", "Delivered") + "</th><th>" + tr("الفتح", "Opened") + "</th><th>" + tr("الحالة", "Status") + '</th></tr></thead><tbody id="nc-log"></tbody></table></div></section></div>' +
    // template editor drawer
    '<aside class="drawer drawer--xl" id="d-tpl" aria-hidden="true" role="dialog" aria-labelledby="dt-t"><div class="drawer__head"><h2 id="dt-t" style="font-size:16px"></h2><button class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="drawer__body" id="dt-b"></div><div class="drawer__foot" style="display:flex;gap:8px;justify-content:flex-end"><button class="btn btn--line" data-use-tpl>' + icon("send", "icon--sm") + tr("استخدام للإرسال", "Use to send") + '</button><button class="btn btn--primary" data-save-tpl>' + tr("حفظ القالب", "Save template") + "</button></div></aside>";

  views["admin.notifications"].after = () => {
    const form = $("#nc-form");
    let draft = { subj: {}, body: {}, cta: {} }, plang = bnLang, lastFocus = null, editTpl = null;
    const LOG = [
      [tr("تذكير بانتهاء الرخصة التجارية", "Licence expiry reminder"), tr("رخصة تنتهي خلال 30 يوم", "Licence expiring ≤30d"), "app+email", "20/10/2026", 9, 100, 78, "sent"],
      [tr("تحديث نسب العمولات", "Commission rate update"), tr("كل البائعين", "All sellers"), "app+email", "20/10/2026", 214, 99, 71, "sent"],
      [tr("دعوة للمشاركة في حملة عروض", "Sales campaign invitation"), tr("قسم: كهرباء، أدوات", "Category: Electrical, Tools"), "email", "01/11/2026 09:00", 102, 0, 0, "scheduled"],
      [tr("صيانة مجدولة للمنصة", "Scheduled maintenance"), tr("كل البائعين", "All sellers"), "app", "12/10/2026", 211, 100, 88, "sent"]
    ];
    function renderLog() {
      $("#nc-log").innerHTML = LOG.map(r => "<tr><td><b>" + esc(r[0]) + "</b></td><td>" + esc(r[1]) + '</td><td><div class="chips-s">' + r[2].split("+").map(c => "<span>" + (c === "app" ? tr("إشعار", "In-app") : tr("بريد", "Email")) + "</span>").join("") + '</div></td><td class="mono" style="font-size:12px;white-space:nowrap">' + r[3] + '</td><td class="num mono">' + r[4] + "</td><td>" + (r[7] === "scheduled" ? "—" : '<div style="display:flex;gap:8px;align-items:center"><span class="prog"><i style="width:' + r[5] + '%"></i></span><span class="mono" style="font-size:12px">' + r[5] + "%</span></div>") + "</td><td>" + (r[7] === "scheduled" || r[2] === "app" && !r[6] ? "—" : '<div style="display:flex;gap:8px;align-items:center"><span class="prog"><i style="width:' + r[6] + '%"></i></span><span class="mono" style="font-size:12px">' + r[6] + "%</span></div>") + "</td><td>" + (r[7] === "sent" ? badge("ok", tr("مرسل", "Sent")) : badge("info", tr("مجدول", "Scheduled"))) + "</td></tr>").join("");
    }
    function count() {
      const seg = form.seg.value;
      let n = 214;
      if (seg === "cat") n = $$('[name="cats"]:checked', form).reduce((s, c) => s + CAT_COUNT[c.value], 0);
      if (seg === "status") { const s = $('[name="st"]:checked', form); n = s ? STATUS_SEG.find(x => x[0] === s.value)[2] : 0; }
      if (seg === "pick") n = $$('[name="vs"]:checked', form).length;
      $$("[data-seg]", form).forEach(x => (x.hidden = x.dataset.seg !== seg));
      $("#rc-n").textContent = n;
      return n;
    }
    function loadTpl(id) {
      const t = TPLS.find(x => x.id === id);
      draft = t ? JSON.parse(JSON.stringify({ subj: t.subj, body: t.body, cta: t.cta })) : { subj: { ar: "", en: "" }, body: { ar: "", en: "" }, cta: { ar: "", en: "" } };
      if (t) $("#nc-kind").value = t.kind;
      $$("[data-nk]", form).forEach(el => { const [a, l] = el.dataset.nk.split("."); el.value = draft[a][l] || ""; });
      preview();
    }
    function preview() {
      $("#pv-mail").innerHTML = emailHTML(draft, plang);
      $("#pv-app-item").innerHTML = nItem({ kind: $("#nc-kind").value, from: "admin", time: tr("الآن", "now"), title: { [bnLang]: fillVars(draft.subj[plang] || "") }, body: { [bnLang]: fillVars((draft.body[plang] || "").replace(/\n+/g, " ")).slice(0, 140) } });
    }
    form.addEventListener("input", e => {
      const el = e.target.closest("[data-nk]");
      if (el) { const [a, l] = el.dataset.nk.split("."); draft[a][l] = el.value; preview(); }
    });
    form.addEventListener("focusin", e => { if (e.target.matches("[data-nk]")) lastFocus = e.target; });
    form.addEventListener("change", e => {
      if (e.target.id === "nc-tpl") loadTpl(e.target.value);
      if (e.target.id === "nc-kind") preview();
      count();
    });
    $("#nc-langs").addEventListener("tabchange", e => { plang = e.detail.dataset.l; preview(); });
    form.addEventListener("click", e => {
      const v = e.target.closest("[data-var]"); if (!v) return;
      const el = lastFocus || $('[data-nk="body.' + plang + '"]', form), tok = "{{" + v.dataset.var + "}}";
      const p = el.selectionStart != null ? el.selectionStart : el.value.length;
      el.value = el.value.slice(0, p) + tok + el.value.slice(p); el.focus(); el.selectionStart = el.selectionEnd = p + tok.length;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const n = count(), chans = $$('[name="ch"]:checked', form).map(c => c.value), later = form.when.value === "later";
      if (!n || !chans.length) { toast(tr("اختر مستلمين وقناة واحدة على الأقل", "Pick recipients and at least one channel"), "alert"); return; }
      const segLabel = SEGMENTS.find(s => s[0] === form.seg.value)[1];
      LOG.unshift([draft.subj[bnLang] ? fillVars(draft.subj[bnLang]) : tr("إشعار", "Notification"), segLabel, chans.join("+"), later ? "01/11/2026 09:00" : tr("الآن", "now"), n, later ? 0 : 100, 0, later ? "scheduled" : "sent"]);
      renderLog();
      // deliver to the seller dashboard bell (this browser), for the demo flow
      if (!later && chans.includes("app")) {
        const sent = sentNotifs();
        sent.unshift({ kind: $("#nc-kind").value, time: new Date().toTimeString().slice(0, 5), read: false,
          title: { ar: fillVars(draft.subj.ar || draft.subj.en || ""), en: fillVars(draft.subj.en || draft.subj.ar || "") },
          body: { ar: fillVars((draft.body.ar || "").replace(/\n+/g, " ")).slice(0, 160), en: fillVars((draft.body.en || "").replace(/\n+/g, " ")).slice(0, 160) } });
        try { localStorage.setItem("nas_notifs", JSON.stringify(sent.slice(0, 20))); } catch (_) {}
      }
      toast(later ? tr("تمت جدولة الإرسال إلى ", "Scheduled for ") + n + tr(" بائعاً", " sellers") : tr("تم الإرسال إلى ", "Sent to ") + n + tr(" بائعاً — افتح جرس لوحة البائع للتجربة", " sellers — check the seller dashboard bell"), "send");
    });
    // templates tab
    function openTpl(t) {
      editTpl = t;
      $("#dt-t").textContent = t ? t.name : tr("قالب جديد", "New template");
      const d = t || { subj: { ar: "", en: "" }, body: { ar: "", en: "" }, cta: { ar: "", en: "" } };
      $("#dt-b").innerHTML = '<div class="form-grid"><div class="form-grid form-grid--2"><div class="field"><label>' + tr("اسم القالب", "Template name") + '</label><input class="input" value="' + esc(t ? t.name : "") + '"></div><div class="field"><label>' + tr("طريقة الإرسال", "Sending") + '</label><select class="select"><option' + (t && t.auto ? " selected" : "") + ">" + tr("تلقائي عند حدث", "Automatic on event") + "</option><option" + (t && !t.auto ? " selected" : "") + ">" + tr("يدوي", "Manual") + "</option></select></div></div>" +
        (t && t.auto ? '<div class="tpl__trig">' + icon("refresh") + tr("الحدث: ", "Trigger: ") + t.trig + "</div>" : "") +
        '<div class="field"><label>' + tr("الموضوع (عربي)", "Subject (Arabic)") + '</label><input class="input" dir="rtl" data-tk2="subj.ar" value="' + esc(d.subj.ar) + '"></div><div class="field"><label>' + tr("النص (عربي)", "Body (Arabic)") + '</label><textarea class="textarea" dir="rtl" data-tk2="body.ar" style="min-height:130px">' + esc(d.body.ar) + "</textarea></div>" +
        '<div class="field"><label>Subject (English)</label><input class="input" dir="ltr" data-tk2="subj.en" value="' + esc(d.subj.en) + '"></div><div class="field"><label>Body (English)</label><textarea class="textarea" dir="ltr" data-tk2="body.en" style="min-height:110px">' + esc(d.body.en) + "</textarea></div>" +
        '<div class="field"><span class="label">' + tr("المعاينة", "Preview") + '</span><div id="dt-prev"></div></div></div>';
      const draw = () => $("#dt-prev").innerHTML = emailHTML(d, bnLang);
      $("#dt-b").addEventListener("input", e => { const el = e.target.closest("[data-tk2]"); if (!el) return; const [a, l] = el.dataset.tk2.split("."); d[a][l] = el.value; draw(); });
      draw(); open("#d-tpl");
    }
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-tpl]"); if (t) openTpl(TPLS.find(x => x.id === t.dataset.tpl));
      if (e.target.closest("[data-tpl-new]")) openTpl(null);
      if (e.target.closest("[data-save-tpl]")) { closeAll(); toast(tr("تم حفظ القالب", "Template saved")); }
      if (e.target.closest("[data-use-tpl]") && editTpl) { closeAll(); $("#tb-new").click(); $("#nc-tpl").value = editTpl.id; loadTpl(editTpl.id); }
      const g = e.target.closest("[data-gotab]"); if (g) $("#tb-tpl").click();
      if (e.target.closest("[data-testsend]")) toast(tr("أُرسلت نسخة تجريبية إلى omar@nasmarket.ae", "Test sent to omar@nasmarket.ae"), "mail");
    });
    loadTpl("t2"); count(); renderLog();
    if (!AR) $('#nc-langs [data-l="en"]').click();
  };

  // ================= CATEGORY TREE (admin) + ADD PRODUCT PAGE (seller) =================
  const liveCats = window.NAS.liveCats;
  const nodeName = (x, l) => (x && (x[l || bnLang] || x.ar || x.en)) || "";
  const pseudoCount = id => { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997; return 12 + (h % 340); };
  const specL = k => AR ? (D.specLabels[k] || k) : k.charAt(0).toUpperCase() + k.slice(1);
  const LVL = [tr("الأقسام الرئيسية", "Main categories"), tr("الأقسام الفرعية", "Sub-categories"), tr("الفرعية الثانية", "Sub-sub-categories")];

  views["admin.categories"] = () => head(tr("التصنيفات", "Categories"), tr("شجرة الأقسام بثلاثة مستويات: قسم رئيسي ← فرعي ← فرعي ثانٍ. تظهر في المتجر وفي نموذج إضافة المنتج لدى البائعين.", "A three-level tree: main → sub → sub-sub. Used on the storefront and in the sellers' add-product form."),
      '<button class="btn btn--line btn--sm" data-cat-reset>' + icon("refresh", "icon--sm") + tr("استعادة الافتراضي", "Reset to default") + '</button><button class="btn btn--primary btn--sm" data-cat-add="0">' + icon("plus", "icon--sm") + tr("قسم رئيسي", "Main category") + "</button>") +
    '<div class="cats"><section class="panel miller" id="miller"></section><aside class="panel cat-edit" id="cat-edit"></aside></div>';

  views["admin.categories"].after = () => {
    let CT = JSON.parse(JSON.stringify(liveCats(D.catTree)));
    let path = [CT[1] && CT[1].id, null, null]; // selected ids per level
    if (CT[1] && CT[1].children[0]) path[1] = CT[1].children[0].id;
    const save = () => { try { localStorage.setItem("nas_cats", JSON.stringify(CT)); } catch (_) {} };
    const listAt = lv => lv === 0 ? CT : ((nodeAt(lv - 1) || {}).children || null);
    function nodeAt(lv) { let list = CT, n = null; for (let i = 0; i <= lv; i++) { n = (list || []).find(x => x.id === path[i]); if (!n) return null; list = n.children; } return n; }
    const selLevel = () => path[2] && nodeAt(2) ? 2 : path[1] && nodeAt(1) ? 1 : 0;
    function cols() {
      $("#miller").innerHTML = [0, 1, 2].map(lv => {
        const list = listAt(lv);
        const parent = lv ? nodeAt(lv - 1) : null;
        let body;
        if (!list) body = '<div class="mc-empty">' + icon("chev", "flip-rtl") + "<span>" + (lv === 1 ? tr("اختر قسماً رئيسياً", "Pick a main category") : tr("اختر قسماً فرعياً", "Pick a sub-category")) + "</span></div>";
        else if (!list.length) body = '<div class="mc-empty">' + icon("grid") + "<span>" + tr("لا توجد أقسام بعد", "Nothing here yet") + '</span><button class="btn btn--line btn--sm" data-cat-add="' + lv + '">' + icon("plus", "icon--sm") + tr("إضافة أول قسم", "Add the first one") + "</button></div>";
        else body = list.map(x => '<button class="mc-item" data-lv="' + lv + '" data-id="' + x.id + '" aria-current="' + (path[lv] === x.id) + '"><span class="mc-item__name">' + esc(nodeName(x)) + (x.visible === false ? " " + badge("", tr("مخفي", "Hidden")) : "") + '</span><span class="mono mc-item__n">' + pseudoCount(x.id) + "</span>" + (lv < 2 ? (x.children && x.children.length ? '<span class="mc-item__kids mono">' + x.children.length + "</span>" + icon("chev", "flip-rtl icon--sm") : '<span class="mc-item__kids"></span>' + icon("chev", "flip-rtl icon--sm")) : "") + "</button>").join("");
        return '<div class="mcol"><div class="mcol__head"><div><span class="mcol__lv mono">L' + (lv + 1) + "</span><b>" + LVL[lv] + "</b>" + (parent ? '<span class="mcol__parent">' + esc(nodeName(parent)) + "</span>" : "") + "</div>" + (list ? '<button class="icon-btn" aria-label="' + tr("إضافة", "Add") + '" data-cat-add="' + lv + '">' + icon("plus") + "</button>" : "") + '</div><div class="mcol__list">' + body + "</div></div>";
      }).join("");
    }
    function editor() {
      const lv = selLevel(), x = nodeAt(lv);
      if (!x) { $("#cat-edit").innerHTML = '<div class="empty">' + icon("grid") + "<p>" + tr("اختر قسماً لتعديله", "Select a category to edit") + "</p></div>"; return; }
      const crumbs = [0, 1, 2].slice(0, lv + 1).map(i => esc(nodeName(nodeAt(i)))).join(' <span class="muted">›</span> ');
      const inherited = lv === 2 ? (nodeAt(1).attrs || []) : [];
      const own = x.attrs || [];
      const avail = Object.keys(D.specLabels).filter(k => !own.includes(k) && !inherited.includes(k));
      const siblings = listAt(lv), idx = siblings.indexOf(x);
      $("#cat-edit").innerHTML = '<div class="panel__head"><div><span class="mcol__lv mono">L' + (lv + 1) + "</span> <b>" + LVL[lv].replace(/s$/, "") + '</b><div class="cat-crumbs">' + crumbs + '</div></div><span class="order-btns"><button aria-label="up" data-cat-move="-1"' + (idx > 0 ? "" : " disabled") + ">" + icon("up") + '</button><button aria-label="down" data-cat-move="1"' + (idx < siblings.length - 1 ? "" : " disabled") + ">" + icon("down") + "</button></span></div>" +
        '<div class="panel__body form-grid">' +
        [["ar", "الاسم بالعربي", "Name (Arabic)", "rtl"], ["en", "الاسم بالإنجليزي", "Name (English)", "ltr"], ["ur", "الاسم بالأوردو", "Name (Urdu)", "rtl"]].map(([k, a, e, d]) => '<div class="field"><label>' + tr(a, e) + '</label><input class="input" dir="' + d + '" data-cf="' + k + '" value="' + esc(x[k] || "") + '"></div>').join("") +
        '<div class="field"><label>' + tr("الرابط (slug)", "Slug") + '</label><input class="input mono" dir="ltr" data-cf="id" value="' + esc(x.id) + '" readonly><span class="hint">nasmarket.ae/c/' + [0, 1, 2].slice(0, lv + 1).map(i => nodeAt(i).id).join("/") + "</span></div>" +
        (lv === 0 ? '<div class="field"><span class="label">' + tr("صورة القسم", "Category image") + '</span><div class="imgpick">' + IMGLIB.filter(i => i.startsWith("b-")).map(nm2 => '<label><input type="radio" name="cimg" value="' + nm2 + '"' + ((D.categories.find(c => c.id === x.id) || {}).img === nm2 ? " checked" : "") + '><img src="' + IMG(nm2) + '" alt="" loading="lazy"></label>').join("") + '</div></div><div class="field"><span class="label">' + tr("عمولة القسم", "Category commission") + '</span><div style="display:flex;gap:10px;align-items:center"><span class="pct"><input value="' + ({ marine: 9, electrical: 8, hvac: 9, automation: 8, mech: 10, pumps: 9, tools: 10, safety: 12 }[x.id] || 10) + '" aria-label="commission"><span>%</span></span><a class="link" href="commissions.html" style="font-size:12.5px">' + tr("كل العمولات", "All rates") + "</a></div></div>" : "") +
        (lv > 0 ? '<div class="field"><span class="label">' + tr("حقول المواصفات للمنتجات في هذا القسم", "Spec fields for products in this branch") + '</span><div class="attrs">' +
          inherited.map(k => '<span class="attr attr--inh" title="' + tr("موروث من القسم الأعلى", "Inherited from parent") + '">' + specL(k) + "</span>").join("") +
          own.map(k => '<span class="attr">' + specL(k) + '<button type="button" aria-label="remove" data-attr-rm="' + k + '">' + icon("x", "icon--sm") + "</button></span>").join("") +
          (inherited.length + own.length ? "" : '<span class="muted" style="font-size:12.5px">' + tr("لا توجد حقول بعد", "No fields yet") + "</span>") +
          '</div><div style="display:flex;gap:8px;margin-top:8px"><select class="select" id="attr-add" style="min-height:38px;padding-block:6px">' + avail.map(k => '<option value="' + k + '">' + specL(k) + "</option>").join("") + '</select><button type="button" class="btn btn--line btn--sm" data-attr-add>' + icon("plus", "icon--sm") + tr("إضافة", "Add") + '</button></div><span class="hint">' + tr("البائع يعبّي هذه الحقول عند إضافة منتج في هذا القسم.", "Sellers fill these when adding a product here.") + "</span></div>" : "") +
        '<label class="switch"><input type="checkbox" data-cf="visible"' + (x.visible !== false ? " checked" : "") + "> " + tr("ظاهر في المتجر ونموذج إضافة المنتج", "Visible on store and in the add-product form") + "</label>" +
        '<div class="sumrow" style="font-size:13px"><span>' + tr("المنتجات في هذا القسم", "Products in this category") + '</span><span class="mono">' + pseudoCount(x.id) + "</span></div>" +
        (lv < 2 ? '<button type="button" class="btn btn--line" data-cat-add="' + (lv + 1) + '">' + icon("plus", "icon--sm") + tr("إضافة قسم تحته", "Add a child category") + "</button>" : "") +
        '</div><div class="panel__body" style="border-top:1px solid var(--line);display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap"><button class="btn btn--danger btn--sm" data-cat-del' + (x.children && x.children.length ? ' disabled title="' + tr("احذف الأقسام الفرعية أولاً", "Delete children first") + '"' : "") + ">" + icon("trash", "icon--sm") + tr("حذف", "Delete") + '</button><button class="btn btn--primary btn--sm" data-cat-save>' + tr("حفظ التغييرات", "Save changes") + "</button></div>" +
        (x.children && x.children.length ? '<p class="muted" style="font-size:12px;padding:0 20px 16px">' + tr("لا يمكن حذف قسم يحتوي أقساماً فرعية.", "A category with children can't be deleted.") + "</p>" : "");
    }
    function render() { cols(); editor(); }
    const view = $("#view");
    view.addEventListener("click", e => {
      const it = e.target.closest(".mc-item");
      if (it) { const lv = +it.dataset.lv; path[lv] = it.dataset.id; for (let i = lv + 1; i < 3; i++) path[i] = null; render(); if (innerWidth < 1100) $("#cat-edit").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      const add = e.target.closest("[data-cat-add]");
      if (add) {
        const lv = +add.dataset.catAdd, list = listAt(lv); if (!list) return;
        const nn = { id: "new-" + Date.now().toString(36), ar: tr("قسم جديد", "قسم جديد"), en: "New category", ur: "", visible: true, children: [], attrs: [] };
        list.push(nn); path[lv] = nn.id; for (let i = lv + 1; i < 3; i++) path[i] = null; render();
        const f = $('[data-cf="ar"]'); f && f.select();
        return;
      }
      const mv = e.target.closest("[data-cat-move]");
      if (mv) { const lv = selLevel(), list = listAt(lv), x = nodeAt(lv), i = list.indexOf(x), j = i + +mv.dataset.catMove; if (list[j]) { list.splice(i, 1); list.splice(j, 0, x); render(); } return; }
      const ra = e.target.closest("[data-attr-rm]");
      if (ra) { const x = nodeAt(selLevel()); x.attrs = (x.attrs || []).filter(k => k !== ra.dataset.attrRm); editor(); return; }
      if (e.target.closest("[data-attr-add]")) { const x = nodeAt(selLevel()), v = $("#attr-add").value; if (v) { x.attrs = (x.attrs || []).concat(v); editor(); } return; }
      if (e.target.closest("[data-cat-save]")) { save(); toast(tr("تم حفظ التصنيفات — تظهر الآن للبائعين وفي المتجر", "Categories saved — now live for sellers and the store")); return; }
      if (e.target.closest("[data-cat-del]")) { const lv = selLevel(), list = listAt(lv), x = nodeAt(lv); list.splice(list.indexOf(x), 1); path[lv] = null; save(); render(); toast(tr("تم حذف القسم", "Category deleted"), "trash"); return; }
      if (e.target.closest("[data-cat-reset]")) { try { localStorage.removeItem("nas_cats"); } catch (_) {} CT = JSON.parse(JSON.stringify(D.catTree)); path = [CT[1].id, CT[1].children[0].id, null]; render(); toast(tr("تمت استعادة التصنيفات الافتراضية", "Default categories restored"), "refresh"); }
    });
    view.addEventListener("input", e => {
      const f = e.target.closest("[data-cf]"); if (!f) return;
      const x = nodeAt(selLevel());
      if (f.dataset.cf === "visible") x.visible = f.checked; else if (f.dataset.cf !== "id") x[f.dataset.cf] = f.value;
      cols();
    });
    view.addEventListener("change", e => { if (e.target.matches('[data-cf="visible"]')) { nodeAt(selLevel()).visible = e.target.checked; cols(); } });
    render();
  };

  // ---------- seller: add / edit product (full page) ----------
  const PROD_PATH = { p10: ["electrical", "motors", "motors-3p"], p07: ["electrical", "breakers", "mcb"], p08: ["electrical", "breakers", "mcb"], p28: ["electrical", "cables", "power-cables"], p09: ["automation", "contactors", "contactors-ac"], p17: ["automation", "valves-auto", "coils"], p18: ["automation", "valves-auto", "actuators"], p11: ["tools", "test", "multimeters"], p06: ["mech", "bearings", "ball"], p20: ["tools", "power-tools", "grinders"] };
  views["seller.product-new"] = () => {
    const ed = P(new URLSearchParams(location.search).get("id") || "");
    const steps = [tr("المعلومات", "Basics"), tr("التصنيف", "Category"), tr("الصور", "Images"), tr("المواصفات", "Specs"), tr("السعر والمخزون", "Price & stock"), tr("الشحن", "Shipping")];
    const sec = (n, id, title, sub, body) => '<section class="panel pf-sec" id="' + id + '"><div class="panel__head"><div style="display:flex;gap:12px;align-items:center"><span class="cstep__n">' + n + "</span><div><h2>" + title + "</h2>" + (sub ? '<p class="muted" style="font-size:12.5px">' + sub + "</p>" : "") + '</div></div></div><div class="panel__body form-grid">' + body + "</div></section>";
    return '<a class="link" href="products.html" style="font-size:13px;justify-self:start">' + icon("chev", "icon--sm flip-ltr") + tr("المنتجات", "Products") + "</a>" +
      head(ed ? tr("تعديل منتج", "Edit product") : tr("إضافة منتج", "Add product"), ed ? '<span class="mono">' + ed.sku + "</span> · " + tr("آخر تعديل قبل يومين", "edited 2 days ago") : tr("املأ المعلومات بثلاث لغات. المنتجات الجديدة تمر بمراجعة سريعة قبل النشر.", "Fill in details in three languages. New products get a quick review before going live."),
        (ed ? '<button class="btn btn--line btn--sm" data-pf-instant>' + icon("check", "icon--sm") + tr("حفظ السعر والكمية", "Save price & stock") + "</button>" : '<button class="btn btn--line btn--sm" data-pf-draft>' + tr("حفظ كمسودة", "Save draft") + "</button>") +
        '<button class="btn btn--primary btn--sm" data-pf-submit>' + icon("send", "icon--sm") + (ed ? tr("إرسال التعديلات للمراجعة", "Submit changes for review") : tr("إرسال للمراجعة", "Submit for review")) + "</button>") +
      (ed ? '<div class="alert alert--info">' + icon("lock") + "<span>" + tr("<b>السعر والكمية</b> تُحدَّث فوراً بدون موافقة. أي تعديل آخر (الاسم، الصور، التصنيف، المواصفات…) يُرسل لمراجعة الإدارة، ويبقى المنتج ظاهراً بنسخته الحالية حتى الموافقة.", "<b>Price and stock</b> update instantly, no approval needed. Any other change (name, images, category, specs…) goes to admin review, and the current version stays live until it's approved.") + '</span><span class="badge badge--warn" id="pf-pending" hidden></span></div>' :
        '<div class="alert alert--warn">' + icon("shield") + "<span>" + tr("كل منتج جديد يُراجَع من إدارة المنصة قبل نشره في المتجر (عادةً خلال 24 ساعة). ستصلك النتيجة في الإشعارات.", "Every new product is reviewed by the platform before it's published (usually within 24h). You'll be notified of the result.") + "</span></div>") +
      '<nav class="pf-steps" aria-label="sections">' + steps.map((s, i) => '<a href="#pf-' + i + '"><span class="mono">' + (i + 1) + "</span>" + s + "</a>").join("") + "</nav>" +
      '<div class="pform"><form class="stack" id="pf" novalidate>' +
      sec(1, "pf-0", tr("المعلومات الأساسية", "Basic information"), tr("الاسم والوصف بلغات المنصة الثلاث", "Name and description in the platform's three languages"),
        '<div class="tabs" role="tablist"><button type="button" class="tab" role="tab" aria-selected="true" aria-controls="pl-ar">العربية <span class="count" data-done="ar">•</span></button><button type="button" class="tab" role="tab" aria-selected="false" aria-controls="pl-en">English <span class="count" data-done="en">•</span></button><button type="button" class="tab" role="tab" aria-selected="false" aria-controls="pl-ur">اردو <span class="count" data-done="ur">•</span></button></div>' +
        [["ar", "rtl", ed ? ed.ar : ""], ["en", "ltr", ed ? ed.en : ""], ["ur", "rtl", ed ? ed.ur : ""]].map(([l, d, v], i) => '<div id="pl-' + l + '" class="form-grid"' + (i ? " hidden" : "") + ' dir="' + d + '"><div class="field"><label>' + (l === "ar" ? "اسم المنتج" : l === "en" ? "Product name" : "پروڈکٹ کا نام") + ' <span class="mono muted">' + l.toUpperCase() + '</span></label><input class="input" data-pf="name-' + l + '" value="' + esc(v || "") + '" maxlength="120"><span class="hint mono" data-len="name-' + l + '">' + (v || "").length + '/120</span></div><div class="field"><label>' + (l === "ar" ? "وصف مختصر" : l === "en" ? "Short description" : "مختصر تفصیل") + '</label><textarea class="textarea" style="min-height:90px" data-pf="desc-' + l + '"></textarea></div></div>').join("") +
        '<div class="form-grid form-grid--2"><div class="field"><label>' + tr("الماركة", "Brand") + '</label><input class="input" value="' + (ed ? "[Brand]" : "") + '" placeholder="' + tr("مثال: ABB", "e.g. ABB") + '"></div><div class="field"><label>' + tr("رقم الموديل", "Model number") + '</label><input class="input mono" dir="ltr" value="' + (ed ? ed.sku : "") + '"></div></div>') +
      sec(2, "pf-1", tr("التصنيف", "Category"), tr("اختر القسم حتى المستوى الأخير — يحدد حقول المواصفات المطلوبة", "Choose down to the last level — it sets the required spec fields"),
        '<div class="cascade"><div class="field"><label for="c1">' + tr("القسم الرئيسي", "Main category") + '</label><select class="select" id="c1"></select></div><div class="field"><label for="c2">' + tr("القسم الفرعي", "Sub-category") + '</label><select class="select" id="c2"></select></div><div class="field"><label for="c3">' + tr("الفرعي الثاني", "Sub-sub-category") + '</label><select class="select" id="c3"></select></div></div>' +
        '<div class="plate cat-path" id="cat-path"></div><p class="muted" style="font-size:12.5px">' + tr("التصنيفات تديرها إدارة المنصة. لم تجد التصنيف المناسب؟", "Categories are managed by the platform. Can't find yours?") + ' <a class="link" href="support.html">' + tr("اطلب إضافته", "Request it") + "</a></p>") +
      sec(3, "pf-2", tr("الصور", "Images"), tr("حتى 8 صور · الصورة الأولى هي الرئيسية · خلفية فاتحة ولوحة البيانات واضحة", "Up to 8 · first is the main image · light background, readable nameplate"),
        '<div class="pf-imgs">' + (ed ? '<div class="pf-img pf-img--main"><img src="' + IMG(ed.img) + '" alt=""><span class="badge badge--volt">' + tr("الرئيسية", "Main") + '</span><button type="button" class="icon-btn" aria-label="remove">' + icon("trash") + "</button></div>" : "") +
        '<label class="pf-img pf-img--add' + (ed ? "" : " pf-img--main") + '">' + icon("upload", "icon--lg") + "<span>" + tr("اسحب الصور أو اختر", "Drop or browse") + '</span><input type="file" hidden multiple accept="image/*"></label>' + [1, 2, 3].map(() => '<div class="pf-img pf-img--slot"></div>').join("") + "</div>") +
      sec(4, "pf-3", tr("المواصفات الفنية", "Technical specs"), tr("الحقول تتغير حسب التصنيف المختار", "Fields change with the selected category"), '<div class="form-grid form-grid--2" id="spec-fields"></div><div id="spec-custom" class="stack" style="gap:8px"></div><button type="button" class="btn btn--line btn--sm" style="justify-self:start" data-spec-add>' + icon("plus", "icon--sm") + tr("مواصفة إضافية", "Custom spec") + "</button>") +
      sec(5, "pf-4", tr("السعر والمخزون", "Price & stock"), tr("الأسعار بدون ضريبة، وتُضاف 5% تلقائياً للمشتري", "Prices exclude VAT; 5% is added for the buyer"),
        '<div class="field"><span class="label">' + tr("الحالة", "Condition") + '</span><div class="seg pf-cond" role="group">' + [["new", tr("جديد", "New")], ["refurb", tr("مجدد", "Refurbished")], ["used", tr("مستعمل", "Used")]].map(([k, l]) => '<button type="button" data-cond="' + k + '" aria-pressed="' + ((ed ? ed.cond : "new") === k) + '">' + l + "</button>").join("") + '</div></div><div class="field" id="cond-note"' + (ed && ed.cond !== "new" ? "" : " hidden") + '><label>' + tr("وصف حالة القطعة", "Condition notes") + '</label><textarea class="textarea" style="min-height:70px" placeholder="' + tr("ساعات التشغيل، آثار الاستخدام، نتيجة الفحص…", "Hours, wear, inspection result…") + '"></textarea></div>' +
        '<div class="pf-instant" data-instant>' + (ed ? '<span class="pf-instant__tag">' + icon("bolt", "icon--sm") + tr("يُطبَّق فوراً", "Applies instantly") + "</span>" : "") + '<div class="form-grid form-grid--3"><div class="field"><label>' + tr("السعر (درهم)", "Price (AED)") + '</label><input class="input mono" dir="ltr" data-pf="price" value="' + (ed ? ed.price.toFixed(2) : "") + '" placeholder="0.00"></div><div class="field"><label>' + tr("السعر قبل الخصم", "Compare-at price") + '</label><input class="input mono" dir="ltr" data-pf="old" value="' + (ed && ed.old ? ed.old.toFixed(2) : "") + '" placeholder="—"></div>' +
        '<div class="field"><label>' + tr("الكمية المتوفرة", "Stock") + '</label><input class="input mono" dir="ltr" data-pf="stock" value="' + (ed ? ed.stock : "") + '"></div></div></div>' +
        '<div class="form-grid form-grid--2"><div class="field"><label>' + tr("رقم القطعة P/N", "Part number") + (ed ? ' <span class="muted">' + icon("lock", "icon--sm") + "</span>" : "") + '</label><input class="input mono" dir="ltr" data-pf="sku" value="' + (ed ? ed.sku : "") + '"></div><div class="field"><label>' + tr("الباركود", "Barcode") + '</label><input class="input mono" dir="ltr" placeholder="EAN / UPC"></div>' +
        '<div class="field"><label>' + tr("تنبيه عند انخفاض المخزون عن", "Low-stock alert below") + '</label><input class="input mono" dir="ltr" value="5"></div></div>' +
        '<div class="sumrow plate" style="padding:10px 16px;font-size:13px" id="price-calc"></div>' +
        '<div class="field"><span class="label">' + tr("خصومات الكميات", "Volume discounts") + '</span><div class="tiers" id="tiers"><div class="tier"><input class="input mono" value="5+" aria-label="qty"><input class="input mono" value="-3%" aria-label="discount"><button type="button" class="icon-btn" aria-label="remove" data-tier-rm>' + icon("x") + '</button></div></div><button type="button" class="link" style="justify-self:start;font-size:13px" data-tier-add>+ ' + tr("إضافة شريحة", "Add tier") + "</button></div>" +
        '<label class="switch"><input type="checkbox" checked> ' + tr("أقبل طلبات عروض الأسعار على هذا المنتج", "Accept quote requests for this product") + "</label>") +
      sec(6, "pf-5", tr("الشحن والإرجاع", "Shipping & returns"), "",
        '<div class="form-grid form-grid--2"><div class="field"><label>' + tr("الوزن مع التغليف (كغ)", "Packed weight (kg)") + '</label><input class="input mono" dir="ltr" value="' + (ed ? "26" : "") + '"></div><div class="field"><label>' + tr("الأبعاد سم (طول × عرض × ارتفاع)", "Dimensions cm (L × W × H)") + '</label><input class="input mono" dir="ltr" placeholder="40 × 30 × 30"></div>' +
        '<div class="field"><label>' + tr("مدة التجهيز", "Handling time") + '</label><select class="select"><option>' + tr("نفس اليوم", "Same day") + "</option><option selected>" + tr("1–2 يوم عمل", "1–2 business days") + "</option><option>" + tr("3–5 أيام عمل", "3–5 business days") + '</option></select></div><div class="field"><label>' + tr("يُشحن من", "Ships from") + '</label><select class="select"><option>' + tr("مستودع الشارقة — المنطقة الصناعية 6", "Sharjah warehouse — Industrial 6") + "</option></select></div>" +
        '<div class="field span-2"><label>' + tr("سياسة الإرجاع", "Return policy") + '</label><select class="select"><option>' + tr("14 يوم — سياسة المتجر الافتراضية", "14 days — store default") + "</option><option>" + tr("7 أيام — للمستعمل", "7 days — used items") + "</option><option>" + tr("غير قابل للإرجاع (قطع مفصلة)", "Non-returnable (custom parts)") + "</option></select></div></div>") +
      "</form>" +
      '<aside class="pf-side stack"><section class="panel"><div class="panel__head"><h3>' + tr("معاينة البطاقة", "Card preview") + '</h3><span class="badge" id="pf-status">' + (ed ? tr("منشور", "Live") : tr("مسودة", "Draft")) + '</span></div><div class="panel__body" id="pf-card"></div></section>' +
      '<section class="panel"><div class="panel__head"><h3>' + tr("اكتمال المنتج", "Completeness") + '</h3><span class="mono" id="pf-pct">0%</span></div><div class="panel__body"><div class="prog" style="height:8px;margin-bottom:14px"><i id="pf-bar" style="width:0"></i></div><ul class="pf-check" id="pf-check"></ul></div></section></aside></div>';
  };
  views["seller.product-new"].after = () => {
    const ed = P(new URLSearchParams(location.search).get("id") || "");
    const CT = liveCats(D.catTree).filter(x => x.visible !== false);
    const vis = l => (l || []).filter(x => x.visible !== false);
    const c1 = $("#c1"), c2 = $("#c2"), c3 = $("#c3");
    const init = ed && PROD_PATH[ed.id] ? PROD_PATH[ed.id] : ed ? [ed.cat] : [];
    const opts = (list, sel, ph) => '<option value="">' + ph + "</option>" + vis(list).map(x => '<option value="' + x.id + '"' + (x.id === sel ? " selected" : "") + ">" + esc(nodeName(x)) + "</option>").join("");
    let cond = ed ? ed.cond : "new";
    function cascade(from) {
      if (from <= 0) c1.innerHTML = opts(CT, from < 0 ? init[0] : c1.value, tr("اختر القسم الرئيسي", "Choose main category"));
      const n1 = CT.find(x => x.id === c1.value);
      if (from <= 1) { c2.innerHTML = opts(n1 && n1.children, from < 0 ? init[1] : "", n1 ? tr("اختر القسم الفرعي", "Choose sub-category") : "—"); c2.disabled = !n1 || !vis(n1.children).length; }
      const n2 = n1 && vis(n1.children).find(x => x.id === c2.value);
      if (from <= 2) { c3.innerHTML = opts(n2 && n2.children, from < 0 ? init[2] : "", n2 && vis(n2.children).length ? tr("اختر الفرعي الثاني", "Choose sub-sub-category") : tr("لا يوجد مستوى ثالث", "No third level")); c3.disabled = !n2 || !vis(n2.children).length; }
      const n3 = n2 && vis(n2.children).find(x => x.id === c3.value);
      const pathNodes = [n1, n2, n3].filter(Boolean);
      $("#cat-path").innerHTML = pathNodes.length ? '<span class="plate__key">' + tr("المسار", "PATH") + "</span> " + pathNodes.map(x => "<b>" + esc(nodeName(x)) + "</b>").join(' <span class="muted">›</span> ') : '<span class="muted">' + tr("لم يتم اختيار تصنيف بعد", "No category selected yet") + "</span>";
      const attrs = [...new Set([].concat(n2 && n2.attrs || [], n3 && n3.attrs || []))];
      $("#spec-fields").innerHTML = attrs.length ? attrs.map(k => '<div class="field"><label>' + specL(k) + ' <span class="muted">*</span></label><input class="input mono" dir="ltr" data-spec="' + k + '" value="' + esc(ed && ed.specs[k] || "") + '"></div>').join("") : '<p class="muted span-2" style="font-size:13px">' + tr("اختر التصنيف لتظهر حقول المواصفات المطلوبة.", "Pick a category to see the required spec fields.") + "</p>";
      check();
    }
    c1.addEventListener("change", () => cascade(1)); c2.addEventListener("change", () => cascade(2)); c3.addEventListener("change", () => cascade(3));
    const val = k => ($('[data-pf="' + k + '"]') || {}).value || "";
    function card() {
      const price = parseFloat(val("price").replace(/,/g, "")) || 0, old = parseFloat(val("old").replace(/,/g, "")) || 0;
      const name = val("name-" + (AR ? "ar" : "en")) || tr("اسم المنتج يظهر هنا", "Product name shows here");
      $("#pf-card").innerHTML = '<article class="pcard" style="max-width:260px;margin-inline:auto"><div class="pcard__media">' + (ed ? '<img src="' + IMG(ed.img) + '" alt="">' : '<span class="ph">' + tr("الصورة الرئيسية", "Main image") + "</span>") + '<span class="pcard__tags">' + condB(cond) + "</span>" + (old > price && price ? '<span class="pcard__off plate plate--volt">-' + Math.round((1 - price / old) * 100) + "%</span>" : "") + '</div><div class="pcard__body"><span class="pcard__vendor">' + icon("badge") + tr("مصدر الطاقة للكهربائيات", "PowerSource Electric") + '</span><h3 class="pcard__title">' + esc(name) + '</h3><div class="plate pcard__plate"><div class="pcard__pn mono"><span class="plate__key">P/N</span> ' + esc(val("sku") || "—") + '</div><div class="plate__row pcard__buy"><div class="pcard__prices"><span class="price">' + num(price, true) + "<small>" + tr("درهم", "AED") + "</small></span>" + (old > price ? '<span class="price-old">' + num(old) + "</span>" : "") + '</div><span class="pcard__add">' + icon("cart") + "</span></div></div></div></article>";
      const fee = price * 0.08;
      $("#price-calc").innerHTML = price ? "<span>" + tr("سعر المشتري مع الضريبة", "Buyer pays incl. VAT") + ' <b class="mono">' + num(price * 1.05, true) + "</b></span><span>" + tr("صافي لك بعد عمولة 8%", "You get after 8% fee") + ' <b class="mono">' + num(price - fee, true) + "</b></span>" : '<span class="muted">' + tr("أدخل السعر لحساب صافي مستحقاتك", "Enter a price to see your net") + "</span>";
    }
    function check() {
      const items = [
        [tr("الاسم بالعربي", "Arabic name"), !!val("name-ar")], [tr("الاسم بالإنجليزي", "English name"), !!val("name-en")],
        [tr("التصنيف حتى آخر مستوى", "Category to last level"), !!c1.value && !!c2.value && (c3.disabled || !!c3.value)],
        [tr("صورة رئيسية", "Main image"), !!ed], [tr("المواصفات المطلوبة", "Required specs"), $$("[data-spec]").length > 0 && $$("[data-spec]").every(i => i.value.trim())],
        [tr("السعر والمخزون", "Price & stock"), !!val("price") && !!val("stock")], [tr("رقم القطعة", "Part number"), !!val("sku")]
      ];
      const done = items.filter(i => i[1]).length, pct = Math.round(done / items.length * 100);
      $("#pf-check").innerHTML = items.map(([l, ok]) => '<li class="' + (ok ? "ok" : "") + '">' + icon(ok ? "check" : "info", "icon--sm") + l + "</li>").join("");
      $("#pf-pct").textContent = pct + "%"; $("#pf-bar").style.width = pct + "%";
      ["ar", "en", "ur"].forEach(l => { const d = $('[data-done="' + l + '"]'); if (d) { d.textContent = val("name-" + l) ? "✓" : "•"; } });
    }
    const pf = $("#pf");
    pf.addEventListener("input", e => {
      const f = e.target.closest("[data-pf]");
      if (f && f.dataset.pf.startsWith("name-")) { const c = $('[data-len="' + f.dataset.pf + '"]'); if (c) c.textContent = f.value.length + "/120"; }
      card(); check();
    });
    pf.addEventListener("click", e => {
      const cb = e.target.closest("[data-cond]");
      if (cb) { cond = cb.dataset.cond; $$("[data-cond]").forEach(b => b.setAttribute("aria-pressed", b === cb)); $("#cond-note").hidden = cond === "new"; card(); }
      if (e.target.closest("[data-tier-add]")) $("#tiers").insertAdjacentHTML("beforeend", '<div class="tier"><input class="input mono" placeholder="10+" aria-label="qty"><input class="input mono" placeholder="-5%" aria-label="discount"><button type="button" class="icon-btn" aria-label="remove" data-tier-rm>' + icon("x") + "</button></div>");
      const tr_ = e.target.closest("[data-tier-rm]"); if (tr_) tr_.closest(".tier").remove();
      if (e.target.closest("[data-spec-add]")) $("#spec-custom").insertAdjacentHTML("beforeend", '<div class="tier"><input class="input" placeholder="' + tr("اسم المواصفة", "Spec name") + '" aria-label="name"><input class="input mono" dir="ltr" placeholder="' + tr("القيمة", "Value") + '" aria-label="value"><button type="button" class="icon-btn" aria-label="remove" data-tier-rm>' + icon("x") + "</button></div>");
    });
    // edit mode: price/stock are instant, everything else becomes a moderated change request
    const modSet = new Set();
    function trackMod(target) {
      if (!ed || target.closest("[data-instant]")) return;
      const sec = target.closest(".pf-sec"); if (!sec) return;
      modSet.add($("h2", sec).textContent);
      const b = $("#pf-pending"); b.hidden = false; b.textContent = modSet.size + " " + tr("أقسام معدّلة تحتاج موافقة", "sections changed — need approval");
    }
    pf.addEventListener("input", e => trackMod(e.target));
    pf.addEventListener("change", e => trackMod(e.target));
    pf.addEventListener("click", e => { if (e.target.closest("[data-cond],[data-tier-add],[data-tier-rm],[data-spec-add]")) trackMod(e.target); });
    document.addEventListener("click", e => {
      if (e.target.closest("[data-pf-draft]")) toast(tr("تم الحفظ كمسودة", "Saved as draft"));
      if (e.target.closest("[data-pf-instant]")) toast(tr("تم تحديث السعر والكمية — ظاهر فوراً في المتجر", "Price & stock updated — live on the store now"), "bolt");
      if (e.target.closest("[data-pf-submit]")) {
        if (!val("name-ar") || !c1.value) { toast(tr("أكمل الاسم بالعربي والتصنيف أولاً", "Add the Arabic name and category first"), "alert"); $("#pf-0").scrollIntoView({ behavior: "smooth" }); return; }
        if (ed && !modSet.size) { toast(tr("لا توجد تعديلات تحتاج مراجعة — استخدم «حفظ السعر والكمية»", "No changes need review — use “Save price & stock”"), "info"); return; }
        $("#pf-status").className = "badge badge--warn"; $("#pf-status").textContent = ed ? tr("تعديل بانتظار المراجعة", "Edit in review") : tr("بانتظار المراجعة", "In review");
        toast(ed ? tr("أُرسلت التعديلات لمراجعة الإدارة — يبقى المنتج ظاهراً بنسخته الحالية حتى الموافقة", "Changes sent for review — the current version stays live until approved") : tr("تم إرسال المنتج للمراجعة — ستصلك النتيجة في الإشعارات", "Submitted for review — you'll be notified of the result"), "send");
      }
    });
    cascade(-1); card(); check();
  };

  // ---------- admin: product review (new products + change requests) ----------
  const RV_NEW = [
    { id: "r1", v: "v2", img: "p10", name: tr("محرك كهربائي 3 فاز 4 كيلوواط", "3-Phase Induction Motor 4 kW"), sku: "IM-3P-4K0-B3", path: ["electrical", "motors", "motors-3p"], price: 1890, cond: "new", when: tr("قبل ساعتين", "2h ago"),
      checks: [[1, tr("الاسم بالعربي والإنجليزي", "Name in AR & EN")], [1, tr("3 صور", "3 images")], [1, tr("المواصفات 6/6", "Specs 6/6")], [1, tr("السعر ضمن نطاق القسم", "Price within category range")], [1, tr("رقم القطعة غير مكرر", "Part number is unique")]] },
    { id: "r2", v: "v1", img: "p03", name: tr("صمام فراشة DN100 بفلنجة", "Butterfly Valve DN100 Flanged"), sku: "BFV-DN100-PN16", path: ["pumps", "valves", "globe-valves"], price: 1250, cond: "new", when: tr("قبل 5 ساعات", "5h ago"),
      checks: [[1, tr("الاسم بالعربي والإنجليزي", "Name in AR & EN")], [0, tr("صورة واحدة فقط", "Only one image")], [0, tr("المواصفات 3/4 — ينقص «طرف التوصيل»", "Specs 3/4 — missing “ends”")], [1, tr("السعر ضمن نطاق القسم", "Price within category range")]] },
    { id: "r3", v: "v4", img: "p22", name: tr("طقم فريزات كاربايد 10 مم (5 قطع)", "Carbide End Mill Set 10 mm (5 pcs)"), sku: "EM-CB-10-SET5", path: ["mech", "cnc", "endmills"], price: 85, cond: "used", when: tr("أمس", "Yesterday"),
      checks: [[1, tr("الاسم بالعربي والإنجليزي", "Name in AR & EN")], [1, tr("4 صور", "4 images")], [0, tr("السعر أقل 62% من متوسط القسم", "Price 62% below category average")], [0, tr("مستعمل بدون وصف للحالة", "Used, no condition notes")]] }
  ];
  const RV_EDIT = [
    { id: "e1", v: "v2", p: "p07", when: tr("قبل 40 د", "40m ago"), ch: [[tr("الاسم (عربي)", "Name (AR)"), "قاطع تيار 3 فاز 32 أمبير منحنى C", "قاطع تيار ABB أصلي 3 فاز 32 أمبير منحنى C"], [tr("الصور", "Images"), tr("صورة واحدة", "1 image"), tr("3 صور (+2)", "3 images (+2)")]] },
    { id: "e2", v: "v1", p: "p04", when: tr("قبل 3 ساعات", "3h ago"), ch: [[tr("التصنيف", "Category"), tr("مضخات › طرد مركزي", "Pumps › Centrifugal"), tr("مضخات › غاطسة", "Pumps › Submersible")], [tr("المواصفات: الرفع", "Spec: head"), "32 m", "38 m"]], warn: tr("تغيير التصنيف ينقل المنتج لقسم آخر في المتجر", "Category change moves the product to another section") },
    { id: "e3", v: "v4", p: "p11", when: tr("أمس", "Yesterday"), ch: [[tr("رقم القطعة", "Part number"), "DMM-600-CAT3", "DMM-1000-CAT4"], [tr("المواصفات: فئة الأمان", "Spec: safety"), "CAT III 600V", "CAT IV 1000V"]], warn: tr("تغيير رقم القطعة قد يعني منتجاً مختلفاً — تحقق من الصور", "A new part number may mean a different product — check the images") },
    { id: "e4", v: "v3", p: "p13", when: tr("أمس", "Yesterday"), ch: [[tr("الحالة", "Condition"), tr("جديد", "New"), tr("مجدد", "Refurbished")]], warn: tr("للمنتج طلبات نشطة بحالة «جديد»", "Product has open orders as “New”") }
  ];
  const INSTANT = [["p10", tr("السعر", "Price"), "1,180.00", "1,150.00", "v2", "10:12"], ["p28", tr("الكمية", "Stock"), "8", "20", "v2", "09:58"], ["p25", tr("السعر", "Price"), "18.00", "16.50", "v5", "09:31"], ["p05", tr("السعر", "Price"), "12,500.00", "7,900.00", "v1", "08:47", true], ["p19", tr("الكمية", "Stock"), "18", "12", "v4", tr("أمس", "Yesterday")]];
  const pathTxt = ids => { let list = liveCats(D.catTree), out = []; ids.forEach(id => { const x = (list || []).find(y => y.id === id); if (x) { out.push(nodeName(x)); list = x.children; } }); return out.join(" › "); };
  views["admin.products"] = () => head(tr("مراجعة المنتجات", "Product review"), tr("كل منتج جديد وكل تعديل غير السعر والكمية يحتاج موافقة قبل ظهوره في المتجر.", "Every new product, and every change other than price and stock, needs approval before it goes live."),
      '<a class="btn btn--line btn--sm" href="categories.html">' + icon("grid", "icon--sm") + tr("التصنيفات", "Categories") + "</a>") +
    '<div class="kpis">' + kpi(tr("بانتظار المراجعة", "Awaiting review"), "clock", String(RV_NEW.length + RV_EDIT.length), "", RV_NEW.length + tr(" جديدة · ", " new · ") + RV_EDIT.length + tr(" تعديلات", " edits"), true) + kpi(tr("متوسط وقت المراجعة", "Avg. review time"), "refresh", "3.2h", "", tr("الهدف أقل من 24 ساعة", "Target under 24h")) + kpi(tr("نسبة القبول", "Approval rate"), "check", "87%", "", tr("آخر 30 يوم", "last 30 days")) + kpi(tr("تعديلات فورية اليوم", "Instant edits today"), "bolt", "41", "", tr("سعر وكمية بدون موافقة", "price & stock, no approval")) + "</div>" +
    '<div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true" aria-controls="rv-new">' + tr("منتجات جديدة", "New products") + ' <span class="count">' + RV_NEW.length + '</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="rv-edit">' + tr("طلبات تعديل", "Change requests") + ' <span class="count">' + RV_EDIT.length + '</span></button><button class="tab" role="tab" aria-selected="false" aria-controls="rv-instant">' + tr("تعديلات فورية", "Instant edits") + '</button><button class="tab" role="tab" aria-selected="false" aria-controls="rv-rules">' + tr("قواعد المراجعة", "Review rules") + "</button></div>" +
    '<div id="rv-new" class="stack">' + RV_NEW.map(r => { const v = V(r.v), bad = r.checks.filter(c => !c[0]).length; return '<article class="panel rv-card" data-rv="' + r.id + '"><img class="rv-card__img" src="' + IMG(r.img) + '" alt=""><div class="rv-card__info"><div style="display:flex;gap:6px;flex-wrap:wrap">' + badge("info", tr("منتج جديد", "New product")) + condB(r.cond) + '<span class="muted mono" style="font-size:11.5px">' + r.when + "</span></div><h3>" + esc(r.name) + '</h3><span class="mono muted" style="font-size:12px">' + r.sku + '</span><span class="rv-path">' + icon("grid", "icon--sm") + esc(pathTxt(r.path)) + '</span><span style="font-size:13px">' + vn(v) + " · " + aed(r.price, true) + '</span></div><ul class="pf-check rv-checks">' + r.checks.map(([ok, l]) => '<li class="' + (ok ? "ok" : "warn") + '">' + icon(ok ? "check" : "alert", "icon--sm") + l + "</li>").join("") + '</ul><div class="rv-card__acts"><button class="btn btn--primary btn--sm" data-rv-ok>' + icon("check", "icon--sm") + tr("موافقة ونشر", "Approve & publish") + '</button><button class="btn btn--line btn--sm" data-open="#m-rv">' + tr("طلب تعديل", "Request changes") + '</button><button class="btn btn--danger btn--sm" data-rv-no>' + tr("رفض", "Reject") + "</button>" + (bad ? '<span class="badge badge--warn">' + bad + " " + tr("ملاحظات", "flags") + "</span>" : '<span class="badge badge--ok">' + tr("جاهز للنشر", "Ready") + "</span>") + "</div></article>"; }).join("") + "</div>" +
    '<div id="rv-edit" class="stack" hidden>' + RV_EDIT.map(r => { const p = P(r.p), v = V(r.v); return '<article class="panel" data-rv="' + r.id + '"><div class="panel__head"><div class="t-prod"><img src="' + IMG(p.img) + '" alt=""><div><b>' + esc(pn(p)) + "</b><span>" + p.sku + " · " + vn(v) + " · " + r.when + '</span></div></div><span class="badge badge--warn">' + tr("المنتج ظاهر بالنسخة الحالية", "Current version is live") + "</span></div>" +
      (r.warn ? '<div class="alert alert--warn" style="margin:12px 16px 0">' + icon("alert") + "<span>" + r.warn + "</span></div>" : "") +
      '<div class="table-wrap" style="border:0"><table class="table rv-diff"><thead><tr><th>' + tr("الحقل", "Field") + "</th><th>" + tr("الحالي", "Current") + "</th><th>" + tr("المقترح", "Proposed") + "</th></tr></thead><tbody>" + r.ch.map(([f, a, b]) => "<tr><td><b>" + f + '</b></td><td><span class="diff-old">' + esc(a) + '</span></td><td><span class="diff-new">' + esc(b) + "</span></td></tr>").join("") + "</tbody></table></div>" +
      '<div class="panel__body rv-card__acts" style="border-top:1px solid var(--line)"><button class="btn btn--primary btn--sm" data-rv-ok>' + icon("check", "icon--sm") + tr("اعتماد التعديل", "Approve change") + '</button><button class="btn btn--danger btn--sm" data-rv-no>' + tr("رفض التعديل", "Reject change") + '</button><a class="link" href="' + ROOT + "product.html?id=" + p.id + '" target="_blank" style="font-size:13px">' + tr("عرض المنتج الحالي", "View live product") + "</a></div></article>"; }).join("") + "</div>" +
    '<section class="panel" id="rv-instant" hidden><div class="panel__head"><div><h2>' + tr("سجل التعديلات الفورية", "Instant edit log") + '</h2><p class="muted" style="font-size:12.5px">' + tr("السعر والكمية يتغيران بدون موافقة — هنا للاطلاع والتدخل عند الحاجة.", "Price and stock change without approval — listed here so you can step in if needed.") + '</p></div></div><div class="table-wrap"><table class="table"><thead><tr><th>' + tr("المنتج", "Product") + "</th><th>" + tr("الحقل", "Field") + "</th><th>" + tr("من", "From") + "</th><th>" + tr("إلى", "To") + "</th><th>" + tr("البائع", "Seller") + "</th><th>" + tr("الوقت", "Time") + "</th><th></th></tr></thead><tbody>" +
      INSTANT.map(([id, f, a, b, vid, t, flag]) => "<tr><td>" + tprod(P(id)) + "</td><td>" + f + '</td><td class="mono">' + a + '</td><td class="mono"><b>' + b + "</b>" + (flag ? " " + badge("warn", "-37%") : "") + "</td><td>" + vn(V(vid)) + '</td><td class="mono">' + t + "</td><td>" + (flag ? '<button class="btn btn--sm btn--line">' + tr("مراجعة", "Review") + "</button>" : "") + "</td></tr>").join("") + "</tbody></table></div></section>" +
    '<section class="panel" id="rv-rules" hidden><div class="panel__head"><h2>' + tr("قواعد المراجعة", "Review rules") + '</h2><button class="btn btn--primary btn--sm" data-rules-save>' + tr("حفظ", "Save") + '</button></div><div class="panel__body form-grid"><div class="field"><span class="label">' + tr("حقول يعدّلها البائع بدون موافقة", "Fields sellers can change without approval") + '</span><div class="picks">' +
      [[tr("السعر", "Price"), 1], [tr("السعر قبل الخصم", "Compare-at price"), 1], [tr("الكمية", "Stock"), 1], [tr("الاسم", "Name"), 0], [tr("الوصف", "Description"), 0], [tr("الصور", "Images"), 0], [tr("التصنيف", "Category"), 0], [tr("المواصفات", "Specs"), 0], [tr("رقم القطعة", "Part number"), 0], [tr("الحالة", "Condition"), 0], [tr("الشحن والوزن", "Shipping & weight"), 0]].map(([l, on]) => '<label><input type="checkbox"' + (on ? " checked" : "") + ">" + l + "</label>").join("") +
      '</div><span class="hint">' + tr("أي حقل غير محدد هنا يتحول تعديله إلى طلب مراجعة.", "Any field not ticked here becomes a review request when edited.") + "</span></div>" +
      '<label class="check"><input type="checkbox" checked> ' + tr("تنبيه الإدارة عند تغيير السعر بأكثر من", "Alert admins when price changes by more than") + ' <input class="input rate-input" value="30"> %</label>' +
      '<label class="check"><input type="checkbox" checked> ' + tr("كل منتج جديد يحتاج موافقة قبل النشر", "Every new product needs approval before publishing") + "</label>" +
      '<label class="check"><input type="checkbox"> ' + tr("استثناء البائعين الموثوقين (تقييم 4.8+ و 500+ طلب) من مراجعة المنتجات الجديدة", "Exempt trusted sellers (4.8+ rating, 500+ orders) from new-product review") + "</label></div></section>" +
    '<div class="modal" id="m-rv" aria-hidden="true" role="dialog" aria-labelledby="mrv-t"><form class="modal__box" id="rv-form"><div class="modal__head"><h2 id="mrv-t" style="font-size:16px">' + tr("طلب تعديل من البائع", "Request changes from seller") + '</h2><button type="button" class="close-btn" data-close aria-label="close">' + icon("x") + '</button></div><div class="modal__body form-grid"><div class="field"><span class="label">' + tr("الأسباب", "Reasons") + '</span><div class="picks">' +
      [tr("صور غير واضحة أو ناقصة", "Unclear or missing images"), tr("مواصفات ناقصة", "Missing specs"), tr("التصنيف غير صحيح", "Wrong category"), tr("الاسم لا يطابق المنتج", "Name doesn't match"), tr("السعر غير منطقي", "Unrealistic price"), tr("وصف الحالة مطلوب للمستعمل", "Condition notes required")].map((l, i) => '<label><input type="checkbox"' + (i < 2 ? " checked" : "") + ">" + l + "</label>").join("") +
      '</div></div><div class="field"><label for="rv-note">' + tr("ملاحظة للبائع", "Note to seller") + '</label><textarea class="textarea" id="rv-note">' + tr("يرجى إضافة صورتين على الأقل تُظهر لوحة البيانات بوضوح، وإكمال حقل «طرف التوصيل».", "Please add at least two images showing the nameplate clearly, and fill in the “ends” field.") + '</textarea></div><p class="muted" style="font-size:12px">' + tr("تُرسل للبائع عبر الإشعارات والبريد بقالب «منتج يحتاج تعديل».", "Sent via notification and email using the “Product needs changes” template.") + '</p></div><div class="modal__foot"><button type="button" class="btn btn--line" data-close>' + tr("إلغاء", "Cancel") + '</button><button class="btn btn--primary">' + tr("إرسال للبائع", "Send to seller") + "</button></div></form></div>";

  views["admin.products"].after = () => {
    let cur = null;
    const notifySeller = (title, kind) => { try { const s = JSON.parse(localStorage.getItem("nas_notifs")) || []; s.unshift({ kind, time: new Date().toTimeString().slice(0, 5), read: false, title: { ar: title.ar, en: title.en }, body: { ar: "قرار مراجعة من إدارة NAS Market", en: "Review decision from NAS Market" } }); localStorage.setItem("nas_notifs", JSON.stringify(s.slice(0, 20))); } catch (_) {} };
    const done = (card, html) => { card.style.opacity = ".45"; card.querySelector(".rv-card__acts").innerHTML = html; };
    $("#view").addEventListener("click", e => {
      const card = e.target.closest("[data-rv]"); if (card) cur = card;
      if (e.target.closest("[data-rv-ok]")) { done(card, badge("ok", tr("تمت الموافقة · منشور", "Approved · live"))); notifySeller({ ar: "تمت الموافقة على منتجك ونشره", en: "Your product was approved and published" }, "ok"); toast(tr("تمت الموافقة وإشعار البائع", "Approved — seller notified")); }
      if (e.target.closest("[data-rv-no]")) { done(card, badge("danger", tr("مرفوض · تم إشعار البائع", "Rejected · seller notified"))); notifySeller({ ar: "تم رفض طلب منتج/تعديل", en: "A product/edit request was rejected" }, "urgent"); toast(tr("تم الرفض وإشعار البائع", "Rejected — seller notified"), "x"); }
      if (e.target.closest("[data-rules-save]")) toast(tr("تم حفظ قواعد المراجعة", "Review rules saved"));
    });
    $("#rv-form").addEventListener("submit", e => { e.preventDefault(); closeAll(); if (cur) done(cur, badge("warn", tr("أُعيد للبائع للتعديل", "Returned to seller"))); notifySeller({ ar: "منتج يحتاج تعديلاً قبل النشر", en: "A product needs changes before publishing" }, "warn"); toast(tr("أُرسلت الملاحظات للبائع", "Notes sent to seller"), "send"); });
  };

  // Fill td[data-label] from the table header so tables can render as cards on phones
  function labelTables() {
    $$(".view table.table:not(.matrix)").forEach(tb => {
      const hs = $$("thead th", tb).map(th => th.textContent.trim());
      $$("tbody tr", tb).forEach(row => {
        let i = 0;
        Array.from(row.children).forEach(td => { if (!td.hasAttribute("data-label")) td.setAttribute("data-label", hs[i] || ""); i += +td.getAttribute("colspan") || 1; });
      });
    });
  }

  // ---------- boot ----------
  const key = APP + "." + VIEW;
  if (!views[key]) return;
  document.title = TITLES[APP][VIEW] + " | " + (APP === "seller" ? tr("لوحة البائع", "Seller Central") : tr("لوحة الإدارة", "Admin")) + " — NAS Market";
  shell();
  $("#view").innerHTML = views[key]();
  if (views[key].after) views[key].after();
  labelTables();
  let lt = 0;
  new MutationObserver(() => { cancelAnimationFrame(lt); lt = requestAnimationFrame(labelTables); }).observe($("#view"), { childList: true, subtree: true });
  document.addEventListener("keydown", e => { if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); const i = $(".top__search input"); i && i.focus(); } });
})();
