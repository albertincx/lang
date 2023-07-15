import Storage from './utils/storage';

const publicKey = `${atob('')}`;

async function processSub(subscription, test = false) {
  const perm = test ? test : Notification.permission;

  if (Storage.get('subscribed') === perm) {
    return;
  }

  const granted = perm === 'granted';

  const data = { subscription };
  let pushsubcreated;

  if (granted) {
    pushsubcreated = new Date().getTime();
    Storage.set('pushsubcreated', pushsubcreated);
  } else {
    pushsubcreated = Storage.get('pushsubcreated');
    data.unsubscribe = 1;
  }

  data.pushsubcreated = pushsubcreated;
  data.host = `${atob('')}`;
  Storage.set('subscribed', perm);
  // await request('v1/push/subscribe', { data });
}

function urlBase64ToUint8Array(base64String = '') {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(reg => {
        reg.pushManager.getSubscription().then(async sub => {
          let currentSub = sub;
          if (sub === null) {
            // Update UI to ask user to register for Push
            await Notification.requestPermission();
            try {
              const applicationServerKey = urlBase64ToUint8Array(publicKey);
              currentSub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
              });
            } catch (e) {
              if (Notification.permission === 'denied') {
                // console.warn('Permission for notifications was denied');
              } else {
                console.warn(e);
              }
            }
          }
          await processSub(currentSub);
        });
      })
      .catch(err => {
        console.warn('Service Worker registration failed: ', err);
      });
  }
}

export default init;
