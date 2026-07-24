import { useCallback, useSyncExternalStore } from 'react'
import {
  loadState,
  saveState,
  todayISO,
  sessionId,
  type AppState,
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

  const setPlan = useCallback((meso: number, week: number) => {
    patch((s) => ({ ...s, plan: { ...s.plan, meso, week } }))
  }, [])

  const setStartDate = useCallback((startDate: string) => {
    patch((s) => ({ ...s, plan: { ...s.plan, startDate } }))
  }, [])

  const toggleExercise = useCallback(
    (date: string, sessionKey: string, meta: Omit<SessionLog, 'id' | 'date' | 'sessionKey' | 'doneExercises' | 'completed'>, exerciseName: string) => {
      patch((s) => {
        const id = sessionId(date, sessionKey)
        const existing = s.sessions.find((x) => x.id === id)
        const done = new Set(existing?.doneExercises ?? [])
        if (done.has(exerciseName)) done.delete(exerciseName)
        else done.add(exerciseName)
        const log: SessionLog = {
          id,
          date,
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

  const todayMorning = state.mornings.find((m) => m.date === todayISO())

  const completedCount = state.sessions.filter((s) => s.completed).length
  const morningStreak = (() => {
    let streak = 0
    const d = new Date()
    for (let i = 0; i < 60; i++) {
      const iso = d.toISOString().slice(0, 10)
      const log = state.mornings.find((m) => m.date === iso && m.done)
      if (!log) break
      streak++
      d.setDate(d.getDate() - 1)
    }
    return streak
  })()

  return {
    state,
    setPlan,
    setStartDate,
    toggleExercise,
    completeSession,
    getSessionLog,
    toggleMorning,
    completeMorning,
    todayMorning,
    completedCount,
    morningStreak,
  }
}
