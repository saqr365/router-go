/* Router Go site: offline shell. Bump VERSION when you deploy a new release. */
const VERSION = "router-go-v0.7.4-3";
const CORE = [
  "./",
  "index.html",
  "privacy.html",
  "css/fonts.css",
  "css/tokens.css",
  "css/style.css",
  "css/privacy.css",
  "js/theme-init.js",
  "js/privacy-init.js",
  "js/device-hint.js",
  "js/sticky-cta.js",
  "js/ui.js",
  "js/motion.js",
  "js/mailto.js",
  "js/pwa.js",
  "js/privacy.js",
  "manifest.webmanifest",
  "assets/img/icon-512.png",
  "assets/img/favicon.png",
  "assets/img/app-screenshot.webp",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/fonts/cairo-400.woff2",
  "assets/fonts/cairo-500.woff2",
  "assets/fonts/cairo-700.woff2",
  "assets/fonts/inter-400.woff2",
  "assets/fonts/inter-500.woff2",
  "assets/fonts/inter-700.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes("/downloads/")) return; /* never cache the APK / EXE */

  if (req.mode === "navigate") {
    /* pages: network first, cached copy when offline */
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
    return;
  }
  /* files: cached copy now, refreshed in the background */
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
