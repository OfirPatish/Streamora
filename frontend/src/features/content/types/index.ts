// ============================================================================
// CONTENT FEATURE TYPES
// ============================================================================

export interface MediaCardProps {
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
  // Display options
  showViewCount?: boolean;
  showDuration?: boolean;
  showReleaseDate?: boolean;
  showRating?: boolean;
  showEpisodeCount?: boolean;
  // Data for display
  viewCount?: number;
  duration?: string;
  releaseDate?: string;
  episodeCount?: number;
}

export interface ContentItem {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  // Additional display data
  viewCount?: number;
  duration?: string;
  releaseDate?: string;
  episodeCount?: number;
}

export interface DisplayProps {
  title?: string;
  items: ContentItem[];
  layout?: "grid" | "carousel";
  showViewAll?: boolean;
  viewAllUrl?: string;
  loading?: boolean;
  error?: string | null;
  // Display options
  showViewCount?: boolean;
  showDuration?: boolean;
  showReleaseDate?: boolean;
  showRating?: boolean;
  showEpisodeCount?: boolean;
  // Pagination support (for grid layout)
  enablePagination?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

export interface GridProps {
  nowPlayingMovies: any[];
  topRatedMovies: any[];
  onTheAirSeries: any[];
  topRatedSeries: any[];
  loading: boolean;
  error: string | null;
}

export interface BannerProps {
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

// Union type for all content feature types
export type ContentFeatureTypes =
  | MediaCardProps
  | ContentItem
  | GridProps
  | BannerProps
  | Movie
  | Series;
