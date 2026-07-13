const KEY = 'amicus_email'

export function saveSession(email) {
  if (email) localStorage.setItem(KEY, email)
}

export function getSession() {
  return localStorage.getItem(KEY) || ''
}

export function clearSession() {
  localStorage.removeItem(KEY)
}
