import { useEffect, useState } from 'react'
import { Modal } from '../common/Modal'
import { useModal } from '../../context/ModalContext'
import { useAppContext } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import { CATEGORIES, SEVERITY_OPTIONS, SUBMIT_COST } from '../../data/constants'
import { toFaDigits } from '../../utils/toFaDigits'

function suggestTitle(text: string): string {
  const short = text.replace(/[.؟!].*/, '').slice(0, 70).trim()
  return short || 'پیشنهاد جدید برای ایزی‌تریدر'
}

export function CompleteIdeaModal() {
  const { modal, draftText, closeModal, openModeration } = useModal()
  // draftText is the composer's live textarea content, owned by ModalContext
  const { createIdea, tokens } = useAppContext()
  const { showToast } = useToast()

  const open = modal === 'idea-form'

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [severity, setSeverity] = useState<string>(SEVERITY_OPTIONS[0])
  const [solution, setSolution] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(suggestTitle(draftText))
      setDesc(draftText.trim())
      setCategory(CATEGORIES[0])
      setSeverity(SEVERITY_OPTIONS[0])
      setSolution('')
      setAnonymous(false)
    }
  }, [open, draftText])

  const handleSubmit = () => {
    if (title.trim().length < 5 || desc.trim().length < 15) {
      showToast('عنوان و شرح مسئله را کامل کن')
      return
    }
    if (tokens < SUBMIT_COST) {
      showToast('اعتبار کافی برای ثبت ایده نداری')
      return
    }
    const created = createIdea({
      title: title.trim(),
      desc: desc.trim(),
      category,
      severity,
      solution: solution.trim() || undefined,
      anonymous,
    })
    if (!created) {
      showToast('اعتبار کافی برای ثبت ایده نداری')
      return
    }
    openModeration(created.id)
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title="تکمیل و ثبت ایده"
      footer={
        <>
          <span className="cost">
            <i className="token-icon">V</i> هزینه ثبت: {toFaDigits(SUBMIT_COST)} اعتبار
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={closeModal}>
              انصراف
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              ارسال برای بررسی و انتشار
            </button>
          </div>
        </>
      }
    >
      <div className="form-grid">
        <div className="field full">
          <label>عنوان پیشنهادی هوش مصنوعی</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field full">
          <label>شرح مسئله</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <span className="hint">تمرکز اصلی روی مسئله و اثر آن باشد، نه فقط راه‌حل.</span>
        </div>
        <div className="field">
          <label>بخش مرتبط</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>شدت مسئله</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            {SEVERITY_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label>
            راه‌حل پیشنهادی <span style={{ color: '#899690', fontWeight: 400 }}>(اختیاری)</span>
          </label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="راه‌حلی که به ذهنت می‌رسد..."
          />
        </div>
        <div className="field full">
          <label style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            نمایش ناشناس نام پیشنهاددهنده
          </label>
        </div>
      </div>
    </Modal>
  )
}
