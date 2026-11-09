(function () {
  var $ = function (id) { return document.getElementById(id); };
  var NAME = { ar: "محمود صقر", en: "Mahmoud Saqr" };
  var H1 = { ar: "صفحة الراوتر <em>بضغطة واحدة</em>", en: "Your router page, <em>one tap away</em>" };
  /* theme-init.js already resolved the language before first paint (saved choice > system language) */
  var lang = document.documentElement.lang === "en" ? "en" : "ar";
  var theme = "", saved = false;
  try { var sv = localStorage.getItem("rqa-lang"); saved = sv === "ar" || sv === "en"; theme = localStorage.getItem("rqa-theme") || ""; } catch (e) {}
  var DESC = {
    ar: "افتح صفحة إعدادات الراوتر بضغطة واحدة. تطبيق لأندرويد وويندوز من تطوير محمود صقر.",
    en: "Open your router's admin page in one tap. An Android and Windows app by Mahmoud Saqr."
  };
  function isDark() { return theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function applyTheme() {
    if (theme) document.documentElement.setAttribute("data-theme", theme); else document.documentElement.removeAttribute("data-theme");
    var dark = isDark();
    var tb = $("themeBtn"), tl = dark ? (lang === "ar" ? "الوضع الفاتح" : "Light mode") : (lang === "ar" ? "الوضع الداكن" : "Dark mode");
    tb.setAttribute("data-mode", dark ? "dark" : "light"); tb.setAttribute("aria-label", tl); tb.setAttribute("data-tip", tl);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", dark ? "#0A1026" : "#F4F6FB");
  }
  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    var els = document.querySelectorAll("[data-ar]");
    for (var i = 0; i < els.length; i++) els[i].textContent = els[i].getAttribute("data-" + lang);
    var alts = document.querySelectorAll("[data-alt-ar]");
    for (var a = 0; a < alts.length; a++) alts[a].setAttribute("alt", alts[a].getAttribute("data-alt-" + lang));
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", DESC[lang]);
    $("h1").innerHTML = H1[lang];
    $("devName").textContent = NAME[lang];
    $("av").textContent = lang === "ar" ? "م" : "M";
    $("copy").textContent = "© 2026 " + NAME[lang] + (lang === "ar" ? ". جميع الحقوق محفوظة." : ". All rights reserved.");
    $("pp-ar").hidden = lang !== "ar"; $("pp-en").hidden = lang !== "en";
    var lb = $("langBtn"), toEn = lang === "ar";
    lb.textContent = toEn ? "EN" : "AR"; lb.lang = toEn ? "en" : "ar";
    lb.setAttribute("aria-label", toEn ? "Switch to English" : "التبديل إلى العربية"); lb.setAttribute("data-tip", toEn ? "English" : "العربية");
    var tt2 = $("toTop"); if (tt2) { var sp = tt2.querySelector("[data-ar]"); if (sp) tt2.setAttribute("data-tip", sp.getAttribute("data-" + lang)); }
    var wo = $("wvOpen"); if (wo) wo.setAttribute("data-tip", lang === "ar" ? "رابط تنزيل WebView2 Runtime" : "WebView2 Runtime download link");
    var wc = $("wvClose"); if (wc) { var cl2 = lang === "ar" ? "إغلاق" : "Close"; wc.setAttribute("data-tip", cl2); wc.setAttribute("aria-label", cl2); }
    var pc = $("ppClose"); if (pc) { var cl = lang === "ar" ? "إغلاق" : "Close"; pc.setAttribute("data-tip", cl); pc.setAttribute("aria-label", cl); }
    applyTheme();
  }
  $("langBtn").addEventListener("click", function () {
    lang = lang === "ar" ? "en" : "ar"; saved = true;
    try { localStorage.setItem("rqa-lang", lang); } catch (e) {}
    apply();
  });
  /* no manual choice yet -> keep following the system language if it changes while the page is open */
  window.addEventListener("languagechange", function () {
    if (saved || !window.rqaSysLang) return;
    var n = window.rqaSysLang(); if (n !== lang) { lang = n; apply(); }
  });
  $("themeBtn").addEventListener("click", function () {
    theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("rqa-theme", theme); } catch (e) {}
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { applyTheme(); return; }
    var r = this.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    var vt = document.startViewTransition(applyTheme);
    vt.ready.then(function () {
      document.documentElement.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + rad + "px at " + x + "px " + y + "px)"] },
        { duration: 450, easing: "cubic-bezier(.2,0,0,1)", pseudoElement: "::view-transition-new(root)" });
    }, function () {});
  });
  var wvd = $("wvDialog");
  if (wvd && $("wvOpen")) {
    $("wvOpen").addEventListener("click", function () {
      if (typeof wvd.showModal !== "function") { window.open("https://developer.microsoft.com/microsoft-edge/webview2/", "_blank", "noopener"); return; }
      wvd.showModal(); document.documentElement.classList.add("pp-lock");
    });
    $("wvClose").addEventListener("click", function () { wvd.close(); });
    wvd.addEventListener("click", function (e) { if (e.target === wvd) wvd.close(); });
    wvd.addEventListener("close", function () { document.documentElement.classList.remove("pp-lock"); });
  }
  var dlg = $("ppDialog");
  function openPP(e) {
    if (!dlg || typeof dlg.showModal !== "function") return;
    e.preventDefault();
    dlg.showModal(); document.documentElement.classList.add("pp-lock");
    dlg.querySelector(".pp-b:not([hidden])").scrollTop = 0;
  }
  function closePP() { if (dlg.open) dlg.close(); }
  var pl = document.querySelectorAll(".js-pp");
  for (var k = 0; k < pl.length; k++) pl[k].addEventListener("click", openPP);
  $("ppClose").addEventListener("click", closePP);
  var allBtns = dlg.querySelectorAll(".pp-all");
  for (var q = 0; q < allBtns.length; q++) allBtns[q].addEventListener("click", function () {
    var box = this.closest(".pp-b"), ds = box.querySelectorAll("details"), anyClosed = false, j;
    for (j = 0; j < ds.length; j++) if (!ds[j].open) anyClosed = true;
    for (j = 0; j < ds.length; j++) ds[j].open = anyClosed;
    this.textContent = this.getAttribute(anyClosed ? "data-close" : "data-open");
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closePP(); });
  dlg.addEventListener("close", function () { document.documentElement.classList.remove("pp-lock"); });
  apply();
})();
