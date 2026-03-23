"use client";

import { ShoppingCart, LogIn } from "lucide-react";
import Link from "next/link";

const BUTTON_COLOR = "#3b82f6"; // Blue for positive action

interface AddToCartButtonProps {
  isLoggedIn: boolean;
  inStock?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loginRedirectUrl?: string;
  isLoading?: boolean;
}

export function AddToCartButton({
  isLoggedIn,
  inStock = true,
  onClick,
  size = "md",
  fullWidth = false,
  loginRedirectUrl = "/b2b/login",
  isLoading = false,
}: AddToCartButtonProps) {
  const sizeClasses = {
    sm: "text-xs px-2 sm:px-3 py-1.5 sm:py-1",
    md: "text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-1.5",
    lg: "text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-2",
  };

  const baseClassName = `flex items-center justify-center gap-1 font-semibold rounded-lg hover:opacity-80 hover:shadow-md hover:scale-105 transition-all whitespace-nowrap cursor-pointer ${sizeClasses[size]} ${
    fullWidth ? "w-full" : "w-full sm:w-auto"
  }`;

  // Not logged in - show login link
  if (!isLoggedIn) {
    return (
      <Link
        href={loginRedirectUrl}
        className={baseClassName}
        style={{ backgroundColor: BUTTON_COLOR, color: "#ffffff" }}
      >
        <LogIn size={size === "sm" ? 12 : size === "md" ? 14 : 16} className="sm:hidden" />
        <LogIn size={size === "sm" ? 10 : size === "md" ? 12 : 14} className="hidden sm:block" />
        <span>Add to Cart</span>
      </Link>
    );
  }

  // Out of stock
  if (!inStock) {
    return <span className="text-xs text-gray-300 font-medium">Sold Out</span>;
  }

  // Logged in and in stock - show button
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClassName} disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{ backgroundColor: BUTTON_COLOR, color: "#ffffff" }}
    >
      <ShoppingCart size={size === "sm" ? 12 : size === "md" ? 14 : 16} className="sm:hidden" />
      <ShoppingCart size={size === "sm" ? 10 : size === "md" ? 12 : 14} className="hidden sm:block" />
      <span>{isLoading ? "Adding..." : "Add"}</span>
    </button>
  );
}
