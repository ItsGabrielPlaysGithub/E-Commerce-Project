"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products, type Product } from "../../../data/products";
import {
  getProductPrice,
  type ProductPriceType,
} from "../../../data/pricing";

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
}

const ProductsPageContext = createContext<ProductsPageContextValue | null>(null);

export function ProductsPageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [sort, setSort] = useState<SortMode>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [priceType, setPriceType] = useState<ProductPriceType>("retail");

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

  const setSearchValue = (value: string) => {
    const nextParams = new URLSearchParams(params?.toString());
    if (value) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }
    router.push(`?${nextParams.toString()}`);
  };

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
  }, [activeCategory, priceType, search, sort]);

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
      setSort,
      setViewMode,
      setPriceType,
    }),
    [activeCategory, filteredProducts, priceType, search, sort, viewMode],
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
