export type AffiliateSocialPost = {
  id: number;
  influencer: string;
  influencerLink: string;
  platform: "tiktok" | "instagram" | "facebook";
  productImage: string;
  videoUrl?: string; // Optional video embed URL
  avatar: string;
  likes: string;
  comments: string;
  shares: string;
  caption: string;

  // Affiliate Product Details
  productName: string;
  regularPrice: string;
  offerPrice?: string; // Optional discounted price
  affiliateLink: string;
};

export type SocialAccount = {
  platform: string;
  username: string;
  description: string;
  images: string[];
};

export type CategoryCarouselData = {
  categoryId: string;
  title: string;
  subtitle: string;
  bgColor: string;
  items: AffiliateSocialPost[];
};

export const socialPostsData: AffiliateSocialPost[] = [
  {
    id: 1,
    influencer: "@cookingwithsarah",
    influencerLink: "#",
    platform: "instagram",
    productImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=1",
    likes: "12k",
    comments: "450",
    shares: "2.1k",
    caption: "Look at this amazing build with Omega Houseware! Perfect for modern kitchens. #OmegaHome #KitchenDesign",
    productName: "Premium Chef Pan",
    regularPrice: "₱1,250",
    offerPrice: "₱1,150",
    affiliateLink: "/shop/chef-pan"
  },
  {
    id: 2,
    influencer: "@chef.markus",
    influencerLink: "#",
    platform: "tiktok",
    productImage: "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?q=80&w=600&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=2",
    likes: "8.5k",
    comments: "320",
    shares: "1.2k",
    caption: "Prepping dinner with my new Omega chef pan! Absolute game changer! 🍳🔥 #ChefLife",
    productName: "Enamel Dutch Oven",
    regularPrice: "₱2,450",
    affiliateLink: "/shop/dutch-oven"
  },
  {
    id: 3,
    influencer: "@homeaesthetics",
    influencerLink: "#",
    platform: "instagram",
    productImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=3",
    likes: "45k",
    comments: "1.2k",
    shares: "8.4k",
    caption: "The elegant new glassware collection from Omega. Simply stunning. ✨🍷",
    productName: "Classic Glassware",
    regularPrice: "₱1,200",
    offerPrice: "₱999",
    affiliateLink: "/shop/glassware"
  },
  {
    id: 4,
    influencer: "@dailybrew",
    influencerLink: "#",
    platform: "tiktok",
    productImage: "https://images.unsplash.com/photo-1584990347897-4a001ba0f749?q=80&w=600&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=4",
    likes: "22k",
    comments: "890",
    shares: "3.5k",
    caption: "Morning coffee routine just got an upgrade! ☕️ #CoffeeLover",
    productName: "Vacuum Flask",
    regularPrice: "₱850",
    affiliateLink: "/shop/vacuum-flask"
  }
];

export const socialAccountsData: SocialAccount[] = [
  {
    platform: "Instagram",
    username: "@omegahouseware",
    description: "Follow us for styling tips, kitchen aesthetics, and behind-the-scenes glimpses of our craftsmanship.",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584990347897-4a001ba0f749?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    platform: "TikTok",
    username: "@omegahouseware",
    description: "Catch our viral recipes, quick cleaning hacks, and fun kitchen moments with the Omega family.",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=400&auto=format&fit=crop"
    ]
  }
];

