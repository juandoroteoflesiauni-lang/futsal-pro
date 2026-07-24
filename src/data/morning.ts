export type MorningExercise = {
  id: string
  nombre: string
  params: string
  desc: string
  err: string
  nota: string
  /** First mesocycle when this exercise appears (1–9) */
  fromMc?: number
}

export type MorningBlock = {
  id: string
  nombre: string
  duracion: string
  objetivo: string
  ejercicios: MorningExercise[]
}

export type MorningMcMeta = {
  mc: number
  semanas: string
  duracion: string
  cambio: string
}

export const MORNING_MC: MorningMcMeta[] = [
  { mc: 1, semanas: '1–4', duracion: '~12 min', cambio: 'Versión base. Aprender técnica. Sostenes de 3–5 s en postural.' },
  { mc: 2, semanas: '5–8', duracion: '~14 min', cambio: 'Sostenes posturales a 5 s. +2 repeticiones en movilidad.' },
  { mc: 3, semanas: '9–12', duracion: '~15 min', cambio: 'Se agrega extensión torácica. +1 ejercicio facial.' },
  { mc: 4, semanas: '13–16', duracion: '~16 min', cambio: 'Sostenes a 8 s. Bloque facial completo.' },
  { mc: 5, semanas: '17–20', duracion: '~17 min', cambio: 'Se agrega bird-dog suave al final del Bloque 3.' },
  { mc: 6, semanas: '21–24', duracion: '~17 min', cambio: 'Mantener dosis; foco en calidad de ejecución.' },
  { mc: 7, semanas: '25–28', duracion: '~18 min', cambio: 'Sostenes posturales a 10 s. Hábito consolidado.' },
  { mc: 8, semanas: '29–32', duracion: '~18 min', cambio: 'Igual que MC7 — no sumar fatiga en fase de alta carga.' },
  { mc: 9, semanas: '33–36', duracion: '~14 min', cambio: 'Tapering: menos bird-dog/core, alineado al plan principal.' },
]

