export type Exercise = {
  nombre: string
  params: string
  rpe: number | string
  rest: string
  desc: string
  err: string
  alt: string
}
export type Block = { n: string; dur: string; ejs: Exercise[] }
export type Session = {
  titulo: string
  objetivo: string
  dur: string
  warn: string | null
  cal: Exercise[]
  bloques: Block[]
  enf: Exercise[]
}

const x = (nombre: string, params: string, rpe: number | string, rest: string, desc: string, err: string, alt: string): Exercise => ({ nombre, params, rpe, rest, desc, err, alt });

const CAL = {
  bici:    x("Bicicleta estática","5 min · 80 RPM",3,"–","Sillín alto: rodilla queda ~10° en el punto más bajo del pedaleo. Tronco erguido. Activar gradualmente la circulación.","Sillín bajo → mayor compresión patelofemoral.","Elíptica a resistencia mínima."),
  puente:  x("Puente glúteo bilateral isométrico","3 × 25 seg (descanso 10 s)",4,"10 s","Boca arriba, rodillas 90°. Elevar pelvis desde los talones. Contraer glúteo al máximo. Alinear hombros-caderas-rodillas.","Hiperextensión lumbar al elevar. Empuje desde los dedos.","Pies más alejados para menor flexión de rodilla."),
  tobillo: x("Movilidad tobillo contra pared","2 × 10 rep / lado",3,"30 s","De pie a 5 cm de la pared. Llevar la rodilla al frente sin despegar el talón. Rodilla apuntando sobre el 2° dedo del pie.","Despegar el talón. Rodilla que colapsa hacia adentro.","Sentado: rotaciones activas de tobillo."),
  wall45:  x("Wall squat isométrico 45°","3 × 15 seg",4,"30 s","Espalda en la pared. Deslizar hasta EXACTAMENTE 45°. Cuádriceps activos. NO bajar de 45° sin autorización profesional.","Descender más de 45°. Rodillas en valgo.","Quad set: aplastar toalla bajo rodilla extendida."),
  torax:   x("Rotaciones torácicas en cuadrupedia","2 × 10 rep / lado",3,"30 s","En cuadrupedia. Mano en nuca, rotar el codo hacia el techo. Pelvis completamente fija. Seguir el movimiento con la mirada.","Rotar desde la cadera en lugar de la columna torácica.","Rotación torácica sentado en silla."),
};

const UP = {
  eliptica: x("Elíptica","20 min continuos · FC 60–70%",5,"–","Pies planos sobre las plataformas. Usar brazos para distribuir la carga. No inclinar el tronco al frente. FC objetivo: 115–135 lpm.","Talones que se levantan. Tronco excesivamente inclinado.","Bicicleta estática 20 min a 80–90 RPM."),
  bici_c:   x("Bicicleta estática (sesión cardio)","Sem 1: 30 min · Sem 2: 35 min · Sem 3: 40 min",4,"–","Sillín alto. 80–90 RPM. Resistencia baja. FC 60–65% (zona 2: puedes mantener conversación).","Sillín bajo. Intensidad excesiva >75% FCmáx.","Elíptica a resistencia mínima."),
  pm_s:     x("Press militar con barra sentado","Sem 1: 3×10 · Sem 2–3: 4×10 · Sem 4: 3×8 ↓",7,"90 s","Banco vertical 90°. Espalda apoyada. Barra al nivel del mentón al bajar. Empujar vertical sin arquear lumbar. Codos ligeramente adelante.","Hiperextensión lumbar al final. Codos muy abiertos.","Press de hombros con mancuernas."),
  remo_p:   x("Remo polea baja al pecho","Sem 1: 3×12 · Sem 2–3: 4×12 · Sem 4: 3×10 ↓",7,"90 s","Rodillas casi bloqueadas. Tracción al abdomen bajo. Escápulas retraídas al final (1 s). Tempo de bajada: 2 s. Tronco estable.","Balanceo de tronco. Encogimiento de hombros al terminar.","Remo unilateral con mancuerna apoyado en banco."),
  jalon:    x("Jalón al pecho (polea alta)","Sem 1: 3×12 · Sem 2–3: 4×10 · Sem 4: 3×10 ↓",7,"90 s","Agarre algo más ancho que los hombros. Tracción al esternón con el pecho expandido. No balancear el tronco. Escápula deprimida.","Balanceo de tronco. Llevar la barra detrás de la nuca.","Jalón unilateral con agarre neutro."),
  flex:     x("Flexiones (Push-ups)","Sem 1: 3×10 · Sem 2–3: 3×15 · Sem 4: 2×12 ↓",6,"60 s","Cuerpo recto de talones a cabeza. Descender hasta rozar el suelo. Codos a ~45° del tronco. Empuje explosivo al subir.","Caída de caderas. Codos muy abiertos o pegados al cuerpo.","Manos en banco elevado."),
  curl:     x("Curl bíceps mancuernas alternado","Sem 1: 3×12/lado · Sem 2–3: 3×12 · Sem 4: 2×10 ↓",6,"60 s","Sin balanceo de tronco. Supinación completa al elevar. Bajar en 2 s controlado. Codo pegado al costado.","Balanceo de tronco para generar inercia.","Curl en polea baja."),
  planch:   x("Plancha frontal isométrica","Sem 1: 3×30 s · Sem 2: 3×40 s · Sem 3: 3×45 s · Sem 4: 2×40 s ↓",5,"60 s","Antebrazos bajo hombros. Cuerpo en línea recta. Contraer abdomen Y glúteos simultáneamente. Respirar normal durante la isometría.","Pelvis que cae. Glúteos demasiado elevados. Apnea.","Plancha con rodillas apoyadas en el suelo."),
  planch_l: x("Plancha lateral isométrica","Sem 1–2: 3×20 s/lado · Sem 3: 3×30 s · Sem 4: 2×25 s ↓",6,"60 s","Codo bajo el hombro. Pelvis elevada. Línea recta desde el hombro hasta el talón externo. No rotar el tronco.","Pelvis que cae. Rotación del tronco hacia el frente.","Plancha lateral con rodilla inferior apoyada a 90°."),
  pallof:   x("Press Pallof con banda","Sem 1–3: 3×12/lado · Sem 4: 2×10 ↓",5,"45 s","Perpendicular a la banda. Microflexión de rodillas. Empujar la banda al frente resistiendo la rotación del tronco. Volver lento.","Girar la pelvis para resistir. Perder la microflexión de rodillas.","Press Pallof arrodillado bilateral."),
  dead_b:   x("Dead bug","Sem 1: 3×8/lado · Sem 2–3: 3×10/lado · Sem 4: 2×8 ↓",5,"60 s","Boca arriba, brazos al techo, piernas a 90°. Extender brazo derecho + pierna izquierda. Lumbar pegada al suelo. Exhalar al extender.","Lumbar que se despega del suelo. Apnea durante el movimiento.","Bird-dog en cuadrupedia."),
};

