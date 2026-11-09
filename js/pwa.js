/* Install as app: service worker + install button (Chrome/Edge/Android prompt, iOS Safari hint) */
(function () {
  var btns = document.querySelectorAll("[data-install]");
  var dlg = document.getElementById("installDialog");
  var closeBtn = document.getElementById("installClose");
  var root = document.documentElement;
  var ua = navigator.userAgent || "";
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var deferred = null;

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
  if (standalone || !btns.length) return;

  function show(v) { for (var i = 0; i < btns.length; i++) btns[i].hidden = !v; }
  function labels() {
    var ar = root.lang === "ar", txt = ar ? "ثبّت كتطبيق" : "Install app", cl = ar ? "إغلاق" : "Close";
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains("chip")) { btns[i].setAttribute("aria-label", txt); btns[i].setAttribute("data-tip", txt); }
    }
    if (closeBtn) { closeBtn.setAttribute("aria-label", cl); closeBtn.setAttribute("data-tip", cl); }
  }
  labels();
  new MutationObserver(labels).observe(root, { attributes: true, attributeFilter: ["lang"] });

  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; show(true); });
  window.addEventListener("appinstalled", function () { deferred = null; show(false); });
  if (ios) show(true); /* iOS has no prompt API: the button opens a how-to */

  function openHint() {
    if (!dlg || typeof dlg.showModal !== "function") return;
    dlg.showModal(); root.classList.add("pp-lock");
  }
  for (var i = 0; i < btns.length; i++) btns[i].addEventListener("click", function (e) {
    e.preventDefault();
    if (deferred) {
      var p = deferred; deferred = null;
      p.prompt();
      p.userChoice.then(function (c) { if (c.outcome === "accepted") show(false); else show(true); }, function () {});
      show(false);
    } else openHint();
  });
  if (dlg) {
    if (closeBtn) closeBtn.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { root.classList.remove("pp-lock"); });
  }
})();
