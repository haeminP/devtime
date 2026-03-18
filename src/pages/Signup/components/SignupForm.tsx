import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCheckEmail } from "../hooks/useCheckEmail";
import { useCheckNickname } from "../hooks/useCheckNickname";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface SignupFormProps {
  /** Called with validated form data when the user submits */
  onSubmit: (data: SignupFormValues) => void;
  /** True while the signup API call is in flight */
  isPending: boolean;
}

export function SignupForm({ onSubmit, isPending }: SignupFormProps) {
  const { t } = useTranslation();
  const emailCheck = useCheckEmail();
  const nicknameCheck = useCheckNickname();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({ mode: "onBlur" });

  // Store the result of register() so we can chain our own onChange
  // alongside RHF's without losing either
  const emailField = register("email", {
    required: t("auth.emailRequired"),
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t("auth.emailInvalid"),
    },
  });

  const nicknameField = register("nickname", {
    required: t("signup.nicknameRequired"),
  });

  const isSubmitDisabled =
    !isValid ||
    !emailCheck.isSuccess ||
    !nicknameCheck.isSuccess ||
    isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-primary text-center">
        {t("signup.title")}
      </h1>

      {/* Email — label and feedback rendered manually so the check button
          can sit on the same row as the input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {t("auth.emailLabel")}
        </label>
        <div className="flex gap-2">
          <Input
            {...emailField}
            onChange={(e) => {
              emailField.onChange(e);
              // Reset check result whenever the user edits the field again
              if (emailCheck.isSuccess || emailCheck.isError) emailCheck.reset();
            }}
            type="email"
            placeholder={t("auth.emailPlaceholder")}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => emailCheck.mutate(getValues("email"))}
            disabled={!!errors.email || !getValues("email")}
          >
            {t("signup.checkDuplicate")}
          </Button>
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        {!errors.email && emailCheck.isSuccess && (
          <p className="text-xs text-green-500">{t("signup.availableEmail")}</p>
        )}
        {!errors.email && emailCheck.isError && (
          <p className="text-xs text-red-500">{t("signup.duplicateEmail")}</p>
        )}
      </div>

      {/* Nickname */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {t("signup.nickname")}
        </label>
        <div className="flex gap-2">
          <Input
            {...nicknameField}
            onChange={(e) => {
              nicknameField.onChange(e);
              if (nicknameCheck.isSuccess || nicknameCheck.isError) nicknameCheck.reset();
            }}
            placeholder={t("signup.nicknamePlaceholder")}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => nicknameCheck.mutate(getValues("nickname"))}
            disabled={!!errors.nickname || !getValues("nickname")}
          >
            {t("signup.checkDuplicate")}
          </Button>
        </div>
        {errors.nickname && (
          <p className="text-xs text-red-500">{errors.nickname.message}</p>
        )}
        {!errors.nickname && nicknameCheck.isSuccess && (
          <p className="text-xs text-green-500">{t("signup.availableNickname")}</p>
        )}
        {!errors.nickname && nicknameCheck.isError && (
          <p className="text-xs text-red-500">{t("signup.duplicateNickname")}</p>
        )}
      </div>

      {/* Password — uses Input's label and error props since there's no
          inline button, so the standard layout works fine */}
      <Input
        {...register("password", {
          required: t("auth.passwordRequired"),
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
            message: t("auth.passwordInvalid"),
          },
        })}
        label={t("auth.passwordLabel")}
        type="password"
        placeholder={t("auth.passwordPlaceholder")}
        error={errors.password?.message}
      />

      {/* Confirm password — uses validate() to compare against password field */}
      <Input
        {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === getValues("password") || t("signup.passwordMismatch"),
        })}
        label={t("signup.confirmPassword")}
        type="password"
        placeholder={t("signup.confirmPasswordPlaceholder")}
        error={errors.confirmPassword?.message}
      />

      {/* Terms of service */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {t("signup.agreeTerms")}
          </span>
          <input
            type="checkbox"
            {...register("agreeTerms", { validate: (v) => v === true })}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
        </div>
        <div className="h-24 overflow-y-auto rounded-lg border border-gray-200 p-3 text-xs text-gray-500 leading-relaxed">
          제1조 (목적) 이 약관은 DevTime(이하 "서비스")의 이용 조건 및 절차, 사용자와
          서비스 제공사(회사) 간의 관리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          제2조 (정의) 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          "회원"이라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을
          체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isSubmitDisabled}
      >
        {isPending ? t("common.loading") : t("signup.signupButton")}
      </Button>

      <p className="text-center text-sm text-gray-500">
        {t("signup.hasAccount")}{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          {t("signup.goToLogin")}
        </Link>
      </p>
    </form>
  );
}