const LO = {
  clamsh:  x("Clamshell con banda (almeja)","Sem 1: 3×15/lado · Sem 2–3: 3×20/lado · Sem 4: 2×15 ↓",4,"45 s","De lado, rodillas 90°. Banda encima de rodillas (NO sobre la articulación). Elevar rodilla superior sin rotar pelvis. Contraer glúteo medio al máximo.","Pelvis que rota hacia atrás compensando. Talones que se separan.","Sin banda. Toalla bajo rodilla derecha si hay fricción."),
  quad_s:  x("Isometría cuádriceps (Quad set)","4 × 10 contracciones de 10 s / pierna",5,"30 s","Boca arriba, toalla bajo rodilla derecha. Aplastar la toalla contrayendo cuádriceps al máximo 10 s. Efecto analgésico demostrado para dolor patelofemoral.","Contraer al 100% si genera dolor >3/10 en la rótula.","Reducir contracción al 50–70% si hay dolor."),
  rdl:     x("RDL bilateral con mancuernas","Sem 1: 3×12 sin carga · Sem 2: 4×12 ligero · Sem 3: 4×10 · Sem 4: 3×10 ↓",7,"90 s","Pies al ancho de hombros. Bisagra de cadera hacia atrás. Rodillas casi bloqueadas (~10–15°). Espalda neutra. Bajar hasta tensión tolerable en isquiotibiales.","Redondear la espalda lumbar. Doblar las rodillas (se convierte en sentadilla).","Puente de glúteo unilateral en suelo."),
  copen:   x("Copenhagen plank nivel 1","Sem 1–2: 3×15 s/lado · Sem 3: 3×20 s · Sem 4: 2×20 s ↓",6,"60 s","Plancha lateral con cara INTERNA de rodilla superior apoyada en banco bajo. Rodilla inferior en el suelo. Alta activación de aductores.","Apoyar el tobillo en lugar de la rodilla (cambia el brazo de palanca).","Aducción isométrica apretando balón blando entre rodillas (supino)."),
  calf:    x("Elevación de talones (Calf raises)","Sem 1: 3×15 · Sem 2–3: 4×15 · Sem 4: 3×12 (bajar 3 s) ↓",6,"60 s","Rodillas extendidas (énfasis gastrocnemio). Elevar al máximo. Bajar en 3 s de forma controlada. Alternar con rodillas ligeramente flexionadas (sóleo).","No llegar a la elevación máxima. Bajar muy rápido.","Elevación de talones sentado con peso en los muslos."),
  prensa:  x("Prensa de piernas (0–60°)","Sem 1: 3×15 ligero · Sem 2–3: 4×12 · Sem 4: 3×10 ↓",6,"90 s","NUNCA bajar más de 60° en esta fase. Pies en posición media de la plataforma. Empujar desde los talones. Rodillas sobre el 2° dedo.","Descender más de 60°. Rodillas que colapsan hacia adentro.","Wall squat isométrico sin carga."),
  hip_su:  x("Puente glúteo unilateral en suelo","Sem 1–2: 3×12/lado · Sem 3: 3×15/lado · Sem 4: 2×12 ↓",5,"60 s","Boca arriba. Pie de trabajo cerca del glúteo. Elevar desde el talón. Cadera nivelada (no dejar caer el lado libre). Aguantar 1 s arriba.","Caída del lado libre de la cadera. Empuje desde los dedos del pie.","Puente bilateral."),
  equil:   x("Equilibrio estático unipodal","Sem 1: 3×20 s/pierna · Sem 2: 3×30 s · Sem 3–4: 3×40 s",4,"45 s","Microflexión de 5° en la rodilla. Brazos cruzados en el pecho. Vista fija en un punto. Comenzar siempre con la pierna sana.","Hiperextensión de rodilla al 'bloquear'. Mirar hacia abajo.","Apoyo ligero con dos dedos en una barra fija."),
  suela:   x("Técnica con balón: control con suela","4 × 2 min continuos (1 min descanso)",3,"60 s","Sentado o de pie fijo. Trazar figuras con la suela sobre el balón (círculos, ochos, alternancia). Contacto suave. No mirar el balón.","Mirar siempre el balón. Golpear en lugar de deslizar.","Completamente sentado si hay carga en la rodilla de pie."),
};

const MV = {
  dors_b:  x("Dorsiflexión tobillo con banda","4 × 12 rep/tobillo · Sem 4: 3×12 ↓",3,"30 s","Banda en parte anterior del tobillo, anclada abajo. Un paso adelante. Llevar rodilla dinámicamente sobre 2° dedo. Talón NO puede despegarse del suelo.","Despegar el talón. Rodilla que colapsa hacia adentro.","Dorsiflexión activa sin banda apoyando el pie en la pared."),
  r9090:   x("Rotación cadera 90/90","Sem 1–2: 3×8 transiciones · Sem 3: 3×10 · Sem 4: 2×8 ↓",3,"45 s","Sentado, ambas rodillas a 90°. Pivotar sobre los talones para cambiar de lado. Sin apoyar las manos si es posible. Espalda erguida.","Usar manos para empujar. Inclinar el tronco en vez de rotar la cadera.","Pasivo boca arriba si hay dolor referido en la rodilla."),
  psoas_d: x("Estiramiento dinámico de psoas","3 × 10 rep / lado",3,"45 s","Zancada baja. Contraer el glúteo trasero activamente. Empujar la pelvis al frente. El movimiento lo genera el glúteo, no el tronco. Rodilla delantera a 90°.","Empujar el tronco sin activar el glúteo.","Estiramiento pasivo en el borde de una cama."),
  aduc_d:  x("Estiramiento dinámico aductores (cuadrupedia)","3 × 12 rep",3,"45 s","En cuadrupedia. Llevar una pierna lateralmente con pie apoyado. Desplazar la pelvis hacia el talón lentamente hasta sentir estiramiento interno.","Extensión excesiva sin control pélvico.","Mariposa pasiva sentado."),
  isquio:  x("Estiramiento isquiotibiales con toalla (supino)","3 × 45 s / pierna",3,"30 s entre piernas","Boca arriba. Toalla en la planta del pie. Elevar la pierna extendida. Pierna opuesta apoyada plana en el suelo.","Redondear la espalda para subir más. Rodilla que se dobla.","Rodilla derecha: mantener 5–10° de flexión de seguridad."),
  foam:    x("Foam roller (liberación miofascial)","60 s por zona: cuáds → IT band → isquios → glúteo",2,"continuo","Deslizar muy lento (1–2 cm/s). Pausa 20–30 s en puntos de tensión. Respirar profundo. NUNCA pasar sobre la articulación de la rodilla.","Rodar demasiado rápido. Presionar directamente sobre la rótula.","Pelota de tenis para puntos de tensión localizados."),
};

