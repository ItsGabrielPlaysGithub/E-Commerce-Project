"use client";

import Image from "next/image";
import omegaLogo from "@/assets/omega_logo_456x150_1_456x150.avif";

interface StatCard {
  value: string;
  label: string;
}

const STAT_CARDS: StatCard[] = [
  { value: "500+", label: "SKUs" },
  { value: "35%", label: "Max Off" },
  { value: "24h", label: "Fulfillment" },
];

export const LoginLeftPanel = () => {
  return (
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

      {/* Logo Section */}
      <div className="relative">
        <Image 
          src={omegaLogo}
          alt="Omega Logo"
          width={180}
          height={60}
          className="h-auto w-auto"
        />
        <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">B2B Partner Portal</div>
      </div>

      {/* Main Content Section */}
      <div className="relative">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Trusted by 1,200+ businesses</p>
        <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Supply smarter.<br />Sell everywhere.
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
          Access exclusive B2B pricing, manage orders, and sync your inventory across Shopee, Lazada, and TikTok Shop — all
          from one portal.
        </p>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {STAT_CARDS.map(({ value, label }) => (
            <div key={label} className="border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {value}
              </div>
              <div className="text-white/40 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="relative">
        <div className="flex gap-2 items-center mb-3">
          {/* Placeholder for future integration section */}
        </div>
      </div>
    </div>
  );
};
