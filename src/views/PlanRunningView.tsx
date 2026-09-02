import { useState } from 'react'
import {
  GYM_SESSIONS,
  MESOCICLOS_10K,
  RUNNING_GYM_WEEKS,
  getRunningWeek,
  type RunningGymDay,
} from '../data/runningGymData'
import { Chip, GymExCard } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'

const DAYS_SHORT = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

export function PlanRunningView() {
  const { state, setRunningPlan } = useAppState()
  const [selectedWeek, setSelectedWeek] = useState(state.runningPlan.week)
  const [selectedDayIdx, setSelectedDayIdx] = useState(0)

  const week = getRunningWeek(selectedWeek)
  const dayData: RunningGymDay | undefined = week.dias[selectedDayIdx]

  const gymSession = dayData?.gymSesionId ? GYM_SESSIONS[dayData.gymSesionId] : null

  return (
    <div className="split">
      {/* Sidebar de Navegación de Semanas y Mesociclos */}
      <aside className="panel" style={{ position: 'sticky', top: 72 }}>
        <div className="stat-label" style={{ marginBottom: 8 }}>
          Mesociclo
        </div>
        <div className="meso-list">
          {MESOCICLOS_10K.map((m) => {
            const isActiveMeso = week.meso === m.id
            return (
              <button
                key={m.id}
                type="button"
                className={`meso-item${isActiveMeso ? ' active' : ''}`}
                onClick={() => {
                  const firstWeekOfMeso = m.semanasNum[0]
                  setSelectedWeek(firstWeekOfMeso)
                  setSelectedDayIdx(0)
                }}
                aria-pressed={isActiveMeso}
              >
                <span className="meso-num">{m.id}</span>
                <span style={{ minWidth: 0 }}>
                  <div className="meso-name">MC{m.id}: {m.nombre}</div>
                  <div className="meso-weeks">{m.semanas}</div>
                </span>
              </button>
            )
          })}
        </div>

        <div className="stat-label" style={{ margin: '16px 0 8px' }}>
          Semana del Plan 10K (1 a 17)
        </div>
        <div
          className="week-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 6,
            marginBottom: 12,
          }}
        >
          {RUNNING_GYM_WEEKS.map((w) => {
            const isCur = selectedWeek === w.num
            const isUserActive = state.runningPlan.week === w.num
            return (
              <button
                key={w.num}
                type="button"
                className={`week-btn${isCur ? ' active' : ''}`}
                onClick={() => {
                  setSelectedWeek(w.num)
                  setSelectedDayIdx(0)
                }}
                aria-pressed={isCur}
                style={{
                  position: 'relative',
                  padding: '8px 4px',
                  border: isUserActive ? '2px solid var(--accent)' : undefined,
                }}
              >
                <span>S{w.num}</span>
                {w.esDescarga && <span style={{ fontSize: 10, color: 'var(--warn)' }}>↓</span>}
                {w.benchmarkInfo && <span style={{ fontSize: 10, color: 'var(--danger)' }}>★</span>}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="btn primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => setRunningPlan(selectedWeek, week.meso)}
        >
          Usar Semana {selectedWeek} como actual
        </button>

        <div className="sidebar-meta" style={{ marginTop: 16 }}>
          <div>
            Volumen Semanal: <strong>{week.volumenKmTotal} km</strong>
          </div>
          <div>
            Tirada Larga: <strong>{week.tiradaLargaKm} km</strong>
          </div>
          <div>
            Carga Global: <strong>{week.cargaGlobalAU} AU</strong>
          </div>
        </div>
      </aside>

      {/* Detalle de la Semana y Días */}
      <div>
        {/* Banner de Semana */}
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">MC{week.meso} · Semana {week.num}/17</Chip>
                <Chip>{week.volumenKmTotal} km totales</Chip>
                <Chip>Tirada {week.tiradaLargaKm} km</Chip>
                {week.esDescarga && <Chip variant="warn">↓ Descarga (−35% vol)</Chip>}
                {week.benchmarkInfo && <Chip variant="danger">★ Benchmark Clave</Chip>}
              </div>
              <h2 className="panel-title">{week.titulo}</h2>
              <p className="panel-sub">{week.objetivoPrioritario}</p>
              {week.benchmarkInfo && (
                <div className="alert warn" style={{ marginTop: 8 }}>
                  <strong>{week.benchmarkInfo}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barra de Selección de Día */}
        <div className="day-strip" style={{ marginBottom: 16 }}>
          {week.dias.map((d, i) => {
            const isSelected = selectedDayIdx === i
            return (
              <button
                key={d.dia}
                type="button"
                className={`day-btn${isSelected ? ' active' : ''}`}
                onClick={() => setSelectedDayIdx(i)}
                aria-pressed={isSelected}
              >
                <div className="d">{DAYS_SHORT[i]}</div>
                <div className="t" style={{ fontSize: 10 }}>
                  {d.zona !== '-' ? d.zona : d.gymTipo === 'Descanso' ? 'REC' : 'GYM'}
                </div>
              </button>
            )
          })}
        </div>

        {/* Tarjeta del Día Seleccionado */}
        {dayData && (
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="chips" style={{ marginBottom: 8 }}>
                  <Chip variant="accent">{dayData.dia} · Sem {week.num}</Chip>
                  {dayData.km > 0 && <Chip variant="ok">{dayData.km} km ({dayData.zona})</Chip>}
                  <Chip>{dayData.gymTipo}</Chip>
                  <Chip>RPE Est: {dayData.rpeEsperado}/10</Chip>
                </div>
                <h2 className="panel-title">{dayData.runningTitulo}</h2>
                <p className="panel-sub">{dayData.objetivoRunning}</p>
              </div>
            </div>

            {/* Bloque 1: Running / Cardio */}
            <div className="block" style={{ marginBottom: 16 }}>
              <div className="block-head" style={{ cursor: 'default' }}>
                <span className="block-head-left">
                  <span className="bar ok" />
                  <span className="block-label">Bloque 1: Running / Cardio</span>
                  {dayData.duracionMin > 0 && (
                    <span className="block-dur">⏱ {dayData.duracionMin} min</span>
                  )}
                </span>
                {dayData.ritmoEst !== '-' && <Chip variant="accent">Ritmo: {dayData.ritmoEst}</Chip>}
              </div>
              <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{dayData.runningDetalle}</p>
              </div>
            </div>

            {/* Bloque 2: Gimnasio / Fuerza / Movilidad */}
            <div className="block" style={{ marginBottom: 16 }}>
              <div className="block-head" style={{ cursor: 'default' }}>
                <span className="block-head-left">
                  <span className="bar accent" />
                  <span className="block-label">Bloque 2: {dayData.gymTitulo}</span>
                  {dayData.gymDuracionMin > 0 && (
                    <span className="block-dur">⏱ {dayData.gymDuracionMin} min</span>
                  )}
                </span>
                <Chip style={{ opacity: 0.85 }}>{dayData.demandaMuscular}</Chip>
              </div>
              <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{dayData.gymDetalle}</p>
              </div>

              {/* Si hay ejercicios de gimnasio asignados (Sesión A, B o C) */}
              {gymSession && gymSession.ejercicios.length > 0 && (
                <div className="ex-list" style={{ marginTop: 10 }}>
                  {gymSession.ejercicios.map((ex, i) => (
                    <GymExCard key={ex.id} ex={ex} idx={i} />
                  ))}
                </div>
              )}

              {/* Si es Sesión D de movilidad estructurada */}
              {gymSession && gymSession.bloques && (
                <div style={{ display: 'grid', gap: 12, marginTop: 10 }}>
                  {gymSession.bloques.map((b) => (
                    <div key={b.nombre} className="panel" style={{ background: 'var(--bg-elevated)', padding: 12 }}>
                      <div className="stat-label" style={{ color: 'var(--accent)', marginBottom: 6 }}>
                        {b.nombre} · {b.duracion}
                      </div>
                      <div className="ex-list">
                        {b.ejercicios.map((ex, i) => (
                          <GymExCard key={ex.id} ex={ex} idx={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bloque 3: Movilidad y Descarga */}
            <div className="block">
              <div className="block-head" style={{ cursor: 'default' }}>
                <span className="block-head-left">
                  <span className="bar warn" />
                  <span className="block-label">Bloque 3: Movilidad, SMR & Descarga</span>
                </span>
              </div>
              <div className="ex-body" style={{ padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{dayData.movilidadDetalle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
