"use client";

import { useState, useEffect } from "react";
import { usePopularMovies, useTopRatedMovies, usePopularSeries, useTopRatedSeries } from "@/hooks/useGlobalData";
import { Movie } from "@/components/features/movies/hooks/useMovies";
import { Series } from "@/components/features/series/hooks/useSeries";
import { FeaturedContent } from "@/types/hero";

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
    genre: movie.genres?.map((g) => g.name) || ["Movie"],
    rating: movie.vote_average || 0,
    runtime: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Runtime TBA",
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
    genre: series.genres?.map((g) => g.name) || ["Series"],
    rating: series.vote_average || 0,
    runtime: series.number_of_seasons
      ? `${series.number_of_seasons} Season${series.number_of_seasons !== 1 ? "s" : ""}`
      : "Seasons TBA",
    type: "series",
    isNew: new Date(series.first_air_date).getFullYear() === new Date().getFullYear(),
    isTrending: series.vote_average >= 8.0,
    backdrop_path: series.backdrop_path,
    poster_path: series.poster_path,
  };
}

export function useFeaturedContent() {
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from multiple endpoints
  const { data: popularMovies, loading: loadingPopularMovies, error: errorPopularMovies } = usePopularMovies();
  const { data: topRatedMovies, loading: loadingTopRatedMovies, error: errorTopRatedMovies } = useTopRatedMovies();
  const { data: popularSeries, loading: loadingPopularSeries, error: errorPopularSeries } = usePopularSeries();
  const { data: topRatedSeries, loading: loadingTopRatedSeries, error: errorTopRatedSeries } = useTopRatedSeries();

  useEffect(() => {
    // Wait for all data to load
    const allLoading = loadingPopularMovies || loadingTopRatedMovies || loadingPopularSeries || loadingTopRatedSeries;
    const anyError = errorPopularMovies || errorTopRatedMovies || errorPopularSeries || errorTopRatedSeries;

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
      const featured: FeaturedContent[] = [];

      // Get top movies (high rated and popular)
      if (topRatedMovies?.results) {
        const topMovies = topRatedMovies.results
          .filter((movie) => movie.vote_average >= 7.5 && movie.backdrop_path) // High quality with backdrop
          .slice(0, 3) // Take top 3
          .map(transformMovieToFeatured);
        featured.push(...topMovies);
      }

      // Get top series (high rated and popular)
      if (topRatedSeries?.results) {
        const topSeries = topRatedSeries.results
          .filter((series) => series.vote_average >= 7.5 && series.backdrop_path) // High quality with backdrop
          .slice(0, 2) // Take top 2
          .map(transformSeriesToFeatured);
        featured.push(...topSeries);
      }

      // Add some popular content if we don't have enough
      if (featured.length < 5) {
        if (popularMovies?.results) {
          const additionalMovies = popularMovies.results
            .filter((movie) => movie.backdrop_path && !featured.some((f) => f.id === movie.id && f.type === "movie"))
            .slice(0, 5 - featured.length)
            .map(transformMovieToFeatured);
          featured.push(...additionalMovies);
        }
      }

      // Shuffle the array for variety
      const shuffled = featured.sort(() => Math.random() - 0.5);

      setFeaturedContent(shuffled.slice(0, 5)); // Limit to 5 items
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process featured content");
    } finally {
      setLoading(false);
    }
  }, [
    popularMovies,
    topRatedMovies,
    popularSeries,
    topRatedSeries,
    loadingPopularMovies,
    loadingTopRatedMovies,
    loadingPopularSeries,
    loadingTopRatedSeries,
    errorPopularMovies,
    errorTopRatedMovies,
    errorPopularSeries,
    errorTopRatedSeries,
  ]);

  return {
    featuredContent,
    loading,
    error,
  };
}
