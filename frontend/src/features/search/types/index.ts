// ============================================================================
// SEARCH FEATURE TYPES
// ============================================================================

export interface SearchResult {
  id: number;
  title: string;
  overview: string;
  year: string;
  rating: number;
  type: "movie" | "series";
  poster_path: string;
  backdrop_path?: string;
}

export interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
}

export interface SearchFilters {
  type?: "movie" | "series" | "all";
  year?: string;
  rating?: number;
}
