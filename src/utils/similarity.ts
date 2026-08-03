import type { Idea, SimilarIdea } from '../types/idea'

const STOPWORDS = new Set([
  'و', 'در', 'به', 'از', 'که', 'را', 'با', 'برای', 'یا', 'این', 'آن',
  'های', 'می', 'شود', 'شده', 'است', 'هم', 'تا', 'یک', 'روی', 'اگر',
])

function tokenize(text: string): string[] {
  return text
    .replace(/[.,،؛:!؟()«»"'‌]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))
}

/**
 * Simulates an AI similarity check purely on the client: scores each existing
 * idea against the drafted text using keyword and category overlap, with no
 * external API call involved.
 */
export function findSimilarIdeas(inputText: string, ideas: Idea[], limit = 3): SimilarIdea[] {
  const inputTokens = new Set(tokenize(inputText))
  if (inputTokens.size === 0) return []

  return ideas
    .map((idea) => {
      const overlap = tokenize(`${idea.title} ${idea.desc}`).filter((word) => inputTokens.has(word)).length
      const categoryOverlap = tokenize(idea.category).some((word) => inputTokens.has(word)) ? 1 : 0
      const raw = overlap * 11 + categoryOverlap * 9
      const matchScore = Math.max(38, Math.min(96, 46 + raw))
      return { ...idea, matchScore }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)
}
