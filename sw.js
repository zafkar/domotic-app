const cacheName = "cachev1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
        "./mstile-144x144.png",
        "./mstile-70x70.png",
        "./styles.css",
        "./apple-touch-icon.png",
        "./main.js",
        "./favicon.ico",
        "./index.html",
        "./browserconfig.xml",
        "./sw.js",
				"./utils.js",
				"./jquery.min.js",
        "./mstile-310x310.png",
        "./mstile-150x150.png",
        "./android-chrome-512x512.png",
        "./mstile-310x150.png",
        "./site.webmanifest",
        "./favicon-32x32.png",
        "./safari-pinned-tab.svg",
        "./android-chrome-192x192.png",
        "./favicon-16x16.png"
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
