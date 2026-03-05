import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

/**
 * Axios instance pre-configured for the DevTime API.
 *
 * What this does:
 * 1. Sets the base URL (proxied to devtime.prokit.app via vite.config.ts)
 * 2. Request interceptor: automatically attaches the Bearer token to every request
 * 3. Response interceptor: if we get a 401 (token expired), tries to refresh
 *    the access token using the refresh token, then retries the original request.
 */
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ────────────────────────────────────────────────────
// Runs before every request — attaches the access token from the store
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// ─── Response Interceptor ───────────────────────────────────────────────────
// Runs after every response — handles token expiry (401 errors)
axiosInstance.interceptors.response.use(
  (response) => response, // success: pass through as-is
  async (error) => {
    const originalRequest = error.config

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = useAuthStore.getState().refreshToken

      if (!refreshToken) {
        // No refresh token — force logout
        useAuthStore.getState().clearTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        // Try to get a new access token
        const response = await axios.post('/api/auth/refresh', { refreshToken })
        const { accessToken: newAccessToken } = response.data

        useAuthStore.getState().setTokens(newAccessToken, refreshToken)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch {
        // Refresh failed — session truly expired, force logout
        useAuthStore.getState().clearTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
