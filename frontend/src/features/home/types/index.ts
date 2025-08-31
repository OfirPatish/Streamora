// ============================================================================
// HOME FEATURE TYPES
// ============================================================================

export interface FeaturedCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  priority?: boolean;
  description?: string;
}

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

export interface HomeContentProps {
  nowPlayingMovies: any[];
  topRatedMovies: any[];
  onTheAirSeries: any[];
  topRatedSeries: any[];
  loading: boolean;
  error: string | null;
}

export interface HeroBannerProps {
  featuredContent: any[];
  topMovie: any | null;
  topSeries: any | null;
  loading: boolean;
  error: string | null;
}

// Types for data transformation in the home feature
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface Series {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_name: string;
  origin_country: string[];
}
