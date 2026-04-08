"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Truck, Store, ShieldCheck, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        {/* Top Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 mb-20 border-b border-neutral-100">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110">
              <Truck size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Home Delivery</h4>
              <p className="text-white/70 text-sm">Nationwide shipping available</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110">
              <Store size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Pick-up Only</h4>
              <p className="text-white/70 text-sm">Reserve online & pick up in-store</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Secure Payment</h4>
              <p className="text-white/70 text-sm">100% safe checkout options</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Logo href="/" white className="mb-6 block" />
            <p className="text-white/80 text-sm leading-relaxed max-w-sm line-clamp-4">
              Dedicated to bringing quality to houseware in every Filipino kitchen since 1985. We believe in modern tools that preserve traditional culinary excellence.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transition-transform">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transition-transform">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transition-transform">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transition-transform">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg">Products</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Glassware</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bakeware</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dinnerware</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Flasks</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Utensils</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg">Support</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Affiliate Disclaimer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg">Join the Circle</h4>
            <p className="text-white/70 text-sm font-medium">
              Subscribe for exclusive deals and recipes.
            </p>
            <div className="flex bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 p-1 group focus-within:ring-2 focus-within:ring-white/20 transition-all">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none rounded-none px-4 py-3 text-sm grow outline-none placeholder:text-white/40 text-white"
              />
              <button className="bg-white text-primary hover:bg-neutral-100 w-12 h-12 flex items-center justify-center rounded-lg transition-all shadow-lg active:scale-95">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-xs font-medium uppercase tracking-widest">
          <p>© 2026 Omega Houseware. All rights reserved.</p>
          <div className="flex gap-8 items-center lowercase font-sans">
            <Link href="mailto:hello@omegahouseware.com" className="hover:text-white transition-colors">hello@omegahouseware.com</Link>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <Link href="tel:+639171234567" className="hover:text-white transition-colors">+63 917 123 4567</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Facebook = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Twitter = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Youtube = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

export default Footer;