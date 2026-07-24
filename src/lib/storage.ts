const KEY = 'futsal-pro-v1'

export type PlanProgress = {
  meso: number
  week: number
  /** ISO date when the plan started (week 1 Monday) */
  startDate: string
}

export type SessionLog = {
  id: string
  date: string
  meso: number
  week: number
  day: number
  sessionKey: string
  completed: boolean
  /** Knee pain 0–10 after session */
  pain?: number
  rpeSession?: number
  notes?: string
  /** Exercise nombres marked done */
  doneExercises: string[]
}

export type MorningLog = {
  date: string
  meso: number
  completedIds: string[]
  done: boolean
}

export type AppState = {
  plan: PlanProgress
  sessions: SessionLog[]
  mornings: MorningLog[]
}

const defaultState = (): AppState => ({
  plan: {
    meso: 1,
    week: 1,
    startDate: todayISO(),
  },
  sessions: [],
  mornings: [],
})

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as AppState
    return {
      ...defaultState(),
      ...parsed,
      plan: { ...defaultState().plan, ...parsed.plan },
      sessions: parsed.sessions ?? [],
      mornings: parsed.mornings ?? [],
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state))
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
