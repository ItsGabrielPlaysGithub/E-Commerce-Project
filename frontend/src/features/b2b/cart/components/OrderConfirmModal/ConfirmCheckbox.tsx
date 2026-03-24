"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

interface ConfirmCheckboxProps {
  confirmed: boolean;
  redColor: string;
  redLightColor: string;
  onConfirmedChange: (value: boolean) => void;
}

export function ConfirmCheckbox({
  confirmed,
  redColor,
  redLightColor,
  onConfirmedChange,
}: ConfirmCheckboxProps) {
  const { company } = useAuth();
  const companyName = company?.companyName || company?.fullName || "your company";

  return (
    <label
      className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
      style={{
        borderColor: confirmed ? redColor : "#e5e7eb",
        backgroundColor: confirmed ? redLightColor : "#fafafa",
      }}
    >
      <input
        type="checkbox"
        checked={confirmed}
        onChange={(e) => onConfirmedChange(e.target.checked)}
        className="h-3 w-3 shrink-0 accent-red-600 cursor-pointer flex item-center justify-center mt-[3%]"
      />
      <span className="text-xs text-gray-600 leading-relaxed">
        I confirm this order is correct. I understand the pricing tier, MOQ requirements,
        and delivery terms for <strong>{companyName}</strong>.
      </span>
    </label>
  );
}
