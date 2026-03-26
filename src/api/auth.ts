import { api } from './fetchClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  isFirstLogin: boolean
  isDuplicateLogin: boolean
}

export interface SignupRequest {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>('/auth/login', data),

  logout: () =>
    api.post('/auth/logout'),

  signup: (data: SignupRequest) =>
    api.post('/signup', data),

  checkEmail: (email: string) =>
    api.get('/signup/check-email', { params: { email } }),

  checkNickname: (nickname: string) =>
    api.get('/signup/check-nickname', { params: { nickname } }),
}
