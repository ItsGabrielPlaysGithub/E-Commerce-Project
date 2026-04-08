"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { GET_CATALOG_DATA } from "./queries";
import { productsData } from "@/data/products";
import Header from "@/features/public/components/layout/Header";
import Footer from "@/features/public/components/layout/Footer";
import CatalogHeader from "./components/CatalogHeader";
import FilterPanel from "./components/FilterPanel";
import ViewToggle from "./components/ViewToggle";
import ProductGrid from "./components/ProductGrid";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import { motion, AnimatePresence } from "framer-motion";

interface CatalogData {
  getProducts: any[];
  getCategories: any[];
}

const CatalogContainer = () => {
  // Navigation & Search Params
  const searchParams = useSearchParams();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceType, setPriceType] = useState("Retail");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Fetching
  const { data, loading, error } = useQuery<CatalogData>(GET_CATALOG_DATA);

  // Fallback Logic
  const products = useMemo(() => {
    if (data?.getProducts && data.getProducts.length > 0) {
      return data.getProducts;
    }
    // Fallback to static data if CMS is empty or failing
    return (productsData as any[]).map(p => ({
      productId: p.id,
      productName: p.name,
      productPrice: typeof p.price === 'string' ? parseFloat(p.price.replace(/[₱,]/g, "")) : p.price,
      imageUrl: p.image,
      productDescription: p.description || "",
      category: { categoryName: p.category },
      categoryId: p.category // Using string category names as IDs for fallback
    }));
  }, [data]);

  const categories = useMemo(() => {
    if (data?.getCategories && data.getCategories.length > 0) {
      return data.getCategories;
    }
    // Derive unique categories from fallback data
    const uniqueNames = Array.from(new Set(productsData.map(p => p.category)));
    return uniqueNames.map((name, i) => ({
      categoryId: name,
      categoryName: name,
      slug: name.toLowerCase()
    }));
  }, [data]);

  // Deep Linking Effect
  useEffect(() => {
    // Handle Category Deep Linking
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.length > 0) {
      const foundCategory = categories.find((c: any) => 
        c.slug === categoryParam.toLowerCase() || 
        c.categoryName.toLowerCase() === categoryParam.toLowerCase()
      );
      if (foundCategory) {
        setSelectedCategoryId(foundCategory.categoryId);
      }
    }

    // Handle Product Deep Linking
    if (products.length > 0) {
      const productId = searchParams.get("productId");
      if (productId) {
        const product = products.find((p: any) => p.productId.toString() === productId);
        if (product) {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }
      }
    }
  }, [products, categories, searchParams]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm) {
      result = result.filter((p: any) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (selectedCategoryId !== null) {
      result = result.filter((p: any) => p.categoryId === selectedCategoryId);
    }

    // Sort
    if (sortBy === "Price: Low → High") {
      result.sort((a: any, b: any) => a.productPrice - b.productPrice);
    } else if (sortBy === "Price: High → Low") {
      result.sort((a: any, b: any) => b.productPrice - a.productPrice);
    } else if (sortBy === "Best Rated") {
      result.sort((a: any, b: any) => (b.productId % 5) - (a.productId % 5));
    }

    return result;
  }, [products, searchTerm, selectedCategoryId, sortBy]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <Header forceTheme="A" />
      
      <CatalogHeader 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        productCount={filteredProducts.length}
      />

      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col gap-10">
          {/* Controls */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <FilterPanel 
                categories={categories} 
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={setSelectedCategoryId}
              />
            </div>

            <ViewToggle 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              priceType={priceType}
              onPriceTypeChange={setPriceType}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Product Listing */}
          <div className="min-h-[400px]">
            {loading && !products.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col gap-4">
                    <div className="aspect-square bg-neutral-100 rounded-[32px]" />
                    <div className="h-4 bg-neutral-100 rounded w-1/2" />
                    <div className="h-6 bg-neutral-100 rounded w-3/4" />
                    <div className="h-4 bg-neutral-100 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {viewMode === "grid" ? (
                    <ProductGrid 
                      products={filteredProducts} 
                      onProductClick={handleProductClick} 
                    />
                  ) : (
                    <ProductList 
                      products={filteredProducts} 
                      onProductClick={handleProductClick} 
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">No products found</h3>
                <p className="text-neutral-400">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                   onClick={() => {setSearchTerm(""); setSelectedCategoryId(null);}}
                   className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default CatalogContainer;
