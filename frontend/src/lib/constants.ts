// ============================================================================
// FILTER CONFIGURATIONS
// ============================================================================

export const MOVIE_FILTERS = [
  {
    key: "popular" as const,
    label: "Popular",
    endpoint: "/movies/popular",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 48, // 48 hours
    },
  },
  {
    key: "top-rated" as const,
    label: "Top Rated",
    endpoint: "/movies/top-rated",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 48, // 48 hours (changes very slowly)
      gcTime: 1000 * 60 * 60 * 72, // 72 hours
    },
  },
  {
    key: "now-playing" as const,
    label: "Now Playing",
    endpoint: "/movies/now-playing",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours (more dynamic)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  {
    key: "upcoming" as const,
    label: "Coming Soon",
    endpoint: "/movies/upcoming",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours (more dynamic)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
];

export const SERIES_FILTERS = [
  {
    key: "popular" as const,
    label: "Popular",
    endpoint: "/series/popular",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 48, // 48 hours
    },
  },
  {
    key: "airing-today" as const,
    label: "Airing Today",
    endpoint: "/series/airing-today",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours (more dynamic)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  {
    key: "on-the-air" as const,
    label: "On The Air",
    endpoint: "/series/on-the-air",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours (more dynamic)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  {
    key: "top-rated" as const,
    label: "Top Rated",
    endpoint: "/series/top-rated",
    cacheTime: {
      staleTime: 1000 * 60 * 60 * 48, // 48 hours (changes very slowly)
      gcTime: 1000 * 60 * 60 * 72, // 72 hours
    },
  },
];

// ============================================================================
// CACHE TIME UTILITIES
// ============================================================================

export function getCacheTimes(endpoint: string) {
  // Check movie filters
  const movieFilter = MOVIE_FILTERS.find((filter) => filter.endpoint === endpoint);
  if (movieFilter) {
    return movieFilter.cacheTime;
  }

  // Check series filters
  const seriesFilter = SERIES_FILTERS.find((filter) => filter.endpoint === endpoint);
  if (seriesFilter) {
    return seriesFilter.cacheTime;
  }

  // Default cache times
  return {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
  };
}

// ============================================================================
// QUERY KEY MAPPINGS
// ============================================================================

// Map home query keys to paginated content keys for cache sharing
export const QUERY_KEY_MAPPINGS = {
  // Home page keys -> Paginated content keys
  "home-now-playing-movies": "paginated-content-/movies/now-playing",
  "home-top-rated-movies": "paginated-content-/movies/top-rated",
  "home-on-the-air-series": "paginated-content-/series/on-the-air",
  "home-top-rated-series": "paginated-content-/series/top-rated",
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type MovieFilter = (typeof MOVIE_FILTERS)[number]["key"];
export type SeriesFilter = (typeof SERIES_FILTERS)[number]["key"];
export type ContentType = "movie" | "series";
