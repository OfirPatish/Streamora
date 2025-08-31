// Search-related types

// Note: SearchResult and SearchFilters types have been moved to feature-specific type file
// - SearchResult, SearchFilters: /features/search/types/index.ts

// Note: SearchQuery and SearchResponse types are kept here as they are shared across features
export interface SearchQuery {
  query: string;
  filters?: any; // Import from /features/search/types if needed
  page?: number;
}

export interface SearchResponse {
  results: any[]; // Import from /features/search/types if needed
  total_results: number;
  total_pages: number;
  page: number;
}
