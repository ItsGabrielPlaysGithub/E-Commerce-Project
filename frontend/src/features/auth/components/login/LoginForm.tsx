"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LOGIN_MUTATION } from "@/features/auth/services/mutation";
import { useMutation } from "@apollo/client/react";
import { LoginLogo } from "./LoginLogo";
import { LoginHeader } from "./LoginHeader";
import { LoginErrorMessage } from "./LoginErrorMessage";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { RememberMeField } from "./RememberMeField";
import { SubmitButton } from "./SubmitButton";
import { LoginFormData, LoginMutationData, LoginMutationVariables } from "./types";

export const LoginForm = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  const [runLogin, { loading: mutationLoading, error: mutationError }] = useMutation<
    LoginMutationData,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setLoginForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginForm.email || !loginForm.password) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    try {
      const response = await runLogin({
        variables: {
          emailAddress: loginForm.email,
          password: loginForm.password,
        },
      });

      if (!mountedRef.current) return;

      if (!response.data?.login?.message) {
        setError("Login failed. Please try again.");
        return;
      }

      // Let server session hydration provide the canonical user data after redirect.
      router.replace("/b2b/home");
      router.refresh();
    } catch (err: any) {
      if (!mountedRef.current) return;

      // Extract detailed error message from Apollo Client error
      let errorMessage = "Invalid credentials. Please try again.";

      // Check for GraphQL errors (array of error objects)
      if (err?.graphQLErrors && err.graphQLErrors.length > 0) {
        const firstError = err.graphQLErrors[0];
        if (firstError?.message) {
          errorMessage = firstError.message;
        }
      }
      // Check for direct message property
      else if (err?.message) {
        errorMessage = err.message;
      }
      // Check for nested extensions (some Apollo configs)
      else if (err?.graphQLErrors?.[0]?.extensions?.message) {
        errorMessage = err.graphQLErrors[0].extensions.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <>
      <LoginLogo />

      <div className="w-full max-w-md">
        <LoginHeader />

        <LoginErrorMessage error={error} mutationError={mutationError} />

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <EmailField
            value={loginForm.email}
            onChange={(value) => handleInputChange("email", value)}
          />

          <PasswordField
            value={loginForm.password}
            onChange={(value) => handleInputChange("password", value)}
            showPassword={showPass}
            toggleShowPassword={() => setShowPass(!showPass)}
          />

          <RememberMeField
            checked={loginForm.remember}
            onChange={(checked) => handleInputChange("remember", checked)}
          />

          <SubmitButton loading={mutationLoading} />
        </form>
      </div>
    </>
  );
};
