import { useMemo, useState } from 'react'
import {
  RACE_SPLITS,
  RUNNING_ADAPTATIONS,
  RUNNING_MICRO,
  RUNNING_PHASES,
  RUNNING_RACE,
  RUNNING_RESUMEN,
  RUNNING_START,
  RUNNING_TITLE,
  RUNNING_TOTAL_WEEKS,
  RUNNING_WEEKS,
  RUNNING_ZONES,
  getRunningWeekNumber,
  getWeekByNumber,
  type RunDay,
} from '../data/running'
import { Chip } from '../components/ExerciseUI'
import { todayISO } from '../lib/storage'

type Tab = 'semana' | 'fases' | 'zonas' | 'micro' | 'carrera'

const TABS: { id: Tab; label: string }[] = [
  { id: 'semana', label: 'Semana' },
  { id: 'fases', label: 'Fases' },
  { id: 'zonas', label: 'Zonas' },
  { id: 'micro', label: 'Micro' },
  { id: 'carrera', label: 'Carrera' },
]

const TIPO_CHIP: Record<RunDay['tipo'], 'accent' | 'warn' | 'ok' | undefined> = {
  calidad: 'warn',
  test: 'warn',
  carrera: 'accent',
  largo: 'ok',
  rodaje: undefined,
  descanso: undefined,
  activo: 'ok',
}

function DayCard({ day, highlight }: { day: RunDay; highlight?: boolean }) {
  return (
    <article className={`ex-card${highlight ? ' auth' : ''}`}>
      <div className="ex-row">
        <div className="ex-main">
          <div className="ex-top" style={{ cursor: 'default' }}>
            <span className="ex-name">
              {day.dia}
              {day.fecha ? (
                <span className="auth-tag" style={{ color: 'var(--text-3)' }}>
                  {day.fecha.slice(5)}
                </span>
              ) : null}
            </span>
            <div className="chips">
              <Chip variant={TIPO_CHIP[day.tipo]}>{day.tipo}</Chip>
              {day.km != null ? <Chip>{day.km} km</Chip> : null}
              {day.zona ? <Chip>{day.zona}</Chip> : null}
            </div>
          </div>
          <p className="panel-sub" style={{ margin: 0 }}>
            {day.sesion}
          </p>
        </div>
      </div>
    </article>
  )
}

