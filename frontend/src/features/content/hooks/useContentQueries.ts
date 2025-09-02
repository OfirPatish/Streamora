"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie, Series } from "@/types/api";
import { PaginatedResponse } from "@/lib/api";
import { FeaturedContent } from "@/types/content";
import { getCacheTimes } from "@/lib/constants";

// API functions for hero section data
async function fetchPopularMovies() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/popular`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch popular movies");
  }

  return result.data as PaginatedResponse<Movie>;
}

async function fetchPopularSeries() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/series/popular`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch popular series");
  }

  return result.data as PaginatedResponse<Series>;
}

// Hero section hook
export function useContentHero() {
  const popularMovies = useQuery({
    queryKey: ["hero", "popular-movies"],
    queryFn: fetchPopularMovies,
    ...getCacheTimes("/movies/popular"),
    retry: 2,
  });

  const popularSeries = useQuery({
    queryKey: ["hero", "popular-series"],
    queryFn: fetchPopularSeries,
    ...getCacheTimes("/series/popular"),
    retry: 2,
  });

  // Transform data for hero section
  const transformToFeaturedContent = (movie: Movie): FeaturedContent => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A",
    genre: ["Movie"], // Basic movies don't have genres, use default
    rating: movie.vote_average,
    runtime: "Movie", // Basic movies don't have runtime, use default
    type: "movie" as const,
    isNew: false,
    isTrending: true,
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
  });

  const transformSeriesToFeaturedContent = (series: Series): FeaturedContent => ({
    id: series.id,
    title: series.name,
    description: series.overview,
    year: series.first_air_date ? new Date(series.first_air_date).getFullYear().toString() : "N/A",
    genre: ["TV Show"], // Basic series don't have genres, use default
    rating: series.vote_average,
    runtime: "TV Series",
    type: "series" as const,
    isNew: false,
    isTrending: true,
    backdrop_path: series.backdrop_path,
    poster_path: series.poster_path,
  });

  const featuredContent = {
    movies: (popularMovies.data?.results?.slice(0, 5) || []).map(transformToFeaturedContent),
    series: (popularSeries.data?.results?.slice(0, 5) || []).map(transformSeriesToFeaturedContent),
  };

  // Get top movie and series for hero
  const topMovie = popularMovies.data?.results?.[0] ? transformToFeaturedContent(popularMovies.data.results[0]) : null;
  const topSeries = popularSeries.data?.results?.[0]
    ? transformSeriesToFeaturedContent(popularSeries.data.results[0])
    : null;

  return {
    featuredContent,
    topMovie,
    topSeries,
    loading: popularMovies.isLoading || popularSeries.isLoading,
    error: popularMovies.error || popularSeries.error,
  };
}
