"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight, RefreshCw } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";

interface QuickReorderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  lastQty: number;
  stock: number;
}

interface QuickReorderProps {
  items: QuickReorderItem[];
}

export function QuickReorder({ items }: QuickReorderProps) {
  const [reorderQtys, setReorderQtys] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  const handleAddToCart = (item: QuickReorderItem, qty: string) => {
    const quantity = parseInt(qty) || 0;
    if (quantity > 0) {
      // You'll need to adjust this based on your cart implementation
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
      setReorderQtys({ ...reorderQtys, [item.id]: "" });
    }
  };

  return (
    <div
      className="bg-white rounded-xl border"
      style={{ borderColor: "#e2e8f0" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">Quick Reorder</h2>
          <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.72rem" }}>
            Your most-ordered items
          </p>
        </div>
        <RefreshCw size={14} style={{ color: "#9ca3af" }} className="hover:opacity-70 cursor-pointer transition-opacity" />
      </div>

      {/* Items List */}
      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl border transition-all hover:border-red-200 hover:bg-red-50/30"
            style={{ borderColor: "#f1f5f9" }}
          >
            {/* Item Info */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">
                  {item.name}
                </div>
                <div className="font-mono text-gray-400 mt-0.5" style={{ fontSize: "0.65rem" }}>
                  {item.sku}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-bold text-gray-800">₱{item.price.toLocaleString()}</div>
                <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>
                  WS price
                </div>
              </div>
            </div>

            {/* Input & Button */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={`Last: ${item.lastQty}`}
                className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none transition-all"
                style={{ borderColor: "#e2e8f0", fontSize: "0.75rem" }}
                value={reorderQtys[item.id] || ""}
                onChange={(e) => setReorderQtys({ ...reorderQtys, [item.id]: e.target.value })}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#bf262f";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(191,38,47,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                onClick={() => handleAddToCart(item, reorderQtys[item.id] || "0")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all hover:opacity-90 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#bf262f" }}
                disabled={!reorderQtys[item.id] || parseInt(reorderQtys[item.id]) <= 0}
              >
                <ShoppingCart size={11} />
                Add
              </button>
            </div>

            {/* Stock & Total */}
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>
                Stock: {item.stock.toLocaleString()} units
              </span>
              {reorderQtys[item.id] && (
                <span className="text-green-600 font-semibold" style={{ fontSize: "0.65rem" }}>
                  Total: ₱{(item.price * parseInt(reorderQtys[item.id] || "0")).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Browse Catalog Link */}
      <div className="px-4 pb-4">
        <Link
          href="/b2b/products/all"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-xs font-semibold transition-all hover:bg-gray-50"
          style={{ borderColor: "#e2e8f0", color: "#4b5563" }}
        >
          Browse Full Catalog <ArrowRight size={13} />
        </Link>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">No recent items to reorder</p>
        </div>
      )}
    </div>
  );
}
