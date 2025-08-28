import axios from "axios";
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

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`TMDB API Error: ${error.response?.data?.status_message || error.message}`);
      }
      throw error;
    }
  }

  // Movie endpoints
  async getPopularMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/popular", { page });
  }

  async getTopRatedMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/top_rated", { page });
  }

  async getNowPlayingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/now_playing", { page });
  }

  async getUpcomingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/movie/upcoming", { page });
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.makeRequest(`/movie/${movieId}`, {
      append_to_response: "credits,videos,images,recommendations",
    });
  }

  async getMovieRecommendations(movieId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest(`/movie/${movieId}/recommendations`, { page });
  }

  async getMovieCredits(movieId: number): Promise<any> {
    return this.makeRequest(`/movie/${movieId}/credits`);
  }

  async getMovieVideos(movieId: number): Promise<any> {
    return this.makeRequest(`/movie/${movieId}/videos`);
  }

  // Series endpoints
  async getPopularSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/popular", { page });
  }

  async getTopRatedSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/top_rated", { page });
  }

  async getOnTheAirSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/on_the_air", { page });
  }

  async getAiringTodaySeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/tv/airing_today", { page });
  }

  async getSeriesDetails(seriesId: number): Promise<SeriesDetails> {
    return this.makeRequest(`/tv/${seriesId}`, {
      append_to_response: "credits,videos,images,recommendations",
    });
  }

  async getSeriesRecommendations(seriesId: number, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest(`/tv/${seriesId}/recommendations`, { page });
  }

  async getSeasonDetails(seriesId: number, seasonNumber: number): Promise<Season> {
    return this.makeRequest(`/tv/${seriesId}/season/${seasonNumber}`, {
      append_to_response: "credits,videos,images",
    });
  }

  async getEpisodeDetails(seriesId: number, seasonNumber: number, episodeNumber: number): Promise<Episode> {
    return this.makeRequest(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`, {
      append_to_response: "credits,videos,images",
    });
  }

  // Search endpoints
  async searchMulti(query: string, page: number = 1): Promise<PaginatedResponse<MediaItem>> {
    return this.makeRequest("/search/multi", { query, page });
  }

  async searchMovies(query: string, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/search/movie", { query, page });
  }

  async searchSeries(query: string, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/search/tv", { query, page });
  }

  // Genre endpoints
  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest("/genre/movie/list");
  }

  async getSeriesGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest("/genre/tv/list");
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.makeRequest("/discover/movie", {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
    });
  }

  async getSeriesByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.makeRequest("/discover/tv", {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
    });
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
    return this.makeRequest("/discover/movie", {
      sort_by: "popularity.desc",
      ...params,
    });
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
    return this.makeRequest("/discover/tv", {
      sort_by: "popularity.desc",
      ...params,
    });
  }
}

export const tmdbService = new TMDBService();
