import { useState } from 'react'
import {
  SIMF_EVALS,
  SIMF_FASES,
  SIMF_METHODS,
  SIMF_MICROCICLO,
  SIMF_NIVELES,
  SIMF_RESUMEN,
  SIMF_TITLE,
} from '../data/simf'
import { Chip } from '../components/ExerciseUI'

type Tab = 'fases' | 'niveles' | 'metodos' | 'evals' | 'micro'

const TABS: { id: Tab; label: string }[] = [
  { id: 'fases', label: 'Fases 12m' },
  { id: 'niveles', label: 'Niveles' },
  { id: 'metodos', label: 'Métodos' },
  { id: 'evals', label: 'Tests' },
  { id: 'micro', label: 'Microciclo' },
]

export function SimfView() {
  const [tab, setTab] = useState<Tab>('fases')
  const [faseId, setFaseId] = useState(SIMF_FASES[0]?.id ?? 'I')
  const [openMethod, setOpenMethod] = useState<string | null>(null)
  const fase = SIMF_FASES.find((f) => f.id === faseId) ?? SIMF_FASES[0]

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">SIMF</Chip>
              <Chip>12 meses</Chip>
              <Chip>4 fases</Chip>
            </div>
            <h2 className="panel-title">{SIMF_TITLE}</h2>
            <p className="panel-sub">{SIMF_RESUMEN}</p>
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

      {tab === 'fases' && fase && (
        <>
          <div className="week-row">
            {SIMF_FASES.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`week-btn${faseId === f.id ? ' active' : ''}`}
                onClick={() => setFaseId(f.id)}
                aria-pressed={faseId === f.id}
              >
                Fase {f.id}
                <span className="desc">{f.meses}</span>
              </button>
            ))}
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <h2 className="panel-title">
                  Fase {fase.id}: {fase.titulo}
                </h2>
                <p className="panel-sub">{fase.foco}</p>
                <div className="chips" style={{ marginTop: 8 }}>
                  <Chip>{fase.frecuencia}</Chip>
                  {fase.metodosClave.map((m) => (
                    <Chip key={m}>{m}</Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="alert info">{fase.notas}</div>
            <div className="alert ok">
              <strong>Avance:</strong> {fase.criteriosAvance}
            </div>

            {fase.sesionesTipo.map((ses) => (
              <div key={ses.nombre} className="block" style={{ marginTop: 12 }}>
                <div className="block-head" style={{ cursor: 'default' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <span className="bar accent" />
                    <span className="block-label">{ses.nombre}</span>
                    <span className="block-dur">{ses.duracion}</span>
                  </span>
                </div>
                <div className="ex-list">
                  {ses.bloques.map((b) => (
                    <article key={b.n} className="ex-card">
                      <div style={{ padding: '10px 12px' }}>
                        <div className="ex-name" style={{ marginBottom: 6 }}>
                          {b.n}
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.55 }}>
                          {b.ejs.map((ej) => (
                            <li key={ej}>{ej}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'niveles' && (
        <div className="log-list">
          {SIMF_NIVELES.map((n) => (
            <div key={n.nivel} className="panel" style={{ marginBottom: 10 }}>
              <div className="chips" style={{ marginBottom: 8 }}>
                <Chip variant="accent">Nivel {n.nivel}</Chip>
                <Chip>{n.duracion}</Chip>
                <Chip>{n.frecuencia}</Chip>
              </div>
              <h2 className="panel-title">
                {n.nombre} — {n.fase}
              </h2>
              <p className="panel-sub">{n.objetivos}</p>
              <div className="ex-grid" style={{ marginTop: 10 }}>
                <div className="ex-box">
                  <div className="lbl">Volumen / Intensidad</div>
                  <p>
                    {n.volumen} · {n.intensidad}
                  </p>
                </div>
                <div className="ex-box alt">
                  <div className="lbl">Criterio de progresión</div>
                  <p>{n.criteriosProgresion}</p>
                </div>
              </div>
              <div className="ex-box" style={{ marginTop: 8 }}>
                <div className="lbl">Métricas</div>
                <p>{n.metricas}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'metodos' && (
        <div className="ex-list">
          {SIMF_METHODS.map((m) => {
            const open = openMethod === m.id
            return (
              <article key={m.id} className="ex-card">
                <button
                  type="button"
                  className="ex-top"
                  onClick={() => setOpenMethod(open ? null : m.id)}
                  aria-expanded={open}
                >
                  <span className="ex-name">{m.nombre}</span>
                  <Chip variant={m.evidencia === 'Sólida' ? 'ok' : m.evidencia === 'Moderada' ? 'warn' : undefined}>
                    {m.evidencia}
                  </Chip>
                  <span className={`chev${open ? ' open' : ''}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                {open && (
                  <div className="ex-body">
                    <div className="ex-box">
                      <div className="lbl">Ventajas</div>
                      <p>{m.ventajas}</p>
                    </div>
                    <div className="ex-box err">
                      <div className="lbl">Desventajas</div>
                      <p>{m.desventajas}</p>
                    </div>
                    <div className="ex-grid">
                      <div className="ex-box alt">
                        <div className="lbl">Cuándo usar</div>
                        <p>{m.cuandoUsar}</p>
                      </div>
                      <div className="ex-box err">
                        <div className="lbl">Cuándo evitar</div>
                        <p>{m.cuandoEvitar}</p>
                      </div>
                    </div>
                    <div className="ex-box">
                      <div className="lbl">Aplicación en futsal</div>
                      <p>{m.aplicacionFutsal}</p>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      {tab === 'evals' && (
        <div className="log-list">
          {SIMF_EVALS.map((e) => (
            <div key={e.id} className="panel" style={{ marginBottom: 10 }}>
              <h2 className="panel-title">{e.nombre}</h2>
              <div className="ex-box" style={{ marginTop: 10 }}>
                <div className="lbl">Metodología</div>
                <p>{e.metodologia}</p>
              </div>
              <div className="ex-box alt" style={{ marginTop: 8 }}>
                <div className="lbl">Interpretación</div>
                <p>{e.interpretacion}</p>
              </div>
              {e.umbral && (
                <div className="chips" style={{ marginTop: 8 }}>
                  <Chip variant="warn">{e.umbral}</Chip>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'micro' && (
        <div className="grid-stats micro-grid">
          {SIMF_MICROCICLO.map((m) => (
            <div key={m.momento} className="panel" style={{ marginBottom: 0 }}>
              <div className="chips" style={{ marginBottom: 8 }}>
                <Chip variant={m.tension === 'alta' ? 'warn' : 'ok'}>
                  {m.tension === 'alta' ? 'Alta tensión' : 'Baja tensión'}
                </Chip>
              </div>
              <h2 className="panel-title">{m.momento}</h2>
              <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>
                {m.metodos.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
