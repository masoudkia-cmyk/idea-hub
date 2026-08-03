import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SEED_IDEAS } from '../data/seedIdeas'
import { SEED_WALLET_HISTORY } from '../data/seedWalletHistory'
import {
  CURRENT_USER,
  IDEAS_STORAGE_KEY,
  IMPACT_SCORE_STORAGE_KEY,
  LOCKED_SUPPORT_STATUSES,
  STARTING_IMPACT_SCORE,
  STARTING_TOKENS,
  SUBMIT_COST,
  SUPPORTED_IDS_STORAGE_KEY,
  SUPPORT_COST,
  TOKENS_STORAGE_KEY,
  WALLET_HISTORY_STORAGE_KEY,
} from '../data/constants'
import type { Idea, NewIdeaInput, WalletTransaction } from '../types/idea'

interface SupportResult {
  ok: boolean
  message: string
}

interface AppContextValue {
  ideas: Idea[]
  tokens: number
  impactScore: number
  supportedIds: string[]
  walletHistory: WalletTransaction[]
  currentUser: string
  isSupported: (ideaId: string) => boolean
  canRetractSupport: (ideaId: string) => boolean
  getIdea: (ideaId: string) => Idea | undefined
  createIdea: (input: NewIdeaInput) => Idea | null
  supportIdea: (ideaId: string) => SupportResult
}

const AppContext = createContext<AppContextValue | null>(null)

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>(IDEAS_STORAGE_KEY, SEED_IDEAS)
  const [tokens, setTokens] = useLocalStorage<number>(TOKENS_STORAGE_KEY, STARTING_TOKENS)
  const [impactScore] = useLocalStorage<number>(IMPACT_SCORE_STORAGE_KEY, STARTING_IMPACT_SCORE)
  const [supportedIds, setSupportedIds] = useLocalStorage<string[]>(SUPPORTED_IDS_STORAGE_KEY, [])
  const [walletHistory, setWalletHistory] = useLocalStorage<WalletTransaction[]>(
    WALLET_HISTORY_STORAGE_KEY,
    SEED_WALLET_HISTORY,
  )

  const value = useMemo<AppContextValue>(() => {
    const isSupported = (ideaId: string) => supportedIds.includes(ideaId)

    const canRetractSupport = (ideaId: string) => {
      const idea = ideas.find((i) => i.id === ideaId)
      if (!idea) return false
      return !LOCKED_SUPPORT_STATUSES.includes(idea.status)
    }

    return {
      ideas,
      tokens,
      impactScore,
      supportedIds,
      walletHistory,
      currentUser: CURRENT_USER,
      isSupported,
      canRetractSupport,
      getIdea: (ideaId) => ideas.find((i) => i.id === ideaId),

      createIdea: (input) => {
        if (tokens < SUBMIT_COST) return null

        const newIdea: Idea = {
          id: createId('idea'),
          title: input.title,
          desc: input.desc,
          category: input.category,
          tag: 'ایده جدید',
          status: 'منتشرشده توسط AI',
          statusClass: 'review',
          support: 0,
          comments: 0,
          createdAt: new Date().toISOString(),
          author: CURRENT_USER,
        }

        setIdeas((prev) => [newIdea, ...prev])
        setTokens((prev) => prev - SUBMIT_COST)
        setWalletHistory((prev) => [
          {
            id: createId('wh'),
            date: 'امروز',
            label: `ثبت ایده «${input.title}»`,
            type: 'credit',
            delta: -SUBMIT_COST,
            balanceAfter: tokens - SUBMIT_COST,
          },
          ...prev,
        ])

        return newIdea
      },

      supportIdea: (ideaId) => {
        const idea = ideas.find((i) => i.id === ideaId)
        if (!idea) return { ok: false, message: 'ایده پیدا نشد' }

        if (isSupported(ideaId)) {
          if (!canRetractSupport(ideaId)) {
            return { ok: false, message: 'پس از ورود ایده به مرحله بررسی، حمایت قابل پس‌گرفتن نیست' }
          }
          setSupportedIds((prev) => prev.filter((id) => id !== ideaId))
          setIdeas((prev) => prev.map((i) => (i.id === ideaId ? { ...i, support: i.support - 1 } : i)))
          setTokens((prev) => prev + SUPPORT_COST)
          return { ok: true, message: 'حمایت برداشته شد و اعتبار برگشت' }
        }

        if (tokens < SUPPORT_COST) {
          return { ok: false, message: 'برای حمایت به یک اعتبار نیاز داری' }
        }
        if (idea.author === CURRENT_USER) {
          return { ok: false, message: 'نمی‌توانی از ایده خودت حمایت کنی' }
        }

        setSupportedIds((prev) => [...prev, ideaId])
        setIdeas((prev) => prev.map((i) => (i.id === ideaId ? { ...i, support: i.support + 1 } : i)))
        setTokens((prev) => prev - SUPPORT_COST)
        setWalletHistory((prev) => [
          {
            id: createId('wh'),
            date: 'امروز',
            label: `حمایت از «${idea.title}»`,
            type: 'credit',
            delta: -SUPPORT_COST,
            balanceAfter: tokens - SUPPORT_COST,
          },
          ...prev,
        ])
        return { ok: true, message: 'حمایت ثبت شد؛ در صورت اجرای ایده در پاداش سهیم می‌شوی' }
      },
    }
  }, [ideas, tokens, impactScore, supportedIds, walletHistory, setIdeas, setTokens, setSupportedIds, setWalletHistory])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
