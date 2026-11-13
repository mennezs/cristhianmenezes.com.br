/*
  Service worker mínimo: só existe pra mostrar /errors/offline.html quando
  o visitante está sem internet. Não faz cache do site em si. Com rede, tudo
  vem do servidor normalmente; os arquivos abaixo só saem do cache se a rede falhar.

  Ao mudar a página offline (ou algo da lista), troque a versão em CACHE
  para os navegadores baixarem de novo.
*/
const CACHE = "offline-v1";
const OFFLINE_PAGE = "/errors/offline.html";
const PRECACHE = [
  OFFLINE_PAGE,
  "/errors/error.css",
  "/fonts/Comic_CAT.woff2",
  "/fonts/Comic_CAT.woff",
  "/links/icons/avatar.png",
  "/favicon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Navegação (abrir uma página): rede primeiro; sem rede, página offline.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_PAGE)));
    return;
  }

  // Arquivos da página offline: rede primeiro, cache como reserva.
  const url = new URL(request.url);
  if (url.origin === self.location.origin && PRECACHE.includes(url.pathname)) {
    event.respondWith(fetch(request).catch(() => caches.match(url.pathname)));
  }
});
