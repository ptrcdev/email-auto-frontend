import type {
  DashboardStats,
  DailyBrief,
  Analytics,
  SearchResult,
  UserSettings,
  Priority,
  EmailRecord,
} from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }
  return response.json();
}

// ── Dashboard ──

export async function getDailyBriefs(
  email: string,
  from?: string,
  to?: string,
): Promise<DailyBrief[]> {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const qs = params.toString();
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/daily-briefs${qs ? `?${qs}` : ''}`,
  );
}

export async function getDashboardStats(email: string): Promise<DashboardStats> {
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/stats`,
  );
}

export async function getDailyBrief(email: string): Promise<DailyBrief> {
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/daily-brief`,
  );
}

export async function getAnalytics(email: string): Promise<Analytics> {
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/analytics`,
  );
}

export async function getDashboardEmails(
  email: string,
  days: number = 30,
): Promise<Record<string, EmailRecord[]>> {
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/emails?days=${days}`,
  );
}

export async function searchEmails(
  email: string,
  query: string,
): Promise<SearchResult> {
  return fetchJson(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/search`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    },
  );
}

// ── Priorities ──

export async function getPriorities(email: string): Promise<Priority[]> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}`,
  );
}

export async function getDailyPriorities(email: string): Promise<Priority[]> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/daily`,
  );
}

export async function savePriorities(
  email: string,
  priorities: string[],
): Promise<Priority[]> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priorities }),
    },
  );
}

export async function getPermanentPriorities(email: string): Promise<Priority[]> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent`,
  );
}

export async function addPermanentPriority(
  email: string,
  rawText: string,
): Promise<Priority> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText }),
    },
  );
}

export async function updatePermanentPriority(
  email: string,
  id: string,
  rawText: string,
): Promise<Priority> {
  return fetchJson(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText }),
    },
  );
}

export async function deletePermanentPriority(
  email: string,
  id: string,
): Promise<void> {
  await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
  );
}

export async function deletePriority(
  email: string,
  id: string,
): Promise<void> {
  await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
  );
}

// ── Users ──

export async function getUserSettings(email: string): Promise<UserSettings> {
  return fetchJson(
    `${BASE_URL}/users/${encodeURIComponent(email)}/settings`,
  );
}

export async function saveUserSettings(
  email: string,
  data: Partial<UserSettings>,
): Promise<UserSettings> {
  return fetchJson(
    `${BASE_URL}/users/${encodeURIComponent(email)}/settings`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );
}

export async function putOnboarding(
  email: string,
  data: {
    name?: string;
    preferredName?: string;
    role?: string;
    addressStyle?: string;
    digestTime: string;
    timezone: string;
  },
): Promise<void> {
  await fetch(
    `${BASE_URL}/users/${encodeURIComponent(email)}/onboarding`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );
}

// ── Push ──

export async function getVapidPublicKey(): Promise<{ publicKey: string }> {
  return fetchJson(`${BASE_URL}/push/vapid-public-key`);
}

export async function subscribePush(
  email: string,
  subscription: PushSubscriptionJSON,
): Promise<void> {
  await fetch(`${BASE_URL}/push/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, subscription }),
  });
}

export async function unsubscribePush(email: string): Promise<void> {
  await fetch(`${BASE_URL}/push/unsubscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

// ── Account ──

export async function deleteAccount(email: string): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(email)}`,
    { method: 'DELETE' },
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Failed to delete account: ${response.status}`);
  }
}