const CO = {
  camin:   x("Caminata de descompresión","3 min suave",2,"–","Marcha lenta alrededor del espacio. Inspirar 4 s, exhalar 6–8 s. FC debe bajar a <100 lpm antes de sentarse.","Sentarse inmediatamente después del esfuerzo.","Obligatoria — no tiene alternativa."),
  estir_q: x("Estiramiento cuádriceps decúbito prono","2 × 45 s / pierna",2,"–","Boca abajo. Llevar el tobillo hacia el glúteo con una correa. Sin levantar la cadera del suelo. Sin rebotes.","Forzar el rango final. Levantar la cadera del suelo.","Rodilla derecha: parar si hay dolor >3/10 en el polo inferior de la rótula."),
  resp:    x("Respiración diafragmática","2–3 min tumbado",1,"–","Boca arriba. Inspirar por nariz 4 s (abdomen sube, no el pecho). Exhalar por boca 6–8 s. Activa el nervio vago → recuperación parasimpática.","Respirar solo con el pecho (no activa el nervio vago).","Fundamental. Sin alternativa."),
  pedal_s: x("Pedaleo suave post-cardio","4 min · 40–50 RPM · resistencia cero",2,"–","Resistencia a cero. Movimiento lento y suave. FC debe bajar a <100 lpm.","Parar abruptamente la bicicleta sin desaceleración.","Caminata de descompresión si no hay bicicleta."),
  isquio_s:x("Estiramiento cadena posterior con toalla (supino)","2 × 45 s / pierna",2,"–","Boca arriba. Correa en la planta del pie. Elevar la pierna extendida. Rodilla derecha: 5–10° de flexión de seguridad.","Tirar con fuerza para llegar más alto. Redondear la espalda.","Sin alternativa. Ajustar el rango."),
  psoas_s: x("Estiramiento psoas posición Siriaco","60 s / pierna",2,"–","Boca arriba al borde de una cama. Dejar caer una pierna por gravedad. Abrazar rodilla opuesta al pecho para estabilizar la pelvis.","Hiperextensión lumbar al dejar caer la pierna sin control.","Sin alternativa."),
};

const RC = {
  // Bloque 1 — Activación suave (parte del "cal")
  activ1:  x("Caminata suave o bicicleta muy ligera","5 min continuos",2,"–","Ritmo muy suave, sin buscar entrenar. El objetivo es activar la circulación, no generar fatiga. Puede ser al aire libre o en bicicleta estática sin resistencia.","Acelerar el ritmo pensando 'ya que estoy, entreno un poco'.","Si hay molestia, reemplazar directamente por el ejercicio de movilidad articular."),
  activ2:  x("Movilidad articular en cadena","2 rondas de 10 rep por articulación",2,"–","Recorrer cada articulación de abajo hacia arriba con círculos suaves: tobillos, rodillas, caderas, columna y hombros. Sin forzar ningún rango en ningún punto.","Saltearse articulaciones o hacerlo muy rápido sin control consciente.","Reducir el rango en la rodilla derecha si hay molestia ese día."),
  // Bloque 2 — Rehabilitación y control motor de rodilla
  quad_iso: x("Isometría cuádriceps prolongada (Quad set)","4 × 12 seg / pierna",3,"20 s","Boca arriba con una toalla enrollada bajo la rodilla. Aplastar la toalla contrayendo el cuádriceps 12 segundos. Tiene efecto analgésico documentado en dolor patelofemoral y no genera carga articular.","Contraer con dolor: debe sentirse tensión muscular, nunca dolor en la rótula.","Reducir la contracción al 50% si aparece cualquier molestia."),
  glut_act: x("Activación de glúteo medio (Clamshell)","2 × 15 rep / lado",3,"30 s","De lado, rodillas a 90°. Elevar la rodilla superior sin rotar la pelvis hacia atrás. La debilidad de glúteo medio es uno de los factores más asociados al dolor femoropatelar.","Rotar la pelvis hacia atrás para ganar rango ('hacer trampa').","Sin banda elástica, solo el movimiento activo y controlado."),
  patela:   x("Movilización patelar autoasistida","1 min / rodilla (solo si no hay inflamación activa)",2,"–","Sentado con la pierna extendida y el cuádriceps relajado. Con los dedos, deslizar suavemente la rótula hacia arriba, abajo y hacia los costados. Mantiene la movilidad del tejido periarticular.","Presionar fuerte o realizarlo si hay inflamación visible ese día.","Omitir por completo si hay dolor, calor o hinchazón — pasar directo al siguiente ejercicio."),
  mini_sq:  x("Mini sentadilla con control (0–30°)","2 × 10 rep, bajada de 4 s",3,"30 s","De pie, descender solo 20–30° controlando que la rodilla se mantenga alineada sobre el segundo dedo del pie. Busca reforzar el patrón de movimiento, no generar fatiga.","Bajar más de 30° o dejar que la rodilla colapse hacia adentro (valgo).","Apoyar las manos en una silla para mayor control y confianza."),
  // Bloque 3 — Flexibilidad global (estiramiento estático prolongado)
  isq_str:  x("Isquiotibiales con correa (supino)","2 × 90 seg / pierna",3,"20 s","Boca arriba, correa o toalla en la planta del pie. Elevar la pierna extendida hasta sentir tensión, nunca dolor. Los estiramientos largos (60–90 s) son más efectivos para ganar rango cuando se hacen fuera del entrenamiento.","Rebotar para ganar más rango: el estiramiento debe ser sostenido y estático.","Rodilla derecha: mantener 5–10° de flexión de seguridad."),
  cuad_str: x("Cuádriceps de pie o de lado","2 × 90 seg / pierna",3,"20 s","De pie sujetándose de un apoyo, llevar el talón hacia el glúteo sosteniendo el tobillo. Cadera en ligera retroversión, rodillas juntas.","Arquear la espalda baja para compensar la falta de rango de cadera.","Hacerlo acostado de lado si el equilibrio de pie genera inseguridad."),
  psoas_str:x("Flexores de cadera (psoas) en semi-arrodillado","2 × 60–90 seg / lado",3,"20 s","Zancada baja con la rodilla trasera apoyada sobre algo blando. Contraer el glúteo trasero y empujar la pelvis hacia adelante manteniendo el tronco erguido.","Empujar solo con el tronco sin activar el glúteo trasero.","Colocar una almohada bajo la rodilla trasera si el apoyo molesta."),
  aduc_str: x("Aductores — Mariposa","1 × 2 min",2,"–","Sentado, plantas de los pies unidas. Dejar caer las rodillas por gravedad sin empujar con los codos. Respirar profundo mientras se sostiene.","Empujar las rodillas hacia abajo con fuerza en vez de dejarlas relajar.","Sin restricción para la rodilla."),
  gem_str:  x("Gemelos y sóleo contra pared","2 × 60 seg / pierna (rodilla extendida y luego flexionada)",3,"15 s","Manos en la pared, pierna a estirar atrás. Primero con la rodilla extendida (gemelo), luego ligeramente flexionada (sóleo). Talón siempre apoyado en el suelo.","Despegar el talón del suelo durante el estiramiento.","Sin restricción para la rodilla."),
  piri_str: x("Piriforme y glúteo (estiramiento cruzado)","2 × 60 seg / lado",3,"15 s","Boca arriba, cruzar el tobillo sobre la rodilla opuesta y llevar esa rodilla hacia el pecho hasta sentir el estiramiento en el glúteo profundo.","Forzar el rango cuando hay tensión en la cara lateral de la rodilla.","Reducir el rango si genera molestia en la cara externa de la rodilla."),
  torax_str:x("Columna torácica y pecho — apertura sostenida","1 × 90 seg / lado",2,"–","De lado con las rodillas flexionadas al frente, abrir el brazo superior hacia atrás girando el pecho y la mirada, manteniendo las caderas fijas.","Mover las caderas junto con el tronco: pierde el efecto de rotación torácica.","Sin restricción para la rodilla."),
  // Bloque 4 — Liberación miofascial completa
  foam_cuad:  x("Foam roller: cuádriceps","90 seg / pierna",3,"–","Boca abajo, rodillo bajo el muslo. Deslizar lento, pausando 20–30 s en los puntos de tensión. Nunca pasar el rodillo sobre la rótula.","Rodar demasiado rápido o presionar directamente sobre la articulación.","Apoyar parte del peso en los antebrazos para reducir la presión."),
  foam_isq:   x("Foam roller: isquiotibiales y glúteo","90 seg / pierna",3,"–","Sentado con el rodillo bajo el muslo posterior, usando los brazos para controlar la presión. Incluir la zona del glúteo.","Pasar directamente sobre la parte posterior de la rodilla.","Sin restricción."),
  foam_itb:   x("Foam roller: banda iliotibial (IT band)","60 seg / lado, presión suave",4,"–","De lado, rodillo desde la cadera hasta justo antes de la rodilla. Zona sensible: ir con presión progresiva y respirando.","Aplicar presión máxima desde el inicio en una zona muy sensible.","Si es muy doloroso, usar una pelota más blanda u omitir y pasar al siguiente."),
  pelota_pie: x("Pelota en planta del pie","60 seg / pie",2,"–","De pie o sentado, rodar una pelota de tenis bajo el arco del pie. Libera la fascia plantar, que influye en toda la cadena hasta la rodilla.","Presionar directamente sobre el hueso del talón.","Sin restricción."),
  pelota_glut:x("Pelota en glúteo profundo (piriforme)","60 seg / lado",4,"–","Sentado sobre la pelota, inclinar el peso hacia el glúteo del lado a trabajar. Buscar el punto de tensión y sostener la presión respirando.","Sentarse directamente sobre el hueso (isquion) en vez del músculo.","Reducir el tiempo si genera irradiación hacia la pierna."),
  // Bloque 5 — Extensión opcional para llegar a 90 min
  piscina_rec:x("Recuperación en piscina: caminata y movilidad acuática","15–20 min",2,"–","Si tenés acceso a piscina: caminar en el agua a la altura del pecho, movilizar cadera y rodilla sin impacto, y nadar unos largos suaves sin buscar velocidad. El agua descarga el peso corporal casi por completo.","Nadar a ritmo de entrenamiento en vez de recuperación.","Sin piscina disponible: reemplazar por 'Relajación extendida'."),
  relax_ext:  x("Relajación extendida (alternativa sin piscina)","15–20 min",1,"–","Extender los tiempos de estiramiento del bloque de flexibilidad en 20–30 s adicionales por posición, y sumar automasaje adicional con rodillo en las zonas más cargadas de la semana.","Convertir esto en una sesión de entrenamiento extra con más ejercicios.","Sin restricción."),
  contraste:  x("Contraste de temperatura (ducha)","3–4 ciclos: 30 s frío / 60 s calor",2,"–","Alternar agua fría y caliente en la ducha, terminando siempre con frío. Puede favorecer la sensación de recuperación, aunque la evidencia científica al respecto es mixta.","Usar agua extremadamente fría sin adaptación progresiva.","Omitir si hay hipersensibilidad al frío o alguna condición médica que lo contraindique."),
  // Enfriamiento — Respiración y relajación final
  resp_478:   x("Respiración diafragmática 4-7-8","6–8 ciclos completos",1,"–","Tumbado con las piernas elevadas sobre una silla o rodillo. Inhalar 4 s por la nariz, sostener 7 s, exhalar 8 s por la boca. Activa el sistema nervioso parasimpático y mejora la calidad de la recuperación.","Respirar con el pecho en vez de expandir el abdomen.","Sin restricción."),
  relax_prog: x("Relajación muscular progresiva (escaneo corporal)","5 min",1,"–","Tumbado, recorrer mentalmente el cuerpo de los pies a la cabeza, tensando cada grupo muscular 3–5 s y soltando por completo. Cierra la sesión y prepara el sistema nervioso para la semana que empieza.","Apurar el recorrido sin realmente soltar cada zona.","Sin restricción."),
};

