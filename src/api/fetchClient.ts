import { useAuthStore } from '@/store/authStore'

const BASE_URL = '/api'

class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, data: unknown) {
    super(`API Error: ${status}`)
    this.status = status
    this.data = data
  }
}

interface RequestOptions {
  params?: Record<string, string | number>
  body?: unknown
  headers?: Record<string, string>
}

async function request<T>(
  endpoint: string,
  method: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, body, headers: customHeaders } = options

  const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  const accessToken = useAuthStore.getState().accessToken
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...customHeaders,
  }

  const config: RequestInit = {
    method,
    headers,
    ...(body !== undefined && { body: JSON.stringify(body) }),
  }

  let response = await fetch(url.toString(), config)

  if (response.status === 401) {
    const refreshed = await tryRefresh()

    if (refreshed) {
      const newToken = useAuthStore.getState().accessToken
      headers.Authorization = `Bearer ${newToken}`
      response = await fetch(url.toString(), { ...config, headers })
    }
  }

  if (response.status === 204) return undefined as T

  const data = await response.json()

  if (!response.ok) throw new ApiError(response.status, data)

  return data as T
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = useAuthStore.getState().refreshToken

  if (!refreshToken) {
    useAuthStore.getState().clearTokens()
    window.location.href = '/login'
    return false
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) throw new Error('Refresh failed')

    const { accessToken } = await response.json()
    useAuthStore.getState().setTokens(accessToken, refreshToken)
    return true
  } catch {
    useAuthStore.getState().clearTokens()
    window.location.href = '/login'
    return false
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, 'GET', options),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, 'POST', { ...options, body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, 'PUT', { ...options, body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, 'DELETE', options),
}

export { ApiError }
