"use client";

import { ProductsHeaderSection } from "../../features/admin/products/components/ProductsHeaderSection";
import { ProductsPageProvider } from "../../features/admin/products/context/ProductsPageProvider";
import { ProductsResultsSection } from "../../features/admin/products/context/ProductsResultsSection";
import { ProductsToolbarSection } from "../../features/admin/products/components/ProductsToolbarSection";

export function Products() {
  return (
    <ProductsPageProvider>
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