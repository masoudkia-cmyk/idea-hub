import { useState } from 'react'
import { Modal } from '../common/Modal'
import { StatusBadge } from '../idea/StatusBadge'
import { useModal } from '../../context/ModalContext'
import { useAppContext } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import { relativeTimeFa } from '../../utils/relativeTime'
import { toFaDigits } from '../../utils/toFaDigits'

const SAMPLE_COMMENTS = [
  {
    author: 'سارا کاظمی',
    text: 'به نظرم این مسئله در نسخه موبایل شدیدتر است؛ بهتر است داده تفکیکی موبایل و دسکتاپ هم بررسی شود.',
  },
  {
    author: 'تیم محصول ایزی',
    text: 'این مشارکت به‌عنوان اطلاعات تکمیلی پذیرفته شد و در ارزیابی مسئله استفاده می‌شود.',
  },
]

export function IdeaDetailModal() {
  const { modal, detailIdeaId, closeModal } = useModal()
  const { getIdea, isSupported, supportIdea } = useAppContext()
  const { showToast } = useToast()
  const [note, setNote] = useState('')

  const open = modal === 'detail'
  const idea = detailIdeaId ? getIdea(detailIdeaId) : undefined
  const active = idea ? isSupported(idea.id) : false

  const handleSupport = () => {
    if (!idea) return
    const result = supportIdea(idea.id)
    showToast(result.message)
  }

  const handleSubmitContribution = () => {
    showToast('مشارکت برای بررسی Moderator ارسال شد')
    setNote('')
  }

  return (
    <Modal open={open && Boolean(idea)} onClose={closeModal} title="جزئیات ایده" size="lg">
      {idea && (
        <div className="detail-layout">
          <div>
            <div className="idea-flags">
              <StatusBadge status={idea.status} statusClass={idea.statusClass} />
              <span className="tag">{idea.category}</span>
              <span className="tag">{idea.tag}</span>
            </div>
            <h1 className="detail-title">{idea.title}</h1>
            <div className="idea-meta">
              <span>{idea.author}</span>
              <span>◷ {relativeTimeFa(idea.createdAt)}</span>
              <span>{toFaDigits(idea.support)} حامی</span>
            </div>
            <h3 style={{ fontSize: 13, margin: '22px 0 5px' }}>شرح مسئله</h3>
            <p className="detail-text">{idea.desc}</p>
            <h3 style={{ fontSize: 13, margin: '24px 0 5px' }}>مشارکت‌ها</h3>
            {SAMPLE_COMMENTS.map((comment) => (
              <div className="comment" key={comment.author}>
                <strong>{comment.author}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
            <div className="field" style={{ marginTop: 13 }}>
              <label>نکته یا اطلاعات تکمیلی</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="مشارکت‌های پذیرفته‌شده یک اعتبار و امتیاز اثرگذاری دریافت می‌کنند."
              />
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ justifySelf: 'start' }}
                onClick={handleSubmitContribution}
              >
                ارسال مشارکت
              </button>
            </div>
          </div>
          <aside className="detail-side">
            <button type="button" className={`support-btn ${active ? 'active' : ''}`} onClick={handleSupport}>
              {active ? '✓ حمایت شد' : '▲ حمایت با ۱ اعتبار'}
            </button>
            <div className="kv">
              <span>مالک بررسی</span>
              <strong>تیم محصول ایزی‌تریدر</strong>
            </div>
            <div className="kv">
              <span>آخرین به‌روزرسانی</span>
              <strong>دیروز</strong>
            </div>
            <div className="kv">
              <span>وضعیت Moderator</span>
              <strong>تأیید و تگ‌گذاری‌شده</strong>
            </div>
            <div className="kv">
              <span>سهم پاداش احتمالی</span>
              <strong>حامیان واجد شرایط: ۶۰٪</strong>
            </div>
          </aside>
        </div>
      )}
    </Modal>
  )
}
