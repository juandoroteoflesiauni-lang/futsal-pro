import { useCallback, useSyncExternalStore } from 'react'
import {
  loadState,
  saveState,
  todayISO,
  sessionId,
  shiftISO,
  type AppMode,
  type AppState,
  type BenchmarkLog,
  type DailyReadiness,
  type MorningLog,
  type SessionLog,
} from '../lib/storage'

let memory = loadState()
const listeners = new Set<() => void>()

function emit() {
  saveState(memory)
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return memory
}

function patch(updater: (s: AppState) => AppState) {
  memory = updater(memory)
  emit()
}

export function useAppState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  // ----------------------------------------------------
  // MODE SWITCHING
  // ----------------------------------------------------
  const setMode = useCallback((mode: AppMode) => {
    patch((s) => ({ ...s, activeMode: mode }))
  }, [])

  // ----------------------------------------------------
  // FUTSAL MODE ACTIONS
  // ----------------------------------------------------
  const setPlan = useCallback((meso: number, week: number) => {
    patch((s) => ({ ...s, plan: { ...s.plan, meso, week } }))
  }, [])

  const setStartDate = useCallback((startDate: string) => {
    patch((s) => ({ ...s, plan: { ...s.plan, startDate } }))
  }, [])

  const toggleExercise = useCallback(
    (
      date: string,
      sessionKey: string,
      meta: Omit<SessionLog, 'id' | 'date' | 'sessionKey' | 'doneExercises' | 'completed'>,
      exerciseName: string,
    ) => {
      patch((s) => {
        const id = sessionId(date, sessionKey)
        const existing = s.sessions.find((x) => x.id === id)
        const done = new Set(existing?.doneExercises ?? [])
        if (done.has(exerciseName)) done.delete(exerciseName)
        else done.add(exerciseName)
        const log: SessionLog = {
          id,
          date,
          mode: 'futsal',
          sessionKey,
          ...meta,
          completed: existing?.completed ?? false,
          pain: existing?.pain,
          rpeSession: existing?.rpeSession,
          notes: existing?.notes,
          doneExercises: [...done],
        }
        return {
          ...s,
          sessions: [...s.sessions.filter((x) => x.id !== id), log],
        }
      })
    },
    [],
  )

  const completeSession = useCallback(
    (
      date: string,
      sessionKey: string,
      meta: Omit<SessionLog, 'id' | 'date' | 'sessionKey' | 'doneExercises' | 'completed'>,
      extras?: { pain?: number; rpeSession?: number; notes?: string },
    ) => {
      patch((s) => {
        const id = sessionId(date, sessionKey)
        const existing = s.sessions.find((x) => x.id === id)
        const log: SessionLog = {
          id,
          date,
          mode: 'futsal',
          sessionKey,
          ...meta,
          completed: true,
          pain: extras?.pain ?? existing?.pain,
          rpeSession: extras?.rpeSession ?? existing?.rpeSession,
          notes: extras?.notes ?? existing?.notes,
          doneExercises: existing?.doneExercises ?? [],
        }
        return {
          ...s,
          sessions: [...s.sessions.filter((x) => x.id !== id), log],
        }
      })
    },
    [],
  )

  const getSessionLog = useCallback(
    (date: string, sessionKey: string) =>
      state.sessions.find((x) => x.id === sessionId(date, sessionKey)),
    [state.sessions],
  )

  const toggleMorning = useCallback((exerciseId: string, meso: number) => {
    const date = todayISO()
    patch((s) => {
      const existing = s.mornings.find((m) => m.date === date)
      const set = new Set(existing?.completedIds ?? [])
      if (set.has(exerciseId)) set.delete(exerciseId)
      else set.add(exerciseId)
      const log: MorningLog = {
        date,
        meso,
        completedIds: [...set],
        done: existing?.done ?? false,
      }
      return {
        ...s,
        mornings: [...s.mornings.filter((m) => m.date !== date), log],
      }
    })
  }, [])

  const completeMorning = useCallback((meso: number) => {
    const date = todayISO()
    patch((s) => {
      const existing = s.mornings.find((m) => m.date === date)
      const log: MorningLog = {
        date,
        meso,
        completedIds: existing?.completedIds ?? [],
        done: true,
      }
      return {
        ...s,
        mornings: [...s.mornings.filter((m) => m.date !== date), log],
      }
    })
  }, [])

  // ----------------------------------------------------
  // RUNNING + GYM ACTIONS
  // ----------------------------------------------------
  const setRunningPlan = useCallback((week: number, meso?: number) => {
    const calculatedMeso =
      meso ?? (week <= 4 ? 1 : week <= 8 ? 2 : week <= 13 ? 3 : 4)
    patch((s) => ({
      ...s,
      runningPlan: { ...s.runningPlan, week, meso: calculatedMeso },
    }))
  }, [])

  const setRunningStartDate = useCallback((startDate: string) => {
    patch((s) => ({ ...s, runningPlan: { ...s.runningPlan, startDate } }))
  }, [])

  const toggleRunningExercise = useCallback(
    (
      date: string,
      sessionKey: string,
      meta: Omit<SessionLog, 'id' | 'date' | 'sessionKey' | 'doneExercises' | 'completed'>,
      exerciseName: string,
    ) => {
      patch((s) => {
        const id = sessionId(date, sessionKey)
        const existing = s.runningSessions.find((x) => x.id === id)
        const done = new Set(existing?.doneExercises ?? [])
        if (done.has(exerciseName)) done.delete(exerciseName)
        else done.add(exerciseName)
        const log: SessionLog = {
          id,
          date,
          mode: 'running_gym',
          sessionKey,
          ...meta,
          completed: existing?.completed ?? false,
          pain: existing?.pain,
          rpeSession: existing?.rpeSession,
          notes: existing?.notes,
          doneExercises: [...done],
        }
        return {
          ...s,
          runningSessions: [...s.runningSessions.filter((x) => x.id !== id), log],
        }
      })
    },
    [],
  )

  const completeRunningSession = useCallback(
    (
      date: string,
      sessionKey: string,
      meta: Omit<SessionLog, 'id' | 'date' | 'sessionKey' | 'doneExercises' | 'completed'>,
      extras?: { pain?: number; rpeSession?: number; notes?: string },
    ) => {
      patch((s) => {
        const id = sessionId(date, sessionKey)
        const existing = s.runningSessions.find((x) => x.id === id)
        const log: SessionLog = {
          id,
          date,
          mode: 'running_gym',
          sessionKey,
          ...meta,
          completed: true,
          pain: extras?.pain ?? existing?.pain,
          rpeSession: extras?.rpeSession ?? existing?.rpeSession,
          notes: extras?.notes ?? existing?.notes,
          doneExercises: existing?.doneExercises ?? [],
        }
        return {
          ...s,
          runningSessions: [...s.runningSessions.filter((x) => x.id !== id), log],
        }
      })
    },
    [],
  )

  const getRunningSessionLog = useCallback(
    (date: string, sessionKey: string) =>
      state.runningSessions.find((x) => x.id === sessionId(date, sessionKey)),
    [state.runningSessions],
  )

  const logBenchmark = useCallback((benchmark: BenchmarkLog) => {
    patch((s) => ({
      ...s,
      benchmarks: {
        ...s.benchmarks,
        [benchmark.id]: benchmark,
      },
    }))
  }, [])

  const setDailyReadiness = useCallback((readiness: DailyReadiness) => {
    patch((s) => {
      const filtered = s.readinessLogs.filter((r) => r.date !== readiness.date)
      return {
        ...s,
        readinessLogs: [...filtered, readiness],
      }
    })
  }, [])

  // Today helpers
  const todayDate = todayISO()
  const todayMorning = state.mornings.find((m) => m.date === todayDate)
  const todayReadiness = state.readinessLogs.find((r) => r.date === todayDate)

  // Counts
  const completedCount =
    state.activeMode === 'futsal'
      ? state.sessions.filter((s) => s.completed).length
      : state.runningSessions.filter((s) => s.completed).length

  const morningStreak = (() => {
    let streak = 0
    let cursor = todayISO()
    for (let i = 0; i < 60; i++) {
      const log = state.mornings.find((m) => m.date === cursor && m.done)
      if (!log) break
      streak++
      cursor = shiftISO(cursor, -1)
    }
    return streak
  })()

  return {
    state,
    setMode,
    // Futsal Mode
    setPlan,
    setStartDate,
    toggleExercise,
    completeSession,
    getSessionLog,
    toggleMorning,
    completeMorning,
    todayMorning,
    // Running + GYM Mode
    setRunningPlan,
    setRunningStartDate,
    toggleRunningExercise,
    completeRunningSession,
    getRunningSessionLog,
    logBenchmark,
    setDailyReadiness,
    todayReadiness,
    // Global & Meta
    completedCount,
    morningStreak,
  }
}
