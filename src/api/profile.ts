import { api } from './fetchClient'

export interface ProfileData {
  career: string
  purpose: string
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

  getPresignedUrl: () =>
    api.post<{ presignedUrl: string; key: string }>('/file/presigned-url'),

  getTechStacks: (query: string) =>
    api.get('/tech-stacks', { params: { query } }),

  createTechStack: (name: string) =>
    api.post('/tech-stacks', { name }),
}
