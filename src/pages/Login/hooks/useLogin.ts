import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

/**
 * useLogin — mutation hook for the login API call.
 *
 * Responsibilities:
 * - Call the login API with email + password
 * - On success, store the returned tokens in Zustand (authStore)
 * - Expose isPending / isError / data so LoginPage can react to each state
 *
 * Returns:
 * - mutate (aliased as login) → triggers the API call
 * - isPending   → true while waiting for the response
 * - isError     → true if login failed (wrong credentials)
 * - data        → the full response (includes isFirstLogin, isDuplicateLogin)
 */
export function useLogin() {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login({ email, password }),

    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;
      // Store tokens — this also sets isAuthenticated: true in Zustand
      setTokens(accessToken, refreshToken);
    },
  });
}
