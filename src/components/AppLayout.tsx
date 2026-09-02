import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'
import { globalWeek } from '../lib/storage'
import { Chip } from './ExerciseUI'

const NAV_FUTSAL = [
  { to: '/', label: 'Hoy', ico: '●', end: true },
  { to: '/plan', label: 'Plan 9M', ico: '▣', end: false },
  { to: '/simf', label: 'SIMF', ico: '◇', end: false },
  { to: '/rutina', label: 'Rutina AM', ico: '◎', end: false },
  { to: '/progreso', label: 'Progreso', ico: '↗', end: false },
] as const

const NAV_RUNNING = [
  { to: '/', label: 'Hoy', ico: '●', end: true },
  { to: '/plan-10k', label: 'Plan 17S', ico: '▣', end: false },
  { to: '/gym-concurrente', label: 'Gimnasio', ico: '⚡', end: false },
  { to: '/protocolos', label: 'Protocolos', ico: '◇', end: false },
  { to: '/autorregulacion', label: 'Semáforo', ico: '🚥', end: false },
  { to: '/progreso', label: 'Progreso 10K', ico: '↗', end: false },
] as const

const TITLES: Record<string, string> = {
  '/': 'Hoy',
  '/plan': 'Plan 9 Meses (Futsal)',
  '/simf': 'Movimiento SIMF',
  '/rutina': 'Rutina Matutina',
  '/progreso': 'Progreso & Historial',
  '/plan-10k': 'Plan Maestro 17S (10K)',
  '/gym-concurrente': 'Gimnasio Concurrente & Sóleo',
  '/protocolos': 'Protocolos & Biomecánica',
  '/autorregulacion': 'Semáforo & Recomposición',
  '/running': 'Plan de Running',
}

export function AppLayout() {
  const { state, setMode, completedCount, morningStreak, todayReadiness } = useAppState()
  const loc = useLocation()
  const isFutsal = state.activeMode === 'futsal'
  const navItems = isFutsal ? NAV_FUTSAL : NAV_RUNNING
  const title = TITLES[loc.pathname] ?? (isFutsal ? 'Futsal Pro' : 'Running 10K & GYM')
  const gWeek = globalWeek(state.plan.meso, state.plan.week)
  const runWeek = state.runningPlan.week

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegación principal">
        {/* Brand */}
        <div className="brand">
          <div className="brand-mark" translate="no" style={{ background: isFutsal ? 'var(--accent)' : '#4ea8de', color: '#0c0f0e' }}>
            {isFutsal ? 'FP' : '10K'}
          </div>
          <div>
            <div className="brand-title" translate="no">
              {isFutsal ? 'Futsal Pro' : 'Running 10K + GYM'}
            </div>
            <div className="brand-sub">
              {isFutsal ? 'futsal · SIMF · rehabilitación' : '10K Sub-55/59 · recomposición · 17S'}
            </div>
          </div>
        </div>

        {/* Mode Switcher Pill */}
        <div className="mode-switcher-card" style={{ margin: '10px 0 16px', padding: 6, background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--line-strong)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', padding: '0 4px 6px', fontWeight: 600 }}>MODO DE ENTRENAMIENTO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <button
              type="button"
              className={`mode-btn ${isFutsal ? 'active' : ''}`}
              onClick={() => setMode('futsal')}
              aria-pressed={isFutsal}
            >
              ⚽ Futsal
            </button>
            <button
              type="button"
              className={`mode-btn ${!isFutsal ? 'active' : ''}`}
              onClick={() => setMode('running_gym')}
              aria-pressed={!isFutsal}
            >
              🏃‍♂️ Run + GYM
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-ico" aria-hidden="true">
                {n.ico}
              </span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Meta */}
        <div className="sidebar-meta">
          {isFutsal ? (
            <>
              <div>
                Semana global <strong style={{ color: 'var(--text)' }}>{gWeek}/36</strong>
              </div>
              <div>
                Sesiones hechas <strong style={{ color: 'var(--text)' }}>{completedCount}</strong>
              </div>
              <div>
                Racha matutina <strong style={{ color: 'var(--text)' }}>{morningStreak}d</strong>
              </div>
            </>
          ) : (
            <>
              <div>
                Semana 10K <strong style={{ color: 'var(--text)' }}>{runWeek}/17</strong>
              </div>
              <div>
                Semáforo Hoy:{' '}
                <strong style={{ color: todayReadiness?.status === 'verde' ? 'var(--ok)' : todayReadiness?.status === 'amarillo' ? 'var(--warn)' : todayReadiness?.status === 'rojo' ? 'var(--danger)' : 'var(--text-2)' }}>
                  {todayReadiness ? todayReadiness.status.toUpperCase() : 'PENDIENTE'}
                </strong>
              </div>
              <div>
                Sesiones 10K <strong style={{ color: 'var(--text)' }}>{completedCount}</strong>
              </div>
            </>
          )}
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1>{title}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Quick Top Switcher for mobile/desktop */}
            <button
              type="button"
              className="topbar-mode-toggle"
              onClick={() => setMode(isFutsal ? 'running_gym' : 'futsal')}
              title="Cambiar entre Modo Futsal y Modo Running+GYM"
            >
              {isFutsal ? '⚽ Modo Futsal' : '🏃‍♂️ Modo Run+GYM'}
            </button>

            {isFutsal ? (
              <Chip variant="accent">MC{state.plan.meso} · S{state.plan.week}</Chip>
            ) : (
              <Chip variant="accent">MC{state.runningPlan.meso} · Sem {state.runningPlan.week}/17</Chip>
            )}
          </div>
        </header>

        <main className="content" id="main">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {navItems.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <span className="ico" aria-hidden="true">
              {n.ico}
            </span>
            {n.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
