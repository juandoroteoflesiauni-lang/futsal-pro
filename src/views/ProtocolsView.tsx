import { useState } from 'react'
import {
  CROSS_TRAINING_MODES,
  MASTER_COOLDOWN,
  MASTER_WARMUP,
  TREADMILL_INCLINE_GUIDE,
} from '../data/runningGymData'
import { Chip } from '../components/ExerciseUI'

type Tab = 'calentamiento' | 'matutina' | 'nocturna' | 'calma' | 'cinta' | 'crosstraining' | 'cadencia'

export function ProtocolsView() {
  const [tab, setTab] = useState<Tab>('calentamiento')
  const [doneEx, setDoneEx] = useState<Record<string, boolean>>({})

  const toggleEx = (name: string) => {
    setDoneEx((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">Protocolos Maestros</Chip>
              <Chip>Media Maratón 21.1K</Chip>
              <Chip>FRC & Biomecánica</Chip>
            </div>
            <h2 className="panel-title">Protocolos Técnicos, Movilidad & Biomecánica</h2>
            <p className="panel-sub">
              Activación dinámica pre-running y pre-fuerza, rutinas matutina y nocturna FRC, vuelta a la calma neurofisiológica y cadencia.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="week-row simf-tabs" style={{ marginBottom: 20 }}>
        {[
          { id: 'calentamiento', label: 'Pre-Running / Pre-Fuerza' },
          { id: 'matutina', label: 'Rutina Matutina (8m)' },
          { id: 'nocturna', label: 'Rutina FRC Nocturna (10m)' },
          { id: 'calma', label: 'Vuelta a la Calma' },
          { id: 'cinta', label: 'Cinta & Inclinación' },
          { id: 'crosstraining', label: 'Cross-Training' },
          { id: 'cadencia', label: 'Cadencia Biomecánica' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            className={`week-btn${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id as Tab)}
            aria-pressed={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CALENTAMIENTO PRE-RUNNING / PRE-FUERZA / PRE-PLIOMETRÍA */}
      {tab === 'calentamiento' && (
        <div style={{ display: 'grid', gap: 16 }}>
          {/* Pre-Running */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="chips" style={{ marginBottom: 6 }}>
                  <Chip variant="accent">{MASTER_WARMUP.preRunning.duracion}</Chip>
                  <Chip variant="ok">Cero Estiramiento Pasivo</Chip>
                </div>
                <h2 className="panel-title">{MASTER_WARMUP.preRunning.titulo}</h2>
                <p className="panel-sub">{MASTER_WARMUP.preRunning.objetivo}</p>
              </div>
            </div>

            <div className="ex-list">
              {MASTER_WARMUP.preRunning.ejercicios.map((ej) => {
                const isDone = doneEx[ej.nombre]
                return (
                  <article key={ej.nombre} className={`ex-card${isDone ? ' done' : ''}`}>
                    <div className="ex-row">
                      <button
                        type="button"
                        className={`ex-check${isDone ? ' on' : ''}`}
                        onClick={() => toggleEx(ej.nombre)}
                        aria-label={`Marcar ${ej.nombre}`}
                      >
                        {isDone ? '✓' : ''}
                      </button>
                      <div className="ex-main">
                        <div className="ex-top" style={{ cursor: 'default' }}>
                          <span className="ex-name">{ej.nombre}</span>
                          <Chip variant="ok">{ej.duracionReps}</Chip>
                        </div>
                        <div className="ex-body" style={{ marginTop: 8 }}>
                          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
                            <strong>Cue Técnico:</strong> {ej.cue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Pre-Fuerza */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="chips" style={{ marginBottom: 6 }}>
                  <Chip variant="accent">{MASTER_WARMUP.preFuerza.duracion}</Chip>
                  <Chip>Activación de Core y Glúteo</Chip>
                </div>
                <h2 className="panel-title">{MASTER_WARMUP.preFuerza.titulo}</h2>
                <p className="panel-sub">{MASTER_WARMUP.preFuerza.objetivo}</p>
              </div>
            </div>

            <div className="ex-list">
              {MASTER_WARMUP.preFuerza.ejercicios.map((ej) => {
                const isDone = doneEx[ej.nombre]
                return (
                  <article key={ej.nombre} className={`ex-card${isDone ? ' done' : ''}`}>
                    <div className="ex-row">
                      <button
                        type="button"
                        className={`ex-check${isDone ? ' on' : ''}`}
                        onClick={() => toggleEx(ej.nombre)}
                        aria-label={`Marcar ${ej.nombre}`}
                      >
                        {isDone ? '✓' : ''}
                      </button>
                      <div className="ex-main">
                        <div className="ex-top" style={{ cursor: 'default' }}>
                          <span className="ex-name">{ej.nombre}</span>
                          <Chip variant="ok">{ej.duracionReps}</Chip>
                        </div>
                        <div className="ex-body" style={{ marginTop: 8 }}>
                          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
                            <strong>Cue Técnico:</strong> {ej.cue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Pre-Pliometría */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="chips" style={{ marginBottom: 6 }}>
                  <Chip variant="accent">{MASTER_WARMUP.prePliometria.duracion}</Chip>
                  <Chip variant="warn">Rigidez de Tendón</Chip>
                </div>
                <h2 className="panel-title">{MASTER_WARMUP.prePliometria.titulo}</h2>
                <p className="panel-sub">{MASTER_WARMUP.prePliometria.objetivo}</p>
              </div>
            </div>

            <div className="ex-list">
              {MASTER_WARMUP.prePliometria.ejercicios.map((ej) => {
                const isDone = doneEx[ej.nombre]
                return (
                  <article key={ej.nombre} className={`ex-card${isDone ? ' done' : ''}`}>
                    <div className="ex-row">
                      <button
                        type="button"
                        className={`ex-check${isDone ? ' on' : ''}`}
                        onClick={() => toggleEx(ej.nombre)}
                        aria-label={`Marcar ${ej.nombre}`}
                      >
                        {isDone ? '✓' : ''}
                      </button>
                      <div className="ex-main">
                        <div className="ex-top" style={{ cursor: 'default' }}>
                          <span className="ex-name">{ej.nombre}</span>
                          <Chip variant="ok">{ej.duracionReps}</Chip>
                        </div>
                        <div className="ex-body" style={{ marginTop: 8 }}>
                          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
                            <strong>Cue Técnico:</strong> {ej.cue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RUTINA MATUTINA */}
      {tab === 'matutina' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">{MASTER_WARMUP.matutina.duracion}</Chip>
                <Chip variant="ok">Control Motor & WBLT</Chip>
              </div>
              <h2 className="panel-title">{MASTER_WARMUP.matutina.titulo}</h2>
              <p className="panel-sub">{MASTER_WARMUP.matutina.objetivo}</p>
            </div>
          </div>

          <div className="alert ok" style={{ marginBottom: 16 }}>
            <strong>Hábitos Clave:</strong> Ejecutar al despertar para lubricar las articulaciones del tobillo, cadera y columna torácica sin generar fatiga previa.
          </div>

          <div className="ex-list">
            {MASTER_WARMUP.matutina.ejercicios.map((ej) => {
              const isDone = doneEx[ej.nombre]
              return (
                <article key={ej.nombre} className={`ex-card${isDone ? ' done' : ''}`}>
                  <div className="ex-row">
                    <button
                      type="button"
                      className={`ex-check${isDone ? ' on' : ''}`}
                      onClick={() => toggleEx(ej.nombre)}
                      aria-label={`Marcar ${ej.nombre}`}
                    >
                      {isDone ? '✓' : ''}
                    </button>
                    <div className="ex-main">
                      <div className="ex-top" style={{ cursor: 'default' }}>
                        <span className="ex-name">{ej.nombre}</span>
                        <Chip variant="ok">{ej.duracionReps}</Chip>
                      </div>
                      <div className="ex-body" style={{ marginTop: 8 }}>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
                          <strong>Cue Técnico:</strong> {ej.cue}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: RUTINA FRC NOCTURNA */}
      {tab === 'nocturna' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">{MASTER_WARMUP.nocturnaFRC.duracion}</Chip>
                <Chip variant="warn">PAILs/RAILs & 90/90</Chip>
              </div>
              <h2 className="panel-title">{MASTER_WARMUP.nocturnaFRC.titulo}</h2>
              <p className="panel-sub">{MASTER_WARMUP.nocturnaFRC.objetivo}</p>
            </div>
          </div>

          <div className="alert info" style={{ marginBottom: 16 }}>
            <strong>Ciencia FRC (Functional Range Conditioning):</strong> Las contracciones isométricas en rangos finales (PAILs/RAILs) reeducan el sistema nervioso para expandir la dorsiflexión de tobillo y la rotación de cadera de forma activa y permanente.
          </div>

          <div className="ex-list">
            {MASTER_WARMUP.nocturnaFRC.ejercicios.map((ej) => {
              const isDone = doneEx[ej.nombre]
              return (
                <article key={ej.nombre} className={`ex-card${isDone ? ' done' : ''}`}>
                  <div className="ex-row">
                    <button
                      type="button"
                      className={`ex-check${isDone ? ' on' : ''}`}
                      onClick={() => toggleEx(ej.nombre)}
                      aria-label={`Marcar ${ej.nombre}`}
                    >
                      {isDone ? '✓' : ''}
                    </button>
                    <div className="ex-main">
                      <div className="ex-top" style={{ cursor: 'default' }}>
                        <span className="ex-name">{ej.nombre}</span>
                        <Chip variant="ok">{ej.duracionReps}</Chip>
                      </div>
                      <div className="ex-body" style={{ marginTop: 8 }}>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
                          <strong>Ejecución:</strong> {ej.cue}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 4: VUELTA A LA CALMA */}
      {tab === 'calma' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">{MASTER_COOLDOWN.duracion}</Chip>
                <Chip>Descarga Parasimpática</Chip>
              </div>
              <h2 className="panel-title">{MASTER_COOLDOWN.titulo}</h2>
              <p className="panel-sub">{MASTER_COOLDOWN.objetivo}</p>
            </div>
          </div>

          <div className="alert info" style={{ marginBottom: 16 }}>
            <strong>Efecto Neurosensorial:</strong> El foam rolling y la respiración diafragmática modulan la actividad simpática post-carrera, reduciendo la rigidez muscular percibida (DOMS) sin atenuar las ganancias de fuerza.
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {MASTER_COOLDOWN.pasos.map((f) => (
              <div key={f.nombre} className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text)' }}>
                    {f.orden}. {f.nombre}
                  </h3>
                  <Chip variant="accent">{f.duracion}</Chip>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{f.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CINTA E INCLINACIÓN */}
      {tab === 'cinta' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">Jones & Doust</Chip>
                <Chip>Cinta vs Asfalto</Chip>
              </div>
              <h2 className="panel-title">Kinemática y Ajuste de Inclinación en Cinta</h2>
              <p className="panel-sub">
                En cinta no hay resistencia al avance del aire. A ritmos de carrera continua e intervalos, se aplica una ligera inclinación para igualar el costo energético con la carrera exterior.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 14, marginTop: 12 }}>
            {TREADMILL_INCLINE_GUIDE.map((g) => (
              <div key={g.ritmo} className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 15, color: 'var(--text)' }}>{g.ritmo}</h3>
                  <Chip variant="ok" style={{ fontSize: 14, fontWeight: 700 }}>Inclinación: {g.inclinacion}</Chip>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  {g.justificacion}
                </p>
              </div>
            ))}
          </div>

          <div className="alert warn" style={{ marginTop: 16 }}>
            <strong>Entrenamiento Exterior Indispensable:</strong> Aunque la cinta es ideal para controlar el ritmo en intervalos o días lluviosos, las tiradas largas deben realizarse preferentemente en asfalto/tierra para estimular la rigidez elástica del tendón de Aquiles.
          </div>
        </div>
      )}

      {/* TAB 6: CROSS-TRAINING */}
      {tab === 'crosstraining' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">Impacto Nulo</Chip>
                <Chip>Descarga Articular</Chip>
              </div>
              <h2 className="panel-title">Modalidades de Cross-Training Alternativas</h2>
              <p className="panel-sub">
                Estrategias para acumular volumen cardiovascular en Zona 2 sin someter la tibia y el tendón de Aquiles a fuerzas de reacción de impacto.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {CROSS_TRAINING_MODES.map((m) => (
              <div key={m.modalidad} className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 17, color: 'var(--text)' }}>{m.modalidad}</h3>
                  <Chip variant="ok">{m.zona}</Chip>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, fontSize: 13, color: 'var(--text-2)', marginBottom: 10 }}>
                  <div><strong>Equivalencia:</strong> {m.equivalencia}</div>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  <strong>Beneficio Fisiológico:</strong> {m.beneficio}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CADENCIA BIOMECÁNICA */}
      {tab === 'cadencia' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="chips" style={{ marginBottom: 6 }}>
                <Chip variant="accent">Biomecánica Dinámica</Chip>
                <Chip>Prevención de Overstriding</Chip>
              </div>
              <h2 className="panel-title">Cadencia Óptima (Pasos por Minuto)</h2>
              <p className="panel-sub">
                Mantener una cadencia fluida (~165–170 ppm) a ritmo de 8:00 min/km reduce el impacto de pico vertical y disminuye el sobrepaso (apoyo por delante del centro de masas), protegiendo la tibia y el tendón rotuliano.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>Zona 2 Base (8:00 min/km)</span>
                <Chip variant="ok">164 – 170 ppm</Chip>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>Zancada corta, contacto bajo la cadera, cadencia fluida.</p>
            </div>

            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>Ritmo Media Maratón (6:50–7:00 min/km)</span>
                <Chip variant="accent">168 – 172 ppm</Chip>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>Ritmo económico metronómico con menor tiempo de contacto sobre el antepie.</p>
            </div>

            <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>Ritmo Umbral VT2 (6:20–6:30 min/km)</span>
                <Chip variant="warn">172 – 178 ppm</Chip>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>Impulso potente y frecuencia de codificación motora alta.</p>
            </div>
          </div>

          <div className="alert info" style={{ marginTop: 16 }}>
            <strong>Clave Técnica:</strong> Evitar la obsesión rígida con 180 ppm en ritmos lentos. La cadencia debe aumentar de manera orgánica conforme aumenta la velocidad, priorizando el aterrizaje debajo del centro de masas.
          </div>
        </div>
      )}
    </>
  )
}
