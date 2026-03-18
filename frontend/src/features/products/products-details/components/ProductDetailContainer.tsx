"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { usePricingTab } from "../hooks/usePricingTab";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductImage } from "./ProductImage";
import { ProductHeader } from "./ProductHeader";
import { ProductPricing } from "./ProductPricing";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";
import { ProductDescription } from "./ProductDescription";
import { RelatedProducts } from "./RelatedProducts";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

interface ProductDetailContainerProps {
  product: Product | undefined;
}

export function ProductDetailContainer({ product }: ProductDetailContainerProps) {
  const { activeTab, setActiveTab } = usePricingTab();

  // Get related products
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <Package size={40} className="opacity-30" />
        <p>Product not found.</p>
        <Link href="/b2b/products/all" className="text-sm font-semibold" style={{ color: "#bf262f" }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <ProductBreadcrumb product={product} />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <ProductImage product={product} />

          {/* Right: Product Information */}
          <div className="space-y-4">
            <ProductHeader product={product} />
            <ProductPricing product={product} activeTab={activeTab} onTabChange={setActiveTab} />
            <ProductActions pricingTab={activeTab} />
            <ProductSpecs product={product} />
          </div>
        </div>

        {/* Description */}
        <ProductDescription product={product} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
