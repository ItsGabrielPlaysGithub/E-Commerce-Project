
export type CategoryData = {
  id: string;
  name: string;
  image: string;
  iconName: string; // CMS-ready representation instead of JSX
};

export const categoriesData: CategoryData[] = [
  {
    id: "glassware",
    name: "GLASSWARE",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800",
    iconName: "Wine",
  },
  {
    id: "kitchenware",
    name: "KITCHENWARE",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    iconName: "ChefHat",
  },
  {
    id: "dinnerware",
    name: "DINNERWARE",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eea50f5?auto=format&fit=crop&q=80&w=800",
    iconName: "Soup",
  },
  {
    id: "vacuum-flask",
    name: "VACUUM FLASK",
    image: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=2070&auto=format&fit=crop",
    iconName: "Thermometer",
  }
];
