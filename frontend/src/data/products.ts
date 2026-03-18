export type Product = {
  id: string;
  name: string;
  price: number;
  retailPrice: number;
  wholesalePrice: number;
  bulkPrice: number;
  minWholesale: number;
  minBulk: number;
  image: string;
  category: string;
  rating: number;
  badge?: string;
  specs?: string[];
  description?: string;
  reviews?: number;
};

export type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Elizabeth Ceramic Casserole",
    price: 2499,
    retailPrice: 2499,
    wholesalePrice: 1999,
    bulkPrice: 1599,
    minWholesale: 10,
    minBulk: 50,
    image:
      "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.9,
    badge: "Premium",
    reviews: 127,
    specs: [
      "Ceramic nonstick coating",
      "Glass lid included",
      "Oven-safe up to 500°F",
      "Induction compatible",
    ],
    description:
      "Premium ceramic casserole with superior heat distribution. Perfect for family dinners and restaurant use.",
  },
  {
    id: "p2",
    name: "Classic Stock Pot",
    price: 1899,
    retailPrice: 1899,
    wholesalePrice: 1499,
    bulkPrice: 1199,
    minWholesale: 10,
    minBulk: 50,
    image:
      "https://images.unsplash.com/photo-1762922425155-d03e6997e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.8,
    badge: "Best Seller",
    reviews: 245,
    specs: [
      "Stainless steel construction",
      "20-liter capacity",
      "Heavy-bottomed for even heating",
      "Professional-grade handles",
    ],
    description:
      "Durable stock pot ideal for bulk cooking and catering. Trusted by professional chefs worldwide.",
  },
  {
    id: "p3",
    name: "Marble Bake Set",
    price: 1599,
    retailPrice: 1599,
    wholesalePrice: 1299,
    bulkPrice: 999,
    minWholesale: 10,
    minBulk: 50,
    image:
      "https://images.unsplash.com/photo-1646940930570-35ffcaedfd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Bakeware",
    rating: 4.7,
    reviews: 89,
    specs: [
      "Set of 3 baking trays",
      "Marble stone surface",
      "Non-stick coating",
      "Easy to clean",
    ],
    description:
      "Professional baking set with elegant marble design. Perfect for bakeries and pastry shops.",
  },
  {
    id: "p4",
    name: "Crystal Water Glass",
    price: 799,
    retailPrice: 799,
    wholesalePrice: 599,
    bulkPrice: 499,
    minWholesale: 20,
    minBulk: 100,
    image:
      "https://images.unsplash.com/photo-1575624848988-154eddea5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Glassware",
    rating: 4.8,
    reviews: 156,
    specs: [
      "Premium crystal glass",
      "350ml capacity per glass",
      "Set of 6 glasses",
      "Dishwasher safe",
    ],
    description:
      "Elegant crystal water glasses perfect for hotels, restaurants, and upscale events.",
  },
  {
    id: "p5",
    name: "Table Dinner Set",
    price: 2199,
    retailPrice: 2199,
    wholesalePrice: 1799,
    bulkPrice: 1399,
    minWholesale: 10,
    minBulk: 50,
    image:
      "https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Dinnerware",
    rating: 4.9,
    badge: "Luxury",
    reviews: 203,
    specs: [
      "Porcelain dinnerware set",
      "Service for 12",
      "Microwave and oven-safe",
      "Premium gold trim",
    ],
    description:
      "Exquisite dinner set crafted from premium porcelain. Ideal for fine dining establishments.",
  },
  {
    id: "p6",
    name: "Steel Vacuum Flask",
    price: 999,
    retailPrice: 999,
    wholesalePrice: 799,
    bulkPrice: 599,
    minWholesale: 15,
    minBulk: 75,
    image:
      "https://images.unsplash.com/photo-1712007600937-3814b7f6822e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Vacuum Flask",
    rating: 4.6,
    reviews: 178,
    specs: [
      "Double-wall vacuum insulation",
      "2-liter capacity",
      "Keeps hot for 12+ hours",
      "Stainless steel body",
    ],
    description:
      "Professional-grade vacuum flask for keeping beverages at ideal temperature. Perfect for catering.",
  },
  {
    id: "p7",
    name: "Hydration Bottle Set",
    price: 699,
    retailPrice: 699,
    wholesalePrice: 549,
    bulkPrice: 449,
    minWholesale: 20,
    minBulk: 100,
    image:
      "https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Hydration",
    rating: 4.7,
    reviews: 312,
    specs: [
      "Set of 4 bottles",
      "1-liter capacity each",
      "BPA-free materials",
      "Lightweight and durable",
    ],
    description:
      "Eco-friendly hydration bottles perfect for events, offices, and promotional giveaways.",
  },
  {
    id: "p8",
    name: "Chef Utility Pan",
    price: 1399,
    retailPrice: 1399,
    wholesalePrice: 1099,
    bulkPrice: 899,
    minWholesale: 10,
    minBulk: 50,
    image:
      "https://images.unsplash.com/photo-1623093155101-95ba462655eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.8,
    badge: "Chef Choice",
    reviews: 221,
    specs: [
      "Multi-functional design",
      "Non-stick coating",
      "15-inch diameter",
      "Professional kitchen rated",
    ],
    description:
      "Versatile utility pan favored by professional chefs. Ideal for sautéing, frying, and simmering.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Angela C.",
    role: "Procurement Lead",
    company: "Nourish Restaurant Group",
    comment:
      "Omega's pricing and delivery speed helped us scale to three branches without stock-outs.",
    rating: 5,
    date: "2 days ago",
    avatar: "A",
    color: "#bf262f",
  },
  {
    id: "r2",
    name: "Mark V.",
    role: "Owner",
    company: "Haven Home Store",
    comment:
      "The wholesale onboarding was fast, and inventory updates are always accurate.",
    rating: 5,
    date: "1 week ago",
    avatar: "M",
    color: "#8f1d23",
  },
  {
    id: "r3",
    name: "Sarah T.",
    role: "Operations Manager",
    company: "Daily Brew Co.",
    comment:
      "Bulk ordering is smooth and customer support is responsive whenever we need help.",
    rating: 4,
    date: "2 weeks ago",
    avatar: "S",
    color: "#73171c",
  },
];
