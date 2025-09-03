// ============================================================================
// BROWSE CONTENT DISPLAY TYPES
// ============================================================================

// Base interface for common fields between movies and series from LISTING endpoints
// These are the fields available from basic endpoints like /movie/popular, /tv/popular
export interface BaseContentItem {
  id: number;
  title?: string; // For movies
  name?: string; // For series
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  adult: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  genre_ids: number[];
  original_title?: string; // For movies
  original_name?: string; // For series
  video?: boolean; // For movies
  origin_country?: string[]; // For series
}

// Movie interface from LISTING endpoints (e.g., /movie/popular, /movie/now_playing)
export interface Movie extends BaseContentItem {
  title: string;
  release_date: string;
  original_title: string;
  video: boolean;
}

// Series interface from LISTING endpoints (e.g., /tv/popular, /tv/on_the_air)
export interface Series extends BaseContentItem {
  name: string;
  first_air_date: string;
  original_name: string;
  origin_country: string[];
}

// Union type for content items from listing endpoints
export type ContentItem = Movie | Series;

// ============================================================================
// DETAILED CONTENT TYPES (from /:id endpoints with append_to_response)
// ============================================================================

// Detailed movie interface (from /movie/:id with append_to_response)
export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  homepage: string;
  imdb_id: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  // Nested properties from append_to_response
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      credit_id: string;
      order: number;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
      credit_id: string;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
    }>;
  };
  images?: {
    backdrops: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
    posters: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
    logos: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
  };
  recommendations?: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

// Detailed series interface (from /tv/:id with append_to_response)
export interface SeriesDetails extends Series {
  episode_run_time: number[];
  status: string;
  tagline: string;
  type: string;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  homepage: string;
  number_of_seasons: number;
  number_of_episodes: number;
  last_air_date: string;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  seasons: Array<{
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    episode_count: number;
    air_date: string;
  }>;
  created_by: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  in_production: boolean;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  };
  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  };
  // Nested properties from append_to_response
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      credit_id: string;
      order: number;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
      credit_id: string;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
    }>;
  };
  images?: {
    backdrops: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
    posters: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
    logos: Array<{
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }>;
  };
  recommendations?: {
    page: number;
    results: Series[];
    total_pages: number;
    total_results: number;
  };
}

// ============================================================================
// DISPLAY TYPES FOR UI COMPONENTS
// ============================================================================

// Enhanced content item with display fields for UI
export type DisplayContentItem = ContentItem & {
  // Display fields computed by transformers
  viewCount?: number;
  duration?: string;
  displayTitle?: string;
  displayYear?: string;
  displayGenre?: string;
  displayType?: "movie" | "series";
  displayIndex?: number;
  displayRating?: number;
  displayPosterPath?: string | null;
};

// Display props for UI components
export interface DisplayProps {
  title?: string;
  items: DisplayContentItem[];
  layout?: "grid" | "carousel";
  showViewAll?: boolean;
  viewAllUrl?: string;
  loading?: boolean;
  error?: string | null;
  // Pagination support (for grid layout)
  enablePagination?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}
