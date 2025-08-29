// Search-related types

export interface SearchResult {
  id: number;
  title: string;
  type: "movie" | "series";
  year?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  rating?: number;
}

export interface SearchFilters {
  type: "all" | "movie" | "series";
  year?: string;
  genre?: string;
  rating?: number;
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  page?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total_results: number;
  total_pages: number;
  page: number;
}
