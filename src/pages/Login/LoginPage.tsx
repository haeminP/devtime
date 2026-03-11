import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLogin } from './hooks/useLogin'
import LoginForm, { LoginFormValues } from './components/LoginForm'
import DuplicateLoginModal from './components/DuplicateLoginModal'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

/**
 * LoginPage — orchestrates the full login flow:
 *
 * 1. User submits form → call login API
 * 2a. Login fails → show error modal
 * 2b. isDuplicateLogin: true → show DuplicateLoginModal, then navigate
 * 2c. isFirstLogin: true → navigate to /profile-setup
 * 2d. Normal success → navigate to / (timer page)
 *
 * This page doesn't know about form validation (LoginForm handles that)
 * or API call details (useLogin handles that). It just coordinates the flow.
 */
function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutate: login, isPending, data } = useLogin()

  const [showDuplicateModal, setShowDuplicateModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleSubmit = (values: LoginFormValues) => {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: (response) => {
          const { isFirstLogin, isDuplicateLogin } = response.data

          if (isDuplicateLogin) {
            setShowDuplicateModal(true)
            return
          }

          navigate(isFirstLogin ? '/profile-setup' : '/', { replace: true })
        },
        onError: () => {
          setShowErrorModal(true)
        },
      }
    )
  }

  const handleDuplicateConfirm = () => {
    setShowDuplicateModal(false)
    const isFirstLogin = data?.data.isFirstLogin
    navigate(isFirstLogin ? '/profile-setup' : '/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">

      {/* Decorative background brackets */}
      <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none select-none">
        <span
          className="text-primary font-bold leading-none"
          style={{ fontSize: '40vw', opacity: 0.08, letterSpacing: '-0.05em' }}
        >
          &lt;/&gt;
        </span>
      </div>

      {/* Login card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-[400px] px-10 py-12 flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">&lt;/&gt;</span>
          </div>
          <span className="text-primary font-bold text-2xl italic">DevTime</span>
        </div>

        {/* Form + signup link */}
        <div className="w-full flex flex-col gap-6">
          <LoginForm onSubmit={handleSubmit} isPending={isPending} />

          <p className="text-center text-sm text-gray-500">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              {t('auth.goToSignup')}
            </Link>
          </p>
        </div>
      </div>

      {/* Duplicate login modal */}
      <DuplicateLoginModal
        isOpen={showDuplicateModal}
        onConfirm={handleDuplicateConfirm}
      />

      {/* Login error modal */}
      <Modal isOpen={showErrorModal}>
        <p className="text-sm font-semibold text-gray-900">
          {t('auth.loginFailed')}
        </p>
        <Button fullWidth onClick={() => setShowErrorModal(false)}>
          {t('common.confirm')}
        </Button>
      </Modal>
    </div>
  )
}

export default LoginPage
