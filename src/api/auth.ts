import axiosInstance from './axiosInstance'

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
    axiosInstance.post<LoginResponse>('/auth/login', data),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  refresh: (refreshToken: string) =>
    axiosInstance.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),

  signup: (data: SignupRequest) =>
    axiosInstance.post('/signup', data),

  checkEmail: (email: string) =>
    axiosInstance.get('/signup/check-email', { params: { email } }),

  checkNickname: (nickname: string) =>
    axiosInstance.get('/signup/check-nickname', { params: { nickname } }),
}
