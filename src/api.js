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
