import { useMemo, useState } from 'react'
import { DAYS, MESO_NAMES, SESSIONS } from '../data/program'
import {
  MESOCICLOS_10K,
  RUNNING_GYM_WEEKS,
} from '../data/runningGymData'
import { Chip } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'
import { globalWeek, todayISO } from '../lib/storage'

export function ProgresoView() {
  const {
    state,
    setStartDate,
    setRunningStartDate,
    logBenchmark,
    completedCount,
    morningStreak,
  } = useAppState()

  const isFutsal = state.activeMode === 'futsal'
  const today = todayISO()

  // --------------------------------------------------
  // FUTSAL DATA
  // --------------------------------------------------
  const futsalSessions = useMemo(
    () => [...state.sessions].filter((s) => s.completed).sort((a, b) => b.date.localeCompare(a.date)),
    [state.sessions],
  )
  const mornings = useMemo(
    () => [...state.mornings].filter((m) => m.done).sort((a, b) => b.date.localeCompare(a.date)),
    [state.mornings],
  )

  const futsalPainLogs = futsalSessions.filter((s) => s.pain != null)
  const futsalRpeLogs = futsalSessions.filter((s) => s.rpeSession != null)
  const avgFutsalPain = futsalPainLogs.length
    ? (futsalPainLogs.reduce((sum, s) => sum + (s.pain ?? 0), 0) / futsalPainLogs.length).toFixed(1)
    : '—'
  const avgFutsalRpe = futsalRpeLogs.length
    ? (futsalRpeLogs.reduce((sum, s) => sum + (s.rpeSession ?? 0), 0) / futsalRpeLogs.length).toFixed(1)
    : '—'

  const gWeekFutsal = globalWeek(state.plan.meso, state.plan.week)
  const futsalPlanPct = Math.round((gWeekFutsal / 36) * 100)

  // --------------------------------------------------
  // RUNNING + GYM DATA
  // --------------------------------------------------
  const runningSessions = useMemo(
    () => [...state.runningSessions].filter((s) => s.completed).sort((a, b) => b.date.localeCompare(a.date)),
    [state.runningSessions],
  )
  const runPainLogs = runningSessions.filter((s) => s.pain != null)
  const runRpeLogs = runningSessions.filter((s) => s.rpeSession != null)
  const avgRunPain = runPainLogs.length
    ? (runPainLogs.reduce((sum, s) => sum + (s.pain ?? 0), 0) / runPainLogs.length).toFixed(1)
    : '—'
  const avgRunRpe = runRpeLogs.length
    ? (runRpeLogs.reduce((sum, s) => sum + (s.rpeSession ?? 0), 0) / runRpeLogs.length).toFixed(1)
    : '—'

  const runWeekNum = state.runningPlan.week
  const runPlanPct = Math.round((runWeekNum / 17) * 100)

  // Benchmarks Interactive Logging
  const [bmId, setBmId] = useState<'milla' | '3k' | '5k' | '2k'>('5k')
  const [bmTime, setBmTime] = useState('')
  const [bmPace, setBmPace] = useState('')
  const [bmNotes, setBmNotes] = useState('')

  const handleSaveBenchmark = () => {
    if (!bmTime) return
    let targetTier: 'A' | 'B' | 'C' | undefined = undefined

    // 5K Benchmark key logic:
    if (bmId === '5k') {
      const parts = bmTime.split(':').map(Number)
      const totalSeconds = parts.length === 2 ? parts[0] * 60 + parts[1] : Number(bmTime) * 60
      if (totalSeconds < 26 * 60 + 30) {
        targetTier = 'A'
      } else if (totalSeconds <= 28 * 60 + 30) {
        targetTier = 'B'
      } else {
        targetTier = 'C'
      }
    }

    logBenchmark({
      id: bmId,
      date: today,
      time: bmTime,
      pace: bmPace || undefined,
      targetTier,
      notes: bmNotes || undefined,
    })

    setBmTime('')
    setBmPace('')
    setBmNotes('')
  }

  // --------------------------------------------------
  // RENDER: RUNNING + GYM MODE PROGRESS
  // --------------------------------------------------
  if (!isFutsal) {
    const b5k = state.benchmarks['5k']
    const bMilla = state.benchmarks['milla']
    const b3k = state.benchmarks['3k']
    const b2k = state.benchmarks['2k']

    return (
      <>
        {/* Estadísticas Globales 21K */}
        <div className="grid-stats">
          <div className="stat">
            <div className="stat-label">Camino al 31 Dic</div>
            <div className="stat-value">{runPlanPct}%</div>
            <div className="stat-hint">
              Semana {runWeekNum}/17 · {MESOCICLOS_10K[state.runningPlan.meso - 1]?.nombre}
            </div>
            <div className="progress-bar" aria-hidden="true">
              <span style={{ width: `${runPlanPct}%` }} />
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Sesiones Cerradas</div>
            <div className="stat-value">{completedCount}</div>
            <div className="stat-hint">
              Molestia media {avgRunPain} · RPE medio {avgRunRpe}
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Objetivo Media Maratón</div>
            <div className="stat-value" style={{ fontSize: 20 }}>
              21,097 km
            </div>
            <div className="stat-hint">
              31 Diciembre 2026 · Ritmo 6:50–7:00/km
            </div>
          </div>
        </div>

        {/* REGISTRO Y REPORTE DE BENCHMARKS */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">Pruebas de Campo</Chip>
                <Chip>Hitos del Macrociclo</Chip>
              </div>
              <h2 className="panel-title">Hitos & Benchmarks (Media Maratón 21.1K)</h2>
              <p className="panel-sub">
                Evaluaciones objetivas de movilidad, tolerancia al impacto, umbral y tiradas largas para validar la progresión hacia los 21,1 km.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
            {/* Test 1: Movilidad & WBLT */}
            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>Hito 1: WBLT Tobillo (Sem 1)</strong>
                <Chip variant={bMilla ? 'ok' : undefined}>{bMilla ? 'Hecho' : 'Sem 1'}</Chip>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {bMilla ? (
                  <>
                    <div>Resultado: <strong style={{ color: 'var(--text)' }}>{bMilla.time}</strong></div>
                    {bMilla.pace && <div>Detalle: {bMilla.pace}</div>}
                    <div style={{ fontSize: 11, marginTop: 4 }}>Fecha: {bMilla.date}</div>
                  </>
                ) : (
                  'Meta: WBLT ≥ 10–12 cm. Tolerancia al CA-CO 1:1.'
                )}
              </div>
            </div>

            {/* Test 2: Hito 10K */}
            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>Hito 2: Tirada Larga 10K (Sem 7)</strong>
                <Chip variant={b3k ? 'ok' : undefined}>{b3k ? 'Hecho' : 'Sem 7'}</Chip>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {b3k ? (
                  <>
                    <div>Tiempo: <strong style={{ color: 'var(--text)' }}>{b3k.time}</strong></div>
                    {b3k.pace && <div>Ritmo: {b3k.pace}</div>}
                    <div style={{ fontSize: 11, marginTop: 4 }}>Fecha: {b3k.date}</div>
                  </>
                ) : (
                  'Meta: 10 km continuos @ 7:45 min/km en Z2.'
                )}
              </div>
            </div>

            {/* Test 3: Tempo Extensivo */}
            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14, border: '1px solid var(--accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong style={{ fontSize: 14, color: 'var(--accent)' }}>★ Hito 3: Tempo 3x10m (Sem 11)</strong>
                <Chip variant={b5k ? 'accent' : 'warn'}>{b5k ? 'Completado' : 'CLAVE'}</Chip>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {b5k ? (
                  <>
                    <div>Tiempo: <strong style={{ color: 'var(--text)' }}>{b5k.time}</strong></div>
                    {b5k.pace && <div>Ritmo: {b5k.pace}</div>}
                    <div style={{ fontSize: 11, marginTop: 4 }}>Fecha: {b5k.date}</div>
                  </>
                ) : (
                  'Bloques de 10 min a ritmo umbral 6:30 min/km (RPE 6–7).'
                )}
              </div>
            </div>

            {/* Test 4: Pico 17.5 km */}
            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>Hito 4: Tirada Pico 17.5 km (Sem 14)</strong>
                <Chip variant={b2k ? 'ok' : undefined}>{b2k ? 'Hecho' : 'Sem 14'}</Chip>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {b2k ? (
                  <>
                    <div>Tiempo: <strong style={{ color: 'var(--text)' }}>{b2k.time}</strong></div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Fecha: {b2k.date}</div>
                  </>
                ) : (
                  'Tirada larga cumbre de 17.5 km (120 min) antes del tapering.'
                )}
              </div>
            </div>
          </div>

          {/* Formulario para registrar Benchmark */}
          <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>Registrar Resultado de Hito / Benchmark</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 12 }}>
              <div>
                <label htmlFor="bmid" style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)' }}>Prueba / Hito:</label>
                <select
                  id="bmid"
                  value={bmId}
                  onChange={(e) => setBmId(e.target.value as any)}
                  style={{ width: '100%', padding: '6px 10px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
                >
                  <option value="milla">Hito 1: WBLT Tobillo / Test CA-CO (Sem 1)</option>
                  <option value="3k">Hito 2: Tirada Larga 10K (Sem 7)</option>
                  <option value="5k">★ Hito 3: Tempo 3x10m Umbral (Sem 11)</option>
                  <option value="2k">Hito 4: Tirada Pico 17.5 km (Sem 14)</option>
                </select>
              </div>

              <div>
                <label htmlFor="bmtime" style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)' }}>Tiempo / Medida:</label>
                <input
                  id="bmtime"
                  type="text"
                  placeholder="ej. 12 cm WBLT o 72:30 min"
                  value={bmTime}
                  onChange={(e) => setBmTime(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
                />
              </div>

              <div>
                <label htmlFor="bmpace" style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)' }}>Ritmo / Sensaciones:</label>
                <input
                  id="bmpace"
                  type="text"
                  placeholder="ej. 6:30 min/km RPE 6"
                  value={bmPace}
                  onChange={(e) => setBmPace(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
                />
              </div>
            </div>

            <button type="button" className="btn primary" onClick={handleSaveBenchmark}>
              Guardar Hito
            </button>
          </div>
        </div>

        {/* FECHA DE INICIO DEL PLAN */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Fecha de Inicio del Macrociclo 21K</h2>
              <p className="panel-sub">Fecha del primer lunes de la preparación hacia el 31 de Diciembre de 2026.</p>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="start10k">Fecha Inicio</label>
            <input
              id="start10k"
              type="date"
              value={state.runningPlan.startDate}
              onChange={(e) => setRunningStartDate(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* HISTORIAL DE SESIONES RUNNING + GYM */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Historial de Sesiones Running + GYM</h2>
              <p className="panel-sub">Registro de entrenamientos completados con sensaciones y RPE.</p>
            </div>
          </div>

          {runningSessions.length === 0 ? (
            <p className="empty">Todavía no hay sesiones de Running + GYM cerradas. Cerrá tu primera sesión desde Hoy.</p>
          ) : (
            <div className="log-list">
              {runningSessions.slice(0, 30).map((s) => {
                const weekData = RUNNING_GYM_WEEKS.find((w) => w.num === s.week)
                const dayData = weekData?.dias[s.day]
                return (
                  <div key={s.id} className="log-item">
                    <div style={{ minWidth: 0 }}>
                      <div className="title">
                        {dayData ? `${dayData.runningTitulo} + ${dayData.gymTitulo}` : s.sessionKey}
                      </div>
                      <div className="meta">
                        {s.date} · {DAYS[s.day]} · Sem {s.week}/17
                        {s.notes ? ` · ${s.notes.slice(0, 60)}${s.notes.length > 60 ? '…' : ''}` : ''}
                      </div>
                    </div>
                    <div className="chips">
                      {s.pain != null && <Chip variant={s.pain >= 4 ? 'warn' : 'ok'}>Molestia {s.pain}/10</Chip>}
                      {s.rpeSession != null && <Chip>RPE {s.rpeSession}</Chip>}
                      <Chip variant="ok">✓</Chip>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </>
    )
  }

  // --------------------------------------------------
  // RENDER: FUTSAL MODE PROGRESS (EXISTENTE)
  // --------------------------------------------------
  return (
    <>
      <div className="grid-stats">
        <div className="stat">
          <div className="stat-label">Plan Futsal</div>
          <div className="stat-value">{futsalPlanPct}%</div>
          <div className="stat-hint">
            Semana {gWeekFutsal}/36 · {MESO_NAMES[state.plan.meso - 1]}
          </div>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${futsalPlanPct}%` }} />
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Sesiones Futsal</div>
          <div className="stat-value">{futsalSessions.length}</div>
          <div className="stat-hint">
            Dolor medio {avgFutsalPain} · RPE medio {avgFutsalRpe}
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
            <h2 className="panel-title">Fecha de inicio del plan Futsal</h2>
            <p className="panel-sub">Usada como referencia de dónde estás en las 36 semanas.</p>
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
            <h2 className="panel-title">Historial de sesiones Futsal</h2>
            <p className="panel-sub">Últimas sesiones cerradas con dolor femoropatelar y RPE.</p>
          </div>
        </div>
        {futsalSessions.length === 0 ? (
          <p className="empty">Todavía no hay sesiones guardadas. Cerrá una desde Hoy.</p>
        ) : (
          <div className="log-list">
            {futsalSessions.slice(0, 30).map((s) => {
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
