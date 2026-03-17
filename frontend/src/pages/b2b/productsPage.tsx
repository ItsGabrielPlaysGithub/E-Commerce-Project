"use client";

import { ProductsHeaderSection } from "../../features/products/components/ProductsHeaderSection";
import { ProductsPageProvider } from "../../features/products/context/ProductsPageProvider";
import { ProductsResultsSection } from "../../features/products/context/ProductsResultsSection";
import { ProductsToolbarSection } from "../../features/products/components/ProductsToolbarSection";

interface ProductsProps {
  initialCategory?: string;
}

export function Products({ initialCategory = "All" }: ProductsProps) {
  return (
    <ProductsPageProvider initialCategory={initialCategory}>
      <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
        <ProductsHeaderSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProductsToolbarSection />
          <ProductsResultsSection />
        </div>
      </div>
    </ProductsPageProvider>
  );
}

export default Products;