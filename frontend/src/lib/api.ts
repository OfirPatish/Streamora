/**
 * API Configuration and Client Setup
 * Handles all communication with the Streamora backend with frontend caching
 */

import { frontendCache, CACHE_TTL } from "./cache";
import { getCacheTimes } from "./constants";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// TMDB Image Configuration
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: "w154",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

// Error Types
export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// API Client Class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ API Error:", {
          status: response.status,
          errorData,
          url,
        });

        // Handle backend error format
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new ApiError(errorMessage, response.status, errorData.code);
      }

      const responseData = await response.json();

      // Handle backend ApiResponse wrapper format
      if (
        responseData &&
        typeof responseData === "object" &&
        "success" in responseData &&
        "data" in responseData
      ) {
        console.log(
          "📦 API Response wrapped in ApiResponse format, extracting data field"
        );
        return responseData.data;
      }

      return responseData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  // GET request with caching
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const searchParams = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        ).toString()
      : "";

    const fullEndpoint = `${endpoint}${searchParams}`;

    // Check cache first
    const cached = frontendCache.get<T>(fullEndpoint);
    if (cached) {
      return cached;
    }

    // Make API request
    const data = await this.request<T>(fullEndpoint);

    // Cache the result with appropriate TTL
    const ttl = this.getTTLForEndpoint(endpoint);
    frontendCache.set(fullEndpoint, data, ttl);

    return data;
  }

  // Determine appropriate cache TTL based on endpoint
  private getTTLForEndpoint(endpoint: string): number {
    // Use centralized cache times for known endpoints
    try {
      const { staleTime } = getCacheTimes(endpoint);
      return Math.floor(staleTime / 1000); // Convert ms to seconds
    } catch {
      // Fallback for unknown endpoints
      if (endpoint.includes("/search")) return CACHE_TTL.SEARCH;
      if (endpoint.includes("/genres")) return CACHE_TTL.GENRES;
      if (endpoint.match(/\/(movies|series)\/\d+$/))
        return CACHE_TTL.MOVIE_DETAILS;
      if (endpoint.includes("/credits") || endpoint.includes("/videos"))
        return CACHE_TTL.MOVIE_DETAILS;

      // Default TTL
      return CACHE_TTL.POPULAR;
    }
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Utility function to get TMDB image URL
export function getTMDBImageUrl(
  path: string | null,
  type: keyof typeof TMDB_IMAGE_SIZES = "poster",
  size: keyof (typeof TMDB_IMAGE_SIZES)[typeof type] = "medium"
): string | null {
  if (!path) return null;

  const sizeKey = TMDB_IMAGE_SIZES[type][size];
  return `${TMDB_IMAGE_BASE_URL}/${sizeKey}${path}`;
}

// Health check function (doesn't use ApiResponse wrapper)
export async function checkApiHealth(): Promise<{
  status: string;
  cache: {
    type: string;
    connected: boolean;
    stats: any;
  };
  memory: {
    used: string;
    free: string;
    total: string;
  };
}> {
  return apiClient.get("/health");
}
