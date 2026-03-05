import axiosInstance from './axiosInstance'

export type SortBy = 'total' | 'avg'

export const rankingApi = {
  getRankings: (sortBy: SortBy = 'total', page = 1) =>
    axiosInstance.get('/rankings', { params: { sortBy, page } }),
}
