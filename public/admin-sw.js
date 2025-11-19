// Service Worker for Admin PWA Push Notifications

self.addEventListener('install', (event) => {
  console.log('Admin Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Admin Service Worker activated');
  event.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  let data = {
    title: 'New Notification',
    body: 'You have a new notification',
    icon: '/logo2.png',
    badge: '/logo2.png',
    url: '/admin'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/logo2.png',
    badge: data.badge || '/logo2.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/admin'
    },
    actions: [
      {
        action: 'open',
        title: 'View'
      }
    ],
    requireInteraction: true,
    tag: data.tag || 'admin-notification'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/admin';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url.includes('/admin') && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // Open new window if none exists
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
