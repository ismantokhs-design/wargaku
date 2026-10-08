// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyABhd15u0ThpRxw8hGGJJ1qvi2lvNDTLug",
  authDomain: "wargaku-860df.firebaseapp.com",
  projectId: "wargaku-860df",
  storageBucket: "wargaku-860df.firebasestorage.app",
  messagingSenderId: "690711985685",
  appId: "1:690711985685:web:a2d227636b2747b54851c",
  measurementId: "G-CNK6RSPM53"
});

const messaging = firebase.messaging();

// Menangani pesan di background (saat aplikasi tertutup)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Menerima pesan background: ', payload);
  
  const notificationTitle = payload.notification.title || "Pengumuman WargaKu";
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});