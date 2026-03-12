"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../../../lib/authLogic";

export default function Login() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPass , setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (isLoggedIn) router.replace("/homePage");
    return () => { mountedRef.current = false; };
  }, [isLoggedIn, router]);

  const [loginForm, setLoginForm] = useState({ email: "", password: "", remember: false });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
    orderType: "wholesale",
    agreedToTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (!mountedRef.current) return;
    setLoading(false);
    if (loginForm.email && loginForm.password) {
      login(loginForm.email, loginForm.password);
      router.push("/b2b/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (!mountedRef.current) return;
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a0608 0%, #bf262f 60%, #8f1d23 100%)" }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative">
          <Link href="/" className="inline-block">
            <span className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              omega<span className="text-white/50">.</span>
            </span>
            <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">B2B Partner Portal</div>
          </Link>
        </div>

        <div className="relative">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Trusted by 1,200+ businesses</p>
          <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Supply smarter.<br />Sell everywhere.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Access exclusive B2B pricing, manage orders, and sync your inventory across Shopee, Lazada, and TikTok Shop — all from one portal.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { v: "500+", l: "SKUs" },
              { v: "35%", l: "Max Off" },
              { v: "24h", l: "Fulfillment" },
            ].map(({ v, l }) => (
              <div key={l} className="border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{v}</div>
                <div className="text-white/40 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <div className="text-white/30 text-xs uppercase tracking-wider">Integrated with</div>
          </div>
          <div className="flex gap-3">
            {[
              { name: "Shopee", bg: "#EE4D2D" },
              { name: "Lazada", bg: "#0F146D" },
              { name: "TikTok", bg: "#010101" },
            ].map((p) => (
              <div
                key={p.name}
                className="px-4 py-2 rounded-lg text-white text-xs font-semibold"
                style={{ backgroundColor: p.bg }}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="inline-block mb-10 lg:hidden">
            <span className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>
              omega<span style={{ color: "#bf262f" }}>.</span>
            </span>
          </Link>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-8">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className="pb-3 mr-6 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px"
                style={{
                  borderColor: tab === t ? "#bf262f" : "transparent",
                  color: tab === t ? "#bf262f" : "#9ca3af",
                }}
              >
                {t === "login" ? "Sign In" : "Apply for Access"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Welcome back
                </h1>
                <p className="text-gray-400 text-sm mt-1">Sign in to your B2B account to continue.</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
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
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs" style={{ color: "#bf262f" }}>Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition-colors bg-gray-50/50"
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={loginForm.remember}
                    onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                    className="accent-red-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-500">Keep me signed in</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                  style={{ backgroundColor: "#bf262f" }}
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-6">
                Not yet a partner?{" "}
                <button onClick={() => setTab("register")} style={{ color: "#bf262f" }} className="font-semibold">
                  Apply for B2B access
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Apply for B2B Access
                </h1>
                <p className="text-gray-400 text-sm mt-1">Our team reviews applications within 24 hours.</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Juan"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Dela Cruz"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Company</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Business"
                      value={registerForm.company}
                      onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Phone</label>
                    <input
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Account Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: "retail", l: "Retail" },
                      { v: "wholesale", l: "Wholesale" },
                      { v: "bulk", l: "Bulk" },
                    ].map((opt) => (
                      <label
                        key={opt.v}
                        className="flex items-center justify-center py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all"
                        style={
                          registerForm.orderType === opt.v
                            ? { backgroundColor: "#f9e9ea", borderColor: "#bf262f", color: "#bf262f" }
                            : { borderColor: "#e5e7eb", color: "#6b7280" }
                        }
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value={opt.v}
                          checked={registerForm.orderType === opt.v}
                          onChange={(e) => setRegisterForm({ ...registerForm, orderType: e.target.value })}
                          className="sr-only"
                        />
                        {opt.l}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Min. 8 characters"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Confirm</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={registerForm.agreedToTerms}
                    onChange={(e) => setRegisterForm({ ...registerForm, agreedToTerms: e.target.checked })}
                    className="mt-0.5 accent-red-600"
                  />
                  <span className="text-xs text-gray-400">
                    I agree to Omega's <a href="#" style={{ color: "#bf262f" }}>Terms of Service</a> and <a href="#" style={{ color: "#bf262f" }}>Privacy Policy</a>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#bf262f" }}
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Application <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-5">
                Already have an account?{" "}
                <button onClick={() => setTab("login")} style={{ color: "#bf262f" }} className="font-semibold">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}