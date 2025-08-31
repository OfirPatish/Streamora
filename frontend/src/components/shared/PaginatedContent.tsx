"use client";

import { useState, useEffect } from "react";
import { ContentGrid } from "@/components/shared";
import { ListingPageLayout } from "./ListingPageLayout";
import { usePreloadedContent } from "@/hooks/usePreloadedContent";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { Movie, Series } from "@/features/home/types";
import { MOVIE_FILTERS, SERIES_FILTERS, MovieFilter, SeriesFilter, ContentType } from "@/lib/constants";

// ============================================================================
// TRANSFORM FUNCTIONS
// ============================================================================

// Transform function to convert Movie data to ContentGrid format
function transformMovieData(movies?: Movie[]): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
}> {
  if (!movies) return [];

  return movies.map((movie, index) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A",
    genre: "Movie",
    type: "movie" as const,
    index,
    rating: movie.vote_average,
    isNew: false,
    posterPath: movie.poster_path,
  }));
}

// Transform function to convert Series data to ContentGrid format
function transformSeriesData(series?: Series[]): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
}> {
  if (!series) return [];

  return series.map((show, index) => ({
    id: show.id,
    title: show.name,
    year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : "N/A",
    genre: "TV Show",
    type: "series" as const,
    index,
    rating: show.vote_average,
    isNew: false,
    posterPath: show.poster_path,
  }));
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface PaginatedContentSectionProps {
  type: ContentType;
  className?: string;
  initialData?: any[];
  totalResults?: number;
  totalPages?: number;
  loading?: boolean;
  error?: string | null;
}

export function PaginatedContentSection({
  type,
  className = "",
  initialData,
  totalResults: serverTotalResults,
  totalPages: serverTotalPages,
  loading: serverLoading,
  error: serverError,
}: PaginatedContentSectionProps) {
  const [activeFilter, setActiveFilter] = useState<MovieFilter | SeriesFilter>("popular");

  // Get appropriate filters based on content type
  const filters = type === "movie" ? MOVIE_FILTERS : SERIES_FILTERS;

  // Always use the hook for pagination functionality, but merge with server data for initial popular filter
  const hookResult = usePreloadedContent({
    type,
    activeFilter,
  });

  // For popular filter with server data, merge server data with hook data
  const hasServerData = initialData && activeFilter === "popular";

  // For server-side rendering, always use server data initially to prevent hydration mismatches
  // Only switch to hook data after the component has mounted (client-side)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use server data initially, then switch to hook data after hydration
  const items = hasServerData && !isClient ? initialData || [] : hookResult.items || [];

  // For server-side rendering, we need to ensure consistent loading state
  // If we have server data and the hook hasn't loaded yet, don't show loading
  const loading = hasServerData ? false : hookResult.loading;
  const loadingMore = hookResult.loadingMore;
  const error = hookResult.error || serverError;

  // Ensure consistent hasMore state to prevent hydration mismatches
  const hasMore = hasServerData && !isClient ? false : hookResult.hasMore;
  const loadMore = hookResult.loadMore;
  const totalResults = hookResult.totalResults || serverTotalResults || 0;

  // Setup infinite scroll
  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: loadMore || (() => {}),
    hasMore: hasMore || false,
    loading: loadingMore || false,
    threshold: 300,
  });

  // Transform data for ContentGrid based on type
  const transformedItems =
    type === "movie" ? transformMovieData(items as Movie[]) : transformSeriesData(items as Series[]);

  // Handle filter change
  const handleFilterChange = (filterKey: MovieFilter | SeriesFilter) => {
    if (filterKey !== activeFilter) {
      setActiveFilter(filterKey);
    }
  };

  // Error state
  if (error) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-xl p-8 border border-destructive/20">
          <div className="text-destructive mb-4 text-lg font-medium">
            Failed to load {type === "movie" ? "movies" : "TV shows"}
          </div>
          <div className="text-muted-foreground mb-6">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-background/50 hover:bg-background/80 border-2 border-border/50 hover:border-primary/50 rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ListingPageLayout
      type={type}
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      totalResults={totalResults}
      loading={loading}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
      className={className}
    >
      {/* Content Grid */}
      <ContentGrid items={transformedItems} />

      {/* Infinite Scroll Trigger */}
      <div ref={scrollTriggerRef} className="h-4" />
    </ListingPageLayout>
  );
}

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

// Convenience component for movies
export function MoviesContent() {
  return <PaginatedContentSection type="movie" />;
}

// Convenience component for series
export function SeriesContent() {
  return <PaginatedContentSection type="series" />;
}
