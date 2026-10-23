'use strict';

const CACHE_PREFIX = 'bandas-oligoclonales-';
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const SCOPE_PATH = new URL(self.registration.scope).pathname;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/caja-costarricense.png.webp',
  './caja-costarricense.png.webp',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        const obsolete = keys.filter((key) => {
          return key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME;
        });
        return Promise.all(obsolete.map((key) => caches.delete(key)));
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);
        if (response.ok && response.type === 'basic') {
          const update = caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', response.clone()));
          event.waitUntil(update);
        }
        return response;
      } catch (_) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });
        }
        return response;
      });
    })
  );
});
