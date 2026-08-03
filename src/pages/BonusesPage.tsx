import { BONUS_CARDS, BONUS_SPLIT, BONUS_STATS } from '../data/bonuses'
import { toFaDigits } from '../utils/toFaDigits'

export function BonusesPage() {
  return (
    <section>
      <div className="section-head top">
        <div>
          <h2>بونس‌های ماه قبل</h2>
          <p>پاداش ایده‌های منتشرشده بر اساس اثر واقعی و مشارکت جمعی تقسیم شده است.</p>
        </div>
        <span className="sample-note">داده نمونه برای نمایش مدل</span>
      </div>

      <div className="stats-grid" style={{ marginBottom: 16 }}>
        <div className="stat">
          <span className="stat-label">مجموع استخر پاداش</span>
          <strong>{BONUS_STATS.totalPool}</strong>
          <small>{BONUS_STATS.totalPoolNote}</small>
        </div>
        <div className="stat">
          <span className="stat-label">دریافت‌کنندگان پاداش</span>
          <strong>{BONUS_STATS.recipients}</strong>
          <small>{BONUS_STATS.recipientsNote}</small>
        </div>
        <div className="stat">
          <span className="stat-label">قابلیت‌های منتشرشده</span>
          <strong>{BONUS_STATS.releasedFeatures}</strong>
          <small>{BONUS_STATS.releasedFeaturesNote}</small>
        </div>
      </div>

      <div className="bonus-grid">
        {BONUS_CARDS.map((card) => (
          <article className="bonus-card" key={card.id}>
            <span className="bonus-badge">{card.badge}</span>
            <div className="bonus-pool">{card.pool}</div>
            <div className="bonus-title">{card.title}</div>
            <div className="bonus-meta">{card.meta}</div>
            <div className="split">
              <span />
              <span />
              <span />
            </div>
            <div className="split-labels">
              <span>{toFaDigits(BONUS_SPLIT.submitter)}٪ ایده‌دهنده</span>
              <span>{toFaDigits(BONUS_SPLIT.supporters)}٪ حامیان</span>
              <span>{toFaDigits(BONUS_SPLIT.contributors)}٪ مشارکت‌کنندگان</span>
            </div>
          </article>
        ))}
      </div>

      <div className="economy-card" style={{ marginTop: 17 }}>
        <h3>قاعده تقسیم پاداش</h3>
        <p style={{ marginBottom: 0 }}>
          فقط حمایت‌هایی که قبل از ورود ایده به مرحله «در حال بررسی» ثبت شده باشند در سهم پاداش محاسبه می‌شوند. سطح
          پاداش پس از انتشار و ارزیابی داده‌های استفاده، کاهش خطا، تماس پشتیبانی یا بهبود تبدیل تعیین می‌شود.
        </p>
      </div>
    </section>
  )
}
