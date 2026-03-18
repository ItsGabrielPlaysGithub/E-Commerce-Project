"use client";

import { Star } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "#bf262f";
      case "New":
        return "#0369a1";
      default:
        return "#d97706";
    }
  };

  return (
    <div>
      {/* Badge */}
      {product.badge && (
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
          style={{
            backgroundColor: getBadgeColor(product.badge),
            color: "#fff",
          }}
        >
          {product.badge}
        </span>
      )}

      {/* Title */}
      <h1
        className="text-gray-900"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "2rem",
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </h1>

      {/* Meta Info */}
      <p className="text-gray-400 text-sm mt-1">
        {product.category} · SKU: {product.id}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={14}
              fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
              stroke={s <= Math.round(product.rating) ? "#f59e0b" : "#d1d5db"}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
        <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
      </div>
    </div>
  );
}
