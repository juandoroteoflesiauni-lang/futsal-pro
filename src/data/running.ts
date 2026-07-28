// Fuente: "Manual Científico e Integrado de Rendimiento en 10K" (extracto PDF, running_10k_extract.txt).
// Fechas recalculadas para el año 2026 manteniendo el contenido diario original del documento.

export type RunZone = {
  id: string // Z1..Z5
  nombre: string
  rpe: string
  descripcion: string
  uso: string
}

export type RunPhase = {
  id: number
  nombre: string
  fechas: string
  semanas: string
  objetivos: string
  volumen: string
  tid: string
  sesionesClave: string[]
  metricas: string
}

export type RunDay = {
  dia: string // Lun..Dom
  fecha?: string // YYYY-MM-DD when known
  sesion: string
  tipo: 'calidad' | 'rodaje' | 'largo' | 'descanso' | 'activo' | 'test' | 'carrera'
  km?: number
  zona?: string
}

export type RunWeek = {
  num: number
  titulo: string
  fechas: string
  volumenKm: number
  descarga?: boolean
  fase: number
  dias: RunDay[]
}

export type RaceSplit = {
  tramo: string
  sub50: string
  sub45: string
  enfoque: string
}

export type RunAdaptation = {
  id: string
  disparador: string
  acciones: string[]
}

export const RUNNING_TITLE = 'Sistema Científico de Entrenamiento 10K — Sub-45/50 Minutos'

export const RUNNING_RESUMEN =
  'Sistema de entrenamiento de precisión, basado en evidencia fisiológica, biomecánica y neuromuscular, diseñado para completar una prueba de 10 kilómetros en un tiempo de entre 45:00 y 50:00 minutos el 31 de diciembre, iniciando la preparación el 27 de julio (22.5 semanas / 158 días). Integra un modelo híbrido piramidal-polarizado de intensidad con desarrollo concurrente de fuerza máxima, pliometría, neuroentrenamiento y reeducación biomecánica, organizado en seis fases periodizadas. El objetivo fisiológico es sostener un ritmo medio de 4:30–5:00 min/km mediante la optimización del VO2max, el desplazamiento del umbral anaeróbico y la mejora de la economía de carrera, minimizando el riesgo de lesión por sobreuso.'

export const RUNNING_START = '2026-07-27'
export const RUNNING_RACE = '2026-12-31'
/** Duración total planificada del macrociclo, en semanas completas (Fase 6 se extiende 0.5 semana adicional hasta el día de carrera). */
export const RUNNING_TOTAL_WEEKS = 22

export const RUNNING_ZONES: RunZone[] = [
  {
    id: 'Z1',
    nombre: 'Recuperación / Regenerativo',
    rpe: '2–3',
    descripcion:
      'Ritmo muy suave y conversacional, sin ningún esfuerzo. Predomina el metabolismo graso; permite disipar la fatiga acumulada de sesiones previas.',
    uso: 'Rodajes regenerativos entre sesiones de calidad, calentamientos y vueltas a la calma.',
  },
  {
    id: 'Z2',
    nombre: 'Aeróbico Base (VT1)',
    rpe: '3–4',
    descripcion:
      'Ritmo cómodo y sostenible, con conversación fluida. Se ubica por debajo del primer umbral ventilatorio (VT1) y estimula la biogénesis mitocondrial en fibras Tipo I.',
    uso: 'Rodajes largos, rodajes suaves y la mayor parte del volumen semanal dentro del enfoque polarizado.',
  },
  {
    id: 'Z3',
    nombre: 'Tempo / Umbral Aeróbico',
    rpe: '5–6',
    descripcion:
      'Ritmo "controlado-incómodo", más exigente que el rodaje base pero sostenible durante varios minutos. Zona de transición entre VT1 y VT2.',
    uso: 'Tempo runs continuos y bloques progresivos dentro de rodajes largos.',
  },
  {
    id: 'Z4',
    nombre: 'Umbral Anaeróbico / Ritmo Objetivo 10K',
    rpe: '7–8',
    descripcion:
      'Corresponde al segundo umbral ventilatorio (VT2 / MLSS), muy cercano al ritmo de carrera objetivo (4:30–5:00 min/km). El lactato se mantiene en estado estable.',
    uso: 'Bloques de umbral (p. ej. 3×2000 m), tempo específico y series al ritmo objetivo de 10K.',
  },
  {
    id: 'Z5',
    nombre: 'VO2max / Capacidad Anaeróbica',
    rpe: '9–10',
    descripcion:
      'Intensidad máxima aeróbica, sostenible solo durante pocos minutos. Recluta fibras Tipo IIx y maximiza el consumo de oxígeno.',
    uso: 'Intervalos tipo Billat (5×3 min), repeticiones de 800–1000 m y series cortas de VO2max.',
  },
]

