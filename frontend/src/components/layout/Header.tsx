"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogIn, ShoppingCart, LayoutDashboard, LogOut, User } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

// Placeholder for useCart - uncomment when CartContext is available
// import { useCart } from "../../context/CartContext";
const useCart = () => ({ itemCount: 0, lastAdded: null });

const nav = [
  { label: "Home", path: "/b2b/dashboard" },
  { label: "Products",
    children: [
{ label: "All Products", path: "/b2b/products" },
  { label: "Bakeware", path: "/" },
  { label: "Cookware", path: "/" },
  { label: "Dinnerware", path: "/" },
  { label: "Glassware", path: "/" },
  { label: "Hydration", path: "/" },
  { label: "Vacuum Flask", path: "/" },
    ],
  },  
  {
    label: "Programs",
    children: [
      { label: "Retail", path: "/b2b/retail", sub: "No MOQ" },
      { label: "Wholesale", path: "/b2b/wholesale", sub: "From 12 units" },
      { label: "Bulk Order", path: "/b2b/bulk-order", sub: "100+ units" },
    ],
  },
  { label: "Inquiry", path: "/b2b/inquiry" },
];

const RED = "#bf262f";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, company, logout } = useAuth();
  const { itemCount, lastAdded } = useCart();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Cart toast */}
      {lastAdded && (
        <div
          className="absolute top-full right-4 mt-2 px-4 py-2.5 rounded-xl shadow-lg text-white text-xs font-semibold flex items-center gap-2 z-50 transition-all"
          style={{ backgroundColor: RED }}
        >
          <ShoppingCart size={13} />
          {/* Added: {lastAdded.name.split("—")[0].trim().slice(0, 32)}… */}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex-shrink-0 select-none">
            <span
              className="text-2xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#1a1a1a" }}
            >
              omega<span style={{ color: RED }}>.</span>
            </span>
            <span className="hidden sm:inline text-xs text-gray-300 ml-2 uppercase tracking-widest">
              B2B Portal
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors font-medium"
                style={{
                  color: isActive("/dashboard") ? RED : "#374151",
                  backgroundColor: isActive("/dashboard") ? "#f9e9ea" : "transparent",
                }}
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors font-medium"
                    style={{ color: openDropdown === item.label ? RED : "#374151" }}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-1 z-50 w-48">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-800">{child.label}</span>
                            <span className="text-xs text-gray-400">{child.sub}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path!}
                  className="px-4 py-2 text-sm rounded-lg transition-colors font-medium"
                  style={{
                    color: isActive(item.path!) ? RED : "#374151",
                    backgroundColor: isActive(item.path!) ? "#f9e9ea" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                >
                  <ShoppingCart size={15} />
                  <span className="hidden sm:inline">Cart</span>
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: RED }}
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: RED }}
                    >
                      {company?.contactPerson.charAt(0) || "U"}
                    </div>
                    <span className="max-w-[100px] truncate">{company?.contactPerson?.split(" ")[0]}</span>
                    <ChevronDown size={12} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                  </button>
                  {profileOpen && (
                    <div className="absolute top-full right-0 pt-1 z-50 w-52">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50">
                          <div className="text-gray-900 text-sm font-semibold">{company?.contactPerson}</div>
                          <div className="text-gray-400 text-xs truncate">{company?.name}</div>
                          <div
                            className="text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "#fffbeb", color: "#92400e" }}
                          >
                            {company?.tier} Partner
                          </div>
                        </div>
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={14} /> Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
              {/* We will put the profile dropdown here */}
                {/* <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-300 transition-colors"
                >
                  <LogIn size={15} /> Sign In
                </Link>
                <Link
                  href="/inquiry"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: RED }}
                >
                  Get Started
                </Link> */}
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}
            {nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</div>
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <span>{child.label}</span>
                      <span className="text-xs text-gray-400">{child.sub}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path!}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700"
                  >
                    <ShoppingCart size={15} /> Cart {itemCount > 0 && `(${itemCount})`}
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); router.push("/"); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-600 border border-red-100 text-sm font-semibold"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700"
                  >
                    <LogIn size={15} /> Sign In
                  </Link>
                  <Link
                    href="/inquiry"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg text-white text-sm font-semibold"
                    style={{ backgroundColor: RED }}
                  >
                    Get Started
                  </Link> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
