import { useAppContext } from '../context/AppContext'
import { VOICE_CREDIT_RULES, IMPACT_POINT_RULES } from '../data/economyRules'
import { TOKEN_CAP } from '../data/constants'
import { toFaDigits } from '../utils/toFaDigits'

const REWARD_THRESHOLD = 1000

export function EconomyPage() {
  const { tokens, impactScore, walletHistory } = useAppContext()
  const pointsToReward = Math.max(0, REWARD_THRESHOLD - impactScore)
  const progressPercent = Math.min(100, Math.round((impactScore / REWARD_THRESHOLD) * 100))

  return (
    <section>
      <div className="section-head top">
        <div>
          <h2>اعتبار مشارکت و امتیاز اثرگذاری</h2>
          <p>اعتبار برای مشارکت خرج می‌شود؛ امتیاز اثرگذاری از نتیجه واقعی مشارکت به دست می‌آید.</p>
        </div>
        <span className="sample-note">اعداد این نسخه برای پایلوت هستند</span>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">اعتبار مشارکت فعلی</span>
          <strong>{toFaDigits(tokens)}</strong>
          <small>سقف موجودی: {toFaDigits(TOKEN_CAP)} اعتبار</small>
        </div>
        <div className="stat">
          <span className="stat-label">امتیاز اثرگذاری</span>
          <strong>{toFaDigits(impactScore)}</strong>
          <small>{toFaDigits(pointsToReward)} امتیاز تا امکان دریافت پاداش</small>
        </div>
        <div className="stat">
          <span className="stat-label">زمان شارژ بعدی</span>
          <strong style={{ fontSize: 18 }}>اول ماه آینده</strong>
          <small>در صورت خرج‌کردن اعتبار در دوره جاری</small>
        </div>
      </div>

      <div className="economy-grid">
        <article className="economy-card">
          <h3>اعتبار مشارکت (Voice Credit)</h3>
          <p>ارزش ریالی ندارد و فقط برای ثبت یا حمایت از ایده استفاده می‌شود.</p>
          <div className="rule-list">
            {VOICE_CREDIT_RULES.map((rule) => (
              <div className="rule" key={rule.label}>
                <span>{rule.label}</span>
                <b className={`delta ${rule.sign}`}>{rule.delta}</b>
              </div>
            ))}
          </div>
        </article>
        <article className="economy-card">
          <h3>امتیاز اثرگذاری (Impact Point)</h3>
          <p>از مشارکت مؤثر و ایده‌های اجراشده ایجاد می‌شود و می‌تواند به پاداش تبدیل شود.</p>
          <div className="rule-list">
            {IMPACT_POINT_RULES.map((rule) => (
              <div className="rule" key={rule.label}>
                <span>{rule.label}</span>
                <b className={`delta ${rule.sign}`}>{rule.delta}</b>
              </div>
            ))}
          </div>
          <div className="cashout">
            <div className="cashout-head">
              <span>پیشرفت تا حداقل دریافت پاداش</span>
              <strong>{toFaDigits(progressPercent)}٪</strong>
            </div>
            <div className="progress">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <small>در پایلوت: ۱٬۰۰۰ امتیاز = ۱ میلیون تومان؛ با سقف بودجه و تأیید نهایی.</small>
          </div>
        </article>
      </div>

      <div className="section-head">
        <div>
          <h2>تاریخچه کیف پول</h2>
          <p>تمام تغییرات اعتبار و امتیاز شفاف و قابل پیگیری است.</p>
        </div>
      </div>
      <table className="history-table">
        <thead>
          <tr>
            <th>تاریخ</th>
            <th>رویداد</th>
            <th>نوع</th>
            <th>تغییر</th>
            <th>مانده</th>
          </tr>
        </thead>
        <tbody>
          {walletHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.label}</td>
              <td>{entry.type === 'credit' ? 'اعتبار مشارکت' : 'امتیاز اثرگذاری'}</td>
              <td style={{ color: entry.delta >= 0 ? 'var(--brand)' : 'var(--danger)', fontWeight: 900 }}>
                {entry.delta >= 0 ? '+' : '−'}
                {toFaDigits(Math.abs(entry.delta))}
              </td>
              <td>{toFaDigits(entry.balanceAfter)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
