import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean

  // Actions
  setTokens: (accessToken: string, refreshToken: string) => void
  clearTokens: () => void
}

/**
 * Auth store — persists tokens to localStorage so the user stays
 * logged in across page refreshes.
 *
 * Why Zustand?
 * - Simple API, no boilerplate
 * - `persist` middleware handles localStorage automatically
 * - Any component can subscribe to just the slice of state it needs
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),

      clearTokens: () =>
        set({ accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: 'devtime-auth', // key in localStorage
      // Only persist the tokens, not the actions
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
