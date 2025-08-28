"use client";

import { useAsyncApi } from "./useApi";
import { PaginatedResponse } from "@/lib/api";
import { Movie } from "./useMovies";
import { Series } from "./useSeries";

// Search Result Types
export interface Person {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string | null;
  known_for: Array<Movie | Series>;
}

export interface MultiSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string; // For movies
  name?: string; // For TV shows and people
  overview?: string;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  poster_path?: string | null;
  profile_path?: string | null; // For people
  vote_average?: number;
  known_for_department?: string; // For people
}

export interface Genre {
  id: number;
  name: string;
}

export interface DiscoverFilters extends Record<string, string | number | undefined> {
  with_genres?: string;
  year?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  sort_by?: string;
  page?: number;
}

// Search Hooks
export function useMultiSearch() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<MultiSearchResult>>();

  const search = (query: string, page: number = 1) => {
    return execute("/search/multi", { query, page });
  };

  return { search, loading, error };
}

export function useMovieSearch() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<Movie>>();

  const search = (query: string, page: number = 1) => {
    return execute("/search/movie", { query, page });
  };

  return { search, loading, error };
}

export function useSeriesSearch() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<Series>>();

  const search = (query: string, page: number = 1) => {
    return execute("/search/tv", { query, page });
  };

  return { search, loading, error };
}

export function usePersonSearch() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<Person>>();

  const search = (query: string, page: number = 1) => {
    return execute("/search/person", { query, page });
  };

  return { search, loading, error };
}

// Discover Hooks
export function useDiscoverMovies() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<Movie>>();

  const discover = (filters: DiscoverFilters) => {
    // Filter out undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | number>;

    return execute("/search/discover/movie", cleanFilters);
  };

  return { discover, loading, error };
}

export function useDiscoverSeries() {
  const { execute, loading, error } = useAsyncApi<PaginatedResponse<Series>>();

  const discover = (filters: DiscoverFilters) => {
    // Filter out undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    ) as Record<string, string | number>;

    return execute("/search/discover/tv", cleanFilters);
  };

  return { discover, loading, error };
}

// Genre Hooks
export function useMovieGenres() {
  const { execute, loading, error } = useAsyncApi<{ genres: Genre[] }>();

  const getGenres = () => {
    return execute("/search/genres/movie");
  };

  return { getGenres, loading, error };
}

export function useSeriesGenres() {
  const { execute, loading, error } = useAsyncApi<{ genres: Genre[] }>();

  const getGenres = () => {
    return execute("/search/genres/tv");
  };

  return { getGenres, loading, error };
}
