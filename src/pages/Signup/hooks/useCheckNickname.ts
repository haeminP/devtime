import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function useCheckNickname() {
  return useMutation({
    mutationFn: (nickname: string) => authApi.checkNickname(nickname),
  });
}
