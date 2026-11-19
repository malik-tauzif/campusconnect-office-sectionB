const API_BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '')
const DEFAULT_USER_ID = '22222222-2222-2222-2222-222222222222'
const USER_STORAGE_KEY = 'campusconnect-user-id'

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers)
  headers.set('x-user-id', localStorage.getItem(USER_STORAGE_KEY) || DEFAULT_USER_ID)
  if (options.body != null) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.detail || 'Request failed')
  }

  return data
}