import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Brain,
  BookOpen,
  Newspaper,
  BarChart3,
  Settings,
  LogOut,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  const navLinks = [
    { to: '/app/today', label: '今日学习', icon: BookOpen },
    { to: '/app/plan', label: '学习计划', icon: BarChart3 },
    { to: '/app/news', label: 'AI 新闻', icon: Newspaper },
    { to: '/app/stats', label: '学习统计', icon: BarChart3 },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Brain className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-primary">
              AI Daily Learn
            </span>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors no-underline"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer rounded-full p-0.5 hover:ring-2 hover:ring-accent transition-all"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-accent text-primary-foreground text-sm font-semibold">
                      {user?.name?.charAt(0) ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-border shadow-lg z-50 py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-primary">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/app/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors no-underline"
                      >
                        <User className="h-4 w-4" />
                        个人资料
                      </Link>
                      <Link
                        to="/app/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors no-underline"
                      >
                        <Settings className="h-4 w-4" />
                        设置
                      </Link>
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors cursor-pointer bg-transparent border-none"
                      >
                        <LogOut className="h-4 w-4" />
                        退出登录
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                >
                  登录
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    const event = new CustomEvent('open-auth-dialog', {
                      detail: { tab: 'register' },
                    })
                    window.dispatchEvent(event)
                  }}
                >
                  注册
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
