// Movie related types
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

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  homepage: string;
  imdb_id: string;
  // Nested properties from append_to_response
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
  images?: {
    backdrops: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
    posters: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
  };
  recommendations?: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

// Series related types
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

export interface SeriesDetails extends Series {
  episode_run_time: number[];
  status: string;
  tagline: string;
  type: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  homepage: string;
  number_of_seasons: number;
  number_of_episodes: number;
  last_air_date: string;
  networks: Network[];
  seasons: Season[];
  // Nested properties from append_to_response
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
  images?: {
    backdrops: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
    posters: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
  };
  recommendations?: {
    page: number;
    results: Series[];
    total_pages: number;
    total_results: number;
  };
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  air_date: string;
  episode_count: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  vote_average: number;
  vote_count: number;
  runtime: number;
}

// Common types
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    total_pages: number;
    total_results: number;
    results_per_page: number;
  };
}

// Search types
export interface SearchQuery {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  region?: string;
  year?: number;
  primary_release_year?: number;
  first_air_date_year?: number;
}

export interface SearchFilters {
  genre?: number;
  year?: number;
  rating?: number;
  sort_by?: "popularity" | "vote_average" | "release_date" | "title";
  sort_order?: "asc" | "desc";
}

// Media types
export type MediaType = "movie" | "tv" | "person";

export interface MediaItem {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}
