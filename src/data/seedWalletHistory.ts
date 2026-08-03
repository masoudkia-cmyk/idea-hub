import type { WalletTransaction } from '../types/idea'

export const SEED_WALLET_HISTORY: WalletTransaction[] = [
  { id: 'wh-1', date: '۲۵ تیر', label: 'شارژ دوره‌ای کاربر فعال', type: 'credit', delta: 3, balanceAfter: 3 },
  {
    id: 'wh-2',
    date: '۱۸ تیر',
    label: 'مشارکت پذیرفته‌شده در ایده «رد سفارش»',
    type: 'impact',
    delta: 20,
    balanceAfter: 840,
  },
  { id: 'wh-3', date: '۱۰ تیر', label: 'ورود ایده به برنامه محصول', type: 'impact', delta: 100, balanceAfter: 820 },
]
