// ============================================================================
// CONTENT SERVICE - Unified data fetching for movies and series
// ============================================================================

import { MovieDetail } from "@/features/movies/types";
import { SeriesDetail } from "@/features/series/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Generic response type for paginated content
interface PaginatedResponse<T> {
  data: T[];
  totalResults: number;
  totalPages: number;
  success: boolean;
  error?: string;
}

// Generic response type for single item
interface SingleResponse<T> {
  data: T | null;
  success: boolean;
  error?: string;
}

export class ContentService {
  // ============================================================================
  // MOVIE METHODS
  // ============================================================================

  // Fetch popular movies with pagination
  static async getPopularMovies(page: number = 1): Promise<PaginatedResponse<MovieDetail>> {
    return this.fetchPaginatedContent<MovieDetail>("/movies/popular", page);
  }

  // Fetch now playing movies
  static async getNowPlayingMovies(page: number = 1): Promise<PaginatedResponse<MovieDetail>> {
    return this.fetchPaginatedContent<MovieDetail>("/movies/now-playing", page);
  }

  // Fetch top rated movies
  static async getTopRatedMovies(page: number = 1): Promise<PaginatedResponse<MovieDetail>> {
    return this.fetchPaginatedContent<MovieDetail>("/movies/top-rated", page);
  }

  // Fetch upcoming movies
  static async getUpcomingMovies(page: number = 1): Promise<PaginatedResponse<MovieDetail>> {
    return this.fetchPaginatedContent<MovieDetail>("/movies/upcoming", page);
  }

  // Fetch movie details by ID
  static async getMovieDetails(id: string): Promise<SingleResponse<MovieDetail>> {
    return this.fetchSingleContent<MovieDetail>(`/movies/${id}`);
  }

  // ============================================================================
  // SERIES METHODS
  // ============================================================================

  // Fetch popular series with pagination
  static async getPopularSeries(page: number = 1): Promise<PaginatedResponse<SeriesDetail>> {
    return this.fetchPaginatedContent<SeriesDetail>("/series/popular", page);
  }

  // Fetch on the air series
  static async getOnTheAirSeries(page: number = 1): Promise<PaginatedResponse<SeriesDetail>> {
    return this.fetchPaginatedContent<SeriesDetail>("/series/on-the-air", page);
  }

  // Fetch top rated series
  static async getTopRatedSeries(page: number = 1): Promise<PaginatedResponse<SeriesDetail>> {
    return this.fetchPaginatedContent<SeriesDetail>("/series/top-rated", page);
  }

  // Fetch airing today series
  static async getAiringTodaySeries(page: number = 1): Promise<PaginatedResponse<SeriesDetail>> {
    return this.fetchPaginatedContent<SeriesDetail>("/series/airing-today", page);
  }

  // Fetch series details by ID
  static async getSeriesDetails(id: string): Promise<SingleResponse<SeriesDetail>> {
    return this.fetchSingleContent<SeriesDetail>(`/series/${id}`);
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  // Generic method for fetching paginated content
  private static async fetchPaginatedContent<T>(
    endpoint: string,
    page: number = 1
  ): Promise<PaginatedResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}?page=${page}`, {
        next: { revalidate: 60 * 60 }, // 1 hour cache
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("API returned error");
      }

      return {
        data: result.data.results || [],
        totalResults: result.data.total_results || 0,
        totalPages: result.data.total_pages || 0,
        success: true,
      };
    } catch (error) {
      console.error(`Failed to fetch ${endpoint} data:`, error);
      return {
        data: [],
        totalResults: 0,
        totalPages: 0,
        success: false,
        error: `Failed to load ${endpoint.split('/').pop()}`,
      };
    }
  }

  // Generic method for fetching single content item
  private static async fetchSingleContent<T>(endpoint: string): Promise<SingleResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        next: { revalidate: 60 * 60 * 24 }, // 24 hours - details change slowly
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("API returned error");
      }

      return {
        data: result.data as T,
        success: true,
      };
    } catch (error) {
      console.error(`Failed to fetch ${endpoint} data:`, error);
      return {
        data: null,
        success: false,
        error: `Failed to load ${endpoint.split('/').pop()}`,
      };
    }
  }
}
