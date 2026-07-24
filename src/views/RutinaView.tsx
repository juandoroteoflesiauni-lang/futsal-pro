import { useMemo, useState } from 'react'
import { MORNING_EXCLUSIONS, MORNING_MC, morningExercisesForMc } from '../data/morning'
import { Chip } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'

export function RutinaView() {
  const { state, toggleMorning, completeMorning, todayMorning } = useAppState()
  const meso = state.plan.meso
  const meta = MORNING_MC[meso - 1]
  const blocks = useMemo(() => morningExercisesForMc(meso), [meso])
  const doneIds = useMemo(() => new Set(todayMorning?.completedIds ?? []), [todayMorning])
  const total = blocks.reduce((n, b) => n + b.ejercicios.length, 0)
  const done = doneIds.size
  const pct = total ? Math.round((done / total) * 100) : 0
  const [openEx, setOpenEx] = useState<string | null>(null)
  const [showExclusions, setShowExclusions] = useState(false)

  return (
    <>
      <div className="grid-stats">
        <div className="stat">
          <div className="stat-label">Duración</div>
          <div className="stat-value">{meta.duracion}</div>
          <div className="stat-hint">MC{meso} · Semanas {meta.semanas}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Hoy</div>
          <div className="stat-value">{pct}%</div>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Estado</div>
          <div className="stat-value" style={{ fontSize: 18 }}>
            {todayMorning?.done ? 'Hecha' : 'Pendiente'}
          </div>
          <div className="stat-hint">{done}/{total} ejercicios</div>
        </div>
      </div>

      <div className="alert info">{meta.cambio}</div>

      <div className="alert danger">
        Tenés brackets: esta rutina excluye mewing forzado y jaw exercisers. Solo hábitos suaves de reposo oral.
      </div>

      {blocks.map((block, bi) => (
        <div key={block.id} className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">Bloque {bi + 1}</Chip>
                <Chip>{block.duracion}</Chip>
              </div>
              <h2 className="panel-title">{block.nombre}</h2>
              <p className="panel-sub">{block.objetivo}</p>
            </div>
          </div>
          <div className="ex-list">
            {block.ejercicios.map((ex, i) => {
              const isOpen = openEx === ex.id
              const isDone = doneIds.has(ex.id)
              return (
                <article key={ex.id} className={`ex-card${isDone ? ' done' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <button
                      type="button"
                      className={`ex-check${isDone ? ' on' : ''}`}
                      style={{ margin: '10px 0 10px 12px', alignSelf: 'center' }}
                      aria-label={isDone ? `Desmarcar ${ex.nombre}` : `Marcar ${ex.nombre}`}
                      onClick={() => toggleMorning(ex.id, meso)}
                    >
                      {isDone ? '✓' : ''}
                    </button>
                    <button
                      type="button"
                      className="ex-top"
                      onClick={() => setOpenEx(isOpen ? null : ex.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="ex-idx">{i + 1}</span>
                      <span className="ex-name">{ex.nombre}</span>
                      <span className={`chev${isOpen ? ' open' : ''}`} aria-hidden="true">
                        ›
                      </span>
                    </button>
                  </div>
                  <div className="ex-meta">
                    <Chip>{ex.params}</Chip>
                  </div>
                  {isOpen && (
                    <div className="ex-body">
                      <div className="ex-box">
                        <div className="lbl">Técnica</div>
                        <p>{ex.desc}</p>
                      </div>
                      <div className="ex-grid">
                        <div className="ex-box err">
                          <div className="lbl">Error frecuente</div>
                          <p>{ex.err}</p>
                        </div>
                        <div className="ex-box alt">
                          <div className="lbl">Nota</div>
                          <p>{ex.nota}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      ))}

      <div className="btn-row">
        <button
          type="button"
          className="btn primary"
          disabled={!!todayMorning?.done}
          onClick={() => completeMorning(meso)}
        >
          {todayMorning?.done ? 'Rutina completada hoy' : 'Marcar rutina completa'}
        </button>
        <button type="button" className="btn ghost" onClick={() => setShowExclusions((v) => !v)}>
          {showExclusions ? 'Ocultar exclusiones' : 'Qué NO hacer'}
        </button>
      </div>

      {showExclusions && (
        <div className="panel" style={{ marginTop: 14 }}>
          <h2 className="panel-title">Lista de exclusión</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--text-2)', lineHeight: 1.7, fontSize: 13 }}>
            {MORNING_EXCLUSIONS.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
