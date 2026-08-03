import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Composer } from '../components/composer/Composer'
import { WalletCard } from '../components/composer/WalletCard'
import { IdeaCard } from '../components/idea/IdeaCard'
import { FEATURED_FILTERS } from '../data/constants'

export function SubmitPage() {
  const { ideas } = useAppContext()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const featuredIdeas = useMemo(() => {
    const filtered =
      activeFilter === 'all'
        ? ideas
        : ideas.filter((idea) => idea.category === activeFilter || idea.tag === activeFilter)
    return filtered.slice(0, 5)
  }, [ideas, activeFilter])

  return (
    <section>
      <div className="composer-shell">
        <Composer />
        <WalletCard />
      </div>

      <div className="section-head">
        <div>
          <h2>ایده‌هایی که ارزش دیدن دارند</h2>
          <p>قبل از ثبت ایده جدید، ببین دیگران چه مسائلی را مطرح کرده‌اند.</p>
        </div>
        <div className="filters">
          {FEATURED_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`chip ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ideas-layout">
        <div className="idea-list">
          {featuredIdeas.length ? (
            featuredIdeas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
          ) : (
            <div className="panel empty-state">ایده‌ای با این فیلتر پیدا نشد.</div>
          )}
        </div>
        <aside className="side-stack">
          <div className="panel">
            <h3>Moderator هوش مصنوعی، همیشه فعال</h3>
            <p>هر پیام پیش از انتشار بررسی، دسته‌بندی و در صورت نیاز پاسخ داده می‌شود.</p>
            <div className="moderator-line">
              <i className="mod-icon">✓</i>
              <div>
                <strong>بررسی انتشار</strong>
                <span>محتوای نامرتبط، حساس یا مغایر منتشر نمی‌شود.</span>
              </div>
            </div>
            <div className="moderator-line">
              <i className="mod-icon">#</i>
              <div>
                <strong>تگ‌گذاری خودکار</strong>
                <span>ایده‌ها بر اساس بخش و موضوع دسته‌بندی می‌شوند.</span>
              </div>
            </div>
            <div className="moderator-line">
              <i className="mod-icon">AI</i>
              <div>
                <strong>پاسخ اولیه</strong>
                <span>سؤال‌های دارای پاسخ مصوب، همان لحظه پاسخ می‌گیرند.</span>
              </div>
            </div>
          </div>
          <div className="panel">
            <h3>چرا اعتبار محدود است؟</h3>
            <p>
              تا به‌جای «ایده‌باران»، روی مسائل مهم‌تر تمرکز کنیم و پیش از ثبت، پیشنهادهای موجود را بخوانیم و تقویت
              کنیم.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
