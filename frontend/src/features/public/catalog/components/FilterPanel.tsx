"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Category {
  categoryId: number | string;
  categoryName: string;
  slug: string;
}

interface FilterPanelProps {
  categories: Category[];
  selectedCategoryId: number | string | null;
  onCategorySelect: (categoryId: number | string | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => onCategorySelect(null)}
        className={cn(
          "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2",
          selectedCategoryId === null
            ? "bg-primary border-primary text-white shadow-[0_8px_20px_-5px_rgba(200,16,46,0.3)]"
            : "bg-neutral-100 border-transparent text-neutral-500 hover:bg-neutral-200"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.categoryId}
          onClick={() => onCategorySelect(category.categoryId)}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2",
            selectedCategoryId === category.categoryId
              ? "bg-primary border-primary text-white shadow-[0_8px_20px_-5px_rgba(200,16,46,0.3)]"
              : "bg-neutral-100 border-transparent text-neutral-500 hover:bg-neutral-200"
          )}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
