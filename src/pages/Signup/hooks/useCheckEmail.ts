import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

/**
 * useCheckEmail — checks whether an email address is already taken.
 *
 * Why useMutation and not useQuery?
 * useQuery runs automatically on mount and re-runs reactively.
 * We only want to call the API when the user clicks "중복 확인",
 * so we use useMutation which is triggered manually.
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
