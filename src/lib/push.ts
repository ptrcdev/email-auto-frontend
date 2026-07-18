import { getVapidPublicKey, subscribePush, unsubscribePush } from './api';

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

export async function subscribeUserToPush(email: string): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    const reg = await navigator.serviceWorker.ready;
    const vapidRes = await getVapidPublicKey();
    if (!vapidRes.publicKey) return false;

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidRes.publicKey),
    });

    await subscribePush(email, subscription.toJSON());
    return true;
  } catch (e) {
    console.error('Failed to subscribe to push:', e);
    return false;
  }
}

export async function unsubscribeUserFromPush(email: string): Promise<boolean> {
  try {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.getSubscription();
    if (subscription) await subscription.unsubscribe();
    await unsubscribePush(email);
    return true;
  } catch (e) {
    console.error('Failed to unsubscribe from push:', e);
    return false;
  }
}
