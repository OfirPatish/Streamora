"use client";

import {
  useBrowseNowPlayingMovies,
  useBrowseOnTheAirSeries,
  useBrowsePopularMovies,
  useBrowsePopularSeries,
  transformMovieData,
  transformSeriesData,
  createFeaturedContent,
} from "../index";

// ============================================================================
// BROWSE PAGE HOOK - Encapsulates all browse page logic
// ============================================================================

export function useBrowsePage() {
  // Fetch data for different sections
  const nowPlayingMovies = useBrowseNowPlayingMovies();
  const onTheAirSeries = useBrowseOnTheAirSeries();
  const popularMovies = useBrowsePopularMovies();
  const popularSeries = useBrowsePopularSeries();

  // Transform data for display
  const featuredMovies = transformMovieData(nowPlayingMovies.items);
  const featuredSeries = transformSeriesData(onTheAirSeries.items);
  const popularMoviesData = transformMovieData(popularMovies.items);
  const popularSeriesData = transformSeriesData(popularSeries.items);

  // Create featured content for hero banner (mix of movies and series)
  const featuredContent = createFeaturedContent(
    nowPlayingMovies.items,
    onTheAirSeries.items
  );

  // Determine overall loading and error states
  const isLoading =
    nowPlayingMovies.loading ||
    onTheAirSeries.loading ||
    popularMovies.loading ||
    popularSeries.loading;
  const hasError =
    nowPlayingMovies.error ||
    onTheAirSeries.error ||
    popularMovies.error ||
    popularSeries.error;

  return {
    // Data
    featuredContent,
    featuredMovies,
    featuredSeries,
    popularMovies: popularMoviesData,
    popularSeries: popularSeriesData,

    // State
    loading: isLoading,
    error: hasError,

    // Individual section states
    sections: {
      nowPlayingMovies,
      onTheAirSeries,
      popularMovies,
      popularSeries,
    },
  };
}
