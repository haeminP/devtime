import { useMutation } from "@tanstack/react-query";
import { authApi, SignupRequest } from "@/api/auth";

/**
 * useSignup — submits the signup form to create a new account.
 *
 * Params:
 * - data: { email, nickname, password, confirmPassword }
 *
 * Returns:
 * - signup(data) → triggers the API call
 * - isPending    → true while the request is in flight
 * - isError      → true if signup failed
 */
export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
  });
}
