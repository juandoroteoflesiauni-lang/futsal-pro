import { useState } from 'react'
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
import { globalWeek } from '../lib/storage'

export function PlanView() {
  const { state, setPlan } = useAppState()
  const [meso, setMeso] = useState(state.plan.meso)
  const [week, setWeek] = useState(state.plan.week)
  const [day, setDay] = useState(0)

  const key = getKey(meso, day)
  const session = SESSIONS[key]
  const isDeload = week === 4
  const gWeek = globalWeek(meso, week)

  return (
    <div className="split">
      <aside className="panel" style={{ position: 'sticky', top: 72 }}>
        <div className="stat-label" style={{ marginBottom: 8 }}>
          Fase
        </div>
        <div className="meso-list">
          {MESO_NAMES.map((nm, i) => {
            const m = i + 1
            return (
              <button
                key={m}
                type="button"
                className={`meso-item${meso === m ? ' active' : ''}`}
                onClick={() => {
                  setMeso(m)
                  setWeek(1)
                  setDay(0)
                }}
                aria-pressed={meso === m}
              >
                <span className="meso-num">{m}</span>
                <span style={{ minWidth: 0 }}>
                  <div className="meso-name">{nm}</div>
                  <div className="meso-weeks">
                    Sem {(m - 1) * 4 + 1}–{m * 4}
                  </div>
                </span>
              </button>
            )
          })}
        </div>

        <div className="stat-label" style={{ margin: '16px 0 8px' }}>
          Semana del bloque
        </div>
        <div className="week-row" style={{ marginBottom: 0 }}>
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              type="button"
              className={`week-btn${week === w ? ' active' : ''}`}
              onClick={() => setWeek(w)}
              aria-pressed={week === w}
            >
              {w}
              {w === 4 && <span className="desc">↓</span>}
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button
            type="button"
            className="btn primary"
            style={{ width: '100%' }}
            onClick={() => setPlan(meso, week)}
          >
            Usar como mi semana actual
          </button>
        </div>
      </aside>

      <div>
        <div className="day-strip">
          {DAYS.map((dn, i) => {
            const t = PATTERN[i]
            return (
              <button
                key={dn}
                type="button"
                className={`day-btn${day === i ? ' active' : ''}`}
                onClick={() => setDay(i)}
                aria-pressed={day === i}
                aria-label={`${dn}, sesión ${t === 'DESCANSO' ? 'recuperación' : t}`}
              >
                <div className="d">{DSHORT[i]}</div>
                <div className="t">{t === 'DESCANSO' ? 'REC' : t}</div>
              </button>
            )
          })}
        </div>

        {session && (
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="chips" style={{ marginBottom: 8 }}>
                  <Chip variant="accent">
                    {DAYS[day]} · MC{meso} · Sem {week}
                  </Chip>
                  <Chip>⏱ {session.dur}</Chip>
                  <Chip>Global {gWeek}/36</Chip>
                  {isDeload && <Chip variant="warn">↓ Descarga</Chip>}
                </div>
                <h2 className="panel-title">{session.titulo}</h2>
                <p className="panel-sub">{session.objetivo}</p>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--mono)',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {PATTERN[day] === 'DESCANSO' ? 'R' : PATTERN[day]}
              </div>
            </div>

            {key === 'DESCANSO' && (
              <div className="alert ok">
                Recuperación activa: restauración, no entrenamiento. Nada debe doler.
              </div>
            )}
            {session.warn && <div className="alert warn">⚠ {session.warn}</div>}
            {isDeload && key !== 'DESCANSO' && (
              <div className="alert info">
                Semana de descarga: −35–40% volumen, misma carga, +10 min movilidad.
              </div>
            )}

            {session.cal.length > 0 && (
              <BlockSection title="Calentamiento" dur="15–20 min" accentIdx={0} exercises={session.cal} />
            )}
            {session.bloques.map((b, i) => (
              <BlockSection key={b.n} title={b.n} dur={b.dur} accentIdx={i + 1} exercises={b.ejs} />
            ))}
            {session.enf.length > 0 && (
              <BlockSection title="Enfriamiento" dur="8–12 min" accentIdx={3} exercises={session.enf} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
