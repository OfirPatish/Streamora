"use client";

import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";
import { Movie } from "./useMovies";
import { Series } from "./useSeries";
import { PaginatedResponse } from "@/lib/api";
import { frontendCache, CACHE_TTL } from "@/lib/cache";

interface UsePaginatedContentProps {
  endpoint: string; // e.g., "/movies/popular", "/series/top-rated"
  enabled?: boolean;
}

export function usePaginatedContent<T = Movie | Series>({ endpoint, enabled = true }: UsePaginatedContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allItems, setAllItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(endpoint);

  // Get appropriate TTL based on endpoint
  const getCacheTTL = useCallback((endpoint: string): number => {
    if (endpoint.includes("/popular")) return CACHE_TTL.POPULAR;
    if (endpoint.includes("/top-rated")) return CACHE_TTL.TOP_RATED;
    if (endpoint.includes("/now-playing")) return CACHE_TTL.NOW_PLAYING;
    if (endpoint.includes("/upcoming")) return CACHE_TTL.UPCOMING;
    if (endpoint.includes("/airing-today") || endpoint.includes("/on-the-air")) return CACHE_TTL.NOW_PLAYING;
    return CACHE_TTL.POPULAR; // Default
  }, []);

  // Reset state when endpoint changes (filter change)
  useEffect(() => {
    if (currentEndpoint !== endpoint) {
      // Immediately reset state
      setCurrentPage(1);
      setAllItems([]);
      setHasMore(true);
      setLoadingMore(false);
      setShowLoadingSkeleton(false);
      setCurrentEndpoint(endpoint);

      // Clear pagination state for old endpoint in cache
      frontendCache.delete(`pagination-state`, { endpoint: currentEndpoint });
    }
  }, [endpoint, currentEndpoint]);

  // Load persisted pagination state for this endpoint from cache
  useEffect(() => {
    if (enabled) {
      const paginationState = frontendCache.get<{
        page: number;
        hasMoreCached: boolean;
        totalItems: number;
      }>("pagination-state", { endpoint });

      if (paginationState) {
        // Only restore if it's reasonable (not too many pages)
        if (paginationState.page <= 5) {
          setCurrentPage(paginationState.page);
          setHasMore(paginationState.hasMoreCached);
        }
      }
    }
  }, [endpoint, enabled]);

  // Save pagination state to cache
  const savePaginationState = useCallback(() => {
    frontendCache.set(
      "pagination-state",
      {
        page: currentPage,
        hasMoreCached: hasMore,
        totalItems: allItems.length,
      },
      300, // 5 minutes TTL for pagination state
      { endpoint }
    );
  }, [endpoint, currentPage, hasMore, allItems.length]);

  // Fetch current page
  const { data, loading, error, refetch } = useApi<PaginatedResponse<T>>(
    `${endpoint}?page=${currentPage}`,
    undefined,
    enabled && currentPage === 1 && currentEndpoint === endpoint // Only auto-fetch first page and when endpoint matches
  );

  // Update items when new data arrives
  useEffect(() => {
    if (data?.results) {
      setAllItems((prev) => {
        if (currentPage === 1) {
          // First page - replace all data
          return data.results;
        } else {
          // Additional pages - append new data, avoiding duplicates
          const existingIds = new Set(prev.map((item: any) => item.id));
          const newItems = data.results.filter((item: any) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        }
      });

      // Check if there are more pages
      const newHasMore = currentPage < (data.total_pages || 0);
      setHasMore(newHasMore);
      setLoadingMore(false);

      // Save pagination state for this session
      savePaginationState();
    }
  }, [data, currentPage, savePaginationState, endpoint]); // Added endpoint dependency

  // Force refetch when endpoint changes to ensure immediate data loading
  useEffect(() => {
    if (enabled && currentPage === 1 && currentEndpoint === endpoint) {
      refetch();
    }
  }, [endpoint, enabled, currentPage, currentEndpoint, refetch]);

  // Load next page
  const loadMore = useCallback(async () => {
    if (!loadingMore && hasMore && !loading && enabled) {
      setLoadingMore(true);

      // Show skeleton after a delay to avoid flickering on fast connections
      const skeletonTimer = setTimeout(() => {
        setShowLoadingSkeleton(true);
      }, 300);

      const nextPage = currentPage + 1;

      try {
        // First check if we have cached data for this page
        const cachedPageData = frontendCache.get<PaginatedResponse<T>>(`${endpoint}?page=${nextPage}`);

        if (cachedPageData) {
          // Use cached data
          setAllItems((prev) => {
            const existingIds = new Set(prev.map((item: any) => item.id));
            const newItems = cachedPageData.results.filter((item: any) => !existingIds.has(item.id));

            if (newItems.length === 0) return prev;
            return [...prev, ...newItems];
          });

          setCurrentPage(nextPage);
          const newHasMore = nextPage < (cachedPageData.total_pages || 0);
          setHasMore(newHasMore);
          savePaginationState();
        } else {
          // Fetch from API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}${endpoint}?page=${nextPage}`
          );
          const result = await response.json();

          if (result.success && result.data?.results) {
            const pageData = result.data;

            // Cache the page data
            frontendCache.set(`${endpoint}?page=${nextPage}`, pageData, getCacheTTL(endpoint));

            setAllItems((prev) => {
              const existingIds = new Set(prev.map((item: any) => item.id));
              const newItems = pageData.results.filter((item: any) => !existingIds.has(item.id));

              if (newItems.length === 0) return prev;
              return [...prev, ...newItems];
            });

            setCurrentPage(nextPage);
            const newHasMore = nextPage < (pageData.total_pages || 0);
            setHasMore(newHasMore);
            savePaginationState();
          }
        }
      } catch (err) {
        console.error("Failed to load more content:", err);
      } finally {
        clearTimeout(skeletonTimer);
        setShowLoadingSkeleton(false);
        setLoadingMore(false);
      }
    }
  }, [endpoint, currentPage, loadingMore, hasMore, loading, enabled, getCacheTTL, savePaginationState]);

  // Reset function
  const reset = useCallback(() => {
    setCurrentPage(1);
    setAllItems([]);
    setHasMore(true);
    setLoadingMore(false);

    // Clear pagination cache for this endpoint
    frontendCache.delete("pagination-state", { endpoint });
  }, [endpoint]);

  // Refresh function
  const refresh = useCallback(() => {
    reset();
    refetch();
  }, [reset, refetch]);

  return {
    items: allItems,
    loading: loading && currentPage === 1, // Only show loading for first page
    loadingMore,
    showLoadingSkeleton,
    error,
    hasMore,
    loadMore,
    reset,
    refresh,
    currentPage,
    totalPages: data?.total_pages || 0,
    totalResults: data?.total_results || 0,
  };
}
