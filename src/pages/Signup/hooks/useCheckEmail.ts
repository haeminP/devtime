import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => authApi.checkEmail(email),
  });
}
