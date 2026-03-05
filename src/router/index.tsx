import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import TimerPage from '@/pages/Timer/TimerPage'
import LoginPage from '@/pages/Login/LoginPage'
import SignupPage from '@/pages/Signup/SignupPage'
import ProfileSetupPage from '@/pages/ProfileSetup/ProfileSetupPage'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import RankingPage from '@/pages/Ranking/RankingPage'
import MyPage from '@/pages/MyPage/MyPage'
import ProtectedRoute from './ProtectedRoute'
import PublicOnlyRoute from './PublicOnlyRoute'

export const router = createBrowserRouter([
  {
    // Pages with GNB (Global Navigation Bar)
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TimerPage />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ranking',
        element: (
          <ProtectedRoute>
            <RankingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    // Auth pages (no GNB, different layout)
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicOnlyRoute>
        <SignupPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/profile-setup',
    element: (
      <ProtectedRoute>
        <ProfileSetupPage />
      </ProtectedRoute>
    ),
  },
])
