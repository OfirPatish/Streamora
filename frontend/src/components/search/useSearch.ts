import { useState, useEffect, useCallback } from "react";
import { SearchResult, SearchSuggestion, SearchFilters } from "./types";
import { mockSearchAPI, mockSuggestionsAPI } from "./mockSearchData";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ type: "all" });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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
        const searchResults = await mockSearchAPI(searchQuery, filters);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
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
