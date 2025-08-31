"use client";

import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { Movie, Series } from "@/types/api";
import { PaginatedResponse } from "@/lib/api";
import { getCacheTimes, MOVIE_FILTERS, SERIES_FILTERS } from "@/lib/constants";

// ============================================================================
// UNIFIED CONTENT HOOK
// ============================================================================

interface UseUnifiedContentProps {
  endpoint: string;
  context: "home" | "paginated";
  enabled?: boolean;
  pageSize?: number;
}

export function useUnifiedContent<T = Movie | Series>({
  endpoint,
  context,
  enabled = true,
  pageSize = 20,
}: UseUnifiedContentProps) {
  const queryClient = useQueryClient();
  const { staleTime, gcTime } = getCacheTimes(endpoint);

  // Generate query key based on context
  const getQueryKey = () => {
    if (context === "home") {
      // Map endpoint to home query key
      const homeKeyMap: Record<string, string> = {
        "/movies/now-playing": "now-playing-movies",
        "/movies/top-rated": "top-rated-movies",
        "/series/on-the-air": "on-the-air-series",
        "/series/top-rated": "top-rated-series",
      };
      const homeKey = homeKeyMap[endpoint];
      return homeKey ? ["home", homeKey] : ["home", endpoint.replace("/", "-").slice(1)];
    }
    return ["paginated-content", endpoint];
  };

  const queryKey = getQueryKey();

  // For home context, use regular query
  if (context === "home") {
    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey,
      queryFn: async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}`;
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
      enabled,
      staleTime,
      gcTime,
    });

    return {
      data: data?.results || [],
      loading: isLoading,
      error: isError ? (error as Error)?.message || "An error occurred" : null,
      refetch,
      totalResults: data?.total_results || 0,
      totalPages: data?.total_pages || 0,
    };
  }

  // For paginated context, use infinite query
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
// CONVENIENCE HOOKS
// ============================================================================

// Home page hooks using unified content
export function useNowPlayingMovies() {
  return useUnifiedContent<Movie>({
    endpoint: "/movies/now-playing",
    context: "home",
  });
}

export function useTopRatedMovies() {
  return useUnifiedContent<Movie>({
    endpoint: "/movies/top-rated",
    context: "home",
  });
}

export function useOnTheAirSeries() {
  return useUnifiedContent<Series>({
    endpoint: "/series/on-the-air",
    context: "home",
  });
}

export function useTopRatedSeries() {
  return useUnifiedContent<Series>({
    endpoint: "/series/top-rated",
    context: "home",
  });
}

// Paginated content hooks using unified content
export function usePaginatedContent<T = Movie | Series>(endpoint: string) {
  return useUnifiedContent<T>({
    endpoint,
    context: "paginated",
  });
}