export function RunningView() {
  const today = todayISO()
  const currentWeekNum = getRunningWeekNumber(today)
  const [tab, setTab] = useState<Tab>('semana')
  const [weekNum, setWeekNum] = useState(currentWeekNum)
  const week = useMemo(() => getWeekByNumber(weekNum) ?? RUNNING_WEEKS[0], [weekNum])
  const phase = RUNNING_PHASES.find((p) => p.id === week.fase)

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">10K</Chip>
              <Chip>Sub-45/50</Chip>
              <Chip>
                Sem {currentWeekNum}/{RUNNING_TOTAL_WEEKS}
              </Chip>
            </div>
            <h2 className="panel-title">{RUNNING_TITLE}</h2>
            <p className="panel-sub">{RUNNING_RESUMEN}</p>
            <div className="chips" style={{ marginTop: 10 }}>
              <Chip>Inicio {RUNNING_START}</Chip>
              <Chip variant="warn">Carrera {RUNNING_RACE}</Chip>
            </div>
          </div>
        </div>
      </div>

      <div className="week-row simf-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`week-btn${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'semana' && week && (
        <>
          <div className="panel">
            <div className="panel-head">
              <div>
                <h2 className="panel-title">{week.titulo}</h2>
                <p className="panel-sub">
                  {week.fechas} · {week.volumenKm} km
                  {phase ? ` · Fase ${phase.id}: ${phase.nombre}` : ''}
                </p>
                <div className="chips" style={{ marginTop: 8 }}>
                  {week.descarga ? <Chip variant="warn">↓ Descarga</Chip> : null}
                  <Chip variant="accent">Fase {week.fase}</Chip>
                </div>
              </div>
            </div>

            <label className="stat-label" htmlFor="run-week">
              Semana del plan
            </label>
            <input
              id="run-week"
              name="run-week"
              type="range"
              min={1}
              max={RUNNING_WEEKS.length}
              value={weekNum}
              onChange={(e) => setWeekNum(Number(e.target.value))}
              autoComplete="off"
              style={{ width: '100%', accentColor: 'var(--accent)', marginTop: 8 }}
            />
            <div className="btn-row">
              <button
                type="button"
                className="btn ghost"
                disabled={weekNum <= 1}
                onClick={() => setWeekNum((n) => Math.max(1, n - 1))}
              >
                ← Anterior
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => setWeekNum(currentWeekNum)}
              >
                Ir a mi semana ({currentWeekNum})
              </button>
              <button
                type="button"
                className="btn ghost"
                disabled={weekNum >= RUNNING_WEEKS.length}
                onClick={() => setWeekNum((n) => Math.min(RUNNING_WEEKS.length, n + 1))}
              >
                Siguiente →
              </button>
            </div>
          </div>

          <div className="ex-list">
            {week.dias.map((d) => (
              <DayCard key={`${d.fecha ?? d.dia}-${d.sesion.slice(0, 24)}`} day={d} highlight={d.fecha === today} />
            ))}
          </div>
        </>
      )}

      {tab === 'fases' && (
        <div className="log-list">
          {RUNNING_PHASES.map((p) => (
            <div key={p.id} className="panel" style={{ marginBottom: 10 }}>
              <div className="chips" style={{ marginBottom: 8 }}>
                <Chip variant="accent">Fase {p.id}</Chip>
                <Chip>{p.semanas}</Chip>
                <Chip>{p.volumen}</Chip>
              </div>
              <h2 className="panel-title">{p.nombre}</h2>
              <p className="panel-sub">{p.fechas}</p>
              <div className="ex-box" style={{ marginTop: 10 }}>
                <div className="lbl">Objetivos</div>
                <p>{p.objetivos}</p>
              </div>
              <div className="ex-box" style={{ marginTop: 8 }}>
                <div className="lbl">Distribución (TID)</div>
                <p>{p.tid}</p>
              </div>
              <div className="ex-box alt" style={{ marginTop: 8 }}>
                <div className="lbl">Sesiones clave</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {p.sesionesClave.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="ex-box" style={{ marginTop: 8 }}>
                <div className="lbl">Métricas</div>
                <p>{p.metricas}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'zonas' && (
        <div className="ex-list">
          {RUNNING_ZONES.map((z) => (
            <article key={z.id} className="ex-card">
              <div className="ex-row">
                <div className="ex-main">
                  <div className="ex-top" style={{ cursor: 'default' }}>
                    <span className="ex-name">
                      {z.id} — {z.nombre}
                    </span>
                    <Chip variant="accent">RPE {z.rpe}</Chip>
                  </div>
                  <p className="panel-sub" style={{ margin: 0 }}>
                    {z.descripcion}
                  </p>
                  <div className="ex-box alt" style={{ marginTop: 8 }}>
                    <div className="lbl">Cuándo usarla</div>
                    <p>{z.uso}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'micro' && (
        <>
          <div className="alert info">
            Plantilla semanal tipo para fases centrales de carga (Fases 3–4). Agrupa estrés neuromuscular el mismo día para permitir 48 h de recuperación.
          </div>
          <div className="ex-list">
            {RUNNING_MICRO.map((d) => (
              <DayCard key={d.dia} day={d} />
            ))}
          </div>
        </>
      )}

      {tab === 'carrera' && (
        <>
          <div className="panel">
            <h2 className="panel-title">Pacing: estrategia parcial negativa / neutra</h2>
            <p className="panel-sub">
              Evitá la aceleración adrenalínica inicial que agota glucógeno y genera acidosis precoz.
            </p>
          </div>
          <div className="log-list">
            {RACE_SPLITS.map((s) => (
              <div key={s.tramo} className="panel" style={{ marginBottom: 10 }}>
                <h2 className="panel-title">{s.tramo}</h2>
                <div className="chips" style={{ margin: '8px 0' }}>
                  <Chip>Sub-50: {s.sub50}</Chip>
                  <Chip variant="accent">Sub-45: {s.sub45}</Chip>
                </div>
                <p className="panel-sub" style={{ margin: 0 }}>
                  {s.enfoque}
                </p>
              </div>
            ))}
          </div>
          <div className="panel">
            <h2 className="panel-title">Si hay fatiga o molestias</h2>
            <div className="log-list" style={{ marginTop: 12 }}>
              {RUNNING_ADAPTATIONS.map((a) => (
                <div key={a.id} className="ex-box err" style={{ marginBottom: 8 }}>
                  <div className="lbl">{a.disparador}</div>
                  <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                    {a.acciones.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
