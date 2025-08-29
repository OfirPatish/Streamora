import { useState, useEffect, useCallback } from "react";
import { SearchResult, SearchSuggestion, SearchFilters } from "../types";
import { mockSuggestionsAPI } from "@/lib/mocks/search-data";
import { useMultiSearch, MultiSearchResult } from "./useApiSearch";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ type: "all" });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Real API search hook
  const { search: multiSearch, loading: apiLoading, error: apiError } = useMultiSearch();

  // Transform TMDB MultiSearchResult to our SearchResult format (movies and series only)
  const transformSearchResults = useCallback((apiResults: MultiSearchResult[]): SearchResult[] => {
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
  }, []);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, filters]);

  // Fetch suggestions
  useEffect(() => {
    if (isOpen) {
      fetchSuggestions(query);
    }
  }, [query, isOpen]);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      setIsLoading(true);
      try {
        // Use real TMDB API search
        const apiResponse = await multiSearch(searchQuery, 1);

        if (apiResponse?.results) {
          let searchResults = transformSearchResults(apiResponse.results);

          // Apply client-side filtering if needed
          if (filters.type !== "all") {
            searchResults = searchResults.filter((result) => result.type === filters.type);
          }

          setResults(searchResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, multiSearch, transformSearchResults]
  );

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    try {
      const suggestionResults = await mockSuggestionsAPI(searchQuery);
      setSuggestions(suggestionResults);
    } catch (error) {
      console.error("Suggestions error:", error);
      setSuggestions([]);
    }
  }, []);

  const addToRecentSearches = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery("");
    setIsOpen(false);
  }, []);

  const selectSuggestion = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      addToRecentSearches(suggestion);
      setIsOpen(false);
    },
    [addToRecentSearches]
  );

  return {
    query,
    setQuery,
    results,
    suggestions,
    isLoading,
    isOpen,
    setIsOpen,
    filters,
    setFilters,
    recentSearches,
    clearResults,
    selectSuggestion,
    addToRecentSearches,
  };
}
