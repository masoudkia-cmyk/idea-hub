export type StatusClass = 'review' | 'planned' | 'progress' | 'done'

export interface Idea {
  id: string
  title: string
  desc: string
  category: string
  tag: string
  status: string
  statusClass: StatusClass
  support: number
  comments: number
  createdAt: string
  author: string
}

export type TransactionType = 'credit' | 'impact'

export interface WalletTransaction {
  id: string
  date: string
  label: string
  type: TransactionType
  delta: number
  balanceAfter: number
}

export interface NewIdeaInput {
  title: string
  desc: string
  category: string
  severity: string
  solution?: string
  anonymous: boolean
}

export interface BonusCard {
  id: string
  badge: string
  pool: string
  title: string
  meta: string
}

export interface SimilarIdea extends Idea {
  matchScore: number
}
