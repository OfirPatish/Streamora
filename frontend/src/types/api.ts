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
