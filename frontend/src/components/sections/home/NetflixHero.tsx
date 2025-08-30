"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useFeaturedContent } from "@/hooks/api/useHeroQueries";
import { getTMDBImageUrl } from "@/lib/api";
import { FeaturedContent } from "@/types/content";
import { Play, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface NetflixHeroProps {
  autoPlay?: boolean;
  showControls?: boolean;
}

export function NetflixHero({ autoPlay = true, showControls = true }: NetflixHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const { featuredContent, topMovie, topSeries, loading, error } = useFeaturedContent();

  // Combine movies and series for rotation
  const allContent = [...featuredContent.movies, ...featuredContent.series];

  // Auto-rotate featured content every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying || !allContent.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, allContent.length]);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Standardize description length
  const truncateDescription = (description: string, maxLength: number = 200) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-muted animate-pulse -mt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl">
            <div className="h-8 w-64 bg-muted/50 rounded mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-muted/50 rounded mb-6 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-muted/50 rounded animate-pulse" />
              <div className="h-12 w-32 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !allContent.length) {
    return (
      <div className="relative w-full h-screen bg-muted -mt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl">
            <div className="text-destructive mb-4">Unable to load featured content</div>
          </div>
        </div>
      </div>
    );
  }

  const currentContent = allContent[currentIndex];
  const backdropUrl = getTMDBImageUrl(currentContent.backdrop_path || null, "backdrop", "large");
  const href = currentContent.type === "movie" ? `/movies/${currentContent.id}` : `/series/${currentContent.id}`;

  return (
    <section className="relative w-full h-screen overflow-hidden -mt-16">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <img src={backdropUrl} alt={currentContent.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl">
          <motion.div
            key={currentContent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">{currentContent.title}</h1>

            {/* Rating Badge */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{currentContent.rating?.toFixed(1)}</span>
              </div>
              <Badge variant="destructive">TOP 10</Badge>
              <span className="text-white/80 text-sm">
                #{currentIndex + 1} in {currentContent.type === "movie" ? "Movies" : "TV Shows"} Today
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              {truncateDescription(currentContent.description)}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={href}>
                <Button size="lg" variant="default">
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  Play Trailer
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Watchlist
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && allContent.length > 1 && (
        <div className="absolute bottom-8 right-8 flex gap-2">
          {allContent.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndexChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
