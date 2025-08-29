"use client";

import { useState, useEffect } from "react";
import { useFeaturedContent } from "../hooks/useFeaturedContent";
import { HeroContent } from "./HeroContent";
import { HeroCarouselControls } from "./HeroCarouselControls";
import { getTMDBImageUrl } from "@/lib/api";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch real featured content using our caching system
  const { featuredContent, loading, error } = useFeaturedContent();

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
      <section className="w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-white text-lg sm:text-xl">Loading featured content...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || !featuredContent.length) {
    return (
      <section className="w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-white text-lg sm:text-xl">Unable to load featured content</div>
          </div>
        </div>
      </section>
    );
  }

  const currentContent = featuredContent[currentIndex];
  const backdropUrl = getTMDBImageUrl(currentContent.backdrop_path || null, "backdrop", "large");

  return (
    <section className="w-full px-4 sm:px-6 py-4 sm:py-8">
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Dynamic Background Image */}
        {backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10" />

        {/* Content */}
        <HeroContent content={currentContent} />

        {/* Carousel Controls */}
        <HeroCarouselControls
          totalItems={featuredContent.length}
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
          onAutoPlayToggle={handleAutoPlayToggle}
          isAutoPlaying={isAutoPlaying}
        />
      </div>
    </section>
  );
}
