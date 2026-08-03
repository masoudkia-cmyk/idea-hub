import { toFaDigits } from './toFaDigits'

export function relativeTimeFa(isoDate: string): string {
  const diffMs = Math.max(0, Date.now() - new Date(isoDate).getTime())
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day

  if (diffMs < minute) return 'همین حالا'
  if (diffMs < hour) return `${toFaDigits(Math.round(diffMs / minute))} دقیقه پیش`
  if (diffMs < day) return `${toFaDigits(Math.round(diffMs / hour))} ساعت پیش`
  if (diffMs < 2 * day) return 'دیروز'
  if (diffMs < week) return `${toFaDigits(Math.round(diffMs / day))} روز پیش`
  if (diffMs < month) return `${toFaDigits(Math.round(diffMs / week))} هفته پیش`
  return `${toFaDigits(Math.round(diffMs / month))} ماه پیش`
}
