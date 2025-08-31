"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, Star, Calendar, Play, Grid3X3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieFilter, SeriesFilter } from "@/lib/constants";

// ============================================================================
// INTERFACES
// ============================================================================

interface FilterOption {
  key: MovieFilter | SeriesFilter;
  label: string;
  endpoint: string;
  icon?: ReactNode;
  description?: string;
}

interface ListingPageLayoutProps {
  // Content type for display purposes
  type: "movie" | "series";

  // Filter configuration
  filters: FilterOption[];
  activeFilter: MovieFilter | SeriesFilter;
  onFilterChange: (filter: MovieFilter | SeriesFilter) => void;

  // Content data
  children: ReactNode;

  // Status information
  totalResults?: number;
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;

  // Layout options
  className?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ListingPageLayout({
  type,
  filters,
  activeFilter,
  onFilterChange,
  children,
  totalResults = 0,
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  className = "",
}: ListingPageLayoutProps) {
  const currentFilter = filters.find((filter) => filter.key === activeFilter);
  const contentType = type === "movie" ? "movies" : "TV shows";

  // Get filter icon based on filter type
  const getFilterIcon = (filterKey: string) => {
    switch (filterKey) {
      case "popular":
        return <TrendingUp className="h-4 w-4" />;
      case "top-rated":
        return <Star className="h-4 w-4" />;
      case "now-playing":
      case "on-the-air":
        return <Play className="h-4 w-4" />;
      case "upcoming":
      case "airing-today":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Grid3X3 className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Compact Hero Section */}
      <div className="px-6 py-8 lg:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Title & Filter Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  type === "movie"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                    : "bg-gradient-to-br from-emerald-500 to-teal-600"
                }`}
              >
                <span className="text-lg">{type === "movie" ? "🎬" : "📺"}</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {type === "movie" ? "Movies" : "TV Shows"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {totalResults > 0 ? `${totalResults.toLocaleString()} titles` : "Browse categories"}
                </p>
              </div>
            </div>

            {/* Active Filter Badge */}
            <Badge
              variant="secondary"
              className="px-3 py-1.5 bg-primary/10 text-primary border-primary/20 text-sm font-medium w-fit"
            >
              {currentFilter?.label}
            </Badge>
          </div>

          {/* Compact Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => {
              const isActive = filter.key === activeFilter;

              return (
                <button
                  key={filter.key}
                  onClick={() => onFilterChange(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-6 py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-muted-foreground font-medium">Loading {contentType}...</span>
              </div>
            </div>
          )}

          {/* Content Grid */}
          {!loading && children}

          {/* Load More Section */}
          {hasMore && !loadingMore && onLoadMore && (
            <div className="flex justify-center pt-8">
              <Button
                onClick={onLoadMore}
                variant="outline"
                size="lg"
                className="bg-background hover:bg-muted border-border hover:border-primary/50 transition-all duration-200 px-8 py-3 text-base font-medium rounded-lg"
              >
                Load More
              </Button>
            </div>
          )}

          {/* Loading More State */}
          {loadingMore && (
            <div className="flex justify-center pt-8">
              <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-6 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-muted-foreground font-medium text-sm">Loading more...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
