"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Movie, Series } from "@/types/api";
import { PaginatedResponse } from "@/lib/api";

// Prefetch API function
async function prefetchAPI(endpoint: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}?page=1`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to prefetch data");
  }

  return result.data as PaginatedResponse<Movie | Series>;
}

export function usePrefetch() {
  const queryClient = useQueryClient();

  // Prefetch paginated content
  const prefetchPaginatedContent = async (endpoint: string) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["paginated-content", endpoint],
      queryFn: async ({ pageParam = 1 }) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}?page=${pageParam}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch data");
        }

        return result.data as PaginatedResponse<Movie | Series>;
      },
      getNextPageParam: (
        lastPage: PaginatedResponse<Movie | Series>,
        allPages: PaginatedResponse<Movie | Series>[]
      ) => {
        const nextPage = allPages.length + 1;
        return nextPage <= (lastPage.total_pages || 0) ? nextPage : undefined;
      },
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    });
  };

  // Prefetch search results
  const prefetchSearch = async (query: string) => {
    await queryClient.prefetchQuery({
      queryKey: ["search", query, { type: "all" }],
      queryFn: async () => {
        const apiUrl = `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
        }/search/multi?query=${encodeURIComponent(query)}&page=1`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch search results");
        }

        return result.data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    });
  };

  // Prefetch movie details
  const prefetchMovieDetails = async (movieId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["movie-details", movieId],
      queryFn: async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/${movieId}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch movie details");
        }

        return result.data;
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 20, // 20 minutes
    });
  };

  // Prefetch series details
  const prefetchSeriesDetails = async (seriesId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["series-details", seriesId],
      queryFn: async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/series/${seriesId}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch series details");
        }

        return result.data;
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 20, // 20 minutes
    });
  };

  return {
    prefetchPaginatedContent,
    prefetchSearch,
    prefetchMovieDetails,
    prefetchSeriesDetails,
  };
}
