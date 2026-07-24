/**
 * SIMF — Sistema Integrado de Movimiento para Futsal.
 * Datos sintetizados del informe "Sistema Integrado de Movimiento para Futsal (SIMF)":
 * un modelo de periodización y evaluación de 12 meses para el desarrollo de la
 * movilidad, la agilidad reactiva y la estabilidad unilateral en futsal de alto rendimiento.
 */

export type SimfMethod = {
  id: string
  nombre: string
  evidencia: string
  ventajas: string
  desventajas: string
  cuandoUsar: string
  cuandoEvitar: string
  aplicacionFutsal: string
}

export type SimfNivel = {
  nivel: number
  nombre: string
  fase: string
  objetivos: string
  duracion: string
  criteriosProgresion: string
  frecuencia: string
  volumen: string
  intensidad: string
  metricas: string
}

export type SimfFase = {
  id: string
  meses: string
  titulo: string
  foco: string
  frecuencia: string
  metodosClave: string[]
  sesionesTipo: {
    nombre: string
    duracion: string
    bloques: { n: string; ejs: string[] }[]
  }[]
  criteriosAvance: string
  notas: string
}

export type SimfEval = {
  id: string
  nombre: string
  metodologia: string
  interpretacion: string
  umbral?: string
}

export type SimfMicrociclo = {
  momento: string
  tension: 'alta' | 'baja'
  metodos: string[]
}

export const SIMF_TITLE = 'Sistema Integrado de Movimiento para Futsal (SIMF)'

export const SIMF_RESUMEN =
  'El SIMF es un modelo de periodización y evaluación de 12 meses que transforma a jugadores con rigidez severa en atletas de movimiento excepcional, optimizando la flexibilidad funcional, la agilidad reactiva, el control vestibular y la estabilidad unilateral. Integra evidencia de histología del tejido conectivo, neurofisiología sensoriomotora y biomecánica del cambio de dirección sin interferir con el desarrollo de la fuerza ni la táctica competitiva.'

export const SIMF_MESES = 12

// ---------------------------------------------------------------------------
// Métodos de flexibilidad y movilidad (análisis comparativo)
// ---------------------------------------------------------------------------

