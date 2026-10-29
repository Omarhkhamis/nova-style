/* NAS.AE — shared helpers (storefront + dashboards) */
(function () {
  const html = document.documentElement;
  const LANG = html.lang || "ar";
  const ROOT = document.body.dataset.root || "";

  // Line icons (24px grid, stroke)
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    cart: '<path d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    compare: '<path d="M8 3v18M16 3v18M4 7h8M12 17h8"/><path d="m6 5-2 2 2 2M18 15l2 2-2 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    chevd: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/><path d="m8.8 12 2.3 2.3 4.3-4.6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4 2v-8.5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9s-1.2 6.3-3.7 9c-2.5-2.7-3.7-5.7-3.7-9S9.5 5.7 12 3z"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
    wallet: '<path d="M4 7h15a1 1 0 0 1 1 1v11H5a1 1 0 0 1-1-1z"/><path d="M4 7V6a2 2 0 0 1 2-2h11v3"/><circle cx="16" cy="13.5" r="1.2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.6 3.5-5.5 6.5-5.5s5.5 1.9 6.5 5.5"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/>',
    logout: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
    phone: '<path d="M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.5 1.5V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    ret: '<path d="M9 7 4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-2"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V7.5a4 4 0 1 1 8 0v3"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    upload: '<path d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    tag: '<path d="M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8.5" r="1.4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    badge: '<path d="m12 2.8 2.4 1.9 3-.3.9 2.9 2.6 1.6-1 2.9 1 2.9-2.6 1.6-.9 2.9-3-.3L12 21.2l-2.4-1.9-3 .3-.9-2.9-2.6-1.6 1-2.9-1-2.9 2.6-1.6.9-2.9 3 .3z"/><path d="m8.7 12 2.2 2.2 4.4-4.5"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>',
    attach: '<path d="m20 11.5-7.6 7.6a5 5 0 0 1-7.1-7.1l8.2-8.2a3.4 3.4 0 0 1 4.8 4.8l-8.2 8.2a1.7 1.7 0 0 1-2.4-2.4l7.4-7.4"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
    home: '<path d="M4 11 12 4l8 7v9h-5.5v-6h-5v6H4z"/>',
    store: '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5 11.5V20h14v-8.5"/><path d="M10 20v-5h4v5"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    sheet: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 9h16M4 15h16M10 3v18"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.2v.3"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14.5 8.5l2 2"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 4 3.5 2.5-2 4 3.5"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.5" y="13.5" width="4" height="6" rx="1.2"/><rect x="16.5" y="13.5" width="4" height="6" rx="1.2"/><path d="M18.5 19.5c0 1.5-2 2-5 2"/>',
    plug: '<path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z"/><path d="M12 17v4"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>'
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || "") + "</svg>";
  }

  // Temporary brand mark: gear ring + bolt + waves (inspired by the Novatech logo)
  function logoMark(dark) {
    const ring = dark ? "#122A36" : "#FFFFFF";
    let teeth = "";
    for (let a = -150; a <= 30; a += 36) {
      teeth += '<rect x="18.2" y="2" width="3.6" height="5" rx=".6" fill="' + ring + '" transform="rotate(' + a + ' 20 20)"/>';
    }
    return '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">' + teeth +
      '<circle cx="20" cy="20" r="13" fill="none" stroke="' + ring + '" stroke-width="3.6"/>' +
      '<clipPath id="lm-c' + (dark ? "d" : "l") + '"><circle cx="20" cy="20" r="11.2"/></clipPath>' +
      '<g clip-path="url(#lm-c' + (dark ? "d" : "l") + ')"><path d="M6 25.5c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0V40H6z" fill="#1E7EA2"/>' +
      '<path d="M6 29.5c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0" fill="none" stroke="' + (dark ? "#fff" : "#0B1C25") + '" stroke-width="1.2"/></g>' +
      '<path d="M22.5 9.5 15.5 20h4.6l-1.6 6.8 7-10.4h-4.6z" fill="#F6D24E"/></svg>';
  }
  // NAS.AE STORE logo: white version on dark surfaces (dashboard sidebar), colour version when dark=true (light surface)
  function brand(href, dark) {
    return '<a class="brand' + (dark ? " brand--dark" : "") + '" href="' + href + '" aria-label="NAS.AE Store"><img src="' + ROOT + "assets/brand/nas-store" + (dark ? "" : "-white") + '.png" alt="NAS.AE Store" style="height:40px;width:auto"></a>';
  }


  function wave(cls) {
    return '<svg class="wave ' + (cls || "") + '" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M0 10 C 100 2, 200 2, 300 10 S 500 18, 600 10 S 800 2, 900 10 S 1100 18, 1200 10"/>' +
      '<path d="M0 19 C 100 11, 200 11, 300 19 S 500 27, 600 19 S 800 11, 900 19 S 1100 27, 1200 19" opacity=".45"/></svg>';
  }

  // Banners (shared by storefront and admin preview). b = banner record, lang = ar|en|ur
  function bannerText(b, k, lang) { const v = b[k] || {}; return v[lang] || v.en || v.ar || ""; }
  function bannerHTML(b, lang, root) {
    const tx = k => esc(bannerText(b, k, lang));
    const img = (root || "") + "assets/img/" + b.img + ".jpg";
    const arrow = '<svg class="icon icon--sm flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    const href = (root || "") + (b.link || "#");
    if (b.place === "wide") {
      return '<a class="wbanner wbanner--' + b.theme + '" href="' + href + '" data-banner="' + b.id + '">' +
        '<div class="wbanner__copy">' + (tx("tag") ? '<span class="wbanner__tag">' + tx("tag") + "</span>" : "") +
        "<h2>" + tx("title") + "</h2>" + (tx("sub") ? "<p>" + tx("sub") + "</p>" : "") +
        '<span class="wbanner__cta">' + tx("cta") + arrow + "</span></div>" +
        (b.code ? '<div class="wbanner__code plate"><span class="plate__key">' + (lang === "en" ? "CODE" : lang === "ur" ? "کوڈ" : "الكود") + '</span><b>' + esc(b.code) + "</b></div>" : "") +
        '<div class="wbanner__img"><img src="' + img + '" alt="" loading="lazy" width="640" height="420"></div></a>';
    }
    return '<a class="pbanner pbanner--' + b.theme + '" href="' + href + '" data-banner="' + b.id + '">' +
      '<div class="pbanner__copy">' + (tx("tag") ? '<span class="pbanner__tag">' + tx("tag") + "</span>" : "") +
      "<h3>" + tx("title") + "</h3>" + (tx("sub") ? "<p>" + tx("sub") + "</p>" : "") +
      '<span class="pbanner__cta">' + tx("cta") + arrow + "</span></div>" +
      '<div class="pbanner__img"><img src="' + img + '" alt="" loading="lazy" width="480" height="360"></div></a>';
  }
  // Banners saved from the admin panel (this browser) override the demo defaults
  function liveBanners(defaults) {
    let list;
    try { list = JSON.parse(localStorage.getItem("nas_banners")); } catch (e) { list = null; }
    return Array.isArray(list) ? list : defaults;
  }
  // Category tree saved from admin/categories.html (this browser) overrides the defaults
  function liveCats(defaults) {
    let t;
    try { t = JSON.parse(localStorage.getItem("nas_cats")); } catch (e) { t = null; }
    return Array.isArray(t) ? t : defaults;
  }
  function bannerOn(b) {
    if (!b.active) return false;
    const today = new Date().toISOString().slice(0, 10);
    return (!b.start || b.start <= today) && (!b.end || b.end >= today);
  }

  // Numbers: Latin digits everywhere
  const nf0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  const nf2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function num(n, d) { return (d ? nf2 : nf0).format(n); }
  const CUR = { ar: "درهم", en: "AED", ur: "درہم" };
  function money(n, opts) {
    opts = opts || {};
    const v = opts.dec === false ? nf0.format(n) : nf2.format(n);
    return '<span class="price">' + v + "<small>" + (CUR[LANG] || "AED") + "</small></span>";
  }
  function moneyTxt(n) { return nf2.format(n) + " " + (CUR[LANG] || "AED"); }

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.from((el || document).querySelectorAll(s)); }

  // Safe storage (private mode / blocked storage)
  const store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  // Toasts
  function toast(msg, ic) {
    let host = $(".toast-host");
    if (!host) { host = document.createElement("div"); host.className = "toast-host"; host.setAttribute("aria-live", "polite"); document.body.appendChild(host); }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = icon(ic || "check") + "<span>" + msg + "</span>";
    host.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  // Overlay-backed panels (drawers, modals)
  let overlay;
  function ensureOverlay() {
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.addEventListener("click", closeAll);
      document.body.appendChild(overlay);
    }
    return overlay;
  }
  let lastFocus = null;
  function open(el) {
    if (typeof el === "string") el = $(el);
    if (!el) return;
    lastFocus = document.activeElement;
    ensureOverlay().classList.add("is-open");
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const f = el.querySelector("input, select, textarea, button:not(.close-btn), a[href]");
    setTimeout(() => f && f.focus({ preventScroll: true }), 50);
  }
  function closeAll() {
    $$(".drawer.is-open, .modal.is-open, .mnav.is-open, .filters.is-open, .bsheet.is-open, .side.is-open, .catdrawer.is-open").forEach(e => { e.classList.remove("is-open"); e.setAttribute("aria-hidden", "true"); });
    overlay && overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); open(o.dataset.open); return; }
    if (e.target.closest("[data-close]")) { e.preventDefault(); closeAll(); }
  });
  // Modals: click outside the box closes
  document.addEventListener("click", e => { if (e.target.classList && e.target.classList.contains("modal")) closeAll(); });

  // Tabs: [role=tablist] > [role=tab][aria-controls]
  document.addEventListener("click", e => {
    const t = e.target.closest('[role="tab"]');
    if (!t) return;
    const list = t.closest('[role="tablist"]');
    $$('[role="tab"]', list).forEach(x => {
      x.setAttribute("aria-selected", x === t ? "true" : "false");
      const p = x.getAttribute("aria-controls") && document.getElementById(x.getAttribute("aria-controls"));
      if (p) p.hidden = x !== t;
    });
    list.dispatchEvent(new CustomEvent("tabchange", { detail: t, bubbles: true }));
  });

  // Light reveal on scroll
  function reveal(scope) {
    const els = $$(".reveal:not(.is-in)", scope);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(e => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i % 5, 4) * 50 + "ms"; io.observe(e); });
  }

  window.NAS = { LANG, ROOT, icon, brand, logoMark, wave, num, money, moneyTxt, esc, $, $$, store, toast, open, closeAll, reveal, bannerHTML, bannerText, liveBanners, bannerOn, liveCats };
})();
