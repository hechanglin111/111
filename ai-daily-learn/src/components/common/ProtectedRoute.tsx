import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export default function ProtectedRoute() {
  const { isAuthenticated, isOnboarded } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
