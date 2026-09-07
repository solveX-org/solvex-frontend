const TOKEN_KEY = 'solvex_dashboard_token'
const API = 'https://api.solvexng.com/api/v1'

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
  document.cookie = `dashboard_token=${token}; path=/; max-age=86400; SameSite=Lax`
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  document.cookie = 'dashboard_token=; path=/; max-age=0'
}

export const authHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
})

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const data = await res.json()
  setToken(data.access)
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    clearToken()
    window.location.href = '/dashboard/login'
    return
  }
  return res
}
