// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBamDYri7_2i3BUVaawE6T7UfxXoJlfmlA", // Alternatively, hardcode your config here (not recommended)
  authDomain: "aarappar-80b73.firebaseapp.com",
  projectId: "aarappar-80b73",
  messagingSenderId: "413293423593",
  appId: "1:413293423593:web:83b917d1344f44809ff978",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
