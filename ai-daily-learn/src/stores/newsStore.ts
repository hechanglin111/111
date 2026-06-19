import { create } from 'zustand'
import type { AINews } from '@/types'
import client from '@/api/client'

interface NewsState {
  news: AINews[]
  selectedTags: string[]
  allTags: string[]
  isLoading: boolean
  total: number
  page: number
  limit: number
  toggleBookmark: (newsId: string) => Promise<void>
  markAsRead: (newsId: string) => void
  setFilterTags: (tags: string[]) => void
  getFilteredNews: () => AINews[]
  fetchNews: (params?: { page?: number; limit?: number; tag?: string }) => Promise<void>
}

// Extract all unique tags from news data
const extractAllTags = (newsList: AINews[]): string[] => {
  const tagSet = new Set<string>()
  newsList.forEach((item) => {
    item.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet)
}

export const useNewsStore = create<NewsState>((set, get) => ({
  news: [],
  selectedTags: [],
  allTags: [],
  isLoading: false,
  total: 0,
  page: 1,
  limit: 20,

  fetchNews: async (params = {}) => {
    const { page = 1, limit = 20, tag } = params
    set({ isLoading: true })
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('page', String(page))
      queryParams.append('limit', String(limit))
      if (tag) queryParams.append('tag', tag)

      const data: any = await client.get(`/api/news?${queryParams.toString()}`)
      const { list, total } = data.data

      const allTags = extractAllTags(list)

      set({
        news: list,
        total,
        page,
        limit,
        allTags,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  toggleBookmark: async (newsId: string) => {
    try {
      const data: any = await client.post(`/api/news/${newsId}/favorite`)
      const { isBookmarked } = data.data

      set((state) => ({
        news: state.news.map((item) =>
          item.id === newsId
            ? { ...item, is_bookmarked: isBookmarked }
            : item
        ),
      }))
    } catch {
      // Error handled by client interceptor
    }
  },

  markAsRead: (newsId: string) => {
    set((state) => ({
      news: state.news.map((item) =>
        item.id === newsId ? { ...item, is_read: true } : item
      ),
    }))
  },

  setFilterTags: (tags: string[]) => {
    set({ selectedTags: tags })
  },

  getFilteredNews: (): AINews[] => {
    const { news, selectedTags } = get()

    if (selectedTags.length === 0) return news

    return news.filter((item) =>
      item.tags.some((tag) => selectedTags.includes(tag))
    )
  },
}))
