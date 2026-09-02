import { useState } from 'react'
import {
  AUTOREGULATION_RULES,
  NUTRITION_GUIDELINES,
  WEEKLY_QUESTIONS,
} from '../data/runningGymData'
import { Chip } from '../components/ExerciseUI'
import { useAppState } from '../hooks/useAppState'
import { todayISO } from '../lib/storage'

export function AutoregulationView() {
  const { setDailyReadiness, todayReadiness } = useAppState()
  const today = todayISO()

  // Daily test inputs
  const [sleep, setSleep] = useState<number>(todayReadiness?.sleepHours ?? 7.5)
  const [pain, setPain] = useState<number>(todayReadiness?.musclePain ?? 1)
  const [rirDev, setRirDev] = useState<number>(todayReadiness?.rirDeviation ?? 0)
  const [notes, setNotes] = useState<string>(todayReadiness?.notes ?? '')

  // Weekly Audit responses
  const [weeklyAnswers, setWeeklyAnswers] = useState<boolean[]>([true, true, true, true, true])

  // Calculated semaphore
  const calculatedStatus: 'verde' | 'amarillo' | 'rojo' =
    pain >= 5 || sleep < 6 || rirDev <= -2
      ? 'rojo'
      : pain >= 3 || sleep < 7 || rirDev === -1
      ? 'amarillo'
      : 'verde'

  const rule = AUTOREGULATION_RULES[calculatedStatus]

  const handleSaveDaily = () => {
    setDailyReadiness({
      date: today,
      status: calculatedStatus,
      sleepHours: sleep,
      musclePain: pain,
      rirDeviation: rirDev,
      notes,
    })
  }

  // Nutrition calculator state (default 67.5 kg athlete)
  const [weightKg, setWeightKg] = useState<number>(67.5)
  const proteinMin = Math.round(weightKg * 1.8)
  const proteinMax = Math.round(weightKg * 2.0)
  const proteinPerMeal = Math.round(proteinMax / 4)
  const carbsRest = Math.round(weightKg * 3.0)
  const carbsBase = Math.round(weightKg * 4.8)
  const carbsHeavy = Math.round(weightKg * 6.0)
  const fatsAmount = Math.round(weightKg * 0.95)
  const waterMin = (weightKg * 0.035).toFixed(1)
  const waterMax = (weightKg * 0.040).toFixed(1)

  const negativeAnswersCount = weeklyAnswers.filter((a) => !a).length

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 8 }}>
              <Chip variant="accent">Autorregulación Dinámica</Chip>
              <Chip>Semáforo Diario</Chip>
              <Chip>Recomposición sin RED-S</Chip>
            </div>
            <h2 className="panel-title">Semáforo de Carga & Recomposición Nutricional</h2>
            <p className="panel-sub">
              Ajuste bioenergético del entrenamiento basado en biomarcadores subjetivos y nutrición optimizada para recomposición sin comprometer tendones ni huesos.
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: CHEQUEO DIARIO DE AUTORREGULACIÓN */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 6 }}>
              <Chip variant="accent">Check-In Diario</Chip>
              <Chip>{today}</Chip>
            </div>
            <h2 className="panel-title">Test de Preparación Fisiológica (Readiness)</h2>
            <p className="panel-sub">Completá tus parámetros del día para calibrar la carga de la sesión.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
          {/* Horas de sueño */}
          <div className="ex-box" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
            <label htmlFor="sleep" style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
              Horas de Sueño Anoche: <strong>{sleep}h</strong>
            </label>
            <input
              id="sleep"
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleep}
              onChange={(e) => setSleep(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: 11, color: sleep >= 7.5 ? 'var(--ok)' : sleep >= 6.5 ? 'var(--warn)' : 'var(--danger)' }}>
              {sleep >= 7.5 ? '✓ Reparador (≥7.5h)' : sleep >= 6.5 ? '⚠ Moderado (6.5-7.5h)' : '✗ Insuficiente (<6.5h)'}
            </span>
          </div>

          {/* Dolor muscular / tendón */}
          <div className="ex-box" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
            <label htmlFor="pain" style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
              Dolor Musculoesquelético / Tendón: <strong>{pain}/10</strong>
            </label>
            <input
              id="pain"
              type="range"
              min="0"
              max="10"
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value, 10))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: 11, color: pain <= 2 ? 'var(--ok)' : pain <= 4 ? 'var(--warn)' : 'var(--danger)' }}>
              {pain <= 2 ? '✓ Normal (≤2/10)' : pain <= 4 ? '⚠ Molestia persistente (3-4/10)' : '✗ Dolor punzante (≥5/10)'}
            </span>
          </div>

          {/* RIR en gimnasio */}
          <div className="ex-box" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
            <label htmlFor="rir" style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
              Rendimiento de Cargas / RIR:
            </label>
            <select
              id="rir"
              value={rirDev}
              onChange={(e) => setRirDev(parseInt(e.target.value, 10))}
              style={{ width: '100%', padding: '6px 10px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
            >
              <option value="0">Normal (Cumplo reps con RIR prescrito)</option>
              <option value="-1">Pérdida de 1 repetición sobre la meta</option>
              <option value="-2">Pérdida de ≥2 reps (Fatiga neuromuscular severa)</option>
            </select>
          </div>

          {/* Notas adicionales */}
          <div className="ex-box" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
            <label htmlFor="daily-notes" style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
              Sensaciones de Hoy:
            </label>
            <input
              id="daily-notes"
              type="text"
              placeholder="ej. Buen descanso, sin rigidez en Aquiles..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
            />
          </div>
        </div>

        {/* Diagnóstico Semáforo */}
        <div
          className={`alert ${calculatedStatus === 'verde' ? 'ok' : calculatedStatus === 'amarillo' ? 'warn' : 'danger'}`}
          style={{ padding: 16, marginBottom: 16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700 }}>
              {rule.titulo}
            </span>
            <Chip variant={calculatedStatus === 'verde' ? 'ok' : calculatedStatus === 'amarillo' ? 'warn' : 'danger'}>
              {calculatedStatus.toUpperCase()}
            </Chip>
          </div>
          <p style={{ margin: '0 0 8px', fontSize: 14, lineHeight: 1.5 }}>
            <strong>Criterio:</strong> {rule.criterio}
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 14, lineHeight: 1.5 }}>
            <strong>Acción en Volumen:</strong> {rule.accionVolumen}
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 14, lineHeight: 1.5 }}>
            <strong>Acción en Intensidad:</strong> {rule.accionIntensidad}
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>
            <strong>Evaluación Clínica:</strong> {rule.evaluacion}
          </p>
        </div>

        <button type="button" className="btn primary" onClick={handleSaveDaily}>
          Guardar Estado de Hoy ({calculatedStatus.toUpperCase()})
        </button>
      </div>

      {/* SECCIÓN 2: AUDITORÍA SEMANAL */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 6 }}>
              <Chip variant="accent">Auditoría Semanal</Chip>
              <Chip>5 Preguntas Clave</Chip>
            </div>
            <h2 className="panel-title">Cuestionario Semanal de Asimilación</h2>
            <p className="panel-sub">Respondé al finalizar cada microciclo para validar el paso a la siguiente semana.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
          {WEEKLY_QUESTIONS.map((q, idx) => {
            const isChecked = weeklyAnswers[idx]
            return (
              <div
                key={q}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <input
                  type="checkbox"
                  id={`q-${idx}`}
                  checked={isChecked}
                  onChange={(e) => {
                    const next = [...weeklyAnswers]
                    next[idx] = e.target.checked
                    setWeeklyAnswers(next)
                  }}
                  style={{ width: 18, height: 18, accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                <label htmlFor={`q-${idx}`} style={{ fontSize: 13, color: 'var(--text)', cursor: 'pointer', flex: 1 }}>
                  {q}
                </label>
                <Chip variant={isChecked ? 'ok' : 'danger'}>{isChecked ? 'SÍ' : 'NO'}</Chip>
              </div>
            )
          })}
        </div>

        {negativeAnswersCount >= 2 ? (
          <div className="alert warn">
            <strong>Atención:</strong> Respondiste "NO" a {negativeAnswersCount} preguntas. Se recomienda aplicar una semana de descarga (reducción 30–40% de volumen y eliminación de series de umbral) para disipar la fatiga.
          </div>
        ) : (
          <div className="alert ok">
            <strong>Excelente adherencia:</strong> Respuestas positivas ({5 - negativeAnswersCount}/5). Estás listo para avanzar según la periodización del macrociclo.
          </div>
        )}
      </div>

      {/* SECCIÓN 3: NUTRICIÓN Y RECOMPOSICIÓN SIN RED-S */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 6 }}>
              <Chip variant="accent">Nutrición & Recomposición</Chip>
              <Chip>Prevención RED-S</Chip>
            </div>
            <h2 className="panel-title">Estrategia Nutricional Periodizada</h2>
            <p className="panel-sub">
              Balance iso-energético ajustado por día (*energy flux* elevado) para ganar masa magra y densidad muscular sin riesgo de fracturas por estrés ni descompensación hormonal.
            </p>
          </div>
        </div>

        {/* Calculadora Nutricional */}
        <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Calculadora de Macronutrientes por Peso</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label htmlFor="weight" style={{ fontSize: 13, color: 'var(--text-2)' }}>Tu Peso:</label>
              <input
                id="weight"
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 67.5)}
                style={{ width: 75, padding: '4px 8px', background: 'var(--bg-muted)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--text)' }}
              />
              <span style={{ fontSize: 13 }}>kg</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div className="stat" style={{ padding: 12 }}>
              <div className="stat-label">Proteína (1.8–2.0 g/kg)</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{proteinMin}–{proteinMax} g/día</div>
              <div className="stat-hint">4 tomas de ~{proteinPerMeal}g c/u (mTOR)</div>
            </div>
            <div className="stat" style={{ padding: 12 }}>
              <div className="stat-label">Carbohidratos Periodizados</div>
              <div className="stat-value" style={{ fontSize: 17 }}>{carbsRest}g / {carbsBase}g / {carbsHeavy}g</div>
              <div className="stat-hint">Descanso / Z2-Fuerza / Tirada Larga</div>
            </div>
            <div className="stat" style={{ padding: 12 }}>
              <div className="stat-label">Grasas Saludables (0.95 g/kg)</div>
              <div className="stat-value" style={{ fontSize: 20 }}>~{fatsAmount} g/día</div>
              <div className="stat-hint">AOVE, frutos secos, aguacate</div>
            </div>
            <div className="stat" style={{ padding: 12 }}>
              <div className="stat-label">Agua Diaria (35–40 ml/kg)</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{waterMin}–{waterMax} L/día</div>
              <div className="stat-hint">+500-700 mg/L sodio en carrera</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div className="panel" style={{ background: 'var(--bg-elevated)', padding: 14 }}>
            <strong style={{ fontSize: 15, color: 'var(--text)' }}>Periodización del Gasto Calórico (GETD)</strong>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <div>• <strong>GEB (Cunningham):</strong> {NUTRITION_GUIDELINES.calorias.geb}</div>
              <div>• <strong>Días de Descanso / Fuerza Ligera:</strong> {NUTRITION_GUIDELINES.calorias.descanso}</div>
              <div>• <strong>Días de Carrera Z2 / Gimnasio:</strong> {NUTRITION_GUIDELINES.calorias.entrenamiento}</div>
              <div>• <strong>Días de Tirada Larga (&gt;80 min):</strong> {NUTRITION_GUIDELINES.calorias.tiradaLarga}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: BANDERAS ROJAS (RED FLAGS) */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="chips" style={{ marginBottom: 6 }}>
              <Chip variant="danger">Banderas Rojas</Chip>
              <Chip>Seguridad Médica</Chip>
            </div>
            <h2 className="panel-title">Señales de Alarma que Exigen Parar</h2>
            <p className="panel-sub">
              Si detectás alguno de estos 4 síntomas, suspendé de inmediato el entrenamiento y consultá a un profesional médico o fisioterapeuta:
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <div className="alert danger" style={{ margin: 0 }}>
            <strong>1. Sospecha de Lesión Ósea por Estrés:</strong> Dolor óseo puntual e intenso en la tibia, fémur o metatarso, que duele a la palpación directa o al dar pequeños saltos (*hop test*).
          </div>
          <div className="alert danger" style={{ margin: 0 }}>
            <strong>2. Tendinopatía Reactiva Aguda de Aquiles:</strong> Dolor agudo, inflamación visible o crepitación con incapacidad para ponerse de puntillas.
          </div>
          <div className="alert danger" style={{ margin: 0 }}>
            <strong>3. Síndrome Neuro-Lumbar:</strong> Dolor punzante que se irradia por debajo de la rodilla, adormecimiento o pérdida de fuerza para caminar sobre los talones.
          </div>
          <div className="alert danger" style={{ margin: 0 }}>
            <strong>4. Signos Sistémicos:</strong> Opresión en el pecho, palpitaciones irregulares, mareo intenso o disnea que no cede al detenerse.
          </div>
        </div>
      </div>
    </>
  )
}
