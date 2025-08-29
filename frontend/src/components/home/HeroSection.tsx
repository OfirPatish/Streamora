"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useFeaturedContent } from "@/hooks/api/useFeaturedContent";
import { CarouselControls } from "./CarouselControls";
import { getTMDBImageUrl } from "@/lib/api";
import { SplitScreenHeroSkeleton, MobileHeroCardSkeleton } from "@/components/common/Skeleton";
import { useSplitScreen } from "@/hooks/ui/useSplitScreen";
import { SplitScreenPanel } from "./SplitScreenPanel";
import { MobileHeroCard } from "./MobileHeroCard";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Fetch real featured content using our caching system
  const { featuredContent, topMovie, topSeries, loading, error } = useFeaturedContent();

  // Split screen animation logic
  const { hoveredSide, leftWidth, rightWidth, leftX, rightX, leftScale, rightScale, handleHoverStart, handleHoverEnd } =
    useSplitScreen();

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

  const handleAutoPlayToggle = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Show loading state
  if (loading) {
    return (
      <>
        {/* Content Loading Skeletons */}
        <MobileHeroCardSkeleton />
        <SplitScreenHeroSkeleton />
      </>
    );
  }

  // Show error state
  if (error || (!topMovie && !topSeries)) {
    return (
      <>
        {/* Mobile Error */}
        <section className="sm:hidden w-full py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-foreground text-sm">Unable to load featured content</div>
            </div>
          </div>
        </section>
        {/* Desktop Error */}
        <section className="hidden sm:block w-full py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-foreground text-lg sm:text-xl">Unable to load featured content</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const movieBackdropUrl = topMovie ? getTMDBImageUrl(topMovie.backdrop_path || null, "backdrop", "large") : null;
  const seriesBackdropUrl = topSeries ? getTMDBImageUrl(topSeries.backdrop_path || null, "backdrop", "large") : null;

  return (
    <>
      {/* Mobile Hero Card */}
      <MobileHeroCard content={topMovie} backdropUrl={movieBackdropUrl} />

      {/* Desktop Split-Screen Hero Section */}
      <section className="hidden sm:block w-full -mt-16">
        <div className="relative w-full h-screen overflow-hidden bg-muted shadow-2xl">
          {/* Overall fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10" />
          {/* Left Side - #1 Movie */}
          <SplitScreenPanel
            content={topMovie}
            backdropUrl={movieBackdropUrl}
            side="left"
            hoveredSide={hoveredSide}
            width={leftWidth}
            x={leftX}
            scale={leftScale}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />

          {/* Right Side - #1 Series */}
          <SplitScreenPanel
            content={topSeries}
            backdropUrl={seriesBackdropUrl}
            side="right"
            hoveredSide={hoveredSide}
            width={rightWidth}
            x={rightX}
            scale={rightScale}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />

          {/* Carousel Controls */}
          <CarouselControls
            totalItems={featuredContent.length}
            currentIndex={currentIndex}
            onIndexChange={handleIndexChange}
            onAutoPlayToggle={handleAutoPlayToggle}
            isAutoPlaying={isAutoPlaying}
          />
        </div>
      </section>
    </>
  );
}
