"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartItem, Company } from "../types";
import { CART_COLORS, CART_CONFIG } from "../constants/cartConstants";

interface CartSummaryProps {
  items: CartItem[];
  company: Company;
  subtotal: number;
  itemCount: number;
  onProceed: () => void;
}

export function CartSummary({
  items,
  company,
  subtotal,
  itemCount,
  onProceed,
}: CartSummaryProps) {
  const { RED, RED_LIGHT } = CART_COLORS;
  const { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } = CART_CONFIG;

  const tierLabel =
    company.accountType === "wholesale"
      ? `${company.tier} Wholesale`
      : company.accountType === "bulk"
      ? "Bulk Pricing"
      : "Retail Pricing";

  const fullRetailTotal = items.reduce((s, i) => s + i.qty * i.product.retailPrice, 0);
  const savings = fullRetailTotal - subtotal;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3
          className="text-gray-900 font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Order Summary
        </h3>

        {/* Pricing tier badge */}
        <div
          className="flex items-center justify-between py-2 px-3 rounded-lg mb-4 text-xs"
          style={{ backgroundColor: RED_LIGHT }}
        >
          <span className="text-gray-600 font-medium">Pricing tier</span>
          <span className="font-bold" style={{ color: RED }}>
            {tierLabel}
          </span>
        </div>

        {/* Line items */}
        <div className="space-y-2.5 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal ({itemCount} items)</span>
            <span className="text-gray-900 font-medium">₱{subtotal.toLocaleString()}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Tier Savings</span>
              <span className="text-green-600 font-semibold">-₱{savings.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery fee</span>
            <span className="text-gray-900 font-medium">
              {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₱${deliveryFee}`}
            </span>
          </div>
          {deliveryFee > 0 && (
            <p className="text-gray-400 text-xs">
              Add ₱{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} more for free delivery.
            </p>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-semibold">Grand Total</span>
            <span
              className="font-bold text-xl"
              style={{ fontFamily: "'Playfair Display', serif", color: RED }}
            >
              ₱{grandTotal.toLocaleString()}
            </span>
          </div>
          <div className="text-gray-400 text-xs mt-0.5">VAT inclusive</div>
        </div>

        <button
          onClick={onProceed}
          className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          style={{ backgroundColor: RED }}
        >
          Proceed to Order <ArrowRight size={15} />
        </button>
        <Link
          href="/products"
          className="w-full mt-2.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-gray-600 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          Continue Adding Products
        </Link>
      </div>

      {/* Quick account info */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Billing Account
        </div>
        <div className="space-y-1.5 text-xs text-gray-500">
          <div>
            <strong className="text-gray-700">{company.name}</strong>
          </div>
          <div>{company.accountNumber}</div>
          <div>{company.email}</div>
        </div>
      </div>
    </div>
  );
}
