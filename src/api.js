const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function putOnboarding(email, data) {
  const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}/onboarding`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to save preferences')
  }

  return response.json()
}

export async function getDashboardEmails(email, days = 30) {
  const response = await fetch(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/emails?days=${days}`,
  )
  if (!response.ok) throw new Error('Failed to fetch emails')
  return response.json()
}

export async function searchEmails(email, query) {
  const response = await fetch(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/search`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    },
  )
  if (!response.ok) throw new Error('Search failed')
  return response.json()
}

export async function getDashboardStats(email) {
  const response = await fetch(
    `${BASE_URL}/dashboard/${encodeURIComponent(email)}/stats`,
  )
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json()
}

export async function getPriorities(email) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}`,
  )
  if (!response.ok) throw new Error('Failed to fetch priorities')
  return response.json()
}

export async function savePriorities(email, priorities) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priorities }),
    },
  )
  if (!response.ok) throw new Error('Failed to save priorities')
  return response.json()
}

export async function getDailyPriorities(email) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/daily`,
  )
  if (!response.ok) throw new Error('Failed to fetch priorities')
  return response.json()
}

export async function getPermanentPriorities(email) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent`,
  )
  if (!response.ok) throw new Error('Failed to fetch permanent priorities')
  return response.json()
}

export async function addPermanentPriority(email, rawText) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText }),
    },
  )
  if (!response.ok) throw new Error('Failed to add permanent priority')
  return response.json()
}

export async function updatePermanentPriority(email, id, rawText) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText }),
    },
  )
  if (!response.ok) throw new Error('Failed to update permanent priority')
  return response.json()
}

export async function deletePermanentPriority(email, id) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/permanent/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  )
  if (!response.ok) throw new Error('Failed to delete permanent priority')
  return response.json()
}

export async function deletePriority(email, id) {
  const response = await fetch(
    `${BASE_URL}/priorities/${encodeURIComponent(email)}/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  )
  if (!response.ok) throw new Error('Failed to delete priority')
  return response.json()
}

export async function getUserSettings(email) {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(email)}/settings`,
  )
  if (!response.ok) throw new Error('Failed to fetch settings')
  return response.json()
}

export async function saveUserSettings(email, data) {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(email)}/settings`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  )
  if (!response.ok) throw new Error('Failed to save settings')
  return response.json()
}

export async function getVapidPublicKey() {
  const response = await fetch(`${BASE_URL}/push/vapid-public-key`)
  if (!response.ok) throw new Error('Failed to fetch VAPID key')
  return response.json()
}

export async function subscribePush(email, subscription) {
  const response = await fetch(`${BASE_URL}/push/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, subscription }),
  })
  if (!response.ok) throw new Error('Failed to subscribe to push')
  return response.json()
}

export async function unsubscribePush(email) {
  const response = await fetch(`${BASE_URL}/push/unsubscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) throw new Error('Failed to unsubscribe from push')
  return response.json()
}
