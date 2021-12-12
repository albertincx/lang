// Setup Event Listener
self.addEventListener('push', e => {
  try {
    const message = e.data.json();
    const options = {
      body: message.body,
      icon: 'images/example.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore this new world',
          icon: 'images/checkmark.png',
        },
        {
          action: 'close',
          title: 'Close',
          icon: 'images/xmark.png',
        },
      ],
    };
    e.waitUntil(self.registration.showNotification(message.title, options));
  } catch (e) {
    console.warn(e);
  }
});

// We can even handle how it behaves on click.
self.addEventListener('notificationclick', e => {
  const { notification, action } = e;
  const { primaryKey } = notification.data;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('/');
    notification.close();
  }
});
