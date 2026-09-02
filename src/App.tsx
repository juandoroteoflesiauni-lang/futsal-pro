import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HoyView } from './views/HoyView'
import { PlanView } from './views/PlanView'
import { RutinaView } from './views/RutinaView'
import { ProgresoView } from './views/ProgresoView'
import { SimfView } from './views/SimfView'
import { PlanRunningView } from './views/PlanRunningView'
import { GymRunningView } from './views/GymRunningView'
import { ProtocolsView } from './views/ProtocolsView'
import { AutoregulationView } from './views/AutoregulationView'
import { MasterPlanView } from './views/MasterPlanView'
import './styles/app.css'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HoyView />} />
          {/* Futsal Routes */}
          <Route path="plan" element={<PlanView />} />
          <Route path="simf" element={<SimfView />} />
          <Route path="rutina" element={<RutinaView />} />
          {/* Running + GYM Routes */}
          <Route path="plan-10k" element={<PlanRunningView />} />
          <Route path="gym-concurrente" element={<GymRunningView />} />
          <Route path="protocolos" element={<ProtocolsView />} />
          <Route path="plan-maestro" element={<MasterPlanView />} />
          <Route path="autorregulacion" element={<AutoregulationView />} />
          {/* Progress (Mode-aware) */}
          <Route path="progreso" element={<ProgresoView />} />
          <Route path="progreso-10k" element={<ProgresoView />} />
          {/* Aliases & Fallbacks */}
          <Route path="running" element={<PlanRunningView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
