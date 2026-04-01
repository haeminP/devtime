import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoWhite from '@/assets/logo-white.png'
import ProfileSetupForm, { ProfileSetupFormValues } from './components/ProfileSetupForm'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import { useCreateProfile } from './hooks/useCreateProfile'

function ProfileSetupPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showSkipModal, setShowSkipModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const { mutate: createProfile, isPending } = useCreateProfile()

  function handleSubmit(values: ProfileSetupFormValues) {
    createProfile(
      {
        career: values.career,
        purpose: values.purpose,
        goal: values.goal,
        techStacks: values.techStacks,
        profileImage: values.profileImage,
      },
      {
        onSuccess: () => navigate('/', { replace: true }),
        onError: () => setShowErrorModal(true),
      }
    )
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

      {/* Error modal */}
      <Modal isOpen={showErrorModal}>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-gray-900">
            Failed to save profile. Please try again.
          </p>
          <Button fullWidth onClick={() => setShowErrorModal(false)}>
            {t('common.confirm')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileSetupPage
