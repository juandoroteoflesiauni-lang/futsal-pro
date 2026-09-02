import { useState } from 'react'
import { Chip } from '../components/ExerciseUI'

const TABS = [
  { id: 'resumen', label: '1. Resumen Ejecutivo' },
  { id: 'sintesis', label: '2. Síntesis & 10K vs 21K' },
  { id: 'fases', label: '3. Las 5 Fases' },
  { id: 'calendario', label: '4. Cuadro 18S' },
  { id: 'cargas', label: '6. Tabla Progresión' },
  { id: 'benchmarks', label: '7. Benchmarks' },
  { id: 'diad', label: '8. Día D (31/12)' },
  { id: 'seguridad', label: '9. Semáforo & Red Flags' },
  { id: 'evidencia', label: '10. Evidencia Científica' },
] as const

export function MasterPlanView() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('resumen')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Encabezado */}
      <div className="card hero-header" style={{ borderLeft: '4px solid #4ea8de' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          <Chip variant="info">DOCUMENTO TÉCNICO OFICIAL</Chip>
          <Chip variant="ok">121 DÍAS (18 SEMANAS)</Chip>
          <Chip variant="warn">02/09/2026 ➔ 31/12/2026</Chip>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, color: 'var(--text)' }}>
          Plan Maestro Integral: 10K y Recomposición Corporal
        </h2>
        <p style={{ margin: '6px 0 0', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.5 }}>
          Unificación y síntesis científica concurrente: adaptación estructural de sóleo y tendón de Aquiles, 
          carrera continua Z2 hacia 55–59 min en 10K, e hipertrofia estética en «V» del torso (dorsal, hombro lateral, pectoral).
        </p>
      </div>

      {/* Tabs selector */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '7px 14px',
              borderRadius: 'var(--radius)',
              background: activeTab === t.id ? '#4ea8de' : 'var(--bg-elevated)',
              color: activeTab === t.id ? '#0c0f0e' : 'var(--text-2)',
              fontWeight: activeTab === t.id ? 700 : 500,
              fontSize: 12,
              border: '1px solid var(--line)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RESUMEN EJECUTIVO */}
      {activeTab === 'resumen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <h3 style={{ marginTop: 0, color: '#4ea8de', fontSize: 16 }}>1. Perfil del Atleta y Punto de Partida</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 10 }}>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)' }}>
                <strong style={{ color: 'var(--text)' }}>Demografía y Antropometría:</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13 }}>
                  Varón, 22 años, 175 cm de estatura, 65–70 kg de masa corporal.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)' }}>
                <strong style={{ color: 'var(--text)' }}>Capacidad Cardiorrespiratoria:</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13 }}>
                  Nivel debutante. Tolerancia basal estimada en ~10 min de trote continuo a 8:00 min/km antes de desacoplamiento cardiovascular.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)' }}>
                <strong style={{ color: 'var(--text)' }}>Estado Neuromuscular y Articular:</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13 }}>
                  Rigidez articular tobillo-pie (dorsiflexión restringida), flexores de cadera acortados, bajo stiffness tendinoso en gastrosóleo-Aquiles y sensación de piernas pesadas.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--ok)', fontSize: 16 }}>2. Parámetros de la Misión</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7 }}>
              <li><strong>Inicio:</strong> Miércoles, 2 de Septiembre de 2026.</li>
              <li><strong>Fecha Objetivo (Día D):</strong> Jueves, 31 de Diciembre de 2026 (121 días / 18 semanas).</li>
              <li><strong>Objetivo Principal:</strong> Completar con solidez la prueba de 10K en ruta.</li>
              <li><strong>Tiempo Orientativo:</strong> 55:00 a 59:00 minutos (ritmo medio 5:30 a 5:54 min/km), supeditado a los benchmarks.</li>
              <li><strong>Objetivos Secundarios:</strong> Recomposición corporal normocalórica, hipertrofia estética de torso en «V» (dorsales, deltoides lateral, pectoral), aumento de fuerza máxima relativa y dorsiflexión WBLT ≥ 10 cm.</li>
            </ul>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: 16 }}>3. Estrategia Concurrente (Separación AMPK — mTORC1)</h3>
            <p style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Separación mínima obligatoria de <strong>6 a 8 horas</strong> entre la carrera matutina y la sesión de fuerza vespertina, 
              o bien en días alternos. Se minimiza el daño excéntrico en piernas (RIR 2–3, énfasis isométrico) para no comprometer la cinemática de carrera, 
              mientras se sobrecarga el tren superior para la estética V-Taper.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: SÍNTESIS & 10K vs 21K */}
      {activeTab === 'sintesis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--danger)', fontSize: 16 }}>
              Resolución Crítica: ¿Por qué 10K y NO Media Maratón (21K)?
            </h3>
            <div style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>
              <p>
                <strong>El conflicto teórico:</strong> El Doc 1 argumentaba que la Media Maratón exigía menor % del VO₂max que un 10K élite. 
                Sin embargo, para un debutante que parte de 10 min a 8:00 min/km, preparar un 21K en 17 semanas obligaría a meter <strong>45 a 55 km semanales</strong>.
              </p>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', marginTop: 8 }}>
                <strong style={{ color: 'var(--danger)' }}>1. Razón Volumétrica y Ortopédica:</strong>
                <p style={{ margin: '4px 0 0' }}>
                  El índice de carga aguda:crónica (ACWR) se dispararía por encima de 1.5, garantizando periostitis tibial, fascitis plantar o fracturas por estrés en tejido óseo que requiere de 6 a 9 meses de remodelación lenta.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', marginTop: 8 }}>
                <strong style={{ color: 'var(--ok)' }}>2. El 10K como Meta Perfecta:</strong>
                <p style={{ margin: '4px 0 0' }}>
                  En un debutante, el 10K se corre a intensidad aeróbica controlada (Z3 baja / umbral moderado, RPE 6–7). El pico semanal no supera los 28 km, 
                  lo cual <strong>preserva la salud articular, permite ganar masa muscular en el torso en el gimnasio y asegura el éxito fisiológico</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Puntos de Coincidencia de los Documentos</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7 }}>
              <li><strong>Prioridad absoluta al tejido conectivo:</strong> Prohibido subir más del 10–15% de kilometraje semanal.</li>
              <li><strong>Aislamiento de Sóleo:</strong> Soporta 6 a 8 veces el peso corporal; requiere máquina sentado con rodilla a 90°.</li>
              <li><strong>Cero fallo muscular en piernas:</strong> Prevenir DOMS prolongado que arruine la amortiguación elástica.</li>
              <li><strong>Control por RPE y Zonas:</strong> Guiarse por el esfuerzo percibido y la prueba del habla (talk test).</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: LAS 5 FASES */}
      {activeTab === 'fases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              fase: 'Fase 1: Adaptación Estructural (S1 a S4)',
              fechas: '02/09/2026 – 27/09/2026 (3.5 sem)',
              vol: '6.5 – 10.5 km/sem',
              objetivo: 'Mecanotransducción en colágeno, CA-CO (1:1 hasta 3:1), flexión dorsal WBLT >= 8 cm, patrones motores básicos en gimnasio.',
              descarga: 'Semana 4 (7.0 km, -30% volumen).',
            },
            {
              fase: 'Fase 2: Base Aeróbica y Fuerza (S5 a S8)',
              fechas: '28/09/2026 – 25/10/2026 (4 sem)',
              vol: '13.5 – 16.5 km/sem',
              objetivo: 'Transición a carrera continua en Z2 (25–35 min), introducción de Strides técnicos, fuerza máxima de sóleo e hipertrofia de torso.',
              descarga: 'Semana 6: Benchmark 1 (Test 3K). Semana 8: Descarga (11.5 km).',
            },
            {
              fase: 'Fase 3: Desarrollo y Reactividad (S9 a S12)',
              fechas: '26/10/2026 – 22/11/2026 (4 sem)',
              vol: '18.5 – 21.0 km/sem',
              objetivo: 'Introducción de 4º día suave de running, pliometría nivel 1 (pogos reactivos), tempo aeróbico y Fartlek piramidal. Tirada larga 8.0 km.',
              descarga: 'Semana 11: Benchmark 2 (Test 5K). Semana 12: Descarga (13.5 km).',
            },
            {
              fase: 'Fase 4: Especificidad 10K y Economía (S13 a S16)',
              fechas: '23/11/2026 – 20/12/2026 (4 sem)',
              vol: '22.0 – 28.0 km/sem (Pico)',
              objetivo: 'Intervalos específicos de 1.000m y 2.000m a ritmo 10K (5:35–5:50 min/km). Tirada Larga Pico de 10.5 km en Semana 14.',
              descarga: 'Semana 15: Benchmark 3 (Simulación 5K). Mantenimiento neural en gimnasio.',
            },
            {
              fase: 'Fase 5: Tapering y Competición (S17 a S18)',
              fechas: '21/12/2026 – 31/12/2026 (1.5 sem)',
              vol: '13.5 km (S17) / 6.0 km + 10K (S18)',
              objetivo: 'Supercompensación de glucógeno, caída de volumen (40–60%) con toques a ritmo objetivo. Competición Oficial 10K el 31 de Diciembre.',
              descarga: 'Descarga competitiva y carrera Día D.',
            },
          ].map((f, i) => (
            <div key={i} className="card" style={{ borderLeft: `4px solid ${i === 4 ? 'var(--ok)' : '#4ea8de'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <strong style={{ color: 'var(--text)', fontSize: 15 }}>{f.fase}</strong>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{f.fechas}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, color: 'var(--text-2)' }}>
                <div><strong>Volumen:</strong> {f.vol}</div>
                <div><strong>Foco Fisiológico:</strong> {f.objetivo}</div>
                <div style={{ marginTop: 4, color: '#4ea8de' }}><strong>Hitos:</strong> {f.descarga}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: CALENDARIO SINÓPTICO 18S */}
      {activeTab === 'calendario' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Cuadro Sinóptico de Distribución Semanal</h3>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', color: 'var(--text-3)' }}>
                <th style={{ padding: '8px 6px' }}>Semana</th>
                <th style={{ padding: '8px 6px' }}>Fechas</th>
                <th style={{ padding: '8px 6px' }}>Running Clave</th>
                <th style={{ padding: '8px 6px' }}>Gimnasio</th>
                <th style={{ padding: '8px 6px' }}>Foco Central</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 'S1', f: '02/09 – 06/09', r: 'Mié, Sáb (CA-CO)', g: 'Jue, Vie (Torso)', foc: 'Inicio Adaptación: CA-CO 1:1' },
                { s: 'S2', f: '07/09 – 13/09', r: 'Mar, Jue, Sáb', g: 'Mié (A), Vie (B)', foc: 'CA-CO 2:1 & Benchmark Basal' },
                { s: 'S3', f: '14/09 – 20/09', r: 'Mar, Jue, Sáb', g: 'Mié (A), Vie (B)', foc: 'CA-CO 3:1' },
                { s: 'S4 ⬇', f: '21/09 – 27/09', r: 'Mar, Jue, Sáb', g: 'Mié (A Descarga), Vie (B)', foc: 'Descarga Fase 1 (-30% vol)' },
                { s: 'S5', f: '28/09 – 04/10', r: 'Mar, Jue, Sáb', g: 'Mié (A), Vie (B)', foc: 'Carrera continua 25 min + Strides' },
                { s: 'S6 ★', f: '05/10 – 11/10', r: 'Mar, Jue, Sáb (Test)', g: 'Mié (A), Vie (B)', foc: 'Benchmark 1: Test 3K en pista' },
                { s: 'S7', f: '12/10 – 18/10', r: 'Mar, Jue, Sáb', g: 'Mié (A), Vie (B)', foc: 'Consolidación Z2 & Tirada 6.5 km' },
                { s: 'S8 ⬇', f: '19/10 – 25/10', r: 'Mar, Jue, Sáb', g: 'Mié (Descarga), Vie (Torso)', foc: 'Descarga Fase 2: Asimilación' },
                { s: 'S9', f: '26/10 – 01/11', r: 'Mar, Jue, Sáb, Dom', g: 'Mié (A), Vie (B)', foc: '4º día running & Pliometría 1' },
                { s: 'S10', f: '02/11 – 08/11', r: 'Mar, Jue, Sáb, Dom', g: 'Mié (A), Vie (B)', foc: 'Fartlek aeróbico & Tirada 8.0 km' },
                { s: 'S11 ★', f: '09/11 – 15/11', r: 'Mar, Jue, Sáb (Test), Dom', g: 'Mié (A), Vie (B)', foc: 'Benchmark 2: Test Umbral 5K' },
                { s: 'S12 ⬇', f: '16/11 – 22/11', r: 'Mar, Jue, Sáb', g: 'Mié (Descarga), Vie (Torso)', foc: 'Descarga Fase 3' },
                { s: 'S13', f: '23/11 – 29/11', r: 'Mar, Jue, Sáb, Dom', g: 'Mié (A), Vie (B)', foc: 'Especificidad: Series 4x1000m Z4' },
                { s: 'S14 ⚡', f: '30/11 – 06/12', r: 'Mar, Jue, Sáb, Dom', g: 'Mié (A), Vie (B)', foc: 'Pico Volumen: 28 km / TL 10.5 km' },
                { s: 'S15 ★', f: '07/12 – 13/12', r: 'Mar, Jue, Sáb (Test)', g: 'Mié (A), Vie (Torso)', foc: 'Benchmark 3: Simulación 5K 10K-Pace' },
                { s: 'S16', f: '14/12 – 20/12', r: 'Mar, Jue, Sáb, Dom', g: 'Mié (Neural), Vie (Torso)', foc: 'Carga afinamiento: 3x2000m' },
                { s: 'S17 ⬇', f: '21/12 – 27/12', r: 'Mar, Jue, Sáb', g: 'Mié (Neural mínima)', foc: 'Tapering 1 (-40% vol)' },
                { s: 'S18 🏁', f: '28/12 – 31/12', r: 'Mar (Opener), Jue (10K)', g: 'Cero sobrecarga', foc: '★ JUEVES 31/12: CARRERA 10K ★' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--line)', background: row.s.includes('★') ? 'rgba(78, 168, 222, 0.08)' : row.s.includes('🏁') ? 'rgba(46, 196, 182, 0.12)' : 'transparent' }}>
                  <td style={{ padding: '8px 6px', fontWeight: 700, color: 'var(--text)' }}>{row.s}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-3)' }}>{row.f}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-2)' }}>{row.r}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-2)' }}>{row.g}</td>
                  <td style={{ padding: '8px 6px', color: row.s.includes('🏁') ? 'var(--ok)' : 'var(--text)' }}>{row.foc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: TABLA INTEGRAL DE CARGAS */}
      {activeTab === 'cargas' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Tabla Integral de Progresión y Carga (18 Semanas)</h3>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', textAlign: 'left', minWidth: 650 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', color: 'var(--text-3)' }}>
                <th style={{ padding: '8px 6px' }}>Sem</th>
                <th style={{ padding: '8px 6px' }}>Km Totales</th>
                <th style={{ padding: '8px 6px' }}>Km Calidad</th>
                <th style={{ padding: '8px 6px' }}>Tirada Larga</th>
                <th style={{ padding: '8px 6px' }}>Ses. Run</th>
                <th style={{ padding: '8px 6px' }}>Ses. Gym</th>
                <th style={{ padding: '8px 6px' }}>RPE Medio</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 1, km: '6.5 km', cal: '0.0 km', tl: '2.7 km (CA-CO)', r: 2, g: 2, rpe: 4.0 },
                { s: 2, km: '8.5 km', cal: '0.0 km', tl: '3.8 km (CA-CO)', r: 3, g: 2, rpe: 4.5 },
                { s: 3, km: '10.5 km', cal: '0.0 km', tl: '4.2 km (CA-CO)', r: 3, g: 2, rpe: 5.0 },
                { s: 4, km: '7.0 km', cal: '0.0 km', tl: '2.7 km (CA-CO)', r: 3, g: 2, rpe: 3.5 },
                { s: 5, km: '13.5 km', cal: '0.3 km', tl: '4.6 km', r: 3, g: 2, rpe: 5.0 },
                { s: 6, km: '14.5 km', cal: '3.0 km (Test)', tl: '5.5 km', r: 3, g: 2, rpe: 6.5 },
                { s: 7, km: '16.5 km', cal: '0.4 km', tl: '6.5 km', r: 3, g: 2, rpe: 5.5 },
                { s: 8, km: '11.5 km', cal: '0.2 km', tl: '5.3 km', r: 3, g: 2, rpe: 3.5 },
                { s: 9, km: '18.5 km', cal: '1.6 km', tl: '7.5 km', r: 4, g: 2, rpe: 5.5 },
                { s: 10, km: '21.0 km', cal: '2.5 km', tl: '8.0 km', r: 4, g: 2, rpe: 6.0 },
                { s: 11, km: '19.5 km', cal: '5.0 km (Test)', tl: '7.5 km', r: 4, g: 2, rpe: 7.0 },
                { s: 12, km: '13.5 km', cal: '0.0 km', tl: '6.1 km', r: 3, g: 2, rpe: 3.5 },
                { s: 13, km: '24.5 km', cal: '4.0 km (1K)', tl: '9.0 km', r: 4, g: 2, rpe: 6.5 },
                { s: 14, km: '28.0 km', cal: '5.0 km (1K)', tl: '10.5 km (Pico)', r: 4, g: 2, rpe: 7.0 },
                { s: 15, km: '18.0 km', cal: '5.0 km (Sim)', tl: '7.5 km', r: 3, g: 2, rpe: 6.0 },
                { s: 16, km: '22.0 km', cal: '6.0 km (2K)', tl: '7.5 km', r: 4, g: 2, rpe: 6.5 },
                { s: 17, km: '13.5 km', cal: '1.2 km', tl: '4.8 km', r: 3, g: 1, rpe: 4.0 },
                { s: 18, km: '16.0 km', cal: '10.0 km (Carrera)', tl: '10.0 km (Día D)', r: 2, g: 0, rpe: 9.0 },
              ].map((row) => (
                <tr key={row.s} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '8px 6px', fontWeight: 700, color: 'var(--text)' }}>Sem {row.s}</td>
                  <td style={{ padding: '8px 6px', color: '#4ea8de', fontWeight: 600 }}>{row.km}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-2)' }}>{row.cal}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text)' }}>{row.tl}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-2)' }}>{row.r}</td>
                  <td style={{ padding: '8px 6px', color: 'var(--text-2)' }}>{row.g}</td>
                  <td style={{ padding: '8px 6px', color: row.rpe >= 7 ? 'var(--danger)' : row.rpe <= 4 ? 'var(--ok)' : 'var(--warn)' }}>
                    RPE {row.rpe.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 6: BENCHMARKS */}
      {activeTab === 'benchmarks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <h3 style={{ marginTop: 0, color: '#4ea8de', fontSize: 16 }}>Benchmark Inicial (Semana 2 — 09/09/2026)</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13 }}>
              <strong>Test WBLT de Flexión Dorsal:</strong> Medición pared-dedo en estocada sin despegar talón. Meta ≥ 8 cm. Si es menor, duplicar PAILs/RAILs diarios.<br />
              <strong>Test Sóleo en Máquina:</strong> Determinar la carga máxima para 10 repeticiones sólidas con RIR 2 y tempo 3-1-1-1.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: '#4ea8de', fontSize: 16 }}>Benchmark 1: Test 3K Continuo en Pista (Semana 6 — 10/10/2026)</h3>
            <ul style={{ margin: '6px 0 0', paddingLeft: 20, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>
              <li><strong>&gt; 21:00 min (&gt; 7:00 min/km):</strong> Adaptación lenta. Ritmo Z2 ajustado a 7:30–7:45 min/km.</li>
              <li><strong>18:30 a 20:30 min (6:10 a 6:50 min/km):</strong> Adaptación estándar. Ritmo Z2 en 7:15–7:30 min/km.</li>
              <li><strong>&lt; 18:30 min (&lt; 6:10 min/km):</strong> Excelente adaptación. Ritmo Z2 en 7:00–7:15 min/km.</li>
            </ul>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: 16 }}>
              ★ Benchmark 2: Test Umbral 5K (Semana 11 — 14/11/2026)
            </h3>
            <p style={{ margin: '4px 0 8px', color: 'var(--text-2)', fontSize: 13 }}>
              Fórmula de Riegel modificada: <code>T_10K = T_5K × 2.085</code>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: 'rgba(46, 196, 182, 0.1)', padding: 10, borderRadius: 'var(--radius)', borderLeft: '3px solid var(--ok)' }}>
                <strong style={{ color: 'var(--ok)' }}>Escenario A (5K en 26:30–28:00 min | 5:18–5:36 min/km):</strong>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                  Objetivo 10K en <strong>55:00 a 58:00 min</strong>. Ritmo de series específicas: 5:35–5:45 min/km.
                </div>
              </div>
              <div style={{ background: 'rgba(255, 183, 3, 0.1)', padding: 10, borderRadius: 'var(--radius)', borderLeft: '3px solid var(--warn)' }}>
                <strong style={{ color: 'var(--warn)' }}>Escenario B (5K en 28:01–30:00 min | 5:36–6:00 min/km):</strong>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                  Objetivo 10K recalibrado a <strong>59:00 a 62:00 min</strong>. Ritmo de series específicas: 5:50–6:00 min/km.
                </div>
              </div>
              <div style={{ background: 'rgba(230, 57, 70, 0.1)', padding: 10, borderRadius: 'var(--radius)', borderLeft: '3px solid var(--danger)' }}>
                <strong style={{ color: 'var(--danger)' }}>Escenario C (5K en &gt; 30:00 min | &gt; 6:00 min/km):</strong>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                  Objetivo de salud: <strong>63:00 a 66:00 min</strong>. Proteger al atleta sin forzar ritmos lesivos.
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: '#4ea8de', fontSize: 16 }}>Benchmark 3: Simulación 5K a Ritmo 10K (Semana 15 — 12/12/2026)</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13 }}>
              5 km continuos clavando el ritmo objetivo de 10K (5:35–5:45 min/km). Comprobar que la deriva cardíaca sea ≤ 5% y el RPE se mantenga en $\le 7$ al cruzar el km 4.
            </p>
          </div>
        </div>
      )}

      {/* TAB 7: DÍA D (31/12) */}
      {activeTab === 'diad' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ borderLeft: '4px solid var(--ok)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--ok)', fontSize: 16 }}>Cronograma Minuto a Minuto (31/12/2026)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[
                { h: '09:00 h (-4h)', d: 'Despertar natural. 500 ml de agua a temperatura ambiente.' },
                { h: '09:30 h (-3.5h)', d: 'Desayuno (1.5–2 g HC/kg): avena cocida en agua o leche sin lactosa con 1 plátano maduro, 1 cucharadita de miel y 20 g de proteína de suero. Café solo (cafeína 3 mg/kg).' },
                { h: '11:00–12:00 h', d: 'Reposo pasivo. Hidratación en pequeños sorbos (máx 300 ml).' },
                { h: '-60 min', d: 'Llegada al evento, depósito de guardarropa y colocación de dorsal.' },
                { h: '-40 min', d: 'Calentamiento: 8 min trote Z1 (7:30 min/km) + 5 min movilidad dinámica y WBLT + 4 min activación sóleo/glúteo + 3 strides de 50m a 5:40 min/km.' },
                { h: '-15 min', d: 'Entrada al cajón de salida. Abrigo desechable si hay frío. Respiración diafragmática para modular el tono simpático.' },
              ].map((c, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: 'var(--radius)' }}>
                  <strong style={{ color: '#4ea8de', fontSize: 12 }}>{c.h}</strong>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Táctica de Carrera Kilómetro a Kilómetro</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginTop: 10 }}>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', borderTop: '3px solid #4ea8de' }}>
                <strong style={{ color: 'var(--text)' }}>Km 1 y 2: Salida Conservadora</strong>
                <div style={{ fontSize: 12, color: 'var(--ok)', marginTop: 2 }}>5:45–5:50 min/km · RPE 6 · Z3/Z4</div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2)' }}>
                  Prohibido dejarse arrastrar por la masa. Cadencia 170 spm y apoyo bajo centro de gravedad.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', borderTop: '3px solid var(--accent)' }}>
                <strong style={{ color: 'var(--text)' }}>Km 3 al 6: Ritmo Crucero</strong>
                <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>5:35–5:40 min/km · RPE 7 · Z4 fija</div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2)' }}>
                  Bloqueo metronómico. En avituallamiento km 5: doblar vaso en pico para 2-3 sorbos sin frenar.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', borderTop: '3px solid var(--warn)' }}>
                <strong style={{ color: 'var(--text)' }}>Km 7 y 8: El Muro Psicológico</strong>
                <div style={{ fontSize: 12, color: 'var(--warn)', marginTop: 2 }}>5:35–5:40 min/km · RPE 8 · Z4 alta</div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2)' }}>
                  Superar la fatiga periférica. «Paso corto y reactivo», «Hombros relajados». Subir cadencia.
                </p>
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 'var(--radius)', borderTop: '3px solid var(--danger)' }}>
                <strong style={{ color: 'var(--text)' }}>Km 9 y 10: Vaciado y Remate</strong>
                <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 2 }}>Km 9 a 5:30 · Últimos 400m sub-5:15 · RPE 9–10</div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2)' }}>
                  A falta de 1.000m pasar corredores con braceo amplio. Últimos 200m en sprint final hasta la meta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SEGURIDAD & RED FLAGS */}
      {activeTab === 'seguridad' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Diagnóstico Diferencial: Fatiga Normal vs Patología</h3>
            <div style={{ overflowX: 'auto', marginTop: 8 }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line-strong)', color: 'var(--text-3)' }}>
                    <th style={{ padding: '6px 4px' }}>Criterio</th>
                    <th style={{ padding: '6px 4px' }}>Fatiga Normal / DOMS</th>
                    <th style={{ padding: '6px 4px' }}>Tendinopatía Aquiles</th>
                    <th style={{ padding: '6px 4px' }}>Periostitis Tibial</th>
                    <th style={{ padding: '6px 4px' }}>Fascitis Plantar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '6px 4px', fontWeight: 600 }}>Localización</td>
                    <td style={{ padding: '6px 4px', color: 'var(--text-2)' }}>Difusa en vientres musculares</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>Focal 2–6 cm de inserción</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>Borde medial distal tibia</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>Tubérculo calcáneo / arco</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '6px 4px', fontWeight: 600 }}>En caliente</td>
                    <td style={{ padding: '6px 4px', color: 'var(--ok)' }}>Desaparece al calentar</td>
                    <td style={{ padding: '6px 4px', color: 'var(--warn)' }}>Atenúa pero repunta duro</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>Empeora progresivamente</td>
                    <td style={{ padding: '6px 4px', color: 'var(--warn)' }}>Dolor matutino agudo</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 4px', fontWeight: 600 }}>Conducta</td>
                    <td style={{ padding: '6px 4px', color: 'var(--ok)' }}>Continuar protocolo</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>ROJO: Cero impacto, isométricos</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>ROJO: Cero asfalto, bici suave</td>
                    <td style={{ padding: '6px 4px', color: 'var(--danger)' }}>Pelota tenis, estirar sóleo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--danger)', fontSize: 16 }}>Banderas Rojas de Cese Inmediato</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7 }}>
              <li><strong>Dolor óseo focalizado (&lt; 2 cm):</strong> Sobre tibia o metatarsianos (sospecha de edema o fractura por estrés).</li>
              <li><strong>Crepitación en tendón de Aquiles:</strong> Roce palpable o audible al mover el tobillo.</li>
              <li><strong>Dolor nocturno constante:</strong> Dolor que despierta durante el reposo.</li>
              <li><strong>Signos de RED-S severo:</strong> Mareos ortostáticos, apatía súbita, bradicardia extrema (&lt; 38 lpm con malestar) o frío constante.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 9: EVIDENCIA CIENTÍFICA */}
      {activeTab === 'evidencia' && (
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--text)', fontSize: 16 }}>Evidencia Científica Biomédica (Peer-Reviewed)</h3>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.8 }}>
            <li><strong>Baar, K. (2014)</strong>: <em>Using molecular biology to maximize concurrent training</em>. Separación ≥ 6 h para evitar la atenuación de p70S6K por activación de AMPK.</li>
            <li><strong>Coffey & Hawley (2017)</strong>: <em>Concurrent exercise training: do opposites distract?</em> Bases de la interferencia neuromuscular y la gestión de fatiga residual periférica.</li>
            <li><strong>Dorn, Schache & Pandy (2012)</strong>: <em>Muscular strategy shift in human running</em>. El sóleo soporta fuerzas de 6.5 a 8.0 veces el peso corporal durante la carrera.</li>
            <li><strong>Bohm, Mersmann & Arampatzis (2015)</strong>: <em>Human tendon adaptation to mechanical loading</em>. Contracciones isométricas pesadas y tempos excéntricos lentos ≥ 3 s para rigidez tendinosa y síntesis de colágeno.</li>
            <li><strong>Gabbett, T. J. (2016)</strong>: <em>The training—injury prevention paradox</em>. Ratio de carga aguda:crónica entre 0.8 y 1.3 para minimizar el riesgo lesional.</li>
            <li><strong>Warden, Davis & Fredericson (2014)</strong>: <em>Management and prevention of bone stress injuries</em>. Prevención de periostitis y fracturas de estrés en novatos.</li>
            <li><strong>Mountjoy et al. (2018)</strong>: <em>IOC consensus on RED-S</em>. Disponibilidad energética &gt; 30–45 kcal/kg de masa magra/día para evitar inmunodepresión y desbalance neuroendocrino.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
