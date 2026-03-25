import {
  Truck, Package, CreditCard, Headphones,
  ShieldCheck, Users, TrendingUp,
} from "lucide-react";

export const heroSlides = [
  {
    cta: "Shop Now",
    ctaPath: "../../b2b/products",
    secondaryPath: "/b2b/inquiry",
    image: "/images/OMEGA_BAU_3-_WEB_1365x601.webp",
    imageMobile: "/images/OMEGA_-_BAU_3_1082x1081.webp",
    imageDesktop: "/images/OMEGA_BAU_3-_WEB_1365x601.webp",
  },
];

export const features = [
  { icon: Truck,      title: "Same Day Delivery",  desc: "Within Metro Manila. Order before 2PM" },
  { icon: Package,    title: "Bulk Orders",         desc: "Send us a message for a quotation."         },
  { icon: CreditCard, title: "Cash on Delivery",    desc: "Available Nationwide."                     },
  { icon: Headphones, title: "Customer Service",    desc: "inquiry@omegahouseware.com.ph"             },
];

export const categories = [
  { name: "Bakeware",     image: "https://images.unsplash.com/photo-1646940930570-35ffcaedfd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 24 },
  { name: "Cookware",     image: "https://images.unsplash.com/photo-1762922425155-d03e6997e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 31 },
  { name: "Dinnerware",   image: "https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 18 },
  { name: "Glassware",    image: "https://images.unsplash.com/photo-1575624848988-154eddea5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 22 },
  { name: "Hydration",    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 15 },
  { name: "Vacuum Flask", image: "https://images.unsplash.com/photo-1712007600937-3814b7f6822e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: 12 },
];

export const stats = [
  { value: "500+",   label: "Products Available"   },
  { value: "1,200+", label: "Active B2B Partners"  },
  { value: "30%",    label: "Max Bulk Savings"     },
  { value: "24h",    label: "Support Response Time"},
];

export const sapFeatures = [
  "Real-time inventory sync from SAP MM",
  "Automated e-invoicing via SAP FI",
  "Sales order tracking (SAP SD)",
  "AR aging & financial analytics (FICO)",
  "Customer master integration (SAP BP)",
  "OData API — SAP S/4HANA ready",
];

export const orderTypes = [
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
];

export const promoBanners = [
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
];
