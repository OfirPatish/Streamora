// API response types

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  message: string;
  code: string;
}

export interface ErrorResponse {
  success: false;
  error: ApiError;
  timestamp: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

// Note: Movie and Series types have been moved to feature-specific type files
// - Movie/MovieDetails: /features/movies/types/index.ts
// - Series/SeriesDetails: /features/series/types/index.ts
