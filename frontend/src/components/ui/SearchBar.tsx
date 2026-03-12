import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    />
  </div>
);
