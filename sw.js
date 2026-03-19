const CACHE = 'ezhil-portfolio-v1';

const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/images/profile.png',
];

// Install: cache essential files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first, fall back to cache, then offline page
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful responses
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached => {
          if (cached) return cached;
          // For navigation requests show offline page
          if (e.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
      )
  );
});
