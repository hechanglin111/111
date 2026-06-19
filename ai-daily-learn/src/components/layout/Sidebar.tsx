import { Link } from 'react-router-dom'
import { Flame, Trophy, Target, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuthStore } from '@/stores/authStore'
import { useStudyStore } from '@/stores/studyStore'
import type { UserLevel } from '@/types'

const levelLabels: Record<UserLevel, string> = {
  L1: '入门学习者',
  L2: '进阶学习者',
  L3: '高级学习者',
}

const levelColors: Record<UserLevel, string> = {
  L1: 'bg-green-100 text-green-700',
  L2: 'bg-blue-100 text-blue-700',
  L3: 'bg-purple-100 text-purple-700',
}

export default function Sidebar() {
  const { user } = useAuthStore()
  const { progress, studyPlan } = useStudyStore()

  if (!user || !progress || !studyPlan) return null

  const streakDays = progress.streak_days
  const completedDays = progress.total_completed_days

  // Calculate weekly progress (days completed this week, simple mock)
  const weeklyCompleted = Math.min(streakDays, 7)

  // Calculate current unit progress
  const currentUnit = studyPlan.units.find(
    (u) => u.unit_id === progress.current_unit_id
  )
  const unitProgress = currentUnit
    ? Math.round(
        (currentUnit.days.filter((d) => d.status === 'completed').length /
          currentUnit.days.length) *
          100
      )
    : 0

  return (
    <aside className="w-64 shrink-0 space-y-6">
      {/* User Level */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            当前等级
          </span>
          <Badge className={levelColors[user.level]} variant="secondary">
            {user.level}
          </Badge>
        </div>
        <p className="text-sm text-primary font-medium">
          {levelLabels[user.level]}
        </p>
      </div>

      {/* Streak */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-medium text-muted-foreground">
            连续学习
          </span>
        </div>
        <p className="text-2xl font-bold text-primary">{streakDays} 天</p>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-muted-foreground">
            本周进度
          </span>
        </div>
        <p className="text-lg font-bold text-primary mb-2">
          {weeklyCompleted}/7 天已完成
        </p>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < weeklyCompleted ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Unit Progress */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">
            当前单元
          </span>
        </div>
        <p className="text-sm text-primary font-medium mb-2 truncate">
          {currentUnit?.title ?? '加载中...'}
        </p>
        <Progress value={unitProgress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {unitProgress}% 完成
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-border p-4">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          快捷导航
        </p>
        <div className="space-y-2">
          {[
            { to: '/app/today', label: '今日学习' },
            { to: '/app/plan', label: '学习计划' },
            { to: '/app/news', label: 'AI 新闻' },
            { to: '/app/stats', label: '学习统计' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center justify-between text-sm text-primary hover:text-accent transition-colors no-underline"
            >
              <span>{link.label}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
