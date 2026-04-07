import Header from "@/features/public/components/layout/Header";
import Footer from "@/features/public/components/layout/Footer";
import HeroSectionToggle from "@/features/public/components/sections/HeroSectionToggle";
import CategoryStrip from "@/features/public/components/sections/CategoryStrip";
import ProductCatalog from "@/features/public/components/sections/ProductsCatalog";
import CategoryCarouselSection from "@/features/public/components/sections/CategoryCarouselSection";
import ReviewsSection from "@/features/public/components/sections/ReviewSection";
import AboutUsSection from "@/features/public/components/sections/AboutUsSection";
import SocialsSection from "@/features/public/components/sections/SocialsSection";
import OmegaStories from "@/features/public/components/sections/OmegaStories";
import ContactSection from "@/features/public/components/sections/ContactSection";

// Data Imports
import { heroData } from "@/data/heroData";
import { categoriesData } from "@/data/categoriesData";
import { productsData } from "@/data/products";
import { categoryHighlightsData, socialAccountsData } from "@/data/socialsData";
import { blogsData } from "@/data/blogsData";
import { reviewsData } from "@/data/reviewsData";
export default function Home() {

  return (
    <div className="flex flex-col w-full bg-white">
      <Header />
      <HeroSectionToggle data={heroData} />
      <CategoryStrip categories={categoriesData} />
      <ProductCatalog products={productsData} />
      
      {categoryHighlightsData.map((highlight) => (
        <CategoryCarouselSection 
          key={highlight.categoryId}
          id={highlight.categoryId}
          title={highlight.title}
          subtitle={highlight.subtitle}
          items={highlight.items}
          bgColor={highlight.bgColor}
        />
      ))}

      <OmegaStories stories={blogsData} />
      <ReviewsSection reviews={reviewsData} />
      <SocialsSection data={socialAccountsData} />
      <AboutUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}