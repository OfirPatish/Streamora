"use client";

import { useApi, useAsyncApi } from "@/hooks/api/useApi";
import { PaginatedResponse } from "@/lib/api";

// Movie Types (matching backend API structure)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
  }>;
  homepage: string;
  imdb_id: string;
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
  return useApi<MovieDetails>(`/movies/${id}`, undefined, immediate);
}

// Movie Credits Hook
export function useMovieCredits(id: number | string) {
  return useApi<MovieDetails["credits"]>(`/movies/${id}/credits`);
}

// Movie Videos Hook
export function useMovieVideos(id: number | string) {
  return useApi<MovieDetails["videos"]>(`/movies/${id}/videos`);
}

// Manual movie search hook
export function useMovieSearch() {
  return useAsyncApi<PaginatedResponse<Movie>>();
}
