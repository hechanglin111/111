import { useState } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Calendar,
  Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNewsStore } from '@/stores/newsStore'

export default function NewsPage() {
  const { news, allTags, selectedTags, toggleBookmark, markAsRead, setFilterTags } =
    useNewsStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setFilterTags(selectedTags.filter((t) => t !== tag))
    } else {
      setFilterTags([...selectedTags, tag])
    }
  }

  const filteredNews =
    selectedTags.length === 0
      ? news
      : news.filter((item) =>
          item.tags.some((tag) => selectedTags.includes(tag))
        )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }

  const handleCardClick = (newsId: string) => {
    markAsRead(newsId)
    setExpandedId(expandedId === newsId ? null : newsId)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">AI 新闻</h1>
        <p className="text-muted-foreground">
          精选最新 AI 领域动态和研究进展
        </p>
      </div>

      {/* Tag Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border-none ${
              selectedTags.includes(tag)
                ? 'bg-accent text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Tag className="h-3 w-3" />
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setFilterTags([])}
            className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-primary cursor-pointer bg-transparent border-none"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* News Cards */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              expandedId === item.id ? 'ring-1 ring-accent/30' : ''
            } ${!item.is_read ? 'border-l-4 border-l-accent' : ''}`}
            onClick={() => handleCardClick(item.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="text-base font-semibold text-primary leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p
                    className={`text-sm text-muted-foreground leading-relaxed ${
                      expandedId === item.id ? '' : 'line-clamp-2'
                    }`}
                  >
                    {item.summary}
                  </p>

                  {/* Expanded content (for MVP, just show full summary) */}
                  {expandedId === item.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>
                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-3 no-underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        查看原文
                      </a>
                    </div>
                  )}

                  {/* Tags and Meta */}
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.publish_date)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.source_name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bookmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleBookmark(item.id)
                  }}
                  className="shrink-0 p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer bg-transparent border-none"
                >
                  {item.is_bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-accent" />
                  ) : (
                    <Bookmark className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">没有匹配的新闻</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterTags([])}
              className="mt-2"
            >
              清除筛选条件
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
