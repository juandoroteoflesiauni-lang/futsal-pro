import { useState } from 'react'
import { GYM_SESSIONS, type GymSession } from '../data/runningGymData'
import { Chip, GymExCard } from '../components/ExerciseUI'

export function GymRunningView() {
  const [activeSessionId, setActiveSessionId] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const session: GymSession = GYM_SESSIONS[activeSessionId]

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">Gimnasio Concurrente</Chip>
              <Chip>7 Días Gym</Chip>
              <Chip>Torso V-Taper & Sóleo</Chip>
            </div>
            <h2 className="panel-title">Catálogo Maestro de Rutinas de Gimnasio</h2>
            <p className="panel-sub">
              Diseñadas para maximizar la economía de carrera, la potencia concéntrica y la hipertrofia estética de torso sin generar interferencia neuromuscular con las piernas.
            </p>
          </div>
        </div>
      </div>

      {/* Selector de Sesión */}
      <div className="week-row simf-tabs" style={{ marginBottom: 20 }}>
        {(['A', 'B', 'C', 'D'] as const).map((id) => {
          const isActive = activeSessionId === id
          return (
            <button
              key={id}
              type="button"
              className={`week-btn${isActive ? ' active' : ''}`}
              onClick={() => setActiveSessionId(id)}
              aria-pressed={isActive}
            >
              <strong>Sesión {id}</strong>
              <span style={{ fontSize: 11, opacity: 0.8, display: 'block' }}>
                {id === 'A' ? 'General & Core' : id === 'B' ? 'Sóleo & Unilateral' : id === 'C' ? 'Fuerza Máx & Potencia' : 'Mantenimiento & Taper'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detalle de la Sesión Activa */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 6 }}>
              <Chip variant="accent">Sesión {session.id}</Chip>
              <Chip>⏱ {session.duracion}</Chip>
              {session.id === 'B' && <Chip variant="warn">⚡ Cero Fallo Muscular</Chip>}
              {session.id === 'A' && <Chip variant="ok">💪 Hipertrofia Pura</Chip>}
            </div>
            <h2 className="panel-title">{session.titulo}</h2>
            <p className="panel-sub">{session.subtitulo}</p>
            <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
              <strong>Objetivo Fisiológico:</strong> {session.objetivo}
            </p>
          </div>
        </div>

        {/* Alertas Fisiológicas Clave */}
        {session.id === 'A' && (
          <div className="alert ok" style={{ marginBottom: 16 }}>
            <strong>Cero Interferencia:</strong> La carrera no impone estrés mecánico directo sobre el torso. Podés entrenar el torso con sobrecarga progresiva (RIR 1-2) sin afectar las piernas.
          </div>
        )}

        {session.id === 'B' && (
          <div className="alert warn" style={{ marginBottom: 16 }}>
            <strong>¡Regla Estricta para Piernas!:</strong> NUNCA llevar series de miembros inferiores al fallo muscular (mantener RIR ≥ 2-3). En el Sóleo, la pausa de 2 segundos en el fondo es obligatoria para disipar la elasticidad del tendón.
          </div>
        )}

        {session.id === 'D' && (
          <div className="alert info" style={{ marginBottom: 16 }}>
            <strong>Efecto Neurofisiológico:</strong> La descompresión en barra relaja erectores espinales. En el Couch Stretch, la contracción del glúteo trasero inhibe recíprocamente el psoas.
          </div>
        )}

        {/* Lista de Ejercicios */}
        {session.ejercicios && session.ejercicios.length > 0 && (
          <div className="ex-list">
            {session.ejercicios.map((ex, i) => (
              <GymExCard key={ex.id} ex={ex} idx={i} />
            ))}
          </div>
        )}

        {/* Bloques de la Sesión D */}
        {session.bloques && (
          <div style={{ display: 'grid', gap: 16 }}>
            {session.bloques.map((b) => (
              <div key={b.nombre} className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
                <div className="stat-label" style={{ color: 'var(--accent)', marginBottom: 10, fontSize: 13 }}>
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
    </>
  )
}
