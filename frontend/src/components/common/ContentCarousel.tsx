import { MovieCard } from "./MovieCard";
import { Skeleton } from "./Skeleton";
import { SectionTitle, Typography } from "@/components/ui/typography";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ContentCarouselProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    type: "movie" | "series";
    poster_path?: string | null;
  }>;
  showViewAll?: boolean;
  loading?: boolean;
  error?: string | null;
}

export function ContentCarousel({
  title,
  items,
  showViewAll = true,
  loading = false,
  error = null,
}: ContentCarouselProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 px-4">
        <SectionTitle className="mb-0">{title}</SectionTitle>
        {showViewAll && !loading && !error && (
          <button className="group flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-border/80 rounded-lg transition-all duration-300 hover:shadow-lg">
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
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="px-4">
          <div className="flex items-center justify-center py-8">
            <Typography variant="muted" className="text-destructive">
              Failed to load {title.toLowerCase()}: {error}
            </Typography>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="relative w-full px-4">
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
                  <Skeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              size="icon"
              className="!absolute !left-1 sm:!left-2 md:!left-4 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-1 sm:!right-2 md:!right-4 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
          </Carousel>
        </div>
      )}

      {/* Content State */}
      {!loading && !error && (
        <div className="relative w-full px-4">
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
                    year=""
                    genre=""
                    type={item.type}
                    index={index}
                    posterPath={item.poster_path}
                    priority={index < 3} // Prioritize first 3 visible cards for LCP
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              size="icon"
              className="!absolute !left-1 sm:!left-2 md:!left-4 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-1 sm:!right-2 md:!right-4 !size-10 sm:!size-12 md:!size-14 !bg-muted/80 hover:!bg-muted !text-muted-foreground !border !border-border !rounded-full"
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
