import { useTranslation } from 'react-i18next'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

interface DuplicateLoginModalProps {
  isOpen: boolean
  onConfirm: () => void
}

/**
 * Shown when isDuplicateLogin === true in the login response.
 * Informs the user that another device will be force-logged-out.
 */
function DuplicateLoginModal({ isOpen, onConfirm }: DuplicateLoginModalProps) {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-gray-900">
          {t('auth.duplicateLogin')}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('auth.duplicateLoginDesc')}
        </p>
      </div>
      <Button fullWidth onClick={onConfirm}>
        {t('common.confirm')}
      </Button>
    </Modal>
  )
}

export default DuplicateLoginModal
