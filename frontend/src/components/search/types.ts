export interface SearchResult {
  id: number;
  title: string;
  type: "movie" | "series" | "person";
  year?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  rating?: number;
}

export interface SearchSuggestion {
  id: string;
  query: string;
  type: "recent" | "trending" | "suggestion";
  count?: number;
}

export interface SearchFilters {
  type: "all" | "movie" | "series" | "person";
  year?: string;
  genre?: string;
  rating?: number;
}
