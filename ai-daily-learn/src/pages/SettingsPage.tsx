import { User, Bell, Clock, Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/authStore'

export default function SettingsPage() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <SettingsIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            无法加载设置
          </h2>
          <p className="text-muted-foreground">请先登录。</p>
        </CardContent>
      </Card>
    )
  }

  const levelLabels: Record<string, string> = {
    L1: '入门学习者',
    L2: '进阶学习者',
    L3: '高级学习者',
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">设置</h1>
        <p className="text-muted-foreground">管理你的账户和学习偏好</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">个人资料</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <div>
              <label className="text-sm text-muted-foreground">姓名</label>
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{user.name}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <div>
              <label className="text-sm text-muted-foreground">邮箱</label>
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <div>
              <label className="text-sm text-muted-foreground">等级</label>
            </div>
            <div>
              <Badge
                className={
                  user.level === 'L1'
                    ? 'bg-green-100 text-green-700'
                    : user.level === 'L2'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                }
                variant="secondary"
              >
                {user.level} - {levelLabels[user.level]}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">计划设置</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                自动调整计划
              </p>
              <p className="text-xs text-muted-foreground">
                根据学习进度自动调整后续计划
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={user.plan_settings.auto_adjust}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">每日提醒</p>
              <p className="text-xs text-muted-foreground">
                每天定时提醒你学习
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={user.plan_settings.daily_reminder}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">提醒时间</p>
              <p className="text-xs text-muted-foreground">
                设置每日提醒的具体时间
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-primary">
                {user.plan_settings.reminder_time}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">学习偏好</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">当前等级</p>
              <p className="text-xs text-muted-foreground">
                你的 AI 学习等级
              </p>
            </div>
            <Badge
              className={
                user.level === 'L1'
                  ? 'bg-green-100 text-green-700'
                  : user.level === 'L2'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
              }
              variant="secondary"
            >
              {user.level}
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">每周学习时间</p>
              <p className="text-xs text-muted-foreground">
                你设定的每周学习时长
              </p>
            </div>
            <span className="text-sm font-medium text-primary">
              {user.weekly_hours} 小时/周
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">感兴趣的方向</p>
              <p className="text-xs text-muted-foreground">
                你选择的 AI 学习方向
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
