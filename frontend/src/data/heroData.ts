export type ProductGroup = {
  id: number;
  name: string;
  products: {
    id: number;
    image: string;
    name: string;
    price: string;
    isMain?: boolean;
  }[];
};

export type HeroPointer = {
  id: string;
  top: string;
  left: string;
  productName: string;
  description: string;
  image: string;
  link: string;
};

export type HeroScene = {
  id: string;
  video: string;
  pointers: HeroPointer[];
};

export type HeroData = {
  versionA: {
    headlinePart1: string;
    headlineItalic: string;
    description: string;
    bgImage: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
    productGroups: ProductGroup[];
  };
  versionB: {
    headlinePart1: string;
    headlineItalic: string;
    description: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
    scenes: HeroScene[];
  };
};

export const heroData: HeroData = {
  versionA: {
    headlinePart1: "Elevate Your",
    headlineItalic: "Kitchen Tray.",
    description: "Join the elite circle of Omega Houseware promoters and start earning while styling Filipino kitchens.",
    bgImage: "/assets/hero/hero_bg_a.png",
    ctaPrimary: { text: "Explore Now", link: "#explore" },
    ctaSecondary: { text: "Contact Us", link: "#contact" },
    productGroups: [
      {
        id: 1,
        name: "Classic Chef Collection",
        products: [
          { id: 101, image: "/assets/Classic Chef Pan.png", name: "Premium Chef Pan", price: "₱1,250" },
          { id: 102, image: "/assets/Enamel Dutch Oven.png", name: "Enamel Dutch Oven", price: "₱2,450", isMain: true },
          { id: 103, image: "/assets/Essential Knife Set.png", name: "Essential Knife Set", price: "₱1,850" },
        ]
      },
      {
        id: 2,
        name: "Essential Kitchen Tools",
        products: [
          { id: 201, image: "/assets/thermos.png", name: "Vacuum Flask", price: "₱850" },
          { id: 202, image: "/assets/glass.png", name: "Glassware Set", price: "₱1,200", isMain: true },
          { id: 203, image: "/assets/dishes.png", name: "Ceramic Dish Set", price: "₱3,100" },
        ]
      },
      {
        id: 3,
        name: "Master Chef Bakeware",
        products: [
          { id: 301, image: "/assets/bakeware.png", name: "Pro Bakeware", price: "₱1,500" },
          { id: 302, image: "/assets/Enamel Dutch Oven.png", name: "Classic Dutch Oven", price: "₱2,250", isMain: true },
          { id: 303, image: "/assets/Classic Chef Pan.png", name: "Chef's Skillet", price: "₱1,150" },
        ]
      }
    ]
  },
  versionB: {
    headlinePart1: "Elevate Your",
    headlineItalic: "Kitchen Tray.",
    description: "Join the elite circle of Omega Houseware promoters and start earning while styling Filipino kitchens.",
    ctaPrimary: { text: "Explore Now", link: "#explore" },
    ctaSecondary: { text: "Contact Us", link: "#contact" },
    scenes: [
      {
        id: "scene1",
        video: "/assets/hero/hero1.mp4",
        pointers: [
          {
            id: "p1-1",
            top: "45%",
            left: "60%",
            productName: "Premium Chef Pan",
            description: "Perfect heat distribution for professional searing.",
            image: "/assets/Classic Chef Pan.png",
            link: "/shop/chef-pan"
          },
          {
            id: "p1-2",
            top: "60%",
            left: "80%",
            productName: "Enamel Dutch Oven",
            description: "Heritage design with modern kitchen durability.",
            image: "/assets/Enamel Dutch Oven.png",
            link: "/shop/dutch-oven"
          }
        ]
      },
      {
        id: "scene2",
        video: "/assets/hero/hero2.mp4",
        pointers: [
          {
            id: "p2-1",
            top: "40%",
            left: "70%",
            productName: "Heritage Vacuum Flask",
            description: "Keeps drinks hot or cold for 12 hours.",
            image: "/assets/thermos.png",
            link: "/shop/vacuum-flask"
          }
        ]
      },
      {
        id: "scene3",
        video: "/assets/hero/hero3.mp4",
        pointers: [
          {
            id: "p3-1",
            top: "50%",
            left: "65%",
            productName: "Essential Knife Set",
            description: "Precision steel for effortless carving.",
            image: "/assets/Essential Knife Set.png",
            link: "/shop/knife-set"
          },
          {
            id: "p3-2",
            top: "65%",
            left: "85%",
            productName: "Classic Glassware",
            description: "Elegant design for any table setting.",
            image: "/assets/glass.png",
            link: "/shop/glassware"
          }
        ]
      }
    ]
  }
};