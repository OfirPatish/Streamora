import { MovieCard } from "../cards/MovieCard";
import { MovieCardSkeleton } from "../skeletons/MovieCardSkeleton";
import { SectionTitle, Typography } from "@/components/ui/typography";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ContentCarouselProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    year: string;
    genre: string;
    type: "movie" | "series";
    poster_path?: string | null;
    vote_average?: number;
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
          <button className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-200 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 hover:shadow-lg">
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
            <Typography variant="muted" className="text-red-400">
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
              {Array.from({ length: 6 }, (_, index) => (
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
              className="!absolute !left-1 sm:!left-2 md:!left-4 !size-10 sm:!size-12 md:!size-14 !bg-gray-800/80 hover:!bg-gray-700 !text-gray-200 !border !border-gray-600 !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-1 sm:!right-2 md:!right-4 !size-10 sm:!size-12 md:!size-14 !bg-gray-800/80 hover:!bg-gray-700 !text-gray-200 !border !border-gray-600 !rounded-full"
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
                    year={item.year}
                    genre={item.genre}
                    type={item.type}
                    index={index}
                    posterPath={item.poster_path}
                    rating={item.vote_average}
                    priority={index < 3} // Prioritize first 3 visible cards for LCP
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              size="icon"
              className="!absolute !left-1 sm:!left-2 md:!left-4 !size-10 sm:!size-12 md:!size-14 !bg-gray-800/80 hover:!bg-gray-700 !text-gray-200 !border !border-gray-600 !rounded-full"
            />
            <CarouselNext
              size="icon"
              className="!absolute !right-1 sm:!right-2 md:!right-4 !size-10 sm:!size-12 md:!size-14 !bg-gray-800/80 hover:!bg-gray-700 !text-gray-200 !border !border-gray-600 !rounded-full"
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
