"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Truck, Package, CreditCard, Headphones,
  Star, ArrowRight, ShieldCheck, Users, TrendingUp,
  Quote, ChevronRight, BarChart3, CheckCircle,
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, reviews } from "../data/products";

const heroSlides = [
  {
    tag: "B2B Exclusive",
    headline: "Your All-Around Partner for Amazing Business",
    sub: "Premium houseware solutions for retail resellers, wholesalers, and bulk buyers across the Philippines.",
    cta: "Shop Now",
    ctaPath: "/products",
    secondary: "Make Inquiry",
    secondaryPath: "/inquiry",
    image: "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    accent: "Elizabeth Ceramic Casserole — ₱2,499",
    badge: "FREE SHIPPING · Min. Spend ₱1,299",
  },
  {
    tag: "Wholesale Ready",
    headline: "Scale Your Business with Omega Wholesale",
    sub: "Exclusive tiered pricing for registered wholesale partners with MOQ as low as 12 units.",
    cta: "View Wholesale",
    ctaPath: "/wholesale",
    secondary: "Bulk Orders",
    secondaryPath: "/bulk-order",
    image: "https://images.unsplash.com/photo-1769698631158-c1f42e6281cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    accent: "Save up to 35% vs. retail pricing",
    badge: "WHOLESALE · From 12 Units",
  },
  {
    tag: "SAP Integrated",
    headline: "Enterprise-Grade B2B with SAP S/4HANA",
    sub: "Real-time inventory, automated invoicing, and financial analytics — all powered by SAP.",
    cta: "SAP Portal",
    ctaPath: "/sap-portal",
    secondary: "Learn More",
    secondaryPath: "/inquiry",
    image: "https://images.unsplash.com/photo-1762922425155-d03e6997e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    accent: "Live inventory sync · Instant e-invoices",
    badge: "SAP S/4HANA · CONNECTED",
  },
];

const features = [
  { icon: Truck,      title: "Same Day Delivery",  desc: "Within Metro Manila. Order cutoff at 2PM." },
  { icon: Package,    title: "Bulk Orders",         desc: "Send us a message for a quotation."         },
  { icon: CreditCard, title: "Cash on Delivery",    desc: "Available Nationwide."                     },
  { icon: Headphones, title: "Customer Service",    desc: "inquiry@omegahouseware.com.ph"             },
];

