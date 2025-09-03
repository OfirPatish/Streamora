"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";
import { HeroBannerProps } from "../types";

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

  if (!featuredContent.length) return null;

  const currentContent = featuredContent[currentIndex];
  const backdropUrl = getTMDBImageUrl(
    currentContent.backdrop_path || currentContent.poster_path || null,
    "backdrop",
    "original"
  );
  const href =
    currentContent.displayType === "movie"
      ? `/movies/${currentContent.id}`
      : `/series/${currentContent.id}`;

  // Truncate description for better display
  const truncateDescription = (
    description: string | undefined,
    maxLength: number = 200
  ) => {
    if (!description || description.length <= maxLength)
      return description || "";
    return description.substring(0, maxLength).trim() + "...";
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-2xl mb-12">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={
              currentContent.displayTitle ||
              currentContent.title ||
              currentContent.name ||
              "Content"
            }
            className="w-full h-full object-cover"
          />
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
              {currentContent.displayTitle ||
                currentContent.title ||
                currentContent.name}
            </h1>

            {/* Synopsis */}
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              {truncateDescription(currentContent.overview)}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center">
              <Link href={href}>
                <Button
                  size="lg"
                  variant="default"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Play Now
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-red-500 w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
