import axiosInstance from './axiosInstance'

export interface SplitTime {
  date: string
  timeSpent: number // milliseconds
}

export interface StartTimerRequest {
  todayGoal: string
  tasks: { content: string; isCompleted: boolean }[]
}

export interface StartTimerResponse {
  timerId: string
}

export interface UpdateTimerRequest {
  splitTimes: SplitTime[]
}

export interface StopTimerRequest {
  splitTimes: SplitTime[]
  review: string
  updatedTasks: { content: string; isCompleted: boolean }[]
}

export const timerApi = {
  getActiveTimer: () =>
    axiosInstance.get('/timers'),

  startTimer: (data: StartTimerRequest) =>
    axiosInstance.post<StartTimerResponse>('/timers', data),

  updateTimer: (timerId: string, data: UpdateTimerRequest) =>
    axiosInstance.put(`/timers/${timerId}`, data),

  stopTimer: (timerId: string, data: StopTimerRequest) =>
    axiosInstance.get(`/timers/${timerId}/stop`, { params: data }),

  deleteTimer: (timerId: string) =>
    axiosInstance.delete(`/timers/${timerId}`),
}
