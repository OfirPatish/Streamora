"use client";

import { ContentCard } from "./ContentCard";
import { ContentCardSkeleton } from "@/components/ui/skeletons/Skeleton";
import { SectionTitle, Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// ============================================================================
// INTERFACES
// ============================================================================

interface ContentItem {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
}

interface ContentDisplayProps {
  title?: string;
  items: ContentItem[];
  layout?: "grid" | "carousel";
  showViewAll?: boolean;
  viewAllUrl?: string;
  loading?: boolean;
  error?: string | null;
  // Pagination support (for grid layout)
  enablePagination?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ContentDisplay({
  title,
  items,
  layout = "grid",
  showViewAll = true,
  viewAllUrl,
  loading = false,
  error = null,
  enablePagination = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: ContentDisplayProps) {
  // Auto-determine URL based on content type if not explicitly provided
  const getViewAllUrl = () => {
    if (viewAllUrl) return viewAllUrl;

    // Try to determine from first item's type
    const firstItem = items[0];
    if (!firstItem) return "/";

    return firstItem.type === "movie" ? "/movies" : "/series";
  };

  // Render header with title and view all button
  const renderHeader = () => {
    if (!title) return null;

    return (
      <div className={`flex items-center justify-between mb-6 ${layout === "carousel" ? "px-8" : ""}`}>
        <SectionTitle className="mb-0">{title}</SectionTitle>
        {showViewAll && !loading && !error && (
          <Link href={getViewAllUrl()}>
            <button
              className="group flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-border/80 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Boolean(loading || error)}
            >
              <span className="font-medium">View All</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        )}
      </div>
    );
  };

  // Render error state
  const renderError = () => {
    if (!error) return null;

    const containerClass = layout === "carousel" ? "" : "";
    const contentClass =
      layout === "carousel"
        ? "flex items-center justify-center py-8"
        : "col-span-full flex items-center justify-center py-8";

    return (
      <div className={containerClass}>
        <div className={contentClass}>
          <Typography variant="muted" className="text-destructive">
            Failed to load {title?.toLowerCase() || "content"}: {error}
          </Typography>
        </div>
      </div>
    );
  };

  // Render loading state
  const renderLoading = () => {
    if (!loading) return null;

    if (layout === "carousel") {
      return (
        <div className="relative w-full group">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {Array.from({ length: 10 }, (_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <ContentCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12" />
          </Carousel>
        </div>
      );
    }

    return (
      <div className="content-grid">
        {Array.from({ length: 20 }, (_, index) => (
          <ContentCardSkeleton key={index} />
        ))}
      </div>
    );
  };

  // Render content
  const renderContent = () => {
    if (loading || error) return null;

    if (layout === "carousel") {
      return (
        <div className="relative w-full group">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <ContentCard
                    id={item.id}
                    title={item.title}
                    year={item.year}
                    genre={item.genre}
                    type={item.type}
                    index={item.index}
                    rating={item.rating}
                    isNew={item.isNew}
                    posterPath={item.posterPath}
                    priority={index < 6}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12" />
          </Carousel>
        </div>
      );
    }

    return (
      <div className="content-grid">
        {items.map((item, index) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            year={item.year}
            genre={item.genre}
            type={item.type}
            index={item.index}
            rating={item.rating}
            isNew={item.isNew}
            posterPath={item.posterPath}
            priority={index < 6}
          />
        ))}
      </div>
    );
  };

  // Render pagination (grid only)
  const renderPagination = () => {
    if (layout !== "grid" || !enablePagination || !hasMore || loadingMore) return null;

    return (
      <div className="flex justify-center pt-4">
        <Button onClick={onLoadMore} variant="outline" size="lg">
          Load More
        </Button>
      </div>
    );
  };

  // Render loading more indicator (grid only)
  const renderLoadingMore = () => {
    if (layout !== "grid" || !loadingMore) return null;

    return (
      <div className="flex justify-center pt-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading more...</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderHeader()}
      {renderError()}
      {renderLoading()}
      {renderContent()}
      {renderPagination()}
      {renderLoadingMore()}
    </div>
  );
}

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

// Convenience component for grid layout
export function ContentGrid(props: Omit<ContentDisplayProps, "layout">) {
  return <ContentDisplay {...props} layout="grid" />;
}

// Convenience component for carousel layout
export function ContentCarousel(props: Omit<ContentDisplayProps, "layout">) {
  return <ContentDisplay {...props} layout="carousel" />;
}

// Re-export ContentCard for backward compatibility
export { ContentCard } from "./ContentCard";
