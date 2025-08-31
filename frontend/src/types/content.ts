// Content-related types for movies, series, and featured content

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

// Note: Movie and Series types have been moved to feature-specific type files
// - Movie: /features/movies/types/index.ts
// - Series: /features/series/types/index.ts

export interface ContentItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv";
}
