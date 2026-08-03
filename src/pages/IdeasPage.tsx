import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { IdeaCard } from '../components/idea/IdeaCard'
import { STATUS_LEGEND } from '../data/constants'
import { toFaDigits } from '../utils/toFaDigits'

type SortOption = 'hot' | 'new' | 'support'

export function IdeasPage() {
  const { ideas } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('hot')

  const visibleIdeas = useMemo(() => {
    const query = searchTerm.trim()
    let list = ideas.filter((idea) => `${idea.title} ${idea.desc} ${idea.category} ${idea.tag}`.includes(query))
    if (sortBy === 'support') {
      list = [...list].sort((a, b) => b.support - a.support)
    } else if (sortBy === 'new') {
      list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return list
  }, [ideas, searchTerm, sortBy])

  return (
    <section>
      <div className="section-head top">
        <div>
          <h2>همه ایده‌ها</h2>
          <p>پیشنهادها را بخوان، تکمیل کن یا با یک اعتبار از آن‌ها حمایت کن.</p>
        </div>
        <Link to="/" className="btn btn-primary">
          ＋ ثبت ایده
        </Link>
      </div>

      <div className="composer" style={{ padding: 17, marginBottom: 14, boxShadow: 'none', borderRadius: 18 }}>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در عنوان و متن ایده‌ها..."
            style={{
              flex: 1,
              minWidth: 230,
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: 10,
              outline: 'none',
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 9, background: '#fff' }}
          >
            <option value="hot">داغ‌ترین</option>
            <option value="new">جدیدترین</option>
            <option value="support">بیشترین حمایت</option>
          </select>
        </div>
      </div>

      <div className="ideas-layout">
        <div className="idea-list">
          {visibleIdeas.length ? (
            visibleIdeas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
          ) : (
            <div className="panel empty-state">ایده‌ای با این عبارت پیدا نشد.</div>
          )}
        </div>
        <aside className="side-stack">
          <div className="panel">
            <h3>وضعیت‌ها</h3>
            <div className="legend">
              {STATUS_LEGEND.map((item) => (
                <div className="legend-row" key={item.label}>
                  <span>{item.label}</span>
                  <b>{toFaDigits(item.count)}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>قاعده حمایت</h3>
            <p>
              هر فرد حداکثر یک اعتبار روی هر ایده خرج می‌کند. حمایت تا قبل از ورود ایده به مرحله «در حال بررسی» قابل
              پس‌گرفتن است.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
