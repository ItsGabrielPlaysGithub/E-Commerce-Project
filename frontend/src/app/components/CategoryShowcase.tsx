import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "../data/homeData";

export function CategoryShowcase() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
              Browse
            </span>
            <h2
              className="mt-1 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
            >
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
            style={{ color: "#bf262f" }}
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="font-semibold text-sm">{cat.name}</div>
                <div className="text-white/70 text-xs">{cat.count} items</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
