import axiosInstance from './axiosInstance'

export const dashboardApi = {
  getStats: () =>
    axiosInstance.get('/stats'),

  getHeatmap: () =>
    axiosInstance.get('/heatmap'),

  getStudyLogs: (page = 1) =>
    axiosInstance.get('/study-logs', { params: { page } }),

  getStudyLog: (studyLogId: string) =>
    axiosInstance.get(`/study-logs/${studyLogId}`),

  deleteStudyLog: (studyLogId: string) =>
    axiosInstance.delete(`/study-logs/${studyLogId}`),

  updateTasks: (studyLogId: string, tasks: { content: string; isCompleted: boolean }[]) =>
    axiosInstance.put(`/${studyLogId}/tasks`, { tasks }),
}
