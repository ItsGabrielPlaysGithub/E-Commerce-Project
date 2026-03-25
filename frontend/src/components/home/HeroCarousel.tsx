"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { heroSlides } from "../../data/homeData";

export function HeroCarousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slide = heroSlides[0];
  const backgroundImage = isMobile ? slide.imageMobile : slide.imageDesktop;
  const bgImage = backgroundImage || slide.image;

  return (
    <Link href={slide.ctaPath}>
      <section
        className="relative overflow-hidden cursor-pointer"
        style={{ minHeight: isMobile ? "auto" : "580px" }}
      >
        {isMobile ? (
          <img
            src={bgImage}
            alt="Omega promotional banner"
            className="block w-full h-auto object-contain"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-[580px]"></div>
          </>
        )}
      </section>
    </Link>
  );
}
