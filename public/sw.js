// Service Worker pour mettre en cache les ressources statiques
const CACHE_NAME = 'portfolio-v1';
const STATIC_CACHE = 'portfolio-static-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/favicon.svg',
  '/robots.txt',
  // GTM sera mis en cache lors de la première visite
];

// Installer le service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Forcer l'activation immédiate
  self.skipWaiting();
});

// Activer le service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepter les requêtes
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Stratégie Cache First pour les ressources statiques
  if (event.request.method === 'GET' &&
      (url.pathname.match(/\.(css|js|png|jpg|jpeg|webp|svg|woff|woff2|ttf|eot)$/i) ||
       url.hostname === 'www.googletagmanager.com' ||
       url.hostname === 'fonts.googleapis.com' ||
       url.hostname === 'fonts.gstatic.com')) {

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((response) => {
          // Ne mettre en cache que les réponses réussies
          if (response.status === 200 && response.type === 'basic') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Fallback pour les ressources critiques
          if (url.pathname.includes('gtm.js')) {
            return new Response('', { status: 404 });
          }
        });
      })
    );
  }
});
