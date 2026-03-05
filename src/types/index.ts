// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  email: string
  nickname: string
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface Profile {
  career: string       // e.g. "0 - 3년"
  purpose: string      // e.g. "취업 준비"
  goal: string         // free text
  techStacks: string[]
  profileImage?: string // S3 key
}

// ─── Timer ───────────────────────────────────────────────────────────────────

export interface Task {
  id: string
  content: string
  isCompleted: boolean
}

export interface SplitTime {
  date: string       // ISO date e.g. "2025-03-03T13:08:38.699Z"
  timeSpent: number  // milliseconds
}

// ─── Study Logs ──────────────────────────────────────────────────────────────

export interface StudyLog {
  studyLogId: string
  date: string
  goal: string
  studyTime: number   // ms
  taskCount: number
  incompleteTasks: number
  completionRate: number
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export interface Stats {
  consecutiveDays: number
  totalStudyTime: number
  averageDailyStudyTime: number
  taskCompletionRate: number
  weekdayStudyTime: Record<string, number> // { MON: ms, TUE: ms, ... }
}

// ─── Ranking ─────────────────────────────────────────────────────────────────

export interface RankingEntry {
  rank: number
  nickname: string
  profileImage?: string
  totalStudyTime: number
  averageDailyStudyTime: number
  career: string
  purpose: string
  techStacks: string[]
}
