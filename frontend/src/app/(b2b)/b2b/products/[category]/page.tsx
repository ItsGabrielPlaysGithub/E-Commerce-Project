"use client";

import { use } from "react";
import { Products } from "@/pages/b2b/productsPage";

interface ProductsPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function Page({ params }: ProductsPageProps) {
  const { category } = use(params);
  return <Products initialCategory={decodeURIComponent(category)} />;
}
