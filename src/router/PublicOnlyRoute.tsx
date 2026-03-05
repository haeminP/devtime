import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface PublicOnlyRouteProps {
  children: React.ReactNode
}

/**
 * Wraps routes that should only be accessible when NOT logged in.
 * If already authenticated, redirects to home (timer page).
 * This prevents going back to /login after successful login.
 */
function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PublicOnlyRoute
