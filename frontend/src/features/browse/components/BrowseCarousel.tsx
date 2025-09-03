"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MediaCard } from "./MediaCard";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

interface BrowseCarouselProps {
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
    description?: string;
    viewCount?: number;
    duration?: string;
    releaseDate?: string;
    episodeCount?: number;
  }>;
  loading?: boolean;
  error?: string | null;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export function BrowseCarousel({
  title,
  items,
  loading = false,
  error,
  showBadge = false,
  badgeText,
  badgeVariant = "default",
}: BrowseCarouselProps) {
  if (loading) {
    return (
      <section className="w-full py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Typography variant="h2" className="text-2xl font-bold">
              {title}
            </Typography>
            {showBadge && badgeText && (
              <Badge variant={badgeVariant} className="text-xs">
                {badgeText}
              </Badge>
            )}
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex-shrink-0 w-48 aspect-[2/3] bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <Typography variant="h2" className="text-2xl font-bold mb-4">
            {title}
          </Typography>
          <div className="text-center py-8 text-muted-foreground">
            <p>Failed to load content</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="w-full py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <Typography variant="h2" className="text-2xl font-bold mb-4">
            {title}
          </Typography>
          <div className="text-center py-8 text-muted-foreground">
            <p>No content available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Title with optional badge */}
        <div className="flex items-center gap-3 mb-6">
          <Typography variant="h2" className="text-2xl font-bold">
            {title}
          </Typography>
          {showBadge && badgeText && (
            <Badge variant={badgeVariant} className="text-xs">
              {badgeText}
            </Badge>
          )}
        </div>

        {/* Carousel - Show exactly 5 items initially, but allow scrolling through all */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/5 min-w-[200px] max-w-[200px]">
                <div className="w-full">
                  <MediaCard
                    id={item.id}
                    title={item.title}
                    year={item.year}
                    genre={item.genre}
                    type={item.type}
                    index={item.index}
                    rating={item.rating}
                    isNew={item.isNew}
                    posterPath={item.posterPath}
                    description={item.description}
                    priority={index === 0}
                    viewCount={item.viewCount}
                    duration={item.duration}
                    releaseDate={item.releaseDate}
                    episodeCount={item.episodeCount}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm" />
          <CarouselNext className="right-2 bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm" />
        </Carousel>
      </div>
    </section>
  );
}
