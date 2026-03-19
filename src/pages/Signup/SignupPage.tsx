import { useNavigate } from "react-router-dom";
import { useSignup } from "./hooks/useSignup";
import { SignupForm, SignupFormValues } from "./components/SignupForm";

function SignupPage() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useSignup();

  function handleSubmit(data: SignupFormValues) {
    signup(
      {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          navigate("/login", { replace: true });
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center">
        <div className="text-center text-white">
          <img src="/logo.svg" alt="DevTime" className="w-24 mx-auto mb-4" />
          <p className="text-lg font-medium">개발자를 위한 타이머</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <SignupForm onSubmit={handleSubmit} isPending={isPending} />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
