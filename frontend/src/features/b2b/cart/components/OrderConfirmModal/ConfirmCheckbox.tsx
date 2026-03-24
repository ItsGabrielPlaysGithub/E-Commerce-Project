"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

const BLUE_COLOR = "#3b82f6";
const BLUE_LIGHT = "rgba(59, 130, 246, 0.1)";

interface ConfirmCheckboxProps {
  confirmed: boolean;
  onConfirmedChange: (value: boolean) => void;
}

export function ConfirmCheckbox({
  confirmed,
  onConfirmedChange,
}: ConfirmCheckboxProps) {
  const { company } = useAuth();
  const companyName = company?.companyName || company?.fullName || "your company";

  return (
    <label
      className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
      style={{
        borderColor: confirmed ? BLUE_COLOR : "#e5e7eb",
        backgroundColor: confirmed ? BLUE_LIGHT : "#fafafa",
      }}
    >
      <input
        type="checkbox"
        checked={confirmed}
        onChange={(e) => onConfirmedChange(e.target.checked)}
        className="h-3 w-3 shrink-0 accent-blue-600 cursor-pointer flex item-center justify-center mt-[3%]"
      />
      <span className="text-xs text-gray-600 leading-relaxed">
        I confirm this order is correct. I understand the pricing tier, MOQ requirements,
        and delivery terms for <strong>{companyName}</strong>.
      </span>
    </label>
  );
}
