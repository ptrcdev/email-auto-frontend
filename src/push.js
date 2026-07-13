import { getVapidPublicKey, subscribePush, unsubscribePush } from './api.js'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function subscribeUserToPush(email) {
  if (!email) return
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported in this browser')
    return
  }

  try {
    const existing = Notification.permission
    if (existing === 'denied') return
    if (existing === 'default') {
      // Don't prompt automatically here; the user opts in via Settings.
      return
    }

    const registration = await navigator.serviceWorker.ready
    let subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      const { publicKey } = await getVapidPublicKey()
      if (!publicKey) {
        console.warn('VAPID public key unavailable — push disabled')
        return
      }
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })
    }

    await subscribePush(email, subscription)
    console.log('Subscribed to push notifications')
  } catch (err) {
    console.error('Failed to subscribe to push:', err)
  }
}

export async function unsubscribeUserFromPush(email) {
  if (!('serviceWorker' in navigator)) return
  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    if (subscription) await subscription.unsubscribe()
    if (email) await unsubscribePush(email)
  } catch (err) {
    console.error('Failed to unsubscribe from push:', err)
  }
}
