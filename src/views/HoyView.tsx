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
import {
  GYM_SESSIONS,
  RUNNING_GYM_WEEKS,
  getRunningWeek,
  type RunningGymDay,
} from '../data/runningGymData'
import { BlockSection, Chip, GymExCard } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'
import { calendarDayIndex, globalWeek, todayISO } from '../lib/storage'

export function HoyView() {
  const {
    state,
    setPlan,
    toggleExercise,
    completeSession,
    getSessionLog,
    todayMorning,
    // Running + GYM mode hooks
    setRunningPlan,
    toggleRunningExercise,
    completeRunningSession,
    getRunningSessionLog,
    todayReadiness,
    setDailyReadiness,
  } = useAppState()

  const isFutsal = state.activeMode === 'futsal'
  const day = calendarDayIndex()
  const date = todayISO()

  // --------------------------------------------------
  // FUTSAL MODE LOGIC
  // --------------------------------------------------
  const { meso, week } = state.plan
  const key = getKey(meso, day)
  const session = SESSIONS[key]
  const isDeload = week === 4
  const gWeek = globalWeek(meso, week)
  const futsalLog = getSessionLog(date, key)
  const doneSetFutsal = useMemo(() => new Set(futsalLog?.doneExercises ?? []), [futsalLog])

  // --------------------------------------------------
  // RUNNING + GYM MODE LOGIC
  // --------------------------------------------------
  const runWeekNum = state.runningPlan.week
  const runningWeekData = getRunningWeek(runWeekNum)
  const runningDayData: RunningGymDay | undefined = runningWeekData.dias[day]
  const runningKey = `R${runWeekNum}:D${day}`
  const runningLog = getRunningSessionLog(date, runningKey)
  const doneSetRunning = useMemo(() => new Set(runningLog?.doneExercises ?? []), [runningLog])

  const gymSession = runningDayData?.gymSesionId ? GYM_SESSIONS[runningDayData.gymSesionId] : null
  const runningMeso = runningWeekData.meso

  // Completion Form States
  const [pain, setPain] = useState(isFutsal ? futsalLog?.pain ?? 2 : runningLog?.pain ?? 1)
  const [rpe, setRpe] = useState(isFutsal ? futsalLog?.rpeSession ?? 6 : runningLog?.rpeSession ?? 7)
  const [notes, setNotes] = useState(isFutsal ? futsalLog?.notes ?? '' : runningLog?.notes ?? '')
  const [showFinish, setShowFinish] = useState(false)

  // --------------------------------------------------
  // RENDER: MODO RUNNING + GYM
  // --------------------------------------------------
  if (!isFutsal) {
    if (!runningDayData) {
      return <p className="empty">No hay sesión de running/gym programada para este día.</p>
    }

    const allGymExercises = gymSession
      ? gymSession.ejercicios.length > 0
        ? gymSession.ejercicios
        : gymSession.bloques?.flatMap((b) => b.ejercicios) ?? []
      : []

    const totalExercisesCount = allGymExercises.length
    const doneExercisesCount = doneSetRunning.size
    const progressPct = totalExercisesCount
      ? Math.round((doneExercisesCount / totalExercisesCount) * 100)
      : runningLog?.completed
      ? 100
      : 0

    const metaRunning = { meso: runningMeso, week: runWeekNum, day }

    return (
      <>
        {/* Estadísticas Superiores */}
        <div className="grid-stats">
          <div className="stat">
            <div className="stat-label">Hoy</div>
            <div className="stat-value">{DAYS[day]}</div>
            <div className="stat-hint">
              Semana {runWeekNum}/17 · {runningDayData.zona !== '-' ? `${runningDayData.zona} (${runningDayData.km} km)` : 'Descanso Carrera'}
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Gimnasio</div>
            <div className="stat-value" style={{ fontSize: 20 }}>{runningDayData.gymTipo}</div>
            <div className="stat-hint">
              {gymSession?.titulo.slice(0, 32) ?? runningDayData.gymTitulo}
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Avance Gym</div>
            <div className="stat-value">{progressPct}%</div>
            <div className="progress-bar" aria-hidden="true">
              <span style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        {/* Semáforo de Autorregulación Rápido */}
        <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Semáforo de Hoy:</span>
                <Chip
                  variant={
                    todayReadiness?.status === 'verde'
                      ? 'ok'
                      : todayReadiness?.status === 'amarillo'
                      ? 'warn'
                      : todayReadiness?.status === 'rojo'
                      ? 'danger'
                      : undefined
                  }
                >
                  {todayReadiness ? todayReadiness.status.toUpperCase() : 'PENDIENTE'}
                </Chip>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-2)' }}>
                {todayReadiness?.status === 'verde'
                  ? '✓ Ejecutar al 100% de volumen e intensidad.'
                  : todayReadiness?.status === 'amarillo'
                  ? '⚠ Reducir 1 serie por ejercicio en gym o ritmo +10s/km.'
                  : todayReadiness?.status === 'rojo'
                  ? '✗ Alarma: Cese de impacto por 48h y movilidad pasiva.'
                  : 'Registrá tus sensaciones diarias antes de empezar.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {(['verde', 'amarillo', 'rojo'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`btn xs ${todayReadiness?.status === st ? 'primary' : 'ghost'}`}
                  onClick={() =>
                    setDailyReadiness({
                      date,
                      status: st,
                      sleepHours: todayReadiness?.sleepHours ?? 7.5,
                      musclePain: todayReadiness?.musclePain ?? 1,
                    })
                  }
                >
                  {st === 'verde' ? '🟢 Verde' : st === 'amarillo' ? '🟡 Amarillo' : '🔴 Rojo'}
                </button>
              ))}
              <Link to="/autorregulacion" className="btn xs ghost">
                Test completo
              </Link>
            </div>
          </div>
        </div>

        {/* Selector Rápido de Semana */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Dónde estás en el Plan 10K</h2>
              <p className="panel-sub">Semana actual: S{runWeekNum}/17 · {runningWeekData.faseNombre}</p>
            </div>
          </div>
          <div
            className="week-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(44px, 1fr))',
              gap: 4,
              marginBottom: 0,
            }}
          >
            {RUNNING_GYM_WEEKS.map((w) => (
              <button
                key={w.num}
                type="button"
                className={`week-btn${runWeekNum === w.num ? ' active' : ''}`}
                onClick={() => setRunningPlan(w.num, w.meso)}
                aria-pressed={runWeekNum === w.num}
                style={{ padding: '6px 2px', fontSize: 12 }}
              >
                S{w.num}
                {w.esDescarga && <span style={{ fontSize: 9, color: 'var(--warn)' }}>↓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjeta de Sesión de Hoy */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 8 }}>
                <Chip variant="accent">{DAYS[day]} · Sem {runWeekNum}</Chip>
                {runningDayData.km > 0 && <Chip variant="ok">{runningDayData.km} km ({runningDayData.zona})</Chip>}
                <Chip>{runningDayData.gymTipo}</Chip>
                {runningLog?.completed && <Chip variant="ok">✓ Sesión Cerrada</Chip>}
                {runningWeekData.esDescarga && <Chip variant="warn">↓ Descarga</Chip>}
              </div>
              <h2 className="panel-title">{runningDayData.runningTitulo}</h2>
              <p className="panel-sub">{runningDayData.objetivoRunning}</p>
            </div>
          </div>

          {/* Bloque 1: Running / Cardio */}
          <div className="block" style={{ marginBottom: 16 }}>
            <div className="block-head" style={{ cursor: 'default' }}>
              <span className="block-head-left">
                <span className="bar ok" />
                <span className="block-label">Bloque 1: Running / Cardio</span>
                {runningDayData.duracionMin > 0 && (
                  <span className="block-dur">⏱ {runningDayData.duracionMin} min</span>
                )}
              </span>
              {runningDayData.ritmoEst !== '-' && (
                <Chip variant="accent">Ritmo: {runningDayData.ritmoEst}</Chip>
              )}
            </div>
            <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{runningDayData.runningDetalle}</p>
            </div>
          </div>

          {/* Bloque 2: Gimnasio / Fuerza */}
          <div className="block" style={{ marginBottom: 16 }}>
            <div className="block-head" style={{ cursor: 'default' }}>
              <span className="block-head-left">
                <span className="bar accent" />
                <span className="block-label">Bloque 2: {runningDayData.gymTitulo}</span>
                {runningDayData.gymDuracionMin > 0 && (
                  <span className="block-dur">⏱ {runningDayData.gymDuracionMin} min</span>
                )}
              </span>
              <Chip style={{ opacity: 0.85 }}>{runningDayData.demandaMuscular}</Chip>
            </div>
            <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{runningDayData.gymDetalle}</p>
            </div>

            {/* Ejercicios interactivos de gimnasio */}
            {gymSession && gymSession.ejercicios.length > 0 && (
              <div className="ex-list" style={{ marginTop: 10 }}>
                {gymSession.ejercicios.map((ex, i) => (
                  <GymExCard
                    key={ex.id}
                    ex={ex}
                    idx={i}
                    done={doneSetRunning.has(ex.nombre) || doneSetRunning.has(ex.sustitucion)}
                    onToggle={() => toggleRunningExercise(date, runningKey, metaRunning, ex.nombre)}
                  />
                ))}
              </div>
            )}

            {/* Bloques de la Sesión D */}
            {gymSession && gymSession.bloques && (
              <div style={{ display: 'grid', gap: 12, marginTop: 10 }}>
                {gymSession.bloques.map((b) => (
                  <div key={b.nombre} className="panel" style={{ background: 'var(--bg-elevated)', padding: 12 }}>
                    <div className="stat-label" style={{ color: 'var(--accent)', marginBottom: 6 }}>
                      {b.nombre} · {b.duracion}
                    </div>
                    <div className="ex-list">
                      {b.ejercicios.map((ex, i) => (
                        <GymExCard
                          key={ex.id}
                          ex={ex}
                          idx={i}
                          done={doneSetRunning.has(ex.nombre)}
                          onToggle={() => toggleRunningExercise(date, runningKey, metaRunning, ex.nombre)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bloque 3: Movilidad / Descarga */}
          <div className="block" style={{ marginBottom: 16 }}>
            <div className="block-head" style={{ cursor: 'default' }}>
              <span className="block-head-left">
                <span className="bar warn" />
                <span className="block-label">Bloque 3: Movilidad, SMR y Descarga</span>
              </span>
            </div>
            <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{runningDayData.movilidadDetalle}</p>
            </div>
          </div>

          {/* Botón de Cierre de Sesión */}
          {!runningLog?.completed && (
            <div className="btn-row">
              <button type="button" className="btn primary" onClick={() => setShowFinish((v) => !v)}>
                Cerrar sesión de hoy
              </button>
              <Link to="/plan-10k" className="btn ghost">
                Ver plan 17S
              </Link>
            </div>
          )}

          {showFinish && !runningLog?.completed && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <div className="form-row">
                <label htmlFor="pain">Molestia / Dolor articular post-sesión (0–10): {pain}</label>
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
                <label htmlFor="rpe">RPE Global de la Sesión (1–10): {rpe}</label>
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
                <label htmlFor="notes">Notas y Sensaciones</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ritmo sostenido, sensaciones en el sóleo, descanso…"
                  autoComplete="off"
                />
              </div>
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  completeRunningSession(date, runningKey, metaRunning, { pain, rpeSession: rpe, notes })
                  setShowFinish(false)
                }}
              >
                Guardar y completar sesión
              </button>
            </div>
          )}
        </div>
      </>
    )
  }

  // --------------------------------------------------
  // RENDER: MODO FUTSAL (EXISTENTE)
  // --------------------------------------------------
  if (!session) {
    return <p className="empty">No hay sesión para este día.</p>
  }

  const allExercises = [
    ...session.cal,
    ...session.bloques.flatMap((b) => b.ejs),
    ...session.enf,
  ]
  const progress = allExercises.length
    ? Math.round((doneSetFutsal.size / allExercises.length) * 100)
    : 0

  const metaFutsal = { meso, week, day }

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
            <h2 className="panel-title">Dónde estás en el plan Futsal</h2>
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
              {futsalLog?.completed && <Chip variant="ok">Completada</Chip>}
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
            doneSet={doneSetFutsal}
            onToggle={(name) => toggleExercise(date, key, metaFutsal, name)}
          />
        )}
        {session.bloques.map((b, i) => (
          <BlockSection
            key={b.n}
            title={b.n}
            dur={b.dur}
            accentIdx={i + 1}
            exercises={b.ejs}
            doneSet={doneSetFutsal}
            onToggle={(name) => toggleExercise(date, key, metaFutsal, name)}
          />
        ))}
        {session.enf.length > 0 && (
          <BlockSection
            title="Enfriamiento"
            dur="8–12 min"
            accentIdx={3}
            exercises={session.enf}
            doneSet={doneSetFutsal}
            onToggle={(name) => toggleExercise(date, key, metaFutsal, name)}
          />
        )}

        {!futsalLog?.completed && (
          <div className="btn-row">
            <button type="button" className="btn primary" onClick={() => setShowFinish((v) => !v)}>
              Cerrar sesión
            </button>
            <Link to="/plan" className="btn ghost">
              Ver plan completo
            </Link>
          </div>
        )}

        {showFinish && !futsalLog?.completed && (
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
                completeSession(date, key, metaFutsal, { pain, rpeSession: rpe, notes })
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
