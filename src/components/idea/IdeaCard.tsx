import { useAppContext } from '../../context/AppContext'
import { useModal } from '../../context/ModalContext'
import { useToast } from '../../context/ToastContext'
import { relativeTimeFa } from '../../utils/relativeTime'
import { toFaDigits } from '../../utils/toFaDigits'
import { StatusBadge } from './StatusBadge'
import type { Idea } from '../../types/idea'

export function IdeaCard({ idea }: { idea: Idea }) {
  const { isSupported, supportIdea } = useAppContext()
  const { openDetail } = useModal()
  const { showToast } = useToast()
  const active = isSupported(idea.id)

  const handleSupport = () => {
    const result = supportIdea(idea.id)
    showToast(result.message)
  }

  return (
    <article className="idea-card">
      <div className="idea-main">
        <div className="idea-flags">
          <StatusBadge status={idea.status} statusClass={idea.statusClass} />
          <span className="tag">{idea.category}</span>
          <span className="tag">{idea.tag}</span>
        </div>
        <button type="button" className="idea-title" onClick={() => openDetail(idea.id)}>
          {idea.title}
        </button>
        <p className="idea-desc">{idea.desc}</p>
        <div className="idea-meta">
          <span>{idea.author}</span>
          <span>◷ {relativeTimeFa(idea.createdAt)}</span>
          <span>◌ {toFaDigits(idea.comments)} دیدگاه</span>
        </div>
      </div>
      <div className="idea-actions">
        <button type="button" className={`support-btn ${active ? 'active' : ''}`} onClick={handleSupport}>
          {active ? '✓ حمایت شد' : '▲ حمایت با ۱ اعتبار'}
        </button>
        <span className="support-count">
          <b>{toFaDigits(idea.support)}</b> حامی
        </span>
      </div>
    </article>
  )
}
