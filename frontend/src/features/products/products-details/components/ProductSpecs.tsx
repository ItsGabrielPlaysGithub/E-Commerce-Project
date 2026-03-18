"use client";

import { CheckCircle } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  // Build specs array from product
  const specs = [
    ...(product.specs || []),
  ];

  if (!specs.length) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-gray-800 text-sm mb-3">Product Specifications</h3>
      <ul className="space-y-2">
        {specs.map((spec) => (
          <li key={spec} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={14} style={{ color: "#bf262f" }} />
            {spec}
          </li>
        ))}
      </ul>
    </div>
  );
}
