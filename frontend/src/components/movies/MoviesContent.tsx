"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ContentGrid } from "@/components/common/ContentGrid";
import { usePaginatedContent } from "@/hooks/api/usePaginatedContent";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";
import { Movie } from "@/hooks/api/useMovies";
import { MovieCardSkeleton } from "@/components/common/Skeleton";
import { Loader2 } from "lucide-react";

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

type MovieFilter = "popular" | "top-rated" | "now-playing" | "upcoming";

export function MoviesContent() {
  const [activeFilter, setActiveFilter] = useState<MovieFilter>("popular");

  // Filter configurations with API endpoints
  const filters = [
    {
      key: "popular" as MovieFilter,
      label: "Popular",
      endpoint: "/movies/popular",
    },
    {
      key: "top-rated" as MovieFilter,
      label: "Top Rated",
      endpoint: "/movies/top-rated",
    },
    {
      key: "now-playing" as MovieFilter,
      label: "Now Playing",
      endpoint: "/movies/now-playing",
    },
    {
      key: "upcoming" as MovieFilter,
      label: "Coming Soon",
      endpoint: "/movies/upcoming",
    },
  ];

  // Get current filter config
  const currentFilter = filters.find((filter) => filter.key === activeFilter);

  // Use paginated content for current filter
  const {
    items: movies,
    loading,
    loadingMore,
    showLoadingSkeleton,
    error,
    hasMore,
    loadMore,
    totalResults,
  } = usePaginatedContent<Movie>({
    endpoint: currentFilter?.endpoint || "/movies/popular",
    enabled: true,
  });

  // Setup infinite scroll
  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
    threshold: 300,
  });

  // Transform data for ContentGrid
  const transformedMovies = transformMovieData(movies);

  // Handle filter change
  const handleFilterChange = (filterKey: MovieFilter) => {
    setActiveFilter(filterKey);
    // Reset will happen automatically when endpoint changes
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Header Section */}
      <div className="relative w-full h-[40vh] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center sm:justify-start">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="text-center sm:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6 tracking-tight">
                  🎬 Movies
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl font-medium">
                  Discover amazing movies across different categories
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 flex items-center justify-center sm:justify-start gap-4"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>Streaming Now</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>HD Quality</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Filter Section */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border/50 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by:</span>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(filter.key)}
                  className={`
                     font-medium whitespace-nowrap transition-all duration-200
                     ${activeFilter === filter.key ? "shadow-lg bg-primary text-primary-foreground" : "hover:shadow-md"}
                   `}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid Container */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <ContentGrid items={transformedMovies} loading={loading} error={error} />

        {/* Infinite Scroll Trigger */}
        <div ref={scrollTriggerRef} className="h-10 w-full" />

        {/* Loading More State - Enhanced skeleton with better visual feedback */}
        {showLoadingSkeleton && (
          <div className="mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 18 }, (_, index) => (
                <MovieCardSkeleton key={`loading-more-${index}`} />
              ))}
            </div>

            {/* Enhanced loading indicator */}
            <div className="flex flex-col items-center mt-8 py-6 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-foreground font-medium">Loading more movies...</span>
              </div>
              <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Load More Button (Fallback) */}
        {!loadingMore && hasMore && transformedMovies.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="group flex items-center gap-3 px-8 py-3 bg-background hover:bg-primary hover:text-primary-foreground border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Loader2 className="h-5 w-5 group-hover:animate-spin" />
              <span className="font-medium">Load More Movies</span>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
            </Button>
          </div>
        )}

        {/* Enhanced End Message */}
        {!hasMore && transformedMovies.length > 0 && (
          <div className="text-center mt-12 py-12">
            <div className="max-w-md mx-auto bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-8 border border-border/50">
              <div className="text-4xl mb-4">🎬✨</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">You've explored all movies!</h3>
              <p className="text-muted-foreground">
                You've seen all {transformedMovies.length} movies in this category. Try switching to a different filter
                to discover more!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
