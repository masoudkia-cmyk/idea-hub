import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { toFaDigits } from '../../utils/toFaDigits'
import { SUBMIT_COST, SUPPORT_COST } from '../../data/constants'

export function WalletCard() {
  const { tokens } = useAppContext()

  return (
    <aside className="wallet-card">
      <div className="wallet-head">
        <strong>کیف پول مشارکت</strong>
        <span>دوره جاری</span>
      </div>
      <div className="wallet-balance">{toFaDigits(tokens)}</div>
      <div className="wallet-label">اعتبار قابل خرج</div>
      <div className="wallet-divider" />
      <div className="wallet-row">
        <span>ثبت ایده جدید</span>
        <strong>{toFaDigits(SUBMIT_COST)} اعتبار</strong>
      </div>
      <div className="wallet-row">
        <span>حمایت از ایده</span>
        <strong>{toFaDigits(SUPPORT_COST)} اعتبار</strong>
      </div>
      <div className="wallet-row">
        <span>مشارکت پذیرفته‌شده</span>
        <strong>۱+ اعتبار</strong>
      </div>
      <Link to="/economy" className="btn">
        جزئیات اقتصاد مشارکت
      </Link>
    </aside>
  )
}
