import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import Input from '@/components/common/Input'
import TechStackInput from './TechStackInput'
import ProfileImageUpload from './ProfileImageUpload'

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

  const GOAL_MAX_LENGTH = 30

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
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

  const goalValue = watch('goal')

  const careerOptions = [
    { value: '경력 없음', label: t('profile.careerOptions.none') },
    { value: '0-3년', label: t('profile.careerOptions.junior') },
    { value: '4-7년', label: t('profile.careerOptions.mid') },
    { value: '8-10년', label: t('profile.careerOptions.senior') },
    { value: '11년 이상', label: t('profile.careerOptions.expert') },
  ]

  const purposeOptions = [
    { value: '취업 준비', label: t('profile.purposeOptions.jobSearch') },
    { value: '이직 준비', label: t('profile.purposeOptions.careerChange') },
    { value: '단순 개발 역량 향상', label: t('profile.purposeOptions.skillUp') },
    { value: '회사 내 프로젝트 원활하게 수행', label: t('profile.purposeOptions.work') },
    { value: '기타(직접 입력)', label: t('profile.purposeOptions.other') },
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
            Want to do it later?{' '}
            <span className="font-bold underline underline-offset-2">Skip</span>
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
            placeholder="Select your experience level"
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
            placeholder="Select your learning purpose"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* Study goal input */}
      <div className="flex flex-col gap-2">
        <Input
          {...register('goal', {
            required: true,
            maxLength: GOAL_MAX_LENGTH,
          })}
          label={t('profile.goal')}
          placeholder={t('profile.goalPlaceholder')}
          error={errors.goal?.type === 'maxLength' ? `Maximum ${GOAL_MAX_LENGTH} characters allowed.` : undefined}
        />
        {/* Character counter */}
        <p className={`text-xs text-right ${goalValue?.length >= GOAL_MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
          {goalValue?.length ?? 0} / {GOAL_MAX_LENGTH}
        </p>
      </div>

      {/* Tech stacks autocomplete */}
      <Controller
        name="techStacks"
        control={control}
        rules={{ validate: (v) => v.length > 0 }}
        render={({ field }) => (
          <TechStackInput value={field.value} onChange={field.onChange} />
        )}
      />

      {/* Profile image upload */}
      <Controller
        name="profileImage"
        control={control}
        render={({ field }) => (
          <ProfileImageUpload onChange={field.onChange} />
        )}
      />

      {/* Save button */}
      <Button type="submit" fullWidth disabled={!isValid || isPending}>
        {t('profile.saveProfile')}
      </Button>
    </form>
  )
}

export default ProfileSetupForm
