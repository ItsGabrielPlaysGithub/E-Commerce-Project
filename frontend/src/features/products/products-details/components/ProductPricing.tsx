"use client";

import type { Product } from "@/data/products";
import { calculatePrice, calculateSavings, getMinimumOrderQuantity, type PricingTab } from "../hooks/usePricingTab";

interface ProductPricingProps {
  product: Product;
  activeTab: PricingTab;
  onTabChange: (tab: PricingTab) => void;
}

function fmt(n: number) {
  return `₱${n.toLocaleString("en-PH")}`;
}

export function ProductPricing({ product, activeTab, onTabChange }: ProductPricingProps) {
  const price = calculatePrice(
    product.retailPrice,
    product.wholesalePrice,
    product.bulkPrice,
    activeTab
  );

  const savings = calculateSavings(price, product.retailPrice);
  const moq = getMinimumOrderQuantity(product.minWholesale, product.minBulk, activeTab);

  return (
    <div className="mt-6 space-y-4">
      {/* Pricing Tabs */}
      <div className="bg-gray-50 rounded-2xl p-1 flex gap-1">
        {(["retail", "wholesale", "bulk"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
            style={{
              backgroundColor: activeTab === tab ? "#bf262f" : "transparent",
              color: activeTab === tab ? "#fff" : "#6b7280",
              boxShadow: activeTab === tab ? "0 4px 12px rgba(191,38,47,0.3)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Price Display */}
      <div className="mt-5 p-5 rounded-2xl border" style={{ borderColor: "#f9e9ea", backgroundColor: "#fdf9f9" }}>
        <div className="flex items-end gap-3">
          <span
            className="font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.25rem",
              color: "#bf262f",
            }}
          >
            {fmt(price)}
          </span>
          {savings > 0 && (
            <>
              <span className="text-gray-400 line-through text-lg">{fmt(product.retailPrice)}</span>
              <span className="text-green-600 text-sm font-bold">-{savings}%</span>
            </>
          )}
        </div>
        {activeTab !== "retail" && (
          <p className="text-sm text-gray-500 mt-1">Min. order: {moq} units</p>
        )}
      </div>
    </div>
  );
}
