import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  Newspaper,
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
  Rocket,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'

const features = [
  {
    icon: Newspaper,
    title: '每日 AI 新闻推送',
    description:
      '精选最新 AI 领域动态，每天为你推送最相关的行业新闻和研究进展，紧跟技术前沿。',
  },
  {
    icon: BookOpen,
    title: '个性化学习计划',
    description:
      '根据你的技术背景和学习目标，AI 自动生成专属学习路径，从入门到精通循序渐进。',
  },
  {
    icon: BarChart3,
    title: '智能进度追踪',
    description:
      '实时追踪学习进度，智能调整学习节奏，可视化展示你的成长轨迹和知识掌握情况。',
  },
]

const steps = [
  {
    icon: Target,
    title: '注册评估',
    description: '完成简短的能力评估，让我们了解你的技术背景和学习目标。',
  },
  {
    icon: Sparkles,
    title: '获取计划',
    description: 'AI 根据评估结果，为你生成个性化的学习计划和每日学习内容。',
  },
  {
    icon: Rocket,
    title: '每日学习',
    description: '每天只需 15 分钟，通过视频、文档和练习，系统掌握 AI 技能。',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, register, login } = useAuthStore()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/today', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Listen for custom event from Navbar
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { tab?: string }
      setAuthTab(detail?.tab === 'register' ? 'register' : 'login')
      setAuthDialogOpen(true)
    }
    window.addEventListener('open-auth-dialog', handler)
    return () => window.removeEventListener('open-auth-dialog', handler)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(loginForm.email, loginForm.password)
    setAuthDialogOpen(false)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    register(registerForm.name, registerForm.email, registerForm.password)
    setAuthDialogOpen(false)
    navigate('/onboarding')
  }

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/app/today')
    } else {
      setAuthDialogOpen(true)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-accent font-medium">
                智能驱动的 AI 学习平台
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              每天 15 分钟，
              <br />
              <span className="text-accent">系统掌握 AI 技能</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              根据你的技术背景量身定制学习计划，从 AI 基础到前沿应用，
              让学习变得高效、有趣、可持续。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent text-primary-foreground hover:bg-accent/90 text-lg px-8 h-12 rounded-lg"
                onClick={handleStartLearning}
              >
                开始学习
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white text-lg px-8 h-12 rounded-lg"
                onClick={() => {
                  document
                    .getElementById('features')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                了解更多
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: '1000+', label: '学习内容' },
                { value: '12 周', label: '系统课程' },
                { value: '15 分钟', label: '每日投入' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              为什么选择 AI Daily Learn？
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我们提供全方位的 AI 学习体验，让你在忙碌的日程中也能高效学习。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              如何开始？
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              简单三步，开启你的 AI 学习之旅。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white mb-6">
                  <step.icon className="h-8 w-8" />
                  <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-accent text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Brain className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            准备好开始你的 AI 学习之旅了吗？
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            加入数千名学习者，每天 15 分钟，系统掌握 AI 技能。
          </p>
          <Button
            size="lg"
            className="bg-accent text-primary-foreground hover:bg-accent/90 text-lg px-8 h-12 rounded-lg"
            onClick={handleStartLearning}
          >
            立即开始
            <ArrowRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* Auth Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              欢迎来到 AI Daily Learn
            </DialogTitle>
            <DialogDescription className="text-center">
              登录或注册以开始你的 AI 学习之旅
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={authTab}
            onValueChange={(v) => setAuthTab(v as 'login' | 'register')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">邮箱</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">密码</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="请输入密码"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  登录
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">姓名</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="请输入姓名"
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="请设置密码"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  注册
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
