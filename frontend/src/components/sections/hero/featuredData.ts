import { FeaturedContent } from "./types";

// Mock featured content that would come from your backend
export const featuredContent: FeaturedContent[] = [
  {
    id: 1,
    title: "The Quantum Heist",
    description:
      "A mind-bending thriller where a team of scientists must steal quantum technology from a parallel universe to save their own reality. Time is running out as dimensions begin to collapse.",
    year: "2024",
    genre: ["Sci-Fi", "Thriller", "Action"],
    rating: 8.7,
    runtime: "2h 18m",
    type: "movie",
    isNew: true,
    isTrending: true,
  },
  {
    id: 2,
    title: "Neon Dynasty",
    description:
      "In a cyberpunk Tokyo, a young hacker discovers a conspiracy that threatens to destroy the balance between humans and AI. The future of humanity hangs in the digital realm.",
    year: "2024",
    genre: ["Cyberpunk", "Drama", "Sci-Fi"],
    rating: 9.1,
    runtime: "3 Seasons",
    type: "series",
    isNew: false,
    isTrending: true,
  },
  {
    id: 3,
    title: "Mystic Realms",
    description:
      "An epic fantasy adventure following a group of unlikely heroes as they journey across magical realms to prevent an ancient evil from awakening and consuming all worlds.",
    year: "2024",
    genre: ["Fantasy", "Adventure", "Drama"],
    rating: 8.9,
    runtime: "2h 45m",
    type: "movie",
    isNew: true,
    isTrending: false,
  },
];
