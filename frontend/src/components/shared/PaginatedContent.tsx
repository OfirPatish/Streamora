"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ContentGrid } from "@/components/shared";
import { usePreloadedContent } from "@/hooks/usePreloadedContent";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { Movie, Series } from "@/features/home/types";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MOVIE_FILTERS,
  SERIES_FILTERS,
  MovieFilter,
  SeriesFilter,
  ContentType,
} from "@/lib/constants";

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
    year: movie.release_date
      ? new Date(movie.release_date).getFullYear().toString()
      : "N/A",
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
    year: show.first_air_date
      ? new Date(show.first_air_date).getFullYear().toString()
      : "N/A",
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
  const [activeFilter, setActiveFilter] = useState<MovieFilter | SeriesFilter>(
    "popular"
  );

  // Get appropriate filters based on content type
  const filters = type === "movie" ? MOVIE_FILTERS : SERIES_FILTERS;

  // Get current filter config
  const currentFilter = filters.find((filter) => filter.key === activeFilter);

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
  const items =
    hasServerData && !isClient ? initialData || [] : hookResult.items || [];

  // For server-side rendering, we need to ensure consistent loading state
  // If we have server data and the hook hasn't loaded yet, don't show loading
  const loading = hasServerData ? false : hookResult.loading;
  const loadingMore = hookResult.loadingMore;
  const showLoadingSkeleton = hookResult.showLoadingSkeleton;
  const error = hookResult.error || serverError;

  // Ensure consistent hasMore state to prevent hydration mismatches
  const hasMore = hasServerData && !isClient ? false : hookResult.hasMore;
  const loadMore = hookResult.loadMore;
  const totalResults = hookResult.totalResults || serverTotalResults || 0;
  const preloadedFilters = hookResult.preloadedFilters;

  // Setup infinite scroll
  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: loadMore || (() => {}),
    hasMore: hasMore || false,
    loading: loadingMore || false,
    threshold: 300,
  });

  // Transform data for ContentGrid based on type
  const transformedItems =
    type === "movie"
      ? transformMovieData(items as Movie[])
      : transformSeriesData(items as Series[]);

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
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="bg-background/50 hover:bg-background/80 border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Enhanced Filter Section */}
      <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-xl p-6 border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Filter Select */}
          <Select value={activeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.key} value={filter.key}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter Status & Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Showing:</span>
              <span className="font-medium text-foreground">
                {filters.find((f) => f.key === activeFilter)?.label}
              </span>
            </div>
            {totalResults > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {totalResults.toLocaleString()}{" "}
                  {type === "movie" ? "movies" : "TV shows"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-6">
        <ContentGrid items={transformedItems} />

        {/* Load More Button */}
        {hasMore && !loadingMore && (
          <div className="flex justify-center pt-6">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="bg-background/50 hover:bg-background/80 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More
            </Button>
          </div>
        )}

        {/* Loading More Spinner */}
        {loadingMore && (
          <div className="flex justify-center pt-6">
            <div className="flex items-center gap-3 bg-muted/30 rounded-lg px-6 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground font-medium">
                Loading more content...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={scrollTriggerRef} className="h-4" />
    </div>
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
