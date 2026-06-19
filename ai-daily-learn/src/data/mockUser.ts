import type { User, LearningProgress } from '../types'

export const mockUser: User = {
  id: 'user_001',
  email: 'zhangsan@example.com',
  name: '张三',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
  level: 'L1',
  goals: ['系统学习 AI 基础知识', '掌握 Python 数据科学工具', '了解大语言模型原理'],
  interests: ['LLM', 'Agent', '计算机视觉', '数据科学'],
  weekly_hours: 7,
  created_at: '2026-05-28T10:00:00Z',
  plan_settings: {
    auto_adjust: true,
    daily_reminder: true,
    reminder_time: '20:00',
  },
}

export const mockLearningProgress: LearningProgress = {
  user_id: 'user_001',
  current_unit_id: 'unit_01',
  current_day: 3,
  total_completed_days: 2,
  total_skipped_days: 0,
  streak_days: 2,
  last_study_date: '2026-06-02',
  completion_rate: 13.3,
  video_watch_progress: {
    'unit_01_day_01': 100,
    'unit_01_day_02': 100,
    'unit_01_day_03': 30,
    'unit_01_day_04': 0,
    'unit_01_day_05': 0,
  },
  doc_read_status: {
    'unit_01_day_01': true,
    'unit_01_day_02': true,
    'unit_01_day_03': false,
    'unit_01_day_04': false,
    'unit_01_day_05': false,
  },
}
