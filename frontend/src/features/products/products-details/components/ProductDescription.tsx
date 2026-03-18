"use client";

import type { Product } from "@/data/products";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  if (!product.description) return null;

  return (
    <div className="mt-14 max-w-2xl">
      <h2
        className="text-gray-900 mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.4rem",
        }}
      >
        About This Product
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
    </div>
  );
}
