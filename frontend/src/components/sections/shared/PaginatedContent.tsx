"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ContentGrid } from "@/components/sections/shared";
import { usePaginatedContent } from "@/hooks/api/usePaginatedContent";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { Movie, Series } from "@/types/api";
import { MovieCardSkeleton } from "@/components/ui/skeletons/Skeleton";
import { Loader2 } from "lucide-react";

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
// FILTER CONFIGURATIONS
// ============================================================================

const MOVIE_FILTERS = [
  {
    key: "popular" as const,
    label: "Popular",
    endpoint: "/movies/popular",
  },
  {
    key: "top-rated" as const,
    label: "Top Rated",
    endpoint: "/movies/top-rated",
  },
  {
    key: "now-playing" as const,
    label: "Now Playing",
    endpoint: "/movies/now-playing",
  },
  {
    key: "upcoming" as const,
    label: "Coming Soon",
    endpoint: "/movies/upcoming",
  },
];

const SERIES_FILTERS = [
  {
    key: "popular" as const,
    label: "Popular",
    endpoint: "/series/popular",
  },
  {
    key: "airing-today" as const,
    label: "Airing Today",
    endpoint: "/series/airing-today",
  },
  {
    key: "on-the-air" as const,
    label: "On The Air",
    endpoint: "/series/on-the-air",
  },
  {
    key: "top-rated" as const,
    label: "Top Rated",
    endpoint: "/series/top-rated",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

type ContentType = "movie" | "series";
type MovieFilter = (typeof MOVIE_FILTERS)[number]["key"];
type SeriesFilter = (typeof SERIES_FILTERS)[number]["key"];

interface PaginatedContentSectionProps {
  type: ContentType;
  className?: string;
}

export function PaginatedContentSection({ type, className = "" }: PaginatedContentSectionProps) {
  const [activeFilter, setActiveFilter] = useState<MovieFilter | SeriesFilter>("popular");

  // Get appropriate filters based on content type
  const filters = type === "movie" ? MOVIE_FILTERS : SERIES_FILTERS;

  // Get current filter config
  const currentFilter = filters.find((filter) => filter.key === activeFilter);

  // Use modern paginated content for current filter
  const { items, loading, loadingMore, showLoadingSkeleton, error, hasMore, loadMore, totalResults } =
    usePaginatedContent<Movie | Series>({
      endpoint: currentFilter?.endpoint || (type === "movie" ? "/movies/popular" : "/series/popular"),
      enabled: true,
    });

  // Setup infinite scroll
  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
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

  // Loading state
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div key={filter.key} className="h-10 w-24 bg-muted rounded-md animate-pulse" />
          ))}
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-destructive mb-4">Failed to load {type === "movie" ? "movies" : "TV shows"}</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.div key={filter.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(filter.key)}
              className="transition-all duration-200"
            >
              {filter.label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Results Count */}
      {totalResults > 0 && (
        <div className="text-sm text-muted-foreground">
          {totalResults.toLocaleString()} {type === "movie" ? "movies" : "TV shows"} found
        </div>
      )}

      {/* Content Grid */}
      <ContentGrid items={transformedItems} />

      {/* Loading More Indicator */}
      {showLoadingSkeleton && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loadingMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More
          </Button>
        </div>
      )}

      {/* Loading More Spinner */}
      {loadingMore && (
        <div className="flex justify-center pt-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading more...</span>
          </div>
        </div>
      )}

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