const categories = [
  { name: "Bakeware",     image: "https://images.unsplash.com/photo-1646940930570-35ffcaedfd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 24 },
  { name: "Cookware",     image: "https://images.unsplash.com/photo-1762922425155-d03e6997e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 31 },
  { name: "Dinnerware",   image: "https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 18 },
  { name: "Glassware",    image: "https://images.unsplash.com/photo-1575624848988-154eddea5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 22 },
  { name: "Hydration",    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 15 },
  { name: "Vacuum Flask", image: "https://images.unsplash.com/photo-1712007600937-3814b7f6822e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 12 },
];

const stats = [
  { value: "500+",   label: "Products Available"   },
  { value: "1,200+", label: "Active B2B Partners"  },
  { value: "35%",    label: "Max Bulk Savings"     },
  { value: "24h",    label: "Support Response Time"},
];

const sapFeatures = [
  "Real-time inventory sync from SAP MM",
  "Automated e-invoicing via SAP FI",
  "Sales order tracking (SAP SD)",
  "AR aging & financial analytics (FICO)",
  "Customer master integration (SAP BP)",
  "OData API — SAP S/4HANA ready",
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "580px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/80 to-white/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-[580px]">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: "#f9e9ea", color: "#bf262f" }}
            >
              {slide.tag}
            </span>
            <h1
              className="mt-5 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              {slide.headline}
            </h1>
            <p className="mt-4 text-gray-600" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
              {slide.sub}
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                href={slide.ctaPath}
                className="flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-red-100 hover:shadow-red-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "#bf262f" }}
              >
                {slide.cta} <ArrowRight size={16} />
              </Link>
              <Link
                href={slide.secondaryPath}
                className="flex items-center gap-2 border-2 border-gray-800 text-gray-800 px-7 py-3.5 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-colors"
              >
                {slide.secondary}
              </Link>
            </div>
            <p className="mt-5 text-sm text-gray-400 flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#bf262f" }}
              />
              {slide.accent}
            </p>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeSlide ? "28px" : "8px",
                height: "8px",
                backgroundColor: i === activeSlide ? "#bf262f" : "#d1d5db",
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <div
          className="absolute bottom-0 right-0 text-white px-7 py-4 text-sm font-semibold flex items-center gap-2.5"
          style={{ backgroundColor: "#bf262f" }}
        >
          <Truck size={18} />
          <div>
            <div className="font-bold tracking-wide">{slide.badge.split("·")[0].trim()}</div>
            <div className="text-red-200 text-xs">{slide.badge.split("·")[1]?.trim()}</div>
          </div>
        </div>
      </section>

      {/* ── Feature Strip ─────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: "#f9e9ea" }}>
                <Icon size={20} style={{ color: "#bf262f" }} />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── B2B Order Types ───────────────────────────────── */}
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
            {[
              {
                icon: ShieldCheck,
                title: "Retail",
                subtitle: "For Individual & Small Business",
                desc: "Browse and order at standard retail pricing. Perfect for personal use, small shops, and gift suppliers. No minimum order required.",
                highlight: "No MOQ",
                cta: "Shop Retail",
                path: "/retail",
                color: "#bf262f",
                featured: false,
              },
              {
                icon: Users,
                title: "Wholesale",
                subtitle: "For Distributors & Resellers",
                desc: "Unlock 20–28% savings on registered wholesale accounts. Access exclusive pricing tiers with MOQ starting at just 12 units.",
                highlight: "From 12 Units",
                cta: "Become a Partner",
                path: "/wholesale",
                color: "#8f1d23",
                featured: true,
              },
              {
                icon: TrendingUp,
                title: "Bulk Order",
                subtitle: "For Enterprises & Events",
                desc: "The best per-unit pricing for large volume orders. Ideal for corporate gifts, hotel procurement, and restaurant chains.",
                highlight: "Up to 35% Off",
                cta: "Get a Quote",
                path: "/bulk-order",
                color: "#73171c",
                featured: false,
              },
            ].map(({ icon: Icon, title, subtitle, desc, highlight, cta, path, color, featured }) => (
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

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: "#bf262f" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                className="text-4xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {value}
              </div>
              <div className="text-red-200 text-sm mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Showcase ──────────────────────────────── */}
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

      {/* ── Featured Products ─────────────────────────────── */}
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
              href="/products"
              className="inline-flex items-center gap-2 text-white px-9 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-red-100 hover:-translate-y-0.5"
              style={{ backgroundColor: "#bf262f" }}
            >
              View Full Catalog <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SAP Integration Highlight ─────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
                Technology
              </span>
              <h2
                className="mt-2 text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
              >
                Fully Integrated with SAP S/4HANA
              </h2>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Our B2B platform is directly connected to our SAP ERP system, giving you real-time visibility into inventory, instant invoicing, and complete financial transparency for every order you place.
              </p>
              <ul className="mt-6 space-y-3">
                {sapFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={16} style={{ color: "#bf262f", flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sap-portal"
                className="mt-8 inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
                style={{ backgroundColor: "#bf262f" }}
              >
                <BarChart3 size={16} />
                Access SAP Portal <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(135deg, #1a0608 0%, #5a1215 50%, #bf262f 100%)" }}
              >
                <div className="p-8">
                  {/* Mock SAP portal preview */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-300 text-xs font-medium">SAP System Connected · OHW_PRD</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Total Invoices",   value: "₱1.25M", color: "#fca5a5" },
                      { label: "Open Orders",       value: "5",      color: "#fcd34d" },
                      { label: "Inventory Items",   value: "12",     color: "#86efac" },
                      { label: "Collection Rate",   value: "71.5%",  color: "#93c5fd" },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className="rounded-xl p-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="text-xs text-gray-400">{label}</div>
                        <div
                          className="mt-1 font-bold"
                          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Recent Invoice</span>
                      <span className="text-xs px-2 py-0.5 rounded-full text-orange-300 bg-orange-900/30">Open</span>
                    </div>
                    <div className="text-white font-medium text-sm">9000010245</div>
                    <div className="text-gray-400 text-xs mt-0.5">Nourish Restaurant Group · ₱241,668</div>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20"
                style={{ backgroundColor: "#bf262f" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
              Testimonials
            </span>
            <h2
              className="mt-2 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
            >
              What Our B2B Partners Say
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>
              <span className="text-gray-800 font-bold">4.9</span>
              <span className="text-gray-400 text-sm">based on 1,240+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote size={26} style={{ color: "#f9e9ea" }} className="mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{review.comment}</p>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} fill={s <= review.rating ? "#f59e0b" : "none"} stroke={s <= review.rating ? "#f59e0b" : "#d1d5db"} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">
                      {review.role} · {review.company}
                    </div>
                  </div>
                  <div className="ml-auto text-gray-300 text-xs">{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banners ─────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              label: "COOK FROM THE HEART",
              sub: "Ang mamayang kusina ay isang mahal na regalo.",
              image: "https://images.unsplash.com/photo-1623093155101-95ba462655eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              path: "/products?category=Cookware",
            },
            {
              label: "EAT HAPPILY.",
              sub: "Dinnerware that turns every meal into a celebration.",
              image: "https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              path: "/products?category=Dinnerware",
            },
            {
              label: "DRINK REGULARLY.",
              sub: "Everyday beverage habit made better — Omega hydration.",
              image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              path: "/products?category=Hydration",
            },
          ].map((banner) => (
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

      {/* ── Inquiry CTA ───────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
            Get in Touch
          </span>
          <h2
            className="mt-2 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
          >
            Ready to Start Your B2B Journey?
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your business needs and one of our sales representatives will prepare a personalized quotation for you.
          </p>
          <div className="mt-9 flex gap-4 justify-center flex-wrap">
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 text-white px-9 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
              style={{ backgroundColor: "#bf262f" }}
            >
              Make an Inquiry <ArrowRight size={17} />
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 border-2 border-gray-800 text-gray-800 px-9 py-3.5 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-colors"
            >
              Wholesale Terms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