export const RUNNING_PHASES: RunPhase[] = [
  {
    id: 1,
    nombre: 'Base Aeróbica y Adaptación Anatómica',
    fechas: '27 Jul – 23 Ago',
    semanas: 'Semanas 1–4',
    objetivos:
      'Adaptación de tejidos blandos, incremento de la densidad capilar inicial y establecimiento de la rutina de fuerza general.',
    volumen: '28 a 36 km/semana (incremento progresivo)',
    tid: '85% Z1-Z2, 15% Z3 (sub-VT1) + fuerza de resistencia general',
    sesionesClave: [
      'Rodajes suaves continuos',
      'Cuestas repetidas cortas (10×15 s al 90% del esfuerzo)',
      '2 sesiones de gimnasio de fuerza general',
    ],
    metricas:
      'Mantener la frecuencia cardíaca en los rodajes; variabilidad de HRV estable. Reducir la carga si aparece dolor articular local.',
  },
  {
    id: 2,
    nombre: 'Desarrollo Técnico y Stiffness Musculotendinoso',
    fechas: '24 Ago – 20 Sep',
    semanas: 'Semanas 5–8',
    objetivos:
      'Aumento de la cadencia objetivo (170–175 spm), fortalecimiento de sóleo/Aquiles e introducción de la reserva de velocidad máxima.',
    volumen: '35 a 42 km/semana',
    tid: 'Polarizada: 80% Z1-Z2, 5% Z3, 15% Z4/Z5',
    sesionesClave: [
      'Sprints máximos en llano (6×50 m, 3 min de descanso pasivo)',
      'Fartlek corto (15×1 min fuerte / 1 min suave)',
      'Fuerza pesada (80% 1RM) + pliometría inicial',
    ],
    metricas:
      'Evaluación del tiempo de contacto con el suelo (GCT) y cadencia sostenida sin elevar el gasto cardíaco de forma desproporcionada.',
  },
  {
    id: 3,
    nombre: 'Expansión del Umbral de Lactato',
    fechas: '21 Sep – 25 Oct',
    semanas: 'Semanas 9–13',
    objetivos:
      'Maximizar la velocidad en el umbral anaeróbico (VT2/MLSS) y desplazar la curva de lactato hacia la derecha.',
    volumen: '42 a 50 km/semana (semana 13 de descarga con 34 km)',
    tid: 'Piramidal: 70% Z1-Z2, 20% Z3/tempo, 10% Z4',
    sesionesClave: [
      'Tempo runs continuos (20–30 min a ritmo de 15K/20K)',
      'Bloques de umbral (p. ej. 3×3000 m a 4:40–5:05 min/km con 2 min de trote)',
    ],
    metricas: 'Deriva cardíaca en las series de umbral; acumulación de carga controlada.',
  },
  {
    id: 4,
    nombre: 'Potencia Aeróbica Máxima y VO2max',
    fechas: '26 Oct – 22 Nov',
    semanas: 'Semanas 14–17',
    objetivos: 'Elevar el techo aeróbico (VO2max) y la velocidad asociada (vVO2max).',
    volumen: '48 a 55 km/semana',
    tid: 'Polarizada específica: 75% Z1-Z2, 5% Z3, 20% Z4-Z5',
    sesionesClave: [
      'Intervalos Billat (5×3 min con 2.5 min de trote)',
      '6×800 m a ritmo objetivo de 5K (4:00–4:15 min/km)',
      'Fuerza de mantenimiento máxima',
    ],
    metricas: 'Tiempo total acumulado por encima del 90% del VO2max, por sesión.',
  },
  {
    id: 5,
    nombre: 'Velocidad Específica y Tolerancia a la Fatiga',
    fechas: '23 Nov – 13 Dic',
    semanas: 'Semanas 18–20',
    objetivos:
      'Eficiencia mecánica al ritmo exacto de competición (4:30–5:00 min/km) bajo condiciones de acidosis lactatémica residual.',
    volumen: '50 a 58 km/semana (pico de volumen en la semana 19)',
    tid: 'Específica: 70% Z1-Z2, 25% ritmo objetivo de 10K, 5% Z5',
    sesionesClave: [
      '4×2000 m o 3×3000 m a ritmo de carrera objetivo (4:30–4:45 min/km) con 90 s a 2 min de recuperación',
      'Test control de 5K',
    ],
    metricas: 'Estabilidad del ritmo de pasada sin degradación de la técnica en los últimos metros.',
  },
  {
    id: 6,
    nombre: 'Puesta a Punto (Tapering) y Competición',
    fechas: '14 Dic – 31 Dic',
    semanas: 'Semanas 21–22.5',
    objetivos:
      'Disipación de la fatiga acumulada manteniendo las adaptaciones neuromusculares y metabólicas.',
    volumen: 'Reducción del 40% (semana 21: 33 km) y del 60% (semana 22: 22 km)',
    tid: 'Mantener la intensidad específica con muy bajo volumen total',
    sesionesClave: ['3×1000 m a ritmo de 10K con 2 min de descanso pasivo', 'Progresiones cortas de 100 m'],
    metricas:
      'Disipación completa de la fatiga sin pérdida de adaptaciones; llegar fresco al día de la competencia.',
  },
]

