"use client";

import Link from "next/link";
import { ShoppingBag, Truck } from "lucide-react";
import type { PricingTab } from "../hooks/usePricingTab";

interface ProductActionsProps {
  pricingTab: PricingTab;
}

export function ProductActions({ pricingTab }: ProductActionsProps) {
  const buttonLabel = pricingTab === "retail" ? "Order Now" : "Request Quote";

  return (
    <div className="mt-5 space-y-4">
      {/* CTA Buttons */}
      <div className="flex gap-3">
        <Link
          href="/b2b/inquiry"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-semibold hover:opacity-90 transition-all shadow-lg"
          style={{ backgroundColor: "#bf262f" }}
        >
          <ShoppingBag size={16} />
          {buttonLabel}
        </Link>
        <Link
          href="/b2b/inquiry"
          className="flex items-center gap-2 px-5 py-3.5 rounded-full border-2 border-gray-800 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white transition-colors text-sm"
        >
          Inquire
        </Link>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Truck size={15} style={{ color: "#bf262f" }} />
        Free delivery within Metro Manila on orders above ₱1,299
      </div>
    </div>
  );
}
