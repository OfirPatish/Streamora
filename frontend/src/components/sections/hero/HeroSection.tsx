"use client";

import { useState, useEffect } from "react";
import { featuredContent } from "./featuredData";
import { HeroContent } from "./HeroContent";
import { HeroCarouselControls } from "./HeroCarouselControls";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate featured content every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentContent = featuredContent[currentIndex];

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleAutoPlayToggle = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="w-full px-6 py-8">
      <div className="relative w-full h-[70vh] min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Pattern */}
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
