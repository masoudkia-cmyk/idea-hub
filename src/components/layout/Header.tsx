import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { toFaDigits } from '../../utils/toFaDigits'

const NAV_ITEMS = [
  { to: '/', label: 'ثبت ایده', end: true },
  { to: '/ideas', label: 'ایده‌ها', end: false },
  { to: '/economy', label: 'اعتبار و پاداش', end: false },
  { to: '/bonuses', label: 'بونس‌های ماه قبل', end: false },
]

export function Header() {
  const { tokens, currentUser } = useAppContext()

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <NavLink to="/" className="brand">
          <span className="logo">V</span>
          <span>
            صدای ایزی
            <small className="brand-sub">پیشنهادها و ایده‌های ایزی‌تریدر</small>
          </span>
        </NavLink>
        <nav className="nav" aria-label="ناوبری اصلی">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="account">
          <NavLink to="/economy" className="wallet-pill" title="مشاهده کیف پول">
            <span>اعتبار مشارکت</span>
            <strong>{toFaDigits(tokens)}</strong>
            <i className="token-icon">V</i>
          </NavLink>
          <span className="avatar">{currentUser.charAt(0)}</span>
        </div>
      </div>
    </header>
  )
}
