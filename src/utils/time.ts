/**
 * Utility functions for time formatting used across the app.
 */

/**
 * Converts milliseconds to { hours, minutes, seconds }
 */
export function msToTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}

/**
 * Formats ms as "HH:MM:SS" — used for the timer display
 */
export function formatTimer(ms: number): string {
  const { hours, minutes, seconds } = msToTime(ms)
  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, '0'))
    .join(':')
}

/**
 * Formats ms as "N시간 M분" — used for dashboard stats
 * Rounds down, ignores seconds.
 */
export function formatStudyTime(ms: number): string {
  const { hours, minutes } = msToTime(ms)
  if (hours === 0) return `${minutes}분`
  if (minutes === 0) return `${hours}시간`
  return `${hours}시간 ${minutes}분`
}

/**
 * Returns "YYYY-MM-DD" for a given Date (or today if omitted)
 */
export function toDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}
