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
