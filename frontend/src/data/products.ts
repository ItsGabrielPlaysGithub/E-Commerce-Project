export interface Product {
  id: string | number;
  name: string;
  price: number;
  retailPrice: number;
  image?: string;
  imageUrl?: string;
  category: string;
  rating: number;
  description?: string;
}

export interface ProductCard {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
  color: string;
  role?: string;
  company?: string;
  date?: string;
}

// Featured products for homepage display
// Note: In production, these should come from the backend GraphQL API
// This is only for static homepage sections
export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Ceramic Tiles",
    price: 4500,
    retailPrice: 4500,
    category: "Ceramics",
    image: "/placeholder-product.jpg",
    rating: 4.8,
    description: "High-quality ceramic tiles for commercial use",
  },
  {
    id: "p2",
    name: "Industrial Grade Paint",
    price: 2800,
    retailPrice: 2800,
    category: "Paint",
    image: "/placeholder-product.jpg",
    rating: 4.6,
    description: "Durable industrial paint for various applications",
  },
  {
    id: "p3",
    name: "Steel Frame Structure",
    price: 8900,
    retailPrice: 8900,
    category: "Steel",
    image: "/placeholder-product.jpg",
    rating: 4.9,
    description: "Heavy-duty steel frame for construction",
  },
  {
    id: "p4",
    name: "Vinyl Flooring Roll",
    price: 3200,
    retailPrice: 3200,
    category: "Flooring",
    image: "/placeholder-product.jpg",
    rating: 4.7,
    description: "Commercial-grade vinyl flooring",
  },
  {
    id: "p5",
    name: "Electrical Wire Coil",
    price: 1500,
    retailPrice: 1500,
    category: "Electrical",
    image: "/placeholder-product.jpg",
    rating: 4.5,
    description: "Copper wire for electrical installations",
  },
  {
    id: "p6",
    name: "Plumbing Fixtures Set",
    price: 5600,
    retailPrice: 5600,
    category: "Plumbing",
    image: "/placeholder-product.jpg",
    rating: 4.8,
    description: "Complete plumbing fixtures package",
  },
  {
    id: "p7",
    name: "Glass Panels",
    price: 3800,
    retailPrice: 3800,
    category: "Glass",
    image: "/placeholder-product.jpg",
    rating: 4.6,
    description: "Tempered glass panels for commercial use",
  },
  {
    id: "p8",
    name: "Insulation Material",
    price: 2200,
    retailPrice: 2200,
    category: "Insulation",
    image: "/placeholder-product.jpg",
    rating: 4.7,
    description: "Thermal and acoustic insulation material",
  },
];

// Reviews for testimonials section
export const reviews: Review[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    comment:
      "Excellent quality products and outstanding customer service. The bulk pricing has helped us save significantly on our construction projects.",
    rating: 5,
    avatar: "A",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Fatima Al-Mazrouei",
    comment:
      "Reliable supplier for all our interior design needs. Fast delivery and consistent quality make them our preferred B2B partner.",
    rating: 5,
    avatar: "F",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "Mohamed Al-Mansouri",
    comment:
      "Great selection of materials and competitive pricing. Their team is very responsive and helpful in selecting the right products.",
    rating: 4,
    avatar: "M",
    color: "#FFE66D",
  },
  {
    id: "4",
    name: "Layla Abdullah",
    comment:
      "We've been ordering from them for 2 years. Consistency, quality, and professionalism across all our transactions. Highly recommended!",
    rating: 5,
    avatar: "L",
    color: "#95E1D3",
  },
  {
    id: "5",
    name: "Khalid bin Ahmed",
    comment:
      "Perfect for our bulk orders. The ordering process is smooth and the products always meet our specifications.",
    rating: 5,
    avatar: "K",
    color: "#F38181",
  },
  {
    id: "6",
    name: "Noor Al-Kaabi",
    comment:
      "Very satisfied with the quality and the wholesale pricing options. They understand the unique needs of businesses like ours.",
    rating: 4,
    avatar: "N",
    color: "#AA96DA",
  },
];

export const productsData: ProductCard[] = [
  { id: 1, name: "Premium Chef Pan", price: "₱12,50", image: "/assets/Classic Chef Pan.png", category: "Kitchenware" },
  { id: 2, name: "Ceramic Dish Set", price: "₱3,200", image: "/assets/dishes.png", category: "Dinnerware" },
  { id: 3, name: "Essential Knife Set", price: "₱4,500", image: "/assets/Essential Knife Set.png", category: "Kitchenware" },
  { id: 4, name: "Professional Bakeware", price: "₱2,100", image: "/assets/bakeware.png", category: "Kitchenware" },
  { id: 5, name: "Enamel Dutch Oven", price: "₱2,450", image: "/assets/Enamel Dutch Oven.png", category: "Kitchenware" },
  { id: 6, name: "Glass Casserole", price: "₱1,899", image: "/assets/glass.png", category: "Glassware" },
  { id: 7, name: "Classic Tumbler", price: "₱850", image: "/assets/glass.png", category: "Glassware" },
  { id: 8, name: "Vacuum Flask", price: "₱1,200", image: "/assets/thermos.png", category: "Vacuum Flask" },
];