export const MORNING_BLOCKS: MorningBlock[] = [
  {
    id: 'luz',
    nombre: 'Luz e hidratación',
    duracion: '2 min',
    objetivo: 'Sincronizar ritmo circadiano y rehidratar tras la noche.',
    ejercicios: [
      {
        id: 'luz-natural',
        nombre: 'Exposición a luz natural',
        params: '2–3 min',
        desc: 'Abrir cortinas o salir a un balcón apenas te levantás. Mirar hacia luz natural sin mirar directo al sol.',
        err: 'Revisar el celular antes (luz artificial + estrés no cumple la misma función).',
        nota: 'Sincroniza el reloj circadiano; mejora alerta y sueño esa noche.',
      },
      {
        id: 'agua',
        nombre: 'Hidratación inicial',
        params: '300–500 ml de agua',
        desc: 'Tomar un vaso grande de agua apenas te levantás, antes del café o mate.',
        err: 'Tomar solo café/mate como primer líquido del día.',
        nota: 'Rehidratación tras 7–8 h sin ingesta líquida.',
      },
    ],
  },
  {
    id: 'movilidad',
    nombre: 'Movilidad articular general',
    duracion: '4–7 min',
    objetivo: 'Reducir rigidez matutina de cuello, hombros, columna, cadera y tobillo.',
    ejercicios: [
      {
        id: 'cervicales',
        nombre: 'Rotaciones cervicales',
        params: '2 × 6 rotaciones/lado',
        desc: 'De pie o sentado, girar la cabeza lentamente en círculo completo, sin forzar el final del rango.',
        err: 'Hacerlo rápido o con tirones.',
        nota: 'Reduce rigidez cervical matutina.',
      },
      {
        id: 'hombros',
        nombre: 'Círculos de hombros',
        params: '2 × 10 (5 adelante, 5 atrás)',
        desc: 'Círculos amplios y lentos, sintiendo el movimiento en el omóplato, no solo en el brazo.',
        err: 'Círculos pequeños solo con el húmero.',
        nota: 'Moviliza la cintura escapular.',
      },
      {
        id: 'gato',
        nombre: 'Gato-camello',
        params: '8–10 repeticiones',
        desc: 'En cuadrupedia, alternar arquear (mirando arriba) y redondear (mirando el ombligo) toda la columna.',
        err: 'Mover solo la zona lumbar y no la torácica.',
        nota: 'Moviliza toda la columna tras la inmovilidad del sueño.',
      },
      {
        id: 'torax',
        nombre: 'Rotación torácica de pie',
        params: '2 × 8/lado',
        desc: 'Manos detrás de la nuca, rotar el tronco llevando un codo hacia atrás, pelvis fija mirando al frente.',
        err: 'Rotar desde la cadera en vez de la columna torácica.',
        nota: 'Prepara la zona media para el entrenamiento del día.',
      },
      {
        id: 'cadera',
        nombre: 'Círculos de cadera de pie',
        params: '2 × 8/lado',
        desc: 'Manos en la cintura, círculos amplios de cadera como si sostuvieras un aro.',
        err: 'Mover solo la zona lumbar.',
        nota: 'Moviliza la articulación coxofemoral.',
      },
      {
        id: 'tobillo',
        nombre: 'Círculos de tobillo',
        params: '10 círculos/lado, ambas direcciones',
        desc: 'Sentado o apoyado en una pared, círculos completos y lentos de tobillo.',
        err: 'Rango incompleto o muy rápido.',
        nota: 'Un tobillo móvil descarga la rodilla — clave para tu plan principal.',
      },
    ],
  },
  {
    id: 'postura',
    nombre: 'Corrección postural',
    duracion: '5–8 min',
    objetivo: 'Trabajo evidenciado para cabeza adelantada y hombros redondeados.',
    ejercicios: [
      {
        id: 'chin-tuck',
        nombre: 'Chin tuck (retracción cervical)',
        params: 'MC1–2: 3×5 s · MC3–6: 3×8 s · MC7–9: 3×10 s',
        desc: 'Llevar el mentón hacia atrás (doble mentón intencional) sin inclinar la cabeza. Mirada al frente.',
        err: 'Inclinar la cabeza hacia abajo en vez de retraerla horizontalmente.',
        nota: 'El ejercicio con más respaldo para postura de cabeza adelantada.',
      },
      {
        id: 'wall-angels',
        nombre: 'Wall angels',
        params: '2 × 8 repeticiones',
        desc: 'Espalda, glúteos y cabeza contra la pared. Brazos en W, deslizar hacia arriba sin despegar muñecas ni codos.',
        err: 'Despegar la lumbar de la pared o los codos durante el deslizamiento.',
        nota: 'Fortalece estabilizadores de la escápula.',
      },
      {
        id: 'pectoral',
        nombre: 'Estiramiento pectoral en marco de puerta',
        params: '2 × 20–30 s/lado',
        desc: 'Antebrazo en el marco a 90°, dar un paso adelante rotando levemente el tronco.',
        err: 'Elevar el hombro durante el estiramiento.',
        nota: 'Libera tensión pectoral que arrastra los hombros hacia adelante.',
      },
      {
        id: 'escapular',
        nombre: 'Retracción escapular isométrica',
        params: 'MC1–4: 2×8 × 3 s · MC5–9: 2×10 × 5 s',
        desc: 'Juntar los omóplatos como si sostuvieras un lápiz entre ellos, sin encoger los hombros.',
        err: 'Encoger los hombros hacia las orejas en vez de retraer.',
        nota: 'Fortalece romboides y trapecio medio.',
      },
      {
        id: 'ext-torax',
        nombre: 'Extensión torácica con toalla',
        params: '2 × 8 repeticiones',
        desc: 'Toalla enrollada bajo zona media de la espalda. Manos detrás de la nuca, dejar caer el tronco superior suavemente.',
        err: 'Hacerlo sobre la zona lumbar en vez de la torácica.',
        nota: 'Contrarresta hipercifosis del síndrome cruzado superior.',
        fromMc: 3,
      },
      {
        id: 'bird-dog',
        nombre: 'Bird-dog suave',
        params: '2 × 6/lado',
        desc: 'En cuadrupedia, extender brazo y pierna opuestos manteniendo columna neutra, sin rotar la cadera.',
        err: 'Rotar la pelvis o arquear la lumbar al extender.',
        nota: 'Activa el core postural. Se reduce en MC9 (tapering).',
        fromMc: 5,
      },
    ],
  },
  {
    id: 'facial',
    nombre: 'Tono facial y cervical',
    duracion: '3–5 min',
    objetivo: 'Activación muscular facial y del cuello con expectativas realistas — tono, no “reducción” de grasa.',
    ejercicios: [
      {
        id: 'chin-resist',
        nombre: 'Chin tuck resistido con mano',
        params: 'MC1–3: 2×8 s · MC4–9: 3×10 s',
        desc: 'Igual que el chin tuck, con palma en frente o bajo mentón resistiendo suavemente.',
        err: 'Empujar con fuerza excesiva — la resistencia debe ser suave.',
        nota: 'Activa flexores profundos del cuello y platisma.',
      },
      {
        id: 'sonrisa',
        nombre: 'Sonrisa resistida',
        params: '2 × 10 × 3 s',
        desc: 'Labios cerrados, sonreír llevando comisuras hacia los lados mientras 2 dedos ofrecen resistencia leve.',
        err: 'Sonreír solo con la boca sin involucrar el músculo.',
        nota: 'Tono del cigomático (mecanismo del estudio Northwestern 2018).',
      },
      {
        id: 'cejas',
        nombre: 'Elevación de cejas resistida',
        params: '2 × 8 × 3 s',
        desc: 'Dedos sobre las cejas, intentar elevarlas contra la resistencia.',
        err: 'Arrugar la frente en vez de elevar limpiamente.',
        nota: 'Tono del músculo frontal.',
      },
      {
        id: 'platisma',
        nombre: 'Estiramiento de platisma',
        params: 'MC1–3: 2×15 s · MC4–9: 2×20 s',
        desc: 'Cabeza ligeramente atrás, tensar suavemente la piel del cuello bajando comisuras (mueca leve).',
        err: 'Extender el cuello en exceso o forzar la mueca.',
        nota: 'Trabaja el músculo superficial del cuello.',
      },
      {
        id: 'mejillas',
        nombre: 'Mejillas infladas suaves',
        params: '2 × 8 × 3 s',
        desc: 'Inflar mejillas con aire de forma suave (no al máximo) y sostener, moviendo el aire de lado a lado.',
        err: 'Inflar al máximo o de forma brusca — con brackets puede friccionar.',
        nota: 'Siempre suave por los brackets.',
        fromMc: 4,
      },
    ],
  },
  {
    id: 'oral',
    nombre: 'Hábito de postura oral',
    duracion: '1 min',
    objetivo: 'Consciencia de reposo de lengua y labios — hábito suave, nunca fuerza activa.',
    ejercicios: [
      {
        id: 'reposo',
        nombre: 'Hábito de reposo oral y lengua',
        params: '1 min de atención consciente',
        desc: 'Labios juntos SIN apretar. Dientes ligeramente separados. Lengua apoyada suave contra el paladar, sin presión. Respiración nasal.',
        err: 'Presionar la lengua con fuerza buscando “empujar” la mandíbula, o apretar los dientes.',
        nota: 'NO es ejercicio correctivo óseo. No hacer mewing forzado (AAO 2024).',
      },
    ],
  },
]

export const MORNING_EXCLUSIONS = [
  '“Mewing” forzado o empuje de lengua contra el paladar buscando reposicionar la mandíbula',
  'Jaw exercisers o chicles de ejercicio mandibular (riesgo brackets + hipertrofia masetero)',
  'Apretar o rechinar dientes como “ejercicio”',
  'Ejercicios faciales bruscos que friccionen mejillas/labios contra brackets',
  'Expectativa de remodelar hueso mandibular con ejercicio en la adultez',
]

export function morningExercisesForMc(mc: number): MorningBlock[] {
  return MORNING_BLOCKS.map((block) => ({
    ...block,
    ejercicios: block.ejercicios.filter((e) => {
      if (e.fromMc && e.fromMc > mc) return false
      // MC9 tapering: drop bird-dog
      if (mc === 9 && e.id === 'bird-dog') return false
      return true
    }),
  }))
}
