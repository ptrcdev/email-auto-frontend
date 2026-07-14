const KEY = 'amicus_email'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp('(^|;\\s*)' + name + '=([^;]*)'),
  )
  return match ? decodeURIComponent(match[2]) : ''
}

export function saveSession(email) {
  if (!email) return
  try {
    document.cookie = `${KEY}=${encodeURIComponent(
      email,
    )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
  } catch {
    // ignore — fall back to localStorage below
  }
  try {
    localStorage.setItem(KEY, email)
  } catch {
    // ignore
  }
}

export function getSession() {
  try {
    const cookieVal = readCookie(KEY)
    if (cookieVal) return cookieVal
  } catch {
    // ignore
  }
  try {
    const localVal = localStorage.getItem(KEY)
    if (localVal) return localVal
  } catch {
    // ignore
  }
  return ''
}

export function clearSession() {
  try {
    document.cookie = `${KEY}=; path=/; max-age=0; SameSite=Lax`
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
