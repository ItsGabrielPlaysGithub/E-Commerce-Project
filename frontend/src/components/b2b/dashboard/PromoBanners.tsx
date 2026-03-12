import Link from "next/link";
import { promoBanners } from "../../../data/homeData";

export function PromoBanners() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {promoBanners.map((banner) => (
          <Link
            key={banner.label}
            href={banner.path}
            className="relative rounded-2xl overflow-hidden group"
            style={{ minHeight: "220px" }}
          >
            <img
              src={banner.image}
              alt={banner.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
            <div className="relative p-6 flex flex-col h-full justify-end min-h-[220px]">
              <h3 className="text-white font-bold">{banner.label}</h3>
              <p className="text-white/70 text-sm mt-1">{banner.sub}</p>
              <span
                className="mt-4 self-start text-white text-xs px-4 py-2 rounded-full font-semibold"
                style={{ backgroundColor: "#bf262f" }}
              >
                SHOP NOW
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
