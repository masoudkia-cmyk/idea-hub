import type { ReactNode } from 'react'
import { Header } from './Header'
import { Toast } from '../common/Toast'
import { CompleteIdeaModal } from '../modals/CompleteIdeaModal'
import { ModerationModal } from '../modals/ModerationModal'
import { IdeaDetailModal } from '../modals/IdeaDetailModal'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
      <Toast />
      <CompleteIdeaModal />
      <ModerationModal />
      <IdeaDetailModal />
    </>
  )
}
