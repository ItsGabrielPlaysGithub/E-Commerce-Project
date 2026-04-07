export type Review = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating: number;
};

export const reviewsData: Review[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Home Chef",
    avatar: "https://i.pravatar.cc/150?u=12",
    review: "\"The heritage red vacuum flask isn't just beautiful, it actually keeps my coffee piping hot for 12 hours. Best purchase this year.\"",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Interior Stylist",
    avatar: "https://i.pravatar.cc/150?u=44",
    review: "\"Omega's glassware has that rare balance of feeling weighted and premium but looking incredibly delicate. Truly editorial.\"",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofia Lim",
    role: "Food Blogger",
    avatar: "https://i.pravatar.cc/150?u=23",
    review: "\"Their chef pan is a beast in the kitchen. Even heat distribution and wipes clean in seconds. Fine dining at home.\"",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    role: "Coffee Enthusiast",
    avatar: "https://i.pravatar.cc/150?u=71",
    review: "\"I've tried many insulated bottles, but Omega's design is simply superior. No leaks, perfect travel companion.\"",
    rating: 5,
  }
];