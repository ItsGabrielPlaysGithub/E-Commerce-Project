import { Search, ChevronDown, Grid, List } from "lucide-react";
import { CATEGORIES, SORT_OPTIONS, RED } from "../../../data/constants";

interface FilterBarProps {
  activeCategory: string;
  search: string;
  sort: string;
  viewMode: "grid" | "list";
  priceType: "retail" | "wholesale" | "bulk";
  onCategoryChange: (cat: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onPriceTypeChange: (type: "retail" | "wholesale" | "bulk") => void;
}

export function FilterBar({
  activeCategory,
  search,
  sort,
  viewMode,
  priceType,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onPriceTypeChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5 flex flex-col gap-3">
      {/* Search bar with sort dropdown */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          />
        </div>
        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-600 pr-6 focus:outline-none cursor-pointer bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Categories and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={activeCategory === cat
                ? { backgroundColor: RED, color: "#fff" }
                : { backgroundColor: "#f3f4f6", color: "#374151" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing type and View buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Pricing type */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden text-xs">
            {(["retail", "wholesale", "bulk"] as const).map((t) => (
              <button
                key={t}
                onClick={() => onPriceTypeChange(t)}
                className="px-3 py-1.5 capitalize font-semibold transition-colors"
                style={priceType === t ? { backgroundColor: RED, color: "#fff" } : { color: "#374151" }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* View */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {([["grid", Grid], ["list", List]] as const).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className="p-1.5 transition-colors"
                style={viewMode === mode ? { backgroundColor: RED, color: "#fff" } : { color: "#9ca3af" }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