/** Plantilla semanal tipo usada durante las fases centrales de carga (Fases 3 y 4). Mañana/tarde consolidados en una sola sesión por día. */
export const RUNNING_MICRO: RunDay[] = [
  {
    dia: 'Lun',
    tipo: 'activo',
    sesion:
      'Mañana: descanso activo — movilidad articular + foam rolling (30 min). Tarde: estiramientos dinámicos + core de estabilidad. Enfoque: disipar la fatiga del rodaje largo dominical.',
  },
  {
    dia: 'Mar',
    tipo: 'calidad',
    sesion:
      'Mañana: carrera (calidad 1) — intervalos de umbral + drills técnicos. Tarde: fuerza y pliometría — sesión pesada (sentadilla, sóleo, pliometría). Enfoque: agrupar el estrés neuromuscular en un mismo día para permitir 48 h de recuperación posterior.',
    zona: 'Z4',
  },
  {
    dia: 'Mié',
    tipo: 'rodaje',
    sesion:
      'Mañana: carrera — rodaje de recuperación Z1 (35–45 min, cadencia alta). Tarde: trabajo de movilidad de tobillo y cadera (15 min). Enfoque: promover el flujo sanguíneo y el aclaramiento de metabolitos.',
    zona: 'Z1',
  },
  {
    dia: 'Jue',
    tipo: 'calidad',
    sesion:
      'Mañana: carrera (calidad 2) — tempo run / fartlek a ritmo específico de 10K. Tarde: neuroentrenamiento — ejercicios visomotores / agilidad de pies. Enfoque: estimular ritmos metabólicos específicos sin sobrecarga de fuerza adicional.',
    zona: 'Z3/Z4',
  },
  {
    dia: 'Vie',
    tipo: 'rodaje',
    sesion:
      'Mañana: carrera — rodaje suave Z2 (40–50 min) + 5 sprints cortísimos (60 m). Tarde: fuerza complementaria — core, foot core y prevención de lesiones. Enfoque: mantenimiento neuromuscular de baja interferencia.',
    zona: 'Z2',
  },
  {
    dia: 'Sáb',
    tipo: 'descanso',
    sesion:
      'Mañana: descanso total o yoga — movilidad pasiva. Tarde: descanso. Enfoque: permitir la supercompensación previa al rodaje largo del domingo.',
  },
  {
    dia: 'Dom',
    tipo: 'largo',
    sesion:
      'Mañana: carrera — rodaje largo aeróbico Z2 (65–85 min, progresivo al final). Tarde: estiramientos suaves y reposo. Enfoque: desarrollo de densidad mitocondrial y resistencia estructural.',
    zona: 'Z2',
  },
]

type DaySpec = { tipo: RunDay['tipo']; sesion: string; km?: number; zona?: string }

const s = (tipo: RunDay['tipo'], sesion: string, km?: number, zona?: string): DaySpec => ({ tipo, sesion, km, zona })

const DIA_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + days)
  const yy = dt.getFullYear()
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

function buildDays(num: number, specs: DaySpec[]): RunDay[] {
  return specs.map((spec, i) => ({
    dia: DIA_NAMES[i],
    fecha: addDays(RUNNING_START, (num - 1) * 7 + i),
    sesion: spec.sesion,
    tipo: spec.tipo,
    km: spec.km,
    zona: spec.zona,
  }))
}

function week(
  num: number,
  titulo: string,
  fechas: string,
  volumenKm: number,
  fase: number,
  specs: DaySpec[],
  descarga?: boolean
): RunWeek {
  return { num, titulo, fechas, volumenKm, fase, dias: buildDays(num, specs), descarga }
}

