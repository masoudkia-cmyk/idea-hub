import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'
import { ModalProvider } from './context/ModalContext'
import { Layout } from './components/layout/Layout'
import { SubmitPage } from './pages/SubmitPage'
import { IdeasPage } from './pages/IdeasPage'
import { EconomyPage } from './pages/EconomyPage'
import { BonusesPage } from './pages/BonusesPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <ModalProvider>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<SubmitPage />} />
                <Route path="/ideas" element={<IdeasPage />} />
                <Route path="/economy" element={<EconomyPage />} />
                <Route path="/bonuses" element={<BonusesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </HashRouter>
        </ModalProvider>
      </ToastProvider>
    </AppProvider>
  )
}
