"use client";

import { HeroCarousel } from "../../../components/b2b/home/HeroCarousel";
import { FeatureStrip } from "../../../components/b2b/home/FeatureStrip";
import { OrderTypesSection } from "../../../components/b2b/home/OrderTypesSection";
import { StatsSection } from "../../../components/b2b/home/StatsSection";
import { CategoryShowcase } from "../../../components/b2b/home/CategoryShowcase";
import { FeaturedProducts } from "../../../components/b2b/home/FeaturedProducts";
import { Testimonials } from "../../../components/b2b/home/Testimonials";
import { PromoBanners } from "../../../components/b2b/home/PromoBanners";
import { InquiryCTA } from "../../../components/b2b/home/InquiryCTA";

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

export default HomePage;
