"use client";

import { useState, useEffect } from "react";
import { usePopularMovies, usePopularSeries } from "@/hooks/global/useGlobalData";
import { Movie } from "@/hooks/api/useMovies";
import { Series } from "@/hooks/api/useSeries";
import { FeaturedContent } from "@/types/content";

// Utility function to truncate text
function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;

  // Find the last space before the max length to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) + "..." : truncated + "...";
}

// Transform TMDB Movie to FeaturedContent
function transformMovieToFeatured(movie: Movie): FeaturedContent {
  const description = movie.overview ? truncateText(movie.overview, 150) : "Discover this amazing movie.";

  return {
    id: movie.id,
    title: movie.title,
    description,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "TBA",
    genre: ["Movie"], // Basic type doesn't have genres, use default
    rating: movie.vote_average || 0,
    runtime: "Runtime TBA", // Basic type doesn't have runtime
    type: "movie",
    isNew: new Date(movie.release_date).getFullYear() === new Date().getFullYear(),
    isTrending: movie.vote_average >= 8.0,
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
  };
}

// Transform TMDB Series to FeaturedContent
function transformSeriesToFeatured(series: Series): FeaturedContent {
  const description = series.overview ? truncateText(series.overview, 150) : "Discover this amazing series.";

  return {
    id: series.id,
    title: series.name,
    description,
    year: series.first_air_date ? new Date(series.first_air_date).getFullYear().toString() : "TBA",
    genre: ["Series"], // Basic type doesn't have genres, use default
    rating: series.vote_average || 0,
    runtime: "Seasons TBA", // Basic type doesn't have number_of_seasons
    type: "series",
    isNew: new Date(series.first_air_date).getFullYear() === new Date().getFullYear(),
    isTrending: series.vote_average >= 8.0,
    backdrop_path: series.backdrop_path,
    poster_path: series.poster_path,
  };
}

export function useFeaturedContent() {
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([]);
  const [topMovie, setTopMovie] = useState<FeaturedContent | null>(null);
  const [topSeries, setTopSeries] = useState<FeaturedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from popular endpoints (Popular on Streamora)
  const { data: popularMovies, loading: loadingPopularMovies, error: errorPopularMovies } = usePopularMovies();
  const { data: popularSeries, loading: loadingPopularSeries, error: errorPopularSeries } = usePopularSeries();

  useEffect(() => {
    // Wait for all data to load
    const allLoading = loadingPopularMovies || loadingPopularSeries;
    const anyError = errorPopularMovies || errorPopularSeries;

    if (allLoading) {
      setLoading(true);
      return;
    }

    if (anyError) {
      setError(anyError);
      setLoading(false);
      return;
    }

    try {
      // Get the most popular movie (highest popularity score)
      if (popularMovies?.results && popularMovies.results.length > 0) {
        const topMovieData = popularMovies.results
          .filter((movie) => movie.backdrop_path) // Must have backdrop for hero
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0)) // Sort by popularity
          .slice(0, 1) // Take only the top 1
          .map(transformMovieToFeatured)[0];
        setTopMovie(topMovieData);
      }

      // Get the most popular series (highest popularity score)
      if (popularSeries?.results && popularSeries.results.length > 0) {
        const topSeriesData = popularSeries.results
          .filter((series) => series.backdrop_path) // Must have backdrop for hero
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0)) // Sort by popularity
          .slice(0, 1) // Take only the top 1
          .map(transformSeriesToFeatured)[0];
        setTopSeries(topSeriesData);
      }

      // Keep the original featuredContent for backward compatibility (carousel controls)
      const featured: FeaturedContent[] = [];
      if (topMovie) featured.push(topMovie);
      if (topSeries) featured.push(topSeries);
      setFeaturedContent(featured);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process featured content");
    } finally {
      setLoading(false);
    }
  }, [
    popularMovies,
    popularSeries,
    loadingPopularMovies,
    loadingPopularSeries,
    errorPopularMovies,
    errorPopularSeries,
  ]);

  return {
    featuredContent,
    topMovie,
    topSeries,
    loading,
    error,
  };
}
