// ============================================================================
// SEARCH FEATURE TYPES
// ============================================================================

export interface SearchResult {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type: "movie" | "tv" | "person";
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title?: string;
  original_name?: string;
}

export interface SearchFilters {
  query: string;
  mediaType: "all" | "movie" | "tv" | "person";
  year?: number;
  genre?: number;
  sortBy: "relevance" | "date" | "rating" | "popularity";
  includeAdult: boolean;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface SearchDropdownProps {
  query: string;
  results: SearchResult[];
  loading: boolean;
  onResultSelect: (result: SearchResult) => void;
  visible: boolean;
}
