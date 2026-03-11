export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
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
    image:
      "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.9,
  },
  {
    id: "p2",
    name: "Classic Stock Pot",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1762922425155-d03e6997e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.8,
  },
  {
    id: "p3",
    name: "Marble Bake Set",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1646940930570-35ffcaedfd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Bakeware",
    rating: 4.7,
  },
  {
    id: "p4",
    name: "Crystal Water Glass",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1575624848988-154eddea5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Glassware",
    rating: 4.8,
  },
  {
    id: "p5",
    name: "Table Dinner Set",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Dinnerware",
    rating: 4.9,
  },
  {
    id: "p6",
    name: "Steel Vacuum Flask",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1712007600937-3814b7f6822e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Vacuum Flask",
    rating: 4.6,
  },
  {
    id: "p7",
    name: "Hydration Bottle Set",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Hydration",
    rating: 4.7,
  },
  {
    id: "p8",
    name: "Chef Utility Pan",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1623093155101-95ba462655eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Cookware",
    rating: 4.8,
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
