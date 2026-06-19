import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Code,
  Brain,
  Calculator,
  Target,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'
import type { AssessmentAnswers } from '@/types'

interface StepConfig {
  key: keyof AssessmentAnswers
  title: string
  subtitle: string
  icon: React.ElementType
  type: 'radio' | 'checkbox'
  options: { value: string; label: string }[]
}

const steps: StepConfig[] = [
  {
    key: 'programming_level',
    title: '你的编程基础？',
    subtitle: '帮助我们了解你的编程经验',
    icon: Code,
    type: 'radio',
    options: [
      { value: '不会编程', label: '无基础' },
      { value: '了解基础语法', label: '会 Python' },
      { value: '熟练使用Python', label: '会其他语言' },
    ],
  },
  {
    key: 'ai_understanding',
    title: '你对 AI 的了解程度？',
    subtitle: '选择最符合你当前水平的选项',
    icon: Brain,
    type: 'radio',
    options: [
      { value: '完全不了解', label: '完全小白' },
      { value: '听说过基本概念', label: '了解基本概念' },
      { value: '使用过AI工具', label: '使用过 AI 工具' },
      { value: '深入了解原理', label: '有 AI 项目经验' },
    ],
  },
  {
    key: 'math_level',
    title: '你的数学/算法基础？',
    subtitle: '数学基础对 AI 学习很重要',
    icon: Calculator,
    type: 'radio',
    options: [
      { value: '高中数学', label: '高中水平' },
      { value: '线性代数和概率论', label: '大学水平' },
      { value: '微积分和优化理论', label: '研究生水平' },
    ],
  },
  {
    key: 'learning_goal',
    title: '你的学习目标？',
    subtitle: '你希望通过学习 AI 达到什么目标？',
    icon: Target,
    type: 'radio',
    options: [
      { value: '了解AI趋势', label: '了解 AI 趋势' },
      { value: '使用AI工具', label: '能使用 AI 工具' },
      { value: '开发AI应用', label: '能开发 AI 应用' },
      { value: '深入研究算法', label: '深入研究算法' },
    ],
  },
  {
    key: 'weekly_hours',
    title: '你每周能投入多少时间？',
    subtitle: '我们将根据你的时间安排学习节奏',
    icon: Clock,
    type: 'radio',
    options: [
      { value: '5', label: '5 小时以下' },
      { value: '7', label: '5-10 小时' },
      { value: '15', label: '10 小时以上' },
    ],
  },
  {
    key: 'interests',
    title: '你感兴趣的方向？',
    subtitle: '可以多选，我们将为你定制相关内容',
    icon: Layers,
    type: 'checkbox',
    options: [
      { value: 'LLM', label: 'LLM（大语言模型）' },
      { value: '计算机视觉', label: '计算机视觉' },
      { value: '多模态', label: '多模态' },
      { value: 'Agent', label: 'AI Agent' },
      { value: '数据科学', label: '数据科学' },
    ],
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnboarding } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    programming_level: '',
    ai_understanding: '',
    math_level: '',
    learning_goal: '',
    weekly_hours: '',
    interests: [],
  })

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const progressPercent = ((currentStep + 1) / steps.length) * 100

  const canProceed = () => {
    const value = answers[step.key]
    if (step.type === 'checkbox') {
      return (value as string[]).length > 0
    }
    return value !== ''
  }

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [step.key]: value })
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = answers.interests as string[]
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value)
    setAnswers({ ...answers, interests: updated })
  }

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding(answers)
      navigate('/app/today')
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/60">
              步骤 {currentStep + 1} / {steps.length}
            </span>
            <span className="text-sm text-accent font-medium">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-white/10" />
          {/* Override progress indicator color */}
          <div
            className="h-2 rounded-full bg-accent/80 mt-[-1.125rem] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Content */}
        <Card className="bg-white/95 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            {/* Step Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <step.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{step.title}</h2>
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {step.type === 'radio' ? (
                <RadioGroup
                  value={answers[step.key] as string}
                  onValueChange={handleRadioChange}
                >
                  {step.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[step.key] === option.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/30 hover:bg-muted/50'
                      }`}
                    >
                      <RadioGroupItem value={option.value} />
                      <span className="text-sm font-medium text-primary">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {step.options.map((option) => {
                    const isSelected = (answers.interests as string[]).includes(
                      option.value
                    )
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/30 hover:bg-muted/50'
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(option.value, !!checked)
                          }
                        />
                        <span className="text-sm font-medium text-primary">
                          {option.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-muted-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一步
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-accent text-primary-foreground hover:bg-accent/90 px-6"
              >
                {isLastStep ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-1" />
                    生成学习计划
                  </>
                ) : (
                  <>
                    下一步
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-accent'
                  : index < currentStep
                    ? 'w-2 bg-accent/60'
                    : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
