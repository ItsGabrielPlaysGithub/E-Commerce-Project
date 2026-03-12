import { ChevronDown } from "lucide-react";
import React from "react";

interface DropdownFilterProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  value,
  options,
  onChange,
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-600 pr-6 focus:outline-none cursor-pointer bg-white"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);
