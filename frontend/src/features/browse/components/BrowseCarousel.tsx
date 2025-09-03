"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { DisplayContentItem, BrowseCarouselProps } from "../types";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function BrowseCarousel({
  title,
  items,
  loading,
  error,
  showBadge = false,
  badgeText,
  badgeVariant = "default",
}: BrowseCarouselProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h3" className="text-foreground">
            {title}
          </Typography>
          {showBadge && badgeText && (
            <Badge variant={badgeVariant}>{badgeText}</Badge>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Typography variant="h3" className="text-foreground">
          {title}
        </Typography>
        <div className="text-center py-8">
          <Typography variant="muted" className="text-destructive">
            {error}
          </Typography>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="space-y-4">
        <Typography variant="h3" className="text-foreground">
          {title}
        </Typography>
        <div className="text-center py-8">
          <Typography variant="muted">No content available</Typography>
        </div>
      </div>
    );
  }

  const handleItemClick = (item: DisplayContentItem) => {
    const contentType = item.displayType || (item.title ? "movie" : "series");
    const itemId = item.id;

    if (contentType === "movie") {
      router.push(`/movies/${itemId}`);
    } else {
      router.push(`/series/${itemId}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography variant="h3" className="text-foreground">
          {title}
        </Typography>
        {showBadge && badgeText && (
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        )}
      </div>

      {/* Shadcn Carousel with proper responsive sizing */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              <div className="p-1">
                <div
                  className="group cursor-pointer border-2 border-transparent hover:border-primary transition-colors duration-200 rounded-lg"
                  onClick={() => handleItemClick(item)}
                >
                  {/* Poster */}
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted/50">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title || item.name || "Content"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                          {item.displayType === "movie" ? "Movie" : "TV"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
