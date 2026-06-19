import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import OnboardingPage from '@/pages/OnboardingPage'
import TodayPage from '@/pages/TodayPage'
import PlanPage from '@/pages/PlanPage'
import NewsPage from '@/pages/NewsPage'
import StatsPage from '@/pages/StatsPage'
import SettingsPage from '@/pages/SettingsPage'
import { useAuthStore } from '@/stores/authStore'
import { useStudyStore } from '@/stores/studyStore'
import { useNewsStore } from '@/stores/newsStore'

function AppRoutes() {
  const { isAuthenticated, isOnboarded, checkAuth } = useAuthStore()
  const fetchStudyPlan = useStudyStore((s) => s.fetchStudyPlan)
  const fetchToday = useStudyStore((s) => s.fetchToday)
  const fetchNews = useNewsStore((s) => s.fetchNews)

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Initialize study and news data when authenticated
  useEffect(() => {
    if (isAuthenticated && isOnboarded) {
      fetchStudyPlan()
      fetchToday()
      fetchNews()
    }
  }, [isAuthenticated, isOnboarded, fetchStudyPlan, fetchToday, fetchNews])

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Onboarding (protected, checks onboard status) */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Protected app routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/app" element={<Navigate to="/app/today" replace />} />
          <Route path="/app/today" element={<TodayPage />} />
          <Route path="/app/plan" element={<PlanPage />} />
          <Route path="/app/news" element={<NewsPage />} />
          <Route path="/app/stats" element={<StatsPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
