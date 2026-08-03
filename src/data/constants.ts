export const CATEGORIES = [
  'معامله و سفارش‌گذاری',
  'پرتفوی و دارایی',
  'نمای بازار و جستجو',
  'واریز و برداشت',
  'ورود و شروع سرمایه‌گذاری',
  'دستیار هوشمند',
] as const

export const SEVERITY_OPTIONS = ['تجربه نامطلوب', 'مانع انجام کار', 'خطای پرتکرار', 'فرصت رشد'] as const

export const FEATURED_FILTERS = [
  { label: 'همه', value: 'all' },
  { label: 'سفارش', value: 'سفارش‌گذاری' },
  { label: 'جستجو', value: 'جستجو' },
  { label: 'هوش مصنوعی', value: 'هوش مصنوعی' },
] as const

export const SUBMIT_COST = 2
export const SUPPORT_COST = 1
export const STARTING_TOKENS = 3
export const TOKEN_CAP = 4
export const STARTING_IMPACT_SCORE = 840
export const CURRENT_USER = 'مسعود'

export const LOCKED_SUPPORT_STATUSES = ['در حال بررسی', 'برنامه‌ریزی‌شده', 'در حال اجرا', 'منتشرشده']

export const STATUS_LEGEND = [
  { label: 'در حال بررسی', count: 28 },
  { label: 'برنامه‌ریزی‌شده', count: 14 },
  { label: 'در حال اجرا', count: 7 },
  { label: 'منتشرشده', count: 11 },
]

export const IDEAS_STORAGE_KEY = 'sedaye-easy:ideas'
export const TOKENS_STORAGE_KEY = 'sedaye-easy:tokens'
export const SUPPORTED_IDS_STORAGE_KEY = 'sedaye-easy:supportedIds'
export const WALLET_HISTORY_STORAGE_KEY = 'sedaye-easy:walletHistory'
export const IMPACT_SCORE_STORAGE_KEY = 'sedaye-easy:impactScore'
