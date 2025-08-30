"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchResult, SearchFilters } from "@/types/search";
// Define the MultiSearchResult type locally since we removed useApiSearch
export interface MultiSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string; // For movies
  name?: string; // For TV shows and people
  overview?: string;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  poster_path?: string | null;
  profile_path?: string | null; // For people
  vote_average?: number;
  known_for_department?: string; // For people
}

// Transform TMDB MultiSearchResult to our SearchResult format (movies and series only)
function transformSearchResults(apiResults: MultiSearchResult[]): SearchResult[] {
  return apiResults
    .filter((result) => result.media_type === "movie" || result.media_type === "tv") // Only movies and series
    .map((result) => ({
      id: result.id,
      title: result.title || result.name || "",
      type: result.media_type === "tv" ? "series" : "movie",
      year:
        result.media_type === "movie"
          ? result.release_date
            ? new Date(result.release_date).getFullYear().toString()
            : ""
          : result.first_air_date
          ? new Date(result.first_air_date).getFullYear().toString()
          : "",
      overview: result.overview || "",
      rating: result.vote_average || undefined,
      poster_path: result.poster_path || undefined,
    }));
}

// Search API function
async function searchAPI(query: string, page: number = 1) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/search/multi?query=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch search results");
  }

  return result.data;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({ type: "all" });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Debounced query for search
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  // Update debounced query when query changes
  useEffect(() => {
    if (query !== debouncedQuery) {
      const timer = setTimeout(() => {
        setDebouncedQuery(query);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [query, debouncedQuery]);

  // TanStack Query for search results
  const {
    data: searchData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["search", debouncedQuery, filters],
    queryFn: () => searchAPI(debouncedQuery, 1),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  // Transform and filter results
  const results = searchData?.results 
    ? transformSearchResults(searchData.results).filter(result => 
        filters.type === "all" || result.type === filters.type
      )
    : [];

  const addToRecentSearches = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
  }, []);

  const clearResults = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  const selectRecentSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      addToRecentSearches(searchQuery);
    },
    [addToRecentSearches]
  );

  return {
    query,
    setQuery,
    results,
    isLoading,
    error: isError ? (error as Error)?.message || "An error occurred" : null,
    filters,
    setFilters,
    recentSearches,
    clearResults,
    selectRecentSearch,
    addToRecentSearches,
    refetch,
  };
}
