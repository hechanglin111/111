import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AssessmentAnswers, UserLevel } from '@/types'
import client from '@/api/client'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isOnboarded: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  completeOnboarding: (answers: AssessmentAnswers) => Promise<void>
  determineLevel: (answers: AssessmentAnswers) => UserLevel
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isOnboarded: false,
      isLoading: false,

      determineLevel: (answers: AssessmentAnswers): UserLevel => {
        const { programming_level, ai_understanding, math_level } = answers

        let score = 0

        if (programming_level === '不会编程' || programming_level === '了解基础语法') {
          score += 0
        } else if (programming_level === '熟练使用Python') {
          score += 1
        } else if (programming_level === '有项目经验') {
          score += 2
        }

        if (ai_understanding === '完全不了解' || ai_understanding === '听说过基本概念') {
          score += 0
        } else if (ai_understanding === '使用过AI工具') {
          score += 1
        } else if (ai_understanding === '深入了解原理') {
          score += 2
        }

        if (math_level === '基础数学' || math_level === '高中数学') {
          score += 0
        } else if (math_level === '线性代数和概率论') {
          score += 1
        } else if (math_level === '微积分和优化理论') {
          score += 2
        }

        if (score <= 2) return 'L1'
        if (score <= 4) return 'L2'
        return 'L3'
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const data: any = await client.post('/api/auth/login', { email, password })
          const { token, user } = data.data
          localStorage.setItem('token', token)
          set({
            user,
            isAuthenticated: true,
            isOnboarded: !!user.level,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true })
        try {
          const data: any = await client.post('/api/auth/register', { name, email, password })
          const { token, user } = data.data
          localStorage.setItem('token', token)
          set({
            user,
            isAuthenticated: true,
            isOnboarded: false,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({
          user: null,
          isAuthenticated: false,
          isOnboarded: false,
        })
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token')
        if (!token) return

        set({ isLoading: true })
        try {
          const data: any = await client.get('/api/auth/me')
          const user = data.data
          set({
            user,
            isAuthenticated: true,
            isOnboarded: !!user.level,
          })
        } catch {
          localStorage.removeItem('token')
          set({
            user: null,
            isAuthenticated: false,
            isOnboarded: false,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      completeOnboarding: async (answers: AssessmentAnswers) => {
        const level = get().determineLevel(answers)

        // Map frontend answers to backend format
        const programmingMap: Record<string, string> = {
          '不会编程': 'none',
          '了解基础语法': 'none',
          '熟练使用Python': 'python',
          '有项目经验': 'other',
        }

        const aiMap: Record<string, string> = {
          '完全不了解': 'beginner',
          '听说过基本概念': 'concept',
          '使用过AI工具': 'tools',
          '深入了解原理': 'projects',
        }

        const mathMap: Record<string, string> = {
          '基础数学': 'high_school',
          '高中数学': 'high_school',
          '线性代数和概率论': 'university',
          '微积分和优化理论': 'graduate',
        }

        const goalMap: Record<string, string> = {
          '了解AI趋势': 'trends',
          '掌握AI工具使用': 'use_tools',
          '开发AI应用': 'develop',
          '深入研究AI原理': 'research',
        }

        set({ isLoading: true })
        try {
          await client.post('/api/plan', {
            programmingBase: programmingMap[answers.programming_level] || 'none',
            aiKnowledge: aiMap[answers.ai_understanding] || 'beginner',
            mathBase: mathMap[answers.math_level] || 'high_school',
            goal: goalMap[answers.learning_goal] || 'trends',
            weeklyHours: answers.weekly_hours,
            interests: answers.interests,
          })

          // Refresh user data after plan generation
          const userData: any = await client.get('/api/auth/me')
          set({
            user: userData.data,
            isOnboarded: true,
          })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'ai-daily-learn-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isOnboarded: state.isOnboarded,
      }),
    }
  )
)
