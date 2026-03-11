"use client";

import { HeroCarousel } from "./components/HeroCarousel";
import { FeatureStrip } from "./components/FeatureStrip";
import { OrderTypesSection } from "./components/OrderTypesSection";
import { StatsSection } from "./components/StatsSection";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Testimonials } from "./components/Testimonials";
import { PromoBanners } from "./components/PromoBanners";
import { InquiryCTA } from "./components/InquiryCTA";

export function HomePage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeroCarousel />
      <FeatureStrip />
      <OrderTypesSection />
      <StatsSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <Testimonials />
      <PromoBanners />
      <InquiryCTA />
    </div>
  );
}
