"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useMutation } from "@apollo/client/react";
import { LOGOUT_MUTATION } from "@/features/auth/services/mutation";
import { Logo } from "../ui/Logo";
import { NavLinks } from "./NavLinks";
import { ProfileDropdown } from "./ProfileDropdown";
import { useCart } from "@/features/cart/hooks/useCart";
import type { SessionUser } from "@/lib/session";

const nav = [
  { label: "Home", path: "/b2b/home" },
  { label: "Products",
    children: [
  { label: "All Products", path: "/b2b/products?category=All" },
  { label: "Bakeware", path: "/b2b/products?category=Bakeware" },
  { label: "Cookware", path: "/b2b/products?category=Cookware" },
  { label: "Dinnerware", path: "/b2b/products?category=Dinnerware" },
  { label: "Glassware", path: "/b2b/products?category=Glassware" },
  { label: "Hydration", path: "/b2b/products?category=Hydration" },
  { label: "Vacuum Flask", path: "/b2b/products?category=Vacuum%20Flask" },
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

interface HeaderProps {
  sessionUser: SessionUser;
}

export function Header({ sessionUser }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, company, logout } = useAuth();
  const { itemCount, lastAdded } = useCart();
  const [runLogout] = useMutation(LOGOUT_MUTATION);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await runLogout();
    } catch {
      // Continue client logout even if network request fails.
    }

    logout();
    setProfileOpen(false);
    router.replace("/login");
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
          <Logo href={isLoggedIn ? "/b2b/home" : "/"} RED={RED} />

          {/* Desktop nav */}
          <NavLinks
            items={nav}
            isLoggedIn={isLoggedIn}
            isActive={isActive}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            RED={RED}
          />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart - always visible */}
            <div className="relative">
              <Link
                href="/b2b/cart"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
              >
                <ShoppingCart size={15} />
                <span className="hidden sm:inline">Cart</span>
              </Link>
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: RED }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </div>

            {/* Profile dropdown */}
            <ProfileDropdown
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
              company={company}
              sessionUserId={sessionUser.userId}
              sessionEmail={sessionUser.emailAddress}
              onLogout={handleLogout}
              RED={RED}
            />

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
                      {"sub" in child && child.sub && <span className="text-xs text-gray-400">{child.sub}</span>}
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
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700"
              >
                <ShoppingCart size={15} /> Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              <button
                onClick={async () => {
                  await handleLogout();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-600 border border-red-100 text-sm font-semibold"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
