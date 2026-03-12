"use client";

import { ProductsHeaderSection } from "../../components/b2b/products/ProductsHeaderSection";
import { ProductsPageProvider } from "../../components/b2b/products/ProductsPageProvider";
import { ProductsResultsSection } from "../../components/b2b/products/ProductsResultsSection";
import { ProductsToolbarSection } from "../../components/b2b/products/ProductsToolbarSection";

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