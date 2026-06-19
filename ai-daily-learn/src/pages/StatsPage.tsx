import {
  Flame,
  Trophy,
  Target,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStudyStore } from '@/stores/studyStore'

export default function StatsPage() {
  const { progress, studyPlan } = useStudyStore()

  if (!progress || !studyPlan) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <TrendingUp className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            暂无学习数据
          </h2>
          <p className="text-muted-foreground">开始学习后将显示统计数据。</p>
        </CardContent>
      </Card>
    )
  }

  const totalDays = studyPlan.units.reduce(
    (sum, unit) => sum + unit.days.length,
    0
  )

  // Calculate total study hours (mock: each day ~15 min on average)
  const totalStudyHours = (
    (progress.total_completed_days * 15) / 60
  ).toFixed(1)

  // Weekly activity data (mock: last 7 days)
  const weekDays = ['一', '二', '三', '四', '五', '六', '日']
  const weeklyActivity = [30, 45, 60, 15, 50, 75, 40] // minutes per day

  const maxActivity = Math.max(...weeklyActivity)

  // Recent activities (mock)
  const recentActivities = [
    {
      action: '完成了第 2 天的学习',
      date: '2026-06-02',
      type: 'complete',
    },
    {
      action: '观看了视频：什么是机器学习？',
      date: '2026-06-02',
      type: 'video',
    },
    {
      action: '完成了第 1 天的学习',
      date: '2026-06-01',
      type: 'complete',
    },
    {
      action: '开始学习单元 1：AI 基础入门',
      date: '2026-06-01',
      type: 'start',
    },
  ]

  const statCards = [
    {
      icon: Target,
      label: '已完成天数',
      value: `${progress.total_completed_days}`,
      suffix: `/ ${totalDays} 天`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Flame,
      label: '连续学习',
      value: `${progress.streak_days}`,
      suffix: ' 天',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Trophy,
      label: '完成率',
      value: `${progress.completion_rate.toFixed(1)}`,
      suffix: '%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Clock,
      label: '总学习时长',
      value: totalStudyHours,
      suffix: ' 小时',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">学习统计</h1>
        <p className="text-muted-foreground">追踪你的学习进度和成就</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                  <span className="ml-1">{stat.suffix}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">本周学习活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {weeklyActivity.map((minutes, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs text-muted-foreground">
                  {minutes}分钟
                </span>
                <div className="w-full flex items-end" style={{ height: '100px' }}>
                  <div
                    className="w-full rounded-t-md bg-accent/80 hover:bg-accent transition-colors"
                    style={{
                      height: `${(minutes / maxActivity) * 100}%`,
                      minHeight: minutes > 0 ? '4px' : '0px',
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  周{weekDays[index]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      activity.type === 'complete'
                        ? 'bg-success'
                        : activity.type === 'video'
                          ? 'bg-accent'
                          : 'bg-primary'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-primary">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
