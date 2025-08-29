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

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
  credits?: {
    cast: Array<{ id: number; name: string; character: string }>;
    crew: Array<{ id: number; name: string; job: string }>;
  };
  videos?: {
    results: Array<{ key: string; name: string; type: string }>;
  };
}

export interface Series {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  poster_path: string;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
  seasons?: Array<{
    id: number;
    name: string;
    episode_count: number;
    air_date: string;
  }>;
}

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
