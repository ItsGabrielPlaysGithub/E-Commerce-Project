"use client";

import { useState, useMemo } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, Grid, List } from "lucide-react";
import { products } from "../../../../data/products";
import { ProductCard } from "../../../../components/cards/ProductCard";
import Link from "next/link";

const RED = "#bf262f";
const RED_LIGHT = "#f9e9ea";

const CATEGORIES = ["All", "Bakeware", "Cookware", "Dinnerware", "Glassware", "Hydration", "Vacuum Flask"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Best Rated" },
];

export function Products() {
  const router = useRouter();
  const params = useSearchParams() || new URLSearchParams();
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceType, setPriceType] = useState<"retail" | "wholesale" | "bulk">("retail");
  const [search, setSearch] = useState("");

  const activeCategory = params.get("category") || "All";
  const searchQuery = params.get("q") || "";

  const setCategory = (cat: string) => {
    const newParams = new URLSearchParams(params);
    if (cat === "All") newParams.delete("category");
    else newParams.set("category", cat);
    router.push(`?${newParams.toString()}`);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const newParams = new URLSearchParams(params);
    if (value) newParams.set("q", value);
    else newParams.delete("q");
    router.push(`?${newParams.toString()}`);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (searchQuery) list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sort === "price-asc") return list.sort((a, b) => a.retailPrice - b.retailPrice);
    if (sort === "price-desc") return list.sort((a, b) => b.retailPrice - a.retailPrice);
    if (sort === "rating") return list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, searchQuery, sort]);

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Link href="/b2b/dashboard" className="hover:text-red-600">Home</Link>
              <ChevronDown size={10} className="-rotate-90" />
              <span className="text-gray-600">Catalog</span>
              {activeCategory !== "All" && (
                <>
                  <ChevronDown size={10} className="-rotate-90" />
                  <span className="text-gray-600">{activeCategory}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
              {activeCategory === "All" ? "Full Catalog" : activeCategory}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">{filtered.length} products</p>
          </div>
          <Link
            href="/b2b/inquiry"
            className="text-xs font-semibold px-4 py-2 rounded-lg self-start sm:self-auto"
            style={{ backgroundColor: RED_LIGHT, color: RED }}
          >
            Request Bulk Quote →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5 flex flex-col gap-3">
          {/* Search bar with sort dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              />
            </div>
            {/* Sort dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
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
                  onClick={() => setCategory(cat)}
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
                    onClick={() => setPriceType(t)}
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
                    onClick={() => setViewMode(mode)}
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

        {/* Pricing notice */}
        {priceType !== "retail" && (
          <div
            className="rounded-xl px-4 py-2.5 mb-5 flex items-center gap-2 text-xs"
            style={{ backgroundColor: RED_LIGHT }}
          >
            <span style={{ color: RED }} className="font-semibold">
              {priceType === "wholesale" ? "Wholesale" : "Bulk"} pricing shown.
            </span>
            <span className="text-gray-500">
              {priceType === "wholesale" ? "Min. 12 units/SKU — " : "Min. 100 units/SKU — "}
            </span>
            <Link href="/b2b/inquiry" style={{ color: RED }} className="font-semibold underline">
              Apply for access →
            </Link>
          </div>
        )}

        {/* Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-300">
            <Search size={40} className="mx-auto mb-3" />
            <p className="text-sm">No products found.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} showPricing={priceType} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-sm transition-shadow">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{p.category}</div>
                  <Link href={`/b2b/products/${p.id}`} className="text-gray-800 text-sm font-medium hover:text-red-600 transition-colors line-clamp-1">
                    {p.name}
                  </Link>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-gray-900 text-sm">
                    ₱{(priceType === "wholesale" ? p.wholesalePrice : priceType === "bulk" ? p.bulkPrice : p.retailPrice).toLocaleString()}
                  </div>
                  {priceType !== "retail" && (
                    <div className="text-xs text-gray-300 line-through">₱{p.retailPrice.toLocaleString()}</div>
                  )}
                  <Link
                    href={`/b2b/products/${p.id}`}
                    className="mt-1.5 inline-block text-xs font-semibold px-3 py-1 rounded-lg text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: RED }}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
