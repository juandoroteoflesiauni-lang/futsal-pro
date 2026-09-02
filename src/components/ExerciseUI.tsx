import type { Exercise } from '../data/program'
import type { GymExercise } from '../data/runningGymData'
import { useState, type ReactNode } from 'react'

export function RpeBadge({ v }: { v: number | string }) {
  const n = typeof v === 'number' ? v : parseInt(String(v), 10) || 0
  const cls = n <= 3 ? 'low' : n <= 5 ? 'mid' : n <= 7 ? 'high' : 'max'
  return <span className={`rpe ${cls}`}>{v}</span>
}

export function Chip({
  children,
  variant,
  style,
}: {
  children: ReactNode
  variant?: 'accent' | 'warn' | 'ok' | 'danger' | 'info'
  style?: React.CSSProperties
}) {
  return (
    <span className={`chip ${variant ?? ''}`} style={style}>
      {children}
    </span>
  )
}

export function ExCard({
  ex,
  idx,
  done,
  onToggle,
}: {
  ex: Exercise
  idx: number
  done?: boolean
  onToggle?: () => void
}) {
  const [open, setOpen] = useState(false)
  const nombre = (ex.nombre || '').replace(' ⚠ SOLO CON AUTORIZACIÓN', '').trim()
  const isAuth = (ex.nombre || '').includes('⚠')

  return (
    <article className={`ex-card${isAuth ? ' auth' : ''}${done ? ' done' : ''}`}>
      <div className="ex-row">
        {onToggle ? (
          <button
            type="button"
            className={`ex-check${done ? ' on' : ''}`}
            aria-label={done ? `Desmarcar ${nombre}` : `Marcar ${nombre} como hecho`}
            onClick={onToggle}
          >
            {done ? '✓' : ''}
          </button>
        ) : (
          <span className="ex-idx" aria-hidden="true">
            {idx + 1}
          </span>
        )}
        <div className="ex-main">
          <button
            type="button"
            className="ex-top"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            <span className="ex-name">
              {nombre}
              {isAuth ? <span className="auth-tag">AUTH</span> : null}
            </span>
            <RpeBadge v={ex.rpe} />
            <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
              ›
            </span>
          </button>
          <div className="ex-meta">
            {ex.params ? <Chip>{ex.params}</Chip> : null}
            {ex.rest && ex.rest !== '–' ? <Chip>⏱ {ex.rest}</Chip> : null}
            <Chip>RPE {ex.rpe}/10</Chip>
          </div>
          {open ? (
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
                  <div className="lbl">Alt. rodilla</div>
                  <p>{ex.alt}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function GymExCard({
  ex,
  idx,
  done,
  onToggle,
}: {
  ex: GymExercise
  idx: number
  done?: boolean
  onToggle?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [useSub, setUseSub] = useState(false)

  const activeName = useSub ? ex.sustitucion : ex.nombre

  return (
    <article className={`ex-card${done ? ' done' : ''}`}>
      <div className="ex-row">
        {onToggle ? (
          <button
            type="button"
            className={`ex-check${done ? ' on' : ''}`}
            aria-label={done ? `Desmarcar ${activeName}` : `Marcar ${activeName} como hecho`}
            onClick={onToggle}
          >
            {done ? '✓' : ''}
          </button>
        ) : (
          <span className="ex-idx" aria-hidden="true">
            {ex.orden ?? idx + 1}
          </span>
        )}
        <div className="ex-main">
          <button
            type="button"
            className="ex-top"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            <span className="ex-name">
              {activeName}
              {useSub && <span className="auth-tag" style={{ color: 'var(--warn)' }}>SUST</span>}
            </span>
            <Chip variant="accent">{ex.rir_rpe}</Chip>
            <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
              ›
            </span>
          </button>

          <div className="ex-meta">
            <Chip variant="ok">{ex.series} series × {ex.repeticiones}</Chip>
            <Chip>⏱ Tempo {ex.tempo}</Chip>
            {ex.descanso && <Chip>Descanso {ex.descanso}</Chip>}
            <Chip style={{ opacity: 0.8 }}>{ex.patron}</Chip>
          </div>

          {open && (
            <div className="ex-body">
              {ex.notasTecnicas && (
                <div className="ex-box">
                  <div className="lbl">Ejecución Técnica y Clave Biomecánica</div>
                  <p>{ex.notasTecnicas}</p>
                </div>
              )}

              <div className="ex-box alt">
                <div className="lbl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Sustitución Comercial Viable</span>
                  <button
                    type="button"
                    className="btn xs"
                    style={{ fontSize: 11, padding: '2px 8px' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setUseSub(!useSub)
                    }}
                  >
                    {useSub ? 'Ver original' : 'Usar sustitución'}
                  </button>
                </div>
                <p>
                  <strong>{ex.sustitucion}</strong>
                  {ex.confianza && ` · Confianza: ${ex.confianza}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

const BAR = ['accent', 'warn', 'ok', ''] as const

export function BlockSection({
  title,
  dur,
  accentIdx,
  exercises,
  doneSet,
  onToggle,
  defaultOpen = true,
}: {
  title: string
  dur?: string
  accentIdx: number
  exercises: Exercise[]
  doneSet?: Set<string>
  onToggle?: (name: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const bar = BAR[accentIdx % BAR.length]

  return (
    <div className="block">
      <button type="button" className="block-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="block-head-left">
          <span className={`bar ${bar}`} />
          <span className="block-label">{title}</span>
          {dur ? <span className="block-dur">{dur}</span> : null}
        </span>
        <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
          ›
        </span>
      </button>
      {open ? (
        <div className="ex-list">
          {exercises.map((ex, i) => (
            <ExCard
              key={`${ex.nombre}-${i}`}
              ex={ex}
              idx={i}
              done={doneSet?.has(ex.nombre)}
              onToggle={onToggle ? () => onToggle(ex.nombre) : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
