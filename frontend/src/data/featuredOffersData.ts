
export interface FeaturedOfferCardData {
  id: string;
  socialMedia: {
    mediaType: "image" | "video";
    mediaUrl: string;
    title: string;
    hashtags: string[];
  };
  promo: {
    discountLabel: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
    link?: string;
  };
}

export const featuredOffersData: FeaturedOfferCardData[] = [
  {
    id: "offer-1",
    socialMedia: {
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      title: "Kitchen Upgrade Must-Have",
      hashtags: ["#OmegaKitchen", "#SmartLiving", "#ModernHome"],
    },
    promo: {
      discountLabel: "20% OFF",
    },
    product: {
      id: "p1",
      name: "Omega Premium Cookware Set",
      image: "/assets/products/fry-pan-1.png",
      link: "/catalog?productId=p1"
    },
  },
  {
    id: "offer-2",
    socialMedia: {
      mediaType: "video",
      mediaUrl: "/assets/hero/hero-video.mp4",
      title: "Sustainable Cooking Habits",
      hashtags: ["#EcoKitchen", "#OmegaOrganic"],
    },
    promo: {
      discountLabel: "15% OFF",
    },
    product: {
      id: "p2",
      name: "Eco-Friendly Storage Jars",
      image: "/assets/products/thermos-1.png",
      link: "/catalog?productId=p2"
    },
  },
  {
    id: "offer-3",
    socialMedia: {
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
      title: "Chef's Secret Tools",
      hashtags: ["#MasterChef", "#KitchenEssentials"],
    },
    promo: {
      discountLabel: "BUY 1 GET 1",
    },
    product: {
      id: "p3",
      name: "Professional Knife Collection",
      image: "/assets/products/knife-set.png",
      link: "/catalog?productId=p3"
    },
  },
];
