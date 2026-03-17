"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "../hooks/use-products";
import type { Product } from "../../../../data/products";
import {
  getProductPrice,
  type ProductPriceType,
} from "../../../../data/pricing";

type ViewMode = "grid" | "list";
type SortMode = "featured" | "price-asc" | "price-desc" | "rating";

interface ProductsPageContextValue {
  activeCategory: string;
  search: string;
  sort: SortMode;
  viewMode: ViewMode;
  priceType: ProductPriceType;
  filteredProducts: Product[];
  setCategory: (category: string) => void;
  setSearch: (value: string) => void;
  setSort: (value: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setPriceType: (type: ProductPriceType) => void;
  loading: boolean;
  error: string | null;
}

const ProductsPageContext = createContext<ProductsPageContextValue | null>(null);

export function ProductsPageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [sort, setSort] = useState<SortMode>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [priceType, setPriceType] = useState<ProductPriceType>("retail");

  // Fetch products from GraphQL
  const { data, loading, error } = useProducts();

  const activeCategory = params?.get("category") || "All";
  const search = params?.get("q") || "";

  const setCategory = (category: string) => {
    const nextParams = new URLSearchParams(params?.toString());
    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }
    router.push(`?${nextParams.toString()}`);
  };

  const setSortValue = (value: string) => {
    setSort(value as SortMode);
  };

  const setViewModeValue = (value: string) => {
    setViewMode(value as ViewMode);
  };

  const setSearchValue = (value: string) => {
    const nextParams = new URLSearchParams(params?.toString());
    if (value) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }
    router.push(`?${nextParams.toString()}`);
  };

  const setPriceTypeValue = (type: ProductPriceType) => {
    setPriceType(type);
  };

  // Transform GraphQL data to Product format
  const products: Product[] = useMemo(() => {
    if (!data?.getProducts) return [];
    return data.getProducts.map((product) => {
      const basePrice = product.productPrice || 0;
      return {
        id: product.productId.toString(),
        name: product.productName,
        price: Math.round(basePrice),
        retailPrice: Math.round(basePrice),
        wholesalePrice: Math.round(basePrice * 0.92),
        bulkPrice: Math.round(basePrice * 0.84),
        minWholesale: 10,
        minBulk: 50,
        image:
          "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        category: product.category || "Uncategorized",
        rating: 4.5,
      };
    });
  }, [data]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "All") {
      list = list.filter((product) => product.category === activeCategory);
    }

    if (search) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort === "price-asc") {
      return list.sort(
        (a, b) => getProductPrice(a, priceType) - getProductPrice(b, priceType),
      );
    }

    if (sort === "price-desc") {
      return list.sort(
        (a, b) => getProductPrice(b, priceType) - getProductPrice(a, priceType),
      );
    }

    if (sort === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, priceType, search, sort, products]);

  const value = useMemo(
    () => ({
      activeCategory,
      search,
      sort,
      viewMode,
      priceType,
      filteredProducts,
      setCategory,
      setSearch: setSearchValue,
      setSort: setSortValue,
      setViewMode: setViewModeValue,
      setPriceType: setPriceTypeValue,
      loading,
      error: error?.message || null,
    }),
    [activeCategory, filteredProducts, priceType, search, sort, viewMode, loading, error],
  );

  return (
    <ProductsPageContext.Provider value={value}>
      {children}
    </ProductsPageContext.Provider>
  );
}

export function useProductsPage() {
  const context = useContext(ProductsPageContext);

  if (!context) {
    throw new Error("useProductsPage must be used within ProductsPageProvider");
  }

  return context;
}
