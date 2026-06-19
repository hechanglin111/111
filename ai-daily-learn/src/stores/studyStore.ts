import { create } from 'zustand'
import type { StudyPlan, LearningProgress, DayStatus, DayPlan } from '@/types'
import client from '@/api/client'

interface StudyState {
  studyPlan: StudyPlan | null
  progress: LearningProgress | null
  currentDayPlan: DayPlan | null
  isLoading: boolean
  isUpdating: boolean
  setStudyPlan: (plan: StudyPlan) => void
  fetchStudyPlan: () => Promise<void>
  fetchToday: () => Promise<void>
  updateProgress: (dayTaskId: string, status: DayStatus, completionRate?: number, videoProgress?: number, docRead?: boolean) => Promise<void>
  updateDayStatus: (unitId: string, dayNumber: number, status: DayStatus) => void
  updateVideoProgress: (videoId: string, progress: number) => void
  markDocRead: (docId: string) => void
  markDayCompleted: (unitId: string, dayNumber: number) => Promise<void>
}

export const useStudyStore = create<StudyState>((set, get) => ({
  studyPlan: null,
  progress: null,
  currentDayPlan: null,
  isLoading: false,
  isUpdating: false,

  setStudyPlan: (plan: StudyPlan) => {
    set({ studyPlan: plan })

    // Auto-determine current day plan based on progress
    const state = get()
    if (state.progress) {
      const unit = plan.units.find(
        (u) => u.unit_id === state.progress!.current_unit_id
      )
      if (unit) {
        const day = unit.days.find(
          (d) => d.day_number === state.progress!.current_day
        )
        set({ currentDayPlan: day ?? null })
      }
    }
  },

  fetchStudyPlan: async () => {
    set({ isLoading: true })
    try {
      const data: any = await client.get('/api/plan')
      const plan: StudyPlan = data.data
      set({ studyPlan: plan })

      // Also set currentDayPlan if we have progress
      const state = get()
      if (state.progress) {
        const unit = plan.units.find(
          (u) => u.unit_id === state.progress!.current_unit_id
        )
        if (unit) {
          const day = unit.days.find(
            (d) => d.day_number === state.progress!.current_day
          )
          set({ currentDayPlan: day ?? null })
        }
      }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchToday: async () => {
    set({ isLoading: true })
    try {
      const data: any = await client.get('/api/plan/today')
      const { dayTask, progress } = data.data
      set({
        currentDayPlan: dayTask,
        progress,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  updateProgress: async (dayTaskId: string, status: DayStatus, completionRate?: number, videoProgress?: number, docRead?: boolean) => {
    set({ isUpdating: true })
    try {
      const data: any = await client.put('/api/plan/progress', {
        dayTaskId,
        status,
        completionRate,
        videoProgress,
        docRead,
      })
      const updatedProgress: LearningProgress = data.data
      set({ progress: updatedProgress })
    } finally {
      set({ isUpdating: false })
    }
  },

  updateDayStatus: (unitId: string, dayNumber: number, status: DayStatus) => {
    set((state) => {
      if (!state.studyPlan) return state

      const updatedUnits = state.studyPlan.units.map((unit) => {
        if (unit.unit_id !== unitId) return unit

        const updatedDays = unit.days.map((day) => {
          if (day.day_number !== dayNumber) return day
          return { ...day, status }
        })

        return { ...unit, days: updatedDays }
      })

      return {
        studyPlan: { ...state.studyPlan, units: updatedUnits },
      }
    })
  },

  updateVideoProgress: (videoId: string, progress: number) => {
    set((state) => {
      if (!state.progress) return state

      return {
        progress: {
          ...state.progress,
          video_watch_progress: {
            ...state.progress.video_watch_progress,
            [videoId]: Math.min(100, Math.max(0, progress)),
          },
        },
      }
    })
  },

  markDocRead: (docId: string) => {
    set((state) => {
      if (!state.progress) return state

      return {
        progress: {
          ...state.progress,
          doc_read_status: {
            ...state.progress.doc_read_status,
            [docId]: true,
          },
        },
      }
    })
  },

  markDayCompleted: async (unitId: string, dayNumber: number) => {
    const state = get()
    if (!state.studyPlan || !state.progress) return

    // Find the dayTaskId for the given unit and day
    const unit = state.studyPlan.units.find((u) => u.unit_id === unitId)
    const day = unit?.days.find((d) => d.day_number === dayNumber)
    if (!day) return

    // Call API to update progress
    await get().updateProgress(day.day_number.toString(), 'completed', 100)

    // Optimistically update local state
    set((state) => {
      if (!state.studyPlan || !state.progress) return state

      const videoId = `${unitId}_day_${String(dayNumber).padStart(2, '0')}`

      const updatedUnits = state.studyPlan.units.map((unit) => {
        if (unit.unit_id !== unitId) return unit

        const updatedDays = unit.days.map((day) => {
          if (day.day_number !== dayNumber) return day
          return { ...day, status: 'completed' as DayStatus, completion_rate: 100 }
        })

        return { ...unit, days: updatedDays }
      })

      // Determine the next day
      const currentUnit = updatedUnits.find((u) => u.unit_id === unitId)
      const currentDayIndex = currentUnit?.days.findIndex(
        (d) => d.day_number === dayNumber
      )
      let nextUnitId = unitId
      let nextDay = dayNumber + 1

      if (currentUnit && currentDayIndex !== undefined) {
        if (currentDayIndex + 1 >= currentUnit.days.length) {
          const nextUnitIndex = updatedUnits.findIndex(
            (u) => u.order === (currentUnit.order ?? 0) + 1
          )
          if (nextUnitIndex !== -1) {
            nextUnitId = updatedUnits[nextUnitIndex].unit_id
            nextDay = 1
          }
        }
      }

      const isLastDay =
        currentUnit &&
        currentDayIndex === currentUnit.days.length - 1 &&
        updatedUnits.findIndex((u) => u.order === (currentUnit.order ?? 0) + 1) === -1

      return {
        studyPlan: { ...state.studyPlan, units: updatedUnits },
        progress: {
          ...state.progress,
          current_unit_id: isLastDay ? state.progress.current_unit_id : nextUnitId,
          current_day: isLastDay ? state.progress.current_day : nextDay,
          total_completed_days: state.progress.total_completed_days + 1,
          last_study_date: new Date().toISOString().split('T')[0],
          video_watch_progress: {
            ...state.progress.video_watch_progress,
            [videoId]: 100,
          },
          doc_read_status: {
            ...state.progress.doc_read_status,
            [videoId]: true,
          },
        },
      }
    })
  },
}))
