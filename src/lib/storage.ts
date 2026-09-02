const KEY = 'futsal-pro-v2'
const LEGACY_KEY = 'futsal-pro-v1'

export type AppMode = 'futsal' | 'running_gym'

export type PlanProgress = {
  meso: number
  week: number
  /** ISO date when the plan started (week 1 Monday) */
  startDate: string
}

export type RunningPlanProgress = {
  meso: number
  week: number // 1 to 17
  startDate: string
}

export type SessionLog = {
  id: string
  date: string
  mode?: AppMode
  meso: number
  week: number
  day: number
  sessionKey: string
  completed: boolean
  /** Muscle/Joint pain 0–10 after session */
  pain?: number
  rpeSession?: number
  notes?: string
  /** Exercise names marked done */
  doneExercises: string[]
}

export type MorningLog = {
  date: string
  meso: number
  completedIds: string[]
  done: boolean
}

export type BenchmarkLog = {
  id: string // 'milla' | '3k' | '5k' | '2k'
  date: string
  time: string // e.g. "27:15"
  pace?: string // e.g. "5:27 min/km"
  hrMax?: number
  rpe?: number
  targetTier?: 'A' | 'B' | 'C'
  notes?: string
}

export type DailyReadiness = {
  date: string
  status: 'verde' | 'amarillo' | 'rojo'
  sleepHours?: number
  musclePain?: number // 0-10
  rirDeviation?: number // 0, -1, -2+
  notes?: string
}

export type AppState = {
  activeMode: AppMode
  // Futsal Mode state
  plan: PlanProgress
  sessions: SessionLog[]
  mornings: MorningLog[]
  // Running + GYM Mode state
  runningPlan: RunningPlanProgress
  runningSessions: SessionLog[]
  benchmarks: Record<string, BenchmarkLog>
  readinessLogs: DailyReadiness[]
}

export function defaultState(): AppState {
  return {
    activeMode: 'futsal',
    plan: {
      meso: 1,
      week: 1,
      startDate: todayISO(),
    },
    sessions: [],
    mornings: [],
    runningPlan: {
      meso: 1,
      week: 1,
      startDate: todayISO(),
    },
    runningSessions: [],
    benchmarks: {},
    readinessLogs: [],
  }
}

export function loadState(): AppState {
  try {
    let raw = localStorage.getItem(KEY)
    let isLegacy = false
    if (!raw) {
      raw = localStorage.getItem(LEGACY_KEY)
      isLegacy = true
    }
    if (!raw) return defaultState()

    const parsed = JSON.parse(raw) as Partial<AppState>
    const def = defaultState()

    const state: AppState = {
      activeMode: parsed.activeMode ?? 'futsal',
      plan: { ...def.plan, ...(parsed.plan ?? {}) },
      sessions: parsed.sessions ?? [],
      mornings: parsed.mornings ?? [],
      runningPlan: { ...def.runningPlan, ...(parsed.runningPlan ?? {}) },
      runningSessions: parsed.runningSessions ?? [],
      benchmarks: parsed.benchmarks ?? {},
      readinessLogs: parsed.readinessLogs ?? [],
    }

    if (isLegacy) {
      saveState(state)
    }

    return state
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (err) {
    console.error('Failed to save state to localStorage', err)
  }
}

export function todayISO(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Day index 0=Mon … 6=Sun */
export function calendarDayIndex(d = new Date()): number {
  return (d.getDay() + 6) % 7
}

export function globalWeek(meso: number, week: number) {
  return (meso - 1) * 4 + week
}

export function sessionId(date: string, sessionKey: string) {
  return `${date}:${sessionKey}`
}

export function shiftISO(dateISO: string, days: number) {
  const [y, m, d] = dateISO.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + days)
  return todayISO(dt)
}
