/* Demo catalog data — replace with the real API later.
   Names: ar / en / ur. Prices in AED (excl. VAT). */

window.NAS_DATA = (function () {
  const categories = [
    { id: "marine", ar: "بحري", en: "Marine", ur: "سمندری", img: "b-marine", count: 1240, code: "01" },
    { id: "electrical", ar: "كهرباء", en: "Electrical", ur: "برقی سامان", img: "b-electrical", count: 3115, code: "02" },
    { id: "hvac", ar: "تكييف وتبريد", en: "HVAC & Refrigeration", ur: "اے سی اور ریفریجریشن", img: "b-hvac", count: 1870, code: "03" },
    { id: "automation", ar: "أتمتة وتحكم", en: "Automation & Control", ur: "آٹومیشن اور کنٹرول", img: "b-automation", count: 960, code: "04" },
    { id: "mech", ar: "ميكانيك وCNC", en: "Mechanical & CNC", ur: "مکینیکل اور سی این سی", img: "b-cnc", count: 2204, code: "05" },
    { id: "pumps", ar: "مضخات وصمامات", en: "Pumps & Valves", ur: "پمپ اور والوز", img: "b-valves", count: 1488, code: "06" },
    { id: "tools", ar: "عدد وأدوات", en: "Tools", ur: "اوزار", img: "b-tools", count: 2650, code: "07" },
    { id: "safety", ar: "معدات السلامة", en: "Safety Gear", ur: "حفاظتی سامان", img: "b-safety", count: 735, code: "08" }
  ];

  // code = the only seller identity buyers ever see; company names stay with the admin
  const vendors = [
    { id: "v1", code: "S-1042", ar: "الخليج للتوريدات البحرية", en: "Gulf Marine Supply", city: { ar: "دبي", en: "Dubai" }, rating: 4.8, reviews: 312, since: 2026, products: 486, response: "2h", verified: true, cover: "b-pumproom" },
    { id: "v2", code: "S-2087", ar: "مصدر الطاقة للكهربائيات", en: "PowerSource Electric", city: { ar: "الشارقة", en: "Sharjah" }, rating: 4.6, reviews: 205, since: 2026, products: 1120, response: "4h", verified: true, cover: "b-electrical" },
    { id: "v3", code: "S-3115", ar: "بارد لأنظمة التبريد", en: "Barid Cooling Systems", city: { ar: "عجمان", en: "Ajman" }, rating: 4.7, reviews: 148, since: 2026, products: 390, response: "3h", verified: true, cover: "b-hvac" },
    { id: "v4", code: "S-4026", ar: "الدقة للعدد الصناعية", en: "Precision Industrial Tools", city: { ar: "أبوظبي", en: "Abu Dhabi" }, rating: 4.5, reviews: 97, since: 2026, products: 820, response: "6h", verified: true, cover: "b-cnc2" },
    { id: "v5", code: "S-5063", ar: "حماية لمعدات السلامة", en: "Himaya Safety Equipment", city: { ar: "دبي", en: "Dubai" }, rating: 4.9, reviews: 260, since: 2026, products: 214, response: "1h", verified: true, cover: "b-safety" }
  ];

  // cond: new | used | refurb
  const products = [
    { id: "p10", sku: "IM-3P-2K2-B3", cat: "electrical", v: "v2", cond: "new", price: 1180, old: 1350, stock: 14, rating: 4.7, reviews: 38, img: "p10",
      ar: "محرك كهربائي 3 فاز 2.2 كيلوواط، 1450 دورة", en: "3-Phase Induction Motor 2.2 kW, 1450 rpm", ur: "تھری فیز موٹر 2.2 کلوواٹ",
      specs: { power: "2.2 kW / 3 HP", voltage: "380–415 V, 50 Hz", speed: "1450 rpm", frame: "B3 · IEC 100L", ip: "IP55", weight: "24 kg" } },
    { id: "p04", sku: "CP-IL-4K", cat: "pumps", v: "v1", cond: "new", price: 3950, old: 4400, stock: 6, rating: 4.8, reviews: 21, img: "p04",
      ar: "مضخة طرد مركزي عمودية 4 كيلوواط", en: "Inline Centrifugal Pump 4 kW", ur: "ان لائن سینٹری فیوگل پمپ 4 کلوواٹ",
      specs: { power: "4 kW", flow: "42 m³/h", head: "32 m", inlet: "DN65", body: "Cast iron", weight: "68 kg" } },
    { id: "p13", sku: "MG-R410A-2V", cat: "hvac", v: "v3", cond: "new", price: 265, old: 310, stock: 40, rating: 4.6, reviews: 55, img: "p13",
      ar: "مانيفولد قياس فريون R410A مع خراطيم", en: "Refrigerant Manifold Gauge Set R410A", ur: "ریفریجرینٹ گیج سیٹ R410A",
      specs: { refrigerants: "R410A / R32 / R22", gauges: "2 × 80 mm", hoses: "3 × 150 cm", class: "1.0" } },
    { id: "p19", sku: "TW-SET-14", cat: "tools", v: "v4", cond: "new", price: 340, old: 395, stock: 18, rating: 4.5, reviews: 19, img: "p19",
      ar: "طقم مفتاح عزم مع 13 مفتاح شق", en: "Torque Wrench Set with 13 Spanners", ur: "ٹارک رینچ سیٹ",
      specs: { range: "40–210 N·m", drive: '1/2"', spanners: "8–22 mm", case: "Steel" } },
    { id: "p25", sku: "GL-CUT-L5", cat: "safety", v: "v5", cond: "new", price: 18, old: 24, stock: 600, rating: 4.8, reviews: 140, img: "p25",
      ar: "قفازات عمل مقاومة للقطع – مستوى 5", en: "Cut-Resistant Work Gloves – Level 5", ur: "کٹ ریزسٹنٹ دستانے",
      specs: { standard: "EN388 4X43F", sizes: "M / L / XL", material: "HPPE + leather palm" } },
    { id: "p07", sku: "MCB-3P-C32", cat: "electrical", v: "v2", cond: "new", price: 95, stock: 220, rating: 4.7, reviews: 64, img: "p07",
      ar: "قاطع تيار 3 فاز 32 أمبير منحنى C", en: "3-Pole MCB 32A C-Curve", ur: "تھری پول ایم سی بی 32A",
      specs: { poles: "3P", current: "32 A", curve: "C", breaking: "6 kA", mount: "DIN rail" } },
    { id: "p26", sku: "PR-BZ-4B-24", cat: "marine", v: "v1", cond: "refurb", price: 6800, stock: 2, rating: 4.9, reviews: 7, img: "p26",
      ar: "رفاص برونزي 4 ريش قطر 24 إنش (مجدد)", en: 'Bronze 4-Blade Propeller 24" (Refurbished)', ur: "کانسی پروپیلر 24 انچ",
      specs: { diameter: '24"', blades: "4", material: "Ni-Al bronze", bore: "45 mm taper", rotation: "RH" } },
    { id: "p06", sku: "6310-2RS", cat: "mech", v: "v4", cond: "new", price: 68, stock: 150, rating: 4.6, reviews: 88, img: "p06",
      ar: "رولمان بلي أخدودي 6310-2RS", en: "Deep Groove Ball Bearing 6310-2RS", ur: "بال بیئرنگ 6310-2RS",
      specs: { bore: "50 mm", od: "110 mm", width: "27 mm", seal: "2RS rubber", rpm: "6300" } },
    { id: "p01", sku: "BV-BR-100", cat: "pumps", v: "v1", cond: "new", price: 45, old: 58, stock: 320, rating: 4.5, reviews: 102, img: "p01",
      ar: "صمام كروي نحاسي 1 إنش بمقبض", en: 'Brass Ball Valve 1" Lever Handle', ur: "پیتل بال والو 1 انچ",
      specs: { size: '1" BSP', pressure: "PN25", material: "Brass CW617N", temp: "-10…120 °C" } },
    { id: "p02", sku: "CV-SS316-200", cat: "pumps", v: "v1", cond: "new", price: 640, stock: 12, rating: 4.7, reviews: 15, img: "p02",
      ar: "صمام عدم رجوع ستانلس 316 قياس 2 إنش", en: 'Stainless 316 Check Valve 2" Flanged', ur: "اسٹین لیس چیک والو 2 انچ",
      specs: { size: '2" / DN50', class: "ANSI 150", material: "SS316L", ends: "Flanged RF" } },
    { id: "p03", sku: "GV-DN50-PN16", cat: "pumps", v: "v1", cond: "refurb", price: 780, stock: 4, rating: 4.4, reviews: 6, img: "p03",
      ar: "صمام Globe بفلنجة DN50 (مجدد)", en: "Globe Valve DN50 Flanged (Refurbished)", ur: "گلوب والو DN50",
      specs: { size: "DN50", pressure: "PN16", body: "Ductile iron", handwheel: "Yes" } },
    { id: "p05", sku: "SP-6-HD", cat: "pumps", v: "v1", cond: "used", price: 12500, stock: 1, rating: 4.3, reviews: 3, img: "p05",
      ar: "مضخة طين صناعية 6 إنش (مستعملة)", en: 'Heavy-Duty Slurry Pump 6" (Used)', ur: "سلری پمپ 6 انچ",
      specs: { outlet: '6"', liner: "Hi-chrome", hours: "≈ 3,200 h", inspection: "Report attached" } },
    { id: "p08", sku: "MCB-2P-C16", cat: "electrical", v: "v2", cond: "new", price: 38, old: 45, stock: 400, rating: 4.6, reviews: 77, img: "p08",
      ar: "قاطع تيار ثنائي 16 أمبير", en: "2-Pole MCB 16A", ur: "ٹو پول ایم سی بی 16A",
      specs: { poles: "2P", current: "16 A", curve: "C", breaking: "4.5 kA" } },
    { id: "p09", sku: "CT-25A-220", cat: "automation", v: "v2", cond: "new", price: 145, stock: 85, rating: 4.5, reviews: 29, img: "p09",
      ar: "كونتاكتور 3 فاز 25 أمبير ملف 220V", en: "3-Phase Contactor 25A, 220V Coil", ur: "کنٹیکٹر 25A",
      specs: { current: "25 A AC-3", coil: "220 V AC", aux: "1NO + 1NC", mount: "DIN rail" } },
    { id: "p11", sku: "DMM-600-CAT3", cat: "tools", v: "v4", cond: "new", price: 119, stock: 60, rating: 4.4, reviews: 51, img: "p11",
      ar: "ملتيميتر رقمي مع مجسات CAT III", en: "Digital Multimeter with Probes CAT III", ur: "ڈیجیٹل ملٹی میٹر",
      specs: { voltage: "600 V AC/DC", current: "10 A", safety: "CAT III 600V", display: "2000 counts" } },
    { id: "p12", sku: "PG-SS-160-2500", cat: "automation", v: "v1", cond: "new", price: 420, stock: 9, rating: 4.8, reviews: 12, img: "p12",
      ar: "مانوميتر ضغط ستانلس 0–2500 بار", en: "Stainless Pressure Gauge 0–2500 bar", ur: "پریشر گیج 2500 بار",
      specs: { range: "0–2500 bar", dial: "160 mm", accuracy: "Class 1.0", connection: '1/2" NPT' } },
    { id: "p14", sku: "TH-BM-85", cat: "hvac", v: "v3", cond: "new", price: 22, stock: 500, rating: 4.3, reviews: 40, img: "p14",
      ar: "ثرموستات بايمتال 85°م", en: "Bimetal Thermostat 85°C", ur: "تھرموسٹیٹ 85°C",
      specs: { cutoff: "85 °C", rating: "10 A / 250 V", type: "NC auto-reset" } },
    { id: "p15", sku: "HF-E-10M", cat: "marine", v: "v1", cond: "new", price: 75, stock: 70, rating: 4.6, reviews: 23, img: "p15",
      ar: "عنصر فلتر زيت هيدروليك 10 ميكرون", en: "Hydraulic Oil Filter Element 10 µm", ur: "ہائیڈرولک فلٹر",
      specs: { rating: "10 µm", media: "Glass fibre", collapse: "21 bar" } },
    { id: "p16", sku: "HF-12-SET3", cat: "mech", v: "v4", cond: "new", price: 85, stock: 45, rating: 4.4, reviews: 9, img: "p16",
      ar: "وصلات خراطيم هيدروليك 1/2 إنش (طقم 3)", en: 'Hydraulic Hose Fittings 1/2" (Set of 3)', ur: "ہائیڈرولک فٹنگز",
      specs: { size: '1/2" BSP', material: "Zinc-plated steel", pressure: "350 bar" } },
    { id: "p17", sku: "SV-COIL-24DC", cat: "automation", v: "v2", cond: "new", price: 55, stock: 130, rating: 4.5, reviews: 18, img: "p17",
      ar: "ملف صمام سولينويد 24V DC", en: "Solenoid Valve Coil 24V DC", ur: "سولینائیڈ کوائل 24V",
      specs: { voltage: "24 V DC", power: "3 W", protection: "IP65", connector: "DIN 43650" } },
    { id: "p18", sku: "PA-DA-063", cat: "automation", v: "v2", cond: "refurb", price: 890, stock: 3, rating: 4.2, reviews: 4, img: "p18",
      ar: "مشغل هوائي مزدوج مع صمام سولينويد (مجدد)", en: "Double-Acting Pneumatic Actuator (Refurbished)", ur: "نیومیٹک ایکچویٹر",
      specs: { size: "DA-063", torque: "≈ 40 N·m @ 6 bar", interface: "ISO 5211 / NAMUR" } },
    { id: "p20", sku: "AG-115-850", cat: "tools", v: "v4", cond: "new", price: 210, stock: 33, rating: 4.6, reviews: 61, img: "p20",
      ar: "صاروخ جلخ 4.5 إنش 850 واط", en: 'Angle Grinder 4.5" 850W', ur: "اینگل گرائنڈر 850W",
      specs: { disc: "115 mm", power: "850 W", speed: "11,000 rpm" } },
    { id: "p21", sku: "CD-18V-2B", cat: "tools", v: "v4", cond: "used", price: 120, stock: 2, rating: 4.1, reviews: 5, img: "p21",
      ar: "دريل شحن 18 فولت مع بطارية (مستعمل)", en: "Cordless Drill 18V with Battery (Used)", ur: "کارڈلیس ڈرل 18V",
      specs: { voltage: "18 V", chuck: "13 mm", battery: "1 × 2.0 Ah" } },
    { id: "p22", sku: "DC-JT-SET3", cat: "mech", v: "v4", cond: "used", price: 160, stock: 1, rating: 4.3, reviews: 2, img: "p22",
      ar: "ظرف دريل مخروطي (طقم 3 – مستعمل)", en: "Taper Drill Chuck Set of 3 (Used)", ur: "ڈرل چک سیٹ",
      specs: { capacity: "1–13 / 3–16 / 5–20 mm", taper: "MT2 / MT3" } },
    { id: "p23", sku: "SH-WH-EN397", cat: "safety", v: "v5", cond: "new", price: 28, stock: 900, rating: 4.7, reviews: 210, img: "p23",
      ar: "خوذة سلامة بيضاء EN397", en: "White Safety Helmet EN397", ur: "سیفٹی ہیلمٹ",
      specs: { standard: "EN397", shell: "HDPE", suspension: "6-point" } },
    { id: "p24", sku: "SB-S3-STL", cat: "safety", v: "v5", cond: "new", price: 165, stock: 120, rating: 4.6, reviews: 74, img: "p24",
      ar: "حذاء سلامة جلد بمقدمة فولاذية S3", en: "Leather Safety Boots Steel Toe S3", ur: "سیفٹی بوٹ",
      specs: { standard: "EN ISO 20345 S3", toe: "Steel 200 J", sizes: "39–46" }, sizes: ["39", "40", "41", "42", "43", "44", "45", "46"] },
    { id: "p27", sku: "IF-PD-30", cat: "hvac", v: "v3", cond: "new", price: 295, stock: 25, rating: 4.4, reviews: 33, img: "p27",
      ar: "مروحة صناعية أرضية 30 إنش", en: 'Industrial Pedestal Fan 30"', ur: "انڈسٹریل پنکھا 30 انچ",
      specs: { diameter: '30"', power: "210 W", airflow: "9,500 m³/h" } },
    { id: "p28", sku: "CB-4X6-100", cat: "electrical", v: "v2", cond: "new", price: 1450, stock: 8, rating: 4.7, reviews: 11, img: "p28",
      ar: "بكرة كابل كهرباء 4×6 مم² طول 100 م", en: "Power Cable 4×6 mm², 100 m Reel", ur: "پاور کیبل 100 میٹر",
      specs: { cores: "4 × 6 mm²", insulation: "XLPE/PVC", voltage: "0.6/1 kV" } }
  ];

  // Other vendors selling the same part (marketplace offers)
  const offers = {
    p10: [
      { v: "v4", cond: "new", price: 1215, eta: { ar: "1–2 يوم", en: "1–2 days" } },
      { v: "v1", cond: "refurb", price: 790, eta: { ar: "2–3 أيام", en: "2–3 days" } },
      { v: "v2", cond: "used", price: 560, eta: { ar: "1–2 يوم", en: "1–2 days" } }
    ]
  };

  const specLabels = {
    power: "القدرة", voltage: "الجهد", speed: "السرعة", frame: "الإطار", ip: "درجة الحماية", weight: "الوزن",
    flow: "التدفق", head: "الرفع", inlet: "المدخل", body: "جسم المضخة", refrigerants: "غازات التبريد", gauges: "العدادات",
    hoses: "الخراطيم", class: "دقة القياس", range: "المدى", drive: "مقاس التوصيل", spanners: "المفاتيح", case: "الحقيبة",
    standard: "المعيار", sizes: "المقاسات", material: "المادة", poles: "الأقطاب", current: "التيار", curve: "المنحنى",
    breaking: "قدرة القطع", mount: "التركيب", diameter: "القطر", blades: "عدد الريش", bore: "القطر الداخلي", rotation: "اتجاه الدوران",
    od: "القطر الخارجي", width: "العرض", seal: "مانع التسرب", rpm: "أقصى سرعة", size: "المقاس", pressure: "الضغط", temp: "الحرارة",
    ends: "طرف التوصيل", handwheel: "مقود يدوي", outlet: "المخرج", liner: "البطانة", hours: "ساعات التشغيل", inspection: "تقرير الفحص",
    coil: "الملف", aux: "تلامسات مساعدة", safety: "فئة الأمان", display: "الشاشة", dial: "قطر القرص", accuracy: "الدقة",
    connection: "التوصيل", cutoff: "حرارة الفصل", rating: "التصنيف", type: "النوع", media: "وسط الترشيح", collapse: "ضغط الانهيار",
    protection: "الحماية", connector: "الموصل", torque: "العزم", interface: "واجهة التركيب", disc: "قرص", battery: "البطارية",
    chuck: "الظرف", capacity: "السعة", taper: "المخروط", shell: "الهيكل", suspension: "التعليق", toe: "المقدمة",
    airflow: "تدفق الهواء", cores: "الأسلاك", insulation: "العزل"
  };

  // Banners managed from the admin panel (admin/banners.html). place: topbar | wide | promo
  const banners = [
    { id: "b1", place: "topbar", active: true, order: 1, start: "2026-10-01", end: "2026-12-31", theme: "navy", img: "", link: "category.html?deals=1",
      title: { ar: "كود PUMP15 خصم 15% على المضخات والصمامات · توصيل لكل الإمارات", en: "Code PUMP15 for 15% off pumps & valves · Delivery across the UAE", ur: "کوڈ PUMP15 پمپس اور والوز پر 15% رعایت · پورے امارات میں ڈیلیوری" },
      views: 48210, clicks: 1206 },
    { id: "b2", place: "wide", active: true, order: 1, start: "2026-10-15", end: "2026-11-30", theme: "volt", img: "p04", link: "category.html?c=pumps", code: "PUMP15",
      tag: { ar: "عرض محدود · حتى 30 نوفمبر", en: "Limited offer · until 30 Nov", ur: "محدود آفر · 30 نومبر تک" },
      title: { ar: "خصم 15% على المضخات والصمامات", en: "15% off pumps & valves", ur: "پمپس اور والوز پر 15% رعایت" },
      sub: { ar: "من كل البائعين الموثّقين، استخدم الكود عند إتمام الطلب.", en: "From every verified seller. Apply the code at checkout.", ur: "تمام تصدیق شدہ فروخت کنندگان سے۔ چیک آؤٹ پر کوڈ استعمال کریں۔" },
      cta: { ar: "تسوّق العرض", en: "Shop the offer", ur: "آفر دیکھیں" }, views: 31870, clicks: 2244 },
    { id: "b3", place: "promo", active: true, order: 1, start: "2026-10-01", end: "2026-12-31", theme: "navy", img: "b-hvac", link: "category.html?c=hvac",
      tag: { ar: "حتى 20%", en: "Up to 20%", ur: "20% تک" },
      title: { ar: "موسم صيانة التكييف", en: "AC maintenance season", ur: "اے سی مینٹیننس سیزن" },
      sub: { ar: "كمبروسرات، أدوات قياس وغازات تبريد.", en: "Compressors, gauges and refrigerants.", ur: "کمپریسر، گیجز اور ریفریجرینٹس۔" },
      cta: { ar: "تسوّق التكييف", en: "Shop HVAC", ur: "اے سی دیکھیں" }, views: 22340, clicks: 980 },
    { id: "b4", place: "promo", active: true, order: 2, start: "2026-10-01", end: "2026-12-31", theme: "marine", img: "b-safety", link: "category.html?c=safety",
      tag: { ar: "أسعار الجملة", en: "Bulk pricing", ur: "ہول سیل قیمتیں" },
      title: { ar: "معدات السلامة لفرق العمل", en: "Safety gear for your crews", ur: "ٹیموں کے لیے حفاظتی سامان" },
      sub: { ar: "خوذ وقفازات وأحذية، أسعار خاصة من 50 قطعة.", en: "Helmets, gloves and boots — special prices from 50 pcs.", ur: "ہیلمٹ، دستانے اور جوتے — 50 عدد سے خاص قیمت۔" },
      cta: { ar: "اطلب عرض سعر", en: "Request a quote", ur: "قیمت طلب کریں" }, views: 19120, clicks: 640 },
    { id: "b5", place: "promo", active: false, order: 3, start: "2026-11-01", end: "2026-11-30", theme: "volt", img: "b-cnc2", link: "category.html?c=mech",
      tag: { ar: "مستعمل ومجدد", en: "Used & refurbished", ur: "استعمال شدہ اور مرمت شدہ" },
      title: { ar: "قطع CNC بحالة ممتازة", en: "CNC parts in great condition", ur: "بہترین حالت میں CNC پرزے" },
      sub: { ar: "مفحوصة من البائع مع تقرير الحالة.", en: "Seller-inspected, with a condition report.", ur: "فروخت کنندہ کی جانچ اور رپورٹ کے ساتھ۔" },
      cta: { ar: "تصفّح القطع", en: "Browse parts", ur: "پرزے دیکھیں" }, views: 0, clicks: 0 }
  ];

  // Category tree: main → sub → sub-sub (managed from admin/categories.html).
  // attrs = spec fields the seller fills for products in that branch (inherited by children).
  const n = (id, ar, en, ur, extra) => Object.assign({ id, ar, en, ur: ur || "", visible: true, children: [] }, extra || {});
  const catTree = [
    n("marine", "بحري", "Marine", "سمندری", { children: [
      n("propulsion", "الدفع والرفاصات", "Propulsion", "", { attrs: ["diameter", "blades", "material", "bore"], children: [n("propellers", "رفاصات", "Propellers"), n("shafts", "أعمدة الرفاص", "Propeller shafts"), n("stern-seals", "موانع تسرب المؤخرة", "Stern seals")] }),
      n("marine-filters", "فلاتر بحرية", "Marine filters", "", { attrs: ["rating", "media", "collapse"], children: [n("oil-filters", "فلاتر زيت", "Oil filters"), n("fuel-filters", "فلاتر وقود", "Fuel filters")] }),
      n("deck", "معدات السطح", "Deck equipment", "", { children: [n("winches", "ونشات", "Winches"), n("mooring", "معدات الرسو", "Mooring")] })] }),
    n("electrical", "كهرباء", "Electrical", "برقی سامان", { children: [
      n("motors", "محركات كهربائية", "Electric motors", "", { attrs: ["power", "voltage", "speed", "frame", "ip", "weight"], children: [n("motors-3p", "محركات 3 فاز", "3-phase motors"), n("motors-1p", "محركات 1 فاز", "Single-phase motors"), n("servo", "محركات سيرفو", "Servo motors")] }),
      n("breakers", "قواطع ولوحات", "Breakers & panels", "", { attrs: ["poles", "current", "curve", "breaking"], children: [n("mcb", "قواطع MCB", "MCB"), n("mccb", "قواطع MCCB", "MCCB"), n("rccb", "قواطع تسريب RCCB", "RCCB")] }),
      n("cables", "كابلات", "Cables", "", { attrs: ["cores", "insulation", "voltage"], children: [n("power-cables", "كابلات قوى", "Power cables"), n("control-cables", "كابلات تحكم", "Control cables")] })] }),
    n("hvac", "تكييف وتبريد", "HVAC & Refrigeration", "اے سی اور ریفریجریشن", { children: [
      n("compressors", "كمبروسرات", "Compressors", "", { attrs: ["power", "refrigerants"], children: [n("scroll", "سكرول", "Scroll"), n("rotary", "روتاري", "Rotary")] }),
      n("hvac-tools", "أدوات قياس وخدمة", "Service & gauges", "", { attrs: ["refrigerants", "gauges"], children: [n("manifolds", "مانيفولد", "Manifolds"), n("leak", "كاشف تسريب", "Leak detectors")] }),
      n("controls", "ثرموستات وحساسات", "Thermostats & sensors", "", { attrs: ["cutoff", "rating", "type"] })] }),
    n("automation", "أتمتة وتحكم", "Automation & Control", "آٹومیشن اور کنٹرول", { children: [
      n("contactors", "كونتاكتورات وريليهات", "Contactors & relays", "", { attrs: ["current", "coil", "aux"], children: [n("contactors-ac", "كونتاكتورات AC", "AC contactors"), n("relays", "ريليهات", "Relays")] }),
      n("valves-auto", "صمامات سولينويد ومشغلات", "Solenoids & actuators", "", { attrs: ["voltage", "power", "protection"], children: [n("coils", "ملفات سولينويد", "Solenoid coils"), n("actuators", "مشغلات هوائية", "Pneumatic actuators")] }),
      n("instruments", "أجهزة قياس", "Instruments", "", { attrs: ["range", "dial", "accuracy", "connection"], children: [n("gauges", "مانوميترات", "Pressure gauges")] })] }),
    n("mech", "ميكانيك وCNC", "Mechanical & CNC", "مکینیکل اور سی این سی", { children: [
      n("bearings", "رولمان بلي", "Bearings", "", { attrs: ["bore", "od", "width", "seal", "rpm"], children: [n("ball", "بلي كروي", "Ball bearings"), n("roller", "بلي أسطواني", "Roller bearings")] }),
      n("hydraulics", "هيدروليك", "Hydraulics", "", { attrs: ["size", "pressure", "material"], children: [n("fittings", "وصلات", "Fittings"), n("hoses", "خراطيم", "Hoses")] }),
      n("cnc", "أدوات CNC", "CNC tooling", "", { children: [n("chucks", "ظروف", "Chucks"), n("endmills", "فريزات", "End mills")] })] }),
    n("pumps", "مضخات وصمامات", "Pumps & Valves", "پمپ اور والوز", { children: [
      n("pumps-c", "مضخات", "Pumps", "", { attrs: ["power", "flow", "head", "inlet", "body"], children: [n("centrifugal", "طرد مركزي", "Centrifugal"), n("submersible", "غاطسة", "Submersible"), n("slurry", "مضخات طين", "Slurry")] }),
      n("valves", "صمامات", "Valves", "", { attrs: ["size", "pressure", "material", "ends"], children: [n("ball-valves", "صمامات كروية", "Ball valves"), n("check-valves", "صمامات عدم رجوع", "Check valves"), n("globe-valves", "صمامات Globe", "Globe valves")] })] }),
    n("tools", "عدد وأدوات", "Tools", "اوزار", { children: [
      n("power-tools", "عدد كهربائية", "Power tools", "", { attrs: ["power", "voltage", "disc"], children: [n("grinders", "صواريخ جلخ", "Angle grinders"), n("drills", "دريلات", "Drills")] }),
      n("hand-tools", "عدد يدوية", "Hand tools", "", { attrs: ["range", "drive"], children: [n("wrenches", "مفاتيح عزم", "Torque wrenches")] }),
      n("test", "أجهزة فحص", "Test equipment", "", { attrs: ["voltage", "current", "safety"], children: [n("multimeters", "ملتيميتر", "Multimeters")] })] }),
    n("safety", "معدات السلامة", "Safety Gear", "حفاظتی سامان", { children: [
      n("head", "حماية الرأس", "Head protection", "", { attrs: ["standard", "shell"], children: [n("helmets", "خوذ", "Helmets")] }),
      n("hands", "حماية اليدين", "Hand protection", "", { attrs: ["standard", "sizes", "material"], children: [n("cut-gloves", "قفازات مقاومة للقطع", "Cut-resistant gloves")] }),
      n("feet", "أحذية السلامة", "Safety footwear", "", { attrs: ["standard", "toe", "sizes"] })] })
  ];

  return { categories, vendors, products, offers, specLabels, banners, catTree };
})();
