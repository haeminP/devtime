import { api } from './fetchClient'

export const dashboardApi = {
  getStats: () =>
    api.get('/stats'),

  getHeatmap: () =>
    api.get('/heatmap'),

  getStudyLogs: (page = 1) =>
    api.get('/study-logs', { params: { page } }),

  getStudyLog: (studyLogId: string) =>
    api.get(`/study-logs/${studyLogId}`),

  deleteStudyLog: (studyLogId: string) =>
    api.delete(`/study-logs/${studyLogId}`),

  updateTasks: (studyLogId: string, tasks: { content: string; isCompleted: boolean }[]) =>
    api.put(`/${studyLogId}/tasks`, { tasks }),
}
