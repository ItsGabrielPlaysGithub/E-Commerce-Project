"use client";

import type { Product } from "@/data/products";

interface ProductImageProps {
  product: Product;
}

export function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="rounded-3xl overflow-hidden bg-gray-50 aspect-square">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
