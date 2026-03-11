import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

export interface LoginFormValues {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  isPending: boolean
}

/**
 * LoginForm — pure UI component responsible for:
 * - Rendering the email + password fields
 * - Client-side validation (format, length)
 * - Disabling the submit button until both fields are valid
 * - Calling onSubmit with the form values (actual API call is in LoginPage)
 *
 * Why separate from LoginPage?
 * LoginPage handles navigation logic (where to go after login).
 * LoginForm handles what the form looks like and whether it's valid.
 * Keeping them separate makes each easier to read and test.
 */
function LoginForm({ onSubmit, isPending }: LoginFormProps) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onBlur', // validate when user leaves a field (matches PRD spec)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label={t('auth.emailLabel')}
        placeholder={t('auth.emailPlaceholder')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('auth.emailRequired'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('auth.emailInvalid'),
          },
        })}
      />

      <Input
        label={t('auth.passwordLabel')}
        placeholder={t('auth.passwordPlaceholder')}
        type="password"
        error={errors.password?.message}
        {...register('password', {
          required: t('auth.passwordRequired'),
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
            message: t('auth.passwordInvalid'),
          },
        })}
      />

      {/* Login button — only active when both fields pass validation */}
      <Button
        type="submit"
        fullWidth
        disabled={!isValid || isPending}
      >
        {isPending ? t('common.loading') : t('auth.loginButton')}
      </Button>
    </form>
  )
}

export default LoginForm
