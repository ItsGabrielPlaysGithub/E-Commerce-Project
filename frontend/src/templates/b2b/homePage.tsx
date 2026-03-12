"use client";

import { HeroCarousel } from "../../components/b2b/dashboard/HeroCarousel";
import { FeatureStrip } from "../../components/b2b/dashboard/FeatureStrip";
import { OrderTypesSection } from "../../components/b2b/dashboard/OrderTypesSection";
import { StatsSection } from "../../components/b2b/dashboard/StatsSection";
import { CategoryShowcase } from "../../components/b2b/dashboard/CategoryShowcase";
import { FeaturedProducts } from "../../components/b2b/dashboard/FeaturedProducts";
import { Testimonials } from "../../components/b2b/dashboard/Testimonials";
import { PromoBanners } from "../../components/b2b/dashboard/PromoBanners";
import { InquiryCTA } from "../../components/b2b/dashboard/InquiryCTA";

export function HomePage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeroCarousel />
      <FeatureStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <StatsSection />
      <OrderTypesSection />
      <Testimonials />
      <PromoBanners />
      <InquiryCTA />
    </div>
  );
}
