"use client";

import React from "react";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  priceType: string;
  onPriceTypeChange: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
  priceType,
  onPriceTypeChange,
  sortBy,
  onSortChange,
}) => {
  const priceTypes = ["Retail", "Wholesale", "Bulk"];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
      {/* Price Type Segments */}
      <div className="flex items-center gap-4">
          <div className="flex p-1.5 bg-neutral-100 rounded-2xl">
            {priceTypes.map((type) => (
              <button
                key={type}
                onClick={() => onPriceTypeChange(type)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  priceType === type
                    ? "bg-primary text-white shadow-lg"
                    : "text-neutral-500 hover:text-neutral-700"
                )}
              >
                {type}
              </button>
            ))}
          </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Sorting Dropdown */}
        <div className="relative group w-full md:w-[180px]">
          <button className="w-full flex items-center justify-between gap-2 px-5 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm font-bold text-neutral-700 hover:border-primary/30 transition-all">
            <span>{sortBy}</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
          
          <div className="absolute top-full right-0 mt-2 w-full bg-white border border-neutral-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
             {["Featured", "Price: Low → High", "Price: High → Low", "Best Rated"].map((opt) => (
               <button 
                key={opt}
                onClick={() => onSortChange(opt)}
                className="w-full px-5 py-3 text-left text-sm font-bold text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors"
               >
                 {opt}
               </button>
             ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex p-1 bg-neutral-100 rounded-xl">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-2.5 rounded-lg transition-all",
              viewMode === "grid" ? "bg-primary text-white shadow-md" : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-2.5 rounded-lg transition-all",
              viewMode === "list" ? "bg-primary text-white shadow-md" : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;
