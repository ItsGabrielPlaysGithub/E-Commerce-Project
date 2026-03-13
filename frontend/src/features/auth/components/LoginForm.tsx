"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LOGIN_MUTATION } from "@/features/auth/services/mutation";
import { useMutation } from "@apollo/client/react";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginMutationData {
  login: {
    message: string;
  };
}

interface LoginMutationVariables {
  emailAddress: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
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

      // Keep local auth context in sync with successful backend login for UI routing.
      const email = loginForm.email.trim();
      const guessedName = email.split("@")[0] || "User";
      login({
        userId: 0,
        firstName: guessedName,
        middleName: "",
        lastName: "",
        fullName: guessedName,
        emailAddress: email,
        companyName: "",
        address: "",
        phoneNumber: "",
        role: "partner",
      });
      router.push("/b2b/home");
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
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome back
        </h1>
        <p className="text-gray-400 text-sm mt-1">Sign in to your B2B account to continue.</p>
      </div>

      {/* Error Message */}
      {(error || mutationError) && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">
          <AlertCircle size={16} />
          <span>
            {error ||
              (mutationError as any)?.graphQLErrors?.[0]?.message ||
              mutationError?.message ||
              "Login failed. Please try again."}
          </span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={loginForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors bg-gray-50/50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
            <a href="#" className="text-xs" style={{ color: "#bf262f" }}>
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="••••••••"
              value={loginForm.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-400 transition-colors bg-gray-50/50"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={loginForm.remember}
            onChange={(e) => handleInputChange("remember", e.target.checked)}
            className="accent-red-600"
          />
          <label htmlFor="remember" className="text-sm text-gray-500">
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutationLoading}
          className="w-full text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          style={{ backgroundColor: "#bf262f" }}
        >
          {mutationLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
