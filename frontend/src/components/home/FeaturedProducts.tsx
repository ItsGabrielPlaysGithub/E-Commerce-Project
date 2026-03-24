"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { GetProductsDocument } from "../../gql/graphql";
import { ProductCard } from "../cards/ProductCard";
import { Product } from "../../data/products";

export function FeaturedProducts() {
  const { data, loading } = useQuery(GetProductsDocument);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.getProducts) {
      // Transform GraphQL products to match Product interface
      const transformedProducts: Product[] = data.getProducts.slice(0, 8).map((gqlProduct: any) => ({
        id: gqlProduct.productId,
        name: gqlProduct.productName || "Unknown Product",
        price: gqlProduct.productPrice || 0,
        retailPrice: gqlProduct.productPrice || 0,
        image: gqlProduct.imageUrl,
        imageUrl: gqlProduct.imageUrl,
        category: gqlProduct.category?.categoryName || "Uncategorized",
        rating: 4.5, // Default rating since not available in GraphQL
        description: gqlProduct.productDescription || "",
      }));
      setProducts(transformedProducts);
    }
  }, [data]);

  if (loading) {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-10"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
              Featured
            </span>
            <h2
              className="mt-1 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
            >
              Top-Selling Products
            </h2>
          </div>
          <Link
            href="/b2b/products/all"
            className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
            style={{ color: "#bf262f" }}
          >
            Shop All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/b2b/products/all"
            className="inline-flex items-center gap-2 text-white px-9 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-red-100 hover:-translate-y-0.5"
            style={{ backgroundColor: "#bf262f" }}
          >
            View Full Products <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