export const SIMF_METHODS: SimfMethod[] = [
  {
    id: 'estatico-pasivo',
    nombre: 'Estático Pasivo',
    evidencia: 'Sólida',
    ventajas: 'Desensibiliza nociceptores; reduce de forma aguda la rigidez neuromuscular refleja.',
    desventajas: 'Disminuye temporalmente la capacidad de aplicar fuerza explosiva y el stiffness elástico reactivo si se mantiene más de 60 segundos.',
    cuandoUsar: 'Sesiones aisladas de regeneración post-partido o en fases tempranas de readaptación.',
    cuandoEvitar: 'En el calentamiento previo a sprints, cambios de dirección o saltos explosivos.',
    aplicacionFutsal: 'Recuperación de asimetrías pasivas fuera de la pista de juego.',
  },
  {
    id: 'dinamico',
    nombre: 'Dinámico',
    evidencia: 'Sólida',
    ventajas: 'Eleva la temperatura del tejido; activa las vías aferentes propioceptivas y mejora la velocidad de conducción nerviosa.',
    desventajas: 'El aumento del rango de movimiento es temporal (20-30 minutos) y no induce sarcomerogénesis en serie de forma aislada.',
    cuandoUsar: 'Fase final de la rutina de calentamiento antes de ingresar a la pista de futsal.',
    cuandoEvitar: 'Fases agudas de lesiones musculares donde la elongación rápida pueda dañar el tejido cicatrizal.',
    aplicacionFutsal: 'Calentamiento específico en pista para preparar las demandas del juego.',
  },
  {
    id: 'balistico',
    nombre: 'Balístico',
    evidencia: 'Moderada',
    ventajas: 'Entrena la tolerancia a los cambios rápidos de longitud muscular en rangos máximos articulares.',
    desventajas: 'Activa el reflejo miotático provocando una contracción refleja violenta que limita el estiramiento real; riesgo de microdesgarros en la unión miotendinosa por aceleraciones descontroladas.',
    cuandoUsar: 'Atletas avanzados con excelente estabilidad dinámica basal y control de rangos excéntricos.',
    cuandoEvitar: 'Deportistas principiantes con rigidez severa o asimetrías articulares no resueltas.',
    aplicacionFutsal: 'Simulación de la extensión defensiva del portero de futsal al bloquear balones a portería.',
  },
  {
    id: 'pnf-cr',
    nombre: 'PNF Contract-Relax (CR)',
    evidencia: 'Sólida',
    ventajas: 'Maximiza el rango de movimiento pasivo mediante inhibición autógena posterior a la contracción isométrica.',
    desventajas: 'Requiere típicamente de un terapeuta o compañero entrenado para aplicar resistencia externa exacta; riesgo de sobreestirar estructuras pasivas si la fuerza externa es excesiva.',
    cuandoUsar: 'Sesiones de desarrollo de movilidad en días de recuperación o post-entrenamiento físico.',
    cuandoEvitar: 'Previo a competencias de fuerza reactiva o velocidad de sprint de alta intensidad.',
    aplicacionFutsal: 'Ganancia rápida de rango de movimiento en flexión/rotación de cadera y dorsiflexión de tobillo.',
  },
  {
    id: 'pnf-hr',
    nombre: 'PNF Hold-Relax (HR)',
    evidencia: 'Sólida',
    ventajas: 'Similar al CR, pero usa una contracción isométrica sin desplazamiento articular, reduciendo el estrés dinámico.',
    desventajas: 'No desarrolla fuerza muscular de forma dinámica en los nuevos rangos obtenidos; genera fatiga neuromuscular moderada del agonista.',
    cuandoUsar: 'Al final de sesiones de fuerza, para restablecer la longitud miotendinosa basal.',
    cuandoEvitar: 'Ante inestabilidad ligamentosa activa o sospecha de patología estructural no diagnosticada.',
    aplicacionFutsal: 'Reeducación de la movilidad articular en zonas con espasmo protector post-esfuerzo.',
  },
  {
    id: 'pnf-crac',
    nombre: 'PNF CRAC',
    evidencia: 'Sólida',
    ventajas: 'Combina la inhibición autógena (isometría agonista) con la inhibición recíproca (contracción activa del antagonista).',
    desventajas: 'Elevada fatiga del SNC por el alto requerimiento de coordinación y activación motora dual; riesgo de calambres agudos en rangos terminales.',
    cuandoUsar: 'Sesiones específicas de control motor y optimización de movilidad articular activa profunda.',
    cuandoEvitar: 'Atletas fatigados con coordinación intramuscular e intermuscular degradada.',
    aplicacionFutsal: 'Maximizar el rango de dorsiflexión activa mediante contracción voluntaria del tibial anterior.',
  },
  {
    id: 'loaded-stretching',
    nombre: 'Loaded Stretching / Loaded Mobility',
    evidencia: 'Sólida',
    ventajas: 'Induce sarcomerogénesis en serie y síntesis de colágeno al combinar tensión mecánica con estiramiento muscular.',
    desventajas: 'Genera un elevado nivel de fatiga local y daño muscular excéntrico controlado (DOMS prolongado); riesgo de daño estructural miotendinoso si la carga excede el límite elástico.',
    cuandoUsar: 'Bloques de fuerza e hipertrofia excéntrica; preparación específica en pretemporada.',
    cuandoEvitar: 'Fase de tapering competitivo o semanas con alta densidad de partidos oficiales de liga.',
    aplicacionFutsal: 'Fortalecimiento del aductor mayor y largo en posiciones de abducción extrema de cadera.',
  },
  {
    id: 'isometricos-largos-cortos',
    nombre: 'Isométricos Largos / Cortos',
    evidencia: 'Sólida',
    ventajas: 'Desarrollan fuerza ángulo-específica; los largos promueven hipertrofia en estiramiento y mejoran la salud del tendón.',
    desventajas: 'La transferencia de la ganancia de fuerza se limita al ángulo entrenado; riesgo de elevación de la presión arterial si se realiza una maniobra de Valsalva involuntaria.',
    cuandoUsar: 'Prevención de tendinopatías; desarrollo de fuerza estructural en rangos articulares extremos.',
    cuandoEvitar: 'Atletas con procesos inflamatorios de tendón en fase aguda hipervascularizada.',
    aplicacionFutsal: 'Fortalecimiento isométrico en flexión plantar profunda y dorsiflexión terminal de tobillo.',
  },
  {
    id: 'long-duration-stretching',
    nombre: 'Long Duration Stretching',
    evidencia: 'Limitada',
    ventajas: 'Reduce progresivamente la viscosidad miofascial; ideal para tejidos conjuntivos rígidos no contráctiles.',
    desventajas: 'Genera alta desensibilización propioceptiva sin alterar el stiffness crónico (modelo de Magnusson); riesgo de laxitud ligamentosa si la fuerza se aplica incorrectamente.',
    cuandoUsar: 'Días específicos de flexibilidad pasiva profunda en pretemporada o periodos de descanso.',
    cuandoEvitar: 'Calentamiento previo a actividades que requieran rigidez elástica reactiva inmediata en pista.',
    aplicacionFutsal: 'Elongación pasiva de la fascia plantar y el tendón de Aquiles en atletas extremadamente rígidos.',
  },
  {
    id: 'loaded-end-range',
    nombre: 'Loaded End Range',
    evidencia: 'Moderada',
    ventajas: 'Enseña al SNC a mantener el control activo y la estabilidad en los límites anatómicos del rango de movimiento.',
    desventajas: 'Exige altos niveles basales de fuerza, coordinación intra e intermuscular y control motor; riesgo de pinzamiento articular si la articulación no está alineada.',
    cuandoUsar: 'Bloque de fuerza excéntrica avanzada y optimización de estabilidad unipodal de alta demanda.',
    cuandoEvitar: 'Presencia de dolor, inestabilidad articular crónica o limitaciones anatómicas óseas no modificables.',
    aplicacionFutsal: 'Evitar el valgo dinámico de rodilla al estabilizar de forma unipodal en máxima flexión de cadera.',
  },
  {
    id: 'fascial-stretch',
    nombre: 'Fascial Stretch',
    evidencia: 'Limitada',
    ventajas: 'Busca liberar tensiones a lo largo de las líneas miofasciales de Myers de forma tridimensional e integrada.',
    desventajas: 'Difícil de cuantificar científicamente de forma aislada sin variables de control neuromuscular concomitantes.',
    cuandoUsar: 'Sesiones específicas de recuperación activa, yoga funcional o trabajo regenerativo miofascial.',
    cuandoEvitar: 'Casos de hiperlaxitud o inestabilidad articular generalizada (criterios de Beighton altos).',
    aplicacionFutsal: 'Liberación de la cadena cruzada anterior que conecta aductores y oblicuos abdominales.',
  },
  {
    id: 'stretching-eccentrico',
    nombre: 'Stretching Excéntrico',
    evidencia: 'Sólida',
    ventajas: 'Incrementa de forma demostrada la longitud de los fascículos musculares; reduce la tasa de desgarros agudos.',
    desventajas: 'Genera una marcada pérdida temporal de fuerza reactiva y propiocepción por fatiga neuromuscular; riesgo de daño por sobrecarga si no se periodiza el volumen y la recuperación.',
    cuandoUsar: 'Fase de preparación general, pretemporada y microciclos con baja carga de partidos.',
    cuandoEvitar: 'En las 72 horas previas a un partido oficial, para evitar la fatiga excéntrica en los sprints.',
    aplicacionFutsal: 'Prevención activa de roturas de isquiotibiales (Nordic Curls) y aductores (Copenhague Plank excéntrico).',
  },
]

