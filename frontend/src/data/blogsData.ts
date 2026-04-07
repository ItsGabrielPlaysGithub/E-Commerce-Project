export type BlogStory = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
};

export const blogsData: BlogStory[] = [
  {
    id: 1,
    title: "Pinakilala, ang Pamilyang Omega",
    excerpt: "At Omega, we believe every home has a story. Meet the families who have made us part of their daily lives.",
    image: "https://images.unsplash.com/photo-1581673408643-025c129996a7?q=80&w=1600&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "5 Things Your Newlywed Friends Should Have",
    excerpt: "Starting a new chapter? Here are the kitchen essentials every new couple needs to build their dream home.",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1600&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Omega Houseware Birthday Celebration",
    excerpt: "Celebrating decades of quality in every Filipino home. Join us as we look back at our heritage and look forward to the...",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop",
    link: "#"
  }
];