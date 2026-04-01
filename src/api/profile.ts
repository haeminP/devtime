import { api } from './fetchClient'

export type PurposeValue =
  | string
  | { type: string; detail: string }

export interface ProfileData {
  career: string
  purpose: PurposeValue
  goal: string
  techStacks: string[]
  profileImage?: string
}

export const profileApi = {
  getProfile: () =>
    api.get('/profile'),

  createProfile: (data: ProfileData) =>
    api.post('/profile', data),

  updateProfile: (data: Partial<ProfileData>) =>
    api.put('/profile', data),

  getPresignedUrl: (fileName: string, contentType: string) =>
    api.post<{ presignedUrl: string; key: string }>('/file/presigned-url', { fileName, contentType }),

  getTechStacks: (keyword: string) =>
    api.get<{ results: { id: number; name: string }[] }>('/tech-stacks', { params: { keyword } }),

  createTechStack: (name: string) =>
    api.post('/tech-stacks', { name }),
}
