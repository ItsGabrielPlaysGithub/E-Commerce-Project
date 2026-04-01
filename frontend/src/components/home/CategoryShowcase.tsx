"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { GetProductsDocument } from "../../gql/graphql";

interface Category {
  categoryId: number;
  categoryName: string;
  slug: string;
  productCount: number;
  image: string;
}

const resolveImageUrl = (src?: string): string => {
  if (!src) {
    return "/images/OMEGA_BAU_3-_WEB_1365x601.webp";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src
      .replace("http://localhost:4000", "")
      .replace("http://backend:4000", "");
  }

  if (src.startsWith("/")) {
    return src;
  }

  return `/${src}`;
};

export function CategoryShowcase() {
  const { data, loading } = useQuery(GetProductsDocument);
  const [categories, setCategories] = useState<Category[]>([]);

  // Normalize category name to URL format
  const getCategoryUrl = (categoryName: string) => {
    return `/b2b/products/category/${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
  };

  useEffect(() => {
    if (data?.getProducts) {
      // Group products by category and count them
      const categoryMap = new Map<number, { categoryName: string; slug: string; count: number; image: string }>();

      data.getProducts.forEach((product: any) => {
        if (product.category) {
          const catId = product.category.categoryId;
          if (!categoryMap.has(catId)) {
            categoryMap.set(catId, {
              categoryName: product.category.categoryName,
              slug: product.category.slug,
              count: 0,
              image: product.imageUrl || "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            });
          }
          const cat = categoryMap.get(catId)!;
          cat.count += 1;
          // Use first product's image if current category doesn't have one yet
          if (!cat.image && product.imageUrl) {
            cat.image = product.imageUrl;
          }
        }
      });

      // Convert map to array
      const formattedCategories: Category[] = Array.from(categoryMap.entries()).map(
        ([catId, cat]) => ({
          categoryId: catId,
          categoryName: cat.categoryName,
          slug: cat.slug,
          productCount: cat.count,
          image: cat.image,
        })
      );

      setCategories(formattedCategories.sort((a, b) => a.categoryName.localeCompare(b.categoryName)));
    }
  }, [data]);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="mt-1 text-gray-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.125rem",
                fontWeight: 700,
              }}
            >
              Shop by Category
            </h2>
          </div>
          <Link
            href="/b2b/products/all"
            className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
            style={{ color: "#bf262f" }}
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.categoryId}
              href={getCategoryUrl(cat.categoryName)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={resolveImageUrl(cat.image)}
                alt={cat.categoryName}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/OMEGA_BAU_3-_WEB_1365x601.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="font-semibold text-sm">{cat.categoryName}</div>
                <div className="text-white/70 text-xs">{cat.productCount} items</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
