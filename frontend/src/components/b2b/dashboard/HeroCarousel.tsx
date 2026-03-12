"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { heroSlides } from "../../../data/homeData";

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
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
  );
}
