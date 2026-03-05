import { create } from 'zustand'

interface Task {
  id: string
  content: string
  isCompleted: boolean
}

interface SplitTime {
  date: string      // ISO date string
  timeSpent: number // milliseconds
}

interface TimerState {
  // Timer status
  timerId: string | null
  isRunning: boolean
  totalElapsedMs: number     // total ms elapsed (excluding pauses)
  sessionStartMs: number | null // Date.now() when current session started

  // Daily split tracking (for when timer crosses midnight)
  splitTimes: SplitTime[]

  // Study session data
  todayGoal: string
  tasks: Task[]

  // Actions
  startTimer: (timerId: string, goal: string, tasks: Task[]) => void
  pauseTimer: () => void
  resumeTimer: () => void
  resetTimer: () => void
  addTask: (content: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  removeTask: (id: string) => void
  setTimerFromServer: (data: {
    timerId: string
    totalElapsedMs: number
    splitTimes: SplitTime[]
    todayGoal: string
    tasks: Task[]
  }) => void
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timerId: null,
  isRunning: false,
  totalElapsedMs: 0,
  sessionStartMs: null,
  splitTimes: [],
  todayGoal: '',
  tasks: [],

  startTimer: (timerId, goal, tasks) =>
    set({
      timerId,
      isRunning: true,
      sessionStartMs: Date.now(),
      todayGoal: goal,
      tasks,
    }),

  pauseTimer: () => {
    const { sessionStartMs, totalElapsedMs } = get()
    if (!sessionStartMs) return
    const elapsed = Date.now() - sessionStartMs
    set({
      isRunning: false,
      totalElapsedMs: totalElapsedMs + elapsed,
      sessionStartMs: null,
    })
  },

  resumeTimer: () =>
    set({ isRunning: true, sessionStartMs: Date.now() }),

  resetTimer: () =>
    set({
      timerId: null,
      isRunning: false,
      totalElapsedMs: 0,
      sessionStartMs: null,
      splitTimes: [],
      todayGoal: '',
      tasks: [],
    }),

  addTask: (content) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), content, isCompleted: false },
      ],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  setTimerFromServer: (data) =>
    set({
      timerId: data.timerId,
      totalElapsedMs: data.totalElapsedMs,
      splitTimes: data.splitTimes,
      todayGoal: data.todayGoal,
      tasks: data.tasks,
      isRunning: false, // Will resume from where it left off
      sessionStartMs: null,
    }),
}))
