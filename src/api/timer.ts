import { api } from './fetchClient'

export interface SplitTime {
  date: string
  timeSpent: number
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
    api.get('/timers'),

  startTimer: (data: StartTimerRequest) =>
    api.post<StartTimerResponse>('/timers', data),

  updateTimer: (timerId: string, data: UpdateTimerRequest) =>
    api.put(`/timers/${timerId}`, data),

  stopTimer: (timerId: string, data: StopTimerRequest) =>
    api.get(`/timers/${timerId}/stop`, { params: data as unknown as Record<string, string | number> }),

  deleteTimer: (timerId: string) =>
    api.delete(`/timers/${timerId}`),
}