const PR = {
  goblet:  x("Sentadilla goblet hasta 70°","Sem 5: 4×10 ligero · Sem 6–7: 4×10 +carga · Sem 8: 3×8 ↓",7,"90 s","Mancuerna o kettlebell contra el pecho. Descender a exactamente 70°. Talones en el suelo. Rodillas sobre 2° dedo del pie.","Superar 70° sin autorización. Rodillas en valgo. Talones que se elevan.","Prensa 0–75°. Wall squat como regresión total."),
  nordic:  x("Nordic curl excéntrico ⚠ SOLO CON AUTORIZACIÓN","Sem 6–7: 3×5 rep (caída 6–8 s)",8,"120 s","Rodillas en colchoneta. Compañero sostiene tobillos. Caer HACIA ADELANTE lo más lento posible resistiendo con isquiotibiales. Apoyar manos al final.","Caer de golpe sin resistir. Intentar la fase concéntrica prematuramente.","RDL unilateral excéntrico con carga moderada."),
  sl_rdl:  x("Single-leg RDL","Sem 6: 3×10/pierna sin carga · Sem 7: +mancuerna ligera · Sem 8: 3×8 ↓",6,"90 s","Bisagra de cadera sobre una sola pierna. Pierna libre hacia atrás. Espalda neutra. Microflexión constante de 5° en rodilla de apoyo.","Cadera que sube o rota (apertura pélvica). Rodilla de apoyo en valgo.","RDL bilateral con barra."),
  hip_b:   x("Hip thrust con barra","Sem 9–10: 4×10 · Sem 11: 4×8 +carga · Sem 12: 3×8 ↓",7,"90 s","Hombros en banco. Barra en caderas con almohadilla. Pies al ancho de caderas. Empujar desde talones. Extensión completa. Contraer glúteo al máximo arriba.","No llegar a extensión completa. Empujar desde los dedos.","Hip thrust con banda o solo peso corporal."),
  sent_t:  x("Sentadilla trasera con barra","Sem 9: 4×8 (barra sola 20 kg) · Sem 10–11: 4×6–8 +carga · Sem 12: 3×6 ↓",8,"120 s","Barra sobre trapecios. Pies al ancho de hombros. Descender a 90°. Rodillas sobre 2° dedo. Columna neutra. Subir explosivo.","Redondear la espalda. Rodillas en valgo al subir. No llegar a 90°.","Prensa 0–90° si la sentadilla genera dolor patelofemoral."),
  drop_l:  x("Drop landing bilateral ⚠ SOLO CON AUTORIZACIÓN","3 × 5 recepciones (retención 3 s)",6,"90 s","Bajar de step 15 cm. Al contactar: TRIPLE FLEXIÓN (tobillo-rodilla-cadera). Absorber el impacto en 3 s. Peso equilibrado. SIN valgo.","Aterrizaje rígido. Valgo al recibir el impacto.","Solo descenso excéntrico lento desde el step."),
  bulgar:  x("Sentadilla búlgara con mancuernas","Sem 13–14: 3×10/pierna · Sem 14–15: 4×8/pierna · Sem 16: 3×8 ↓",8,"120 s","Pie trasero en banco. Pie delantero suficientemente adelante. Descender verticalmente. Rodilla delantera sobre 2° dedo.","Rodilla trasera golpeando el suelo. Inclinación excesiva del tronco.","Step-up controlado lento como regresión."),
  sl_rdl2: x("RDL unilateral con mancuerna","Sem 13: 4×10/pierna · Sem 14–15: +carga · Sem 16: 3×8 ↓",7,"90 s","Bisagra cadera unilateral. Pierna libre hacia atrás con cadera paralela al suelo. Mancuerna en mano OPUESTA a la pierna de apoyo.","Cadera que sube o rota. Rodilla de apoyo en valgo.","RDL bilateral con barra."),
  skating: x("Skating jumps con retención ⚠ SOLO CON AUTORIZACIÓN","3 × 6 saltos/pierna (retención 3 s)",7,"120 s","Salto lateral explosivo. Al aterrizar: CONGELAR la posición 3 s. Rodilla NO puede colapsar adentro. Peso sobre el talón.","No retener. Valgo dinámico al aterrizar.","Desplazamiento lateral lento con retención unipodal."),
  decline: x("Decline SL squat (test + ejercicio)","3 × 10/pierna en plataforma 25°",6,"90 s","Plataforma inclinada 25°. Descender a 90° lento. Controlar velocidad. Registrar dolor en cada serie. Objetivo: <3/10 para autorizar carrera.","Valgo al descender. Compensación con el tronco.","Wall squat bilateral si unilateral da dolor >3/10."),
  jump_sq: x("Jump squat con barra (30% 1RM) ⚠ SOLO CON AUTORIZACIÓN","4 × 5 rep a máxima velocidad",8,"180 s","Sentadilla rápida a 60°. Explotar hacia arriba. Aterrizaje suave con triple flexión. NO aterrizar en valgo.","Aterrizaje rígido. Aterrizar en valgo.","Jump squat con peso corporal."),
  sprint:  x("Sprints 20 m (70–75%) ⚠ SOLO CON AUTORIZACIÓN","5 × 20 m",8,"3 min","Salida parado. Primer paso explosivo. 70–75% velocidad (no sprint máximo). Evaluar respuesta en 24 h post sesión.","Sprint al 100% en primeras sesiones. No registrar síntomas 24 h después.","Trote rápido al 60%."),
  ydrill:  x("Y-drill CODS 45° preplaneado ⚠ SOLO CON AUTORIZACIÓN","3 × 6 pasadas (3 c/dirección)",7,"2 min","Correr 5 m al cono central. Cortar a 45° (dirección conocida). Plantar pie exterior. Rodilla sobre 2° dedo. Acelerar en la nueva dirección.","Valgo dinámico al plantar. Velocidad sin dominar la técnica.","El mismo patrón caminando."),
  int1515: x("Método intermitente 15\"×15\" ⚠ SOLO CON AUTORIZACIÓN","6–8 rep: 15\" sprint · 15\" trote suave",9,"15 s (trote = descanso)","En cancha. Sprint ~90% durante 15 s, pasar INMEDIATAMENTE a trote suave 15 s. Simula el patrón metabólico del partido.","Descanso completo entre esfuerzos (pierde el efecto).","10\"×20\" si hay síntomas post sesión."),
  ttest:   x("T-test a velocidad completa ⚠ SOLO CON AUTORIZACIÓN","3 rep con cronómetro (objetivo: <12 s)",8,"3 min","5 m adelante, 2.5 m lateral izq, 5 m a la derecha, 2.5 m al centro, 5 m atrás de espaldas. Técnica: frenada con paso penúltimo.","Valgo en cada giro. Mirar el suelo durante el movimiento.","T-drill con ángulos más abiertos."),
  depth_j: x("Depth jump bilateral ⚠ SOLO CON AUTORIZACIÓN","3 × 6 rep (tiempo contacto <250 ms)",8,"2 min","Caer de step 30 cm. Al contactar: explotar verticalmente lo más rápido posible. Sin valgo. Triple flexión reactiva.","Aterrizaje con pausa larga. Valgo al impactar.","Drop landing si no hay control de aterrizaje aún."),
  y_react: x("Y-drill reactivo ⚠ SOLO CON AUTORIZACIÓN","4 × 5 rep (dirección aleatoria)",9,"3 min","Llegar al cono central. Entrenador indica la dirección CON SEÑAL. Reaccionar INSTANTÁNEAMENTE. No anticipar la dirección.","Anticipar antes de recibir el estímulo. Valgo al reaccionar.","Y-drill preplaneado si hay inestabilidad."),
  ssg_2v0: x("SSG 2v0 (posesión sin oposición) ⚠ SOLO CON AUTORIZACIÓN","3 sets de 4 min · pausa 2 min activa",7,"2 min trote","Espacio 20×15 m. Mantener posesión sin oposición. Énfasis en movimiento sin balón y pase al pie.","Detenerse a esperar el balón sin moverse.","Reducir espacio o velocidad si hay fatiga."),
  ssg_3v3: x("SSG 3v3 con marcaje ⚠ SOLO CON AUTORIZACIÓN","4 períodos de 6 min · descanso 3 min activo",9,"3 min trote","Espacio reducido con portería. Marcaje real. Reglas de futsal. Alta intensidad. Transición ataque-defensa rápida.","Contacto físico excesivo antes de la adaptación estructural.","Participar como jugador más lento si hay fatiga."),
  rsa:     x("RSA 6×30 m sprint ⚠ SOLO CON AUTORIZACIÓN","6 sprints × 30 m (20 s descanso entre cada uno)",10,"20 s","Sprints al 95–100%. Registrar tiempo de cada uno. Objetivo: pérdida de velocidad <5% entre sprint 1 y 6.","Descanso excesivo (pierde el efecto de fatiga acumulada).","5×20 m si hay síntomas en rodilla."),
  partido: x("Partido equipo universitario ⚠ SOLO CON AUTORIZACIÓN","Sem 33: 20 min · Sem 34: 30 min · Sem 35: 40 min",9,"Según reglas","Participar progresivamente en el equipo universitario. Gestionar minutos con el cuerpo técnico. Evaluar rodilla en 24–48 h.","Jugar al máximo antes de completar la progresión.","Reducir minutos si dolor ≥4/10 durante el partido."),
  trote_f: x("Trote fraccionado ⚠ SOLO CON AUTORIZACIÓN","Sem 5: 3×2 min · Sem 6: 4×2 min · Sem 7: 5×2 min (3 min caminata entre series)",5,"3 min caminata","Trote suave (ritmo conversacional). Superficie blanda. Pasos cortos. Aterrizaje bajo el centro de gravedad. Evaluar rodilla en 24 h.","Velocidad excesiva. No registrar síntomas 24 h después.","Bicicleta estática si hay cualquier síntoma en rodilla."),
  cond_l:  x("Conducción lineal con ambos pies","4 × 3 min (cambiar pie cada 30 s)",4,"60 s","Conducir en línea recta con ambos pies alternando. Máximo 10 m. Cabeza levantada. Golpeo suave con el interior del pie.","Mirar siempre el balón. Golpear en lugar de deslizar.","Control de suela completamente sentado."),
  cond_c:  x("Conducción con cambios de dirección amplios","4 × 4 min (1 min pausa activa)",5,"60 s","Conducir con cambios de dirección amplios (90°–120°) conocidos de antemano. Cabeza levantada. Transición suave sin frenar bruscamente.","Cambios de dirección excesivamente cerrados (90° reactivos aún no están autorizados).","Conducción lineal si los cambios generan molestia."),
  pases:   x("Pases de primera y recepción orientada","4 series de 4 min con 1 min descanso",5,"60 s","Pases de primera contra pared o con compañero. Recepción con el pie orientado a la siguiente dirección. Velocidad de pase progresiva.","Parar el balón antes de pasar (quitar el automatismo de primera).","Pases con dos toques si la primera no es cómoda aún."),
  finta_s: x("Fintas específicas de futsal: suela, pisada, elastico","3 × 20 s de trabajo activo",5,"90 s","Practicar las fintas específicas de futsal de forma aislada antes de incorporarlas en juego. Énfasis en el engaño del defensor.","Ejecutar las fintas a alta velocidad sin dominar el movimiento lento primero.","Practicar sin defensor real hasta dominar la mecánica."),
};

