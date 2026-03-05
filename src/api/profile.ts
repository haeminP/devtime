import axiosInstance from './axiosInstance'

export interface ProfileData {
  career: string
  purpose: string
  goal: string
  techStacks: string[]
  profileImage?: string
}

export const profileApi = {
  getProfile: () =>
    axiosInstance.get('/profile'),

  createProfile: (data: ProfileData) =>
    axiosInstance.post('/profile', data),

  updateProfile: (data: Partial<ProfileData>) =>
    axiosInstance.put('/profile', data),

  getPresignedUrl: () =>
    axiosInstance.post<{ presignedUrl: string; key: string }>('/file/presigned-url'),

  getTechStacks: (query: string) =>
    axiosInstance.get('/tech-stacks', { params: { query } }),

  createTechStack: (name: string) =>
    axiosInstance.post('/tech-stacks', { name }),
}
