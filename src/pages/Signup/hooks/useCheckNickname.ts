import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

/**
 * useCheckNickname — checks whether a nickname is already taken.
 *
 * Same pattern as useCheckEmail: useMutation instead of useQuery
 * because we only want to call the API on button click, not automatically.
 *
 * Returns:
 * - checkNickname(nickname) → triggers the API call
 * - isPending               → true while the request is in flight
 * - isSuccess               → true if the nickname is available (API returned 200)
 * - isError                 → true if the nickname is already taken (API returned 4xx)
 * - reset                   → clears the result when the user edits the field again
 */
export function useCheckNickname() {
  return useMutation({
    mutationFn: (nickname: string) => authApi.checkNickname(nickname),
  });
}
