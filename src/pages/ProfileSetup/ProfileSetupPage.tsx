import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoWhite from '@/assets/logo-white.png'
import ProfileSetupForm, { ProfileSetupFormValues } from './components/ProfileSetupForm'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

/**
 * ProfileSetupPage — shown only on first login (isFirstLogin: true).
 *
 * Layout mirrors Signup/Login: left blue panel + right white form panel.
 * The form submission and skip flow are orchestrated here;
 * ProfileSetupForm only knows about field values.
 */
function ProfileSetupPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showSkipModal, setShowSkipModal] = useState(false)
  const isPending = false // will be replaced with useMutation in a later step

  function handleSubmit(values: ProfileSetupFormValues) {
    console.log('submit', values) // temporary — API call wired up later
  }

  function handleSkipConfirm() {
    setShowSkipModal(false)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center">
        <div className="flex flex-col items-center gap-9">
          <img src={logoWhite} alt="DevTime" className="w-[264px]" />
          <p className="text-xl font-semibold text-white">A Timer for Developers</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-[420px]">
          <ProfileSetupForm
            onSubmit={handleSubmit}
            onSkip={() => setShowSkipModal(true)}
            isPending={isPending}
          />
        </div>
      </div>

      {/* Skip confirmation modal */}
      <Modal isOpen={showSkipModal}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-900">{t('profile.skipConfirm')}</p>
            <p className="text-sm text-gray-500">{t('profile.skipDesc')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button fullWidth onClick={handleSkipConfirm}>
              {t('common.confirm')}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setShowSkipModal(false)}>
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileSetupPage
