import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

/**
 * useCheckEmail — checks whether an email address is already taken.
 *
 * Returns:
 * - checkEmail(email) → triggers the API call
 * - isPending        → true while the request is in flight
 * - isSuccess        → true if the email is available (API returned 200)
 * - isError          → true if the email is already taken (API returned 4xx)
 * - reset            → clears the result (used when the user edits the field again)
 */
export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => authApi.checkEmail(email),
  });
}
