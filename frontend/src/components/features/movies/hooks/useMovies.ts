"use client";

import { useApi, useAsyncApi } from "@/hooks/useApi";
import { PaginatedResponse } from "@/lib/api";

// Movie Types (matching backend API structure)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime?: number;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genres?: Array<{ id: number; name: string }>;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
}

// Movie List Hooks
export function usePopularMovies(page: number = 1) {
  return useApi<PaginatedResponse<Movie>>("/movies/popular", { page });
}

export function useTopRatedMovies(page: number = 1) {
  return useApi<PaginatedResponse<Movie>>("/movies/top-rated", { page });
}

export function useNowPlayingMovies(page: number = 1) {
  return useApi<PaginatedResponse<Movie>>("/movies/now-playing", { page });
}

export function useUpcomingMovies(page: number = 1) {
  return useApi<PaginatedResponse<Movie>>("/movies/upcoming", { page });
}

// Movie Detail Hook
export function useMovieDetails(id: number | string, immediate: boolean = true) {
  return useApi<Movie>(`/movies/${id}`, undefined, immediate);
}

// Movie Credits Hook
export function useMovieCredits(id: number | string) {
  return useApi<Movie["credits"]>(`/movies/${id}/credits`);
}

// Movie Videos Hook
export function useMovieVideos(id: number | string) {
  return useApi<Movie["videos"]>(`/movies/${id}/videos`);
}

// Manual movie search hook
export function useMovieSearch() {
  return useAsyncApi<PaginatedResponse<Movie>>();
}
