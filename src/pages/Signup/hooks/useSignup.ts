import { useMutation } from "@tanstack/react-query";
import { authApi, SignupRequest } from "@/api/auth";

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
  });
}