// ---------------------------------------------------------------------------
// Niveles de progresión (0 = Persona Rígida → 5 = Profesional)
// ---------------------------------------------------------------------------

export const SIMF_NIVELES: SimfNivel[] = [
  {
    nivel: 0,
    nombre: 'Persona Rígida',
    fase: 'Desensibilización',
    objetivos: 'Reducir el espasmo neuromuscular reflejo y elevar la tolerancia del SNC al estiramiento mecánico basal.',
    duracion: '4 semanas',
    criteriosProgresion: 'Tolerar una posición de estiramiento estático prolongado durante 2 minutos, sin dolor ni contracción de defensa involuntaria palpable.',
    frecuencia: '6 sesiones semanales',
    volumen: '20 minutos por sesión',
    intensidad: 'Muy baja (estiramientos pasivos al límite del confort, en escala analógica del dolor)',
    metricas: 'Rango pasivo inicial evaluado por goniómetro clásico o inclinómetro digital.',
  },
  {
    nivel: 1,
    nombre: 'Movilidad Básica',
    fase: 'Desbloqueo articular',
    objetivos: 'Incrementar el espacio de deslizamiento capsular de caderas y tobillos empleando rotaciones lentas autocontroladas.',
    duracion: '6 semanas',
    criteriosProgresion: 'Realizar rotaciones articulares controladas (CARs) de cadera y tobillo de forma aislada y sin compensación motora lumbopélvica.',
    frecuencia: '5 sesiones semanales',
    volumen: '30 minutos por sesión',
    intensidad: 'Baja-moderada (irradiación neuromuscular de nivel basal)',
    metricas: 'Weight-Bearing Lunge Test (WBLT) para evaluar el rango de dorsiflexión del tobillo.',
  },
  {
    nivel: 2,
    nombre: 'Movilidad Funcional',
    fase: 'Control motor activo',
    objetivos: 'Desarrollar la fuerza isométrica y la capacidad contráctil de los músculos agonistas en los nuevos rangos articulares obtenidos.',
    duracion: '8 semanas',
    criteriosProgresion: 'Reducir la diferencia angular entre el rango pasivo y el activo (PROM-AROM) por debajo del umbral objetivo en flexores y aductores de cadera.',
    frecuencia: '4 sesiones semanales',
    volumen: '45 minutos por sesión',
    intensidad: 'Alta (irradiación isométrica máxima en rangos terminales, contracciones cercanas al esfuerzo voluntario máximo)',
    metricas: 'Relación entre el rango activo y el pasivo, analizada por goniómetro de brazo largo.',
  },
  {
    nivel: 3,
    nombre: 'Atleta Amateur',
    fase: 'Fuerza en estiramiento',
    objetivos: 'Promover la adición de sarcómeros en serie en isquiotibiales y aductores, y robustecer la unión musculotendinosa mediante contracciones excéntricas cargadas.',
    duracion: '10 semanas',
    criteriosProgresion: 'Ejecución técnicamente limpia del Nordic Hamstring Curl, controlando la caída libre excéntrica hasta cerca del plano horizontal.',
    frecuencia: '3 sesiones semanales',
    volumen: '45 minutos por sesión',
    intensidad: 'Muy alta (sobrecarga excéntrica con cargas externas significativas)',
    metricas: 'Fuerza excéntrica máxima cuantificada mediante celdas de carga y dinamometría manual de marco fijo.',
  },
  {
    nivel: 4,
    nombre: 'Atleta Avanzado',
    fase: 'Integración de la fuerza reactiva',
    objetivos: 'Integrar la ganancia estructural de rango de movimiento con el ciclo de estiramiento-acortamiento y la rigidez elástica reactiva lateral de la extremidad inferior.',
    duracion: '12 semanas',
    criteriosProgresion: 'Índice de Fuerza Reactiva (RSI) promedio superior a 2.0 en saltos verticales rápidos sobre plataformas de fuerza.',
    frecuencia: '3 sesiones semanales',
    volumen: '60 minutos por sesión',
    intensidad: 'Máxima (multisaltos de alta potencia, saltos profundos y frenadas excéntricas aceleradas en pista)',
    metricas: 'Índice de fuerza reactiva (RSI) y tiempo de contacto en suelo.',
  },
  {
    nivel: 5,
    nombre: 'Jugador Profesional de Futsal',
    fase: 'Mantenimiento y agilidad perceptiva',
    objetivos: 'Mantener las asimetrías de fuerza y rango por debajo del umbral lesivo, maximizar la agilidad reactiva visual y optimizar la recuperación.',
    duracion: 'Continuo a lo largo de la temporada competitiva',
    criteriosProgresion: 'Preservar el rendimiento biomecánico óptimo, ausencia de valgo dinámico de rodilla y asimetrías por debajo de la zona de riesgo durante toda la liga.',
    frecuencia: 'Microdosis diarias de 15 minutos en el calentamiento, más 2 sesiones específicas de fuerza',
    volumen: '15-20 minutos de preparación diaria, más 45 minutos de gimnasio del club',
    intensidad: 'Autorregulada según datos biométricos de fatiga y la variabilidad de la frecuencia cardíaca (HRV) diaria',
    metricas: 'Pruebas semanales de asimetría pélvica, fuerza de aductores por dinamometría de marco fijo y monitoreo de agilidad reactiva visual.',
  },
]

