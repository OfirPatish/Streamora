import axios from "axios";
import { cacheService, CACHE_TTL } from "./cacheService";
import {
  Movie,
  MovieDetails,
  Series,
  SeriesDetails,
  Season,
  Episode,
  Genre,
  MediaItem,
  SearchQuery,
  PaginatedResponse,
} from "../types";

class TMDBService {
  private baseURL = "https://api.themoviedb.org/3";
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("TMDB_API_KEY environment variable is required");
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}, ttl?: number): Promise<T> {
    // Create cache key from endpoint and params
    const cacheKey = this.generateCacheKey(endpoint, params);

    // Try to get from cache first
    const cached = await cacheService.get<T>(cacheKey);
    if (cached) {
      console.log(`📦 Cache hit for: ${endpoint}`);
      return cached;
    }

    try {
      console.log(`🌐 API request for: ${endpoint}`);
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params,
        },
      });

      // Cache the response
      if (ttl) {
        await cacheService.set(cacheKey, response.data, ttl);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`TMDB API Error: ${error.response?.data?.status_message || error.message}`);
      }
      throw error;
    }
  }

  private generateCacheKey(endpoint: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {} as Record<string, any>);

    return `tmdb:${endpoint}:${JSON.stringify(sortedParams)}`;
  }

  // Movie endpoints
  async getPopularMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/popular", { page }, CACHE_TTL.POPULAR);
  }

  async getTrendingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/trending/movie/day", { page }, CACHE_TTL.TRENDING);
  }

  async getTopRatedMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/top_rated", { page }, CACHE_TTL.TOP_RATED);
  }

  async getNowPlayingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/now_playing", { page }, CACHE_TTL.POPULAR);
  }

  async getUpcomingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/upcoming", { page }, CACHE_TTL.POPULAR);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.makeRequest(
      `/movie/${movieId}`,
      {
        append_to_response: "credits,videos,images,recommendations",
      },
      CACHE_TTL.MOVIE_DETAILS
    );
  }

  async getMovieRecommendations(movieId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest(`/movie/${movieId}/recommendations`, { page }, CACHE_TTL.MOVIE_DETAILS);
  }

  async getMovieCredits(movieId: number): Promise<any> {
    return this.makeRequest(`/movie/${movieId}/credits`, {}, CACHE_TTL.MOVIE_DETAILS);
  }

  async getMovieVideos(movieId: number): Promise<any> {
    return this.makeRequest(`/movie/${movieId}/videos`, {}, CACHE_TTL.MOVIE_DETAILS);
  }

  // Series endpoints
  async getPopularSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/popular", { page }, CACHE_TTL.POPULAR);
  }

  async getTopRatedSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/top_rated", { page }, CACHE_TTL.TOP_RATED);
  }

  async getOnTheAirSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/on_the_air", { page }, CACHE_TTL.POPULAR);
  }

  async getAiringTodaySeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/airing_today", { page }, CACHE_TTL.TRENDING);
  }

  async getSeriesDetails(seriesId: number): Promise<SeriesDetails> {
    return this.makeRequest(
      `/tv/${seriesId}`,
      {
        append_to_response: "credits,videos,images,recommendations",
      },
      CACHE_TTL.MOVIE_DETAILS
    );
  }

  async getSeriesRecommendations(seriesId: number, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest(`/tv/${seriesId}/recommendations`, { page }, CACHE_TTL.MOVIE_DETAILS);
  }

  async getSeasonDetails(seriesId: number, seasonNumber: number): Promise<Season> {
    return this.makeRequest(
      `/tv/${seriesId}/season/${seasonNumber}`,
      {
        append_to_response: "credits,videos,images",
      },
      CACHE_TTL.MOVIE_DETAILS
    );
  }

  async getEpisodeDetails(seriesId: number, seasonNumber: number, episodeNumber: number): Promise<Episode> {
    return this.makeRequest(
      `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
      {
        append_to_response: "credits,videos,images",
      },
      CACHE_TTL.MOVIE_DETAILS
    );
  }

  // Search endpoints
  async searchMulti(query: string, page: number = 1): Promise<PaginatedResponse<MediaItem>> {
    return this.makeRequest("/search/multi", { query, page }, CACHE_TTL.SEARCH);
  }

  async searchMovies(query: string, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/search/movie", { query, page }, CACHE_TTL.SEARCH);
  }

  async searchSeries(query: string, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/search/tv", { query, page }, CACHE_TTL.SEARCH);
  }

  // Genre endpoints
  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest("/genre/movie/list", {}, CACHE_TTL.GENRES);
  }

  async getSeriesGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest("/genre/tv/list", {}, CACHE_TTL.GENRES);
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest(
      "/discover/movie",
      {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
      CACHE_TTL.POPULAR
    );
  }

  async getSeriesByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest(
      "/discover/tv",
      {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
      CACHE_TTL.POPULAR
    );
  }

  // Discover endpoints
  async discoverMovies(
    params: {
      page?: number;
      sort_by?: string;
      year?: number;
      genre?: number;
      vote_average_gte?: number;
    } = {}
  ): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest(
      "/discover/movie",
      {
        sort_by: "popularity.desc",
        ...params,
      },
      CACHE_TTL.POPULAR
    );
  }

  async discoverSeries(
    params: {
      page?: number;
      sort_by?: string;
      year?: number;
      genre?: number;
      vote_average_gte?: number;
    } = {}
  ): Promise<PaginatedResponse<Series>> {
    return this.makeRequest(
      "/discover/tv",
      {
        sort_by: "popularity.desc",
        ...params,
      },
      CACHE_TTL.POPULAR
    );
  }
}

// Lazy initialization to ensure environment variables are loaded first
let _tmdbServiceInstance: TMDBService | null = null;

function getTMDBService(): TMDBService {
  if (!_tmdbServiceInstance) {
    _tmdbServiceInstance = new TMDBService();
  }
  return _tmdbServiceInstance;
}

// Create a proxy that behaves like TMDBService but initializes lazily
export const tmdbService = new Proxy({} as TMDBService, {
  get(target, prop: string | symbol) {
    const service = getTMDBService();
    const value = service[prop as keyof TMDBService];

    // Bind methods to maintain 'this' context
    if (typeof value === "function") {
      return value.bind(service);
    }

    return value;
  },
});
