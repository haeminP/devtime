import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

/**
 * Global Navigation Bar — appears on Timer, Dashboard, Ranking, MyPage.
 * Shows different right-side buttons depending on auth state.
 */
function GNB() {
  const { isAuthenticated, clearTokens } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/login')
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        {/* TODO: replace with actual SVG logo */}
        <span className="text-primary font-bold text-lg">DevTime</span>
      </Link>

      {/* Center nav */}
      <nav className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-sm text-gray-600 hover:text-primary transition-colors"
        >
          대시보드
        </Link>
        <Link
          to="/ranking"
          className="text-sm text-gray-600 hover:text-primary transition-colors"
        >
          랭킹
        </Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link
              to="/my"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-600 transition-colors"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default GNB
