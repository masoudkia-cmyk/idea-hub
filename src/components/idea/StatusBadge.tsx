import type { StatusClass } from '../../types/idea'

export function StatusBadge({ status, statusClass }: { status: string; statusClass: StatusClass }) {
  return <span className={`status ${statusClass}`}>{status}</span>
}