// ---------------------------------------------------------------------------
// Fases del macrociclo de 12 meses (bloques de 3 meses)
// ---------------------------------------------------------------------------

export const SIMF_FASES: SimfFase[] = [
  {
    id: 'I',
    meses: '1-3',
    titulo: 'Adaptación anatómica y desensibilización neural',
    foco: 'Incrementar de forma pasiva la flexibilidad muscular mediante la desensibilización de nociceptores, optimizar la hidratación de la fascia y ganar rango pasivo en caderas y tobillos.',
    frecuencia: '6 sesiones semanales · 20 min por sesión',
    metodosClave: ['Yin Yoga pasivo', 'CARs de tobillo y cadera', 'Estiramiento estático pasivo prolongado'],
    sesionesTipo: [
      {
        nombre: 'Mes 1 — Autoliberación (Yin Yoga Pasivo)',
        duracion: '20 min',
        bloques: [
          {
            n: 'Bloque único',
            ejs: [
              'Yin Yoga pasivo: posturas mantenidas 3-5 min sobre cadera e isquiotibiales, sin activación muscular voluntaria',
              'Respiración diafragmática rítmica de baja frecuencia durante cada postura',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 2 — Movilidad (Ankle & Hip CARs)',
        duracion: '20 min',
        bloques: [
          {
            n: 'Ankle & Hip CARs',
            ejs: [
              'Sentado con la rodilla bloqueada con los brazos: 3 series de 5 rotaciones circulares lentas por extremidad, buscando el límite de rango sin dolor',
              'Reducir el diámetro del círculo si aparecen ruidos articulares o sensación de pinzamiento',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 3 — Elongación profunda (Couch Stretch)',
        duracion: '20 min',
        bloques: [
          {
            n: 'Couch Stretch',
            ejs: [
              'De rodillas frente a la pared, tibia vertical apoyada, avanzando la pierna contralateral en lunge activo: 3 min por pierna con respiración diafragmática rítmica',
              'Hamstring Passive Stretch: recostado, correa no elástica en la planta del pie, tracción vertical pasiva 3 min por pierna',
            ],
          },
        ],
      },
    ],
    criteriosAvance: 'Tolerar un estiramiento estático prolongado de 2 minutos sin dolor ni defensa involuntaria; ejecutar CARs de cadera y tobillo sin compensación lumbopélvica.',
    notas: 'Sesiones realizadas de forma sistemática al final de los entrenamientos de pista o en bloques nocturnos aislados.',
  },
  {
    id: 'II',
    meses: '4-6',
    titulo: 'Expansión de rango activo y control isométrico',
    foco: 'Integrar la fuerza activa en los nuevos límites del rango de movimiento pasivo mediante isometrías terminales FRC y fortalecer las estructuras tendinosas profundas.',
    frecuencia: '4 sesiones semanales · 45 min en el gimnasio del club',
    metodosClave: ['FRC PAILs/RAILs', 'ATG Split Squat', 'Loaded End Range'],
    sesionesTipo: [
      {
        nombre: 'Mes 4 — Control articular (Tobillo PAILs/RAILs)',
        duracion: '45 min',
        bloques: [
          {
            n: 'Tobillo PAILs/RAILs',
            ejs: [
              'Lunge profundo, rodilla activa hacia adelante sobre la punta de los dedos: sostener estiramiento pasivo 2 min',
              'Contracción PAIL (empujar la punta del pie contra el suelo, hasta esfuerzo máximo) 15 s',
              'Contracción RAIL (activar voluntariamente el tibial anterior tirando del pie hacia arriba) 15 s',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 5 — Fuerza de cadera (Hip 90-90 PAILs/RAILs)',
        duracion: '45 min',
        bloques: [
          {
            n: 'Hip 90-90 PAILs/RAILs',
            ejs: [
              'Sentado con ambas piernas flexionadas formando ángulos de 90° en cadera y rodillas',
              'Sostener la rotación interna de la pierna posterior 2 min; aplicar PAIL (empujar el tobillo contra el suelo) e inmediatamente RAIL (tirar del tobillo hacia arriba), 15 s cada una',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 6 — Fuerza en estiramiento (ATG Split Squat)',
        duracion: '45 min',
        bloques: [
          {
            n: 'ATG Split Squat',
            ejs: [
              'Paso largo en lunge, descendiendo verticalmente hasta que el muslo anterior cubra la pantorrilla y la rodilla supere los dedos',
              '4 series de 8 repeticiones con tempo excéntrico de 4 segundos; progresar añadiendo mancuernas a ambos lados de la cadera',
            ],
          },
        ],
      },
    ],
    criteriosAvance: 'Reducir la diferencia PROM-AROM en flexores y aductores de cadera por debajo del umbral objetivo de la fase.',
    notas: 'Sesiones combinadas con los días de desarrollo de fuerza general del microciclo.',
  },
  {
    id: 'III',
    meses: '7-9',
    titulo: 'Integración dinámica y control motor coordinativo',
    foco: 'Desarrollar la coordinación intramuscular e intermuscular, estabilizar las posturas monopodales dinámicas y optimizar la transmisión de fuerzas en cadenas cinéticas.',
    frecuencia: '3 sesiones semanales · 45 min de movilidad coordinativa previa a la sesión táctica',
    metodosClave: ['Vinyasa Flow dinámico', 'Locomoción quadrupedal (Bear/Crab)', 'Copenhague Plank excéntrico'],
    sesionesTipo: [
      {
        nombre: 'Mes 7 — Fluidez cruzada (Vinyasa Flow Integrado)',
        duracion: '20 min',
        bloques: [
          {
            n: 'Vinyasa Flow',
            ejs: [
              'Secuencia dinámica continua: Perro boca abajo → Lunge de corredor con rotación torácica profunda → Postura del Guerrero III',
              '20 min de flujo dinámico coordinado con ciclos respiratorios lentos de diafragma y apoyo monopodal unilateral',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 8 — Balance y core (Locomoción Quadrupedal)',
        duracion: '45 min',
        bloques: [
          {
            n: 'Bear Crawl / Static Beast',
            ejs: [
              'Crawling de Oso y de Bestia con rodillas despegadas del suelo',
              'Desplazamientos contralaterales lentos hacia adelante, atrás y laterales, 1 min continuo; alternar con apoyos monopodales de mano y pie',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 9 — Fortalecimiento aductor (Copenhague Plank)',
        duracion: '45 min',
        bloques: [
          {
            n: 'Copenhague Plank Excéntrico',
            ejs: [
              'Plancha lateral apoyando la parte interna del tobillo de la pierna superior sobre un banco, cadera alineada',
              '3 series de 8 repeticiones dinámicas por pierna, bajando la cadera lentamente hasta el suelo de forma excéntrica',
            ],
          },
        ],
      },
    ],
    criteriosAvance: 'Estabilidad monopodal dinámica consistente y ejecución fluida de transiciones cruzadas sin compensación.',
    notas: 'Sesiones de integración somatosensorial previas al entrenamiento técnico-táctico en pista.',
  },
  {
    id: 'IV',
    meses: '10-12',
    titulo: 'Rendimiento de agilidad reactiva y stiffness óptimo',
    foco: 'Maximizar la agilidad reactiva con estímulos visuales, optimizar la rigidez elástica de los tendones (stiffness) y disipar fuerzas de frenado eficientemente.',
    frecuencia: '3 sesiones semanales · 30 min previas al entrenamiento táctico, en fase libre de fatiga neuromuscular',
    metodosClave: ['Drop Jumps', 'Desaceleraciones unilaterales visuales', 'Cortes de dirección reactivos', 'Entrenamiento perceptivo estroboscópico'],
    sesionesTipo: [
      {
        nombre: 'Mes 10 — Rigidez elástica (Drop Jump)',
        duracion: '30 min',
        bloques: [
          {
            n: 'Drop Jump',
            ejs: [
              'Caída libre vertical desde un cajón e inmediatamente salto vertical máximo reduciendo el tiempo de contacto',
              '4 series de 5 rebotes maximizando la reactividad elástica; regresión: Countermovement Jumps en suelo sin caída desde cajón',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 11 — Control excéntrico de frenado (Cortes Reactivos 180°)',
        duracion: '30 min',
        bloques: [
          {
            n: 'Cortes Reactivos',
            ejs: [
              'Esprintar a máxima intensidad y, ante una luz aleatoria o señal del entrenador, frenar y cambiar el vector',
              'Cortes bruscos estabilizando el tronco y bajando el centro de gravedad en el penúltimo apoyo del pie',
            ],
          },
        ],
      },
      {
        nombre: 'Mes 12 — Toma de decisiones en pista (Entrenamiento Perceptivo)',
        duracion: '30 min',
        bloques: [
          {
            n: 'Entrenamiento Perceptivo',
            ejs: [
              'Movimientos de agilidad lateral en pista leyendo y decodificando señales en pantallas intermitentes o gafas de estroboscopia',
              '3 series de 2 minutos integrando fintas laterales complejas dependientes del estímulo visual impredecible',
            ],
          },
        ],
      },
    ],
    criteriosAvance: 'RSI y tiempo de contacto en suelo dentro de rangos óptimos; ejecución segura de cortes reactivos sin valgo dinámico de rodilla.',
    notas: 'Prioridad de calidad de ejecución sobre volumen; sesiones sin acumulación de fatiga previa.',
  },
]

// ---------------------------------------------------------------------------
// Protocolos de evaluación y monitoreo
// ---------------------------------------------------------------------------

export const SIMF_EVALS: SimfEval[] = [
  {
    id: 'wblt',
    nombre: 'Weight-Bearing Lunge Test (WBLT)',
    metodologia: 'Evaluado con un dispositivo tipo LegMotion. El atleta avanza la rodilla en línea recta sobre el segundo dedo del pie intentando tocar la marca deslizante sin levantar el talón de la base de medición.',
    interpretacion: 'Mide el rango de dorsiflexión de tobillo (DROM), con una fiabilidad intra e inter-evaluador muy elevada.',
    umbral: 'Un rango insuficiente o una diferencia bilateral marcada indica restricción de dorsiflexión, forzando al talón a despegarse antes de tiempo y desviando la rodilla hacia rotación interna y valgo dinámico en cambios de dirección de 180°.',
  },
  {
    id: 'y-balance',
    nombre: 'Lower Quarter Y-Balance Test (LQYBT)',
    metodologia: 'El atleta se posiciona unipodalmente en el centro de la plantilla y desliza la placa indicadora con el pie contrario en las direcciones Anterior (A), Posteromedial (PM) y Posterolateral (PL).',
    interpretacion: 'Se calcula el Índice de Puntuación Compuesta (CS), herramienta sólidamente documentada como altamente sensible para diagnosticar déficits en la propiocepción y el control de rodilla y cadera.',
    umbral: 'Una puntuación compuesta (CS) baja en la extremidad inferior se asocia con un aumento de hasta 3.5 veces en el riesgo de sufrir lesiones musculares y esguinces agudos de los ligamentos laterales del tobillo.',
  },
  {
    id: 'dinamometria-aductores',
    nombre: 'Dinamometría de aductores y abductores de cadera',
    metodologia: 'Dinamometría de marco fijo (sistemas tipo KangaTech o VALD) con el atleta en posición supina, cadera y rodillas flexionadas.',
    interpretacion: 'Se controla la asimetría de fuerza entre la pierna dominante (kicking limb) y la no dominante, junto con el ratio aductor:abductor.',
    umbral: 'Una asimetría elevada o un ratio aductor:abductor bajo es el principal indicador clínico de sobrecarga mecánica excéntrica del aductor largo, predisponiendo a roturas fibrilares o dolor púbico en giros e impactos asimétricos.',
  },
  {
    id: 'rsi-agilidad',
    nombre: 'Índice de Fuerza Reactiva (RSI) y biomecánica del corte',
    metodologia: 'Captura de movimiento optoelectrónico (MoCap) con cámaras infrarrojas y plataformas de fuerza sincronizadas, o sensores inerciales portátiles (IMUs) en pelvis/tobillo durante el entrenamiento táctico en pista.',
    interpretacion: 'Métricas clave: momento de abducción de rodilla (KAM), trayectoria del centro de masa (COM) en el paso penúltimo y tiempo de contacto total en el suelo.',
    umbral: 'Un RSI promedio superior a 2.0 en saltos verticales rápidos indica buena capacidad reactiva; el colapso dinámico de rodilla sin flexión adecuada al plantar el pie eleva drásticamente el riesgo sobre el ligamento cruzado anterior.',
  },
]

// ---------------------------------------------------------------------------
// Microciclo semanal: temporización de cargas según proximidad al partido
// ---------------------------------------------------------------------------

export const SIMF_MICROCICLO: SimfMicrociclo[] = [
  {
    momento: 'Partido -48h',
    tension: 'alta',
    metodos: ['FRC terminal (PAILs/RAILs)', 'Excéntrico cargado (Nordic Curls / ATG)'],
  },
  {
    momento: 'Partido -24h',
    tension: 'baja',
    metodos: ['CARs diarios fluidos', 'Activación DNS / presión intraabdominal (IAP)', 'Entrenamiento visual estroboscópico', 'Movilidad activa general (Vinyasa)'],
  },
]
