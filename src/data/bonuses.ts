import type { BonusCard } from '../types/idea'

export const BONUS_STATS = {
  totalPool: '۸٬۰۰۰ امتیاز',
  totalPoolNote: 'برای ۳ ایده منتشرشده',
  recipients: '۴۲ نفر',
  recipientsNote: 'ایده‌دهنده، حامی و مشارکت‌کننده',
  releasedFeatures: '۳',
  releasedFeaturesNote: 'پس از ارزیابی ۳۰ روزه اثر',
}

export const BONUS_SPLIT = {
  submitter: 25,
  supporters: 60,
  contributors: 15,
}

export const BONUS_CARDS: BonusCard[] = [
  {
    id: 'bonus-1',
    badge: 'اثر راهبردی',
    pool: '۴٬۰۰۰ امتیاز',
    title: 'توضیح ساده علت رد سفارش و اقدام پیشنهادی',
    meta: 'کاهش ابهام کاربران و تماس‌های مرتبط با خطای سفارش',
  },
  {
    id: 'bonus-2',
    badge: 'اثر بزرگ',
    pool: '۲٬۵۰۰ امتیاز',
    title: 'جستجوی سریع نماد بدون نیاز به تایپ کامل',
    meta: 'کاهش زمان رسیدن به نماد و استفاده بیشتر از جستجو',
  },
  {
    id: 'bonus-3',
    badge: 'اثر متوسط',
    pool: '۱٬۵۰۰ امتیاز',
    title: 'نمایش سود و زیان تحقق‌یافته در پرتفوی',
    meta: 'شفاف‌تر شدن نتیجه معاملات بسته‌شده برای کاربران',
  },
]
