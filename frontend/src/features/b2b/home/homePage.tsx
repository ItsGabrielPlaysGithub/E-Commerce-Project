"use client";

import { HeroCarousel } from "../../../components/home/HeroCarousel";
import { FeatureStrip } from "../../../components/home/FeatureStrip";
import { OrderTypesSection } from "../../../components/home/OrderTypesSection";
import { StatsSection } from "../../../components/home/StatsSection";
import { CategoryShowcase } from "../../../components/home/CategoryShowcase";
import { FeaturedProducts } from "../../../components/home/FeaturedProducts";
import { Testimonials } from "../../../components/home/Testimonials";
import { PromoBanners } from "../../../components/home/PromoBanners";
import { InquiryCTA } from "../../../components/home/InquiryCTA";

export function HomePage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeroCarousel />
      <FeatureStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <StatsSection />
      {/* <OrderTypesSection /> */}
      <Testimonials />
      <PromoBanners />
      <InquiryCTA />
    </div>
  );
}

export default HomePage;
