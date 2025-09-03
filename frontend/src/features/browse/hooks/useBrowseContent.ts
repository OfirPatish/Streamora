"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/api";
import { getCacheTimes } from "@/lib/constants";
import { Movie, Series, UseBrowseContentProps } from "../types";

// ============================================================================
// BROWSE CONTENT HOOK
// ============================================================================

export function useBrowseContent<T = Movie | Series>({
  endpoint,
  enabled = true,
  pageSize = 20,
}: UseBrowseContentProps) {
  const queryClient = useQueryClient();
  const { staleTime, gcTime } = getCacheTimes(endpoint);

  const queryKey = ["browse-content", endpoint];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery(
    {
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}?page=${pageParam}`;
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

        return result.data as PaginatedResponse<T>;
      },
      getNextPageParam: (lastPage: PaginatedResponse<T>, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= (lastPage.total_pages || 0) ? nextPage : undefined;
      },
      initialPageParam: 1,
      enabled,
      staleTime,
      gcTime,
    }
  );

  // Flatten all pages into a single array
  const allItems = data?.pages.flatMap((page) => page.results || []) ?? [];

  // Remove duplicates based on ID
  const uniqueItems = allItems.filter(
    (item, index, self) => index === self.findIndex((t) => (t as any).id === (item as any).id)
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const reset = () => {
    queryClient.removeQueries({ queryKey });
  };

  return {
    items: uniqueItems,
    loading: isLoading,
    loadingMore: isFetchingNextPage,
    showLoadingSkeleton: isFetchingNextPage,
    error: isError ? (error as Error)?.message || "An error occurred" : null,
    hasMore: hasNextPage ?? false,
    loadMore,
    reset,
    refresh: refetch,
    currentPage: data?.pages.length || 0,
    totalPages: data?.pages[0]?.total_pages || 0,
    totalResults: data?.pages[0]?.total_results || 0,
  };
}

// ============================================================================
// CONVENIENCE HOOKS FOR BROWSE
// ============================================================================

// Movie hooks for browse
export function useBrowsePopularMovies() {
  return useBrowseContent<Movie>({
    endpoint: "/movies/popular",
  });
}

export function useBrowseNowPlayingMovies() {
  return useBrowseContent<Movie>({
    endpoint: "/movies/now-playing",
  });
}

export function useBrowseTopRatedMovies() {
  return useBrowseContent<Movie>({
    endpoint: "/movies/top-rated",
  });
}

export function useBrowseUpcomingMovies() {
  return useBrowseContent<Movie>({
    endpoint: "/movies/upcoming",
  });
}

// Series hooks for browse
export function useBrowsePopularSeries() {
  return useBrowseContent<Series>({
    endpoint: "/series/popular",
  });
}

export function useBrowseOnTheAirSeries() {
  return useBrowseContent<Series>({
    endpoint: "/series/on-the-air",
  });
}

export function useBrowseTopRatedSeries() {
  return useBrowseContent<Series>({
    endpoint: "/series/top-rated",
  });
}

export function useBrowseAiringTodaySeries() {
  return useBrowseContent<Series>({
    endpoint: "/series/airing-today",
  });
}

// Generic browse content hook
export function useBrowseContentByEndpoint<T = Movie | Series>(endpoint: string) {
  return useBrowseContent<T>({
    endpoint,
  });
}
