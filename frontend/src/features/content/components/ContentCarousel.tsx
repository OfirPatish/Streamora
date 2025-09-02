"use client";

import { useState, useRef, useEffect } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaCard } from "./MediaCard";

interface CarouselProps {
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
  }>;
  loading?: boolean;
  error?: string | null;
}

export function ContentCarousel({
  title,
  items,
  loading = false,
  error,
}: CarouselProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [items]);

  if (loading) {
    return (
      <section className="w-full py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-48 bg-muted/50 rounded mb-4 animate-pulse" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 aspect-[2/3] bg-muted/50 rounded-lg animate-pulse"
              />
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
          <h2 className="text-xl font-bold mb-4">{title}</h2>
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
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>No content available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6 group">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-12 w-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-12 w-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Content */}
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item, index) => (
              <div key={item.id} className="flex-shrink-0 w-48">
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
