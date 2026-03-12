"use client";

import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginLeftPanel } from "@/features/auth/components/LoginLeftPanel";

export default function Login() {
  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left Panel - Branding & Marketing */}
      <LoginLeftPanel />

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        {/* Mobile Logo */}
        <div className="w-full max-w-md">
          <Link href="/" className="inline-block mb-10 lg:hidden">
            <span className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>
              omega<span style={{ color: "#bf262f" }}>.</span>
            </span>
          </Link>

          {/* Login Form Component */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}