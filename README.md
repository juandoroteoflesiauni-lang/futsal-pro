# Futsal Pro

App personal de seguimiento del programa de futsal de 9 meses (retorno a cancha / rodilla) y de la rutina matutina científica.

## Cómo usarla

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

## Pantallas

- **Hoy** — sesión del día según mesociclo/semana, checklist de ejercicios, cierre con dolor y RPE
- **Plan** — las 9 fases × 4 semanas × 7 días (técnica, errores, alternativas de rodilla)
- **Rutina** — protocolo matutino progresivo por mesociclo (con avisos de brackets)
- **Progreso** — historial, racha matutina, promedios de dolor/RPE (guardado en `localStorage`)

## Datos

Basada en `Programa_Futsal_9_Meses.docx`, `Rutina_Matutina_Cientifica.docx` y el dashboard JSX de referencia.
