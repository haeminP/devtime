import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

export interface ProfileSetupFormValues {
  career: string
  purpose: string
  goal: string
  techStacks: string[]
  profileImage?: string
}

interface ProfileSetupFormProps {
  onSubmit: (values: ProfileSetupFormValues) => void
  onSkip: () => void
  isPending: boolean
}

/**
 * ProfileSetupForm — collects career, purpose, goal, tech stacks, and profile image.
 *
 * Validation strategy: all fields required except profileImage.
 * Save button is disabled until the form is fully valid.
 *
 * react-hook-form's Controller bridges our custom Dropdown (uncontrolled by RHF)
 * into the form state — it passes value + onChange down as props.
 */
function ProfileSetupForm({ onSubmit, onSkip, isPending }: ProfileSetupFormProps) {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProfileSetupFormValues>({
    mode: 'onChange',
    defaultValues: {
      career: '',
      purpose: '',
      goal: '',
      techStacks: [],
      profileImage: '',
    },
  })

  const careerOptions = [
    { value: 'none', label: t('profile.careerOptions.none') },
    { value: 'junior', label: t('profile.careerOptions.junior') },
    { value: 'mid', label: t('profile.careerOptions.mid') },
    { value: 'senior', label: t('profile.careerOptions.senior') },
    { value: 'expert', label: t('profile.careerOptions.expert') },
  ]

  const purposeOptions = [
    { value: 'jobSearch', label: t('profile.purposeOptions.jobSearch') },
    { value: 'careerChange', label: t('profile.purposeOptions.careerChange') },
    { value: 'skillUp', label: t('profile.purposeOptions.skillUp') },
    { value: 'work', label: t('profile.purposeOptions.work') },
    { value: 'other', label: t('profile.purposeOptions.other') },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 w-full">
      {/* Title + skip link */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{t('profile.title')}</h1>
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            다음에 하시겠어요?{' '}
            <span className="font-bold underline underline-offset-2">건너뛰기</span>
          </button>
        </div>
      </div>

      {/* Career dropdown */}
      <Controller
        name="career"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            label={t('profile.career')}
            options={careerOptions}
            placeholder="개발 경력을 선택해 주세요."
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* Purpose dropdown */}
      <Controller
        name="purpose"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            label={t('profile.purpose')}
            options={purposeOptions}
            placeholder="공부의 목적을 선택해 주세요."
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* TODO: goal input, tech stacks, profile image (next steps) */}

      {/* Save button */}
      <Button type="submit" fullWidth disabled={!isValid || isPending}>
        {t('profile.saveProfile')}
      </Button>
    </form>
  )
}

export default ProfileSetupForm
