import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useModal } from '../../context/ModalContext'
import { useToast } from '../../context/ToastContext'
import { SimilarIdeaItem } from '../idea/SimilarIdeaItem'
import { findSimilarIdeas } from '../../utils/similarity'
import { toFaDigits } from '../../utils/toFaDigits'
import { SUBMIT_COST } from '../../data/constants'
import type { SimilarIdea } from '../../types/idea'

const MIN_LENGTH = 18
const MAX_LENGTH = 700
const ANALYSIS_DELAY_MS = 650

export function Composer() {
  const { ideas } = useAppContext()
  const { draftText, setDraftText, openIdeaForm } = useModal()
  const { showToast } = useToast()

  const [analyzing, setAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [similarIdeas, setSimilarIdeas] = useState<SimilarIdea[]>([])

  const trimmedLength = draftText.trim().length
  const canAnalyze = trimmedLength >= MIN_LENGTH
  const showAiBox = hasAnalyzed && canAnalyze

  const handleChange = (value: string) => {
    setDraftText(value)
    if (value.trim().length < MIN_LENGTH) {
      setHasAnalyzed(false)
    }
  }

  const handleAnalyze = () => {
    if (trimmedLength < MIN_LENGTH) {
      showToast('کمی بیشتر درباره مسئله توضیح بده')
      return
    }
    setAnalyzing(true)
    window.setTimeout(() => {
      setSimilarIdeas(findSimilarIdeas(draftText, ideas))
      setHasAnalyzed(true)
      setAnalyzing(false)
    }, ANALYSIS_DELAY_MS)
  }

  return (
    <div className="composer">
      <span className="kicker">● نسخه آزمایشی ایزی‌تریدر</span>
      <h1>چه چیزی را در ایزی‌تریدر بهتر کنیم؟</h1>
      <p className="composer-intro">
        مسئله یا پیشنهادی که داری را بنویس. قبل از ثبت، هوش مصنوعی ایده‌های مشابه را پیدا می‌کند تا از تکرار
        جلوگیری شود.
      </p>
      <textarea
        className="idea-input"
        maxLength={MAX_LENGTH}
        placeholder="مثلاً وقتی سفارش من رد می‌شود، متن خطا فنی است و نمی‌دانم برای اصلاح آن باید چه کاری انجام دهم..."
        value={draftText}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="composer-foot">
        <span className="char-count">
          <b>{toFaDigits(draftText.length)}</b> از {toFaDigits(MAX_LENGTH)} نویسه
        </span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="cost">
            <i className="token-icon">V</i> ثبت ایده جدید: {toFaDigits(SUBMIT_COST)} اعتبار
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={!canAnalyze || analyzing}
          >
            {analyzing
              ? 'در حال پیدا کردن ایده‌های مشابه...'
              : hasAnalyzed
                ? 'بررسی دوباره با هوش مصنوعی'
                : 'بررسی ایده با هوش مصنوعی'}
          </button>
        </div>
      </div>

      <div className={`ai-box ${showAiBox ? 'show' : ''}`}>
        <div className="ai-head">
          <div className="ai-title">
            <i className="ai-dot" /> چند ایده شبیه پیشنهاد تو پیدا شد
          </div>
          <span className="ai-state">تحلیل شباهت انجام شد</span>
        </div>
        <div className="similar-list">
          {similarIdeas.map((idea) => (
            <SimilarIdeaItem key={idea.id} idea={idea} />
          ))}
        </div>
        <div className="continue-box">
          <span>هیچ‌کدام دقیقاً مسئله تو نیست؟ ایده جدید را با {toFaDigits(SUBMIT_COST)} اعتبار ثبت کن.</span>
          <button type="button" className="btn btn-outline btn-sm" onClick={openIdeaForm}>
            ادامه ثبت ایده
          </button>
        </div>
      </div>
    </div>
  )
}
