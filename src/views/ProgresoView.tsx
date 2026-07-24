import { useMemo } from 'react'
import { DAYS, MESO_NAMES, SESSIONS } from '../data/program'
import { Chip } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'
import { globalWeek } from '../lib/storage'

export function ProgresoView() {
  const { state, setStartDate, completedCount, morningStreak } = useAppState()
  const sessions = useMemo(
    () => [...state.sessions].filter((s) => s.completed).sort((a, b) => b.date.localeCompare(a.date)),
    [state.sessions],
  )
  const mornings = useMemo(
    () => [...state.mornings].filter((m) => m.done).sort((a, b) => b.date.localeCompare(a.date)),
    [state.mornings],
  )

  const painLogs = sessions.filter((s) => s.pain != null)
  const rpeLogs = sessions.filter((s) => s.rpeSession != null)
  const avgPain = painLogs.length
    ? (painLogs.reduce((sum, s) => sum + (s.pain ?? 0), 0) / painLogs.length).toFixed(1)
    : '—'
  const avgRpe = rpeLogs.length
    ? (rpeLogs.reduce((sum, s) => sum + (s.rpeSession ?? 0), 0) / rpeLogs.length).toFixed(1)
    : '—'

  const gWeek = globalWeek(state.plan.meso, state.plan.week)
  const planPct = Math.round((gWeek / 36) * 100)

  return (
    <>
      <div className="grid-stats">
        <div className="stat">
          <div className="stat-label">Plan</div>
          <div className="stat-value">{planPct}%</div>
          <div className="stat-hint">
            Semana {gWeek}/36 · {MESO_NAMES[state.plan.meso - 1]}
          </div>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${planPct}%` }} />
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Sesiones</div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-hint">
            Dolor medio {avgPain} · RPE medio {avgRpe}
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Rutina AM</div>
          <div className="stat-value">{morningStreak}d</div>
          <div className="stat-hint">{mornings.length} días registrados</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Fecha de inicio del plan</h2>
            <p className="panel-sub">Usada como referencia de dónde estás. Podés corregirla cuando quieras.</p>
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="start">Inicio</label>
          <input
            id="start"
            name="start"
            type="date"
            value={state.plan.startDate}
            onChange={(e) => setStartDate(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Historial de sesiones</h2>
            <p className="panel-sub">Últimas sesiones cerradas con dolor y RPE.</p>
          </div>
        </div>
        {sessions.length === 0 ? (
          <p className="empty">Todavía no hay sesiones guardadas. Cerrá una desde Hoy.</p>
        ) : (
          <div className="log-list">
            {sessions.slice(0, 30).map((s) => {
              const sess = SESSIONS[s.sessionKey]
              return (
                <div key={s.id} className="log-item">
                  <div style={{ minWidth: 0 }}>
                    <div className="title">{sess?.titulo ?? s.sessionKey}</div>
                    <div className="meta">
                      {s.date} · {DAYS[s.day]} · MC{s.meso} Sem {s.week}
                      {s.notes ? ` · ${s.notes.slice(0, 60)}${s.notes.length > 60 ? '…' : ''}` : ''}
                    </div>
                  </div>
                  <div className="chips">
                    {s.pain != null && <Chip variant={s.pain >= 4 ? 'warn' : 'ok'}>Dolor {s.pain}</Chip>}
                    {s.rpeSession != null && <Chip>RPE {s.rpeSession}</Chip>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Rutinas matutinas</h2>
            <p className="panel-sub">Días marcados como completos.</p>
          </div>
        </div>
        {mornings.length === 0 ? (
          <p className="empty">Sin rutinas matutinas registradas todavía.</p>
        ) : (
          <div className="log-list">
            {mornings.slice(0, 20).map((m) => (
              <div key={m.date} className="log-item">
                <div>
                  <div className="title">{m.date}</div>
                  <div className="meta">
                    MC{m.meso} · {m.completedIds.length} ejercicios marcados
                  </div>
                </div>
                <Chip variant="ok">Hecha</Chip>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
