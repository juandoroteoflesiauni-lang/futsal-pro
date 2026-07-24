import type { Exercise } from '../data/program'
import { useState, type ReactNode } from 'react'

export function RpeBadge({ v }: { v: number | string }) {
  const n = typeof v === 'number' ? v : parseInt(String(v), 10) || 0
  const cls = n <= 3 ? 'low' : n <= 5 ? 'mid' : n <= 7 ? 'high' : 'max'
  return <span className={`rpe ${cls}`}>{v}</span>
}

export function Chip({
  children,
  variant,
}: {
  children: ReactNode
  variant?: 'accent' | 'warn' | 'ok'
}) {
  return <span className={`chip ${variant ?? ''}`}>{children}</span>
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
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {onToggle && (
          <button
            type="button"
            className={`ex-check${done ? ' on' : ''}`}
            style={{ margin: '10px 0 10px 12px', alignSelf: 'center' }}
            aria-label={done ? `Desmarcar ${nombre}` : `Marcar ${nombre} como hecho`}
            onClick={onToggle}
          >
            {done ? '✓' : ''}
          </button>
        )}
        <button type="button" className="ex-top" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {!onToggle && <span className="ex-idx">{idx + 1}</span>}
          <span className="ex-name">
            {nombre}
            {isAuth && (
              <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--warn)', fontFamily: 'var(--mono)', fontWeight: 700 }}>
                AUTH
              </span>
            )}
          </span>
          <RpeBadge v={ex.rpe} />
          <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
            ›
          </span>
        </button>
      </div>
      <div className="ex-meta">
        {ex.params && <Chip>{ex.params}</Chip>}
        {ex.rest && ex.rest !== '–' && <Chip>⏱ {ex.rest}</Chip>}
        <Chip>RPE {ex.rpe}/10</Chip>
      </div>
      {open && (
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
      )}
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
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span className={`bar ${bar}`} />
          <span className="block-label">{title}</span>
          {dur && <span className="block-dur">{dur}</span>}
        </span>
        <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
          ›
        </span>
      </button>
      {open && (
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
      )}
    </div>
  )
}
