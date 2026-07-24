import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HoyView } from './views/HoyView'
import { PlanView } from './views/PlanView'
import { RutinaView } from './views/RutinaView'
import { ProgresoView } from './views/ProgresoView'
import './styles/app.css'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HoyView />} />
          <Route path="plan" element={<PlanView />} />
          <Route path="rutina" element={<RutinaView />} />
          <Route path="progreso" element={<ProgresoView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
