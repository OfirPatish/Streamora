import { MovieCard } from "./MovieCard";
import { Skeleton, MovieCardSkeleton } from "./Skeleton";
import { SectionTitle, Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ContentCarouselProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    year: string;
    genre: string;
    type: "movie" | "series";
    index: number;
    rating?: number;
    isNew?: boolean;
    posterPath?: string | null;
  }>;
  showViewAll?: boolean;
  viewAllUrl?: string; // Add explicit URL prop
  loading?: boolean;
  error?: string | null;
  // Pagination support
  enablePagination?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

export function ContentCarousel({
  title,
  items,
  showViewAll = true,
  viewAllUrl,
  loading = false,
  error = null,
  enablePagination = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: ContentCarouselProps) {
  // Auto-determine URL based on content type if not explicitly provided
  const getViewAllUrl = () => {
    if (viewAllUrl) return viewAllUrl;

    // Try to determine from first item's type
    const firstItem = items[0];
    if (!firstItem) return "/";

    return firstItem.type === "movie" ? "/movies" : "/series";
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 px-8">
        <SectionTitle className="mb-0">{title}</SectionTitle>
        {showViewAll && (
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

      {/* Error State */}
      {error && (
        <div className="px-8">
          <div className="flex items-center justify-center py-8">
            <Typography variant="muted" className="text-destructive">
              Failed to load {title.toLowerCase()}: {error}
            </Typography>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="relative w-full px-8">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 8 }, (_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
                >
                  <MovieCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              size="icon"
              className="!absolute !left-4 md:!left-8 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-4 md:!right-8 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
          </Carousel>
        </div>
      )}

      {/* Content State */}
      {!loading && !error && (
        <div className="relative w-full px-8">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
                >
                  <MovieCard
                    id={item.id}
                    title={item.title}
                    year={item.year}
                    genre={item.genre}
                    type={item.type}
                    index={item.index}
                    rating={item.rating}
                    isNew={item.isNew}
                    posterPath={item.posterPath}
                    priority={index < 3} // Prioritize first 3 visible cards for LCP
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              size="icon"
              className="!absolute !left-4 md:!left-8 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-4 md:!right-8 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
          </Carousel>
        </div>
      )}

      {/* Load More Button - Only show if pagination is enabled and there's more content */}
      {enablePagination && !loading && !error && hasMore && (
        <div className="flex justify-center mt-6 px-8">
          <Button onClick={onLoadMore} disabled={loadingMore} variant="outline" className="flex items-center gap-2">
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading more...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Loading More State - Show additional skeletons */}
      {loadingMore && (
        <div className="relative w-full px-8 mt-4">
          <Carousel
            opts={{
              align: "start",
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 4 }, (_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
                >
                  <MovieCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
