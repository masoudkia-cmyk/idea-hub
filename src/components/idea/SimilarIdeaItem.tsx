import { useAppContext } from '../../context/AppContext'
import { useModal } from '../../context/ModalContext'
import { useToast } from '../../context/ToastContext'
import { toFaDigits } from '../../utils/toFaDigits'
import type { SimilarIdea } from '../../types/idea'

export function SimilarIdeaItem({ idea }: { idea: SimilarIdea }) {
  const { supportIdea } = useAppContext()
  const { openDetail } = useModal()
  const { showToast } = useToast()

  const handleSupport = () => {
    const result = supportIdea(idea.id)
    showToast(result.message)
  }

  return (
    <div className="similar-item">
      <div>
        <button type="button" className="similar-title" onClick={() => openDetail(idea.id)}>
          {idea.title}
        </button>
        <div className="similar-meta">
          <span className="match">{toFaDigits(idea.matchScore)}٪ شباهت</span>
          <span>{toFaDigits(idea.support)} حمایت</span>
          <span>{idea.status}</span>
        </div>
      </div>
      <button type="button" className="btn btn-soft btn-sm" onClick={handleSupport}>
        حمایت با ۱ اعتبار
      </button>
    </div>
  )
}
