"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie, Series } from "@/types/api";
import { PaginatedResponse } from "@/lib/api";

// API functions for home page data
async function fetchNowPlayingMovies() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/now-playing`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch now playing movies");
  }

  return result.data as PaginatedResponse<Movie>;
}

async function fetchTopRatedMovies() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/top-rated`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch top rated movies");
  }

  return result.data as PaginatedResponse<Movie>;
}

async function fetchOnTheAirSeries() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/series/on-the-air`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch on the air series");
  }

  return result.data as PaginatedResponse<Series>;
}

async function fetchTopRatedSeries() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/series/top-rated`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch top rated series");
  }

  return result.data as PaginatedResponse<Series>;
}

// Individual hooks for home page sections
export function useNowPlayingMovies() {
  return useQuery({
    queryKey: ["home", "now-playing-movies"],
    queryFn: fetchNowPlayingMovies,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["home", "top-rated-movies"],
    queryFn: fetchTopRatedMovies,
    staleTime: 1000 * 60 * 15, // 15 minutes (top rated changes less frequently)
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

export function useOnTheAirSeries() {
  return useQuery({
    queryKey: ["home", "on-the-air-series"],
    queryFn: fetchOnTheAirSeries,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
}

export function useTopRatedSeries() {
  return useQuery({
    queryKey: ["home", "top-rated-series"],
    queryFn: fetchTopRatedSeries,
    staleTime: 1000 * 60 * 15, // 15 minutes (top rated changes less frequently)
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

// Combined hook for all home page data
export function useHomeData() {
  const nowPlayingMovies = useNowPlayingMovies();
  const topRatedMovies = useTopRatedMovies();
  const onTheAirSeries = useOnTheAirSeries();
  const topRatedSeries = useTopRatedSeries();

  return {
    nowPlayingMovies,
    topRatedMovies,
    onTheAirSeries,
    topRatedSeries,
    // Combined loading state
    isLoading: nowPlayingMovies.isLoading || topRatedMovies.isLoading || onTheAirSeries.isLoading || topRatedSeries.isLoading,
    // Combined error state
    error: nowPlayingMovies.error || topRatedMovies.error || onTheAirSeries.error || topRatedSeries.error,
  };
}
