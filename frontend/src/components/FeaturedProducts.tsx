import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./cards/ProductCard";
import { products } from "../data/products";

export function FeaturedProducts() {
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
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
            style={{ color: "#bf262f" }}
          >
            Shop All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/b2b/products"
            className="inline-flex items-center gap-2 text-white px-9 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-red-100 hover:-translate-y-0.5"
            style={{ backgroundColor: "#bf262f" }}
          >
            View Full Catalog <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
