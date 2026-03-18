"use client";

import { useState } from "react";

export type PricingTab = "retail" | "wholesale" | "bulk";

export function usePricingTab() {
  const [activeTab, setActiveTab] = useState<PricingTab>("retail");

  return {
    activeTab,
    setActiveTab,
  };
}

export function calculatePrice(
  retailPrice: number,
  wholesalePrice: number,
  bulkPrice: number,
  tab: PricingTab
) {
  switch (tab) {
    case "wholesale":
      return wholesalePrice;
    case "bulk":
      return bulkPrice;
    default:
      return retailPrice;
  }
}

export function calculateSavings(price: number, retailPrice: number) {
  return Math.round((1 - price / retailPrice) * 100);
}

export function getMinimumOrderQuantity(
  moqWholesale: number,
  moqBulk: number,
  tab: PricingTab
) {
  switch (tab) {
    case "wholesale":
      return moqWholesale;
    case "bulk":
      return moqBulk;
    default:
      return 1;
  }
}
