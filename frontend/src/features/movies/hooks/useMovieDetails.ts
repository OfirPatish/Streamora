"use client";

import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "../types";

// API function for movie details
async function fetchMovieDetails(id: number) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/${id}`;
  const response = await fetch(apiUrl);

  // Check if response is JSON
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Unable to load content right now. Please try again later.");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Something went wrong. Please refresh the page.");
  }

  return result.data as MovieDetails;
}

// TanStack Query hook for movie details
export function useMovieDetails(id?: number) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (details change very slowly)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: (failureCount, error) => {
      // Don't retry if it's a user-friendly error
      if (error.message.includes("Unable to load") || error.message.includes("Something went wrong")) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}
