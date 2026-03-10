import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { orderTypes } from "../data/homeData";

export function OrderTypesSection() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
            Order Programs
          </span>
          <h2
            className="mt-2 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
          >
            Tailored for Every Business Size
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you're a small retailer, a growing distributor, or an enterprise buyer — Omega has a pricing program designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orderTypes.map(({ icon: Icon, title, subtitle, desc, highlight, cta, path, color, featured }) => (
            <div
              key={title}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                featured ? "border-red-200 shadow-lg" : "border-gray-100 shadow-sm"
              }`}
              style={{ backgroundColor: "#fff" }}
            >
              {featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs px-4 py-1 rounded-full font-semibold tracking-wide"
                  style={{ backgroundColor: "#bf262f" }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#f9e9ea" }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
                {highlight}
              </div>
              <h3
                className="text-gray-900 text-xl mb-1"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {title}
              </h3>
              <div className="text-gray-400 text-xs mb-3">{subtitle}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
              <Link
                href={path}
                className="flex items-center gap-1.5 font-semibold text-sm transition-all hover:gap-3"
                style={{ color }}
              >
                {cta} <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
