"use client";

import { useBrowseContent } from "./useBrowseContent";
import { MOVIE_FILTERS, SERIES_FILTERS } from "@/lib/constants";
import { Movie, Series } from "../types";

interface UsePreloadedContentProps {
  type: "movie" | "series";
  activeFilter: string;
}

export function usePreloadedContent({ type, activeFilter }: UsePreloadedContentProps) {
  const filters = type === "movie" ? MOVIE_FILTERS : SERIES_FILTERS;

  // Get the active filter config
  const activeFilterConfig = filters.find((filter) => filter.key === activeFilter);

  // Use the main hook for the active filter
  const mainQuery = useBrowseContent<Movie | Series>({
    endpoint: activeFilterConfig?.endpoint || (type === "movie" ? "/movies/popular" : "/series/popular"),
  });

  // Preload all other filters in the background
  const otherFilters = filters.filter((filter) => filter.key !== activeFilter);

  // Create background queries for other filters
  const backgroundQueries = otherFilters.map((filter) =>
    useBrowseContent<Movie | Series>({ endpoint: filter.endpoint })
  );

  return {
    // Return the main query data
    ...mainQuery,

    // Additional info about preloaded data
    preloadedFilters: otherFilters.map((filter, index) => {
      const query = backgroundQueries[index];
      return {
        key: filter.key,
        endpoint: filter.endpoint,
        isLoaded: query ? !query.loading : false,
        hasData: query && query.items ? query.items.length > 0 : false,
      };
    }),

    // Get data for any filter (useful for instant switching)
    getFilterData: (filterKey: string) => {
      if (filterKey === activeFilter) {
        return mainQuery;
      }

      const filterIndex = otherFilters.findIndex((filter) => filter.key === filterKey);
      if (filterIndex >= 0 && backgroundQueries[filterIndex]) {
        return backgroundQueries[filterIndex];
      }

      return null;
    },
  };
}
