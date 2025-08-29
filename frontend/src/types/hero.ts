export interface FeaturedContent {
  id: number;
  title: string;
  description: string;
  year: string;
  genre: string[];
  rating: number;
  runtime: string;
  type: "movie" | "series";
  isNew: boolean;
  isTrending: boolean;
  backdrop_path?: string | null;
  poster_path?: string | null;
}
