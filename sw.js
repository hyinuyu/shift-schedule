const CACHE = 'shift-schedule-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './favicon.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 페이지에서 'clearCache' 메시지 받으면 캐시 전부 비우기
self.addEventListener('message', (e) => {
  if (e.data === 'clearCache') {
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    );
  } else if (e.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isNavigate = e.request.mode === 'navigate';
  const isHTML = url.pathname.endsWith('/') || url.pathname.endsWith('.html');

  // HTML/navigate 요청: network-first (최신 코드 받아오기)
  if (isNavigate || isHTML) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request).then((r) => r || caches.match('./'))
        )
    );
    return;
  }

  // 정적 자원: cache-first, fallback to network
  e.respondWith(
    caches.match(e.request).then((r) =>
      r || fetch(e.request).then((res) => {
        if (res.ok && (url.origin === location.origin || res.type === 'cors' || res.type === 'basic')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request))
    )
  );
});
