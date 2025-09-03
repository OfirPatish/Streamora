"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTMDBImageUrl } from "@/lib/api";
import Link from "next/link";

interface FeaturedContent {
  id: number;
  title: string;
  overview?: string;
  description?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  type: "movie" | "series";
}

interface HeroBannerProps {
  featuredContent: FeaturedContent[];
}

export function HeroBanner({ featuredContent }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate featured content every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying || !featuredContent.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredContent.length]);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    setIsAutoPlaying(false);
  };

  if (!featuredContent.length) return null;

  const currentContent = featuredContent[currentIndex];
  const backdropUrl = getTMDBImageUrl(
    currentContent.backdrop_path || currentContent.poster_path || null,
    "backdrop",
    "original"
  );
  const href = currentContent.type === "movie" ? `/movies/${currentContent.id}` : `/series/${currentContent.id}`;

  // Truncate description for better display
  const truncateDescription = (description: string | undefined, maxLength: number = 200) => {
    if (!description || description.length <= maxLength) return description || "";
    return description.substring(0, maxLength).trim() + "...";
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-2xl mb-12">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <img src={backdropUrl} alt={currentContent.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-4xl">
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">{currentContent.title}</h1>

            {/* Synopsis */}
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              {truncateDescription(currentContent.overview || currentContent.description)}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center">
              <Link href={href}>
                <Button
                  size="lg"
                  variant="default"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 h-14"
                >
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  Play Now
                </Button>
              </Link>

              {/* Add to Watchlist Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {featuredContent.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="h-12 w-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <ChevronLeft className="h-6 w-6" />
            </div>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="h-12 w-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <ChevronRight className="h-6 w-6" />
            </div>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndexChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-600 scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