// Unified Array Mapping Highlights to their respective Categories
// This mirrors exactly how your CMS API will return the nested data!
export const categoryHighlightsData: CategoryCarouselData[] = [
  {
    categoryId: "glassware",
    title: "Glassware Highlights",
    subtitle: "Elegance in every sip",
    bgColor: "bg-[#FDFDFD]",
    items: [
      { id: 101, influencer: "@homeglass", influencerLink: "#", platform: "instagram", productImage: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2070&auto=format&fit=crop", videoUrl: "/assets/hero/hero3.mp4", avatar: "https://i.pravatar.cc/150?u=1", likes: "12K", comments: "102", shares: "3K", caption: "Crystal clear mornings with Omega's new tumbler collection....", productName: "Classic Tumbler", regularPrice: "₱850", offerPrice: "₱699", affiliateLink: "/shop/classic-tumbler" },
      { id: 102, influencer: "@coffee_time", influencerLink: "#", platform: "tiktok", productImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=2", likes: "45K", comments: "892", shares: "12K", caption: "Pour over perfection. My daily ritual. ☕", productName: "Glass Casserole", regularPrice: "₱1,899", affiliateLink: "/shop/glass-casserole" },
      { id: 103, influencer: "@interior_ph", influencerLink: "#", platform: "instagram", productImage: "https://images.unsplash.com/photo-1556911220-e15224bbaf40?q=80&w=2070&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=3", likes: "8K", comments: "56", shares: "200", caption: "Styling the kitchen shelves with these beauties.", productName: "Elegant Wine Glasses", regularPrice: "₱1,500", offerPrice: "₱1,200", affiliateLink: "/shop/wine-glasses" },
    ],
  },
  {
    categoryId: "kitchenware",
    title: "Kitchenware Highlights",
    subtitle: "For the heart of the home",
    bgColor: "bg-white",
    items: [
      { id: 201, influencer: "@chef_juan", influencerLink: "#", platform: "tiktok", productImage: "https://images.unsplash.com/photo-1556912177-f547c126989f?q=80&w=2070&auto=format&fit=crop", videoUrl: "/assets/hero/hero1.mp4", avatar: "https://i.pravatar.cc/150?u=4", likes: "55K", comments: "1.2K", shares: "8K", caption: "Slicing through prep time like butter! 🔪 #KitchenHacks", productName: "Essential Knife Set", regularPrice: "₱4,500", affiliateLink: "/shop/knife-set" },
      { id: 202, influencer: "@mommycooks", influencerLink: "#", platform: "instagram", productImage: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=2070&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=5", likes: "34K", comments: "450", shares: "2.1K", caption: "Sunday stews in my favorite Dutch Oven. The heat retention is...", productName: "Enamel Dutch Oven", regularPrice: "₱2,450", offerPrice: "₱1,999", affiliateLink: "/shop/dutch-oven" },
      { id: 203, influencer: "@wok_star", influencerLink: "#", platform: "tiktok", productImage: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2070&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=6", likes: "19K", comments: "210", shares: "900", caption: "Seasoning the new wok. Ready for some serious stir-fry.", productName: "Premium Chef Pan", regularPrice: "₱1,250", affiliateLink: "/shop/chef-pan" },
    ],
  },
  {
    categoryId: "dinnerware",
    title: "Dinnerware Highlights",
    subtitle: "Premium Dining Experience",
    bgColor: "bg-[#FDFDFD]",
    items: [
      { id: 301, influencer: "@table_settings", influencerLink: "#", platform: "instagram", productImage: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2070&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=7", likes: "15K", comments: "180", shares: "500", caption: "Setting the table for tonight's dinner party. Classic white never...", productName: "Ceramic Dish Set", regularPrice: "₱3,200", offerPrice: "₱2,800", affiliateLink: "/shop/dish-set" },
      { id: 302, influencer: "@hostess_ph", influencerLink: "#", platform: "facebook", productImage: "https://images.unsplash.com/photo-1556911220-e15224bbaf40?q=80&w=2070&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=8", likes: "28K", comments: "340", shares: "1.2K", caption: "Details matter. Loving the gold trim on these plates.", productName: "Gold Trim Plates", regularPrice: "₱1,800", affiliateLink: "/shop/plates" },
    ],
  },
  {
    categoryId: "vacuum-flask",
    title: "Vacuum Flask Highlights",
    subtitle: "Keep it hot or cold",
    bgColor: "bg-white",
    items: [
      { id: 401, influencer: "@on_the_go", influencerLink: "#", platform: "instagram", productImage: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=2070&auto=format&fit=crop", videoUrl: "/assets/hero/hero2.mp4", avatar: "https://i.pravatar.cc/150?u=9", likes: "31K", comments: "420", shares: "1.8K", caption: "Keeps my coffee hot for 12 hours. Essential for long drives.", productName: "Vacuum Flask XL", regularPrice: "₱1,200", offerPrice: "₱999", affiliateLink: "/shop/vacuum-flask-xl" },
      { id: 402, influencer: "@tea_lover", influencerLink: "#", platform: "tiktok", productImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=10", likes: "18K", comments: "150", shares: "600", caption: "Morning tea time setup. 🍵", productName: "Mini Flask", regularPrice: "₱850", affiliateLink: "/shop/mini-flask" },
    ],
  }
];