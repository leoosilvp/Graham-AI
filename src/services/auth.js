const BASE_URL = 'https://api-graham-ai.vercel.app/api/auth'

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Login failed.')
  }

  return true
}

export async function register(name, email, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Registration failed.')
  }

  return true
}

export async function getMe() {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: 'include'
  })

  if (!res.ok) return null
  return res.json()
}

export async function logout() {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}