export const SESSIONS: Record<string, Session> = {
  'M1-A': { titulo:"Cardio bajo impacto + Tren superior + Core", objetivo:"Acondicionar el sistema cardiovascular sin impacto articular. Fuerza general del tren superior. Estabilización lumbopélvica.", dur:"85 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"CARDIO BAJO IMPACTO",dur:"20 min",ejs:[UP.eliptica]},{n:"FUERZA TREN SUPERIOR",dur:"35 min",ejs:[UP.pm_s, UP.remo_p, UP.jalon, UP.flex, UP.curl]},{n:"CORE",dur:"15 min",ejs:[UP.planch, UP.planch_l, UP.pallof, UP.dead_b]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M1-B': { titulo:"Fuerza tren inferior adaptada + Equilibrio + Técnica con balón", objetivo:"Fortalecer cadena posterior, glúteos y cuádriceps sin impacto. Desarrollar propiocepción. Iniciar técnica de balón estática.", dur:"90 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"ACTIVACIÓN ESPECÍFICA",dur:"10 min",ejs:[LO.clamsh, LO.quad_s]},{n:"FUERZA TREN INFERIOR",dur:"40 min",ejs:[LO.rdl, LO.copen, LO.calf, LO.prensa, LO.hip_su]},{n:"EQUILIBRIO + TÉCNICA CON BALÓN",dur:"20 min",ejs:[LO.equil, LO.suela]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M1-C': { titulo:"Cardio regenerativo + Movilidad global + Flexibilidad", objetivo:"Recuperación activa. Aumentar ROM de tobillo, cadera e isquiotibiales. Reducir tono muscular acumulado.", dur:"80 min", warn:null,
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARDIO REGENERATIVO",dur:"40 min",ejs:[UP.bici_c]},{n:"MOVILIDAD Y FLEXIBILIDAD",dur:"25 min",ejs:[MV.dors_b, MV.r9090, MV.psoas_d, MV.aduc_d, MV.isquio]},{n:"LIBERACIÓN MIOFASCIAL",dur:"10 min",ejs:[MV.foam]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.psoas_s, CO.resp]},
  'M2-A': { titulo:"Cardio + Tren superior progresión MC2 (+5–10% carga)", objetivo:"Incrementar cargas en tren superior. Si autorizado: trote fraccionado reemplaza 10 min de elíptica. Continuar core.", dur:"85 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"CARDIO / INTRO TROTE FRACCIONADO",dur:"20 min",ejs:[{...UP.eliptica, params:"Elíptica 20 min — O — si autorizado: 3×2 min trote + 2 min caminata activa"}, PR.trote_f]},{n:"FUERZA TREN SUPERIOR (+5–10% carga vs MC1)",dur:"35 min",ejs:[UP.pm_s, UP.remo_p, UP.jalon, UP.flex, UP.curl]},{n:"CORE",dur:"15 min",ejs:[UP.planch, UP.planch_l, UP.pallof, UP.dead_b]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M2-B': { titulo:"Tren inferior con nuevos ejercicios + Equilibrio", objetivo:"Sentadilla goblet 70°. Con autorización: nórdico excéntrico y single-leg RDL. +5% cargas.", dur:"90 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"ACTIVACIÓN",dur:"10 min",ejs:[LO.clamsh, LO.quad_s]},{n:"FUERZA TREN INFERIOR",dur:"45 min",ejs:[PR.goblet, LO.rdl, PR.sl_rdl, LO.calf, LO.hip_su, LO.copen]},{n:"NÓRDICO + EQUILIBRIO + TÉCNICA",dur:"15 min",ejs:[PR.nordic, LO.equil, LO.suela]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M2-C': { titulo:"Cardio progresivo + Movilidad avanzada", objetivo:"Incrementar duración del cardio. Si autorizado: carrera continua 20 min. Mayor ROM tobillo activo.", dur:"80 min", warn:null,
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARDIO",dur:"40 min",ejs:[{...UP.bici_c, params:"Sem 5–7: 35–40 min bicicleta — Si autorizado: carrera continua suave 20 min"}]},{n:"MOVILIDAD",dur:"25 min",ejs:[MV.dors_b, MV.r9090, MV.psoas_d, MV.aduc_d, MV.isquio]},{n:"LIBERACIÓN MIOFASCIAL",dur:"10 min",ejs:[MV.foam]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.psoas_s, CO.resp]},
  'M3-A': { titulo:"Fuerza máxima tren superior + Carrera continua", objetivo:"Fuerza máxima (5×5). Reclutamiento de alto umbral. Si autorizado: carrera continua 15–20 min.", dur:"90 min", warn:"Carrera continua SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"FUERZA MÁXIMA TREN SUPERIOR",dur:"35 min",ejs:[{...UP.pm_s, params:"5×5 rep (alta carga) · Sem 12: 3×5 ↓"},{...UP.remo_p, params:"5×5 rep (alta carga) · Sem 12: 3×5 ↓"}, UP.jalon, UP.flex]},{n:"CARRERA / CARDIO",dur:"25 min",ejs:[{...UP.eliptica, nombre:"Carrera continua o elíptica", params:"Con autorización: 15–20 min carrera. Sin autorización: elíptica 25 min."}]},{n:"CORE AVANZADO",dur:"15 min",ejs:[UP.planch, UP.planch_l, UP.pallof, UP.dead_b]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M3-B': { titulo:"Fuerza máxima tren inferior + Drop landings bilaterales", objetivo:"Sentadilla trasera con barra. Hip thrust cargado. Bulgarian. Con autorización: drop landings.", dur:"90 min", warn:"Drop landings SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"FUERZA MÁXIMA TREN INFERIOR",dur:"50 min",ejs:[PR.sent_t, PR.hip_b, PR.bulgar, LO.rdl, LO.calf]},{n:"ATERRIZAJES + EQUILIBRIO + TÉCNICA",dur:"20 min",ejs:[PR.drop_l, LO.equil, LO.suela, LO.quad_s]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M3-C': { titulo:"Cardio aeróbico + Movilidad profunda", objetivo:"Base aeróbica. Carrera continua progresiva. Movilidad profunda de cadera.", dur:"80 min", warn:null,
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARDIO",dur:"40 min",ejs:[{...UP.bici_c, params:"Con autorización: carrera continua 20–25 min. Sin autorización: bicicleta 40 min."}]},{n:"MOVILIDAD Y FLEXIBILIDAD",dur:"25 min",ejs:[MV.dors_b, MV.r9090, MV.psoas_d, MV.aduc_d, MV.isquio]},{n:"LIBERACIÓN MIOFASCIAL",dur:"10 min",ejs:[MV.foam]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.psoas_s, CO.resp]},
  'M4-A': { titulo:"Fuerza unilateral + Pliometría unilateral base", objetivo:"Corregir asimetrías. Skating jumps con retención isométrica. Carrera continua si autorizado.", dur:"90 min", warn:"Skating jumps SOLO CON AUTORIZACIÓN + LSI ≥85%",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"PLIOMETRÍA UNILATERAL",dur:"20 min",ejs:[PR.skating, LO.equil]},{n:"FUERZA UNILATERAL TREN SUPERIOR",dur:"25 min",ejs:[{...UP.pm_s, nombre:"Press hombros unilateral (mancuerna)", params:"3×10/lado"},{...UP.remo_p, nombre:"Remo unilateral con mancuerna", params:"4×10/lado"}, UP.jalon, UP.flex]},{n:"CARRERA / CARDIO",dur:"25 min",ejs:[{...UP.eliptica, nombre:"Carrera o elíptica", params:"Con autorización: 25–30 min carrera. Sin: elíptica 25 min."}]},{n:"CORE",dur:"10 min",ejs:[UP.planch, UP.dead_b]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M4-B': { titulo:"Fuerza unilateral tren inferior + Decline SL squat", objetivo:"Bulgarian split squat con mancuernas. RDL unilateral con carga. Decline SL squat como test.", dur:"90 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"FUERZA UNILATERAL",dur:"45 min",ejs:[PR.bulgar, PR.sl_rdl2, PR.nordic, LO.calf, LO.hip_su]},{n:"DECLINE SL SQUAT + TÉCNICA",dur:"20 min",ejs:[PR.decline, LO.suela, LO.equil]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M4-C': { titulo:"Carrera + Conducción lineal con balón", objetivo:"Aumentar volumen de carrera continua. Conducción lineal con ambos pies.", dur:"80 min", warn:null,
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARRERA / CARDIO",dur:"40 min",ejs:[{...UP.bici_c, params:"Con autorización: 25–30 min carrera. Sin: bicicleta 40 min."}]},{n:"TÉCNICA CON BALÓN + MOVILIDAD",dur:"25 min",ejs:[PR.cond_l, MV.dors_b, MV.isquio, MV.r9090]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.resp]},
  'M5-A': { titulo:"Fuerza explosiva + Sprints + CODS 30–45°", objetivo:"Tasa de producción de fuerza (RFD). Sprints 20 m al 70–75%. CODS preplaneados a ángulos suaves.", dur:"90 min", warn:"Sprints y CODS SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"VELOCIDAD + CODS PREPLANEADOS",dur:"30 min",ejs:[PR.sprint, PR.ydrill]},{n:"FUERZA EXPLOSIVA",dur:"25 min",ejs:[PR.jump_sq, PR.sent_t]},{n:"FUERZA MANTENIMIENTO",dur:"20 min",ejs:[PR.hip_b, LO.calf, LO.rdl]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M5-B': { titulo:"Fuerza unilateral máxima + Conducción con cambios", objetivo:"Fuerza unilateral máxima. Técnica con cambios de dirección amplios preplaneados.", dur:"90 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"FUERZA UNILATERAL",dur:"40 min",ejs:[PR.bulgar, PR.sl_rdl2, PR.nordic, LO.calf]},{n:"TÉCNICA CON BALÓN",dur:"25 min",ejs:[PR.cond_c, LO.equil]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M5-C': { titulo:"Carrera + Intervalos VO₂máx + Movilidad", objetivo:"Introducir intervalos de alta intensidad (4×4 min al 90% FCmáx). Carrera progresiva.", dur:"80 min", warn:"Intervalos SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARRERA + INTERVALOS",dur:"40 min",ejs:[{...UP.bici_c, nombre:"Carrera + Intervalos", params:"Con autorización: 15 min carrera + 4×4 min al 90% FCmáx (3 min recuperación activa). Sin: bicicleta 40 min."}]},{n:"MOVILIDAD",dur:"25 min",ejs:[MV.dors_b, MV.r9090, MV.isquio, MV.aduc_d]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.resp]},
  'M6-A': { titulo:"Capacidad intermitente 15\"×15\" + Fuerza explosiva + Pliometría", objetivo:"Sistema intermitente específico de futsal. Depth jumps. Fuerza explosiva en su pico.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"CAPACIDAD INTERMITENTE",dur:"20 min",ejs:[PR.int1515]},{n:"FUERZA EXPLOSIVA",dur:"30 min",ejs:[PR.jump_sq, PR.sent_t, PR.hip_b]},{n:"PLIOMETRÍA COMPLETA",dur:"20 min",ejs:[{...PR.drop_l, nombre:"Depth jump bilateral (step 30 cm)", params:"3 × 6 rep (contacto <250 ms)", desc:"Caer de step 30 cm. Al contactar: explotar verticalmente lo más rápido posible. Sin valgo. Triple flexión reactiva."}]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M6-B': { titulo:"CODS 90–180° + T-test + Técnica avanzada con balón", objetivo:"T-test a velocidad completa. Illinois adaptado. Pases de primera y conducción reactiva.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"CODS 90–180°",dur:"35 min",ejs:[PR.ydrill, PR.ttest]},{n:"TÉCNICA CON BALÓN AVANZADA",dur:"30 min",ejs:[PR.pases, PR.cond_c]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M6-C': { titulo:"Resistencia específica + Movilidad (Yo-Yo IT1 al final del bloque)", objetivo:"Resistencia intermitente específica de futsal. Yo-Yo IT1 al final de la semana 24.", dur:"80 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"RESISTENCIA ESPECÍFICA FUTSAL",dur:"40 min",ejs:[PR.int1515]},{n:"MOVILIDAD",dur:"25 min",ejs:[MV.dors_b, MV.r9090, MV.isquio]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.resp]},
  'M7-A': { titulo:"Agilidad reactiva (RAG) + Fuerza de mantenimiento", objetivo:"Eliminar la preplaneación. COD en respuesta a estímulos imprevistos. Fuerza de mantenimiento.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"AGILIDAD REACTIVA (RAG)",dur:"30 min",ejs:[PR.y_react]},{n:"FUERZA DE MANTENIMIENTO",dur:"30 min",ejs:[PR.sent_t, PR.hip_b, PR.nordic, LO.calf]},{n:"PLIOMETRÍA REACTIVA",dur:"15 min",ejs:[{...PR.skating, nombre:"Lateral bounds reactivos (sin retención)", params:"3×8 saltos máximos laterales", desc:"Saltos laterales máximos sin retención. Aterrizar suave. Inmediatamente saltar al otro lado. Máxima reactividad."}]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M7-B': { titulo:"SSG sin oposición + Fintas específicas de futsal", objetivo:"Juegos reducidos 2v0 introductorios. Fintas de suela, pisada y elastico. Desmarque reactivo.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"JUEGOS REDUCIDOS SIN OPOSICIÓN",dur:"40 min",ejs:[PR.ssg_2v0]},{n:"DRIBBLING 1v1 REACTIVO + FINTAS",dur:"25 min",ejs:[PR.finta_s, {
      ...PR.y_react, nombre:"Dribbling 1v1 reactivo en 4×4 m", params:"3 × 20 s de trabajo activo", desc:"Atacante con balón intenta superar al defensor con fintas. El defensor reacciona de forma puramente reactiva. Énfasis en la toma de decisión del atacante."
    }]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M7-C': { titulo:"RSA + Resistencia específica + Movilidad activa", objetivo:"Repeated Sprint Ability. Preparar para la carga de partido.", dur:"80 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"RSA + RESISTENCIA",dur:"35 min",ejs:[PR.rsa]},{n:"MOVILIDAD ACTIVA",dur:"30 min",ejs:[MV.dors_b, MV.r9090, MV.isquio, MV.foam]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.resp]},
  'M8-A': { titulo:"SSG 3v3 con oposición real + RSA + Fuerza pico", objetivo:"Exposición completa a cargas de partido. SSG con oposición real. RSA.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"SSG 3v3 CON OPOSICIÓN REAL",dur:"40 min",ejs:[PR.ssg_3v3]},{n:"RSA",dur:"20 min",ejs:[PR.rsa]},{n:"FUERZA MANTENIMIENTO",dur:"15 min",ejs:[PR.sent_t, LO.calf]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M8-B': { titulo:"SSG 4v4 + Agilidad reactiva máxima + Fuerza", objetivo:"Carga de partido 4v4. Agilidad reactiva en contexto real de juego.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"SSG 4v4",dur:"40 min",ejs:[{...PR.ssg_3v3, nombre:"SSG 4v4 con portería y marcaje", params:"4 períodos de 8 min · descanso 3 min activo", desc:"Espacio más grande. 4 vs 4 con reglas de futsal. Alta intensidad. Contacto físico. Objetivos tácticos básicos definidos."}]},{n:"AGILIDAD + FUERZA",dur:"30 min",ejs:[PR.y_react, PR.nordic, LO.calf]}],
    enf:[CO.camin, MV.foam, CO.estir_q, CO.resp]},
  'M8-C': { titulo:"Partido simulado 2×20 min + Recuperación activa", objetivo:"Simulación de partido completo. Evaluar respuesta física y de la rodilla en 48 h.", dur:"80 min", warn:"SOLO CON AUTORIZACIÓN PROFESIONAL",
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"PARTIDO SIMULADO 2×20 MIN",dur:"50 min",ejs:[{...PR.partido, nombre:"Partido simulado 2×20 min", params:"2 tiempos de 20 min · descanso 10 min", desc:"Partido completo de futsal con todas las reglas. Evaluar la resistencia de la rodilla en las 48 h posteriores."}]},{n:"RECUPERACIÓN ACTIVA",dur:"15 min",ejs:[MV.foam, CO.isquio_s]}],
    enf:[CO.pedal_s, CO.isquio_s, CO.psoas_s, CO.resp]},
  'M9-A': { titulo:"TAPERING — Fuerza mantenimiento + Velocidad", objetivo:"Reducir volumen 40–50%. Mantener intensidad. Disipar fatiga acumulada. Conservar la velocidad.", dur:"70 min", warn:null,
    cal:[CAL.bici, CAL.puente, CAL.tobillo, CAL.wall45, CAL.torax],
    bloques:[{n:"VELOCIDAD (VOLUMEN REDUCIDO)",dur:"20 min",ejs:[{...PR.sprint, params:"3 rep al 95% — Calidad > Cantidad — Tapering"}]},{n:"FUERZA MANTENIMIENTO (–50% VOLUMEN)",dur:"25 min",ejs:[{...PR.sent_t, params:"3×3 rep alta carga, bajo volumen — Tapering neuromuscular"},{...PR.hip_b, params:"2×5 rep"},{...LO.calf, params:"2×12 rep"}]}],
    enf:[CO.camin, MV.foam, CO.resp]},
  'M9-B': { titulo:"TAPERING — Equipo universitario + Activación FIFA 11+", objetivo:"Integración al equipo. Activación FIFA 11+. Gestionar minutos con el cuerpo técnico.", dur:"90 min", warn:"SOLO CON AUTORIZACIÓN DEL PROFESIONAL DE SALUD Y CUERPO TÉCNICO",
    cal:[{...CAL.bici, nombre:"Calentamiento FIFA 11+ completo", params:"20–25 min · Protocolo oficial", desc:"Protocolo oficial FIFA 11+: carrera lineal, activación de core, movilidad de tobillo, sentadilla y plant & cut progresivo."}],
    bloques:[{n:"ENTRENAMIENTO EQUIPO UNIVERSITARIO",dur:"60 min",ejs:[PR.partido]}],
    enf:[CO.camin, MV.foam, CO.isquio_s, CO.resp]},
  'M9-C': { titulo:"TAPERING — Regenerativo + Movilidad + Tests finales", objetivo:"Recuperación activa. Tests finales de condición. Preparación mental para la competencia.", dur:"70 min", warn:null,
    cal:[CAL.torax, CAL.tobillo],
    bloques:[{n:"CARDIO REGENERATIVO MUY SUAVE",dur:"25 min",ejs:[{...UP.bici_c, params:"25 min · RPE 3–4 · Zona 1 (recuperación activa)"}]},{n:"MOVILIDAD COMPLETA",dur:"30 min",ejs:[MV.dors_b, MV.r9090, MV.psoas_d, MV.isquio, MV.foam]},{n:"TESTS FINALES (semana 35)",dur:"15 min",ejs:[{...LO.equil, nombre:"Tests de cierre: T-test · CMJ · 10 m sprint · Yo-Yo IT1", params:"Ejecutar al final de la semana 35", desc:"Registro final de todas las métricas. Comparar con el baseline inicial. Presentar resultados al cuerpo técnico universitario."}]}],
    enf:[CO.isquio_s, CO.psoas_s, CO.resp]},
  'DESCANSO': { titulo:"Recuperación Activa, Movilidad y Flexibilidad", objetivo:"Restaurar tejidos, mantener el rango de movimiento y reforzar el control motor de la rodilla sin sumar fatiga. Es un día de restauración, no de entrenamiento: ningún ejercicio debe doler. Los primeros 3 bloques + enfriamiento arman la versión de 60 min; sumá el bloque de extensión si tenés 90 min disponibles.", dur:"60–90 min", warn:null,
    cal:[RC.activ1, RC.activ2],
    bloques:[
      {n:"REHABILITACIÓN Y CONTROL MOTOR DE RODILLA",dur:"15 min",ejs:[RC.quad_iso, RC.glut_act, RC.patela, RC.mini_sq]},
      {n:"FLEXIBILIDAD GLOBAL (ESTIRAMIENTO PROLONGADO)",dur:"25 min",ejs:[RC.isq_str, RC.cuad_str, RC.psoas_str, RC.aduc_str, RC.gem_str, RC.piri_str, RC.torax_str]},
      {n:"LIBERACIÓN MIOFASCIAL COMPLETA",dur:"12 min",ejs:[RC.foam_cuad, RC.foam_isq, RC.foam_itb, RC.pelota_pie, RC.pelota_glut]},
      {n:"EXTENSIÓN OPCIONAL — PARA LLEGAR A 90 MIN",dur:"15–20 min",ejs:[RC.piscina_rec, RC.relax_ext, RC.contraste]},
    ],
    enf:[RC.resp_478, RC.relax_prog] },
};

export const MESO_NAMES = ["Adaptación Anatómica","Hipertrofia Funcional","Fuerza Máxima","Fuerza Unilateral","Fuerza Explosiva","Capacidad Intermitente","Agilidad Reactiva","Integración Competitiva","Tapering y Titularidad"];
export const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
export const DSHORT = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];
export const PATTERN = ["A","B","C","A","B","C","DESCANSO"];

export function getKey(m: number, d: number): string {
  const t = PATTERN[d];
  return t === "DESCANSO" ? "DESCANSO" : `M${m}-${t}`;
}

