import { useState } from 'react'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Play, Clock, CheckCircle, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Sidebar from '@/components/layout/Sidebar'
import { useStudyStore } from '@/stores/studyStore'

export default function TodayPage() {
  const { currentDayPlan, progress, markDayCompleted } = useStudyStore()
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [docExpanded, setDocExpanded] = useState(true)

  if (!currentDayPlan || !progress) {
    return (
      <div className="flex gap-6">
        <div className="flex-1">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">
                还没有学习计划
              </h2>
              <p className="text-muted-foreground text-center">
                请先完成评估问卷，获取你的个性化学习计划。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  const handleMarkComplete = () => {
    markDayCompleted(progress.current_unit_id, currentDayPlan.day_number)
  }

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {currentDayPlan.theme}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground">
                {formatDate(currentDayPlan.date)}
              </span>
              <Badge variant="secondary">
                第 {currentDayPlan.day_number} 天
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>预计 {currentDayPlan.estimated_minutes} 分钟</span>
          </div>
        </div>

        {/* Video + Document Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Video Player - 60% */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="bg-[#1a1a2e] aspect-video">
                <ReactPlayer
                  src={currentDayPlan.video_url}
                  width="100%"
                  height="100%"
                  controls
                  playbackRate={playbackSpeed}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-primary">
                      视频课程
                    </span>
                    <span className="text-xs text-muted-foreground">
                      时长 {formatDuration(currentDayPlan.video_duration)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground mr-1">
                      播放速度：
                    </span>
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer border-none ${
                          playbackSpeed === speed
                            ? 'bg-accent text-primary-foreground font-medium'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Reader - 40% */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base">学习文档</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDocExpanded(!docExpanded)}
                  >
                    {docExpanded ? '收起' : '展开'}
                  </Button>
                </div>
              </CardHeader>
              {docExpanded && (
                <CardContent className="pt-0">
                  <div className="max-h-[500px] overflow-y-auto pr-2">
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                              className || ''
                            )
                            const codeString = String(children).replace(
                              /\n$/,
                              ''
                            )
                            return match ? (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-md text-sm"
                              >
                                {codeString}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            )
                          },
                        }}
                      >
                        {currentDayPlan.doc_content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>

        {/* Practice Task */}
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-primary">
                    练习任务
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentDayPlan.practice_task}
                </p>
              </div>
              <Button
                onClick={handleMarkComplete}
                className="bg-accent text-primary-foreground hover:bg-accent/90 shrink-0 ml-4"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                标记完成
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  )
}
