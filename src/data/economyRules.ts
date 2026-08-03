export interface EconomyRule {
  label: string
  delta: string
  sign: 'plus' | 'minus'
}

export const VOICE_CREDIT_RULES: EconomyRule[] = [
  { label: 'شارژ دوره‌ای کاربر فعال', delta: '+۳', sign: 'plus' },
  { label: 'ثبت ایده جدید', delta: '−۲', sign: 'minus' },
  { label: 'حمایت از ایده دیگران', delta: '−۱', sign: 'minus' },
  { label: 'مشارکت پذیرفته‌شده', delta: '+۱', sign: 'plus' },
  { label: 'محتوای اسپم یا خارج از موضوع', delta: '−۲', sign: 'minus' },
]

export const IMPACT_POINT_RULES: EconomyRule[] = [
  { label: 'مشارکت پذیرفته‌شده در تکمیل ایده', delta: '+۲۰', sign: 'plus' },
  { label: 'ورود ایده به مرحله بررسی', delta: '+۵۰', sign: 'plus' },
  { label: 'ورود ایده به برنامه محصول', delta: '+۱۰۰', sign: 'plus' },
  { label: 'مشارکت در تست قابلیت', delta: '+۵۰ تا ۱۵۰', sign: 'plus' },
]
