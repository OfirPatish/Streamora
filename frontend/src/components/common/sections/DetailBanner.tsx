"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";

interface DetailBannerProps {
  title: string;
  overview?: string;
  backdropPath?: string | null;
  homepage?: string | null;
  videos?: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
}

export function DetailBanner({ title, overview, backdropPath, homepage, videos }: DetailBannerProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  // Find the first YouTube trailer
  const trailer = videos?.find((video) => video.site === "YouTube" && video.type === "Trailer");

  const bannerUrl = backdropPath ? getTMDBImageUrl(backdropPath, "backdrop", "large") : null;

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
        {bannerUrl ? (
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
        )}

        {/* Simple Overlay for Text Readability */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-lg">{title}</h1>

            {overview && (
              <p className="text-foreground/90 text-sm md:text-base mb-6 line-clamp-2 max-w-2xl drop-shadow-md">
                {overview}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {trailer && (
                <Button
                  onClick={() => setShowTrailer(true)}
                  size="lg"
                  className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/30 backdrop-blur-sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Trailer
                </Button>
              )}

              {homepage && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-muted/10 hover:bg-muted/20 text-foreground border-border backdrop-blur-sm"
                >
                  <a href={homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-foreground hover:text-foreground/80"
            >
              ✕
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </>
  );
}
