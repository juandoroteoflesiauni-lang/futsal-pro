import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DAYS,
  DSHORT,
  MESO_NAMES,
  PATTERN,
  SESSIONS,
  getKey,
} from '../data/program'
import { BlockSection, Chip } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'
import { calendarDayIndex, globalWeek, todayISO } from '../lib/storage'

export function HoyView() {
  const { state, setPlan, toggleExercise, completeSession, getSessionLog, todayMorning } =
    useAppState()
  const day = calendarDayIndex()
  const { meso, week } = state.plan
  const key = getKey(meso, day)
  const session = SESSIONS[key]
  const isDeload = week === 4
  const gWeek = globalWeek(meso, week)
  const date = todayISO()
  const log = getSessionLog(date, key)
  const doneSet = useMemo(() => new Set(log?.doneExercises ?? []), [log])

  const [pain, setPain] = useState(log?.pain ?? 2)
  const [rpe, setRpe] = useState(log?.rpeSession ?? 6)
  const [notes, setNotes] = useState(log?.notes ?? '')
  const [showFinish, setShowFinish] = useState(false)

  if (!session) {
    return <p className="empty">No hay sesión para este día.</p>
  }

  const allExercises = [
    ...session.cal,
    ...session.bloques.flatMap((b) => b.ejs),
    ...session.enf,
  ]
  const progress = allExercises.length
    ? Math.round((doneSet.size / allExercises.length) * 100)
    : 0

  const meta = { meso, week, day }

  return (
    <>
      <div className="grid-stats">
        <div className="stat">
          <div className="stat-label">Hoy</div>
          <div className="stat-value">{DAYS[day]}</div>
          <div className="stat-hint">
            {PATTERN[day] === 'DESCANSO' ? 'Recuperación' : `Sesión ${PATTERN[day]}`} · Sem {gWeek}
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Fase</div>
          <div className="stat-value">MC{meso}</div>
          <div className="stat-hint">{MESO_NAMES[meso - 1]}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Avance sesión</div>
          <div className="stat-value">{progress}%</div>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Dónde estás en el plan</h2>
            <p className="panel-sub">Ajustá mesociclo y semana si tu progreso real no coincide.</p>
          </div>
        </div>
        <div className="week-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => (
            <button
              key={m}
              type="button"
              className={`week-btn${meso === m ? ' active' : ''}`}
              onClick={() => setPlan(m, week)}
              aria-pressed={meso === m}
            >
              MC{m}
            </button>
          ))}
        </div>
        <div className="week-row">
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              type="button"
              className={`week-btn${week === w ? ' active' : ''}`}
              onClick={() => setPlan(meso, w)}
              aria-pressed={week === w}
            >
              Sem {w}
              {w === 4 && <span className="desc">Descarga</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="panel" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <h2 className="panel-title">Movimiento SIMF</h2>
          <p className="panel-sub">Sistema de 12 meses: movilidad, FRC, agilidad reactiva.</p>
        </div>
        <Link to="/simf" className="btn ghost">
          Abrir SIMF
        </Link>
      </div>

      <div className="panel" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <h2 className="panel-title">Running 10K</h2>
          <p className="panel-sub">Plan científico Sub-45/50 · 27 jul → 31 dic.</p>
        </div>
        <Link to="/running" className="btn ghost">
          Abrir 10K
        </Link>
      </div>

      <div className="panel" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <h2 className="panel-title">Rutina matutina</h2>
          <p className="panel-sub">
            {todayMorning?.done ? 'Completada hoy ✓' : '15–18 min antes del desayuno'}
          </p>
        </div>
        <Link to="/rutina" className="btn primary">
          {todayMorning?.done ? 'Ver rutina' : 'Empezar rutina'}
        </Link>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">{DSHORT[day]}</Chip>
              <Chip>⏱ {session.dur}</Chip>
              {isDeload && <Chip variant="warn">↓ Descarga</Chip>}
              {log?.completed && <Chip variant="ok">Completada</Chip>}
            </div>
            <h2 className="panel-title">{session.titulo}</h2>
            <p className="panel-sub">{session.objetivo}</p>
          </div>
        </div>

        {key === 'DESCANSO' && (
          <div className="alert ok">
            Día de recuperación activa: nada debe generar dolor. Si un ejercicio de rodilla molesta, salteálo.
          </div>
        )}
        {session.warn && <div className="alert warn">⚠ {session.warn}</div>}
        {isDeload && key !== 'DESCANSO' && (
          <div className="alert info">
            Semana de descarga: reducí series/reps 35–40%. Mantené la carga. Sumá 10 min de movilidad.
          </div>
        )}

        {session.cal.length > 0 && (
          <BlockSection
            title="Calentamiento"
            dur="15–20 min"
            accentIdx={0}
            exercises={session.cal}
            doneSet={doneSet}
            onToggle={(name) => toggleExercise(date, key, meta, name)}
          />
        )}
        {session.bloques.map((b, i) => (
          <BlockSection
            key={b.n}
            title={b.n}
            dur={b.dur}
            accentIdx={i + 1}
            exercises={b.ejs}
            doneSet={doneSet}
            onToggle={(name) => toggleExercise(date, key, meta, name)}
          />
        ))}
        {session.enf.length > 0 && (
          <BlockSection
            title="Enfriamiento"
            dur="8–12 min"
            accentIdx={3}
            exercises={session.enf}
            doneSet={doneSet}
            onToggle={(name) => toggleExercise(date, key, meta, name)}
          />
        )}

        {!log?.completed && (
          <div className="btn-row">
            <button type="button" className="btn primary" onClick={() => setShowFinish((v) => !v)}>
              Cerrar sesión
            </button>
            <Link to="/plan" className="btn ghost">
              Ver plan completo
            </Link>
          </div>
        )}

        {showFinish && !log?.completed && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
            <div className="form-row">
              <label htmlFor="pain">Dolor de rodilla post-sesión (0–10): {pain}</label>
              <input
                id="pain"
                name="pain"
                type="range"
                min={0}
                max={10}
                value={pain}
                onChange={(e) => setPain(Number(e.target.value))}
                autoComplete="off"
              />
            </div>
            <div className="form-row">
              <label htmlFor="rpe">RPE de sesión (1–10): {rpe}</label>
              <input
                id="rpe"
                name="rpe"
                type="range"
                min={1}
                max={10}
                value={rpe}
                onChange={(e) => setRpe(Number(e.target.value))}
                autoComplete="off"
              />
            </div>
            <div className="form-row">
              <label htmlFor="notes">Notas</label>
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Cómo se sintió la rodilla, sueño, fatiga…"
                autoComplete="off"
              />
            </div>
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                completeSession(date, key, meta, { pain, rpeSession: rpe, notes })
                setShowFinish(false)
              }}
            >
              Guardar sesión
            </button>
          </div>
        )}
      </div>
    </>
  )
}
