export type UserLevel = 'L1' | 'L2' | 'L3'

export interface User {
  id: string
  email: string
  name: string
  avatar: string
  level: UserLevel
  goals: string[]
  interests: string[]
  weekly_hours: number
  created_at: string
  plan_settings: {
    auto_adjust: boolean
    daily_reminder: boolean
    reminder_time: string
  }
}

export interface PlanSettings {
  auto_adjust: boolean
  daily_reminder: boolean
  reminder_time: string
}

export type DayStatus = 'completed' | 'in_progress' | 'skipped' | 'locked'
export type UnitStatus = 'completed' | 'in_progress' | 'locked'
export type PlanStatus = 'active' | 'paused' | 'completed'

export interface DayPlan {
  day_number: number
  date: string
  theme: string
  video_url: string
  video_duration: number
  doc_content: string
  practice_task: string
  estimated_minutes: number
  status: DayStatus
  completion_rate: number
}

export interface StudyUnit {
  unit_id: string
  title: string
  description: string
  order: number
  status: UnitStatus
  days: DayPlan[]
}

export interface AdjustmentRecord {
  date: string
  reason: string
  action: string
  details: string
}

export interface StudyPlan {
  id: string
  user_id: string
  status: PlanStatus
  current_level: UserLevel
  total_weeks: number
  start_date: string
  estimated_end_date: string
  units: StudyUnit[]
  adjustment_history: AdjustmentRecord[]
}

export interface AINews {
  id: string
  title: string
  summary: string
  source_url: string
  source_name: string
  publish_date: string
  tags: string[]
  is_pushed: boolean
  push_date: string
  is_bookmarked: boolean
  is_read: boolean
}

export interface LearningProgress {
  user_id: string
  current_unit_id: string
  current_day: number
  total_completed_days: number
  total_skipped_days: number
  streak_days: number
  last_study_date: string
  completion_rate: number
  video_watch_progress: Record<string, number>
  doc_read_status: Record<string, boolean>
}

export interface AssessmentAnswers {
  programming_level: string
  ai_understanding: string
  math_level: string
  learning_goal: string
  weekly_hours: string
  interests: string[]
}
