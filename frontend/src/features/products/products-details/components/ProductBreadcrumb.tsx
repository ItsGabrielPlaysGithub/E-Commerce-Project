"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
      <Link href="/" className="hover:text-gray-600">
        Home
      </Link>
      <ChevronRight size={12} />
      <Link href="/b2b/products/all" className="hover:text-gray-600">
        Products
      </Link>
      <ChevronRight size={12} />
      <Link href={`/b2b/products/category/${product.category.toLowerCase()}`} className="hover:text-gray-600">
        {product.category}
      </Link>
      <ChevronRight size={12} />
      <span className="text-gray-600">{product.name}</span>
    </div>
  );
}