export const RUNNING_WEEKS: RunWeek[] = [
  week(1, 'Semana 1 — Arranque y Rodaje Evaluativo', '27 Jul – 2 Ago', 28, 1, [
    s('rodaje', 'Rodaje evaluativo suave: 6 km Z2. Evaluar cadencia media.', 6, 'Z2'),
    s('activo', 'Descanso activo: 30 min de movilidad general y core (planchas, bug muerto).'),
    s(
      'calidad',
      '7 km Z2 intercalando 5 cuestas de 15 s a alta intensidad (Z4-Z5) con bajada caminando. + Fuerza anatómica en gimnasio (3×10 sentadilla búlgara, elevación de sóleo sentado).',
      7,
      'Z2/Z4/Z5'
    ),
    s('rodaje', '5 km regenerativo Z1.', 5, 'Z1'),
    s('calidad', '6 km Z2 incluyendo 4×500 m en Z3 con 90 s de trote de recuperación.', 6, 'Z2/Z3'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + 15 min de drills de técnica (A-skips, ankling, talones al glúteo).', 4, 'Z1'),
  ]),
  week(2, 'Semana 2 — Primer Rodaje Largo', '3 Ago – 9 Ago', 31, 1, [
    s('largo', 'Rodaje largo: 10 km Z2 continuos.', 10, 'Z2'),
    s('activo', 'Descanso activo: movilidad de tobillo y cadera.'),
    s(
      'calidad',
      '7 km Z2 + 6×15 s cuestas rápidas. + Fuerza en gimnasio (3×8 sentadilla goblet, hip thrust, sóleo).',
      7,
      'Z2/Z4'
    ),
    s('rodaje', '5 km Z1 suave.', 5, 'Z1'),
    s('calidad', '6 km Z2 con 5×600 m en Z3 con 90 s de trote.', 6, 'Z2/Z3'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '3 km Z1 + 20 min de neuroentrenamiento / agilidad de pies.', 3, 'Z1'),
  ]),
  week(3, 'Semana 3 — Tempo Run Inicial', '10 Ago – 16 Ago', 34, 1, [
    s('largo', 'Rodaje largo: 11 km Z2.', 11, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '8 km Z2 con 8×15 s cuestas. + Fuerza en gimnasio (3×6 sentadilla pesada, peso muerto rumano unilateral).',
      8,
      'Z2/Z4'
    ),
    s('rodaje', '6 km Z1 regenerativo.', 6, 'Z1'),
    s('calidad', 'Tempo run inicial: 2 km calentamiento + 4 km continuos en Z3 + 2 km enfriamiento.', 8, 'Z3'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '3 km Z1 + drills técnicos e incrementos de cadencia con metrónomo a 172 spm.', 3, 'Z1'),
  ]),
  week(
    4,
    'Semana 4 — Descarga y Test de Campo 5K',
    '17 Ago – 23 Ago',
    25,
    1,
    [
      s('rodaje', 'Rodaje suave: 8 km Z2.', 8, 'Z2'),
      s('activo', 'Descanso activo.'),
      s('calidad', '5 km Z2 + 4×50 m sprints progresivos. + Fuerza ligera (mantenimiento).', 5, 'Z2'),
      s('rodaje', '4 km Z1.', 4, 'Z1'),
      s(
        'test',
        'Test de campo 5K: 2 km calentamiento + 5K a máximo esfuerzo sostenible (registrar tiempo y FC) + 1 km enfriamiento. Ajustar zonas VDOT.',
        8,
        'Z4/Z5'
      ),
      s('descanso', 'Descanso total.'),
      s('rodaje', '3 km regenerativo Z1.', 3, 'Z1'),
    ],
    true
  ),
  week(5, 'Semana 5 — Sprints y Pliometría', '24 Ago – 30 Ago', 36, 2, [
    s('largo', 'Rodaje largo: 12 km Z2.', 12, 'Z2'),
    s('activo', 'Descanso activo + core.'),
    s(
      'calidad',
      'Sprints y pliometría: 2 km calentamiento + 6×60 m sprints al 95% (2.5 min de recuperación pasiva) + 4 km Z2. + Gimnasio: fuerza pesada + pogo jumps (3×10).',
      6,
      'Z2/Z5'
    ),
    s('rodaje', '6 km Z1 regenerativo.', 6, 'Z1'),
    s(
      'calidad',
      'Fartlek corto: 2 km calentamiento + 12×(1 min Z4 a 4:40 min/km / 1 min trote Z1) + 2 km enfriamiento.',
      undefined,
      'Z4/Z1'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + trabajo de foot core e isométricos de sóleo.', 4, 'Z1'),
  ]),
  week(6, 'Semana 6 — Fartlek y Fuerza Pesada', '31 Ago – 6 Sep', 39, 2, [
    s('largo', 'Rodaje largo: 13 km Z2.', 13, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 8×60 m sprints + 4 km Z2. + Gimnasio (3×5 sentadilla al 82% 1RM + drop jumps).',
      6,
      'Z2/Z5'
    ),
    s('rodaje', '6 km Z1.', 6, 'Z1'),
    s(
      'calidad',
      'Fartlek: 2 km calentamiento + 15×(1 min Z4 a 4:35 min/km / 1 min trote Z1) + 2 km enfriamiento.',
      undefined,
      'Z4/Z1'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + trabajo de coordinación y cadencia a 175 spm.', 4, 'Z1'),
  ]),
  week(7, 'Semana 7 — Progresivo e Intervalos Extensivos', '7 Sep – 13 Sep', 42, 2, [
    s(
      'largo',
      'Rodaje largo progresivo: 14 km (10 km Z2 a 5:40 min/km + 4 km Z3 a 5:10 min/km).',
      14,
      'Z2/Z3'
    ),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 6×80 m sprints en cuesta leve + 4 km Z2. + Gimnasio (fuerza máxima + pliometría).',
      6,
      'Z2/Z5'
    ),
    s('rodaje', '7 km Z1.', 7, 'Z1'),
    s(
      'calidad',
      'Intervalos extensivos: 2 km calentamiento + 5×1000 m en Z4 (ritmo objetivo 4:50 min/km) con 2 min de trote + 2 km enfriamiento.',
      9,
      'Z4'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + movilidad torácica y de cadera.', 4, 'Z1'),
  ]),
  week(
    8,
    'Semana 8 — Descarga 2',
    '14 Sep – 20 Sep',
    30,
    2,
    [
      s('rodaje', 'Rodaje suave: 10 km Z2.', 10, 'Z2'),
      s('activo', 'Descanso activo.'),
      s('calidad', '6 km Z2 + 4 sprints cortísimos. + Gimnasio de mantenimiento.', 6, 'Z2'),
      s('rodaje', '5 km Z1.', 5, 'Z1'),
      s(
        'calidad',
        '2 km calentamiento + 3×1000 m en Z4 (ritmo 4:45 min/km) con 2 min de descanso + 1 km enfriamiento.',
        6,
        'Z4'
      ),
      s('descanso', 'Descanso total.'),
      s('rodaje', '4 km Z1 suave.', 4, 'Z1'),
    ],
    true
  ),
  week(9, 'Semana 9 — Bloques de Umbral', '21 Sep – 27 Sep', 43, 3, [
    s('largo', 'Rodaje largo: 15 km Z2.', 15, 'Z2'),
    s('activo', 'Descanso activo + core.'),
    s(
      'calidad',
      'Bloques de umbral: 2 km calentamiento + 3×2000 m en Z4 con 2 min de trote + 2 km enfriamiento. + Gimnasio (fuerza concurrente).',
      10,
      'Z4'
    ),
    s('rodaje', '7 km Z1 regenerativo.', 7, 'Z1'),
    s('calidad', 'Tempo run: 2 km calentamiento + 6 km continuos en Z3-Z4 + 2 km enfriamiento.', 10, 'Z3/Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + ejercicios visomotores (BlazePods o reacción lumínica).', 4, 'Z1'),
  ]),
  week(10, 'Semana 10 — Tempo Continuo en Ascenso', '28 Sep – 4 Oct', 46, 3, [
    s('largo', 'Rodaje largo: 16 km Z2.', 16, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 4×2000 m en Z4 con 2 min de trote + 2 km enfriamiento. + Gimnasio (fuerza).',
      12,
      'Z4'
    ),
    s('rodaje', '7 km Z1.', 7, 'Z1'),
    s('calidad', '2 km calentamiento + 8 km tempo continuo en Z3-Z4 + 1 km enfriamiento.', 11, 'Z3/Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '5 km Z1 + foot core.', 5, 'Z1'),
  ]),
  week(11, 'Semana 11 — Umbral Extendido', '5 Oct – 11 Oct', 49, 3, [
    s('largo', 'Rodaje largo: 17 km Z2.', 17, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 3×3000 m en Z4 con 2.5 min de trote + 1 km enfriamiento. + Gimnasio.',
      12,
      'Z4'
    ),
    s('rodaje', '8 km Z1.', 8, 'Z1'),
    s(
      'calidad',
      '2 km calentamiento + 2×4 km a ritmo de umbral con 3 min de trote + 1 km enfriamiento.',
      11,
      'Z4'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + movilidad general.', 4, 'Z1'),
  ]),
  week(12, 'Semana 12 — Pico de Fase 3', '12 Oct – 18 Oct', 52, 3, [
    s('largo', 'Rodaje largo: 18 km Z2.', 18, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 5×2000 m en Z4 con 2 min de trote + 1 km enfriamiento. + Gimnasio.',
      13,
      'Z4'
    ),
    s('rodaje', '8 km Z1.', 8, 'Z1'),
    s('calidad', 'Tempo run específico: 2 km calentamiento + 8 km continuos + 1 km enfriamiento.', 11, 'Z3/Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + drills técnicos.', 4, 'Z1'),
  ]),
  week(
    13,
    'Semana 13 — Descarga y Test de Umbral',
    '19 Oct – 25 Oct',
    34,
    3,
    [
      s('rodaje', 'Rodaje suave: 11 km Z2.', 11, 'Z2'),
      s('activo', 'Descanso activo.'),
      s(
        'calidad',
        '2 km calentamiento + 3×1000 m en Z4 con 2 min de descanso + 2 km Z2. + Gimnasio de mantenimiento.',
        7,
        'Z4'
      ),
      s('rodaje', '6 km Z1.', 6, 'Z1'),
      s(
        'test',
        'Test de campo de umbral (10K parcial / 8K a ritmo vivo): 2 km calentamiento + 6 km a ritmo objetivo 4:45 min/km + 1 km enfriamiento.',
        9,
        'Z4'
      ),
      s('descanso', 'Descanso total.'),
      s('rodaje', '4 km Z1 regenerativo.', 4, 'Z1'),
    ],
    true
  ),
  week(14, 'Semana 14 — Intervalos Billat (VO2max)', '26 Oct – 1 Nov', 48, 4, [
    s('largo', 'Rodaje largo: 16 km Z2.', 16, 'Z2'),
    s('activo', 'Descanso activo + core.'),
    s(
      'calidad',
      'Intervalos Billat VO2max: 2 km calentamiento + 5×3 min en Z5 con 2.5 min de trote suave + 2 km enfriamiento. + Gimnasio (fuerza potencia).',
      undefined,
      'Z5'
    ),
    s('rodaje', '7 km Z1 regenerativo.', 7, 'Z1'),
    s(
      'calidad',
      'Cruceros de umbral: 2 km calentamiento + 4×1500 m en Z4 con 90 s de trote + 2 km enfriamiento.',
      10,
      'Z4'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + agilidad y neuro-primado.', 4, 'Z1'),
  ]),
  week(15, 'Semana 15 — Repeticiones de 800 m', '2 Nov – 8 Nov', 51, 4, [
    s('largo', 'Rodaje largo: 17 km Z2.', 17, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 6×800 m en Z5 con 2 min de recuperación pasiva/trote + 2 km enfriamiento. + Gimnasio.',
      8.8,
      'Z5'
    ),
    s('rodaje', '8 km Z1.', 8, 'Z1'),
    s('calidad', '2 km calentamiento + 3×2000 m en Z4 con 2 min de trote + 2 km enfriamiento.', 10, 'Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + pliometría suave.', 4, 'Z1'),
  ]),
  week(16, 'Semana 16 — Tempo Mixto Z3/Z4', '9 Nov – 15 Nov', 54, 4, [
    s('largo', 'Rodaje largo: 18 km Z2.', 18, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 5×1000 m en Z5 con 2.5 min de trote + 2 km enfriamiento. + Gimnasio.',
      9,
      'Z5'
    ),
    s('rodaje', '8 km Z1.', 8, 'Z1'),
    s('calidad', 'Tempo mixto: 2 km calentamiento + 4 km Z3 + 3 km Z4 + 1 km enfriamiento.', 10, 'Z3/Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + foot core.', 4, 'Z1'),
  ]),
  week(
    17,
    'Semana 17 — Descarga 4',
    '16 Nov – 22 Nov',
    36,
    4,
    [
      s('rodaje', 'Rodaje suave: 12 km Z2.', 12, 'Z2'),
      s('activo', 'Descanso activo.'),
      s(
        'calidad',
        '2 km calentamiento + 4×600 m en Z5 con 2 min de descanso + 2 km Z2. + Gimnasio de mantenimiento.',
        6.4,
        'Z5'
      ),
      s('rodaje', '6 km Z1.', 6, 'Z1'),
      s(
        'calidad',
        '2 km calentamiento + 4 km continuos a ritmo objetivo de 10K + 1 km enfriamiento.',
        7,
        'Z4'
      ),
      s('descanso', 'Descanso total.'),
      s('rodaje', '3 km regenerativo Z1.', 3, 'Z1'),
    ],
    true
  ),
  week(18, 'Semana 18 — Ritmo Objetivo Exacto de 10K', '23 Nov – 29 Nov', 55, 5, [
    s('largo', 'Rodaje largo: 18 km Z2.', 18, 'Z2'),
    s('activo', 'Descanso activo + core.'),
    s(
      'calidad',
      'Bloques específicos de 10K: 2 km calentamiento + 4×2000 m en Z4 al ritmo target exacto de 10K (4:30–4:45 min/km) con solo 90 s de trote de recuperación + 2 km enfriamiento. + Gimnasio (fuerza de mantenimiento).',
      12,
      'Z4'
    ),
    s('rodaje', '8 km Z1 regenerativo.', 8, 'Z1'),
    s(
      'calidad',
      'Fartlek específico: 2 km calentamiento + 8×(3 min fuerte / 1 min trote) + 2 km enfriamiento.',
      undefined,
      'Z4/Z1'
    ),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + movilidad activa.', 4, 'Z1'),
  ]),
  week(19, 'Semana 19 — La Sesión Reina (Pico de Volumen)', '30 Nov – 6 Dic', 58, 5, [
    s(
      'largo',
      'Rodaje largo específico: 19 km (12 km Z2 + 5 km a ritmo objetivo + 2 km enfriamiento).',
      19,
      'Z2/Z4'
    ),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      'La sesión reina: 2 km calentamiento + 3×3000 m a ritmo target 10K (4:30–4:40 min/km) con 2 min de recuperación al trote + 2 km enfriamiento.',
      13,
      'Z4'
    ),
    s('rodaje', '8 km Z1.', 8, 'Z1'),
    s('calidad', '2 km calentamiento + 6 km tempo + 4×200 m rápidos + 1 km enfriamiento.', 9.8, 'Z3/Z5'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + visualización táctica de carrera.', 4, 'Z1'),
  ]),
  week(20, 'Semana 20 — Transición a Tapering', '7 Dic – 13 Dic', 50, 5, [
    s('largo', 'Rodaje largo: 15 km Z2.', 15, 'Z2'),
    s('activo', 'Descanso activo.'),
    s(
      'calidad',
      '2 km calentamiento + 5×1000 m a ritmo objetivo de carrera con 60 s de descanso estricto + 2 km enfriamiento. + Gimnasio ligero.',
      9,
      'Z4'
    ),
    s('rodaje', '7 km Z1.', 7, 'Z1'),
    s('calidad', '2 km calentamiento + 5 km continuo a ritmo objetivo + 1 km enfriamiento.', 8, 'Z4'),
    s('descanso', 'Descanso total.'),
    s('rodaje', '4 km Z1 + drills de velocidad corta.', 4, 'Z1'),
  ]),
  week(
    21,
    'Semana 21 — Tapering Fase 1 (-40%)',
    '14 Dic – 20 Dic',
    33,
    6,
    [
      s('largo', 'Rodaje de tapering: 10 km Z2 con los últimos 2 km a ritmo de 10K.', 10, 'Z2/Z4'),
      s('activo', 'Descanso activo + estiramientos suaves.'),
      s(
        'calidad',
        '2 km calentamiento + 3×1000 m a ritmo objetivo con 2 min de descanso pasivo + 2 km enfriamiento (sin gimnasio pesado, solo movilidad).',
        7,
        'Z4'
      ),
      s('rodaje', '5 km Z1 muy suave.', 5, 'Z1'),
      s('calidad', '2 km calentamiento + 3 km continuos a ritmo objetivo + 1 km enfriamiento.', 6, 'Z4'),
      s('descanso', 'Descanso total.'),
      s('rodaje', '3 km Z1 + 4 progresiones de 60 m.', 3, 'Z1'),
    ],
    true
  ),
  week(
    22,
    'Semana 22 — Tapering Fase 2 (-60%)',
    '21 Dic – 27 Dic',
    22,
    6,
    [
      s('rodaje', 'Rodaje suave: 8 km Z2.', 8, 'Z2'),
      s('activo', 'Descanso activo.'),
      s(
        'calidad',
        'Activación: 2 km calentamiento + 4×400 m a ritmo objetivo de 10K con 90 s de trote + 1 km enfriamiento.',
        4.6,
        'Z4'
      ),
      s('descanso', 'Descanso total (optimizar nutrición y carbohidratos).'),
      s('rodaje', '4 km Z1 regenerativo + movilidad.', 4, 'Z1'),
      s('descanso', 'Descanso total.'),
      s('rodaje', '5 km Z2 con 3 progresiones al ritmo de carrera.', 5, 'Z2'),
    ],
    true
  ),
  week(23, 'Días Finales y Día de la Competencia', '28 Dic – 31 Dic', 19, 6, [
    s('rodaje', '6 km Z1 muy suave + 3×100 m lanzados.', 6, 'Z1'),
    s('descanso', 'Descanso total. Inicio de carga de carbohidratos. Hidratación con electrolitos.'),
    s(
      'activo',
      'Activación pre-competición: 3 km Z1 suave + 3×50 m progresivos + movilidad dinámica. Priorizar el descanso nocturno.',
      3,
      'Z1'
    ),
    s(
      'carrera',
      'Día de la competición — 10K, objetivo sub-45/50 min. Desayuno 3 h antes (1.5–2 g/kg de carbohidratos de bajo residuo). Suplementación 60 min antes: cafeína + nitratos. Calentamiento 30 min antes: 10 min trote Z1 + 5 min drills de técnica + 3×60 m progresivos + activación neuro-visomotora. Ejecución de la carrera de 10.000 metros.',
      10,
      'Z4'
    ),
  ]),
]

export const RACE_SPLITS: RaceSplit[] = [
  {
    tramo: 'Km 0 a 3',
    sub50: '5:02 – 5:05 min/km',
    sub45: '4:32 – 4:35 min/km',
    enfoque:
      'Control adrenalínico: absorber la congestión de la salida sin sprintar; mantener la cadencia objetivo sin sobre-acelerar.',
  },
  {
    tramo: 'Km 3 a 7',
    sub50: '4:58 – 5:00 min/km',
    sub45: '4:28 – 4:30 min/km',
    enfoque:
      'Crucero metabólico: anclarse en el ritmo de umbral. Cadencia fluida, respiración 2:2. Punto de máxima eficiencia mecánica.',
  },
  {
    tramo: 'Km 7 a 9',
    sub50: '4:55 – 4:58 min/km',
    sub45: '4:25 – 4:28 min/km',
    enfoque:
      'Fase crítica: tolerancia a la fatiga central con aumento de la percepción de esfuerzo (RPE). Enfocarse en el empuje horizontal de cadera.',
  },
  {
    tramo: 'Km 9 a 10',
    sub50: 'Máximo esfuerzo sostenible',
    sub45: 'Máximo esfuerzo sostenible',
    enfoque:
      'Vaciado terminal: aumentar la brazada, incrementar la frecuencia de zancada y consumir toda la reserva neuromuscular acumulada.',
  },
]

export const RUNNING_ADAPTATIONS: RunAdaptation[] = [
  {
    id: 'fatiga-sistemica',
    disparador: 'Elevación de HRV / fatiga sistémica: rMSSD por debajo de la banda normal durante 3 días consecutivos.',
    acciones: [
      'Sustituir la sesión de calidad por un rodaje en Z1 de 30 minutos o descanso total.',
      'Eliminar el entrenamiento de fuerza de esa semana.',
    ],
  },
  {
    id: 'molestia-localizada',
    disparador: 'Molestia muscular localizada: dolor que altera la biomecánica de carrera.',
    acciones: [
      'Regla de las 48 horas: cero impacto de carrera. Sustituir por bicicleta estática o elíptica al mismo tiempo y zona de FC.',
      'Si el dolor remite, reiniciar progresivamente en Z1. Si persiste, derivar a fisioterapeuta o médico deportivo.',
    ],
  },
  {
    id: 'carga-laboral-alta',
    disparador: 'Semanas de alta carga laboral o académica con restricción de tiempo.',
    acciones: [
      'Prioridad absoluta: mantener la sesión de calidad de la semana y reducir los rodajes suaves a 30 minutos.',
      'El volumen total puede descender hasta un 30% sin perder las adaptaciones metabólicas de la intensidad.',
    ],
  },
]

/** Semana del plan (1..22) correspondiente a una fecha dada. La semana 1 comienza en RUNNING_START. */
export function getRunningWeekNumber(todayISO: string): number {
  const [y1, m1, d1] = RUNNING_START.split('-').map(Number)
  const [y2, m2, d2] = todayISO.split('-').map(Number)
  const start = new Date(y1, m1 - 1, d1).getTime()
  const today = new Date(y2, m2 - 1, d2).getTime()
  const diffDays = Math.round((today - start) / 86400000)
  const numWeek = Math.floor(diffDays / 7) + 1
  return Math.min(RUNNING_TOTAL_WEEKS, Math.max(1, numWeek))
}

export function getWeekByNumber(n: number): RunWeek | undefined {
  return RUNNING_WEEKS.find((w) => w.num === n)
}
