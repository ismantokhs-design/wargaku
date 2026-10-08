const CACHE_NAME = 'wargaku-pwa-v3';
const urlsToCache = [
    './',
    './index.html',
    './dashboard.html',
    './info-pengumuman.html',
    './input-pengumuman.html',
    './daftar-warga.html',
    './galeri.html',
    './pesan.html',
    './manifest.json',
    './icon.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. Install Service Worker & Cache File Penting
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// 2. Aktifkan Service Worker & Bersihkan Cache Lama yang Tidak Terpakai
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    event.waitUntil(self.clients.claim());
});

// 3. Tangani Permintaan Fetch (Offline Support)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 4. Tangani Notifikasi Push agar Muncul di Topbar / Layar Depan HP
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'WargaKu', body: 'Ada informasi baru untuk warga.' };
    
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});