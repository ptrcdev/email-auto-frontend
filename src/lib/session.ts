const COOKIE_NAME = 'amicus_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const LS_KEY = 'amicus_email';

export function saveSession(email: string): void {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(email)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  localStorage.setItem(LS_KEY, email);
}

export function getSession(): string | null {
  // Try localStorage first
  const ls = localStorage.getItem(LS_KEY);
  if (ls) return ls;

  // Fallback to cookie
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearSession(): void {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
  localStorage.removeItem(LS_KEY);
}
