import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Lock,
  PlayCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useStudyStore } from '@/stores/studyStore'
import type { StudyUnit, DayPlan, UnitStatus } from '@/types'

const statusColors: Record<UnitStatus, string> = {
  completed: 'bg-success',
  in_progress: 'bg-accent',
  locked: 'bg-gray-300',
}

const statusLabels: Record<UnitStatus, string> = {
  completed: '已完成',
  in_progress: '进行中',
  locked: '未解锁',
}

const dayStatusIcon = (status: DayPlan['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success" />
    case 'in_progress':
      return <PlayCircle className="h-4 w-4 text-accent" />
    case 'skipped':
      return <div className="h-4 w-4 rounded-full border-2 border-warning" />
    case 'locked':
      return <Lock className="h-4 w-4 text-gray-300" />
  }
}

export default function PlanPage() {
  const { studyPlan, progress } = useStudyStore()
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set())

  if (!studyPlan || !progress) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Calendar className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            暂无学习计划
          </h2>
          <p className="text-muted-foreground">请先完成评估问卷。</p>
        </CardContent>
      </Card>
    )
  }

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev)
      if (next.has(unitId)) {
        next.delete(unitId)
      } else {
        next.add(unitId)
      }
      return next
    })
  }

  // Auto-expand the current unit
  const currentUnit = studyPlan.units.find(
    (u) => u.unit_id === progress.current_unit_id
  )
  if (currentUnit && !expandedUnits.has(currentUnit.unit_id)) {
    setExpandedUnits((prev) => new Set(prev).add(currentUnit.unit_id))
  }

  const totalDays = studyPlan.units.reduce(
    (sum, unit) => sum + unit.days.length,
    0
  )
  const completedDays = progress.total_completed_days
  const overallProgress = totalDays > 0 ? (completedDays / totalDays) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">学习计划</h1>
        <p className="text-muted-foreground">
          共 {studyPlan.total_weeks} 周，{totalDays} 天学习内容
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge
                className={
                  studyPlan.current_level === 'L1'
                    ? 'bg-green-100 text-green-700'
                    : studyPlan.current_level === 'L2'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                }
                variant="secondary"
              >
                {studyPlan.current_level}
              </Badge>
              <span className="text-sm text-muted-foreground">
                当前等级
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                {Math.round(overallProgress)}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                总体进度
              </span>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              已完成 {completedDays} 天
            </span>
            <span className="text-xs text-muted-foreground">
              剩余 {totalDays - completedDays} 天
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-4">
        {studyPlan.units.map((unit) => (
          <UnitTimelineNode
            key={unit.unit_id}
            unit={unit}
            isExpanded={expandedUnits.has(unit.unit_id)}
            onToggle={() => toggleUnit(unit.unit_id)}
          />
        ))}
      </div>
    </div>
  )
}

function UnitTimelineNode({
  unit,
  isExpanded,
  onToggle,
}: {
  unit: StudyUnit
  isExpanded: boolean
  onToggle: () => void
}) {
  const completedDaysInUnit = unit.days.filter(
    (d) => d.status === 'completed'
  ).length
  const unitProgress =
    unit.days.length > 0
      ? (completedDaysInUnit / unit.days.length) * 100
      : 0

  return (
    <Card className="overflow-hidden">
      {/* Unit Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer text-left border-none bg-transparent"
      >
        {/* Status Dot */}
        <div className="relative">
          <div
            className={`h-4 w-4 rounded-full ${statusColors[unit.status]}`}
          />
          {unit.status === 'in_progress' && (
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-accent animate-ping opacity-30" />
          )}
        </div>

        {/* Unit Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-primary truncate">
              单元 {unit.order}：{unit.title}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {statusLabels[unit.status]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {unit.description}
          </p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex-1 max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${unitProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {completedDaysInUnit}/{unit.days.length} 天
            </span>
          </div>
        </div>

        {/* Expand Icon */}
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded Days List */}
      {isExpanded && (
        <div className="border-t border-border">
          {unit.days.map((day) => (
            <div
              key={day.day_number}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0"
            >
              <div className="w-8 shrink-0">
                {dayStatusIcon(day.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">
                    第 {day.day_number} 天
                  </span>
                  <span className="text-sm text-muted-foreground truncate">
                    {day.theme}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      day.status === 'completed'
                        ? 'bg-success'
                        : day.status === 'in_progress'
                          ? 'bg-accent'
                          : 'bg-gray-200'
                    }`}
                    style={{ width: `${day.completion_rate}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {day.completion_rate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
