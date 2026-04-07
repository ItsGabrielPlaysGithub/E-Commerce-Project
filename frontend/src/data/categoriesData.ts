
export type CategoryData = {
  id: string;
  name: string;
  image: string;
  videoUrl?: string;
  iconName: string; // CMS-ready representation instead of JSX
};


export const categoriesData: CategoryData[] = [
  {
    id: "glassware",
    name: "GLASSWARE",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
    iconName: "Wine",
  },


  {
    id: "kitchenware",
    name: "KITCHENWARE",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
    iconName: "ChefHat",
  },
  {
    id: "dinnerware",
    name: "DINNERWARE",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    iconName: "Soup",
  },
  {
    id: "vacuum-flask",
    name: "VACUUM FLASK",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    iconName: "Thermometer",
  }
];




