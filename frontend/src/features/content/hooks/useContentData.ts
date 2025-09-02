"use client";

import {
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
} from "../../../hooks/useUnifiedContent";

// ============================================================================
// INDIVIDUAL HOOKS (now using unified content)
// ============================================================================

// Re-export the unified hooks for backward compatibility
export { useNowPlayingMovies, useTopRatedMovies, useOnTheAirSeries, useTopRatedSeries };

// ============================================================================
// COMBINED HOOKS
// ============================================================================

// Combined hook for all home page data
export function useContentData() {
  const nowPlayingMovies = useNowPlayingMovies();
  const topRatedMovies = useTopRatedMovies();
  const onTheAirSeries = useOnTheAirSeries();
  const topRatedSeries = useTopRatedSeries();

  return {
    nowPlayingMovies,
    topRatedMovies,
    onTheAirSeries,
    topRatedSeries,
    loading: nowPlayingMovies.loading || topRatedMovies.loading || onTheAirSeries.loading || topRatedSeries.loading,
    error: nowPlayingMovies.error || topRatedMovies.error || onTheAirSeries.error || topRatedSeries.error,
  };
}

// Combined hook for movie data only
export function useContentMovieData() {
  const nowPlayingMovies = useNowPlayingMovies();
  const topRatedMovies = useTopRatedMovies();

  return {
    nowPlayingMovies,
    topRatedMovies,
    loading: nowPlayingMovies.loading || topRatedMovies.loading,
    error: nowPlayingMovies.error || topRatedMovies.error,
  };
}

// Combined hook for series data only
export function useContentSeriesData() {
  const onTheAirSeries = useOnTheAirSeries();
  const topRatedSeries = useTopRatedSeries();

  return {
    onTheAirSeries,
    topRatedSeries,
    loading: onTheAirSeries.loading || topRatedSeries.loading,
    error: onTheAirSeries.error || topRatedSeries.error,
  };
}
