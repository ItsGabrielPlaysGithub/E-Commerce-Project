"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Products", href: "#product-catalog", hasDropdown: true },
  { name: "About", href: "/about" },
  { name: "Omega Stories", href: "#omega-stories" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "#contact-us" },
  { name: "Omega Affiliate", href: "/affiliate", highlight: true },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroVersion, setHeroVersion] = useState<"A" | "B">("B");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleVersionChange = (e: any) => {
      setHeroVersion(e.detail);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hero-version-change", handleVersionChange);
    
    // Check initial version if possible (assuming B as default from toggle component)
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hero-version-change", handleVersionChange);
    };
  }, []);

  const isDarkHero = heroVersion === "B";
  const headerTextColor = isScrolled ? "text-secondary" : (isDarkHero ? "text-white" : "text-secondary");

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300",
        isScrolled
          ? "bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            isScrolled ? "bg-primary" : (isDarkHero ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-primary")
          )}>
            <span className={cn(
              "font-bold text-xl transition-colors",
              isScrolled ? "text-white" : (isDarkHero ? "text-white" : "text-white")
            )}>Ω</span>
          </div>
          <span className={cn(
            "font-display text-2xl font-bold tracking-tight transition-colors",
            headerTextColor
          )}>
            OMEGA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                link.highlight ? "text-primary font-bold" : headerTextColor
              )}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className={cn("transition-colors hover:text-primary", headerTextColor)}>
            <Search size={22} />
          </button>
          <button className={cn("transition-colors hover:text-primary relative", headerTextColor)}>
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <button
            className={cn("lg:hidden transition-colors", headerTextColor)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-medium py-2 border-b border-gray-50 flex justify-between items-center",
                link.highlight ? "text-primary" : "text-secondary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={18} />}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;