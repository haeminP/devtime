import { useMutation } from '@tanstack/react-query'
import { profileApi, ProfileData } from '@/api/profile'

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: ProfileData) => profileApi.createProfile(data),
  })
}
