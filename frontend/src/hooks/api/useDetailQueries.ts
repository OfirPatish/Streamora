"use client";

import { useQuery } from "@tanstack/react-query";
import { MovieDetails, SeriesDetails } from "@/types/api";

// API functions for detail data
async function fetchMovieDetails(id: number) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/${id}`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch movie details");
  }

  return result.data as MovieDetails;
}

async function fetchSeriesDetails(id: number) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/series/${id}`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch series details");
  }

  return result.data as SeriesDetails;
}

// TanStack Query hooks for details
export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
}

export function useSeriesDetails(id: number) {
  return useQuery({
    queryKey: ["series-details", id],
    queryFn: () => fetchSeriesDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
}
