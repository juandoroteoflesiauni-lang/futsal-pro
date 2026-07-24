import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'
import { globalWeek } from '../lib/storage'

const NAV = [
  { to: '/', label: 'Hoy', ico: '●', end: true },
  { to: '/plan', label: 'Plan', ico: '▣', end: false },
  { to: '/simf', label: 'SIMF', ico: '◇', end: false },
  { to: '/rutina', label: 'Rutina', ico: '◎', end: false },
  { to: '/progreso', label: 'Progreso', ico: '↗', end: false },
] as const

const TITLES: Record<string, string> = {
  '/': 'Hoy',
  '/plan': 'Plan 9 meses',
  '/simf': 'Movimiento SIMF',
  '/rutina': 'Rutina matutina',
  '/progreso': 'Progreso',
}

export function AppLayout() {
  const { state, completedCount, morningStreak } = useAppState()
  const loc = useLocation()
  const title = TITLES[loc.pathname] ?? 'Futsal Pro'
  const gWeek = globalWeek(state.plan.meso, state.plan.week)

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegación principal">
        <div className="brand">
          <div className="brand-mark" translate="no">
            FP
          </div>
          <div>
            <div className="brand-title" translate="no">
              Futsal Pro
            </div>
            <div className="brand-sub">9 meses · SIMF · retorno</div>
          </div>
        </div>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-ico" aria-hidden="true">
                {n.ico}
              </span>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-meta">
          <div>
            Semana global <strong style={{ color: 'var(--text)' }}>{gWeek}/36</strong>
          </div>
          <div>
            Sesiones hechas <strong style={{ color: 'var(--text)' }}>{completedCount}</strong>
          </div>
          <div>
            Racha matutina <strong style={{ color: 'var(--text)' }}>{morningStreak}d</strong>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <h1>{title}</h1>
          <span className="chip accent">MC{state.plan.meso} · S{state.plan.week}</span>
        </header>
        <main className="content" id="main">
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Navegación móvil">
        {NAV.map((n) => (
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
