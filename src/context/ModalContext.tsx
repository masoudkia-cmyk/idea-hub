import { createContext, useContext, useState, type ReactNode } from 'react'

type ModalKind = 'idea-form' | 'moderation' | 'detail' | null

interface ModalContextValue {
  modal: ModalKind
  draftText: string
  setDraftText: (text: string) => void
  detailIdeaId: string | null
  lastCreatedId: string | null
  openIdeaForm: () => void
  openModeration: (createdIdeaId: string) => void
  openDetail: (ideaId: string) => void
  finishModeration: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalKind>(null)
  const [draftText, setDraftText] = useState('')
  const [detailIdeaId, setDetailIdeaId] = useState<string | null>(null)
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null)

  const value: ModalContextValue = {
    modal,
    draftText,
    setDraftText,
    detailIdeaId,
    lastCreatedId,
    openIdeaForm: () => setModal('idea-form'),
    openModeration: (createdIdeaId) => {
      setLastCreatedId(createdIdeaId)
      setModal('moderation')
    },
    openDetail: (ideaId) => {
      setDetailIdeaId(ideaId)
      setModal('detail')
    },
    finishModeration: () => {
      setDraftText('')
      if (lastCreatedId) {
        setDetailIdeaId(lastCreatedId)
        setModal('detail')
      } else {
        setModal(null)
      }
    },
    closeModal: () => setModal(null),
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
