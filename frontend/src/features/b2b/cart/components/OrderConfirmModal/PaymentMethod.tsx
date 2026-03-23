"use client";

import { useState } from "react";
import { CreditCard, Banknote, ChevronDown } from "lucide-react";

interface PaymentMethodProps {
  selectedMethod: "e-payment" | "manual_transfer";
  onMethodChange: (method: "e-payment" | "manual_transfer") => void;
}

export function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Type of Payment
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 p-3 border rounded-xl cursor-not-allowed opacity-50"
          style={{
            borderColor: "#e5e7eb",
            backgroundColor: "#fafafa",
          }}
        >
          <input
            type="radio"
            name="payment-method"
            value="e-payment"
            checked={selectedMethod === "e-payment"}
            onChange={(e) => onMethodChange(e.target.value as "e-payment" | "manual_transfer")}
            className="accent-red-600"
            disabled
          />
          <CreditCard size={16} className="text-gray-400" />
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-500 block">E-Payment</span>
            <span className="text-xs text-gray-400">Credit/Debit Card, Online Banking</span>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
            Coming Soon
          </span>
        </label>

        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-gray-50"
            style={{
              borderColor: selectedMethod === "manual_transfer" ? "#10b981" : "#e5e7eb",
              backgroundColor: selectedMethod === "manual_transfer" ? "#ecfdf5" : "#fafafa",
            }}
          >
            <input
              type="radio"
              name="payment-method"
              value="manual_transfer"
              checked={selectedMethod === "manual_transfer"}
              onChange={(e) => onMethodChange(e.target.value as "e-payment" | "manual_transfer")}
              className="accent-green-600"
            />
            <Banknote size={16} className="text-gray-600" />
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-700 block">Manual Payment</span>
              <span className="text-xs text-gray-500">Bank Transfer, Payment Slip</span>
            </div>
            {selectedMethod === "manual_transfer" && (
              <button
                type="button"
                onClick={() => setShowInstructions(!showInstructions)}
                className="ml-auto p-1 hover:bg-green-100 rounded-lg transition-colors"
              >
                <ChevronDown
                  size={16}
                  className="text-green-600 transition-transform"
                  style={{ transform: showInstructions ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
            )}
          </label>

          {selectedMethod === "manual_transfer" && showInstructions && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs text-blue-700 leading-relaxed">
                After placing your order, go to <strong>My Orders</strong> to view your order details and upload your payment proof. This helps us verify your payment quickly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
