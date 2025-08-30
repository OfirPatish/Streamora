"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Movie, Series } from "@/types/api";
import { PaginatedResponse } from "@/lib/api";

interface UsePaginatedContentProps {
  endpoint: string;
  enabled?: boolean;
  pageSize?: number;
}

export function usePaginatedContent<T = Movie | Series>({
  endpoint,
  enabled = true,
  pageSize = 20,
}: UsePaginatedContentProps) {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery(
    {
      queryKey: ["paginated-content", endpoint],
      queryFn: async ({ pageParam = 1 }) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}?page=${pageParam}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch data");
        }

        return result.data as PaginatedResponse<T>;
      },
      getNextPageParam: (lastPage: PaginatedResponse<T>, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= (lastPage.total_pages || 0) ? nextPage : undefined;
      },
      initialPageParam: 1,
      enabled,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
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
    queryClient.removeQueries({ queryKey: ["paginated-content", endpoint] });
  };

  const refresh = () => {
    refetch();
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
    refresh,
    currentPage: data?.pages.length || 0,
    totalPages: data?.pages[0]?.total_pages || 0,
    totalResults: data?.pages[0]?.total_results || 0,
  };
}
