import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="panel empty-state" style={{ marginTop: 34 }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>صفحه پیدا نشد</h1>
      <p style={{ marginBottom: 14 }}>صفحه مورد نظر شما وجود ندارد.</p>
      <Link to="/" className="btn btn-primary">
        بازگشت به ثبت ایده
      </Link>
    </div>
  )
}
