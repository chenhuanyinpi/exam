const CACHE_NAME = "exam-clock-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./custom-exam.html",
  "./introduction.html",
  "./css/styles.css",
  "./js/script.js",
  "./js/custom-exam.js",
  "./assets/images/favicon.png",
  "./assets/images/ga_icon.png",
  "./assets/fonts/iconfont/iconfont.css",
  "./assets/fonts/iconfont/iconfont.ttf",
  "./assets/fonts/iconfont/iconfont.woff",
  "./assets/fonts/iconfont/iconfont.woff2",
  "./assets/fonts/iconfont/iconfont.js",
];

// Install Event - Pre-cache all static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching static assets");
      return cache.addAll(ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate strategy for local assets, cache-first for font CDNs
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Filter out non-http schemas like chrome-extension://
  if (!url.protocol.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve cached version immediately
        // Fetch fresh version in the background and update cache
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch((err) =>
            console.log(
              "[Service Worker] Background fetch failed (probably offline):",
              err,
            ),
          );

        return cachedResponse;
      }

      // If not in cache, fetch from network and store in cache if it's a valid local request or web font
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Only cache GET requests from our origin or font CDNs
        const isSelfOrigin = url.origin === self.location.origin;
        const isFontCDN =
          url.hostname === "fonts.googleapis.com" ||
          url.hostname === "fonts.gstatic.com";

        if (isSelfOrigin || isFontCDN) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }),
  );
});
